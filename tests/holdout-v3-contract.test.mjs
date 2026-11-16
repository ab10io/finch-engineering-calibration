import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))

test('preserves v1 and v2 failures and freezes a third fresh holdout', async () => {
  assert.equal((await json(resolve(root, 'calibration/holdout/v1/metrics.json'))).safety_accepted, false)
  assert.equal((await json(resolve(root, 'calibration/holdout/v2/metrics.json'))).safety_accepted, false)
  const v1 = await json(resolve(root, 'calibration/holdout/v1/repositories.json'))
  const v2 = await json(resolve(root, 'calibration/holdout/v2/repositories.json'))
  const v3 = await json(resolve(root, 'calibration/holdout/v3/repositories.json'))
  const prior = new Set([...v1.repositories, ...v2.repositories].map(({ repository_url: url }) => url))
  assert.equal(v3.version, 3)
  assert.equal(v3.repositories.length, 3)
  assert.ok(v3.repositories.every(({ repository_url: url }) => !prior.has(url)))
  assert.equal(new Set(v3.repositories.map(({ track }) => track)).size, 3)
})

test('pins licensed bounded v3 repositories and pre-inference judgments', async () => {
  const manifest = await json(resolve(root, 'calibration/holdout/v3/repositories.json'))
  for (const repository of manifest.repositories) {
    assert.match(repository.commit_sha, /^[0-9a-f]{40}$/)
    assert.ok(['Apache-2.0', 'MIT'].includes(repository.license.spdx_id))
    assert.match(repository.license.evidence_url, new RegExp(`/blob/${repository.commit_sha}/${repository.license.path}$`))
    assert.equal(repository.leaderboard_eligible, false)
    const expected = await json(resolve(root, 'calibration/holdout/v3/expected', `${repository.slug}.json`))
    assert.equal(expected.frozen_before_inference, true)
    assert.ok(Date.parse(expected.frozen_at) < Date.parse(manifest.inference_not_before))
  }
})
