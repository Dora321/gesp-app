#!/usr/bin/env node
// Exports a paper PDF's embedded images and reports which questions appear on
// each page, so code listings that exist only as images can be transcribed.
//
// Official PDFs render code as images with no text layer. pypdf can pull those
// image objects out directly, which avoids needing poppler to rasterise pages.
//
// Usage: node scripts/extract-pdf-images.mjs <paperId>
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const paperId = process.argv[2];
if (!/^\d{4}-\d{2}-l\d$/.test(paperId || '')) {
  console.error('Usage: node scripts/extract-pdf-images.mjs <paperId>');
  process.exit(1);
}

const { paperMeta } = await import(pathToFileURL(path.join(root, 'src/data/gesp/_generated.js')).href);
const { paperSources } = await import(pathToFileURL(path.join(root, 'src/data/gesp/paperSources.js')).href);

const cacheDir = path.join(os.tmpdir(), 'gesp-pdf-cache');
fs.mkdirSync(cacheDir, { recursive: true });
const pdfPath = path.join(cacheDir, `${paperId}.pdf`);
if (!fs.existsSync(pdfPath)) {
  const url = paperSources[paperId].officialUrl || paperSources[paperId].mirrorUrl;
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120000) });
  fs.writeFileSync(pdfPath, Buffer.from(await res.arrayBuffer()));
}

const outDir = path.join(cacheDir, 'imgs', paperId);
fs.mkdirSync(outDir, { recursive: true });

const PY = `
import sys, re, json, pypdf
sys.stdout.reconfigure(errors='replace')
pdf, outdir = sys.argv[1], sys.argv[2]
r = pypdf.PdfReader(pdf)
pages = []
for pi, p in enumerate(r.pages):
    text = p.extract_text() or ''
    qs = [int(x) for x in re.findall(r'第\\s*(\\d+)\\s*题', text)]
    names = []
    try:
        for im in p.images:
            fn = '%s/p%02d_%s' % (outdir, pi + 1, im.name)
            open(fn, 'wb').write(im.data)
            names.append({'file': fn, 'bytes': len(im.data)})
    except Exception as e:
        pass
    pages.append({'page': pi + 1, 'questions': qs, 'images': names})
print(json.dumps(pages, ensure_ascii=False))
`;
const pyPath = path.join(cacheDir, '_imgs.py');
fs.writeFileSync(pyPath, PY, 'utf8');
const raw = execFileSync('python3', [pyPath, pdfPath, outDir], { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
const pages = JSON.parse(raw.trim().split('\n').pop());

// Which questions still lack their code image?
const dataFile = path.join(root, 'src/data/gesp', `level${paperMeta[paperId].level}`, `${paperId}.js`);
const { paperData } = await import(pathToFileURL(dataFile).href);
const needing = new Set((paperData.questions || [])
  .filter((q) => q.sourceIntegrity === 'missing-figure')
  .map((q) => Number(q.id)));

console.log(`--- ${paperId} ---`);
console.log(`Questions still missing their code image: ${[...needing].join(', ') || '(none)'}`);
console.log('');
for (const p of pages) {
  if (p.images.length === 0) continue;
  const hits = p.questions.filter((q) => needing.has(q));
  // Tiny images on page 1 are the CCF/GESP letterhead, not question content.
  const meaningful = p.images.filter((im) => im.bytes > 3000);
  console.log(`page ${p.page} | questions: ${p.questions.join(',') || '-'} | needing: ${hits.join(',') || '-'}`);
  for (const im of meaningful) console.log(`    ${im.file}  (${(im.bytes / 1024).toFixed(0)}KB)`);
}
console.log(`\nImages written under ${outDir}`);
