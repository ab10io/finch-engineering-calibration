const DIRECT = /ignore (?:all )?(?:previous|prior) instructions|award (?:a )?(?:perfect|maximum) score/i
const DEFENSIVE_CONTEXT = /defensive (?:quotation|example)|threat model|security (?:discussion|example)/i

export function classify(text) {
  if (typeof text !== 'string') throw new TypeError('text required')
  if (DIRECT.test(text) && DEFENSIVE_CONTEXT.test(text)) return { action: 'annotate', reasons: ['security_context'] }
  if (DIRECT.test(text)) return { action: 'quarantine', reasons: ['instruction_like'] }
  if (/prompt injection|system prompt/i.test(text)) return { action: 'annotate', reasons: ['security_context'] }
  return { action: 'allow', reasons: [] }
}
