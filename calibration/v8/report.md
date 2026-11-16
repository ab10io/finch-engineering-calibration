# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 29/30 (29/30 planned)
- Score-band hit rate: 0.8966
- Pairwise rank accuracy: 0.975
- Median run spread: 0
- Maximum run spread: 3.75
- Category rating MAE: 0.3046
- Citation validity: 1
- Critic rejection rate: 0.0333
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: no

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 3/3 | 67.5, 67.5, 67.5 | 67.5 | 60–76 | 0 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 3/3 | 58.75, 58.75, 58.75 | 58.75 | 48–60 | 0 |
| human-ai-strong-review-assistant | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 3/3 | 63.75, 67.5, 63.75 | 65 | 60–76 | 3.75 |
| accessible-incomplete-color-dashboard | 3/3 | 8.75, 8.75, 8.75 | 8.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 2/3 | 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 13.75, 13.75, 13.75 | 13.75 | 18–38 | 0 |

## Audit finding

`oss-strong-plugin-kit/run-1` correctly rejected a design-reasoning traceability claim whose finding cited only the decision document, not the implementation and tests named in that same summary. All project evidence gaps found in prior versions are closed, and every other run and deterministic gate passed. V8 remains ineligible for user-visible seeding under the unchanged zero-unresolved-rejection gate.
