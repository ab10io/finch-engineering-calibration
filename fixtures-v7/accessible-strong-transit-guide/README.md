# Transit Guide

> Synthetic calibration fixture — not participant work or production software.

Structured transit guidance for explicit visual, mobility, and cognitive-load access needs.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

The bounded prototype produces ordered semantic instructions and does not implement a map or offline cache. Preferences alter presentation but never route safety facts. Missing facts remain explicit instead of being invented.

## Configuration

Provide normalized route steps with stable IDs and plain text. Preferences may request nonvisual cues or reduced motion. Disruptions reference existing step IDs and never silently replace route facts.

## Example

```js
const guide = buildGuide({ route, preferences: { nonVisual: true, reducedMotion: true }, disruptions })
renderOrderedInstructions(guide.steps)
```

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- Static evidence cannot verify behavior with every browser and assistive-technology combination.
- Generated guidance remains constrained by the accuracy and timeliness of supplied transit facts.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
