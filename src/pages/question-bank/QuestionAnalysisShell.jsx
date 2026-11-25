import { lazy, Suspense, useCallback, useId, useLayoutEffect, useState } from 'react';
import { BookOpen, BrainCircuit, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardList, Code2, Lightbulb, RotateCcw, X } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import CodingProblemView, { CopyableCodeBlock } from '../../components/CodingProblemView';
import SourceIntegrityNotice from '../../components/SourceIntegrityNotice';
import { getLuoguProblemUrl } from '../../data/gesp/codingQuestions';
import { resolveTopicTags } from '../../data/gesp/topics';
import { normalizeTopicTags } from '../../data/gesp/topicTaxonomy';
import { resolveVerification } from '../../data/gesp/verificationModel';
import useAnalysisSession from '../../hooks/useAnalysisSession';
import useQuestionKeyboardNavigation from '../../hooks/useQuestionKeyboardNavigation';
import { RESET_ANALYSIS_CONFIRM } from '../../utils/analysisProgress';
import { resolveQuestionIndex } from '../../utils/examScoring';
import { isProgrammingQuestion } from '../../utils/questionHelpers';
import { getQuestionNavStatus } from '../../utils/questionNavStatus';
import { buildQuestionContent, formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';
import { integrityNoticeTiming } from '../../utils/sourceIntegrity';
import AnalysisTrustNotice from './AnalysisTrustNotice';
import { AskQuestionButton, RelatedLessonLinks } from './QuestionStudyActions';

const AnswerReview = lazy(() => import('./AnswerReview'));

// 没有站内题解时才显示的通用做题步骤。刻意不按题干关键词套模板：按「格」
// 「排序」等字眼猜出来的复杂度、步骤会和真实题意矛盾（见 2025-12 四级第 26 题）。
const GENERIC_CODING_STEPS = ['读懂题意，圈出输入和输出', '用样例手算一遍', '写出核心循环或判断', '检查边界情况', '对照样例运行'];
const GENERIC_CODING_PITFALLS = ['数据范围可能很大，注意 int 是否会溢出', '边界值（0、1、只有一个数）要单独试一试', '输出格式要和题目完全一致'];

const ANALYSIS_CARD_TONES = {
    neutral: 'border-slate-200 bg-slate-50 text-slate-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-800',
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-800',
};

const AnalysisCard = ({ icon: Icon, title, tone = 'neutral', children }) => (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
        <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-800 md:text-base">
            <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${ANALYSIS_CARD_TONES[tone] || ANALYSIS_CARD_TONES.neutral}`}
                aria-hidden="true"
            >
                <Icon size={16} />
            </span>
            {title}
        </h3>
        <div className="mt-3 min-w-0">{children}</div>
    </section>
);

function ProgrammingAnalysis({ question, questionNumber, luoguUrl }) {
    const syntheticLuoguCoding = question.type === 'coding' && !question.description && Boolean(question.explanation);
    const hasAuthoredSolution = !syntheticLuoguCoding && Boolean(question.explanation || question.referenceCode);
    return (
        <div className="space-y-4">
            <CodingProblemView
                variant="review"
                q={question}
                questionNumber={questionNumber}
                luoguUrl={luoguUrl}
            />

            {syntheticLuoguCoding ? (
                <AnalysisCard icon={Lightbulb} title="题解思路">
                    <p className="text-sm leading-6 text-slate-700">
                        本题暂无站内题解，可前往
                        {luoguUrl ? (
                            <a
                                href={luoguUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-1 font-semibold text-slate-900 underline underline-offset-2"
                            >
                                洛谷
                            </a>
                        ) : '洛谷'}
                        查看题解。
                    </p>
                </AnalysisCard>
            ) : question.explanation && (
                <AnalysisCard icon={Lightbulb} title="题解思路">
                    <MarkdownRenderer
                        content={question.explanation}
                        className="text-[15px] font-normal leading-7 text-slate-700 md:text-base"
                    />
                </AnalysisCard>
            )}

            {question.template && (
                <details className="min-w-0 rounded-xl border border-slate-200 bg-white">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-[15px] font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500 md:px-5 md:text-base [&::-webkit-details-marker]:hidden">
                        <span
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                            aria-hidden="true"
                        >
                            <Code2 size={16} />
                        </span>
                        代码模板
                    </summary>
                    <div className="border-t border-slate-100 p-4 md:p-5">
                        <CopyableCodeBlock code={question.template} label="代码模板" ariaLabel="复制代码模板" />
                    </div>
                </details>
            )}

            {question.referenceCode && (
                <AnalysisCard icon={Code2} title="参考代码">
                    <p className="mb-3 text-sm leading-6 text-slate-600">建议自己写完再对照。</p>
                    <CopyableCodeBlock code={question.referenceCode} label="参考代码" ariaLabel="复制参考代码" />
                </AnalysisCard>
            )}

            {!hasAuthoredSolution && (
                <AnalysisCard icon={Lightbulb} title="通用做题步骤" tone="amber">
                    <p className="mb-3 text-sm font-semibold text-amber-800">通用提示，不针对本题</p>
                    <ol className="list-decimal space-y-1 pl-5 text-base leading-7 text-slate-700">
                        {GENERIC_CODING_STEPS.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                    <p className="mt-4 text-sm font-semibold text-slate-700">常见易错点</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                        {GENERIC_CODING_PITFALLS.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                </AnalysisCard>
            )}
        </div>
    );
}

function QuestionSourceNotice({ question, revealed }) {
    const timing = integrityNoticeTiming(question);
    if (timing === 'legacy' || (timing === 'after' && revealed)) {
        return (
            <div className="mb-4">
                <SourceIntegrityNotice
                    status={question.sourceIntegrity}
                    note={question.integrityNote}
                    defectKind={timing === 'after' ? question.defectKind : undefined}
                    examScoring={timing === 'after' ? question.examScoring : undefined}
                />
            </div>
        );
    }
    if (timing === 'after' && question.examScoring === 'excluded') {
        return <p className="mb-4 text-xs text-[var(--mw-ink-2)]">本题为原卷缺陷题，查看答案后会说明详情</p>;
    }
    return null;
}

function ObjectiveChoices({ question, selected, revealed, onSelect, onReveal }) {
    return (
        <div className="space-y-3">
            {(question.options || []).map((option, index) => {
                const picked = selected === index;
                const correct = revealed && index === question.answer;
                const wrong = revealed && picked && !correct;
                let tone = 'border-[var(--mw-rule)] hover:border-[var(--mw-ink)]';
                if (correct) tone = 'border-[var(--mw-ok)] bg-[var(--mw-ok-tint)] text-[var(--mw-ok)]';
                else if (wrong) tone = 'border-[var(--mw-err)] bg-[var(--mw-err-tint)] text-[var(--mw-err)]';
                else if (picked) tone = 'border-[var(--mw-ink)] bg-[var(--mw-line-wash)]';
                return (
                    <button
                        key={index}
                        type="button"
                        aria-pressed={picked}
                        aria-disabled={revealed}
                        onClick={() => onSelect(question, index)}
                        className={`question-option min-h-11 w-full rounded-[var(--mw-radius-m)] border px-4 py-3 text-left ${tone}`}
                    >
                        <span className="option-badge border border-current">{String.fromCharCode(65 + index)}</span>
                        <span className="question-option-content">
                            <MarkdownRenderer content={formatOptionDisplay(option)} inline className="text-inherit" />
                        </span>
                        {correct && <><CheckCircle2 size={18} aria-hidden="true" /><span className="sr-only">正确答案</span></>}
                        {wrong && <><X size={18} aria-hidden="true" /><span className="sr-only">所选答案错误</span></>}
                    </button>
                );
            })}
            <button type="button" onClick={onReveal} disabled={selected === undefined} className="mw-button mw-button--primary w-full disabled:opacity-50">
                <CheckCircle2 size={18} aria-hidden="true" /> 查看答案与解析
            </button>
        </div>
    );
}

function AnalysisHeader({ paper, subtitle, stats, index, count, onBack, backLabel, onReset }) {
    const [statsOpen, setStatsOpen] = useState(false);
    const statsId = useId();
    const { answered, revealed, correct, wrong } = stats;
    return (
        <header className="sticky top-0 z-20 border-b border-[var(--mw-rule)] bg-[var(--mw-surface)]">
            <div className="h-1 bg-[var(--mw-line)]" />
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                <button type="button" onClick={onBack} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-[var(--mw-canvas)]" aria-label={backLabel}>
                    <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate font-bold text-[var(--mw-ink)]">{paper.title}</h1>
                    <p className="text-xs text-[var(--mw-ink-2)]">解析模式 · {paper.level} 级{subtitle ? ` · ${subtitle}` : ''}</p>
                </div>
                <button type="button" onClick={onReset} className="mw-button mw-button--secondary mw-button--small min-h-11! shrink-0">
                    <RotateCcw size={14} aria-hidden="true" /> {subtitle ? '重置进度' : '重置'}
                </button>
            </div>
            <div className="mx-auto max-w-6xl px-4 pb-3 text-xs text-[var(--mw-ink-2)]">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2">
                    <span>第 {index + 1} 题 · 答题进度 {answered}/{count}</span>
                    <span>已解析 {revealed}/{count}</span>
                    {subtitle && (
                        <>
                            <span className="hidden md:inline">答对 {correct} · 答错 {wrong}</span>
                            <button
                                type="button"
                                onClick={() => setStatsOpen((open) => !open)}
                                aria-controls={statsId}
                                aria-expanded={statsOpen}
                                className="min-h-11 rounded-md border border-[var(--mw-rule)] px-2 font-semibold md:hidden"
                            >
                                {statsOpen ? '收起统计' : '展开统计'}
                            </button>
                        </>
                    )}
                </div>
                {subtitle && (
                    <p id={statsId} className={`mb-2 ${statsOpen ? 'block' : 'hidden'} md:hidden`}>
                        答对 {correct} · 答错 {wrong}
                    </p>
                )}
                <progress aria-label="答题进度" value={answered} max={count} className="block h-2 w-full accent-[var(--mw-ink)]" />
            </div>
        </header>
    );
}

function AnalysisNavigation({ questions, index, answers, revealed, onSelect }) {
    const [open, setOpen] = useState(false);
    const navId = useId();
    return (
        <aside className="h-fit min-w-0 rounded-md border border-[var(--mw-rule)] bg-[var(--mw-surface)] p-3" aria-label="题号导航">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={navId}
                className="flex min-h-11 w-full items-center justify-between rounded-md border border-[var(--mw-rule)] bg-[var(--mw-canvas)] px-3 text-sm font-semibold md:hidden"
            >
                <span>题号 ({index + 1}/{questions.length})</span>
                {open ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
            </button>
            <div className="mb-3 hidden items-center gap-2 text-sm font-semibold md:flex">
                <ClipboardList size={15} aria-hidden="true" /> 题号导航
            </div>
            <div id={navId} className={`${open ? 'grid' : 'hidden'} mt-2 grid-cols-5 gap-2 md:mt-0 md:grid md:grid-cols-4`}>
                {questions.map((question, position) => {
                    const current = position === index;
                    const status = getQuestionNavStatus({
                        q: question,
                        answer: answers[question.id],
                        revealed: Boolean(revealed[question.id]),
                        isCurrent: current,
                        questionNumber: position + 1,
                    });
                    return (
                        <button
                            key={question.id}
                            type="button"
                            aria-label={status.ariaLabel}
                            aria-current={current ? 'step' : undefined}
                            onClick={() => { onSelect(position); setOpen(false); }}
                            className={`h-11 rounded-md border text-sm font-semibold ${status.className}`}
                        >
                            {position + 1}
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

const TABS = [
    ['practice', '作答', BookOpen],
    ['analysis', '解析', Lightbulb],
    ['knowledge', '知识点', BrainCircuit],
];

export default function QuestionAnalysisShell({
    paper,
    paperId,
    questions,
    storageKey,
    mistakeSource,
    trackSignature,
    targetQuestion,
    subtitle,
    backLabel = '返回',
    onBack,
    renderKnowledge,
}) {
    const [activeTab, setActiveTab] = useState('practice');
    const {
        answers, revealed, currentQuestionIndex: index, setCurrentQuestionIndex, selectOption, reveal, reset,
    } = useAnalysisSession({ storageKey, questions, mistakeSource, trackSignature });

    const targetIndex = resolveQuestionIndex(questions, targetQuestion);
    // 深链接只在进入或链接参数变化时定位；之后仍可正常翻题和重置。
    useLayoutEffect(() => {
        if (targetIndex === null) return;
        setCurrentQuestionIndex(targetIndex);
        setActiveTab('practice');
    }, [targetQuestion, targetIndex, setCurrentQuestionIndex]);

    const goTo = useCallback((position) => {
        setCurrentQuestionIndex(Math.max(0, Math.min(position, questions.length - 1)));
        setActiveTab('practice');
    }, [questions.length, setCurrentQuestionIndex]);
    const previous = useCallback(() => goTo(index - 1), [goTo, index]);
    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    useQuestionKeyboardNavigation({ questionCount: questions.length, onPrevious: previous, onNext: next });

    const question = questions[index];
    const selected = answers[question.id];
    const isRevealed = Boolean(revealed[question.id]);
    const isProgramming = isProgrammingQuestion(question);
    const originalTags = question.tags || [];
    const topicTags = originalTags.filter((tag) => (
        tag !== `真题 ${question.sourceLabel}` && tag !== `待核验 ${question.sourceLabel}`
        && !(isProgramming && (['上机编程', '洛谷原题', '题面待补'].includes(tag) || /^P\d+$/.test(tag)))
    ));
    const topicQuestion = { ...question, tags: topicTags };
    const tags = resolveTopicTags(topicQuestion);
    const inferred = !normalizeTopicTags(topicTags).length;
    const verification = resolveVerification(paper);
    const trust = {
        answerVerified: verification.dimensions.answer === 'verified',
        explanationVerified: verification.dimensions.explanation === 'verified',
    };
    const luoguUrl = isProgramming ? getLuoguProblemUrl(question.sourcePaperId || paperId, question.sourceQuestionId ?? question.id) : null;
    const answered = Object.keys(answers).length;
    const revealedCount = Object.keys(revealed).length;
    let correct = 0;
    let wrong = 0;
    if (subtitle) {
        for (const item of questions) {
            if (isProgrammingQuestion(item) || !revealed[item.id]) continue;
            if (answers[item.id] === item.answer) correct += 1;
            else wrong += 1;
        }
    }
    const resetAll = () => {
        if (answered > 0 && !window.confirm(RESET_ANALYSIS_CONFIRM)) return;
        reset();
        setActiveTab('practice');
    };
    const revealCurrent = () => {
        if (reveal(question)) setActiveTab('analysis');
    };
    const choose = (item, option) => {
        if (selectOption(item, option)) setActiveTab('analysis');
    };

    return (
        <div className="mw-surface mw-line-bank min-h-screen bg-[var(--mw-canvas)] text-[var(--mw-ink)]">
            <AnalysisHeader
                paper={paper}
                subtitle={subtitle}
                stats={{ answered, revealed: revealedCount, correct, wrong }}
                index={index}
                count={questions.length}
                onBack={onBack}
                backLabel={backLabel}
                onReset={resetAll}
            />
            <main className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-4 p-4 md:grid-cols-[240px_minmax(0,1fr)]">
                <AnalysisNavigation questions={questions} index={index} answers={answers} revealed={revealed} onSelect={goTo} />
                <section className="min-w-0 space-y-4" aria-label="当前题目">
                    <div className="rounded-md border border-[var(--mw-rule)] bg-[var(--mw-surface)] p-4 md:p-8">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm text-[var(--mw-ink-2)]">第 {index + 1} 题 / 共 {questions.length} 题</p>
                            <div className="inline-flex gap-1 rounded-md bg-[var(--mw-canvas)] p-1">
                                {TABS.slice(0, renderKnowledge ? 3 : 2).map(([value, label, Icon]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-pressed={activeTab === value}
                                        onClick={() => setActiveTab(value)}
                                        className={`inline-flex min-h-11 items-center gap-1 rounded-sm border-b-4 px-2 text-sm sm:px-3 ${activeTab === value ? 'border-[var(--mw-line)] bg-[var(--mw-line-wash)] font-semibold' : 'border-transparent text-[var(--mw-ink-2)]'}`}
                                    >
                                        <Icon size={14} aria-hidden="true" /> {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <QuestionSourceNotice question={question} revealed={isRevealed} />
                        {question.sourceLabel && (
                            <p className="mb-2 text-xs text-[var(--mw-ink-2)]">来源：{question.sourceLabel} 真题 · 第 {question.sourceQuestionId} 题</p>
                        )}
                        {!isProgramming && (
                            <div className="question-stem mb-6">
                                <span className="question-number">{index + 1}.</span>
                                <MarkdownRenderer content={stripLeadingNumber(buildQuestionContent(question))} />
                            </div>
                        )}
                        {activeTab === 'practice' && (
                            isProgramming
                                ? <CodingProblemView q={question} questionNumber={index + 1} luoguUrl={luoguUrl} onReveal={revealCurrent} />
                                : <ObjectiveChoices question={question} selected={selected} revealed={isRevealed} onSelect={choose} onReveal={revealCurrent} />
                        )}
                        {activeTab === 'analysis' && (
                            isRevealed ? (
                                <div className="space-y-4">
                                    {isProgramming ? (
                                        <>
                                            <AnalysisTrustNotice {...trust} useGenericHint />
                                            <ProgrammingAnalysis question={question} questionNumber={index + 1} luoguUrl={luoguUrl} />
                                            <RelatedLessonLinks tags={tags} level={paper.level} />
                                        </>
                                    ) : (
                                        <Suspense fallback={<p role="status">正在加载解析…</p>}>
                                            <AnswerReview q={question} tags={tags} level={paper.level} given={selected} {...trust} />
                                        </Suspense>
                                    )}
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2 text-xs">
                                            {tags.map((tag) => <span key={tag} className="rounded-sm border border-[var(--mw-rule)] px-2 py-1">#{tag}</span>)}
                                            {inferred && <span className="text-[var(--mw-warn)]">题面推测，仅供参考</span>}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-[var(--mw-ink-2)]">
                                    {isProgramming ? '先在「作答」中阅读题面，再查看解析。' : '先在「作答」中选择答案，再查看解析。'}
                                </p>
                            )
                        )}
                        {activeTab === 'knowledge' && renderKnowledge?.({ tags, inferred })}
                        {!(activeTab === 'analysis' && isRevealed && !isProgramming) && (
                            <div className="mt-4">
                                <AskQuestionButton question={question} selected={isProgramming ? undefined : selected} />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" onClick={previous} disabled={index === 0} className="mw-button mw-button--secondary disabled:opacity-50">
                            <ChevronLeft size={16} aria-hidden="true" /> 上一题
                        </button>
                        <button type="button" onClick={next} disabled={index === questions.length - 1} className="mw-button mw-button--primary disabled:opacity-50">
                            下一题 <ChevronRight size={16} aria-hidden="true" />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
