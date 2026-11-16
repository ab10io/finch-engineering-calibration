import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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
