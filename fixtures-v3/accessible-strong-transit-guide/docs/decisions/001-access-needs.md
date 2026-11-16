# Critical design decision

Ordered semantic instructions lead; maps are supplementary. Preferences alter presentation but never route safety facts. Missing or stale facts remain explicit instead of being invented.

## Alternatives compared

| Alternative | Benefit | Rejected cost |
| --- | --- | --- |
| Visual map as primary interface | Familiar spatial overview | Excludes nonvisual use and performs poorly underground |
| SMS-only alerts | Works on constrained devices | Lacks ordered route context and preference-aware presentation |
| Ordered semantic guide with optional map | Supports nonvisual and low-connectivity use | Provides less spatial context for some riders |

Presentation preferences never alter route safety facts. Missing landmarks and disruptions remain explicit. Reconsider ordering after moderated research rather than inferring runtime accessibility from static evidence.

## Traceability

- Compare visual, auditory, reduced-motion, low-connectivity, and cognitive-load alternatives with limitations. — `docs/decisions/001-access-needs.md`
- Implement the selected multimodal guidance and preference boundaries without changing route facts. — `src/guide/build-guide.js`
- Compose normalized route facts and access preferences without coupling output channels. — `src/guide/build-guide.js`
- Demonstrate that a presentation preference does not alter route safety facts. — `test/change-isolation.test.js`
- Map location and access-preference sensitivity to minimization and retention boundaries. — `docs/security/privacy-model.md`
- Reject malformed route facts and unsafe external text before instruction generation. — `src/input/validate-route.js`
- Exercise instruction ordering and content for multiple explicit access preferences. — `test/access-needs.test.js`
- Exercise elevator outages, missing facts, conflicting disruptions, and bounded fallback behavior. — `test/disruption-boundaries.test.js`
- Document supported access needs, input contract, output channels, and runtime non-guarantees. — `README.md`
- Document stale-data diagnosis, outage response, correction, rollback, and recovery. — `docs/runbook.md`
- Commit deterministic dependency resolution for reproducible inspection. — `package-lock.json`
- Publish a recognized license granting reuse and modification rights. — `LICENSE`
- Define unit and static accessibility checks without asserting runtime conformance. — `.github/workflows/ci.yml`
- Document inclusive research, review, and regression expectations for contributors. — `CONTRIBUTING.md`
- Collect access context and impact without requiring sensitive medical disclosure. — `.github/ISSUE_TEMPLATE/accessibility.yml`
