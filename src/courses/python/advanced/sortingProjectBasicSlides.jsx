import { useState } from 'react';
import { ArrowUp, Play, RotateCcw, HelpCircle, Trophy, Code, ArrowRight, BarChart2, Layers, Brain, Zap, Menu, Globe, Target, Rocket, GitMerge, Dices, Share2 } from 'lucide-react';
import PyCodeTracer from '../../../components/PyCodeTracer';
import { bubbleTraceCode, bubbleTraceSteps } from './sortingProjectData';

export const Icon = ({ name, size = 20, className = "" }) => {
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

export const IntroSlide = () => (
    <div className="slide-enter space-y-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-white shadow-2xl sm:p-10">
            <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md sm:h-24 sm:w-24">
                    <Layers size={48} className="text-yellow-300" />
                </div>
                <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">秩序之美：排序算法</h2>
                <p className="max-w-2xl text-base leading-relaxed opacity-90 sm:text-xl">
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

export const BubbleSortTraceCard = () => (
    <PyCodeTracer
        title="Python 冒泡追踪器：相邻比较，右侧逐轮归位"
        code={bubbleTraceCode}
        varOrder={['i', 'j', 'numbers']}
        columns={['阶段', 'i', 'j', '当前内容', '动作']}
        steps={bubbleTraceSteps}
        hint="先看一轮：只比较相邻两个位置；每一轮结束，右侧会确定一个最大值。"
    />
);

export const BubbleSortSlide = () => {
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

            <BubbleSortTraceCard />
        </div>
    );
};

export const SelectionSortSlide = () => {
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

export const InsertionSortSlide = () => {
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

export const HeapSortSlide = () => {
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

export const RadixSortSlide = () => {
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
