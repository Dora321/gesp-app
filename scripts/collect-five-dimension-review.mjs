import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getPaper } from '../src/data/gesp/index.js';
import { gateQuestionReview } from './lib/five-dimension-gate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const date = process.env.GESP_AUDIT_DATE || '2026-11-07';
const cache = process.env.GESP_AUDIT_CACHE || path.join(root, 'tmp/five-dimension-audit');
const evidenceDir = path.join(root, 'docs/question-bank-verification');
const out = path.join(evidenceDir, 'ai-reviews', date);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const outputText = value => String(value).replace(/\r\n/g, '\n').split('\n').map(line => line.trimEnd()).join('\n').trimEnd();
const headerNames = ['algorithm','array','bitset','cassert','cctype','cfloat','climits','cmath','complex','cstdarg','cstddef','cstdint','cstdio','cstdlib','cstring','ctime','deque','exception','forward_list','functional','iomanip','ios','iosfwd','iostream','istream','iterator','limits','list','locale','map','memory','new','numeric','ostream','queue','random','ratio','regex','set','sstream','stack','stdexcept','streambuf','string','tuple','type_traits','typeinfo','unordered_map','unordered_set','utility','valarray','vector'];

export function checkProgram(id, question, reviewedTests) {
    const code = question.referenceCode;
    const result = { id: question.id, passed: false, sampleCount: 0, boundaryCount: 0, tests: [], codeSha256: typeof code === 'string' ? hash(code) : null };
    if (!code || /\b(system|popen|exec\w*|fork|fopen|freopen|fstream|filesystem|socket)\s*[(<:]|#\s*include\s*[<"](?:unistd|windows)/.test(code)) return { ...result, error: '代码缺失或需要单独确认文件/系统操作' };
    const dir = path.join(cache, id, `program-${question.id}`);
    fs.mkdirSync(path.join(dir, 'include/bits'), { recursive: true });
    const sourceFile = path.join(dir, 'main.cpp'), binary = path.join(dir, 'main');
    fs.writeFileSync(sourceFile, code);
    fs.writeFileSync(path.join(dir, 'include/bits/stdc++.h'), '#pragma once\n' + headerNames.map(header => `#include <${header}>`).join('\n'));
    // 同现有验证器：仅 Apple clang 缺少 bits/stdc++.h 时使用兼容头。
    const include = process.platform === 'darwin' ? ['-I', path.join(dir, 'include')] : [];
    try { execFileSync('g++', ['-std=c++17', '-O2', ...include, sourceFile, '-o', binary], { timeout: 60000, stdio: 'pipe', maxBuffer: 1024 * 1024 }); }
    catch (error) { return { ...result, error: `编译失败：${String(error.stderr || error.message).slice(0,2000)}` }; }
    const seen = new Set();
    const cases = [
        ...(question.samples || []).map((sample, index) => ({ ...sample, name: `原样例 ${index + 1}`, kind: 'sample' })),
        ...(reviewedTests || []).filter(test => {
            if (typeof test.input !== 'string' || typeof test.output !== 'string' || test.input.length > 100000 || seen.has(test.input)) return false;
            seen.add(test.input); return true;
        }).map(test => ({ ...test, kind: 'boundary' })),
    ];
    for (const test of cases) {
        try {
            const actual = execFileSync(binary, { input: test.input, encoding: 'utf8', timeout: 3000, maxBuffer: 1024 * 1024, cwd: dir, env: { PATH: process.env.PATH, LANG: 'en_US.UTF-8' } });
            const passed = outputText(actual) === outputText(test.output);
            result.tests.push({ ...test, actual, passed });
            if (passed) test.kind === 'sample' ? result.sampleCount++ : result.boundaryCount++;
        } catch (error) { result.tests.push({ ...test, passed: false, error: String(error.message).slice(0,500) }); }
    }
    result.passed = cases.length > 0 && result.tests.every(test => test.passed);
    return result;
}

for (const id of path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url) ? process.argv.slice(2) : []) {
    if (!/^\d{4}-\d{2}-l[1-8]$/.test(id)) throw new Error('非法试卷 ID');
    const dir = path.join(cache, id);
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json')));
    const paper = JSON.parse(fs.readFileSync(path.join(dir, 'paper.json')));
    const initial = JSON.parse(fs.readFileSync(path.join(out, `${id}.deepseek.json`)));
    const review = JSON.parse(fs.readFileSync(path.join(out, `${id}.glm.json`)));
    if (initial.inputSha256 !== hash(JSON.stringify(paper)) || review.inputSha256 !== initial.inputSha256) throw new Error(`${id}: 双模型输入版本不一致`);
    if (initial.report.sourceIdentity?.matches !== true || review.report.sourceIdentity?.matches !== true) throw new Error(`${id}: 原卷身份未通过双模型确认`);
    const current = await getPaper(id);
    const currentQuestions = [...new Map([...(current.questions || []), ...(current.programmingQuestions || []), ...(current.codingQuestions || [])].map(question => [question.id, question])).values()];
    // 防止模型审查期间另一批修改了同一卷；核验标签更新不影响题目内容比较。
    if (JSON.stringify(currentQuestions) !== JSON.stringify(paper.questions)) throw new Error(`${id}: 审查后题目数据发生变化，禁止套用旧结论`);
    const codeChecks = [], questions = [], pendingChanges = [];
    for (const question of paper.questions) {
        const a = initial.report.questions.find(item => item.id === question.id);
        const b = review.report.questions.find(item => item.id === question.id);
        if (!a || !b) continue;
        let codeCheck;
        if (['programming', 'coding'].includes(question.type)) {
            codeCheck = checkProgram(id, question, b.tests);
            codeChecks.push(codeCheck);
        }
        const result = gateQuestionReview(question, a, b, { codeCheck });
        if (Object.keys(result.changes).length) pendingChanges.push({ id: question.id, changes: result.changes, status: 'approved-not-applied' });
        questions.push({
            id: question.id, resolved: result.dimensions.length > 0,
            dimensions: result.dimensions, blockedDimensions: result.blockedDimensions,
            official: result.official, sourcePages: result.sourcePages,
            method: ['原卷 PDF 摘要校验及逐页图片对照', 'DeepSeek V4.1 Flash max 初核', 'GLM 5.3 Flash max 独立复核', ...(codeCheck ? ['g++ 编译及原样例、复核边界用例执行'] : [])],
            evidence: result.evidence, unresolved: result.unresolved,
        });
    }
    const evidenceFile = path.join(evidenceDir, `${id}.json`);
    const previousFile = path.join(out, `${id}.previous-evidence.json`);
    if (fs.existsSync(evidenceFile) && !fs.existsSync(previousFile)) fs.copyFileSync(evidenceFile, previousFile);
    const evidence = {
        paperId: id, reviewedAt: date, dimensionScopedUnresolved: true,
        reviewedBy: { type: 'AI', executor: 'DeepSeek V4.1 Flash（max）初核 → GLM 5.3 Flash（max）独立复核', coordinator: 'Codex（资料、队列、自动校验与发布）' },
        source: { ...manifest.source, pages: manifest.images.length },
        reviewFiles: { initial: `ai-reviews/${date}/${id}.deepseek.json`, review: `ai-reviews/${date}/${id}.glm.json`, previous: `ai-reviews/${date}/${id}.previous-evidence.json` },
        inputSha256: initial.inputSha256, questions,
        unresolved: questions.filter(question => question.blockedDimensions.length).map(question => ({ id: question.id, dimensions: question.blockedDimensions, reasons: question.unresolved })),
        pendingChanges, programmingChecks: `ai-reviews/${date}/${id}.code-checks.json`,
    };
    fs.writeFileSync(path.join(out, `${id}.code-checks.json`), JSON.stringify({ executedAt: new Date().toISOString(), compiler: 'g++ -std=c++17 -O2', codeChecks }, null, 2) + '\n');
    fs.writeFileSync(evidenceFile, JSON.stringify(evidence, null, 2) + '\n');
    console.log(JSON.stringify({ id, acceptedDimensions: questions.reduce((count, question) => count + question.dimensions.length, 0), blockedQuestions: evidence.unresolved.length, pendingChanges: pendingChanges.length, codeChecks: codeChecks.map(check => ({ id: check.id, passed: check.passed, samples: check.sampleCount, boundaries: check.boundaryCount })) }));
}
