import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { paperIds, paperMeta } from '../src/data/gesp/_generated.js';
import { getPaper } from '../src/data/gesp/index.js';
import { paperSources } from '../src/data/gesp/paperSources.js';
import { resolveVerification } from '../src/data/gesp/verificationModel.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'docs/question-bank-verification');
const formal = paperIds.filter(id => !paperSources[id]?.unofficial);
const complete = formal.filter(id => resolveVerification(paperMeta[id]).status === 'verified');
const rows = [];
for (const id of formal) {
    const file = path.join(dir, `${id}.json`);
    if (!fs.existsSync(file)) continue;
    const evidence = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!evidence.reviewFiles?.review?.startsWith('ai-reviews/2026-11-07/')) continue;
    const paper = await getPaper(id);
    const questions = new Map([...(paper.questions || []), ...(paper.programmingQuestions || []), ...(paper.codingQuestions || [])].map(question => [question.id, question]));
    const open = evidence.questions.filter(question => question.blockedDimensions?.length);
    const protectedCount = open.filter(question => questions.get(question.id)?.sourceIntegrity || questions.get(question.id)?.needsReview).length;
    const verification = resolveVerification(paper);
    rows.push({ id, reviewed: evidence.questions.length, total: questions.size, dimensions: evidence.questions.reduce((sum, question) => sum + question.dimensions.length, 0), open: open.length, protectedCount, complete: verification.status === 'verified' });
}
const fullyReviewed = rows.filter(row => row.reviewed === row.total).length;
const text = [
    '# 题库五维核验进度', '',
    `更新时间：${new Date().toISOString()}。本表由逐题证据和网站运行时数据生成。`, '',
    `正式试卷 ${formal.length} 套，五维全部完成 ${complete.length} 套，仍有未完成维度 ${formal.length - complete.length} 套。`, '',
    `本轮 OpenCode Go 双模型审校已接入 ${rows.length} 套卷、${rows.reduce((sum, row) => sum + row.reviewed, 0)} 道题，其中 ${fullyReviewed} 套已完成全卷初核及复核。初始待办为 98 套，尚未接入全卷双模型结果 ${98 - fullyReviewed} 套。审校完成不等于五维全部通过；分歧及原卷争议继续保留。`, '',
    '执行分工：DeepSeek V4.1 Flash（max）初核；GLM 5.3 Flash（max）独立复核；Grok CLI 负责调度；本机机械队列负责集成、自动测试和发布。', '',
    '| 试卷 | 双模型已审题数 | 通过的题目×维度 | 待处理题数 | 其中原有争议/待审标记 | 五维全部通过 |',
    '|---|---:|---:|---:|---:|---|',
    ...rows.map(row => `| [${row.id}](./${row.id}.json) | ${row.reviewed}/${row.total} | ${row.dimensions} | ${row.open} | ${row.protectedCount} | ${row.complete ? '是' : '否'} |`), '',
    '题面与解析适用于全部题，选项只统计单选题，答案只统计客观题，参考代码只统计编程题。题目只要有一个维度未通过，就计入待处理题数。原有争议不能被自动清除。', '',
    '每卷记录包含原卷来源与摘要、逐题页码和双模型最终结论；参考程序另有真实编译、样例及边界用例结果。分批交付记录位于 `ai-reviews/2026-11-07/*.delivery.json`。', '',
].join('\n');
fs.writeFileSync(path.join(dir, 'PROGRESS-2026-11-07.md'), text);
console.log(JSON.stringify({ formal: formal.length, fiveDimensionsComplete: complete.length, doubleReviewedPapers: fullyReviewed, doubleReviewedQuestions: rows.reduce((sum, row) => sum + row.reviewed, 0) }));
