# Security and misuse analysis

## Most important threat

A repository author embeds instructions to inflate its score or includes a token that leaks into model input or public findings.

## Mitigation

Repository text is inert; deterministic scans happen before model calls, values are redacted, and the critic receives the same immutable evidence catalogue.

## Residual risk

Novel obfuscation can evade patterns, and secret-shaped false positives reduce evidence detail.
