export const SYNC_FIELDS = ['blobId', 'ciphertext', 'nonce', 'version', 'tombstone'] as const

export function publicSyncEnvelope(input: Record<string, unknown>) {
  return Object.fromEntries(SYNC_FIELDS.filter((key) => key in input).map((key) => [key, input[key]]))
}

export function shouldPurge(tombstonedAt: number, now: number, retentionMs = 7 * 86400000) {
  return now - tombstonedAt >= retentionMs
}
