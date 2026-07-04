// Shared question helpers — extracted from ExamPaper and InteractiveAnalysisPage

/**
 * Check if a question is programming/coding type
 */
export const isProgrammingQuestion = (q) => q?.type === 'programming' || q?.type === 'coding';

/**
 * Strip leading number from question text: "1. What is..." → "What is..."
 */
export const stripLeadingNumber = (questionText) => {
  if (typeof questionText !== 'string') return questionText || '';
  return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

/**
 * Get the primary text content from a question object
 */
export const getQuestionContent = (q) => {
  if (!q) return '';
  const text = q.question || q.description || q.summary || q.title || '';
  if (typeof q.code !== 'string' || !q.code.trim()) return text;
  if (text.includes(q.code.trim())) return text;
  return `${text}\n\n\`\`\`${q.codeLanguage || 'cpp'}\n${q.code.trim()}\n\`\`\``;
};

/**
 * Build markdown statement for programming questions
 */
export const buildProgrammingStatementMarkdown = (q) => {
  if (!q) return '';
  if (q.type === 'coding' && !q.description && q.explanation) return q.explanation;

  const sections = [];
  if (q.title) sections.push(`## ${q.title}`);
  if (q.problemNumber) sections.push(`**题号**：${q.problemNumber}`);
  if (q.description) sections.push(`### 题目描述\n${q.description}`);
  if (q.inputDescription) sections.push(`### 输入格式\n${q.inputDescription}`);
  if (q.outputDescription) sections.push(`### 输出格式\n${q.outputDescription}`);

  if (Array.isArray(q.samples) && q.samples.length > 0) {
    const sampleSections = q.samples.map((sample, index) => [
      `#### 样例 ${index + 1}`,
      '输入：',
      '```text',
      sample.input || '',
      '```',
      '输出：',
      '```text',
      sample.output || '',
      '```',
    ].join('\n'));
    sections.push(`### 样例\n${sampleSections.join('\n\n')}`);
  }

  if (sections.length === 0) {
    return q.question || q.explanation || '';
  }
  return sections.join('\n\n');
};

/** Sentinal value for "programming acknowledged" answer */
export const PROGRAMMING_ACK = '__programming_acknowledged__';
