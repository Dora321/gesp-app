import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, Trophy, Clock, ChevronRight, Filter, Search, Award } from 'lucide-react';

const QuestionBankHome = () => {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Sample Data for Structure
    const levels = [
        { id: 1, name: '一级', desc: '零基础入门', color: 'blue' },
        { id: 2, name: '二级', desc: '基础语法', color: 'cyan' },
        { id: 3, name: '三级', desc: '算法进阶', color: 'teal' },
        { id: 4, name: '四级', desc: '核心结构', color: 'green' },
        { id: 5, name: '五级', desc: '提高算法', color: 'yellow' },
        { id: 6, name: '六级', desc: '挑战难题', color: 'orange' },
        { id: 7, name: '七级', desc: '专家图论', color: 'red' },
        { id: 8, name: '八级', desc: '大师综合', color: 'purple' },
    ];

    // List of sessions to generate (ordered from newest to oldest)
    const sessionConfig = [
        { year: 2025, months: [12, 9, 6, 3] },
        { year: 2024, months: [12, 9, 6, 3] },
        { year: 2023, months: [12, 9, 6, 3] },
    ];

    const generatePapers = () => {
        const result = [];
        // Loop through each level (1-8)
        levels.forEach(levelInfo => {
            let sessionCounter = 12; // Nominal session count for this level

            sessionConfig.forEach(yearGroup => {
                yearGroup.months.forEach(month => {
                    const yearStr = yearGroup.year;
                    const monthStr = month < 10 ? `0${month}` : `${month}`;
                    const levelId = levelInfo.id;

                    // Historical Level Availability Check
                    let isAvailable = true;
                    if (yearStr === 2023) {
                        if (month === 3 && levelId > 1) isAvailable = false;
                        if (month === 6 && levelId > 2) isAvailable = false;
                        if (month === 9 && levelId > 6) isAvailable = false;
                    }

                    if (!isAvailable) {
                        sessionCounter--;
                        return;
                    }

                    const levelSuffix = levelId === 1 ? '' : `-l${levelId}`;
                    const id = `${yearStr}-${monthStr}${levelSuffix}`;

                    // Difficulty roughly based on level
                    const difficulty = Math.max(1, Math.min(5, Math.floor(levelId / 2) + (month > 6 ? 1 : 0)));

                    // Special notes
                    let note = '';
                    if (yearStr === 2025 && month === 12) note = '刚结束不久';
                    if (yearStr === 2024 && month === 3) note = '2024年首场';
                    if (yearStr === 2023 && month === 12) note = '年度收官';
                    if (yearStr === 2023 && month === 9) note = (levelId === 6 ? '首开 5-6 级' : '体系渐稳');
                    if (yearStr === 2023 && month === 6) note = (levelId === 2 ? '新增 2 级' : '');
                    if (yearStr === 2023 && month === 3) note = '首次认证';

                    result.push({
                        id,
                        title: `${yearStr}年${month}月 GESP C++ ${levelInfo.name}真题`,
                        level: levelId,
                        questions: 27,
                        time: '90分钟',
                        year: yearGroup.year,
                        month: month,
                        difficulty: difficulty,
                        session: sessionCounter,
                        note: note
                    });

                    sessionCounter--;
                });
            });
        });
        return result;
    };

    const papers = generatePapers();

    const filteredPapers = papers.filter(p =>
        p.level === selectedLevel &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                收录 2023-2025 年全套 C++ 等级考试真题，在线模拟，智能判卷。
                            </p>
                        </div>
                        {/* Stats */}
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">8</div>
                                <div className="text-xs text-indigo-200">覆盖等级</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{papers.length}+</div>
                                <div className="text-xs text-indigo-200">真题试卷</div>
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
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white bg-${level.color}-500 font-bold`}>
                                            {level.id}
                                        </span>
                                        {level.name}
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
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="text-blue-500" />
                                {levels.find(l => l.id === selectedLevel)?.name}真题列表
                            </h2>

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
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-xs font-bold font-mono">
                                            {paper.year} 年 {paper.month} 月
                                        </div>
                                        {/* Difficulty Stars */}
                                        <div className="flex gap-0.5">
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
