# Token Gateway

> Synthetic calibration fixture — not participant work or production software.

A narrowly scoped gateway that verifies signed workload tokens, enforces audience policy, and emits privacy-bounded audit decisions.

## Intended users

Platform teams connecting short-lived internal workloads across trust zones.

## Purpose

Reject replayed, expired, wrongly scoped, or ambiguously keyed workload credentials before requests reach internal services.

## Evidence boundary

Finch may inspect this frozen repository statically. It must not install packages, execute tests, start the project, or infer runtime behavior.

## Known limitation

The in-memory replay cache is single-region and intentionally fails closed during cache uncertainty.
