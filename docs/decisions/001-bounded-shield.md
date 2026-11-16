# Critical design decision

Deterministic annotate and quarantine outcomes were selected over prompt-only defenses or dropping all prose. Patterns are auditable but incomplete, so ambiguous defensive quotations are annotated rather than treated as trusted instructions.

## Alternatives compared

| Alternative | Benefit | Rejected cost |
| --- | --- | --- |
| Prompt-only instruction | Minimal preprocessing | Untrusted text still reaches the model without deterministic signals |
| Drop all prose | Removes instruction-shaped text | Destroys legitimate design and security evidence |
| Redact, annotate, and quarantine | Preserves bounded evidence and audit reasons | Heuristics have false positives and semantic bypasses |

Quarantine is reserved for evaluator-directed text, while defensive discussion is annotated. The pattern set is versioned and must be reconsidered when measured bypass or false-positive rates change.

## Traceability

- Compare blocking, annotation, and quarantine while defining false-positive and bypass limits. — `docs/decisions/001-bounded-shield.md`
- Implement the selected allow, annotate, and quarantine outcomes with structured reasons. — `src/shield/policy.js`
- Compose pure detection and redaction stages without allowing evidence text to become executable instruction. — `src/shield/pipeline.js`
- Map prompt influence, data exfiltration, encoding tricks, and audit tampering to bounded controls. — `docs/security/threat-model.md`
- Classify untrusted content into allow, annotate, or quarantine outcomes using explicit reasons. — `src/shield/policy.js`
- Replace secret-shaped assignments before content reaches downstream assessment evidence. — `src/shield/redact.js`
- Exercise inert prompt text, obfuscation, contextual false positives, and unsupported language. — `test/adversarial-corpus.test.js`
- Exercise credential assignments, benign identifiers, repeated secrets, and bounded output. — `test/redaction.test.js`
- Document bounded integration, signal meanings, and non-guarantees for operators. — `README.md`
- Document review and release procedures for quarantined evidence. — `docs/triage.md`
- Commit deterministic dependency metadata for reproducible inspection. — `package-lock.json`
- Publish a recognized license granting reuse and modification rights. — `LICENSE`
- Define automated unit and adversarial corpus checks without runtime claims. — `.github/workflows/ci.yml`
- Document private reporting for bypass or redaction vulnerabilities. — `SECURITY.md`
- Require regression corpus additions for policy and detector changes. — `CONTRIBUTING.md`
