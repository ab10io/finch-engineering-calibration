import { validateRoute } from '../input/validate-route.js'
import { applyDisruptions } from './disruptions.js'

export function createGuideBuilder({ validate = validateRoute, apply = applyDisruptions } = {}) {
  return ({ route, preferences = {}, disruptions = [] }) => {
    const valid = validate(route)
    const steps = apply(valid.steps, disruptions).map((step) => ({
      ...step,
      cue: preferences.nonVisual ? `Step ${step.order + 1}: ${step.text}` : step.text,
    }))
    return { routeId: valid.id, steps, reducedMotion: Boolean(preferences.reducedMotion), storesHistory: false }
  }
}

export const buildGuide = createGuideBuilder()
