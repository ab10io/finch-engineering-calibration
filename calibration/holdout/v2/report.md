# Finch Engineering blind holdout v1

The public repositories were pinned and the human ranges frozen before inference. Scores measure bounded static evidence only; code and tests were never executed. Holdout metrics remain separate from controlled-corpus acceptance.

## Result

- Structural and safety gates: FAIL
- Accepted scorer/critic results: 1/3
- Citation validity: 0.6667
- Critic acceptance: 0.3333
- Track-alignment agreement: 1
- Confidence-ceiling compliance: 1
- Human score-band agreement: 1
- Category rating MAE: 0.3333
- Forbidden claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0

## Per-project results

| Project | Accepted | Score | Human band | Disagreement | Track |
| --- | --- | ---: | ---: | --- | --- |
| otp-secure-library | yes | 47.5 | 40–65 | no | demonstrated |
| smolagents-human-ai-library | no | n/a | 50–76 | no | unclear |
| jsx-a11y-static-checker | no | n/a | 45–72 | no | n/a |

## Disagreement analysis

- All accepted scores were inside the frozen human ranges.
