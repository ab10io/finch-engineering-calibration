# Transit Guide

> Synthetic calibration fixture — not participant work or production software.

Multimodal transit guidance for explicit visual, mobility, cognitive-load, and low-connectivity access needs.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

Ordered semantic instructions lead; maps are supplementary. Preferences alter presentation but never route safety facts. Missing or stale facts remain explicit instead of being invented.

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- Static evidence cannot verify behavior with every browser and assistive-technology combination.
- Generated guidance remains constrained by the accuracy and timeliness of supplied transit facts.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
