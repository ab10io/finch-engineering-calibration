import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function json(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), 'utf8'))
}

test('records three schema-validated scorer and critic runs per fixture without secret leakage', async () => {
  const spec = await json('../calibration/fixture-spec.json')
  let count = 0
  for (const fixture of spec.fixtures) {
    const hashes = new Set()
    for (let run = 1; run <= 3; run += 1) {
      const artifact = await json(`../calibration/codex/${fixture.slug}/run-${run}.json`)
      assert.equal(artifact.fixture_slug, fixture.slug)
      assert.equal(artifact.run, run)
      assert.equal(artifact.model, 'gpt-6.1-sol')
      assert.equal(artifact.prompt_version, '1.0')
      assert.match(artifact.snapshot_hash, /^[0-9a-f]{64}$/)
      hashes.add(artifact.snapshot_hash)
      assert.equal(artifact.accepted, true)
      assert.deepEqual(artifact.validation, { production_schema_valid: true, critic_valid: true, errors: [] })
      assert.deepEqual(artifact.critic, { valid: true, errors: [] })
      assert.ok(artifact.assessment.core_score >= 0 && artifact.assessment.core_score <= 100)
      assert.ok(!JSON.stringify(artifact).includes('ghp_abcdefghijklmnopqrstuvwxyz1234567890'))
      count += 1
    }
    assert.equal(hashes.size, 1, `${fixture.slug}: runs must use one frozen evidence snapshot`)
  }
  assert.equal(count, 30)
})
