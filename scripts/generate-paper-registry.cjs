/**
 * Generate paper registry from directory scan — eliminates manual sync of
 * paperIds / paperMeta / loaders when adding new papers.
 *
 * Usage: node scripts/generate-paper-registry.cjs
 *
 * Scans src/data/gesp/level{1-8}/ and writes:
 * - src/data/gesp/_generated.js for paper metadata and loaders
 * - src/data/gesp/_stats.js for lightweight site-wide counters
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '../src/data/gesp');
const LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8'];
const OUTPUT_FILE = path.resolve(DATA_DIR, '_generated.js');
const OUTPUT_STATS_FILE = path.resolve(DATA_DIR, '_stats.js');
const VERIFIED_CORRECTIONS_FILE = path.resolve(DATA_DIR, 'verifiedQuestionCorrections.js');
const VERIFIED_CORRECTIONS_DIR = path.resolve(DATA_DIR, 'verified-corrections');

// ===== Utils =====

function extractArrayBlock(content, startPos) {
  let i = startPos;
  let depth = 0;
  let inTemplate = false, inSingleQuote = false, inDoubleQuote = false;

  while (i < content.length) {
    const ch = content[i];
    const prev = i > 0 ? content[i - 1] : '';
    if (ch === '`' && prev !== '\\' && !inSingleQuote && !inDoubleQuote) inTemplate = !inTemplate;
    else if (ch === "'" && prev !== '\\' && !inTemplate && !inDoubleQuote) inSingleQuote = !inSingleQuote;
    else if (ch === '"' && prev !== '\\' && !inTemplate && !inSingleQuote) inDoubleQuote = !inDoubleQuote;
    if (!inTemplate && !inSingleQuote && !inDoubleQuote) {
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) return content.substring(startPos, i + 1); }
    }
    i++;
  }
  return content.substring(startPos);
}

function countQuestions(content) {
  let total = 0;
  for (const key of ['questions', 'programmingQuestions', 'codingQuestions']) {
    const re = new RegExp(`${key}\\s*:\\s*\\[`, 'g');
    let match;
    while ((match = re.exec(content)) !== null) {
      const block = extractArrayBlock(content, match.index + match[0].length - 1);
      const ids = block.match(/{\s*(?:\/\/[^\n]*\n\s*)*id:/g);
      if (ids) total += ids.length;
    }
  }

  // Some papers hoist programming questions into a file-level array and spread
  // it into paperData.questions. Count those arrays without executing data files.
  const hoistedQuestionArrays = /(?:const|let|var)\s+(?:programmingQuestions|codingQuestions)\s*=\s*\[/g;
  let hoistedMatch;
  while ((hoistedMatch = hoistedQuestionArrays.exec(content)) !== null) {
    const block = extractArrayBlock(content, hoistedMatch.index + hoistedMatch[0].length - 1);
    const ids = block.match(/{\s*(?:\/\/[^\n]*\n\s*)*id:/g);
    if (ids) total += ids.length;
  }

  return total;
}

function countPlaceholderMarkers(content) {
  const markers = [
    /待补充/g,
    /待补全/g,
    /题面暂缺/g,
    /提取异常/g,
    /\[待补充选项\]/g,
    /\/\*\s*TODO\s*\*\//g,
    /\/\/\s*TODO/g,
  ];

  return markers.reduce((total, marker) => total + (content.match(marker) || []).length, 0);
}

function extractObjectBlock(content, key) {
  const match = new RegExp(`${key}\\s*:\\s*\\{`).exec(content);
  if (!match) return '';

  let depth = 0;
  let quote = '';
  for (let i = match.index + match[0].length - 1; i < content.length; i++) {
    const ch = content[i];
    const prev = i > 0 ? content[i - 1] : '';
    if (quote) {
      if (ch === quote && prev !== '\\') quote = '';
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}' && --depth === 0) return content.slice(match.index, i + 1);
  }
  return '';
}

function getStringField(content, key) {
  return content.match(new RegExp(`${key}\\s*:\\s*(['\"\`])([^'\"\`\\n]+)\\1`))?.[2] || '';
}

function jsString(value) {
  return `'${String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function readVerifiedCorrectionMeta() {
  const files = [];
  if (fs.existsSync(VERIFIED_CORRECTIONS_FILE)) files.push(VERIFIED_CORRECTIONS_FILE);
  if (fs.existsSync(VERIFIED_CORRECTIONS_DIR)) {
    files.push(...fs.readdirSync(VERIFIED_CORRECTIONS_DIR)
      .filter(file => file.endsWith('.js'))
      .map(file => path.join(VERIFIED_CORRECTIONS_DIR, file)));
  }

  const corrections = new Map();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const paperPattern = /^\s*'(\d{4}-\d{2}-l\d)':\s*\{/gm;
    const matches = [...content.matchAll(paperPattern)];

    matches.forEach((match, index) => {
      const end = matches[index + 1]?.index ?? content.length;
      const block = content.slice(match.index, end);
      const sourceUrl = block.match(/sourceUrl:\s*'([^']+)'/)?.[1] || '';
      corrections.set(match[1], { sourceUrl });
    });

    const appendedCorrectionPattern = /addVerifiedQuestionCorrections\(\s*'(\d{4}-\d{2}-l\d)',\s*'([^']+)'/g;
    for (const match of content.matchAll(appendedCorrectionPattern)) {
      corrections.set(match[1], { sourceUrl: match[2] });
    }
  }

  return corrections;
}

// ===== Scan & Generate =====

const papers = [];
const verifiedCorrectionMeta = readVerifiedCorrectionMeta();

for (const levelDir of LEVELS) {
  const dirPath = path.join(DATA_DIR, levelDir);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js') && f !== 'shared.js' && /^\d{4}-\d{2}-l\d\.js$/.test(f));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const paperId = file.replace(/\.js$/, '');
    const relativePath = `./${levelDir}/${file}`;

    const content = fs.readFileSync(filePath, 'utf-8');
    const questionCount = countQuestions(content);
    const placeholderCount = countPlaceholderMarkers(content);

    // Extract metadata from paperId: e.g., '2023-03-l1' → { year:2023, month:3, level:1 }
    const [, year, month, level] = paperId.match(/^(\d{4})-(\d{2})-l(\d)$/);
    // Prefer the paper's own title (may carry disclaimers like “历史占位，非正式真题”).
    // Search only between the paperData declaration and its first question array, so
    // per-question titles (including hoisted programmingQuestions consts) don't match.
    const paperStart = Math.max(0, content.search(/export\s+const\s+paperData\s*=/));
    const afterPaper = content.slice(paperStart);
    const arrCut = afterPaper.search(/(?:questions|programmingQuestions|codingQuestions)\s*:\s*\[/);
    const head = arrCut >= 0 ? afterPaper.slice(0, arrCut) : afterPaper;
    const fileTitle = head.match(/title\s*:\s*(['"`])([^'"`\n]+)\1/)?.[2];
    const title = fileTitle || `${year}年${month}月 GESP C++ ${'一二三四五六七八'[parseInt(level) - 1]}级真题`;
    const unofficial = /占位|非正式/.test(title);
    const sourceBlock = extractObjectBlock(head, 'source');
    const verificationBlock = extractObjectBlock(head, 'verification');
    const sourceType = getStringField(sourceBlock, 'type');
    const sourceUrl = getStringField(sourceBlock, 'officialPdf') || getStringField(sourceBlock, 'url');
    const sourceNotes = getStringField(sourceBlock, 'notes');
    const explicitStatus = getStringField(verificationBlock, 'status');
    const reviewStatus = explicitStatus
      || (sourceType === 'official-verified' ? 'verified' : '')
      || (/已对照官方\s*PDF\s*校订/.test(sourceNotes) ? 'partial' : 'unverified');
    const reviewedBy = getStringField(verificationBlock, 'reviewedBy');
    const reviewedAt = getStringField(verificationBlock, 'reviewedAt');
    const reviewScope = getStringField(verificationBlock, 'scope');

    const correctionMeta = verifiedCorrectionMeta.get(paperId);
    papers.push({
      id: paperId,
      level: parseInt(level, 10),
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      title,
      questionCount,
      placeholderCount,
      unofficial,
      reviewStatus: correctionMeta ? 'partial' : reviewStatus,
      reviewedBy: correctionMeta ? '本站校订' : reviewedBy,
      reviewedAt: correctionMeta ? '2026-07-06' : reviewedAt,
      reviewScope: correctionMeta ? '疑似缺失或错误的代码题已对照官方 PDF 校订。' : reviewScope,
      sourceUrl: correctionMeta?.sourceUrl || sourceUrl,
      relativePath,
    });
  }
}

const knownPaperIds = new Set(papers.map(paper => paper.id));
for (const paperId of verifiedCorrectionMeta.keys()) {
  if (!knownPaperIds.has(paperId)) {
    throw new Error(`Verified correction references unknown paper: ${paperId}`);
  }
}

// Sort: by level, then year, then month
papers.sort((a, b) => a.level - b.level || a.year - b.year || a.month - b.month);

// ===== Generate _generated.js =====

const paperIdsLine = papers.map(p => `  '${p.id}',`).join('\n');
const paperMetaLines = papers.map(p =>
  `  '${p.id}': { level: ${p.level}, year: ${p.year}, month: ${p.month}, title: ${jsString(p.title)}, questionCount: ${p.questionCount}, placeholderCount: ${p.placeholderCount}, needsReview: ${p.placeholderCount > 0}, unofficial: ${p.unofficial}, reviewStatus: ${jsString(p.reviewStatus)}, reviewedBy: ${jsString(p.reviewedBy)}, reviewedAt: ${jsString(p.reviewedAt)}, reviewScope: ${jsString(p.reviewScope)}, sourceUrl: ${jsString(p.sourceUrl)} },`
).join('\n');
const loadersLines = papers.map(p =>
  `    '${p.id}': () => import('${p.relativePath}').then(m => m.paperData),`
).join('\n');

const output = `// Auto-generated by scripts/generate-paper-registry.cjs
// DO NOT EDIT MANUALLY — regenerate with: node scripts/generate-paper-registry.cjs

export const paperIds = [
${paperIdsLine}
];

export const paperMeta = {
${paperMetaLines}
};

export const loaders = {
${loadersLines}
};
`;

fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
const stats = {
  paperCount: papers.length,
  questionCount: papers.reduce((sum, p) => sum + p.questionCount, 0),
  reviewPaperCount: papers.filter(p => p.placeholderCount > 0).length,
  verifiedPaperCount: papers.filter(p => p.reviewStatus === 'verified').length,
  partialPaperCount: papers.filter(p => p.reviewStatus === 'partial').length,
  unverifiedPaperCount: papers.filter(p => p.reviewStatus === 'unverified').length,
  levelCount: new Set(papers.map(p => p.level)).size,
  firstYear: Math.min(...papers.map(p => p.year)),
  latestYear: Math.max(...papers.map(p => p.year)),
};

const statsOutput = `// Auto-generated by scripts/generate-paper-registry.cjs
// DO NOT EDIT MANUALLY - regenerate with: node scripts/generate-paper-registry.cjs

export const paperStats = {
  paperCount: ${stats.paperCount},
  questionCount: ${stats.questionCount},
  reviewPaperCount: ${stats.reviewPaperCount},
  verifiedPaperCount: ${stats.verifiedPaperCount},
  partialPaperCount: ${stats.partialPaperCount},
  unverifiedPaperCount: ${stats.unverifiedPaperCount},
  levelCount: ${stats.levelCount},
  firstYear: ${stats.firstYear},
  latestYear: ${stats.latestYear},
};
`;

fs.writeFileSync(OUTPUT_STATS_FILE, statsOutput, 'utf-8');
console.log(`Generated ${OUTPUT_FILE} with ${papers.length} papers.`);
console.log(`Generated ${OUTPUT_STATS_FILE}.`);
console.log(`Total question count across all papers: ${stats.questionCount}`);
