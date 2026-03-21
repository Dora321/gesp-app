const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

function readObjectMap(filePath, varName) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = parser.parse(code, { sourceType: 'module' });
    let result = null;
    traverse(ast, {
        VariableDeclarator(p) {
            if (p.node.id.name === varName) {
                const objCode = generate(p.node.init).code;
                result = eval('(' + objCode + ')');
            }
        }
    });
    return result;
}

const paperCodingMapFile = path.join(__dirname, '../src/data/gesp/paperCodingMap.js');
const paperCodingMap = readObjectMap(paperCodingMapFile, 'paperCodingMap');

const luoguCodingByLevelFile = path.join(__dirname, '../src/data/gesp/luoguCodingByLevel.js');
const luoguCodingByLevel = readObjectMap(luoguCodingByLevelFile, 'luoguCodingByLevel');

const luoguProblems = {};
for (const level in luoguCodingByLevel) {
    for (const prob of luoguCodingByLevel[level]) {
        luoguProblems[prob.pid] = prob;
    }
}

const levelsDir = path.join(__dirname, '../src/data/gesp');

function processFileSafe(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    let modifications = [];

    const paperId = path.basename(filePath, '.js');

    traverse(ast, {
        ObjectExpression(pathNode) {
            const props = pathNode.node.properties;
            if (!props) return;

            let qId = null;
            let isProgramming = false;
            let existingQuestionNode = null;
            let otherFields = {}; // preserve these

            for (const prop of props) {
                if (prop.type !== 'ObjectProperty') continue;
                const key = prop.key.name || prop.key.value;
                
                if (key === 'id') {
                    if (prop.value.type === 'NumericLiteral' && (prop.value.value === 26 || prop.value.value === 27)) {
                        qId = prop.value.value;
                    }
                }
                if (key === 'type') {
                    if (prop.value.type === 'StringLiteral' && (prop.value.value === 'programming' || prop.value.value === 'coding')) {
                        isProgramming = true;
                    }
                }
                if (key === 'question') {
                    existingQuestionNode = prop.value;
                }
                
                // Fields to preserve
                if (['template', 'explanation', 'tags', 'score', 'referenceCode', 'answer'].includes(key)) {
                    otherFields[key] = generate(prop.value).code;
                }
            }

            if (qId && isProgramming) {
                const mapped = paperCodingMap[paperId];
                if (!mapped) return;
                const pid = mapped["q" + qId];
                if (!pid || pid.startsWith('P0000')) return;

                const luoguProb = luoguProblems[pid];
                if (!luoguProb) return;

                // Check if already reformed (only if it has Format A structure)
                if (existingQuestionNode && !code.substring(pathNode.node.start, pathNode.node.end).includes('description:')) {
                    const oldTextRaw = code.substring(existingQuestionNode.start, existingQuestionNode.end);
                    if (oldTextRaw.includes('# [GESP')) {
                        console.log("  Skipping Q" + qId + " (already formatted)");
                        return;
                    }
                }

                // Construct markdown
                let markdown = "# " + luoguProb.title + "\n\n" +
                               "## 题目描述\n\n" + (luoguProb.description || '') + "\n\n" +
                               "## 输入格式\n\n" + (luoguProb.inputFormat || '') + "\n\n" +
                               "## 输出格式\n\n" + (luoguProb.outputFormat || '');

                // Escape for template literal insertion
                markdown = markdown.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
                const questionCode = "`\n" + markdown.trim() + "\n`";

                // Build the new object string
                let newObjLines = ["{"];
                newObjLines.push("      id: " + qId + ",");
                newObjLines.push("      type: 'programming',");
                newObjLines.push("      question: " + questionCode + ",");
                
                // Add preserved fields
                for (const key in otherFields) {
                    if (key !== 'id' && key !== 'type' && key !== 'question') {
                        newObjLines.push("      " + key + ": " + otherFields[key] + ",");
                    }
                }
                if (!otherFields.hasOwnProperty('answer')) {
                    newObjLines.push("      answer: '',");
                }
                
                newObjLines.push("    }");

                modifications.push({
                    start: pathNode.node.start,
                    end: pathNode.node.end,
                    newCode: newObjLines.join("\n")
                });
            }
        }
    });

    if (modifications.length > 0) {
        modifications.sort((a, b) => b.start - a.start);
        let newCode = code;
        for (const mod of modifications) {
            newCode = newCode.substring(0, mod.start) + mod.newCode + newCode.substring(mod.end);
        }
        fs.writeFileSync(filePath, newCode, 'utf-8');
        console.log("  Updated " + modifications.length + " questions in " + paperId);
    }
}

function processLevels() {
    for (let i = 1; i <= 8; i++) {
        const levelDir = path.join(levelsDir, 'level' + i);
        if (!fs.existsSync(levelDir)) continue;
        const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.js') && f !== 'shared.js' && f.includes('-'));
        for (const file of files) {
            processFileSafe(path.join(levelDir, file));
        }
    }
}

processLevels();
