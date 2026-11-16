# Architecture and data flow

## Boundary

The browser encrypts each document with a per-vault key held in platform secure storage. IndexedDB stores ciphertext and a local search index. A sync adapter transfers ciphertext, version vectors, and tombstones only. Recovery uses a user-held recovery phrase; the service cannot reset it.

## Data flow

Import -> local validation -> encrypt -> local index -> optional ciphertext sync. Search never leaves the device. Delete -> tombstone -> sync -> bounded server retention purge.

## Operational limitation

Large vaults rebuild the local index slowly on a new device and background sync depends on browser scheduling.
