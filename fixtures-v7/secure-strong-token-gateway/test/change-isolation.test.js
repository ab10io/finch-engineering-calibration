import test from 'node:test'
import assert from 'node:assert/strict'
import { createAuthorizer } from '../src/gateway/authorize.js'

test('replay policy replacement is isolated behind the injected adapter', () => {
  const claims = { sub: 'service-a', jti: 'j1', exp: 200, scopes: ['read'] }
  const common = { verifyToken: () => claims, audit: () => {} }
  const allowing = createAuthorizer({ ...common, replay: { consume: () => true } })
  const denying = createAuthorizer({ ...common, replay: { consume: () => false } })

  assert.deepEqual(allowing({ token: 'x', requiredScopes: ['read'] }), { allowed: true, subject: 'service-a' })
  assert.deepEqual(denying({ token: 'x', requiredScopes: ['read'] }), { allowed: false, reason: 'replay_denied' })
})

test('token verification replacement is isolated from replay and audit adapters', () => {
  let replayCalls = 0
  const events = []
  const authorize = createAuthorizer({
    verifyToken: () => { throw new Error('signature_rejected') },
    replay: { consume: () => { replayCalls += 1; return true } },
    audit: (event) => events.push(event),
  })

  assert.deepEqual(authorize({ token: 'x', requiredScopes: [] }), { allowed: false, reason: 'signature_rejected' })
  assert.equal(replayCalls, 0)
  assert.deepEqual(events, [{ decision: 'deny', reason: 'signature_rejected' }])
})
