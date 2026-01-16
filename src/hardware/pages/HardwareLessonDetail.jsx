import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Lightbulb, Cpu, Zap, AlertTriangle, Quote, Code,
    MousePointer2, Play, RotateCcw, ArrowRight, BookOpen
} from 'lucide-react';
import { hardwareLessons } from '../data/lessons';

export default function HardwareLessonDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const lessonId = parseInt(id);
    const lesson = hardwareLessons.find(l => l.id === lessonId);

    // Scroll to top when lesson changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [lessonId]);

    if (!lesson) {
        return (
            <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">未找到课程</h2>
                    <button onClick={() => navigate('/hardware')} className="text-emerald-400 hover:underline">
                        返回课程列表
                    </button>
                </div>
            </div>
        );
    }

    const IconComponent = lesson.icon;
    const isRealtime = lesson.mode === 'realtime';

    // Simulation placeholder (For Lesson 1, we could conditionally render the specific sim)
    // For now, ensuring the layout matches the high-quality repo design.

    return (
        <div className="min-h-screen bg-[#0B0C15] text-white font-sans selection:bg-emerald-500/30 pb-20">
            {/* Header / Nav */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 bg-[#0B0C15]/80 backdrop-blur-md sticky top-0 z-50 justify-between">
                <button
                    onClick={() => navigate('/hardware')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                >
                    <ChevronLeft size={16} />
                    <span>返回列表</span>
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs font-mono">LESSON {lesson.id.toString().padStart(2, '0')}</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-20 h-20 rounded-2xl bg-[#1A1D2D] border border-slate-700 flex items-center justify-center flex-shrink-0 shadow-xl">
                        {IconComponent && <IconComponent size={40} className="text-emerald-400" />}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold border tracking-wide uppercase ${isRealtime
                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                }`}>
                                {lesson.mode === 'realtime' ? 'Realtime Mode' : 'Upload Mode'}
                            </span>
                            <span className="text-slate-500 text-xs">·</span>
                            <span className="text-slate-400 text-xs font-medium">{lesson.hardware}</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                            {lesson.title.includes('：') ? lesson.title.split('：')[1] : lesson.title}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            {lesson.objectives}
                        </p>
                    </div>
                </div>

                {/* Scenario / Story Card */}
                <div className="mb-10 bg-gradient-to-br from-[#13111C] to-[#0F1016] border border-indigo-500/20 rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="absolute -right-10 -top-10 text-indigo-500/5 rotate-12 group-hover:rotate-6 transition-transform duration-700">
                        <BookOpen size={200} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-indigo-400">
                            <BookOpen size={18} />
                            <span className="font-bold text-xs uppercase tracking-wider">情境引入</span>
                        </div>
                        <p className="text-slate-200 font-medium italic text-xl leading-loose font-serif">
                            “ {lesson.story} ”
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">

                    {/* Left Column: Specs */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Hardware Prep */}
                        <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-6 hover:bg-[#151824] transition-colors">
                            <h3 className="text-slate-200 font-bold mb-4 flex items-center gap-2 text-sm">
                                <Cpu size={16} /> 硬件准备
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {lesson.components.map((item, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-[#0B0C15] border border-slate-700 rounded-md text-xs text-slate-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Wiring Guide */}
                        <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-6 border-l-2 border-l-orange-500/50 hover:bg-[#151824] transition-colors">
                            <h3 className="text-orange-400 font-bold mb-4 flex items-center gap-2 text-sm">
                                <Zap size={16} /> 接线指南
                            </h3>
                            <div className="bg-black/30 rounded-lg p-3 font-mono text-sm text-orange-200/80 border border-orange-500/10">
                                {lesson.wiring}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Knowledge */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Mind+ Core Code Logic */}
                        {lesson.mindPlus && lesson.mindPlus.length > 0 && (
                            <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-8 hover:bg-[#151824] transition-colors relative overflow-hidden group/code">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-opacity opacity-50 group-hover/code:opacity-100"></div>
                                <h3 className="text-cyan-400 font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                                    <Code size={16} /> Mind+ 核心代码逻辑
                                </h3>

                                <div className="bg-[#08090F] rounded-xl p-6 border border-slate-800/50 font-mono text-sm relative z-10 shadow-inner">
                                    <div className="space-y-4">
                                        {lesson.mindPlus.map((block, i) => (
                                            <div key={i} className="flex items-center group/line">
                                                <span className="text-slate-700 select-none w-6 text-right mr-4 text-xs font-mono group-hover/line:text-slate-500 transition-colors">{i + 1}</span>
                                                <div className="flex-shrink-0" style={{ width: `${(block.indent || 0) * 24}px` }} />
                                                <div className={`
                                                    font-mono text-sm tracking-wide transition-colors
                                                    ${block.type === 'comment' ? 'text-slate-500' : 'text-emerald-400'}
                                                    hover:text-emerald-300
                                                `}>
                                                    {block.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Core Knowledge */}
                        <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-8 hover:bg-[#151824] transition-colors">
                            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                <Lightbulb size={16} /> 核心知识 & 逻辑
                            </h3>
                            <p className="text-slate-300 text-base leading-7">
                                {lesson.knowledge}
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Pitfalls */}
                            <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-6 border-t-2 border-t-yellow-500/50 hover:bg-[#151824] transition-colors">
                                <h3 className="text-yellow-400 font-bold mb-4 flex items-center gap-2 text-sm">
                                    <AlertTriangle size={16} /> 避坑指南
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                    {lesson.tips}
                                </p>
                            </div>

                            {/* Golden Sentences */}
                            <div className="bg-[#12141F] border border-slate-800 rounded-2xl p-6 border-t-2 border-t-emerald-500/50 hover:bg-[#151824] transition-colors">
                                <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-sm">
                                    <Quote size={16} /> 金句话术
                                </h3>
                                <ul className="space-y-3">
                                    {lesson.quotes.map((quote, i) => (
                                        <li key={i} className="text-slate-400 text-sm italic flex gap-2">
                                            <span className="text-emerald-500 font-serif">"</span>
                                            <span className="flex-1">{quote}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Nav */}
                <div className="flex justify-between items-center pt-10 border-t border-slate-800">
                    <button
                        onClick={() => navigate(lesson.id > 1 ? `/hardware/lesson/${lesson.id - 1}` : '#')}
                        disabled={lesson.id === 1}
                        className={`text-slate-400 flex items-center gap-2 transition-colors ${lesson.id === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-white'}`}
                    >
                        <ChevronLeft size={20} />
                        上一课
                    </button>

                    <button
                        onClick={() => navigate(lesson.id < 16 ? `/hardware/lesson/${lesson.id + 1}` : '#')}
                        disabled={lesson.id === 16}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${lesson.id === 16
                            ? 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                            }`}
                    >
                        {lesson.id === 16 ? '课程结束' : '下一课'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
