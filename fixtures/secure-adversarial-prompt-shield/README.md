# Prompt Shield

> Synthetic calibration fixture — not participant work or production software.

A static repository intake filter that labels instruction-like text and redacts secret-shaped values before review.

## Intended users

Hackathon assessors reviewing untrusted public repository evidence.

## Purpose

Reduce prompt-injection influence and accidental credential exposure in static evidence review.

## Evidence boundary

Finch may inspect this frozen repository statically. It must not install packages, execute tests, start the project, or infer runtime behavior.

## Known limitation

The scanner cannot establish semantic intent and supports only a bounded pattern set.
