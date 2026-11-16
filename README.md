# Plugin Kit

> Synthetic calibration fixture — not participant work or production software.

A versioned open-source plugin host with manifest, capability, lifecycle, and recovery contracts.

## Install and inspect

Requires Node.js 22 or later. Review dependencies with `npm ci --ignore-scripts` and run local project tests with `npm test`. Finch production assessment performs static review only and does not run either command.

## Architecture and use

A small in-process protocol was selected for transparent extension and testing. It is explicitly not a hostile-code sandbox; untrusted native plugins require process or WASM isolation. Compatibility windows and migration triggers are documented.

## Configuration

Create `PluginHost` with an explicit capability allowlist. Each plugin supplies a protocol-versioned manifest and ordered lifecycle hooks. Unknown versions and forbidden capabilities fail before initialization.

## Example

```js
const host = new PluginHost({ allowedCapabilities: ['metrics'] })
await host.load({ manifest: { id: 'sample-plugin', protocolVersion: 1, capabilities: ['metrics'] }, hooks })
```

## Failure and recovery

See `docs/runbook.md` or the project-specific triage guide before restoring or retrying failed operations.

## Known limitations

- The reference host validates capabilities but does not provide operating-system process isolation.
- Package registry signature and publisher identity verification remain consumer responsibilities.

## Static evidence boundary

Committed code and tests demonstrate intent and coverage. They do not prove that the project builds, tests pass, behaves correctly at runtime, scales, deploys correctly, or works with assistive technology.
