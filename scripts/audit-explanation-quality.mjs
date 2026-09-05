#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPaper, paperIds, paperMeta } from '../src/data/gesp/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASELINE_PATH = path.join(__dirname, 'explanation-quality-baseline.json');

const TEMPLATE_PATTERNS = [
  /本题答案已依据试卷标准答案完成录入/,
  /该项本身符合规则，因此不是本题要选的项/,
  /理解有误，请重新分析/,
  /请重新估算最坏情况时间复杂度/,
  /请检查递归出口和参数变化/,
  /可结合题干与选项复盘对应知识点/,
];

const TRUNCATION_PATTERNS = [
  /^\s*-\s*\*\*[A-D][^*\n]{0,100}(?:\.\.\.|…{2,})\*\*/m,
  /\*\*[A-D][^*\n]{0,100}\.\.\.\*\*/,
];

const CONTRADICTION_PATTERNS = [
  /错误（(?:说法|叙述|逻辑)正确）/,
  /❌\s*错误[^。\n]{0,80}(?:该项|说法|叙述|逻辑)(?:本身)?正确/,
  /正确答案[^。\n]{0,40}错误/,
];

export function classifyExplanation(question) {
  const explanation = String(question?.explanation || '').trim();
  const categories = [];

  const isTemplate = TEMPLATE_PATTERNS.some(pattern => pattern.test(explanation));
  if (isTemplate) {
    categories.push('template');
  }

  // 模板解析会给每个未被选中的选项自动写上「：错误。」。在「以下说法不正确的是」
  // 这类题上这是反的——那几个选项本身是正确说法，只是不该选。真正写过分析的解析
  // 里出现「：错误。」是有依据的，所以这条只针对模板解析。
  if (isTemplate && /：错误。/.test(explanation)) {
    categories.push('fabricated-verdict');
  }
  if (explanation.length < 80) {
    categories.push('short');
  }
  if (TRUNCATION_PATTERNS.some(pattern => pattern.test(explanation))) {
    categories.push('truncated');
  }
  if (CONTRADICTION_PATTERNS.some(pattern => pattern.test(explanation))) {
    categories.push('contradictory');
  }
  if (explanation.length > 1500) {
    categories.push('overlong');
  }

  return categories;
}

export async function collectExplanationIssues() {
  const issues = {
    template: [],
    'fabricated-verdict': [],
    short: [],
    truncated: [],
    contradictory: [],
    overlong: [],
  };

  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    const questions = (paper.questions || []).filter(
      question => question.type === 'single' || question.type === 'judge',
    );

    for (const question of questions) {
      const key = `${paperId}:Q${question.id}`;
      for (const category of classifyExplanation(question)) {
        issues[category].push(key);
      }
    }
  }

  for (const keys of Object.values(issues)) keys.sort();
  return issues;
}

const summarize = issues => Object.fromEntries(
  Object.entries(issues).map(([category, keys]) => [category, keys.length]),
);

const loadBaseline = () => {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
};

const writeBaseline = issues => {
  const baseline = {
    generatedAt: new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date()),
    policy: '棘轮：既不允许出现新的问题条目，也不允许修好之后不收紧基线。'
      + '数量下降时 --check 会失败并提示重新记录，使 limits 只降不升，债务趋势留在 git 历史里。',
    limits: summarize(issues),
    issues,
  };
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);
};

// 旧策略只做「不许新增 key」。那能挡住恶化，却让 437 条模板解析可以永远停在
// 基线里——修不修都是绿的，没有任何收敛压力。改成棘轮：数量降下来之后必须
// 重新记录基线，上限因此只降不升，每次下降都在 git 历史里留下痕迹。
const checkAgainstBaseline = (issues, baseline) => {
  const problems = [];
  const counts = summarize(issues);

  for (const [category, keys] of Object.entries(issues)) {
    const allowed = new Set(baseline?.issues?.[category] || []);
    for (const key of keys) {
      if (!allowed.has(key)) problems.push(`新增问题条目 ${category}: ${key}`);
    }
  }

  for (const [category, count] of Object.entries(counts)) {
    const limit = baseline?.limits?.[category];
    if (!Number.isInteger(limit)) continue;
    if (count > limit) {
      problems.push(`${category} 数量 ${count} 超过基线上限 ${limit}`);
    } else if (count < limit) {
      problems.push(
        `${category} 已从 ${limit} 降到 ${count}——请运行 `
        + '`node scripts/audit-explanation-quality.mjs --update-baseline` 收紧基线，把这次改进固化下来',
      );
    }
  }

  return problems;
};

async function main() {
  const args = new Set(process.argv.slice(2));
  const issues = await collectExplanationIssues();

  if (args.has('--update-baseline')) {
    writeBaseline(issues);
    console.log(`Updated ${path.relative(path.join(__dirname, '..'), BASELINE_PATH)}`);
  }

  const baseline = loadBaseline();
  console.log('--- Explanation quality audit ---');
  for (const [category, count] of Object.entries(summarize(issues))) {
    console.log(`${category.padEnd(15)} ${count}`);
  }

  if (args.has('--check')) {
    if (!baseline) {
      console.error('Explanation quality baseline is missing.');
      process.exitCode = 1;
      return;
    }
    const regressions = checkAgainstBaseline(issues, baseline);
    if (regressions.length) {
      console.error('\n解析质量棘轮未通过：');
      for (const regression of regressions) console.error(`- ${regression}`);
      process.exitCode = 1;
      return;
    }
    console.log('\nExplanation quality baseline passed.');
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) await main();
