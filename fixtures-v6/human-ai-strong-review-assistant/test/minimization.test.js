import test from 'node:test';import assert from 'node:assert/strict';import{minimizeInput}from'../src/input/minimize.js'
test('removes top-level and nested identity fields',()=>assert.deepEqual(minimizeInput({question:'q',email:'x',policyFacts:{rule:'r',name:'n',nested:{phone:'1',value:'v'}}}),{question:'q',policyFacts:{rule:'r',nested:{value:'v'}}}))
