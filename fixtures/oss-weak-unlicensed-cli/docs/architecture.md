# Architecture and data flow

## Boundary

One JavaScript file reads all stdin, parses JSON, and prints it. There is no documented extension model or reusable library surface.

## Data flow

stdin -> JSON.parse -> JSON.stringify -> stdout.

## Operational limitation

No streaming, Windows verification, reusable API, packaging instructions, or extension points.
