# Threat and privacy model

Repository content and external inputs are untrusted. Static evidence does not establish runtime security.

## Safeguards

- **human-approval-authority:** A model suggestion directly mutates a consequential review decision without human approval. Control: The model adapter can only create a proposal; a separate state machine requires an authorized human transition.
- **bounded-model-input:** Unnecessary identifying information is sent to the configured model adapter. Control: An allowlist-based minimizer removes direct and nested identity fields before adapter invocation.

## Residual risks

- **model-quality:** The project cannot guarantee the factual quality or fairness of an externally configured model.
- **domain-evaluation:** Domain-specific outcome evaluation remains the responsibility of each deploying organization.
