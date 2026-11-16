# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **semantic-bypass:** Heuristic signals cannot establish that all semantically equivalent indirect instructions are detected.
- **language-coverage:** The committed adversarial corpus intentionally provides incomplete non-English coverage.
