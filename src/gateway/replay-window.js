export class ReplayWindow {
  constructor({ capacity = 1000 } = {}) { if (!Number.isInteger(capacity) || capacity < 1) throw new TypeError('invalid capacity'); this.capacity = capacity; this.entries = new Map() }
  consume(id, expiresAt, now) { for (const [key, expiry] of this.entries) if (expiry <= now) this.entries.delete(key); if (this.entries.has(id)) return false; if (this.entries.size >= this.capacity) throw new Error('replay_store_full'); this.entries.set(id, expiresAt); return true }
}
