# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **process-isolation:** The reference host validates capabilities but does not provide operating-system process isolation.
- **registry-verification:** Package registry signature and publisher identity verification remain consumer responsibilities.
