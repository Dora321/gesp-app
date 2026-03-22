/**
 * GESP P1 Fixes Script
 * 1. Clean '选项A' dirty data by replacing with '[待补充选项]'
 * 2. Add `samples: [{ input: '待补充', output: '待补充' }]` to programming questions without samples.
 * 3. Add `referenceCode: '// 待补充'` to programming questions without referenceCode.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');

let dirtyFixed = 0;
let samplesFixed = 0;
let refCodeFixed = 0;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. Fix dirty "选项A"
    const originalContent = content;
    // We want to replace exactly "选项A" or '选项A' in options array
    content = content.replace(/(['"])选项A\1/g, '"[待补充选项]"');
    if (content !== originalContent) {
        // Count how many replacements roughly
        dirtyFixed += (originalContent.match(/(['"])选项A\1/g) || []).length;
        modified = true;
    }

    // Process line by line for samples and referenceCode
    let lines = content.split('\n');
    let inProg = false;
    let hasSamples = false;
    let hasRefCode = false;
    let lastKnownPropIndex = -1;
    let braceDepth = 0;
    
    // Some L8 files use programmingQuestions spread or import.
    // We will do a robust block-based analysis based on "type: 'programming'"
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.match(/type:\s*['"]programming['"]/)) {
            inProg = true;
            hasSamples = false;
            hasRefCode = false;
            lastKnownPropIndex = i;
        }

        if (inProg) {
            // Track inner braces to know when object ends
            const openBraces = (line.match(/\{/g) || []).length;
            const closeBraces = (line.match(/\}/g) || []).length;
            braceDepth += (openBraces - closeBraces);

            if (line.match(/samples:/)) hasSamples = true;
            if (line.match(/referenceCode:/)) hasRefCode = true;
            if (line.match(/tags:|explanation:|score:|template:/)) {
                lastKnownPropIndex = i;
            }

            // End of the programming object (assuming top-level properties are formatted)
            if (braceDepth === 0 || line.match(/^\s{4}\},?\s*$/) || line.match(/^\s{2}\},?\s*$/)) {
                if (inProg) {
                    // Check if we need to insert something
                    let inserts = [];
                    const indentMatch = lines[lastKnownPropIndex].match(/^(\s*)/);
                    const indent = indentMatch ? indentMatch[1] : '      ';

                    if (!hasSamples) {
                        inserts.push(`${indent}samples: [{ input: '待补充', output: '待补充' }],`);
                        samplesFixed++;
                    }
                    if (!hasRefCode) {
                        inserts.push(`${indent}referenceCode: '// 待补充',`);
                        refCodeFixed++;
                    }

                    if (inserts.length > 0) {
                        // Insert after the last known property
                        lines.splice(lastKnownPropIndex + 1, 0, ...inserts);
                        i += inserts.length; // Adjust index
                        modified = true;
                    }
                    
                    inProg = false;
                    hasSamples = false;
                    hasRefCode = false;
                    lastKnownPropIndex = -1;
                }
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    }
}

function processDirectory(directory) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            fixFile(fullPath);
        }
    }
}

processDirectory(DATA_DIR);

console.log('--- P1 Fix Summary ---');
console.log(`🧹 Dirty options replaced: ${dirtyFixed}`);
console.log(`📝 Missing samples added: ${samplesFixed}`);
console.log(`💻 Missing referenceCode added: ${refCodeFixed}`);
