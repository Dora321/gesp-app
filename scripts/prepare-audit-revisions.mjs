import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { getPaper } from '../src/data/gesp/index.js';
import { editableFields } from './lib/five-dimension-gate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = process.env.GESP_AUDIT_CACHE || path.join(root, 'tmp/five-dimension-audit');
const run = process.env.GESP_AUDIT_RUN || '2026-11-07';
const destination = process.env.GESP_REVISION_CACHE || path.join(base, 'revisions');
for (const id of process.argv.slice(2)) {
    if (!/^\d{4}-\d{2}-l[1-8]$/.test(id)) throw new Error('非法试卷 ID');
    const review = JSON.parse(fs.readFileSync(path.join(root, 'docs/question-bank-verification/ai-reviews', run, `${id}.glm.json`)));
    const initial = JSON.parse(fs.readFileSync(path.join(root, 'docs/question-bank-verification/ai-reviews', '2026-11-07', `${id}.glm.json`)));
    const previousQuestions = [...new Map([...initial.report.questions, ...review.report.questions].map(question => [question.id, question])).values()];
    const current = await getPaper(id);
    const evidenceFile = path.join(root, 'docs/question-bank-verification', `${id}.json`);
    const evidence = fs.existsSync(evidenceFile) ? JSON.parse(fs.readFileSync(evidenceFile)) : null;
    const blockedIds = new Set((evidence?.questions || []).filter(question => question.blockedDimensions?.length).map(question => question.id));
    const all = [...new Map([...(current.questions || []), ...(current.programmingQuestions || []), ...(current.codingQuestions || [])].map(question => [question.id, question])).values()];
    const questions = [], proposals = [];
    for (const question of all) {
        const result = previousQuestions.find(item => item.id === question.id);
        if (question.sourceIntegrity || question.needsReview || !result || !blockedIds.has(question.id)) continue;
        const changes = Object.fromEntries(Object.entries(result.changes || {}).filter(([field, value]) => editableFields.has(field) && JSON.stringify(question[field]) !== JSON.stringify(value)));
        proposals.push({ id: question.id, changes, previousQuestionSha256: crypto.createHash('sha256').update(JSON.stringify(question)).digest('hex'), reviewNote: result.reviewNote });
        questions.push({ ...question, ...changes });
    }
    if (!questions.length) { console.log(`${id}: no revision candidates`); continue; }
    const dir = path.join(destination, id);
    fs.mkdirSync(dir, { recursive: true });
    const manifest = JSON.parse(fs.readFileSync(path.join(base, id, 'manifest.json')));
    for (const name of ['source.pdf', 'source.txt', ...manifest.images]) {
        if (!fs.existsSync(path.join(dir, name))) fs.symlinkSync(path.join(base, id, name), path.join(dir, name));
    }
    fs.writeFileSync(path.join(dir, 'paper.json'), JSON.stringify({ ...current, questions, programmingQuestions: undefined, codingQuestions: undefined }, null, 2));
    fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ ...manifest, candidate: true, questionIds: questions.map(question => question.id), proposals, basedOn: `${run}/${id}.glm.json`, previousReview: previousQuestions.filter(question => blockedIds.has(question.id)) }, null, 2));
    console.log(JSON.stringify({ id, questions: questions.map(question => question.id), candidateDirectory: dir }));
}
