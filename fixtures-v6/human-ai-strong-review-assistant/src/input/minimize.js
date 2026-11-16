const ALLOWED = new Set(['caseType','question','policyFacts'])
export function minimizeInput(input) { if (!input || typeof input!=='object') throw new TypeError('input required'); return Object.fromEntries(Object.entries(input).filter(([key])=>ALLOWED.has(key)).map(([key,value])=>[key,scrub(value)])) }
function scrub(value) { if (Array.isArray(value)) return value.map(scrub); if (value&&typeof value==='object') return Object.fromEntries(Object.entries(value).filter(([key])=>!['name','email','phone','address','ssn'].includes(key)).map(([key,item])=>[key,scrub(item)])); return value }
