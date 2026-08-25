#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { applyVerifiedQuestionCorrections } from '../src/data/gesp/verifiedQuestionCorrections.js';

const ROOT = path.join(process.cwd(), 'src', 'data', 'gesp');
const OFFICIAL_MARKDOWN_DIR = process.env.GESP_OFFICIAL_MARKDOWN_DIR;
const writeCorrectionsIndex = process.argv.indexOf('--write-corrections');
const writeCorrectionsPath = writeCorrectionsIndex >= 0 ? process.argv[writeCorrectionsIndex + 1] : '';

if (!OFFICIAL_MARKDOWN_DIR) {
  console.error('Set GESP_OFFICIAL_MARKDOWN_DIR to the official markdown folder.');
  process.exit(1);
}

const codePromptPatterns = [
  /(?:以下|下列|下面|如下|给定|阅读|分析).{0,24}(?:C\+\+\s*)?(?:代码|代码片段|程序段).{0,32}(?:执行|运行|输出|结果|横线|空白|填入|改为|说法)/i,
  /(?:代码|代码片段|程序段).{0,32}(?:如下|执行后|运行后|输出|横线|空白|应填|改为|逻辑判定)/i,
];

const hasStructuredCodeContent = (q, text) => (
  typeof q.code === 'string' && q.code.trim().length >= 3
) || /```(?:cpp|c\+\+|c|text)?\s*\n[\s\S]{3,}?```/i.test(text);

const looksLikeCode = (value) => {
  const code = String(value || '').trim();
  if (code.length < 12) return false;
  return /[;{}]/.test(code)
    && /\b(?:string|int|bool|double|char|auto|if|for|while|return|cout|cin|printf|scanf)\b|(?:<<|>>)/i.test(code);
};

const hasCodeContent = (q, text) => {
  if (hasStructuredCodeContent(q, text)) return true;
  if (/\b(?:printf|scanf)\s*\([^)]{2,}\)|\b(?:cout|cin)\s*(?:<<|>>)|\b(?:if|for|while|switch)\s*\([^)]{1,}\)/i.test(text)) return true;
  if (/\b[A-Za-z_]\w*\s*(?:<<|>>)\s*(?:[A-Za-z_]\w*|\d+)/.test(text)) return true;
  const inlineCode = [...String(text || '').matchAll(/`([^`\n]+)`/g)].map(match => match[1].trim());
  if (inlineCode.some(code => code.length >= 6 && /[;{}]|\b(?:if|for|while|cout|cin|printf|scanf|return|int|bool|double)\b/i.test(code))) return true;
  return Array.isArray(q.options) && q.options.filter(looksLikeCode).length >= 2;
};

const requiresCodeContent = (q, text) => (
  q.requiresCode === true || codePromptPatterns.some(pattern => pattern.test(text))
);

const paperIdToOfficialMarkdownFile = (paperId) => {
  const match = paperId.match(/^(\d{4})-(\d{2})-l([1-8])$/);
  if (!match) return '';
  const [, year, month, level] = match;
  return `${year}年${Number(month)}月-C++${level}级.md`;
};

const getPageNumberAt = (text, index) => {
  const before = text.slice(0, Math.max(index, 0));
  const pageMatches = [...before.matchAll(/##\s*第\s*(\d+)\s*页/g)];
  if (pageMatches.length === 0) return null;
  return Number(pageMatches.at(-1)[1]);
};

const extractOfficialObjectiveChunks = (markdown) => {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const judgeIndex = normalized.search(/\n\s*判断题/u);
  const programmingIndex = normalized.search(/\n\s*(?:编程题|三、?\s*编程题|3\s*\n\s*编程题)/u);
  const singleSection = judgeIndex >= 0 ? normalized.slice(0, judgeIndex) : normalized;
  const judgeSection = judgeIndex >= 0
    ? normalized.slice(judgeIndex, programmingIndex >= 0 ? programmingIndex : undefined)
    : '';

  const chunks = new Map();
  const collect = (section, offset, maxQuestionNumber) => {
    const matches = [...section.matchAll(/第\s*(\d{1,2})\s*题/g)];
    for (let i = 0; i < matches.length; i++) {
      const num = Number(matches[i][1]);
      if (!Number.isInteger(num) || num < 1 || num > maxQuestionNumber) continue;
      const start = matches[i].index || 0;
      const end = i + 1 < matches.length ? matches[i + 1].index : section.length;
      const globalId = offset + num;
      if (!chunks.has(globalId)) {
        const absoluteStart = normalized.indexOf(section.slice(start, Math.min(start + 30, section.length)));
        chunks.set(globalId, {
          text: section.slice(start, end),
          page: getPageNumberAt(normalized, absoluteStart >= 0 ? absoluteStart : 0),
        });
      }
    }
  };

  collect(singleSection, 0, 15);
  collect(judgeSection, 15, 10);
  return chunks;
};

const isCodeLine = (line) => /[;{}()]/.test(line)
  && /\b(?:#include|using\s+namespace|struct|class|void|string|int|bool|double|char|auto|if|for|while|return|cout|cin|printf|scanf|vector|queue|stack|TreeNode|Block)\b|(?:<<|>>)/i.test(line);

const extractLikelyCode = (chunk) => {
  const rawLines = String(chunk || '').replace(/\u00a0/g, ' ').split(/\r?\n/);
  const lines = rawLines.map(line => line.trimEnd());
  const start = lines.findIndex(line => isCodeLine(line.trim()));
  if (start < 0) return '';

  const result = [];
  for (let i = start; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^(?:[口□▢☐w]\s*)?[A-D][.．、]\s*/.test(trimmed)) break;
    if (/^(?:i{1,3}|iv)\)\s*/i.test(trimmed)) break;
    if (/^第\s*\d+\s*题/.test(trimmed)) break;
    if (/^第\s*\d+\s*页\s*\/\s*共\s*\d+\s*页/.test(trimmed)) continue;
    if (/^##\s*第\s*\d+\s*页/.test(trimmed)) continue;
    if (/^\d+$/.test(trimmed)) continue;
    if (/^~~~/.test(trimmed)) continue;
    result.push(lines[i].replace(/\s+$/u, ''));
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
};

const countOfficialCodeLines = (text) => String(text || '')
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(Boolean)
  .filter(line => !/^\d+$/.test(line))
  .filter(line => !/^第\s*\d+\s*页/.test(line))
  .filter(line => !/^[A-D]\./.test(line))
  .filter(isCodeLine).length;

const loadPaper = async (paperId) => {
  const level = paperId.match(/l([1-8])$/)?.[1];
  const filePath = path.join(ROOT, `level${level}`, `${paperId}.js`);
  const module = await import(pathToFileURL(filePath).href);
  return applyVerifiedQuestionCorrections(module.paperData);
};

const paperFiles = fs.readdirSync(OFFICIAL_MARKDOWN_DIR)
  .filter(file => /^\d{4}年\d{1,2}月-C\+\+\d级\.md$/.test(file))
  .sort();

const gaps = [];
const inline = [];

for (const file of paperFiles) {
  const [, year, month, level] = file.match(/^(\d{4})年(\d{1,2})月-C\+\+(\d)级\.md$/);
  const paperId = `${year}-${String(month).padStart(2, '0')}-l${level}`;
  const paper = await loadPaper(paperId);
  const chunks = extractOfficialObjectiveChunks(fs.readFileSync(path.join(OFFICIAL_MARKDOWN_DIR, paperIdToOfficialMarkdownFile(paperId)), 'utf8'));

  for (const question of paper.questions || []) {
    if (!['single', 'judge'].includes(question.type)) continue;
    const officialChunk = chunks.get(Number(question.id));
    if (!officialChunk) continue;
    const officialCodeLines = countOfficialCodeLines(officialChunk.text);
    if (!requiresCodeContent(question, officialChunk.text) || officialCodeLines < 2) continue;

    const text = String(question.question || '');
    const row = {
      paperId,
      questionId: question.id,
      type: question.type,
      sourcePage: question.sourcePage || officialChunk.page || null,
      officialCodeLines,
      code: extractLikelyCode(officialChunk.text),
    };

    if (!hasCodeContent(question, text)) {
      gaps.push(row);
    } else if (!hasStructuredCodeContent(question, text) && !question.sourceIntegrity) {
      inline.push(row);
    }
  }
}

const rawPdfUrl = (paperId) => {
  const [, year, month, level] = paperId.match(/^(\d{4})-(\d{2})-l([1-8])$/);
  const filename = `${year}年${Number(month)}月-C++${level}级.pdf`;
  return `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/${encodeURIComponent(filename)}`;
};

const templateString = (value) => `\`${String(value)
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${')}\``;

const writeCorrections = (rows, filePath) => {
  const grouped = new Map();
  for (const row of rows) {
    if (!row.code || !row.sourcePage) continue;
    if (!grouped.has(row.paperId)) grouped.set(row.paperId, []);
    grouped.get(row.paperId).push(row);
  }

  const lines = [
    "import { q } from '../verifiedQuestionCorrectionHelpers.js';",
    '',
    '// Generated from the official GESP Markdown archive.',
    '// Re-run scripts/audit-official-code-gaps.mjs with GESP_OFFICIAL_MARKDOWN_DIR',
    '// when the official PDF/Markdown mirror is refreshed.',
    'export const verifiedCorrectionsPart4 = {',
  ];

  for (const [paperId, rowsForPaper] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  '${paperId}': {`);
    lines.push(`    sourceUrl: '${rawPdfUrl(paperId)}',`);
    lines.push("    reviewedAt: '2026-08-25',");
    lines.push('    questions: {');
    for (const row of rowsForPaper.sort((a, b) => Number(a.questionId) - Number(b.questionId))) {
      lines.push(`      ${row.questionId}: q(${row.sourcePage}, ${templateString(row.code)}),`);
    }
    lines.push('    },');
    lines.push('  },');
  }

  lines.push('};');
  lines.push('');
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
};

if (writeCorrectionsPath) {
  writeCorrections([...gaps, ...inline], path.resolve(writeCorrectionsPath));
  console.log(`Wrote official code corrections: ${writeCorrectionsPath}`);
} else {
  console.log(JSON.stringify({ gaps, inline }, null, 2));
}
