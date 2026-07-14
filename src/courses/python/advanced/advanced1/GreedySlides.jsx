import { useState } from 'react';
import { RotateCcw, Trophy, Box, Rocket, Sparkles } from 'lucide-react';
import { Icon } from './Shared';

export const GreedyConceptSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h3 className="text-3xl font-bold text-slate-800 mb-6">什么是贪心？</h3>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            贪心算法 (Greedy) 就像一只<span className="text-orange-500 font-bold mx-1">贪吃的小老鼠</span>，
            每次只看眼前，哪块蛋糕最大就拿哪块，从来不考虑以后。
        </p>

        <div className="flex items-end justify-center gap-2 h-40 mb-12">
            {[20, 40, 60, 100, 30].map((h, i) => (
                <div key={i} className={`w-12 bg-yellow-200 rounded-t-lg relative border-2 border-yellow-400 transition-all hover:bg-yellow-300 ${h === 100 ? 'animate-bounce shadow-xl bg-yellow-400' : 'opacity-70'}`} style={{ height: `${h}%` }}>
                    {h === 100 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl">🐭</div>
                    )}
                </div>
            ))}
        </div>
        <div className="bg-orange-50 px-6 py-3 rounded-full text-orange-700 font-bold">
            "我就要最大的！现在就要！"
        </div>
    </div>
);

export const GreedyCoinsSlide = () => {
    const [amount, setAmount] = useState(46);
    const [coins, setCoins] = useState([]);
    const availableCoins = [25, 10, 5, 1];

    const currentTotal = coins.reduce((a, b) => a + b, 0);
    const remaining = amount - currentTotal;
    const isComplete = remaining === 0;

    const addCoin = (value) => {
        if (remaining >= value) {
            setCoins([...coins, value]);
        }
    };

    const autoGreedy = async () => {
        setCoins([]);
        let rem = amount;
        let newCoins = [];
        const delay = (ms) => new Promise(r => setTimeout(r, ms));

        while (rem > 0) {
            for (let coin of availableCoins) {
                if (rem >= coin) {
                    newCoins.push(coin);
                    setCoins([...newCoins]);
                    rem -= coin;
                    await delay(500);
                    break;
                }
            }
        }
    };

    const reset = () => {
        setCoins([]);
        setAmount(Math.floor(Math.random() * 50) + 20);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Box className="text-yellow-500" /> 贪心算法: 找零钱
                </h3>
            </div>

            <div className="flex-1 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
                {/* 交互区 */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <div className="text-sm text-slate-500">目标金额</div>
                            <div className="text-4xl font-black text-slate-800">{amount}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-500">还需要凑</div>
                            <div className={`text-4xl font-black ${remaining === 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {remaining}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex gap-4 justify-center">
                            {availableCoins.map(coin => (
                                <button
                                    key={coin}
                                    onClick={() => addCoin(coin)}
                                    disabled={remaining < coin}
                                    className={`
                                        w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-md border-4 transition-all
                                        ${remaining >= coin ? 'bg-yellow-100 border-yellow-400 text-yellow-700 hover:scale-110 active:scale-95' : 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'}
                                    `}
                                >
                                    {coin}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-300 min-h-[120px] flex flex-wrap gap-2 justify-center content-start">
                        {coins.map((c, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 border-2 border-yellow-600 flex items-center justify-center font-bold text-sm shadow-sm animate-in zoom-in">
                                {c}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 说明与自动演示 */}
                <div className="space-y-6">
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                        <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                            <Sparkles size={18} /> 贪心策略
                        </h4>
                        <p className="text-sm text-indigo-900">
                            只要能拿大面值的，绝不拿小的。这种策略在找零钱问题中通常是最优的。
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={autoGreedy}
                            disabled={coins.length > 0 && !isComplete}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Rocket size={18} /> 自动演示
                        </button>
                        <button onClick={reset} className="px-6 py-3 bg-white border border-slate-300 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    {isComplete && (
                        <div className="bg-green-100 text-green-800 p-4 rounded-xl border border-green-200 flex items-center gap-3 animate-in slide-in-from-bottom">
                            <Trophy className="text-green-600" size={24} />
                            <div>
                                <div className="font-bold">完成！</div>
                                <div className="text-sm">共用了 {coins.length} 枚硬币。</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const GreedyTrapSlide = () => {
    const [path, setPath] = useState(null); // 'greedy' or 'smart'

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">贪心总是对的吗？</h3>
            <p className="text-slate-600 mb-8">有时候，只顾眼前的利益，反而会错过更长远的目标。</p>

            <div className="relative w-full max-w-2xl h-64 bg-slate-100 rounded-2xl border-4 border-slate-300 p-4 flex items-center justify-between">

                {/* Start */}
                <div className="w-16 h-16 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold z-10 shadow-lg">Start</div>

                {/* Path A (Greedy) */}
                <div
                    onClick={() => setPath('greedy')}
                    className={`absolute top-1/4 left-1/4 w-1/2 h-2 rounded-full cursor-pointer transition-all ${path === 'greedy' ? 'bg-red-500 h-4' : 'bg-slate-300 hover:bg-red-200'}`}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 rounded border border-slate-200 text-xs text-slate-500">
                        消耗 1
                    </div>
                </div>

                {/* Path B (Smart) */}
                <div
                    onClick={() => setPath('smart')}
                    className={`absolute bottom-1/4 left-1/4 w-1/2 h-2 rounded-full cursor-pointer transition-all ${path === 'smart' ? 'bg-green-500 h-4' : 'bg-slate-300 hover:bg-green-200'}`}
                >
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 rounded border border-slate-200 text-xs text-slate-500">
                        消耗 10
                    </div>
                </div>

                {/* Midpoints */}
                <div className="absolute inset-y-0 left-3/4 flex flex-col justify-around py-8">
                    <div className="w-12 h-12 bg-red-100 rounded-full border-2 border-red-500 flex items-center justify-center text-xs font-bold text-red-700">Trap</div>
                    <div className="w-12 h-12 bg-green-100 rounded-full border-2 border-green-500 flex items-center justify-center text-xs font-bold text-green-700">Safe</div>
                </div>

                {/* Goal */}
                <div className="w-16 h-16 bg-yellow-400 rounded-full text-white flex items-center justify-center font-bold z-10 shadow-lg border-4 border-yellow-600">Goal</div>
            </div>

            {/* Explanations */}
            <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-2xl">
                <div className={`p-4 rounded-xl border-2 transition-all ${path === 'greedy' ? 'border-red-500 bg-red-50 opacity-100' : 'border-dashed border-slate-200 opacity-50'}`}>
                    <h4 className="font-bold text-red-700 mb-2">贪心选择</h4>
                    <p className="text-sm text-slate-600">
                        开头真的很便宜 (消耗1)，但是后面遇到了巨大的坑 (消耗100)！<br />
                        <strong>总消耗: 101</strong>
                    </p>
                </div>
                <div className={`p-4 rounded-xl border-2 transition-all ${path === 'smart' ? 'border-green-500 bg-green-50 opacity-100' : 'border-dashed border-slate-200 opacity-50'}`}>
                    <h4 className="font-bold text-green-700 mb-2">智慧选择</h4>
                    <p className="text-sm text-slate-600">
                        开头虽然有点贵 (消耗10)，但后面一路顺风 (消耗10)。<br />
                        <strong>总消耗: 20</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export const GreedySlide = () => {
    const [activeTab, setActiveTab] = useState('concept');
    const tabs = [
        { id: 'concept', label: '🍰 什么是贪心', icon: 'search' },
        { id: 'coins', label: '💰 找零钱', icon: 'coin' },
        { id: 'trap', label: '⚠️ 贪心的陷阱', icon: 'alert' }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-yellow-100 text-yellow-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {activeTab === 'concept' && <GreedyConceptSlide />}
                    {activeTab === 'coins' && <GreedyCoinsSlide />}
                    {activeTab === 'trap' && <GreedyTrapSlide />}
                </div>
            </div>
        </div>
    );
};
