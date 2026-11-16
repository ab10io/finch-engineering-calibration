import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const WEIGHTS = Object.freeze({
  design_reasoning: 25,
  architecture_maintainability: 20,
  security_by_design: 20,
  testing_evidence: 15,
  documentation_operations: 10,
  repository_hygiene: 10,
})
const CATEGORIES = Object.keys(WEIGHTS)
const STATUSES = new Set(['demonstrated', 'unclear', 'not_demonstrated'])
const CONFIDENCE = new Set(['low', 'medium', 'high'])

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), 'utf8'))
}

test('freezes one objective rubric outcome for every fixture', async () => {
  const spec = await json('../calibration/fixture-spec.json')
  assert.equal(Object.values(WEIGHTS).reduce((sum, value) => sum + value, 0), 100)

  for (const fixture of spec.fixtures) {
    const expected = await json(`../calibration/expected/${fixture.slug}.json`)
    assert.equal(expected.fixture_slug, fixture.slug)
    assert.equal(expected.methodology_version, '1.0')
    assert.deepEqual(expected.score_range, fixture.expected_score_range)
    assert.deepEqual(Object.keys(expected.target_ratings).sort(), CATEGORIES.slice().sort())

    const calculated = CATEGORIES.reduce((sum, category) => {
      const rating = expected.target_ratings[category]
      assert.ok(Number.isInteger(rating) && rating >= 0 && rating <= 4)
      return sum + (rating / 4) * WEIGHTS[category]
    }, 0)
    assert.ok(calculated >= expected.score_range.min && calculated <= expected.score_range.max)

    const ordered = expected.category_order.flat()
    assert.deepEqual(ordered.slice().sort(), CATEGORIES.slice().sort())
    let prior = 5
    for (const group of expected.category_order) {
      const ratings = group.map((category) => expected.target_ratings[category])
      assert.ok(ratings.every((rating) => rating === ratings[0] && rating <= prior))
      prior = ratings[0]
    }
    assert.ok(expected.low_criteria.every((category) => expected.target_ratings[category] <= 1))
    assert.ok(STATUSES.has(expected.track_alignment_status))
    assert.ok(CONFIDENCE.has(expected.confidence_ceiling))
    assert.ok(expected.required_citation_paths.length >= 2)
    assert.ok(expected.forbidden_claims.includes('tests_pass'))
    assert.ok(expected.forbidden_claims.includes('runtime_correctness'))

    const submission = await json(`../calibration/submissions/${fixture.slug}.json`)
    for (const path of expected.required_citation_paths) {
      if (path.startsWith('submission://')) {
        const field = path.slice('submission://'.length)
        assert.ok(submission[field], `${fixture.slug}: missing submission evidence ${path}`)
      } else {
        await access(new URL(`../fixtures/${fixture.slug}/${path}`, import.meta.url))
      }
    }
  }
})
