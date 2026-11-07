import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const date = process.env.GESP_AUDIT_DATE || '2026-11-07';
const out = path.join(root, 'docs/question-bank-verification/ai-reviews', date);
for (const id of process.argv.slice(2)) {
    if (!/^\d{4}-\d{2}-l[1-8]$/.test(id)) throw new Error('非法试卷 ID');
    const files = fs.readdirSync(out).filter(file => file.startsWith(`${id}.glm.q`) && file.endsWith('.json')).sort();
    if (!files.length) throw new Error(`${id}: 尚无完成复核的检查点`);
    const parts = { deepseek: [], glm: [] };
    for (const file of files) {
        const review = JSON.parse(fs.readFileSync(path.join(out, file)));
        const draft = JSON.parse(fs.readFileSync(path.join(out, file.replace('.glm.', '.deepseek.'))));
        if (draft.inputSha256 !== review.inputSha256) throw new Error('初核与复核的输入不同');
        parts.deepseek.push(draft); parts.glm.push(review);
    }
    for (const [phase, entries] of Object.entries(parts)) {
        const questions = entries.flatMap(entry => entry.report.questions).sort((a, b) => a.id - b.id);
        if (new Set(questions.map(question => question.id)).size !== questions.length || entries.some(entry => entry.inputSha256 !== entries[0].inputSha256)) throw new Error('检查点存在重复题号或输入版本冲突');
        const result = {
            ...entries[0], completedAt: entries.at(-1).completedAt, questionIds: questions.map(question => question.id), usage: undefined,
            requests: entries.map(entry => ({ questionIds: entry.questionIds, usage: entry.usage, startedAt: entry.startedAt, completedAt: entry.completedAt })),
            report: { paperId: id, sourceIdentity: { matches: entries.every(entry => entry.report.sourceIdentity?.matches === true), evidence: entries.map(entry => entry.report.sourceIdentity?.evidence).join('\n') }, questions, summary: `已完成 ${questions.length} 题双模型审校，未涵盖题目不计入本轮完成范围。` },
        };
        fs.writeFileSync(path.join(out, `${id}.${phase}.json`), JSON.stringify(result, null, 2) + '\n');
    }
    console.log(`${id}: assembled ${parts.glm.flatMap(entry => entry.report.questions).length} questions`);
}
