import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, Trophy, Clock, ChevronRight, Search, Award } from 'lucide-react';
import { paperIds, paperMeta } from '../data/gesp';
import { paperStats } from '../data/gesp/_stats';

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

const QuestionBankHome = () => {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

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
                    difficulty: Math.max(1, Math.min(5, Math.floor(meta.level / 2) + (meta.month > 6 ? 1 : 0))),
                    isPlaceholder,
                    needsReview,
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.year - a.year || b.month - a.month || a.level - b.level);
    }, []);

    const filteredPapers = papers.filter(p =>
        p.level === selectedLevel &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const levelStats = useMemo(() => {
        return levels.reduce((acc, level) => {
            const levelPapers = papers.filter(paper => paper.level === level.id);
            const latestPaper = levelPapers[0];
            acc[level.id] = {
                paperCount: levelPapers.length,
                questionCount: levelPapers.reduce((sum, paper) => sum + paper.questions, 0),
                reviewCount: levelPapers.filter(paper => paper.needsReview).length,
                latestLabel: latestPaper ? `${latestPaper.year}.${String(latestPaper.month).padStart(2, '0')}` : '暂无',
            };
            return acc;
        }, {});
    }, [papers]);

    const selectedLevelInfo = levels.find(l => l.id === selectedLevel);
    const selectedStats = levelStats[selectedLevel] || { paperCount: 0, questionCount: 0, reviewCount: 0, latestLabel: '暂无' };

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
                                收录 2023-2026 年 GESP C++ 真题与练习卷，支持整卷练习与解析复盘，待精修卷已明确标注。
                            </p>
                        </div>
                        {/* Stats */}
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.levelCount}</div>
                                <div className="text-xs text-indigo-200">覆盖等级</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.paperCount}</div>
                                <div className="text-xs text-indigo-200">收录试卷</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.questionCount}</div>
                                <div className="text-xs text-indigo-200">题目总数</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{paperStats.reviewPaperCount}</div>
                                <div className="text-xs text-indigo-200">待精修卷</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-8 -mt-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Level Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
                        <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 flex items-center gap-2">
                            <Award size={18} /> 选择等级
                        </div>
                        <div className="p-2 space-y-1">
                            {levels.map(level => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(level.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all ${selectedLevel === level.id
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
                                            <span className="block text-xs font-medium text-slate-400">
                                                {levelStats[level.id]?.paperCount || 0} 卷 · {levelStats[level.id]?.questionCount || 0} 题
                                            </span>
                                            {(levelStats[level.id]?.reviewCount || 0) > 0 && (
                                                <span className="block text-xs font-semibold text-amber-600">
                                                    {levelStats[level.id].reviewCount} 卷待精修
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                    <ChevronRight size={16} className={`transition-transform ${selectedLevel === level.id ? 'opacity-100' : 'opacity-0'}`} />
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
                                    {selectedStats.reviewCount > 0 && ` · ${selectedStats.reviewCount} 卷待精修`}
                                </p>
                            </div>

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

                        {/* Paper Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredPapers.map(paper => (
                                <div
                                    key={paper.id}
                                    className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group cursor-pointer"
                                    onClick={() => navigate(`/question-bank/${paper.level}/${paper.id}`)}
                                >
                                    <div className="flex items-start justify-between mb-4 gap-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs font-bold font-mono w-fit">
                                                {paper.year} 年 {paper.month} 月
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
                                        </div>
                                        <div className="flex gap-0.5 shrink-0">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < paper.difficulty ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {paper.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {paper.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={14} /> {paper.questions} 题
                                        </span>
                                    </div>

                                    <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-lg font-medium text-sm group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                                        立即练习 <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {filteredPapers.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                                    <Search size={32} className="text-slate-300" />
                                </div>
                                <p className="text-slate-500">该等级暂无相关真题，请稍后再试。</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuestionBankHome;
