import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Code2, FileQuestion, Route } from 'lucide-react';
import { paperStats } from '../data/gesp/_stats';
import { usePrefersReducedMotion, useShouldRunDecorativeMotion } from '../hooks/useShouldRunDecorativeMotion';

const CodePulse = () => {
    const [activeLine, setActiveLine] = useState(0);
    const shouldAnimate = useShouldRunDecorativeMotion();
    const lines = [
        'int score = solve(problem);',
        'if (score >= target) pass();',
        'for (auto step : path) practice(step);',
        'cout << "GESP ready";'
    ];

    useEffect(() => {
        if (!shouldAnimate) {
            setActiveLine(0);
            return undefined;
        }

        const timer = setInterval(() => {
            setActiveLine((line) => (line + 1) % lines.length);
        }, 900);
        return () => clearInterval(timer);
    }, [lines.length, shouldAnimate]);

    return (
        <div className="absolute inset-0 overflow-hidden opacity-80" aria-hidden="true">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute right-[-6rem] top-24 hidden w-[42rem] rotate-[-8deg] rounded-xl border border-slate-200 bg-white/65 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-sm lg:block">
                <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 font-mono text-xs font-bold text-slate-400">learning_path.cpp</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                    {lines.map((line, index) => (
                        <div
                            key={line}
                            className={`rounded-lg px-4 py-3 transition-all duration-300 ${activeLine === index
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                : 'bg-slate-100/80 text-slate-500'
                                }`}
                        >
                            <span className="mr-4 opacity-50">{String(index + 1).padStart(2, '0')}</span>
                            {line}
                        </div>
                    ))}
                </div>
                <div className="mt-6 grid grid-cols-12 items-end gap-1.5">
                    {[42, 76, 55, 88, 63, 92, 48, 70, 84, 58, 96, 68].map((height, index) => (
                        <div
                            key={`${height}-${index}`}
                            className={`rounded-t-md transition-all duration-500 ${index === activeLine * 3 ? 'bg-orange-500' : 'bg-blue-500/70'}`}
                            style={{ height: `${height}px` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function HeroSection() {
    const navigate = useNavigate();
    const prefersReducedMotion = usePrefersReducedMotion();

    const scrollToLearningPaths = () => {
        document.getElementById('learning-paths')?.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    };

    return (
        <section className="relative overflow-hidden bg-slate-50 pt-20 sm:pt-24 md:min-h-[86vh]">
            <CodePulse />
            <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-12 md:min-h-[calc(86vh-6rem)] lg:px-8 lg:py-16">
                <div className="max-w-3xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-bold text-blue-700 shadow-sm backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
                        <Route size={16} />
                        <span className="sm:hidden">课程 · 真题 · 项目</span>
                        <span className="hidden sm:inline">少儿编程学习路径 · GESP 真题训练 · 项目实践</span>
                    </div>

                    <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                        从第一行代码到
                        <span className="block text-blue-600">一套清晰训练路径</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
                        按目标选择 C++ GESP、Python 或项目课。每节课都给出下一步，练习后再判断是否掌握。
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-9 sm:flex sm:flex-row">
                        <button
                            onClick={() => navigate('/question-bank')}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
                        >
                            <FileQuestion size={19} />
                            <span className="sm:hidden">练真题</span>
                            <span className="hidden sm:inline">进入 GESP 题库</span>
                            <ArrowRight size={18} className="hidden sm:block" />
                        </button>
                        <button
                            onClick={scrollToLearningPaths}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
                        >
                            <BookOpen size={19} />
                            <span className="sm:hidden">选路径</span>
                            <span className="hidden sm:inline">选择学习路径</span>
                        </button>
                    </div>

                    <div className="mt-10 hidden max-w-2xl gap-3 text-sm font-semibold text-slate-600 sm:grid sm:grid-cols-3">
                        {['课程按阶段组织', '真题可练可复盘', '项目课承接兴趣'].map((item) => (
                            <div key={item} className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t border-slate-200 bg-white/75 backdrop-blur">
                <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-3 text-xs font-bold text-slate-500 sm:gap-4 sm:px-6 sm:py-5 sm:text-sm lg:px-8">
                    <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2"><Code2 size={16} className="text-blue-500" /> <span className="sm:hidden">C++ L1-8</span><span className="hidden sm:inline">C++ GESP Level 1-8</span></div>
                    <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2"><BookOpen size={16} className="text-emerald-500" /> <span className="sm:hidden">Python 课程</span><span className="hidden sm:inline">Python 基础与项目课</span></div>
                    <div className="flex items-center justify-center gap-1.5 sm:justify-start sm:gap-2"><FileQuestion size={16} className="text-orange-500" /> <span className="sm:hidden">{paperStats.paperCount} 套真题</span><span className="hidden sm:inline">{paperStats.paperCount} 套真题与解析</span></div>
                </div>
            </div>
        </section>
    );
}
