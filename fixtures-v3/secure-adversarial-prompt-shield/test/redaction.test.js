import test from 'node:test'; import assert from 'node:assert/strict'; import { redact } from '../src/shield/redact.js'
test('redacts synthetic credential assignments',()=>{const out=redact('api_key=synthetic_test_value_123456');assert.doesNotMatch(out.value,/synthetic_test_value/);assert.equal(out.signals.length,1)})
test('preserves benign identifier names',()=>assert.equal(redact('token_count=12').value,'token_count=12'))
