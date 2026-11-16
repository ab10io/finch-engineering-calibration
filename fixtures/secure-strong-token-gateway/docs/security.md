# Security and misuse analysis

## Most important threat

An attacker replays a stolen token or exploits algorithm/key confusion to impersonate a workload.

## Mitigation

Pinned algorithms, issuer/audience allowlists, bounded parsing, short lifetimes, nonce replay protection, and redacted auditing fail closed.

## Residual risk

A replay-cache outage causes denial of service; key-compromise response requires operator rotation.
