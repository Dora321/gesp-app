import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, Lock, X } from 'lucide-react';
import { allExhibits } from '../data/museumExhibits';

export default function ComputingMuseum() {
    const navigate = useNavigate();
    const [selectedExhibit, setSelectedExhibit] = useState(null);
    const [collectedItems, setCollectedItems] = useState([]);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [newUnlock, setNewUnlock] = useState(null);

    // Load progress from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('museum_collection');
        if (saved) {
            setCollectedItems(JSON.parse(saved));
        }
    }, []);

    // Helper to get rarity visuals
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case '传说': return 'text-yellow-400 shadow-yellow-500/50';
            case '史诗': return 'text-purple-400 shadow-purple-500/50';
            case '稀有': return 'text-blue-400 shadow-blue-500/50';
            default: return 'text-slate-400 shadow-slate-500/50';
        }
    };

    // Unlock Mechanism
    const handleDecrypt = () => {
        if (isUnlocking) return;

        // Find items not yet collected
        const uncollected = allExhibits.filter(item => !collectedItems.includes(item.id));

        if (uncollected.length === 0) {
            alert("档案库已完整！你已收集所有藏品。");
            return;
        }

        setIsUnlocking(true);

        // Simulation of decryption animation time
        setTimeout(() => {
            const randomItem = uncollected[Math.floor(Math.random() * uncollected.length)];

            // Save to state and storage
            const newCollection = [...collectedItems, randomItem.id];
            setCollectedItems(newCollection);
            localStorage.setItem('museum_collection', JSON.stringify(newCollection));

            setNewUnlock(randomItem);
            setIsUnlocking(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20 overflow-x-hidden">

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Cyber Grid Floor */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>

                {/* Floating Codes */}
                <div className="absolute w-full h-full opacity-20 overflow-hidden font-mono text-[10px] text-green-500/50">
                    <div className="absolute top-1/4 left-10 animate-pulse">0101010101...</div>
                    <div className="absolute top-1/2 right-20 animate-pulse delay-700">decryption_protocol_init...</div>
                </div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Box className="text-cyan-400" />
                        <h1 className="text-2xl font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            量子档案馆
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
                        <span className="text-xs text-slate-400">当前收藏:</span>
                        <span className="font-mono font-bold text-cyan-400">{collectedItems.length}/{allExhibits.length}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 pt-32 px-4 max-w-7xl mx-auto">

                {/* BLIND BOX STAGE */}
                <section className="flex flex-col items-center justify-center mb-24 relative">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* The Cube */}
                        <div className={`relative w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-cyan-500/50 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(34,211,238,0.2)] transition-all duration-1000 
                            ${isUnlocking ? 'animate-spin scale-110 shadow-[0_0_100px_rgba(34,211,238,0.8)] border-cyan-400' : 'animate-float hover:scale-105'}
                        `}>
                            <Box size={64} className={`text-cyan-400 ${isUnlocking ? 'animate-pulse' : ''}`} />

                            {/* Orbit Rings */}
                            <div className={`absolute inset-[-20px] rounded-full border border-dashed border-cyan-500/30 w-[calc(100%+40px)] h-[calc(100%+40px)] animate-[spin_10s_linear_infinite] ${isUnlocking ? 'animate-[spin_1s_linear_infinite] border-cyan-400' : ''}`}></div>
                            <div className={`absolute inset-[-40px] rounded-full border border-dotted border-indigo-500/30 w-[calc(100%+80px)] h-[calc(100%+80px)] animate-[spin_15s_linear_infinite_reverse] ${isUnlocking ? 'animate-[spin_2s_linear_infinite_reverse] border-indigo-400' : ''}`}></div>
                        </div>
                    </div>

                    <button
                        onClick={handleDecrypt}
                        disabled={isUnlocking || collectedItems.length === allExhibits.length}
                        className={`
                            mt-12 px-12 py-4 rounded-full font-bold text-lg tracking-widest font-mono transition-all duration-300
                            ${isUnlocking
                                ? 'bg-slate-800 text-slate-500 cursor-wait'
                                : collectedItems.length === allExhibits.length
                                    ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 cursor-default shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                                    : 'bg-cyan-600 hover:bg-cyan-500 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-95'
                            }
                        `}
                    >
                        {isUnlocking ? '正在解析...' : collectedItems.length === allExhibits.length ? '档案库完整' : '解析信号'}
                    </button>

                    <p className="mt-4 text-slate-500 text-xs font-mono">
                        {collectedItems.length === allExhibits.length ? '所有数据碎片已恢复' : '正在拦截加密的历史碎片...'}
                    </p>
                </section>

                {/* COLLECTION GRID */}
                <h3 className="text-xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">数据碎片</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allExhibits.map((item) => {
                        const isUnlocked = collectedItems.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                onClick={() => isUnlocked && setSelectedExhibit(item)}
                                className={`
                                    relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden
                                    ${isUnlocked
                                        ? 'bg-slate-900/50 border-slate-700 cursor-pointer hover:border-cyan-500/50 hover:shadow-lg'
                                        : 'bg-black border-slate-800 opacity-60 grayscale cursor-not-allowed'
                                    }
                                `}
                            >
                                {isUnlocked ? (
                                    <>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-lg bg-black/50 border border-white/10 ${item.accent}`}>
                                                {item.icon}
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current uppercase tracking-wider ${getRarityColor(item.rarity)}`}>
                                                {item.rarity}
                                            </span>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-200 mb-1">{item.title}</h4>
                                        <p className="text-slate-500 text-xs font-mono mb-3">年份: <span className="text-slate-400">{item.year}</span></p>
                                        <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 gap-4">
                                        <Lock className="w-8 h-8 text-slate-700" />
                                        <p className="font-mono text-xs text-slate-700 tracking-widest">加密数据</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* NEW UNLOCK MODAL */}
            {newUnlock && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
                    <div className="relative bg-black border border-cyan-500/50 w-full max-w-md rounded-2xl p-1 animate-slide-up shadow-[0_0_100px_rgba(34,211,238,0.3)]">
                        {/* Glowing Border FX */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-50 blur-sm animate-pulse"></div>

                        <div className="relative bg-slate-900 rounded-xl p-8 text-center overflow-hidden">
                            {/* Background Ray */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-500/20 to-transparent blur-3xl pointer-events-none"></div>

                            <h2 className="relative text-3xl font-black italic text-white mb-2 tracking-tighter animate-bounce-in">
                                解析成功！
                            </h2>
                            <p className="relative font-mono text-cyan-400 text-xs tracking-widest mb-8">获得新碎片</p>

                            <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${newUnlock.color} blur-xl animate-pulse`}></div>
                                <div className="relative z-10 scale-150">
                                    {newUnlock.icon}
                                </div>
                            </div>

                            <h3 className="relative text-2xl font-bold text-white mb-2">{newUnlock.title}</h3>
                            <div className={`relative inline-block px-3 py-1 rounded border mb-6 ${getRarityColor(newUnlock.rarity)} border-current font-bold text-xs uppercase`}>
                                {newUnlock.rarity}
                            </div>

                            <button
                                onClick={() => setNewUnlock(null)}
                                className="relative w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-50 transition-colors"
                            >
                                收入档案馆
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL */}
            {selectedExhibit && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedExhibit(null)}></div>
                    <div className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 animate-slide-up">
                        <button
                            onClick={() => setSelectedExhibit(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-xl bg-slate-800 border border-white/10 ${selectedExhibit.accent}`}>
                                {selectedExhibit.icon}
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{selectedExhibit.title}</h2>
                                <p className="font-mono text-cyan-400 text-xs mt-1">
                                    档案编号: {selectedExhibit.id.toUpperCase()} // 年份: {selectedExhibit.year}
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-cyan max-w-none">
                            {selectedExhibit.details}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => setSelectedExhibit(null)}
                                className="px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 h-20 flex items-center justify-between px-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 hover:bg-slate-800 hover:text-white text-slate-400 transition-all font-mono text-sm"
                >
                    <ArrowLeft size={16} /> 退出档案馆
                </button>
            </footer>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                 @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes bounce-in {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.6s cubic-bezier(0.21, 1.11, 0.81, 0.99);
                }
            `}</style>
        </div>
    );
}
