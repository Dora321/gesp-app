import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Clock, ChevronRight, Search, Award, Tag, BadgeCheck, CircleDashed, FileCheck2 } from 'lucide-react';
import { paperIds, paperMeta } from '../data/gesp';
import { paperStats } from '../data/gesp/_stats';
import { DIMENSION_STATUS, VERIFICATION_DIMENSIONS, resolveVerification } from '../data/gesp/verificationModel';

const levels = [
    { id: 1, name: '一级', desc: '零基础入门', badgeClass: 'bg-blue-500' },
    { id: 2, name: '二级', desc: '基础语法', badgeClass: 'bg-cyan-500' },
    { id: 3, name: '三级', desc: '算法进阶', badgeClass: 'bg-teal-500' },
    { id: 4, name: '四级', desc: '核心结构', badgeClass: 'bg-green-500' },
    { id: 5, name: '五级', desc: '提高算法', badgeClass: 'bg-yellow-500' },
    { id: 6, name: '六级', desc: '挑战难题', badgeClass: 'bg-orange-500' },
    { id: 7, name: '七级', desc: '专家图论', badgeClass: 'bg-red-500' },
    { id: 8, name: '八级', desc: '大师综合', badgeClass: 'bg-purple-500' },
];

const reviewStatusMeta = {
    verified: { label: '已对照原卷核验', className: 'bg-emerald-50 text-emerald-700', Icon: BadgeCheck, priority: 0 },
    partial: { label: '部分内容已核验', className: 'bg-blue-50 text-blue-700', Icon: FileCheck2, priority: 1 },
    unverified: { label: '尚未完成原卷校验', className: 'bg-slate-100 text-slate-600', Icon: CircleDashed, priority: 2 },
};

const QuestionBankHome = () => {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPractice, setShowPractice] = useState(false);

    // Papers are built directly from paperMeta (questionCount now pre-injected)
    const papers = useMemo(() => {
        return paperIds
            .map(id => {
                const meta = paperMeta[id];
                if (!meta) return null;

                const questionCount = meta.questionCount || 0;
                // High-level papers with very few questions are placeholders
                const isPlaceholder = meta.level >= 3 && questionCount <= 4;
                const needsReview = Boolean(meta.needsReview);
                const reviewStatus = meta.reviewStatus || 'unverified';
                const displayTitle = isPlaceholder
                    ? meta.title.replace('真题', '练习卷（待补全）')
                    : meta.title;

                return {
                    id,
                    title: displayTitle,
                    originalTitle: meta.title,
                    level: meta.level,
                    questions: questionCount,
                    time: '90分钟',
                    year: meta.year,
                    month: meta.month,
                    isPlaceholder,
                    needsReview,
                    reviewStatus,
                    reviewedBy: meta.reviewedBy,
                    reviewedAt: meta.reviewedAt,
                    reviewScope: meta.reviewScope,
                    sourceUrl: meta.sourceUrl,
                    unofficial: Boolean(meta.unofficial),
                    dimensions: resolveVerification(meta).dimensions,
                };
            })
            .filter(Boolean)
            .sort((a, b) => (
                reviewStatusMeta[a.reviewStatus].priority - reviewStatusMeta[b.reviewStatus].priority
                || b.year - a.year
                || b.month - a.month
                || a.level - b.level
            ));
    }, []);

    // Unofficial papers (historical placeholders) are practice material, not past
    // papers: they stay out of the default list and every 真题 counter, and are
    // only reachable through an explicit toggle.
    const officialPapers = useMemo(() => papers.filter(p => !p.unofficial), [papers]);
    const practicePapers = useMemo(() => papers.filter(p => p.unofficial), [papers]);

    const visiblePapers = showPractice ? practicePapers : officialPapers;
    const filteredPapers = visiblePapers.filter(p =>
        p.level === selectedLevel &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const practiceCountForLevel = practicePapers.filter(p => p.level === selectedLevel).length;

    const levelStats = useMemo(() => {
        return levels.reduce((acc, level) => {
            const levelPapers = officialPapers.filter(paper => paper.level === level.id);
            const latestPaper = [...levelPapers].sort((a, b) => b.year - a.year || b.month - a.month)[0];
            acc[level.id] = {
                paperCount: levelPapers.length,
                questionCount: levelPapers.reduce((sum, paper) => sum + paper.questions, 0),
                verifiedCount: levelPapers.filter(paper => paper.reviewStatus === 'verified').length,
                partialCount: levelPapers.filter(paper => paper.reviewStatus === 'partial').length,
                unverifiedCount: levelPapers.filter(paper => paper.reviewStatus === 'unverified').length,
                latestLabel: latestPaper ? `${latestPaper.year}.${String(latestPaper.month).padStart(2, '0')}` : '暂无',
            };
            return acc;
        }, {});
    }, [officialPapers]);

    const selectedLevelInfo = levels.find(l => l.id === selectedLevel);
    const selectedStats = levelStats[selectedLevel] || { paperCount: 0, questionCount: 0, verifiedCount: 0, partialCount: 0, unverifiedCount: 0, latestLabel: '暂无' };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 md:p-12 shadow-lg">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-2">
                                <Trophy className="text-yellow-400 fill-current" size={40} />
                                GESP 真题题库
                            </h1>
                            <p className="text-indigo-100 max-w-2xl text-lg">
                                收录 {paperStats.firstYear}-{paperStats.latestYear} 年、{paperStats.levelCount} 个等级共 {paperStats.questionCount} 题。每套试卷均标明核验状态与范围。
                            </p>
                        </div>
                        {/* Stats */}
                        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 md:w-auto">
                            <div className="min-w-0 rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm sm:min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.paperCount}</div>
                                <div className="text-xs text-indigo-200">收录试卷</div>
                            </div>
                            <div className="min-w-0 rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm sm:min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.verifiedPaperCount}</div>
                                <div className="text-xs text-indigo-200">完整核验</div>
                            </div>
                            <div className="min-w-0 rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm sm:min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.partialPaperCount}</div>
                                <div className="text-xs text-indigo-200">部分核验</div>
                            </div>
                            <div className="min-w-0 rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm sm:min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.unverifiedPaperCount}</div>
                                <div className="text-xs text-indigo-200">尚未核验</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8 -mt-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Level Sidebar */}
                    <div className="h-fit w-full flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:w-64">
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 p-3 font-bold text-slate-700 md:p-4">
                            <Award size={18} /> 选择等级
                        </div>
                        <div className="flex gap-2 overflow-x-auto p-2 md:block md:space-y-1">
                            {levels.map(level => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(level.id)}
                                    aria-pressed={selectedLevel === level.id}
                                    className={`flex min-w-[160px] items-center justify-between rounded-lg px-3 py-3 text-left transition-all md:w-full md:min-w-0 md:px-4 ${selectedLevel === level.id
                                        ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${level.badgeClass} font-bold`}>
                                            {level.id}
                                        </span>
                                        <span>
                                            <span className="block">{level.name}</span>
                                            <span className="block text-xs font-medium text-slate-600">
                                                {levelStats[level.id]?.paperCount || 0} 卷 · {levelStats[level.id]?.questionCount || 0} 题
                                            </span>
                                            {((levelStats[level.id]?.partialCount || 0) + (levelStats[level.id]?.unverifiedCount || 0)) > 0 && (
                                                <span className="block text-xs font-semibold text-amber-800">
                                                    {(levelStats[level.id]?.partialCount || 0) + (levelStats[level.id]?.unverifiedCount || 0)} 卷待完成核验
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                    <ChevronRight size={16} className={`hidden transition-transform md:block ${selectedLevel === level.id ? 'opacity-100' : 'opacity-0'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">

                        {/* Filters & Search */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <BookOpen className="text-blue-500" />
                                    {selectedLevelInfo?.name}真题列表
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    {selectedLevelInfo?.desc} · {selectedStats.paperCount} 卷 · {selectedStats.questionCount} 题 · 最新 {selectedStats.latestLabel}
                                    {` · ${selectedStats.verifiedCount} 卷已核验`}
                                    {selectedStats.partialCount > 0 && ` · ${selectedStats.partialCount} 卷部分核验`}
                                    {selectedStats.unverifiedCount > 0 && ` · ${selectedStats.unverifiedCount} 卷未核验`}
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                                <button
                                    onClick={() => navigate(`/question-bank/topics/${selectedLevel}`)}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                                >
                                    <Tag size={15} /> 按考点练习
                                </button>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="搜索年份或试卷..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {(practiceCountForLevel > 0 || showPractice) && (
                            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                                <span className="text-sm text-slate-600">
                                    {showPractice
                                        ? '当前显示：模拟练习卷（非官方正式真题，不计入真题统计）'
                                        : `本等级另有 ${practiceCountForLevel} 套模拟练习卷（非官方正式真题）`}
                                </span>
                                <button
                                    onClick={() => setShowPractice(prev => !prev)}
                                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    {showPractice ? '返回真题列表' : '查看模拟练习'}
                                </button>
                            </div>
                        )}

                        {/* Paper Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredPapers.map(paper => {
                                const status = reviewStatusMeta[paper.reviewStatus];
                                const StatusIcon = status.Icon;
                                return (
                                <article
                                    key={paper.id}
                                    className="group rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between mb-4 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs font-bold font-mono w-fit">
                                                {paper.year} 年 {paper.month} 月
                                            </div>
                                            <div className={`inline-flex w-fit items-center gap-1.5 rounded px-2 py-1 text-[11px] font-semibold ${status.className}`}>
                                                <StatusIcon size={13} aria-hidden="true" />
                                                {status.label}
                                            </div>
                                            {paper.isPlaceholder && (
                                                <div className="px-2 py-1 rounded text-[11px] font-medium w-fit bg-amber-50 text-amber-700">
                                                    当前仅 {paper.questions} 题
                                                </div>
                                            )}
                                            {!paper.isPlaceholder && paper.needsReview && (
                                                <div className="px-2 py-1 rounded text-[11px] font-medium w-fit bg-amber-50 text-amber-700">
                                                    解析待精修
                                                </div>
                                            )}
                                            {paper.unofficial && (
                                                <div className="px-2 py-1 rounded text-[11px] font-medium w-fit bg-slate-100 text-slate-600">
                                                    历史占位 · 非正式真题
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {paper.title}
                                    </h3>

                                    {(paper.reviewedAt || paper.reviewScope) && (
                                        <p className="mb-3 text-xs leading-5 text-slate-500">
                                            {paper.reviewScope || '已校订内容'}
                                            {paper.reviewedAt && ` · ${paper.reviewedAt}`}
                                        </p>
                                    )}

                                    <div className="mb-3 flex flex-wrap gap-1.5">
                                        {VERIFICATION_DIMENSIONS.map(({ key, label }) => {
                                            const state = paper.dimensions[key];
                                            const tone = state === 'verified'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : state === 'partial'
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                    : 'bg-slate-50 text-slate-500 border-slate-200';
                                            return (
                                                <span
                                                    key={key}
                                                    className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${tone}`}
                                                    title={`${label}：${DIMENSION_STATUS[state].label}`}
                                                >
                                                    {label}
                                                    {state === 'verified' ? ' ✓' : state === 'partial' ? ' ~' : ' —'}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {paper.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={14} /> {paper.questions} 题
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => navigate(`/question-bank/${paper.level}/${paper.id}`)}
                                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-50 py-2 text-sm font-medium text-slate-600 transition-all group-hover:bg-blue-600 group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        立即练习 <ChevronRight size={14} />
                                    </button>
                                </article>
                                );
                            })}
                        </div>

                        {filteredPapers.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                    <Search size={32} className="text-slate-300" />
                                </div>
                                <p className="text-slate-500">
                                    {showPractice ? '该等级暂无模拟练习卷。' : '该等级暂无相关真题，请稍后再试。'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuestionBankHome;
