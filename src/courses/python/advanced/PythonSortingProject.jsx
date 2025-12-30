import React, { useState, useEffect, useCallback } from 'react';
import {
    ArrowUp, Play, RotateCcw, HelpCircle,
    Trophy, Code, ArrowRight, Sparkles,
    BarChart2, Layers, Brain, ChevronRight,
    Zap, Menu, X, ArrowDown, Repeat,
    CheckCircle, StopCircle, Smartphone, Globe,
    ShoppingCart, Gamepad2, ListOrdered, Timer, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 辅助组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
    const icons = {
        chart: <BarChart2 size={size} />,
        play: <Play size={size} />,
        reset: <RotateCcw size={size} />,
        help: <HelpCircle size={size} />,
        trophy: <Trophy size={size} />,
        code: <Code size={size} />,
        layers: <Layers size={size} />,
        brain: <Brain size={size} />,
        zap: <Zap size={size} />,
        arrowUp: <ArrowUp size={size} />
    };
    return <span className={className}>{icons[name] || icons.help}</span>;
};

// --- Slide 组件 ---

// 1. 趣味导入：乱糟糟的图书馆
const IntroSlide = () => (
    <div className="slide-enter space-y-8">
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <Layers size={48} className="text-yellow-300" />
                </div>
                <h2 className="text-4xl font-extrabold mb-4">秩序之美：排序算法</h2>
                <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
                    想象一下，如果图书馆里的书是胡乱堆放的，你能找到想看的那本吗？
                    <span className="text-yellow-300 font-bold mx-1">排序</span>
                    是计算机世界里最基础也最重要的魔法，让杂乱无章变得井井有条。
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-100 rounded-lg"><Menu className="text-slate-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">无序的世界</h3>
                </div>
                <div className="flex gap-2 mb-4 justify-center">
                    {[5, 2, 9, 1, 6].map((n, i) => (
                        <div key={i} className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-500 animate-pulse">
                            {n}
                        </div>
                    ))}
                </div>
                <p className="text-slate-500 text-sm text-center">
                    找最小值？太难了！找不到！
                </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-orange-50 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg"><ArrowUp className="text-orange-600" /></div>
                    <h3 className="text-xl font-bold text-slate-800">有序的美好</h3>
                </div>
                <div className="flex gap-2 mb-4 justify-center">
                    {[1, 2, 5, 6, 9].map((n, i) => (
                        <div key={i} className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold shadow-lg transform hover:-translate-y-1 transition-transform">
                            {n}
                        </div>
                    ))}
                </div>
                <p className="text-orange-600 text-sm text-center font-bold">
                    二分查找、快速检索... 一切成为可能！
                </p>
            </div>
        </div>
    </div>
);

// 2. 气泡上浮：冒泡排序可视化
const BubbleSortSlide = () => {
    const [arr, setArr] = useState([50, 30, 80, 20, 90, 10, 60, 40]);
    const [comparing, setComparing] = useState([]); // Indices being compared
    const [sorted, setSorted] = useState([]); // Indices that are sorted
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("准备开始...");

    const reset = () => {
        setArr([50, 30, 80, 20, 90, 10, 60, 40]);
        setComparing([]);
        setSorted([]);
        setIsRunning(false);
        setMessage("点击开始按钮，观察气泡如何上浮！");
    };

    const runSort = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let tempArr = [...arr];
        let n = tempArr.length;
        let newSorted = [];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Visualize comparison
                setComparing([j, j + 1]);
                setMessage(`比较：${tempArr[j]} 和 ${tempArr[j + 1]}，${tempArr[j] > tempArr[j + 1] ? "前者大，交换！" : "顺序正确，通过"}`);
                await new Promise(r => setTimeout(r, 800));

                if (tempArr[j] > tempArr[j + 1]) {
                    // Swap
                    let temp = tempArr[j];
                    tempArr[j] = tempArr[j + 1];
                    tempArr[j + 1] = temp;
                    setArr([...tempArr]);
                    await new Promise(r => setTimeout(r, 600));
                }
            }
            // Mark end element as sorted
            newSorted.push(n - i - 1);
            setSorted([...newSorted]);
            setComparing([]);
        }
        setMessage("🎉 排序完成！就像气泡都浮到了水面上。");
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart2 className="text-orange-600" /> 冒泡排序 (Bubble Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[400px] flex flex-col items-center justify-end overflow-hidden">
                {/* Visualizer Area */}
                <div className="flex items-end gap-3 h-56 w-full justify-center px-4 relative z-10">
                    {arr.map((val, idx) => {
                        const isComparing = comparing.includes(idx);
                        const isSorted = sorted.includes(idx);
                        let bgClass = "bg-slate-400";
                        if (isComparing) bgClass = "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]";
                        if (isSorted) bgClass = "bg-green-500";

                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 transition-all duration-500 w-12">
                                <span className={`text-white font-bold text-sm ${isComparing ? 'scale-125 transition-transform' : ''}`}>{val}</span>
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-500 ${bgClass}`}
                                    style={{ height: `${val * 2}px` }}
                                >
                                    {isComparing && comparing.length === 2 && arr[idx] > arr[comparing[0] === idx ? comparing[1] : comparing[0]] && <div className="absolute inset-x-0 bottom-0 top-0 bg-white/20 animate-pulse"></div>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full max-w-lg mt-8 text-center relative z-10">
                    <p className="text-slate-300 font-mono text-lg min-h-[2rem] bg-slate-800/50 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                        {message}
                    </p>
                </div>

                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runSort}
                    disabled={isRunning || sorted.length === arr.length}
                    className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} /> {isRunning ? '排序中...' : '开始冒泡'}
                </button>
                <button
                    onClick={reset}
                    disabled={isRunning}
                    className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition flex items-center gap-2"
                >
                    <RotateCcw size={20} /> 重置
                </button>
            </div>
        </div>
    );
};

// 3. 寻找最小：选择排序可视化
const SelectionSortSlide = () => {
    const [arr, setArr] = useState([60, 20, 90, 10, 50, 80, 40, 70]);
    const [currentIndex, setCurrentIndex] = useState(null); // Current processed index
    const [minIndex, setMinIndex] = useState(null); // Found min index
    const [compareIndex, setCompareIndex] = useState(null); // Index being compared with min
    const [sortedIndex, setSortedIndex] = useState(-1); // Up to which index is sorted
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("准备开始选择排序...");

    const reset = () => {
        setArr([60, 20, 90, 10, 50, 80, 40, 70]);
        setCurrentIndex(null);
        setMinIndex(null);
        setCompareIndex(null);
        setSortedIndex(-1);
        setIsRunning(false);
        setMessage("点击开始按钮，寻找最小值！");
    };

    const runSort = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let tempArr = [...arr];
        let n = tempArr.length;

        for (let i = 0; i < n - 1; i++) {
            setCurrentIndex(i);
            setMessage(`第 ${i + 1} 轮：在剩余元素中寻找最小值，放到位置 ${i}`);

            let min_idx = i;
            setMinIndex(min_idx);

            for (let j = i + 1; j < n; j++) {
                setCompareIndex(j);
                setMessage(`比较：当前最小 ${tempArr[min_idx]} vs ${tempArr[j]}`);
                await new Promise(r => setTimeout(r, 600));

                if (tempArr[j] < tempArr[min_idx]) {
                    min_idx = j;
                    setMinIndex(min_idx);
                    setMessage(`发现更小的值：${tempArr[min_idx]}！更新标记。`);
                    await new Promise(r => setTimeout(r, 600));
                }
            }

            setCompareIndex(null);

            if (min_idx !== i) {
                setMessage(`交换：将 ${tempArr[min_idx]} 移到已排序区域末尾`);
                let temp = tempArr[min_idx];
                tempArr[min_idx] = tempArr[i];
                tempArr[i] = temp;
                setArr([...tempArr]);
                await new Promise(r => setTimeout(r, 800));
            } else {
                setMessage("当前位置已经是最小值，无需交换");
                await new Promise(r => setTimeout(r, 600));
            }

            setSortedIndex(i);
            setMinIndex(null);
        }
        setSortedIndex(n - 1);
        setMessage("🎉 排序完成！选择排序总是每次挑出最小的。");
        setCurrentIndex(null);
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Target className="text-purple-600" /> 选择排序 (Selection Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[400px] flex flex-col items-center justify-end overflow-hidden">
                <div className="flex items-end gap-3 h-56 w-full justify-center px-4 relative z-10">
                    {arr.map((val, idx) => {
                        const isSorted = idx <= sortedIndex;
                        const isMin = idx === minIndex;
                        const isComparing = idx === compareIndex;
                        const isCurrent = idx === currentIndex;

                        let bgClass = "bg-slate-400";
                        if (isSorted) bgClass = "bg-green-500";
                        else if (isMin) bgClass = "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)] z-20";
                        else if (isComparing) bgClass = "bg-yellow-400";

                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 transition-all duration-500 w-12 relative">
                                {isMin && <div className="absolute -top-8 text-purple-400 font-bold text-xs animate-bounce">MIN</div>}
                                {isCurrent && !isSorted && <div className="absolute -bottom-8 text-slate-400 font-mono text-xs">Pos</div>}

                                <span className={`text-white font-bold text-sm ${isMin || isComparing ? 'scale-125 transition-transform' : ''}`}>{val}</span>
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-500 ${bgClass}`}
                                    style={{ height: `${val * 2}px` }}
                                ></div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full max-w-lg mt-8 text-center relative z-10">
                    <p className="text-slate-300 font-mono text-lg min-h-[2rem] bg-slate-800/50 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                        {message}
                    </p>
                </div>
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 to-slate-900 pointer-events-none"></div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runSort}
                    disabled={isRunning || sortedIndex === arr.length - 1}
                    className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} /> {isRunning ? '搜索中...' : '开始选择'}
                </button>
                <button
                    onClick={reset}
                    disabled={isRunning}
                    className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition flex items-center gap-2"
                >
                    <RotateCcw size={20} /> 重置
                </button>
            </div>
        </div>
    );
};

// 4. 算法对决：冒泡 vs 选择
const AlgorithmBattleSlide = () => {
    const [bubbleStats, setBubbleStats] = useState({ swaps: 0, compares: 0, finished: false });
    const [selectStats, setSelectStats] = useState({ swaps: 0, compares: 0, finished: false });
    const [running, setRunning] = useState(false);

    // Bubble State
    const [bArr, setBArr] = useState([5, 3, 8, 4, 2]);
    // Selection State
    const [sArr, setSArr] = useState([5, 3, 8, 4, 2]);

    const runBattle = async () => {
        if (running) return;
        setRunning(true);
        setBubbleStats({ swaps: 0, compares: 0, finished: false });
        setSelectStats({ swaps: 0, compares: 0, finished: false });
        setBArr([5, 3, 8, 4, 2]);
        setSArr([5, 3, 8, 4, 2]);

        // Use a slight delay to let state reset
        await new Promise(r => setTimeout(r, 100));

        // Create detached promises for concurrent execution
        const bubbleTask = async () => {
            let arr = [5, 3, 8, 4, 2];
            let swaps = 0;
            let compares = 0;
            let n = arr.length;

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    compares++;
                    setBubbleStats(prev => ({ ...prev, compares }));
                    await new Promise(r => setTimeout(r, 400)); // Delay

                    if (arr[j] > arr[j + 1]) {
                        // Swap
                        let t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
                        swaps++;
                        setBubbleStats(prev => ({ ...prev, swaps }));
                        setBArr([...arr]);
                        await new Promise(r => setTimeout(r, 400)); // Swap delay
                    }
                }
            }
            setBubbleStats(prev => ({ ...prev, finished: true }));
        };

        const selectTask = async () => {
            let arr = [5, 3, 8, 4, 2];
            let swaps = 0;
            let compares = 0;
            let n = arr.length;

            for (let i = 0; i < n; i++) {
                let min_idx = i;
                for (let j = i + 1; j < n; j++) {
                    compares++;
                    setSelectStats(prev => ({ ...prev, compares }));
                    await new Promise(r => setTimeout(r, 200)); // Faster comparison
                    if (arr[j] < arr[min_idx]) {
                        min_idx = j;
                    }
                }

                if (min_idx !== i) {
                    let t = arr[i]; arr[i] = arr[min_idx]; arr[min_idx] = t;
                    swaps++;
                    setSelectStats(prev => ({ ...prev, swaps }));
                    setSArr([...arr]);
                    await new Promise(r => setTimeout(r, 600)); // Swap delay
                }
            }
            setSelectStats(prev => ({ ...prev, finished: true }));
        };

        await Promise.all([bubbleTask(), selectTask()]);
        setRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Zap className="text-red-600" /> 速度对决
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Bubble Card */}
                <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-orange-800 flex items-center gap-2">
                            <BarChart2 size={18} /> 冒泡排序
                        </h3>
                        {bubbleStats.finished && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">完成</span>}
                    </div>
                    <div className="flex items-end justify-center gap-2 h-32 mb-4">
                        {bArr.map((v, i) => (
                            <div key={i} className="w-8 bg-orange-500 rounded-t text-white flex items-end justify-center text-xs font-bold pb-1 transition-all" style={{ height: `${v * 12}px` }}>{v}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white p-2 rounded border border-orange-200 text-center">
                            <div className="text-xs text-slate-400">比较次数</div>
                            <div className="font-mono font-bold text-orange-600">{bubbleStats.compares}</div>
                        </div>
                        <div className="bg-white p-2 rounded border border-orange-200 text-center">
                            <div className="text-xs text-slate-400">交换次数</div>
                            <div className="font-mono font-bold text-orange-600">{bubbleStats.swaps}</div>
                        </div>
                    </div>
                </div>

                {/* Selection Card */}
                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-purple-800 flex items-center gap-2">
                            <Target size={18} /> 选择排序
                        </h3>
                        {selectStats.finished && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">完成</span>}
                    </div>
                    <div className="flex items-end justify-center gap-2 h-32 mb-4">
                        {sArr.map((v, i) => (
                            <div key={i} className="w-8 bg-purple-600 rounded-t text-white flex items-end justify-center text-xs font-bold pb-1 transition-all" style={{ height: `${v * 12}px` }}>{v}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white p-2 rounded border border-purple-200 text-center">
                            <div className="text-xs text-slate-400">比较次数</div>
                            <div className="font-mono font-bold text-purple-600">{selectStats.compares}</div>
                        </div>
                        <div className="bg-white p-2 rounded border border-purple-200 text-center">
                            <div className="text-xs text-slate-400">交换次数</div>
                            <div className="font-mono font-bold text-purple-600">{selectStats.swaps}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={runBattle}
                    disabled={running}
                    className="px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition shadow-xl"
                >
                    {running ? '比赛进行中...' : '开始对决'}
                </button>
                <p className="mt-4 text-slate-500 text-sm">
                    观察一下，哪边的<span className="font-bold text-slate-800">交换次数</span>更少？这在数据量大时非常关键！
                </p>
            </div>
        </div>
    );
};

// 3. 互动练习：我是排序大师
const HumanSortSlide = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, won
    const [difficulty, setDifficulty] = useState('easy');
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    // Difficulty configs
    const configs = {
        easy: { count: 5, label: '新手入门', color: 'bg-green-500', timeLimit: 30 },
        medium: { count: 8, label: '稍微加点难度', color: 'bg-orange-500', timeLimit: 45 },
        hard: { count: 12, label: '挑战极限', color: 'bg-red-500', timeLimit: 60 }
    };

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => setTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    const startGame = (diff) => {
        setDifficulty(diff);
        const count = configs[diff].count;
        const newItems = Array.from({ length: count }, () => Math.floor(Math.random() * 99) + 1);
        setItems(newItems);
        setMoves(0);
        setTime(0);
        setGameState('playing');
        setTimerActive(true);
        setSelected(null);
    };

    const handleSelect = (index) => {
        if (gameState !== 'playing') return;

        if (selected === null) {
            setSelected(index);
        } else {
            if (selected === index) {
                setSelected(null);
                return;
            }
            // Swap
            const newItems = [...items];
            [newItems[selected], newItems[index]] = [newItems[index], newItems[selected]];

            setItems(newItems);
            setSelected(null);
            setMoves(m => m + 1);

            // Check sorted
            const sorted = [...newItems].sort((a, b) => a - b);
            if (JSON.stringify(newItems) === JSON.stringify(sorted)) {
                setTimerActive(false);
                setGameState('won');
            }
        }
    };

    const getStars = () => {
        const { timeLimit, count } = configs[difficulty];
        // Simple heuristic for stars
        // 3 stars: time < limit && moves < count * 2
        // 2 stars: time < limit * 1.5
        // 1 star: finished
        if (time < timeLimit && moves < count * 2) return 3;
        if (time < timeLimit * 1.5) return 2;
        return 1;
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Gamepad2 className="text-orange-600" /> 挑战：排序大师
            </h2>

            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-xl min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden">

                {/* MENU STATE */}
                {gameState === 'menu' && (
                    <div className="text-center space-y-8 animate-in zoom-in duration-300 w-full max-w-2xl">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 mb-2">准备好了吗？</h3>
                            <p className="text-slate-500">选择一个难度开始挑战，用最少的步数完成排序！</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(configs).map(([key, cfg]) => (
                                <button
                                    key={key}
                                    onClick={() => startGame(key)}
                                    className={`relative overflow-hidden group p-6 rounded-2xl border-2 transition-all hover:-translate-y-2 hover:shadow-lg
                                        ${key === 'easy' ? 'border-green-100 bg-green-50 hover:border-green-300' : ''}
                                        ${key === 'medium' ? 'border-orange-100 bg-orange-50 hover:border-orange-300' : ''}
                                        ${key === 'hard' ? 'border-red-100 bg-red-50 hover:border-red-300' : ''}
                                    `}
                                >
                                    <h4 className={`text-xl font-bold mb-2
                                        ${key === 'easy' ? 'text-green-700' : ''}
                                        ${key === 'medium' ? 'text-orange-700' : ''}
                                        ${key === 'hard' ? 'text-red-700' : ''}
                                    `}>{cfg.label}</h4>
                                    <div className="text-slate-500 text-sm">{cfg.count} 个数字</div>
                                    <div className={`absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                        <Trophy size={48} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* PLAYING STATE */}
                {gameState === 'playing' && (
                    <div className="w-full flex flex-col h-full justify-between animate-in fade-in">
                        <div className="flex justify-between items-center mb-8 px-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-slate-600 font-bold">
                                    <Repeat size={18} />
                                    <span>{moves} 步</span>
                                </div>
                                <div className="bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 font-mono text-slate-600 font-bold">
                                    <Timer size={18} />
                                    <span>{time}s</span>
                                </div>
                            </div>
                            <button onClick={() => setGameState('menu')} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition">
                                <RotateCcw size={20} />
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
                                {items.map((val, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        className={`
                                            w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-xl md:text-2xl transition-all duration-300 flex items-center justify-center shadow-sm select-none
                                            ${selected === idx
                                                ? 'bg-blue-600 text-white -translate-y-4 shadow-xl shadow-blue-200 scale-110 z-10'
                                                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'}
                                        `}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* WON STATE */}
                {gameState === 'won' && (
                    <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center animate-in zoom-in duration-300 z-20">
                        <div className="relative mb-6">
                            <Trophy size={100} className="text-yellow-400 drop-shadow-xl animate-bounce" />
                            <div className="absolute -top-2 -right-2 flex">
                                {Array.from({ length: getStars() }).map((_, i) => (
                                    <Star key={i} size={32} className="text-yellow-500 fill-yellow-500 animate-[spin_1s_ease-out_1]" style={{ animationDelay: `${i * 0.2}s` }} />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-4xl font-black text-slate-800 mb-2">挑战成功！</h3>
                        <p className="text-slate-500 mb-8 text-lg">
                            耗时 <strong className="text-slate-800">{time}s</strong>，
                            用了 <strong className="text-slate-800">{moves}</strong> 步
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setGameState('menu')}
                                className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
                            >
                                返回菜单
                            </button>
                            <button
                                onClick={() => startGame(difficulty)}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                再玩一次
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 5. 真实应用：排序无处不在
const ApplicationSlide = () => {
    const apps = [
        { title: "电商价格排序", icon: "shopping", desc: "我们在淘宝/京东购物时，按'价格从低到高'排序，就是排序算法在帮忙！", color: "bg-orange-500" },
        { title: "游戏排行榜", icon: "trophy", desc: "王者荣耀的段位排名、巅峰赛分数，都需要实时排序来展示谁是第一。", color: "bg-yellow-500" },
        { title: "手机通讯录", icon: "smartphone", desc: "通讯录里成百上千个联系人，为什么能按 A-Z 快速找到？因为已经排好序了。", color: "bg-blue-500" },
        { title: "考场排名", icon: "chart", desc: "期末考试出分后，学校会按总分进行排名，老师用 Excel 点一下就排好了。", color: "bg-green-500" }
    ];

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Globe className="text-blue-600" /> 真实世界中的排序
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {apps.map((app, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex gap-4 items-start group hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-xl ${app.color} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                            {app.icon === 'shopping' && <ShoppingCart size={24} />}
                            {app.icon === 'trophy' && <Trophy size={24} />}
                            {app.icon === 'smartphone' && <Smartphone size={24} />}
                            {app.icon === 'chart' && <ListOrdered size={24} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">{app.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{app.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-center">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                    <Brain size={24} />
                </div>
                <p className="text-blue-800 text-sm font-medium">
                    思考一下：如果数据量特别大（比如 14 亿人口的身份证号），冒泡排序还管用吗？
                    <span className="block mt-1 text-blue-500 font-normal">提示：我们需要更高级的算法，比如快速排序 (Quick Sort) 或 归并排序 (Merge Sort)。</span>
                </p>
            </div>
        </div>
    );
};

// 6. 知识测验
const QuizSlide = () => {
    const questions = [
        {
            q: "冒泡排序每一轮结束后，哪个元素会确定在最终位置？",
            options: ["最小的", "最大的", "中间的", "随机的"],
            correct: 1,
            explain: "就像气泡上浮一样，最大的元素会'浮'到数组的最后面。"
        },
        {
            q: "如果有 5 个数字，最坏情况下冒泡排序需要比较多少次？",
            options: ["5次", "10次", "20次", "25次"],
            correct: 1,
            explain: "4+3+2+1 = 10次。通项公式是 n*(n-1)/2。"
        },
        {
            q: "选择排序的主要思想是什么？",
            options: ["相邻交换", "二分查找", "每次找最小的放到前面", "随机打乱"],
            correct: 2,
            explain: "选择排序每一轮都会在剩余元素中‘选择’一个最小的，放到已排序部分的末尾。"
        }
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (idx) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
        if (idx === questions[currentQ].correct) {
            setScore(s => s + 1);
        }
    };

    const nextQ = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            // End of quiz
            alert(`恭喜！你答对了 ${score + (selected === questions[currentQ].correct ? 0 : 0)} / ${questions.length} 道题！`); // Simple end for now
            setCurrentQ(0);
            setSelected(null);
            setShowResult(false);
            setScore(0);
        }
    };

    const q = questions[currentQ];

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle className="text-green-600" /> 知识对决
            </h2>

            <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-xl max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {currentQ + 1} of {questions.length}</span>
                    <div className="flex gap-1">
                        {questions.map((_, i) => (
                            <div key={i} className={`h-2 w-8 rounded-full transition-colors ${i <= currentQ ? 'bg-green-500' : 'bg-slate-100'}`}></div>
                        ))}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">{q.q}</h3>

                <div className="space-y-3">
                    {q.options.map((opt, idx) => {
                        let stateClass = "border-slate-200 hover:border-blue-400 hover:bg-slate-50";
                        if (showResult) {
                            if (idx === q.correct) stateClass = "border-green-500 bg-green-50 text-green-700 font-bold";
                            else if (idx === selected) stateClass = "border-red-300 bg-red-50 text-red-600";
                            else stateClass = "border-slate-100 text-slate-400";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${stateClass}`}
                            >
                                <span>{opt}</span>
                                {showResult && idx === q.correct && <CheckCircle size={20} className="text-green-600" />}
                                {showResult && idx === selected && idx !== q.correct && <X size={20} className="text-red-500" />}
                            </button>
                        );
                    })}
                </div>

                {showResult && (
                    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm mb-4 border border-slate-200">
                            <strong>解析：</strong> {q.explain}
                        </div>
                        <button onClick={nextQ} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition">
                            {currentQ < questions.length - 1 ? "下一题" : "重新挑战"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const CodeSlide = () => {
    const [activeTab, setActiveTab] = useState('bubble');

    const bubbleCode = `def bubble_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # 最后 i 个元素已经排好了
        for j in range(0, n-i-1):
            
            # 如果前面的比后面的大，就交换
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                
    return arr`;

    const selectionCode = `def selection_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        min_idx = i
        # 寻找[i+1, n]区间内的最小值
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                
        # 将找到的最小值交换到当前位置 i
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
    return arr`;

    return (
        <div className="slide-enter space-y-6 pb-20">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Code className="text-orange-600" /> 代码魔法书
            </h2>

            <div className="flex gap-4 border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('bubble')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'bubble' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    冒泡排序 (Bubble Sort)
                </button>
                <button
                    onClick={() => setActiveTab('selection')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'selection' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    选择排序 (Selection Sort)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                    <div className="flex items-center justify-between px-6 py-3 bg-slate-800 shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{activeTab === 'bubble' ? 'bubble_sort.py' : 'selection_sort.py'}</span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-auto text-slate-200 flex-1">
                        <code>{activeTab === 'bubble' ? bubbleCode : selectionCode}</code>
                    </pre>
                </div>

                <div className="space-y-4">
                    {activeTab === 'bubble' ? (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">外层循环 (i)</strong>
                                    控制轮数。每一轮结束，最大的那个气泡就浮到了最顶端（数组末尾）。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">内层循环 (j)</strong>
                                    负责比较和交换。注意范围是 <code className="bg-slate-100 px-1 rounded">n-i-1</code>，因为后面的已经排好了，不用再比。
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">核心思想</strong>
                                    每次从未排序的部分中找出<span className="text-purple-600 font-bold">最小值</span>，然后放到已排序部分的末尾。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">交换次数更少</strong>
                                    相比冒泡排序，选择排序每一轮最多只交换一次，因此在交换成本较高时更有优势。
                                </div>
                            </div>
                        </>
                    )}

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm mt-4">
                        <div className="flex items-center gap-2 mb-2 text-slate-800">
                            <Sparkles size={18} />
                            <h4 className="font-bold">小结</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            两种算法的时间复杂度都是 <span className="font-mono bg-white px-1 rounded border border-slate-200">O(n²)</span>，
                            适合数据量较小的情况（比如几千个以内）。数据量大时，我们会用更快的算法！
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 主布局 ---

const sections = [
    { id: 1, title: '秩序的意义', icon: 'brain', component: IntroSlide },
    { id: 2, title: '冒泡可视化', icon: 'chart', component: BubbleSortSlide },
    { id: 3, title: '选择排序', icon: 'target', component: SelectionSortSlide },
    { id: 4, title: '算法对决', icon: 'zap', component: AlgorithmBattleSlide },
    { id: 5, title: '代码魔法书', icon: 'code', component: CodeSlide },
    { id: 6, title: '真实应用', icon: 'layers', component: ApplicationSlide },
    { id: 7, title: '挑战：排序大师', icon: 'trophy', component: HumanSortSlide },
    { id: 8, title: '知识测验', icon: 'help', component: QuizSlide },
];

const PythonSortingProject = () => {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nextSection = () => {
        if (activeSection < sections.length) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

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

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                        <ArrowDown size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-800 leading-none">排序大师</h1>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Sorting Algorithms</p>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all flex items-center gap-4 font-bold
                                ${activeSection === section.id
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-100 scale-105'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                        >
                            <Icon name={section.icon} className={activeSection === section.id ? 'text-white' : 'text-slate-400'} />
                            {section.title}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-slate-50">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors text-sm font-bold">
                        <RotateCcw size={16} /> 返回课程中心
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 bg-slate-100 rounded-lg md:hidden"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">
                            {currentSection.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-600 transition-all duration-500"
                                style={{ width: `${(activeSection / sections.length) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                            {activeSection} / {sections.length}
                        </span>
                    </div>
                </header>

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        <currentSection.component />
                    </div>
                </main>

                {/* Footer Controls */}
                <footer className="h-24 bg-white border-t border-slate-200 px-8 flex items-center justify-between z-20">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                            ${activeSection === 1
                                ? 'text-slate-300'
                                : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一步
                    </button>

                    <button
                        onClick={nextSection}
                        disabled={activeSection === sections.length}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg
                            ${activeSection === sections.length
                                ? 'bg-slate-100 text-slate-400'
                                : 'bg-orange-600 text-white hover:bg-orange-700 hover:translate-x-1'}`}
                    >
                        {activeSection === sections.length ? '学习完成' : '下一步'}
                        <ArrowRight size={20} />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PythonSortingProject;
