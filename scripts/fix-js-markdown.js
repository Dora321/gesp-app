import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../src/data/gesp');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(DATA_DIR);
console.log(`Scanning ${files.length} files...`);

let totalFixes = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Pattern 1: \n```cpp' (single quote)
    content = content.replace(/\\n```cpp(?=')/g, '\\n```');
    
    // Pattern 2: \n```cpp" (double quote)
    content = content.replace(/\\n```cpp(?=")/g, '\\n```');

    // Pattern 3: \n```cpp\n' (newline then quote)
    content = content.replace(/\\n```cpp\\n(?=')/g, '\\n```\\n');

    // Pattern 3: \n```cpp\n" (newline then double quote)
    content = content.replace(/\\n```cpp\\n(?=")/g, '\\n```\\n');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        const fixes = (originalContent.length - content.length) / 3; // 'cpp' is 3 chars
        console.log(`Fixed ${file} (${fixes} occurrences)`);
        totalFixes += fixes;
    }
});

console.log(`Done! Total fixes applied: ${totalFixes}`);
