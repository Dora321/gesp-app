# Parse GESP PDF: per-question option texts (line-anchored, robust).
# Usage: from scripts.pdf_options_parser import parse_pdf
import fitz, re, os

PY_DIR = os.path.join(os.path.dirname(__file__), '..', 'tmp', 'pdfs')

def parse_pdf(path):
    doc = fitz.open(path); full = ""
    for p in doc: full += p.get_text()
    doc.close()
    parts = re.split(r'第\s*(\d+)\s*题', full)
    qopts = {}
    qstem = {}
    qbody = {}  # full body text (includes code, before options)
    seen = set()
    for i in range(1, len(parts), 2):
        num = int(parts[i])
        if num in seen:
            continue  # ignore duplicate "第 N 题" markers (e.g., in programming section)
        seen.add(num)
        body = parts[i+1] if i+1 < len(parts) else ''
        # Line-anchored option extraction
        lines = body.split('\n')
        opts = {}  # letter -> text
        cur = None; buf = []
        for ln in lines:
            m = re.match(r'^\s*([A-D])[\.．、]\s*(.*)$', ln)
            if m:
                if cur is not None:
                    opts[cur] = re.sub(r'\s+', ' ', ' '.join(buf)).strip()
                cur = m.group(1); buf = [m.group(2)]
            else:
                if cur is not None:
                    buf.append(ln)
        if cur is not None:
            opts[cur] = re.sub(r'\s+', ' ', ' '.join(buf)).strip()
        # stem = text before first option line
        stem_lines = []
        for ln in lines:
            if re.match(r'^\s*[A-D][\.．、]\s*', ln):
                break
            stem_lines.append(ln)
        qstem[num] = re.sub(r'\s+', ' ', ' '.join(stem_lines)).strip()
        qbody[num] = re.sub(r'[ \t]+', ' ', '\n'.join(stem_lines)).strip()
        qopts[num] = [opts.get('A',''), opts.get('B',''), opts.get('C',''), opts.get('D','')]
    return qopts, qstem, qbody

if __name__ == '__main__':
    import sys
    pid = sys.argv[1] if len(sys.argv) > 1 else '2023-09-l6'
    qo, qs = parse_pdf(os.path.join(PY_DIR, f'{pid}.pdf'))
    print(f"Parsed {len(qo)} questions from {pid}")
    for n in [12, 14]:
        print(f"--- Q{n} ---")
        print("stem:", qs.get(n,''))
        print("opts:", qo.get(n,[]))
