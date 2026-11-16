# Critical design decision

A small in-process protocol was selected for transparent extension and testing. It is explicitly not a hostile-code sandbox; untrusted native plugins require process or WASM isolation. Compatibility windows and migration triggers are documented.

## Alternatives compared

| Alternative | Benefit | Rejected cost |
| --- | --- | --- |
| Dynamic scripts with host internals | Very low authoring friction | Ambiguous compatibility and trust boundaries |
| Process or WASM isolation | Stronger hostile-code containment | Larger runtime and packaging scope than the bounded kit |
| Versioned in-process protocol | Transparent API and deterministic conformance tests | Not a security sandbox for hostile native code |

The in-process boundary is suitable only for trusted plugins. A hostile-code requirement triggers reconsideration toward process or WASM isolation, with migration governed by protocol compatibility tests.

## Traceability

- Compare plugin loading alternatives and trace compatibility, trust, and migration decisions. — `docs/decisions/001-plugin-protocol.md`
- Implement the selected versioned protocol and bounded lifecycle through the public host interface. — `src/host/plugin-host.js`
- Coordinate plugins only through versioned manifests and bounded lifecycle hooks. — `src/host/plugin-host.js`
- Validate protocol version, identifiers, capabilities, and lifecycle declarations. — `src/protocol/manifest.js`
- Exercise compatible, deprecated, unknown, and malformed protocol versions. — `test/compatibility.test.js`
- Map malicious manifests, capability escalation, lifecycle failure, and supply-chain risk to controls. — `docs/security/threat-model.md`
- Deny undeclared or host-forbidden capabilities before plugin initialization. — `src/host/capability-policy.js`
- Exercise supported, deprecated, future, and malformed manifest versions. — `test/compatibility.test.js`
- Exercise undeclared, forbidden, duplicated, and empty capability requests. — `test/capability-policy.test.js`
- Exercise initialization failure, reverse-order cleanup, and bounded diagnostic output. — `test/lifecycle-failure.test.js`
- Document installation, host configuration, discovery, and diagnostic interpretation. — `README.md`
- Document manifest fields, lifecycle hooks, capability requests, and test fixtures. — `docs/authoring.md`
- Document failed initialization, quarantine, rollback, cleanup, and recovery. — `docs/runbook.md`
- Document protocol deprecation, compatibility windows, and consumer migration steps. — `docs/migration.md`
- Commit deterministic dependency resolution for reproducible package review. — `package-lock.json`
- Publish a recognized open-source license permitting use, modification, and redistribution. — `LICENSE`
- Define unit, compatibility, and package checks without claiming execution success. — `.github/workflows/ci.yml`
- Define tagged release provenance and immutable package publication inputs. — `.github/workflows/release.yml`
- Document compatibility, tests, changesets, and review expectations. — `CONTRIBUTING.md`
- Document supported versions and private vulnerability disclosure. — `SECURITY.md`
