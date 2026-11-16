# Review Assistant

> Synthetic calibration fixture — not participant work or production software.

A bounded AI suggestion workflow that preserves human authority and minimizes model input.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

Retrieval-bounded suggestions were selected over autonomous decisions and generic chat. Model output can propose but cannot mutate review state. Reconsider generation if provenance or safety thresholds fail domain evaluation.

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- The project cannot guarantee the factual quality or fairness of an externally configured model.
- Domain-specific outcome evaluation remains the responsibility of each deploying organization.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
