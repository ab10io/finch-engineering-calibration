# Local Vault

> Synthetic calibration fixture — not participant work or production software.

An offline-first personal document vault that minimizes collection and keeps decryption keys on the user device.

## Intended users

People storing sensitive household records on shared or intermittently connected devices.

## Purpose

Give users searchable document storage without sending document bodies or decryption keys to a server.

## Evidence boundary

Finch may inspect this frozen repository statically. It must not install packages, execute tests, start the project, or infer runtime behavior.

## Known limitation

Large vaults rebuild the local index slowly on a new device and background sync depends on browser scheduling.
