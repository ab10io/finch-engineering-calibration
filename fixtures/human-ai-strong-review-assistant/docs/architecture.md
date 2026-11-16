# Architecture and data flow

## Boundary

A retrieval service returns cited policy chunks; a constrained model drafts questions and evidence summaries. A policy engine blocks decision language, the UI displays uncertainty and sources, and a caseworker must accept or reject every suggestion.

## Data flow

Case question -> redacted query -> policy retrieval -> cited draft -> constraint check -> uncertainty display -> human accept/reject -> audit event.

## Operational limitation

Only the frozen policy corpus is searchable; multilingual quality and real workflow latency remain unverified.
