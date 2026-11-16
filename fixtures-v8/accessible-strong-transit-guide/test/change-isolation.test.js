import test from 'node:test'
import assert from 'node:assert/strict'
import { buildGuide, createGuideBuilder } from '../src/guide/build-guide.js'

const route = { id: 'r', steps: [{ id: 'a', text: 'Board platform 2' }] }

test('presentation preferences do not alter route facts', () => {
  const visual = buildGuide({ route })
  const nonvisual = buildGuide({ route, preferences: { nonVisual: true } })
  assert.equal(visual.steps[0].text, nonvisual.steps[0].text)
  assert.equal(visual.steps[0].available, nonvisual.steps[0].available)
})

test('validator replacement is isolated from disruption presentation', () => {
  const build = createGuideBuilder({
    validate: () => ({ id: 'replacement', steps: [{ id: 'a', text: 'Validated', order: 0 }] }),
  })
  assert.equal(build({ route }).routeId, 'replacement')
  assert.equal(build({ route }).steps[0].available, true)
})

test('disruption replacement is isolated from route validation', () => {
  const build = createGuideBuilder({
    apply: (steps) => steps.map((step) => ({ ...step, available: false, warning: 'Adapter warning' })),
  })
  const guide = build({ route })
  assert.equal(guide.routeId, 'r')
  assert.deepEqual(guide.steps[0], { id: 'a', text: 'Board platform 2', order: 0, available: false, warning: 'Adapter warning', cue: 'Board platform 2' })
})
