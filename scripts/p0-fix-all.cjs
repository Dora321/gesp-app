/**
 * GESP P0 Fix Script - Automated fixes for:
 * 1. Missing score fields on programming questions (L7/L8)
 * 2. Missing template on L4 programming questions
 * 3. LaTeX unbalanced $ fixes
 * 
 * Run: node scripts/p0-fix-all.cjs
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');
const BOILERPLATE = `#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n\\n    // 在此编写代码\\n\\n    return 0;\\n}`;

let totalScoreFixed = 0;
let totalTemplateFixed = 0;
let totalLatexFixed = 0;
let filesModified = new Set();

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.js');
    let modified = false;

    // --- Fix 1: Missing score on programming questions ---
    // Pattern: programming question objects without score field
    // We look for `type: 'programming'` blocks that don't have a `score:` line  
    const progBlockRegex = /(\{\s*\n\s*id:\s*\d+,\s*\n\s*type:\s*'programming',\s*\n\s*question:\s*`[\s\S]*?`,\s*\n\s*explanation:)([\s\S]*?)(tags:\s*\[[\s\S]*?\],\s*\n\s*template:)/g;
    
    // Simpler approach: look for programming question objects and check if score is present
    // Use line-by-line approach instead
    const lines = content.split('\n');
    let inProgrammingQ = false;
    let braceDepth = 0;
    let hasScore = false;
    let lastAnswerLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.match(/type:\s*'programming'/)) {
            inProgrammingQ = true;
            hasScore = false;
            lastAnswerLine = -1;
        }
        
        if (inProgrammingQ) {
            if (line.match(/score:\s*\d+/)) {
                hasScore = true;
            }
            if (line.match(/answer:\s*''/)) {
                lastAnswerLine = i;
            }
            // End of object - look for closing at same indent
            if (line.match(/^\s{4}\},?\s*$/) && lastAnswerLine > 0) {
                if (!hasScore) {
                    // Insert score: 25 before the answer line
                    lines.splice(lastAnswerLine, 0, "      score: 25,");
                    totalScoreFixed++;
                    modified = true;
                    i++; // account for inserted line
                }
                inProgrammingQ = false;
                hasScore = false;
                lastAnswerLine = -1;
            }
        }
    }

    content = lines.join('\n');

    // --- Fix 2: Missing template on programming questions ---
    // For L4 files that are missing template field
    if (fileName.includes('-l4')) {
        const templateCheckRegex = /type:\s*'programming'[\s\S]*?(?=\})/g;
        let match;
        while ((match = templateCheckRegex.exec(content)) !== null) {
            const block = match[0];
            if (!block.includes('template:') && block.includes("referenceCode:")) {
                // Add template before referenceCode
                content = content.replace(
                    /(type:\s*'programming'[\s\S]*?)(referenceCode:)/g,
                    (full, before, refCode) => {
                        if (!before.includes('template:')) {
                            totalTemplateFixed++;
                            modified = true;
                            return before + `template: "${BOILERPLATE}",\n      ${refCode}`;
                        }
                        return full;
                    }
                );
                break; // re-check after modification
            }
            if (!block.includes('template:') && !block.includes("referenceCode:")) {
                // Add both template and a placeholder refCode after explanation
                content = content.replace(
                    /(type:\s*'programming'[\s\S]*?explanation:\s*['"`][\s\S]*?['"`],?\s*\n)/g,
                    (full, before) => {
                        if (!before.includes('template:')) {
                            totalTemplateFixed++;
                            modified = true;
                            return before + `      template: "${BOILERPLATE}",\n`;
                        }
                        return full;
                    }
                );
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        filesModified.add(fileName);
    }
}

function fixLatex(filePath, questionId, expectedIssue) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.js');
    
    // For programming questions (Q26/Q27), the $ issues are typically in the
    // referenceCode where $n+1$ is used as array size - this is intentional C++ code,
    // not LaTeX. We should wrap those in proper escaping.
    // But for objective questions, we need to check actual LaTeX.
    
    // Let's do a targeted check - find the question text for the given ID
    const qPattern = new RegExp(`id:\\s*${questionId},[\\s\\S]*?question:\\s*[\`'"]([\\s\\S]*?)[\`'"]\\s*,`, 'g');
    const match = qPattern.exec(content);
    if (!match) return;
    
    const questionText = match[1];
    const cleanText = questionText.replace(/\\\$/g, '');
    const dollarCount = cleanText.split('$').length - 1;
    
    if (dollarCount % 2 !== 0) {
        // Found unbalanced $. Common fix: find trailing lone $ and either add closing or remove
        // For programming questions, the issue is often in referenceCode with vector<int> x($n+1$) syntax
        // which is actually intentional inline math in code. Skip those.
        
        // For now just log what we found - these need manual review
        console.log(`  ⚠️  ${fileName} Q${questionId}: ${dollarCount} unbalanced $ in question text (needs manual review)`);
        totalLatexFixed++;
    }
}

// Process all level directories
const levelDirs = fs.readdirSync(DATA_DIR)
    .filter(d => d.startsWith('level') && fs.statSync(path.join(DATA_DIR, d)).isDirectory());

for (const dir of levelDirs) {
    const dirPath = path.join(DATA_DIR, dir);
    const files = fs.readdirSync(dirPath).filter(f => /^\d{4}-\d{2}-l\d+\.js$/.test(f));
    
    for (const file of files) {
        fixFile(path.join(dirPath, file));
    }
}

// LaTeX fixes - specific known files
const latexIssues = [
    { file: 'level1/2023-06-l1.js', qid: 27 },
    { file: 'level2/2023-12-l2.js', qid: 26 },
    { file: 'level4/2023-06-l4.js', qid: 27 },
    { file: 'level5/2025-03-l5.js', qid: 27 },
    { file: 'level6/2025-03-l6.js', qid: 27 },
    { file: 'level6/2025-12-l6.js', qid: 26 },
    { file: 'level7/2023-12-l7.js', qid: 26 },
];

console.log('\n=== GESP P0 Fix Results ===\n');
console.log(`📝 Score fields fixed: ${totalScoreFixed}`);
console.log(`📝 Templates added: ${totalTemplateFixed}`);
console.log(`📁 Files modified: ${filesModified.size} (${[...filesModified].join(', ')})`);

console.log('\n--- LaTeX Issues (requires targeted fix) ---');
for (const issue of latexIssues) {
    fixLatex(path.join(DATA_DIR, issue.file), issue.qid);
}
