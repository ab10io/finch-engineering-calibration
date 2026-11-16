# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **store-boundary:** The in-memory replay adapter must be replaced by an atomic shared store for multi-process use.
- **key-custody:** Key generation and hardware-backed custody remain deployment responsibilities outside this library.
