# Critical design decision

## Problem or constraint

Caseworkers spend time locating policy while automated eligibility decisions would create unacceptable harm.

## Alternatives considered

Rules-only search missed paraphrases. Unbounded chat was rejected for hallucination and authority ambiguity.

## Chosen approach and rationale

Use retrieval-bounded drafting with mandatory citations, abstention, and human disposition.

## Accepted trade-off

The assistant cannot answer outside the indexed policy set and adds review steps.

## Repository evidence

docs/architecture.md, docs/decisions.md, src/review.py, and tests/test_review.py

## Validation approach

Tests cover missing citations, low-confidence abstention, prohibited decision language, user rejection, and audit events. A separate qualitative set is documented but not claimed as runtime proof.

## Reconsideration conditions

Remove generation if citation precision or harmful-completion rates miss the published pilot thresholds.
