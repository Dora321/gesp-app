const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../src/data/gesp');

const fixes = [
    {
        file: 'level1/2023-06-l1.js',
        target: '约定 $1 ',
        replacement: '约定 $1 \\\\le n \\\\le 100$。'
    },
    {
        file: 'level2/2023-12-l2.js',
        target: '保证 $0 \\\\le a,b \\\\le 10$；$a,b',
        replacement: '保证 $0 \\\\le a,b \\\\le 10$；$a,b < m \\\\le 1000$；$3 \\\\le N \\\\le 364$。'
    },
    {
        file: 'level4/2023-06-l4.js',
        target: '\\`!@#\\\\$\\`',
        replacement: '\\`!@#\\\\\\\\$\\`'
    },
    {
        file: 'level5/2025-03-l5.js',
        target: '+ $1',
        replacement: '+ $1 \\\\le g < p$'
    },
    {
        file: 'level6/2025-03-l6.js',
        target: '车站 $i\\\\ (1\\\\leq i',
        replacement: '车站 $i\\\\ (1\\\\leq i \\\\le n)$'
    },
    {
        file: 'level6/2025-12-l6.js',
        target: '保证 $f_i',
        replacement: '保证 $f_i < i$。'
    },
    {
        file: 'level7/2023-12-l7.js',
        target: '保证 $0 \\\\le a,b < N$ ，保证 $a ',
        replacement: '保证 $0 \\\\le a,b < N$ ，保证 $a \\\\ne b$。'
    }
];

let successCount = 0;

for (const fix of fixes) {
    const filePath = path.join(DATA_DIR, fix.file);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(fix.target)) {
        content = content.replace(fix.target, fix.replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${fix.file}`);
        successCount++;
    } else {
        console.error(`❌ Target string not found in ${fix.file}.`);
        console.log(`Target was: ${fix.target}`);
    }
}

console.log(`\\nCompleted. Successfully fixed ${successCount} files.`);
