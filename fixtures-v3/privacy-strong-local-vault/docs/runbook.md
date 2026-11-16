# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **memory-exposure:** Plaintext necessarily exists briefly in process memory during an authorized read.
- **device-compromise:** The project does not protect an unlocked device controlled by a privileged attacker.
