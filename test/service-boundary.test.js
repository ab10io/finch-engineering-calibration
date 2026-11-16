import test from 'node:test'
import assert from 'node:assert/strict'
import { createProposal } from '../src/review/service.js'

test('escalates exactly at the confidence boundary and preserves provenance', async () => {
  const adapter = { suggest: async () => ({ id: 'p1', text: 'Review the evidence', confidence: 0.75, sources: ['policy-1'] }) }
  const proposal = await createProposal({ input: { question: 'q', email: 'remove@example.test' }, adapter, clock: () => 10 })
  assert.equal(proposal.status, 'proposed')
  assert.deepEqual(proposal.suggestion.sources, ['policy-1'])
})

test('does not convert adapter failure into an accepted proposal', async () => {
  const adapter = { suggest: async () => { throw new Error('adapter_unavailable') } }
  await assert.rejects(() => createProposal({ input: { question: 'q' }, adapter, clock: () => 10 }), /adapter_unavailable/)
})
