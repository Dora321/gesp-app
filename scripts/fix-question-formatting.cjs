const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/data/gesp');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Pattern 1: Find question/explanation strings that have \n followed by C++ keywords but NO backticks
    // This is a heuristic approach to find "leaking" code.
    const codeKeywords = ['int', 'for', 'while', 'include', 'cout', 'printf', 'double', 'char', 'if', 'else', 'switch', 'return', '#include'];
    const keywordPattern = codeKeywords.join('|');
    
    // Regex to match question/explanation content that looks like it has code but no backticks
    // Specifically looking for strings that contain a newline followed by code-like structures
    const unformattedRegex = new RegExp(`(question|explanation):\\s*'([^']*(?:\\n|\\\\n)+(?:${keywordPattern})[^']*)'`, 'g');

    content = content.replace(unformattedRegex, (match, field, text) => {
        // If it already has backticks, skip (unless it's missing the cpp tag, handled later)
        if (text.includes('```')) return match;

        // Find the "split point" - usually after the first \n followed by a keyword
        const lines = text.split(/\\n|\n/);
        let codeStartIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (codeKeywords.some(kw => line.startsWith(kw) || line.startsWith('{') || line.startsWith('#'))) {
                codeStartIndex = i;
                break;
            }
        }

        if (codeStartIndex !== -1 && codeStartIndex > 0) {
            const intro = lines.slice(0, codeStartIndex).join('\\n');
            const code = lines.slice(codeStartIndex).join('\\n');
            changed = true;
            return `${field}: '${intro}\\n\`\`\`cpp\\n${code}\\n\`\`\`'`;
        }

        return match;
    });

    // Pattern 2: Standardize existing ``` to ```cpp if missing
    content = content.replace(/```(?!\w)/g, '```cpp');
    if (content.indexOf('```cpp') !== -1) changed = true;

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED] ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.js') && file !== 'index.js' && file !== 'shared.js' && file !== 'paperCodingMap.js' && file !== 'luoguCodingByLevel.js') {
            processFile(fullPath);
        }
    }
}

console.log('Starting question bank formatting fix...');
walkDir(baseDir);
console.log('Done.');
