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
let fixedCount = 0;

files.forEach(file => {
    let contentLines = fs.readFileSync(file, 'utf-8').split('\n');
    let modified = false;

    let inProgObj = false;
    let hasScore = false;
    let typeLineIdx = -1;
    let braceLevel = 0; // to handle nested braces within programming block

    for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        
        if (line.includes('{')) braceLevel += (line.match(/\{/g) || []).length;
        if (line.includes('}')) braceLevel -= (line.match(/\}/g) || []).length;

        if (line.includes("type: 'programming'") || line.includes('type: "programming"')) {
            inProgObj = true;
            hasScore = false;
            typeLineIdx = i;
        }

        if (inProgObj && line.includes('score:')) {
            hasScore = true;
        }

        // naive check for end of object
        // we assume standard formatting `    },` or `}` at the end of question object
        if (inProgObj && line.trim().startsWith('}')) {
            if (!hasScore) {
                // Determine indentation
                const match = contentLines[typeLineIdx].match(/^(\s*)/);
                const indent = match ? match[1] : '      ';
                contentLines.splice(typeLineIdx + 1, 0, `${indent}score: 25,`);
                i++; // adjust iterator
                modified = true;
            }
            inProgObj = false; // Note: doesn't strictly track braces per-object but works for standard layout
        }
    }

    if (modified) {
        fs.writeFileSync(file, contentLines.join('\n'));
        fixedCount++;
        console.log(`Added missing scores to ${path.basename(file)}`);
    }
});

console.log(`\nFinished! Fixed missing programming scores in ${fixedCount} files.`);
