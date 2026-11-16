#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
input_root="$repo_root/calibration/v4/scoring-inputs"
workspace_root="$repo_root/calibration/v4/scoring-workspace"
scorer_model="${FINCH_CODEX_MODEL:-gpt-6.1-sol}"
critic_model="${FINCH_CODEX_CRITIC_MODEL:-gpt-6.1-terra}"
concurrency="${FINCH_CODEX_CONCURRENCY:-2}"

[[ -d "$input_root" ]] || { echo "Run prepare-v4-scoring-inputs.mjs first." >&2; exit 1; }
[[ "$concurrency" =~ ^[1-4]$ ]] || { echo "FINCH_CODEX_CONCURRENCY must be 1-4." >&2; exit 1; }

run_pair() {
  fixture_dir="$1"; fixture="$2"; run="$3"; workdir="$workspace_root/$fixture/run-$run"
  mkdir -p "$workdir"
  cp "$fixture_dir/context.json" "$workdir/context.json"
  cp "$fixture_dir/evidence.json" "$workdir/evidence.json"
  cp "$repo_root/calibration/v4/prompts/scorer-v2.md" "$workdir/scorer.md"
  cp "$repo_root/calibration/v4/prompts/critic-v2.md" "$workdir/critic.md"
  cp "$repo_root/calibration/production-assessment.schema.json" "$workdir/assessment-schema.json"
  cp "$repo_root/calibration/critic.schema.json" "$workdir/critic-schema.json"
  if [[ ! -s "$workdir/assessment.json" ]]; then
    echo "SCORER start $fixture run-$run"
    codex exec --ephemeral --ignore-user-config --ignore-rules --skip-git-repo-check -C "$workdir" -s read-only -m "$scorer_model" --color never --output-schema "$workdir/assessment-schema.json" -o "$workdir/assessment.json" "Read scorer.md and follow it exactly. This is isolated scoring run $run. Return only JSON." >"$workdir/scorer.log" 2>&1
  fi
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$workdir/assessment.json"
  if [[ ! -s "$workdir/critic.json" ]]; then
    echo "CRITIC start $fixture run-$run"
    codex exec --ephemeral --ignore-user-config --ignore-rules --skip-git-repo-check -C "$workdir" -s read-only -m "$critic_model" --color never --output-schema "$workdir/critic-schema.json" -o "$workdir/critic.json" 'Read critic.md and follow it exactly. Independently audit assessment.json. Return only JSON.' >"$workdir/critic.log" 2>&1
  fi
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$workdir/critic.json"
  echo "DONE $fixture run-$run"
}

pids=()
wait_batch() { for pid in "${pids[@]}"; do wait "$pid"; done; pids=(); }
for fixture_dir in "$input_root"/*; do
  fixture="$(basename "$fixture_dir")"
  for run in 1 2 3; do
    run_pair "$fixture_dir" "$fixture" "$run" & pids+=("$!")
    [[ "${#pids[@]}" -lt "$concurrency" ]] || wait_batch
  done
done
[[ "${#pids[@]}" -eq 0 ]] || wait_batch
