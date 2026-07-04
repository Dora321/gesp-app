import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Tags, Loader2, BookOpen } from 'lucide-react';
import { loadLevelTopics, buildTopicPaper } from '../../data/gesp/topics';
import InteractiveAnalysisPage from './InteractiveAnalysisPage';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8];
const LEVEL_NAMES = '一二三四五六七八';

export default function TopicPracticePage() {
    const navigate = useNavigate();
    const { level: levelParam } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const level = Math.min(8, Math.max(1, Number(levelParam) || 1));
    const activeTag = searchParams.get('tag') || '';

    // data.level 与当前 level 不一致即视为加载中，避免在 effect 里同步 setState
    const [data, setData] = useState(null);

    useEffect(() => {
        let cancelled = false;
        loadLevelTopics(level).then((result) => {
            if (!cancelled) setData({ level, ...result });
        });
        return () => { cancelled = true; };
    }, [level]);

    const loading = data?.level !== level;
    const topics = loading ? [] : data.topics;
    const tagMap = loading ? null : data.tagMap;

    const topicPaper = useMemo(() => {
        if (!activeTag || !tagMap?.has(activeTag)) return null;
        return buildTopicPaper(level, activeTag, tagMap.get(activeTag));
    }, [activeTag, tagMap, level]);

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
                        选一个知识点，把 GESP {LEVEL_NAMES[level - 1]}级历年真题里的相关题目一次练完。
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 mt-6 space-y-6">
                {/* 级别切换 */}
                <div className="flex flex-wrap gap-2">
                    {LEVELS.map((lv) => (
                        <Link
                            key={lv}
                            to={`/question-bank/topics/${lv}`}
                            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${lv === level
                                ? 'bg-emerald-600 text-white shadow'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}
                        >
                            {LEVEL_NAMES[lv - 1]}级
                        </Link>
                    ))}
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
                            <span className="text-xs text-slate-400">点击考点进入练习 · 数字为真题数量</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {topics.map(({ tag, count }) => (
                                <button
                                    key={tag}
                                    onClick={() => setSearchParams({ tag })}
                                    className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
                                >
                                    {tag}
                                    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-slate-400 ring-1 ring-slate-200 group-hover:text-emerald-600 group-hover:ring-emerald-200">
                                        {count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
