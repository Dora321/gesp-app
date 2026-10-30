#!/usr/bin/env node
// L5/L6 模板解析批量升级工具
// 用法:
//   node scripts/upgrade-explanations-l5l6.mjs dump <paperId>   # 导出模板题清单
//   node scripts/upgrade-explanations-l5l6.mjs apply <content.json>  # 按内容文件替换
// 内容文件格式: { "<paperId>": { "<qid>": "<新解析全文>" } }
import fs from 'fs';
import path from 'path';
import url from 'url';

const ROOT = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const tmplRe = /本题答案已依据试卷标准答案完成录入/;

// 定位数据文件（levelN/paperId.js）
function dataFile(paperId) {
  const lvl = paperId.match(/-l(\d)$/)[1];
  return path.join(ROOT, 'src', 'data', 'gesp', 'level' + lvl, paperId + '.js');
}

async function dump(paperId) {
  const mod = await import(url.pathToFileURL(dataFile(paperId)).href + '?t=' + Date.now());
  const paper = mod.paperData;
  const out = [];
  for (const q of paper.questions) {
    if (q.explanation && tmplRe.test(q.explanation)) {
      out.push({
        id: q.id, type: q.type, answer: q.answer,
        question: q.question,
        options: q.options,
        tags: q.tags,
        current: q.explanation,
      });
    }
  }
  console.log(JSON.stringify(out, null, 1));
}

// 对 question: `...` 块定位第 n 个解释模板并整体替换
function apply(contentPath) {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  let totalChanged = 0;
  for (const [paperId, qmap] of Object.entries(content)) {
    const file = dataFile(paperId);
    let src = fs.readFileSync(file, 'utf8');
    let changed = 0;
    for (const [qid, newExp] of Object.entries(qmap)) {
      // 找到 id: <qid> 的题目块
      const idMarker = new RegExp('(\\{\\s*id:\\s*' + qid + '\\s*,)');
      if (!idMarker.test(src)) { console.error(`[MISS] ${paperId} q${qid} 未找到`); continue; }
      const idPos = src.search(idMarker);
      // 从该位置向后找第一个 explanation: ` ... ` 块
      const expStart = src.indexOf('explanation: `', idPos);
      if (expStart < 0) { console.error(`[MISS] ${paperId} q${qid} 无 explanation`); continue; }
      const bodyStart = expStart + 'explanation: `'.length;
      const bodyEnd = src.indexOf('`,', bodyStart);
      if (bodyEnd < 0) { console.error(`[MISS] ${paperId} q${qid} 未闭合`); continue; }
      const oldBody = src.slice(bodyStart, bodyEnd);
      if (!tmplRe.test(oldBody)) { console.error(`[SKIP] ${paperId} q${qid} 非模板`); continue; }
      // 校验新解析不含反引号/`${`，行内反引号自动转义为 \`
      if (/\$\{/.test(newExp)) { console.error(`[ERR] ${paperId} q${qid} 新解析含\${`); process.exit(1); }
      const safeExp = newExp.replace(/`/g, '\\`');
      src = src.slice(0, bodyStart) + '\n' + safeExp + '\n        ' + src.slice(bodyEnd);
      changed++;
    }
    fs.writeFileSync(file, src);
    console.log(`${paperId}: 替换 ${changed} 条`);
    totalChanged += changed;
  }
  console.log(`合计替换 ${totalChanged} 条`);
}

const [cmd, arg] = process.argv.slice(2);
if (cmd === 'dump') await dump(arg);
else if (cmd === 'apply') apply(arg);
else { console.error('用法: dump <paperId> | apply <content.json>'); process.exit(1); }
