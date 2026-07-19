#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  applyVerifiedQuestionCorrections,
  verifiedQuestionCorrections,
} from '../src/data/gesp/verifiedQuestionCorrections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');
const codeBaselinePath = path.join(__dirname, 'question-code-baseline.json');
const updateCodeBaseline = process.argv.includes('--update-code-baseline');
const codeBaseline = new Set(
  fs.existsSync(codeBaselinePath)
    ? JSON.parse(fs.readFileSync(codeBaselinePath, 'utf8')).issues || []
    : []
);

const levelConfigs = [
  { level: 1, dir: 'level1', pattern: /\d{4}-\d{2}-l1\.js$/, rules: { allowTemplate: true, tagsOptional: true } },
  { level: 2, dir: 'level2', pattern: /\d{4}-\d{2}-l2\.js$/, rules: { allowHistorical: true, tagsOptional: true } },
  { level: 3, dir: 'level3', pattern: /\d{4}-\d{2}-l3\.js$/, rules: { allowHistorical: true, tagsOptional: true } },
  { level: 4, dir: 'level4', pattern: /\d{4}-\d{2}-l4\.js$/, rules: { isAdvanced: true } },
  { level: 5, dir: 'level5', pattern: /\d{4}-\d{2}-l5\.js$/, rules: { isAdvanced: true } },
  { level: 6, dir: 'level6', pattern: /\d{4}-\d{2}-l6\.js$/, rules: { isAdvanced: true } },
  { level: 7, dir: 'level7', pattern: /\d{4}-\d{2}-l7\.js$/, rules: { isAdvanced: true } },
  { level: 8, dir: 'level8', pattern: /\d{4}-\d{2}-l8\.js$/, rules: { isAdvanced: true } },
];

const badFragments = ['待复核', '？？', '图略', '原卷A', '原卷B', '原卷C', '原卷D'];

const codePromptPatterns = [
  /(?:以下|下列|下面|如下|给定|阅读|分析).{0,24}(?:C\+\+\s*)?(?:代码|代码片段|程序段).{0,32}(?:执行|运行|输出|结果|横线|空白|填入|改为|说法)/i,
  /(?:代码|代码片段|程序段).{0,32}(?:如下|执行后|运行后|输出|横线|空白|应填|改为|逻辑判定)/i,
];

const looksLikeCode = (value) => {
  const code = String(value || '').trim();
  if (code.length < 12) return false;
  return /[;{}]/.test(code)
    && /\b(?:string|int|bool|double|char|auto|if|for|while|return|cout|cin|printf|scanf)\b|(?:<<|>>)/i.test(code);
};

const hasCodeContent = (q, text) => {
  const content = text;
  if (typeof q.code === 'string' && q.code.trim().length >= 3) return true;
  if (/```(?:cpp|c\+\+|c|text)?\s*\n[\s\S]{3,}?```/i.test(content)) return true;
  if (/\b(?:printf|scanf)\s*\([^)]{2,}\)|\b(?:cout|cin)\s*(?:<<|>>)|\b(?:if|for|while|switch)\s*\([^)]{1,}\)/i.test(content)) return true;
  if (/\b[A-Za-z_]\w*\s*(?:<<|>>)\s*(?:[A-Za-z_]\w*|\d+)/.test(content)) return true;

  const inlineCode = [...content.matchAll(/`([^`\n]+)`/g)].map(match => match[1].trim());
  if (inlineCode.some(code => code.length >= 6 && /[;{}]|\b(?:if|for|while|cout|cin|printf|scanf|return|int|bool|double)\b/i.test(code))) {
    return true;
  }

  // Some official questions compare complete programs embedded in the options.
  return Array.isArray(q.options) && q.options.filter(looksLikeCode).length >= 2;
};

const requiresCodeContent = (q, text) => (
  q.requiresCode === true || codePromptPatterns.some(pattern => pattern.test(text))
);

async function validateFile(filePath, cfg) {
  const errors = [];
  const warnings = [];
  const fileUrl = pathToFileURL(filePath).href;
  const fileName = path.basename(filePath);
  const paperId = fileName.replace(/\.js$/, '');
  const inferredCodeIssues = [];

  let paper;
  try {
    const module = await import(fileUrl);
    paper = applyVerifiedQuestionCorrections(module.paperData);
  } catch (e) {
    errors.push(`[CRITICAL] Import failed: ${e.message}`);
    return { errors, warnings, inferredCodeIssues };
  }

  if (!paper) {
    errors.push(`[ERROR] Missing paperData export`);
    return { errors, warnings, inferredCodeIssues };
  }

  // Basic fields
  if (!paper.id) errors.push(`[ERROR] Missing id`);
  if (!paper.title) errors.push(`[ERROR] Missing title`);
  if (!Array.isArray(paper.questions)) errors.push(`[ERROR] Missing questions array`);

  const configuredCorrection = verifiedQuestionCorrections[paperId];
  if (configuredCorrection) {
    if (!configuredCorrection.sourceUrl) errors.push(`[ERROR] Verified corrections must include sourceUrl`);
    for (const [questionId, correction] of Object.entries(configuredCorrection.questions || {})) {
      if (!paper.questions?.some(question => String(question.id) === questionId)) {
        errors.push(`[ERROR] Verified correction references missing Q${questionId}`);
      }
      if (!Number.isInteger(correction.sourcePage) || correction.sourcePage < 1) {
        errors.push(`[ERROR] Verified correction Q${questionId} must include a positive sourcePage`);
      }
      if ('code' in correction && (typeof correction.code !== 'string' || correction.code.trim().length < 3)) {
        errors.push(`[ERROR] Verified correction Q${questionId} contains empty code`);
      }
    }
  }

  const verification = paper.verification;
  if (verification) {
    if (!['verified', 'partial', 'unverified'].includes(verification.status)) {
      errors.push(`[ERROR] verification.status must be verified, partial, or unverified`);
    }
    if (verification.status !== 'unverified') {
      if (!paper.source?.officialPdf && !paper.source?.url) errors.push(`[ERROR] Reviewed papers must include source.officialPdf or source.url`);
      if (!verification.reviewedBy) errors.push(`[ERROR] Reviewed papers must include verification.reviewedBy`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(verification.reviewedAt || '')) errors.push(`[ERROR] Reviewed papers must include verification.reviewedAt as YYYY-MM-DD`);
    }
  }

  // Historical / Template checks
  if (paper.isHistoricalPlaceholder || paper.sourceStatus === 'template-placeholder') {
    warnings.push(`[INFO] Marked as ${paper.isHistoricalPlaceholder ? 'historical' : 'template'} placeholder`);
    if (paper.questions.length === 0) return { errors, warnings, inferredCodeIssues };
  }

  // Question validation
  const questions = paper.questions || [];
  questions.forEach((q, index) => {
    const qId = q.id || `idx_${index}`;
    
    // Type check
    if (!['single', 'judge', 'programming'].includes(q.type)) {
      errors.push(`[ERROR] Q${qId}: Invalid type "${q.type}"`);
    }

    // Text check
    const text = String(q.question || '').trim();
    if (!text && q.type !== 'programming') {
      errors.push(`[ERROR] Q${qId}: Empty question text`);
    }

    if (requiresCodeContent(q, text) && !hasCodeContent(q, text)) {
      const message = `Q${qId}: question refers to code, but no fenced, inline, or independent code content was found`;
      if (q.requiresCode === true) errors.push(`[ERROR] ${message}`);
      else {
        const issueKey = `${paperId}:Q${qId}`;
        inferredCodeIssues.push(issueKey);
        if (updateCodeBaseline || codeBaseline.has(issueKey)) warnings.push(`[CODE-BASELINE] ${message}`);
        else errors.push(`[CODE-NEW] ${message}`);
      }
    }

    if (q.requiresCode === true && !q.sourcePage && !q.sourceImage && !q.sourceUrl) {
      warnings.push(`[SOURCE] Q${qId}: requiresCode questions should include sourcePage, sourceImage, or sourceUrl for source comparison`);
    }

    if (q.sourceVerified === true) {
      if (!q.sourcePage && !q.sourceImage && !q.sourceUrl) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include sourcePage, sourceImage, or sourceUrl`);
      if (!q.reviewedBy) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include reviewedBy`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(q.reviewedAt || '')) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include reviewedAt as YYYY-MM-DD`);
    }

    // A question whose explanation admits its options/figure were reconstructed
    // must carry the structured sourceIntegrity flag, so the UI can warn about
    // it instead of the admission staying buried in prose.
    const explanationText = String(q.explanation || '');
    const admitsReconstruction = /选项为占位文本|选项原文为占位符|未包含.{0,6}配图|未包含原图|反推各遍历|串入了无关|录入串味/.test(explanationText);
    if (admitsReconstruction && !q.sourceIntegrity) {
      errors.push(`[INTEGRITY] Q${qId}: explanation admits reconstructed options/figure but question lacks sourceIntegrity flag`);
    }
    if (q.sourceIntegrity) {
      const allowed = ['options-reconstructed', 'missing-figure', 'contaminated-stem'];
      if (!allowed.includes(q.sourceIntegrity)) {
        errors.push(`[INTEGRITY] Q${qId}: unknown sourceIntegrity "${q.sourceIntegrity}"`);
      }
      if (!String(q.integrityNote || '').trim()) {
        errors.push(`[INTEGRITY] Q${qId}: sourceIntegrity requires an integrityNote`);
      }
    }

    // Fragments check (Dirty data)
    badFragments.forEach(frag => {
      if (text.includes(frag) || String(q.explanation || '').includes(frag)) {
        warnings.push(`[DIRTY] Q${qId}: suspicious fragment "${frag}"`);
      }
    });

    // Tags check
    if (!Array.isArray(q.tags) || q.tags.length === 0) {
      if (cfg.rules.tagsOptional) {
        warnings.push(`[LINT] Q${qId}: Missing tags (optional for this level)`);
      } else {
        errors.push(`[ERROR] Q${qId}: Missing tags`);
      }
    }

    // Type-specific checks
    if (q.type === 'single') {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        errors.push(`[ERROR] Q${qId}: Single choice must have 4 options`);
      }
    } else if (q.type === 'judge') {
      if (!Array.isArray(q.options) || q.options.length !== 2) {
        errors.push(`[ERROR] Q${qId}: Judge must have 2 options`);
      }
    }
  });

  return { errors, warnings, inferredCodeIssues };
}

async function run() {
  console.log('🚀 Starting Question Bank Validation...\n');
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;
  const currentCodeIssues = new Set();

  for (const cfg of levelConfigs) {
    const dir = path.join(root, cfg.dir);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => cfg.pattern.test(f)).sort();
    if (files.length === 0) continue;

    console.log(`--- Level ${cfg.level} (${files.length} files) ---`);
    for (const file of files) {
      totalFiles++;
      const fullPath = path.join(dir, file);
      const { errors, warnings, inferredCodeIssues } = await validateFile(fullPath, cfg);
      inferredCodeIssues.forEach(issue => currentCodeIssues.add(issue));
      
      if (errors.length > 0 || warnings.length > 0) {
        console.log(`${errors.length > 0 ? '❌' : '⚠️'} ${file}:`);
        errors.forEach(e => console.log(`  ${e}`));
        warnings.forEach(w => console.log(`  ${w}`));
        totalErrors += errors.length;
        totalWarnings += warnings.length;
      }
    }
    console.log('');
  }

  if (updateCodeBaseline) {
    const baseline = {
      description: 'Known questions that mention code but still require manual comparison with the official paper. New issues fail validation.',
      updatedAt: new Date().toISOString().slice(0, 10),
      issues: [...currentCodeIssues].sort(),
    };
    fs.writeFileSync(codeBaselinePath, `${JSON.stringify(baseline, null, 2)}\n`, 'utf8');
    console.log(`Updated code baseline: ${baseline.issues.length} known issues.\n`);
  } else {
    const staleIssues = [...codeBaseline].filter(issue => !currentCodeIssues.has(issue));
    if (staleIssues.length > 0) {
      totalErrors += staleIssues.length;
      console.log('❌ Code baseline contains resolved or renamed entries:');
      staleIssues.forEach(issue => console.log(`  [BASELINE-STALE] ${issue}`));
      console.log('Run npm run validate:bank:update-baseline after confirming the fixes.\n');
    }
  }

  console.log('--- Summary ---');
  console.log(`Files scanned: ${totalFiles}`);
  console.log(`Total Errors:   ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed with critical errors.');
    process.exit(1);
  } else {
    console.log('\n✅ Validation passed (with possible warnings).');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
