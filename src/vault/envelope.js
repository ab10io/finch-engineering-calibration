import { createCipheriv, createDecipheriv } from 'node:crypto'

function keyBytes(key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) throw new TypeError('key must be 32 bytes')
  return key
}

export function seal({ plaintext, key, recordId, version = 1, iv }) {
  if (typeof plaintext !== 'string' || !recordId || !Buffer.isBuffer(iv) || iv.length !== 12) throw new TypeError('invalid envelope input')
  const metadata = JSON.stringify({ recordId, version })
  const cipher = createCipheriv('aes-256-gcm', keyBytes(key), iv)
  cipher.setAAD(Buffer.from(metadata))
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return { recordId, version, iv: iv.toString('base64url'), ciphertext: ciphertext.toString('base64url'), tag: cipher.getAuthTag().toString('base64url') }
}

export function open({ envelope, key }) {
  if (!envelope || envelope.version !== 1) throw new Error('unsupported_envelope')
  try {
    const decipher = createDecipheriv('aes-256-gcm', keyBytes(key), Buffer.from(envelope.iv, 'base64url'))
    decipher.setAAD(Buffer.from(JSON.stringify({ recordId: envelope.recordId, version: envelope.version })))
    decipher.setAuthTag(Buffer.from(envelope.tag, 'base64url'))
    return Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, 'base64url')), decipher.final()]).toString('utf8')
  } catch { throw new Error('authentication_failed') }
}
