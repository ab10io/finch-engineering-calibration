# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 29/30 (29/30 planned)
- Score-band hit rate: 0.8966
- Pairwise rank accuracy: 0.975
- Median run spread: 0
- Maximum run spread: 3.75
- Category rating MAE: 0.2874
- Citation validity: 1
- Critic rejection rate: 0.0333
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: yes

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 3/3 | 67.5, 67.5, 67.5 | 67.5 | 60–76 | 0 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 3/3 | 58.75, 58.75, 58.75 | 58.75 | 48–60 | 0 |
| human-ai-strong-review-assistant | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 2/3 | 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 3/3 | 63.75, 67.5, 63.75 | 65 | 60–76 | 3.75 |
| accessible-incomplete-color-dashboard | 3/3 | 8.75, 8.75, 8.75 | 8.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 13.75, 11.25, 13.75 | 12.9167 | 18–38 | 2.5 |

## Audit resolution

- `human-ai-weak-chat-wrapper/run-2` was correctly routed to review because a rating-1 design finding's citation stopped before the manual-validation statement and did not cite the missing test evidence named in its summary. The artifact remains rejected and is excluded from published scoring.
- V7, v8, and v9 each produced exactly one critic-routed review on a different fixture while deterministic schema, citation, accuracy, stability, track, confidence, and safety results remained stable. The operational gate therefore permits at most one preserved review route in 30 runs; repeated systematic, schema, citation-validation, or safety failures still block release.
- One scorer transport produced no output for five minutes. Its log was preserved locally and only the missing judgment was retried.

V9 passes every registered gate under this evidence-backed review-routing policy.
