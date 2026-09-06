import React, { useState, useEffect } from 'react';
import { Bug, Play, RotateCcw, Activity } from 'lucide-react';
import { useShouldRunDecorativeMotion } from '../hooks/useShouldRunDecorativeMotion';
// 学习数据的导出/导入/重置是设置项，不是首页内容，已移到错题本页面
// （/question-bank/review）——那里正是学生查看自己学习记录的地方。

export default function TheLab() {
    const shouldAnimate = useShouldRunDecorativeMotion();
    const [activeLine, setActiveLine] = useState(1);
    const [variables, setVariables] = useState({ x: 0, y: 0, sum: 0 });

    useEffect(() => {
        if (!shouldAnimate) {
            setActiveLine(1);
            return undefined;
        }

        const interval = setInterval(() => {
            setActiveLine(prev => {
                if (prev >= 6) return 1;
                return prev + 1;
            });
        }, 800);
        return () => clearInterval(interval);
    }, [shouldAnimate]);

    useEffect(() => {
        if (activeLine === 1) setVariables({ x: 0, y: 0, sum: 0 });
        if (activeLine === 2) setVariables(v => ({ ...v, x: 10 }));
        if (activeLine === 3) setVariables(v => ({ ...v, y: 20 }));
        if (activeLine === 4) setVariables(v => ({ ...v, sum: 30 }));
    }, [activeLine]);

    const code = [
        { line: 1, text: 'def calculate_sum():' },
        { line: 2, text: '    x = 10' },
        { line: 3, text: '    y = 20' },
        { line: 4, text: '    sum = x + y' },
        { line: 5, text: '    print(sum)' },
        { line: 6, text: '    return sum' },
    ];

    return (
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                {/* Visualizer Area */}
                <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 font-mono font-sm">
                    {/* Window Header */}
                    <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-slate-500 text-xs">debug_session.py</div>
                        <div className="ml-auto flex gap-2">
                            <Play size={16} className="text-emerald-500" />
                            <Bug size={16} className="text-brand-orange animate-pulse" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 h-64">
                        {/* Code Editor */}
                        <div className="space-y-2 text-slate-400">
                            {code.map((l) => (
                                <div
                                    key={l.line}
                                    className={`
                                        px-2 py-1 rounded transition-colors
                                        ${activeLine === l.line ? 'bg-slate-800 text-white border-l-2 border-brand-orange' : ''}
                                    `}
                                >
                                    <span className="text-slate-600 mr-4 w-4 inline-block text-right">{l.line}</span>
                                    <span className={activeLine === l.line ? 'text-blue-300' : ''}>{l.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Variables View */}
                        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Variables</h4>
                            <div className="space-y-3 font-mono">
                                {Object.entries(variables).map(([key, val]) => (
                                    <div key={key} className="flex justify-between items-center text-sm">
                                        <span className="text-purple-400">{key}</span>
                                        <span className={`transition-all duration-300 ${activeLine > 1 ? 'text-yellow-400 font-bold' : 'text-slate-500'}`}>
                                            {val}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-4 border-t border-slate-800">
                                <div className="text-xs text-slate-500 mb-2">Memory View</div>
                                <div className="flex gap-1">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className={`h-1 flex-1 rounded-full ${i < activeLine ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange font-bold text-xs mb-6 border border-brand-orange/20">
                        <Activity size={14} />
                        所见即所得
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                        在这里，Code 不再是冷冰冰的字符。
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        我们的 <b>可视化调试系统</b> 让你看清每一行代码的“蝴蝶效应”。变量如何变化？内存如何分配？Bug 藏在哪里？一切尽收眼底。
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-white font-bold text-xl mb-2">0 门槛调试</h4>
                            <p className="text-slate-500 text-sm">无需配置环境，浏览器一键启动 Debug 模式。</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-xl mb-2">逐行追踪</h4>
                            <p className="text-slate-500 text-sm">像看电影一样回放代码执行过程，彻底理解逻辑。</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}
