import React, { useState, useMemo } from 'react';
import { GitBranch, Repeat, HelpCircle, CheckCircle, AlertTriangle, Play, RefreshCw, XCircle, Zap, List, Grid3x3, TreePine, TrendingUp, Code, BookOpen } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PyCodeTracer from '../../../components/PyCodeTracer';
import PythonLessonShell, { MasteryCheck, PredictCheck, SlideHeader, TransferCheck } from '../shell/PythonLessonShell';

// --- Shared Components ---
const Button = ({ onClick, children, className, variant = 'primary', disabled = false }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary: "bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50",
        success: "bg-green-500 text-white hover:bg-green-600 shadow-md",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    };
    return (
        <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

const CodeBlock = ({ code }) => (
    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm shadow-inner border border-slate-700 overflow-x-auto">
        <pre>{code}</pre>
    </div>
);

// --- Sections ---

// 1. Boolean Logic Slide (True/False Gates)
const BooleanSlide = () => {
    const [switches, setSwitches] = useState({ a: false, b: false });
    const [showTruthTable, setShowTruthTable] = useState(false);

    const truthTableData = [
        { a: false, b: false },
        { a: false, b: true },
        { a: true, b: false },
        { a: true, b: true },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={CheckCircle} title="布尔逻辑：非黑即白">
                计算机的世界只有两种状态：<strong>True (真)</strong> 和 <strong>False (假)</strong>。这就像电灯的开关，要么开，要么关。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-4">操作面板</h3>
                    <div className="flex gap-8 justify-center mb-6">
                        {['a', 'b'].map(key => (
                            <div key={key} className="flex flex-col items-center gap-2">
                                <span className="font-mono font-bold text-slate-400 uppercase">{key}</span>
                                <button
                                    onClick={() => setSwitches(p => ({ ...p, [key]: !p[key] }))}
                                    className={`
                                        w-16 h-24 rounded-full border-4 transition-colors relative
                                        ${switches[key] ? 'bg-green-500 border-green-600' : 'bg-slate-200 border-slate-300'}
                                    `}
                                >
                                    <div className={`
                                        absolute w-12 h-12 bg-white rounded-full shadow-md left-1 transition-all duration-300
                                        ${switches[key] ? 'top-1' : 'top-10'}
                                    `}></div>
                                </button>
                                <span className={`font-bold font-mono ${switches[key] ? 'text-green-600' : 'text-slate-400'}`}>
                                    {switches[key] ? 'True' : 'False'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white font-mono space-y-4">
                    <h3 className="text-slate-400 text-sm uppercase mb-2">逻辑运算结果</h3>

                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span>A <span className="text-orange-400">and</span> B</span>
                        <span className={switches.a && switches.b ? 'text-green-400' : 'text-red-400'}>
                            {String(switches.a && switches.b)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span>A <span className="text-orange-400">or</span> B</span>
                        <span className={switches.a || switches.b ? 'text-green-400' : 'text-red-400'}>
                            {String(switches.a || switches.b)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <span><span className="text-orange-400">not</span> A</span>
                        <span className={!switches.a ? 'text-green-400' : 'text-red-400'}>
                            {String(!switches.a)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Truth Table */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-900 flex items-center gap-2">

                        <Grid3x3 className="text-blue-600" />
                        真值表
                    </h3>
                    <button
                        onClick={() => setShowTruthTable(!showTruthTable)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700"
                    >
                        {showTruthTable ? '隐藏 ▲' : '显示 ▼'}
                    </button>
                </div>

                {showTruthTable && (
                    <div className="overflow-x-auto animate-in fade-in slide-in-from-top-4 duration-300">
                        <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3 font-bold">A</th>
                                    <th className="p-3 font-bold">B</th>
                                    <th className="p-3 font-bold">A AND B</th>
                                    <th className="p-3 font-bold">A OR B</th>
                                    <th className="p-3 font-bold">NOT A</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono">
                                {truthTableData.map((row, idx) => (
                                    <tr key={idx} className={`
                                        border-b border-blue-100 transition-colors
                                        ${switches.a === row.a && switches.b === row.b ? 'bg-blue-100 font-bold' : 'hover:bg-blue-50'}
                                    `}>
                                        <td className={`p-3 text-center ${row.a ? 'text-green-600' : 'text-red-600'}`}>
                                            {row.a ? 'T' : 'F'}
                                        </td>
                                        <td className={`p-3 text-center ${row.b ? 'text-green-600' : 'text-red-600'}`}>
                                            {row.b ? 'T' : 'F'}
                                        </td>
                                        <td className={`p-3 text-center ${row.a && row.b ? 'text-green-600' : 'text-red-600'}`}>
                                            {row.a && row.b ? 'T' : 'F'}
                                        </td>
                                        <td className={`p-3 text-center ${row.a || row.b ? 'text-green-600' : 'text-red-600'}`}>
                                            {row.a || row.b ? 'T' : 'F'}
                                        </td>
                                        <td className={`p-3 text-center ${!row.a ? 'text-green-600' : 'text-red-600'}`}>
                                            {!row.a ? 'T' : 'F'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-3 text-xs text-blue-700 text-center">
                            💡 当前选择的行会高亮显示
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 2. Comparison Operators Playground
const ComparisonSlide = () => {
    const [num1, setNum1] = useState(18);
    const [num2, setNum2] = useState(21);
    const [selectedOp, setSelectedOp] = useState('>');

    const operators = [
        { symbol: '>', name: '大于', example: (a, b) => a > b },
        { symbol: '<', name: '小于', example: (a, b) => a < b },
        { symbol: '>=', name: '大于等于', example: (a, b) => a >= b },
        { symbol: '<=', name: '小于等于', example: (a, b) => a <= b },
        { symbol: '==', name: '等于', example: (a, b) => a === b },
        { symbol: '!=', name: '不等于', example: (a, b) => a !== b },
    ];

    const currentOp = operators.find(op => op.symbol === selectedOp);
    const result = currentOp.example(num1, num2);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={Zap} title="比较运算符：谁大谁小？">
                比较运算符用来比较两个值的大小或是否相等。结果总是 <strong>True</strong> 或 <strong>False</strong>。
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Number Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                    <h3 className="font-bold text-slate-700 mb-4">选择数字</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">第一个数字: {num1}</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={num1}
                                onChange={(e) => setNum1(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-2">第二个数字: {num2}</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={num2}
                                onChange={(e) => setNum2(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {operators.map(op => (
                            <button
                                key={op.symbol}
                                onClick={() => setSelectedOp(op.symbol)}
                                className={`p-3 rounded-lg text-sm font-bold transition-all ${selectedOp === op.symbol
                                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {op.symbol}
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-800 p-4 rounded-xl text-white font-mono">
                        <div className="text-sm text-slate-400 mb-2">Python 代码:</div>
                        <div className="text-lg">
                            {num1} {selectedOp} {num2}
                        </div>
                    </div>
                </div>

                {/* Visual Comparison */}
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 rounded-2xl border-2 border-emerald-200">
                    <h3 className="text-sm font-bold text-emerald-600 mb-4 text-center">{currentOp.name}</h3>

                    <div className="flex items-end justify-around h-64 mb-6">
                        {/* Bar 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl font-bold text-indigo-600">{num1}</div>
                            <div
                                className="w-20 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-300 shadow-lg"
                                style={{ height: `${(num1 / 100) * 200}px` }}
                            ></div>
                        </div>

                        {/* Operator */}
                        <div className="text-4xl font-bold text-emerald-600 mb-20">
                            {selectedOp}
                        </div>

                        {/* Bar 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl font-bold text-purple-600">{num2}</div>
                            <div
                                className="w-20 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all duration-300 shadow-lg"
                                style={{ height: `${(num2 / 100) * 200}px` }}
                            ></div>
                        </div>
                    </div>

                    {/* Result */}
                    <div className={`text-center p-4 rounded-xl text-white font-bold text-2xl transition-all ${result ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                        结果: {result ? 'True ✓' : 'False ✗'}
                    </div>

                    {/* Real-world Example */}
                    <div className="mt-4 bg-white p-3 rounded-lg text-sm text-slate-600">
                        <div className="font-bold text-emerald-600 mb-1">💡 实际应用:</div>
                        {selectedOp === '>' && `年龄 ${num1} > ${num2} 吗？${result ? '是' : '否'}，${result ? '第一个人年龄更大' : '第一个人年龄不大于第二个'}`}
                        {selectedOp === '<' && `价格 ¥${num1} < ¥${num2} 吗？${result ? '是' : '否'}，${result ? '第一个更便宜' : '第一个不便宜'}`}
                        {selectedOp === '>=' && `分数 ${num1} >= ${num2} 吗？${result ? '达标' : '未达标'}`}
                        {selectedOp === '<=' && `库存 ${num1} <= ${num2} 吗？${result ? '库存充足' : '库存不足'}`}
                        {selectedOp === '==' && `密码 ${num1} == ${num2} 吗？${result ? '密码正确！' : '密码错误！'}`}
                        {selectedOp === '!=' && `ID ${num1} != ${num2} 吗？${result ? '不是同一个人' : '是同一个人'}`}
                    </div>
                </div>
            </div>

            <PredictCheck
                title="先预测：链式比较"
                prompt="x = 15。在 Python 里 print(1 < x < 10) 会输出什么？"
                options={['True', 'False']}
                correctIndex={1}
                explanation="Python 支持链式比较：1 < x < 10 等价于 (1 < x) and (x < 10)。x = 15 时 x < 10 为假，所以整体是 False。"
                misconception="C++ 不能这样写！在 C++ 里 1 < x < 10 会先算 1 < x 得 true（1），再算 1 < 10 永远成立——是经典陷阱。两套语言别记混。"
            />
        </div>
    );
};

// 3. Conditionals Slide (Traffic Light)
const ConditionSlide = () => {
    const [light, setLight] = useState('red'); // red, yellow, green

    const getAction = () => {
        if (light === 'red') return 'Stop! 🛑';
        if (light === 'yellow') return 'Wait... ⚠️';
        if (light === 'green') return 'Go! 🚀';
        return '';
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={GitBranch} title="条件判断：智慧抉择">
                <strong>if (如果)</strong>、<strong>elif (否则如果)</strong>、<strong>else (否则)</strong> 是程序的“大脑”。它们让程序根据不同情况做出不同反应。
            </SlideHeader>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-10">
                {/* Traffic Light */}
                <div className="bg-slate-800 p-6 rounded-3xl shadow-2xl border-4 border-slate-700 flex flex-col gap-4">
                    {['red', 'yellow', 'green'].map(color => (
                        <div
                            key={color}
                            onClick={() => setLight(color)}
                            className={`
                                w-20 h-20 rounded-full cursor-pointer transition-all duration-300 shadow-inner
                                ${light === color ? `bg-${color}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-110 z-10` : 'bg-slate-700 opacity-30'}
                                ${light === color && color === 'red' ? 'shadow-red-500/50' : ''}
                                ${light === color && color === 'yellow' ? 'shadow-yellow-500/50' : ''}
                                ${light === color && color === 'green' ? 'shadow-green-500/50' : ''}
                            `}
                        />
                    ))}
                </div>

                {/* Code Logic */}
                <div className="flex-1 max-w-md space-y-4">
                    <div className="relative">
                        <CodeBlock code={`
if light == 'red':
    print("Stop! 🛑")
elif light == 'yellow':
    print("Wait... ⚠️")
else:
    print("Go! 🚀")
                        `} />
                        {/* Highlight overlay */}
                        <div className={`absolute left-0 w-full h-6 bg-yellow-500/20 pointer-events-none transition-all duration-300
                            ${light === 'red' ? 'top-[20px]' : light === 'yellow' ? 'top-[60px]' : 'top-[100px]'}
                         `}></div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center">
                        <span className="font-bold text-slate-500">执行结果:</span>
                        <span className="text-2xl font-bold text-slate-800 animate-pulse">{getAction()}</span>
                    </div>
                </div>
            </div>

            <PredictCheck
                title="先预测，再点灯"
                prompt="light = 'red' 时，上面这段 if / elif / else 会打印几行？"
                options={['3 行，每个分支都会查一遍', '1 行，命中 if 就停下']}
                correctIndex={1}
                explanation="if / elif / else 是一条链：命中第一个为真的分支就执行它，整条链立刻结束，不会再看后面的 elif / else。所以只打印 Stop! 一行。"
                misconception="以为 if、elif、else 是三个各自独立的判断，会逐个都执行。"
            />
        </div>
    );
};

// 4. Nested Conditionals Decision Tree
const NestedConditionSlide = () => {
    const [weather, setWeather] = useState('sunny');
    const [temperature, setTemperature] = useState(25);

    const getRecommendation = () => {
        if (weather === 'sunny') {
            if (temperature > 30) return { emoji: '🏖️', text: '太热了！去游泳吧！', color: 'from-orange-400 to-red-500' };
            if (temperature > 20) return { emoji: '🚴', text: '天气不错，骑车出去玩！', color: 'from-yellow-400 to-orange-400' };
            return { emoji: '🧥', text: '有点凉，穿件外套吧', color: 'from-blue-300 to-cyan-400' };
        } else if (weather === 'rainy') {
            if (temperature > 20) return { emoji: '☔', text: '带伞！穿轻便的雨衣', color: 'from-gray-400 to-blue-500' };
            return { emoji: '🌧️', text: '又冷又湿，在家看书吧', color: 'from-gray-500 to-blue-600' };
        } else { // cloudy
            if (temperature > 25) return { emoji: '⛅', text: '多云，适合散步', color: 'from-slate-300 to-gray-400' };
            return { emoji: '☁️', text: '有点阴冷，穿暖和点', color: 'from-gray-400 to-slate-500' };
        }
    };

    const recommendation = getRecommendation();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={TreePine} title="嵌套条件：决策树">
                当一个 if 里面还有 if，就是<strong>嵌套条件</strong>。就像走迷宫，每个岔路口都要做选择！
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                    <h3 className="font-bold text-slate-700">选择天气条件</h3>

                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-3">天气:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { value: 'sunny', emoji: '☀️', label: '晴天' },
                                { value: 'rainy', emoji: '🌧️', label: '雨天' },
                                { value: 'cloudy', emoji: '☁️', label: '多云' }
                            ].map(w => (
                                <button
                                    key={w.value}
                                    onClick={() => setWeather(w.value)}
                                    className={`p-4 rounded-xl transition-all ${weather === w.value
                                        ? 'bg-sky-600 text-white shadow-lg scale-105'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{w.emoji}</div>
                                    <div className="text-xs font-bold">{w.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-600 mb-2">
                            温度: {temperature}°C
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={temperature}
                            onChange={(e) => setTemperature(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl text-green-400 font-mono text-sm">
                        <div className="text-slate-400 mb-2"># Python 嵌套条件</div>
                        if weather == '{weather}':<br />
                        &nbsp;&nbsp;if temperature &gt; 30:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;print("去游泳")<br />
                        &nbsp;&nbsp;elif temperature &gt; 20:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;print("去骑车")<br />
                        &nbsp;&nbsp;else:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;print("穿外套")
                    </div>
                </div>

                {/* Decision Tree Visualization */}
                <div className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-br ${recommendation.color}`}>
                    <h3 className="text-sm font-bold mb-6 text-center opacity-90">决策结果</h3>

                    {/* Decision Path */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-bold">1</div>
                            <div>
                                <div className="text-xs opacity-75">天气判断</div>
                                <div className="font-bold">
                                    {weather === 'sunny' ? '☀️ 晴天' : weather === 'rainy' ? '🌧️ 雨天' : '☁️ 多云'}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-bold">2</div>
                            <div>
                                <div className="text-xs opacity-75">温度判断</div>
                                <div className="font-bold">{temperature}°C</div>
                            </div>
                        </div>
                    </div>

                    {/* Final Recommendation */}
                    <div className="text-center bg-white/30 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="text-6xl mb-3">{recommendation.emoji}</div>
                        <div className="text-xl font-bold">{recommendation.text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Loop Strategy (Robot)
const LoopSlide = () => {
    const [steps, setSteps] = useState(0);
    const [targetSteps, setTargetSteps] = useState(5);
    const [isThinking, setIsThinking] = useState(false);

    // Simulate loop execution
    const runLoop = async () => {
        if (isThinking) return;
        setIsThinking(true);
        setSteps(0);

        for (let i = 0; i < targetSteps; i++) {
            await new Promise(r => setTimeout(r, 600));
            setSteps(prev => prev + 1);
        }
        setIsThinking(false);
    };

    const traceSteps = useMemo(() => {
        const result = [{ active: [0], vars: { i: '–' } }];
        const printed = [];
        for (let i = 0; i < 5; i++) {
            printed.push(`第 ${i + 1} 步`);
            result.push({
                active: [0, 1],
                vars: { i },
                action: i === 0 ? '开始循环' : '下一轮',
                row: [`第 ${i + 1} 次`, i, `第 ${i + 1} 步`],
                output: printed.join('   '),
            });
        }
        result.push({
            active: [0],
            vars: { i: 4 },
            action: '结束',
            exit: 'range(5) 把 0、1、2、3、4 取完了，循环自动停止',
            output: printed.join('   '),
        });
        return result;
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={Repeat} title="循环：不知疲倦的机器">
                <strong>for 循环</strong> 像一个计数器，让程序重复执行特定的次数。输入想让机器人走的步数，看看它会走多远！<span className="text-sm opacity-70">（假设一步 0.5 米）</span>
            </SlideHeader>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-slate-700">控制面板</h3>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <label className="text-sm font-bold text-slate-500 block mb-2">输入步数 (1-10):</label>
                        <input
                            type="number"
                            min="1" max="10"
                            value={targetSteps}
                            onChange={(e) => setTargetSteps(Math.min(10, Math.max(1, Number(e.target.value))))}
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />
                        <CodeBlock code={`
# 让机器人走 ${targetSteps} 步
for i in range(${targetSteps}):
    robot.walk()
    print(f"走了 {i+1} 步")
    # 总距离 = 步数 * 0.5
                     `} />
                    </div>

                    <Button
                        onClick={runLoop}
                        disabled={isThinking}
                        className="w-full"
                    >
                        {isThinking ? '机器人正在执行...' : '开始运行循环 ▶️'}
                    </Button>
                </div>

                <div className="bg-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[200px]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-1 gap-2 p-2 opacity-20">
                        {[...Array(6)].map((_, i) => <div key={i} className="border border-slate-400 rounded"></div>)}
                    </div>

                    {/* Robot */}
                    <div
                        className="text-6xl transition-all duration-500 z-10 filter drop-shadow-xl"
                        style={{ transform: `translateX(${(Math.min(steps, 6) - 3) * 40}px)` }}
                    >
                        🤖
                    </div>

                    <div className="mt-8 font-bold text-indigo-600 bg-white/80 px-4 py-2 rounded-xl backdrop-blur-sm text-center">
                        <div>已走步数: {steps} / {targetSteps}</div>
                        <div className="text-xs text-indigo-400 mt-1">
                            总距离: {steps} x 0.5 = {(steps * 0.5).toFixed(1)} 米
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-1 flex items-center gap-2">
                    <Code size={18} className="text-indigo-600" /> 看清楚循环变量 <code>i</code> 到底取了哪些值
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                    很多同学以为 <code>range(5)</code> 是 1 到 5。点「下一步」看真相：<code>i</code> 从 <strong>0</strong> 开始，到 <strong>4</strong> 结束，正好 5 次。
                </p>
                <PyCodeTracer
                    title="for 循环追踪器"
                    code={`for i in range(5):
    print("第", i + 1, "步")`}
                    varOrder={['i']}
                    columns={['第几次', 'i 的值', 'print 输出']}
                    steps={traceSteps}
                    hint="range(5) 给出 0,1,2,3,4——所以要打印「第 i+1 步」才是 1~5。"
                />
            </div>

            <PredictCheck
                title="先预测：range 的终点"
                prompt="for i in range(1, 5): 循环体执行几次？最后一次 i 是几？"
                options={['5 次，最后 i = 5', '4 次，最后 i = 4']}
                correctIndex={1}
                explanation="range(1, 5) 取 1、2、3、4，不包含终点 5。所以执行 4 次，最后一次 i = 4。记住：range 的终点是「够不到」的。"
                misconception="以为 range(1, 5) 会取到 5。终点永远取不到，这正是循环少跑或多跑一次的常见原因。"
            />

            <TransferCheck
                prompt="换个例子：for i in range(2, 8): 这个循环执行几次？第一次和最后一次的 i 各是多少？把所有 i 列出来。"
                hint="range(a, b) 从 a 开始，到 b 之前停（取不到 b）；次数 = b - a。"
                answer="执行 6 次；第一次 i=2，最后一次 i=7；i 依次是 2, 3, 4, 5, 6, 7。"
                steps={[
                    'range(2, 8) 从 2 开始，取不到终点 8，所以最大只到 7。',
                    'i 依次是 2, 3, 4, 5, 6, 7，一共 8 - 2 = 6 个。',
                    '第一次 i = 2，最后一次 i = 7（不是 8）。',
                ]}
            />
        </div>
    );
};

// 6. List Operations Visualizer
const ListOpsSlide = () => {
    const [items, setItems] = useState(['🍎', '🍌', '🍇', '🍊', '🍓']);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [operation, setOperation] = useState('iterate');

    const runAnimation = async () => {
        setIsAnimating(true);
        setCurrentIndex(-1);

        if (operation === 'iterate') {
            for (let i = 0; i < items.length; i++) {
                await new Promise(r => setTimeout(r, 700));
                setCurrentIndex(i);
            }
        } else if (operation === 'filter') {
            for (let i = 0; i < items.length; i++) {
                await new Promise(r => setTimeout(r, 700));
                setCurrentIndex(i);
            }
            await new Promise(r => setTimeout(r, 500));
            setItems(prev => prev.filter((_, i) => i % 2 === 0));
        }

        setIsAnimating(false);
        setCurrentIndex(-1);
    };

    const reset = () => {
        setItems(['🍎', '🍌', '🍇', '🍊', '🍓']);
        setCurrentIndex(-1);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-violet-100 p-6 rounded-2xl border border-violet-200 text-violet-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <List className="text-violet-600" />
                    列表操作：批量处理
                </h2>
                <p>
                    <strong>for 循环 + 列表</strong>是黄金搭档！我们可以遍历列表中的每个元素，
                    或者根据条件筛选、修改它们。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-4">
                    <h3 className="font-bold text-slate-700">选择操作</h3>

                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { value: 'iterate', label: '遍历所有', desc: 'for item in list:' },
                            { value: 'filter', label: '筛选偶数位', desc: 'filter(list, condition)' }
                        ].map(op => (
                            <button
                                key={op.value}
                                onClick={() => setOperation(op.value)}
                                disabled={isAnimating}
                                className={`p-4 rounded-xl text-left transition-all ${operation === op.value
                                    ? 'bg-violet-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="font-bold">{op.label}</div>
                                <div className="text-xs opacity-75 font-mono">{op.desc}</div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={runAnimation} disabled={isAnimating} variant="primary" className="flex-1">
                            {isAnimating ? '运行中...' : '开始运行 ▶️'}
                        </Button>
                        <Button onClick={reset} variant="secondary">重置</Button>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl text-green-400 font-mono text-sm whitespace-pre">
                        <div className="text-slate-400 mb-2"># Python 代码</div>
                        {operation === 'iterate' && 'for fruit in fruits:\n  print(fruit)'}
                        {operation === 'filter' && 'fruits = [f for i, f in\n  enumerate(fruits) if i % 2 == 0]'}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-2xl border-2 border-violet-200">
                    <h3 className="text-sm font-bold text-violet-600 mb-6 text-center">列表可视化</h3>

                    <div className="flex flex-wrap gap-3 justify-center min-h-[200px] items-start">
                        {items.map((item, idx) => (
                            <div
                                key={`${item}-${idx}`}
                                className={`
                                    w-20 h-20 rounded-xl flex flex-col items-center justify-center text-3xl
                                    transition-all duration-300
                                    ${currentIndex === idx
                                        ? 'bg-violet-600 text-white scale-125 shadow-2xl rotate-6'
                                        : 'bg-white shadow-md hover:scale-105'
                                    }
                                `}
                            >
                                <div>{item}</div>
                                <div className={`text-xs font-bold mt-1 ${currentIndex === idx ? 'text-white' : 'text-slate-500'}`}>[{idx}]</div>
                            </div>
                        ))}
                    </div>

                    {currentIndex >= 0 && (
                        <div className="mt-6 bg-white p-4 rounded-lg text-center animate-in fade-in">
                            <div className="text-sm text-violet-600 font-bold">当前处理:</div>
                            <div className="text-2xl">索引 {currentIndex}: {items[currentIndex]}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 7. While/Break Challenge
const ChallengeSlide = () => {
    const [fuel, setFuel] = useState(10);
    const [status, setStatus] = useState('ready'); // ready, running, success, fail

    const startMission = async () => {
        setStatus('running');
        let currentFuel = 10;

        // Emulate while loop
        while (currentFuel > 0) {
            await new Promise(r => setTimeout(r, 400));
            currentFuel -= 1;
            setFuel(currentFuel);

            // Random event: found battery (condition to break or continue)
            if (currentFuel === 5) {
                // Just a simulated visual break for demo? 
                // Let's make it simple: "While fuel > 0: fly()"
            }
        }
        setStatus('success');
    };

    const reset = () => {
        setFuel(10);
        setStatus('ready');
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={AlertTriangle} title="While 循环与中断">
                <strong>while</strong> 只要条件满足就会一直执行。小心别写出<strong>死循环</strong>（永远停不下来）！必要时用 <strong>break</strong> 紧急刹车。
            </SlideHeader>

            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="flex justify-between items-start z-10 relative">
                    <div className="space-y-4 max-w-sm">
                        <div className="font-mono text-green-400 text-sm">
                            fuel = 10<br />
                            while fuel &gt; 0:<br />
                            &nbsp;&nbsp;rocket.fly()<br />
                            &nbsp;&nbsp;fuel = fuel - 1<br />
                            print("Land safely")
                        </div>
                        <div className="flex gap-4">
                            <Button onClick={startMission} disabled={status === 'running'} variant="success">
                                {status === 'running' ? '飞行中...' : '发射火箭 🚀'}
                            </Button>
                            <Button onClick={reset} variant="secondary">重置</Button>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-sm text-slate-400 mb-1">剩余燃料</div>
                        <div className={`text-4xl font-bold font-mono ${fuel < 3 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                            {fuel * 10}%
                        </div>
                    </div>
                </div>

                {/* Rocket Animation */}
                <div className={`
                    absolute bottom-0 right-20 text-8xl transition-transform duration-500
                    ${status === 'running' ? 'translate-y-[-200px] rotate-45' : 'translate-y-0'}
                    ${status === 'ready' ? '' : 'shake'}
                `}>
                    🚀
                </div>

                {/* Stars Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 text-yellow-100">✨</div>
                    <div className="absolute top-40 right-40 text-yellow-100 text-xs">✨</div>
                    <div className="absolute bottom-20 left-1/2 text-yellow-100 text-lg">✨</div>
                </div>
            </div>
        </div>
    );
}


// 8. Quiz Slide
const QuizSlide = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showHints, setShowHints] = useState({});

    const questions = [
        { id: 'q1', text: 'True and False 的结果是？', options: ['True', 'False', 'Unknown'], correct: 'False', difficulty: '简单', hint: 'and 要求两个都是 True 才返回 True' },
        { id: 'q2', text: 'if 5 > 3: print("A") else: print("B") 输出？', options: ['A', 'B', 'Error'], correct: 'A', difficulty: '简单', hint: '5 确实大于 3，所以条件为 True' },
        { id: 'q3', text: 'for i in range(3): print(i) 最后输出？', options: ['0', '1', '2'], correct: '2', difficulty: '中等', hint: 'range(3) 生成 0, 1, 2，最后输出的是2' },
        { id: 'q4', text: '18 >= 18 的结果是？', options: ['True', 'False'], correct: 'True', difficulty: '简单', hint: '>= 表示大于或等于' },
        { id: 'q5', text: 'not True or False 的结果是？', options: ['True', 'False'], correct: 'False', difficulty: '中等', hint: 'not True 是 False，False or False 是 False' },
        { id: 'q6', text: 'while 条件为 False 时，循环体会执行吗？', options: ['会', '不会', '报错'], correct: '不会', difficulty: '中等', hint: 'while 只在条件为 True 时才执行' },
    ];

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    const getAchievement = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage === 100) return { emoji: '🏆', text: '完美大师', color: 'text-yellow-600' };
        if (percentage >= 80) return { emoji: '🌟', text: '优秀学员', color: 'text-blue-600' };
        if (percentage >= 60) return { emoji: '👍', text: '继续加油', color: 'text-green-600' };
        return { emoji: '💪', text: '再接再厉', color: 'text-orange-600' };
    };

    const toggleHint = (qid) => {
        setShowHints(prev => ({ ...prev, [qid]: !prev[qid] }));
    };

    const allAnswered = questions.every(q => answers[q.id]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SlideHeader accent="blue" icon={HelpCircle} title="逻辑大师挑战赛">
                证明你是逻辑鬼才的时候到了！答对全部题目即可通关。
            </SlideHeader>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="pb-4 border-b border-slate-100 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                            <p className="font-bold text-slate-700">{idx + 1}. {q.text}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${q.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                                q.difficulty === '中等' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {q.difficulty}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {q.options.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                    disabled={score !== null}
                                    className={`px-4 py-2 rounded-lg text-sm border transition-all
                                        ${answers[q.id] === opt
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}
                                        ${score !== null ? 'cursor-not-allowed opacity-60' : ''}
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {showHints[q.id] && (
                            <div className="mt-2 text-xs bg-blue-50 text-blue-700 p-2 rounded-lg">
                                💡 提示: {q.hint}
                            </div>
                        )}
                        {score === null && (
                            <button
                                onClick={() => toggleHint(q.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                            >
                                {showHints[q.id] ? '隐藏提示' : '显示提示'}
                            </button>
                        )}
                    </div>
                ))}

                {score === null ? (
                    <Button
                        onClick={checkAnswers}
                        variant="primary"
                        disabled={!allAnswered}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                        {allAnswered ? '提交答案' : `请回答所有问题 (${Object.keys(answers).length}/${questions.length})`}
                    </Button>
                ) : (
                    <div className="text-center animate-in zoom-in space-y-4">
                        <div className="text-6xl">{getAchievement().emoji}</div>
                        <h3 className={`text-2xl font-bold ${getAchievement().color}`}>
                            {getAchievement().text}
                        </h3>
                        <div className="text-xl text-slate-700">
                            你答对了 <span className="font-bold text-purple-600">{score}</span> / {questions.length} 题
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-600 h-full transition-all duration-1000"
                                style={{ width: `${(score / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        {score < questions.length && (
                            <Button onClick={() => { setScore(null); setAnswers({}); setShowHints({}); }} variant="secondary" className="mt-4">
                                再试一次
                            </Button>
                        )}
                        {score === questions.length && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mt-4">
                                <div className="text-green-700 font-bold">🎉 完美通关！你已经掌握了流程控制的精髓！</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const f2MasteryItems = [
    {
        label: '能先预测 if / elif / else 会走哪一个分支。',
        evidence: '给一个分数或年龄，能在运行前说出哪个条件最先变成 True。',
        retryHint: '回到“条件判断”，按从上到下的顺序逐句判断真/假。',
    },
    {
        label: '能解释 range(start, stop, step) 的终点为什么不包含。',
        evidence: '能写出 range(2, 10, 2) 会产生 2、4、6、8，不会到 10。',
        retryHint: '回到“循环”，把每次 i 的值写成一列，不要只看公式。',
    },
    {
        label: '能判断 for 和 while 该选哪一个。',
        evidence: '次数明确用 for，等某个条件发生再停用 while，并能说出停止条件。',
        retryHint: '回到“While 循环与中断”，先问自己“我知道要重复几次吗”。',
    },
    {
        label: '能找出一个死循环为什么停不下来。',
        evidence: '能指出循环条件里的变量有没有在循环体里被改变。',
        retryHint: '回到“逻辑大师挑战赛”，用表格追踪变量每一轮的变化。',
    },
];

const SummarySlide = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SlideHeader accent="blue" icon={BookOpen} title="小结与下一步">
            这一课，你让程序学会了「判断」和「重复」。把下面三件事记牢，控制流程就稳了。
        </SlideHeader>

        <div className="grid gap-4 md:grid-cols-3">
            {[
                ['真与假', '布尔值和比较运算的结果只有 True / False，是所有判断的基础。'],
                ['会判断', 'if / elif / else 让程序按条件走不同分支。'],
                ['会重复', 'for 按次数重复，while 按条件重复——记得让条件能停下来。'],
            ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-2 text-sm font-black text-blue-700">{title}</div>
                    <p className="text-sm font-semibold leading-7 text-slate-600">{desc}</p>
                </div>
            ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2 font-black text-slate-800">
                <CheckCircle size={16} className="text-blue-600" /> 学完自测
            </div>
            <ul className="grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-3">
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能说出条件真/假各走哪段代码</li>
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能解释 range 的起点、终点和步长</li>
                <li className="flex gap-2"><span className="text-blue-500">✓</span> 能避免 while 条件不变导致死循环</li>
            </ul>
        </div>

        <MasteryCheck
            title="F2 控制流程离开前检查"
            description="如果能预测分支、手推 range、区分 for/while、定位死循环，就可以进入数据结构。"
            accent="blue"
            items={f2MasteryItems}
        />

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="mb-1 font-black text-blue-800">下一课：F3 列表与字典</div>
            <p className="text-sm font-semibold leading-7 text-blue-900">
                控制流程让程序「动」起来；下一课用列表、字典和字符串「装」更多真实数据，再配合循环批量处理。
            </p>
        </div>
    </div>
);

const sections = [
    { id: 1, title: '布尔逻辑', category: '真与假', icon: CheckCircle, component: BooleanSlide },
    { id: 2, title: '比较运算', category: '得到真假', icon: Zap, component: ComparisonSlide },
    { id: 3, title: '条件判断', category: 'if / elif / else', icon: GitBranch, component: ConditionSlide },
    { id: 4, title: '嵌套条件', category: '决策树', icon: TreePine, component: NestedConditionSlide },
    { id: 5, title: 'For 循环', category: '按次数重复', icon: Repeat, component: LoopSlide },
    { id: 6, title: 'While 火箭', category: '按条件重复', icon: AlertTriangle, component: ChallengeSlide },
    { id: 7, title: '逻辑大师', category: '闯关测验', icon: HelpCircle, component: QuizSlide },
    { id: 8, title: '小结与衔接', category: '复盘 + 下一步', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation2() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F2"
            lessonTitle="控制流程"
            lessonSubtitle="让程序学会判断和重复"
            accent="blue"
            hero={{
                title: '让程序学会“判断”和“重复”',
                description: '这一课把程序从“一行一行往下走”，升级成会根据条件做选择、按规则重复——这是后面写任何小游戏和小工具的基础。',
            }}
            prerequisites={['会用变量保存一个值', '会用 print 输出结果', '理解 True / False 两种结果']}
            sections={sections}
            previousPath="/python/f1"
            nextPath="/python/f3"
            nextLabel="下一课：F3 列表与字典"
            topSupport={<PythonFoundationSupport lessonId="f2" />}
            bottomSupport={<PythonFoundationSupport lessonId="f2" placement="bottom" />}
        />
    );
}
