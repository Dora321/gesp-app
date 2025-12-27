import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Repeat, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Play, RefreshCw, XCircle, Menu, X, Zap, List, Grid3x3, TreePine, TrendingUp } from 'lucide-react';

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
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="text-blue-600" />
                    布尔逻辑：非黑即白
                </h2>
                <p className="text-lg mb-4">
                    计算机的世界只有两种状态：<strong>True (真)</strong> 和 <strong>False (假)</strong>。
                    这就像电灯的开关，要么开，要么关。
                </p>
            </div>

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
            <div className="bg-emerald-100 p-6 rounded-2xl border border-emerald-200 text-emerald-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-emerald-600" />
                    比较运算符：谁大谁小？
                </h2>
                <p className="text-lg mb-4">
                    比较运算符用来比较两个值的大小或是否相等。
                    结果总是 <strong>True</strong> 或 <strong>False</strong>。
                </p>
            </div>

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
            <div className="bg-orange-100 p-6 rounded-2xl border border-orange-200 text-orange-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GitBranch className="text-orange-600" />
                    条件判断：智慧抉择
                </h2>
                <p>
                    <strong>if (如果)</strong>, <strong>elif (否则如果)</strong>, <strong>else (否则)</strong> 是程序的“大脑”。
                    它们让程序根据不同的情况做出不同的反应。
                </p>
            </div>

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
            <div className="bg-sky-100 p-6 rounded-2xl border border-sky-200 text-sky-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TreePine className="text-sky-600" />
                    嵌套条件：决策树
                </h2>
                <p>
                    当一个 if 里面还有 if，就是<strong>嵌套条件</strong>。
                    就像走迷宫，每个岔路口都要做选择！
                </p>
            </div>

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

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200 text-indigo-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Repeat className="text-indigo-600" />
                    循环：不知疲倦的机器
                </h2>
                <p>
                    <strong>for 循环</strong> 像是一个计数器，让程序重复执行特定的次数。
                    输入想让机器人走的步数，看看它会走多远！
                    <br />
                    <span className="text-sm opacity-70">(假设一步是 0.5 米)</span>
                </p>
            </div>

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
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-red-600" />
                    While 循环与中断
                </h2>
                <p>
                    <strong>while</strong> 只要条件满足就会一直执行。小心不要写出<strong>死循环</strong>（永远停不下来）！
                    我们可以用 <strong>break</strong> 紧急刹车。
                </p>
            </div>

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
            <div className="bg-purple-100 p-6 rounded-2xl border border-purple-200 text-purple-900">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="text-purple-600" />
                    逻辑大师挑战赛
                </h2>
                <p>
                    证明你是逻辑鬼才的时候到了！
                </p>
            </div>

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

const sections = [
    { id: 1, title: '布尔逻辑', icon: CheckCircle, component: BooleanSlide },
    { id: 2, title: '比较运算', icon: Zap, component: ComparisonSlide },
    { id: 3, title: '条件判断', icon: GitBranch, component: ConditionSlide },
    { id: 4, title: '嵌套条件', icon: TreePine, component: NestedConditionSlide },
    { id: 5, title: 'For 循环', icon: Repeat, component: LoopSlide },
    { id: 6, title: 'While 火箭', icon: AlertTriangle, component: ChallengeSlide },
    { id: 7, title: '逻辑大师', icon: HelpCircle, component: QuizSlide },
];

export default function PythonFoundation2() {
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [completedSections, setCompletedSections] = useState(() => {
        const saved = localStorage.getItem('pythonF2Progress');
        return saved ? JSON.parse(saved) : [];
    });

    const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

    const markSectionComplete = (sectionId) => {
        if (!completedSections.includes(sectionId)) {
            const updated = [...completedSections, sectionId];
            setCompletedSections(updated);
            localStorage.setItem('pythonF2Progress', JSON.stringify(updated));
        }
    };

    const progressPercentage = Math.round((completedSections.length / sections.length) * 100);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center gap-2">
                    <span className="text-lg">F2: 流程控制</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-0 z-30 bg-white md:static md:w-64 border-r border-slate-200 flex flex-col flex-shrink-0 transition-transform duration-300 md:translate-x-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center gap-2">
                            <Link to="/" className="hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden border border-blue-200">
                                    <span className="text-lg">🏠</span>
                                </div>
                            </Link>
                            F2: 流程控制
                        </h1>
                        <p className="text-xs text-slate-400 mt-2 font-medium">Python 基础体系</p>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden p-2 text-slate-400">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* Progress Bar */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-blue-600">学习进度</span>
                            <span className="text-xs font-bold text-blue-600">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                            {completedSections.length} / {sections.length} 章节完成
                        </div>
                    </div>

                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => {
                                setActiveSection(section.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium
                        ${activeSection === section.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                    `}
                        >
                            <section.icon size={18} className={activeSection === section.id ? 'text-blue-600' : 'text-slate-400'} />
                            <span className="flex-1">{section.title}</span>
                            {completedSections.includes(section.id) && (
                                <CheckCircle size={16} className="text-green-500" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-blue-100 text-xs font-bold uppercase tracking-wider">NEXT</span>
                            <RefreshCw size={16} className="text-blue-200" />
                        </div>
                        <div className="font-bold text-sm">F3: 数据结构探秘</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                            {sections.find(s => s.id === activeSection)?.title}
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                    </header>

                    <ActiveComponent />

                    <div className="mt-8 md:mt-12 flex justify-between border-t border-slate-200 pt-6 md:pt-8 pb-8">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setActiveSection(prev => Math.max(1, prev - 1));
                                window.scrollTo(0, 0);
                            }}
                            className={activeSection === 1 ? 'opacity-0 pointer-events-none' : ''}
                        >
                            上一章
                        </Button>

                        {!completedSections.includes(activeSection) && (
                            <Button
                                variant="success"
                                onClick={() => markSectionComplete(activeSection)}
                                className="mx-4"
                            >
                                <CheckCircle size={18} />
                                标记完成
                            </Button>
                        )}

                        <Button
                            onClick={() => {
                                if (!completedSections.includes(activeSection)) {
                                    markSectionComplete(activeSection);
                                }
                                setActiveSection(prev => Math.min(sections.length, prev + 1));
                                window.scrollTo(0, 0);
                            }}
                            className={activeSection === sections.length ? 'opacity-0 pointer-events-none' : ''}
                        >
                            继续学习 <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
