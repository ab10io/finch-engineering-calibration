# Architecture and data flow

## Boundary

A React component stores an accepted flag in localStorage and conditionally calls a third-party analytics loader. All event payload design and retention remain delegated to the analytics vendor.

## Data flow

Page load -> read localStorage -> show banner -> accepted -> initialize analytics SDK.

## Operational limitation

Consent state is browser-local and other scripts can bypass the component.
