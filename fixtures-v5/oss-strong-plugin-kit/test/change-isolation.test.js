import test from 'node:test'
import assert from 'node:assert/strict'
import { PluginHost } from '../src/host/plugin-host.js'

const plugin = { manifest: { id: 'metrics-plugin', protocolVersion: 1, capabilities: ['metrics'] }, hooks: [{ start: async () => {} }] }

test('changing the host allowlist changes capability policy without weakening manifest validation', async () => {
  await new PluginHost({ allowedCapabilities: ['metrics'] }).load(plugin)
  await assert.rejects(() => new PluginHost({ allowedCapabilities: [] }).load(plugin), /capability_denied/)
  const malformed = { ...plugin, manifest: { ...plugin.manifest, id: 'X' } }
  await assert.rejects(() => new PluginHost({ allowedCapabilities: ['metrics'] }).load(malformed), /invalid_plugin_id/)
})
