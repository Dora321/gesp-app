import React, { useState, useEffect } from 'react';
import {
    Rocket,
    CheckCircle2,
    AlertTriangle,
    Terminal,
    BookOpen,
    Cpu,
    Zap,
    RotateCcw,
    ArrowRight,
    ShieldCheck,
    MousePointer2,
    Calculator,
    Timer,
    Play,
    Menu,
    X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor", className = "" }) => {
    const icons = {
        "rocket": <Rocket size={size} color={color} className={className} />,
        "check": <CheckCircle2 size={size} color={color} className={className} />,
        "alert": <AlertTriangle size={size} color={color} className={className} />,
        "terminal": <Terminal size={size} color={color} className={className} />,
        "book": <BookOpen size={size} color={color} className={className} />,
        "cpu": <Cpu size={size} color={color} className={className} />,
        "zap": <Zap size={size} color={color} className={className} />,
        "reset": <RotateCcw size={size} color={color} className={className} />,
        "arrow": <ArrowRight size={size} color={color} className={className} />,
        "shield": <ShieldCheck size={size} color={color} className={className} />,
        "mouse": <MousePointer2 size={size} color={color} className={className} />,
        "calc": <Calculator size={size} color={color} className={className} />,
        "timer": <Timer size={size} color={color} className={className} />,
        "play": <Play size={size} color={color} className={className} />
    };
    return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
    { id: 1, title: "封面：发射日", icon: "rocket" },
    { id: 2, title: "导入：发射前安检", icon: "shield" },
    { id: 3, title: "安检1：变量饭盒", icon: "book" },
    { id: 4, title: "安检2：运算交警", icon: "zap" },
    { id: 5, title: "安检3：循环跑道", icon: "timer" },
    { id: 6, title: "任务1：逻辑陷阱", icon: "calc" },
    { id: 7, title: "任务2：吃书的老鼠", icon: "mouse" },
    { id: 8, title: "任务2：代码实现", icon: "terminal" },
    { id: 9, title: "发射口诀", icon: "cpu" },
    { id: 10, title: "最后叮嘱", icon: "check" }
];

// --- 互动组件 1：变量饭盒检测器 ---
const VariableChecker = () => {
    const [inputType, setInputType] = useState('int');
    const [inputValue, setInputValue] = useState('3.9');

    const getResult = () => {
        if (inputType === 'int') return Math.floor(parseFloat(inputValue));
        if (inputType === 'bool') return parseFloat(inputValue) !== 0 ? 'true (1)' : 'false (0)';
        return inputValue;
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border-2 border-slate-600 my-4 shadow-lg text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-cyan-400">
                <BookOpen className="text-cyan-400" /> 变量“饭盒”测试仪
            </h3>

            <div className="flex gap-4 items-center mb-6">
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">放入数据</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="bg-slate-700 border border-slate-500 rounded px-2 py-1 text-white w-24"
                    />
                </div>
                <ArrowRight className="text-gray-500" />
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400 mb-1">选择饭盒类型</label>
                    <div className="flex gap-2">
                        {['int', 'double', 'bool'].map(type => (
                            <button
                                key={type}
                                onClick={() => setInputType(type)}
                                className={`px-3 py-1 rounded text-sm font-bold transition-all ${inputType === type ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-400 hover:bg-slate-600'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-black/50 p-4 rounded-lg font-mono text-center border border-cyan-500/30">
                <div className="text-gray-500 text-xs mb-2">内存中的样子</div>
                <div className="text-2xl font-bold text-yellow-400">
                    {inputType} a = {inputValue}; <span className="text-gray-400">{'//'} 结果: </span>
                    <span className="text-green-400 ml-2">{getResult()}</span>
                </div>
                {inputType === 'int' && inputValue.includes('.') && (
                    <div className="text-red-400 text-xs mt-2 animate-pulse">⚠️ 警告：小数部分被切掉了！（汤漏光了）</div>
                )}
                {inputType === 'bool' && parseFloat(inputValue) !== 0 && parseFloat(inputValue) !== 1 && (
                    <div className="text-green-400 text-xs mt-2">💡 提示：非零即真！</div>
                )}
            </div>
        </div>
    );
};

// --- 互动组件 2：运算优先级阶梯 ---
const OperatorLadder = () => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border-2 border-slate-600 my-4 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-400">
                <Zap className="text-purple-400" /> 运算“交警”指挥台
            </h3>

            <div className="flex flex-col gap-3 max-w-md mx-auto">
                <div className="bg-red-500/20 border border-red-500 p-3 rounded-lg flex items-center gap-4 relative overflow-hidden">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold z-10">1</div>
                    <div className="z-10">
                        <span className="font-bold text-red-300">大哥：非 (!)</span>
                        <div className="text-xs text-gray-400">最高级，!0 变 1</div>
                    </div>
                </div>

                <div className="bg-orange-500/20 border border-orange-500 p-3 rounded-lg flex items-center gap-4">
                    <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                        <span className="font-bold text-orange-300">二哥：算术 (* / % + -)</span>
                        <div className="text-xs text-gray-400">先乘除(模)，后加减</div>
                    </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500 p-3 rounded-lg flex items-center gap-4">
                    <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                        <span className="font-bold text-yellow-300">三哥：关系 (&gt; &lt; ==)</span>
                        <div className="text-xs text-gray-400">算完数再比大小</div>
                    </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-500 p-3 rounded-lg flex items-center gap-4">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                        <span className="font-bold text-blue-300">老弟：逻辑 (&& ||)</span>
                        <div className="text-xs text-gray-400">最后才看真假</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 互动组件 3：逻辑表达式步进器 ---
const LogicStepper = () => {
    const [step, setStep] = useState(0);

    const steps = [
        { text: "12 - 3 * 2 && 2", highlight: "3 * 2", val: "6", desc: "1. 算术优先：先乘除" },
        { text: "12 - 6 && 2", highlight: "12 - 6", val: "6", desc: "2. 继续算术：后加减" },
        { text: "6 && 2", highlight: "6 && 2", val: "1", desc: "3. 逻辑判断：非零即真 (True && True)" },
        { text: "1", highlight: "1", val: "1", desc: "4. 最终答案：B" }
    ];

    const reset = () => setStep(0);
    const next = () => setStep(Math.min(steps.length - 1, step + 1));

    return (
        <div className="bg-slate-800 p-6 rounded-xl border-2 border-slate-600 my-4 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-400">
                <Calculator className="text-green-400" /> 太空任务 1：逻辑陷阱
            </h3>
            <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded inline-block mb-4">2024年12月 GESP 一级 单选题 第4题</div>

            <div className="bg-black p-6 rounded-xl font-mono text-center text-2xl mb-4 relative overflow-hidden">
                {step < steps.length ? (
                    <div>
                        {steps[step].text.split(steps[step].highlight).map((part, i, arr) => (
                            <span key={i} className="text-gray-400">
                                {part}
                                {i < arr.length - 1 && (
                                    <span className="text-yellow-400 font-bold bg-yellow-900/50 px-1 rounded border-b-2 border-yellow-500 transition-all">
                                        {steps[step].highlight}
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="text-green-500 font-bold">1</div>
                )}
            </div>

            <div className="bg-slate-700 p-3 rounded-lg text-center text-cyan-300 font-bold mb-4 h-12 flex items-center justify-center">
                {steps[step].desc}
            </div>

            <div className="flex gap-2">
                <button onClick={reset} className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-500">重置</button>
                <button onClick={next} disabled={step === steps.length - 1} className="flex-1 px-4 py-2 bg-green-600 rounded hover:bg-green-500 font-bold disabled:opacity-50">
                    下一步
                </button>
            </div>
        </div>
    );
};

// --- 互动组件 4：吃书老鼠模拟器 ---
const RatSimulator = () => {
    const [n, setN] = useState(10); // Books
    const [a, setA] = useState(2);  // Hours per book
    const [b, setB] = useState(5);  // Time passed

    const eatenFull = Math.floor(b / a);
    const isEating = b % a !== 0;
    const totalLost = eatenFull + (isEating ? 1 : 0);
    const remaining = Math.max(0, n - totalLost);

    return (
        <div className="bg-slate-800 p-6 rounded-xl border-2 border-slate-600 my-4 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-400">
                <MousePointer2 className="text-orange-400" /> 太空任务 2：吃书的老鼠
            </h3>
            <div className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded inline-block mb-4">2025年3月 GESP 一级 编程题 第1题</div>

            <div className="flex flex-wrap gap-4 mb-6 bg-slate-700 p-4 rounded-lg">
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400">书总数 N</label>
                    <input type="number" value={n} onChange={e => setN(parseInt(e.target.value) || 0)} className="w-16 bg-slate-900 border border-slate-500 rounded px-2 text-white text-center" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400">吃一本耗时 A</label>
                    <input type="number" value={a} onChange={e => setA(parseInt(e.target.value) || 1)} className="w-16 bg-slate-900 border border-slate-500 rounded px-2 text-white text-center" />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-400">经过时间 B</label>
                    <input type="number" value={b} onChange={e => setB(parseInt(e.target.value) || 0)} className="w-16 bg-slate-900 border border-slate-500 rounded px-2 text-white text-center" />
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4 min-h-[40px]">
                {Array.from({ length: Math.min(n, 30) }).map((_, i) => {
                    let status = 'safe'; // green
                    if (i < eatenFull) status = 'eaten'; // red
                    else if (i === eatenFull && isEating) status = 'eating'; // yellow

                    return (
                        <div key={i} className={`w-6 h-8 rounded border flex items-center justify-center text-xs transition-all
              ${status === 'safe' ? 'bg-green-600 border-green-400' : ''}
              ${status === 'eaten' ? 'bg-red-900/50 border-red-800 opacity-50' : ''}
              ${status === 'eating' ? 'bg-yellow-500 border-yellow-300 animate-pulse' : ''}
            `}>
                            {status === 'eaten' ? 'X' : (status === 'eating' ? '咬' : '')}
                        </div>
                    )
                })}
                {n > 30 && <span className="self-end text-gray-400">...</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-900 p-3 rounded border-l-4 border-red-500">
                    <div className="text-gray-400">完全吃光 (B / A)</div>
                    <div className="text-xl font-bold text-red-400">{eatenFull} 本</div>
                </div>
                <div className={`bg-slate-900 p-3 rounded border-l-4 ${isEating ? 'border-yellow-500' : 'border-gray-500'}`}>
                    <div className="text-gray-400">正在啃 (B % A != 0)</div>
                    <div className={`text-xl font-bold ${isEating ? 'text-yellow-400' : 'text-gray-500'}`}>
                        {isEating ? "是 (+1)" : "否 (+0)"}
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-600 flex justify-between items-center">
                <span className="text-gray-300">完整剩下的书 (left):</span>
                <span className="text-3xl font-bold text-green-400">{remaining}</span>
            </div>
        </div>
    );
};

// --- 主应用 ---
export default function App() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const nextSection = () => {
        if (activeSection < sections.length) setActiveSection(activeSection + 1);
    };

    const prevSection = () => {
        if (activeSection > 1) setActiveSection(activeSection - 1);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center h-full flex flex-col justify-center items-center">
                        <div className="bg-gradient-to-b from-blue-900 to-slate-900 text-white p-12 rounded-3xl shadow-2xl border border-cyan-500/50 relative overflow-hidden max-w-2xl w-full">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                            <Rocket size={80} className="mx-auto mb-6 text-orange-500 animate-bounce" />
                            <h2 className="text-3xl font-extrabold mb-2 text-cyan-300 tracking-widest">GESP C++ 一级 第16课</h2>
                            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">考前冲刺</h1>
                            <div className="inline-block bg-white/10 px-6 py-2 rounded-full border border-white/20">
                                <span className="font-bold tracking-wide text-lg text-yellow-300">🚀 副标题：编程宇航员的发射日</span>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <ShieldCheck className="text-green-400" size={32} /> 情景导入：发射前的安检
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-800 p-6 rounded-xl border border-red-500/50 shadow-lg">
                                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">😱 宇航员的噩梦</h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="text-red-500 shrink-0" />
                                        <span>飞到一半发现“忘带钥匙”<br /><span className="text-sm text-gray-500">(变量未初始化)</span></span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <RotateCcw className="text-red-500 shrink-0" />
                                        <span>火箭发动机“停不下来”<br /><span className="text-sm text-gray-500">(死循环)</span></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl border border-green-500/50 shadow-lg">
                                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">🛡️ 今日任务</h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500" />
                                        <span>进行最后一次全系统扫描</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500" />
                                        <span>排除所有“故障隐患”</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle2 className="text-green-500" />
                                        <span>确保满分通过“安检”</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <BookOpen className="text-cyan-400" size={32} /> 安检第一关：变量“饭盒”
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
                            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500">
                                <h4 className="font-bold text-blue-300 text-lg">int (整数)</h4>
                                <p className="text-sm text-gray-300">只能装“馒头”，小数会被切掉。</p>
                            </div>
                            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500">
                                <h4 className="font-bold text-purple-300 text-lg">double (小数)</h4>
                                <p className="text-sm text-gray-300">“汤碗”，可以装带汤的食物。</p>
                            </div>
                            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500">
                                <h4 className="font-bold text-green-300 text-lg">bool (开关)</h4>
                                <p className="text-sm text-gray-300">非 0 即真。100 也是 true。</p>
                            </div>
                        </div>

                        <VariableChecker />
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Zap className="text-yellow-400" size={32} /> 安检第二关：运算“交警”
                        </h2>
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-600 text-gray-300 mb-6">
                            <p className="text-lg text-center">
                                <span className="font-bold text-white">优先级口诀：</span> 非 &gt; 算术 &gt; 关系 &gt; 逻辑
                            </p>
                        </div>
                        <OperatorLadder />
                        <div className="mt-4 bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500 text-blue-200">
                            <strong className="text-blue-400">💡 补充技巧：取模 (%)</strong><br />
                            分糖果剩下的数。常用于判断奇偶 (<code>x%2</code>)、倍数 (<code>x%3==0</code>) 和个位数 (<code>x%10</code>)。
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Timer className="text-red-400" size={32} /> 安检第三关：循环“跑道”
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-800 p-6 rounded-xl border-t-4 border-blue-500">
                                <h3 className="text-xl font-bold text-blue-400 mb-2">For 循环</h3>
                                <p className="text-gray-300 text-sm mb-4">定好闹钟，跑固定圈数。</p>
                                <code className="bg-black p-2 rounded block text-green-400 text-xs font-mono">
                                    for(int i=1; i&lt;=10; i++) &#123; ... &#125;
                                </code>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl border-t-4 border-purple-500">
                                <h3 className="text-xl font-bold text-purple-400 mb-2">While 循环</h3>
                                <p className="text-gray-300 text-sm mb-4">看天气跑，满足条件就一直跑。</p>
                                <code className="bg-black p-2 rounded block text-green-400 text-xs font-mono">
                                    while(n &gt; 0) &#123; ... &#125;
                                </code>
                            </div>
                        </div>

                        <div className="bg-red-900/30 p-6 rounded-xl border border-red-500 mt-6 flex items-center gap-4">
                            <div className="bg-red-500 p-3 rounded-full text-white animate-pulse">
                                <AlertTriangle size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-400">红色警报</h3>
                                <p className="text-gray-300">
                                    <code>while(1)</code> 必须配 <code>break</code>！<br />
                                    否则变成“不知疲倦的仓鼠”，程序卡死。
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Calculator className="text-green-400" size={32} /> 太空任务 1：逻辑陷阱
                        </h2>
                        <LogicStepper />
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <MousePointer2 className="text-orange-400" size={32} /> 太空任务 2：图书馆里的老鼠
                        </h2>

                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 text-white mb-6">
                            <h3 className="font-bold text-lg mb-2">任务描述</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                图书馆有 <strong className="text-white">N</strong> 本书。
                                老鼠吃一本书需要 <strong className="text-white">A</strong> 小时。
                                <strong className="text-white">B</strong> 小时后，还剩几本<span className="text-yellow-400 font-bold underline">完整</span>的书？
                            </p>
                        </div>

                        <RatSimulator />

                        <div className="bg-yellow-900/30 p-4 rounded-xl border border-yellow-500 text-yellow-200 text-sm mt-4">
                            <strong>🚧 陷阱分析：</strong><br />
                            整数除法 <code>B / A</code> 只能算出“完全吃光”的数量。<br />
                            如果 <code>B % A != 0</code> (有余数)，说明老鼠正在啃下一本！这也算损失！
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Terminal className="text-blue-400" size={32} /> 任务 2：代码实现
                        </h2>

                        <div className="bg-slate-900 text-gray-300 p-6 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 shadow-2xl relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                            <div><span className="text-purple-400">int</span> n, a, b;</div>
                            <div>cin &gt;&gt; n &gt;&gt; a &gt;&gt; b;</div>
                            <div className="h-4"></div>

                            <div className="text-gray-500">// 1. 算出吃光了几本</div>
                            <div><span className="text-purple-400">int</span> eaten = b / a;</div>
                            <div className="h-4"></div>

                            <div className="text-gray-500">// 2. 检查是不是还有一本正在啃</div>
                            <div><span className="text-purple-400">if</span> (b % a != 0) &#123;</div>
                            <div className="pl-4 text-green-400">eaten = eaten + 1; <span className="text-gray-500">// 补刀</span></div>
                            <div>&#125;</div>
                            <div className="h-4"></div>

                            <div className="text-gray-500">// 3. 算出剩下的</div>
                            <div><span className="text-purple-400">int</span> left = n - eaten;</div>
                            <div>cout &lt;&lt; left &lt;&lt; endl;</div>
                        </div>

                        <div className="mt-6 bg-slate-800 p-4 rounded-lg text-white text-sm border-l-4 border-green-500">
                            <strong>🔍 验证一下：</strong><br />
                            10本书，2小时吃1本，过5小时。<br />
                            <code>5 / 2 = 2</code> (吃光2本)<br />
                            <code>5 % 2 = 1</code> (不为0，第3本正在吃)<br />
                            总损失 = 2 + 1 = 3 本。<br />
                            剩余 = 10 - 3 = 7 本。
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Cpu className="text-cyan-400" size={32} /> 发射口诀 —— 考试必背
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: "头文件", desc: "#include <iostream> 和 using namespace std; 不能忘。", color: "bg-blue-600" },
                                { title: "分号", desc: "每句代码结束加分号 ; 像句号一样重要。", color: "bg-purple-600" },
                                { title: "除法", desc: "整数除整数结果是整数（去尾），要小数得用 double。", color: "bg-green-600" },
                                { title: "变量", desc: "先定义，后使用；计数器(cnt)记得初始化为 0。", color: "bg-orange-600" },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-slate-800 p-4 rounded-xl flex items-center gap-4 border border-slate-600 hover:scale-105 transition-transform">
                                    <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className="slide-enter h-full flex flex-col justify-center items-center text-center">
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-cyan-500/30 backdrop-blur-sm max-w-2xl">
                            <CheckCircle2 size={80} className="text-green-400 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-3xl font-bold text-white mb-4">安检通过！准备发射！</h2>
                            <div className="space-y-4 text-gray-300 text-lg mb-8">
                                <p>📖 <strong>作业：</strong>浏览错题本，避免踏入同一条河流。</p>
                                <p>😴 <strong>生活：</strong>保证睡眠，大脑是最高效的 CPU。</p>
                                <p className="text-cyan-300 font-bold text-xl pt-4">
                                    “你们已经掌握了与计算机对话的魔法。<br />
                                    保持冷静，认真审题，满分属于你们！”
                                </p>
                            </div>
                            <button onClick={() => setActiveSection(1)} className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg hover:scale-110 transition-transform flex items-center gap-2 mx-auto">
                                <Rocket size={24} /> 一级火箭，发射成功！
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Error</div>;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-gray-900">
            <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                    <Icon name="rocket" className="text-blue-600" />
                    <span>第16课：考前冲刺</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto transition-transform duration-300 shadow-lg md:shadow-none
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-gray-100 hidden md:block">
                    <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2">
                        <Icon name="rocket" size={24} />
                        GESP C++ 一级
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">第16课:考前冲刺</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 font-medium
                ${activeSection === section.id
                                    ? 'bg-blue-100 text-blue-800 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                            <i className={`p-1 rounded ${activeSection === section.id ? 'bg-white/50' : 'bg-gray-100'}`}>
                                <Icon name={section.icon} size={16} />
                            </i>
                            {section.title}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
                    逻辑一号老师 © 2025
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative pt-16 md:pt-0">
                {/* 背景装饰 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

                <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-lg font-bold text-gray-800 truncate flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">Section {activeSection}</span>
                        {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <div className="flex gap-2 text-sm text-gray-500">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                            <div
                                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                style={{ width: `${(activeSection / sections.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 z-0">
                    <div className="max-w-4xl mx-auto pb-12">
                        {renderContent()}
                    </div>
                </main>

                <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-20">
                    <button
                        onClick={prevSection}
                        disabled={activeSection === 1}
                        className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all
              ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'}`}
                    >
                        <ArrowRight className="rotate-180" size={18} /> 上一步
                    </button>

                    <button
                        onClick={nextSection}
                        disabled={activeSection === sections.length}
                        className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm
              ${activeSection === sections.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'}`}
                    >
                        下一步 <ArrowRight size={18} color="white" />
                    </button>
                </footer>
            </div>
        </div>
    );
}