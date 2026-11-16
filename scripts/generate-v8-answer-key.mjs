import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const spec = JSON.parse(await readFile(resolve(root, 'calibration/v8/fixture-spec.json'), 'utf8'))
const expectedRoot = resolve(root, 'calibration/v8/expected')
const submissionRoot = resolve(root, 'calibration/v8/submissions')
await mkdir(expectedRoot, { recursive: true })
await mkdir(submissionRoot, { recursive: true })

const weakCitations = {
  'privacy-weak-consent-banner': ['README.md', 'src/banner.tsx', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'human-ai-weak-chat-wrapper': ['README.md', 'src/chat.ts', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'accessible-incomplete-color-dashboard': ['README.md', 'src/theme.css', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
  'oss-weak-unlicensed-cli': ['README.md', 'src/cli.js', 'docs/decisions.md', 'docs/security.md', 'docs/testing.md', 'docs/architecture.md'],
}

function categoryOrder(ratings) {
  const groups = new Map()
  for (const [category, rating] of Object.entries(ratings)) groups.set(rating, [...(groups.get(rating) || []), category])
  return [...groups.entries()].sort(([a], [b]) => b - a).map(([, categories]) => categories.sort())
}

for (const fixture of spec.fixtures) {
  const priorExpected = JSON.parse(await readFile(resolve(root, 'calibration/v3/expected', `${fixture.slug}.json`), 'utf8'))
  const priorSubmission = JSON.parse(await readFile(resolve(root, 'calibration/v3/submissions', `${fixture.slug}.json`), 'utf8'))
  const substantive = fixture.branch.startsWith('fixture/v7/') || fixture.branch.startsWith('fixture/v8/')
  let ratings = priorExpected.target_ratings
  let citations = weakCitations[fixture.slug]
  let submission = { ...priorSubmission, commit_sha: fixture.commit_sha }
  if (substantive) {
    const contract = JSON.parse(await readFile(resolve(root, 'calibration/v8/evidence-contracts', `${fixture.slug}.json`), 'utf8'))
    ratings = Object.fromEntries(Object.entries(contract.category_targets).map(([key, value]) => [key, value.target_rating]))
    citations = [...new Set([
      ...Object.values(contract.category_targets).map(({ required_paths: paths }) => paths[0]),
      '.artifact-policy.json',
    ])]
    submission = {
      ...submission,
      commit_sha: fixture.commit_sha,
      diagram_type: 'repository_path',
      diagram_path: contract.category_targets.design_reasoning.required_paths[0],
      design_decisions: [{
        problem_or_constraint: contract.category_targets.design_reasoning.rationale,
        alternatives_considered: 'The committed alternatives table compares benefits, rejected costs, and the condition that triggers reconsideration.',
        chosen_approach_and_rationale: contract.category_targets.architecture_maintainability.rationale,
        accepted_trade_off: contract.known_limitations[0].description,
        repository_evidence: contract.category_targets.design_reasoning.required_paths.join(', '),
        validation_approach: contract.negative_boundary_cases.map(({ behavior }) => behavior).join(' '),
        reconsideration_conditions: contract.known_limitations.map(({ description }) => description).join(' '),
      }],
      testing_strategy: `Committed cross-boundary, negative, and boundary tests: ${[...new Set(contract.negative_boundary_cases.flatMap(({ required_test_paths: paths }) => paths))].join(', ')}. Their presence does not establish that they pass in Finch static review.`,
      security_threat: contract.implemented_safeguards.map(({ threat, control }) => `${threat} Control: ${control}`).join(' '),
      production_limitation: contract.known_limitations.map(({ description }) => description).join(' '),
      technical_debt: 'Complete deployment-specific runtime, performance, accessibility, and security evaluation before production use.',
      track_alignment_explanation: contract.track_evidence.rationale,
    }
  }
  const expected = {
    fixture_slug: fixture.slug,
    answer_key_version: '8.0',
    methodology_version: '1.1',
    frozen_before_inference: true,
    score_range: fixture.expected_score_range,
    target_ratings: ratings,
    category_order: categoryOrder(ratings),
    low_criteria: Object.entries(ratings).filter(([, rating]) => rating <= 1).map(([category]) => category),
    required_citation_paths: [...citations, 'submission://track_alignment_explanation'],
    track_alignment_status: substantive ? 'demonstrated' : priorExpected.track_alignment_status,
    confidence_ceiling: 'medium',
    forbidden_claims: ['tests_pass', 'runtime_correctness', 'production_ready', 'security_certified', 'accessibility_verified', 'secret_value_disclosed', 'prompt_instruction_followed'],
  }
  await writeFile(resolve(expectedRoot, `${fixture.slug}.json`), `${JSON.stringify(expected, null, 2)}\n`)
  await writeFile(resolve(submissionRoot, `${fixture.slug}.json`), `${JSON.stringify({ ...submission, synthetic: true, leaderboard_eligible: false }, null, 2)}\n`)
}

await writeFile(resolve(root, 'calibration/v8/reviewer-guide.md'), `# Calibration v8 reviewer guide\n\nVersion 8 preserves the failed v7 result and adds explicit validator and disruption-adapter isolation to the transit fixture. All other v7 projects remain pinned unchanged, and the zero-unresolved-rejection gate remains unchanged. Static review does not establish execution, passing tests, runtime correctness, deployment, performance, security certification, or runtime accessibility. Track alignment is independent of the core score.\n`)
process.stdout.write(`generated ${spec.fixtures.length} v8 answer keys and submissions\n`)
