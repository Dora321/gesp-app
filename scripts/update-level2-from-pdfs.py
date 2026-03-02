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
    # common CJK compatibility glyphs / OCR variants
    rep = {
        '⽉': '月', '⽇': '日', '⾥': '里', '⾏': '行', '⼊': '入', '⽂': '文', '⽤': '用',
        '⽰': '示', '⼩': '小', '⼤': '大', '⼀': '一', '⼆': '二', '⽗': '父', '⺟': '母',
        '，': '，', '。': '。', '（': '（', '）': '）',
    }
    for a, b in rep.items():
        text = text.replace(a, b)
    text = text.replace('．', '.').replace('、', '.')
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\r', '\n', text)
    return text


def pdf_text(pdf: Path) -> str:
    reader = PdfReader(str(pdf))
    return norm('\n'.join((p.extract_text() or '') for p in reader.pages))


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


def strip_noise(s: str) -> str:
    lines = [ln.strip() for ln in s.splitlines()]
    out = []
    for ln in lines:
        if not ln:
            continue
        if re.fullmatch(r'\d+', ln):
            continue
        if 'C++ 二级' in ln or re.search(r'20\d{2} 年 ?\d{1,2} 月', ln):
            continue
        if '图1' in ln or '图 1' in ln:
            continue
        out.append(ln)
    x = '\n'.join(out)
    # remove line-number ladders embedded in code blocks
    x = re.sub(r'(?:\n\d+){4,}', '', x)
    x = re.sub(r'\s+', ' ', x).strip()
    return x


def clean_stem(stem: str, max_len: int = 240) -> str:
    s = strip_noise(stem)
    # remove duplicated leading numbering artefacts like "6. 执行..."
    s = re.sub(r'^\d+[.、]\s*', '', s)
    s = re.sub(r'（\s*\)|\(\s*\)', '（ ）', s)
    s = re.sub(r'\s+', ' ', s).strip()
    if len(s) > max_len:
        s = s[:max_len].rstrip(' ，,;；:：') + '…'
    if s and s[-1] not in '。？！）】」…':
        s += '。'
    return s


def clean_option(opt: str) -> str:
    s = strip_noise(opt)
    s = re.sub(r'\s+', ' ', s).strip()
    if len(s) > 140:
        s = s[:140].rstrip() + '…'
    return s or '（选项提取异常）'


def split_questions(block: str, limit: int) -> list[tuple[int, str]]:
    marks = list(re.finditer(r'第\s*(\d+)\s*题', block))
    out: list[tuple[int, str]] = []
    for i, m in enumerate(marks):
        qn = int(m.group(1))
        end = marks[i + 1].start() if i + 1 < len(marks) else len(block)
        seg = block[m.end():end]
        out.append((qn, seg))
    return out[:limit]


def parse_single(block: str) -> list[tuple[int, str, list[str]]]:
    out = []
    for qn, seg in split_questions(block, 15):
        seg = strip_noise(seg)
        # robust A/B/C/D matcher; greedy split by first complete option chain
        om = re.search(
            r'A\s*[\.．、:]\s*(.*?)\s*B\s*[\.．、:]\s*(.*?)\s*C\s*[\.．、:]\s*(.*?)\s*D\s*[\.．、:]\s*(.*)$',
            seg,
            re.S,
        )
        if om:
            stem = clean_stem(seg[:om.start()])
            opts = [clean_option(om.group(1)), clean_option(om.group(2)), clean_option(om.group(3)), clean_option(om.group(4))]
        else:
            # fallback: keep concise stem and placeholders
            stem = clean_stem(seg)
            opts = ['A', 'B', 'C', 'D']
        out.append((qn, stem, opts))
    return out


def parse_judge(block: str) -> list[tuple[int, str]]:
    out = []
    for qn, seg in split_questions(block, 10):
        seg = re.sub(r'（\s*\)|\(\s*\)', '', seg)
        out.append((qn, clean_stem(seg, max_len=180)))
    return out


def extract_single_answers(text: str) -> list[int]:
    m = re.search(
        r'题号\s*1\s*2\s*3\s*4\s*5\s*6\s*7\s*8\s*9\s*10\s*11\s*12\s*13\s*14\s*15\s*\n?\s*答案\s*([A-D\s]+)',
        text,
    )
    if not m:
        return [0] * 15
    mp = {'A': 0, 'B': 1, 'C': 2, 'D': 3}
    out = [mp[c] for c in re.findall(r'[A-D]', m.group(1))[:15]]
    return out + [0] * (15 - len(out))


def extract_judge_answers(text: str) -> list[int]:
    """Return 10 answers in index form (0=正确,1=错误) when highly confident, else all 0."""
    # Typical patterns might include 对/错 or √/× near 判断题 answer table.
    zone = section(text, r'2\s*判断题', r'3\s*编程题')
    zone = zone[:2000]
    # Strongly anchored table-like capture
    m = re.search(r'题号\s*1\s*2\s*3\s*4\s*5\s*6\s*7\s*8\s*9\s*10\s*\n?\s*答案\s*([对错√×TFtf\s]{10,80})', zone)
    if not m:
        return [0] * 10
    tokens = re.findall(r'[对错√×TFtf]', m.group(1))
    if len(tokens) < 10:
        return [0] * 10
    tokens = tokens[:10]
    mp = {'对': 0, '√': 0, 'T': 0, 't': 0, '错': 1, '×': 1, 'F': 1, 'f': 1}
    if any(t not in mp for t in tokens):
        return [0] * 10
    return [mp[t] for t in tokens]


def tags_for(stem: str, qtype: str) -> list[str]:
    s = stem.lower()
    tags = []
    def add(t: str):
        if t not in tags:
            tags.append(t)

    if qtype == 'judge':
        add('判断题')

    if any(k in s for k in ['for', 'while', '循环', 'break', 'continue']):
        add('循环')
    if any(k in s for k in ['if', 'else', '条件', '闰年', '逻辑', '&&', '||']):
        add('条件判断')
    if any(k in s for k in ['switch', 'case']):
        add('分支结构')
    if any(k in s for k in ['cout', 'cin', '输出', '输入']):
        add('输入输出')
    if any(k in s for k in ['变量', '标识符', '命名']):
        add('变量与标识符')
    if any(k in s for k in ['%', '整除', '余数', '倍数']):
        add('运算符')
    if any(k in s for k in ['质数', '素数']):
        add('数学逻辑')
    if any(k in s for k in ['流程图', '算法', '代码', '程序']):
        add('程序分析')

    if not tags:
        add('基础语法')
    return tags[:3]


def render_questions(single_q, single_ans, judge_q, judge_ans) -> str:
    rows = []

    single_map = {qn: (stem, opts) for qn, stem, opts in single_q}
    for i in range(1, 16):
        stem, opts = single_map.get(i, (f'第{i}题（提取待人工校对）', ['A', 'B', 'C', 'D']))
        opts_js = ', '.join(json.dumps(o, ensure_ascii=False) for o in opts)
        tags_js = ', '.join(json.dumps(t, ensure_ascii=False) for t in tags_for(stem, 'single'))
        ans = single_ans[i - 1] if i - 1 < len(single_ans) else 0
        rows.append(
            f"        {{\n            id: {i},\n            type: 'single',\n            question: {json.dumps(stem, ensure_ascii=False)},\n            options: [{opts_js}],\n            answer: {ans},\n            score: 2,\n            explanation: '答案依据官方答案。',\n            tags: [{tags_js}]\n        }}"
        )

    judge_map = {qn: stem for qn, stem in judge_q}
    for i in range(1, 11):
        stem = judge_map.get(i, f'第{i}题（提取待人工校对）')
        tags_js = ', '.join(json.dumps(t, ensure_ascii=False) for t in tags_for(stem, 'judge'))
        ans = judge_ans[i - 1] if i - 1 < len(judge_ans) else 0
        if ans in (0, 1) and judge_ans != [0] * 10:
            exp = '判断题答案依据官方答案。'
        else:
            ans = 0
            exp = '判断题答案待复核（待复核）。'
        qid = i + 15
        rows.append(
            f"        {{\n            id: {qid},\n            type: 'judge',\n            question: {json.dumps(stem, ensure_ascii=False)},\n            options: ['正确', '错误'],\n            answer: {ans},\n            score: 2,\n            explanation: {json.dumps(exp, ensure_ascii=False)},\n            tags: [{tags_js}]\n        }}"
        )
    return ',\n'.join(rows)


def update_one(key: str) -> None:
    year, month, _ = key.split('-')
    pdf = PDF_DIR / f'{year}年{int(month)}月-C++2级.pdf'
    text = pdf_text(pdf)

    single_ans = extract_single_answers(text)
    judge_ans = extract_judge_answers(text)

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
    out = prefix + render_questions(single_q, single_ans, judge_q, judge_ans) + '\n    ]\n};\n'
    js.write_text(out, encoding='utf-8')


def main() -> None:
    for key in TARGET_KEYS:
        update_one(key)
    print(f'Updated {len(TARGET_KEYS)} level2 papers.')


if __name__ == '__main__':
    main()
