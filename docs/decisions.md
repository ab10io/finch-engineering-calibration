# Critical design decision

## Problem or constraint

Visual-only disruption maps are inaccessible and network loss is common underground.

## Alternatives considered

A conventional map overlay failed co-design review. SMS was retained as a fallback but lacked interactive route context.

## Chosen approach and rationale

Lead with ordered semantic instructions, assertive alerts only for immediate route changes, and offline caching.

## Accepted trade-off

The text-first experience presents less spatial context for some users and feed freshness is visible rather than hidden.

## Repository evidence

docs/architecture.md, docs/decisions.md, src/RouteGuide.tsx, and tests/RouteGuide.test.tsx

## Validation approach

Component tests cover landmarks, focus order, live-region priority, 200% text reflow assumptions, offline state, and non-color alert labels. Runtime assistive-technology behavior still requires manual testing.

## Reconsideration conditions

Revisit instruction ordering after moderated studies or if transit feeds expose stable indoor landmark data.
