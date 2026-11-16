# Local Vault

> Synthetic calibration fixture — not participant work or production software.

A local-first encrypted record vault with explicit retention and recovery boundaries.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

Local custody avoids server plaintext and searchable metadata. Server-side search and service-held recovery keys were rejected. The accepted cost is user-owned recovery and local index rebuilds. Reconsider if target devices cannot provide secure key storage.

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- Plaintext necessarily exists briefly in process memory during an authorized read.
- The project does not protect an unlocked device controlled by a privileged attacker.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
