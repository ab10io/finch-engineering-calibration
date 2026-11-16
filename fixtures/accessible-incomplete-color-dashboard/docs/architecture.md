# Architecture and data flow

## Boundary

A CSS class swaps chart palette variables. Charts remain canvas-only and interactions remain pointer-only.

## Data flow

Toggle -> body class -> alternate CSS variables.

## Operational limitation

Canvas charts have no text alternative, controls are pointer-only, and mobile reflow is unknown.
