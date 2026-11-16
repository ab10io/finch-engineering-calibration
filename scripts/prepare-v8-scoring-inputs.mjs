import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const spec = JSON.parse(await readFile(resolve(root, 'calibration/v8/fixture-spec.json'), 'utf8'))
const methodology = JSON.parse(await readFile(resolve(root, 'calibration/v8/methodology-context.json'), 'utf8'))
const outputRoot = resolve(root, 'calibration/v8/scoring-inputs')
const tracks = {
  'privacy-by-design': 'Products whose primary purpose materially improves privacy, data minimization, confidentiality, user agency, consent, retention, or protection from surveillance.',
  'secure-systems': 'Products whose primary purpose prevents, detects, contains, investigates, or teaches about a concrete security threat.',
  'human-scale-ai': 'Products where AI is essential to a bounded problem and deliberately chosen for the intended people and context.',
  'accessible-inclusive-technology': 'Products whose primary purpose improves access or autonomy for a defined disability, access need, underserved group, or constrained context.',
  'open-source-developer-tools': 'Reusable tools for other builders with credible installation or reuse guidance and a recognized open-source license granting permission to use, modify, and redistribute the work.',
}

await rm(outputRoot, { recursive: true, force: true })
for (const fixture of spec.fixtures) {
  const target = resolve(outputRoot, fixture.slug)
  await mkdir(target, { recursive: true })
  await cp(resolve(root, 'calibration/v8/evidence', `${fixture.slug}.json`), resolve(target, 'evidence.json'))
  await writeFile(resolve(target, 'context.json'), `${JSON.stringify({ fixture_slug: fixture.slug, methodology, track: { slug: fixture.track, alignment_definition: tracks[fixture.track] } }, null, 2)}\n`)
}
process.stdout.write(`Prepared ${spec.fixtures.length} blinded v8 scoring inputs.\n`)
