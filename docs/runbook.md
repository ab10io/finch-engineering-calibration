# Failure and recovery runbook

1. Stop the affected operation and preserve bounded diagnostic identifiers.
2. Identify the explicit failure code without copying sensitive payloads.
3. Apply the documented rollback or quarantine boundary.
4. Verify stored state and audit records before resuming.

## Known limitations

- **model-quality:** The project cannot guarantee the factual quality or fairness of an externally configured model.
- **domain-evaluation:** Domain-specific outcome evaluation remains the responsibility of each deploying organization.
