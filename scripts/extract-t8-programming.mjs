// Extract programming questions with placeholder referenceCode into JSON for agent authoring.
// Output: tmp/t8-programming-extract.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

const extract = [];

function extractFromPaper(level, paperId, file, paperData) {
  // Programming questions may live in .programmingQuestions OR be spread into .questions
  const all = [
    ...(paperData.programmingQuestions || []),
    ...(paperData.codingQuestions || []),
    ...(paperData.questions || []),
  ];
  for (const q of all) {
    if (q && q.type === 'programming' && q.referenceCode && q.referenceCode.includes('待补充')) {
      extract.push({
        level, paperId,
        questionId: q.id,
        title: q.title || '',
        question: (q.question || '').trim(),
        samples: q.samples || [],
        currentCode: q.referenceCode,
      });
    }
  }
}

// L5-L7
for (const level of [5, 6, 7]) {
  const dir = path.join(GESP_DIR, `level${level}`);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
    const paperId = file.replace('.js', '');
    let content = fs.readFileSync(path.join(dir, file), 'utf8')
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
    const mockTags = `const LEVEL${level}_TAGS = new Proxy({}, { get: () => ({}), getOwnPropertyDescriptor: () => ({}) });`;
    try {
      const fn = new Function(`${mockTags}\n${content}\nreturn typeof paperData !== 'undefined' ? paperData : (typeof programmingQuestions !== 'undefined' ? { programmingQuestions } : null);`);
      const pd = fn();
      if (pd) extractFromPaper(level, paperId, file, pd);
    } catch (e) {
      console.error(`ERR ${paperId}: ${e.message.slice(0, 100)}`);
    }
  }
}

// L8 programming.js
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
        if (q.referenceCode && q.referenceCode.includes('待补充')) {
          extract.push({
            level: 8, paperId,
            questionId: q.id,
            title: q.title || '',
            question: [q.description || '', q.inputDescription || '', q.outputDescription || '', (q.samples || []).map(s => `样例输入:\n${s.input}\n样例输出:\n${s.output}`).join('\n')].filter(Boolean).join('\n\n'),
            samples: q.samples || [],
            currentCode: q.referenceCode,
          });
        }
      }
    }
  }
}

const out = path.join(__dirname, '..', 'tmp', 't8-programming-extract.json');
fs.writeFileSync(out, JSON.stringify(extract, null, 2), 'utf8');
console.log(`Extracted ${extract.length} programming questions with placeholder referenceCode`);
const byLevel = {};
for (const e of extract) byLevel[e.level] = (byLevel[e.level] || 0) + 1;
console.log('By level:', JSON.stringify(byLevel));
