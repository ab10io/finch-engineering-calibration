import test from 'node:test'
import assert from 'node:assert/strict'
import { buildGuide } from '../src/guide/build-guide.js'

test('preserves warnings and ordering under every presentation preference', () => {
  const route = { id: 'r', steps: [{ id: 'lift', text: 'Take elevator' }, { id: 'exit', text: 'Exit station' }] }
  const disruption = [{ kind: 'elevator_outage', stepId: 'lift' }]
  const base = buildGuide({ route, disruptions: disruption })
  const adapted = buildGuide({ route, disruptions: disruption, preferences: { nonVisual: true, reducedMotion: true } })
  assert.deepEqual(adapted.steps.map(({ id, available }) => ({ id, available })), base.steps.map(({ id, available }) => ({ id, available })))
  assert.deepEqual(adapted.steps.map(({ text }) => text), base.steps.map(({ text }) => text))
  assert.deepEqual(adapted.steps.map(({ order }) => order), base.steps.map(({ order }) => order))
  assert.match(adapted.steps[0].warning, /Elevator unavailable/)
})
