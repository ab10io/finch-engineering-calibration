# Critical design decision

A centralized policy boundary was chosen over duplicated service libraries. Exact algorithm, audience, issuer, time, scope, and replay policies are injected and auditable. Fail-closed replay storage can reduce availability and must be reconsidered for multi-region deployments.

## Traceability

- Compare stateful sessions and bounded signed tokens with explicit operational trade-offs. — `docs/decisions/001-token-boundary.md`
- Implement the selected verification and authorization boundary with explicit injected policies. — `src/gateway/authorize.js`
- Compose independently replaceable verification, replay, scope, and audit policies. — `src/gateway/authorize.js`
- Demonstrate that a policy replacement does not bypass token verification invariants. — `test/change-isolation.test.js`
- Define assets, trust boundaries, attacks, controls, and residual operational risk. — `docs/security/threat-model.md`
- Reject algorithm confusion, malformed encoding, invalid time bounds, and signature mismatch. — `src/token/verify.js`
- Consume bounded token identifiers and reject reuse inside the configured replay window. — `src/gateway/replay-window.js`
- Exercise malformed tokens, signature confusion, expiration, not-before, and scope escalation. — `test/adversarial-token.test.js`
- Exercise duplicate identifiers, window expiry, capacity bounds, and concurrent consumption semantics. — `test/replay-boundary.test.js`
- Document configuration, key identifiers, scope policy, and denial responses. — `README.md`
- Document key rotation, replay-store failure, containment, rollback, and audit handling. — `docs/runbook.md`
- Commit deterministic dependency resolution for reproducible static review. — `package-lock.json`
- Publish a recognized license permitting use, modification, and redistribution. — `LICENSE`
- Define lint, unit, and policy checks without asserting their execution outcome. — `.github/workflows/ci.yml`
- Provide private vulnerability reporting and supported-version boundaries. — `SECURITY.md`
- Require tests and threat-model updates for security boundary changes. — `CONTRIBUTING.md`
