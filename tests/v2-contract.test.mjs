import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const CATEGORY_KEYS = [
  'design_reasoning',
  'architecture_maintainability',
  'security_by_design',
  'testing_evidence',
  'documentation_operations',
  'repository_hygiene',
]

const STATIC_EXCLUSIONS = [
  'Whether the project builds or starts',
  'Whether tests pass',
  'Runtime correctness',
  'Performance, scaling, or reliability under load',
  'Runtime accessibility behavior',
  'Debugging ability',
  'Ability to extend the system safely',
  'Deployment correctness',
]

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), 'utf8'))
}

test('defines a methodology-1.1 v2 corpus without rewriting v1 commits', async () => {
  const v1 = await json('../calibration/fixture-spec.json')
  const v2 = await json('../calibration/v2/fixture-spec.json')
  assert.equal(v2.version, 2)
  assert.equal(v2.methodology_version, '1.1')
  assert.equal(v2.fixtures.length, 10)
  assert.deepEqual(v2.fixtures.map(({ slug }) => slug).sort(), v1.fixtures.map(({ slug }) => slug).sort())

  const v1BySlug = new Map(v1.fixtures.map((fixture) => [fixture.slug, fixture]))
  const strong = v1.fixtures.filter(({ quality_band: band }) => band === 'strong')
  assert.equal(strong.length, 6)
  for (const fixture of v2.fixtures) {
    const prior = v1BySlug.get(fixture.slug)
    assert.equal(fixture.synthetic, true)
    assert.equal(fixture.leaderboard_eligible, false)
    if (prior.quality_band === 'strong') {
      assert.equal(fixture.branch, `fixture/v2/${fixture.slug}`)
      assert.equal(fixture.commit_sha, '0'.repeat(40))
      assert.equal(fixture.pending_v2_commit, true)
    } else {
      assert.equal(fixture.branch, prior.branch)
      assert.equal(fixture.commit_sha, prior.commit_sha)
      assert.equal(fixture.pending_v2_commit, false)
    }
  }
})

test('freezes observable evidence contracts for all six substantive fixtures', async () => {
  const v2 = await json('../calibration/v2/fixture-spec.json')
  const schema = await json('../calibration/v2/evidence-contract.schema.json')
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema')
  assert.deepEqual(schema.required, [
    'schema_version',
    'fixture_slug',
    'methodology_version',
    'track',
    'intended_score_range',
    'static_review_only',
    'prose_only_requirements_allowed',
    'category_targets',
    'implemented_safeguards',
    'negative_boundary_cases',
    'operations',
    'track_evidence',
    'known_limitations',
    'excluded_runtime_claims',
  ])

  const substantive = v2.fixtures.filter(({ pending_v2_commit: pending }) => pending)
  assert.equal(substantive.length, 6)
  for (const fixture of substantive) {
    const contract = await json(`../calibration/v2/evidence-contracts/${fixture.slug}.json`)
    assert.equal(contract.schema_version, 1)
    assert.equal(contract.fixture_slug, fixture.slug)
    assert.equal(contract.methodology_version, '1.1')
    assert.equal(contract.track, fixture.track)
    assert.deepEqual(contract.intended_score_range, fixture.expected_score_range)
    assert.equal(contract.static_review_only, true)
    assert.equal(contract.prose_only_requirements_allowed, false)
    assert.deepEqual(Object.keys(contract.category_targets).sort(), CATEGORY_KEYS.slice().sort())

    for (const [category, target] of Object.entries(contract.category_targets)) {
      assert.ok(Number.isInteger(target.target_rating) && target.target_rating >= 2 && target.target_rating <= 4, `${fixture.slug}/${category} rating`)
      assert.ok(target.rationale.length >= 40, `${fixture.slug}/${category} rationale`)
      assert.ok(target.required_paths.length >= 1, `${fixture.slug}/${category} paths`)
      assert.equal(new Set(target.required_paths).size, target.required_paths.length, `${fixture.slug}/${category} unique paths`)
      assert.ok(target.observable_requirements.length >= 1, `${fixture.slug}/${category} requirements`)
      for (const requirement of target.observable_requirements) {
        assert.match(requirement.id, /^[a-z0-9-]+$/)
        assert.ok(['implementation', 'test', 'documentation', 'policy'].includes(requirement.kind))
        assert.ok(requirement.description.length >= 30)
        assert.ok(target.required_paths.includes(requirement.path), `${fixture.slug}/${category}/${requirement.id} path`)
      }
      if (target.target_rating >= 3 && !['documentation_operations', 'repository_hygiene'].includes(category)) {
        assert.ok(target.observable_requirements.some(({ kind }) => kind === 'implementation' || kind === 'test'), `${fixture.slug}/${category} cannot be prose-only`)
      }
    }

    assert.ok(contract.implemented_safeguards.length >= 2)
    for (const safeguard of contract.implemented_safeguards) {
      assert.ok(safeguard.threat.length >= 20)
      assert.ok(safeguard.control.length >= 30)
      assert.ok(safeguard.required_paths.length >= 1)
      assert.ok(safeguard.negative_test_paths.length >= 1)
    }
    assert.ok(contract.negative_boundary_cases.length >= 3)
    assert.ok(contract.negative_boundary_cases.every(({ behavior, required_test_paths: paths }) => behavior.length >= 25 && paths.length >= 1))
    assert.ok(contract.operations.installation_paths.length >= 1)
    assert.ok(contract.operations.failure_paths.length >= 1)
    assert.ok(contract.operations.recovery_paths.length >= 1)
    assert.equal(contract.track_evidence.status, 'demonstrated')
    assert.ok(contract.track_evidence.rationale.length >= 40)
    assert.ok(contract.track_evidence.required_paths.length >= 2)
    assert.ok(contract.known_limitations.length >= 2)
    assert.ok(contract.known_limitations.every(({ description, affected_categories: categories }) => description.length >= 30 && categories.length >= 1))
    assert.deepEqual(contract.excluded_runtime_claims, STATIC_EXCLUSIONS)
  }
})
