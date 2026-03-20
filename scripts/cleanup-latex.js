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
    } else if (file.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(DATA_DIR);

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Replace multiple $ signs with a single $ (for standard LaTeX $math$)
  // or double $$ for block math if needed, but here we want inline $
  content = content.replace(/\${2,}/g, '$');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Cleaned up LaTeX in: ${path.relative(DATA_DIR, f)}`);
  }
});

console.log('LaTeX Cleanup Complete.');
