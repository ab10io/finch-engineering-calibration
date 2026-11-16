import { open, seal } from './envelope.js'
import { isExpired } from './retention.js'

export class VaultService {
  constructor({ storage, key, clock, ivSource }) { Object.assign(this, { storage, key, clock, ivSource }) }
  put({ id, plaintext, retentionMs }) {
    if (!id || this.storage.has(id)) throw new Error('record_exists')
    const createdAt = this.clock()
    this.storage.set(id, { createdAt, retentionMs, envelope: seal({ plaintext, key: this.key, recordId: id, iv: this.ivSource() }) })
  }
  read(id) {
    const record = this.storage.get(id)
    if (!record) throw new Error('record_not_found')
    if (isExpired(record, this.clock())) throw new Error('record_expired')
    return open({ envelope: record.envelope, key: this.key })
  }
  purge() {
    for (const [id, record] of this.storage) if (isExpired(record, this.clock())) this.storage.delete(id)
  }
}
