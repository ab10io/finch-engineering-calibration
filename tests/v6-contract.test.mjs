import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const weights = { design_reasoning: 25, architecture_maintainability: 20, security_by_design: 20, testing_evidence: 15, documentation_operations: 10, repository_hygiene: 10 }
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))

test('defines v6 without rewriting the failed v5 result', async () => {
  const spec = await json(resolve(root, 'calibration/v6/fixture-spec.json'))
  assert.equal(spec.version, 6)
  assert.equal(spec.fixtures.filter(({ quality_band: band }) => band === 'strong').length, 5)
  const shield = spec.fixtures.find(({ slug }) => slug === 'secure-adversarial-prompt-shield')
  assert.equal(shield.quality_band, 'adversarial')
  assert.deepEqual(shield.expected_score_range, { min: 48, max: 60 })
  for (const fixture of spec.fixtures) {
    const expected = await json(resolve(root, 'calibration/v6/expected', `${fixture.slug}.json`))
    const score = Object.entries(weights).reduce((sum, [category, weight]) => sum + expected.target_ratings[category] / 4 * weight, 0)
    assert.ok(score >= fixture.expected_score_range.min && score <= fixture.expected_score_range.max, `${fixture.slug}: ${score}`)
    assert.equal(expected.frozen_before_inference, true)
  }
})

test('executes every corrected v6 project suite independently', async () => {
  const spec = await json(resolve(root, 'calibration/v6/fixture-spec.json'))
  for (const fixture of spec.fixtures.filter(({ branch }) => branch.startsWith('fixture/v6/'))) {
    const env = { ...process.env }
    delete env.NODE_TEST_CONTEXT
    const result = spawnSync(process.execPath, ['--test'], { cwd: resolve(root, 'fixtures-v6', fixture.slug), encoding: 'utf8', env })
    assert.equal(result.status, 0, `${fixture.slug}\n${result.stdout}\n${result.stderr}`)
  }
})

test('makes bounded excerpts and implementation claims explicit audit boundaries', async () => {
  const prompt = await readFile(resolve(root, 'calibration/v6/prompts/scorer-v2.md'), 'utf8')
  const critic = await readFile(resolve(root, 'calibration/v6/prompts/critic-v2.md'), 'utf8')
  assert.match(prompt, /rating 3 design reasoning/i)
  assert.match(prompt, /change-isolation/i)
  assert.match(prompt, /every material clause/i)
  assert.match(prompt, /cite the implementation and test/i)
  assert.match(prompt, /defined or configured/i)
  assert.match(prompt, /user-facing integration/i)
  assert.match(critic, /bounded.*truncated/i)
  assert.match(critic, /complete syntactic construct/i)
  assert.match(prompt, /copy.*evidence id.*exactly/i)
  assert.match(prompt, /coherent maintainable boundary/i)
})
