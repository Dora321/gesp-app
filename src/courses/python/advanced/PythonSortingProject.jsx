import React, { useState, useEffect, useCallback } from 'react';
import {
    ArrowUp, Play, RotateCcw, HelpCircle,
    Trophy, Code, ArrowRight, Sparkles,
    BarChart2, Layers, Brain, ChevronRight,
    Zap, Menu, X, ArrowDown, Repeat
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

// 3. 互动练习：我是排序大师
const HumanSortSlide = () => {
    const [items, setItems] = useState([45, 12, 89, 34, 67]);
    const [selected, setSelected] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [moves, setMoves] = useState(0);

    const handleSelect = (index) => {
        if (isComplete) return;

        if (selected === null) {
            setSelected(index);
        } else {
            if (selected === index) {
                setSelected(null); // Deselect
                return;
            }
            // Swap
            const newItems = [...items];
            const temp = newItems[selected];
            newItems[selected] = newItems[index];
            newItems[index] = temp;

            setItems(newItems);
            setSelected(null);
            setMoves(m => m + 1);

            // Check if sorted
            const sortedItems = [...newItems].sort((a, b) => a - b);
            if (JSON.stringify(newItems) === JSON.stringify(sortedItems)) {
                setIsComplete(true);
            }
        }
    };

    const resetGame = () => {
        setItems([...items].sort(() => Math.random() - 0.5));
        setSelected(null);
        setIsComplete(false);
        setMoves(0);
    };

    return (
        <div className="slide-enter space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Zap className="text-orange-600" /> 挑战：手动排序
            </h2>

            <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center mb-10">
                    <p className="text-slate-600 mb-2">点击两个方块来交换它们的位置，直到从小到大排列。</p>
                    <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-slate-500 font-mono text-sm">
                        步数: {moves}
                    </div>
                </div>

                <div className="flex gap-4 mb-12">
                    {items.map((val, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`
                                w-16 h-16 rounded-2xl font-bold text-2xl transition-all duration-300 flex items-center justify-center shadow-lg
                                ${selected === idx
                                    ? 'bg-orange-500 text-white -translate-y-4 shadow-orange-300 ring-4 ring-orange-200'
                                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-500'}
                                ${isComplete ? 'bg-green-500 text-white border-green-500 animate-[bounce_0.5s_ease-in-out]' : ''}
                            `}
                        >
                            {val}
                        </button>
                    ))}
                </div>

                {isComplete && (
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center animate-in fade-in z-20">
                        <Trophy size={80} className="text-yellow-500 mb-4 animate-bounce" />
                        <h3 className="text-3xl font-black text-slate-800 mb-2">挑战成功！</h3>
                        <p className="text-slate-600 mb-6">你用了 {moves} 步完成了排序。</p>
                        <button
                            onClick={resetGame}
                            className="px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition"
                        >
                            再玩一次
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 4. 代码解析
const CodeSlide = () => (
    <div className="slide-enter space-y-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Code className="text-orange-600" /> 代码魔法书
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">bubble_sort.py</span>
                </div>
                <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-orange-200">
                    <code>{`def bubble_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # 最后 i 个元素已经排好了
        for j in range(0, n-i-1):
            
            # 如果前面的比后面的大，就交换
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                
    return arr`}</code>
                </pre>
            </div>
            <div className="space-y-4">
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
                <div className="p-5 bg-orange-50 rounded-xl border border-orange-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-orange-800">
                        <Sparkles size={18} />
                        <h4 className="font-bold">优化小技巧</h4>
                    </div>
                    <p className="text-sm text-orange-700 leading-relaxed">
                        如果在某一轮里，一次交换都没有发生，说明数组已经完全有序了！这时候可以提前结束循环 (break)，节省时间。
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// --- 主布局 ---

const sections = [
    { id: 1, title: '秩序的意义', icon: 'brain', component: IntroSlide },
    { id: 2, title: '冒泡可视化', icon: 'chart', component: BubbleSortSlide },
    { id: 3, title: '我是排序大师', icon: 'zap', component: HumanSortSlide },
    { id: 4, title: 'Python 代码', icon: 'code', component: CodeSlide },
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
