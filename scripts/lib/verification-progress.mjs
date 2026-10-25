// Build-time adapter for the audit team's evidence documents. These documents
// never enter the browser bundle. Unknown prose is NOT interpreted as approval.
export const dimensionKeys = ['statement', 'options', 'answer', 'explanation', 'referenceCode'];

import { summarizeVerification } from '../../src/data/gesp/verificationModel.js';

function answerIndex(value, type) {
  if (Number.isInteger(value)) return value;
  const token = String(value ?? '').trim();
  if (type === 'single' && /^[A-D]$/.test(token)) return token.charCodeAt(0) - 65;
  if (type === 'judge') {
    if (['√', '正确'].includes(token)) return 0;
    if (['×', '错误'].includes(token)) return 1;
  }
  return null;
}

function tableTokens(value, type) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  const compact = value.replace(/[\s,，、]/g, '');
  return (type === 'single' ? /^[A-D]+$/ : /^[√×]+$/).test(compact) ? [...compact] : [];
}

export function buildVerificationProgress({ paper, legacy = {}, evidence, source }) {
  const questions = [...new Map([
    ...(paper.questions || []), ...(paper.programmingQuestions || []), ...(paper.codingQuestions || []),
  ].map(q => [Number(q.id), q])).values()];
  const byId = new Map(questions.map(q => [Number(q.id), q]));
  const applicable = {
    statement: questions,
    options: questions.filter(q => q.type === 'single'),
    answer: questions.filter(q => ['single', 'judge'].includes(q.type)),
    explanation: questions,
    referenceCode: questions.filter(q => q.type === 'programming'),
  };
  const reviewed = Object.fromEntries(dimensionKeys.map(key => [key, new Set()]));
  const partial = new Set();
  const conflicts = new Set();
  const add = (key, id) => {
    const q = byId.get(Number(id));
    // A retained source defect always wins over a review claim.
    if (!q || q.sourceIntegrity || q.needsReview || !applicable[key]?.includes(q)) return;
    reviewed[key].add(Number(id));
  };

  // Preserve explicitly scoped historical reviews, not the old blanket badge.
  // "代码" in an objective question is statement content, NOT a reference program.
  const scope = String(legacy.scope || '');
  const keywords = {
    statement: /题面|题干|代码/, options: /选项/, answer: /答案/,
    explanation: /解析|讲解/, referenceCode: /参考代码|参考程序/,
  };
  for (const key of dimensionKeys) {
    const state = legacy.dimensions?.[key]
      || (keywords[key].test(scope) ? legacy.status : 'unverified');
    if (state === 'verified') applicable[key].forEach(q => add(key, q.id));
    if (state === 'partial') partial.add(key);
  }

  const usable = evidence?.paperId === paper.id && evidence.source?.shaVerified === true
    && /^[a-f0-9]{40}$/i.test(evidence.source.mirrorSha || '')
    && evidence.source.mirrorSha === source?.mirrorSha;
  if (usable) {
    const recordAnswer = (id, value) => {
      const q = byId.get(Number(id));
      const expected = q && answerIndex(value, q.type);
      if (expected === null || expected === undefined || !['single', 'judge'].includes(q?.type)) return;
      if (expected === q.answer) add('answer', id);
      else { conflicts.add(Number(id)); reviewed.answer.delete(Number(id)); }
    };
    for (const type of ['single', 'judge']) {
      const group = applicable.answer.filter(q => q.type === type).sort((a, b) => a.id - b.id);
      const table = evidence.answerTable;
      const tokens = tableTokens(table?.content?.[type] ?? table?.[type]?.content, type);
      // Never shift a truncated table onto a complete paper.
      if (tokens.length === group.length) group.forEach((q, index) => recordAnswer(q.id, tokens[index]));
    }
    for (const entry of evidence.questions || []) {
      const q = byId.get(Number(entry.id));
      if (!q || entry.resolved === false || entry.match === false) continue;
      if (entry.resolved === true) {
        for (const key of entry.dimensions || []) if (dimensionKeys.includes(key)) add(key, q.id);
      }
      recordAnswer(q.id, entry.official ?? entry.officialAnswer ?? entry.answer);
      if (entry.textMatch === true) add('statement', q.id);
      // The four full-paper transcription reports record the review method per
      // question. Only these explicit rebuild reports expand statement/options;
      // a generic "fixed" note or a passing sample cannot certify explanations.
      const methods = Array.isArray(entry.method) ? entry.method.join('；') : '';
      if ((evidence.rebuild || evidence.rebuildNote) && /原卷.*(?:转写|重录|重建)/.test(methods)) {
        add('statement', q.id);
        add('options', q.id);
        if (/参考程序/.test(methods) && /转写|核对/.test(methods)) add('referenceCode', q.id);
      }
    }
    for (const entry of evidence.judgeAnswerAudit?.items || []) recordAnswer(entry.qid, entry.officialAnswer);
    // A conflict from any source stays unresolved even if another entry matches.
    for (const id of conflicts) reviewed.answer.delete(id);
  }

  const coverage = Object.fromEntries(dimensionKeys.map(key => [key, {
    reviewed: reviewed[key].size, total: applicable[key].length,
  }]));
  const unresolved = usable && (evidence.unresolved?.length > 0 || conflicts.size > 0);
  const dimensions = Object.fromEntries(dimensionKeys.map(key => {
    const { reviewed: count, total } = coverage[key];
    return [key, count > 0 && count === total && !unresolved ? 'verified'
      : count > 0 || partial.has(key) ? 'partial' : 'unverified'];
  }));
  const status = summarizeVerification(dimensions);
  return {
    status, dimensions, coverage,
    reviewedBy: usable ? `${evidence.reviewedBy?.type || '审校'} · ${evidence.reviewedBy?.executor || '证据记录'}` : legacy.reviewedBy || '',
    reviewedAt: usable ? evidence.judgeAnswerAudit?.executedAt || evidence.reviewedAt || evidence.executedAt || '' : legacy.reviewedAt || '',
    scope: '按已登记证据分项统计；答案仅指客观题，参考代码仅指编程题。未决问题保留部分核验状态。',
    evidence: Boolean(usable),
    conflicts: [...conflicts],
  };
}
