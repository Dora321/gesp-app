import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, NotebookPen, TrendingUp, TrendingDown, Minus,
    Target, ListChecks, Trash2, Loader2, ArrowRight,
} from 'lucide-react';
import { getPaper, paperMeta } from '../../data/gesp/index';
import { resolveTopicTags } from '../../data/gesp/topics';
import {
    aggregateWeakTopics,
    clearPaperAttempts,
    latestWrongIdsByPaper,
    readExamAttempts,
    summarizePaperAttempts,
} from '../../utils/examHistory';
import { LEARNING_DATA_EVENT } from '../../utils/learningData';

const LEVEL_NAMES = '一二三四五六七八';

const formatDate = (timestamp) => new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
});

const percent = (rate) => `${Math.round(rate * 100)}%`;

const TrendBadge = ({ delta }) => {
    if (Math.abs(delta) < 0.01) {
        return (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Minus size={14} aria-hidden="true" /> 与首次持平
            </span>
        );
    }
    const improved = delta > 0;
    const Icon = improved ? TrendingUp : TrendingDown;
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${improved ? 'text-emerald-700' : 'text-orange-700'}`}>
            <Icon size={14} aria-hidden="true" />
            较首次{improved ? '提高' : '下降'} {percent(Math.abs(delta))}
        </span>
    );
};

export default function ReviewPage() {
    const navigate = useNavigate();
    const [attempts, setAttempts] = useState(() => readExamAttempts());
    const [papers, setPapers] = useState({});
    const [loading, setLoading] = useState(true);

    // 学习数据可能被导入/重置面板改写，跟着刷新而不是停留在旧快照上。
    useEffect(() => {
        const refresh = () => setAttempts(readExamAttempts());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        return () => window.removeEventListener(LEARNING_DATA_EVENT, refresh);
    }, []);

    const paperIdsWithAttempts = useMemo(() => Object.keys(attempts).sort(), [attempts]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        Promise.all(paperIdsWithAttempts.map(async (id) => [id, await getPaper(id)]))
            .then((entries) => {
                if (cancelled) return;
                setPapers(Object.fromEntries(entries.filter(([, paper]) => paper)));
                setLoading(false);
            });
        return () => { cancelled = true; };
    }, [paperIdsWithAttempts]);

    const wrongIdsByPaper = useMemo(() => latestWrongIdsByPaper(attempts), [attempts]);

    const wrongQuestionsByPaper = useMemo(() => {
        const result = {};
        for (const [paperId, ids] of Object.entries(wrongIdsByPaper)) {
            const paper = papers[paperId];
            if (!paper) continue;
            const byId = new Map((paper.questions || []).map((question) => [question.id, question]));
            const questions = ids.map((id) => byId.get(id)).filter(Boolean);
            if (questions.length > 0) result[paperId] = questions;
        }
        return result;
    }, [wrongIdsByPaper, papers]);

    const weakTopics = useMemo(
        () => aggregateWeakTopics(wrongQuestionsByPaper, resolveTopicTags),
        [wrongQuestionsByPaper],
    );

    const totalWrong = Object.values(wrongQuestionsByPaper).reduce((sum, list) => sum + list.length, 0);

    const removePaper = (paperId) => {
        clearPaperAttempts(paperId);
        setAttempts(readExamAttempts());
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
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
                        每次交卷都会记录成绩与错题。已经订正做对的题会自动移出错题本。
                    </p>
                </div>
            </div>

            <div className="mx-auto mt-6 max-w-5xl space-y-6 px-4 md:px-8">
                {paperIdsWithAttempts.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                        <p className="text-slate-600">还没有交卷记录。</p>
                        <p className="mt-1 text-sm text-slate-500">
                            在题库里用「考试模式」做完一套卷并交卷，这里就会出现成绩趋势和错题清单。
                        </p>
                        <Link
                            to="/question-bank"
                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white transition hover:bg-indigo-700"
                        >
                            去做一套真题 <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                ) : loading ? (
                    <div className="flex items-center justify-center gap-2 py-20 text-slate-500">
                        <Loader2 className="animate-spin" size={20} aria-hidden="true" /> 正在汇总成绩与错题…
                    </div>
                ) : (
                    <>
                        <section aria-labelledby="weak-topics-heading" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 id="weak-topics-heading" className="mb-1 flex items-center gap-2 text-lg font-bold">
                                <Target className="text-orange-500" size={20} aria-hidden="true" /> 薄弱考点
                            </h2>
                            <p className="mb-4 text-sm text-slate-500">
                                按最近一次交卷仍做错的题统计，共 {totalWrong} 道错题。点考点直接进入集中练习。
                            </p>
                            {weakTopics.length === 0 ? (
                                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                                    最近一次交卷没有留下错题，继续保持。
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
                        </section>

                        <section aria-labelledby="history-heading" className="space-y-4">
                            <h2 id="history-heading" className="flex items-center gap-2 text-lg font-bold">
                                <ListChecks className="text-indigo-500" size={20} aria-hidden="true" /> 各卷成绩趋势
                            </h2>
                            {paperIdsWithAttempts.map((paperId) => {
                                const meta = paperMeta[paperId];
                                const summary = summarizePaperAttempts(attempts[paperId]);
                                if (!meta || !summary) return null;
                                const wrongQuestions = wrongQuestionsByPaper[paperId] || [];

                                return (
                                    <article key={paperId} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-slate-800">{meta.title}</h3>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {LEVEL_NAMES[meta.level - 1]}级 · 共交卷 {summary.attemptCount} 次 · 最近 {formatDate(summary.latest.at)}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removePaper(paperId)}
                                                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={14} aria-hidden="true" /> 清除本卷记录
                                            </button>
                                        </div>

                                        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                            {[
                                                ['最近得分', `${summary.latest.score}/${summary.latest.total}`, percent(summary.latestRate)],
                                                ['最好成绩', `${summary.best.score}/${summary.best.total}`, percent(summary.bestRate)],
                                                ['最近答对', `${summary.latest.correct} 题`, `错 ${summary.latest.wrong} · 未答 ${summary.latest.unanswered ?? 0}`],
                                                ['不计分题', `${summary.latest.excluded ?? 0} 题`, '原卷内容缺失'],
                                            ].map(([label, value, hint]) => (
                                                <div key={label} className="rounded-lg bg-slate-50 px-3 py-2">
                                                    <dt className="text-[11px] font-semibold text-slate-500">{label}</dt>
                                                    <dd className="text-base font-bold text-slate-800">{value}</dd>
                                                    <dd className="text-[11px] text-slate-500">{hint}</dd>
                                                </div>
                                            ))}
                                        </dl>

                                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                            <TrendBadge delta={summary.improved} />
                                            <Link
                                                to={`/question-bank/${meta.level}/${paperId}`}
                                                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                                            >
                                                重做本卷 <ArrowRight size={15} aria-hidden="true" />
                                            </Link>
                                        </div>

                                        {wrongQuestions.length > 0 && (
                                            <div className="mt-4 border-t border-slate-100 pt-3">
                                                <h4 className="mb-2 text-xs font-bold text-slate-500">
                                                    仍做错的题（{wrongQuestions.length}）
                                                </h4>
                                                <ul className="space-y-1.5">
                                                    {wrongQuestions.map((question) => (
                                                        <li key={question.id} className="flex gap-2 text-sm text-slate-600">
                                                            <span className="shrink-0 font-mono font-bold text-orange-600">
                                                                第 {question.id} 题
                                                            </span>
                                                            <span className="line-clamp-2">
                                                                {String(question.question || '').replace(/\s+/g, ' ').slice(0, 90)}
                                                            </span>
                                                        </li>
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
            </div>
        </div>
    );
}
