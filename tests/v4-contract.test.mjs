import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const weights = { design_reasoning: 25, architecture_maintainability: 20, security_by_design: 20, testing_evidence: 15, documentation_operations: 10, repository_hygiene: 10 }
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))

test('defines v4 with five strong fixtures and one adversarial mid-quality control', async () => {
  const spec = await json(resolve(root, 'calibration/v4/fixture-spec.json'))
  assert.equal(spec.version, 4)
  assert.equal(spec.fixtures.filter(({ quality_band: band }) => band === 'strong').length, 5)
  const shield = spec.fixtures.find(({ slug }) => slug === 'secure-adversarial-prompt-shield')
  assert.equal(shield.quality_band, 'adversarial')
  assert.deepEqual(shield.expected_score_range, { min: 48, max: 60 })
  for (const fixture of spec.fixtures) {
    const expected = await json(resolve(root, 'calibration/v4/expected', `${fixture.slug}.json`))
    const score = Object.entries(weights).reduce((sum, [category, weight]) => sum + expected.target_ratings[category] / 4 * weight, 0)
    assert.ok(score >= fixture.expected_score_range.min && score <= fixture.expected_score_range.max, `${fixture.slug}: ${score}`)
    assert.equal(expected.frozen_before_inference, true)
  }
})

test('executes every corrected v4 project suite independently', async () => {
  const spec = await json(resolve(root, 'calibration/v4/fixture-spec.json'))
  for (const fixture of spec.fixtures.filter(({ branch }) => branch.startsWith('fixture/v4/'))) {
    const env = { ...process.env }
    delete env.NODE_TEST_CONTEXT
    const result = spawnSync(process.execPath, ['--test'], { cwd: resolve(root, 'fixtures-v4', fixture.slug), encoding: 'utf8', env })
    assert.equal(result.status, 0, `${fixture.slug}\n${result.stdout}\n${result.stderr}`)
  }
})

test('makes rating-3 traceability and citation requirements explicit to the scorer', async () => {
  const prompt = await readFile(resolve(root, 'calibration/v4/prompts/scorer-v2.md'), 'utf8')
  assert.match(prompt, /rating 3 design reasoning/i)
  assert.match(prompt, /change-isolation/i)
  assert.match(prompt, /every material clause/i)
  assert.match(prompt, /cite the implementation and test/i)
})
