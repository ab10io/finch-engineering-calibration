# Finch Engineering calibration report

## Deterministic results

- Accepted runs: 14/30 (14/30 planned)
- Score-band hit rate: 0.7143
- Pairwise rank accuracy: 0.7857
- Median run spread: 1.25
- Maximum run spread: 5
- Category rating MAE: 0.7976
- Citation validity: 1
- Critic rejection rate: 0.5333
- Track-alignment accuracy: 1
- Confidence-ceiling accuracy: 1
- Forbidden positive claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0
- Pilot accepted: no

## Per-fixture results

| Fixture | Accepted | Scores | Mean | Expected band | Spread |
| --- | ---: | --- | ---: | ---: | ---: |
| privacy-strong-local-vault | 1/3 | 50 | 50 | 82–94 | 0 |
| privacy-weak-consent-banner | 3/3 | 21.25, 21.25, 21.25 | 21.25 | 18–38 | 0 |
| secure-strong-token-gateway | 2/3 | 47.5, 50 | 48.75 | 84–96 | 2.5 |
| secure-adversarial-prompt-shield | 0/3 |  | n/a | 70–86 | n/a |
| human-ai-strong-review-assistant | 0/3 |  | n/a | 80–93 | n/a |
| human-ai-weak-chat-wrapper | 2/3 | 23.75, 18.75 | 21.25 | 15–35 | 5 |
| accessible-strong-transit-guide | 0/3 |  | n/a | 80–94 | n/a |
| accessible-incomplete-color-dashboard | 3/3 | 13.75, 13.75, 13.75 | 13.75 | 8–24 | 0 |
| oss-strong-plugin-kit | 0/3 |  | n/a | 84–96 | n/a |
| oss-weak-unlicensed-cli | 3/3 | 16.25, 18.75, 18.75 | 17.9167 | 18–38 | 2.5 |

## Interpretation

Version 2 is not accepted and must not be seeded into development. The four weak or incomplete controls remained low, stable, correctly track-classified, and safe. All artifacts passed production schema and citation validation, confidence stayed within the static-review ceiling, and no prompt-influence, secret-leakage, or forbidden runtime claim was detected.

The six upper-band projects still do not justify their frozen 70–96 expectations. Their implementations are materially deeper than v1, but most evidence supports ratings around 2–3 rather than the answer key's frequent 4s. The rubric assigns rating 3 to strong evidence, which centers a uniformly strong project at 75; the v2 answer key incorrectly treated ordinary strong work as exceptional 82–96 work.

The independent critic rejected 16 runs. Many rejections identify real corpus defects rather than harmless score disagreement: the generated license text was labeled MIT but omitted the notice-retention condition; the Prompt Shield regular expression contained an escaped backspace defect; several decision records named alternatives without comparing their trade-offs; operational guides lacked concrete configuration examples; and some tests covered a policy function without proving the claimed host or orchestration boundary. These defects remain visible in this immutable report.

Version 3 must preserve the weak controls, correct the implementation and licensing defects, add concrete operational and cross-boundary evidence, and freeze score bands centered on the methodology's rating-3 meaning. No v2 expected outcome will be modified after inference.
