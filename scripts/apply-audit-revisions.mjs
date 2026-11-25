import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { getPaper } from '../src/data/gesp/index.js';
import { gateQuestionReview } from './lib/five-dimension-gate.mjs';
import { checkProgram } from './collect-five-dimension-review.mjs';
import { resolveAppliedSourcePage } from './lib/resolve-applied-source-page.mjs';

const require = createRequire(import.meta.url);
const { parse } = require('@babel/parser');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const date = '2026-11-07';

function isMainModule() {
    try {
        return path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url);
    } catch {
        return false;
    }
}

const run = process.env.GESP_REVISION_RUN || `${date}-revisions`;
const cache = process.env.GESP_AUDIT_CACHE || path.join(root, 'tmp/five-dimension-audit');
const out = path.join(root, 'docs/question-bank-verification/ai-reviews', run);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');

const key = property => property.key?.name ?? property.key?.value;

function patchQuestionObjects(source, rootNode, updates, found) {
    const edits = [];
    function visit(node) {
        if (!node || typeof node !== 'object') return;
        if (node.type === 'ObjectExpression') {
            const id = node.properties.find(property => key(property) === 'id')?.value?.value;
            if (updates.has(id) && node.properties.some(property => key(property) === 'type')) {
                if (found.has(id)) throw new Error(`原文件 Q${id} 有多个对象，不能自动覆盖`);
                found.add(id);
                const added = [];
                const update = updates.get(id);
                const existing = node.properties.find(property => key(property) === 'reviewedFields')?.value;
                const previousFields = existing?.type === 'ArrayExpression' ? existing.elements.map(item => item.value).filter(value => typeof value === 'string') : [];
                const fields = { ...update, reviewedFields: [...new Set([...previousFields, ...Object.keys(update)])] };
                for (const [name, value] of Object.entries(fields)) {
                    const property = node.properties.find(item => key(item) === name);
                    if (property) edits.push({ start: property.value.start, end: property.value.end, text: JSON.stringify(value) });
                    else added.push(`${JSON.stringify(name)}: ${JSON.stringify(value)}`);
                }
                if (added.length) {
                    const position = node.properties.at(-1).end;
                    edits.push({ start: position, end: position, text: ',\n      ' + added.join(',\n      ') });
                }
            }
        }
        for (const [name, value] of Object.entries(node)) {
            if (['loc', 'comments', 'tokens'].includes(name)) continue;
            if (Array.isArray(value)) value.forEach(visit);
            else if (value && typeof value === 'object') visit(value);
        }
    }
    visit(rootNode);
    for (const edit of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.text + source.slice(edit.end);
    parse(source, { sourceType: 'module' });
    return source;
}

export function patchPaperQuestionSources(paperId, paper, programming, updates) {
    const found = new Set();
    const patchedPaper = patchQuestionObjects(paper, parse(paper, { sourceType: 'module' }), updates, found);
    let patchedProgramming = programming;
    if (programming !== undefined) {
        const ast = parse(programming, { sourceType: 'module' });
        const registry = ast.program.body.flatMap(node => node.declaration?.declarations ?? [])
            .find(node => node.id.name === 'l8ProgrammingByPaper')?.init;
        const questions = registry?.properties?.find(property => key(property) === paperId)?.value;
        if (questions) patchedProgramming = patchQuestionObjects(programming, questions, updates, found);
    }
    if (found.size !== updates.size) throw new Error('部分题号未在原始数据对象中定位到，停止修改');
    return { paper: patchedPaper, programming: patchedProgramming };
}

async function main() {
    for (const id of process.argv.slice(2)) {
        if (!/^\d{4}-\d{2}-l[1-8]$/.test(id)) throw new Error('非法试卷 ID');
        const dir = path.join(process.env.GESP_REVISION_CACHE || path.join(cache, 'revisions'), id);
        const candidate = JSON.parse(fs.readFileSync(path.join(dir, 'paper.json')));
        const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json')));
        const initial = JSON.parse(fs.readFileSync(path.join(out, `${id}.deepseek.json`)));
        const review = JSON.parse(fs.readFileSync(path.join(out, `${id}.glm.json`)));
        if (initial.inputSha256 !== hash(JSON.stringify(candidate)) || review.inputSha256 !== initial.inputSha256) throw new Error('修订稿与双模型审查版本不一致');
        if (!initial.report.sourceIdentity?.matches || !review.report.sourceIdentity?.matches) throw new Error('来源身份未确认');
        const current = await getPaper(id);
        const byId = new Map([...(current.questions || []), ...(current.programmingQuestions || []), ...(current.codingQuestions || [])].map(question => [question.id, question]));
        const updates = new Map(), accepted = [], deferred = [], codeChecks = [];
        for (const question of candidate.questions) {
            const proposal = manifest.proposals.find(item => item.id === question.id);
            const existing = byId.get(question.id);
            if (!existing || hash(JSON.stringify(existing)) !== proposal.previousQuestionSha256) throw new Error(`Q${question.id} 基线已变更，停止套用修订`);
            const a = initial.report.questions.find(item => item.id === question.id), b = review.report.questions.find(item => item.id === question.id);
            let codeCheck;
            if (['programming', 'coding'].includes(question.type) && b) {
                codeCheck = checkProgram(id, question, b.tests); codeChecks.push(codeCheck);
            }
            const gate = gateQuestionReview(question, a, b, { codeCheck });
            if (gate.blockedDimensions.length || b?.verdict !== 'approve' || Object.keys(a?.changes || {}).length || Object.keys(b?.changes || {}).length) {
                deferred.push({ id: question.id, reasons: [...gate.unresolved, ...(b?.verdict !== 'approve' ? ['复核未明确批准候选'] : []), ...(Object.keys(a?.changes || {}).length || Object.keys(b?.changes || {}).length ? ['模型仍提出追加修改，候选不能直接应用'] : [])], furtherChanges: b?.changes || {} }); continue;
            }
            const fields = { ...proposal.changes, reviewedBy: 'AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核', reviewedAt: date };
            const sourcePage = resolveAppliedSourcePage({
                existingSourcePage: existing.sourcePage,
                acceptedChanges: proposal.changes,
                sourcePages: b.sourcePages,
            });
            if (sourcePage !== undefined) fields.sourcePage = sourcePage;
            else delete fields.sourcePage;
            updates.set(question.id, fields);
            accepted.push({ id: question.id, resolved: true, dimensions: gate.dimensions, blockedDimensions: [], official: gate.official, sourcePages: gate.sourcePages, method: ['依据上一轮 GLM 复核意见形成候选修订', 'DeepSeek V4.1 Flash max 重新核验候选', 'GLM 5.3 Flash max 独立复核修订稿', ...(codeCheck ? ['g++ 编译、原样例及复核边界用例执行'] : [])], evidence: gate.evidence, unresolved: [], appliedFields: Object.keys(proposal.changes), revisionReviewFiles: [`ai-reviews/${run}/${id}.deepseek.json`, `ai-reviews/${run}/${id}.glm.json`] });
        }
        if (updates.size) {
            const folder = path.join(root, `src/data/gesp/level${id.at(-1)}`);
            const filename = path.join(folder, `${id}.js`);
            const programmingFile = path.join(folder, 'programming.js');
            const paper = fs.readFileSync(filename, 'utf8');
            const programming = id.endsWith('-l8') ? fs.readFileSync(programmingFile, 'utf8') : undefined;
            const patched = patchPaperQuestionSources(id, paper, programming, updates);
            const changed = [[filename, 'before.js', paper, patched.paper], [programmingFile, 'before-programming.js', programming, patched.programming]]
                .filter(([, , original, revised]) => original !== revised);
            const expectedFile = path.join(dir, 'applied-fields.json');
            fs.writeFileSync(expectedFile, JSON.stringify([...updates]));
            try {
                for (const [file, backup, original, revised] of changed) {
                    fs.writeFileSync(path.join(dir, backup), original);
                    fs.writeFileSync(file, revised);
                }
                execFileSync(process.execPath, ['--input-type=module', '-e', `import fs from 'node:fs';import assert from 'node:assert/strict';import {getPaper} from './src/data/gesp/index.js';const p=await getPaper(process.argv[1]);const qs=[...(p.questions||[]),...(p.programmingQuestions||[]),...(p.codingQuestions||[])];for(const [id,fields]of JSON.parse(fs.readFileSync(process.argv[2]))){const q=qs.find(q=>q.id===id);for(const [key,value]of Object.entries(fields))assert.deepEqual(q[key],value,'Q'+id+' '+key)}`, id, expectedFile], { cwd: root, stdio: 'pipe' });
            } catch (error) {
                for (const [file, , original] of changed) fs.writeFileSync(file, original);
                throw error;
            }
            const evidenceFile = path.join(root, 'docs/question-bank-verification', `${id}.json`);
            const evidence = JSON.parse(fs.readFileSync(evidenceFile));
            const entries = new Map(evidence.questions.map(question => [question.id, question]));
            accepted.forEach(question => entries.set(question.id, question));
            evidence.questions = [...entries.values()].sort((a, b) => a.id - b.id);
            evidence.unresolved = evidence.questions.filter(question => question.blockedDimensions?.length).map(question => ({ id: question.id, dimensions: question.blockedDimensions, reasons: question.unresolved }));
            evidence.revisionChecks = `ai-reviews/${run}/${id}.integration.json`;
            fs.writeFileSync(evidenceFile, JSON.stringify(evidence, null, 2) + '\n');
        }
        const record = { paperId: id, integratedAt: new Date().toISOString(), accepted: accepted.map(question => ({ id: question.id, fields: question.appliedFields })), deferred, codeChecks };
        fs.writeFileSync(path.join(out, `${id}.integration.json`), JSON.stringify(record, null, 2) + '\n');
        console.log(JSON.stringify({ id, applied: record.accepted, deferred: deferred.map(question => question.id) }));
    }
}

if (isMainModule()) await main();
