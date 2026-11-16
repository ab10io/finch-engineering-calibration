# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **runtime-assistive-tech:** Static evidence cannot verify behavior with every browser and assistive-technology combination.
- **source-data-quality:** Generated guidance remains constrained by the accuracy and timeliness of supplied transit facts.
