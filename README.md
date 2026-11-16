# Consent Banner Plus

> Synthetic calibration fixture — not participant work or production software.

A generic analytics dashboard with a configurable cookie banner.

## Intended users

Small website operators who want a banner before loading analytics.

## Purpose

Display a consent banner and then initialize analytics.

## Evidence boundary

Finch may inspect this frozen repository statically. It must not install packages, execute tests, start the project, or infer runtime behavior.

## Known limitation

Consent state is browser-local and other scripts can bypass the component.
