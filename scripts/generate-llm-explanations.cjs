#!/usr/bin/env node
/**
 * Generate audited, question-aware explanations with Claude Code.
 *
 * Usage:
 *   node scripts/generate-llm-explanations.cjs \
 *     --file src/data/gesp/level1/2026-03-l1.js \
 *     --questions 1-10 \
 *     --model kimi-k2.6 \
 *     --apply
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

const OUTPUT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'answer', 'needsReview', 'explanation'],
        properties: {
          id: { type: 'number' },
          answer: { type: 'string' },
          needsReview: { type: 'boolean' },
          explanation: { type: 'string' },
        },
      },
    },
  },
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (!item.startsWith('--')) continue;
    const key = item.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function parseQuestionIds(spec, allIds) {
  if (!spec || spec === 'all') return allIds;
  const ids = new Set();
  for (const part of spec.split(',').map((s) => s.trim()).filter(Boolean)) {
    const range = part.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let id = start; id <= end; id += 1) ids.add(id);
    } else if (/^\d+$/.test(part)) {
      ids.add(Number(part));
    }
  }
  return allIds.filter((id) => ids.has(id));
}

function expectedAnswer(q) {
  if (q.type === 'judge' || q.type === 'tf') {
    return q.answer === 0 ? '正确' : '错误';
  }
  return OPTION_LABELS[q.answer];
}

function normalizeQuestion(q) {
  const answer = expectedAnswer(q);
  const options = Array.isArray(q.options) ? q.options : [];
  return {
    id: q.id,
    type: q.type || 'single',
    question: q.question || q.description || q.title || '',
    options,
    answer,
    answerText: typeof q.answer === 'number' ? (options[q.answer] || answer) : answer,
    existingExplanation: q.explanation || '',
  };
}

function buildPrompt(paperData, questions) {
  const payload = {
    paper: {
      id: paperData.id,
      title: paperData.title,
      level: paperData.level,
      year: paperData.year,
      month: paperData.month,
    },
    questions,
  };

  return `你是 GESP C++ 认证题库解析专家。请基于题干、代码、选项和给定 answer 字段，逐题生成“理解题目后严谨推理”的高质量中文解析。

硬性要求：
1. 不允许改变答案；必须以输入里的 answer 为准。若你发现题干/选项/答案疑似冲突，在对应 item 写 needsReview=true，并仍按给定 answer 写解析。
2. 不能使用空泛模板话术，例如“与题目要求不符”“请重新验算”“带偏节奏”“内存心跳”“灵魂”等。
3. 代码执行题必须逐行推导变量状态、表达式值、输出格式；概念题必须说明概念边界；错误选项必须分别解释“该选项本身为什么错”。
4. 解析要面向 GESP 学员，专业、清楚、可复盘。避免炫技，避免口语化夸张。
5. 每道选择题必须完整覆盖 A/B/C/D；判断题必须说明为什么“正确/错误”。
6. 选择题的 ✅ 只能出现在 answer 指定的唯一正确选项上；所有非答案选项必须使用 ❌。遇到“不能/错误/不正确”这类反向题时，即使某个非答案选项本身是事实正确的，也要标 ❌，并说明“它不是本题要选的项”。

选择题 explanation 格式必须严格为：
**答案：A (选项文本)**

**核心解析：**
1-3 段或编号步骤，给出真正推理过程。

**选项逐项分析：**
- **A (选项文本)**：✅/❌ ...
- **B (选项文本)**：✅/❌ ...
- **C (选项文本)**：✅/❌ ...
- **D (选项文本)**：✅/❌ ...

**易错提醒：**
- 针对本题的具体易错点 1
- 针对本题的具体易错点 2

**知识延伸：**
1-2 句话，连接到同类 GESP 考点或 C++ 规则。

**考点：** 简洁考点归纳

判断题 explanation 格式必须严格为：
**答案：正确/错误**

**判定依据：**
给出严谨判断过程。

**易错提醒：**
- 针对本题的具体易错点 1
- 针对本题的具体易错点 2

**知识延伸：**
1-2 句话，连接到同类 GESP 考点或 C++ 规则。

**考点：** 简洁考点归纳

只输出 JSON，不要 Markdown 代码块，不要额外解释。JSON 结构：
{
  "items": [
    { "id": 1, "answer": "A", "needsReview": false, "explanation": "..." }
  ]
}

输入题目如下：
${JSON.stringify(payload, null, 2)}
`;
}

function parseClaudeJson(raw) {
  const outer = JSON.parse(raw);
  let text = outer.result || raw;
  text = text.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(text);
}

function escapeTemplateLiteral(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function replaceQuestionExplanation(content, id, explanation) {
  const startMarker = new RegExp(`\\n\\s*\\{\\s*\\n\\s*id:\\s*${id}\\s*,`);
  const startMatch = content.match(startMarker);
  if (!startMatch || startMatch.index === undefined) {
    throw new Error(`Question ${id}: object start not found`);
  }
  const start = startMatch.index;
  const next = content.indexOf('\n    },', start + 1);
  if (next === -1) throw new Error(`Question ${id}: object end not found`);
  const end = next + '\n    },'.length;
  const block = content.slice(start, end);
  const replaced = block.replace(
    /(\n\s*explanation:\s*)(`(?:\\[\s\S]|[^`])*`|'(?:\\[\s\S]|[^'])*'|"(?:\\[\s\S]|[^"])*")(\s*,)/,
    `$1\`${escapeTemplateLiteral(explanation)}\`$3`
  );
  if (replaced === block) {
    throw new Error(`Question ${id}: explanation field not found`);
  }
  return content.slice(0, start) + replaced + content.slice(end);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file) {
    console.error('Missing --file');
    process.exit(1);
  }

  const repoRoot = path.resolve(__dirname, '..');
  const filePath = path.resolve(repoRoot, args.file);
  const model = args.model || 'kimi-k2.6';
  const budget = args.budget || args['max-budget-usd'] || '1.5';
  const apply = Boolean(args.apply);

  const mod = await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`);
  const paperData = mod.paperData;
  if (!paperData?.questions?.length) {
    throw new Error(`No paperData.questions found in ${filePath}`);
  }

  const candidateQuestions = paperData.questions
    .filter((q) => q.type !== 'coding' && q.type !== 'programming')
    .map(normalizeQuestion);
  const selectedIds = parseQuestionIds(args.questions, candidateQuestions.map((q) => q.id));
  const selected = candidateQuestions.filter((q) => selectedIds.includes(q.id));
  if (selected.length === 0) throw new Error('No questions selected');

  const prompt = buildPrompt(paperData, selected);
  const claudeArgs = [
    '--bare',
    '-p',
    '--model', model,
    '--max-budget-usd', String(budget),
    '--output-format', 'json',
  ];
  if (args.schema) {
    claudeArgs.push('--json-schema', JSON.stringify(OUTPUT_SCHEMA));
  }

  const raw = execFileSync('claude', claudeArgs, {
    input: prompt,
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024 * 20,
    timeout: Number(args.timeout || 120000),
  });

  const outDir = path.resolve(repoRoot, 'scratch', 'llm-explanations');
  fs.mkdirSync(outDir, { recursive: true });
  const rawPath = path.join(outDir, `${paperData.id}-${selectedIds[0]}-${selectedIds[selectedIds.length - 1]}.raw.json`);
  fs.writeFileSync(rawPath, raw, 'utf-8');

  const result = parseClaudeJson(raw);
  if (!Array.isArray(result.items)) throw new Error('Claude output missing items array');

  const byId = new Map(selected.map((q) => [q.id, q]));
  for (const item of result.items) {
    const source = byId.get(item.id);
    if (!source) throw new Error(`Unexpected item id ${item.id}`);
    if (item.answer !== source.answer) {
      throw new Error(`Question ${item.id}: answer mismatch from Claude (${item.answer}) expected ${source.answer}`);
    }
    if (!item.explanation || item.explanation.length < 80) {
      throw new Error(`Question ${item.id}: explanation too short`);
    }
  }

  const outPath = args.out
    ? path.resolve(repoRoot, args.out)
    : path.join(outDir, `${paperData.id}-${selectedIds[0]}-${selectedIds[selectedIds.length - 1]}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(result, null, 2)}\n`, 'utf-8');

  if (apply) {
    let content = fs.readFileSync(filePath, 'utf-8');
    for (const item of result.items) {
      content = replaceQuestionExplanation(content, item.id, item.explanation.trim());
    }
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  console.log(JSON.stringify({
    ok: true,
    model,
    file: path.relative(repoRoot, filePath),
    questions: selectedIds,
    output: path.relative(repoRoot, outPath),
    applied: apply,
    needsReview: result.items.filter((item) => item.needsReview).map((item) => item.id),
  }, null, 2));
}

main().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
