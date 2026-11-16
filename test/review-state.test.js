import test from 'node:test';import assert from 'node:assert/strict';import{transition}from'../src/review/state-machine.js'
test('requires authorized human review',()=>assert.throws(()=>transition({status:'proposed'},'accepted',{id:'m',role:'model'}),/unauthorized/))
test('permits explicit review and rejects invalid transitions',()=>{assert.equal(transition({status:'proposed'},'accepted',{id:'r',role:'reviewer',now:1}).status,'accepted');assert.throws(()=>transition({status:'accepted'},'rejected',{id:'r',role:'reviewer'}),/invalid_transition/)})
