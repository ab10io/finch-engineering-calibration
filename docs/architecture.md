# Architecture and data flow

## Boundary

A small Rust core defines versioned traits and capability declarations. The host validates compatibility, grants only declared capabilities, catches plugin errors at the boundary, and exposes an in-memory conformance harness.

## Data flow

Manifest -> version/capability validation -> plugin registration -> typed event -> isolated result/error -> host metrics.

## Operational limitation

The pilot supports one host language and does not provide hostile-code isolation.
