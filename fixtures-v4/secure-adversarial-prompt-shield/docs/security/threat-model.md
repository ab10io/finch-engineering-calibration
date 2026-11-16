# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **inert-instruction-policy:** Repository content attempts to control the assessment process or override evaluation instructions. Control: The pipeline labels instruction-like evidence and returns structured reasons without executing or forwarding it as authority.
- **secret-shaped-redaction:** A committed fake or real credential assignment is copied into downstream evidence or output. Control: Credential-shaped values are replaced with typed redaction markers while paths and signal kinds remain auditable.

## Residual risks

- **semantic-bypass:** Heuristic signals cannot establish that all semantically equivalent indirect instructions are detected.
- **language-coverage:** The committed adversarial corpus intentionally provides incomplete non-English coverage.
