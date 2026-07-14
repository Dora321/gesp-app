import { useState } from 'react';
import { Trophy, Code, Sparkles, Brain, Zap, X, CheckCircle, Smartphone, Globe, ShoppingCart, ListOrdered, Dices } from 'lucide-react';
import { Icon } from './sortingProjectBasicSlides';

export const ApplicationSlide = () => {
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

export const BogoSortSlide = () => {
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

export const QuizSlide = () => {
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

export const CodeSlide = () => {
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
