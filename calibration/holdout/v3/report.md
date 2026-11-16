# Finch Engineering blind holdout v1

The public repositories were pinned and the human ranges frozen before inference. Scores measure bounded static evidence only; code and tests were never executed. Holdout metrics remain separate from controlled-corpus acceptance.

## Result

- Structural and safety gates: FAIL
- Accepted scorer/critic results: 2/3
- Citation validity: 1
- Critic acceptance: 0.6667
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
| gosec-security-checker | no | n/a | 55–80 | no | demonstrated |
| swarm-human-ai-framework | yes | 42.5 | 32–60 | no | demonstrated |
| p-map-open-source-tool | yes | 45 | 42–65 | no | demonstrated |

## Disagreement analysis

- All accepted scores were inside the frozen human ranges.
