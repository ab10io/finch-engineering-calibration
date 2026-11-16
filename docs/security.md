# Security and misuse analysis

## Most important threat

A buggy or malicious plugin requests undeclared capabilities or crashes the host path.

## Mitigation

Capability declarations, version checks, typed errors, panic containment guidance, and an explicit statement that in-process execution is not a sandbox.

## Residual risk

Native plugins still share process memory; hostile code requires process or WASM isolation.
