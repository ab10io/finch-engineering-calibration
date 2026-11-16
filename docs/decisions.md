# Critical design decision

## Problem or constraint

The site needs a visible consent choice before analytics initialization.

## Alternatives considered

No alternatives were documented beyond using the existing vendor SDK.

## Chosen approach and rationale

Gate vendor initialization on a local boolean.

## Accepted trade-off

The implementation does not provide granular purposes, revocation UI, or server-side enforcement.

## Repository evidence

src/banner.tsx

## Validation approach

Manual browser clicking only; no automated evidence is included.

## Reconsideration conditions

Reconsider if the analytics vendor changes its API.
