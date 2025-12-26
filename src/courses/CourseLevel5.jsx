import React, { useState, useEffect } from 'react';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Layout, GitCommit, Layers, Box, AlignJustify, Divide, Table } from 'lucide-react';

// --- Shared Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const CodeBlock = ({ code, title }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 text-sm font-mono text-slate-50">
    {title && (
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 flex items-center gap-2">
        <Code size={14} />
        {title}
      </div>
    )}
    <pre className="p-4 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

// --- Modules ---

// Overview Module
const OverviewModule = ({ onStart }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 五级冲刺指南</h1>
      <p className="text-red-100 text-lg mb-6">
        深入数论与二维世界。掌握素数筛法、矩阵运算与高级字符串处理。
      </p>
      <button
        onClick={() => onStart('math')}
        className="bg-white text-red-700 px-6 py-2 rounded-full font-bold hover:bg-red-50 transition flex items-center gap-2"
      >
        开始学习 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <Divide size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">数论专题</h3>
        <p className="text-slate-600 text-sm">
          埃氏筛法求素数、欧几里得算法(GCD/LCM)、质因数分解。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Grid size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">二维数组</h3>
        <p className="text-slate-600 text-sm">
          矩阵定义、行列遍历、杨辉三角、扫雷/图像处理基础。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <Hash size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">字符串进阶</h3>
        <p className="text-slate-600 text-sm">
          string 成员函数 find/substr/insert/erase，stringstream 数据流处理。
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-red-500" /> GESP 五级分数构成
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题 数论/数学/语法" },
          { name: "判断题", score: 20, color: "bg-green-500", desc: "10题 概念辨析" },
          { name: "编程题", score: 50, color: "bg-purple-500", desc: "2题 (25分 x 2)" },
        ].map((item, idx) => (
          <div key={idx} className="flex-1">
            <div className={`h-10 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
              {item.name}: {item.score}分
            </div>
            <div className="text-xs text-slate-500 text-center mt-1">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>💡 核心考点变化：</strong>五级开始引入<b>数学算法</b>（筛法、GCD）和<b>复杂数据处理</b>（矩阵、字符串），对<b>时间复杂度</b>有了更严格的要求（如不能用 O(N*sqrt(N)) 判断大量素数）。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 五级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "埃氏筛法", icon: "🧹", hint: "O(N log log N)" },
          { skill: "最大公约数", icon: "➗", hint: "__gcd(a,b)" },
          { skill: "最小公倍数", icon: "✖️", hint: "a*b/gcd" },
          { skill: "矩阵遍历", icon: "🔳", hint: "Nested Loops" },
          { skill: "副对角线", icon: "📉", hint: "i+j == n-1" },
          { skill: "substr", icon: "✂️", hint: "s.substr(pos, len)" },
          { skill: "find", icon: "🔍", hint: "s.find() != npos" },
          { skill: "stringstream", icon: "🌊", hint: "Split string" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-slate-700 text-sm group-hover:text-red-600">{item.skill}</div>
            <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Topic Modules ---

// 专题一：数论 (MathModule)
const MathModule = () => {
  // Sieve Visualizer State
  const [sieveN, setSieveN] = useState(25);
  const [primes, setPrimes] = useState([]);
  const [vis, setVis] = useState(new Array(26).fill(false));
  const [currentI, setCurrentI] = useState(-1);
  const [currentJ, setCurrentJ] = useState(-1);
  const [running, setRunning] = useState(false);

  const runSieve = async () => {
    if (running) return;
    setRunning(true);
    let v = new Array(sieveN + 1).fill(false);
    let p = [];
    setVis([...v]);
    setPrimes([]);

    for (let i = 2; i <= sieveN; i++) {
      setCurrentI(i);
      setCurrentJ(-1);
      await new Promise(r => setTimeout(r, 500));

      if (!v[i]) {
        p.push(i);
        setPrimes([...p]);
        // Mark multiples
        for (let j = i * i; j <= sieveN; j += i) {
          setCurrentJ(j);
          v[j] = true;
          setVis([...v]);
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }
    setCurrentI(-1);
    setCurrentJ(-1);
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-2">核心心法</h3>
        <p className="text-purple-700">数论是五级的重头戏。<b>埃氏筛法</b>是求素数的标配，<b>欧几里得算法</b>求GCD要信手拈来。质因数分解也是常考题。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="埃代筛法 (Sieve of Eratosthenes)"
            code={`const int N = 1e6 + 5;
bool vis[N]; // 标记合数
void sieve(int n) {
    vis[0] = vis[1] = true; // 0,1不是素数
    for(int i=2; i*i<=n; i++) {
        if(!vis[i]) {
            for(int j=i*i; j<=n; j+=i)
                vis[j] = true;
        }
    }
}`}
          />
          <CodeBlock
            title="最大公约数 (GCD)"
            code={`// 使用 <algorithm>
int g = __gcd(12, 18); // 返回 6

// 手写递归
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Eye size={18} /> 算法可视化：埃氏筛法 N={sieveN}</h4>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {Array.from({ length: sieveN }, (_, i) => i + 1).map(num => {
              if (num === 1) return <div key={num} className="bg-slate-200 text-slate-400 p-2 text-center rounded text-sm">1</div>;
              let statusClass = "bg-white border-slate-200 text-slate-700";
              if (num === currentI) statusClass = "bg-blue-600 text-white shadow-lg scale-110"; // Current Prime Candidate
              else if (num === currentJ) statusClass = "bg-red-500 text-white scale-90"; // Eliminating
              else if (vis[num]) statusClass = "bg-slate-200 text-slate-400 decoration-slate-400 decoration-2 line-through"; // Eliminated
              else if (primes.includes(num)) statusClass = "bg-green-100 border-green-300 text-green-700 font-bold"; // Confirmed Prime

              return (
                <div key={num} className={`p-2 text-center border rounded text-sm transition-all duration-300 ${statusClass}`}>
                  {num}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-500">
              当前素数表: {primes.join(", ")}
            </div>
            <Button onClick={runSieve} disabled={running} size="sm">
              {running ? '筛选中...' : '开始筛选'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题二：二维数组 (Array2DModule)
const Array2DModule = () => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2">核心心法</h3>
        <p className="text-blue-700"><code>int a[N][M]</code>。先行后列是标准姿势。注意<b>方向数组</b> <code>dx[] dy[]</code> 在迷宫/搜索题目中的应用，以及杨辉三角的递推公式。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="矩阵输入与杨辉三角"
            code={`// 1. 输入 N*M 矩阵
for(int i=1; i<=n; i++)
  for(int j=1; j<=m; j++)
    cin >> a[i][j];

// 2. 杨辉三角
f[1][1] = 1;
for(int i=2; i<=n; i++) {
  for(int j=1; j<=i; j++) {
    f[i][j] = f[i-1][j-1] + f[i-1][j];
  }
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Grid size={18} /> 矩阵概念演示</h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-center text-sm">
              <thead className="bg-slate-100 text-slate-500">
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2">Col 1</th>
                  <th className="p-2">Col 2</th>
                  <th className="p-2">Col 3</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map(row => (
                  <tr key={row} className="border-t border-slate-100">
                    <td className="p-2 bg-slate-50 text-slate-500 font-mono">Row {row}</td>
                    {[1, 2, 3].map(col => (
                      <td key={col} className="p-3">
                        <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded">a[{row}][{col}]</code>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 专题三：字符串进阶 (StringModule)
const StringModule = () => (
  <div className="space-y-6">
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
      <h3 className="font-bold text-amber-800 mb-2">核心心法</h3>
      <p className="text-amber-700">五级字符串不再只是读入输出。必须熟练掌握 <code>string</code> 类的成员函数，以及利用 <code>stringstream</code> 进行类型转换或分割单词。</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 常用函数速查</h4>
        <div className="space-y-3">
          <div className="bg-white p-3 rounded border border-slate-200">
            <code className="text-purple-600 font-bold">s.length() / s.size()</code>
            <div className="text-xs text-slate-500">获取长度。O(1)。</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <code className="text-purple-600 font-bold">s.find(sub)</code>
            <div className="text-xs text-slate-500">查找子串。找到返回下标，找不到返回 string::npos。</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <code className="text-purple-600 font-bold">s.substr(pos, len)</code>
            <div className="text-xs text-slate-500">截取子串。从 pos 开始截取 len 个字符（省略 len 则截取到末尾）。</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <code className="text-purple-600 font-bold">s.insert(pos, str)</code>
            <div className="text-xs text-slate-500">在 pos 位置插入 str。</div>
          </div>
        </div>
      </div>

      <Card className="p-5 bg-white">
        <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Code size={18} /> Stringstream 妙用</h4>
        <CodeBlock
          title="分割单词 / 字符串转数字"
          code={`#include <sstream>
// ...
string s = "123 456 hello";
stringstream ss(s);
int a, b;
string str;
ss >> a >> b >> str;
// a=123, b=456, str="hello"`}
        />
        <div className="bg-amber-50 p-3 rounded text-sm text-amber-800 mt-4">
          <strong>Tip:</strong> 分割空格分隔的句子时，stringstream 是神器，比自己写 for 循环判断空格方便得多。
        </div>
      </Card>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Code Trace
// -----------------------------------------------------------------------------
const CodeTraceModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "GCD (欧几里得)",
      code: `int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n// Call: gcd(12, 18)`,
      steps: [
        { line: 5, vars: { a: 12, b: 18 }, desc: "Initial call: gcd(12, 18)", output: "" },
        { line: 1, vars: { a: 12, b: 18 }, desc: "Enter gcd(12, 18)", output: "" },
        { line: 2, vars: { a: 12, b: 18 }, desc: "b == 0? False", output: "" },
        { line: 3, vars: { a: 12, b: 18 }, desc: "Recurse: gcd(18, 12 % 18) -> gcd(18, 12)", output: "" },
        { line: 1, vars: { a: 18, b: 12 }, desc: "Enter gcd(18, 12)", output: "" },
        { line: 2, vars: { a: 18, b: 12 }, desc: "b == 0? False", output: "" },
        { line: 3, vars: { a: 18, b: 12 }, desc: "Recurse: gcd(12, 18 % 12) -> gcd(12, 6)", output: "" },
        { line: 1, vars: { a: 12, b: 6 }, desc: "Enter gcd(12, 6)", output: "" },
        { line: 2, vars: { a: 12, b: 6 }, desc: "b == 0? False", output: "" },
        { line: 3, vars: { a: 12, b: 6 }, desc: "Recurse: gcd(6, 12 % 6) -> gcd(6, 0)", output: "" },
        { line: 1, vars: { a: 6, b: 0 }, desc: "Enter gcd(6, 0)", output: "" },
        { line: 2, vars: { a: 6, b: 0 }, desc: "b == 0? True! Return a (6)", output: "" },
        { line: 3, vars: { res: 6 }, desc: "Return 6 up the stack...", output: "6" }
      ]
    },
    {
      title: "矩阵遍历 (双重循环)",
      code: `int sum = 0;\nfor(int i=0; i<2; i++) {\n    for(int j=0; j<2; j++) {\n        sum += a[i][j];\n    }\n}`,
      steps: [
        { line: 1, vars: { sum: 0, i: "?", j: "?" }, desc: "Initialize sum", output: "" },
        { line: 2, vars: { sum: 0, i: 0 }, desc: "Outer loop i=0", output: "" },
        { line: 3, vars: { sum: 0, i: 0, j: 0 }, desc: "Inner loop j=0", output: "" },
        { line: 4, vars: { sum: 1, i: 0, j: 0 }, desc: "sum += a[0][0]", output: "" },
        { line: 3, vars: { sum: 1, i: 0, j: 1 }, desc: "Inner loop j=1", output: "" },
        { line: 4, vars: { sum: 3, i: 0, j: 1 }, desc: "sum += a[0][1]", output: "" },
        { line: 2, vars: { sum: 3, i: 1 }, desc: "Outer loop i=1", output: "" },
        { line: 3, vars: { sum: 3, i: 1, j: 0 }, desc: "Inner loop j=0", output: "" },
        { line: 4, vars: { sum: 6, i: 1, j: 0 }, desc: "sum += a[1][0]", output: "" },
        { line: 3, vars: { sum: 6, i: 1, j: 1 }, desc: "Inner loop j=1", output: "" },
        { line: 4, vars: { sum: 10, i: 1, j: 1 }, desc: "sum += a[1][1]", output: "" }
      ]
    }
  ];

  const example = examples[selectedExample];
  const step = example.steps[currentStep];

  useEffect(() => {
    if (isPlaying && currentStep < example.steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(c => c + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, example.steps.length]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Eye /> 代码跟踪模拟器
        </h2>
        <p className="text-cyan-100">
          透视递归调用栈与嵌套循环逻辑。
        </p>
      </div>

      <div className="flex gap-2">
        {examples.map((ex, idx) => (
          <Button
            key={idx}
            variant={selectedExample === idx ? "primary" : "secondary"}
            onClick={() => { setSelectedExample(idx); setCurrentStep(0); setIsPlaying(false); }}
            className="text-sm"
          >
            {ex.title}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700">
          <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 border-b border-slate-700 font-mono flex gap-2">
            <div className="flex gap-1.5 pt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            trace.cpp
          </div>
          <div className="p-4 font-mono text-sm">
            {example.code.split('\n').map((line, idx) => (
              <div key={idx} className={`py-1 px-2 rounded flex ${step.line === idx + 1 ? 'bg-yellow-500/30 border-l-4 border-yellow-400' : ''}`}>
                <span className="text-slate-600 w-6 text-right mr-4 select-none">{idx + 1}</span>
                <span className="text-blue-100 whitespace-pre">{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2"><Play size={18} className="text-blue-600" /> 控制台</h4>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Step {currentStep + 1}/{example.steps.length}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}><ArrowRightLeft size={16} className="rotate-180" /></Button>
              <Button
                variant={isPlaying ? "success" : "primary"}
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1"
              >
                {isPlaying ? '⏸ 暂停' : '▶ 播放'}
              </Button>
              <Button variant="secondary" onClick={() => setCurrentStep(Math.min(example.steps.length - 1, currentStep + 1))}><ArrowRightLeft size={16} /></Button>
              <Button variant="secondary" onClick={() => { setCurrentStep(0); setIsPlaying(false); }}><RefreshCw size={16} /></Button>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2"><ArrowRightLeft size={18} className="text-purple-600" /> 变量监视</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(step.vars).map(([k, v]) => (
                <div key={k} className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">{k}</div>
                  <div className="font-bold text-slate-800 font-mono truncate">{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <div className={`p-4 rounded-xl border transition-colors ${step.output ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex gap-3">
              <div className={`mt-0.5 ${step.output ? 'text-green-600' : 'text-slate-400'}`}>
                {step.output ? <CheckCircle size={18} /> : <Info size={18} />}
              </div>
              <div>
                <div className={`font-medium text-sm ${step.output ? 'text-green-800' : 'text-slate-600'}`}>{step.desc}</div>
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
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Code /> 万能代码模板</h2>
      <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">背诵 + 理解</span>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <TemplateBlock
        title="1. 埃氏筛法"
        desc="线性筛的简化版，足够应付 Level 5"
        code={`bool vis[1000005];
void sieve(int n) {
    vis[0]=vis[1]=1;
    for(int i=2; i*i<=n; i++) {
        if(!vis[i]) {
            for(int j=i*i; j<=n; j+=i)
                 vis[j]=1;
        }
    }
}`}
      />
      <TemplateBlock
        title="2. 对角线判定"
        desc="主/副对角线"
        code={`// 主对角线
if (i == j) ...

// 副对角线 (N是阶数)
if (i + j == N - 1) ...`}
      />
      <TemplateBlock
        title="3. GCD / LCM"
        desc="最小公倍数 = a * b / gcd(a, b)"
        code={`int gcd(int a, int b) {
    return b==0 ? a : gcd(b, a%b);
}
int lcm(int a, int b) {
    return a / gcd(a,b) * b; // 先除后乘防溢出
}`}
      />
      <TemplateBlock
        title="4. Stringstream"
        desc="字符流处理"
        code={`#include <sstream>
stringstream ss;
ss << "123";
int x;
ss >> x; // string -> int`}
      />
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Exam Tips
// -----------------------------------------------------------------------------
const ExamTipsModule = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Lightbulb /> 考场秘籍</h2>
      <p className="text-amber-100">GESP 五级考点聚焦与避坑指南。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 时间管理</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>预处理思想</strong>: 涉及多次查询素数/因数，一定要先预处理（打表/筛法），不要在每次查询时通过循环判断。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 调试技巧</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>数组越界</strong>: 二维数组 <code>a[N][M]</code>，内层循环必须用 <code>M</code> 限制，写成 <code>N</code> 必错。</li>
          <li>• <strong>输出调试</strong>: 矩阵题目，先把矩阵打印出来看看有没有读错。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 致命陷阱</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• <strong>1 不是素数</strong>: 筛法初始标记 <code>vis[1]=1</code>。</li>
          <li>• <strong>GCD(0,x)</strong>: <code>gcd(0, 5)</code> 是 5，别写挂了。</li>
          <li>• <strong>string::npos</strong>: 找不到子串时返回的是这个特殊常量(通常是 -1 的 unsigned 版)，不是 0。</li>
        </ul>
      </div>
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Module: Practice
// -----------------------------------------------------------------------------
const PracticeModule = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      q: "gcd(24, 36) 的值是？",
      opts: ["6", "12", "4", "8"],
      ans: 1,
      expl: "24=2*12, 36=3*12. 最大公约数是 12。"
    },
    {
      q: "埃氏筛法的时间复杂度是？",
      opts: ["O(N)", "O(N log N)", "O(N log log N)", "O(N^2)"],
      ans: 2,
      expl: "埃氏筛法的复杂度非常接近线性，为 O(N log log N)。"
    },
    {
      q: "若 string s = \"abcdef\"; s.substr(2, 3) 的结果是？",
      opts: ["bcd", "cde", "def", "abc"],
      ans: 1,
      expl: "substr(pos, len)。下标 2 是 'c'，长度 3，所以是 'cde'。"
    },
    {
      q: "int a[3][4]; a[1][2] 的下一个元素（内存连续）是？",
      opts: ["a[1][3]", "a[2][2]", "a[2][0]", "a[1][1]"],
      ans: 0,
      expl: "C++ 数组是行优先存储。a[1][2] -> a[1][3] -> a[2][0]..."
    },
    {
      q: "判断一个数 x 是否为素数，暴力法的循环终止条件最好是？",
      opts: ["i < x", "i <= x", "i * i <= x", "i <= x / 2"],
      ans: 2,
      expl: "试除法只需要枚举到 sqrt(x) 即可，所以是 i * i <= x。"
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
    <div className="max-w-2xl mx-auto">
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
                    : 'border-slate-100 hover:border-red-400 hover:bg-red-50 text-slate-700'}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}. {opt}</span>
                {showResult && idx === q.ans && <CheckCircle size={20} className="text-green-600" />}
                {showResult && idx === selected && idx !== q.ans && <XCircle size={20} className="text-red-600" />}
              </button>
            ))}
          </div>
          {showResult && (
            <div className="mt-6 animate-fade-in">
              <div className={`p-4 rounded-xl text-sm ${selected === q.ans ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-1">{selected === q.ans ? '回答正确！' : '回答错误'}</p>
                <p>{q.expl}</p>
              </div>
              <Button onClick={next} variant="primary" className="w-full mt-4">
                {current < questions.length - 1 ? '下一题' : '查看结果'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 考前清单 (CheckListModule)
const CheckListModule = () => {
  const items = [
    "数论：__gcd 是下划线开头；1 不是素数；vis 数组要开得足够大（看题目范围）。",
    "二维数组：注意行 (i) 和列 (j) 别写反了；定义 int a[N][N] 最好放在全局区（防止栈溢出）。",
    "字符串：s.length() 返回的是无符号整数(size_t)，小心 s.length()-1 变成极大值（当 length=0 时）。",
    "时间：Run sieve 预处理通常 O(N)，单次查询 O(1)。不要对每个查询都重新筛一遍。",
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-600" />
        考前冲刺 CheckList
      </h3>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
            <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400 mt-0.5">
              {idx + 1}
            </div>
            <span className="text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

// --- Main Component ---

export default function CourseLevel5() {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'math', label: '数论专题', icon: Divide },
    { id: 'array2d', label: '二维数组', icon: Grid },
    { id: 'string', label: '字符串进阶', icon: Hash },
    { id: 'trace', label: '代码跟踪', icon: Eye },
    { id: 'templates', label: '万能模板', icon: Code },
    { id: 'tips', label: '考场秘籍', icon: Lightbulb },
    { id: 'practice', label: '真题实战', icon: Trophy },
    { id: 'checklist', label: '考前清单', icon: CheckCircle },
  ];

  const activeTabInfo = menuItems.find(item => item.id === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              G
            </div>
            <h1 className="text-xl font-bold text-slate-800">GESP 五级</h1>
          </div>
          <p className="text-xs text-slate-500">进阶提升 2025版</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === item.id
                  ? 'bg-red-50 text-red-700 shadow-sm border border-red-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            `}
            >
              <item.icon size={18} />
              {item.label}
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2025 GESP 备考互动课件</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-red-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 5</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
            {activeTab === 'math' && <div className="animate-fade-in"><MathModule /></div>}
            {activeTab === 'array2d' && <div className="animate-fade-in"><Array2DModule /></div>}
            {activeTab === 'string' && <div className="animate-fade-in"><StringModule /></div>}
            {activeTab === 'trace' && <div className="animate-fade-in"><CodeTraceModule /></div>}
            {activeTab === 'templates' && <div className="animate-fade-in"><TemplatesModule /></div>}
            {activeTab === 'tips' && <div className="animate-fade-in"><ExamTipsModule /></div>}
            {activeTab === 'practice' && <div className="animate-fade-in"><PracticeModule /></div>}
            {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
          </div>
          <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
            GESP C++ 五级备考互动课件 | 数论矩阵与高级字符串
          </footer>
        </main>
      </div>
    </div>
  );
}
