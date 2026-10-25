#!/usr/bin/env bash
# 批量抓取洛谷有题「差异卷」的题面（用于客观题差异终裁）
set -u
cd "$(dirname "$0")/.." || exit 1
NODE_EXE="C:/Users/0/.workbuddy/binaries/node/versions/22.22.2-6/node.exe"
export NODE_PATH="C:/Users/0/.workbuddy/binaries/node/workspace/node_modules"
OUT_DIR="tmp/luogu-stems"
mkdir -p "$OUT_DIR"

MAP_FILE="tmp/luogu-pid-map.json"
PIDS_FILE="tmp/luogu-diff-pids.txt"

while IFS= read -r pid; do
  [ -z "$pid" ] && continue
  out="$OUT_DIR/$pid.txt"
  if [ -s "$out" ] && grep -q "第 1 题" "$out" 2>/dev/null; then
    echo "skip $pid"
    continue
  fi
  lid=$("$NODE_EXE" -e "const m=require('./$MAP_FILE');process.stdout.write(m['$pid']||'')")
  if [ -z "$lid" ]; then echo "NO-MAP $pid"; continue; fi
  "$NODE_EXE" scripts/fetch-luogu-ti.mjs "$lid" "$out" training >/dev/null 2>&1
  if grep -q "第 1 题" "$out" 2>/dev/null; then
    echo "ok $pid (luogu $lid) $(wc -c < "$out") bytes"
  else
    echo "FAIL $pid (luogu $lid)"
  fi
done < "$PIDS_FILE"
echo "DONE $(ls "$OUT_DIR" | wc -l) files"
