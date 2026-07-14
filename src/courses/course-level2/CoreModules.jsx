import { useState, useEffect } from 'react';
import { Calculator, Grid, Play, Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';
import { CodeBlock, InteractiveCode } from './Shared';

export const OverviewModule = ({ onStart }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 二级冲刺指南</h1>
      <p className="text-blue-100 text-lg mb-6">
        基于历年真题归纳，掌握多层循环、数学逻辑与基本算法思维。
      </p>
      <button
        onClick={() => onStart('patterns')}
        className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2"
      >
        开始学习 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <Grid size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">多层循环结构</h3>
        <p className="text-slate-600 text-sm">
          熟练掌握 for、while 的嵌套使用，重点攻克图形打印题。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <Calculator size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">数学函数与运算</h3>
        <p className="text-slate-600 text-sm">
          数位拆解 ( % / )、abs()、sqrt()、max/min 的综合应用。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <Play size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">逻辑模拟</h3>
        <p className="text-slate-600 text-sm">
          根据题目规则（如数字变换、游戏规则）逐步实现代码逻辑。
        </p>
      </div>
    </div>

    {/* Exam Score Breakdown */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-blue-500" /> GESP 二级分数构成（总分100分）
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题×2分" },
          { name: "判断题", score: 20, color: "bg-green-500", desc: "10题×2分" },
          { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题" },
        ].map((item, idx) => (
          <div key={idx} className="flex-1">
            <div className={`h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
              {item.name}: {item.score}分
            </div>
            <div className="text-xs text-slate-500 text-center mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm">
          <strong>💡 及格线：</strong>60分通过。二级编程题难度增加，建议选择判断拿45分，编程题拿20分以上。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 二级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "嵌套循环", icon: "🔄", hint: "双层 for 循环" },
          { skill: "图形打印", icon: "🔲", hint: "H/X/N 矩阵" },
          { skill: "数位拆解", icon: "🔢", hint: "% 10 和 / 10" },
          { skill: "数字黑洞", icon: "🕳️", hint: "495/6174" },
          { skill: "溢出防护", icon: "⚠️", hint: "1LL * a * b" },
          { skill: "数学函数", icon: "📐", hint: "abs/sqrt" },
          { skill: "break/continue", icon: "⏸️", hint: "循环控制" },
          { skill: "质数判断", icon: "🔍", hint: "枚举因数" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-slate-700 text-sm group-hover:text-blue-600">{item.skill}</div>
            <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Study Plan */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { week: "第1周", title: "图形打印", color: "blue", desc: "掌握双层循环、H/X/N矩阵" },
        { week: "第2周", title: "数学运算", color: "green", desc: "数位拆解、黑洞数、质数" },
        { week: "第3周", title: "逻辑模拟", color: "purple", desc: "循环控制、溢出防护" },
        { week: "第4周", title: "真题冲刺", color: "orange", desc: "历年真题、模拟考试" },
      ].map((item, idx) => (
        <div key={idx} className={`bg-${item.color}-50 p-5 rounded-xl border border-${item.color}-100 hover:shadow-lg transition-shadow`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`bg-${item.color}-500 text-white p-2 rounded-lg text-xs font-bold`}>
              {item.week}
            </div>
          </div>
          <h4 className={`font-bold text-${item.color}-800 mb-1`}>{item.title}</h4>
          <p className={`text-sm text-${item.color}-700`}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export const PatternModule = () => {
  const [n, setN] = useState(5);
  const [type, setType] = useState('H');
  const [mode, setMode] = useState('learn'); // 'learn' or 'challenge'
  const [showConfetti, setShowConfetti] = useState(false);

  const patterns = {
    'H': {
      title: '小杨的 H 字矩阵',
      desc: '左右两列是 |，中间一行是 -，其余位置是 a。',
      logic: `// 核心逻辑 (i:行, j:列, 从1开始)
if (j == 1 || j == n) cout << "|";
else if (i == (n + 1) / 2) cout << "-";
else cout << "a";`
    },
    'X': {
      title: '小杨的 X 字矩阵',
      desc: '两条对角线是 +，其余是 -。',
      logic: `// 核心逻辑
// 主对角线: i == j
// 副对角线: i + j == n + 1
if (i == j || i + j == n + 1) cout << "+";
else cout << "-";`
    },
    'Ri': {
      title: '小杨的日字矩阵',
      desc: '左右两列 |，首尾中行 -，其余 x。',
      logic: `// 核心逻辑
if (j == 1 || j == n) cout << "|";
else if (i == 1 || i == n || i == (n+1)/2) cout << "-";
else cout << "x";`
    },
    'N': {
      title: '小杨的 N 字矩阵',
      desc: '主对角线、第一列、最后一列 +，其余 -。',
      logic: `// 核心逻辑
if (j == 1 || j == n || i == j) cout << "+";
else cout << "-";`
    }
  };

  // Generate grid for visualization
  const renderGrid = () => {
    let grid = [];
    for (let i = 1; i <= n; i++) {
      let row = [];
      for (let j = 1; j <= n; j++) {
        let char = '';
        let isHighlight = false;

        if (type === 'H') {
          if (j === 1 || j === n) { char = '|'; isHighlight = true; }
          else if (i === Math.ceil(n / 2)) { char = '-'; isHighlight = true; }
          else char = 'a';
        } else if (type === 'X') {
          if (i === j || i + j === n + 1) { char = '+'; isHighlight = true; }
          else char = '-';
        } else if (type === 'Ri') {
          if (j === 1 || j === n) { char = '|'; isHighlight = true; }
          else if (i === 1 || i === n || i === Math.ceil(n / 2)) { char = '-'; isHighlight = true; }
          else char = 'x';
        } else if (type === 'N') {
          if (j === 1 || j === n || i === j) { char = '+'; isHighlight = true; }
          else char = '-';
        }
        row.push({ char, isHighlight });
      }
      grid.push(row);
    }
    return grid;
  };

  const gridData = renderGrid();

  const handleSuccess = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Grid className="text-blue-600" />
            图形生成器
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">选择题型</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(patterns).map(key => (
                  <button
                    key={key}
                    onClick={() => { setType(key); setMode('learn'); }}
                    className={`px-3 py-1.5 text-sm rounded-md transition ${type === key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {patterns[key].title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">输入 N (奇数): {n}</label>
              <input
                type="range"
                min="3"
                max="13"
                step="2"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">核心考点解析</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setMode('learn')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${mode === 'learn' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                学习模式
              </button>
              <button
                onClick={() => setMode('challenge')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition ${mode === 'challenge' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'}`}
              >
                挑战模式
              </button>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-4">{patterns[type].desc}</p>

          {mode === 'learn' ? (
            <div className="animate-fade-in">
              <CodeBlock code={patterns[type].logic} title="C++ 参考代码片段" />
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100">
                <strong>💡 学习提示：</strong> 仔细观察代码中的 <code>if</code> 条件，它们是如何对应右侧图形的特殊位置的。准备好后，点击右上角切换到“挑战模式”！
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <InteractiveCode type={type} n={n} onCorrect={handleSuccess} />
              <div className="mt-4 p-3 bg-purple-50 text-purple-800 text-xs rounded-lg border border-purple-100">
                <strong>🎯 挑战任务：</strong> 补全代码中的关键条件，使逻辑成立。
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-xl shadow-inner flex items-center justify-center min-h-[400px] relative overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}
        <div className="grid gap-1 relative z-10" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {gridData.map((row, rIdx) => (
            row.map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`w-10 h-10 flex items-center justify-center text-lg font-mono rounded transition-all duration-300 ${cell.isHighlight
                  ? 'bg-blue-500 text-white font-bold scale-105 shadow-blue-500/50 shadow-lg z-10'
                  : 'bg-slate-800 text-slate-500'
                  }`}
              >
                {cell.char}
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export const MathModule = () => {
  const [inputNum, setInputNum] = useState(123);
  const [digits, setDigits] = useState([]);

  useEffect(() => {
    // Digits logic
    let temp = inputNum;
    let arr = [];
    if (temp <= 0) temp = 0;

    // Safety limit
    if (temp > 999999) temp = 999999;

    let process = temp;
    while (process > 0) {
      arr.unshift(process % 10);
      process = Math.floor(process / 10);
    }
    if (arr.length === 0) arr = [0];
    setDigits(arr);
  }, [inputNum]);

  return (
    <div className="space-y-8">
      {/* Digit Separation Demo */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calculator className="text-green-600" />
          数位拆解 (Digit Processing)
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-600 text-sm mb-4">
              GESP 二级常考题型：水仙花数、回文数、数位之和。核心在于使用 <code>% 10</code> 取个位，使用 <code>/ 10</code> 去除个位。
            </p>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-bold text-slate-700">输入整数:</label>
              <input
                type="number"
                value={inputNum}
                onChange={(e) => setInputNum(parseInt(e.target.value) || 0)}
                className="border border-slate-300 rounded px-3 py-1 w-32 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <CodeBlock
              title="数位拆解模版 (while循环)"
              code={`int n = ${inputNum};
while (n > 0) {
    int digit = n % 10; // 取出当前个位
    // ... 处理 digit (如累加 sum += digit)
    n = n / 10;         // 去掉个位，继续下一轮
}`}
            />
          </div>

          <div className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-6 border border-green-100">
            <div className="text-sm text-green-800 mb-2 font-bold">可视化过程</div>
            <div className="flex gap-2">
              {digits.map((d, i) => (
                <div key={i} className="flex flex-col items-center animate-bounce-short" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-14 bg-white border-2 border-green-500 text-green-700 font-bold text-2xl flex items-center justify-center rounded shadow-sm">
                    {d}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">10^{digits.length - 1 - i}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm">
              当前数位之和: <span className="font-bold text-green-600">{digits.reduce((a, b) => a + b, 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Black Hole Logic */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={18} />
          典型真题：数字黑洞 (Interactive)
        </h3>

        <BlackHoleSimulator />
      </div>
    </div>
  );
};

export const BlackHoleSimulator = () => {
  const [num, setNum] = useState('');
  const [steps, setSteps] = useState([]);

  const calculate = () => {
    let current = parseInt(num);
    if (isNaN(current) || current < 100 || current > 999) {
      alert('请输入一个三位数！');
      return;
    }

    // Check if all digits are same
    if (new Set(num.split('')).size === 1) {
      setSteps([{ desc: '所有数字相同，无法进入黑洞', res: current }]);
      return;
    }

    let history = [];
    let limit = 0;
    while (current !== 495 && limit < 10) {
      let s = current.toString().padStart(3, '0');
      let arr = s.split('').map(Number);
      let max = parseInt([...arr].sort((a, b) => b - a).join(''));
      let min = parseInt([...arr].sort((a, b) => a - b).join(''));
      current = max - min;
      history.push({ max, min, res: current });
      limit++;
    }
    setSteps(history);
  };

  return (
    <div className="bg-white p-4 rounded border border-slate-200">
      <p className="text-sm text-slate-600 mb-4">
        输入一个三位数（如 123），看看它是如何掉进 <strong>495</strong> 黑洞的！
      </p>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="123"
          className="border border-slate-300 rounded px-3 py-1 w-24 focus:ring-2 focus:ring-amber-500 outline-none"
        />
        <button
          onClick={calculate}
          className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-600 transition text-sm font-bold"
        >
          启动黑洞
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 text-sm animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">{i + 1}</span>
            <span className="font-mono text-slate-700">
              {step.max} - {step.min} = <strong className="text-amber-600">{step.res}</strong>
            </span>
            {step.res === 495 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded ml-auto">Bingo!</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
