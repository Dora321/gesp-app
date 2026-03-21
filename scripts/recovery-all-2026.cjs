const fs = require('fs');
const path = require('path');

const levelsDir = path.join(__dirname, '../src/data/gesp');

function cleanQuestion(qText) {
    // 1. Collapse multiple headers
    let lines = qText.split('\n');
    let title = "";
    let bodyStart = 0;
    
    // Scan for headers and find the last specific one
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('# ')) {
            const currentTitle = line.substring(2).trim();
            if (currentTitle !== '编程题') {
                title = currentTitle;
            }
            bodyStart = i + 1;
        } else if (line === '' || line === '编程题') {
            // skip
            if (line === '编程题' && !title) bodyStart = i + 1;
            else if (line === '') bodyStart = i + 1;
        } else {
            break;
        }
    }
    
    let body = lines.slice(bodyStart).join('\n').trim();
    
    // 2. Collapse backslashes: replace \\+ with \
    // Note: In the source JS file, we want \` to represent a literal backtick in a template literal.
    // So if the file has \\\\\\` , it will become \` .
    body = body.replace(/\\+/g, '\\');
    
    // 3. Final construction
    return `# ${title || '编程题'}\n\n${body}`;
}

function processFile(filePath) {
    console.log(`Processing ${path.basename(filePath)}...`);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Regex to match the whole question: `...` block
    // We search for question: `[\s\S]*?` , but careful with nested escaped backticks
    // Since we know the corruption has multiple backslashes, we search for the end backtick preceeded by even/odd \ ?
    // Actually, we can just match from ` to the next ` that isn't preceeded by an ODD number of \ ... 
    // but the corruption made it unpredictable.
    
    // Safer approach: use AST or a very greedy match and then validate
    const questionRegex = /question:\s*`([\s\S]*?)`\s*,/g;
    
    content = content.replace(questionRegex, (match, p1) => {
        modified = true;
        return `question: \`\n${cleanQuestion(p1)}\n\`,\n`;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`  Updated ${path.basename(filePath)}`);
    }
}

const levelDirs = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8'];
levelDirs.forEach(dir => {
    const fullPath = path.join(levelsDir, dir);
    if (!fs.existsSync(fullPath)) return;
    const files = fs.readdirSync(fullPath).filter(f => f.startsWith('2026-03') && f.endsWith('.js'));
    files.forEach(f => processFile(path.join(fullPath, f)));
});
