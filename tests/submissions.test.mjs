import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'

const REQUIRED_DECISION_FIELDS = [
  'problem_or_constraint',
  'alternatives_considered',
  'chosen_approach_and_rationale',
  'accepted_trade_off',
  'repository_evidence',
  'validation_approach',
  'reconsideration_conditions',
]

const narrativeFields = [
  'testing_strategy',
  'security_threat',
  'production_limitation',
  'technical_debt',
  'track_alignment_explanation',
  'ai_disclosure_narrative',
]

async function loadJson(relative) {
  return JSON.parse(await readFile(new URL(relative, import.meta.url), 'utf8'))
}

test('provides a complete bounded submission for every calibration fixture', async () => {
  const spec = await loadJson('../calibration/fixture-spec.json')
  for (const fixture of spec.fixtures) {
    const submission = await loadJson(`../calibration/submissions/${fixture.slug}.json`)
    assert.equal(submission.fixture_slug, fixture.slug)
    assert.equal(submission.selected_track_slug, fixture.track)
    assert.equal(submission.repository_url, fixture.repository_url)
    assert.match(submission.commit_sha, /^[0-9a-f]{40}$/)
    assert.ok(submission.title.length > 0 && submission.title.length <= 120)
    assert.ok(submission.summary.length > 0 && submission.summary.length <= 1000)
    assert.ok(submission.intended_users.length > 0 && submission.intended_users.length <= 1000)
    assert.equal(submission.diagram_type, 'repository_path')
    assert.ok(submission.diagram_path && !submission.diagram_path.includes('..'))
    assert.ok(submission.design_decisions.length >= 1 && submission.design_decisions.length <= 3)
    for (const decision of submission.design_decisions) {
      for (const field of REQUIRED_DECISION_FIELDS) assert.ok(decision[field]?.trim(), `${fixture.slug}: ${field}`)
    }
    for (const field of narrativeFields) {
      assert.ok(submission[field]?.trim(), `${fixture.slug}: ${field}`)
      assert.ok(submission[field].length <= 3000, `${fixture.slug}: ${field} exceeds limit`)
    }
    assert.ok(Array.isArray(submission.ai_disclosure.tools_used))
    for (const field of ['purposes', 'substantially_generated_areas', 'review_validation', 'rejected_or_changed_suggestion']) {
      assert.ok(submission.ai_disclosure[field]?.trim(), `${fixture.slug}: ai_disclosure.${field}`)
    }
    assert.equal(submission.synthetic, true)
    assert.equal(submission.leaderboard_eligible, false)
  }
})

test('materializes one auditable project tree per fixture', async () => {
  const spec = await loadJson('../calibration/fixture-spec.json')
  for (const fixture of spec.fixtures) {
    const root = new URL(`../fixtures/${fixture.slug}/`, import.meta.url)
    const readme = await readFile(new URL('README.md', root), 'utf8')
    const architecture = await readFile(new URL('docs/architecture.md', root), 'utf8')
    const projectFiles = await readdir(root, { recursive: true })
    const sourceFiles = projectFiles.filter((path) => /\.(?:c|css|go|jsx?|py|rs|tsx?|xyz)$/.test(path))
    assert.match(readme, /synthetic calibration fixture/i)
    assert.match(architecture, /data flow|architecture/i)
    assert.ok(sourceFiles.length >= 1, `${fixture.slug}: source file required`)
  }
  await readFile(new URL('../fixtures/oss-strong-plugin-kit/LICENSE', import.meta.url), 'utf8')
  await assert.rejects(readFile(new URL('../fixtures/oss-weak-unlicensed-cli/LICENSE', import.meta.url), 'utf8'), /ENOENT/)
  assert.match(await readFile(new URL('../fixtures/secure-adversarial-prompt-shield/docs/untrusted-sample.md', import.meta.url), 'utf8'), /ignore previous instructions/i)
  assert.match(await readFile(new URL('../fixtures/secure-adversarial-prompt-shield/fixtures/synthetic-secret.txt', import.meta.url), 'utf8'), /ghp_/)
})
