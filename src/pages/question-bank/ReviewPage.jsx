import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ChevronLeft, ChevronDown, NotebookPen, TrendingUp, TrendingDown, Minus,
    Target, ListChecks, Trash2, ArrowRight, PencilLine, Printer,
} from 'lucide-react';
import LoadingBlocks from '../../components/LoadingBlocks';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { getPaper, paperMeta } from '../../data/gesp/index';
import { resolveTopicTags } from '../../data/gesp/topics';
import { resolveVerification } from '../../data/gesp/verificationModel';
import {
    aggregateWeakTopics,
    buildMistakePracticePaper,
    clearPaperAttempts,
    currentWrongIdsByPaper,
    pickWrongQuestions,
    summarizePaperAttempts,
} from '../../utils/examHistory';
import { LEARNING_DATA_EVENT, readLearningData } from '../../utils/learningData';
import {
    buildQuestionContent,
    formatOptionDisplay,
    normalizeEscapedLineBreaks,
    promoteLongInlineCodeBlocks,
    stripLeadingNumber,
} from '../../utils/questionTextFormatting';
import LearningDataManager from '../../components/LearningDataManager';
import { RelatedLessonLinks } from './QuestionStudyActions';
// 错题点开才需要解析，按需加载。
const AnswerReview = lazy(() => import('./AnswerReview'));
const InteractiveAnalysisPage = lazy(() => import('./InteractiveAnalysisPage'));

const LEVEL_NAMES = '一二三四五六七八';

const PRINT_STYLES = `
    .mw-wrong-print { position: fixed; left: -200vw; top: 0; width: 180mm; }
    @media print {
        body:has(> .mw-wrong-print) { background: white !important; overflow: visible !important; }
        body:has(> .mw-wrong-print) > :not(.mw-wrong-print) { display: none !important; }
        .mw-wrong-print { position: static; width: auto; margin: 0; color: #111; font-size: 11pt; line-height: 1.5; }
        .mw-wrong-print h1 { font-size: 20pt; font-weight: 700; }
        .mw-wrong-print h2 { font-size: 15pt; font-weight: 700; margin: 5mm 0 2mm; break-after: avoid-page; }
        .mw-wrong-print h3 { font-size: 11pt; font-weight: 700; break-after: avoid-page; }
        .mw-wrong-print article { border-top: 1px solid #aaa; padding: 3mm 0; break-inside: avoid-page; }
        .mw-wrong-print .markdown-body { color: inherit; font-size: inherit; overflow: visible; overflow-wrap: anywhere; }
        .mw-wrong-print .markdown-body pre { color: inherit; background: #f5f5f5; overflow: visible; white-space: pre-wrap; }
        .mw-wrong-print .markdown-body pre span { color: inherit !important; }
        .mw-wrong-print img { max-height: 75mm; object-fit: contain; }
        .mw-wrong-print img, .mw-wrong-print pre { break-inside: avoid-page; }
        .mw-wrong-print ul { margin: 2mm 0; padding-left: 5mm; }
        .mw-wrong-print button { display: none !important; }
        .mw-wrong-print .mw-write-line { height: 8mm; border-bottom: 1px solid #aaa; }
    }
`;

function PrintableWrongPaper({ job, onDone, onError }) {
    const sheetRef = useRef(null);
    // 先挂载并准备完整题面（包括题图），再打开系统打印。
    useEffect(() => {
        let cancelled = false;
        const images = [...sheetRef.current.querySelectorAll('img')];
        const ready = images.map((image) => {
            image.loading = 'eager';
            return image.decode();
        });
        if (document.fonts) ready.push(document.fonts.ready);

        Promise.allSettled(ready).then(() => {
            if (cancelled) return;
            window.addEventListener('afterprint', onDone, { once: true });
            try {
                window.print();
            } catch {
                onError();
            }
        });
        return () => {
            cancelled = true;
            window.removeEventListener('afterprint', onDone);
        };
    }, [onDone, onError]);

    const { entries, withAnswers, Renderer } = job;
    return createPortal(
        <main className="mw-wrong-print" ref={sheetRef} inert>
            <style>{PRINT_STYLES}</style>
            <h1>GESP C++ 错题卷</h1>
            <p>{withAnswers ? '附答案解析' : '无答案重做'} · 共 {entries.reduce((count, entry) => count + entry.questions.length, 0)} 题</p>
            {entries.map(({ id, title, questions, answerVerified }) => (
                <section key={id}>
                    <h2>{title}</h2>
                    {questions.map(({ question, explanation, generic }) => (
                        <article key={question.id}>
                            <h3>原卷第 {question.id} 题</h3>
                            <div className="markdown-body">
                                <Renderer content={promoteLongInlineCodeBlocks(normalizeEscapedLineBreaks(stripLeadingNumber(buildQuestionContent(question))))} />
                            </div>
                            <ul aria-label="选项">
                                {(question.options || []).map((option, index) => (
                                    <li key={index}>
                                        {String.fromCharCode(65 + index)}.{' '}
                                        <span className="markdown-body inline-markdown"><Renderer content={formatOptionDisplay(option)} inline /></span>
                                    </li>
                                ))}
                            </ul>
                            {withAnswers ? (
                                <>
                                    <p><strong>{answerVerified ? '已核验答案' : '题库答案（尚未完成核验）'}：</strong>
                                        {Number.isInteger(question.answer) && question.options?.[question.answer] !== undefined
                                            ? String.fromCharCode(65 + question.answer)
                                            : '暂无'}
                                    </p>
                                    {explanation && (
                                        <>
                                            <p><strong>{generic ? '通用解题提示' : '核心解析'}</strong></p>
                                            <div className="markdown-body"><Renderer content={normalizeEscapedLineBreaks(explanation)} /></div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div>
                                    <p>作答与推演</p>
                                    <div className="mw-write-line" /><div className="mw-write-line" />
                                </div>
                            )}
                        </article>
                    ))}
                </section>
            ))}
        </main>,
        document.body,
    );
}

const formatDate = (timestamp) => new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
});

const percent = (rate) => `${Math.round(rate * 100)}%`;

const plainSnippet = (question) => stripLeadingNumber(String(question.question || ''))
    .replace(/```[\s\S]*?```/g, ' [代码] ')
    .replace(/[`*#>$]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

const TrendBadge = ({ delta }) => {
    if (Math.abs(delta) < 0.01) {
        return (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500">
                <Minus size={14} aria-hidden="true" /> 与首次持平
            </span>
        );
    }
    const improved = delta > 0;
    const Icon = improved ? TrendingUp : TrendingDown;
    return (
        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${improved ? 'text-emerald-700' : 'text-orange-700'}`}>
            <Icon size={14} aria-hidden="true" />
            较首次{improved ? '提高' : '下降'} {percent(Math.abs(delta))}
        </span>
    );
};

/** 一道错题：点开看题干、选项、正确答案和解析。内容只在展开时渲染，错题多时也不卡。 */
const WrongQuestionItem = ({ question, paper, paperId }) => {
    const [open, setOpen] = useState(false);
    const verification = resolveVerification(paper);
    const panelId = `wrong-${paperId}-${question.id}`;

    return (
        <li className="rounded-lg border border-slate-200 bg-white">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex min-h-12 w-full items-start gap-3 px-4 py-3 text-left hover:bg-slate-50"
            >
                <span className="shrink-0 text-base font-bold tabular-nums text-orange-700">第 {question.id} 题</span>
                <span className="min-w-0 flex-1 text-base text-slate-700">{plainSnippet(question)}</span>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-slate-500">
                    {open ? '收起' : '看题和解析'}
                    <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                </span>
            </button>
            {open && (
                <div id={panelId} className="space-y-4 border-t border-slate-100 px-4 py-4">
                    <div className="question-stem">
                        <span className="question-number">{question.id}.</span>
                        <MarkdownRenderer content={stripLeadingNumber(buildQuestionContent(question))} />
                    </div>
                    <ul className="space-y-2" aria-label="选项">
                        {(question.options || []).map((option, index) => {
                            const isAnswer = index === question.answer;
                            return (
                                <li
                                    key={index}
                                    className={`question-option rounded-xl border px-4 py-3 ${isAnswer ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white text-slate-800'}`}
                                >
                                    <span className={`option-badge ${isAnswer ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="question-option-content">
                                        <MarkdownRenderer content={formatOptionDisplay(option)} inline={true} className="text-inherit" />
                                    </span>
                                    {isAnswer && <span className="sr-only">（正确答案）</span>}
                                </li>
                            );
                        })}
                    </ul>
                    <Link
                        to={`/question-bank/${paper.level}/${paperId}?mode=analysis&q=${encodeURIComponent(question.id)}`}
                        className="mw-button mw-button--secondary mw-button--small min-h-11!"
                    >
                        去原卷解析查看 <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Suspense fallback={<p className="text-base text-slate-500">正在加载解析…</p>}>
                        <AnswerReview
                            q={question}
                            level={paper.level}
                            showGiven={false}
                            answerVerified={verification.dimensions.answer === 'verified'}
                            explanationVerified={verification.dimensions.explanation === 'verified'}
                        />
                    </Suspense>
                </div>
            )}
        </li>
    );
};

export default function ReviewPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const practicePaperId = searchParams.get('practice') || '';
    const [data, setData] = useState(() => readLearningData());
    const [papers, setPapers] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [printJob, setPrintJob] = useState(null);
    const [preparingPrint, setPreparingPrint] = useState(false);
    const [printError, setPrintError] = useState(false);
    const printRequest = useRef(null);
    // 「只练错题」开始时把题目定格：练的过程中做对的题会从错题本移出，
    // 但不能让正在练的这组题跟着变。
    const [practice, setPractice] = useState(null);

    // 学习数据可能被导入/重置面板、或「只练错题」改写，跟着刷新而不是停留在旧快照上。
    useEffect(() => {
        const refresh = () => setData(readLearningData());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        return () => window.removeEventListener(LEARNING_DATA_EVENT, refresh);
    }, []);

    const { attempts } = data;
    const wrongIdsByPaper = useMemo(() => currentWrongIdsByPaper(data), [data]);
    const paperIds = useMemo(
        () => [...new Set([...Object.keys(attempts), ...Object.keys(wrongIdsByPaper)])]
            .filter((id) => paperMeta[id])
            .sort(),
        [attempts, wrongIdsByPaper],
    );
    const paperIdsKey = paperIds.join('|');

    useEffect(() => {
        let cancelled = false;
        const ids = paperIdsKey ? paperIdsKey.split('|') : [];
        setLoading(true);
        setLoadError(false);
        Promise.all(ids.map(async (id) => [id, await getPaper(id)]))
            .then((entries) => {
                if (cancelled) return;
                setPapers(Object.fromEntries(entries.filter(([, paper]) => paper)));
                setLoading(false);
            })
            .catch(() => {
                if (cancelled) return;
                setLoadError(true);
                setLoading(false);
            });
        return () => { cancelled = true; };
    }, [paperIdsKey]);

    const wrongQuestionsByPaper = useMemo(() => {
        const result = {};
        for (const [paperId, ids] of Object.entries(wrongIdsByPaper)) {
            const questions = pickWrongQuestions(papers[paperId], ids);
            if (questions.length > 0) result[paperId] = questions;
        }
        return result;
    }, [wrongIdsByPaper, papers]);

    const weakTopics = useMemo(
        () => aggregateWeakTopics(wrongQuestionsByPaper, resolveTopicTags),
        [wrongQuestionsByPaper],
    );

    const totalWrong = Object.values(wrongQuestionsByPaper).reduce((sum, list) => sum + list.length, 0);
    const weakTopicLevel = paperMeta[weakTopics[0]?.questions[0]?.paperId]?.level;

    const finishPrint = useCallback(() => {
        printRequest.current = null;
        setPrintJob(null);
        setPreparingPrint(false);
    }, []);
    const failPrint = useCallback(() => {
        finishPrint();
        setPrintError(true);
    }, [finishPrint]);

    useEffect(() => {
        if (practicePaperId) finishPrint();
    }, [practicePaperId, finishPrint]);

    const printWrongQuestions = async (withAnswers) => {
        if (printRequest.current) return;
        const request = Symbol();
        printRequest.current = request;
        setPreparingPrint(true);
        setPrintError(false);
        try {
            const [{ default: Renderer }, analysis] = await Promise.all([
                import('../../components/MathMarkdownContent'),
                withAnswers ? import('./analysisEngine') : null,
            ]);
            if (printRequest.current !== request) return;
            const entries = paperIds.filter((id) => wrongQuestionsByPaper[id]?.length).map((id) => {
                const paper = papers[id];
                const verification = resolveVerification(paper);
                return {
                    id,
                    title: paperMeta[id].title,
                    answerVerified: verification.dimensions.answer === 'verified',
                    questions: wrongQuestionsByPaper[id].map((question) => {
                        const view = analysis?.selectAnalysisView(question, paper.level);
                        return {
                            question,
                            explanation: view?.analysis?.keyPoint || view?.explanation,
                            generic: view?.mode === 'generic',
                        };
                    }),
                };
            });
            setPrintJob({ entries, withAnswers, Renderer });
        } catch {
            if (printRequest.current === request) failPrint();
        }
    };

    if (!practicePaperId && practice) setPractice(null);
    if (practicePaperId && !loading && practice?.paperId !== practicePaperId) {
        setPractice({
            paperId: practicePaperId,
            paper: buildMistakePracticePaper(
                papers[practicePaperId],
                wrongQuestionsByPaper[practicePaperId] || [],
                practicePaperId,
            ),
        });
    }

    const removePaper = (paperId) => {
        const title = paperMeta[paperId]?.title || '这张卷';
        if (!window.confirm(`确定清除「${title}」的全部记录吗？成绩、错题和解析模式里的作答都会删除，不能恢复。`)) return;
        clearPaperAttempts(paperId);
        setData(readLearningData());
    };

    const startPractice = (paperId) => setSearchParams({ practice: paperId });
    const leavePractice = () => setSearchParams({});

    if (practicePaperId && practice?.paper) {
        return (
            <Suspense fallback={<div role="status" className="p-6">正在加载错题练习…</div>}>
                <InteractiveAnalysisPage
                    key={practice.paper.id}
                    paperData={practice.paper}
                    paperId={practice.paper.id}
                    storageKey={null}
                    backLabel="返回错题本"
                    onBack={leavePractice}
                />
            </Suspense>
        );
    }

    return (
        <div className="mw-surface mw-line-bank min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
            {printJob && <PrintableWrongPaper job={printJob} onDone={finishPrint} onError={failPrint} />}
            <div className="mw-page-banner bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
                <div className="mx-auto max-w-5xl">
                    <button
                        type="button"
                        onClick={() => navigate('/question-bank')}
                        className="mb-4 inline-flex min-h-11 items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-bold transition hover:bg-white/25"
                    >
                        <ChevronLeft size={16} aria-hidden="true" /> 返回题库
                    </button>
                    <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
                        <NotebookPen size={32} aria-hidden="true" /> 错题本与成绩历史
                    </h1>
                    <p className="text-indigo-100">
                        考试模式交卷、解析模式答题时做错的题都会记在这里；之后做对了才会移出。没作答的题不会把错题清掉。
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-6 max-w-5xl space-y-6 px-4 md:px-8">
                {practicePaperId && !loading && !practice?.paper && (
                    <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-base text-emerald-900">
                        这张卷已经没有错题了，不用再练。
                        <button type="button" onClick={leavePractice} className="ml-2 font-bold underline underline-offset-2">回到错题本</button>
                    </div>
                )}

                {paperIds.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <p className="text-slate-600">还没有做题记录。</p>
                        <p className="mt-1 text-sm text-slate-500">
                            用「考试模式」交一次卷，或在「解析模式」里做题，这里就会出现成绩趋势和错题。
                        </p>
                        <Link
                            to="/question-bank"
                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700"
                        >
                            去做一套真题 <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                ) : loading ? (
                    <div className="flex items-center justify-center gap-2.5 py-20 text-slate-500" role="status">
                        <LoadingBlocks /> 正在汇总成绩与错题
                    </div>
                ) : loadError ? (
                    <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-950">
                        <p className="font-bold">试卷没能加载出来，可能是网络不稳定。</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mw-button mw-button--secondary mw-button--small mt-4"
                        >
                            重新加载
                        </button>
                    </div>
                ) : (
                    <>
                        <section aria-labelledby="weak-topics-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 id="weak-topics-heading" className="mb-1 flex items-center gap-2 text-lg font-bold">
                                <Target className="text-orange-500" size={20} aria-hidden="true" /> 薄弱考点
                            </h2>
                            <p className="mb-4 text-sm text-slate-500">
                                按做错过、之后还没做对的题统计，共 {totalWrong} 道错题。点考点直接进入集中练习。
                            </p>
                            {weakTopics.length === 0 ? (
                                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                                    目前没有错题，继续保持。
                                </p>
                            ) : (
                                <ul className="flex flex-wrap gap-2.5">
                                    {weakTopics.slice(0, 24).map((topic) => {
                                        const level = paperMeta[topic.questions[0].paperId]?.level;
                                        return (
                                            <li key={topic.tag}>
                                                <Link
                                                    to={`/question-bank/topics/${level}?tag=${encodeURIComponent(topic.tag)}`}
                                                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-900 transition hover:border-orange-400 hover:bg-orange-100"
                                                >
                                                    {topic.tag}
                                                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-orange-700 ring-1 ring-orange-200">
                                                        错 {topic.wrongCount}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            {weakTopics.length > 0 && (
                                <div className="mt-4 border-t border-[var(--mw-rule)] pt-4">
                                    <RelatedLessonLinks tags={weakTopics.slice(0, 3).map(({ tag }) => tag)} level={weakTopicLevel} />
                                </div>
                            )}
                        </section>

                        <section aria-labelledby="history-heading" className="space-y-4">
                            <h2 id="history-heading" className="flex items-center gap-2 text-lg font-bold">
                                <ListChecks className="text-indigo-500" size={20} aria-hidden="true" /> 各卷错题与成绩
                            </h2>
                            {totalWrong > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {[[false, '无答案重做'], [true, '附答案解析']].map(([withAnswers, label]) => (
                                        <button
                                            type="button"
                                            key={label}
                                            onClick={() => printWrongQuestions(withAnswers)}
                                            disabled={preparingPrint}
                                            className="mw-button mw-button--secondary mw-button--small min-h-11! disabled:opacity-50"
                                        >
                                            <Printer size={16} aria-hidden="true" /> 打印错题卷（{label}）
                                        </button>
                                    ))}
                                    {preparingPrint && <p role="status" className="self-center text-sm">正在准备打印…</p>}
                                    {printError && <p role="alert" className="self-center text-sm text-[var(--mw-err)]">没能打开打印，请重试。</p>}
                                </div>
                            )}
                            {paperIds.map((paperId) => {
                                const meta = paperMeta[paperId];
                                const summary = summarizePaperAttempts(attempts[paperId] || []);
                                const wrongQuestions = wrongQuestionsByPaper[paperId] || [];
                                if (!summary && wrongQuestions.length === 0) return null;

                                return (
                                    <article key={paperId} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">{meta.title}</h3>
                                                <p className="mt-0.5 text-sm text-slate-500">
                                                    {LEVEL_NAMES[meta.level - 1]}级
                                                    {summary
                                                        ? ` · 共交卷 ${summary.attemptCount} 次 · 最近 ${formatDate(summary.latest.at)}`
                                                        : ' · 还没在考试模式交过卷'}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removePaper(paperId)}
                                                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={14} aria-hidden="true" /> 清除本卷记录
                                            </button>
                                        </div>

                                        {summary && (
                                            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                {[
                                                    ['最近得分', `${summary.latest.score}/${summary.latest.total}`, percent(summary.latestRate)],
                                                    ['最好成绩', `${summary.best.score}/${summary.best.total}`, percent(summary.bestRate)],
                                                    ['最近答对', `${summary.latest.correct} 题`, `错 ${summary.latest.wrong} · 没做 ${summary.latest.unanswered ?? 0}`],
                                                    ['不计分题', `${summary.latest.excluded ?? 0} 题`, '原卷内容缺失'],
                                                ].map(([label, value, hint]) => (
                                                    <div key={label} className="rounded-lg bg-slate-50 px-3 py-2">
                                                        <dt className="text-xs font-semibold text-slate-500">{label}</dt>
                                                        <dd className="text-base font-bold text-slate-800">{value}</dd>
                                                        <dd className="text-xs text-slate-500">{hint}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        )}

                                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                            {summary ? <TrendBadge delta={summary.improved} /> : <span />}
                                            <div className="flex flex-wrap gap-2">
                                                {wrongQuestions.length > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => startPractice(paperId)}
                                                        className="mw-button mw-button--primary mw-button--small"
                                                    >
                                                        <PencilLine size={15} aria-hidden="true" /> 只练错题（{wrongQuestions.length}）
                                                    </button>
                                                )}
                                                <Link
                                                    to={`/question-bank/${meta.level}/${paperId}`}
                                                    className="mw-button mw-button--secondary mw-button--small"
                                                >
                                                    重做整张卷 <ArrowRight size={15} aria-hidden="true" />
                                                </Link>
                                            </div>
                                        </div>

                                        {wrongQuestions.length > 0 && (
                                            <div className="mt-4 border-t border-slate-100 pt-3">
                                                <h4 className="mb-2 text-sm font-bold text-slate-600">
                                                    错题（{wrongQuestions.length}）· 点开看题、正确答案和解析
                                                </h4>
                                                <ul className="space-y-2">
                                                    {wrongQuestions.map((question) => (
                                                        <WrongQuestionItem
                                                            key={question.id}
                                                            question={question}
                                                            paper={papers[paperId]}
                                                            paperId={paperId}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </section>
                    </>
                )}

                {/* 导出/导入/重置从首页移来：学生查看自己学习记录的地方，
                    也正是想备份或清空这些记录的地方。 */}
                <LearningDataManager />
            </div>
        </div>
    );
}
