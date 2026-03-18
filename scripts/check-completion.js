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
    } else if (file.endsWith('.js') && !['index.js', 'shared.js', 'paperCodingMap.js', 'luoguCodingByLevel.js'].includes(file)) {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function checkCompletion() {
  const files = getAllFiles(DATA_DIR);
  const status = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const fileName = path.basename(file);
    
    // Simple regex checks for completion indicators
    const objectiveCount = (content.match(/id:\s*\d+/g) || []).filter(m => {
        const id = parseInt(m.match(/\d+/)[0]);
        return id >= 1 && id <= 25;
    }).length;

    const hasProgramming = (content.includes('id: 26') || content.includes('"id": 26')) && 
                           (content.includes('id: 27') || content.includes('"id": 27'));
    const isPlaceholder = content.includes('题面暂缺') || content.includes('待补全') || content.includes('TODO') || 
                          content.includes('缺失') || content.includes('提取异常') || content.includes('待补');
    
    let state = 'Complete';
    if (objectiveCount < 25) state = 'Partial (Objective Missing)';
    if (!hasProgramming) state = objectiveCount < 25 ? 'Empty/Stub' : 'Objective Only';
    if (isPlaceholder) state += ' (Has Placeholders)';

    status.push({
      file: fileName,
      count: objectiveCount,
      programming: hasProgramming,
      state: state
    });
  }

  // Sort by level and date
  status.sort((a, b) => a.file.localeCompare(b.file));

  console.log("| Level/Paper | Obj Count | Prog? | Status |");
  console.log("| :--- | :--- | :--- | :--- |");
  status.forEach(s => {
    console.log(`| ${s.file.replace('.js', '')} | ${s.count} | ${s.programming ? '✅' : '❌'} | ${s.state} |`);
  });

  const summary = {
    total: status.length,
    complete: status.filter(s => s.programming && s.count >= 25 && !s.state.includes('Placeholder')).length,
    missingProg: status.filter(s => !s.programming).length,
    partial: status.filter(s => s.count < 25).length
  };

  console.log("\nSummary:");
  console.log(`Total Papers: ${summary.total}`);
  console.log(`Fully Complete (Probable): ${summary.complete}`);
  console.log(`Missing Programming: ${summary.missingProg}`);
  console.log(`Partial Objective: ${summary.partial}`);
}

checkCompletion();
