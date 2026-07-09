# Build option-recovery map from official PDFs and inject text-recoverable options.
# Output: tmp/option-recovery.json  {paperId: {qid: [optA,optB,optC,optD]}}
import fitz, re, json, os

PY_DIR = 'tmp/pdfs'

def parse_pdf(path):
    doc = fitz.open(path); full = ""
    for p in doc: full += p.get_text()
    doc.close()
    parts = re.split(r'第\s*(\d+)\s*题', full)
    qopts = {}
    for i in range(1, len(parts), 2):
        num = int(parts[i]); body = parts[i+1] if i+1 < len(parts) else ''
        opts = re.findall(r'([A-D])[\.．、]\s*(.+?)(?=\n\s*[A-D][\.．、]|\n\s*第\s*\d+\s*题|\Z)', body, re.DOTALL)
        if not opts:
            opts = re.findall(r'([A-D])[\.．、]\s*(.+)', body)
        m = {}
        for L, t in opts:
            m[L] = re.sub(r'\s+', ' ', t).strip()
        qopts[num] = [m.get('A',''), m.get('B',''), m.get('C',''), m.get('D','')]
    return qopts

inv = json.load(open('tmp/missing-options-inventory.json'))
by_paper = {}
for e in inv:
    if e['type'] == 'programming-sample':
        continue
    by_paper.setdefault(e['paperId'], []).append(e)

recovery = {}
for pid, items in by_paper.items():
    pdf = f'{PY_DIR}/{pid}.pdf'
    if not os.path.exists(pdf):
        continue
    qo = parse_pdf(pdf)
    rec = {}
    for it in items:
        n = it['questionId']
        opts = qo.get(n, ['','','',''])
        # only keep entries that are non-empty
        cleaned = [o if o.strip() else None for o in opts]
        if any(c is not None for c in cleaned):
            rec[n] = cleaned
    if rec:
        recovery[pid] = rec

json.dump(recovery, open('tmp/option-recovery.json','w'), ensure_ascii=False, indent=1)
# stats
text_total = sum(1 for pid,rec in recovery.items() for qid,opts in rec.items() if any(o for o in opts))
print("Papers with recovery:", len(recovery))
print("Questions with >=1 text-recoverable option:", text_total)
