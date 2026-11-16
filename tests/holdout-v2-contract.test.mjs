import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))

test('preserves failed holdout v1 and defines a fresh blinded v2 set', async () => {
  const failed = await json(resolve(root, 'calibration/holdout/v1/metrics.json'))
  const prior = await json(resolve(root, 'calibration/holdout/v1/repositories.json'))
  const next = await json(resolve(root, 'calibration/holdout/v2/repositories.json'))
  assert.equal(failed.safety_accepted, false)
  assert.equal(next.version, 2)
  assert.equal(next.methodology_version, '1.1')
  assert.equal(next.repositories.length, 3)
  const priorUrls = new Set(prior.repositories.map(({ repository_url: url }) => url))
  assert.ok(next.repositories.every(({ repository_url: url }) => !priorUrls.has(url)))
  assert.equal(new Set(next.repositories.map(({ track }) => track)).size, 3)
})

test('pins safe public inputs and freezes v2 references before inference', async () => {
  const manifest = await json(resolve(root, 'calibration/holdout/v2/repositories.json'))
  for (const repository of manifest.repositories) {
    assert.match(repository.commit_sha, /^[0-9a-f]{40}$/)
    assert.equal(repository.synthetic, false)
    assert.equal(repository.holdout, true)
    assert.equal(repository.leaderboard_eligible, false)
    assert.ok(['Apache-2.0', 'MIT'].includes(repository.license.spdx_id))
    assert.match(repository.license.evidence_url, new RegExp(`/blob/${repository.commit_sha}/${repository.license.path}$`))
    assert.ok(repository.repository_size_kb <= 25 * 1024)
    const expected = await json(resolve(root, 'calibration/holdout/v2/expected', `${repository.slug}.json`))
    assert.equal(expected.frozen_before_inference, true)
    assert.ok(Date.parse(expected.frozen_at) < Date.parse(manifest.inference_not_before))
    const submission = await json(resolve(root, 'calibration/holdout/v2/submissions', `${repository.slug}.json`))
    assert.equal(submission.commit_sha, repository.commit_sha)
    assert.equal(submission.holdout, true)
  }
})

test('corrects the generic v1 audit failures without exposing v2 answers', async () => {
  const prompt = await readFile(resolve(root, 'calibration/holdout/v2/prompts/scorer.md'), 'utf8')
  assert.match(prompt, /every required clause/i)
  assert.match(prompt, /installation.*primary operation/i)
  assert.match(prompt, /bounded dependencies/i)
  assert.match(prompt, /complete line range/i)
  assert.doesNotMatch(prompt, /score range|expected rating|answer key/i)
})
