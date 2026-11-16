import test from 'node:test'
import assert from 'node:assert/strict'
import { PluginHost } from '../src/host/plugin-host.js'

test('rejects forbidden capabilities before invoking any lifecycle hook', async () => {
  let started = false
  const plugin = { manifest: { id: 'unsafe-plugin', protocolVersion: 1, capabilities: ['filesystem'] }, hooks: [{ start: async () => { started = true } }] }
  await assert.rejects(() => new PluginHost({ allowedCapabilities: ['metrics'] }).load(plugin), /capability_denied/)
  assert.equal(started, false)
})

test('cleans multiple completed hooks in reverse order', async () => {
  const events = []
  const hook = (name) => ({ start: async () => events.push(name + '+'), stop: async () => events.push(name + '-') })
  const failing = { start: async () => { events.push('c+'); throw new Error('boom') } }
  const plugin = { manifest: { id: 'cleanup-plugin', protocolVersion: 1, capabilities: [] }, hooks: [hook('a'), hook('b'), failing] }
  await assert.rejects(() => new PluginHost().load(plugin), /plugin_initialization_failed/)
  assert.deepEqual(events, ['a+', 'b+', 'c+', 'b-', 'a-'])
})
