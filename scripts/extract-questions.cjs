// 提取 L7/L8 客观题（占位或需创作的）为结构化 JSON，供 AI 创作解析
// 用法：node scripts/extract-questions.cjs <level> [paperId]
// 输出：tmp/l{level}-extract.json
const fs = require('fs');
const path = require('path');

const level = process.argv[2];
const onlyPaper = process.argv[3];
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp', `level${level}`);

// L8 需要先用 programming.js 提供 l8ProgrammingByPaper
function buildL8Globals() {
  const pgPath = path.join(GESP_DIR, '..', 'level8', 'programming.js');
  if (fs.existsSync(pgPath)) {
    const src = fs.readFileSync(pgPath, 'utf8')
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+/g, '');
    // 求值出 l8ProgrammingByPaper
    const fn = new Function(`${src}\nreturn l8ProgrammingByPaper;`);
    return { l8ProgrammingByPaper: fn() };
  }
  return {};
}

const files = fs.readdirSync(GESP_DIR)
  .filter(f => f.endsWith(`-l${level}.js`))
  .filter(f => !onlyPaper || f.startsWith(onlyPaper));

const out = { level: Number(level), papers: [] };

for (const file of files) {
  let c = fs.readFileSync(path.join(GESP_DIR, file), 'utf8');
  c = c.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
  c = c.replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
  let pd;
  try {
    if (level === '8') {
      const g = buildL8Globals();
      const keys = Object.keys(g);
      const fn = new Function(...keys, `${c}\nreturn paperData;`);
      pd = fn(...keys.map(k => g[k]));
    } else {
      pd = new Function(`${c}\nreturn paperData;`)();
    }
  } catch (e) {
    console.error(`SKIP ${file}: ${e.message.slice(0, 80)}`);
    continue;
  }
  const qs = [];
  for (const q of pd.questions) {
    if (q.type === 'programming') continue;
    const ex = q.explanation || '';
    const isPlaceholder = /答案依据试卷标准答案|解析待补充|待补充/.test(ex);
    if (!isPlaceholder && /\*\*(答案|解析|判定依据|易混|考点|纠错)/.test(ex)) continue; // 已增强，跳过
    qs.push({
      id: q.id,
      type: q.type,
      question: q.question || '',
      options: q.options || null,
      answer: q.answer,
      tags: q.tags || [],
      currentExplanation: ex.slice(0, 40),
    });
  }
  if (qs.length) out.papers.push({ paperId: pd.id, title: pd.title, questions: qs });
}

fs.mkdirSync(path.join(__dirname, '..', 'tmp'), { recursive: true });
const outPath = path.join(__dirname, '..', 'tmp', `l${level}-extract.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`提取完成 → ${outPath}`);
console.log(`  ${out.papers.length} 份试卷, 共 ${out.papers.reduce((s,p)=>s+p.questions.length,0)} 道待创作题`);
