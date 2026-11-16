# Architecture and data flow

## Boundary

A deterministic scanner treats repository text as data, emits abuse and secret signal metadata, and replaces matched values before the bounded evidence catalogue reaches any model.

## Data flow

Archive file -> path/size checks -> secret redaction -> prompt-pattern signal -> bounded excerpt -> immutable evidence ID -> scorer and critic.

## Operational limitation

The scanner cannot establish semantic intent and supports only a bounded pattern set.
