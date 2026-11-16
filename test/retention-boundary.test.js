import test from 'node:test'; import assert from 'node:assert/strict'; import { isExpired, purgeExpired } from '../src/vault/retention.js'
test('expires exactly at the configured boundary', () => { assert.equal(isExpired({ createdAt: 10, retentionMs: 5 }, 14), false); assert.equal(isExpired({ createdAt: 10, retentionMs: 5 }, 15), true) })
test('purges only expired records', () => { assert.deepEqual(purgeExpired([{ id: 1, createdAt: 0, retentionMs: 2 }, { id: 2, createdAt: 2, retentionMs: 2 }], 3).map(({ id }) => id), [2]) })
