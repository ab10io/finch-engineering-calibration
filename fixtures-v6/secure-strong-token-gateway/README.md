# Token Gateway

> Synthetic calibration fixture — not participant work or production software.

A strict signed-token authorization boundary with replay and scope enforcement.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

A centralized policy boundary was chosen over duplicated service libraries. Exact algorithm, audience, issuer, time, scope, and replay policies are injected and auditable. Fail-closed replay storage can reduce availability and must be reconsidered for multi-region deployments.

## Configuration

Pin one issuer, audience, signing algorithm, clock-skew allowance, replay capacity, and explicit scope list. Production adapters must supply an atomic shared replay store; the bundled in-memory adapter is single-process only.

## Example

```js
const authorize = createAuthorizer({ verifyToken, replay, audit })
const decision = authorize({ token: requestToken, requiredScopes: ['invoice:read'] })
if (!decision.allowed) return deny(decision.reason)
```

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- The in-memory replay adapter must be replaced by an atomic shared store for multi-process use.
- Key generation and hardware-backed custody remain deployment responsibilities outside this library.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
