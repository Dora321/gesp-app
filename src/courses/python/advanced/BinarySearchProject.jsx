import React, { useState, useEffect, useRef } from 'react';
import {
    Target, Play, RotateCcw, HelpCircle,
    Trophy, Code, ArrowRight, Sparkles,
    Search, Gauge, Brain, ChevronRight,
    SearchCheck, Zap, Menu, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PythonProjectSupport from '../../../components/PythonProjectSupport';

// --- 辅助组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        target: <Target size={size} />,
        play: <Play size={size} />,
        reset: <RotateCcw size={size} />,
        help: <HelpCircle size={size} />,
        trophy: <Trophy size={size} />,
        code: <Code size={size} />,
        search: <Search size={size} />,
        gauge: <Gauge size={size} />,
        brain: <Brain size={size} />,
        zap: <Zap size={size} />
    };
    return <span className={className}>{icons[name] || icons.help}</span>;
};

// --- Slide 组件 ---

// 1. 趣味导入：读心术
const IntroSlide = () => (
    <div className="slide-enter space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Brain size={48} className="text-yellow-300" />
                </div>
                <h2 className="text-4xl font-extrabold mb-4">数字读心术：二分查找</h2>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                    如果我让你在 1 到 100 之间猜一个数字，我只需要回答“大了”或“小了”，
                    我能保证在 <span className="text-yellow-300 font-bold underline">7 次以内</span> 绝对猜中。
                    这是吹牛吗？不，这是数学的魔力！
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg"><Search className="text-blue-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">普通人的猜法 (线性查找)</h3>
                </div>
                <p className="text-slate-600 italic mb-4">“是 1 吗？”“不是。”“是 2 吗？”“不是。”...</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
                    就像翻书一页一页找。最差要找 100 次！太慢了！🐢
                </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-indigo-50 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg"><Zap className="text-indigo-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">二分查找 (Binary Search)</h3>
                </div>
                <p className="text-indigo-600 font-bold mb-4">“先猜中间的 50！”</p>
                <div className="p-4 bg-indigo-50 rounded-xl border border-dashed border-indigo-200 text-sm text-indigo-700 font-medium">
                    每次排除一半的可能性。即便有 100 万个数字，也只需要 20 次。快如闪电！⚡
                </div>
            </div>
        </div>
    </div>
);

// 2. 效率大作战：可视化对比
const BattleSlide = () => {
    const [linearSteps, setLinearSteps] = useState(0);
    const [binarySteps, setBinarySteps] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [target] = useState(88);

    // Visualization state for Binary Search
    const [visLow, setVisLow] = useState(1);
    const [visHigh, setVisHigh] = useState(100);
    const [visMid, setVisMid] = useState(null);

    const runBattle = () => {
        setIsRunning(true);
        setLinearSteps(0);
        setBinarySteps(0);

        // Reset Visualization
        setVisLow(1);
        setVisHigh(100);
        setVisMid(null);

        // 模拟线性查找
        let l = 0;
        const lTimer = setInterval(() => {
            l++;
            setLinearSteps(l);
            if (l === target) clearInterval(lTimer);
        }, 50);

        // 模拟二分查找
        let low = 1, high = 100, b = 0;
        const bTimer = setInterval(() => {
            b++;
            setBinarySteps(b);

            let mid = Math.floor((low + high) / 2);
            setVisMid(mid);
            setVisLow(low);
            setVisHigh(high);

            if (mid === target) {
                clearInterval(bTimer);
                setIsRunning(false);
            } else if (mid < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }, 800); // Slower for visualization
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Gauge className="text-indigo-600" /> 速度大比拼：目标数字 {target}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 线性查找可视化 */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-slate-700">线性查找 (一个个数)</span>
                        <span className="bg-slate-200 px-3 py-1 rounded-full text-xs font-mono">步数: {linearSteps}</span>
                    </div>
                    <div className="h-48 bg-white rounded-xl border border-slate-200 p-2 flex flex-wrap content-start overflow-auto relative gap-[2px]">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-[1px] transition-colors duration-75 text-[6px] flex items-center justify-center
                                    ${i + 1 === linearSteps ? 'bg-blue-600 text-white scale-125 shadow-sm z-10' :
                                        i + 1 < linearSteps ? 'bg-slate-200 text-slate-400' : 'bg-slate-50 text-slate-300'}`}
                            >
                                {i + 1}
                            </div>
                        ))}
                        {linearSteps === target && !isRunning && <div className="absolute inset-0 flex items-center justify-center bg-white/90 animate-in fade-in font-bold text-blue-600">🎉 找到了！</div>}
                    </div>
                </div>

                {/* 二分查找可视化 */}
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-indigo-800">二分查找 (对半劈)</span>
                        <span className="bg-indigo-200 px-3 py-1 rounded-full text-xs font-mono text-indigo-800">步数: {binarySteps}</span>
                    </div>
                    <div className="h-48 bg-white rounded-xl border border-indigo-200 p-2 flex flex-wrap content-start relative gap-[2px]">
                        {Array.from({ length: 100 }).map((_, i) => {
                            const num = i + 1;
                            const isEliminated = num < visLow || num > visHigh;
                            const isMid = num === visMid;
                            const isTarget = num === target;

                            return (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-[1px] transition-all duration-300 text-[6px] flex items-center justify-center
                                        ${isTarget ? 'bg-red-500 text-white ring-2 ring-red-200 z-20 font-bold' :
                                            isMid ? 'bg-yellow-400 text-yellow-900 ring-2 ring-yellow-200 z-20 scale-150 shadow-md font-bold' :
                                                isEliminated ? 'bg-slate-100 text-slate-300 opacity-30 blur-[0.5px]' :
                                                    'bg-indigo-100 text-indigo-600 font-medium'}`}
                                >
                                    {isTarget ? '★' : num}
                                </div>
                            )
                        })}

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> 中间值 (Mid)</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> 目标 (Target)</div>
                        </div>

                        {binarySteps > 0 && !isRunning && <div className="absolute inset-0 flex items-center justify-center bg-white/90 animate-in fade-in font-bold text-indigo-600 z-30">
                            ⚡ 只有 {binarySteps} 步！快了 {Math.floor(linearSteps / binarySteps)} 倍！
                        </div>}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={runBattle}
                    disabled={isRunning}
                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg ${isRunning
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                        }`}
                >
                    {isRunning ? <RotateCcw size={20} className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                    {isRunning ? '搜索中...' : '开始对决'}
                </button>
            </div>
        </div>
    );
};


// 3. 互动练习：你猜电脑 (User Practice)
const UserPracticeSlide = () => {
    const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'win'
    const [secret, setSecret] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [low, setLow] = useState(1);
    const [high, setHigh] = useState(100);

    const startUserGame = () => {
        setSecret(Math.floor(Math.random() * 100) + 1);
        setGameState('playing');
        setAttempts(0);
        setLow(1);
        setHigh(100);
        setFeedback('开始吧！范围是 1-100');
        setUserGuess('');
    };

    const handleUserGuess = () => {
        const guess = parseInt(userGuess);
        if (isNaN(guess)) return;

        setAttempts(prev => prev + 1);

        if (guess === secret) {
            setGameState('win');
            setFeedback('🎉 猜对了！');
        } else if (guess < secret) {
            setFeedback('太小了！往大了猜');
            if (guess >= low) setLow(guess + 1);
        } else {
            setFeedback('太大了！往小了猜');
            if (guess <= high) setHigh(guess - 1);
        }
        setUserGuess('');
    };

    return (
        <div className="transform transition-all duration-500 ease-out">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                <Target className="text-indigo-600" /> 反转模式：你来猜电脑
            </h2>

            <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                {gameState === 'start' && (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in spin-in-3 duration-700">
                            <Brain size={40} className="text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">挑战电脑：你能几次猜中？</h3>
                        <p className="text-slate-600">电脑已经想好了一个 1-100 之间的数字。利用二分法策略，看看你能在几次内猜中！</p>
                        <button onClick={startUserGame} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-95">
                            开始挑战
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full max-w-md space-y-8 animate-in zoom-in-95">
                        <div className="text-center">
                            <span className="text-4xl font-black text-slate-800 block mb-2">{feedback}</span>
                            <p className="text-slate-500">已尝试次数：{attempts}</p>
                        </div>

                        {/* Range Visualizer using ProgressBar logic */}
                        <div className="relative h-14 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                            {/* The "Possible Range" */}
                            <div
                                className="absolute top-0 bottom-0 bg-indigo-500 transition-all duration-500 ease-out flex items-center justify-center text-white font-bold text-xs shadow-lg"
                                style={{
                                    left: `${(low - 1)}%`,
                                    width: `${(high - low + 1)}%`
                                }}
                            >
                                <span className="drop-shadow-md whitespace-nowrap px-2">{low} - {high}</span>
                            </div>
                            {/* Ticks */}
                            <div className="absolute inset-0 flex justify-between px-3 items-center pointer-events-none opacity-40 font-mono text-xs">
                                <span>1</span>
                                <span>100</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleUserGuess()}
                                className="flex-1 text-center text-2xl font-bold py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                                placeholder="?"
                                autoFocus
                            />
                            <button
                                onClick={handleUserGuess}
                                className="px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition active:scale-95 shadow-md shadow-indigo-200"
                            >
                                确定
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'win' && (
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        <Trophy size={80} className="text-yellow-500 mx-auto animate-bounce" />
                        <h3 className="text-3xl font-black text-slate-800">挑战成功！</h3>
                        <p className="text-xl text-slate-600">
                            你猜了 <span className="text-indigo-600 font-bold">{attempts}</span> 次找到了答案 <span className="text-indigo-600 font-bold">{secret}</span>。
                            {attempts <= 7 ? " 完美的二分查找！⚡" : " 还可以更快哦！加油！"}
                        </p>
                        <button onClick={startUserGame} className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition active:scale-95">
                            再来一局
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 4. 互动练习：我是读心者 (电脑猜玩家)
const PlayerGuessSlide = () => {
    const [gameState, setGameState] = useState('input'); // 'input', 'playing', 'win', 'cheat'
    const [target, setTarget] = useState('');
    const [low, setLow] = useState(1);
    const [high, setHigh] = useState(100);
    const [guess, setGuess] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [history, setHistory] = useState([]);

    const startGame = () => {
        const t = parseInt(target);
        if (isNaN(t) || t < 1 || t > 100) {
            alert('请输入 1-100 之间的整数');
            return;
        }
        setGameState('playing');
        setLow(1);
        setHigh(100);
        setAttempts(0);
        setHistory([]);
        makeGuess(1, 100);
    };

    const makeGuess = (l, h) => {
        // Cheat detection: if low > high, rules are broken
        if (l > h) {
            setGameState('cheat');
            return;
        }

        const g = Math.floor((l + h) / 2);
        setGuess(g);
        setAttempts(prev => prev + 1);
    };

    const handleFeedback = (type) => {
        if (type === 'equal') {
            setGameState('win');
            return;
        }

        let nl = low, nh = high;
        if (type === 'higher') nl = guess + 1; // It's bigger than guess, so low moves up
        else nh = guess - 1; // It's smaller than guess, so high moves down

        // Immediate logic check before state update for smoother UX
        if (nl > nh) {
            setGameState('cheat');
            return;
        }

        setLow(nl);
        setHigh(nh);
        setHistory([...history, { guess, feedback: type }]);
        makeGuess(nl, nh);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">交互体验：让我猜猜你的心思</h2>

            <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
                {gameState === 'input' && (
                    <div className="text-center space-y-6">
                        <p className="text-lg text-slate-600">在心中想一个 1-100 的数字，把它填在这里：</p>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="text-4xl w-32 font-bold text-center border-b-4 border-indigo-600 focus:outline-none focus:border-indigo-400 text-indigo-600"
                            placeholder="?"
                        />
                        <button onClick={startGame} className="block mx-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                            准备好了，你猜吧！
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                        <div className="relative">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                                第 {attempts} 次揭晓
                            </div>
                            <span className="text-8xl font-black text-indigo-600 drop-shadow-sm">{guess}</span>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xl font-bold text-slate-700">我猜的是这个吗？</p>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => handleFeedback('lower')} className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition">太大了</button>
                                <button onClick={() => handleFeedback('equal')} className="px-10 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition ring-4 ring-green-100">猜对了！</button>
                                <button onClick={() => handleFeedback('higher')} className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 transition">太小了</button>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-center">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div key={i} className={`w-1 h-4 rounded-full transition-colors duration-300 ${i + 1 >= low && i + 1 <= high ? 'bg-indigo-400' : 'bg-slate-100'}`}></div>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'cheat' && (
                    <div className="text-center space-y-6 animate-in wobble">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <X size={48} className="text-red-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800">等等...你在骗我！</h3>
                        <p className="text-xl text-slate-600 max-w-md mx-auto">
                            根据你的反馈，这个数字已经<span className="text-red-600 font-bold">不存在</span>了！
                            (所有的可能性都被排除了)
                        </p>
                        <button onClick={() => setGameState('input')} className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition">
                            好吧，这次我不骗你
                        </button>
                    </div>
                )}

                {gameState === 'win' && (
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        <Trophy size={80} className="text-yellow-500 mx-auto animate-bounce" />
                        <h3 className="text-3xl font-black text-slate-800">哈哈，我赢了！</h3>
                        <p className="text-xl text-slate-600">你的心数字是 <span className="text-indigo-600 font-bold">{guess}</span>，我只用了 <span className="text-indigo-600 font-bold">{attempts}</span> 次就猜到了。</p>
                        <button onClick={() => setGameState('input')} className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition">
                            再来一局，我不信！
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 4. 代码讲解
const LogicSlide = () => (
    <div className="slide-enter space-y-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Code className="text-indigo-600" /> 代码魔法书：Python 实现
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">guess_number.py</span>
                </div>
                <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-indigo-300">
                    <code>{`def binary_search(target):
    low = 1
    high = 100
    steps = 0
    
    while low <= high:
        steps += 1
        mid = (low + high) // 2  # 找中间
        
        if mid == target:
            return steps
        elif mid < target:
            low = mid + 1      # 往右找
        else:
            high = mid - 1     # 往左找
            
    return -1`}</code>
                </pre>
            </div>
            <div className="space-y-4">
                <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">1</div>
                    <p className="text-slate-600 text-sm">设定边界：<code>low</code> 代表左边界，<code>high</code> 代表右边界。</p>
                </div>
                <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 font-bold">2</div>
                    <p className="text-slate-600 text-sm">对半切开：计算中间位置 <code>mid</code>。</p>
                </div>
                <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">3</div>
                    <p className="text-slate-600 text-sm">更新范围：如果偏小，把 <code>low</code> 移到 <code>mid+1</code>；如果偏大，把 <code>high</code> 移到 <code>mid-1</code>。</p>
                </div>
                <div className="p-6 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={18} />
                        <h4 className="font-bold">核心笔记</h4>
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed">
                        这就是分而治之 (Divide and Conquer) 的思想。
                        每猜一次，你就杀死了 50% 的竞争对手！
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// --- 主布局 --－

const sections = [
    { id: 1, title: '魔法读心术', icon: 'brain', component: IntroSlide },
    { id: 2, title: '效率大对决', icon: 'gauge', component: BattleSlide },
    { id: 3, title: '挑战电脑 (反转)', icon: 'zap', component: UserPracticeSlide }, // New Section
    { id: 4, title: '猜数字游戏', icon: 'play', component: PlayerGuessSlide },
    { id: 5, title: '代码大解密', icon: 'code', component: LogicSlide },
];

export default function BinarySearchProject() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const currentSection = sections.find(s => s.id === activeSection);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <style>{`
                .slide-enter { animation: slideIn 0.4s ease-out; }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
            `}</style>

            {/* Layout follows common patterns in the app */}
            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-indigo-100" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-slate-800 leading-none">二分搜索</h1>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Binary Search</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 入门 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🚀 入门体验</div>
                        <div className="space-y-1">
                            {sections.slice(0, 2).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 互动练习 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🎮 互动练习</div>
                        <div className="space-y-1">
                            {sections.slice(2, 4).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 总结 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🏆 代码解密</div>
                        <div className="space-y-1">
                            {sections.slice(4, 5).map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${activeSection === section.id
                                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon name={section.icon} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-50">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors text-sm font-bold">
                        <RotateCcw size={16} /> 返回课程中心
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header with Mobile Menu Button */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 flex-shrink-0 z-20">
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                            aria-label="打开课程目录"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeSection === sections.length ? 'bg-yellow-100 text-yellow-600' : 'bg-indigo-100 text-indigo-600'}`}>
                            <Icon name={currentSection?.icon} size={20} />
                        </div>
                        <h2 className="font-bold text-slate-800 text-lg sm:text-lg truncate max-w-[200px] sm:max-w-md">
                            {currentSection?.title}
                        </h2>
                    </div>

                    <div className="hidden md:flex text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Section {activeSection} / {sections.length}
                    </div>
                </header>

                <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                    <div className="max-w-4xl mx-auto pb-10">
                        <PythonProjectSupport projectId="binary-search" />
                        {/* Dynamic Component */}
                        {currentSection && React.createElement(currentSection.component)}
                        <PythonProjectSupport projectId="binary-search" placement="bottom" />
                    </div>
                </main>

                {/* Sticky Footer */}
                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all
                            ${activeSection === 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/encryption');
                            }
                        }}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-white hover:translate-x-1
                            ${activeSection === sections.length ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        {activeSection === sections.length ? '下一课' : '下一节'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};


