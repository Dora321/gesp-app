import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'src', 'data', 'gesp');
let ok = 0, fail = 0, total = 0;

for (const level of [2, 3, 4]) {
  const dir = path.join(BASE, 'level' + level);
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.js') && f !== 'shared.js' && f !== 'programming.js' && !f.endsWith('.jsx'));
  total += files.length;
  
  for (const file of files) {
    const fp = 'file:///' + path.join(dir, file).replace(/\\/g, '/');
    try {
      const m = await import(fp);
      const q = m.paperData.questions ? m.paperData.questions.length : 0;
      console.log('[OK] L' + level + ' ' + file + ' (' + q + ' q)');
      ok++;
    } catch (e) {
      console.error('[FAIL] L' + level + ' ' + file + ': ' + e.message);
      fail++;
    }
  }
}

console.log('\nTotal: ' + ok + ' OK, ' + fail + ' FAIL out of ' + total);
