const TRANSITIONS={proposed:new Set(['accepted','rejected','escalated']),escalated:new Set(['rejected'])}
export function transition(record,next,actor){if(!actor?.id||actor.role!=='reviewer')throw new Error('unauthorized_reviewer');if(!TRANSITIONS[record.status]?.has(next))throw new Error('invalid_transition');return{...record,status:next,reviewedBy:actor.id,reviewedAt:actor.now}}
