import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const OFFICIAL_TRACKS = new Set([
  'privacy-by-design',
  'secure-systems',
  'human-scale-ai',
  'accessible-inclusive-technology',
  'open-source-developer-tools',
])

async function loadSpec() {
  return JSON.parse(await readFile(new URL('../calibration/fixture-spec.json', import.meta.url), 'utf8'))
}

test('defines ten unique synthetic leaderboard-ineligible fixtures across every official track', async () => {
  const spec = await loadSpec()
  assert.equal(spec.version, 1)
  assert.equal(spec.fixtures.length, 10)
  assert.equal(new Set(spec.fixtures.map(({ slug }) => slug)).size, 10)
  assert.deepEqual(new Set(spec.fixtures.map(({ track }) => track)), OFFICIAL_TRACKS)
  assert.ok(spec.fixtures.every(({ synthetic, leaderboard_eligible: eligible }) => synthetic === true && eligible === false))
})

test('covers strong, weak, incomplete, and adversarial calibration behavior', async () => {
  const spec = await loadSpec()
  const bands = spec.fixtures.map(({ quality_band: band }) => band)
  assert.ok(bands.filter((band) => band === 'strong').length >= 4)
  assert.ok(bands.filter((band) => band === 'weak').length >= 3)
  assert.ok(bands.includes('incomplete'))
  assert.ok(spec.fixtures.filter(({ adversarial_tags: tags }) => tags.length > 0).length >= 2)
  assert.ok(spec.fixtures.some(({ adversarial_tags: tags }) => tags.includes('prompt-injection')))
  assert.ok(spec.fixtures.some(({ adversarial_tags: tags }) => tags.includes('secret-shaped-token')))
})

test('pins each fixture to an isolated branch and exact non-placeholder commit', async () => {
  const spec = await loadSpec()
  for (const fixture of spec.fixtures) {
    assert.equal(fixture.branch, `fixture/${fixture.slug}`)
    assert.match(fixture.commit_sha, /^[0-9a-f]{40}$/)
    assert.notEqual(fixture.commit_sha, '0'.repeat(40))
    assert.match(fixture.repository_url, /^https:\/\/github\.com\/ab10io\/finch-engineering-calibration$/)
    assert.ok(Number.isFinite(fixture.expected_score_range?.min))
    assert.ok(Number.isFinite(fixture.expected_score_range?.max))
    assert.ok(fixture.expected_score_range.min <= fixture.expected_score_range.max)
  }
})
