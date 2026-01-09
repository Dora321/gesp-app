import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, Award, BookOpen, ChevronRight, Home, Grid, Sparkles, Map, Lock, Zap, Trophy } from 'lucide-react';

export default function Navigation() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        {
            title: 'GESP C++ 考级认证',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
            icon: <Award className="w-6 h-6" />,
            items: [
                { title: '一级：零基础入门', path: '/level1', icon: <StarIcon color="text-emerald-400" /> },
                { title: '二级：基础语法', path: '/level2', icon: <StarIcon color="text-teal-400" /> },
                { title: '三级：算法进阶', path: '/level3', icon: <StarIcon color="text-cyan-400" /> },
                { title: '四级：核心结构', path: '/level4', icon: <StarIcon color="text-blue-400" /> },
                { title: '五级：提高算法', path: '/level5', icon: <StarIcon color="text-indigo-400" /> },
                { title: '六级：挑战难题', path: '/level6', icon: <StarIcon color="text-purple-400" /> },
                { title: '七级：专家图论', path: '/level7', icon: <StarIcon color="text-fuchsia-400" /> },
                { title: '八级：大师综合', path: '/level8', icon: <StarIcon color="text-rose-400" /> },
            ]
        },
        {
            title: '真题题库中心',
            color: 'text-rose-400',
            bg: 'bg-rose-500/10 border-rose-500/20',
            icon: <Trophy className="w-6 h-6" />,
            items: [
                { title: 'GESP 历年真题库', path: '/question-bank', icon: <BookOpen className="text-rose-400" /> },
            ]
        },
        {
            title: 'Python 全栈体系',
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10 border-yellow-500/20',
            icon: <Terminal className="w-6 h-6" />,
            items: [
                { title: 'F1: 语法启蒙', path: '/python/f1' },
                { title: 'F2: 流程控制', path: '/python/f2' },
                { title: 'F3: 数据结构', path: '/python/f3' },
                { title: 'F4: 函数模块', path: '/python/f4' },
                { title: 'F5: 绘图魔法', path: '/python/f5' },
                { title: 'A1: 算法思维', path: '/python/a1' },
                { title: 'A2: 游戏工坊', path: '/python/a2' },
                { title: 'A3: AI 初探', path: '/python/ai' },
                { title: 'A4: 网络爬虫', path: '/python/crawler' },
                { title: 'A5: 二分查找', path: '/python/binary-search' },
                { title: 'A6: 加密大师', path: '/python/encryption' },
                { title: 'A7: 排序大师', path: '/python/sorting' },
                { title: 'A8: 摩斯密码', path: '/python/morse' },
            ]
        },
        {
            title: 'C++ 知识点闯关',
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10 border-emerald-500/20',
            icon: <Map className="w-6 h-6" />,
            items: Array.from({ length: 16 }, (_, i) => ({
                title: `第 ${i + 1} 课`,
                path: `/lesson${i + 1}`
            }))
        },
        {
            title: '特色展馆',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
            icon: <Zap className="w-6 h-6" />,
            items: [
                { title: '计算奇闻馆', path: '/museum', icon: <Sparkles className="text-yellow-400" /> }
            ]
        }
    ];

    // Filter logic
    const filteredSections = sections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(section => section.items.length > 0);

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-20 selection:bg-indigo-500 selection:text-white">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
                <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <Home size={20} />
                    </button>
                    <h1 className="font-bold text-xl text-slate-100 flex items-center gap-2">
                        <Grid className="text-indigo-400" />
                        导航控制台
                    </h1>

                    {/* Search Bar */}
                    <div className="ml-auto w-full max-w-md relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="搜索课程、知识点..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
                <div className="grid gap-8">
                    {filteredSections.map((section, idx) => (
                        <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg ${section.bg}`}>
                                    {React.cloneElement(section.icon, { className: section.color })}
                                </div>
                                <h2 className="text-xl font-bold text-slate-200">{section.title}</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {section.items.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        onClick={() => navigate(item.path)}
                                        className="group relative bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-slate-800 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {item.icon || <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors" />}
                                                <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.title}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {filteredSections.length === 0 && (
                        <div className="text-center py-20 text-slate-500">
                            <Search size={48} className="mx-auto mb-4 opacity-20" />
                            <p>没有找到相关课程，换个关键词试试？</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

// Helper Icon for Stars
function StarIcon({ color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${color}`}>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
    )
}
