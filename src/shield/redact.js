const ASSIGNMENT = /(api[_-]?key|access[_-]?token|client[_-]?secret|password)s*[:=]s*["']?([^s"']{8,})["']?/gi
export function redact(text) { const signals=[]; const value=String(text).replace(ASSIGNMENT,(_,kind)=>{signals.push({kind:'credential_assignment'});return kind+'=[REDACTED_SECRET]'}); return {value,signals} }
