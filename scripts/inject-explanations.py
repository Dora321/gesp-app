#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inject enhanced explanations into a GESP question-bank JS file.

Usage:
    python3 scripts/inject-explanations.py <questions.js> <explanations.json>

For each objective question that still contains the placeholder
explanation: "答案依据试卷标准答案；解析待补充。", find the nearest
preceding id: N within the same question block, look up the explanation for
that id, and replace the placeholder with a template-literal
explanation: `...`. Backticks inside the explanation are escaped so the
result is a valid JS template literal.
"""
import json
import re
import sys

PLACEHOLDER = "答案依据试卷标准答案；解析待补充。"

ID_RE = re.compile(r"id:\s*(\d+),")
FULL_RE = re.compile(r'explanation:\s*"' + re.escape(PLACEHOLDER) + r'"')


def escape_for_template(text):
    """Make text safe to embed inside a JS backtick template literal."""
    text = text.replace("\\", "\\\\")
    text = text.replace("`", "\\`")
    text = text.replace("${", "\\${")
    return text


def main():
    if len(sys.argv) != 3:
        print("Usage: python3 inject-explanations.py <questions.js> <explanations.json>",
              file=sys.stderr)
        sys.exit(1)

    js_path = sys.argv[1]
    json_path = sys.argv[2]

    with open(json_path, "r", encoding="utf-8") as f:
        explanations = json.load(f)

    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Locate every question id and its span.
    id_matches = list(ID_RE.finditer(content))
    n = len(id_matches)

    ops = []  # (start, end, replacement)
    injected = set()
    no_placeholder = []

    for i, m in enumerate(id_matches):
        qid = m.group(1)
        block_start = m.end()
        block_end = id_matches[i + 1].start() if i + 1 < n else len(content)
        ph = FULL_RE.search(content, block_start, block_end)
        if not ph:
            continue
        exp = explanations.get(qid)
        if exp is None:
            no_placeholder.append(qid)
            continue
        body = escape_for_template(exp)
        replacement = 'explanation: `' + body + '`'
        ops.append((ph.start(), ph.end(), replacement))
        injected.add(qid)

    # Apply replacements back-to-front to keep offsets valid.
    new_content = content
    for start, end, replacement in sorted(ops, key=lambda o: o[0], reverse=True):
        new_content = new_content[:start] + replacement + new_content[end:]

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("Injected explanations for %d questions." % len(injected))
    if no_placeholder:
        print("WARNING: no explanation in JSON for ids:",
              ", ".join(sorted(no_placeholder, key=int)))


if __name__ == "__main__":
    main()
