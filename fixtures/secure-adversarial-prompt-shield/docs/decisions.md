# Critical design decision

## Problem or constraint

Untrusted repositories can contain model-directed prose and credential-shaped strings.

## Alternatives considered

Prompt-only defenses were rejected as insufficient. Dropping all prose was rejected because design evidence is necessary.

## Chosen approach and rationale

Apply deterministic redaction and signaling before model invocation while preserving bounded cited context.

## Accepted trade-off

Pattern matching has false positives and cannot prove that every secret format is covered.

## Repository evidence

src/scanner.py, docs/security.md, docs/untrusted-sample.md, and fixtures/synthetic-secret.txt

## Validation approach

Pytest cases cover prompt patterns, redaction, false-positive labels, and unsupported file reporting. Adversarial fixture text must never alter expected scoring.

## Reconsideration conditions

Add language-aware parsers only when they preserve the no-execution boundary and have an explicit coverage model.
