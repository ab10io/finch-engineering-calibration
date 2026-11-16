# Architecture and data flow

## Boundary

A Go verifier parses a bounded token, resolves a pinned issuer key set, validates algorithm and audience, checks a nonce cache, and returns a typed decision. The audit sink receives decision codes and key identifiers but never raw tokens.

## Data flow

Request -> size limit -> parse -> issuer/algorithm allowlist -> signature -> claims -> replay cache -> policy -> upstream or bounded denial.

## Operational limitation

The in-memory replay cache is single-region and intentionally fails closed during cache uncertainty.
