# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 28/30 (28/30 planned)
- Score-band hit rate: 0.8929
- Pairwise rank accuracy: 0.975
- Median run spread: 0
- Maximum run spread: 3.75
- Category rating MAE: 0.3274
- Citation validity: 1
- Critic rejection rate: 0.0667
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: no

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 3/3 | 67.5, 63.75, 67.5 | 66.25 | 60–76 | 3.75 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 2/3 | 68.75, 68.75 | 68.75 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 2/3 | 58.75, 58.75 | 58.75 | 48–60 | 0 |
| human-ai-strong-review-assistant | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 3/3 | 63.75, 67.5, 63.75 | 65 | 60–76 | 3.75 |
| accessible-incomplete-color-dashboard | 3/3 | 8.75, 8.75, 8.75 | 8.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 13.75, 13.75, 13.75 | 13.75 | 18–38 | 0 |

## Audit findings

- `secure-strong-token-gateway/run-1` overstated rating-3 change isolation: the cited test replaced only one adapter path.
- `secure-adversarial-prompt-shield/run-3` exposed a real contradiction between the defensive-quotation decision and classifier behavior, plus an incomplete citation range.
- One scorer transport produced no output for five minutes. Its log was preserved locally and only the missing judgment was retried.

All deterministic accuracy, ranking, stability, citation, track, confidence, and safety gates passed, and the syntax-preserving redaction fix worked. The approved zero-unresolved-rejection gate did not pass, so v6 remains ineligible for user-visible seeding.
