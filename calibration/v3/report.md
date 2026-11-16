# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 22/30 (22/30 planned)
- Score-band hit rate: 0.7273
- Pairwise rank accuracy: 1
- Median run spread: 0
- Maximum run spread: 5
- Category rating MAE: 0.4697
- Citation validity: 1
- Critic rejection rate: 0.2667
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: no

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 1/3 | 62.5 | 62.5 | 66–82 | 0 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 2/3 | 72.5, 72.5 | 72.5 | 68–84 | 0 |
| secure-adversarial-prompt-shield | 3/3 | 52.5, 52.5, 52.5 | 52.5 | 62–78 | 0 |
| human-ai-strong-review-assistant | 2/3 | 72.5, 72.5 | 72.5 | 68–84 | 0 |
| human-ai-weak-chat-wrapper | 3/3 | 18.75, 18.75, 18.75 | 18.75 | 15–35 | 0 |
| accessible-strong-transit-guide | 2/3 | 67.5, 63.75 | 65.625 | 68–84 | 3.75 |
| accessible-incomplete-color-dashboard | 3/3 | 13.75, 13.75, 13.75 | 13.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 0/3 |  | n/a | 70–86 | n/a |
| oss-weak-unlicensed-cli | 3/3 | 18.75, 23.75, 18.75 | 20.4167 | 18–38 | 5 |

## Interpretation

Version 3 materially improves over v2 but is not accepted. Category-rating error, pairwise ranking, score stability, citation validity, track alignment, confidence ceilings, secret safety, and prompt-influence safety pass. Critic acceptance improves from 14/30 to 22/30.

The stable raw scores reveal a remaining answer-key defect. Prompt Shield is a useful adversarial, mid-quality control with consistent category-2 evidence and a 52.5 score; labeling it strong and expecting 62–78 overstates the project. Privacy Vault and Transit Guide also sit just below their lower bounds, while Token Gateway, Human Review Assistant, and Plugin Kit consistently land in their intended strong bands.

Eight critic rejections identify narrower traceability problems: architecture findings need citations to explicit change-isolation evidence; the privacy decision describes synchronization and recovery boundaries not fully integrated through the service; and one transit finding cites a preference test that did not assert every route fact named in its summary. One Token Gateway run also omitted citations needed for claims that other runs supported.

Version 4 must correct the Prompt Shield quality label before inference, narrow or implement unsupported claims, add direct change-isolation and service-boundary tests, and tighten the scorer protocol so every material clause is supported by its cited evidence. V3 artifacts and expected outcomes remain unchanged.
