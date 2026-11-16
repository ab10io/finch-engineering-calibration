import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const holdoutRoot = resolve(root, 'calibration/holdout/v3')
const manifest = JSON.parse(await readFile(resolve(holdoutRoot, 'repositories.json'), 'utf8'))
const methodology = JSON.parse(await readFile(resolve(root, 'calibration/v9/methodology-context.json'), 'utf8'))
const outputRoot = resolve(holdoutRoot, 'scoring-inputs')
const tracks = {
  'secure-systems': 'Products whose primary purpose prevents, detects, contains, investigates, or teaches about a concrete security threat.',
  'human-scale-ai': 'Products where AI is essential to a bounded problem and deliberately chosen for the intended people and context.',
  'open-source-developer-tools': 'Reusable tools for other builders with credible installation or reuse guidance and a recognized open-source license granting permission to use, modify, and redistribute the work.',
}

await rm(outputRoot, { recursive: true, force: true })
for (const repository of manifest.repositories) {
  const target = resolve(outputRoot, repository.slug)
  await mkdir(target, { recursive: true })
  await cp(resolve(holdoutRoot, 'evidence', `${repository.slug}.json`), resolve(target, 'evidence.json'))
  await writeFile(resolve(target, 'context.json'), `${JSON.stringify({ fixture_slug: repository.slug, methodology, track: { slug: repository.track, alignment_definition: tracks[repository.track] }, public_repository_license: repository.license }, null, 2)}\n`)
}
process.stdout.write(`Prepared ${manifest.repositories.length} blinded holdout v3 scoring inputs.\n`)
