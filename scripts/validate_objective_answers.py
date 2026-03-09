#!/usr/bin/env python3
"""Validate the first 15 objective-answer keys in data files against official raw text.

Example:
  python3 scripts/validate_objective_answers.py \
    --data src/data/gesp/level4/2025-03-l4.js \
    --txt tmp/official/2025-03-l4/CCF-GESP-2025年3月认证-C++-4级试题.txt
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

LETTERS = "ABCD"


def load_answers_from_js(js_path: Path) -> list[str]:
    text = js_path.read_text(encoding="utf-8")
    answers = [int(x) for x in re.findall(r"answer:\s*([0-3])", text)]
    return [LETTERS[i] for i in answers[:15]]


def load_answers_from_official_txt(txt_path: Path) -> list[str]:
    text = txt_path.read_text(encoding="utf-8")
    m = re.search(r"题号\s+1\s+2\s+3\s+4\s+5\s+6\s+7\s+8\s+9\s+10\s+11\s+12\s+13\s+14\s+15\s*\n答案\s+([A-D](?:\s+[A-D]){14})", text)
    if not m:
        raise SystemExit(f"Could not find official answer key in {txt_path}")
    return m.group(1).split()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--data", required=True)
    ap.add_argument("--txt", required=True)
    args = ap.parse_args()

    data_answers = load_answers_from_js(Path(args.data))
    official_answers = load_answers_from_official_txt(Path(args.txt))

    print("# Data answers    :", " ".join(data_answers))
    print("# Official answers:", " ".join(official_answers))

    mismatches = []
    for i, (a, b) in enumerate(zip(data_answers, official_answers), start=1):
        if a != b:
            mismatches.append((i, a, b))

    if mismatches:
        print("\nMISMATCHES:")
        for i, a, b in mismatches:
            print(f"- Q{i}: data={a}, official={b}")
        return 1

    print("\nPASS: first 15 single-choice answers match official answer key.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
