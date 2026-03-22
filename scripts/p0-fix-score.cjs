/**
 * Fix 1: Add missing score: 25 to programming questions in L7/L8
 * These files have a specific structure where programmingQuestions are separate
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '../src/data/gesp');

const targetFiles = [];

// Collect L7 and L8 files
for (const level of ['level7', 'level8']) {
    const dirPath = path.join(DATA_DIR, level);
    if (!fs.existsSync(dirPath)) continue;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));
    files.forEach(f => targetFiles.push(path.join(dirPath, f)));
}

let fixed = 0;

for (const filePath of targetFiles) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const baseName = path.basename(filePath);
    
    // Check if there are programming questions without score
    // Pattern: answer: '', followed by newline and closing brace (no score between)
    if (content.includes("answer: '',") && !content.includes("score: 25,\n      answer: ''")) {
        // Insert score: 25 before each "answer: ''" in programming questions
        const newContent = content.replace(
            /(\s+)answer: '',/g, 
            (match, indent) => `${indent}score: 25,\n${indent}answer: '',`
        );
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            const count = (newContent.match(/score: 25,\n\s+answer: '',/g) || []).length;
            console.log(`✅ ${baseName}: Added score: 25 to ${count} programming question(s)`);
            fixed += count;
        }
    } else {
        // Check if score already exists
        if (content.includes("score: 25")) {
            console.log(`⏭️  ${baseName}: Already has score field`);
        }
    }
}

console.log(`\nTotal score fields added: ${fixed}`);
