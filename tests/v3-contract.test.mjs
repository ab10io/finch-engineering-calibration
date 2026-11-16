import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const weights = { design_reasoning: 25, architecture_maintainability: 20, security_by_design: 20, testing_evidence: 15, documentation_operations: 10, repository_hygiene: 10 }
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))

test('defines v3 as a new immutable correction instead of rewriting failed v2', async () => {
  const v2 = await json(resolve(root, 'calibration/v2/fixture-spec.json'))
  const v3 = await json(resolve(root, 'calibration/v3/fixture-spec.json'))
  assert.equal(v3.version, 3)
  assert.equal(v3.methodology_version, '1.1')
  assert.deepEqual(v3.fixtures.map(({ slug }) => slug), v2.fixtures.map(({ slug }) => slug))
  for (const fixture of v3.fixtures) {
    const prior = v2.fixtures.find(({ slug }) => slug === fixture.slug)
    if (fixture.quality_band === 'strong') {
      assert.equal(fixture.branch, `fixture/v3/${fixture.slug}`)
      assert.match(fixture.commit_sha, /^[0-9a-f]{40}$/)
      assert.notEqual(fixture.commit_sha, prior.commit_sha)
    } else {
      assert.equal(fixture.commit_sha, prior.commit_sha)
    }
  }
})

test('corrects the concrete v2 corpus defects and runs every strong project suite', async () => {
  const spec = await json(resolve(root, 'calibration/v3/fixture-spec.json'))
  for (const fixture of spec.fixtures.filter(({ quality_band: band }) => band === 'strong')) {
    const projectRoot = resolve(root, 'fixtures-v3', fixture.slug)
    const license = await readFile(resolve(projectRoot, 'LICENSE'), 'utf8')
    assert.match(license, /copyright notice and this permission notice shall be included/i)
    await readFile(resolve(projectRoot, '.artifact-policy.json'), 'utf8')
    const readme = await readFile(resolve(projectRoot, 'README.md'), 'utf8')
    assert.match(readme, /## Configuration/)
    assert.match(readme, /## Example/)
    const decisions = (await readdir(resolve(projectRoot, 'docs/decisions')))[0]
    const decision = await readFile(resolve(projectRoot, 'docs/decisions', decisions), 'utf8')
    assert.match(decision, /## Alternatives compared/)
    assert.match(decision, /\| Alternative \|/)
    const env = { ...process.env }
    delete env.NODE_TEST_CONTEXT
    const result = spawnSync(process.execPath, ['--test'], { cwd: projectRoot, encoding: 'utf8', env })
    assert.equal(result.status, 0, `${fixture.slug}\n${result.stdout}\n${result.stderr}`)
  }
  const redactor = await readFile(resolve(root, 'fixtures-v3/secure-adversarial-prompt-shield/src/shield/redact.js'))
  assert.equal(redactor.includes(8), false)
  assert.match(redactor.toString('utf8'), /\\b/)
})

test('centers v3 strong answer keys on the methodology rating-3 meaning', async () => {
  const spec = await json(resolve(root, 'calibration/v3/fixture-spec.json'))
  for (const fixture of spec.fixtures.filter(({ quality_band: band }) => band === 'strong')) {
    const expected = await json(resolve(root, 'calibration/v3/expected', `${fixture.slug}.json`))
    const score = Object.entries(weights).reduce((sum, [category, weight]) => sum + expected.target_ratings[category] / 4 * weight, 0)
    assert.ok(score >= fixture.expected_score_range.min && score <= fixture.expected_score_range.max)
    assert.ok(score >= 70 && score <= 82.5)
    assert.equal(expected.frozen_before_inference, true)
  }
})
