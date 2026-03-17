#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');

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

async function validateFile(filePath, cfg) {
  const errors = [];
  const warnings = [];
  const fileUrl = pathToFileURL(filePath).href;
  const fileName = path.basename(filePath);

  let paper;
  try {
    const module = await import(fileUrl);
    paper = module.paperData;
  } catch (e) {
    errors.push(`[CRITICAL] Import failed: ${e.message}`);
    return { errors, warnings };
  }

  if (!paper) {
    errors.push(`[ERROR] Missing paperData export`);
    return { errors, warnings };
  }

  // Basic fields
  if (!paper.id) errors.push(`[ERROR] Missing id`);
  if (!paper.title) errors.push(`[ERROR] Missing title`);
  if (!Array.isArray(paper.questions)) errors.push(`[ERROR] Missing questions array`);

  // Historical / Template checks
  if (paper.isHistoricalPlaceholder || paper.sourceStatus === 'template-placeholder') {
    warnings.push(`[INFO] Marked as ${paper.isHistoricalPlaceholder ? 'historical' : 'template'} placeholder`);
    if (paper.questions.length === 0) return { errors, warnings };
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

  return { errors, warnings };
}

async function run() {
  console.log('🚀 Starting Question Bank Validation...\n');
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;

  for (const cfg of levelConfigs) {
    const dir = path.join(root, cfg.dir);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => cfg.pattern.test(f)).sort();
    if (files.length === 0) continue;

    console.log(`--- Level ${cfg.level} (${files.length} files) ---`);
    for (const file of files) {
      totalFiles++;
      const fullPath = path.join(dir, file);
      const { errors, warnings } = await validateFile(fullPath, cfg);
      
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
