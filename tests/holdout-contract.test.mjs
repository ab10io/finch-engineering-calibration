import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '..')
const holdoutRoot = resolve(root, 'calibration/holdout/v1')
const json = async (path) => JSON.parse(await readFile(path, 'utf8'))
const licenses = new Set(['Apache-2.0', 'BSD-3-Clause', 'LGPL-3.0'])
const categories = [
  'design_reasoning',
  'architecture_maintainability',
  'security_by_design',
  'testing_evidence',
  'documentation_operations',
  'repository_hygiene',
]

test('pins a small cross-track public holdout with immutable license evidence', async () => {
  const manifest = await json(resolve(holdoutRoot, 'repositories.json'))
  assert.equal(manifest.version, 1)
  assert.equal(manifest.methodology_version, '1.1')
  assert.equal(manifest.repositories.length, 3)
  assert.equal(new Set(manifest.repositories.map(({ track }) => track)).size, 3)

  for (const repository of manifest.repositories) {
    assert.match(repository.commit_sha, /^[0-9a-f]{40}$/)
    assert.equal(repository.synthetic, false)
    assert.equal(repository.holdout, true)
    assert.equal(repository.leaderboard_eligible, false)
    assert.ok(licenses.has(repository.license.spdx_id))
    assert.match(repository.license.evidence_url, new RegExp(`/blob/${repository.commit_sha}/${repository.license.path}$`))
    assert.ok(Number.isInteger(repository.repository_size_kb) && repository.repository_size_kb <= 25 * 1024)
    assert.ok(repository.track_rationale.length >= 80)
  }
})

test('freezes human reference judgments and submissions before inference', async () => {
  const manifest = await json(resolve(holdoutRoot, 'repositories.json'))
  for (const repository of manifest.repositories) {
    const expected = await json(resolve(holdoutRoot, 'expected', `${repository.slug}.json`))
    const submission = await json(resolve(holdoutRoot, 'submissions', `${repository.slug}.json`))
    assert.equal(expected.fixture_slug, repository.slug)
    assert.equal(expected.frozen_before_inference, true)
    assert.match(expected.frozen_at, /^\d{4}-\d\d-\d\dT/)
    assert.ok(Date.parse(expected.frozen_at) < Date.parse(manifest.inference_not_before))
    assert.deepEqual(Object.keys(expected.target_ratings).sort(), [...categories].sort())
    assert.ok(Object.values(expected.target_ratings).every((rating) => Number.isInteger(rating) && rating >= 0 && rating <= 4))
    assert.ok(expected.score_range.min <= expected.score_range.max)
    assert.equal(expected.confidence_ceiling, 'medium')
    assert.equal(submission.fixture_slug, repository.slug)
    assert.equal(submission.repository_url, repository.repository_url)
    assert.equal(submission.commit_sha, repository.commit_sha)
    assert.equal(submission.synthetic, false)
    assert.equal(submission.holdout, true)
    assert.equal(submission.leaderboard_eligible, false)
  }
})

test('documents non-execution, safety gates, and separate reporting', async () => {
  const guide = await readFile(resolve(holdoutRoot, 'reviewer-guide.md'), 'utf8')
  assert.match(guide, /never execute/i)
  assert.match(guide, /schema and citation/i)
  assert.match(guide, /secret leakage/i)
  assert.match(guide, /separate from the controlled corpus/i)
  assert.match(guide, /disagreement/i)
})
