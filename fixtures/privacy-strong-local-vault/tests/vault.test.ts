import { describe, expect, it } from 'vitest'
import { publicSyncEnvelope, shouldPurge } from '../src/vault'

describe('privacy boundaries', () => {
  it('excludes plaintext metadata', () => expect(publicSyncEnvelope({ blobId: '1', ciphertext: 'x', title: 'secret' })).toEqual({ blobId: '1', ciphertext: 'x' }))
  it('enforces deletion retention', () => expect(shouldPurge(0, 8 * 86400000)).toBe(true))
})
