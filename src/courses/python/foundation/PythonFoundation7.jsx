import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Sparkles, Trash2, Plus, AlertTriangle, Layers,
    ArrowRight, Star, Menu, X, Check, Box,
    Scale, Zap, Repeat, HelpCircle, Scissors, Combine, Search,
    CheckCircle, List, FileQuestion, BookOpen
} from 'lucide-react';

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

const IntroSlide = () => (
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
        <div className="flex justify-center gap-8 py-4">
            <span className="text-7xl animate-bounce">🍎</span>
            <span className="text-7xl animate-bounce delay-100">🚫</span>
            <span className="text-7xl animate-bounce delay-200">🍎</span>
        </div>
    </div>
);

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
            <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-blue-600" />
                    创建集合
                </h2>
                <p>
                    用大括号 <code>{`{}`}</code> 或者 <code>set()</code> 来创建集合。
                    <br />
                    试着把同样的东西放进袋子，看看会发生什么？
                </p>
            </div>

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
    const [setA] = useState(['🔥', '💧', '⚡']);
    const [setB] = useState(['💧', '🌿', '⚡']);
    const [mode, setMode] = useState('union'); // union, intersection, difference

    const renderVennLike = () => {
        let result = [];
        let symbol = '';
        let desc = '';

        if (mode === 'union') {
            result = [...new Set([...setA, ...setB])];
            symbol = '|';
            desc = '并集 (Union): 所有出现过的元素';
        } else if (mode === 'intersection') {
            result = setA.filter(x => setB.includes(x));
            symbol = '&';
            desc = '交集 (Intersection): 两个集合都有的元素';
        } else if (mode === 'difference') {
            result = setA.filter(x => !setB.includes(x));
            symbol = '-';
            desc = '差集 (Difference): 只在 A 中有的元素';
        }

        return (
            <div className="space-y-4">
                <div className="flex justify-center gap-2 mb-4">
                    <Button variant={mode === 'union' ? 'primary' : 'secondary'} onClick={() => setMode('union')} size="sm">并集 |</Button>
                    <Button variant={mode === 'intersection' ? 'primary' : 'secondary'} onClick={() => setMode('intersection')} size="sm">交集 &</Button>
                    <Button variant={mode === 'difference' ? 'primary' : 'secondary'} onClick={() => setMode('difference')} size="sm">差集 -</Button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <div className="flex justify-center items-center gap-8 mb-6 text-xl">
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <div className="text-xs text-red-500 mb-1">Set A</div>
                            {setA.join(' ')}
                        </div>
                        <div className="font-bold text-slate-400 text-2xl">{symbol}</div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="text-xs text-blue-500 mb-1">Set B</div>
                            {setB.join(' ')}
                        </div>
                    </div>

                    <div className="text-4xl mb-2">=</div>

                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 inline-block min-w-[150px]">
                        <div className="text-xs text-emerald-500 mb-2">{desc}</div>
                        <div className="text-3xl animate-in zoom-in duration-300 flex gap-2 justify-center">
                            {result.length > 0 ? result.map((r, i) => <span key={i}>{r}</span>) : <span className="text-slate-400 text-lg">Empty Set</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Combine className="text-purple-600" />
                    集合运算
                </h2>
                <p>
                    像数学课一样，集合可以进行 并集、交集 和 差集 运算。这也是 Python 处理数据最强大的地方！
                </p>
            </div>
            {renderVennLike()}
            <CodeBlock code={`A = {${setA.map(s => `'${s}'`).join(', ')}}\nB = {${setB.map(s => `'${s}'`).join(', ')}}\n\n# ${mode === 'union' ? '并集' : mode === 'intersection' ? '交集' : '差集'}\nresult = A ${mode === 'union' ? '|' : mode === 'intersection' ? '&' : '-'} B\nprint(result)`} />
        </div>
    );
};

const DeduplicateSlide = () => {
    const [rawList] = useState([1, 2, 3, 2, 1, 4, 5, 5, 1]);
    const [step, setStep] = useState(0);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Scissors className="text-orange-600" />
                    实战技巧：秒杀重复元素
                </h2>
                <p>
                    有一个列表充满了重复的数据，怎么最快把它变干净？
                    <br />
                    <strong>列表 转 集合 再转回 列表</strong>，只需一行代码！
                </p>
            </div>

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
    const [searchTerm, setSearchTerm] = useState('');
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
            <div className="bg-pink-100 p-6 rounded-2xl border border-pink-200 text-pink-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-pink-600" />
                    闪电查找
                </h2>
                <p>
                    为什么程序员喜欢用集合？因为它快！⚡
                    <br />
                    在列表中找东西，需要一个一个看。在集合中找东西，是<strong>瞬间</strong>的！
                    <br />
                    语法：<code>element in my_set</code>
                </p>
            </div>

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
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FileQuestion className="text-indigo-600" />
                    小测验 ({currentQ + 1}/{questions.length})
                </h2>
                <p>来看看你掌握了多少集合的魔法！</p>
            </div>

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

const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-teal-100 p-6 rounded-2xl border border-teal-200 text-teal-900">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="text-teal-600" />
                魔法笔记 (Cheat Sheet)
            </h2>
            <p>集合的咒语都在这里了，快记下来！</p>
        </div>

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
    </div>
);

// --- Main Course Component ---

const sections = [
    { id: 1, title: '唯一之境', icon: Sparkles, component: IntroSlide },
    { id: 2, title: '创建集合', icon: Plus, component: CreateSetSlide },
    { id: 3, title: '闪电查找', icon: Zap, component: MembershipSlide },
    { id: 4, title: '集合运算', icon: Combine, component: OperationsSlide },
    { id: 5, title: '去重技巧', icon: Scissors, component: DeduplicateSlide },
    { id: 6, title: '小测验', icon: FileQuestion, component: QuizSlide },
    { id: 7, title: '魔法笔记', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation7() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollRef = React.useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    }, [activeSection]);

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
                    <span className="text-lg">F7: 集合魔法</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 hidden md:block">
                    <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <Box className="w-8 h-8 text-indigo-600" />
                        </Link>
                        <span className="bg-indigo-600 text-white p-1 rounded text-sm">Python</span>
                        F7: 集合魔法
                    </h1>
                    <p className="text-xs text-slate-500 mt-2">Python 集合 (Set)</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group 1: 概念 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🔮 核心概念</div>
                        <div className="space-y-1">
                            {sections.slice(0, 3).map(section => (
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
                                    <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 2: 操作 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">⚡ 魔法操作</div>
                        <div className="space-y-1">
                            {sections.slice(3, 5).map(section => (
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
                                    <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Group 3: 总结 */}
                    <div>
                        <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">🏆 挑战总结</div>
                        <div className="space-y-1">
                            {sections.slice(5, 7).map(section => (
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
                                    <section.icon size={18} className={activeSection === section.id ? 'text-indigo-600' : 'text-slate-400'} />
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                {sections.find(s => s.id === activeSection)?.title}
                            </h2>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </header>

                        <ActiveComponent />
                    </div>
                </div>

                <div className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-20 flex-shrink-0">
                    <button
                        onClick={() => setActiveSection(prev => Math.max(1, prev - 1))}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
                            ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                    >
                        <ArrowRight className="rotate-180" size={18} /> 上一节
                    </button>

                    <button
                        onClick={() => {
                            if (activeSection < sections.length) {
                                setActiveSection(prev => prev + 1);
                            } else {
                                navigate('/python/a1');
                            }
                        }}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5`}
                    >
                        {activeSection === sections.length ? '完成学习' : '下一节'} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
