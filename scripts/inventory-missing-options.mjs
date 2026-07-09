// Inventory of [待补充选项] questions with context.
// Output: tmp/missing-options-inventory.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

const inventory = [];

function scan(level, paperId, file, paperData) {
  const all = [
    ...(paperData.programmingQuestions || []),
    ...(paperData.codingQuestions || []),
    ...(paperData.questions || []),
  ];
  for (const q of all) {
    if (!q || !q.options) continue;
    const missingOpts = q.options.filter(o => typeof o === 'string' && o.includes('待补充选项'));
    if (missingOpts.length > 0) {
      inventory.push({
        level, paperId,
        questionId: q.id,
        type: q.type,
        question: (q.question || '').replace(/\s+/g, ' ').slice(0, 200),
        answer: q.answer,
        optionsCount: q.options.length,
        missingIndices: q.options.map((o, i) => o.includes('待补充选项') ? i : -1).filter(i => i >= 0),
      });
    }
  }
}

// Preload L8 programming.js to provide l8ProgrammingByPaper for L8 file evals
let l8ProgObj = {};
{
  const pfile = path.join(GESP_DIR, 'level8', 'programming.js');
  let pcontent = fs.readFileSync(pfile, 'utf8')
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
  const pfn = new Function(`${pcontent}\nreturn typeof l8ProgrammingByPaper !== 'undefined' ? l8ProgrammingByPaper : null;`);
  l8ProgObj = pfn() || {};
}

for (const level of [5, 6, 7, 8]) {
  const dir = path.join(GESP_DIR, `level${level}`);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
    const paperId = file.replace('.js', '');
    let content = fs.readFileSync(path.join(dir, file), 'utf8')
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
    const mockTags = `const LEVEL${level}_TAGS = new Proxy({}, { get: () => ({}), getOwnPropertyDescriptor: () => ({}) });`;
    const l8inject = level === 8 ? `const l8ProgrammingByPaper = ${JSON.stringify(l8ProgObj)};` : '';
    try {
      const fn = new Function(`${mockTags}\n${l8inject}\n${content}\nreturn typeof paperData !== 'undefined' ? paperData : null;`);
      const pd = fn();
      if (pd) scan(level, paperId, file, pd);
    } catch (e) {
      console.error(`ERR ${paperId}: ${e.message.slice(0, 80)}`);
    }
  }
}

// L8 programming.js samples placeholders
{
  const file = path.join(GESP_DIR, 'level8', 'programming.js');
  let content = fs.readFileSync(file, 'utf8')
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
  const fn = new Function(`${content}\nreturn typeof l8ProgrammingByPaper !== 'undefined' ? l8ProgrammingByPaper : null;`);
  const byPaper = fn();
  if (byPaper) {
    for (const [paperId, qs] of Object.entries(byPaper)) {
      for (const q of qs) {
        if (q.samples && q.samples.some(s => JSON.stringify(s).includes('待补充'))) {
          inventory.push({ level: 8, paperId, questionId: q.id, type: 'programming-sample', question: (q.title||''), answer: '', optionsCount: 0, missingIndices: [] });
        }
      }
    }
  }
}

const out = path.join(__dirname, '..', 'tmp', 'missing-options-inventory.json');
fs.writeFileSync(out, JSON.stringify(inventory, null, 2), 'utf8');
const byLevel = {};
for (const e of inventory) byLevel[e.level] = (byLevel[e.level] || 0) + 1;
console.log(`Total missing-option questions: ${inventory.length}`);
console.log('By level:', JSON.stringify(byLevel));
// distinct papers
const papers = [...new Set(inventory.map(e => e.paperId))];
console.log('Affected papers:', papers.length);
console.log(papers.join(', '));
