import { useState } from 'react';
import { GitBranch, CheckCircle, Zap, Grid3x3, TreePine } from 'lucide-react';
import { PredictCheck, SlideHeader } from '../../shell/PythonLessonShell';
import { CodeBlock } from './Shared';

export const BooleanSlide = () => {
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
                                    type="button"
                                    onClick={() => setSwitches(p => ({ ...p, [key]: !p[key] }))}
                                    aria-label={`切换 ${key.toUpperCase()}，当前为 ${switches[key] ? 'True' : 'False'}`}
                                    aria-pressed={switches[key]}
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

export const ComparisonSlide = () => {
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

export const ConditionSlide = () => {
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

export const NestedConditionSlide = () => {
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
