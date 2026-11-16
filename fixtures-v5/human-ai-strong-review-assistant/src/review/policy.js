export function assessSuggestion(suggestion) {
  if (!suggestion || !Array.isArray(suggestion.sources) || suggestion.sources.length === 0) {
    return { action: 'escalate', reason: 'missing_provenance' }
  }
  if (!Number.isFinite(suggestion.confidence) || suggestion.confidence < 0.75) {
    return { action: 'escalate', reason: 'low_confidence' }
  }
  if (/\b(?:approve|deny|ineligible)\b/i.test(suggestion.text ?? '')) {
    return { action: 'escalate', reason: 'consequential_language' }
  }
  return { action: 'propose' }
}
