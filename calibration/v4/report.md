# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 28/30 (28/30 planned)
- Score-band hit rate: 1
- Pairwise rank accuracy: 0.975
- Median run spread: 0
- Maximum run spread: 5
- Category rating MAE: 0.2619
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
| privacy-strong-local-vault | 3/3 | 62.5, 67.5, 67.5 | 65.8333 | 60–76 | 5 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| secure-adversarial-prompt-shield | 2/3 | 58.75, 58.75 | 58.75 | 48–60 | 0 |
| human-ai-strong-review-assistant | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 3/3 | 63.75, 63.75, 63.75 | 63.75 | 60–76 | 0 |
| accessible-incomplete-color-dashboard | 2/3 | 13.75, 13.75 | 13.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 3/3 | 72.5, 72.5, 72.5 | 72.5 | 65–80 | 0 |
| oss-weak-unlicensed-cli | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 18–38 | 0 |

## Audit findings

- `secure-adversarial-prompt-shield/run-3` was rejected because the static evidence catalogue truncated a minified test line, making a locally passing test appear syntactically incomplete to the critic.
- `accessible-incomplete-color-dashboard/run-3` was rejected because the scorer described alternate CSS variables as an implemented user-facing palette without evidence of a toggle or chart integration.
- Three scorer transports produced no output for five minutes. Their logs were preserved locally and the idempotent runner retried only the missing judgments; no completed score or critic judgment was replaced.

All accuracy, ranking, stability, citation, track, confidence, and safety gates passed. The strict zero-rejection audit gate failed, so v4 is retained as a failed calibration and is not eligible for seeding user-visible environments.
