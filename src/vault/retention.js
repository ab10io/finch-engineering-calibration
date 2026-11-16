export function isExpired({ createdAt, retentionMs }, now) {
  if (!Number.isFinite(createdAt) || !Number.isFinite(retentionMs) || retentionMs < 0 || !Number.isFinite(now)) throw new TypeError('invalid retention policy')
  return now - createdAt >= retentionMs
}

export function purgeExpired(records, now) {
  return records.filter((record) => !isExpired(record, now))
}
