#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inject the regenerated L8 explanations into the data files.
For each (paperId, qid) in tmp/l8-merged.json, locate the question's
`explanation: ` template literal and replace its inner content with the
new text (backticks and ${ escaped for JS template literals).
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
L8 = os.path.join(ROOT, 'src', 'data', 'gesp', 'level8')
MERGED = os.path.join(ROOT, 'tmp', 'l8-merged.json')
OUT_SUMMARY = os.path.join(ROOT, 'tmp', 'l8-inject-summary.txt')

merged = json.load(open(MERGED, encoding='utf-8'))
# group by paperId
by_file = {}
for k, text in merged.items():
    pid, qid = k.split('#')
    by_file.setdefault(pid, {})[int(qid)] = text

def escape(s):
    # escape backticks and ${ for JS template literal
    s = s.replace('\\', '\\\\')   # backslash first
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    return s

total_injected = 0
misses = []
for fn in sorted(os.listdir(L8)):
    if not re.match(r'^\d{4}-\d{2}-l8\.js$', fn):
        continue
    fp = os.path.join(L8, fn)
    pid = fn[:-3]
    targets = by_file.get(pid)
    if not targets:
        continue
    src = open(fp, encoding='utf-8').read()
    lines = src.split('\n')
    out_lines = []
    cur_id = None
    i = 0
    n = len(lines)
    injected_here = set()
    while i < n:
        line = lines[i]
        m_id = re.search(r'^\s*id:\s*(\d+),', line)
        if m_id:
            cur_id = int(m_id.group(1))
        m_exp = re.search(r'explanation:\s*`', line)
        if m_exp and cur_id in targets and cur_id not in injected_here:
            # find the matching closing backtick (template literal may span lines)
            # build the new line: prefix + backtick + escaped text + backtick + suffix(rest of line after opening backtick)
            prefix = line[:m_exp.end()]  # include the opening backtick
            rest = line[m_exp.end():]  # after opening backtick
            # find closing backtick in rest (skip escaped \`)
            collected = []
            j = i
            # we need to consume from rest onward
            buf = rest
            close_idx = -1
            k = 0
            while k < len(buf):
                c = buf[k]
                if c == '\\':
                    k += 2
                    continue
                if c == '`':
                    close_idx = k
                    break
                k += 1
            if close_idx == -1:
                # closing backtick on a later line; gather lines
                collected.append(buf)
                j = i + 1
                while j < n:
                    l2 = lines[j]
                    kk = 0
                    while kk < len(l2):
                        c = l2[kk]
                        if c == '\\':
                            kk += 2
                            continue
                        if c == '`':
                            close_idx2 = kk
                            # append l2 up to before closing backtick
                            collected.append(l2[:close_idx2])
                            # remaining after backtick is suffix
                            suffix = l2[close_idx2+1:]
                            new_text = escape(targets[cur_id])
                            new_line0 = prefix + new_text + '`' + suffix
                            out_lines.append(new_line0)
                            injected_here.add(cur_id)
                            i = j + 1
                            break
                        kk += 1
                    else:
                        collected.append(l2)
                        j += 1
                        continue
                    break
                else:
                    # never found — should not happen
                    out_lines.append(line)
                    i += 1
                    break
            else:
                # closing backtick on same line
                suffix = buf[close_idx+1:]
                new_text = escape(targets[cur_id])
                new_line = prefix + new_text + '`' + suffix
                out_lines.append(new_line)
                injected_here.add(cur_id)
                i += 1
                continue
        else:
            out_lines.append(line)
            i += 1
    # check misses
    for qid in targets:
        if qid not in injected_here:
            misses.append((pid, qid))
    open(fp, 'w', encoding='utf-8').write('\n'.join(out_lines))
    total_injected += len(injected_here)
    print(f"{fn}: injected {len(injected_here)}/{len(targets)}")

print(f"\nTOTAL injected: {total_injected}")
if misses:
    print(f"MISSES ({len(misses)}):")
    for m in misses:
        print("  ", m)
else:
    print("No misses.")
with open(OUT_SUMMARY, 'w', encoding='utf-8') as f:
    f.write(f"injected={total_injected}\nmisses={len(misses)}\n")
