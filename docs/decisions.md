# Critical design decision

## Problem or constraint

Searchable sync normally exposes document text or a reusable server-side key.

## Alternatives considered

Server-side indexing was rejected for confidentiality. Fully peer-to-peer sync was rejected because background delivery is unreliable on target mobile browsers.

## Chosen approach and rationale

Use local indexing and encrypted blob sync with explicit metadata minimization.

## Accepted trade-off

Recovery is harder and cross-device search indexing is recomputed after enrollment.

## Repository evidence

docs/architecture.md and src/vault.ts

## Validation approach

Property tests cover ciphertext round trips, sync metadata allowlists, deletion retention, and corrupted envelopes.

## Reconsideration conditions

Reconsider if platform secure storage is unavailable or encrypted-search research becomes deployable without server plaintext.
