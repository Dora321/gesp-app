import React, { useState, useEffect } from 'react';
import {
    ArrowUp, Play, RotateCcw, HelpCircle,
    Trophy, Code, ArrowRight, Sparkles,
    BarChart2, Layers, Brain, ChevronRight,
    Zap, Menu, X, ArrowDown, Repeat,
    CheckCircle, StopCircle, Smartphone, Globe, Target, Rocket, GitMerge,
    ShoppingCart, Gamepad2, ListOrdered, Timer, Star, Dices, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell from '../shell/PythonLessonShell';

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
        arrowUp: <ArrowUp size={size} />,
        target: <Target size={size} />,
        globe: <Globe size={size} />,
        rocket: <Rocket size={size} />,
        merge: <GitMerge size={size} />,
        insertion: <ArrowRight size={size} />,
        dice: <Dices size={size} />,
        heap: <Share2 size={size} />
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

// 4. 插队专家：插入排序
const InsertionSortSlide = () => {
    const [arr, setArr] = useState([5, 3, 8, 4, 6]);
    const [currentIndex, setCurrentIndex] = useState(null); // The card we are holding
    const [compareIndex, setCompareIndex] = useState(null); // The card we are comparing with
    const [sortedIndex, setSortedIndex] = useState(0); // Elements 0 to sortedIndex are "sorted"
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("准备开始插入排序...");

    const reset = () => {
        setArr([5, 3, 8, 4, 6]);
        setCurrentIndex(null);
        setCompareIndex(null);
        setSortedIndex(0);
        setIsRunning(false);
        setMessage("想象你在打扑克牌，摸一张牌插到正确位置！");
    };

    const runSort = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let tempArr = [...arr];

        for (let i = 1; i < tempArr.length; i++) {
            let key = tempArr[i];
            setCurrentIndex(i);
            setMessage(`摸到了新牌：${key}，准备插入左边的有序手牌`);
            await new Promise(r => setTimeout(r, 800));

            let j = i - 1;
            while (j >= 0) {
                setCompareIndex(j);
                setMessage(`比较：${key} vs ${tempArr[j]}`);
                await new Promise(r => setTimeout(r, 600));

                if (tempArr[j] > key) {
                    setMessage(`${tempArr[j]} 比 ${key} 大，向后移动一格`);
                    tempArr[j + 1] = tempArr[j]; // Shift
                    // Visually reflect the shift (duplicate for a moment)
                    setArr([...tempArr]);
                    await new Promise(r => setTimeout(r, 600));
                    j = j - 1;
                } else {
                    setMessage("找到比它小的牌了，就插在它后面！");
                    break;
                }
            }
            tempArr[j + 1] = key;
            setArr([...tempArr]);
            setSortedIndex(i);
            setCurrentIndex(null);
            setCompareIndex(null);
            await new Promise(r => setTimeout(r, 600));
        }

        setMessage("🎉 牌都理好了！插入排序在数据几乎有序时超级快。");
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <ArrowRight className="text-blue-500" /> 插入排序 (Insertion Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[400px] flex flex-col items-center justify-end overflow-hidden">
                <div className="flex items-end gap-3 h-56 w-full justify-center px-4 relative z-10">
                    {arr.map((val, idx) => {
                        const isSortedArea = idx <= sortedIndex;
                        const isCurrent = idx === currentIndex; // The 'key' initially
                        const isComparing = idx === compareIndex;

                        let bgClass = "bg-slate-400";
                        if (isSortedArea) bgClass = "bg-green-600";
                        if (isComparing) bgClass = "bg-yellow-400";
                        // If it's the exact position we just shifted into, maybe highlight?

                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 transition-all duration-300 w-12 relative">
                                {isCurrent && <div className="absolute -top-10 text-blue-400 font-bold text-xs animate-bounce">Key</div>}
                                <span className={`text-white font-bold text-sm ${isCurrent ? 'text-blue-300 scale-125' : ''}`}>{val}</span>
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-300 ${bgClass} ${isCurrent ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] z-20 translate-y-[-10px]' : ''}`}
                                    style={{ height: `${val * 12}px` }}
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
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runSort}
                    disabled={isRunning || sortedIndex === arr.length - 1}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} /> {isRunning ? '整理手牌...' : '开始插入'}
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

// 7. 堆排序：二叉树的力量
const HeapSortSlide = () => {
    // Array of 7 elements (perfect binary tree for easy visualization)
    // Indices:
    //      0
    //    1   2
    //   3 4 5 6
    const [arr, setArr] = useState([4, 10, 3, 5, 1, 2, 8]);
    const [activeIndices, setActiveIndices] = useState([]); // indices being compared/swapped
    const [sortedCount, setSortedCount] = useState(0); // number of elements sorted (at the end)
    const [heapSize, setHeapSize] = useState(7);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("堆排序：利用完全二叉树(最大堆)来排序");

    const reset = () => {
        setArr([4, 10, 3, 5, 1, 2, 8]);
        setActiveIndices([]);
        setSortedCount(0);
        setHeapSize(7);
        setIsRunning(false);
        setMessage("点击开始，见证堆的魔法！");
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const runHeapSort = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let tempArr = [...arr];
        let n = tempArr.length;

        setMessage("第一阶段：构建最大堆 (Build Max Heap)");
        await sleep(1000);

        // Build heap (rearrange array)
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(tempArr, n, i);
        }

        setMessage("最大堆构建完成！根节点(Top)是最大的。");
        await sleep(1000);

        // One by one extract an element from heap
        for (let i = n - 1; i > 0; i--) {
            setMessage(`将最大值 ${tempArr[0]} 与末尾 ${tempArr[i]} 交换`);
            setActiveIndices([0, i]);
            await sleep(800);

            // Move current root to end
            [tempArr[0], tempArr[i]] = [tempArr[i], tempArr[0]];
            setArr([...tempArr]);
            setSortedCount(n - i); // Now n-i elements are sorted at the end
            setHeapSize(i); // Reduce heap size
            await sleep(800);

            setMessage(`剩余元素重新调整为最大堆...`);
            // call max heapify on the reduced heap
            await heapify(tempArr, i, 0);
        }

        setSortedCount(n);
        setHeapSize(0);
        setMessage("🎉 堆排序完成！利用树形结构高效筛选最大值。");
        setIsRunning(false);
        setActiveIndices([]);
    };

    // To heapify a subtree rooted with node i which is an index in arr[]. n is size of heap
    const heapify = async (tempArr, n, i) => {
        let largest = i; // Initialize largest as root
        let l = 2 * i + 1; // left = 2*i + 1
        let r = 2 * i + 2; // right = 2*i + 2

        setActiveIndices([i]);
        // setMessage(`Checking node ${tempArr[i]}`);
        await sleep(400);

        // If left child is larger than root
        if (l < n) {
            setActiveIndices([i, l]);
            if (tempArr[l] > tempArr[largest]) {
                largest = l;
            }
            await sleep(400);
        }

        // If right child is larger than largest so far
        if (r < n) {
            setActiveIndices([i, r]); // simplified visual
            if (tempArr[r] > tempArr[largest]) {
                largest = r;
            }
            await sleep(400);
        }

        // If largest is not root
        if (largest !== i) {
            setMessage(`交换：${tempArr[i]} < ${tempArr[largest]}，为了维持最大堆性质`);
            setActiveIndices([i, largest]);
            await sleep(600);

            [tempArr[i], tempArr[largest]] = [tempArr[largest], tempArr[i]];
            setArr([...tempArr]);
            await sleep(600);

            // Recursively heapify the affected sub-tree
            await heapify(tempArr, n, largest);
        }
    };

    // Helper to render tree nodes with lines
    // Layout for 7 nodes:
    // L1: 50% (idx 0)
    // L2: 25% (1), 75% (2)
    // L3: 12.5% (3), 37.5% (4), 62.5% (5), 87.5% (6)

    // Positions (percent left, top px)
    const positions = [
        { left: '50%', top: '10%' },
        { left: '25%', top: '40%' }, { left: '75%', top: '40%' },
        { left: '12.5%', top: '70%' }, { left: '37.5%', top: '70%' }, { left: '62.5%', top: '70%' }, { left: '87.5%', top: '70%' }
    ];

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Share2 className="text-cyan-600" /> 堆排序 (Heap Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[500px] flex flex-col items-center justify-between overflow-hidden">

                {/* Tree Visualization */}
                <div className="w-full h-[300px] relative mt-4">
                    {/* Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-600 stroke-2">
                        {/* 0 -> 1, 2 */}
                        <line x1="50%" y1="15%" x2="25%" y2="45%" />
                        <line x1="50%" y1="15%" x2="75%" y2="45%" />
                        {/* 1 -> 3, 4 */}
                        <line x1="25%" y1="45%" x2="12.5%" y2="75%" />
                        <line x1="25%" y1="45%" x2="37.5%" y2="75%" />
                        {/* 2 -> 5, 6 */}
                        <line x1="75%" y1="45%" x2="62.5%" y2="75%" />
                        <line x1="75%" y1="45%" x2="87.5%" y2="75%" />
                    </svg>

                    {/* Nodes */}
                    {arr.map((val, idx) => {
                        if (idx >= 7) return null; // Safety
                        const pos = positions[idx];
                        const isActive = activeIndices.includes(idx);
                        const isSorted = idx >= arr.length - sortedCount;
                        const isHeap = idx < heapSize;

                        let bg = "bg-slate-700";
                        let scale = "scale-100";

                        if (isSorted) bg = "bg-green-600";
                        else if (isActive) { bg = "bg-yellow-500 scale-125 z-10 text-black"; }
                        else if (isHeap) bg = "bg-cyan-600";

                        return (
                            <div
                                key={idx}
                                className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-xl border-4 border-slate-800 transition-all duration-300 ${bg} ${scale}`}
                                style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                            >
                                {val}
                            </div>
                        );
                    })}
                </div>

                {/* Array Visualization */}
                <div className="flex gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    {arr.map((val, idx) => (
                        <div
                            key={idx}
                            className={`w-10 h-10 rounded flex items-center justify-center font-mono font-bold text-sm transition-all ${idx >= arr.length - sortedCount ? 'bg-green-600 text-white' :
                                activeIndices.includes(idx) ? 'bg-yellow-500 text-black scale-110' :
                                    'bg-cyan-900 text-cyan-200'
                                }`}
                        >
                            {val}
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-lg text-center relative z-10 mt-6">
                    <p className="text-slate-300 font-mono text-lg min-h-[2rem] bg-slate-800/50 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runHeapSort}
                    disabled={isRunning || sortedCount === arr.length}
                    className="px-8 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg shadow-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} /> 构建与排序
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

// 8. 基数排序：数字分桶
const RadixSortSlide = () => {
    // Initial numbers
    const initialArr = [170, 45, 75, 90, 802, 24, 2, 66];
    const [arr, setArr] = useState(initialArr);
    const [buckets, setBuckets] = useState(Array.from({ length: 10 }, () => []));
    const [currentDigit, setCurrentDigit] = useState(null); // 1, 10, 100
    const [isCollecting, setIsCollecting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("基数排序：按个位、十位、百位依次整理");

    const reset = () => {
        setArr(initialArr);
        setBuckets(Array.from({ length: 10 }, () => []));
        setCurrentDigit(null);
        setIsCollecting(false);
        setIsRunning(false);
        setMessage("让我们像整理文件一样整理数字！");
    };

    const runRadix = async () => {
        if (isRunning) return;
        setIsRunning(true);
        let tempArr = [...arr];
        const maxNum = Math.max(...tempArr);
        let exp = 1; // 1, 10, 100...

        while (maxNum / exp >= 1) {
            setCurrentDigit(exp);
            setMessage(`现在关注：${exp === 1 ? '个位' : exp === 10 ? '十位' : '百位'}`);
            await new Promise(r => setTimeout(r, 1000));

            // Distribute to buckets
            let newBuckets = Array.from({ length: 10 }, () => []);
            for (let i = 0; i < tempArr.length; i++) {
                const num = tempArr[i];
                const digit = Math.floor((num / exp) % 10);
                newBuckets[digit].push(num);
                setBuckets([...newBuckets]);
                setMessage(`将 ${num} 放入 ${digit} 号桶`);
                await new Promise(r => setTimeout(r, 400));
            }

            // Visually clear main array while in buckets
            // setArr([]); 
            // In a real animation we might hide them, but keeping them visible is fine or we can gray them out.
            // Let's just pause to show the buckets full.
            setMessage("所有数字已入桶，准备按顺序收回...");
            setIsCollecting(true);
            await new Promise(r => setTimeout(r, 1000));

            // Collect
            tempArr = [];
            for (let i = 0; i < 10; i++) {
                if (newBuckets[i].length > 0) {
                    tempArr.push(...newBuckets[i]);
                    // Animate collection? easier to just snap for now to save complexity
                }
            }
            setArr([...tempArr]);
            setBuckets(Array.from({ length: 10 }, () => []));
            setIsCollecting(false);
            setMessage("一轮整理完成！");
            await new Promise(r => setTimeout(r, 1000));

            exp *= 10;
        }

        setMessage("🎉 排序完成！这就是不动用比较的魔法。");
        setCurrentDigit(null);
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Layers className="text-purple-600" /> 基数排序 (Radix Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[500px] flex flex-col items-center justify-between overflow-hidden">

                {/* Main Array Display */}
                <div className="flex flex-wrap justify-center gap-3 w-full mb-8">
                    {arr.map((val, idx) => {
                        let digitStr = String(val);

                        return (
                            <div key={idx} className={`bg-slate-700 px-4 py-3 rounded-lg text-xl font-mono font-bold text-white transition-all ${isCollecting ? 'opacity-30' : 'opacity-100'}`}>
                                {digitStr.split('').map((char, charIdx) => {
                                    // Adjust index logic because loop is simple string
                                    // If currentDigit is 10 (2nd from right), we need to match that.
                                    let isTarget = false;
                                    if (currentDigit === 1 && charIdx === digitStr.length - 1) isTarget = true;
                                    if (currentDigit === 10 && charIdx === digitStr.length - 2) isTarget = true;
                                    if (currentDigit === 100 && charIdx === digitStr.length - 3) isTarget = true;
                                    // Handle leading implicit zeros if needed? No, input numbers are simple.

                                    return (
                                        <span key={charIdx} className={isTarget ? 'text-yellow-400 scale-125 inline-block' : 'text-slate-400'}>
                                            {char}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Buckets */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 w-full">
                    {buckets.map((bucket, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <div className="text-slate-500 text-center text-xs uppercase font-bold mb-1">Bucket {idx}</div>
                            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl min-h-[150px] flex flex-col-reverse items-center p-2 gap-1 relative">
                                {bucket.map((val, bIdx) => (
                                    <div key={bIdx} className="bg-purple-600 text-white text-xs py-1 px-2 rounded w-full text-center animate-in slide-in-from-top-4 fade-in">
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-lg text-center relative z-10 mt-6">
                    <p className="text-slate-300 font-mono text-lg min-h-[2rem] bg-slate-800/50 py-2 rounded-xl backdrop-blur-sm border border-slate-700">
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={runRadix}
                    disabled={isRunning}
                    className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Play size={20} /> 启动基数分类
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

// 5. 算法对决：冒泡 vs 选择
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

// 5. 进阶挑战：快速排序
const QuickSortSlide = () => {
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

// 6. 归并排序：团队合作
const MergeSortSlide = () => {
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

// 10. 猴子排序：看运气
const BogoSortSlide = () => {
    const [arr, setArr] = useState([3, 1, 4, 2]);
    const [attempts, setAttempts] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [message, setMessage] = useState("猴子排序：全靠运气乱扔！");

    const checkSorted = (currentArr) => {
        for (let i = 0; i < currentArr.length - 1; i++) {
            if (currentArr[i] > currentArr[i + 1]) return false;
        }
        return true;
    };

    const shuffle = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setIsSorted(false);
        setAttempts(0);

        let count = 0;
        let sorted = false;
        let currentArr = [...arr];

        // Let's limit it to avoid crashing the browser if they are super unlucky, 
        // though n=4 is small enough (24 permutations).
        while (!sorted && count < 100) {
            count++;
            setAttempts(count);

            // Fisher-Yates shuffle
            for (let i = currentArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [currentArr[i], currentArr[j]] = [currentArr[j], currentArr[i]];
            }

            setArr([...currentArr]);

            // Check
            if (checkSorted(currentArr)) {
                sorted = true;
                setIsSorted(true);
                setMessage("🎉 哇！猴子运气爆棚，排好了！");
                break;
            }

            setMessage(`第 ${count} 次尝试：乱序中...`);
            await new Promise(r => setTimeout(r, 100)); // Fast shuffle
        }

        if (!sorted) {
            setMessage("猴子累了... 点我再试一次！");
        }
        setIsRunning(false);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Dices className="text-pink-500" /> 猴子排序 (Bogo Sort)
            </h2>

            <div className="bg-slate-900 rounded-3xl p-8 relative min-h-[400px] flex flex-col items-center justify-center overflow-hidden gap-8">

                <div className="flex gap-4">
                    {arr.map((val, idx) => (
                        <div key={idx} className={`w-20 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold transition-all duration-100 ${isSorted ? 'bg-green-500 text-white scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)]' : 'bg-slate-700 text-slate-400'}`}>
                            {val}
                        </div>
                    ))}
                </div>

                <div className="text-center space-y-2">
                    <div className="text-6xl font-black text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
                        {attempts}
                    </div>
                    <div className="text-slate-500 font-mono text-sm uppercase tracking-widest">Attempts</div>
                </div>

                <div className="w-full max-w-lg text-center relative z-10">
                    <p className={`font-mono text-lg min-h-[2rem] py-2 rounded-xl backdrop-blur-sm px-4 inline-block ${isSorted ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-800/50 text-slate-300 border border-slate-700'}`}>
                        {message}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={shuffle}
                    disabled={isRunning || isSorted}
                    className="px-8 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Dices size={20} /> 派猴子来扔
                </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-4 items-start">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 shrink-0">
                    <Zap size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-yellow-800">为什么要学这个？</h4>
                    <p className="text-yellow-700 text-sm">
                        虽然它很傻，但它告诉我们：<br />
                        1. <strong>依靠运气是不可靠的</strong>。<br />
                        2. <strong>O(n!)</strong> 的时间复杂度有多可怕（如果用一副扑克牌玩这个，宇宙毁灭了都不一定能排好）。
                    </p>
                </div>
            </div>
        </div>
    );
};

// 11. 知识测验
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

    const insertionCode = `def insertion_sort(arr):
    # 从第二个元素开始遍历
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # 将选中的元素(key)与已排序部分的元素比较
        # 如果比key大，就向后移一位
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
            
        # 找到合适位置，插入key
        arr[j + 1] = key
        
    return arr`;

    const mergeCode = `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    # 分(Divide)
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # 治(Conquer): 合并两个有序数组
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`;

    const quickCode = `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]  # 选中间的为基准
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`;

    const heapCode = `def heap_sort(arr):
    n = len(arr)

    # 1. 构建最大堆
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # 2. 一个个取出元素
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # 交换
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n and arr[l] > arr[largest]:
        largest = l

    if r < n and arr[r] > arr[largest]:
        largest = r

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`;

    const radixCode = `def radix_sort(arr):
    # 找到最大数，确定最大位数
    max_num = max(arr)
    exp = 1
    
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    # 统计每个桶里的个数
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
        
    for i in range(1, 10):
        count[i] += count[i - 1]
        
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
        
    for i in range(n):
        arr[i] = output[i]`;

    const bogoCode = `import random

def bogo_sort(arr):
    # 只要没排好序，就一直洗牌
    while not is_sorted(arr):
        random.shuffle(arr)
    return arr

def is_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i+1]:
            return False
    return True`;

    const getCode = () => {
        switch (activeTab) {
            case 'bubble': return bubbleCode;
            case 'selection': return selectionCode;
            case 'insertion': return insertionCode;
            case 'merge': return mergeCode;
            case 'quick': return quickCode;
            case 'heap': return heapCode;
            case 'radix': return radixCode;
            case 'bogo': return bogoCode;
            default: return bubbleCode;
        }
    }

    return (
        <div className="slide-enter space-y-6 pb-20">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Code className="text-orange-600" /> 代码魔法书
            </h2>

            <div className="flex gap-4 border-b border-slate-200 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab('bubble')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'bubble' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    冒泡排序
                </button>
                <button
                    onClick={() => setActiveTab('selection')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'selection' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    选择排序
                </button>
                <button
                    onClick={() => setActiveTab('insertion')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'insertion' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    插入排序
                </button>
                <button
                    onClick={() => setActiveTab('merge')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'merge' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    归并排序
                </button>
                <button
                    onClick={() => setActiveTab('quick')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'quick' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    快速排序
                </button>
                <button
                    onClick={() => setActiveTab('heap')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'heap' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    堆排序
                </button>
                <button
                    onClick={() => setActiveTab('radix')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'radix' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    基数排序
                </button>
                <button
                    onClick={() => setActiveTab('bogo')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${activeTab === 'bogo' ? 'border-pink-500 text-pink-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                    猴子排序
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
                        <span className="text-xs text-slate-400 font-mono">
                            {activeTab}_sort.py
                        </span>
                    </div>
                    <pre className="p-6 text-sm font-mono leading-relaxed overflow-auto text-slate-200 flex-1">
                        <code>{getCode()}</code>
                    </pre>
                </div>

                <div className="space-y-4">
                    {activeTab === 'bubble' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">外层循环 (i)</strong>
                                    控制轮数。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">内层循环 (j)</strong>
                                    负责比较和交换。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'selection' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">寻找最小值</strong>
                                    遍历剩余部分，找到最小的那个数的索引。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">只交换一次</strong>
                                    每轮循环结束后，只把找到的最小值和当前位置交换一次。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'insertion' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">模拟插牌</strong>
                                    <code className="bg-slate-100 px-1 rounded">while</code> 循环负责把比当前牌大的牌都往后挪。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">优势</strong>
                                    如果数组本来就基本有序，它跑得非常快！
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'merge' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">分与治</strong>
                                    先对半拆分，再有序合并。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'quick' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">递归</strong>
                                    Pivot左右两侧分别递归排序。
                                    <strong className="block text-slate-800 mb-1">基准值 (Pivot)</strong>
                                    选一个数做标尺，比它小的放左边，比它大的放右边。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">递归 (Recursion)</strong>
                                    对自己调用自己！对左边和右边的小数组继续重复这个过程。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'heap' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">最大堆 (Max Heap)</strong>
                                    完全二叉树，父节点总是大于子节点。根节点就是当前最大值。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">堆化 (Heapify)</strong>
                                    取出根节点后，把末尾元素放到顶端，然后慢慢“下沉”到正确位置。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'radix' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">非比较排序</strong>
                                    它不比较谁大谁小，而是把数字放进 0-9 个桶里。
                                </div>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold">2</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">按位处理</strong>
                                    先排个位，再排十位... 就像整理扑克牌的花色和点数。
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'bogo' && (
                        <>
                            <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center shrink-0 font-bold">1</div>
                                <div className="text-slate-600 text-sm">
                                    <strong className="block text-slate-800 mb-1">无限猴子定理</strong>
                                    如果有无限的时间，一只猴子总能敲出《莎士比亚》。这里它总能洗出有序数组。
                                </div>
                            </div>
                        </>
                    )}

                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 shadow-sm mt-4">
                        <div className="flex items-center gap-2 mb-2 text-slate-800">
                            <Sparkles size={18} />
                            <h4 className="font-bold">更多知识</h4>
                        </div>
                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                            <li><strong className="text-orange-600">冒泡/选择/插入</strong>: O(n²) - 适合小数据</li>
                            <li><strong className="text-green-600">归并/快速</strong>: O(n log n) - 适合大数据，速度快！</li>
                            <li><strong>基数排序</strong>: O(nk) - 当数字范围不大时，比快速排序还快！</li>
                            <li><strong>猴子排序</strong>: O(n⋅n!) - 纯属娱乐，请勿模仿。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 主布局 ---

const sections = [
    { id: 1, title: '秩序的意义', category: '为什么排序', icon: Brain, component: IntroSlide },
    { id: 2, title: '冒泡可视化', category: '相邻交换', icon: BarChart2, component: BubbleSortSlide },
    { id: 3, title: '选择排序', category: '每轮选最小', icon: Target, component: SelectionSortSlide },
    { id: 4, title: '插入排序', category: '插到合适位', icon: ArrowRight, component: InsertionSortSlide },
    { id: 5, title: '算法对决', category: '速度对比', icon: Zap, component: AlgorithmBattleSlide },
    { id: 6, title: '归并排序', category: '分治合并', icon: GitMerge, component: MergeSortSlide },
    { id: 7, title: '堆排序', category: '堆结构', icon: Share2, component: HeapSortSlide },
    { id: 8, title: '快速排序', category: '基准划分', icon: Rocket, component: QuickSortSlide },
    { id: 9, title: '基数排序', category: '按位分桶', icon: Layers, component: RadixSortSlide },
    { id: 10, title: '代码魔法书', category: 'Python 实现', icon: Code, component: CodeSlide },
    { id: 11, title: '猴子排序(彩蛋)', category: '反面教材', icon: Dices, component: BogoSortSlide },
    { id: 12, title: '真实应用', category: '生活中的排序', icon: Globe, component: ApplicationSlide },
    { id: 13, title: '挑战：排序大师', category: '动手闯关', icon: Trophy, component: HumanSortSlide },
    { id: 14, title: '知识测验', category: '复盘', icon: HelpCircle, component: QuizSlide },
];

export default function PythonSortingProject() {
    return (
        <>
            <style>{`
                .slide-enter { animation: slideIn 0.4s ease-out; }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <PythonLessonShell
                eyebrow="PYTHON 项目"
                lessonCode="A3"
                lessonTitle="排序算法项目"
                lessonSubtitle="看清每种排序怎么动"
                accent="blue"
                hero={{
                    title: '把"乱"变成"有序"的几种思路',
                    description: '从冒泡到快排，用可视化看清每种排序每一步在做什么，并比较它们的快慢——排序是算法线的集大成项目。',
                }}
                sections={sections}
                previousPath="/python/binary-search"
                nextPath="/python/encryption"
                nextLabel="下一个：A4 加密解密"
                topSupport={<PythonProjectSupport projectId="sorting" />}
                bottomSupport={<PythonProjectSupport projectId="sorting" placement="bottom" />}
            />
        </>
    );
}

