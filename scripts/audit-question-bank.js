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
    } else if (file.endsWith('.js') && file !== 'index.js' && file !== 'shared.js' && file !== 'paperCodingMap.js' && file !== 'luoguCodingByLevel.js') {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function audit() {
  const files = getAllFiles(DATA_DIR);
  console.log(`Auditing ${files.length} files...\n`);

  const uniqueTypes = new Set();
  const issues = [];
  const typeMap = {};

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Use regex to find all objects with a "type" property
      // This is safer than importing because of potential side effects and ESM/CJS mix
      const typeMatches = content.matchAll(/type:\s*['"]?(\w+)['"]?/g);
      for (const match of typeMatches) {
        const type = match[1];
        uniqueTypes.add(type);
        typeMap[type] = (typeMap[type] || 0) + 1;
      }

      // Check for structural issues using regex-based scanning
      const questionBlocks = content.split(/\{\s*id:/).slice(1);
      questionBlocks.forEach((block, idx) => {
        const idMatch = block.match(/^\s*(\d+)/);
        const qId = idMatch ? idMatch[1] : `unknown-${idx}`;
        const typeMatch = block.match(/type:\s*['"]?(\w+)['"]?/);
        const type = typeMatch ? typeMatch[1] : 'missing';

        if (type === 'missing') {
          issues.push(`[${path.basename(file)}] Question ${qId}: Missing type`);
        } else if (type !== 'programming' && type !== 'coding') {
          if (!block.includes('options:')) {
            issues.push(`[${path.basename(file)}] Question ${qId} (${type}): Missing options`);
          }
          if (!block.includes('answer:')) {
            issues.push(`[${path.basename(file)}] Question ${qId} (${type}): Missing answer`);
          }
        }
      });
    } catch (err) {
      issues.push(`[${path.basename(file)}] Failed to read/parse: ${err.message}`);
    }
  }

  console.log("Unique Question Types Found:");
  console.log(JSON.stringify(typeMap, null, 2));
  console.log("\n--- Integrity Issues ---");
  if (issues.length === 0) {
    console.log("No critical structural issues found!");
  } else {
    issues.forEach(issue => console.log(issue));
  }
}

audit();
