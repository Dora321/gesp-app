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

  if (TEMPLATE_PATTERNS.some(pattern => pattern.test(explanation))) {
    categories.push('template');
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
    policy: 'Existing issue keys may disappear, but no new issue key may be introduced.',
    issues,
  };
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);
};

const checkAgainstBaseline = (issues, baseline) => {
  const regressions = [];
  for (const [category, keys] of Object.entries(issues)) {
    const allowed = new Set(baseline?.issues?.[category] || []);
    for (const key of keys) {
      if (!allowed.has(key)) regressions.push(`${category}: ${key}`);
    }
  }
  return regressions;
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
      console.error('\nNew explanation quality regressions:');
      for (const regression of regressions) console.error(`- ${regression}`);
      process.exitCode = 1;
      return;
    }
    console.log('\nExplanation quality baseline passed.');
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) await main();
