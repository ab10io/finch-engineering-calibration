# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **strict-token-verification:** An attacker supplies a malformed or algorithm-confused token to bypass verification. Control: The verifier accepts one explicit algorithm and validates encoding, signature, issuer, audience, and time bounds.
- **bounded-replay-window:** A captured valid token is reused within its authorization lifetime. Control: A bounded replay store atomically consumes token identifiers until their expiration boundary.

## Residual risks

- **store-boundary:** The in-memory replay adapter must be replaced by an atomic shared store for multi-process use.
- **key-custody:** Key generation and hardware-backed custody remain deployment responsibilities outside this library.
