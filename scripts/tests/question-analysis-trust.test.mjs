import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper } from '../../src/data/gesp/index.js';
import { buildGenericStudyHint, buildRichAnalysis, selectAnalysisView } from '../../src/pages/question-bank/analysisEngine.js';

test('getPaper exposes generated verification metadata to question pages', async () => {
  const verified = await getPaper('2024-03-l1');
  const partial = await getPaper('2026-03-l1');
  const unverified = await getPaper('2025-12-l1');

  assert.equal(verified.reviewStatus, 'verified');
  assert.equal(verified.reviewedBy, 'AI-Codex');
  assert.equal(partial.reviewStatus, 'partial');
  assert.match(partial.reviewScope, /单选题 1-15/);
  assert.equal(unverified.reviewStatus, 'unverified');
  assert.equal(unverified.reviewedBy, '');
});

test('generic study hints do not change when the stored answer changes', () => {
  const question = {
    id: 1,
    type: 'single',
    question: '下面 C++ 循环执行后，变量 i 的值是什么？',
    options: ['0', '1', '2', '3'],
    answer: 0,
    explanation: '答案与解析尚未核验。',
  };

  const first = buildGenericStudyHint(question, 2);
  const second = buildGenericStudyHint({ ...question, answer: 3 }, 2);

  assert.deepEqual(first, second);
  assert.deepEqual(first.optionAnalysis, []);
  assert.equal(first.qualityFlags.genericOnly, true);
});

test('authored explanations are shown instead of the generic hint', () => {
  const judge = {
    id: 16,
    type: 'judge',
    question: '智能眼镜本质上是带计算与联网能力的设备。',
    answer: 0,
    explanation: '**答案：正确**\n\n**判定依据：**\n智能眼镜内置处理器并可联网。\n\n**考点：** 计算机系统形态',
  };
  const judgeView = selectAnalysisView(judge, 1);
  assert.equal(buildRichAnalysis(judge, 1).qualityFlags.inferred, false);
  assert.equal(judgeView.mode, 'structured');
  assert.match(judgeView.analysis.optionAnalysis[0].reason, /智能眼镜内置处理器/);

  const fullSingle = {
    id: 1,
    type: 'single',
    question: '下列哪个是 C++ 的输出语句？',
    options: ['cin', 'cout', 'int', 'return'],
    answer: 1,
    explanation: '**核心解析：**\ncout 用于输出。\n\n- **A. cin**：输入流。\n- **B. cout**：输出流，正确。\n- **C. int**：类型名。\n- **D. return**：返回语句。',
  };
  assert.equal(selectAnalysisView(fullSingle, 1).mode, 'structured');

  const structured = selectAnalysisView(fullSingle, 1);
  assert.equal(structured.analysis.extension, '', 'no template 知识延伸 when author omitted it');
  assert.deepEqual(structured.analysis.pitfalls, [], 'no template 易错提醒 when author omitted it');
  const withExt = {
    ...fullSingle,
    explanation: fullSingle.explanation + '\n\n**知识延伸：**\ncout 属于 iostream。',
  };
  assert.match(selectAnalysisView(withExt, 1).analysis.extension, /iostream/);

  const partialSingle = { ...fullSingle, explanation: '**答案：B**\n\ncout 是标准输出流对象。' };
  const partialView = selectAnalysisView(partialSingle, 1);
  assert.equal(partialView.mode, 'authored');
  assert.equal(partialView.analysis, null);
  assert.match(partialView.explanation, /cout 是标准输出流对象/);

  const noExplanation = { ...fullSingle, explanation: '' };
  const genericView = selectAnalysisView(noExplanation, 1);
  assert.equal(genericView.mode, 'generic');
  assert.equal(genericView.analysis.qualityFlags.genericOnly, true);
});
