import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data/gesp');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith('.js') && file !== 'index.js' && file !== 'shared.js') {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(DATA_DIR);
let templateCount = 0;
let explanationCount = 0;

const defaultTemplate = "`#include <bits/stdc++.h>\\nusing namespace std;\\n\\nint main() {\\n    // 在此填写代码\\n    return 0;\\n}`";

files.forEach(file => {
    let contentLines = fs.readFileSync(file, 'utf-8').split('\n');
    let modified = false;

    let inProgObj = false;
    let hasTemplate = false;
    let hasExplanation = false;
    let typeLineIdx = -1;
    let isQuestionObject = false;

    for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];

        if (line.includes("type: 'programming'") || line.includes('type: "programming"')) {
            inProgObj = true;
            hasTemplate = false;
            typeLineIdx = i;
        }

        if (line.includes("type: 'single'") || line.includes("type: 'judge'") || line.includes("type: 'programming'")) {
            isQuestionObject = true;
            hasExplanation = false;
            typeLineIdx = i;
        }

        if (isQuestionObject && line.includes('explanation:')) {
            hasExplanation = true;
        }
        
        if (inProgObj && line.includes('template:')) {
            hasTemplate = true;
        }

        // naive check for end of object
        if (isQuestionObject && line.trim().startsWith('}')) {
            const match = contentLines[typeLineIdx].match(/^(\s*)/);
            const indent = match ? match[1] : '      ';

            if (inProgObj && !hasTemplate) {
                contentLines.splice(typeLineIdx + 1, 0, `${indent}template: ${defaultTemplate},`);
                i++; // adjust iterator
                templateCount++;
                modified = true;
            }

            if (!hasExplanation) {
                // Determine indentation
                contentLines.splice(typeLineIdx + 1, 0, `${indent}explanation: '暂无解析',`);
                i++; 
                explanationCount++;
                modified = true;
            }

            inProgObj = false; 
            isQuestionObject = false;
        }
    }

    if (modified) {
        fs.writeFileSync(file, contentLines.join('\n'));
    }
});

console.log(`Finished Usability fixes! Added ${templateCount} programming templates and ${explanationCount} placeholder explanations.`);
