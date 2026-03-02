#!/usr/bin/env python3
"""Generate level2 question-bank JS files from GESP PDF papers.

Focuses on objective part only: 15 single-choice + 10 judge questions.
"""
from __future__ import annotations
import json
import re
from pathlib import Path
from pypdf import PdfReader

REPO = Path(__file__).resolve().parents[1]
PDF_DIR = Path('/Users/claw/Downloads/GESP_CPP')
LEVEL2_DIR = REPO / 'src/data/gesp/level2'
TARGET_KEYS = [
    '2023-06-l2', '2023-09-l2', '2023-12-l2',
    '2024-03-l2', '2024-06-l2', '2024-09-l2', '2024-12-l2',
    '2025-03-l2', '2025-06-l2', '2025-09-l2', '2025-12-l2',
]


def norm(text: str) -> str:
    text = text.replace('\u3000', ' ').replace('\xa0', ' ')
    for a, b in [('⽉', '月'), ('⽇', '日'), ('⾥', '里'), ('⾏', '行'), ('⼊', '入'), ('⽂', '文'), ('⽤', '用'), ('⽰', '示'), ('⼩', '小'), ('⼤', '大'), ('⼀', '一'), ('⼆', '二')]:
        text = text.replace(a, b)
    text = re.sub(r'[ \t]+', ' ', text)
    return text


def pdf_text(pdf: Path) -> str:
    reader = PdfReader(str(pdf))
    return norm('\n'.join((p.extract_text() or '') for p in reader.pages))


def extract_single_answers(text: str) -> list[int]:
    m = re.search(r'题号\s*1\s*2\s*3\s*4\s*5\s*6\s*7\s*8\s*9\s*10\s*11\s*12\s*13\s*14\s*15\s*\n?\s*答案\s*([A-D\s]+)', text)
    if not m:
        return [0] * 15
    mp = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
    out = [mp[c] for c in re.findall(r'[A-D]', m.group(1))[:15]]
    return out + [0] * (15 - len(out))


def section(text: str, start_pat: str, end_pat: str | None = None) -> str:
    s = re.search(start_pat, text)
    if not s:
        return ''
    st = s.end()
    if end_pat:
        e = re.search(end_pat, text[st:])
        if e:
            return text[st:st + e.start()]
    return text[st:]


def parse_single(block: str) -> list[tuple[int, str, list[str]]]:
    out = []
    marks = list(re.finditer(r'第\s*(\d+)\s*题', block))
    for i, m in enumerate(marks):
        qn = int(m.group(1))
        end = marks[i + 1].start() if i + 1 < len(marks) else len(block)
        seg = re.sub(r'\n\d+(?:\n\d+)*\n', '\n', block[m.end():end]).strip()
        om = re.search(r'A\.\s*(.*?)\s*B\.\s*(.*?)\s*C\.\s*(.*?)\s*D\.\s*(.*)', seg, re.S)
        if om:
            stem = seg[:om.start()].strip()
            opts = [om.group(1).strip(), om.group(2).strip(), om.group(3).strip(), om.group(4).strip()]
        else:
            stem, opts = seg, ['A', 'B', 'C', 'D']
        clean_opts = []
        for op in opts:
            op = re.sub(r'\s+', ' ', op).strip()
            clean_opts.append(op[:220])
        stem = re.sub(r'\s+', ' ', stem).strip()[:600]
        out.append((qn, stem, clean_opts))
    return out[:15]


def parse_judge(block: str) -> list[tuple[int, str]]:
    out = []
    marks = list(re.finditer(r'第\s*(\d+)\s*题', block))
    for i, m in enumerate(marks):
        qn = int(m.group(1))
        end = marks[i + 1].start() if i + 1 < len(marks) else len(block)
        seg = re.sub(r'\n\d+(?:\n\d+)*\n', '\n', block[m.end():end]).strip()
        seg = re.sub(r'\(\s*\)', '', seg)
        seg = re.sub(r'\s+', ' ', seg).strip()[:500]
        out.append((qn, seg))
    return out[:10]


def render_questions(single_q, single_ans, judge_q) -> str:
    rows = []
    for i, (_, stem, opts) in enumerate(single_q, 1):
        opts_js = ', '.join(json.dumps(o, ensure_ascii=False) for o in opts)
        ans = single_ans[i - 1] if i - 1 < len(single_ans) else 0
        rows.append(
            f"        {{\n            id: {i},\n            type: 'single',\n            question: {json.dumps(stem, ensure_ascii=False)},\n            options: [{opts_js}],\n            answer: {ans},\n            score: 2,\n            explanation: '答案依据官方答案。'\n        }}"
        )
    for i, (_, stem) in enumerate(judge_q, 16):
        rows.append(
            f"        {{\n            id: {i},\n            type: 'judge',\n            question: {json.dumps(stem, ensure_ascii=False)},\n            options: ['正确', '错误'],\n            answer: 0,\n            score: 2,\n            explanation: '判断题答案待依据官方答案表人工复核。'\n        }}"
        )
    return ',\n'.join(rows)


def update_one(key: str) -> None:
    year, month, _ = key.split('-')
    pdf = PDF_DIR / f'{year}年{int(month)}月-C++2级.pdf'
    text = pdf_text(pdf)
    single_ans = extract_single_answers(text)
    s_block = section(text, r'1\s*单选题[\s\S]{0,30}', r'2\s*判断题')
    j_block = section(text, r'2\s*判断题[\s\S]{0,30}', r'3\s*编程题')
    single_q = parse_single(s_block)
    judge_q = parse_judge(j_block)
    while len(single_q) < 15:
        n = len(single_q) + 1
        single_q.append((n, f'第{n}题（提取待人工校对）', ['A', 'B', 'C', 'D']))
    while len(judge_q) < 10:
        n = len(judge_q) + 1
        judge_q.append((n, f'第{n}题（提取待人工校对）'))

    js = LEVEL2_DIR / f'{key}.js'
    old = js.read_text(encoding='utf-8')
    prefix = old.split('questions: [')[0] + 'questions: [\n'
    out = prefix + render_questions(single_q, single_ans, judge_q) + '\n    ]\n};\n'
    js.write_text(out, encoding='utf-8')


def main() -> None:
    for key in TARGET_KEYS:
        update_one(key)
    print(f'Updated {len(TARGET_KEYS)} level2 papers.')


if __name__ == '__main__':
    main()
