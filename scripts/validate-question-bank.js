#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  applyVerifiedQuestionCorrections,
  verifiedQuestionCorrections,
} from '../src/data/gesp/verifiedQuestionCorrections.js';
import { hasCjkRadicals, normalizeCjkRadicals } from '../src/data/gesp/textNormalization.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');
const codeBaselinePath = path.join(__dirname, 'question-code-baseline.json');
const updateCodeBaseline = process.argv.includes('--update-code-baseline');
const officialMarkdownDir = process.env.GESP_OFFICIAL_MARKDOWN_DIR || '';
const codeBaseline = new Set(
  fs.existsSync(codeBaselinePath)
    ? JSON.parse(fs.readFileSync(codeBaselinePath, 'utf8')).issues || []
    : []
);

const levelConfigs = [
  { level: 1, dir: 'level1', pattern: /\d{4}-\d{2}-l1\.js$/, rules: { allowTemplate: true, tagsOptional: true } },
  { level: 2, dir: 'level2', pattern: /\d{4}-\d{2}-l2\.js$/, rules: { allowHistorical: true, tagsOptional: true } },
  { level: 3, dir: 'level3', pattern: /\d{4}-\d{2}-l3\.js$/, rules: { allowHistorical: true, tagsOptional: true } },
  { level: 4, dir: 'level4', pattern: /\d{4}-\d{2}-l4\.js$/, rules: { isAdvanced: true } },
  { level: 5, dir: 'level5', pattern: /\d{4}-\d{2}-l5\.js$/, rules: { isAdvanced: true } },
  { level: 6, dir: 'level6', pattern: /\d{4}-\d{2}-l6\.js$/, rules: { isAdvanced: true } },
  { level: 7, dir: 'level7', pattern: /\d{4}-\d{2}-l7\.js$/, rules: { isAdvanced: true } },
  { level: 8, dir: 'level8', pattern: /\d{4}-\d{2}-l8\.js$/, rules: { isAdvanced: true } },
];

const badFragments = ['待复核', '？？', '图略', '原卷A', '原卷B', '原卷C', '原卷D'];

// A demonstrative ("下面/以下/…") followed closely by a code artifact. The gap is
// deliberately tight — only light modifiers such as "的", "这段", "C++" may sit
// between them — because a loose gap matches prose questions that merely mention
// a program in passing ("下列关于实现该程序时采用的控制结构…"), which legitimately
// carry no code.
// 「函数 / 方法」和「代码 / 程序」一样是被引用的代码实体：「以下函数 check()
// 用于判断一棵二叉树是否为（ ）」如果没有附代码，同样无从作答。
const codeArtifactReference = '(?:以下|下列|下面|如下|上述|有如下)(?:\\s*的?\\s*(?:这段|这个|这份|该)?\\s*(?:C\\s*\\+\\+|C)?\\s*(?:语言)?\\s*)(?:代码|代码片段|代码段|程序|程序段|程序片段|函数|方法)';

const codePromptPatterns = [
  /(?:以下|下列|下面|如下|给定|阅读|分析).{0,24}(?:C\+\+\s*)?(?:代码|代码片段|程序段).{0,32}(?:执行|运行|输出|结果|横线|空白|填入|改为|说法)/i,
  /(?:代码|代码片段|程序段).{0,32}(?:如下|执行后|运行后|输出|横线|空白|应填|改为|逻辑判定)/i,
  // The two patterns above only recognise the literal words 代码/代码片段/程序段,
  // so the very common higher-level phrasing "下面程序的输出为（ ）" slipped past
  // the gate entirely — that blind spot is why 6–8 级 accumulated dozens of
  // questions referring to programs the data never stored.
  new RegExp(`${codeArtifactReference}[^。？\\n]{0,40}(?:执行|运行|输出|结果|横线|空白|填入|应填|改为|说法|实现|功能|作用|正确|错误|复杂度|返回|打印|描述|用于|判断|距离|路径|面积|周长|次数|表达)`, 'i'),
  new RegExp(`(?:代码|代码片段|代码段|程序|程序段|程序片段)(?:\\s*的?\\s*)(?:如下|执行后|运行后)`, 'i'),
];

const objectiveStemContaminationPatterns = [
  { label: '子任务编号', pattern: /子任务\s*(?:编号|号)/u },
  { label: '数据点占比', pattern: /(?:数据点|测试点)\s*(?:编号\s*)?(?:占比|比例)/u },
  {
    label: '题号/答案表',
    pattern: /(?:题号\s*(?:[\u002f／、|]\s*)?答案|答案\s*(?:[\u002f／、|]\s*)?题号)|题号(?:\s*[:：]?\s*(?:\d{1,2}|[A-D])){2,}[\s\S]{0,120}?答案/u,
  },
];

// PDF 的公式是图片或特殊字形，文本层提取时会整块消失，只在中文句子里留下一个
// 空档：「一棵有 个节点的完全二叉树，深度为 。」——量词前没有数字、句子在
// 「为/是」后直接收尾。这类题看起来完整，实际根本无法作答，必须标记出来。
const droppedFormulaPatterns = [
  { label: '量词前缺数值', pattern: /[有共为是到][ 　]+[个位条项步层级棵种次张行列组套件]/u },
  { label: '句末缺公式', pattern: /(?:复杂度|深度|高度|长度|结果|输出|个数|边|距离|面积|周长|值)(?:为|是)[ 　]*[。，）)]/u },
  // 「其值大于等于 ，」「当 n 小于 时」——比较词后面的数值被吞掉。
  { label: '比较式缺数值', pattern: /(?:大于等于|小于等于|不小于|不大于|大于|小于|等于)[ 　]+[。，）)、]/u },
];

export const getDroppedFormulaErrors = (question, questionId = question?.id || '?') => {
  if (!['single', 'judge'].includes(question?.type) || question.sourceIntegrity) return [];

  const stem = String(question.question || '');
  return droppedFormulaPatterns
    .filter(({ pattern }) => pattern.test(stem))
    .map(({ label }) => (
      `[INTEGRITY] Q${questionId}: 题干疑似丢失公式或数值（${label}），无法作答但未标记 sourceIntegrity`
    ));
};

// 提取事故的另外三种形态，和「公式丢失」一样让题目无法作答：
// 选项还是占位符、题干里混进 PDF 页脚（说明抓取跨页串了内容）、选项末尾的
// 公式被吞掉（「最坏情况下，访问结点数是」后面什么都没有）。
const brokenPresentationChecks = [
  {
    label: '选项仍是占位符',
    test: (q) => (q.options || []).some(option => /^(?:选项\s*[A-D]|待补充|TODO|N\/A)\s*$/i.test(String(option).trim())),
  },
  {
    label: '题干混入 PDF 页脚',
    test: (q) => /第\s*\d+\s*页\s*[/／]\s*共\s*\d+\s*页/.test(`${q.question || ''}${q.code || ''}`),
  },
  {
    label: '选项末尾公式丢失',
    test: (q) => (q.options || []).some(option => /(?:复杂度|结点数|节点数|个数|深度|次数)(?:是|为)[ 　]*$/.test(String(option).trim())),
  },
  {
    // 「A. 、」「B. 、」——公式被整块吞掉后，选项只剩一个顿号。这不会触发任何
    // 「空值」检查，因为字符串并不是空的。
    //
    // 只认中文标点：选项本身就是运算符（`=` `&&` `**`）或 ASCII 图形（`*****`）
    // 的题目是正常的，不能误伤——「以下哪个不是 C++ 的运算符」正是这种题。
    label: '选项只剩标点',
    test: (q) => (q.options || []).some(option => {
      const text = String(option).trim();
      return text.length > 0 && /^[、，。：；？！（）「」…—·]+$/u.test(text);
    }),
  },
  {
    // 「左孩子位于2i」和「左孩子位于 2i」是同一句话，只差一个空格——学生选
    // 哪个都对，却只有一个被判正确（2025-09-l6:Q8 的 A、D 正是如此）。
    //
    // 但空白不能一律抹掉：一级有大量「输出格式」题，四个选项恰恰是靠空格区分的
    // （"a+1= 2" vs "a+1=2"），ASCII 图形题更是只有空白不同。所以只对「中文散文
    // 选项」归一化空白，带换行或明显是程序输出的选项一律按原文比。
    //
    // 另外只在重复项里包含正确答案时才算缺陷：两个错误选项写重了虽然马虎，
    // 题目仍然可以作答，不该因此把它从题库里摘掉。
    label: '选项内容重复无法区分',
    test: (q) => {
      const raw = (q.options || []).map(option => String(option));
      if (raw.length < 2) return false;

      const isProse = (option) => /[一-鿿]/u.test(option)
        && !/[\n|#*]/u.test(option)
        && !/\s{2,}/u.test(option);

      const key = (option) => {
        const trimmed = option.trim();
        return isProse(trimmed) ? trimmed.replace(/\s+/gu, '') : trimmed;
      };

      const keys = raw.map(key);
      const answerKey = keys[q.answer];
      if (!answerKey) return false;
      return keys.filter(item => item === answerKey).length > 1;
    },
  },
];

export const getBrokenPresentationErrors = (question, questionId = question?.id || '?') => {
  if (!['single', 'judge'].includes(question?.type) || question.sourceIntegrity) return [];

  return brokenPresentationChecks
    .filter(({ test }) => test(question))
    .map(({ label }) => (
      `[INTEGRITY] Q${questionId}: ${label}，题目无法作答但未标记 sourceIntegrity`
    ));
};

// 有些解析会自己承认「原题以图片给出、文本无法恢复，此处依据官方答案确定」。
// 这是最可靠的一类信号——写解析的人已经确认过推不出来了，只是没有把这件事
// 变成结构化标记，于是题目照常计分，学生做错了也不知道为什么。
//
// 只收对「来源」的明确供述。像「a>>1 丢失最低位，无法还原」这种讲算法性质的
// 说法必须放过，所以不能只匹配「无法还原」。
const unrecoverableAdmissionPatterns = [
  /以图片(?:\/公式)?形式给出/u,
  /无法从文本恢复/u,
  /依据官方答案确定/u,
  /具体分析依赖试卷原图/u,
  /基于选项特征推断/u,
  /待代码补充后需复核/u,
];

export const getUnrecoverableAdmissionErrors = (question, questionId = question?.id || '?') => {
  if (!['single', 'judge'].includes(question?.type) || question.sourceIntegrity) return [];

  const explanation = String(question.explanation || '');
  return unrecoverableAdmissionPatterns.some(pattern => pattern.test(explanation))
    ? [`[INTEGRITY] Q${questionId}: 解析自认原题无法从文本恢复（只能照抄官方答案），但未标记 sourceIntegrity`]
    : [];
};

export const getObjectiveStemIntegrityErrors = (question, questionId = question?.id || '?') => {
  if (!['single', 'judge'].includes(question?.type) || question.sourceIntegrity) return [];

  // 抓取跨页时，答案表/子任务表会串进来。此前只检查题干，但同样的碎片也会落到
  // 选项里——2023-12-l8:Q15 的选项 C 末尾就挂着「题号 1 2 3 4 5 6 7 8」。
  const stem = String(question.question || '');
  const errors = objectiveStemContaminationPatterns
    .filter(({ pattern }) => pattern.test(stem))
    .map(({ label }) => (
      `[INTEGRITY] Q${questionId}: objective question stem contains suspected OCR/cross-question fragment "${label}" but lacks sourceIntegrity flag`
    ));

  const options = (question.options || []).map(option => String(option || ''));
  for (const { label, pattern } of objectiveStemContaminationPatterns) {
    if (options.some(option => pattern.test(option))) {
      errors.push(
        `[INTEGRITY] Q${questionId}: 选项中混入疑似跨题碎片「${label}」，但未标记 sourceIntegrity`,
      );
    }
  }

  return errors;
};

const looksLikeCode = (value) => {
  const code = String(value || '').trim();
  if (code.length < 12) return false;
  return /[;{}]/.test(code)
    && /\b(?:string|int|bool|double|char|auto|if|for|while|return|cout|cin|printf|scanf)\b|(?:<<|>>)/i.test(code);
};

const hasStructuredCodeContent = (q, text) => (
  typeof q.code === 'string' && q.code.trim().length >= 3
) || /```(?:cpp|c\+\+|c|text)?\s*\n[\s\S]{3,}?```/i.test(text);

const hasCodeContent = (q, text) => {
  const content = text;
  if (hasStructuredCodeContent(q, content)) return true;
  if (/\b(?:printf|scanf)\s*\([^)]{2,}\)|\b(?:cout|cin)\s*(?:<<|>>)|\b(?:if|for|while|switch)\s*\([^)]{1,}\)/i.test(content)) return true;
  if (/\b[A-Za-z_]\w*\s*(?:<<|>>)\s*(?:[A-Za-z_]\w*|\d+)/.test(content)) return true;

  const inlineCode = [...content.matchAll(/`([^`\n]+)`/g)].map(match => match[1].trim());
  if (inlineCode.some(code => code.length >= 6 && /[;{}]|\b(?:if|for|while|cout|cin|printf|scanf|return|int|bool|double)\b/i.test(code))) {
    return true;
  }

  // Some official questions compare complete programs embedded in the options.
  return Array.isArray(q.options) && q.options.filter(looksLikeCode).length >= 2;
};

const requiresCodeContent = (q, text) => (
  q.requiresCode === true || codePromptPatterns.some(pattern => pattern.test(text))
);

/** Does this question's stem promise the learner a code/program artifact? */
export const questionReferencesCode = (question) => (
  requiresCodeContent(question, String(question?.question || '').trim())
);

/** Does the question actually ship that artifact anywhere the UI can render it? */
export const questionHasCodeContent = (question) => (
  hasCodeContent(question, String(question?.question || '').trim())
);

const isInlineExpressionQuestion = (q, text) => (
  !q.code
  && !/```/.test(text)
  && /执行\s*(?:C\+\+\s*)?代码/u.test(text)
  && !/(?:下面|下列|以下|如下|代码片段|程序段|横线|空白|阅读|分析)/u.test(text)
);

const paperIdToOfficialMarkdownFile = (paperId) => {
  const match = paperId.match(/^(\d{4})-(\d{2})-l([1-8])$/);
  if (!match) return '';
  const [, year, month, level] = match;
  return `${year}年${Number(month)}月-C++${level}级.md`;
};

const extractOfficialObjectiveChunks = (markdown) => {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const judgeIndex = normalized.search(/\n\s*判断题/u);
  const programmingIndex = normalized.search(/\n\s*(?:编程题|三、?\s*编程题|3\s*\n\s*编程题)/u);
  const singleSection = judgeIndex >= 0 ? normalized.slice(0, judgeIndex) : normalized;
  const judgeSection = judgeIndex >= 0
    ? normalized.slice(judgeIndex, programmingIndex >= 0 ? programmingIndex : undefined)
    : '';

  const chunks = new Map();
  const collect = (section, offset, maxQuestionNumber) => {
    const matches = [...section.matchAll(/第\s*(\d{1,2})\s*题/g)];
    for (let i = 0; i < matches.length; i++) {
      const num = Number(matches[i][1]);
      if (!Number.isInteger(num) || num < 1 || num > maxQuestionNumber) continue;
      const start = matches[i].index || 0;
      const end = i + 1 < matches.length ? matches[i + 1].index : section.length;
      const globalId = offset + num;
      if (!chunks.has(globalId)) chunks.set(globalId, section.slice(start, end));
    }
  };

  collect(singleSection, 0, 15);
  collect(judgeSection, 15, 10);
  return chunks;
};

const getOfficialQuestionChunks = (() => {
  const cache = new Map();
  return (paperId) => {
    if (!officialMarkdownDir) return null;
    if (cache.has(paperId)) return cache.get(paperId);

    const filePath = path.join(officialMarkdownDir, paperIdToOfficialMarkdownFile(paperId));
    if (!fs.existsSync(filePath)) {
      cache.set(paperId, null);
      return null;
    }

    const chunks = extractOfficialObjectiveChunks(fs.readFileSync(filePath, 'utf8'));
    cache.set(paperId, chunks);
    return chunks;
  };
})();

const countOfficialCodeLines = (text) => {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => !/^\d+$/.test(line))
    .filter(line => !/^第\s*\d+\s*页/.test(line))
    .filter(line => !/^[A-D]\./.test(line));

  return lines.filter(line => (
    /[;{}]/.test(line)
    && /\b(?:string|int|bool|double|char|auto|if|for|while|return|cout|cin|printf|scanf)\b|(?:<<|>>)/i.test(line)
  )).length;
};

async function validateFile(filePath, cfg) {
  const errors = [];
  const warnings = [];
  const fileUrl = pathToFileURL(filePath).href;
  const fileName = path.basename(filePath);
  const paperId = fileName.replace(/\.js$/, '');
  const inferredCodeIssues = [];

  let paper;
  try {
    const module = await import(fileUrl);
    paper = applyVerifiedQuestionCorrections(module.paperData);
  } catch (e) {
    errors.push(`[CRITICAL] Import failed: ${e.message}`);
    return { errors, warnings, inferredCodeIssues };
  }

  if (!paper) {
    errors.push(`[ERROR] Missing paperData export`);
    return { errors, warnings, inferredCodeIssues };
  }

  // Basic fields
  if (!paper.id) errors.push(`[ERROR] Missing id`);
  if (!paper.title) errors.push(`[ERROR] Missing title`);
  if (!Array.isArray(paper.questions)) errors.push(`[ERROR] Missing questions array`);

  const configuredCorrection = verifiedQuestionCorrections[paperId];
  if (configuredCorrection) {
    if (!configuredCorrection.sourceUrl) errors.push(`[ERROR] Verified corrections must include sourceUrl`);
    for (const [questionId, correction] of Object.entries(configuredCorrection.questions || {})) {
      if (!paper.questions?.some(question => String(question.id) === questionId)) {
        errors.push(`[ERROR] Verified correction references missing Q${questionId}`);
      }
      if (!Number.isInteger(correction.sourcePage) || correction.sourcePage < 1) {
        errors.push(`[ERROR] Verified correction Q${questionId} must include a positive sourcePage`);
      }
      if ('code' in correction && (typeof correction.code !== 'string' || correction.code.trim().length < 3)) {
        errors.push(`[ERROR] Verified correction Q${questionId} contains empty code`);
      }
    }
  }

  const verification = paper.verification;
  if (verification) {
    if (!['verified', 'partial', 'unverified'].includes(verification.status)) {
      errors.push(`[ERROR] verification.status must be verified, partial, or unverified`);
    }
    if (verification.status !== 'unverified') {
      if (!paper.source?.officialPdf && !paper.source?.url) errors.push(`[ERROR] Reviewed papers must include source.officialPdf or source.url`);
      if (!verification.reviewedBy) errors.push(`[ERROR] Reviewed papers must include verification.reviewedBy`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(verification.reviewedAt || '')) errors.push(`[ERROR] Reviewed papers must include verification.reviewedAt as YYYY-MM-DD`);
    }
  }

  // Historical / Template checks
  if (paper.isHistoricalPlaceholder || paper.sourceStatus === 'template-placeholder') {
    warnings.push(`[INFO] Marked as ${paper.isHistoricalPlaceholder ? 'historical' : 'template'} placeholder`);
    if (paper.questions.length === 0) return { errors, warnings, inferredCodeIssues };
  }

  // Question validation
  const questions = paper.questions || [];
  const officialQuestionChunks = getOfficialQuestionChunks(paperId);
  questions.forEach((q, index) => {
    const qId = q.id || `idx_${index}`;
    
    // Type check
    if (!['single', 'judge', 'programming'].includes(q.type)) {
      errors.push(`[ERROR] Q${qId}: Invalid type "${q.type}"`);
    }

    // Text check
    const text = String(q.question || '').trim();
    if (!text && q.type !== 'programming') {
      errors.push(`[ERROR] Q${qId}: Empty question text`);
    }

    errors.push(...getObjectiveStemIntegrityErrors(q, qId));
    errors.push(...getDroppedFormulaErrors(q, qId));
    errors.push(...getBrokenPresentationErrors(q, qId));
    errors.push(...getUnrecoverableAdmissionErrors(q, qId));

    // PDF 提取会把「行/心/网」写成康熙部首区的同形字。看不出来，但所有文本匹配
    // （站内搜索、考点推断、下面这些片段检查）都会静默失效，所以入库前必须归一化。
    const radicalFields = ['question', 'code', 'explanation', 'integrityNote']
      .filter(field => hasCjkRadicals(q[field]))
      .concat(Array.isArray(q.options) && q.options.some(hasCjkRadicals) ? ['options'] : []);
    if (radicalFields.length > 0) {
      const samples = [...new Set(
        [...String(radicalFields.map(field => JSON.stringify(q[field])).join(''))]
          .filter(hasCjkRadicals),
      )].slice(0, 6);
      errors.push(
        `[TEXT] Q${qId}: ${radicalFields.join('/')} 含 CJK 部首区字符 `
        + `${samples.map(ch => `${ch}(U+${ch.codePointAt(0).toString(16).toUpperCase()}→${normalizeCjkRadicals(ch)})`).join(' ')}`,
      );
    }

    if (requiresCodeContent(q, text) && !hasCodeContent(q, text)) {
      const message = `Q${qId}: question refers to code, but no fenced, inline, or independent code content was found`;
      if (q.requiresCode === true) errors.push(`[ERROR] ${message}`);
      else if (q.sourceIntegrity === 'missing-figure' || q.sourceIntegrity === 'missing-code') {
        // Already recorded in the data as a known missing code image/snippet, and
        // the UI warns the learner about it. Re-reporting it here would just be
        // noise — the structured flag is a stronger record than the baseline
        // file, because it also removes the question from scoring and from topic
        // practice instead of only silencing a build warning.
        warnings.push(`[CODE-FLAGGED] ${message}`);
      } else {
        const issueKey = `${paperId}:Q${qId}`;
        inferredCodeIssues.push(issueKey);
        if (updateCodeBaseline || codeBaseline.has(issueKey)) warnings.push(`[CODE-BASELINE] ${message}`);
        else errors.push(`[CODE-NEW] ${message}`);
      }
    }

    if (officialQuestionChunks && ['single', 'judge'].includes(q.type)) {
      const officialText = officialQuestionChunks.get(Number(q.id));
      if (officialText) {
        const officialCodeLines = countOfficialCodeLines(officialText);
        const officialMentionsCode = requiresCodeContent(q, officialText);
        const issueKey = `${paperId}:Q${qId}`;
        if (officialMentionsCode && officialCodeLines >= 2 && !hasCodeContent(q, text)) {
          errors.push(`[OFFICIAL-CODE-MISSING] ${issueKey}: official Markdown contains code, but local question has no code content`);
        } else if (
          officialMentionsCode
          && officialCodeLines >= 2
          && !hasStructuredCodeContent(q, text)
          && !isInlineExpressionQuestion(q, text)
          && !q.sourceIntegrity
        ) {
          warnings.push(`[OFFICIAL-CODE-INLINE] ${issueKey}: official Markdown contains multi-line code; prefer a fenced or independent code field locally`);
        }
      }
    }

    if (q.requiresCode === true && !q.sourcePage && !q.sourceImage && !q.sourceUrl) {
      warnings.push(`[SOURCE] Q${qId}: requiresCode questions should include sourcePage, sourceImage, or sourceUrl for source comparison`);
    }

    if (q.sourceVerified === true) {
      if (!q.sourcePage && !q.sourceImage && !q.sourceUrl) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include sourcePage, sourceImage, or sourceUrl`);
      if (!q.reviewedBy) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include reviewedBy`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(q.reviewedAt || '')) errors.push(`[ERROR] Q${qId}: sourceVerified questions must include reviewedAt as YYYY-MM-DD`);
    }

    // A question whose explanation admits its options/figure were reconstructed
    // must carry the structured sourceIntegrity flag, so the UI can warn about
    // it instead of the admission staying buried in prose.
    const explanationText = String(q.explanation || '');
    const admitsReconstruction = /选项为占位文本|选项原文为占位符|未包含.{0,6}配图|未包含原图|反推各遍历|串入了无关|录入串味/.test(explanationText);
    if (admitsReconstruction && !q.sourceIntegrity) {
      errors.push(`[INTEGRITY] Q${qId}: explanation admits reconstructed options/figure but question lacks sourceIntegrity flag`);
    }
    if (q.sourceIntegrity) {
      const allowed = [
        'options-reconstructed',
        'missing-figure',
        'missing-code',
        'missing-formula',
        'contaminated-stem',
        'not-official-question',
        'answer-key-conflict',
        'answer-key-suspect',
        'official-source-defect',
      ];
      if (!allowed.includes(q.sourceIntegrity)) {
        errors.push(`[INTEGRITY] Q${qId}: unknown sourceIntegrity "${q.sourceIntegrity}"`);
      }
      if (!String(q.integrityNote || '').trim()) {
        errors.push(`[INTEGRITY] Q${qId}: sourceIntegrity requires an integrityNote`);
      }
    }

    // Fragments check (Dirty data)
    badFragments.forEach(frag => {
      if (text.includes(frag) || String(q.explanation || '').includes(frag)) {
        warnings.push(`[DIRTY] Q${qId}: suspicious fragment "${frag}"`);
      }
    });

    // Tags check
    if (!Array.isArray(q.tags) || q.tags.length === 0) {
      if (cfg.rules.tagsOptional) {
        warnings.push(`[LINT] Q${qId}: Missing tags (optional for this level)`);
      } else {
        errors.push(`[ERROR] Q${qId}: Missing tags`);
      }
    }

    // Type-specific checks
    if (q.type === 'single') {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        errors.push(`[ERROR] Q${qId}: Single choice must have 4 options`);
      }
    } else if (q.type === 'judge') {
      if (!Array.isArray(q.options) || q.options.length !== 2) {
        errors.push(`[ERROR] Q${qId}: Judge must have 2 options`);
      }
    }
  });

  return { errors, warnings, inferredCodeIssues };
}

async function run() {
  console.log('🚀 Starting Question Bank Validation...\n');
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFiles = 0;
  const currentCodeIssues = new Set();

  for (const cfg of levelConfigs) {
    const dir = path.join(root, cfg.dir);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => cfg.pattern.test(f)).sort();
    if (files.length === 0) continue;

    console.log(`--- Level ${cfg.level} (${files.length} files) ---`);
    for (const file of files) {
      totalFiles++;
      const fullPath = path.join(dir, file);
      const { errors, warnings, inferredCodeIssues } = await validateFile(fullPath, cfg);
      inferredCodeIssues.forEach(issue => currentCodeIssues.add(issue));
      
      if (errors.length > 0 || warnings.length > 0) {
        console.log(`${errors.length > 0 ? '❌' : '⚠️'} ${file}:`);
        errors.forEach(e => console.log(`  ${e}`));
        warnings.forEach(w => console.log(`  ${w}`));
        totalErrors += errors.length;
        totalWarnings += warnings.length;
      }
    }
    console.log('');
  }

  if (updateCodeBaseline) {
    const baseline = {
      description: 'Known questions that mention code but still require manual comparison with the official paper. New issues fail validation.',
      updatedAt: new Date().toISOString().slice(0, 10),
      issues: [...currentCodeIssues].sort(),
    };
    fs.writeFileSync(codeBaselinePath, `${JSON.stringify(baseline, null, 2)}\n`, 'utf8');
    console.log(`Updated code baseline: ${baseline.issues.length} known issues.\n`);
  } else {
    const staleIssues = [...codeBaseline].filter(issue => !currentCodeIssues.has(issue));
    if (staleIssues.length > 0) {
      totalErrors += staleIssues.length;
      console.log('❌ Code baseline contains resolved or renamed entries:');
      staleIssues.forEach(issue => console.log(`  [BASELINE-STALE] ${issue}`));
      console.log('Run npm run validate:bank:update-baseline after confirming the fixes.\n');
    }
  }

  console.log('--- Summary ---');
  console.log(`Files scanned: ${totalFiles}`);
  console.log(`Total Errors:   ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation failed with critical errors.');
    process.exit(1);
  } else {
    console.log('\n✅ Validation passed (with possible warnings).');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
