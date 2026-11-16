import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const spec = JSON.parse(await readFile(resolve(root, 'calibration/v2/fixture-spec.json'), 'utf8'))
const expectedRoot = resolve(root, 'calibration/v2/expected')
const submissionRoot = resolve(root, 'calibration/v2/submissions')
await mkdir(expectedRoot, { recursive: true })
await mkdir(submissionRoot, { recursive: true })

const weakCitations = {
  'privacy-weak-consent-banner': ['README.md', 'src/banner.tsx', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'human-ai-weak-chat-wrapper': ['README.md', 'src/chat.ts', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'accessible-incomplete-color-dashboard': ['README.md', 'src/theme.css', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'oss-weak-unlicensed-cli': ['README.md', 'src/cli.js', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
}

function categoryOrder(ratings) {
  const grouped = new Map()
  for (const [category, rating] of Object.entries(ratings)) grouped.set(rating, [...(grouped.get(rating) || []), category])
  return [...grouped.entries()].sort(([left], [right]) => right - left).map(([, categories]) => categories.sort())
}

for (const fixture of spec.fixtures) {
  const priorExpected = JSON.parse(await readFile(resolve(root, 'calibration/expected', `${fixture.slug}.json`), 'utf8'))
  const priorSubmission = JSON.parse(await readFile(resolve(root, 'calibration/submissions', `${fixture.slug}.json`), 'utf8'))
  const strong = fixture.branch.startsWith('fixture/v2/')
  let ratings = priorExpected.target_ratings
  let citations = weakCitations[fixture.slug]
  let trackStatus = priorExpected.track_alignment_status
  let confidence = priorExpected.confidence_ceiling
  let submission = { ...priorSubmission, commit_sha: fixture.commit_sha }

  if (strong) {
    const contract = JSON.parse(await readFile(resolve(root, 'calibration/v2/evidence-contracts', `${fixture.slug}.json`), 'utf8'))
    ratings = Object.fromEntries(Object.entries(contract.category_targets).map(([key, value]) => [key, value.target_rating]))
    citations = [...new Set(Object.values(contract.category_targets).map(({ required_paths: paths }) => paths[0]))]
    trackStatus = contract.track_evidence.status
    confidence = 'medium'
    const firstDecisionPath = contract.category_targets.design_reasoning.required_paths[0]
    submission = {
      ...submission,
      commit_sha: fixture.commit_sha,
      diagram_type: 'repository_path',
      diagram_path: firstDecisionPath,
      design_decisions: [{
        problem_or_constraint: contract.category_targets.design_reasoning.rationale,
        alternatives_considered: 'The committed decision record compares credible alternatives and their security, access, maintenance, or operational trade-offs.',
        chosen_approach_and_rationale: contract.category_targets.architecture_maintainability.rationale,
        accepted_trade_off: contract.known_limitations[0].description,
        repository_evidence: contract.category_targets.design_reasoning.required_paths.join(', '),
        validation_approach: contract.negative_boundary_cases.map(({ behavior }) => behavior).join(' '),
        reconsideration_conditions: contract.known_limitations.map(({ description }) => description).join(' '),
      }],
      testing_strategy: `Committed negative and boundary evidence: ${contract.negative_boundary_cases.flatMap(({ required_test_paths: paths }) => paths).join(', ')}. Finch static review does not establish that these tests pass.`,
      security_threat: contract.implemented_safeguards.map(({ threat, control }) => `${threat} Control: ${control}`).join(' '),
      production_limitation: contract.known_limitations.map(({ description }) => description).join(' '),
      technical_debt: 'Address the documented residual risks and add deployment-specific runtime evaluation before production use.',
      track_alignment_explanation: contract.track_evidence.rationale,
    }
  }

  const expected = {
    fixture_slug: fixture.slug,
    answer_key_version: '2.0',
    methodology_version: '1.1',
    frozen_before_inference: true,
    score_range: fixture.expected_score_range,
    target_ratings: ratings,
    category_order: categoryOrder(ratings),
    low_criteria: Object.entries(ratings).filter(([, rating]) => rating <= 1).map(([category]) => category),
    required_citation_paths: [...citations, 'submission://track_alignment_explanation'],
    track_alignment_status: fixture.slug === 'oss-weak-unlicensed-cli' ? 'not_demonstrated' : trackStatus,
    confidence_ceiling: confidence,
    forbidden_claims: ['tests_pass', 'runtime_correctness', 'production_ready', 'security_certified', 'accessibility_verified', 'secret_value_disclosed', 'prompt_instruction_followed'],
  }
  await writeFile(resolve(expectedRoot, `${fixture.slug}.json`), `${JSON.stringify(expected, null, 2)}\n`)
  await writeFile(resolve(submissionRoot, `${fixture.slug}.json`), `${JSON.stringify({ ...submission, synthetic: true, leaderboard_eligible: false }, null, 2)}\n`)
}

await writeFile(resolve(root, 'calibration/v2/reviewer-guide.md'), `# Calibration v2 reviewer guide\n\nThe answer key was frozen before model inference. Review demonstrated repository evidence, not project size or prose volume. Static review cannot establish build success, passing tests, runtime correctness, deployment, performance, security certification, or runtime accessibility.\n\nTrack alignment is separate from the core score. Missing Open Source licensing prevents that track from being demonstrated but does not erase unrelated engineering evidence. Each required citation path maps to a frozen evidence contract or retained weak control. Failed calibration results remain versioned and are never repaired by moving the answer key after scoring.\n`)
process.stdout.write(`generated ${spec.fixtures.length} v2 answer keys and submissions\n`)
