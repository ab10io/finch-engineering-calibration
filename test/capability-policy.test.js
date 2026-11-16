import test from'node:test';import assert from'node:assert/strict';import{authorizeCapabilities}from'../src/host/capability-policy.js'
test('denies forbidden capabilities and freezes grants',()=>{assert.throws(()=>authorizeCapabilities(['filesystem'],{allowed:['metrics']}),/capability_denied/);assert.equal(Object.isFrozen(authorizeCapabilities(['metrics'],{allowed:['metrics']})),true)})
