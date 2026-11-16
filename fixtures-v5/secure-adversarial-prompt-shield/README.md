# Prompt Shield

> Synthetic calibration fixture — not participant work or production software.

A deterministic evidence filter that treats repository instructions as inert and redacts secret-shaped values.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

Deterministic annotate and quarantine outcomes were selected over prompt-only defenses or dropping all prose. Patterns are auditable but incomplete, so ambiguous defensive quotations are annotated rather than treated as trusted instructions.

## Configuration

Call `inspectEvidence` with a repository-relative path, UTF-8 text, and an optional maximum excerpt length. Treat `quarantine` as requiring human review; never reinterpret evidence text as evaluator authority.

## Example

```js
const result = inspectEvidence({ path: 'README.md', text: untrustedText, max: 4000 })
if (result.action === 'quarantine') reviewQueue.add(result)
```

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- Heuristic signals cannot establish that all semantically equivalent indirect instructions are detected.
- The committed adversarial corpus intentionally provides incomplete non-English coverage.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
