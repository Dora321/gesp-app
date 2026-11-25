import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getRelatedLessonsForTags } from '../../data/gesp/topicLessonMap';
import { parseCodingProblem } from '../../utils/codingProblemSections';
import { isProgrammingQuestion } from '../../utils/questionHelpers';
import { buildQuestionContent, formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';

const STATEMENT_SECTIONS = new Set(['background', 'description', 'input', 'output', 'constraints']);

function questionStatement(question) {
    if (!isProgrammingQuestion(question)) return stripLeadingNumber(buildQuestionContent(question)).trim();
    // 合成题的 explanation 存的是洛谷公开题面。其余题从题面字段提取内容。
    const isLuoguStatement = question.type === 'coding' && !question.description && question.tags?.includes('洛谷原题');
    const { title, sections } = parseCodingProblem(isLuoguStatement ? question : { ...question, explanation: undefined });
    return [
        title,
        ...sections.filter(({ key }) => STATEMENT_SECTIONS.has(key)).map(({ label, markdown }) => `${label}：${markdown}`),
    ].join('\n\n');
}

export function AskQuestionButton({ question, selected }) {
    const ask = () => {
        const options = (question.options || []).map(
            (option, index) => `${String.fromCharCode(65 + index)}. ${formatOptionDisplay(option)}`,
        );
        const choice = Number.isInteger(selected) && options[selected]
            ? `我选了 ${String.fromCharCode(65 + selected)}。\n`
            : '';
        const intro = '请帮我分析这道 GESP C++ 真题。';
        const instruction = `${choice}请先用提示的方式帮我分析思路，不要直接给出答案。`;
        const optionText = options.join('\n');
        const stem = questionStatement(question);
        // 长题面给选项和提问要求留出空间，避免课堂聊天末尾截掉提问。
        const stemLimit = Math.max(0, 3990 - intro.length - optionText.length - instruction.length);
        const summary = stem.length > stemLimit ? `${stem.slice(0, stemLimit).trimEnd()}…` : stem;
        const prompt = [
            intro,
            summary,
            optionText,
            instruction,
        ].filter(Boolean).join('\n\n');
        window.dispatchEvent(new CustomEvent('gesp:ask-ai', { detail: { prompt } }));
    };

    return (
        <button type="button" onClick={ask} className="mw-button mw-button--secondary mw-button--small min-h-11!">
            <MessageCircle size={16} aria-hidden="true" /> 问 AI 助教
        </button>
    );
}

export function RelatedLessonLinks({ tags, level }) {
    const lessons = getRelatedLessonsForTags(tags, level);
    if (!lessons.length) return null;

    return (
        <div className="mw-line-cpp space-y-2">
            <p className="text-sm font-semibold text-[var(--mw-ink)]">回看对应互动课</p>
            <ul className="flex flex-wrap gap-2">
                {lessons.map(({ path, title, level: lessonLevel }) => (
                    <li key={path}>
                        <Link to={path} className="inline-flex min-h-11 items-center gap-2 rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-[var(--mw-line-wash)] px-3 text-sm font-semibold text-[var(--mw-line-ink)] hover:border-current">
                            <span>C++ {lessonLevel} 级 · {title}</span><ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
