# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **route-input-validation:** Malformed or injected route data produces misleading or unsafe instructions. Control: A strict validator bounds route facts, rejects external markup, and requires safety-critical fields.
- **preference-minimization:** Sensitive access preferences or location history are retained beyond guide generation. Control: The guide accepts bounded preferences per request and emits no persistent identity or history fields.

## Residual risks

- **runtime-assistive-tech:** Static evidence cannot verify behavior with every browser and assistive-technology combination.
- **source-data-quality:** Generated guidance remains constrained by the accuracy and timeliness of supplied transit facts.
