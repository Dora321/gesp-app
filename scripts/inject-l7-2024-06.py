#!/usr/bin/env python3
# 回填 2024-06-l7 的 25 道增强解析
# 流程：读取 tmp/l7-2024-06-explanations.json → 在 .js 中把
#   explanation: "答案依据试卷标准答案；解析待补充。"
# 替换为
#   explanation: `<JSON内容>`
# 用字节级定位，避免 JS 模板字符串内反引号解析问题
import json, sys

FILE = "src/data/gesp/level7/2024-06-l7.js"
JSONF = "tmp/l7-2024-06-explanations.json"

with open(JSONF, "r", encoding="utf-8") as f:
    EXP = json.load(f)

with open(FILE, "rb") as f:
    content = f.read()

PLACEHOLDER = "explanation: \"答案依据试卷标准答案；解析待补充。\"".encode("utf-8")

count = 0
idx = 0
out = bytearray()
while True:
    p = content.find(PLACEHOLDER, idx)
    if p < 0:
        out += content[idx:]
        break
    # 复制占位符之前的部分
    out += content[idx:p]
    # 在此处插入新 explanation。需确定下一题的 id。
    # 向上搜索 id: N,
    before = content[:p]
    # 找最近的一个 id:
    id_m = None
    # 从 p 往前扫
    import re
    ids = list(re.finditer(rb'id:\s*(\d+)\s*,', before))
    if ids:
        qid = ids[-1].group(1).decode()
    else:
        qid = None
    if qid and qid in EXP:
        text = EXP[qid]
        # 构造 explanation: `<text>`
        # text 中可能含反引号，但外层用 ` 包裹，内部反引号需转义为 \`
        escaped = text.replace("`", "\\`")
        new_block = ("explanation: `" + escaped + "`").encode("utf-8")
        out += new_block
        count += 1
    else:
        # 找不到对应 id，保留原占位符
        out += PLACEHOLDER
    idx = p + len(PLACEHOLDER)

with open(FILE, "wb") as f:
    f.write(out)

print(f"回填完成：{count} 道（JSON 提供 {len(EXP)} 道）")
