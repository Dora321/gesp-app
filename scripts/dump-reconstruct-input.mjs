// Dump full question info (stem, answer, explanation, present opts) for missing-option questions.
// Output: tmp/reconstruct-input.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

let l8ProgObj = {};
{
  const pfile = path.join(GESP_DIR, 'level8', 'programming.js');
  let pcontent = fs.readFileSync(pfile, 'utf8')
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
  l8ProgObj = new Function(`${pcontent}\nreturn typeof l8ProgrammingByPaper !== 'undefined' ? l8ProgrammingByPaper : null;`)() || {};
}

const out = [];
const LETTERS = ['A','B','C','D'];
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
      const pd = new Function(`${mockTags}\n${l8inject}\n${content}\nreturn typeof paperData !== 'undefined' ? paperData : null;`)();
      if (!pd) continue;
      const all = [...(pd.programmingQuestions || []), ...(pd.questions || [])];
      for (const q of all) {
        if (!q || !Array.isArray(q.options)) continue;
        const missing = q.options.map((o, i) => (typeof o === 'string' && o.includes('待补充选项')) ? i : -1).filter(i => i >= 0);
        if (missing.length === 0) continue;
        // also treat "选项X" placeholders as missing
        const missingExpanded = [];
        for (let i=0;i<4;i++){
          const o=q.options[i];
          if (typeof o==='string' && (o.includes('待补充选项') || /^选项[ABCD]?$/.test(o.trim()) || o.trim()==='')) missingExpanded.push(i);
        }
        out.push({
          paperId, questionId: q.id, type: q.type,
          question: (q.question||'').trim().slice(0, 1200),
          answerIndex: q.answer,
          answerLetter: LETTERS[q.answer] || '',
          presentOptions: q.options,
          explanation: (q.explanation||'').replace(/\s+/g,' ').slice(0, 600),
        });
      }
    } catch (e) {
      console.error(`ERR ${paperId}: ${e.message.slice(0, 80)}`);
    }
  }
}
fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'reconstruct-input.json'), JSON.stringify(out, null, 1), 'utf8');
console.log(`Dumped reconstruct input for ${out.length} questions`);
