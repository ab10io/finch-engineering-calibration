import test from 'node:test';import assert from 'node:assert/strict';import{assessSuggestion}from'../src/review/policy.js'
test('escalates missing provenance and low confidence',()=>{assert.equal(assessSuggestion({text:'help',confidence:.9,sources:[]}).reason,'missing_provenance');assert.equal(assessSuggestion({text:'help',confidence:.4,sources:['p1']}).reason,'low_confidence')})
test('blocks consequential language',()=>assert.equal(assessSuggestion({text:'Deny the case',confidence:.9,sources:['p1']}).reason,'consequential_language'))
