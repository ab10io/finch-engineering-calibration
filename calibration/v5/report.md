# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 24/30 (24/30 planned)
- Score-band hit rate: 0.875
- Pairwise rank accuracy: 0.9677
- Median run spread: 0
- Maximum run spread: 8.75
- Category rating MAE: 0.2778
- Citation validity: 0.9667
- Critic rejection rate: 0.2
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: no

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 3/3 | 58.75, 67.5, 67.5 | 64.5833 | 60–76 | 8.75 |
| privacy-weak-consent-banner | 3/3 | 23.75, 21.25, 21.25 | 22.0833 | 18–38 | 2.5 |
| secure-strong-token-gateway | 2/3 | 72.5, 72.5 | 72.5 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 0/3 |  | n/a | 48–60 | n/a |
| human-ai-strong-review-assistant | 2/3 | 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 3/3 | 63.75, 63.75, 63.75 | 63.75 | 60–76 | 0 |
| accessible-incomplete-color-dashboard | 2/3 | 13.75, 13.75 | 13.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 16.25, 18.75, 16.25 | 17.0833 | 18–38 | 2.5 |

## Audit findings

- All three prompt-shield runs exposed a production evidence bug: credential redaction consumed the surrounding quote and made a valid test excerpt syntactically malformed.
- One human-AI run invented an evidence ID and correctly failed production schema validation.
- One token-gateway run overstated change-isolation coverage; one accessibility-control run disagreed with the critic on the rating-0 versus rating-1 architecture anchor.
- One scorer transport produced no output for five minutes. Its log was preserved locally and only the missing judgment was retried.

V5 is retained as a failed calibration and is not eligible for user-visible seeding. The redaction defect is fixed in Finch before v6 evidence is collected.
