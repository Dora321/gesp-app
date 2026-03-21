const fs = require('fs');
const path = require('path');

const levelsDir = path.join(__dirname, '../src/data/gesp');

function cleanContent(content) {
    // 1. Fix multiple headers like "# 编程题\n\n# 编程题\n\n# 交朋友"
    // We want to keep only the most specific title if available, or just one header.
    let lines = content.split('\n');
    let title = "";
    let bodyStartLine = 0;
    
    // Find consecutive header lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('# ')) {
            const currentTitle = line.substring(2).trim();
            if (currentTitle !== '编程题') {
                title = currentTitle;
            }
            bodyStartLine = i + 1;
        } else if (line === '') {
            bodyStartLine = i + 1;
        } else {
            break;
        }
    }
    
    let cleanBody = lines.slice(bodyStartLine).join('\n').trim();
    
    // 2. Fix excessive escaping: \\\\\\\\ -> \
    // In the actual JS file it looks like multiple backslashes. 
    // If it's `\\\H1` in the JS, that means the raw string has `\H1`.
    // The user screenshot shows `\\\H1`. In a template literal, `\\` renders as `\`.
    // So `\\\` renders as `\ ` followed by something? No.
    // Let's just normalize backslashes.
    
    cleanBody = cleanBody.replace(/\\+/g, '\\');
    
    // 3. Re-build
    return `# ${title || '编程题'}\n\n${cleanBody}`;
}

function processFile(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Match question: `...`
    const questionRegex = /question:\s*`([\s\S]*?)`/g;
    
    code = code.replace(questionRegex, (match, p1) => {
        if (p1.includes('# 编程题\n\n# 编程题') || p1.includes('\\\\\\')) {
            modified = true;
            return `question: \`\n${cleanContent(p1)}\n\``;
        }
        return match;
    });
    
    if (modified) {
        console.log(`  Cleaning ${path.basename(filePath)}`);
        fs.writeFileSync(filePath, code);
    }
}

// Only target 2026-03 files for now as they are the most impacted
const levelDirs = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8'];
levelDirs.forEach(dir => {
    const fullDir = path.join(levelsDir, dir);
    if (!fs.existsSync(fullDir)) return;
    
    const files = fs.readdirSync(fullDir).filter(f => f.startsWith('2026-03') && f.endsWith('.js'));
    files.forEach(file => {
        processFile(path.join(fullDir, file));
    });
});
