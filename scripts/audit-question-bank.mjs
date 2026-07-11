// 题库完整度扫描脚本
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { paperMeta } from '../src/data/gesp/_generated.js';
import { applyVerifiedQuestionCorrections } from '../src/data/gesp/verifiedQuestionCorrections.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GESP_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');
const PAPER_FILE_PATTERN = /^\d{4}-\d{2}-l[1-8]\.js$/;
const RICH_EXPLANATION_PATTERN = /\*\*(答案|解析|判定依据|易混|考点|纠错)/;
const levels = [1, 2, 3, 4, 5, 6, 7, 8];
const report = {};

const isProgramming = question => ['programming', 'coding'].includes(question?.type);
const hasTags = question => Array.isArray(question?.tags) && question.tags.length > 0;
const hasRichExplanation = question => RICH_EXPLANATION_PATTERN.test(question?.explanation || '');

const collectProgrammingQuestions = (paperData, questions) => {
    const candidates = [
        ...questions.filter(isProgramming),
        ...(paperData.programmingQuestions || []),
        ...(paperData.codingQuestions || []),
    ];
    const unique = new Map();
    for (const question of candidates) {
        const key = `${question.id ?? ''}:${question.title ?? question.question ?? ''}`;
        unique.set(key, question);
    }
    return [...unique.values()];
};

for (const level of levels) {
    const levelDir = path.join(GESP_DIR, `level${level}`);
    if (!fs.existsSync(levelDir)) {
        report[`L${level}`] = { error: '目录不存在' };
        continue;
    }

    const files = fs.readdirSync(levelDir).filter(file => PAPER_FILE_PATTERN.test(file)).sort();
    let totalObjective = 0;
    let totalProgramming = 0;
    let withTags = 0;
    let withRichExplanation = 0;
    let papersWithPlaceholder = 0;
    let totalPlaceholder = 0;
    const paperDetails = [];

    for (const file of files) {
        const paperId = file.replace(/\.js$/, '');
        const meta = paperMeta[paperId] || {};
        let paperData;

        try {
            const fileUrl = pathToFileURL(path.join(levelDir, file)).href;
            const module = await import(fileUrl);
            paperData = applyVerifiedQuestionCorrections(module.paperData);
            if (!paperData) throw new Error('paperData 未定义');
        } catch (error) {
            paperDetails.push({ paperId, error: error.message.slice(0, 80) });
            continue;
        }

        const questions = paperData.questions || [];
        const objectiveQuestions = questions.filter(question => !isProgramming(question));
        const programmingQuestions = collectProgrammingQuestions(paperData, questions);

        totalObjective += objectiveQuestions.length;
        totalProgramming += programmingQuestions.length;
        withTags += objectiveQuestions.filter(hasTags).length;
        withRichExplanation += objectiveQuestions.filter(hasRichExplanation).length;

        const placeholder = meta.placeholderCount || 0;
        if (placeholder > 0) {
            papersWithPlaceholder++;
            totalPlaceholder += placeholder;
        }

        paperDetails.push({
            paperId,
            objective: objectiveQuestions.length,
            programming: programmingQuestions.length,
            tagsCoverage: objectiveQuestions.length
                ? Math.round((objectiveQuestions.filter(hasTags).length / objectiveQuestions.length) * 100)
                : 0,
            richExpl: objectiveQuestions.length
                ? Math.round((objectiveQuestions.filter(hasRichExplanation).length / objectiveQuestions.length) * 100)
                : 0,
            placeholder,
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
        papersWithPlaceholder,
        totalPlaceholder,
        paperDetails,
    };
}

console.log('='.repeat(80));
console.log('GESP 题库完整度扫描报告');
console.log('='.repeat(80));

console.log('\n## 各级汇总\n');
console.log('| 级别 | 试卷 | 客观题 | 编程题 | tags覆盖 | 增强解析 | 占位题 | 需复查 |');
console.log('|------|------|--------|--------|----------|----------|--------|--------|');
for (const level of levels) {
    const data = report[`L${level}`];
    if (data.error) {
        console.log(`| L${level} | ❌ ${data.error} | | | | | | |`);
        continue;
    }
    const needsReviewCount = data.paperDetails.filter(paper => paper.needsReview).length;
    console.log(`| L${level} | ${data.papers} | ${data.totalObjective} | ${data.totalProgramming} | ${data.tagsCoverage}% | ${data.richExplanation}% | ${data.totalPlaceholder} | ${needsReviewCount} |`);
}

console.log('\n## 逐卷明细（仅列出有问题的）\n');
for (const level of levels) {
    const data = report[`L${level}`];
    if (data.error) continue;
    const problematic = data.paperDetails.filter(paper => (
        paper.tagsCoverage < 100
        || paper.richExpl < 100
        || paper.placeholder > 0
        || paper.needsReview
        || paper.error
    ));
    if (problematic.length === 0) {
        console.log(`### L${level} ✅ 全部正常\n`);
        continue;
    }
    console.log(`### L${level}\n`);
    console.log('| 试卷 | 客观 | 编程 | tags | 增强解析 | 占位 | 状态 |');
    console.log('|------|------|------|------|----------|------|------|');
    for (const paper of problematic) {
        if (paper.error) {
            console.log(`| ${paper.paperId} | - | - | - | - | - | 导入失败：${paper.error} |`);
            continue;
        }
        const flags = [];
        if (paper.tagsCoverage < 100) flags.push(`tags${paper.tagsCoverage}%`);
        if (paper.richExpl < 100) flags.push(`解析${paper.richExpl}%`);
        if (paper.placeholder > 0) flags.push(`占位${paper.placeholder}`);
        if (paper.needsReview) flags.push('需复查');
        console.log(`| ${paper.paperId} | ${paper.objective} | ${paper.programming} | ${paper.tagsCoverage}% | ${paper.richExpl}% | ${paper.placeholder} | ${paper.reviewStatus} ${flags.join(' · ')} |`);
    }
    console.log('');
}

console.log('## 专题练习可用性（tags 覆盖率 ≥ 80% 才可用）\n');
for (const level of levels) {
    const data = report[`L${level}`];
    if (data.error) continue;
    const usable = data.tagsCoverage >= 80;
    console.log(`- L${level}: ${data.tagsCoverage}% ${usable ? '✅ 可用' : '⚠️ tags 不足，专题练习页会显示"暂未标注"'}`);
}
