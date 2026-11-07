// 在正常工作模式下运行的可恢复队列；内容判断全部来自指定的两个模型。
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = process.env.GESP_AUDIT_CACHE;
if (!cache || !process.env.OPENCODE_API_KEY) throw new Error('需要 GESP_AUDIT_CACHE 和 OPENCODE_API_KEY 环境变量');
const date = '2026-11-07';
const reviews = path.join(root, 'docs/question-bank-verification/ai-reviews');
const evidenceRoot = path.join(root, 'docs/question-bank-verification');
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
let exclusive = Promise.resolve(), stopped = false;
function serialize(work) {
    const next = exclusive.then(() => { if (stopped) throw new Error('队列集成已暂停，保留检查点'); return work(); });
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
        const runs = JSON.parse(execFileSync('gh', ['run', 'list', '--repo', 'Dora321/gesp-app', '--commit', sha, '--workflow', 'deploy.yml', '--limit', '1', '--json', 'databaseId,status,conclusion'], { cwd: root, encoding: 'utf8', timeout: 60000 }));
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
    git('add', '--', ...new Set(paths));
    if (!git('diff', '--cached', '--name-only')) return;
    const allowed = new Set(paths);
    const staged = git('diff', '--cached', '--name-only').split('\n');
    if (staged.some(file => !allowed.has(file))) throw new Error('暂存区存在本批范围外文件，停止提交');
    git('commit', '-m', `verify(${id}): 同步${phase}双模型核验与修订`);
    const sha = git('rev-parse', 'HEAD');
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
            if (!exists(candidateFile)) await node('scripts/prepare-audit-revisions.mjs', id, `queue-${id}-prepare-${round}`, { ...environment, GESP_AUDIT_RUN: previousRun, GESP_REVISION_CACHE: revisionCache });
        });
        if (!exists(candidateFile)) break;
        await node('scripts/run-five-dimension-audit.mjs', id, `queue-${id}-revision-${round}`, { ...environment, GESP_AUDIT_CACHE: revisionCache, GESP_AUDIT_RUN: run });
        await serialize(async () => {
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
// 用户指定按等级从一级到八级，再按试卷年月从早到晚逐卷推进。
const ids = inventory.map(paper => paper.id).filter(id => id !== '2026-03-l5')
    .sort((a, b) => Number(a.at(-1)) - Number(b.at(-1)) || a.localeCompare(b));
const pending = ids.filter(id => !['verified', 'reviewed-with-open-issues'].includes(state.papers[id]?.status));
const active = new Set();
const jobs = new Set();
save();
while ((pending.length || active.size) && !stopped) {
    const runningExternal = external.filter(worker => alive(worker.pid));
    const limit = 1;
    while (active.size < limit) {
        const index = pending.findIndex(id => !runningExternal.some(worker => worker.ids.includes(id)));
        if (index < 0) break;
        const id = pending.splice(index, 1)[0]; active.add(id);
        Object.assign(state.papers[id] ||= {}, { status: 'working', workingAt: new Date().toISOString() }); save();
        report({ id, status: 'working', pending: pending.length });
        const job = processPaper(id).catch(error => {
            const entry = state.papers[id] ||= {};
            entry.attempts = (entry.attempts || 0) + 1; entry.error = error.message;
            // 仅模型传输/结构失败可在队尾重试；集成/测试/发布失败保留现场交回协调者。
            if (/模型账号或 Go 来源/.test(error.message)) { entry.status = 'account-blocked'; stopped = true; }
            else if (/queue-.*-(?:initial|revision-\d+): exit/.test(error.message) && entry.attempts < 4) { pending.push(id); entry.status = 'retry-queued'; }
            else if (/queue-.*-(?:initial|revision-\d+): exit/.test(error.message)) entry.status = 'model-request-blocked';
            else { entry.status = 'integration-blocked'; stopped = true; }
            save(); report({ id, status: entry.status, error: error.message });
        }).finally(() => { active.delete(id); jobs.delete(job); });
        jobs.add(job);
    }
    await wait(5000);
}
await Promise.allSettled(jobs);
await exclusive;
report({ status: stopped ? 'needs-coordinator' : 'queue-finished', papers: Object.fromEntries(Object.entries(state.papers).map(([id, item]) => [id, item.status])) });
if (stopped || Object.values(state.papers).some(paper => /blocked/.test(paper.status || ''))) process.exitCode = 1;
