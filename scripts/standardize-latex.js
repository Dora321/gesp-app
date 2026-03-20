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
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js') && (file.match(/\d{4}-\d{2}-l\d/) || file.match(/\d{4}-\d{2}\.js/))) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(DATA_DIR);

const REPLACEMENTS = [
  { reg: /O\(n log n\)/gi, repl: '$O(n \\log n)$' },
  { reg: /O\(N log N\)/gi, repl: '$O(N \\log N)$' },
  { reg: /O\(n\^2\)/gi, repl: '$O(n^2)$' },
  { reg: /O\(N\^2\)/gi, repl: '$O(N^2)$' },
  { reg: /O\(n\)/gi, repl: '$O(n)$' },
  { reg: /O\(N\)/gi, repl: '$O(N)$' },
  { reg: /O\(log n\)/gi, repl: '$O(\\log n)$' },
  { reg: /O\(log N\)/gi, repl: '$O(\\log N)$' },
  { reg: /O\(1\)/gi, repl: '$O(1)$' },
  { reg: /2\^n/g, repl: '$2^n$' },
  { reg: /2\^N/g, repl: '$2^N$' },
  { reg: /n-1/g, repl: '$n-1$' },
  { reg: /N-1/g, repl: '$N-1$' },
  { reg: /n \+ 1/g, repl: '$n+1$' },
  { reg: /N \+ 1/g, repl: '$N+1$' },
  { reg: /m-1/g, repl: '$m-1$' },
  { reg: /M-1/g, repl: '$M-1$' },
  { reg: /10\^9/g, repl: '$10^9$' },
  { reg: /10\^6/g, repl: '$10^6$' },
  { reg: /log2\(n\)/g, repl: '$\\log_2 n$' },
  { reg: /O\(V\+E\)/gi, repl: '$O(V+E)$' },
  { reg: /O\(V log V\)/gi, repl: '$O(V \\log V)$' },
  { reg: /([a-z])的平方/g, repl: '$$1^2$$' }, // Simplified
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  REPLACEMENTS.forEach(r => {
    content = content.replace(r.reg, r.repl);
  });

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated: ${path.relative(DATA_DIR, f)}`);
  }
});

console.log('LaTeX Standardization Complete.');
