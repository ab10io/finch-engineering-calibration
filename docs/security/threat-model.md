# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **capability-denial:** A plugin requests undeclared or host-forbidden access during initialization. Control: The host intersects manifest declarations with an explicit host allowlist before invoking lifecycle hooks.
- **lifecycle-rollback:** A partially initialized plugin leaves earlier resources active after a later hook fails. Control: The host records completed hooks and invokes bounded reverse-order cleanup after initialization failure.

## Residual risks

- **process-isolation:** The reference host validates capabilities but does not provide operating-system process isolation.
- **registry-verification:** Package registry signature and publisher identity verification remain consumer responsibilities.
