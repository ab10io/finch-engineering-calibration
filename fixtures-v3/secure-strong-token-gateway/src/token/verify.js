import { createHmac, timingSafeEqual } from 'node:crypto'
const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
export function sign(payload, key) { const body = encode({ alg: 'HS256', typ: 'FGT' }) + '.' + encode(payload); return body + '.' + createHmac('sha256', key).update(body).digest('base64url') }
export function verify(token, { key, now, issuer, audience, skew = 0 }) {
  const parts = token.split('.'); if (parts.length !== 3) throw new Error('malformed_token')
  let header; let payload; try { header = JSON.parse(Buffer.from(parts[0], 'base64url')); payload = JSON.parse(Buffer.from(parts[1], 'base64url')) } catch { throw new Error('malformed_token') }
  if (header.alg !== 'HS256' || header.typ !== 'FGT') throw new Error('algorithm_rejected')
  const expected = createHmac('sha256', key).update(parts[0] + '.' + parts[1]).digest(); const actual = Buffer.from(parts[2], 'base64url')
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) throw new Error('signature_rejected')
  if (payload.iss !== issuer || payload.aud !== audience) throw new Error('claim_rejected')
  if (!Number.isFinite(payload.exp) || payload.exp <= now - skew || (payload.nbf && payload.nbf > now + skew)) throw new Error('time_rejected')
  if (!payload.jti || !Array.isArray(payload.scopes)) throw new Error('claim_rejected')
  return payload
}
