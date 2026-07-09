// Dump current options arrays for papers that have [待补充选项], for validation.
// Output: tmp/current-options.json  {paperId: {qid: {type, options:[...], answer, missing:[idx]}}}
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

const out = {};
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
        if (missing.length > 0) {
          out[paperId] = out[paperId] || {};
          out[paperId][q.id] = { type: q.type, options: q.options, answer: q.answer, missing };
        }
      }
    } catch (e) {
      console.error(`ERR ${paperId}: ${e.message.slice(0, 80)}`);
    }
  }
}
fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'current-options.json'), JSON.stringify(out, null, 1), 'utf8');
let cnt = 0; for (const p in out) cnt += Object.keys(out[p]).length;
console.log(`Dumped current options for ${cnt} questions across ${Object.keys(out).length} papers`);
