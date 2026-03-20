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
const results = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Counts
  const singleCount = (content.match(/type:\s*["']single["']/g) || []).length;
  const multiCount = (content.match(/type:\s*["']multiple["']/g) || []).length;
  const judgeCount = (content.match(/type:\s*["']judge["']/g) || []).length;
  const progCount = (content.match(/type:\s*["']programming["']/g) || []).length;
  
  // Placeholders
  const placeholders = [];
  if (content.includes('待补充')) placeholders.push('待补充');
  if (content.includes('待补')) placeholders.push('待补');
  if (content.includes('placeholder')) placeholders.push('placeholder');
  
  // LaTeX Check (basic)
  const hasLatex = content.includes('$');
  const needsLatex = content.match(/O\(|n-1|m-1|2\^n/g); // Common plain text math

  results.push({
    file: path.relative(DATA_DIR, f),
    objCount: singleCount + multiCount + judgeCount,
    progCount: progCount,
    placeholders: placeholders,
    hasLatex,
    likelyNeedsLatex: !!needsLatex && !hasLatex
  });
});

const output = JSON.stringify(results, null, 2);
fs.writeFileSync(path.join(__dirname, '../audit_results.json'), output, 'utf8');
console.log('Audit complete. Results written to audit_results.json');
