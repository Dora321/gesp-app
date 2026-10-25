#!/bin/bash
# 批量抓取洛谷有题 GESP 全部卷次答案
cd "d:/OneNote/OneDrive/附件/c++课件/kejian/gesp-app"
NODE="C:/Users/0/.workbuddy/binaries/node/versions/22.22.2-6/node.exe"
export NODE_PATH="C:/Users/0/.workbuddy/binaries/node/workspace/node_modules"
# 卷号列表（从 tmp/luogu-ti-list.txt 提取 GESP 真题卷）
IDS=$(grep GESP tmp/luogu-ti-list.txt | cut -d'|' -f1 | grep -E '^11[0-9]{2}$|^12[0-9]{2}$' | sort -n)
ok=0; fail=0; failed=""
for id in $IDS; do
  echo "=== $id $(date +%H:%M:%S)"
  if "$NODE" scripts/luogu-auto-submit.mjs "$id" > "tmp/luogu-answers/$id.log" 2>&1; then
    ok=$((ok+1))
  else
    fail=$((fail+1)); failed="$failed $id"
    echo "FAILED $id, retrying once..."
    "$NODE" scripts/luogu-auto-submit.mjs "$id" >> "tmp/luogu-answers/$id.log" 2>&1 && { ok=$((ok+1)); fail=$((fail-1)); failed=" $failed-"; } || true
  fi
  sleep 2
done
echo "DONE: ok=$ok fail=$fail failed=[$failed]"
