import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Lock, X, ArrowLeft, Search, Filter } from 'lucide-react';
import { allExhibits } from '../data/museumExhibits';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

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

    // Helper to get rarity visuals (Updated for Light Theme)
    const getRarityBadge = (rarity) => {
        switch (rarity) {
            case '夯': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case '顶级': return 'bg-purple-100 text-purple-700 border-purple-200';
            case '人上人': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'NPC': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case '拉完了': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    // Unlock Mechanism
    const handleDecrypt = () => {
        if (isUnlocking) return;

        // Find items not yet collected
        const uncollected = allExhibits.filter(item => !collectedItems.includes(item.id));

        if (uncollected.length === 0) {
            // alert("档案库已完整！你已收集所有藏品。");
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
        <div className="font-sans text-brand-slate bg-slate-50 min-h-screen flex flex-col">
            <Navigation />

            <main className="flex-grow pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Hero / Blind Box Section */}
                    <section className="relative mb-24 flex flex-col items-center justify-center py-12">
                        {/* Background Decor */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl opacity-40"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                                计算博物馆
                            </h1>
                            <p className="text-slate-500 text-lg mb-12 max-w-2xl text-center">
                                收集散落在历史长河中的数字碎片，重构计算机科学的文明图谱。
                            </p>

                            {/* The Cube / Box */}
                            <div className="relative w-64 h-64 flex items-center justify-center mb-10 group">
                                {/* Outer Glow */}
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 blur-2xl transition-all duration-1000 ${isUnlocking ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

                                {/* The Cube Itself */}
                                <div className={`
                                    relative w-40 h-40 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(37,99,235,0.15)] flex items-center justify-center transition-all duration-700
                                    ${isUnlocking ? 'animate-spin scale-110 border-blue-400 shadow-[0_0_50px_rgba(37,99,235,0.4)]' : 'animate-float hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,99,235,0.2)]'}
                                `}>
                                    {/* Inner Cube / Icon */}
                                    <div className={`relative z-10 transition-transform duration-500 ${isUnlocking ? 'scale-75' : 'scale-100'}`}>
                                        <Box size={80} strokeWidth={1} className={`text-brand-blue drop-shadow-lg ${isUnlocking ? 'animate-pulse' : ''}`} />
                                    </div>

                                    {/* Decorative Elements on Cube */}
                                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-blue-400/50"></div>
                                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-purple-400/50"></div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleDecrypt}
                                disabled={isUnlocking || collectedItems.length === allExhibits.length}
                                className={`
                                    px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 transform
                                    ${isUnlocking
                                        ? 'bg-slate-100 text-slate-400 cursor-wait scale-95'
                                        : collectedItems.length === allExhibits.length
                                            ? 'bg-emerald-100 text-emerald-600 cursor-default'
                                            : 'bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:shadow-blue-500/30 hover:-translate-y-1 hover:scale-105 active:scale-95'
                                    }
                                `}
                            >
                                {isUnlocking ? '正在解析时空信号...' : collectedItems.length === allExhibits.length ? '档案库已完整' : '解析历史碎片'}
                            </button>

                            <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-slate-200/50 backdrop-blur-sm">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collection Progress</span>
                                <div className="h-4 w-px bg-slate-300"></div>
                                <span className="text-sm font-bold text-brand-blue">{collectedItems.length}</span>
                                <span className="text-xs text-slate-400">/</span>
                                <span className="text-sm font-bold text-slate-600">{allExhibits.length}</span>
                            </div>
                        </div>
                    </section>

                    {/* Collection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allExhibits.map((item) => {
                            const isUnlocked = collectedItems.includes(item.id);

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => isUnlocked && setSelectedExhibit(item)}
                                    className={`
                                        group relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden
                                        ${isUnlocked
                                            ? 'bg-white border-slate-100 shadow-sm cursor-pointer hover:shadow-xl hover:border-blue-100 hover:-translate-y-1'
                                            : 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale-[0.8]'
                                        }
                                    `}
                                >
                                    {isUnlocked ? (
                                        <>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-4 rounded-2xl bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300`}>
                                                    {React.cloneElement(item.icon, { size: 32, strokeWidth: 1.5 })}
                                                </div>
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide ${getRarityBadge(item.rarity)}`}>
                                                    {item.rarity}
                                                </span>
                                            </div>

                                            <div className="mb-2">
                                                <span className="inline-block text-[10px] font-mono font-bold text-slate-400 mb-1 tracking-wider">
                                                    {item.year === '-' ? 'UNKNOWN' : item.year}
                                                </span>
                                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{item.title}</h4>
                                            </div>

                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                                {item.description}
                                            </p>

                                            {/* Corner Decoration */}
                                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-slate-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center py-8 gap-4 text-slate-300">
                                            <div className="p-4 rounded-full bg-slate-100/50">
                                                <Lock className="w-8 h-8" />
                                            </div>
                                            <p className="font-mono text-xs font-bold tracking-widest text-slate-400">ENCRYPTED</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </main>

            <Footer />

            {/* NEW UNLOCK MODAL - ENHANCED */}
            {newUnlock && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={() => setNewUnlock(null)}></div>
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl animate-slide-up flex flex-col">

                        {/* Confetti / Ray Effect Background */}
                        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none"></div>

                        {/* Modal Header Area */}
                        <div className="relative z-10 px-8 pt-8 pb-4 flex flex-col items-center text-center">

                            {/* Icon with Glow */}
                            <div className="relative mb-4">
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${newUnlock.color.split(' ')[0]} blur-2xl opacity-50 animate-pulse`}></div>
                                <div className="relative z-10 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-100">
                                    {React.cloneElement(newUnlock.icon, { size: 40, strokeWidth: 1.5 })}
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
                                解锁新碎片!
                            </h2>
                            <div className={`mt-2 inline-block px-3 py-1 rounded-full border ${getRarityBadge(newUnlock.rarity)} text-xs font-bold uppercase`}>
                                RARITY: {newUnlock.rarity}
                            </div>
                        </div>

                        {/* Modal Content (Scrollable) */}
                        <div className="px-8 pb-8 relative z-10">

                            {/* Title & Info */}
                            <div className="mb-6 text-center">
                                <h3 className="text-2xl font-bold text-brand-blue mb-2">{newUnlock.title}</h3>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="font-mono text-slate-400 text-xs font-bold">ID: {newUnlock.id.toUpperCase()}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="font-mono text-slate-600 text-xs font-bold">YEAR: {newUnlock.year}</span>
                                </div>
                            </div>

                            {/* Details (Terminal Style) */}
                            <div className="prose prose-slate prose-lg max-w-none mb-6">
                                <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 shadow-inner">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="ml-2 font-mono text-xs">DECRYPTED_DATA_STREAM</span>
                                    </div>
                                    {newUnlock.details}
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-slate-500 text-sm italic">
                                    "{newUnlock.description}"
                                </p>
                            </div>
                        </div>

                        {/* Fixed Footer Action */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-center sticky bottom-0 z-20 rounded-b-[2rem]">
                            <button
                                onClick={() => setNewUnlock(null)}
                                className="w-full max-w-sm py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl active:scale-95 duration-200 flex items-center justify-center gap-2"
                            >
                                <span className="text-lg">收入档案馆</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DETAIL MODAL */}
            {selectedExhibit && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedExhibit(null)}></div>
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-slide-up flex flex-col">

                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-start justify-between">
                            <div className="flex items-center gap-5">
                                <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-100`}>
                                    {React.cloneElement(selectedExhibit.icon, { size: 32, strokeWidth: 1.5 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedExhibit.title}</h2>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="font-mono text-slate-400 text-xs font-bold">ID: {selectedExhibit.id.toUpperCase()}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="font-mono text-slate-600 text-xs font-bold">YEAR: {selectedExhibit.year}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedExhibit(null)}
                                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="prose prose-slate prose-lg max-w-none">
                                <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 shadow-inner">
                                    <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="ml-2 font-mono text-xs">ARCHIVE_READER_V1.0</span>
                                    </div>
                                    {selectedExhibit.details}
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-slate-400 text-sm italic">
                                    "{selectedExhibit.description}"
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end rounded-b-3xl">
                            <button
                                onClick={() => setSelectedExhibit(null)}
                                className="px-8 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/30"
                            >
                                关闭档案
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                 @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes slide-up {
                     from { transform: translateY(20px); opacity: 0; }
                     to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </div>
    );
}
