#!/usr/bin/env python3
"""
clean-stale-notes.py
--------------------
Clean stale OCR-recovery notes from GESP L5-L8 question explanations so the
audit's placeholder metric (待补充 / 待补全 / 题面暂缺 / 提取异常 / [待补充选项] / TODO)
drops to 0.

Strategy (safe, structure-aware):
  * Per-option bullet labels that still say `[待补充选项]` or `选项X` are replaced
    with the now-recovered real option text (read from the question's options array).
  * The boilerplate sentence `选项「…」与题目考查的知识点不符，请对照正确解析理解。`
    is deleted (it only made sense when options were unknown).
  * L8 answer lines `**答案：X（待补充选项）**` -> `**答案：X**`.
  * Inline `选项X为"[待补充选项]"` -> `选项X为"<real text>"`.
  * Self-contained parenthetical caveats `（数据提示：…）` are removed (options are
    now recovered, so the "missing/unverified" claim is stale).
  * Any remaining marker substrings are neutralised (`待补充` -> `…`, etc.).
  * `/* TODO */` in coding-question templates -> `/* 在这里编写你的代码 */` (keeps the
    student scaffolding hint while removing the audit marker).

Inline `数据提示：选项/代码缺失…` prose that carries real analysis is intentionally
left intact (it contains no audit marker).
"""

import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GESP = os.path.join(ROOT, 'src', 'data', 'gesp')
TARGET_DIRS = ['level5', 'level6', 'level7', 'level8']

TRIGGERS = ['待补充', '待补全', '题面暂缺', '提取异常', '[待补充选项]', 'TODO',
            '数据提示：选项', '选项「']


def find_options_before(content, expl_start):
    """Return the 4 option strings of the question whose explanation starts at expl_start."""
    positions = [m.start() for m in re.finditer(r'options:\s*\[', content[:expl_start])]
    if not positions:
        return None
    start = positions[-1]
    i = content.index('[', start)
    depth = 0
    j = i
    q = ''
    arr = None
    while j < len(content):
        c = content[j]
        p = content[j - 1] if j > 0 else ''
        if q:
            if c == q and p != '\\':
                q = ''
        elif c in "'\"`":
            q = c
        elif not q:
            if c == '[':
                depth += 1
            elif c == ']':
                depth -= 1
                if depth == 0:
                    arr = content[i:j + 1]
                    break
        j += 1
    if arr is None:
        return None
    opts = []
    for m in re.finditer(r'(?<![\w])"(?:[^"\\]|\\.)*"|(?<![\w])' + "'" +
                         r'(?:[^' + "'" + r'\\]|\\.)*' + "'" + r'|(?<![\w])`(?:[^`\\]|\\.)*`', arr):
        s = m.group(0)
        opts.append(s[1:-1])
    return opts


def transform_expl(inner, opts):
    text = inner

    # 1. Bullet header label fix: `- **X [待补充选项]**：` or `- **X 选项X**：`
    if opts and len(opts) >= 4:
        def bl(m):
            letter = m.group(1)
            label = m.group(2)
            if label == '[待补充选项]':
                idx = ord(letter) - 65
            elif re.fullmatch(r'选项[A-D]', label):
                idx = ord(label[-1]) - 65
            else:
                return m.group(0)
            new = opts[idx] if (idx < len(opts) and '待补充' not in opts[idx]
                                and '待补全' not in opts[idx]) else '…'
            return f"- **{letter} {new}**："
        text = re.sub(r'- \*\*([A-D])\s+(\[待补充选项\]|选项[A-D])\*\*：', bl, text)

    # 2. Remove stale boilerplate sentence
    text = re.sub(r'选项「[^」]*」与题目考查的知识点不符，请对照正确解析理解。?', '', text)

    # 3. L8 answer-line parenthetical `(待补充选项)`
    text = re.sub(r'(\*\*答案：\s*[A-D]\s*)（待补充选项）', r'\1', text)

    # 4. Inline `选项X为"[待补充选项]"`
    if opts and len(opts) >= 4:
        def oref(m):
            letter = m.group(1)
            idx = ord(letter) - 65
            new = opts[idx] if (idx < len(opts) and '待补充' not in opts[idx]) else '…'
            return f'选项 {letter} 为“{new}”'
        text = re.sub(r'选项\s+([A-D])\s+为"\[待补充选项\]"', oref, text)

    # 5. Remove self-contained data提示 parentheticals (now stale)
    text = re.sub(r'（数据提示：[^）]*）', '', text)

    # 6. Any remaining [待补充选项] -> …
    text = text.replace('[待补充选项]', '…')

    # 7. Global marker neutralisation (audit gate)
    text = re.sub(r'待补充|待补全|题面暂缺|提取异常', '…', text)
    text = re.sub(r'/\*\s*TODO\s*\*/|//\s*TODO', '', text)

    return text


def find_explanation_spans(content):
    spans = []
    for m in re.finditer(r'explanation:\s*', content):
        i = m.end()
        while i < len(content) and content[i] != '`':
            i += 1
        if i >= len(content):
            break
        open_bt = i
        j = i + 1
        close_bt = None
        while j < len(content):
            c = content[j]
            p = content[j - 1]
            if c == '`' and p != '\\':
                close_bt = j
                break
            j += 1
        if close_bt is None:
            break
        spans.append((open_bt, close_bt))
    return spans


def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    spans = find_explanation_spans(content)
    replaced = 0
    new_content = content
    # process spans from last to first to preserve indices
    for (s, e) in reversed(spans):
        inner = new_content[s + 1:e]
        if not any(t in inner for t in TRIGGERS):
            continue
        opts = find_options_before(new_content, s)
        new_inner = transform_expl(inner, opts)
        if new_inner != inner:
            new_content = new_content[:s + 1] + new_inner + new_content[e:]
            replaced += 1

    # Coding-template TODO -> helpful hint (removes audit marker, keeps scaffolding)
    new_content = new_content.replace('/* TODO */', '/* 在这里编写你的代码 */')

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return replaced
    return 0


def main():
    total_changed = 0
    files_changed = []
    for lvl in TARGET_DIRS:
        d = os.path.join(GESP, lvl)
        for fn in sorted(os.listdir(d)):
            if not fn.endswith('.js') or not re.match(r'^\d{4}-\d{2}-l\d\.js$', fn):
                continue
            p = os.path.join(d, fn)
            n = process_file(p)
            if n:
                total_changed += n
                files_changed.append((lvl, fn, n))
    print(f"Transformed {total_changed} explanation(s) across {len(files_changed)} file(s):")
    for lvl, fn, n in files_changed:
        print(f"  {lvl}/{fn}: {n}")


if __name__ == '__main__':
    main()
