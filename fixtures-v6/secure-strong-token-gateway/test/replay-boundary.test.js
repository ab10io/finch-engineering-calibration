import test from 'node:test'; import assert from 'node:assert/strict'; import { ReplayWindow } from '../src/gateway/replay-window.js'
test('consumes once and permits reuse only after expiry', () => { const replay=new ReplayWindow(); assert.equal(replay.consume('a',20,10),true); assert.equal(replay.consume('a',20,11),false); assert.equal(replay.consume('a',30,20),true) })
test('fails closed at bounded capacity', () => { const replay=new ReplayWindow({capacity:1}); replay.consume('a',20,10); assert.throws(() => replay.consume('b',20,10),/replay_store_full/) })
