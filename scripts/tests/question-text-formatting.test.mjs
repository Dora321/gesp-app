import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuestionContent } from '../../src/utils/questionTextFormatting.js';

test('question code rendering preserves source indentation exactly', () => {
  const code = 'if (ready) {\n  run();\n\tdone();\n}';
  const content = buildQuestionContent({ question: '阅读代码：', code });

  assert.equal(content, `阅读代码：\n\n\`\`\`cpp\n${code}\n\`\`\``);
});
