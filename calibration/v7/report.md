# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 29/30 (29/30 planned)
- Score-band hit rate: 0.8966
- Pairwise rank accuracy: 0.975
- Median run spread: 0
- Maximum run spread: 5
- Category rating MAE: 0.2874
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
| privacy-strong-local-vault | 3/3 | 67.5, 62.5, 67.5 | 65.8333 | 60–76 | 5 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 3/3 | 58.75, 58.75, 58.75 | 58.75 | 48–60 | 0 |
| human-ai-strong-review-assistant | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 2/3 | 67.5, 63.75 | 65.625 | 60–76 | 3.75 |
| accessible-incomplete-color-dashboard | 3/3 | 8.75, 8.75, 8.75 | 8.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 13.75, 13.75, 11.25 | 12.9167 | 18–38 | 2.5 |

## Audit finding

`accessible-strong-transit-guide/run-2` correctly rejected rating-3 architecture because the comparative test covered presentation preferences but not replacement of the validator and disruption dependencies. All other runs and every deterministic accuracy, stability, citation, track, confidence, and safety gate passed. V7 remains ineligible for user-visible seeding under the unchanged zero-unresolved-rejection gate.
