/**
 * Fix: Remove duplicate score:25 entries and fix remaining L8 scores
 * Also fix L4 missing templates
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '../src/data/gesp');
const BOILERPLATE = '#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    ios::sync_with_stdio(false);\\n    cin.tie(nullptr);\\n\\n    // 在此编写代码\\n\\n    return 0;\\n}';

let totalFixes = 0;

// === 1. Fix duplicate score: 25 in L7/L8 ===
for (const level of ['level7', 'level8']) {
    const dirPath = path.join(DATA_DIR, level);
    if (!fs.existsSync(dirPath)) continue;
    for (const file of fs.readdirSync(dirPath).filter(f => f.match(/^\d{4}/))) {
        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        const before = content;
        
        // Remove duplicate "score: 25,\n      answer: ''" -> single occurrence
        // Pattern: score: 25,\n<space>score: 25,
        content = content.replace(/(\s+score: 25,)\n\s*\n\s+answer: '',/g, '$1\n      answer: \'\',');
        // Also fix: score: 25,\n      score: 25,\n      answer
        content = content.replace(/(\s+score: 25,\n)\s+score: 25,/g, '$1');
        
        if (content !== before) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`🔧 ${file}: Removed duplicate score entries`);
            totalFixes++;
        }
    }
}

// === 2. Fix L4 missing templates ===
const l4Files = ['2025-03-l4.js', '2025-06-l4.js', '2025-09-l4.js', '2025-12-l4.js'];
for (const file of l4Files) {
    const filePath = path.join(DATA_DIR, 'level4', file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf-8');
    const before = content;
    
    // Check if programming questions lack template
    // Look for type: 'programming' blocks
    const lines = content.split('\n');
    let inProg = false;
    let hasTemplate = false;
    let insertPoints = [];
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("type: 'programming'") || lines[i].includes('type: "programming"')) {
            inProg = true;
            hasTemplate = false;
        }
        if (inProg && (lines[i].includes('template:') || lines[i].includes('template :'))) {
            hasTemplate = true;
        }
        if (inProg && (lines[i].includes('referenceCode:') || lines[i].includes('referenceCode :'))) {
            if (!hasTemplate) {
                // Insert template before this line
                insertPoints.push(i);
            }
            inProg = false;
        }
        // Also handle case where there's no referenceCode
        if (inProg && lines[i].match(/^\s+answer:/)) {
            if (!hasTemplate) {
                insertPoints.push(i);
            }
            inProg = false;
        }
    }
    
    // Insert templates in reverse order to preserve line numbers
    for (let idx = insertPoints.length - 1; idx >= 0; idx--) {
        const lineNum = insertPoints[idx];
        const indent = lines[lineNum].match(/^(\s*)/)[1];
        lines.splice(lineNum, 0, `${indent}template: "${BOILERPLATE}",`);
        console.log(`✅ ${file}: Added template at line ${lineNum}`);
        totalFixes++;
    }
    
    content = lines.join('\n');
    if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf-8');
    }
}

console.log(`\nTotal fixes applied: ${totalFixes}`);
