# Architecture and data flow

## Boundary

A browser form posts messages to one server route, which forwards the text to a model and returns the response. There is no retrieval boundary, user-specific need, evaluation set, or uncertainty policy.

## Data flow

Text box -> server -> model -> rendered response.

## Operational limitation

Accuracy, latency, cost, safety, and user benefit are unknown.
