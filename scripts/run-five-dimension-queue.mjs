// 在正常工作模式下运行的可恢复队列；内容判断全部来自指定的两个模型。
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { assertLevelBarrier, barrierForPaper, inspectPaper, isPendingPaper, loadUserRulings, selectDispatchablePaper } from './lib/level-barrier.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = process.env.GESP_AUDIT_CACHE;
if (!cache || !process.env.OPENCODE_API_KEY) throw new Error('需要 GESP_AUDIT_CACHE 和 OPENCODE_API_KEY 环境变量');
const date = '2026-11-07';
const reviews = path.join(root, 'docs/question-bank-verification/ai-reviews');
const evidenceRoot = path.join(root, 'docs/question-bank-verification');
const rulings = loadUserRulings(path.join(evidenceRoot, 'user-rulings.json'));
const stateFile = path.join(cache, 'queue-state.json');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const exists = file => fs.existsSync(file);
const inventory = read(path.join(cache, 'inventory.json'));
const state = exists(stateFile) ? read(stateFile) : { version: 1, startedAt: new Date().toISOString(), papers: {} };
const external = JSON.parse(process.env.GESP_EXISTING_WORKERS || '[]');
const alive = pid => { try { process.kill(pid, 0); return true; } catch { return false; } };
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const report = event => console.log(JSON.stringify({ at: new Date().toISOString(), ...event }));
const save = () => { state.updatedAt = new Date().toISOString(); fs.writeFileSync(stateFile + '.tmp', JSON.stringify(state, null, 2)); fs.renameSync(stateFile + '.tmp', stateFile); };
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', timeout: 120000 }).trim();
const pauseFile = process.env.GESP_QUEUE_PAUSE_FILE || path.join(cache, 'queue.pause');
const paused = () => exists(pauseFile);
const pauseError = () => Object.assign(new Error(`检测到本机暂停文件 ${pauseFile}，停止派发、集成和发布`), { code: 'QUEUE_PAUSED' });
const evidenceFor = id => {
    const file = path.join(evidenceRoot, `${id}.json`);
    if (!exists(file)) return null;
    try { return read(file); }
    catch (error) { return { paperId: id, questions: [], unresolved: [`正式证据无法读取：${error.message}`] }; }
};
const barrierContext = () => ({ inventory, papers: state.papers, evidenceFor, rulings });
const guard = id => assertLevelBarrier(id, barrierContext());
let exclusive = Promise.resolve(), stopped = false;
function serialize(work) {
    const next = exclusive.then(() => {
        if (stopped) throw new Error('队列集成已暂停，保留检查点');
        if (paused()) throw pauseError();
        return work();
    });
    exclusive = next.catch(() => {}); return next;
}
function command(program, args, label, env = {}) {
    return new Promise((resolve, reject) => {
        const logfile = path.join(cache, `${label}.log`);
        const fd = fs.openSync(logfile, 'a');
        const child = spawn(program, args, { cwd: root, env: { ...process.env, ...env }, stdio: ['ignore', fd, fd] });
        child.once('error', error => { fs.closeSync(fd); reject(error); });
        child.once('exit', code => {
            fs.closeSync(fd);
            if (code === 0) return resolve();
            const tail = fs.readFileSync(logfile, 'utf8').slice(-8000);
            const fatal = /HTTP (?:401|402|403)|未确认 Go|insufficient_quota|quota_exceeded/.test(tail);
            reject(new Error(`${fatal ? '模型账号或 Go 来源需要协调者处理；' : ''}${label}: exit ${code}; ${logfile}`));
        });
    });
}
const node = (script, id, label, env) => command(process.execPath, [script, id], label, env);
async function deployment(sha) {
    let retried = 0;
    for (let attempt = 0; attempt < 60; attempt++) {
        let runs;
        try {
            runs = JSON.parse(execFileSync('gh', ['run', 'list', '--repo', 'Dora321/gesp-app', '--commit', sha, '--workflow', 'deploy.yml', '--limit', '1', '--json', 'databaseId,status,conclusion'], { cwd: root, encoding: 'utf8', timeout: 60000 }));
        } catch (error) {
            if (!/EOF|timeout|timed out|connection reset|502|503|504/i.test(String(error.message))) throw error;
            report({ status: 'retrying-github-status', sha, error: String(error.message).slice(0, 200) });
            await wait(30000);
            continue;
        }
        if (runs[0]?.status === 'completed') {
            if (runs[0].conclusion !== 'success') {
                const jobs = JSON.parse(execFileSync('gh', ['run', 'view', String(runs[0].databaseId), '--repo', 'Dora321/gesp-app', '--json', 'jobs'], { cwd: root, encoding: 'utf8', timeout: 60000 })).jobs;
                const transientPagesFailure = jobs.some(job => job.name === 'deploy' && job.conclusion === 'failure')
                    && jobs.filter(job => job.name !== 'deploy').every(job => job.conclusion === 'success');
                if (!transientPagesFailure || retried >= 2) throw new Error(`GitHub 部署检查失败：${runs[0].databaseId} ${runs[0].conclusion}`);
                execFileSync('gh', ['run', 'rerun', String(runs[0].databaseId), '--repo', 'Dora321/gesp-app', '--failed'], { cwd: root, timeout: 60000 });
                retried += 1;
                report({ status: 'retrying-pages-deploy', runId: runs[0].databaseId, attempt: retried });
                await wait(30000);
                continue;
            }
            return runs[0].databaseId;
        }
        await wait(30000);
    }
    throw new Error('GitHub 部署在等待窗口内未完成');
}
async function publish(id, phase, extraPaths = []) {
    if (paused()) throw pauseError();
    guard(id);
    for (const task of ['generate:papers', 'validate:bank', 'test', 'check', 'lint', 'build']) await command('npm', ['run', task], `checks-${id}-${phase}`);
    await command(process.execPath, ['scripts/report-five-dimension-progress.mjs'], `progress-${id}-${phase}`);
    git('diff', '--check');
    const evidence = read(path.join(evidenceRoot, `${id}.json`));
    const summary = { paperId: id, phase, checkedAt: new Date().toISOString(), reviewedQuestions: evidence.questions.length, acceptedDimensions: evidence.questions.reduce((sum, question) => sum + question.dimensions.length, 0), unresolved: evidence.unresolved, reviewFiles: evidence.reviewFiles, revisionChecks: evidence.revisionChecks, checks: '题库结构、单元测试、课程与链接、解析质量、Lint、生产构建通过' };
    const progressFile = path.join(evidenceRoot, `ai-reviews/${date}/${id}.delivery.json`);
    fs.writeFileSync(progressFile, JSON.stringify(summary, null, 2) + '\n');
    const paths = [`docs/question-bank-verification/${id}.json`, 'docs/question-bank-verification/PROGRESS-2026-11-07.md', `src/data/gesp/level${id.at(-1)}/${id}.js`, 'src/data/gesp/_generated.js', 'src/data/gesp/_stats.js', path.relative(root, progressFile), ...extraPaths];
    for (const directory of fs.readdirSync(reviews).filter(name => name.startsWith(date))) {
        for (const file of fs.readdirSync(path.join(reviews, directory)).filter(name => name.startsWith(id + '.') && name.endsWith('.json'))) paths.push(`docs/question-bank-verification/ai-reviews/${directory}/${file}`);
    }
    git('fetch', 'origin', 'main');
    git('merge-base', '--is-ancestor', 'FETCH_HEAD', 'HEAD');
    if (paused()) throw pauseError();
    guard(id);
    git('add', '--', ...new Set(paths));
    if (!git('diff', '--cached', '--name-only')) return;
    const allowed = new Set(paths);
    const staged = git('diff', '--cached', '--name-only').split('\n');
    if (staged.some(file => !allowed.has(file))) throw new Error('暂存区存在本批范围外文件，停止提交');
    if (paused()) throw pauseError();
    guard(id);
    git('commit', '-m', `verify(${id}): 同步${phase}双模型核验与修订`);
    const sha = git('rev-parse', 'HEAD');
    if (paused()) throw pauseError();
    guard(id);
    git('push', 'origin', 'HEAD:main', 'HEAD:refs/heads/codex/five-dimension-20261107');
    Object.assign(state.papers[id], { latestCommit: sha, lastPhase: phase }); save();
    report({ id, phase, status: 'pushed', sha, acceptedDimensions: summary.acceptedDimensions, unresolvedQuestions: summary.unresolved.length });
    const runId = await deployment(sha);
    state.papers[id].deployment = runId; save();
    report({ id, phase, status: 'deployed', runId });
}
async function processPaper(id) {
    const entry = state.papers[id] ||= {};
    const environment = { GESP_AUDIT_CACHE: cache, GESP_AUDIT_RUN: date, GESP_AUDIT_CONCURRENCY: '1' };
    const evidenceFile = path.join(evidenceRoot, `${id}.json`);
    const originalReview = path.join(reviews, date, `${id}.glm.json`);
    const fullReview = () => exists(originalReview) && read(originalReview).report.questions.length === read(path.join(cache, id, 'paper.json')).questions.length;
    if (!fullReview()) await node('scripts/run-five-dimension-audit.mjs', id, `queue-${id}-initial`, environment);
    await serialize(async () => {
        guard(id);
        const evidence = exists(evidenceFile) ? read(evidenceFile) : {};
        if (evidence.inputSha256 !== read(originalReview).inputSha256 || evidence.questions?.length !== read(originalReview).report.questions.length) {
            await node('scripts/collect-five-dimension-review.mjs', id, `queue-${id}-collect`, environment);
            await publish(id, '初核复核');
        } else if (git('status', '--porcelain', '--', evidenceFile, originalReview, `src/data/gesp/level${id.at(-1)}/${id}.js`)) await publish(id, '恢复未发布检查点');
        entry.initialCollected = true; save();
    });
    let previousRun = date;
    for (let round = 1; round <= 3; round++) {
        const run = round === 1 ? `${date}-revisions` : `${date}-revisions-${round}`;
        const revisionCache = round === 1 ? path.join(cache, 'revisions') : path.join(cache, run);
        const integrationFile = path.join(reviews, run, `${id}.integration.json`);
        if (exists(integrationFile)) {
            if (git('status', '--porcelain', '--', integrationFile)) await serialize(() => publish(id, `恢复第${round}轮修订`));
            previousRun = run; continue;
        }
        const evidence = read(evidenceFile);
        if (!evidence.unresolved.length) break;
        const candidateFile = path.join(revisionCache, id, 'paper.json');
        await serialize(async () => {
            guard(id);
            if (!exists(candidateFile)) await node('scripts/prepare-audit-revisions.mjs', id, `queue-${id}-prepare-${round}`, { ...environment, GESP_AUDIT_RUN: previousRun, GESP_REVISION_CACHE: revisionCache });
        });
        if (!exists(candidateFile)) break;
        await node('scripts/run-five-dimension-audit.mjs', id, `queue-${id}-revision-${round}`, { ...environment, GESP_AUDIT_CACHE: revisionCache, GESP_AUDIT_RUN: run });
        await serialize(async () => {
            guard(id);
            await node('scripts/apply-audit-revisions.mjs', id, `queue-${id}-apply-${round}`, { ...environment, GESP_REVISION_CACHE: revisionCache, GESP_REVISION_RUN: run });
            await publish(id, `第${round}轮修订`);
            entry.revisionRound = round; save();
        });
        previousRun = run;
    }
    const final = read(evidenceFile);
    entry.status = final.unresolved.length ? 'reviewed-with-open-issues' : 'verified';
    entry.unresolved = final.unresolved;
    entry.completedAt = new Date().toISOString(); save();
    report({ id, status: entry.status, unresolvedQuestions: final.unresolved.length });
}
// 用户指定按等级从一级到八级推进；同一级不同试卷可以并行审校。
const ids = inventory.map(paper => paper.id).filter(id => id !== '2026-03-l5')
    .sort((a, b) => Number(a.at(-1)) - Number(b.at(-1)) || a.localeCompare(b));
const pending = ids.filter(id => isPendingPaper(state.papers[id]));
const active = new Set();
const jobs = new Set();
save();
while ((pending.length || active.size) && !stopped) {
    if (paused()) { report({ status: 'queue-paused', file: pauseFile, pending: pending.length }); break; }
    const runningExternal = external.filter(worker => alive(worker.pid));
    let started = false;
    for (;;) {
        const id = selectDispatchablePaper({
            pending, active: [...active], runningExternal,
            concurrency: process.env.GESP_QUEUE_CONCURRENCY,
            papers: state.papers, inventory, evidenceFor, rulings,
        });
        if (!id) break;
        pending.splice(pending.indexOf(id), 1); active.add(id); started = true;
        Object.assign(state.papers[id] ||= {}, {
            status: 'working', workingAt: new Date().toISOString(),
            waitingFor: undefined, waitingReason: undefined, waitingAt: undefined,
        }); save();
        report({ id, status: 'working', pending: pending.length });
        const job = processPaper(id).catch(async error => {
            const entry = state.papers[id] ||= {};
            entry.attempts = (entry.attempts || 0) + 1; entry.error = error.message;
            // 屏障/暂停不消耗模型重试；open-issues 仍保持终态，不回填 pending。
            if (error.code === 'QUEUE_PAUSED') {
                entry.status = 'waiting-coordinator'; entry.waitingReason = error.message;
                entry.waitingAt = new Date().toISOString(); stopped = true;
            } else if (error.code === 'LEVEL_BARRIER') {
                entry.status = 'waiting-coordinator'; entry.waitingReason = error.message;
                entry.waitingFor = error.blocked.map(item => ({ id: item.id, level: item.level, status: item.status, problems: item.problems }));
                entry.waitingAt = new Date().toISOString();
            }
            // 仅模型传输/结构失败可在队尾重试；集成/测试/发布失败保留现场交回协调者。
            else if (/模型账号或 Go 来源/.test(error.message)) { entry.status = 'account-blocked'; stopped = true; }
            else if (/queue-.*-(?:initial|revision-\d+): exit/.test(error.message) && entry.attempts < 4) {
                entry.status = 'retry-queued'; save();
                report({ id, status: 'retry-waiting', seconds: 300, error: error.message });
                await wait(300000);
                pending.unshift(id);
            }
            else if (/queue-.*-(?:initial|revision-\d+): exit/.test(error.message)) { entry.status = 'model-request-blocked'; stopped = true; }
            else { entry.status = 'integration-blocked'; stopped = true; }
            save(); report({ id, status: entry.status, error: error.message });
        }).finally(() => { active.delete(id); jobs.delete(job); });
        jobs.add(job);
    }
    if (!started && active.size === 0 && runningExternal.length === 0) break;
    await wait(5000);
}
await Promise.allSettled(jobs);
await exclusive;

// 剩余 pending 只记录等待原因，不把 reviewed-with-open-issues 塞回队列空转。
const waiting = [];
if (!paused()) {
    for (const id of pending) {
        const barrier = barrierForPaper(id, barrierContext());
        if (barrier.ready) continue;
        const entry = state.papers[id] ||= {};
        if (!/blocked/.test(entry.status || '')) entry.status = 'waiting-coordinator';
        entry.waitingReason = `L${barrier.level} 需要更低等级全部 verified 或经用户裁定收束`;
        entry.waitingFor = barrier.blocked.map(item => ({ id: item.id, level: item.level, status: item.status, problems: item.problems }));
        entry.waitingAt = new Date().toISOString();
        waiting.push({ id, blockedBy: entry.waitingFor.map(item => item.id) });
    }
}
save();
const inspected = ids.map(id => inspectPaper(id, { entry: state.papers[id], evidence: evidenceFor(id), rulings }));
const unfinished = inspected.filter(item => !item.complete);
const disputes = inspected.filter(item => item.closedByRuling)
    .map(item => ({ id: item.id, questions: item.disputes.map(dispute => dispute.id) }));
const blockedStatuses = Object.entries(state.papers).filter(([, paper]) => /blocked/.test(paper.status || ''));
const finished = !stopped && !paused() && pending.length === 0
    && unfinished.length === 0 && blockedStatuses.length === 0;
report({
    status: finished ? 'queue-finished' : 'needs-coordinator',
    pending: pending.length,
    waiting,
    disputes,
    unfinished: unfinished.map(item => ({ id: item.id, level: item.level, status: item.status, problems: item.problems })),
    papers: Object.fromEntries(Object.entries(state.papers).map(([id, item]) => [id, item.status])),
});
if (!finished) process.exitCode = 1;
