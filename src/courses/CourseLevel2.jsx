import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Calculator, Grid, Play, ChevronRight, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, Bug, AlertOctagon, Trophy, Eye, Clock, Target, Zap, RefreshCw, XCircle, Copy, Check, Unlock, Award, FileCode, ArrowRightLeft, SkipForward, Info, MousePointerClick, Book, Menu, X, FileText } from 'lucide-react';
import GESP2_2025_12 from '../data/gesp/level2/GESP2_2025_12';
import CppLevelSupport from '../components/CppLevelSupport';

// -----------------------------------------------------------------------------
// Component: Navigation
// -----------------------------------------------------------------------------
// Navigation component removed (integrated into main layout)

// -----------------------------------------------------------------------------
// Component: CodeBlock
// -----------------------------------------------------------------------------
const CodeBlock = ({ code, title }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 shadow-lg">
    {title && (
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700">
        {title}
      </div>
    )}
    <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100">
      <code>{code}</code>
    </pre>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Overview
// -----------------------------------------------------------------------------
const OverviewModule = ({ onStart }) => (
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

// -----------------------------------------------------------------------------
// Module: Pattern Printing (Interactive)
// -----------------------------------------------------------------------------
const InteractiveCode = ({ type, onCorrect }) => {
  const [inputs, setInputs] = useState({});
  const [status, setStatus] = useState('idle'); // idle, error, success

  // Reset inputs when type changes
  useEffect(() => {
    setInputs({});
    setStatus('idle');
  }, [type]);

  const challenges = {
    'H': {
      parts: [
        { text: 'if (j == 1 || j == ' },
        { id: 'c1', answer: 'n', width: 'w-8' },
        { text: ') cout << "|";\nelse if (i == ' },
        { id: 'c2', answer: '(n+1)/2', width: 'w-20', hint: '(n+1)/2' },
        { text: ') cout << "-";\nelse cout << "a";' }
      ]
    },
    'X': {
      parts: [
        { text: 'if (i == ' },
        { id: 'c1', answer: 'j', width: 'w-8' },
        { text: ' || i + j == ' },
        { id: 'c2', answer: 'n+1', width: 'w-12', hint: 'n+1' },
        { text: ') cout << "+";\nelse cout << "-";' }
      ]
    },
    'Ri': {
      parts: [
        { text: 'if (j == 1 || j == n) cout << "|";\nelse if (i == 1 || i == n || i == ' },
        { id: 'c1', answer: '(n+1)/2', width: 'w-20' },
        { text: ') cout << "-";\nelse cout << "x";' }
      ]
    },
    'N': {
      parts: [
        { text: 'if (j == 1 || j == n || ' },
        { id: 'c1', answer: 'i==j', width: 'w-12', hint: 'i==j' },
        { text: ') cout << "+";\nelse cout << "-";' }
      ]
    }
  };

  const currentChallenge = challenges[type];

  const checkAnswer = () => {
    let isAllCorrect = true;
    currentChallenge.parts.forEach(part => {
      if (part.id) {
        // Simple normalization: remove spaces
        const val = (inputs[part.id] || '').replace(/\s/g, '');
        const ans = part.answer.replace(/\s/g, '');
        if (val !== ans) isAllCorrect = false;
      }
    });

    if (isAllCorrect) {
      setStatus('success');
      onCorrect && onCorrect();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg p-4 shadow-lg font-mono text-sm text-blue-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <Code size={48} />
      </div>

      <div className="mb-2 text-xs text-slate-400">补全代码逻辑 (忽略空格):</div>

      <div className="space-y-1 leading-loose">
        {currentChallenge.parts.map((part, idx) => (
          part.id ? (
            <input
              key={part.id}
              type="text"
              value={inputs[part.id] || ''}
              onChange={(e) => setInputs({ ...inputs, [part.id]: e.target.value })}
              className={`bg-slate-800 border-b-2 outline-none text-center mx-1 px-1 text-yellow-400 font-bold transition-colors ${status === 'error' ? 'border-red-500 bg-red-900/20' :
                status === 'success' ? 'border-green-500 bg-green-900/20' : 'border-slate-600 focus:border-blue-400'
                } ${part.width}`}
              placeholder="?"
            />
          ) : (
            <span key={idx} className="whitespace-pre-wrap">{part.text}</span>
          )
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={checkAnswer}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Play size={14} /> 运行验证
        </button>

        {status === 'success' && (
          <span className="text-green-400 text-xs flex items-center gap-1 animate-fade-in">
            <CheckCircle size={14} /> 回答正确！
          </span>
        )}
        {status === 'error' && (
          <span className="text-red-400 text-xs flex items-center gap-1 animate-shake">
            <AlertTriangle size={14} /> 答案不对哦，再想想？
          </span>
        )}
      </div>
    </div>
  );
};

const PatternModule = () => {
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

// -----------------------------------------------------------------------------
// Module: Math & Logic (Interactive)
// -----------------------------------------------------------------------------
const MathModule = () => {
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

const BlackHoleSimulator = () => {
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

// -----------------------------------------------------------------------------
// Module: Error Analysis (Museum)
// -----------------------------------------------------------------------------
const ErrorAnalysisModule = () => {
  const [activeCase, setActiveCase] = useState(0);

  const errorCases = [
    {
      id: 1,
      title: "致命的等号：Assignment vs Equality",
      severity: "critical",
      badCode: `int i = 0;
while (i < 5) {
    if (i = 1) { // 错误！这是赋值，不是判断
        cout << "Found 1" << endl;
    }
    i++;
}`,
      goodCode: `int i = 0;
while (i < 5) {
    if (i == 1) { // 正确：使用双等号进行比较
        cout << "Found 1" << endl;
    }
    i++;
}`,
      consequence: "死循环 (Infinite Loop) 或 逻辑错误",
      explanation: "在 C++ 中，`i = 1` 是一个赋值表达式，它的值是 1 (True)。因此 `if (i = 1)` 永远为真，而且每次循环都会把 i 重置为 1，导致 i 永远无法达到 5，形成死循环。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="flex items-center gap-4 text-xl font-bold">
            <div className="p-4 bg-slate-800 rounded-lg border border-red-500/50 text-red-400">
              if (i = 1)
              <div className="text-xs font-normal text-slate-400 mt-1">赋值操作 (Assignment)</div>
            </div>
            <ArrowRight className="text-slate-500" />
            <div className="p-4 bg-slate-800 rounded-lg border border-red-500 text-red-500 animate-pulse">
              Always TRUE
            </div>
          </div>
          <div className="text-sm text-slate-400">后果：循环条件被破坏，程序卡死</div>
        </div>
      )
    },
    {
      id: 2,
      title: "整数溢出陷阱 (Integer Overflow)",
      severity: "critical",
      badCode: `int a = 100000;
int b = 100000;
int c = a * b;  // 溢出！
cout << c;      // 输出错误结果`,
      goodCode: `int a = 100000;
int b = 100000;
long long c = 1LL * a * b;  // 正确
cout << c;  // 输出 10000000000`,
      consequence: "数据溢出，结果错误 (可能为负数或乱码)",
      explanation: "虽然 c 是 long long，但 a*b 计算时两个 int 相乘，结果会先存在 int 里（超过 21亿会溢出），然后再赋值给 c。必须用 1LL 强制转换其中一个数为 long long。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-2">100,000 × 100,000 = 10,000,000,000</div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-800 rounded-lg border border-amber-500">
                <div className="text-xs text-amber-400">int 范围</div>
                <div className="text-lg font-mono text-amber-300">±2,147,483,647</div>
              </div>
              <ArrowRight className="text-red-500" />
              <div className="p-3 bg-red-900/30 rounded-lg border border-red-500 animate-pulse">
                <div className="text-xs text-red-400">超出范围！</div>
                <div className="text-lg font-mono text-red-300">OVERFLOW</div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500">
            <div className="text-sm text-green-400">✓ 解决方案: 1LL * a * b 强制使用 long long 运算</div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "数组越界访问 (Array Out of Bounds)",
      severity: "critical",
      badCode: `int arr[5];  // 定义了5个元素的数组
for (int i = 1; i <= 5; i++) {
    arr[i] = i * 10;  // 错误！i=5时越界
}`,
      goodCode: `int arr[5];  // 下标范围: 0, 1, 2, 3, 4
for (int i = 0; i < 5; i++) {
    arr[i] = i * 10;  // 正确
}`,
      consequence: "访问非法内存，程序崩溃或产生随机结果",
      explanation: "数组下标从 0 开始！int arr[5] 有效下标是 0-4，访问 arr[5] 越界。常见错误：循环从 1 开始、或条件写成 i<=5。",
      visual: (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-sm text-slate-400 mb-2">int arr[5] 的内存布局</div>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-900/30 border-2 border-green-500 rounded flex items-center justify-center">
                  <span className="text-green-400 font-mono text-sm">arr[{i}]</span>
                </div>
                <div className="text-xs text-green-400 mt-1">✓ 合法</div>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-900/30 border-2 border-red-500 rounded flex items-center justify-center animate-pulse">
                <span className="text-red-400 font-mono text-sm">arr[5]</span>
              </div>
              <div className="text-xs text-red-400 mt-1">✗ 越界</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">提示: 数组大小为 N，则下标范围是 [0, N-1]</div>
        </div>
      )
    }
  ];

  const currentCase = errorCases[activeCase];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-1 rounded-xl inline-flex">
        {errorCases.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCase === idx
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            Case {c.id}: {c.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Code Comparison */}
        <div className="space-y-6">
          <div className="bg-red-950/30 border border-red-900/50 rounded-xl overflow-hidden">
            <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/50 flex items-center justify-between">
              <span className="text-red-400 font-bold flex items-center gap-2">
                <Bug size={18} /> 错误示范 (Bad Code)
              </span>
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">Don't do this</span>
            </div>
            <pre className="p-4 font-mono text-sm text-red-100 overflow-x-auto">
              <code>{currentCase.badCode}</code>
            </pre>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl overflow-hidden">
            <div className="bg-emerald-900/20 px-4 py-2 border-b border-emerald-900/50 flex items-center justify-between">
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle size={18} /> 正确写法 (Good Code)
              </span>
              <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded">Do this</span>
            </div>
            <pre className="p-4 font-mono text-sm text-emerald-100 overflow-x-auto">
              <code>{currentCase.goodCode}</code>
            </pre>
          </div>
        </div>

        {/* Right: Analysis & Visual */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertOctagon className="text-red-500" />
              后果分析
            </h3>
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg mb-4">
              <p className="text-red-200 font-bold text-lg">{currentCase.consequence}</p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentCase.explanation}
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 min-h-[200px]">
            {currentCase.visual}
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Component: Interactive Checklist
// -----------------------------------------------------------------------------
const InteractiveChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "能手写双层循环打印图形", checked: false },
    { id: 2, text: "知道 abs(), sqrt() 在 <cmath> 头文件", checked: false },
    { id: 3, text: "习惯使用 1LL * a * b 防止乘法溢出", checked: false },
    { id: 4, text: "掌握 % 10 拆分数字的技巧", checked: false }
  ]);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleItem = (id) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const isNowChecked = !item.checked;
        if (isNowChecked) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
        return { ...item, checked: isNowChecked };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="text-4xl animate-bounce">🎉</div>
        </div>
      )}
      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
        <CheckCircle size={20} />
        备考 CheckList (Interactive)
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${item.checked
              ? 'bg-blue-100 border-blue-300 text-blue-900 shadow-inner'
              : 'bg-white border-blue-100 text-slate-600 hover:border-blue-300 hover:shadow-sm'
              }`}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-slate-50'
              }`}>
              {item.checked && <CheckCircle size={14} className="text-white" />}
            </div>
            <span className={`text-sm ${item.checked ? 'line-through opacity-70' : ''}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Module: Logic Simulation
// -----------------------------------------------------------------------------
const PredictionQuiz = ({ title, code, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">预测挑战</span>
      </div>
      <div className="p-4">
        <CodeBlock code={code} />
        <p className="text-sm font-bold text-slate-700 mb-3">这段代码的输出是什么？</p>

        <div className="grid grid-cols-1 gap-2 mb-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={`text-left px-4 py-3 rounded-lg text-sm font-mono border transition-all ${showResult
                ? idx === correctIndex
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : idx === selected
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
            >
              {opt}
              {showResult && idx === correctIndex && <CheckCircle size={16} className="float-right text-green-600" />}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 animate-fade-in">
            <strong>💡 解析：</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
};

const LogicModule = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Play className="text-indigo-600" />
          逻辑模拟：预测与验证 (POE)
        </h2>
        <p className="text-slate-600 mb-6">
          逻辑题往往藏着陷阱。先预测结果，再看答案，是发现思维盲区的最好方法。
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <PredictionQuiz
            title="陷阱 1：数据溢出"
            code={`int a = 100000;
int b = 100000;
long long c = a * b;
cout << c;`}
            options={[
              "10000000000 (100亿)",
              "1410065408 (乱码/溢出)",
              "Error (编译错误)"
            ]}
            correctIndex={1}
            explanation="虽然 c 是 long long，但 a*b 计算时两个 int 相乘，结果会先存在 int 里（导致溢出），然后再赋值给 c。正确写法是 1LL * a * b。"
          />

          <PredictionQuiz
            title="陷阱 2：循环边界"
            code={`int sum = 0;
for(int i = 1; i < 5; i++) {
    if(i % 2 == 0) continue;
    sum += i;
}
cout << sum;`}
            options={[
              "4 (1+3)",
              "9 (1+3+5)",
              "5 (1+4)"
            ]}
            correctIndex={0}
            explanation="i < 5 意味着 i 取值 1, 2, 3, 4。当 i=2,4 时 continue。所以 sum = 1 + 3 = 4。注意 i 不包含 5。"
          />
        </div>
      </div>

      <InteractiveChecklist />
    </div>
  );
};

// -----------------------------------------------------------------------------
// Module: Pitfalls (Interactive Error Prevention)
// -----------------------------------------------------------------------------
const PitfallCard = ({ title, code, fix, result, desc }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={`bg-white p-5 rounded-xl border shadow-sm relative overflow-hidden group transition-all duration-500 ${isRevealed ? 'border-green-200' : 'border-red-100 hover:border-red-300'}`}>
      <div className={`absolute top-0 right-0 p-2 opacity-10 transition-opacity ${isRevealed ? 'text-green-500' : 'text-red-500'}`}>
        {isRevealed ? <CheckCircle size={64} /> : <AlertTriangle size={64} />}
      </div>

      <h3 className={`font-bold mb-3 flex items-center justify-between ${isRevealed ? 'text-green-700' : 'text-red-600'}`}>
        {title}
        {!isRevealed && <Unlock size={16} className="opacity-50" />}
      </h3>

      <div className="space-y-2 mb-3">
        <div className="bg-red-50 text-red-800 text-xs p-2 rounded line-through decoration-red-500/50 font-mono border border-red-100">
          {code}
        </div>

        {/* Revealed Content */}
        <div className={`transition-all duration-500 overflow-hidden ${isRevealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-green-50 text-green-800 text-xs p-2 rounded font-mono flex items-center justify-between border border-green-100 mt-2">
            {fix} <CheckCircle size={12} />
          </div>
          {result && <div className="text-xs text-slate-500 pl-1 mt-1">{result}</div>}
        </div>
      </div>

      <div className="mt-4">
        {!isRevealed ? (
          <button
            onClick={() => setIsRevealed(true)}
            className="w-full py-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
          >
            <Unlock size={14} /> 点击拆除错误
          </button>
        ) : (
          <p className="text-sm text-slate-600 animate-fade-in">
            {desc}
          </p>
        )}
      </div>
    </div>
  );
};

const PitfallsModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
      <h2 className="text-2xl font-bold text-red-700 flex items-center gap-3">
        <AlertTriangle /> 考场高频失误榜
      </h2>
      <p className="text-red-600 mt-2">点击卡片"拆除炸弹"，查看正确解法！</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PitfallCard
        title="数据溢出 Boom!"
        code="int sum = 0;"
        fix="long long sum = 0;"
        desc="当题目涉及'累加求和'或'乘积'且N较大(大于10^5)时，结果往往超过 21亿（int上限）。必须使用 long long。二级常见于大数相乘、累加题。"
      />
      <PitfallCard
        title="整数除法丢失小数"
        code="double ans = 5 / 2;"
        fix="double ans = 5.0 / 2;"
        result="2.0 (错误) vs 2.5 (正确)"
        desc="整数除整数，结果永远是整数。5/2=2。必须有一个操作数是小数才能得到小数结果。或使用强制类型转换：(double)5/2。"
      />
      <PitfallCard
        title="变量未初始化"
        code="int count; count++;"
        fix="int count = 0; count++;"
        desc="局部变量如果不初始化，初始值是随机垃圾值，导致结果莫名其妙的大。务必养成初始化习惯：int sum=0, cnt=0, max=INT_MIN。"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <PitfallCard
        title="数组下标从0开始"
        code="int a[5]; a[5] = 10;"
        fix="int a[5]; a[4] = 10;"
        desc="数组下标范围是 [0, N-1]。常见错误：循环写成 i小于等于5 或从 i=1 开始。正确写法：for(int i=0; i小于5; i++) 或 for(int i=0; i小于等于4; i++)。"
      />
      <PitfallCard
        title="输出格式错误"
        code='cout << a << " " << b;'
        fix='cout << a << " " << b << endl;'
        result="多余空格或缺少换行都会导致判题失败"
        desc="输出题目要求严格：题目说'每两个数之间一个空格'就不能多也不能少；说'每行输出后换行'就必须加 endl 或 换行符。注意行末是否有多余空格。"
      />
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 mt-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 考前检查清单
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-2">编码前</h4>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>• 看清数据范围 (N≤10^5 用int, N≤10^9 用long long)</li>
            <li>• 理解输出格式要求 (空格/换行)</li>
            <li>• 确认边界条件 (1到N 包含N吗？)</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h4 className="font-bold text-green-800 mb-2">编码后</h4>
          <ul className="text-sm text-green-900 space-y-1">
            <li>• 所有变量都初始化了吗？</li>
            <li>• 数组访问有越界风险吗？</li>
            <li>• 输出语句格式正确吗？</li>
            <li>• 用样例数据手动跑一遍</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Code Trace (Interactive)
// -----------------------------------------------------------------------------
const CodeTraceModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "双层循环 (打印图形)",
      code: `for(int i=1; i<=3; i++) {
    for(int j=1; j<=i; j++) {
        cout << "*";
    }
    cout << endl;
}`,
      steps: [
        { line: 1, vars: { i: 1 }, desc: "外层循环 i=1, 1<=3 成立" },
        { line: 2, vars: { i: 1, j: 1 }, desc: "内层循环 j=1, 1<=1 成立" },
        { line: 3, vars: { i: 1, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 1, j: 2 }, desc: "j++, j=2, 2<=1 不成立，内层结束" },
        { line: 5, vars: { i: 1 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 2 }, desc: "i++, i=2, 2<=3 成立" },
        { line: 2, vars: { i: 2, j: 1 }, desc: "内层循环 j=1, 1<=2 成立" },
        { line: 3, vars: { i: 2, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 2, j: 2 }, desc: "j++, j=2, 2<=2 成立" },
        { line: 3, vars: { i: 2, j: 2 }, desc: "输出 *", output: "**" },
        { line: 2, vars: { i: 2, j: 3 }, desc: "j++, j=3, 3<=2 不成立，内层结束" },
        { line: 5, vars: { i: 2 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 3 }, desc: "i++, i=3, 3<=3 成立" },
        { line: 2, vars: { i: 3, j: 1 }, desc: "内层循环 j=1" },
        { line: 3, vars: { i: 3, j: 1 }, desc: "输出 *", output: "*" },
        { line: 2, vars: { i: 3, j: 2 }, desc: "内层循环 j=2" },
        { line: 3, vars: { i: 3, j: 2 }, desc: "输出 *", output: "**" },
        { line: 2, vars: { i: 3, j: 3 }, desc: "内层循环 j=3" },
        { line: 3, vars: { i: 3, j: 3 }, desc: "输出 *", output: "***" },
        { line: 5, vars: { i: 3 }, desc: "换行", output: "\\n" },
        { line: 1, vars: { i: 4 }, desc: "i++, i=4, 4<=3 不成立，程序结束" }
      ]
    },
    {
      title: "Break与Continue",
      code: `for(int i=1; i<=5; i++) {
    if(i == 3) continue;
    if(i == 5) break;
    cout << i << " ";
}`,
      steps: [
        { line: 1, vars: { i: 1 }, desc: "i=1" },
        { line: 2, vars: { i: 1 }, desc: "1==3? False" },
        { line: 3, vars: { i: 1 }, desc: "1==5? False" },
        { line: 4, vars: { i: 1 }, desc: "输出 1", output: "1 " },
        { line: 1, vars: { i: 2 }, desc: "i=2" },
        { line: 2, vars: { i: 2 }, desc: "2==3? False" },
        { line: 3, vars: { i: 2 }, desc: "2==5? False" },
        { line: 4, vars: { i: 2 }, desc: "输出 2", output: "2 " },
        { line: 1, vars: { i: 3 }, desc: "i=3" },
        { line: 2, vars: { i: 3 }, desc: "3==3? True! 执行 continue" },
        { line: 1, vars: { i: 4 }, desc: "直接跳到 i++, i=4" },
        { line: 2, vars: { i: 4 }, desc: "4==3? False" },
        { line: 3, vars: { i: 4 }, desc: "4==5? False" },
        { line: 4, vars: { i: 4 }, desc: "输出 4", output: "4 " },
        { line: 1, vars: { i: 5 }, desc: "i=5" },
        { line: 2, vars: { i: 5 }, desc: "5==3? False" },
        { line: 3, vars: { i: 5 }, desc: "5==5? True! 执行 break" },
        { line: 1, vars: { i: 5 }, desc: "跳出循环，程序结束" }
      ]
    }
  ];

  const example = examples[selectedExample];
  const step = example.steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < example.steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(c => c + 1), 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= example.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, example.steps.length]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Eye /> 代码跟踪模拟器
        </h2>
        <p className="text-cyan-100">
          GESP二级重点考察嵌套循环和流程控制，通过模拟器看清每一步是如何执行的。
        </p>
      </div>

      <div className="flex gap-2">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedExample(idx); setCurrentStep(0); setIsPlaying(false); }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedExample === idx
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            示例 {idx + 1}: {ex.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-2 text-slate-400 text-xs font-mono">trace.cpp</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed">
            {example.code.split('\n').map((line, idx) => (
              <div key={idx} className={`py-1 px-2 rounded flex ${step.line === idx + 1 ? 'bg-yellow-500/30 border-l-4 border-yellow-400' : ''}`}>
                <span className="text-slate-600 w-6 text-right mr-4 select-none">{idx + 1}</span>
                <span className="text-blue-100">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2"><Play size={18} className="text-blue-600" /> 执行控制</h4>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Step {currentStep + 1}/{example.steps.length}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-sm">上一步</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className={`px-4 py-2 rounded text-white text-sm font-bold flex-1 ${isPlaying ? 'bg-orange-500' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {isPlaying ? '⏸ 暂停' : '▶ 自动播放'}
              </button>
              <button onClick={() => setCurrentStep(Math.min(example.steps.length - 1, currentStep + 1))} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-sm">下一步</button>
              <button onClick={() => { setCurrentStep(0); setIsPlaying(false); }} className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-red-600"><RefreshCw size={16} /></button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><ArrowRightLeft size={18} className="text-purple-600" /> 变量监视</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(step.vars).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">{k}</div>
                  <div className="text-lg font-bold text-slate-800 font-mono">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${step.output ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex gap-3">
              <div className={`mt-0.5 ${step.output ? 'text-green-600' : 'text-blue-600'}`}>
                {step.output ? <CheckCircle size={18} /> : <Info size={18} />}
              </div>
              <div>
                <div className={`font-medium text-sm ${step.output ? 'text-green-800' : 'text-blue-800'}`}>{step.desc}</div>
                {step.output && <div className="mt-2 bg-slate-900 text-green-400 px-2 py-1 rounded text-xs font-mono inline-block">Output: {step.output}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Module: Templates
// -----------------------------------------------------------------------------
const TemplateBlock = ({ title, desc, code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-700 text-sm">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <button onClick={handleCopy} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-sm font-mono text-green-400"><code>{code}</code></pre>
      </div>
    </div>
  );
};

const TemplatesModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Code /> 万能代码模板</h2>
      <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">背诵 + 理解</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TemplateBlock
        title="1. 数位拆解 (Do-While/While)"
        desc="提取每一位数字，常用于水仙花数、数字反转"
        code={`int n; 
cin >> n;
while (n > 0) {
    int digit = n % 10; // 取出末位
    // 处理 digit...
    n /= 10;            // 去掉末位
}`}
      />
      <TemplateBlock
        title="2. 质数判断 (Prime Check)"
        desc="判断是否只有1和它本身两个因数"
        code={`bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}`}
      />
      <TemplateBlock
        title="3. 最大公约数 (GCD)"
        desc="欧几里得算法，解决分式化简、倍数问题"
        code={`int gcd(int a, int b) {
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}`}
      />
      <TemplateBlock
        title="4. 图形打印通用框架"
        desc="双层循环控制行(i)和列(j)"
        code={`for (int i = 1; i <= n; i++) {     // 行
    for (int j = 1; j <= n; j++) { // 列
        if (/* 满足条件 */) 
            cout << "*";
        else 
            cout << " ";
    }
    cout << endl; // 每行结束后换行
}`}
      />
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Exam Tips
// -----------------------------------------------------------------------------
const ExamTipsModule = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Lightbulb /> 考场秘籍</h2>
      <p className="text-amber-100">GESP 二级考试策略与注意事项，助你稳定发挥。</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间管理</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>选择/判断题 (30分)</strong>: 控制在20分钟内，遇到不确定的先标记，别卡壳。</li>
          <li>• <strong>编程题 (50分)</strong>: 预留至少60分钟。第一题通常是基础计算或图形，必须拿下；第二题如果是复杂逻辑，先写出部分分代码。</li>
          <li>• <strong>检查时间</strong>: 最后留10分钟检查文件名、变量类型(long long)和分号。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 拿分技巧</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>审题第一</strong>: 注意数据范围！如果 N=10^9，必须用 long long，且不能用 O(N) 算法。</li>
          <li>• <strong>暴力出奇迹</strong>: 二级题目数据通常较小(1000以内)，双层循环 O(N^2) 通常能过。</li>
          <li>• <strong>测试边界</strong>: 测 N=1, N=0, N=Max 的情况。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 常见低级错误</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• 变量未初始化 (int sum; sum++) ❌</li>
          <li>• 误用赋值符 (if (a=1)) ❌</li>
          <li>• 整数除法丢失精度 (double a = 3/2) ❌</li>
          <li>• 输出格式多空格/少换行 ❌</li>
        </ul>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Practice (Quiz)
// -----------------------------------------------------------------------------
const PracticeModule = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      q: "执行 for(int i=0; i<3; i++) cout << i; 的输出是？",
      opts: ["0 1 2", "1 2 3", "012", "0,1,2"],
      ans: 2,
      expl: "没有空格分隔，直接连续输出 012。"
    },
    {
      q: "int a[5]; 定义了一个数组，它的最大下标是？",
      opts: ["5", "4", "6", "0"],
      ans: 1,
      expl: "数组下标从0开始，a[5] 的有效下标是 0,1,2,3,4。"
    },
    {
      q: "if (a && b) 为真，意味着？",
      opts: ["a和b都为真", "a或b有一个为真", "a为假", "b为假"],
      ans: 0,
      expl: "&& 是逻辑与，要求两边都为真。"
    },
    {
      q: "求最大公约数的算法名称是？",
      opts: ["高斯消元", "二分查找", "辗转相除法", "冒泡排序"],
      ans: 2,
      expl: "辗转相除法 (Euclidean Algorithm) 是求 GCD 的经典算法。"
    },
    {
      q: "break 语句的作用是？",
      opts: ["结束本次循环，继续下一次", "结束整个程序", "跳出当前循环", "跳过 output"],
      ans: 2,
      expl: "break 跳出当前所在的循环结构；continue 才是结束本次循环。"
    },
    {
      q: "执行 int x=123; cout << x%10; 输出什么？",
      opts: ["1", "2", "3", "123"],
      ans: 2,
      expl: "% 10 取个位数，123 的个位是 3。"
    },
    {
      q: "双层循环 for(i=1;i<=3;i++) for(j=1;j<=2;j++) 总共执行内层循环多少次？",
      opts: ["3次", "6次", "5次", "2次"],
      ans: 1,
      expl: "外层循环3次，每次内层循环2次，总共 3×2=6 次。"
    },
    {
      q: "int a=5, b=2; cout << a/b; 输出什么？",
      opts: ["2.5", "2", "3", "0"],
      ans: 1,
      expl: "整数除法向下取整，5/2=2（不是2.5）。"
    },
    {
      q: "sqrt(16) 的结果是？（需引入 cmath）",
      opts: ["4", "16", "2", "8"],
      ans: 0,
      expl: "sqrt() 是开平方函数，√16=4。"
    },
    {
      q: "下列哪个是合法的变量名？",
      opts: ["2num", "num-2", "_num2", "int"],
      ans: 2,
      expl: "变量名不能以数字开头、不能有连字符、不能是关键字。_num2 是合法的。"
    },
    {
      q: "abs(-5) 的值是？",
      opts: ["-5", "5", "0", "10"],
      ans: 1,
      expl: "abs() 返回绝对值，|-5|=5。"
    },
    {
      q: "以下代码片段：for(int i=1; i<=5; i+=2) 循环执行几次？",
      opts: ["2次", "3次", "5次", "无限次"],
      ans: 1,
      expl: "i 依次为 1, 3, 5，共3次。i+=2 意味着每次增加2。"
    },
    {
      q: "字符串 s=\"hello\"; cout << s.length(); 输出多少？",
      opts: ["4", "5", "6", "hello"],
      ans: 1,
      expl: "length() 返回字符串长度，\"hello\" 有5个字符。"
    },
    {
      q: "pow(2, 3) 的结果是？（需引入 cmath）",
      opts: ["5", "6", "8", "9"],
      ans: 2,
      expl: "pow(a, b) 计算 a 的 b 次方，2³=8。"
    },
    {
      q: "下列关于数组的说法，正确的是？",
      opts: ["数组大小可以随时改变", "数组下标从1开始", "数组必须先定义再使用", "数组元素类型可以不同"],
      ans: 2,
      expl: "C++ 数组大小固定、下标从0开始、元素类型必须相同、必须先定义。"
    }
  ];

  const q = questions[current];

  const handleAnswer = (idx) => {
    setSelected(idx);
    setShowResult(true);
    if (idx === q.ans) setScore(score + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setShowResult(false);
      setSelected(null);
    } else {
      alert(`练习结束！得分：${score + (selected === q.ans ? 0 : 0)}/${questions.length}`);
      setCurrent(0);
      setScore(0);
      setShowResult(false);
      setSelected(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2"><Trophy className="text-yellow-500" /> 真题模拟小测</h3>
          <span className="text-xs bg-white border px-2 py-1 rounded text-slate-500">Q {current + 1} / {questions.length}</span>
        </div>
        <div className="p-8">
          <h4 className="text-lg font-bold text-slate-800 mb-6">{q.q}</h4>
          <div className="space-y-3">
            {q.opts.map((opt, idx) => (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center
                    ${showResult
                    ? idx === q.ans
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : idx === selected
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'opacity-50 border-slate-100'
                    : 'border-slate-100 hover:border-blue-400 hover:bg-blue-50 text-slate-700'}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}. {opt}</span>
                {showResult && idx === q.ans && <CheckCircle size={20} className="text-green-600" />}
                {showResult && idx === selected && idx !== q.ans && <XCircle size={20} className="text-red-600" />}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="marginTop-6 animate-in fade-in slide-in-from-bottom-2">
              <div className={`mt-6 p-4 rounded-xl text-sm ${selected === q.ans ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-1">{selected === q.ans ? '回答正确！' : '回答错误'}</p>
                <p>{q.expl}</p>
              </div>
              <button onClick={next} className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">
                {current < questions.length - 1 ? '下一题' : '查看结果'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Component: Interactive Checklist

export default function GESP_Level2_Courseware() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'patterns', label: '图形打印专题', icon: Grid },
    { id: 'math', label: '数位与数学', icon: Calculator },
    { id: 'logic', label: '逻辑模拟', icon: Play },
    { id: 'pitfalls', label: '备考避坑指南', icon: AlertTriangle },
    { id: 'trace', label: '代码跟踪模拟', icon: Eye },
    { id: 'error', label: '错误博物馆', icon: Bug },
    { id: 'templates', label: '万能代码模板', icon: Code },
    { id: 'tips', label: '考试秘籍攻略', icon: Lightbulb },
    { id: 'practice', label: '真题实战演练', icon: Trophy },
    { id: 'exam202512', label: '2025-12 真题解析', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewModule onStart={setActiveTab} />;
      case 'patterns': return <PatternModule />;
      case 'math': return <MathModule />;
      case 'logic': return <LogicModule />;
      case 'pitfalls': return <PitfallsModule />;
      case 'trace': return <CodeTraceModule />;
      case 'error': return <ErrorAnalysisModule />;
      case 'templates': return <TemplatesModule />;
      case 'tips': return <ExamTipsModule />;
      case 'practice': return <PracticeModule />;
      case 'exam202512': return <GESP2_2025_12 />;
      default: return <OverviewModule />;
    }
  };

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 二级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <h1 className="text-xl font-bold text-slate-800">GESP 二级</h1>
          </div>
          <p className="text-xs text-slate-500">交互式备考讲义</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2025 GESP 备考系统</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-blue-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">Level 2</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {activeTab === 'overview' && <CppLevelSupport level={2} />}
            {renderContent()}
            <CppLevelSupport level={2} placement="bottom" />
          </div>
        </main>
      </div>
    </div>
  );
}
