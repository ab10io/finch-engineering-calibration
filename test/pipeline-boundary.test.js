import test from 'node:test'; import assert from 'node:assert/strict'; import { inspectEvidence } from '../src/shield/pipeline.js'
test('returns bounded structured evidence',()=>{const out=inspectEvidence({path:'README.md',text:'x'.repeat(20),max:8});assert.equal(out.excerpt.length,8);assert.equal(out.truncated,true);assert.equal(out.path,'README.md')})
