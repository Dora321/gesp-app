// 通用试卷客观题补丁器：按 id 替换 question/options/answer/explanation 字段
// 用法：node patch-paper.mjs <paper.js 路径> <patch.mjs 路径>
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const [paperPath, patchPath] = process.argv.slice(2);
const { patches, sourcePatch } = await import(pathToFileURL(patchPath).href);

let src = readFileSync(paperPath, 'utf8');

// 找到 questions: [ 数组区域（在 paperData 内）
const qArrStart = src.indexOf('questions: [');
if (qArrStart === -1) throw new Error('questions 数组未找到');

function findBlock(id) {
  const re = new RegExp(`\\{\\s*\\n\\s*id: ${id},`);
  re.lastIndex = qArrStart;
  const m = src.slice(qArrStart).match(re);
  if (!m) throw new Error(`id ${id} 未找到`);
  const start = qArrStart + src.slice(qArrStart).indexOf(m[0]);
  let depth = 0, inStr = null, end = -1;
  for (let i = start; i < src.length; i++) {
    const ch = src[i], prev = src[i - 1];
    if (inStr) { if (ch === inStr && prev !== '\\') inStr = null; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error(`id ${id} 块未闭合`);
  return { start, end };
}

// 在块内替换一个字段的值（值可以是字符串/模板/数字/数组）
function replaceField(block, field, newValueLiteral) {
  const fre = new RegExp(`(\\n\\s*)${field}:\\s*`);
  const fm = block.match(fre);
  if (!fm) throw new Error(`字段 ${field} 未找到`);
  const valStart = fm.index + fm[0].length;
  // 扫描值的结束：字符串/模板按引号配平；数组按括号配平；数字到逗号
  let i = valStart, endIdx = -1;
  const first = block[i];
  if (first === "'" || first === '"' || first === '`') {
    const q = first;
    for (i = valStart + 1; i < block.length; i++) {
      if (block[i] === q && block[i - 1] !== '\\') { endIdx = i + 1; break; }
    }
  } else if (first === '[') {
    let depth = 0, inStr = null;
    for (i = valStart; i < block.length; i++) {
      const ch = block[i], prev = block[i - 1];
      if (inStr) { if (ch === inStr && prev !== '\\') inStr = null; continue; }
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '[') depth++;
      else if (ch === ']') { depth--; if (depth === 0) { endIdx = i + 1; break; } }
    }
  } else {
    while (i < block.length && !/[,\n]/.test(block[i])) i++;
    endIdx = i;
  }
  if (endIdx === -1) throw new Error(`字段 ${field} 值未闭合`);
  return block.slice(0, fm.index + fm[0].length) + newValueLiteral + block.slice(endIdx);
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const tpl = (s) => `\`${esc(s)}\``;

for (const [idStr, p] of Object.entries(patches)) {
  const id = Number(idStr);
  const { start, end } = findBlock(id);
  let block = src.slice(start, end + 1);
  if (p.question !== undefined) block = replaceField(block, 'question', tpl(p.question));
  if (p.options !== undefined) block = replaceField(block, 'options', `[${p.options.map((o) => tpl(o)).join(', ')}]`);
  if (p.answer !== undefined) block = replaceField(block, 'answer', String(p.answer));
  if (p.explanation !== undefined) block = replaceField(block, 'explanation', tpl(p.explanation));
  src = src.slice(0, start) + block + src.slice(end + 1);
}

// 可选：在 paperData 顶部补 source 字段（若不存在）
if (sourcePatch && !src.includes('officialPdf')) {
  src = src.replace(/(timeLimit:[^\n]*\n)/, `$1    source: {\n        officialPdf: '${sourcePatch.officialPdf}',\n        notes: '${sourcePatch.notes}',\n    },\n`);
}

writeFileSync(paperPath, src, 'utf8');
console.log(`已应用 ${Object.keys(patches).length} 个题目补丁`);
