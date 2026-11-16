# Critical design decision

## Problem or constraint

Ad hoc plugins depended on host internals and could fail the entire event loop.

## Alternatives considered

Dynamic scripting was rejected for type and sandbox ambiguity. Process isolation was documented as the next boundary for untrusted plugins but deferred for the hackathon scope.

## Chosen approach and rationale

Provide versioned Rust traits, explicit capabilities, and a reusable conformance harness.

## Accepted trade-off

In-process plugins are fast and simple but are not a security sandbox.

## Repository evidence

docs/architecture.md, docs/decisions.md, src/lib.rs, tests/conformance.rs, README.md, LICENSE, and CONTRIBUTING.md

## Validation approach

Cargo tests specify compatibility negotiation, undeclared capability rejection, error containment, deterministic fixtures, and example-plugin conformance. Finch does not execute them.

## Reconsideration conditions

Move untrusted plugins out of process when the threat model includes malicious native code.
