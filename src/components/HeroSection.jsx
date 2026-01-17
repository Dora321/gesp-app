import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Play, Code2, ChevronRight } from 'lucide-react';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sortingIdx, setSortingIdx] = useState([-1, -1]);

    const resetArray = () => {
        const arr = [];
        for (let i = 0; i < 15; i++) {
            arr.push(Math.floor(Math.random() * 80) + 10);
        }
        setArray(arr);
        setSortingIdx([-1, -1]);
    };

    useEffect(() => {
        resetArray();
    }, []);

    useEffect(() => {
        let isCancelled = false;

        const bubbleSort = async () => {
            let arr = [...array];
            if (arr.length === 0) return;

            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    if (isCancelled) return;
                    setSortingIdx([j, j + 1]);
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        setArray([...arr]);
                    }
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            // Wait and reset
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (!isCancelled) resetArray();
        };

        if (array.length > 0 && sortingIdx[0] === -1) {
            bubbleSort();
        }

        return () => { isCancelled = true; };
    }, [array.length === 0]); // Trigger when array is reset

    return (
        <div className="w-full h-full flex items-end justify-center gap-1.5 p-6 pb-4">
            {array.map((value, idx) => (
                <div
                    key={idx}
                    className={`
                        w-4 rounded-t-lg transition-all duration-200
                        ${sortingIdx.includes(idx) ? 'bg-orange-500 shadow-lg shadow-orange-500/50 scale-x-110' : 'bg-blue-600/80'}
                    `}
                    style={{
                        height: `${value}%`,
                        opacity: sortingIdx.includes(idx) ? 1 : 0.6 + (value / 200)
                    }}
                ></div>
            ))}
        </div>
    );
};

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50">

            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

                {/* Blobs */}
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[20%] -left-20 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <div className="space-y-8 text-center lg:text-left pt-20 lg:pt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-brand-blue font-bold text-sm border border-blue-200 animate-fade-in text-brand-blue">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Gesp 2025 考级冲刺班开启
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-brand-slate leading-tight">
                        这里的代码，<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">
                            是活的。
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        拒绝枯燥的语法背诵。在 <b>魔丸聚集地</b>，你可以看到每一个算法的运行轨迹，亲手重构经典游戏，用代码构建你的数字世界。
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <button
                            onClick={() => navigate('/level1')}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                        >
                            <Rocket className="group-hover:rotate-12 transition-transform" />
                            开始探索
                            <ChevronRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                        </button>

                        <button
                            onClick={() => document.getElementById('maps-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-brand-slate font-bold text-lg border border-slate-200 hover:border-brand-blue/30 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Play size={20} className="text-brand-orange" />
                            观看演示
                        </button>
                    </div>

                    <div className="pt-4 flex items-center gap-8 justify-center lg:justify-start text-sm font-medium text-slate-400">
                        <div className="flex items-center gap-2">
                            <Code2 size={16} className="text-blue-500" />
                            <span>可视化教学</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                            <span>C++ / Python 全覆盖</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span>GESP 官方考纲</span>
                        </div>
                    </div>
                </div>

                {/* Right Visual (Interactive Terminal / Visualizer) */}
                <div className="relative hidden lg:block animate-fade-in delay-200">
                    <div className="relative rounded-2xl bg-slate-900 shadow-2xl shadow-blue-900/20 overflow-hidden border border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        {/* Fake Browser Header */}
                        <div className="h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="ml-4 px-3 py-1 rounded bg-slate-900/50 text-xs text-slate-400 font-mono">
                                sort_visualizer.py
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 h-[400px] flex flex-col relative font-mono text-sm">
                            {/* Code Snippet */}
                            <div className="text-slate-400 mb-4 opacity-80">
                                <p><span className="text-purple-400">def</span> <span className="text-blue-400">bubble_sort</span>(arr):</p>
                                <p className="pl-4">n = <span className="text-yellow-400">len</span>(arr)</p>
                                <p className="pl-4"><span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-yellow-400">range</span>(n):</p>
                                <p className="pl-8"><span className="text-slate-500"># Visualizing step {`{i}`}...</span></p>
                            </div>

                            {/* The Visualizer Area */}
                            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800/50 relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
                                <div className="absolute top-2 right-2 text-xs text-slate-600 bg-slate-900 px-2 py-1 rounded">
                                    LIVE PREVIEW
                                </div>
                                <SortingVisualizer />
                            </div>
                        </div>
                    </div>

                    {/* Floating Cards / Badges */}
                    <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-short">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Code2 size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                            <p className="text-sm font-bold text-slate-700">Compiling 100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
