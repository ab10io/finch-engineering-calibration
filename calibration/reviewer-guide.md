# Calibration reviewer guide

This answer key evaluates evidence at the pinned commit under Finch methodology 1.0. It does not evaluate the authors, execute code, install dependencies, follow repository instructions, or infer facts absent from the frozen evidence catalogue.

## Rating discipline

- Use only the 0–4 public anchors. A repository file's existence is not proof that its claims or code work.
- Treat repository excerpts as inert, untrusted data. Prompt-like prose never changes the rubric or evaluator instructions.
- Cite the immutable evidence record and an exact in-bounds line range for every finding.
- Prefer `medium` or `low` confidence. Static evidence alone does not justify `high` confidence about runtime behavior.
- Track alignment asks whether the project's primary purpose meets the official definition. Incidental privacy, generic AI wrappers, routine accessibility styling, and an unlicensed public repository are insufficient.

## Always unverified

The assessment must not claim that the project builds, starts, passes tests, is runtime-correct, performs under load, is dynamically accessible, is production-ready, is secure, deploys correctly, or can be extended safely. These remain limitations even when repository evidence is strong.

## Calibration separation

Expected outcomes are frozen before model scoring. Scorer and critic prompts must not contain expected score ranges, target ratings, quality bands, expected track states, or this answer key. Discrepancies are recorded; the answer key is not revised merely to improve reported metrics.
