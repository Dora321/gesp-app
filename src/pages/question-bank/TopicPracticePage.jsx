import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Tags, Loader2, BookOpen, ShieldCheck, TriangleAlert } from 'lucide-react';
import { loadLevelTopics, buildTopicPaper } from '../../data/gesp/topics';
import { TOPIC_GROUP_ORDER } from '../../data/gesp/topicTaxonomy';
import InteractiveAnalysisPage from './InteractiveAnalysisPage';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8];
const LEVEL_NAMES = '一二三四五六七八';

export default function TopicPracticePage() {
    const navigate = useNavigate();
    const { level: levelParam } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const level = Math.min(8, Math.max(1, Number(levelParam) || 1));
    const activeTag = searchParams.get('tag') || '';
    const includePending = searchParams.get('includePending') === '1';

    // data 的筛选条件与当前 URL 不一致即视为加载中，避免显示上一组计数。
    const [data, setData] = useState(null);

    useEffect(() => {
        let cancelled = false;
        loadLevelTopics(level, { includePending }).then((result) => {
            if (!cancelled) setData({ level, includePending, ...result });
        });
        return () => { cancelled = true; };
    }, [includePending, level]);

    const loading = data?.level !== level || data?.includePending !== includePending;
    const topics = useMemo(() => (loading ? [] : data.topics), [data, loading]);
    const tagMap = loading ? null : data.tagMap;
    const stats = loading ? null : data.stats;
    const topicGroups = useMemo(() => {
        const grouped = new Map(TOPIC_GROUP_ORDER.map(group => [group, []]));
        for (const topic of topics) {
            if (!grouped.has(topic.group)) grouped.set(topic.group, []);
            grouped.get(topic.group).push(topic);
        }
        return [...grouped.entries()].filter(([, items]) => items.length > 0);
    }, [topics]);

    const topicPaper = useMemo(() => {
        if (!activeTag || !tagMap?.has(activeTag)) return null;
        return buildTopicPaper(level, activeTag, tagMap.get(activeTag));
    }, [activeTag, tagMap, level]);

    const updatePendingMode = () => {
        const next = new URLSearchParams();
        if (!includePending) next.set('includePending', '1');
        setSearchParams(next);
    };

    const openTopic = (tag) => {
        const next = new URLSearchParams();
        next.set('tag', tag);
        if (includePending) next.set('includePending', '1');
        setSearchParams(next);
    };

    // 选中考点后整页交给现成的交互解析页；浏览器返回即回到考点列表
    if (topicPaper) {
        return <InteractiveAnalysisPage key={topicPaper.id} paperData={topicPaper} paperId={topicPaper.id} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 shadow-lg">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/question-bank')}
                        className="mb-4 inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-bold hover:bg-white/25 transition"
                    >
                        <ChevronLeft size={16} /> 返回题库
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                        <Tags size={32} /> 按考点练习
                    </h1>
                    <p className="text-emerald-50">
                        默认只使用正式试卷中题面完整的客观题，按知识点集中练习。
                    </p>
                    <p className="mt-1 text-sm text-emerald-100/90">
                        部分试卷未标注知识点，其考点归类由题面关键词自动推断，可能不够精确。
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6 space-y-6">
                {/* 级别切换 */}
                <div className="flex flex-wrap gap-2">
                    {LEVELS.map((lv) => (
                        <Link
                            key={lv}
                            to={`/question-bank/topics/${lv}${includePending ? '?includePending=1' : ''}`}
                            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${lv === level
                                ? 'bg-emerald-700 text-white shadow'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}
                        >
                            {LEVEL_NAMES[lv - 1]}级
                        </Link>
                    ))}
                </div>

                <div className={`flex flex-col gap-3 rounded-lg border px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${includePending
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-emerald-200 bg-emerald-50'
                    }`}>
                    <div className="flex items-start gap-3">
                        {includePending
                            ? <TriangleAlert className="mt-0.5 shrink-0 text-amber-600" size={20} />
                            : <ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={20} />}
                        <div>
                            <div className="text-sm font-bold text-slate-800">
                                {includePending ? '当前包含待核验题' : '当前仅包含题面完整真题'}
                            </div>
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                                {includePending
                                    ? '风险题会显示完整性提示；历史占位卷仍不会进入练习。'
                                    : '带完整性风险标记的题目和历史占位卷均已排除。'}
                                {stats && (includePending
                                    ? ` 当前可练 ${stats.availableQuestionCount} 题，其中 ${stats.pendingQuestionCount} 道待核验。`
                                    : ` 当前可练 ${stats.availableQuestionCount} 题${stats.pendingQuestionCount > 0 ? `，该级另有 ${stats.pendingQuestionCount} 道待核验题` : ''}。`)}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={includePending}
                        onClick={updatePendingMode}
                        className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition ${includePending
                            ? 'border-amber-400 bg-white text-amber-800 hover:bg-amber-100'
                            : 'border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-100'
                            }`}
                    >
                        <span
                            aria-hidden="true"
                            className={`relative inline-block h-5 w-9 rounded-full transition ${includePending ? 'bg-amber-500' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${includePending ? 'left-[18px]' : 'left-0.5'}`} />
                        </span>
                        包含待核验题
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-20 text-slate-500">
                        <Loader2 className="animate-spin" size={20} /> 正在汇总 {LEVEL_NAMES[level - 1]}级真题考点…
                    </div>
                ) : topics.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                        该级别的题目暂未标注考点标签，先去
                        <Link to="/question-bank" className="mx-1 font-bold text-emerald-600">整卷练习</Link>
                        吧。
                    </div>
                ) : (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="text-emerald-500" size={20} />
                                {LEVEL_NAMES[level - 1]}级考点（{topics.length} 个）
                            </h2>
                            <span className="text-xs text-slate-500">
                                点击考点进入练习 · 数字为当前模式的可练题数
                            </span>
                        </div>
                        <div className="space-y-5">
                            {topicGroups.map(([group, items]) => (
                                <section key={group} aria-labelledby={`topic-group-${group}`}>
                                    <h3
                                        id={`topic-group-${group}`}
                                        className="mb-2 text-xs font-bold text-slate-500"
                                    >
                                        {group}
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {items.map(({ tag, count }) => (
                                            <button
                                                key={tag}
                                                onClick={() => openTopic(tag)}
                                                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                {tag}
                                                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-slate-600 ring-1 ring-slate-200 group-hover:text-emerald-700 group-hover:ring-emerald-200">
                                                    {count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
