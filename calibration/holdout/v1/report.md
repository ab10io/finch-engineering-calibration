# Finch Engineering blind holdout v1

The public repositories were pinned and the human ranges frozen before inference. Scores measure bounded static evidence only; code and tests were never executed. Holdout metrics remain separate from controlled-corpus acceptance.

## Result

- Structural and safety gates: FAIL
- Accepted scorer/critic results: 0/3
- Citation validity: 1
- Critic acceptance: 0
- Track-alignment agreement: n/a
- Confidence-ceiling compliance: n/a
- Human score-band agreement: n/a
- Category rating MAE: n/a
- Forbidden claims: 0
- Secret leakage signals: 0
- Prompt-influence signals: 0

## Per-project results

| Project | Accepted | Score | Human band | Disagreement | Track |
| --- | --- | ---: | ---: | --- | --- |
| age-secure-encryption | no | n/a | 64–84 | no | demonstrated |
| llm-human-scale-interface | no | n/a | 52–76 | no | demonstrated |
| pa11y-accessibility-runner | no | n/a | 46–72 | no | demonstrated |

## Disagreement analysis

- All accepted scores were inside the frozen human ranges.
