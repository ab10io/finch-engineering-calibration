#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
input_root="$repo_root/calibration/scoring-inputs"
workspace_root="$repo_root/calibration/scoring-workspace"
model_id="${FINCH_CODEX_MODEL:-gpt-6.1-sol}"
concurrency="${FINCH_CODEX_CONCURRENCY:-2}"

if [[ ! -d "$input_root" ]]; then
  echo "Run node scripts/prepare-scoring-inputs.mjs first." >&2
  exit 1
fi
if [[ ! "$concurrency" =~ ^[1-4]$ ]]; then
  echo "FINCH_CODEX_CONCURRENCY must be between 1 and 4." >&2
  exit 1
fi

run_pair() {
    fixture_dir="$1"
    fixture="$2"
    run="$3"
    workdir="$workspace_root/$fixture/run-$run"
    mkdir -p "$workdir"
    cp "$fixture_dir/context.json" "$workdir/context.json"
    cp "$fixture_dir/evidence.json" "$workdir/evidence.json"
    cp "$repo_root/calibration/prompts/scorer-v1.md" "$workdir/scorer.md"
    cp "$repo_root/calibration/prompts/critic-v1.md" "$workdir/critic.md"
    cp "$repo_root/calibration/production-assessment.schema.json" "$workdir/assessment-schema.json"
    cp "$repo_root/calibration/critic.schema.json" "$workdir/critic-schema.json"

    if [[ ! -s "$workdir/assessment.json" ]]; then
      echo "SCORER start $fixture run-$run"
      codex exec --ephemeral --ignore-user-config --ignore-rules --skip-git-repo-check \
        -C "$workdir" -s read-only -m "$model_id" --color never \
        --output-schema "$workdir/assessment-schema.json" -o "$workdir/assessment.json" \
        "Read scorer.md and follow it exactly. This is scoring run $run. Return only the required JSON." \
        >"$workdir/scorer.log" 2>&1
    else
      echo "SCORER reuse $fixture run-$run"
    fi
    node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$workdir/assessment.json"

    if [[ ! -s "$workdir/critic.json" ]]; then
      echo "CRITIC start $fixture run-$run"
      codex exec --ephemeral --ignore-user-config --ignore-rules --skip-git-repo-check \
        -C "$workdir" -s read-only -m "$model_id" --color never \
        --output-schema "$workdir/critic-schema.json" -o "$workdir/critic.json" \
        'Read critic.md and follow it exactly. Independently audit assessment.json. Return only the required JSON.' \
        >"$workdir/critic.log" 2>&1
    else
      echo "CRITIC reuse $fixture run-$run"
    fi
    node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$workdir/critic.json"
    echo "DONE $fixture run-$run"
}

pids=()
wait_batch() {
  for pid in "${pids[@]}"; do
    wait "$pid"
  done
  pids=()
}

for fixture_dir in "$input_root"/*; do
  fixture="$(basename "$fixture_dir")"
  for run in 1 2 3; do
    run_pair "$fixture_dir" "$fixture" "$run" &
    pids+=("$!")
    if [[ "${#pids[@]}" -ge "$concurrency" ]]; then
      wait_batch
    fi
  done
done
if [[ "${#pids[@]}" -gt 0 ]]; then
  wait_batch
fi
