// Generate the five-dimension verification checklist for every paper.
//
// Output:
//   docs/question-bank-verification/checklist.json  — machine-readable, one entry per paper
//   docs/question-bank-verification/README.md       — human-readable summary with priorities
//
// The scan runs against the RUNTIME view of the data: raw paper file +
// verifiedQuestionCorrections overlay, i.e. what getPaper() actually serves.
// Scanning raw files only would miss overlay-applied fixes (and overlay-applied
// regressions), so both raw and resolved state are recorded.
//
// Usage: node scripts/generate-verification-checklist.mjs [--write]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { paperIds, paperMeta } from '../src/data/gesp/_generated.js';
import { getPaper } from '../src/data/gesp/index.js';
import { verifiedQuestionCorrections } from '../src/data/gesp/verifiedQuestionCorrections.js';
import { paperSources } from '../src/data/gesp/paperSources.js';
import { VERIFICATION_DIMENSIONS, resolveVerification } from '../src/data/gesp/verificationModel.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'docs', 'question-bank-verification');
const write = process.argv.includes('--write');

const PLACEHOLDER_RE = /待补充|待完善|解析待补充|答案依据试卷标准答案/;
const BOILERPLATE_RE = /与题目要求不符|请重新验算|请逐步推演|该选项错误/;

function summarizeQuestion(q) {
  const issues = [];
  const explanation = String(q.explanation || '');
  const refCode = String(q.referenceCode || q.referenceSolution || '');

  if (q.sourceIntegrity) issues.push(`sourceIntegrity:${q.sourceIntegrity}`);
  if (PLACEHOLDER_RE.test(explanation) && q.type !== 'programming') issues.push('explanation-placeholder');
  if (q.type === 'programming' && /待补充/.test(refCode)) issues.push('referenceCode-placeholder');
  if (!explanation.trim()) issues.push('explanation-missing');
  if (q.needsReview) issues.push('needsReview-flag');
  if (q.type === 'programming' && !refCode.trim()) issues.push('referenceCode-missing');
  return issues;
}

// Priority heuristic. P0 = wrong content shown to students; P1 = transcription /
// explanation defects; P2 = evidence or presentation gaps.
function priorityOf(entry) {
  const s = entry.sourceIntegrity || [];
  if (s.some((x) => x.startsWith('sourceIntegrity:answer-key-conflict'))) return 'P0';
  if (s.some((x) => x.startsWith('sourceIntegrity:not-official-question'))) return 'P0';
  if (entry.explanationPlaceholderCount > 0 || entry.referenceCodePlaceholderCount > 0) return 'P0';
  if (entry.boilerplateCount > 0 || entry.unresolvedDimensions) return 'P1';
  const dims = Object.values(entry.dimensions || {});
  if (dims.every((d) => d === 'unverified')) return 'P1';
  return 'P2';
}

const checklist = [];

for (const paperId of paperIds) {
  const meta = paperMeta[paperId] || {};
  const source = paperSources[paperId] || {};
  const paper = await getPaper(paperId);
  const verification = resolveVerification(paper);
  const corrections = verifiedQuestionCorrections[paperId];
  const correctedQuestionIds = corrections?.questions
    ? Object.keys(corrections.questions).map(Number).sort((a, b) => a - b)
    : [];

  const questions = paper?.questions || [];
  const perQuestion = {};
  const dimensionIssues = Object.fromEntries(VERIFICATION_DIMENSIONS.map(({ key }) => [key, []]));
  let explanationPlaceholder = 0;
  let referenceCodePlaceholder = 0;
  let boilerplate = 0;
  let integrityFlagged = 0;

  for (const q of questions) {
    const issues = summarizeQuestion(q);
    if (issues.length) {
      perQuestion[q.id] = issues;
      for (const issue of issues) {
        if (issue.startsWith('sourceIntegrity:')) {
          integrityFlagged += 1;
          dimensionIssues.statement.push(q.id);
        }
        if (issue === 'explanation-placeholder' || issue === 'explanation-missing') {
          explanationPlaceholder += 1;
          dimensionIssues.explanation.push(q.id);
        }
        if (issue === 'referenceCode-placeholder' || issue === 'referenceCode-missing') {
          referenceCodePlaceholder += 1;
          dimensionIssues.referenceCode.push(q.id);
        }
      }
      if (BOILERPLATE_RE.test(String(q.explanation || ''))) {
        boilerplate += 1;
        if (!dimensionIssues.explanation.includes(q.id)) dimensionIssues.explanation.push(q.id);
      }
    }
  }

  const single = questions.filter((q) => q.type === 'single').length;
  const judge = questions.filter((q) => q.type === 'judge').length;
  const programming = questions.filter((q) => q.type === 'programming').length;

  const entry = {
    paperId,
    level: meta.level,
    title: meta.title,
    questionCount: meta.questionCount,
    composition: { single, judge, programming },
    official: !source.unofficial,
    sourceRegistry: {
      officialUrl: source.officialUrl || null,
      mirrorUrl: source.mirrorUrl || null,
      mirrorShaVerified: source.mirrorSha ? 'registered' : 'absent',
    },
    dimensions: verification.dimensions,
    overallStatus: verification.status,
    reviewedBy: verification.reviewedBy,
    reviewedAt: verification.reviewedAt,
    correctionsOverlay: {
      present: Boolean(corrections),
      reviewedAt: corrections?.reviewedAt || null,
      questionIds: correctedQuestionIds,
    },
    gaps: {
      integrityFlagged,
      explanationPlaceholder,
      referenceCodePlaceholder,
      boilerplate,
      perQuestion,
    },
    priority: null,
    processingState: 'pending',
  };
  entry.priority = priorityOf(entry);
  checklist.push(entry);
}

// --- summary -------------------------------------------------------------
const byLevel = {};
for (const e of checklist) {
  byLevel[e.level] = byLevel[e.level] || { papers: 0, dims: {}, official: 0, unofficial: 0, priorities: {} };
  byLevel[e.level].papers += 1;
  e.official ? byLevel[e.level].official++ : byLevel[e.level].unofficial++;
  byLevel[e.level].priorities[e.priority] = (byLevel[e.level].priorities[e.priority] || 0) + 1;
  for (const { key } of VERIFICATION_DIMENSIONS) {
    byLevel[e.level].dims[key] = byLevel[e.level].dims[key] || { verified: 0, partial: 0, unverified: 0 };
    byLevel[e.level].dims[key][e.dimensions[key]] += 1;
  }
}

const summaryLines = [];
summaryLines.push('# 题库核验清单');
summaryLines.push('');
summaryLines.push(`> 生成时间：${new Date().toISOString().slice(0, 10)}　脚本：\`npm run checklist\`（\`scripts/generate-verification-checklist.mjs\`）`);
summaryLines.push('> 状态扫描基于运行时数据（原始试卷 + verifiedQuestionCorrections 覆盖层之后），与 getPaper() 一致。');
summaryLines.push('> 本清单只反映**数据现状与缺口**，不把任何维度标成已核验——核验结论只能来自逐题对照原卷的证据文件。');
summaryLines.push('');
summaryLines.push('| 级别 | 卷数 | 正式 | 非正式 | ' + VERIFICATION_DIMENSIONS.map(({ label }) => label).join(' | ') + ' | P0 | P1 | P2 |');
summaryLines.push('|---|---|---|---|' + VERIFICATION_DIMENSIONS.map(() => '---').join('|') + '|---|---|---|');
for (const level of Object.keys(byLevel).sort((a, b) => a - b)) {
  const b = byLevel[level];
  const dimCells = VERIFICATION_DIMENSIONS.map(({ key }) => {
    const d = b.dims[key];
    return `${d.verified}/${d.partial}/${d.unverified}`;
  });
  summaryLines.push(`| L${level} | ${b.papers} | ${b.official} | ${b.unofficial} | ${dimCells.join(' | ')} | ${b.priorities.P0 || 0} | ${b.priorities.P1 || 0} | ${b.priorities.P2 || 0} |`);
}
summaryLines.push('');
summaryLines.push('维度单元格为 `已核验/部分/未核验` 的**卷数**（非题数），由各卷 verification 声明解析而来。');
summaryLines.push('');
summaryLines.push('## 优先级说明');
summaryLines.push('');
summaryLines.push('- **P0**：题目与原卷不一致（not-official-question / answer-key-conflict）、解析或参考代码为占位——直接误导学生。');
summaryLines.push('- **P1**：解析套话、部分维度从未核验、来源链接缺失。');
summaryLines.push('- **P2**：已有核验声明，仅剩补证据或展示一致性问题。');
summaryLines.push('');
summaryLines.push('## P0/P1 卷清单');
summaryLines.push('');
summaryLines.push('| paperId | 级别 | 优先级 | 主要缺口 |');
summaryLines.push('|---|---|---|---|');
for (const e of checklist.filter((x) => x.priority !== 'P2').sort((a, b) => a.priority.localeCompare(b.priority) || a.paperId.localeCompare(b.paperId))) {
  const gaps = [];
  if (e.gaps.integrityFlagged) gaps.push(`完整性标记 ${e.gaps.integrityFlagged} 题`);
  if (e.gaps.explanationPlaceholder) gaps.push(`解析占位 ${e.gaps.explanationPlaceholder} 题`);
  if (e.gaps.referenceCodePlaceholder) gaps.push(`参考代码占位 ${e.gaps.referenceCodePlaceholder} 题`);
  if (e.gaps.boilerplate) gaps.push(`解析套话 ${e.gaps.boilerplate} 题`);
  if (!gaps.length) gaps.push('仅缺核验证据');
  summaryLines.push(`| ${e.paperId} | L${e.level} | ${e.priority} | ${gaps.join('，')} |`);
}
summaryLines.push('');

if (write) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'checklist.json'), JSON.stringify({ generatedAt: new Date().toISOString(), papers: checklist }, null, 2));
  fs.writeFileSync(path.join(outDir, 'README.md'), summaryLines.join('\n'));
  console.log(`Written: docs/question-bank-verification/checklist.json + README.md (${checklist.length} papers)`);
} else {
  console.log(summaryLines.join('\n'));
}
