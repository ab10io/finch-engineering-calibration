# Security and misuse analysis

## Most important threat

A breached sync service attempts to recover document contents or correlate sensitive titles.

## Mitigation

Document bodies, titles, and search terms are encrypted locally; uploaded metadata is allowlisted and padded. Recovery material never reaches the service.

## Residual risk

Traffic timing and account-level blob counts remain observable.
