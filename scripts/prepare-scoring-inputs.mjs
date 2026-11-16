import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const spec = JSON.parse(await readFile(resolve(root, 'calibration/fixture-spec.json'), 'utf8'))
const trackDefinitions = {
  'privacy-by-design': 'Products whose primary purpose materially improves privacy, data minimization, confidentiality, user agency, consent, retention, or protection from surveillance.',
  'secure-systems': 'Products whose primary purpose prevents, detects, contains, investigates, or teaches about a concrete security threat.',
  'human-scale-ai': 'Products where AI is essential to a bounded problem and deliberately chosen for the intended people and context.',
  'accessible-inclusive-technology': 'Products whose primary purpose improves access or autonomy for a defined disability, access need, underserved group, or constrained context.',
  'open-source-developer-tools': 'Reusable tools, libraries, APIs, CLIs, SDKs, testing utilities, observability systems, or infrastructure for other builders.',
}
const contextBase = {
  methodology: {
    version: '1.0',
    category_weights: {
      design_reasoning: 25,
      architecture_maintainability: 20,
      security_by_design: 20,
      testing_evidence: 15,
      documentation_operations: 10,
      repository_hygiene: 10,
    },
    criteria: {
      design_reasoning: ['alternatives_and_tradeoffs'],
      architecture_maintainability: ['boundaries_and_coupling'],
      security_by_design: ['threat_model_and_mitigations'],
      testing_evidence: ['test_strategy_and_coverage'],
      documentation_operations: ['operational_clarity'],
      repository_hygiene: ['dependency_and_repository_hygiene'],
    },
    rating_anchors: [
      { rating: 0, meaning: 'Absent or contradicted' },
      { rating: 1, meaning: 'Minimal, superficial, or poorly connected evidence' },
      { rating: 2, meaning: 'Adequate evidence for a competent hackathon project, with identifiable limitations' },
      { rating: 3, meaning: 'Strong, intentional, well-integrated evidence and thoughtful trade-offs' },
      { rating: 4, meaning: 'Exceptional evidence that anticipates failure modes and demonstrates unusually mature judgment' },
    ],
    not_tested: [
      'Whether the project builds or starts', 'Whether tests pass', 'Runtime correctness',
      'Performance, scaling, or reliability under load', 'Runtime accessibility behavior',
      'Debugging ability', 'Ability to extend the system safely', 'Deployment correctness',
    ],
  },
}

for (const fixture of spec.fixtures) {
  const target = resolve(root, 'calibration/scoring-inputs', fixture.slug)
  await mkdir(target, { recursive: true })
  await cp(resolve(root, 'calibration/evidence', `${fixture.slug}.json`), resolve(target, 'evidence.json'))
  await writeFile(resolve(target, 'context.json'), `${JSON.stringify({
    ...contextBase,
    fixture_slug: fixture.slug,
    track: { slug: fixture.track, alignment_definition: trackDefinitions[fixture.track] },
  }, null, 2)}\n`)
}

process.stdout.write(`Prepared ${spec.fixtures.length} blinded scoring inputs.\n`)
