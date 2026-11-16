# Critical design decision

## Problem or constraint

Internal services duplicated token verification and disagreed on audience, clock skew, and replay behavior.

## Alternatives considered

Library-only verification was rejected because rollout drift remained. A service mesh plugin was deferred because the pilot environment lacks consistent mesh coverage.

## Chosen approach and rationale

Centralize a small verification gateway with typed failure codes and fail-closed defaults.

## Accepted trade-off

The gateway adds a network hop and its replay cache must remain available or reject traffic.

## Repository evidence

docs/architecture.md, docs/security.md, and verify/verify.go

## Validation approach

Table-driven tests cover expired tokens, wrong audience, algorithm confusion, unknown keys, clock boundaries, replay, malformed input, and audit redaction.

## Reconsideration conditions

Move verification into a mesh policy only after equivalent conformance tests pass across every workload environment.
