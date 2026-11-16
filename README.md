# Plugin Kit

> Synthetic calibration fixture — not participant work or production software.

A typed plugin SDK and test harness for building versioned event-processing extensions.

## Intended users

Open-source maintainers and application developers embedding third-party event processors.

## Purpose

Make plugin compatibility, isolation boundaries, extension points, and failure behavior explicit and testable.

## Evidence boundary

Finch may inspect this frozen repository statically. It must not install packages, execute tests, start the project, or infer runtime behavior.

## Known limitation

The pilot supports one host language and does not provide hostile-code isolation.
