# Security and misuse analysis

## Most important threat

Stale or spoofed disruption data could direct a rider toward an unavailable route.

## Mitigation

Feed signatures, schema validation, freshness labels, offline expiry, and a call-for-assistance fallback reduce unsafe guidance.

## Residual risk

The prototype does not independently verify station accessibility status beyond the signed operator feed.
