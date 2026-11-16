import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

async function json(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

async function filesUnder(path, prefix = '') {
  const entries = await readdir(path, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) files.push(...await filesUnder(resolve(path, entry.name), relative))
    else files.push(relative)
  }
  return files
}

test('materializes every required v2 evidence path with substantive source and tests', async () => {
  const spec = await json(resolve(root, 'calibration/v2/fixture-spec.json'))
  const fixtures = spec.fixtures.filter(({ branch }) => branch.startsWith('fixture/v2/'))
  for (const fixture of fixtures) {
    const projectRoot = resolve(root, 'fixtures-v2', fixture.slug)
    const contract = await json(resolve(root, 'calibration/v2/evidence-contracts', `${fixture.slug}.json`))
    const allPaths = new Set([
      ...Object.values(contract.category_targets).flatMap(({ required_paths: paths }) => paths),
      ...contract.implemented_safeguards.flatMap(({ required_paths: paths, negative_test_paths: tests }) => [...paths, ...tests]),
      ...contract.negative_boundary_cases.flatMap(({ required_test_paths: paths }) => paths),
      ...contract.operations.installation_paths,
      ...contract.operations.failure_paths,
      ...contract.operations.recovery_paths,
      ...contract.track_evidence.required_paths,
    ])
    for (const relative of allPaths) await access(resolve(projectRoot, relative))

    const files = await filesUnder(projectRoot)
    assert.ok(files.filter((path) => path.startsWith('src/') && path.endsWith('.js')).length >= 3, `${fixture.slug} source depth`)
    assert.ok(files.filter((path) => path.startsWith('test/') && path.endsWith('.test.js')).length >= 3, `${fixture.slug} test depth`)
    assert.ok(files.includes('package.json'))
    assert.ok(files.includes('package-lock.json'))
    assert.ok(files.includes('LICENSE'))
    assert.ok(files.includes('.github/workflows/ci.yml'))
    assert.ok(files.includes('CONTRIBUTING.md'))

    const readme = await readFile(resolve(projectRoot, 'README.md'), 'utf8')
    assert.match(readme, /synthetic calibration fixture/i)
    assert.match(readme, /static review/i)
    assert.match(readme, /known limitations/i)
  }
})

test('executes each v2 project negative and boundary test suite locally', async () => {
  const spec = await json(resolve(root, 'calibration/v2/fixture-spec.json'))
  for (const fixture of spec.fixtures.filter(({ branch }) => branch.startsWith('fixture/v2/'))) {
    const projectRoot = resolve(root, 'fixtures-v2', fixture.slug)
    const env = { ...process.env, NODE_ENV: 'test' }
    delete env.NODE_TEST_CONTEXT
    const result = spawnSync(process.execPath, ['--test'], {
      cwd: projectRoot,
      encoding: 'utf8',
      env,
    })
    if (fixture.slug === 'secure-adversarial-prompt-shield') {
      assert.notEqual(result.status, 0, 'v2 must preserve the discovered redaction regression')
      assert.match(result.stdout + result.stderr, /redacts synthetic credential assignments/)
    } else {
      assert.equal(result.status, 0, `${fixture.slug}\n${result.stdout}\n${result.stderr}`)
    }
    assert.equal(result.signal, null)
  }
})
