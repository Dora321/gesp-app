import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Code2, FileQuestion, Route } from 'lucide-react';
import { paperStats } from '../data/gesp/_stats';

const CodePulse = () => {
    const [activeLine, setActiveLine] = useState(0);
    const lines = [
        'int score = solve(problem);',
        'if (score >= target) pass();',
        'for (auto step : path) practice(step);',
        'cout << "GESP ready";'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveLine((line) => (line + 1) % lines.length);
        }, 900);
        return () => clearInterval(timer);
    }, [lines.length]);

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

    return (
        <section className="relative min-h-[86vh] overflow-hidden bg-slate-50 pt-24">
            <CodePulse />
            <div className="relative z-10 mx-auto flex min-h-[calc(86vh-6rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur">
                        <Route size={16} />
                        少儿编程学习路径 · GESP 真题训练 · 项目实践
                    </div>

                    <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                        从第一行代码到
                        <span className="block text-blue-600">一套清晰训练路径</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                        魔丸聚集地把 C++ GESP 备考、Python 入门和项目课收束成可执行的学习路线。学生知道下一步练什么，老师知道每节课要达成什么。
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => navigate('/question-bank')}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            <FileQuestion size={20} />
                            进入 GESP 题库
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => document.getElementById('learning-paths')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                        >
                            <BookOpen size={20} />
                            选择学习路径
                        </button>
                    </div>

                    <div className="mt-10 grid max-w-2xl gap-3 text-sm font-semibold text-slate-600 sm:grid-cols-3">
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
                <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm font-bold text-slate-500 sm:grid-cols-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2"><Code2 size={16} className="text-blue-500" /> C++ GESP Level 1-8</div>
                    <div className="flex items-center gap-2"><BookOpen size={16} className="text-emerald-500" /> Python 基础与项目课</div>
                    <div className="flex items-center gap-2"><FileQuestion size={16} className="text-orange-500" /> {paperStats.paperCount} 套真题与解析</div>
                </div>
            </div>
        </section>
    );
}
