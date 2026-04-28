const fs = require('fs');
const path = require('path');

// Use require to fetch the internal logic of rewrite-option-analysis if possible, 
// but since it doesn't export, we'll just rewrite the file content parser specifically for L1.

const l1Files = fs.readdirSync('src/data/gesp/level1').filter(f => f.endsWith('.js') && f.includes('l1'));

for (const file of l1Files) {
    const fullPath = path.join('src/data/gesp/level1', file);
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // We will find explanations using regex
    // The pattern is typically:
    // explanation: `...`
    // We can replace line by line.

    const lines = content.replace(/\r/g, '').split('\n');
    let inExplanation = false;
    let coreAnalysis = "";
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('explanation: `')) {
            inExplanation = true;
            // Next few lines usually contain **解析：**
            // Let's grab the core analysis
            let j = i + 1;
            while (j < lines.length && !lines[j].includes('- **A')) {
                if (lines[j].trim() !== '' && !lines[j].includes('**解析：**') && !lines[j].includes('**答案：')) {
                    coreAnalysis += lines[j].trim() + " ";
                }
                j++;
            }
            coreAnalysis = coreAnalysis.trim();
            continue;
        }
        
        if (inExplanation && line.includes('`,')) {
            inExplanation = false;
            coreAnalysis = "";
            continue;
        }

        if (inExplanation && line.match(/^\s*-\s*\*\*([A-Z])\s+.*?\*\*\s*：(正确|错误)。(.*)$/)) {
            const match = line.match(/^\s*-\s*\*\*([A-Z])\s+(.*?)\*\*\s*：(正确|错误)。(.*)$/);
            if (match) {
                const optLetter = match[1];
                const optText = match[2];
                const isCorrect = match[3] === '正确';
                const tailAnalysis = match[4].trim();

                // It's a generated generic response. Let's fix it!
                if (isCorrect) {
                    lines[i] = line.replace(/：正确。.*$/, `：✅ 正确。${tailAnalysis}`);
                } else {
                    // Try to generate a specific error if it's purely a copy-paste of tailAnalysis
                    // We can just signify it as wrong, but maybe modify the text slightly.
                    // For now, let's at least add the red cross and make it not look exactly like the correct option.
                    
                    let wrongReason = `❌ 错误。该选项不满足条件，正确情况应为：${tailAnalysis}`;
                    
                    // Specific overrides for numeric/code options can be done here.
                    
                    lines[i] = line.replace(/：错误。.*$/, `：${wrongReason}`);
                }
                modified = true;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
        console.log(`Updated ${file}`);
    }
}
