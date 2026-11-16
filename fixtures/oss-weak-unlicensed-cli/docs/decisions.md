# Critical design decision

## Problem or constraint

Raw JSON is hard to read.

## Alternatives considered

Existing jq and language-native tools were not compared.

## Chosen approach and rationale

Build a minimal Node CLI.

## Accepted trade-off

The program loads the entire input into memory and reports raw parser errors.

## Repository evidence

src/cli.js

## Validation approach

The author manually piped one object through the command.

## Reconsideration conditions

Reconsider for large files.
