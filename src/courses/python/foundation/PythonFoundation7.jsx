import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles, Trash2, Plus, AlertTriangle, Layers,
    ArrowRight, Star, Menu, X, Check, Box,
    Scale, Zap, Repeat, HelpCircle, Scissors, Combine, Search,
    CheckCircle, List, FileQuestion, BookOpen
} from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell, { MasteryCheck, SlideHeader } from '../shell/PythonLessonShell';

// --- Shared Helper Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2";
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code, highlightLine = -1 }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto relative">
        <div className="absolute top-2 right-4 text-slate-500 text-xs uppercase tracking-widest">Python</div>
        <pre className="relative z-10">
            {code.split('\n').map((line, i) => (
                <div key={`line-${i}`} className={`${highlightLine === i ? 'bg-indigo-500/30 -mx-4 px-4 border-l-4 border-indigo-400' : ''}`}>
                    {line}
                </div>
            ))}
        </pre>
    </div>
);

// --- Slides ---

const IntroSlide = () => {

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <Sparkles className="absolute top-[-20px] right-[-20px] text-white/10 w-40 h-40 rotate-12" />
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                    <Box className="text-yellow-300" />
                    欢迎来到“唯一之境”
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                    在 Python 的世界里，有一个神奇的袋子叫 <strong>集合 (Set)</strong>。
                    <br /><br />
                    它有两个绝对规则：
                    <br />
                    1. 🚫 <strong>拒绝重复</strong>：任何东西在袋子里只能有一份。放进去两个一样的？一个会自动消失！
                    <br />
                    2. 🔀 <strong>无序</strong>：袋子里的东西没有固定的位置 1, 2, 3... 它们是乱序的。
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-center items-center gap-8 h-40 relative">
                    {/* Visual metaphor of a "Filter/Bag" */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <div className="w-64 h-64 rounded-full bg-indigo-500 blur-3xl"></div>
                    </div>

                    <div className="z-10 flex gap-4 items-center">
                        <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 flex gap-2">
                            <span className="text-4xl animate-bounce">🍎</span>
                            <span className="text-4xl animate-bounce delay-100">🍌</span>
                            <span className="text-4xl animate-bounce delay-200">🍎</span>
                        </div>
                        <ArrowRight className="text-slate-400" size={32} />
                        <div className="bg-indigo-100 p-6 rounded-full border-4 border-indigo-200 w-32 h-32 flex items-center justify-center gap-2 shadow-inner relative overflow-hidden group">
                            <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
                            <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform">🍎</span>
                            <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform delay-75">🍌</span>
                        </div>
                    </div>
                </div>
                <p className="text-center text-slate-500 text-sm mt-4">看！第二个苹果被魔法袋“吃掉”了，只保留了一个。</p>
            </div>
        </div>
    );
};

const CreateSetSlide = () => {
    const [magicBag, setMagicBag] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addToBag = () => {
        if (!inputValue.trim()) return;
        const newItem = inputValue.trim();
        if (!magicBag.includes(newItem)) {
            setMagicBag([...magicBag, newItem]);
        }
        // In visualizer, we clarify duplicates "vanish"
        setInputValue('');
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Sparkles} title="创建集合">
                用大括号 <code>{`{}`}</code> 或者 <code>set()</code> 来创建集合。
                    <br />
                    试着把同样的东西放进袋子，看看会发生什么？
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <CodeBlock code={`# 创建一个集合\nfruits = {"apple", "banana", "apple"}\nprint(fruits)`} />
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="输入物品名称..."
                                className="flex-1 border rounded px-3 py-2"
                                onKeyDown={(e) => e.key === 'Enter' && addToBag()}
                            />
                            <Button onClick={addToBag}>放入袋子</Button>
                        </div>
                        <p className="text-xs text-slate-500">试着输入已经存在的名字，看看它是如何"消失"的。</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 min-h-[200px] flex flex-wrap content-center justify-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 border-4 border-dashed border-slate-200 rounded-2xl pointer-events-none"></div>
                    {magicBag.length === 0 ? (
                        <span className="text-slate-400">空空的魔法袋</span>
                    ) : (
                        magicBag.map((item, i) => (
                            <span key={i} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold animate-in bounce-in">
                                {item}
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const OperationsSlide = () => {
    const [mode, setMode] = useState('union'); // union, intersection, difference

    // Venn Diagram Data
    const setA = ['🔥', '💧', '⚡'];
    const setB = ['💧', '🌿', '⚡'];

    // Calculated zones
    const onlyA = setA.filter(x => !setB.includes(x));
    const onlyB = setB.filter(x => !setA.includes(x));
    const both = setA.filter(x => setB.includes(x));

    const getHighlight = (zone) => {
        // zone: 'A', 'B', 'Intersection'
        if (mode === 'union') return true;
        if (mode === 'intersection') return zone === 'Intersection';
        if (mode === 'difference') return zone === 'A'; // A - B
        return false;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Combine} title="集合运算 (Venn Diagram)">
                集合最强大的功能是处理它们之间的关系。通过 <strong>韦恩图</strong> 可以直观地看到！
            </SlideHeader>

            <div className="flex justify-center gap-4 mb-4">
                <Button variant={mode === 'union' ? 'primary' : 'secondary'} onClick={() => setMode('union')} className="w-32">
                    并集 (|)
                </Button>
                <Button variant={mode === 'intersection' ? 'primary' : 'secondary'} onClick={() => setMode('intersection')} className="w-32">
                    交集 (&)
                </Button>
                <Button variant={mode === 'difference' ? 'primary' : 'secondary'} onClick={() => setMode('difference')} className="w-32">
                    差集 (-)
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-center items-center min-h-[300px] relative overflow-hidden">
                    {/* SVG Venn Diagram */}
                    <svg viewBox="0 0 400 300" className="w-full h-full max-w-[400px]">
                        {/* Circle A - Left */}
                        <circle cx="140" cy="150" r="100"
                            fill={getHighlight('A') || getHighlight('Intersection') ? "rgba(239, 68, 68, 0.2)" : "rgba(226, 232, 240, 0.3)"}
                            stroke={getHighlight('A') ? "#ef4444" : "#cbd5e1"}
                            strokeWidth="3"
                        />
                        {/* Circle B - Right */}
                        <circle cx="260" cy="150" r="100"
                            fill={getHighlight('B') || getHighlight('Intersection') ? "rgba(59, 130, 246, 0.2)" : "rgba(226, 232, 240, 0.3)"}
                            stroke={getHighlight('B') ? "#3b82f6" : "#cbd5e1"}
                            strokeWidth="3"
                        />

                        {/* Labels */}
                        <text x="90" y="80" className="text-sm font-bold opacity-50" fill="#ef4444">Set A</text>
                        <text x="310" y="80" className="text-sm font-bold opacity-50" fill="#3b82f6">Set B</text>

                        {/* Content: Only A */}
                        <foreignObject x="60" y="100" width="80" height="100" className="pointer-events-none">
                            <div className={`text-2xl flex flex-wrap justify-center content-center h-full transition-opacity ${getHighlight('A') ? 'opacity-100' : 'opacity-30'}`}>
                                {onlyA.map((x, i) => <span key={i}>{x}</span>)}
                            </div>
                        </foreignObject>

                        {/* Content: Intersection */}
                        <foreignObject x="160" y="100" width="80" height="100" className="pointer-events-none">
                            <div className={`text-2xl flex flex-wrap justify-center content-center h-full transition-opacity font-bold ${getHighlight('Intersection') ? 'opacity-100 scale-125' : 'opacity-30'}`}>
                                {both.map((x, i) => <span key={i}>{x}</span>)}
                            </div>
                        </foreignObject>

                        {/* Content: Only B */}
                        <foreignObject x="260" y="100" width="80" height="100" className="pointer-events-none">
                            <div className={`text-2xl flex flex-wrap justify-center content-center h-full transition-opacity ${getHighlight('B') ? 'opacity-100' : 'opacity-30'}`}>
                                {onlyB.map((x, i) => <span key={i}>{x}</span>)}
                            </div>
                        </foreignObject>
                    </svg>

                    {/* Result Description */}
                    <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-bold text-slate-500 bg-white/80 py-2">
                        {mode === 'union' && 'Result: { ' + [...onlyA, ...both, ...onlyB].join(', ') + ' }'}
                        {mode === 'intersection' && 'Result: { ' + both.join(', ') + ' }'}
                        {mode === 'difference' && 'Result: { ' + onlyA.join(', ') + ' }'}
                    </div>
                </div>

                <div className="space-y-4">
                    <CodeBlock
                        code={`A = {${setA.map(s => `'${s}'`).join(', ')}}\nB = {${setB.map(s => `'${s}'`).join(', ')}}\n\nresult = A ${mode === 'union' ? '|' : mode === 'intersection' ? '&' : '-'} B${'   '}# 运算符写法\nresult = A.${mode === 'union' ? 'union' : mode === 'intersection' ? 'intersection' : 'difference'}(B)${'   '}# 等价的方法写法\nprint(result)`}
                    />
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                        {mode === 'union' && "A | B ：包含 A 和 B 中所有的元素（自动去重）。"}
                        {mode === 'intersection' && "A & B ：只保留 A 和 B 都有的元素。"}
                        {mode === 'difference' && "A - B ：从 A 中“减去”B 中有的元素，只留下 A 独有的。"}
                    </div>
                    {/* 拆解：为什么有运算符又有方法 */}
                    <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm leading-7 text-teal-900">
                        <div className="mb-2 font-black">为什么用 &amp; 而不是 .intersection()？其实两个都行</div>
                        <div className="mb-3 grid grid-cols-1 gap-1 font-mono text-xs sm:grid-cols-3">
                            <span>并集 <strong>A | B</strong> ↔ A.union(B)</span>
                            <span>交集 <strong>A &amp; B</strong> ↔ A.intersection(B)</span>
                            <span>差集 <strong>A - B</strong> ↔ A.difference(B)</span>
                        </div>
                        <p>
                            它们<strong>结果完全一样</strong>，是同一件事的两种写法：<code>&amp;</code> 更短，但左右<strong>都必须是集合</strong>；<code>.intersection()</code> 更灵活，括号里还能直接传列表，比如 <code>A.intersection([1, 2, 3])</code>。日常和考试多用 <code>&amp; | -</code>，但看到 <code>.intersection()</code> 别懵——它俩是一回事。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DeduplicateSlide = () => {
    const [rawList] = useState([1, 2, 3, 2, 1, 4, 5, 5, 1]);
    const [step, setStep] = useState(0);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Scissors} title="实战技巧：秒杀重复元素">
                有一个列表充满了重复的数据，怎么最快把它变干净？
                    <br />
                    <strong>列表 转 集合 再转回 列表</strong>，只需一行代码！
            </SlideHeader>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-8">
                <div className={`transition-all duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-sm text-slate-500 mb-2">原始列表 (List)</div>
                    <div className="flex justify-center gap-2 bg-slate-100 p-4 rounded-lg inline-flex">
                        [{rawList.join(', ')}]
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button onClick={() => setStep(prev => (prev + 1) % 3)} className="rounded-full w-12 h-12 flex items-center justify-center">
                        <ArrowRight className="rotate-90 md:rotate-0" />
                    </Button>
                </div>

                <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
                    <div className="text-sm text-indigo-500 mb-2">转为集合 (Set) - 重复消失！</div>
                    <div className="flex justify-center gap-2 bg-indigo-50 p-4 rounded-full inline-flex border-2 border-indigo-100">
                        {`{ ${[...new Set(rawList)].join(', ')} }`}
                    </div>
                </div>

                {step >= 1 && (
                    <div className="flex justify-center mt-8">
                        <Button onClick={() => setStep(2)} className="rounded-full w-12 h-12 flex items-center justify-center">
                            <ArrowRight className="rotate-90 md:rotate-0" />
                        </Button>
                    </div>
                )}

                <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
                    <div className="text-sm text-emerald-500 mb-2">转回列表 (List) - 完成！</div>
                    <div className="flex justify-center gap-2 bg-emerald-50 p-4 rounded-lg inline-flex border-2 border-emerald-100">
                        [{[...new Set(rawList)].join(', ')}]
                    </div>
                </div>
            </div>

            <CodeBlock code={`data = [1, 2, 3, 2, 1, 4, 5, 5, 1]\n\n# 一行代码去重\nclean_data = list(set(data))\n\nprint(clean_data)`} />
        </div>
    );
};

const MembershipSlide = () => {
    const [listResult, setListResult] = useState(null);
    const [setResult, setSetResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const items = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];
    const target = 'grape';

    const startSearch = async () => {
        setIsSearching(true);
        setListResult(null);
        setSetResult(null);

        // Simulate List Search (Slow)
        for (let i = 0; i < items.length; i++) {
            setListResult({ index: i, found: false });
            await new Promise(r => setTimeout(r, 300));
            if (items[i] === target) {
                setListResult({ index: i, found: true });
                break;
            }
        }

        // Simulate Set Search (Instant)
        await new Promise(r => setTimeout(r, 100)); // Tiny delay for feel
        setSetResult(true);
        setIsSearching(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Zap} title="闪电查找">
                为什么程序员喜欢用集合？因为它快！⚡
                    <br />
                    在列表中找东西，需要一个一个看。在集合中找东西，是<strong>瞬间</strong>的！
                    <br />
                    语法：<code>element in my_set</code>
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                {/* List Simulation */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <List size={20} /> List (列表) - 慢！
                    </h3>
                    <div className="space-y-2 mb-4">
                        {items.map((item, i) => (
                            <div key={i} className={`p-2 rounded border transition-all ${listResult?.index === i
                                ? listResult?.found ? 'bg-green-100 border-green-500' : 'bg-yellow-100 border-yellow-500 scale-105'
                                : 'bg-slate-50 border-slate-100'
                                }`}>
                                {i}: {item} {listResult?.index === i && (listResult.found ? '✅' : '👀')}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Set Simulation */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
                        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Box size={20} /> Set (集合) - 秒杀！
                        </h3>
                        <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 flex items-center justify-center min-h-[150px]">
                            {setResult ? (
                                <div className="text-green-600 font-bold text-2xl animate-bounce flex items-center gap-2">
                                    <CheckCircle /> Found 'grape'!
                                </div>
                            ) : (
                                <div className="text-slate-400">Ready to search...</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-inner border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-2 right-4 text-slate-500 text-xs uppercase tracking-widest">Python</div>
                        <div className="font-mono text-sm mb-4 relative z-10">
                            target = "{target}"
                            <br />
                            # List Search
                            <br />
                            <span className="text-yellow-400">target in my_list</span> # O(n)
                            <br /><br />
                            # Set Search
                            <br />
                            <span className="text-green-400">target in my_set</span> # O(1)
                        </div>
                        <Button onClick={startSearch} disabled={isSearching} className="w-full relative z-10" variant="success">
                            {isSearching ? '查找中...' : '开始对比测试'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuizSlide = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            q: "以下哪个符号用来创建集合？",
            options: ["[]", "()", "{}", "<>"],
            correct: 2,
            explain: "{} 用于创建集合和字典，[] 用于列表，() 用于元组。"
        },
        {
            q: "代码 {1, 2, 2, 3} 的运行结果是什么？",
            options: ["{1, 2, 2, 3}", "{1, 2, 3}", "Error", "{1, 3}"],
            correct: 1,
            explain: "集合会自动去重，重复的 2 只保留一个。"
        },
        {
            q: "集合中的元素是有序的吗？",
            options: ["是的，按插入顺序", "是的，按大小顺序", "不是，是无序的", "看心情"],
            correct: 2,
            explain: "集合是无序的（Unordered），所以不能用索引 [0] 访问。"
        }
    ];

    const handleSelect = (idx) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
    };

    const nextQ = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
            setSelected(null);
            setShowResult(false);
        }
    };

    const q = questions[currentQ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={FileQuestion} title={`小测验 (${currentQ + 1}/${questions.length})`}>
                来看看你掌握了多少集合的魔法！
            </SlideHeader>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-slate-800 mb-6">{q.q}</h3>

                <div className="grid gap-3 mb-6">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={showResult}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${showResult
                                ? idx === q.correct
                                    ? 'bg-green-100 border-green-500 text-green-800'
                                    : idx === selected
                                        ? 'bg-red-100 border-red-500 text-red-800'
                                        : 'bg-slate-50 border-slate-100 opacity-50'
                                : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{opt}</span>
                                {showResult && idx === q.correct && <CheckCircle className="text-green-600" />}
                                {showResult && idx === selected && idx !== q.correct && <X className="text-red-600" />}
                            </div>
                        </button>
                    ))}
                </div>

                {showResult && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                        <div className="font-bold mb-1 flex items-center gap-2">
                            {selected === q.correct ?
                                <span className="text-green-600">🎉 回答正确！</span> :
                                <span className="text-red-600">😅 再接再厉</span>
                            }
                        </div>
                        <p className="text-slate-600 text-sm">{q.explain}</p>

                        {currentQ < questions.length - 1 && (
                            <Button onClick={nextQ} className="mt-4 ml-auto">下一题 <ArrowRight size={16} /></Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const f7MasteryItems = [
    {
        label: '能解释集合唯一、无序、不能用下标访问。',
        evidence: '看到 {1, 2, 2} 能说出重复会消失，也不能写 s[0]。',
        retryHint: '回到“创建集合”，把集合和列表的访问方式分开比较。',
    },
    {
        label: '能用 set 去重，并知道结果顺序不保证不变。',
        evidence: '能把 list(set(data)) 说成“去重工具”，但不拿它保护原顺序。',
        retryHint: '回到“去重技巧”，先问自己是否需要保留原来的排列。',
    },
    {
        label: '能用 in 判断成员，并说出为什么集合查找更适合大量数据。',
        evidence: '能把“找某个名字是否出现过”改成 name in seen。',
        retryHint: '回到“闪电查找”，比较列表一个个找和集合直接问。',
    },
    {
        label: '能用并集、交集、差集描述两个集合的关系。',
        evidence: '给 A 和 B，能说出 A | B、A & B、A - B 分别代表什么。',
        retryHint: '回到“集合运算”，先用韦恩图圈出每块区域。',
    },
];

const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="teal" icon={BookOpen} title="魔法笔记 (Cheat Sheet)">
                集合的咒语都在这里了，快记下来！
            </SlideHeader>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-indigo-600 mb-2">🔥 核心特性</h3>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 text-sm">
                        <li><strong>无序</strong> (Unordered): 没有索引，不能用 [0]</li>
                        <li><strong>唯一</strong> (Unique): 自动去重，不允许重复</li>
                        <li><strong>可变</strong> (Mutable): 可以添加删除元素</li>
                    </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-indigo-600 mb-2">🛠️ 常用操作</h3>
                    <code className="block bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 mb-1">
                        s = &#123;1, 2, 3&#125;
                    </code>
                    <code className="block bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 mb-1">
                        s.add(4)        # 添加
                    </code>
                    <code className="block bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 mb-1">
                        s.remove(1)     # 删除
                    </code>
                    <code className="block bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 mb-1">
                        len(s)          # 长度
                    </code>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-indigo-600 mb-2">⚙️ 集合运算</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">| 并集</span>
                            <div className="text-xs text-slate-500">两个集合所有的元素</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">& 交集</span>
                            <div className="text-xs text-slate-500">共同拥有的元素</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">- 差集</span>
                            <div className="text-xs text-slate-500">我有你没有的</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">^ 对称差</span>
                            <div className="text-xs text-slate-500">不重合的元素</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-indigo-600 mb-2">🚀 高级魔法</h3>
                    <div className="text-sm text-slate-700 mb-1">一行代码去重：</div>
                    <code className="block bg-slate-900 text-green-400 p-2 rounded font-mono text-xs">
                        unique_list = list(set(old_list))
                    </code>
                    <div className="text-sm text-slate-700 mt-2 mb-1">快速查找：</div>
                    <code className="block bg-slate-900 text-green-400 p-2 rounded font-mono text-xs">
                        if "apple" in my_set: ...
                    </code>
                </div>
            </div>
        </div>

        <MasteryCheck
            title="F7 集合宝藏离开前检查"
            description="如果能解释集合特性、正确去重、用 in 查找、用集合运算描述关系，就可以进入项目桥梁。"
            accent="teal"
            items={f7MasteryItems}
        />
    </div>
);

const ChallengeSlide = () => {
    const [pantry] = useState(['🥕', '🥔', '🥕', '🥩', '🥔', '🥬', '🥕']);
    const [cleaned, setCleaned] = useState([]);
    const [step, setStep] = useState(0);

    const runChallenge = () => {
        setStep(1);
        setTimeout(() => {
            const unique = [...new Set(pantry)];
            setCleaned(unique);
            setStep(2);
        }, 800);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="teal" icon={Star} title="厨师的挑战 (Chef's Challenge)">
                糊涂厨师买重复了好多食材！<br />
                    请你使用 <strong>集合魔法</strong> 帮他整理一份“不重复”的食材清单。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
                    <div className="text-sm font-bold text-slate-500 mb-4 w-full text-left">🛒 杂乱的购物篮</div>
                    <div className="flex flex-wrap gap-3 mb-8 p-4 bg-slate-50 rounded-xl w-full justify-center min-h-[80px]">
                        {pantry.map((item, i) => (
                            <div key={i} className={`text-4xl transition-all duration-500 ${step === 2 && pantry.indexOf(item) !== i ? 'scale-0 opacity-0 w-0' : 'scale-100'}`}>
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="w-full space-y-2">
                        <div className="text-xs font-mono text-slate-500 mb-1">写下你的魔法咒语:</div>
                        <div className="bg-slate-900 p-3 rounded-lg text-white font-mono text-sm flex items-center gap-2">
                            <span>clean_list =</span>
                            <button
                                onClick={runChallenge}
                                disabled={step > 0}
                                className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                list(set(pantry))
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4">
                    {step === 0 && <div className="text-6xl animate-bounce">👨‍🍳</div>}
                    {step === 1 && <div className="text-6xl animate-spin">🪄</div>}
                    {step === 2 && (
                        <div className="bg-emerald-100 p-6 rounded-3xl border-4 border-emerald-200 text-center animate-in zoom-in">
                            <div className="text-sm font-bold text-emerald-800 mb-4">✨ 完美的清单 ✨</div>
                            <div className="flex gap-2 text-4xl">
                                {cleaned.map((item, i) => <span key={i}>{item}</span>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Course Component ---

const sections = [
    { id: 1, title: '唯一之境', icon: Sparkles, component: IntroSlide },
    { id: 2, title: '创建集合', icon: Plus, component: CreateSetSlide },
    { id: 3, title: '闪电查找', icon: Zap, component: MembershipSlide },
    { id: 4, title: '集合运算', icon: Combine, component: OperationsSlide },
    { id: 5, title: '去重技巧', icon: Scissors, component: DeduplicateSlide },
    { id: 6, title: '厨师挑战', icon: Star, component: ChallengeSlide },
    { id: 7, title: '小测验', icon: FileQuestion, component: QuizSlide },
    { id: 8, title: '魔法笔记', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation7() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F7"
            lessonTitle="集合宝藏"
            lessonSubtitle="唯一性与集合运算"
            accent="teal"
            hero={{
                title: '用集合处理“唯一”和“关系”',
                description: '用 set 去重、判断成员，并完成交集、并集、差集——基础语法线在这里闭环，准备进入项目实战。',
            }}
            prerequisites={['会用列表和 for 遍历', '会用 in 判断成员', '理解“去掉重复”的需求']}
            sections={sections}
            previousPath="/python/f6"
            nextPath="/python/bridge"
            nextLabel="下一课：桥梁 · 猜数字大冒险"
            topSupport={<PythonFoundationSupport lessonId="f7" />}
            bottomSupport={<PythonFoundationSupport lessonId="f7" placement="bottom" />}
        />
    );
}
