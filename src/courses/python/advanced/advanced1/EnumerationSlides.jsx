import { useState } from 'react';
import { Play, RotateCcw, Lock, Unlock } from 'lucide-react';
import { Icon } from './Shared';

export const EnumConceptSlide = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h3 className="text-3xl font-bold text-slate-800 mb-6">什么是枚举？</h3>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            枚举 (Enumeration) 就是<span className="text-indigo-600 font-bold mx-1">逐个尝试</span>所有可能的答案，直到找到正确的那个。
            虽然看起来很“笨”，但对于计算机来说，这往往是最简单有效的方法！
        </p>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-3xl animate-in zoom-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    {i === 7 ? '💎' : '📦'}
                </div>
            ))}
        </div>
        <div className="bg-indigo-50 px-6 py-3 rounded-full text-indigo-700 font-bold animate-bounce">
            一个个通过，绝对不会漏掉宝藏！
        </div>
    </div>
);

export const EnumCrackerSlide = () => {
    const [password, setPassword] = useState([7, 3, 9]); // 目标密码
    const [currentTry, setCurrentTry] = useState([0, 0, 0]);
    const [isCracking, setIsCracking] = useState(false);
    const [found, setFound] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const startCracking = async () => {
        if (isCracking) return;
        setIsCracking(true);
        setFound(false);
        setAttempts(0);

        for (let i = 0; i <= 999; i++) {
            const d1 = Math.floor(i / 100);
            const d2 = Math.floor((i % 100) / 10);
            const d3 = i % 10;
            const current = [d1, d2, d3];

            setCurrentTry(current);
            setAttempts(i + 1);

            if (d1 === password[0] && d2 === password[1] && d3 === password[2]) {
                setFound(true);
                setIsCracking(false);
                return;
            }

            if (i % 3 === 0) await new Promise(r => setTimeout(r, 10)); // UI Throttle
        }
        setIsCracking(false);
    };

    const reset = () => {
        setIsCracking(false);
        setFound(false);
        setCurrentTry([0, 0, 0]);
        setAttempts(0);
        const newPass = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        setPassword(newPass);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center max-w-2xl">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                    <Lock className="text-red-500" /> 暴力破解 (枚举算法)
                </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-4xl flex-1">
                {/* 密码锁展示 */}
                <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative border-4 border-slate-600">
                    <div className="text-slate-400 mb-4 font-mono text-sm">SECURE VAULT v1.0</div>
                    <div className="flex gap-4 mb-8 bg-black/30 p-4 rounded-xl">
                        {currentTry.map((num, i) => (
                            <div key={i} className="w-16 h-20 bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg flex items-center justify-center text-4xl font-mono font-bold text-slate-800 shadow-inner border border-slate-400 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20"></div>
                                {num}
                            </div>
                        ))}
                    </div>
                    {found && (
                        <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold animate-bounce flex items-center gap-2">
                            <Unlock size={20} /> 破解成功!
                        </div>
                    )}
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 right-4 text-xs font-mono text-green-400">
                        Attempts: {attempts}
                    </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow border border-slate-200 font-mono text-sm">
                        <div className="text-slate-400"># 暴力枚举脚本</div>
                        <div><span className="text-purple-600">for</span> i <span className="text-purple-600">in</span> range(<span className="text-orange-500">1000</span>):</div>
                        <div className="pl-4">keyword = try_unlock(i)</div>
                        <div className="pl-4"><span className="text-purple-600">if</span> keyword == <span className="text-green-600">True</span>:</div>
                        <div className="pl-8"><span className="text-blue-600">print</span>("Open!")</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button onClick={startCracking} disabled={isCracking || found} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                            {!isCracking ? <><Play size={20} /> 开始破解</> : '破解进行中...'}
                        </button>
                        <button onClick={reset} disabled={isCracking} className="w-full py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={18} /> 重置
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EnumChickenSlide = () => {
    const [heads] = useState(35);
    const [feet] = useState(94);
    const [solution, setSolution] = useState(null); // {chickens, rabbits}
    const [currentCheck, setCurrentCheck] = useState(null); // {c, r}
    const [isSolving, setIsSolving] = useState(false);

    const solve = async () => {
        if (isSolving) return;
        setIsSolving(true);
        setSolution(null);
        setCurrentCheck(null);

        // 枚举循环：假设鸡有 i 只
        // 那么兔就有 heads - i 只
        // 检查脚的总数是否匹配
        for (let c = 0; c <= heads; c++) {
            let r = heads - c;
            setCurrentCheck({ c, r });

            if (c * 2 + r * 4 === feet) {
                setSolution({ c, r });
                setIsSolving(false);
                return;
            }
            // Visualization Delay
            await new Promise(res => setTimeout(res, 50));
        }
        setIsSolving(false);
    };

    return (
        <div className="flex flex-col h-full items-center gap-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800">鸡兔同笼问题</h3>
                <p className="text-slate-600">如果有 {heads} 个头，{feet} 只脚，其实不用列方程，计算机可以<span className="font-bold text-indigo-600">一个个试</span>出来！</p>
            </div>

            <div className="flex-1 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
                {/* Visual Area */}
                <div className="bg-green-50 rounded-2xl p-8 border border-green-200 relative min-h-[300px] flex flex-col items-center justify-center">
                    {currentCheck ? (
                        <div className="text-center animate-in zoom-in duration-100">
                            <div className="text-6xl mb-4 font-black text-slate-800 flex justify-center gap-8">
                                <div className="flex flex-col items-center">
                                    <span>🐔</span>
                                    <span className="text-xl mt-2">{currentCheck.c} 只</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>🐇</span>
                                    <span className="text-xl mt-2">{currentCheck.r} 只</span>
                                </div>
                            </div>
                            <div className="bg-white px-6 py-2 rounded-full shadow-sm inline-block">
                                <span className="font-bold text-slate-500">脚的数量: </span>
                                <span className={`font-mono font-bold text-xl ${solution ? 'text-green-600' : 'text-orange-500'}`}>
                                    {currentCheck.c * 2 + currentCheck.r * 4}
                                </span>
                                <span className="text-slate-400 mx-2">/</span>
                                <span className="text-slate-400">{feet}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-400 text-center">
                            <div className="text-6xl mb-4 opacity-50">🐔🐇❓</div>
                            点击“开始计算”找出答案
                        </div>
                    )}

                    {solution && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px] rounded-2xl">
                            <div className="bg-white p-6 rounded-2xl shadow-xl border-4 border-green-500 animate-bounce">
                                <h4 className="text-2xl font-bold text-green-700 mb-2">找到啦！🎉</h4>
                                <div className="text-lg">鸡: <strong>{solution.c}</strong>, 兔: <strong>{solution.r}</strong></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Control Area */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow border border-slate-200 font-mono text-sm">
                        <div><span className="text-purple-600">for</span> chicken <span className="text-purple-600">in</span> range(<span className="text-orange-500">{heads + 1}</span>):</div>
                        <div className="pl-4">rabbit = {heads} - chicken</div>
                        <div className="pl-4"><span className="text-purple-600">if</span> (chicken*2 + rabbit*4) == <span className="text-blue-600">{feet}</span>:</div>
                        <div className="pl-8"><span className="text-green-600">print</span>("Found it!")</div>
                    </div>

                    <button
                        onClick={solve}
                        disabled={isSolving}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSolving ? '正在一个个试...' : <><Play size={18} /> 开始枚举计算</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const EnumerationSlide = () => {
    const [activeTab, setActiveTab] = useState('concept');
    const tabs = [
        { id: 'concept', label: '🔍 什么是枚举', icon: 'search' },
        { id: 'cracker', label: '🔓 暴力破解', icon: 'lock' },
        { id: 'chicken', label: '🐇 鸡兔同笼', icon: 'help' }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-red-100 text-red-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
                <div key={activeTab} className="h-full animate-in fade-in zoom-in duration-300">
                    {activeTab === 'concept' && <EnumConceptSlide />}
                    {activeTab === 'cracker' && <EnumCrackerSlide />}
                    {activeTab === 'chicken' && <EnumChickenSlide />}
                </div>
            </div>
        </div>
    );
};
