import React, { useState, useEffect } from 'react';
import {
    Terminal,
    Key,
    Lock,
    Unlock,
    Search,
    Calculator,
    ArrowRight,
    CheckCircle,
    XCircle,
    Menu,
    X,
    FileCode,
    Cpu,
    ShieldAlert,
    Lightbulb,
    Radio,
    Binary,
    ArrowDown
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, className = "" }) => {
    const icons = {
        terminal: <Terminal size={size} className={className} />,
        key: <Key size={size} className={className} />,
        lock: <Lock size={size} className={className} />,
        unlock: <Unlock size={size} className={className} />,
        search: <Search size={size} className={className} />,
        calc: <Calculator size={size} className={className} />,
        code: <FileCode size={size} className={className} />,
        cpu: <Cpu size={size} className={className} />,
        alert: <ShieldAlert size={size} className={className} />,
        bulb: <Lightbulb size={size} className={className} />,
        radio: <Radio size={size} className={className} />,
        binary: <Binary size={size} className={className} />
    };
    return icons[name] || <Terminal size={size} className={className} />;
};

// --- 章节配置 ---
const sections = [
    { id: 1, title: "封面：电脑特工的接头暗号", icon: "terminal", category: "任务简报" },
    { id: 2, title: "情景导入：神秘的电报", icon: "radio", category: "任务简报" },
    { id: 3, title: "知识讲解 1：记住你的“座号”", icon: "key", category: "核心机密" },
    { id: 4, title: "知识讲解 2：特工变身术", icon: "unlock", category: "核心机密" },
    { id: 5, title: "知识讲解 3：字符排队操", icon: "calc", category: "核心机密" },
    { id: 6, title: "真题实战 1：运算陷阱", icon: "alert", category: "实战演练" },
    { id: 7, title: "实战 1 解析：整数赢了", icon: "search", category: "实战演练" },
    { id: 8, title: "真题实战 2：混合运算", icon: "cpu", category: "实战演练" },
    { id: 9, title: "总结：特工手册", icon: "code", category: "归档" },
    { id: 10, title: "课后挑战：小小加密专家", icon: "binary", category: "归档" },
];

// --- 组件：电报解密器 (Page 2) ---
const TelegraphDecoder = () => {
    const [input, setInput] = useState("");
    const [decoded, setDecoded] = useState("???");

    const targetCode = "65 66 67";

    const handleDecrypt = () => {
        if (input.trim() === "65 66 67" || input.trim() === "65-66-67") {
            setDecoded("A B C");
        } else {
            setDecoded("解密失败 (请输入 65 66 67)");
        }
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border-2 border-green-500/50 shadow-2xl my-4 font-mono relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30 animate-pulse"></div>

            <div className="flex items-center gap-3 mb-4 text-green-400">
                <Radio className="animate-pulse" />
                <span className="font-bold tracking-widest">INTERCEPTED SIGNAL</span>
            </div>

            <div className="bg-black/50 p-4 rounded-lg border border-green-800 mb-6 text-center">
                <p className="text-gray-400 text-sm mb-2">接收到的原始电波：</p>
                <p className="text-3xl font-bold text-green-500 tracking-widest animate-bounce">65 - 66 - 67</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="在此输入数字 (如: 65 66 67)"
                    className="flex-1 bg-slate-800 border border-slate-600 rounded p-3 text-white focus:border-green-500 focus:outline-none w-full"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={handleDecrypt}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold transition-all shadow-lg hover:shadow-green-500/20 w-full md:w-auto"
                >
                    执行解密
                </button>
            </div>

            <div className="mt-6 border-t border-slate-700 pt-4">
                <p className="text-gray-400 text-sm">解密结果：</p>
                <p className={`text-2xl font-bold mt-2 ${decoded === "A B C" ? "text-green-400" : "text-red-400"}`}>
                    {decoded}
                </p>
            </div>
        </div>
    );
};

// --- 组件：ASCII 关键路标 (Page 3) ---
const AsciiKeyMap = () => {
    const [activeKey, setActiveKey] = useState(null);

    const keys = [
        { char: "'0'", code: 48, desc: "数字字符的起点", color: "bg-blue-600" },
        { char: "'A'", code: 65, desc: "大写字母的起点", color: "bg-purple-600" },
        { char: "'a'", code: 97, desc: "小写字母的起点", color: "bg-pink-600" },
        { char: "' '", code: 32, desc: "空格 (Space)", color: "bg-gray-600" },
    ];

    return (
        <div className="my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {keys.map((k) => (
                    <button
                        key={k.char}
                        onClick={() => setActiveKey(k.char)}
                        className={`p-4 rounded-xl text-white shadow-lg transition-all transform hover:scale-105 border-b-4 border-black/20
              ${k.color} ${activeKey === k.char ? 'ring-4 ring-offset-2 ring-green-400 scale-105' : 'opacity-90'}
            `}
                    >
                        <div className="text-3xl font-bold mb-1">{k.char}</div>
                        <div className="text-xs opacity-80 uppercase">Code</div>
                        <div className="text-4xl font-mono font-black">{k.code}</div>
                    </button>
                ))}
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-sm">
                <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <Lightbulb size={20} /> 记忆口诀
                </h4>
                <p className="text-lg text-yellow-900 font-medium">
                    零是四八(48)，大A六五(65)，小a九七(97)。
                </p>
                {activeKey && (
                    <div className="mt-3 pt-3 border-t border-yellow-200 text-sm text-yellow-800 animate-in slide-in-from-top-2">
                        当前选中：<strong>{activeKey}</strong> —— {keys.find(k => k.char === activeKey).desc}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- 组件：变身实验室 (Page 4) ---
const TransformationLab = () => {
    const [mode, setMode] = useState('charToInt'); // charToInt, intToChar

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg my-4">
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setMode('charToInt')}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${mode === 'charToInt' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                >
                    现原形 (Char → Int)
                </button>
                <button
                    onClick={() => setMode('intToChar')}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${mode === 'intToChar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                >
                    伪装术 (Int → Char)
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[160px]">
                {mode === 'charToInt' ? (
                    <>
                        <div className="flex flex-col items-center animate-in zoom-in">
                            <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center text-4xl font-bold text-purple-700 border-2 border-purple-300 shadow-sm relative">
                                'A'
                                <span className="absolute -top-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded">char</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <ArrowRight className="text-gray-400 mb-2" size={32} />
                            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs">(int)'A'</code>
                        </div>

                        <div className="flex flex-col items-center animate-in zoom-in delay-100">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-700 border-2 border-blue-300 shadow-sm relative">
                                65
                                <span className="absolute -top-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">int</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center animate-in zoom-in">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-700 border-2 border-blue-300 shadow-sm relative">
                                66
                                <span className="absolute -top-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">int</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <ArrowRight className="text-gray-400 mb-2" size={32} />
                            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs">(char)66</code>
                        </div>

                        <div className="flex flex-col items-center animate-in zoom-in delay-100">
                            <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center text-4xl font-bold text-purple-700 border-2 border-purple-300 shadow-sm relative">
                                'B'
                                <span className="absolute -top-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded">char</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-6 bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm border-l-4 border-green-500">
                <p>// 代码示例</p>
                {mode === 'charToInt' ? (
                    <>
                        <p>char c = 'A';</p>
                        <p>cout &lt;&lt; <span className="text-yellow-400">(int)</span>c; <span className="text-gray-500">// 输出 65</span></p>
                    </>
                ) : (
                    <>
                        <p>int i = 66;</p>
                        <p>cout &lt;&lt; <span className="text-yellow-400">(char)</span>i; <span className="text-gray-500">// 输出 B</span></p>
                    </>
                )}
            </div>
        </div>
    );
};

// --- 组件：字符排队尺 (Page 5) ---
const CharacterRuler = () => {
    const [offset, setOffset] = useState(0); // 0, 1, 2

    return (
        <div className="my-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-center font-bold text-gray-700 mb-6">字符在内存中的“排队”示意图</h3>

                <div className="relative h-24 flex items-center px-4">
                    {/* 尺子线 */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300"></div>

                    {/* 刻度 */}
                    <div className="flex justify-between w-full relative z-10">
                        {[65, 66, 67, 68, 69, 70].map((num, i) => (
                            <div key={num} className="flex flex-col items-center relative group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border-2 transition-all duration-300
                  ${i === 0 ? 'bg-purple-100 border-purple-500 text-purple-700' :
                                        (i === offset ? 'bg-green-100 border-green-500 text-green-700 scale-110 shadow-lg' : 'bg-white border-gray-300 text-gray-400')}
                `}>
                                    {String.fromCharCode(num)}
                                </div>
                                <div className="h-4 w-0.5 bg-gray-400 my-1"></div>
                                <div className="text-sm font-mono font-bold text-gray-600">{num}</div>

                                {i === offset && i !== 0 && (
                                    <div className="absolute -top-10 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap animate-bounce">
                                        'A' + {i}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={() => setOffset(1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border font-mono">
                        'A' + 1 = ?
                    </button>
                    <button onClick={() => setOffset(2)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border font-mono">
                        'A' + 2 = ?
                    </button>
                    <button onClick={() => setOffset(0)} className="px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded border font-bold">
                        重置
                    </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm text-center">
                    <p className="font-bold mb-1">推算公式：</p>
                    <p className="font-mono text-lg">目标字符 = 起点字符 + 偏移量</p>
                    <p className="text-xs text-blue-600 mt-2">例如：'C' 在 'A' 后面第 2 位，所以 'C' = 'A' + 2 (65 + 2 = 67)</p>
                </div>
            </div>
        </div>
    );
};

// --- 题目组件 ---
const Quiz = ({ question, options, correctIndex, explanation, type = "single" }) => {
    const [selected, setSelected] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSelect = (index) => {
        if (selected !== null) return;
        setSelected(index);
        setShowExplanation(true);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 my-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">真题实战</span>
            </div>
            <div className="font-bold text-lg mb-4 text-gray-800 leading-relaxed font-mono whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                {question}
            </div>
            <div className="grid grid-cols-1 gap-3">
                {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`p-4 text-left rounded-lg border-2 transition-all flex justify-between items-center group
              ${selected === null ? 'border-gray-100 hover:border-indigo-300 hover:bg-indigo-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-50' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : ''}
            `}
                    >
                        <div className="flex items-center">
                            <span className={`font-bold mr-3 w-8 h-8 rounded-full flex items-center justify-center text-sm ${selected === idx ? 'bg-white shadow-sm' : 'bg-gray-200 group-hover:bg-indigo-200'}`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-gray-700 font-medium">{opt}</span>
                        </div>
                        {selected === idx && idx === correctIndex && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle size={18} /> 正确</span>}
                        {selected === idx && idx !== correctIndex && <span className="text-red-600 font-bold flex items-center gap-1"><XCircle size={18} /> 错误</span>}
                    </button>
                ))}
            </div>
            {showExplanation && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-sm border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                    <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                        <Search size={16} /> 深度解析：
                    </h4>
                    <div className="text-gray-700 leading-relaxed pl-6 border-l-2 border-indigo-300">{explanation}</div>
                </div>
            )}
        </div>
    );
};

// --- 组件：大小写转换挑战 (Page 10) ---
const CaseConverterChallenge = () => {
    const [inputChar, setInputChar] = useState('');
    const [outputChar, setOutputChar] = useState('?');
    const [asciiStep, setAsciiStep] = useState(null);

    const handleConvert = () => {
        if (inputChar.length === 1 && inputChar >= 'A' && inputChar <= 'Z') {
            const code = inputChar.charCodeAt(0);
            setAsciiStep(`${code} + 32 = ${code + 32}`);
            setOutputChar(String.fromCharCode(code + 32));
        } else {
            setAsciiStep(null);
            setOutputChar('❌');
        }
    };

    return (
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 shadow-2xl my-4 text-center">
            <h3 className="text-green-400 font-bold text-xl mb-6 font-mono border-b border-slate-700 pb-4">
                &gt;&gt; 大小写转换器 v1.0 &lt;&lt;
            </h3>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
                <div className="flex flex-col items-center">
                    <label className="text-gray-400 text-xs mb-2">输入大写</label>
                    <input
                        type="text"
                        maxLength={1}
                        value={inputChar}
                        onChange={(e) => {
                            const val = e.target.value.toUpperCase();
                            setInputChar(val);
                            setAsciiStep(null);
                            setOutputChar('?');
                        }}
                        className="w-16 h-16 text-center text-3xl font-bold bg-slate-800 text-white border-2 border-slate-600 rounded-lg focus:border-green-500 outline-none uppercase"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={handleConvert}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 active:scale-95"
                    >
                        <ArrowRight size={24} />
                    </button>
                    <span className="text-xs text-gray-500 font-mono">+32</span>
                </div>

                <div className="flex flex-col items-center">
                    <label className="text-gray-400 text-xs mb-2">输出小写</label>
                    <div className="w-16 h-16 flex items-center justify-center text-3xl font-bold bg-black text-green-400 border-2 border-green-500/50 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        {outputChar}
                    </div>
                </div>
            </div>

            {asciiStep && (
                <div className="inline-block bg-slate-800 px-4 py-2 rounded text-sm font-mono text-gray-300 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-purple-400">ASCII 运算过程：</span> {asciiStep}
                </div>
            )}

            <div className="mt-8 text-xs text-gray-500 text-left bg-slate-800/50 p-4 rounded">
                <p className="font-bold text-gray-400 mb-1">C++ 代码实现提示：</p>
                <code className="font-mono block text-green-300">
                    char small = big + 32;
                </code>
            </div>
        </div>
    );
};

// --- 主应用 ---
export default function App() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const totalSections = sections.length;

    const nextSection = () => {
        if (activeSection < totalSections) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-slate-900 text-green-400 p-12 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden border border-slate-800">
                            {/* 背景矩阵雨装饰 */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

                            <div className="inline-block bg-green-900/30 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-4 border border-green-500/30 text-green-300 relative z-10">
                                GESP C++ 二级 | 绝密档案 02
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white relative z-10 drop-shadow-lg">
                                字符的密码 (ASCII)
                            </h1>
                            <h2 className="text-xl md:text-2xl text-green-500 font-mono mb-8 relative z-10">
                                &gt; 电脑特工的接头暗号_
                            </h2>

                            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm relative z-10">
                                <ShieldAlert size={16} /> 主讲人：逻辑一号特工
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Terminal className="text-green-600" /> 任务目标 (Mission Objectives)
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg">
                                    <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                    破解 ASCII 码表的秘密。
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg">
                                    <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                    掌握字符与数字的转换（变身术）。
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 bg-green-50 p-3 rounded-lg">
                                    <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                    学会字符的加减运算（排队报数）。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-slate-800 p-2 rounded-lg text-green-400"><Radio size={28} /></span>
                            情景导入：神秘的电报
                        </h2>

                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6 text-red-800 flex items-start gap-3">
                            <ShieldAlert className="flex-shrink-0 mt-1" />
                            <div>
                                <strong className="block mb-1">紧急事件！</strong>
                                总部截获了一段外星人发来的电报，内容全是数字。我们的电脑特工有“脸盲症”，它不认识字母 'A', 'B', 'C'，只认识数字。
                            </div>
                        </div>

                        <TelegraphDecoder />

                        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg">
                            <h4 className="font-bold mb-2">🕵️‍♂️ 侦探笔记：</h4>
                            <p>
                                人类和电脑为了能交流，约定了一本<strong>“接头暗号本”</strong>，它的名字叫 <strong>ASCII 码表</strong>。
                                在这个本子里，每一个字符都有一个对应的数字编号。
                            </p>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-blue-600 p-2 rounded-lg text-white"><Key size={28} /></span>
                            知识讲解 1：记住你的“座号”
                        </h2>
                        <p className="text-gray-600 mb-4">
                            ASCII 码表里有 128 个字符，我们不需要全部背下来，只要记住几个<strong>关键路标</strong>，其他的都可以推算出来！
                        </p>

                        <AsciiKeyMap />

                        <div className="mt-8 bg-gray-100 p-4 rounded-lg text-sm text-gray-500 text-center">
                            注：'0' 是字符零，不是数字 0。数字 0 在 ASCII 表里其实是“空字符”(Null)，那是另一个故事了。
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-purple-600 p-2 rounded-lg text-white"><Unlock size={28} /></span>
                            知识讲解 2：特工变身术
                        </h2>
                        <p className="text-gray-600 mb-6">
                            在 C++ 中，字符(char)和整数(int)可以互相伪装。这就是<strong>强制类型转换</strong>。
                        </p>

                        <TransformationLab />

                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                            <strong className="text-yellow-800 block mb-2">📢 特工守则：</strong>
                            <ul className="list-disc pl-5 text-yellow-700 text-sm space-y-1">
                                <li>想看字符背后的数字？用 <code className="bg-white px-1 rounded border border-yellow-300">(int)</code> 照妖镜。</li>
                                <li>想把数字变回字符？用 <code className="bg-white px-1 rounded border border-yellow-300">(char)</code> 伪装衣。</li>
                                <li>其实电脑内部只存数字，字符只是显示给人类看的“皮肤”。</li>
                            </ul>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-green-600 p-2 rounded-lg text-white"><Calculator size={28} /></span>
                            知识讲解 3：字符排队操
                        </h2>

                        <p className="text-gray-600 mb-4">
                            既然字符其实是数字，那它们当然可以进行加减运算！这就像同学们排队一样，知道队长的号码，就能算出后面人的号码。
                        </p>

                        <CharacterRuler />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="font-bold text-green-700 mb-2 border-b pb-2">➕ 加法：找后面的人</h4>
                                <code className="block bg-gray-800 text-white p-2 rounded mb-2 text-sm">
                                    'A' + 1
                                </code>
                                <p className="text-sm text-gray-600">
                                    意思是 'A' 的座号(65) 加 1，结果是 66 ('B')。
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <h4 className="font-bold text-purple-700 mb-2 border-b pb-2">➖ 减法：计算距离</h4>
                                <code className="block bg-gray-800 text-white p-2 rounded mb-2 text-sm">
                                    'c' - 'a'
                                </code>
                                <p className="text-sm text-gray-600">
                                    意思是 99 - 97 = 2。说明 'c' 排在 'a' 后面第 2 位。
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">真题实战 1：运算陷阱</h2>
                        <Quiz
                            question={`(2024年6月 GESP 二级)\n执行下面 C++ 代码，输出结果是（ ）。\n\nchar a = 'C';\ncout << (a + 2);`}
                            options={["E", "C2", "69", "67"]}
                            correctIndex={2}
                            explanation="见下一页解析..."
                        />
                    </div>
                );
            case 7:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-orange-500 p-2 rounded-lg text-white"><Search size={28} /></span>
                            实战 1 解析：整数赢了
                        </h2>

                        <div className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-orange-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-4xl font-bold text-gray-300">VS</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-2">
                                        <span>char (小个子)</span>
                                        <span>int (大个子)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                        <div className="bg-orange-500 h-full w-[80%] ml-auto"></div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-xl text-gray-800 mb-4">为什么答案是 69 而不是 'E'？</h3>

                            <ol className="space-y-4 text-gray-700 relative border-l-2 border-gray-200 ml-3 pl-6">
                                <li className="relative">
                                    <span className="absolute -left-[33px] bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                    <strong>现原形：</strong> 变量 <code>a</code> 是 'C'，它的 ASCII 码是 <strong>67</strong>。
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[33px] bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                    <strong>类型提升：</strong> 表达式变成 <code>67(char) + 2(int)</code>。
                                </li>
                                <li className="relative bg-orange-50 p-2 rounded">
                                    <span className="absolute -left-[33px] bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                    <strong>重要规则：</strong> 当 char 和 int 打架（运算）时，char 会自动升级成 int。
                                    <br />所以结果是整数 <strong>69</strong>。
                                </li>
                                <li className="relative">
                                    <span className="absolute -left-[33px] bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                    <strong>输出：</strong> <code>cout</code> 看到整数 69，就老老实实输出了 69。
                                </li>
                            </ol>

                            <div className="mt-6 text-sm text-gray-500 italic border-t pt-4">
                                如果想输出 'E'，必须强制转换：<code>cout &lt;&lt; (char)(a + 2);</code>
                            </div>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">真题实战 2：混合运算</h2>
                        <Quiz
                            question={`(2023年3月 GESP 一级/二级)\n表达式 ('A' + 1) 的结果类型和值分别是（ ）。`}
                            options={["char, 'B'", "int, 66", "char, 66", "string, A1"]}
                            correctIndex={1}
                            explanation={
                                <>
                                    <p><strong>分析过程：</strong></p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>'A' 是字符型，ASCII 值为 65。</li>
                                        <li>1 是整型。</li>
                                        <li><strong>字符 + 整数 = 整数</strong>。</li>
                                        <li>值：65 + 1 = 66。</li>
                                        <li>类型：int。</li>
                                    </ul>
                                    <p className="mt-2 font-bold text-indigo-600">结论：特工(char)混在人群(int)中，为了不暴露，通常假装自己是普通人(int)。</p>
                                </>
                            }
                        />
                    </div>
                );
            case 9:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-black p-2 rounded-lg text-green-400"><FileCode size={28} /></span>
                            总结：特工手册
                        </h2>

                        <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono shadow-2xl border border-slate-700 relative overflow-hidden">
                            <div className="absolute top-2 right-4 opacity-50 text-xs border border-green-500/50 px-2 py-1 rounded">TOP SECRET</div>

                            <h3 className="text-xl font-bold mb-6 border-b border-green-800 pb-2">ASCII CODEBOOK v2.0</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Key size={16} /> 核心暗号 (Key Mapping)</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between border-b border-green-900 pb-1"><span>'0' (Zero)</span> <span>48</span></li>
                                        <li className="flex justify-between border-b border-green-900 pb-1"><span>'A' (Upper)</span> <span>65</span></li>
                                        <li className="flex justify-between border-b border-green-900 pb-1"><span>'a' (Lower)</span> <span>97</span></li>
                                        <li className="flex justify-between border-b border-green-900 pb-1"><span>' ' (Space)</span> <span>32</span></li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Cpu size={16} /> 运算规则 (Protocol)</h4>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li><span className="text-green-500">char + int</span> &rarr; <span className="text-yellow-400">int</span></li>
                                        <li><span className="text-green-500">cout &lt;&lt; int</span> &rarr; 输出数字</li>
                                        <li><span className="text-green-500">cout &lt;&lt; (char)int</span> &rarr; 输出字符</li>
                                        <li>大小写关系：<span className="text-green-500">'a' - 'A' = 32</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-indigo-600 p-2 rounded-lg text-white"><Binary size={28} /></span>
                            课后挑战
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border-l-8 border-indigo-600 shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">任务：小小加密专家 🕵️</h3>
                                <p className="text-gray-600 mb-4">
                                    编写一个“大小写转换器”。输入一个大写字母（如 'A'），电脑要自动吐出对应的小写字母（如 'a'）。
                                </p>
                                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-700">
                                    提示：利用 ASCII 码差值。<br />
                                    已知 'a' (97) - 'A' (65) = 32。<br />
                                    所以：<span className="font-bold text-indigo-600">小写 = 大写 + 32</span>
                                </div>
                            </div>

                            <CaseConverterChallenge />
                        </div>

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setActiveSection(1)}
                                className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold shadow-lg hover:bg-slate-700 transition hover:-translate-y-1"
                            >
                                🔄 重置任务
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Error</div>;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-slate-900 text-white border-b border-slate-700 p-4 flex items-center justify-between shadow-sm">
                <span className="font-bold font-mono text-green-400">GESP::L2_02</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg text-gray-300">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-gray-300 border-r border-slate-700 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-6 border-b border-slate-800 bg-slate-900">
                    <h1 className="text-xl font-extrabold text-white flex items-center gap-2 tracking-tight">
                        <Terminal className="text-green-500" /> C++ 特工学院
                    </h1>
                    <p className="text-xs text-green-500/80 mt-1 font-bold font-mono pl-8">LEVEL 2 ACCESS GRANTED</p>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {sections.map((section, idx) => {
                        const isCategoryStart = idx === 0 || sections[idx - 1].category !== section.category;
                        return (
                            <React.Fragment key={section.id}>
                                {isCategoryStart && (
                                    <div className="px-3 pt-4 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                                        {section.category}
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3
                    ${activeSection === section.id
                                            ? 'bg-green-600/20 text-green-400 border border-green-600/50 font-bold'
                                            : 'hover:bg-slate-800 text-gray-400'
                                        }`}
                                >
                                    <Icon name={section.icon} size={18} className={activeSection === section.id ? "text-green-400" : "text-gray-500"} />
                                    <span className="truncate text-sm">{section.title.split('：')[0]}</span>
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full pt-16 md:pt-0 relative bg-slate-50">
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200 w-full">
                    <div
                        className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        style={{ width: `${(activeSection / totalSections) * 100}%` }}
                    ></div>
                </div>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-10">
                    <div className="max-w-4xl mx-auto min-h-[500px]">
                        {renderContent()}
                    </div>
                </main>

                {/* Navigation Footer */}
                <footer className="bg-white border-t border-gray-200 p-4 md:px-10 h-20 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition
              ${activeSection === 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'}`}
                    >
                        <ArrowRight className="rotate-180" size={20} /> 上一步
                    </button>

                    <div className="text-gray-400 font-mono text-sm hidden md:block">
                        FILE {activeSection} / {totalSections}
                    </div>

                    <button
                        onClick={nextSection}
                        disabled={activeSection === totalSections}
                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition
              ${activeSection === totalSections
                                ? 'bg-gray-300 text-white cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-200'}`}
                    >
                        {activeSection === totalSections ? "归档" : "下一步"} <ArrowRight size={20} />
                    </button>
                </footer>
            </div>
        </div>
    );
}