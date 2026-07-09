// Dump L8 objective questions whose explanation still carries a stale
// "缺失 / 无法独立核实 / 未经独立核实" claim. Reuses the audit's
// safe-eval approach (preload l8ProgrammingByPaper, mock LEVEL*_TAGS).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const L8 = path.join(ROOT, 'src', 'data', 'gesp', 'level8');
const PROG = path.join(L8, 'programming.js');
const V2 = path.join(ROOT, 'tmp', 'reconstruct-input-v2.json');
const RECON = path.join(ROOT, 'tmp', 'all-reconstructed.json');
const OUT = path.join(ROOT, 'tmp', 'l8-upgrade-input.json');

const recovered = new Set(
  Object.keys(JSON.parse(fs.readFileSync(RECON, 'utf8')))
    .filter(k => k.startsWith('202') && k.split('#')[0].endsWith('l8'))
);
const v2 = JSON.parse(fs.readFileSync(V2, 'utf8'));
const v2map = {};
for (const x of v2) v2map[`${x.paperId}#${x.questionId}`] = x;

const progSrc = fs.readFileSync(PROG, 'utf8');
const l8m = progSrc.match(/const l8ProgrammingByPaper\s*=\s*\{[\s\S]*?\n\};/);
const l8const = l8m ? l8m[0] : 'const l8ProgrammingByPaper = {};';

const optClaimRe = /选项[^。，]*?缺失|选项文本[^。，]*?缺失|选项被污染|选项缺失|选项在源数据中缺失|选项文本在数据中缺失/;
const stemClaimRe = /程序[^。，]*?缺失|代码[^。，]*?缺失|题面[^。，]*?缺失|图示缺失|代码被污染|语句缺失|条件缺失|函数与下界|复杂度符号|题干数字|题干公式|通项公式与求和公式/;
const unverifRe = /无法独立核实|未经独立核实|未经核实|无法核对|不能独立/;
const LETTERS = ['A','B','C','D','E','F'];

const out = [];
for (const fn of fs.readdirSync(L8).filter(f => /^\d{4}-\d{2}-l8\.js$/.test(f))) {
  const fp = path.join(L8, fn);
  let src = fs.readFileSync(fp, 'utf8');
  const paperId = fn.slice(0, -3);
  src = src.replace(/^import .*$/m, '').replace(/^export /gm, '');
  src = src.replace(/const l8ProgrammingByPaper\s*=\s*\{[\s\S]*?\n\};/, '');
  const mock = "const LEVEL8_TAGS = new Proxy({}, { get: () => ({}), getOwnPropertyDescriptor: () => ({}) });";
  const sandbox = {};
  try {
    vm.runInNewContext(`${l8const}\n${mock}\n${src}\nthis.paperData = typeof paperData !== 'undefined' ? paperData : null;`, sandbox, { filename: fn });
  } catch (e) {
    console.error(`EVAL FAIL ${paperId}: ${e.message}`);
    continue;
  }
  const pd = sandbox.paperData;
  if (!pd) { console.error(`NO paperData ${paperId}`); continue; }
  const qs = [...(pd.questions || []), ...(pd.programmingQuestions || [])];
  for (const q of qs) {
    const qid = q.id;
    const key = `${paperId}#${qid}`;
    const expl = q.explanation || '';
    if (!(optClaimRe.test(expl) || stemClaimRe.test(expl) || unverifRe.test(expl))) continue;
    const opts = q.options || [];
    let ansLetter = null;
    if (typeof q.answer === 'number' && q.answer >= 0 && q.answer < opts.length) ansLetter = LETTERS[q.answer];
    else if (typeof q.answer === 'string' && LETTERS.includes(q.answer)) ansLetter = q.answer;
    out.push({
      paperId, questionId: qid, type: q.type,
      options: opts, answer: q.answer, answerLetter: ansLetter,
      stem: (v2map[key] && v2map[key].pdfBody) || '',
      currentExplanation: expl,
      recovered: recovered.has(key),
      optionClaim: optClaimRe.test(expl),
      stemClaim: stemClaimRe.test(expl),
      unverifiedClaim: unverifRe.test(expl),
    });
  }
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
const nRec = out.filter(o => o.recovered).length;
const nStem = out.filter(o => o.stemClaim).length;
const nOpt = out.filter(o => o.optionClaim).length;
console.log(`Total stale L8 questions: ${out.length}`);
console.log(`  recovered-options (47-set): ${nRec}`);
console.log(`  have option-missing claim: ${nOpt}`);
console.log(`  have stem/program-missing claim: ${nStem}`);
console.log(`  recovered AND stem-claim: ${out.filter(o => o.recovered && o.stemClaim).length}`);
console.log(`Wrote ${OUT}`);
for (const o of out) console.log(`  ${o.paperId} Q${o.questionId} type=${o.type} ans=${o.answerLetter} rec=${o.recovered} opt=${o.optionClaim} stem=${o.stemClaim} opts=${o.options.length} stemLen=${o.stem.length}`);
