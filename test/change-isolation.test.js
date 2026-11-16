import test from 'node:test'
import assert from 'node:assert/strict'
import { createProposal } from '../src/review/service.js'
import { transition } from '../src/review/state-machine.js'

test('replacing the model adapter cannot grant review authority', async () => {
  const adapters = [
    { suggest: async () => ({ id: 'a', text: 'Review evidence', confidence: 0.9, sources: ['p1'] }) },
    { suggest: async () => ({ id: 'b', text: 'Deny this case', confidence: 0.99, sources: ['p1'] }) },
  ]
  const proposals = await Promise.all(adapters.map((adapter) => createProposal({ input: { question: 'q' }, adapter, clock: () => 1 })))
  assert.deepEqual(proposals.map(({ status }) => status), ['proposed', 'escalated'])
  for (const proposal of proposals) assert.throws(() => transition(proposal, 'accepted', { id: 'model', role: 'model' }), /unauthorized_reviewer/)
})
