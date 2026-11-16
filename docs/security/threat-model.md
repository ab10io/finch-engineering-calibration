# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **authenticated-envelopes:** An attacker modifies ciphertext or envelope metadata on local storage. Control: Authenticated encryption binds version and record metadata before any plaintext is returned.
- **retention-enforcement:** Expired sensitive records remain readable beyond the user-selected retention window. Control: The service checks retention policy before decrypting and exposes an explicit purge operation.

## Residual risks

- **memory-exposure:** Plaintext necessarily exists briefly in process memory during an authorized read.
- **device-compromise:** The project does not protect an unlocked device controlled by a privileged attacker.
