# Inject reconstructed options into data files, replacing placeholder option arrays.
import json, re, os

GESP = 'src/data/gesp'
recon = {tuple(k.split('#')): v for k, v in json.load(open('tmp/all-reconstructed.json')).items()}
# current options (to guard: only replace if placeholder present)
cur = json.load(open('tmp/current-options.json'))

def js_escape(s, q):
    s = s.replace('\\', '\\\\').replace(q, '\\' + q)
    s = s.replace('\n', '\\n').replace('\r', '')
    return s

def format_options(opts, q, indent):
    lines = []
    for o in opts:
        lines.append(f"{indent}{q}{js_escape(o, q)}{q},")
    return '\n'.join(lines)

total_injected = 0
files_touched = set()

for level in [5, 6, 7, 8]:
    d = os.path.join(GESP, f'level{level}')
    for fn in sorted(os.listdir(d)):
        if not fn.endswith('.js'):
            continue
        pid = fn[:-3]
        if pid == 'programming' and level != 8:
            continue
        fpath = os.path.join(d, fn)
        with open(fpath, encoding='utf-8') as fh:
            content = fh.read()
        # find question blocks
        # match id: N,
        ids = list(re.finditer(r'id:\s*(\d+)\s*,', content))
        new_content = content
        # process from end to keep offsets valid
        changes = []
        for m in ids:
            qid = int(m.group(1))
            key = (pid, str(qid))
            if key not in recon:
                continue
            # find options array after this id
            start = m.end()
            om = re.search(r'options\s*:\s*\[', content[start:])
            if not om:
                continue
            arr_start = start + om.end() - 1  # position of '['
            # find matching ']'
            depth = 0
            i = arr_start
            while i < len(content):
                c = content[i]
                if c == '[':
                    depth += 1
                elif c == ']':
                    depth -= 1
                    if depth == 0:
                        break
                i += 1
            arr_end = i  # position of ']'
            # current array text
            cur_arr = content[arr_start+1:arr_end]
            # guard: must contain placeholder
            if '待补充' not in cur_arr and not re.search(r'选项[ABCD]', cur_arr):
                continue
            # detect quote style from existing option string
            qm = re.search(r'(["\']).*?\1', cur_arr)
            q = qm.group(1) if qm else '"'
            # indentation: find indent of first line inside array
            after_bracket = content[arr_start+1:]
            im = re.match(r'\n(\s*)', after_bracket)
            indent = im.group(1) if im else '        '
            new_arr = format_options(recon[key], q, indent)
            changes.append((arr_start, arr_end, new_arr))
        # apply changes from end to start
        for arr_start, arr_end, new_arr in sorted(changes, reverse=True):
            new_content = new_content[:arr_start+1] + '\n' + new_arr + '\n' + new_content[arr_end:]
            total_injected += 1
        if changes:
            with open(fpath, 'w', encoding='utf-8') as fh:
                fh.write(new_content)
            files_touched.add(fpath)

print(f"Injected {total_injected} option arrays across {len(files_touched)} files")
