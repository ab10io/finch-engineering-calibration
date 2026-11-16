import { createHash } from 'node:crypto'

function canonical(records) {
  if (!Array.isArray(records) || records.some((record) => !record?.id || !record.envelope)) throw new TypeError('invalid recovery records')
  return JSON.stringify(records.slice().sort((left, right) => left.id.localeCompare(right.id)))
}

export function exportRecovery(records) {
  const payload = canonical(records)
  return { format: 1, payload, checksum: createHash('sha256').update(payload).digest('hex') }
}

export function importRecovery(bundle) {
  if (bundle?.format !== 1 || typeof bundle.payload !== 'string' || typeof bundle.checksum !== 'string') throw new Error('invalid_recovery_bundle')
  const checksum = createHash('sha256').update(bundle.payload).digest('hex')
  if (checksum !== bundle.checksum) throw new Error('recovery_checksum_mismatch')
  const records = JSON.parse(bundle.payload)
  canonical(records)
  if (new Set(records.map(({ id }) => id)).size !== records.length) throw new Error('duplicate_recovery_record')
  return records
}
