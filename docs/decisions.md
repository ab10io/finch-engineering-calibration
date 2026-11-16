# Critical design decision

## Problem or constraint

The team wanted an AI feature for the hackathon.

## Alternatives considered

No non-AI alternative or bounded user problem was evaluated.

## Chosen approach and rationale

Use a generic hosted-model chat call.

## Accepted trade-off

Responses can be wrong and the interface does not distinguish uncertainty.

## Repository evidence

src/chat.ts

## Validation approach

The author manually asked two questions.

## Reconsideration conditions

Reconsider if users complain.
