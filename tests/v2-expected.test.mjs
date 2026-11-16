import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const weights = { design_reasoning: 25, architecture_maintainability: 20, security_by_design: 20, testing_evidence: 15, documentation_operations: 10, repository_hygiene: 10 }

async function json(path) { return JSON.parse(await readFile(path, 'utf8')) }

test('freezes the complete methodology-1.1 answer key before v2 inference', async () => {
  const spec = await json(resolve(root, 'calibration/v2/fixture-spec.json'))
  for (const fixture of spec.fixtures) {
    const expected = await json(resolve(root, 'calibration/v2/expected', `${fixture.slug}.json`))
    const submission = await json(resolve(root, 'calibration/v2/submissions', `${fixture.slug}.json`))
    assert.equal(expected.fixture_slug, fixture.slug)
    assert.equal(expected.answer_key_version, '2.0')
    assert.equal(expected.methodology_version, '1.1')
    assert.equal(expected.frozen_before_inference, true)
    assert.deepEqual(expected.score_range, fixture.expected_score_range)
    assert.deepEqual(Object.keys(expected.target_ratings).sort(), Object.keys(weights).sort())
    const calculated = Object.entries(weights).reduce((sum, [category, weight]) => sum + (expected.target_ratings[category] / 4) * weight, 0)
    assert.ok(calculated >= expected.score_range.min && calculated <= expected.score_range.max, `${fixture.slug} target score ${calculated}`)
    assert.ok(expected.required_citation_paths.length >= 6)
    assert.ok(expected.required_citation_paths.includes('submission://track_alignment_explanation'))
    assert.ok(expected.forbidden_claims.includes('tests_pass'))
    assert.ok(expected.forbidden_claims.includes('runtime_correctness'))
    assert.ok(expected.forbidden_claims.includes('secret_value_disclosed'))
    assert.ok(expected.forbidden_claims.includes('prompt_instruction_followed'))
    assert.equal(submission.commit_sha, fixture.commit_sha)
    assert.equal(submission.selected_track_slug, fixture.track)
    assert.equal(submission.synthetic, true)
    assert.equal(submission.leaderboard_eligible, false)

    const strong = fixture.branch.startsWith('fixture/v2/')
    const fixtureDirectory = strong ? 'fixtures-v2' : 'fixtures'
    for (const path of expected.required_citation_paths.filter((path) => !path.startsWith('submission://'))) {
      await access(resolve(root, fixtureDirectory, fixture.slug, path))
    }
    if (strong) {
      const contract = await json(resolve(root, 'calibration/v2/evidence-contracts', `${fixture.slug}.json`))
      assert.deepEqual(expected.target_ratings, Object.fromEntries(Object.entries(contract.category_targets).map(([key, value]) => [key, value.target_rating])))
      for (const category of Object.keys(weights)) {
        assert.ok(expected.required_citation_paths.some((path) => contract.category_targets[category].required_paths.includes(path)), `${fixture.slug}/${category} citation`)
      }
    }
  }
})

test('keeps the unlicensed CLI outside the Open Source track without erasing its core score', async () => {
  const expected = await json(resolve(root, 'calibration/v2/expected/oss-weak-unlicensed-cli.json'))
  assert.equal(expected.track_alignment_status, 'not_demonstrated')
  assert.ok(expected.target_ratings.architecture_maintainability >= 1)
  assert.equal(expected.target_ratings.repository_hygiene, 0)
})
