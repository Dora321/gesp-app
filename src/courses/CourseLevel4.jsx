import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, CheckCircle, AlertTriangle, Play, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Copy, Check, Unlock, ArrowRight, Grid, Info, ArrowRightLeft, RefreshCw, Clock, Target, XCircle, Layout, GitCommit, Layers, Box, AlignJustify, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';

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
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold mb-4">GESP C++ 四级进阶指南</h1>
      <p className="text-indigo-100 text-lg mb-6">
        从面向过程迈向模块化编程。掌握函数封装、结构体抽象与基础排序算法。
      </p>
      <button
        onClick={() => onStart('func')}
        className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition flex items-center gap-2"
      >
        开始学习 <ArrowRight size={18} />
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <GitCommit size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">函数专题</h3>
        <p className="text-slate-600 text-sm">
          理解函数定义、参数传递（值传递 vs 引用传递）、作用域与生命周期。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <Box size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">结构体与排序</h3>
        <p className="text-slate-600 text-sm">
          自定义数据类型 <code>struct</code>，结构体数组与自定义排序规则 <code>cmp</code>。
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <AlignJustify size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">算法进阶</h3>
        <p className="text-slate-600 text-sm">
          掌握简单排序（冒泡/选择/插入）、多层循环模拟与枚举优化。
        </p>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calculator className="text-purple-500" /> GESP 四级分数构成
      </h3>
      <div className="flex gap-2 mb-4">
        {[
          { name: "选择题", score: 30, color: "bg-blue-500", desc: "15题 基础语法 & 逻辑" },
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
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-purple-800 text-sm">
          <strong>💡 核心考点变化：</strong>四级开始强制要求使用<b>函数</b>封装代码，编程题往往涉及<b>结构体排序</b>或者<b>复杂逻辑模拟</b>。
        </p>
      </div>
    </div>

    {/* Self Assessment */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="text-yellow-500" /> 四级核心技能自测
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "函数定义", icon: "📦", hint: "return type, void" },
          { skill: "引用传递", icon: "🔗", hint: "int &x" },
          { skill: "全局/局部变量", icon: "🌐", hint: "Scope" },
          { skill: "结构体定义", icon: "🏗️", hint: "struct Node {}" },
          { skill: "结构体排序", icon: "📶", hint: "sort + cmp" },
          { skill: "数组极值下标", icon: "📊", hint: "Struct update" },
          { skill: "质数函数", icon: "🔍", hint: "isPrime()" },
          { skill: "多重循环", icon: "🔄", hint: "Nest Loop" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-slate-700 text-sm group-hover:text-indigo-600">{item.skill}</div>
            <div className="text-xs text-slate-400 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Topic Modules ---

// 专题一：函数 (FuncModule)
const FuncModule = () => {
  const [valX, setValX] = useState(10);
  const [isRef, setIsRef] = useState(false); // Toggle between value and reference pass
  const [funcLog, setFuncLog] = useState([]);

  const runSimulation = () => {
    const logs = [];
    logs.push(`Main: Initial x = ${valX}`);
    if (isRef) {
      logs.push(`Call: void change(int &a) // 引用传递`);
      logs.push(`Func: a is Alias of x. Modifying a...`);
      logs.push(`Func: a += 5 => x is now ${valX + 5}`);
      setValX(valX + 5);
    } else {
      logs.push(`Call: void change(int a) // 值传递`);
      logs.push(`Func: a is Copy of x. Modifying a...`);
      logs.push(`Func: a += 5 => a becomes ${valX + 5}, x remains ${valX}`);
    }
    logs.push(`Main: Final x = ${isRef ? valX + 5 : valX}`);
    setFuncLog(logs);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <h3 className="font-bold text-indigo-800 mb-2">核心心法</h3>
        <p className="text-indigo-700">函数是程序积木。切记：<b>值传递</b>是复制副本（互不影响），<b>引用传递</b>是操作本体（牵一发动全身），<b>全局变量</b>全村共享。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="函数定义与调用"
            code={`// 1. 值传递 (Copy)
void addOne(int x) {
    x++; // 只改变副本
}

// 2. 引用传递 (Alias)
void addReal(int &x) {
    x++; // 改变真身
}

// 3. 质数判断函数
bool isPrime(int n) {
    if(n < 2) return false;
    for(int i=2; i*i<=n; i++)
        if(n%i==0) return false;
    return true;
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Play size={18} /> 难点突破：值传递 vs 引用传递</h4>

          <div className="flex items-center gap-4 mb-6 bg-slate-50 p-3 rounded-lg">
            <span className="text-sm font-bold text-slate-600">当前模式：</span>
            <button
              onClick={() => { setIsRef(false); setValX(10); setFuncLog([]); }}
              className={`px-3 py-1 rounded text-sm transition ${!isRef ? 'bg-blue-600 text-white shadow' : 'bg-slate-200 text-slate-600'}`}
            >
              void f(int a)
            </button>
            <button
              onClick={() => { setIsRef(true); setValX(10); setFuncLog([]); }}
              className={`px-3 py-1 rounded text-sm transition ${isRef ? 'bg-green-600 text-white shadow' : 'bg-slate-200 text-slate-600'}`}
            >
              void f(int &a)
            </button>
          </div>

          <div className="flex justify-between items-center mb-4 px-4">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Main Variable (x)</div>
              <div className="text-2xl font-mono font-bold text-slate-800">{valX}</div>
            </div>
            <ArrowRight className="text-slate-300" />
            <div className="text-center">
              <Button onClick={runSimulation} size="sm">运行 change(x)</Button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-green-400 h-32 overflow-y-auto">
            {funcLog.length === 0 ? "// 点击运行查看执行流..." : funcLog.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </Card>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
        <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-yellow-800">易错点警示</h4>
          <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mt-1">
            <li><strong>Return 陷阱</strong>：<code>void</code> 函数不能 return 值；非 void 函数必须所有路径都有 return。</li>
            <li><strong>局部变量</strong>：函数内定义的变量是局部的，函数结束即销毁，不要返回局部变量的指针/引用。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// 专题二：结构体与排序 (StructModule)
const StructModule = () => {
  const [students, setStudents] = useState([
    { name: "Alice", score: 85, id: 2 },
    { name: "Bob", score: 92, id: 1 },
    { name: "Cindy", score: 85, id: 3 },
    { name: "Dave", score: 78, id: 4 }
  ]);
  const [sortRule, setSortRule] = useState('score_desc'); // 'score_desc', 'id_asc'

  const sortStudents = (rule) => {
    const newArr = [...students];
    if (rule === 'score_desc') {
      // 分数降序，同分按ID升序
      newArr.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.id - b.id;
      });
    } else if (rule === 'id_asc') {
      newArr.sort((a, b) => a.id - b.id);
    }
    setStudents(newArr);
    setSortRule(rule);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-bold text-green-800 mb-2">核心心法</h3>
        <p className="text-green-700"><code>struct</code> 把散落的数据打包。<code>sort</code> 函数配合自定义 <code>cmp</code>，想怎么排就怎么排（多关键字排序是必考）。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="结构体定义与cmp排序"
            code={`struct Stu {
    string name;
    int score;
    int id;
};

// 排序规则：分数高优先；分数相同，学号小优先
bool cmp(Stu a, Stu b) {
    if (a.score != b.score) {
        return a.score > b.score; // 降序
    }
    return a.id < b.id; // 升序
}

Stu a[105];
// inside main:
sort(a + 1, a + n + 1, cmp);`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><AlignJustify size={18} /> 排序规则实验室</h4>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => sortStudents('score_desc')}
              variant={sortRule === 'score_desc' ? 'primary' : 'secondary'}
              className="text-xs"
            >
              Sort by Score (Desc)
            </Button>
            <Button
              onClick={() => sortStudents('id_asc')}
              variant={sortRule === 'id_asc' ? 'primary' : 'secondary'}
              className="text-xs"
            >
              Sort by ID (Asc)
            </Button>
          </div>

          <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-500">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-center">Score</th>
                  <th className="p-2 text-center">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id} className="animate-fade-in">
                    <td className="p-2 font-medium text-slate-700 pl-4">{s.name}</td>
                    <td className={`p-2 text-center font-bold ${sortRule === 'score_desc' ? 'text-blue-600' : 'text-slate-600'}`}>{s.score}</td>
                    <td className={`p-2 text-center font-mono ${sortRule === 'id_asc' ? 'text-blue-600' : 'text-slate-400'}`}>{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            * 观察 Alice (85, ID:2) 和 Cindy (85, ID:3) 的相对位置。
          </p>
        </Card>
      </div>
    </div>
  );
};
// 专题三：算法进阶 (AlgoModule)
const AlgoModule = () => {
  const [arr, setArr] = useState([5, 1, 4, 2, 8]);
  const [sorting, setSorting] = useState(false);
  const [current, setCurrent] = useState([-1, -1]); // [j, j+1]

  const runBubbleSort = async () => {
    if (sorting) return;
    setSorting(true);
    let a = [...arr];
    let n = a.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrent([j, j + 1]);
        await new Promise(r => setTimeout(r, 800)); // Delay for visualization
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          setArr([...a]);
        }
      }
    }
    setCurrent([-1, -1]);
    setSorting(false);
  };

  const resetArr = () => {
    setArr([5, 1, 4, 2, 8]);
    setSorting(false);
    setCurrent([-1, -1]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <h3 className="font-bold text-amber-800 mb-2">核心心法</h3>
        <p className="text-amber-700">算法是解决问题的步骤。四级重点：<b>暴力枚举</b>（优化循环边界），<b>简单排序</b>（冒泡/选择），以及复杂逻辑的<b>模拟</b>。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2"><Code size={18} /> 核心代码模板</h4>
          <CodeBlock
            title="冒泡排序 (Bubble Sort)"
            code={`for (int i = 0; i < n - 1; i++) {
    // 每一轮将最大的元素"冒泡"到最后
    for (int j = 0; j < n - i - 1; j++) {
        if (a[j] > a[j+1]) {
            swap(a[j], a[j+1]); 
        }
    }
}`}
          />
        </div>

        <Card className="p-5 bg-white">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Layers size={18} /> 算法可视化：冒泡排序</h4>

          <div className="flex justify-center items-end gap-3 h-40 mb-6 bg-slate-50 rounded-lg p-4 border border-slate-100">
            {arr.map((val, idx) => {
              const isActive = idx === current[0] || idx === current[1];
              return (
                <div key={idx} className="flex flex-col items-center gap-1 transition-all duration-300" style={{ order: idx }}>
                  <div
                    className={`w-10 rounded-t-lg flex items-end justify-center pb-2 text-white font-bold transition-colors duration-300 ${isActive ? 'bg-amber-500 shadow-lg scale-105' : 'bg-slate-400'}`}
                    style={{ height: `${val * 10 + 20}px` }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{idx}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={runBubbleSort} disabled={sorting} variant="primary">
              {sorting ? '排序中...' : '开始冒泡排序'}
            </Button>
            <Button onClick={resetArr} disabled={sorting} variant="secondary">
              重置
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// 考前清单 (CheckListModule)
const CheckListModule = () => {
  const items = [
    "头文件：#include <bits/stdc++.h> (推荐) 或 <iostream>, <algorithm>, <vector>",
    "函数：所有非 void 函数必须有返回值，否则判题会有误。",
    "数组：结构体数组大小要比 N 稍微大一点。",
    "类型：涉及乘积计算或大数累加，务必使用 long long。",
    "调试：遇到死循环检查 for/while 退出条件；遇到输出不对检查变量初始化。"
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

// -----------------------------------------------------------------------------
// Module: Code Trace
// -----------------------------------------------------------------------------
const CodeTraceModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "结构体排序",
      code: `struct Node { int x, y; };\nbool cmp(Node a, Node b) {\n    return a.x < b.x;\n}\nNode arr[3] = {{3,1}, {1,5}, {2,8}};\nsort(arr, arr+3, cmp);`,
      steps: [
        { line: 5, vars: { arr: "[{3,1}, {1,5}, {2,8}]" }, desc: "初始化结构体数组", output: "" },
        { line: 6, vars: { arr: "..." }, desc: "调用 sort 函数", output: "" },
        { line: 2, vars: { a: "{3,1}", b: "{1,5}" }, desc: "比较: 3 < 1 ? False", output: "" },
        { line: 2, vars: { a: "{1,5}", b: "{3,1}" }, desc: "交换后继续比较...", output: "" },
        { line: 2, vars: { a: "{3,1}", b: "{2,8}" }, desc: "比较: 3 < 2 ? False", output: "" },
        { line: 6, vars: { arr: "[{1,5}, {2,8}, {3,1}]" }, desc: "排序完成", output: "" }
      ]
    },
    {
      title: "递归函数(简单)",
      code: `void func(int n) {\n    if(n==0) return;\n    cout << n << " ";\n    func(n-1);\n}\nint main() { func(3); }`,
      steps: [
        { line: 6, vars: { n: "-" }, desc: "main 调用 func(3)", output: "" },
        { line: 1, vars: { n: 3 }, desc: "进入 func(3)", output: "" },
        { line: 2, vars: { n: 3 }, desc: "3==0? False", output: "" },
        { line: 3, vars: { n: 3 }, desc: "输出 3", output: "3 " },
        { line: 4, vars: { n: 3 }, desc: "递归调用 func(2)", output: "3 " },
        { line: 1, vars: { n: 2 }, desc: "进入 func(2)", output: "3 " },
        { line: 2, vars: { n: 2 }, desc: "2==0? False", output: "3 " },
        { line: 3, vars: { n: 2 }, desc: "输出 2", output: "3 2 " },
        { line: 4, vars: { n: 2 }, desc: "递归调用 func(1)", output: "3 2 " },
        { line: 1, vars: { n: 1 }, desc: "进入 func(1)", output: "3 2 " },
        { line: 3, vars: { n: 1 }, desc: "输出 1", output: "3 2 1 " },
        { line: 4, vars: { n: 1 }, desc: "递归调用 func(0)", output: "3 2 1 " },
        { line: 2, vars: { n: 0 }, desc: "0==0? True, Return", output: "3 2 1 " }
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
          透视函数调用栈与排序过程，理解代码背后的逻辑。
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
        title="1. 结构体与自定义排序"
        desc="最常用的多关键字排序模板"
        code={`struct Node {
    int id, score;
};
// 降序排列，分数相同按学号小都排
bool cmp(Node a, Node b) {
    if(a.score != b.score) return a.score > b.score;
    return a.id < b.id;
}
// 使用: sort(arr, arr+n, cmp);`}
      />
      <TemplateBlock
        title="2. 质数判断函数"
        desc="封装好的 bool 函数"
        code={`bool isPrime(int n) {
    if(n < 2) return false;
    for(int i=2; i*i<=n; i++) {
        if(n % i == 0) return false;
    }
    return true;
}`}
      />
      <TemplateBlock
        title="3. 数组元素交换"
        desc="手动 swap 及其逻辑"
        code={`void mySwap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}`}
      />
      <TemplateBlock
        title="4. 输入输出加速"
        desc="数据量大时使用"
        code={`ios::sync_with_stdio(0);
cin.tie(0);
// 之后只能用 cin/cout，不能混用 scanf/printf`}
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
      <p className="text-amber-100">GESP 四级考点聚焦与避坑指南。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><Clock size={20} /> 审题策略</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li>• <strong>数据范围</strong>: 看到 N=1000 用 O(N²)，N=10^5 用 O(NlogN)。四级通常 N 小于 1000。</li>
          <li>• <strong>题目细节</strong>: 即使题目说"正整数"，也要防备 0 或 1。</li>
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><Target size={20} /> 编程习惯</h3>
        <ul className="space-y-2 text-sm text-green-900">
          <li>• <strong>封装函数</strong>: 遇到复杂逻辑（如判断质数、回文），单独写个函数，主程序更清晰。</li>
          <li>• <strong>变量初始化</strong>: 计数器 <code>cnt=0</code>，累加器 <code>sum=0</code> 别忘了。</li>
        </ul>
      </div>
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2"><AlertTriangle size={20} /> 高频大坑</h3>
        <ul className="space-y-2 text-sm text-purple-900">
          <li>• <strong>void函数</strong>: <code>void</code> 函数里写了 <code>return 1;</code> 会直接报错。</li>
          <li>• <strong>结构体排序</strong>: cmp 函数必须严格弱序，相等情况必须 return false。</li>
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
      q: "void f(int x) { x=10; } int main(){ int a=5; f(a); cout<<a; } 输出结果是？",
      opts: ["5", "10", "0", "编译错误"],
      ans: 0,
      expl: "值传递：函数 f 接收的是 a 的副本，修改 x 不会影响 main 中的 a。"
    },
    {
      q: "struct Node { int x; }; Node a; a.x=10; Node b=a; b.x=20; cout<<a.x; 输出？",
      opts: ["10", "20", "0", "随机值"],
      ans: 0,
      expl: "结构体赋值也是值拷贝。b=a 时 b 获得了 a 的副本，修改 b 不影响 a。"
    },
    {
      q: "若要将数组 a 降序排列，sort 的 cmp 函数应写为？",
      opts: ["return x < y;", "return x > y;", "return x == y;", "return x <= y;"],
      ans: 1,
      expl: "sort 默认升序 (<)。降序需要返回 x > y。"
    },
    {
      q: "全局变量 int g; 如果没有显式初始化，它的默认值是？",
      opts: ["随机值", "0", "1", "undefined"],
      ans: 1,
      expl: "C++ 标准规定，全局变量和静态变量默认初始化为 0。"
    },
    {
      q: "冒泡排序最好情况下的时间复杂度是？",
      opts: ["O(N)", "O(N^2)", "O(logN)", "O(1)"],
      ans: 0,
      expl: "虽然标准冒泡是 O(N^2)，但优化后的冒泡（若一轮无交换则提前退出）在有序数组上是 O(N)。这里考的是基本概念。"
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
                    : 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700'}`}
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

// --- Main Component ---

// --- Main Component ---

export default function CourseLevel4() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'func', label: '函数专题', icon: GitCommit },
    { id: 'struct', label: '结构体与排序', icon: Box },
    { id: 'algo', label: '算法进阶', icon: Layers },
    { id: 'trace', label: '代码跟踪', icon: Eye },
    { id: 'templates', label: '万能模板', icon: Code },
    { id: 'tips', label: '考场秘籍', icon: Lightbulb },
    { id: 'practice', label: '真题实战', icon: Trophy },
    { id: 'checklist', label: '考前清单', icon: CheckCircle },
  ];

  const activeTabInfo = menuItems.find(item => item.id === activeTab);

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
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 四级
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
            <h1 className="text-xl font-bold text-slate-800">GESP 四级</h1>
          </div>
          <p className="text-xs text-slate-500">进阶指南 2025版</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
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
      <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-indigo-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 4</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <CppLevelSupport level={4} />}
            {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
            {activeTab === 'func' && <div className="animate-fade-in"><FuncModule /></div>}
            {activeTab === 'struct' && <div className="animate-fade-in"><StructModule /></div>}
            {activeTab === 'algo' && <div className="animate-fade-in"><AlgoModule /></div>}
            {activeTab === 'trace' && <CodeTraceModule />}
            {activeTab === 'templates' && <TemplatesModule />}
            {activeTab === 'tips' && <ExamTipsModule />}
            {activeTab === 'practice' && <PracticeModule />}
            {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
            <CppLevelSupport level={4} placement="bottom" />
          </div>
          <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
            GESP C++ 四级备考互动课件 | 模块化编程与结构化数据
          </footer>
        </main>
      </div>
    </div>
  );
}
