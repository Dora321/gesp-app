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

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  // Count single choice questions
  const singleCount = (content.match(/['"]?type['"]?:\s*['"]?single['"]?/g) || []).length;
  // Count judge questions
  const judgeCount = (content.match(/['"]?type['"]?:\s*['"]?judge['"]?/g) || []).length;
  // Count programming questions
  const programmingCount = (content.match(/['"]?type['"]?:\s*['"]?(programming|coding)['"]?/g) || []).length;
  
  // Check if backfilled
  const isBackfilled = content.includes('backfilled: true');
  // Check for placeholders in QUESTIONS (ignoring explanations)
  // Look for "题目占位" or "待补全" pattern
  const hasPlaceholder = /question:\s*['"][^'"]*题目占位[^'"]*['"]/i.test(content) || 
                         /question:\s*['"][^'"]*题目占位[^'"]*['"]/i.test(content); 
  
  // Check if historical placeholder
  const isHistorical = content.includes('isHistoricalPlaceholder: true') || content.includes('note: \'本卷为历史占位');

  // Identify level and date from filename
  // Format: 2023-03-l1.js
  const match = filename.match(/(\d{4}-\d{2})-l(\d)/);
  const date = match ? match[1] : 'Unknown';
  const level = match ? `L${match[2]}` : 'Unknown';

  return {
    filename,
    date,
    level,
    objective: singleCount + judgeCount,
    programming: programmingCount,
    isBackfilled,
    hasPlaceholder,
    isHistorical
  };
}

function main() {
  const files = getAllFiles(DATA_DIR);
  const stats = files.map(analyzeFile);

  // Group by level
  const grouped = stats.reduce((acc, curr) => {
    if (!acc[curr.level]) acc[curr.level] = [];
    acc[curr.level].push(curr);
    return acc;
  }, {});

  // Print summary Table
  console.log('| Level | Date | Objective | programming | Status |');
  console.log('|-------|------|-----------|-------------|--------|');
  
  Object.keys(grouped).sort().forEach(level => {
    grouped[level].sort((a,b) => a.date.localeCompare(b.date)).forEach(item => {
      let statusIcon = '❌';
      if (item.isHistorical) {
        statusIcon = '⚪'; // Historical placeholder
      } else if (item.isBackfilled) {
        statusIcon = '✅';
      } else if (item.hasPlaceholder) {
        statusIcon = '🚧'; // Placeholder found
      } else if (item.objective >= 25 && item.programming >= 2) {
        statusIcon = '✅'; // Looks complete
      } else if (item.objective > 0 || item.programming > 0) {
        statusIcon = '🕒'; // In progress
      }
      
      console.log(`| ${item.level} | ${item.date} | ${item.objective} | ${item.programming} | ${statusIcon} |`);
    });
  });
}

main();
