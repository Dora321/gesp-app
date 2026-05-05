/**
 * Phase 1: Automated cleanup for L2-L4 format issues
 * 
 * 1.1 Remove unrelated "易混概念" paragraphs from judge questions
 * 1.2 Fix empty 考点 fields (fill from tags)
 * 1.3 Fix 考点 fields with "tags: " prefix
 * 1.4 Remove redundant "纠错" paragraphs
 * 
 * Usage: node scripts/phase1_cleanup.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const BASE = path.join(__dirname, '..', 'src', 'data', 'gesp');
const BACKTICK = String.fromCharCode(96);

let stats = {
  filesProcessed: 0,
  yihunRemoved: 0,
  kaodianFixed: 0,
  tagsPrefix: 0,
  jiucuoRemoved: 0,
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  const fileName = path.basename(filePath);

  // 1.1 Remove "易混概念" paragraphs
  const yihunPattern = /\n\s*\*\*易混概念：\*\*[^\n]*(?:\n(?!\s*\*\*)[^\n]*)*/g;
  const yihunMatches = content.match(yihunPattern);
  if (yihunMatches) {
    stats.yihunRemoved += yihunMatches.length;
    content = content.replace(yihunPattern, '');
  }

  // 1.4 Remove redundant "纠错" paragraphs
  const jiucuoPattern = /\n\s*\*\*纠错：\*\*\s*原命题说法有误。[^\n]*/g;
  const jiucuoMatches = content.match(jiucuoPattern);
  if (jiucuoMatches) {
    stats.jiucuoRemoved += jiucuoMatches.length;
    content = content.replace(jiucuoPattern, '');
  }

  // 1.2 Fix empty 考点 fields - fill from tags array
  const emptyKaodianRe = new RegExp('(\\*\\*考点：\\*\\*)\\s*' + BACKTICK, 'g');
  let match;
  const replacements = [];
  while ((match = emptyKaodianRe.exec(content)) !== null) {
    const afterPos = match.index + match[0].length;
    const searchRegion = content.substring(afterPos, afterPos + 300);
    const tagsMatch = searchRegion.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      const tags = tagsMatch[1]
        .replace(/"/g, '')
        .replace(/'/g, '')
        .split(',')
        .map(function(t) { return t.trim(); })
        .filter(function(t) {
          return t && ['单选题','判断题','GESP4级','GESP3级','GESP2级','GESP5级','编程题','客观题'].indexOf(t) === -1;
        });
      if (tags.length > 0) {
        const kaodianText = tags.join('、');
        replacements.push({
          from: match[0],
          to: '**考点：** ' + kaodianText + BACKTICK,
          index: match.index
        });
        stats.kaodianFixed++;
      }
    }
  }
  // Apply in reverse order
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    content = content.substring(0, r.index) + r.to + content.substring(r.index + r.from.length);
  }

  // 1.3 Fix "考点" with "tags:" prefix
  const tagsPrefixRe = new RegExp('\\*\\*考点：\\*\\*\\s*tags:\\s*"?([^' + BACKTICK + '\\n]*)"?', 'g');
  let tpMatch;
  while ((tpMatch = tagsPrefixRe.exec(content)) !== null) {
    const rawTags = tpMatch[1]
      .replace(/"/g, '')
      .replace(/,\s*/g, '、')
      .trim();
    if (rawTags) {
      content = content.replace(tpMatch[0], '**考点：** ' + rawTags);
      stats.tagsPrefix++;
    }
  }

  if (content !== original) {
    stats.filesProcessed++;
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('  [DONE] ' + fileName);
    } else {
      console.log('  [DRY ] ' + fileName);
    }
  }
}

console.log('\n=== Phase 1: Automated Cleanup ===');
console.log('Mode: ' + (DRY_RUN ? 'DRY RUN' : 'LIVE') + '\n');

[2, 3, 4].forEach(function(level) {
  const dir = path.join(BASE, 'level' + level);
  const files = fs.readdirSync(dir)
    .filter(function(f) {
      return f.endsWith('.js') && f !== 'shared.js' && f !== 'programming.js' && !f.endsWith('.jsx');
    });
  console.log('Level ' + level + ': ' + files.length + ' files');
  files.forEach(function(file) {
    processFile(path.join(dir, file));
  });
});

console.log('\n=== Summary ===');
console.log('Files modified: ' + stats.filesProcessed);
console.log('Yi-hun-gai-nian removed: ' + stats.yihunRemoved);
console.log('Jiu-cuo (redundant) removed: ' + stats.jiucuoRemoved);
console.log('Empty kao-dian filled: ' + stats.kaodianFixed);
console.log('"tags:" prefix fixed: ' + stats.tagsPrefix);
if (DRY_RUN) {
  console.log('\nDRY RUN - no files changed. Run without --dry-run to apply.');
}
