import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data/gesp');

const REPORT_FILE = path.join(__dirname, '../audit_comprehensive_report.md');

const badFragments = ['待复核', '？？', '图略', '原卷A', '原卷B', '原卷C', '原卷D', '题目占位'];

const report = {
    completeness: [],
    correctness: [],
    availability: [],
    usability: [],
    summary: { totalTested: 0, errors: 0, warnings: 0 }
};

function addCompletenessIssue(file, issue) { report.completeness.push(`- **${file}**: ${issue}`); }
function addCorrectnessIssue(file, Q, issue) { report.correctness.push(`- **${file}** [Q${Q}]: ${issue}`); report.summary.errors++;}
function addAvailabilityIssue(file, issue) { report.availability.push(`- **${file}**: ${issue}`); report.summary.errors++;}
function addUsabilityIssue(file, Q, issue) { report.usability.push(`- **${file}** [Q${Q}]: ${issue}`); report.summary.warnings++;}
function isHistoricalPlaceholderFile(fullPath) {
    return fs.readFileSync(fullPath, 'utf-8').includes('isHistoricalPlaceholder: true');
}

function checkLatexStructure(text) {
    if (!text) return null;
    const countMatches = (str, regex) => (str.match(regex) || []).length;
    // VERY BASIC checks for unbalanced codes
    const backticks = countMatches(text, /```/g);
    if (backticks % 2 !== 0) return 'Unbalanced ```';
    
    // Check balanced inline $
    // This is tricky because \$ could be escaped, but let's do a naive check for odd number of $ 
    // replacing \$ first
    const cleanText = text.replace(/\\\$/g, '');
    const inline = cleanText.split('$').length - 1;
    if (inline % 2 !== 0) {
        // Double check $$ 
        const display = cleanText.split('$$').length - 1;
        // If inline % 2 is odd, and display is even, then there's an issue
        // It's a rough heuristic
        return 'Suspicious unbalanced $';
    }
    return null;
}

async function runAudit() {
    console.log("Starting Comprehensive Audit...");
    let paperRegistry = {};
    let paperCodingMap = {};

    // 1. Availability: Check if core registry files can be imported
    try {
        const indexUrl = pathToFileURL(path.join(DATA_DIR, 'index.js')).href;
        const indexModule = await import(indexUrl);
        paperRegistry = indexModule.paperRegistry || {};
    } catch (e) {
        addAvailabilityIssue('index.js', `Failed to import paperRegistry: ${e.message}`);
    }

    try {
        const mapUrl = pathToFileURL(path.join(DATA_DIR, 'paperCodingMap.js')).href;
        const mapModule = await import(mapUrl);
        paperCodingMap = mapModule.paperCodingMap || {};
    } catch (e) {
        addAvailabilityIssue('paperCodingMap.js', `Failed to import paperCodingMap: ${e.message}`);
    }

    // List all files
    const levelDirs = fs.readdirSync(DATA_DIR).filter(d => d.startsWith('level') && fs.statSync(path.join(DATA_DIR, d)).isDirectory());
    const allFiles = [];

    levelDirs.forEach(dir => {
        const dirPath = path.join(DATA_DIR, dir);
        const files = fs.readdirSync(dirPath).filter(f => /^\d{4}-\d{2}-l\d+\.js$/.test(f));
        files.forEach(f => {
            const fullPath = path.join(dirPath, f);
            if (isHistoricalPlaceholderFile(fullPath)) return;
            allFiles.push({ dir, file: f, fullPath });
        });
    });

    report.summary.totalTested = allFiles.length;

    // Completeness: Registry coverage
    const registeredIds = Object.keys(paperRegistry);
    allFiles.forEach(({ file }) => {
        const fileId = file.replace('.js', '');
        if (!registeredIds.includes(fileId)) {
            addCompletenessIssue(file, `File exists on disk but is not registered in index.js.`);
        }
    });

    for (let { file, fullPath } of allFiles) {
        const fileId = file.replace('.js', '');
        let paper;

        // Availability: Can import paper?
        try {
            const paperUrl = pathToFileURL(fullPath).href;
            const pm = await import(paperUrl);
            paper = pm.paperData;
            if (!paper) throw new Error("paperData is not exported.");
        } catch (e) {
            addAvailabilityIssue(file, `Failed to load paperData: ${e.message}`);
            continue;
        }

        if (paper.isHistoricalPlaceholder) {
            continue; 
        }

        // Completeness: Questions length
        const qs = [
            ...(paper.questions || []),
            ...(paper.programmingQuestions || []),
            ...(paper.codingQuestions || [])
        ];
        if (qs.length !== 27) {
            addCompletenessIssue(file, `Expected 27 questions, found ${qs.length}.`);
        }

        // Completeness: Programming mapping
        const hasEmbeddedProgramming = (paper.programmingQuestions?.length || 0) + (paper.codingQuestions?.length || 0) > 0;
        if (!paperCodingMap[fileId] && !hasEmbeddedProgramming && qs.some(q => q.type === 'programming' || q.type === 'coding')) {
            addCompletenessIssue(file, `Missing entry in paperCodingMap.js for programming questions.`);
        }

        let typeCounts = { single: 0, judge: 0, programming: 0 };
        const idSet = new Set();

        qs.forEach((q, idx) => {
            const qNum = q.id || `idx-${idx}`;
            const normalizedType = (q.type === 'coding' || q.type === 'programming') ? 'programming' : q.type;
            if (normalizedType) typeCounts[normalizedType] = (typeCounts[normalizedType] || 0) + 1;

            // Correctness: ID unique and type valid
            if (idSet.has(q.id)) addCorrectnessIssue(file, qNum, 'Duplicate question ID');
            idSet.add(q.id);

            if (!['single', 'judge', 'programming', 'coding'].includes(q.type)) {
                addCorrectnessIssue(file, qNum, `Invalid type: ${q.type}`);
            }

            // Correctness: Answer and score structural bounds
            if (q.type === 'single') {
                if (![0,1,2,3].includes(q.answer)) addCorrectnessIssue(file, qNum, `Invalid single choice answer index: ${q.answer}`);
                if (!Array.isArray(q.options) || q.options.length !== 4) addCorrectnessIssue(file, qNum, `Single choice must have 4 options`);
            } else if (q.type === 'judge') {
                if (![0,1].includes(q.answer)) addCorrectnessIssue(file, qNum, `Invalid judge answer index: ${q.answer}`);
                if (!Array.isArray(q.options) || q.options.length !== 2) addCorrectnessIssue(file, qNum, `Judge must have 2 options`);
            }

            if (q.score === undefined) addCorrectnessIssue(file, qNum, `Missing score field`);

            // Correctness: Dirty data / suspected unverified parse output
            const fullText = (q.question || q.description || '') + (q.explanation || '') + JSON.stringify(q.options || []);
            badFragments.forEach(bf => {
                if (fullText.includes(bf)) {
                    addCorrectnessIssue(file, qNum, `Contains suspected dirty or placeholder data: "${bf}"`);
                }
            });

            // Correctness: Latex check
            const latexCheck = checkLatexStructure(q.question || q.description);
            if (latexCheck) addCorrectnessIssue(file, qNum, latexCheck);
            const latexExpCheck = checkLatexStructure(q.explanation);
            if (latexExpCheck) addCorrectnessIssue(file, qNum, `(Explanation) ${latexExpCheck}`);

            // Usability checks
            if (q.type !== 'programming' && q.type !== 'coding') {
                const expl = (q.explanation || '').trim();
                if (!expl || expl === '真题解析待补充。' || expl.includes('待补充')) {
                    addUsabilityIssue(file, qNum, `Missing or placeholder explanation.`);
                }
            } else {
                if (!q.template) addUsabilityIssue(file, qNum, `Missing code template.`);
                if (!q.referenceCode) addUsabilityIssue(file, qNum, `Missing reference code.`);
                if (!q.samples || q.samples.length === 0) addUsabilityIssue(file, qNum, `Missing samples.`);
            }
        });

        // Warn if expected count isn't matching standard format
        if (qs.length >= 27) {
            if (typeCounts.single !== 15 || typeCounts.judge !== 10 || typeCounts.programming !== 2) {
                addCompletenessIssue(file, `Question type distribution abnormal: ${JSON.stringify(typeCounts)} (expected 15 single, 10 judge, 2 prog).`);
            }
        }
    }

    // Generate markdown
    const md = [
        '# GESP Question Bank Comprehensive Audit Report',
        `\n**Summary**: ${report.summary.totalTested} files tested. Found ${report.summary.errors} errors and ${report.summary.warnings} usability warnings.`,
        '\n## 1. 完整性审计 (Completeness)',
        report.completeness.length > 0 ? report.completeness.join('\n') : '> All checks passed.',
        '\n## 2. 正确性审计 (Correctness) (Dirty Data, Constraints, Syntax)',
        report.correctness.length > 0 ? report.correctness.join('\n') : '> All checks passed.',
        '\n## 3. 可用性审计 (Availability)',
        report.availability.length > 0 ? report.availability.join('\n') : '> All checks passed.',
        '\n## 4. 易用性审计 (Usability) (Explanations, Code Templates)',
        report.usability.length > 0 ? report.usability.join('\n') : '> All checks passed.',
    ].join('\n');

    fs.writeFileSync(REPORT_FILE, md, 'utf-8');
    console.log(`\nAudit completed! Report saved to ${REPORT_FILE}`);
}

runAudit().catch(console.error);
