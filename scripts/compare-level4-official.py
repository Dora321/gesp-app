#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
import unicodedata
from dataclasses import dataclass
from difflib import SequenceMatcher
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LOCAL_DIR = ROOT / "src" / "data" / "gesp" / "level4"
OFFICIAL_DIR = ROOT / "tmp" / "official" / "l4"
REPORT_JSON = ROOT / "tmp" / "level4_official_compare.json"
REPORT_MD = ROOT / "tmp" / "level4_official_compare.md"


def normalize_text(value: str) -> str:
    value = unicodedata.normalize("NFKC", value)
    value = value.replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")
    value = value.replace("（", "(").replace("）", ")")
    value = value.replace("，", ",").replace("。", ".").replace("：", ":").replace("；", ";")
    value = value.replace("　", " ")
    value = re.sub(r"\s+", "", value)
    return value.lower()


def similarity(a: str, b: str) -> float:
    if not a and not b:
        return 1.0
    return SequenceMatcher(None, normalize_text(a), normalize_text(b)).ratio()


def parse_local_title(raw: str) -> str:
    if "#" not in raw:
        return ""
    for line in raw.strip().splitlines():
        line = line.strip()
        if line.startswith("#"):
            line = re.sub(r"^#+\s*", "", line)
            line = re.sub(r"^\[[^\]]+\]\s*", "", line)
            return line.strip()
    return ""


def extract_local(file_path: Path) -> dict:
    node_code = (
        "import { pathToFileURL } from 'url';"
        "const file = process.argv[1];"
        "const mod = await import(pathToFileURL(file).href + '?t=' + Math.random());"
        "console.log(JSON.stringify(mod.paperData));"
    )
    result = subprocess.run(
        ["node", "--input-type=module", "-e", node_code, str(file_path)],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
        cwd=ROOT,
    )
    paper = json.loads(result.stdout)
    single_questions = [q for q in paper["questions"] if q["type"] == "single"]
    judge_questions = [q for q in paper["questions"] if q["type"] == "judge"]
    programming_questions = [q for q in paper["questions"] if q["type"] == "programming"]

    return {
        "id": paper["id"],
        "title": paper["title"],
        "single_answers": "".join(chr(ord("A") + q["answer"]) for q in single_questions),
        "judge_answers": "".join("T" if q["answer"] == 0 else "F" for q in judge_questions),
        "single_questions": [q["question"] for q in single_questions],
        "judge_questions": [q["question"] for q in judge_questions],
        "programming_titles": [parse_local_title(q.get("question", "")) for q in programming_questions],
    }


def extract_official_questions(lines: list[str], start_idx: int, end_idx: int | None, expected_count: int) -> list[str]:
    questions: list[str] = []
    current: list[str] = []
    idx = start_idx
    while idx < len(lines) and (end_idx is None or idx < end_idx):
        line = lines[idx].strip()
        if re.match(r"^第\s*\d+\s*题", line):
            if current:
                questions.append(" ".join(current))
            current = [line]
        elif current:
            if re.match(r"^[A-D]\.", line):
                pass
            elif re.match(r"^\d+(\.\d+)+", line):
                pass
            elif re.match(r"^\d+$", line):
                pass
            else:
                current.append(line)
        idx += 1
    if current:
        questions.append(" ".join(current))
    return questions[:expected_count]


def find_all_indices(lines: list[str], prefix: str) -> list[int]:
    return [i for i, line in enumerate(lines) if line.startswith(prefix)]


@dataclass
class OfficialPaper:
    single_answers: str
    single_questions: list[str]
    judge_questions: list[str]
    programming_titles: list[str]


def extract_official(file_path: Path) -> OfficialPaper:
    text = file_path.read_text(encoding="utf-8", errors="ignore")
    lines = text.splitlines()

    single_answers = ""
    for line in lines[:12]:
        letters = re.findall(r"\b([A-D])\b", line)
        if len(letters) >= 10:
            single_answers = "".join(letters[:15])
            break

    headers = find_all_indices(lines, "题号 1 2 3 4 5 6 7 8 9 10")
    first_judge_header = headers[1] if len(headers) > 1 else None
    first_prog = next((i for i, line in enumerate(lines) if line.startswith("3.1 ")), None)
    second_prog = next((i for i, line in enumerate(lines) if line.startswith("3.2 ")), None)
    single_start = 4 if len(lines) > 4 else 0
    single_questions = extract_official_questions(lines, single_start, first_judge_header, 15)
    judge_questions = []
    if first_judge_header is not None and first_prog is not None:
        judge_questions = extract_official_questions(lines, first_judge_header + 1, first_prog, 10)

    programming_titles = []
    for idx in [first_prog, second_prog]:
        if idx is None:
            continue
        title = ""
        for off in range(1, 6):
            if idx + off >= len(lines):
                break
            line = lines[idx + off].strip()
            if "试题名称" in line:
                title = re.split(r"[:：]", line, maxsplit=1)[-1].strip()
                break
            if re.match(r"^3\.[12]\.\d+\s+.+", line):
                title = re.sub(r"^3\.[12]\.\d+\s+", "", line).strip()
                break
        programming_titles.append(title)

    return OfficialPaper(
        single_answers=single_answers,
        single_questions=single_questions,
        judge_questions=judge_questions,
        programming_titles=programming_titles,
    )


def main() -> int:
    local_files = sorted(p for p in LOCAL_DIR.glob("*.js") if re.match(r"\d{4}-\d{2}-l4\.js$", p.name))
    reports = []
    for local_file in local_files:
        txt_file = OFFICIAL_DIR / local_file.name.replace(".js", ".txt")
        if not txt_file.exists():
            reports.append({"file": local_file.name, "error": "missing official txt"})
            continue

        local = extract_local(local_file)
        official = extract_official(txt_file)
        single_scores = [
            round(similarity(a, b), 4)
            for a, b in zip(local["single_questions"], official.single_questions)
        ]
        judge_scores = [
            round(similarity(a, b), 4)
            for a, b in zip(local["judge_questions"], official.judge_questions)
        ]
        title_scores = [
            round(similarity(a, b), 4)
            for a, b in zip(local["programming_titles"], official.programming_titles)
        ]

        reports.append(
            {
                "file": local_file.name,
                "single_answers_local": local["single_answers"],
                "single_answers_official": official.single_answers,
                "single_answers_match": local["single_answers"] == official.single_answers,
                "single_question_count_official": len(official.single_questions),
                "judge_question_count_official": len(official.judge_questions),
                "single_similarity_min": min(single_scores) if single_scores else None,
                "single_similarity_avg": round(sum(single_scores) / len(single_scores), 4) if single_scores else None,
                "judge_similarity_min": min(judge_scores) if judge_scores else None,
                "judge_similarity_avg": round(sum(judge_scores) / len(judge_scores), 4) if judge_scores else None,
                "programming_titles_local": local["programming_titles"],
                "programming_titles_official": official.programming_titles,
                "programming_title_scores": title_scores,
            }
        )

    REPORT_JSON.write_text(json.dumps(reports, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = ["# Level 4 Official Comparison", ""]
    for item in reports:
        if "error" in item:
            lines.extend([f"## {item['file']}", f"- error: {item['error']}", ""])
            continue
        lines.extend(
            [
                f"## {item['file']}",
                f"- single answers match: {item['single_answers_match']}",
                f"- single answers local: {item['single_answers_local']}",
                f"- single answers official: {item['single_answers_official']}",
                f"- single similarity avg/min: {item['single_similarity_avg']} / {item['single_similarity_min']}",
                f"- judge similarity avg/min: {item['judge_similarity_avg']} / {item['judge_similarity_min']}",
                f"- programming titles local: {item['programming_titles_local']}",
                f"- programming titles official: {item['programming_titles_official']}",
                f"- programming title scores: {item['programming_title_scores']}",
                "",
            ]
        )
    REPORT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {REPORT_JSON}")
    print(f"wrote {REPORT_MD}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
