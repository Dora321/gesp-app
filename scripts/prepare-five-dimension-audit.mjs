import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getPaper } from '../src/data/gesp/index.js';
import { paperIds } from '../src/data/gesp/_generated.js';
import { paperSources } from '../src/data/gesp/paperSources.js';
import { resolveVerification } from '../src/data/gesp/verificationModel.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = process.env.GESP_AUDIT_CACHE || path.join(root, 'tmp/five-dimension-audit');
const requested = process.argv.slice(2);
fs.mkdirSync(cache, { recursive: true });
const inventory = [];
for (const id of paperIds) {
    if (paperSources[id]?.unofficial) continue;
    const paper = await getPaper(id);
    const verification = resolveVerification(paper);
    if (verification.status !== 'verified') inventory.push({ id, dimensions: verification.dimensions, coverage: verification.coverage, hasPinnedSource: Boolean(paperSources[id]?.mirrorSha) });
}
fs.writeFileSync(path.join(cache, 'inventory.json'), JSON.stringify(inventory, null, 2));
const ids = requested.length ? requested : inventory.map(paper => paper.id);
for (const id of ids) {
    if (!paperIds.includes(id)) throw new Error(`Unknown paper: ${id}`);
    const source = paperSources[id];
    if (!source?.mirrorUrl || !source.mirrorSha) {
        console.log(JSON.stringify({ id, status: 'needs-pinned-source' }));
        continue;
    }
    const dir = path.join(cache, id);
    fs.mkdirSync(dir, { recursive: true });
    const pdfPath = path.join(dir, 'source.pdf');
    const response = fs.existsSync(pdfPath) ? null : await fetch(source.mirrorUrl);
    if (response && !response.ok) throw new Error(`${id}: HTTP ${response.status}`);
    const bytes = response ? Buffer.from(await response.arrayBuffer()) : fs.readFileSync(pdfPath);
    const blobSha = crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (blobSha !== source.mirrorSha) throw new Error(`${id}: source SHA mismatch; no review allowed`);
    fs.writeFileSync(pdfPath, bytes);
    const paper = await getPaper(id);
    const questions = [...new Map([
        ...(paper.questions || []), ...(paper.programmingQuestions || []), ...(paper.codingQuestions || []),
    ].map(question => [question.id, question])).values()];
    fs.writeFileSync(path.join(dir, 'paper.json'), JSON.stringify({ ...paper, questions, programmingQuestions: undefined, codingQuestions: undefined }, null, 2));
    execFileSync('pdftotext', ['-layout', pdfPath, path.join(dir, 'source.txt')]);
    if (!fs.readdirSync(dir).some(file => /^page-\d+\.jpg$/.test(file))) {
        execFileSync('pdftoppm', ['-r', '144', '-jpeg', '-jpegopt', 'quality=85', pdfPath, path.join(dir, 'page')], { timeout: 120000 });
    }
    const images = fs.readdirSync(dir).filter(file => /^page-\d+\.jpg$/.test(file)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
    const manifest = { paperId: id, source: { ...source, shaVerified: true, sha256: crypto.createHash('sha256').update(bytes).digest('hex') }, images, questionIds: questions.map(question => question.id), preparedAt: new Date().toISOString() };
    fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log(JSON.stringify({ id, status: 'prepared', pages: images.length, questions: questions.length, shaVerified: true }));
}
