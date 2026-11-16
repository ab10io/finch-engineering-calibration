import test from 'node:test'
import assert from 'node:assert/strict'
import { createAuthorizer } from '../src/gateway/authorize.js'

test('denies missing scopes before replay consumption and redacts audit payloads', () => {
  let replayCalls = 0
  const audit = []
  const authorize = createAuthorizer({
    verifyToken: () => ({ sub: 'service-a', jti: 'token-id', exp: 200, scopes: ['read'], rawToken: 'never-audit' }),
    replay: { consume: () => { replayCalls += 1; return true } },
    audit: (event) => audit.push(event),
  })
  assert.deepEqual(authorize({ token: 'sensitive-token', requiredScopes: ['admin'] }), { allowed: false, reason: 'scope_denied' })
  assert.equal(replayCalls, 0)
  assert.doesNotMatch(JSON.stringify(audit), /sensitive-token|never-audit/)
})

test('denies a replay after verification and emits a bounded reason', () => {
  const audit = []
  const authorize = createAuthorizer({ verifyToken: () => ({ sub: 's', jti: 'j', exp: 200, scopes: ['read'] }), replay: { consume: () => false }, audit: (event) => audit.push(event) })
  assert.equal(authorize({ token: 'x', requiredScopes: ['read'] }).reason, 'replay_denied')
  assert.deepEqual(audit, [{ decision: 'deny', reason: 'replay_denied' }])
})
