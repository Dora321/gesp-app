import { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, BarChart2, Zap, ArrowDown, Repeat, Target, Rocket, GitMerge, Gamepad2, Timer, Star } from 'lucide-react';
import { Icon } from './sortingProjectBasicSlides';

export const AlgorithmBattleSlide = () => {
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

export const QuickSortSlide = () => {
    const [arr, setArr] = useState([50, 30, 80, 20, 90, 10, 60, 40]);
    const [pivotIdx, setPivotIdx] = useState(null);
    const [, setLeftPtr] = useState(null);
    const [rightPtr, setRightPtr] = useState(null);
    const [partitionRange, setPartitionRange] = useState([]); // [start, end]
    const [sorted, setSorted] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("快速排序：分而治之的艺术");

    const reset = () => {
        setArr([50, 30, 80, 20, 90, 10, 60, 40]);
        setPivotIdx(null);
        setLeftPtr(null);
        setRightPtr(null);
        setPartitionRange([]);
        setSorted([]);
        setIsRunning(false);
        setMessage("点击开始，见证最快排序算法之一！");
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const quickSort = async (currentArr, low, high) => {
        if (low < high) {
            setPartitionRange([low, high]);
            setMessage(`当前处理区间: [${low} - ${high}]`);
            await sleep(800);

            const pi = await partition(currentArr, low, high);

            setSorted(prev => [...prev, pi]);
            await Promise.all([
                quickSort(currentArr, low, pi - 1),
                quickSort(currentArr, pi + 1, high)
            ]);
        } else {
            if (low >= 0 && low < currentArr.length) setSorted(prev => [...prev, low]);
        }
    };

    const partition = async (currentArr, low, high) => {
        const pivot = currentArr[high];
        setPivotIdx(high);
        setMessage(`选定基准值 (Pivot): ${pivot}`);
        await sleep(800);

        let i = low - 1;

        for (let j = low; j < high; j++) {
            setLeftPtr(i + 1);
            setRightPtr(j);
            setMessage(`比较: ${currentArr[j]} vs 基准 ${pivot}`);
            await sleep(400);

            if (currentArr[j] < pivot) {
                i++;
                // Swap
                let temp = currentArr[i];
                currentArr[i] = currentArr[j];
                currentArr[j] = temp;
                setArr([...currentArr]);
                setMessage(`发现比基准小的值 ${temp}，交换到左边`);
                await sleep(600);
            }
        }

        let temp = currentArr[i + 1];
        currentArr[i + 1] = currentArr[high];
        currentArr[high] = temp;
        setArr([...currentArr]);
        setMessage(`基准值 ${pivot} 归位！`);
        setPivotIdx(i + 1);
        await sleep(800);

        return i + 1;
    };

    const runSort = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setSorted([]);
        let tempArr = [...arr];
        await quickSort(tempArr, 0, tempArr.length - 1);
        setSorted(tempArr.map((_, i) => i)); // Ensure all marked sorted
        setPartitionRange([]);
        setPivotIdx(null);
        setLeftPtr(null);
        setRightPtr(null);
        setMessage("🎉 排序完成！");
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Rocket className="text-red-500" /> 进阶：快速排序 (Quick Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[400px] flex flex-col items-center justify-end overflow-hidden">
                <div className="flex items-end gap-3 h-56 w-full justify-center px-4 relative z-10">
                    {arr.map((val, idx) => {
                        const isPivot = idx === pivotIdx;
                        const isRight = idx === rightPtr; // Scanning
                        const isInRange = partitionRange.length === 2 && idx >= partitionRange[0] && idx <= partitionRange[1];
                        const isSorted = sorted.includes(idx);

                        let bgClass = "bg-slate-400";
                        if (isSorted) bgClass = "bg-green-500";
                        else if (isPivot) bgClass = "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] z-20";
                        else if (isRight) bgClass = "bg-yellow-400";
                        else if (isInRange) bgClass = "bg-slate-300";

                        return (
                            <div key={idx} className={`flex flex-col items-center gap-2 transition-all duration-300 w-12 relative ${isInRange ? 'opacity-100' : 'opacity-40'}`}>
                                {isPivot && <div className="absolute -top-8 text-red-400 font-bold text-xs">Pivot</div>}
                                <span className={`text-white font-bold text-sm ${isPivot ? 'scale-125' : ''}`}>{val}</span>
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-300 ${bgClass}`}
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

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 to-slate-900 pointer-events-none"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <Zap size={16} /> 核心思想：分治法
                    </h4>
                    <p className="text-sm text-red-700">
                        随便找个“基准” (Pivot)，把比它小的扔左边，比它大的扔右边。然后对左右两边再做同样的事。
                    </p>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={runSort}
                        disabled={isRunning}
                        className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Play size={20} /> {isRunning ? '排序中...' : '开始快排'}
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
        </div>
    );
};

export const MergeSortSlide = () => {
    // Simplified visualization: Focus on the MERGE step of two sorted arrays
    const [leftArr, setLeftArr] = useState([2, 5, 8, 9]);
    const [rightArr, setRightArr] = useState([1, 4, 6, 7]);
    const [merged, setMerged] = useState([]);
    const [lIdx, setLIdx] = useState(0);
    const [rIdx, setRIdx] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("归并排序核心：合并两个有序数组");

    const reset = () => {
        setLeftArr([2, 5, 8, 9]);
        setRightArr([1, 4, 6, 7]);
        setMerged([]);
        setLIdx(0);
        setRIdx(0);
        setIsRunning(false);
        setMessage("点击开始，看两个小分队如何合并成一大队！");
    };

    const runMerge = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let l = 0, r = 0;
        let newMerged = [];

        while (l < leftArr.length && r < rightArr.length) {
            setMessage(`比较队头：左边 ${leftArr[l]} vs 右边 ${rightArr[r]}`);
            await new Promise(res => setTimeout(res, 800));

            if (leftArr[l] < rightArr[r]) {
                setMessage(`${leftArr[l]} 更小，掉落到底部`);
                newMerged.push(leftArr[l]);
                l++;
                setLIdx(l);
            } else {
                setMessage(`${rightArr[r]} 更小，掉落到底部`);
                newMerged.push(rightArr[r]);
                r++;
                setRIdx(r);
            }
            setMerged([...newMerged]);
            await new Promise(res => setTimeout(res, 600));
        }

        while (l < leftArr.length) {
            setMessage("右边空了，左边剩余的掉落");
            newMerged.push(leftArr[l]);
            l++;
            setLIdx(l);
            setMerged([...newMerged]);
            await new Promise(res => setTimeout(res, 300));
        }

        while (r < rightArr.length) {
            setMessage("左边空了，右边剩余的掉落");
            newMerged.push(rightArr[r]);
            r++;
            setRIdx(r);
            setMerged([...newMerged]);
            await new Promise(res => setTimeout(res, 300));
        }

        setMessage("🎉 合并完成！有序数组诞生了。");
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <GitMerge className="text-indigo-600" /> 归并排序 (Merge Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[500px] flex flex-col items-center justify-between overflow-hidden">

                {/* Source Arrays (Vertical Stacks) */}
                <div className="flex justify-center gap-24 w-full pt-4">
                    {/* Left Stack */}
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="absolute -top-8 p-2 bg-slate-800 rounded-lg border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wider">
                            LEFT TEAM
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700 min-w-[80px] flex flex-col gap-2">
                            {leftArr.map((v, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500
                                        ${i < lIdx
                                            ? 'translate-y-[200px] opacity-0 scale-50' /* Dropped items animation */
                                            : i === lIdx
                                                ? 'bg-indigo-500 text-white scale-110 shadow-indigo-500/50 z-10' /* Current head */
                                                : 'bg-slate-700 text-slate-400 scale-95' /* Waiting items */
                                        }
                                    `}
                                >
                                    {v}
                                </div>
                            ))}
                        </div>
                        <ArrowDown className="text-indigo-500/20 mt-2" />
                    </div>

                    {/* Right Stack */}
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className="absolute -top-8 p-2 bg-slate-800 rounded-lg border border-pink-500/30 text-pink-300 text-xs font-bold tracking-wider">
                            RIGHT TEAM
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700 min-w-[80px] flex flex-col gap-2">
                            {rightArr.map((v, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500
                                        ${i < rIdx
                                            ? 'translate-y-[200px] opacity-0 scale-50'
                                            : i === rIdx
                                                ? 'bg-pink-500 text-white scale-110 shadow-pink-500/50 z-10'
                                                : 'bg-slate-700 text-slate-400 scale-95'
                                        }
                                    `}
                                >
                                    {v}
                                </div>
                            ))}
                        </div>
                        <ArrowDown className="text-pink-500/20 mt-2" />
                    </div>
                </div>

                {/* Merged Result */}
                <div className="w-full max-w-3xl relative">
                    <div className="absolute inset-x-0 -top-12 flex justify-center text-slate-500 text-sm animate-pulse">
                        Checking: {lIdx < leftArr.length ? leftArr[lIdx] : 'End'} vs {rIdx < rightArr.length ? rightArr[rIdx] : 'End'}
                    </div>
                    <div className="bg-slate-800/80 p-4 rounded-2xl border-2 border-slate-700 min-h-[100px] flex items-center justify-center gap-3 shadow-inner">
                        {merged.map((v, i) => (
                            <div key={i} className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg animate-in zoom-in slide-in-from-top-10 duration-500 shadow-lg shadow-green-900/20">
                                {v}
                            </div>
                        ))}
                        {merged.length === 0 && <span className="text-slate-600 italic">Sorted items will drop here...</span>}
                    </div>
                </div>

                <div className="w-full max-w-lg text-center relative z-10 mt-4">
                    <p className="text-slate-300 font-mono text-sm min-h-[2rem] bg-slate-800/50 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runMerge}
                    disabled={isRunning || merged.length === leftArr.length + rightArr.length}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} />Start Merge
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

export const HumanSortSlide = () => {
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
