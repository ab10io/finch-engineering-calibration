# Critical design decision

Retrieval-bounded suggestions were selected over autonomous decisions and generic chat. Model output can propose but cannot mutate review state. Reconsider generation if provenance or safety thresholds fail domain evaluation.

## Alternatives compared

| Alternative | Benefit | Rejected cost |
| --- | --- | --- |
| Autonomous model decision | Fastest workflow | Unacceptable authority ambiguity and unsupported consequential outcomes |
| Rules-only search | Deterministic behavior | Misses paraphrased policy questions and produces no bounded synthesis |
| Retrieval-bounded proposal | Helps locate evidence while preserving human authority | Adds review steps and depends on source quality |

The adapter can create only a proposal. Policy escalation and an authorized state transition remain separate boundaries. Generation must be disabled if provenance or domain safety evaluation misses its threshold.

## Traceability

- Compare automation alternatives and define when suggestions require rejection, escalation, or reconsideration. — `docs/decisions/001-human-authority.md`
- Implement the selected human-authority boundary as explicit review state transitions. — `src/review/state-machine.js`
- Compose a model adapter with policy and persistence without granting the adapter mutation authority. — `src/review/service.js`
- Permit only explicit proposed, accepted, rejected, and escalated transitions. — `src/review/state-machine.js`
- Map sensitive input, prompt influence, unauthorized approval, and misleading output to controls. — `docs/security/threat-model.md`
- Remove unnecessary identifying fields before constructing bounded model input. — `src/input/minimize.js`
- Require provenance and confidence fields and route unsafe or incomplete suggestions to escalation. — `src/review/policy.js`
- Exercise unsafe content, missing citations, uncertainty thresholds, and escalation outcomes. — `test/review-policy.test.js`
- Exercise invalid state transitions and preserve human approval authority. — `test/review-state.test.js`
- Exercise direct and nested identifying input removal with explicit allowlisted fields. — `test/minimization.test.js`
- Document bounded use, adapter configuration, review responsibilities, and non-guarantees. — `README.md`
- Document unsafe-output containment, audit export, rollback, and recovery procedures. — `docs/runbook.md`
- Commit deterministic dependency resolution for bounded review. — `package-lock.json`
- Publish a recognized license granting reuse and modification rights. — `LICENSE`
- Define automated policy and unit checks without execution claims. — `.github/workflows/ci.yml`
- Document intended use, excluded decisions, evaluation gaps, and adapter obligations. — `MODEL_CARD.md`
- Require safety regression evidence for policy or model-boundary changes. — `CONTRIBUTING.md`
