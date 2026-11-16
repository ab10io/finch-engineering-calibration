import test from 'node:test'
import assert from 'node:assert/strict'
import { exportRecovery, importRecovery } from '../src/vault/recovery.js'

const records = [{ id: 'a', envelope: { ciphertext: 'opaque' } }]

test('round-trips only encrypted recovery records', () => {
  assert.deepEqual(importRecovery(exportRecovery(records)), records)
  assert.doesNotMatch(exportRecovery(records).payload, /plaintext/)
})

test('rejects tampering and duplicate record identifiers', () => {
  const bundle = exportRecovery(records)
  assert.throws(() => importRecovery({ ...bundle, payload: bundle.payload + 'x' }), /checksum/)
  const duplicates = exportRecovery([...records, ...records])
  assert.throws(() => importRecovery(duplicates), /duplicate/)
})
