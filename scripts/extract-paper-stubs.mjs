// 提取某卷全部缺解析的客观题，输出紧凑清单供撰写解析
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
const mod = await import(pathToFileURL(file).href + '?t=' + Date.now());
const p = mod.paperData;
const out = [];
for (const q of p.questions || []) {
    if (!/待补充/.test(q.explanation || '')) continue;
    const opts = (q.options || []).map((o, i) => `${'ABCD'[i]}. ${o}`).join('\n');
    out.push(`### ${q.id} [${q.type}] 正确答案: ${q.type === 'judge' ? (q.answer === 0 ? '正确' : '错误') : 'ABCD'[q.answer]}\n${q.question}\n${opts}`);
}
writeFileSync('C:/Users/0/AppData/Local/Temp/stub-questions.md', out.join('\n\n'), 'utf8');
console.log(`${p.id}: ${out.length} 题已导出`);
