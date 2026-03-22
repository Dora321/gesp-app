const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js') && file.match(/l\\d/)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Simple regex: find programming questions block
            // and replace referenceCode: '// 待补充' with the answer if it contains #include
            const regex = /{[\s\S]*?type:\s*['"]programming['"][\s\S]*?}/g;
            content = content.replace(regex, (match) => {
                if (match.includes("referenceCode: '// 待补充'") || match.includes('referenceCode: "// 待补充"')) {
                    const answerMatch = match.match(/answer:\s*['"`]([\s\S]*?)['"`],/);
                    if (answerMatch && answerMatch[1].includes('#include')) {
                        let newBlock = match;
                        // Replace the referenceCode line with the actual code
                        newBlock = newBlock.replace(/referenceCode:\s*['"`]\/\/ 待补充['"`]/, \`referenceCode: \\\`\${answerMatch[1]}\\\`\`);
                        // Remove the answer field
                        newBlock = newBlock.replace(/answer:\s*['"`][\s\S]*?['"`],\s*/, '');
                        modified = true;
                        return newBlock;
                    }
                }
                return match;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`✅ Fixed referenceCode manually from answer field in ${fullPath.split('src/data/gesp/')[1]}`);
            }
        }
    }
}

walk(DATA_DIR);
console.log("Done.");
