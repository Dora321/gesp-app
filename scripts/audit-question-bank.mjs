// 题库完整度扫描脚本
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

// 读取 _generated.js 获取 paperMeta
const genContent = fs.readFileSync(path.join(GESP_DIR, '_generated.js'), 'utf8');
const metaStart = genContent.indexOf('export const paperMeta = {');
const metaEnd = genContent.indexOf('export const loaders', metaStart);
let metaBlock = genContent.slice(metaStart, metaEnd).replace('export const paperMeta = ', '').trim();
// 去掉末尾的分号
metaBlock = metaBlock.replace(/;$/, '');
const paperMeta = eval(`(${metaBlock})`);

const levels = [1, 2, 3, 4, 5, 6, 7, 8];
const report = {};

for (const level of levels) {
    const levelDir = path.join(GESP_DIR, `level${level}`);
    if (!fs.existsSync(levelDir)) {
        report[`L${level}`] = { error: '目录不存在' };
        continue;
    }

    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.js') && f !== 'shared.js');
    let totalObjective = 0;
    let totalProgramming = 0;
    let withTags = 0;
    let withRichExplanation = 0;
    let withPlaceholder = 0;
    let totalPlaceholder = 0;
    const paperDetails = [];

    for (const file of files) {
        const paperId = file.replace('.js', '');
        const meta = paperMeta[paperId] || {};
        const content = fs.readFileSync(path.join(levelDir, file), 'utf8');

        // 简单解析：用 new Function 安全求值
        let paperData;
        try {
            // 去掉 import 行，mock LEVEL*_TAGS
            let cleanContent = content.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
            // 把 export const/let/var 去掉 export
            cleanContent = cleanContent.replace(/export\s+(const|let|var|default)\s+/g, '$1 ');
            // mock LEVEL*_TAGS 为空对象（够用，只检查 tags 是否存在）
            const mockTags = `const LEVEL${level}_TAGS = new Proxy({}, { get: () => ({}), getOwnPropertyDescriptor: () => ({}) });`;
            const fn = new Function(`${mockTags}\n${cleanContent}\nreturn typeof paperData !== 'undefined' ? paperData : null;`);
            paperData = fn();
            if (!paperData) {
                paperDetails.push({ paperId, error: 'paperData 未定义' });
                continue;
            }
        } catch (e) {
            paperDetails.push({ paperId, error: e.message.slice(0, 80) });
            continue;
        }

        const questions = paperData.questions || [];
        const progQs = paperData.programmingQuestions || paperData.codingQuestions || [];

        for (const q of questions) {
            totalObjective++;
            if (Array.isArray(q.tags) && q.tags.length > 0) withTags++;
            // 检查是否为增强格式解析（含 **答案：** 或 **解析：** 等 Markdown）
            if (q.explanation && /\*\*(答案|解析|判定依据|易混|考点|纠错)/.test(q.explanation)) {
                withRichExplanation++;
            }
        }
        totalProgramming += progQs.length;

        const ph = meta.placeholderCount || 0;
        if (ph > 0) {
            withPlaceholder++;
            totalPlaceholder += ph;
        }

        paperDetails.push({
            paperId,
            objective: questions.length,
            programming: progQs.length,
            tagsCoverage: questions.length ? Math.round((questions.filter(q => Array.isArray(q.tags) && q.tags.length).length / questions.length) * 100) : 0,
            richExpl: questions.length ? Math.round((questions.filter(q => q.explanation && /\*\*(答案|解析|判定依据|易混|考点|纠错)/.test(q.explanation)).length / questions.length) * 100) : 0,
            placeholder: ph,
            reviewStatus: meta.reviewStatus || 'unknown',
            needsReview: meta.needsReview || false,
        });
    }

    report[`L${level}`] = {
        papers: files.length,
        totalObjective,
        totalProgramming,
        tagsCoverage: totalObjective ? Math.round((withTags / totalObjective) * 100) : 0,
        richExplanation: totalObjective ? Math.round((withRichExplanation / totalObjective) * 100) : 0,
        papersWithPlaceholder: withPlaceholder,
        totalPlaceholder,
        paperDetails,
    };
}

// 输出汇总
console.log('='.repeat(80));
console.log('GESP 题库完整度扫描报告');
console.log('='.repeat(80));

console.log('\n## 各级汇总\n');
console.log('| 级别 | 试卷 | 客观题 | 编程题 | tags覆盖 | 增强解析 | 占位题 | 需复查 |');
console.log('|------|------|--------|--------|----------|----------|--------|--------|');
for (const level of levels) {
    const d = report[`L${level}`];
    if (d.error) {
        console.log(`| L${level} | ❌ ${d.error} | | | | | | |`);
        continue;
    }
    const needsReviewCount = d.paperDetails.filter(p => p.needsReview).length;
    console.log(`| L${level} | ${d.papers} | ${d.totalObjective} | ${d.totalProgramming} | ${d.tagsCoverage}% | ${d.richExplanation}% | ${d.totalPlaceholder} | ${needsReviewCount} |`);
}

console.log('\n## 逐卷明细（仅列出有问题的）\n');
for (const level of levels) {
    const d = report[`L${level}`];
    if (d.error) continue;
    const problematic = d.paperDetails.filter(p => p.tagsCoverage < 100 || p.richExpl < 100 || p.placeholder > 0 || p.needsReview || p.error);
    if (problematic.length === 0) {
        console.log(`### L${level} ✅ 全部正常\n`);
        continue;
    }
    console.log(`### L${level}\n`);
    console.log('| 试卷 | 客观 | 编程 | tags | 增强解析 | 占位 | 状态 |');
    console.log('|------|------|------|------|----------|------|------|');
    for (const p of problematic) {
        const flags = [];
        if (p.tagsCoverage < 100) flags.push(`tags${p.tagsCoverage}%`);
        if (p.richExpl < 100) flags.push(`解析${p.richExpl}%`);
        if (p.placeholder > 0) flags.push(`占位${p.placeholder}`);
        if (p.needsReview) flags.push('需复查');
        console.log(`| ${p.paperId} | ${p.objective} | ${p.programming} | ${p.tagsCoverage}% | ${p.richExpl}% | ${p.placeholder} | ${p.reviewStatus} ${flags.join(' · ')} |`);
    }
    console.log('');
}

// 专题练习可用性
console.log('## 专题练习可用性（tags 覆盖率 ≥ 80% 才可用）\n');
for (const level of levels) {
    const d = report[`L${level}`];
    if (d.error) continue;
    const usable = d.tagsCoverage >= 80;
    console.log(`- L${level}: ${d.tagsCoverage}% ${usable ? '✅ 可用' : '⚠️ tags 不足，专题练习页会显示"暂未标注"'}`);
}
