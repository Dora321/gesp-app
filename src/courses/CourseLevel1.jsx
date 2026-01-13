import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Calculator, Code, AlertTriangle, Play, ChevronRight, CheckCircle, Info, Copy, Check, Star, Zap, Trophy, RefreshCw, XCircle, MousePointerClick, Unlock, Lightbulb, Target, Clock, Award, FileCode, ArrowRightLeft, Eye, SkipForward, Menu, X } from 'lucide-react';

const GESPCourseware = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items
  const navItems = [
    { id: 'overview', label: '核心考点总览', icon: <Info size={20} /> },
    { id: 'topics', label: '专题深度讲解', icon: <Book size={20} /> },
    { id: 'trace', label: '代码跟踪模拟', icon: <Eye size={20} /> },
    { id: 'pitfalls', label: '备考避坑指南', icon: <AlertTriangle size={20} /> },
    { id: 'templates', label: '万能代码模板', icon: <Code size={20} /> },
    { id: 'tips', label: '考试秘籍攻略', icon: <Lightbulb size={20} /> },
    { id: 'practice', label: '真题实战演练', icon: <Trophy size={20} /> },
  ];

  // Render Content Switcher
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection changeTab={setActiveTab} />;
      case 'topics': return <TopicSection selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />;
      case 'trace': return <CodeTraceSection />;
      case 'pitfalls': return <PitfallsSection />;
      case 'templates': return <TemplatesSection />;
      case 'tips': return <ExamTipsSection />;
      case 'practice': return <PracticeSection />;
      default: return <OverviewSection changeTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 一级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
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
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 hidden md:block">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <span className="bg-indigo-600 text-white p-1 rounded text-sm">C++</span>
            GESP 一级
          </h1>
          <p className="text-xs text-slate-500 mt-2">互动式备考讲义</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 bg-slate-50 text-xs text-slate-400 text-center">
          针对 2023.03 - 2025.09 真题分析
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- 1. Overview Section ---
const OverviewSection = ({ changeTab }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
      <h2 className="text-3xl font-bold mb-4">GESP C++ 一级冲刺指南</h2>
      <p className="text-indigo-100 max-w-2xl mb-6">
        基于历年真题（2023-2025）分析，主要考察基本数据类型、算术运算、if-else 逻辑判断及基础循环的综合运用。
      </p>
      <button
        onClick={() => changeTab('topics')}
        className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
      >
        开始学习 <ChevronRight size={18} />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calculator className="text-blue-500" /> 核心考察能力
        </h3>
        <ul className="space-y-3">
          {[
            { title: "基本运算", desc: "整数除法 (/) 与取模 (%) 的区别与应用" },
            { title: "流程控制", desc: "if-else 嵌套与 for/while 循环" },
            { title: "数据类型", desc: "int, long long (大数累加), float/double" },
            { title: "算法思想", desc: "基础枚举法（穷举）与模拟法" }
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
              <div>
                <span className="font-medium text-slate-700">{item.title}</span>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Book className="text-green-500" /> 近期真题趋势
          </h3>
          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="text-xs font-bold text-amber-600 bg-amber-200 px-2 py-0.5 rounded mr-2">25年3月</span>
              <span className="text-sm text-slate-700">更加侧重**数学公式转化**，如“四舍五入”技巧。</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="text-xs font-bold text-amber-600 bg-amber-200 px-2 py-0.5 rounded mr-2">24年12月</span>
              <span className="text-sm text-slate-700">考察**逻辑判断细节**，如温度转换中的浮点数处理。</span>
            </div>
          </div>
        </div>

        {/* Knowledge Stats Visualization */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" /> 考点掌握度要求
          </h3>
          <div className="space-y-3">
            {[
              { label: '变量与类型', val: 95, color: 'bg-green-500' },
              { label: '逻辑运算 (&& || !)', val: 90, color: 'bg-blue-500' },
              { label: '循环控制 (for/while)', val: 85, color: 'bg-purple-500' },
              { label: '数学应用 (mod/div)', val: 80, color: 'bg-orange-500' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>{stat.label}</span>
                  <span>{stat.val}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${stat.color} transition-all duration-1000`} style={{ width: `${stat.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Self Assessment Quick Check */}
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Star className="text-yellow-500" /> 备考自测：你掌握了多少？
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { skill: "整数除法特性", icon: "÷", hint: "5/2=?" },
          { skill: "取模运算", icon: "%", hint: "7%3=?" },
          { skill: "闰年判断", icon: "📅", hint: "2024是闰年吗？" },
          { skill: "变量类型", icon: "🔢", hint: "int vs long long" },
          { skill: "冯·诺依曼", icon: "🖥️", hint: "五大部件" },
          { skill: "输入输出", icon: "⌨️", hint: "cin/cout" },
          { skill: "循环结构", icon: "🔄", hint: "for循环次数" },
          { skill: "逻辑运算", icon: "🧠", hint: "&& || !" },
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
      <p className="text-xs text-slate-500 mt-4 text-center">
        💡 如果以上概念你都清楚，说明基础扎实！点击侧边栏进入专题深度学习。
      </p>
    </div>

    {/* Quick Start Guide */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <Clock size={20} />
          </div>
          <h4 className="font-bold text-blue-800">第1周</h4>
        </div>
        <p className="text-sm text-blue-700">学习基础概念：计算机组成、冯·诺依曼体系、变量类型</p>
      </div>
      <div className="bg-green-50 p-5 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-green-500 text-white p-2 rounded-lg">
            <Code size={20} />
          </div>
          <h4 className="font-bold text-green-800">第2周</h4>
        </div>
        <p className="text-sm text-green-700">掌握核心运算：整除取模、逻辑运算、循环结构</p>
      </div>
      <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-500 text-white p-2 rounded-lg">
            <Trophy size={20} />
          </div>
          <h4 className="font-bold text-purple-800">第3周</h4>
        </div>
        <p className="text-sm text-purple-700">真题模拟：刷历年真题、总结易错点、考前冲刺</p>
      </div>
    </div>
  </div>
);

// --- 2. Topic Section (Interactive) ---
const TopicSection = ({ selectedTopic, setSelectedTopic }) => {
  const topics = [
    { title: "数学计算与公式应用", color: "blue", component: <MathTopic /> },
    { title: "取模与整除的妙用", color: "purple", component: <ModuloTopic /> },
    { title: "循环枚举与统计", color: "green", component: <LoopTopic /> },
    { title: "逻辑模拟与分支", color: "orange", component: <LogicTopic /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {topics.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTopic(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${selectedTopic === idx
              ? `bg-${t.color}-600 text-white shadow-md`
              : `bg-white text-slate-600 border border-slate-200 hover:bg-slate-50`
              }`}
          >
            专题 {idx + 1}: {t.title}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {topics[selectedTopic].component}
      </div>
    </div>
  );
};

// --- Topic 1: Math ---
const MathTopic = () => {
  const [roundInput, setRoundInput] = useState(23);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">数学公式转化为代码</h3>
        <p className="text-slate-600 mt-2">
          重点在于处理整数运算的特性（自动向下取整）。
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-2">5 / 2 = 2</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-blue-500" />
            典型考题：四舍五入 (25年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 mb-3">题目：将整数四舍五入到最接近的整十数。</p>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                value={roundInput}
                onChange={(e) => setRoundInput(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-2xl text-slate-400">→</span>
              <div className="text-xl font-bold text-blue-600">
                {Math.floor((roundInput + 5) / 10) * 10}
              </div>
            </div>
            <div className="bg-slate-800 text-slate-200 p-3 rounded-md font-mono text-sm">
              <span className="text-gray-500">// 核心公式技巧</span><br />
              int ans = (x + 5) / 10 * 10;
            </div>
            <p className="text-xs text-slate-500 mt-2">
              原理：加上5后，如果是大数会进位，小数则不会。整数除以10会自动丢弃个位。
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">真题案例库</h4>
          <div className="space-y-3">
            <CaseCard
              year="24年12月"
              title="温度转换"
              desc="输入开尔文，输出摄氏和华氏。注意使用 double 和保留小数。"
            />
            <CaseCard
              year="24年3月"
              title="小杨买书"
              desc="求能买几本(m/13)和剩多少钱(m%13)。标准的除法与取模。"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Topic 2: Modulo ---
const ModuloTopic = () => {
  const [year, setYear] = useState(2024);
  const isLeap = (y) => (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">取模 (%) 与整除的妙用</h3>
        <p className="text-slate-600 mt-2">
          GESP 一级核心考点，涉及倍数、闰年、星期计算。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-purple-500" />
            模拟：闰年判断器 (23年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-medium">输入年份:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-24 px-2 py-1 border rounded"
              />
            </div>

            <div className="space-y-2 font-mono text-sm mb-3">
              <div className={`p-2 rounded ${year % 400 === 0 ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                {year} % 400 == 0 ? {year % 400 === 0 ? 'YES' : 'NO'}
              </div>
              <div className="text-center text-xs text-slate-400">OR</div>
              <div className={`p-2 rounded ${(year % 4 === 0 && year % 100 !== 0) ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                ({year} % 4 == 0) && ({year} % 100 != 0) ? {(year % 4 === 0 && year % 100 !== 0) ? 'YES' : 'NO'}
              </div>
            </div>

            <div className={`text-center font-bold p-2 rounded ${isLeap(year) ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
              结论：{isLeap(year) ? "是闰年 (Leap Year)" : "是平年"}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 mb-3">常见公式</h4>
          <div className="bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm space-y-4">
            <div>
              <p className="text-gray-500 mb-1">// 判断 x 是否是 n 的倍数</p>
              if (x % n == 0)
            </div>
            <div>
              <p className="text-gray-500 mb-1">// 星期几计算 (n天后)</p>
              // 假设今天是星期 x
              ans = (x + n - 1) % 7 + 1;
            </div>
            <div>
              <p className="text-gray-500 mb-1">// 取个位数</p>
              last_digit = n % 10;
            </div>
          </div>
          <div className="mt-4">
            <CaseCard year="24年9月" title="美丽数字" desc="判断是否是9的倍数但不是8的倍数：(x % 9 == 0 && x % 8 != 0)" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Topic 3: Loop ---
const LoopTopic = () => {
  const [num, setNum] = useState(12);

  const getFactors = (n) => {
    let factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">循环枚举与统计</h3>
        <p className="text-slate-600 mt-2">
          遍历区间 1 到 N，找出符合条件的数（找因数、质数、累加）。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Play size={18} className="text-green-500" />
            可视化：找因数 (24年3月)
          </h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="mb-4">
              <label className="mr-2 text-sm">输入数字 N:</label>
              <input
                type="number"
                max="100"
                value={num}
                onChange={(e) => setNum(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-20 px-2 py-1 border rounded"
              />
              <span className="text-xs text-gray-400 ml-2">(演示限制最大100)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: num }, (_, i) => i + 1).map(i => {
                const isFactor = num % i === 0;
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-all duration-500 ${isFactor
                      ? 'bg-green-500 text-white font-bold scale-110'
                      : 'bg-gray-100 text-gray-300'
                      }`}
                  >
                    {i}
                  </div>
                )
              })}
            </div>
            <div className="text-sm">
              因数: <span className="font-mono font-bold text-green-600">{getFactors(num).join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CaseCard
            year="25年9月"
            title="金字塔"
            desc="计算垒金字塔需要的石块数，第i层需要 i*i 块。核心：sum += i*i"
          />
          <CaseCard
            year="23年9月"
            title="小明的幸运数"
            desc="统计区间和。⚠️注意：累加变量必须用 long long 防止溢出！"
          />
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="font-bold text-yellow-800 text-sm">解题模板</p>
            <pre className="text-xs text-yellow-900 mt-2 font-mono whitespace-pre-wrap">
              {`long long sum = 0; 
for (int i = 1; i <= n; i++) {
    if (/* 条件 */) {
        sum += i;
    }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Topic 4: Logic ---
const LogicTopic = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800">逻辑模拟与分支</h3>
        <p className="text-slate-600 mt-2">
          模拟生活场景，通常涉及复杂的 if-else 嵌套或状态更新。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CaseCard
            year="24年6月"
            title="休息时间 (时间进位)"
            desc="秒加满60进1分，分加满60进1时。这是一种经典的模拟法。"
          />
          <CaseCard
            year="25年3月"
            title="图书馆里的老鼠"
            desc="求剩余书本。注意边界：如果 t % c != 0，说明正在啃一本，这本也不算完整。"
          />
        </div>

        {/* Logic Playground */}
        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-slate-300">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <MousePointerClick className="text-purple-400" /> 逻辑实验室
          </h4>
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => setA(!a)}
              className={`w-16 h-10 rounded font-bold transition-all ${a ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-slate-700 text-slate-500'
                }`}
            >
              A={a ? '1' : '0'}
            </button>
            <button
              onClick={() => setB(!b)}
              className={`w-16 h-10 rounded font-bold transition-all ${b ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-slate-700 text-slate-500'
                }`}
            >
              B={b ? '1' : '0'}
            </button>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>A && B (与)</span>
              <span className={a && b ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {a && b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>A || B (或)</span>
              <span className={a || b ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {a || b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span>!A (非)</span>
              <span className={!a ? 'text-green-400 font-bold' : 'text-slate-500'}>
                {!a ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded mt-4 border-t border-slate-700 pt-3">
              <span className="text-xs text-slate-400">复杂逻辑: (A && !B)</span>
              <span className={a && !b ? 'text-purple-400 font-bold' : 'text-slate-500'}>
                {a && !b ? 'TRUE' : 'FALSE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Code Trace Section (Interactive Step-by-Step Execution) ---
const CodeTraceSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: "循环累加求和",
      code: `int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum = sum + i;
}
cout << sum;`,
      steps: [
        { line: 1, vars: { sum: 0 }, desc: "初始化 sum = 0" },
        { line: 2, vars: { sum: 0, i: 1 }, desc: "循环开始，i = 1，检查 1 <= 3 ✓" },
        { line: 3, vars: { sum: 1, i: 1 }, desc: "sum = 0 + 1 = 1" },
        { line: 2, vars: { sum: 1, i: 2 }, desc: "i++，i = 2，检查 2 <= 3 ✓" },
        { line: 3, vars: { sum: 3, i: 2 }, desc: "sum = 1 + 2 = 3" },
        { line: 2, vars: { sum: 3, i: 3 }, desc: "i++，i = 3，检查 3 <= 3 ✓" },
        { line: 3, vars: { sum: 6, i: 3 }, desc: "sum = 3 + 3 = 6" },
        { line: 2, vars: { sum: 6, i: 4 }, desc: "i++，i = 4，检查 4 <= 3 ✗，循环结束" },
        { line: 5, vars: { sum: 6 }, desc: "输出 sum = 6 🎉", output: "6" },
      ]
    },
    {
      title: "取模运算分离数位",
      code: `int n = 123;
int ge = n % 10;
int shi = n / 10 % 10;
int bai = n / 100;
cout << ge << shi << bai;`,
      steps: [
        { line: 1, vars: { n: 123 }, desc: "初始化 n = 123" },
        { line: 2, vars: { n: 123, ge: 3 }, desc: "ge = 123 % 10 = 3 (个位)" },
        { line: 3, vars: { n: 123, ge: 3, shi: 2 }, desc: "shi = 123 / 10 % 10 = 12 % 10 = 2 (十位)" },
        { line: 4, vars: { n: 123, ge: 3, shi: 2, bai: 1 }, desc: "bai = 123 / 100 = 1 (百位)" },
        { line: 5, vars: { n: 123, ge: 3, shi: 2, bai: 1 }, desc: "输出: 3 2 1 🎉", output: "3 2 1" },
      ]
    },
    {
      title: "条件判断 (闰年)",
      code: `int year = 2024;
if (year % 400 == 0) {
    cout << "闰年";
} else if (year % 4 == 0 && year % 100 != 0) {
    cout << "闰年";
} else {
    cout << "平年";
}`,
      steps: [
        { line: 1, vars: { year: 2024 }, desc: "初始化 year = 2024" },
        { line: 2, vars: { year: 2024 }, desc: "检查 2024 % 400 == 0? → 24 != 0 ✗" },
        { line: 4, vars: { year: 2024 }, desc: "检查 2024 % 4 == 0? → 0 == 0 ✓" },
        { line: 4, vars: { year: 2024 }, desc: "检查 2024 % 100 != 0? → 24 != 0 ✓" },
        { line: 4, vars: { year: 2024 }, desc: "两个条件都满足 (&&)，进入 else if 分支" },
        { line: 5, vars: { year: 2024 }, desc: "输出: 闰年 🎉", output: "闰年" },
      ]
    }
  ];

  const example = examples[selectedExample];
  const step = example.steps[currentStep];

  React.useEffect(() => {
    if (isPlaying && currentStep < example.steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(c => c + 1), 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= example.steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, example.steps.length]);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const changeExample = (idx) => {
    setSelectedExample(idx);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Eye /> 代码跟踪模拟器
        </h2>
        <p className="text-cyan-100">
          逐步执行代码，观察变量如何变化。这是 GESP 考试中"程序填空"和"程序阅读"的必备技能！
        </p>
      </div>

      {/* Example Selector */}
      <div className="flex gap-2 flex-wrap">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => changeExample(idx)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedExample === idx
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            示例 {idx + 1}: {ex.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Panel */}
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-slate-400 text-sm">{example.title}.cpp</span>
          </div>
          <div className="p-4 font-mono text-sm">
            {example.code.split('\n').map((line, idx) => (
              <div
                key={idx}
                className={`py-1 px-2 rounded transition-all duration-300 flex ${step.line === idx + 1
                  ? 'bg-yellow-500/30 border-l-4 border-yellow-400'
                  : ''
                  }`}
              >
                <span className="text-slate-500 w-6 text-right mr-4 select-none">{idx + 1}</span>
                <span className="text-green-400">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Variable Watch Panel */}
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">
                <Play size={18} className="text-blue-500" /> 执行控制
              </h4>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                步骤 {currentStep + 1} / {example.steps.length}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
              >
                ← 上一步
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isPlaying
                  ? 'bg-orange-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {isPlaying ? '⏸ 暂停' : '▶ 自动播放'}
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(example.steps.length - 1, currentStep + 1))}
                disabled={currentStep >= example.steps.length - 1}
                className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
              >
                下一步 →
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 bg-red-100 rounded-lg text-red-600 hover:bg-red-200 transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Variables */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <ArrowRightLeft size={18} className="text-purple-500" /> 变量监视
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(step.vars).map(([name, value]) => (
                <div
                  key={name}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg border border-purple-100 animate-in fade-in"
                >
                  <div className="text-xs text-purple-600 font-medium">{name}</div>
                  <div className="text-xl font-bold text-purple-800 font-mono">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Description */}
          <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${step.output
            ? 'bg-green-50 border-green-300'
            : 'bg-blue-50 border-blue-200'
            }`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${step.output ? 'bg-green-200' : 'bg-blue-200'}`}>
                {step.output ? <CheckCircle size={20} className="text-green-700" /> : <Info size={20} className="text-blue-700" />}
              </div>
              <div>
                <p className={`font-medium ${step.output ? 'text-green-800' : 'text-blue-800'}`}>
                  {step.desc}
                </p>
                {step.output && (
                  <div className="mt-2 bg-slate-900 text-green-400 px-3 py-2 rounded font-mono text-sm inline-block">
                    输出: {step.output}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-slate-500">执行进度</span>
        </div>
        <div className="flex gap-1">
          {example.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
              className={`flex-1 h-2 rounded-full transition-all ${idx < currentStep
                ? 'bg-green-400'
                : idx === currentStep
                  ? 'bg-blue-500'
                  : 'bg-slate-200'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 4. Pitfalls Section ---
const PitfallsSection = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
      <h2 className="text-2xl font-bold text-red-700 flex items-center gap-3">
        <AlertTriangle /> 考场高频失误榜
      </h2>
      <p className="text-red-600 mt-2">点击卡片拆除“炸弹”，查看正确解法！</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PitfallCard
        title="数据溢出 Boom!"
        code="int sum = 0;"
        fix="long long sum = 0;"
        desc="当题目涉及“累加求和”或“乘积”且N较大时，结果往往超过 21亿（int上限）。必须使用 long long。"
      />
      <PitfallCard
        title="整数除法丢失小数"
        code="double ans = 5 / 2;"
        fix="double ans = 5.0 / 2;"
        result="2.0 (错误) vs 2.5 (正确)"
        desc="整数除整数，结果永远是整数。5/2=2。必须有一个操作数是小数才能得到小数结果。"
      />
      <PitfallCard
        title="变量未初始化"
        code="int count; count++;"
        fix="int count = 0; count++;"
        desc="局部变量如果不初始化，初始值是随机垃圾值，导致结果莫名其妙的大。"
      />
    </div>

    <div className="bg-white p-6 rounded-xl border border-slate-200 mt-6">
      <h3 className="font-bold text-lg mb-4">其他注意事项</h3>
      <ul className="list-disc pl-5 space-y-2 text-slate-700">
        <li><strong>输出格式：</strong>看清是要求“换行输出”(`endl`) 还是 “空格分隔”(`" "`)。</li>
        <li><strong>边界条件：</strong>“1到N之间”通常包含N，循环条件应为 `i &lt;= n` 而不是 `i &lt; n`。</li>
        <li><strong>文件操作：</strong>GESP 一级通常不需要 `freopen`，直接标准输入输出 (`cin`/`cout`) 即可，但请以准考证要求为准。</li>
      </ul>
    </div>
  </div>
);

// --- 4. Templates Section ---
const TemplatesSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <Code /> 万能代码模板
        </h2>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">熟练背诵，解决80%题目</span>
      </div>

      <TemplateBlock
        title="模板1：区间统计 / 累加求和"
        desc="适用于：找因数、质数判断、统计满足条件的数"
        code={`#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    long long sum = 0; // 重点：防溢出
    int cnt = 0;       // 计数器
    
    for (int i = 1; i <= n; i++) {
        // 判断条件，例如：是3的倍数
        if (i % 3 == 0) {
            sum += i;
            cnt++;
        }
    }
    
    cout << sum << " " << cnt << endl;
    return 0;
}`}
      />

      <TemplateBlock
        title="模板2：数位分离 (While循环)"
        desc="适用于：水仙花数、回文数、统计某一位数字"
        code={`int temp = n;
while (temp > 0) {
    int last_digit = temp % 10; // 取出个位
    // 对 last_digit 进行处理
    // ...
    temp /= 10; // 删掉个位
}`}
      />

      <TemplateBlock
        title="模板3：闰年判断"
        desc="适用于：日期计算、闰年问题"
        code={`bool isLeap(int year) {
    return (year % 400 == 0) || 
           (year % 4 == 0 && year % 100 != 0);
}`}
      />

      <TemplateBlock
        title="模板4：最大公约数 (辗转相除法)"
        desc="适用于：公约数问题、分数化简"
        code={`int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}`}
      />
    </div>
  );
};

// --- 6. Exam Tips Section ---
const ExamTipsSection = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const tips = [
    {
      category: "考前准备",
      icon: <Clock className="text-blue-500" />,
      color: "blue",
      items: [
        {
          title: "考前一天",
          content: "复习常考公式（取模、整除、闰年判断），确保 Dev-C++ 环境正常。"
        },
        {
          title: "考试当天",
          content: "提前15分钟到场，检查电脑、键盘是否正常工作。"
        },
        {
          title: "必带物品",
          content: "准考证、身份证、黑色签字笔（用于填写信息）"
        }
      ]
    },
    {
      category: "答题策略",
      icon: <Target className="text-green-500" />,
      color: "green",
      items: [
        {
          title: "选择题技巧",
          content: "先做有把握的题，不会的先标记跳过。选择题每题2分，共15题=30分。"
        },
        {
          title: "判断题技巧",
          content: '共10题20分。注意"一定"、"必须"这类绝对词语，往往是错误选项。'
        },
        {
          title: "编程题策略",
          content: "先读懂题意，写出伪代码，再开始编码。检查边界条件！"
        }
      ]
    },
    {
      category: "时间管理",
      icon: <Award className="text-purple-500" />,
      color: "purple",
      items: [
        {
          title: "时间分配",
          content: "选择题+判断题：30分钟 | 编程题：50分钟 | 检查：10分钟"
        },
        {
          title: "编程题优先级",
          content: "第1题通常最简单，必须拿满分！第2题中等难度，争取80%以上。"
        },
        {
          title: "检查清单",
          content: "① 变量是否初始化 ② long long 是否需要 ③ 输出格式是否正确"
        }
      ]
    }
  ];

  const examScoreBreakdown = [
    { name: "选择题", score: 30, color: "bg-blue-500" },
    { name: "判断题", score: 20, color: "bg-green-500" },
    { name: "编程题", score: 50, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <Lightbulb /> 考试秘籍攻略
        </h2>
        <p className="text-amber-100">
          掌握这些技巧，让你在考场上事半功倍！
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileCode className="text-indigo-500" /> GESP 一级分数构成（总分100分）
        </h3>
        <div className="flex gap-2 mb-4">
          {examScoreBreakdown.map((item, idx) => (
            <div key={idx} className="flex-1">
              <div className={`h-8 ${item.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                {item.name}: {item.score}分
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            <strong>💡 及格线：</strong>总分60分即可通过。建议目标：选择题25分 + 判断题15分 + 编程题25分 = 65分
          </p>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((section, idx) => (
          <div key={idx} className={`bg-${section.color}-50 rounded-xl border border-${section.color}-200 p-6`}>
            <h3 className={`font-bold text-${section.color}-800 mb-4 flex items-center gap-2`}>
              {section.icon} {section.category}
            </h3>
            <div className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setExpandedTip(expandedTip === `${idx}-${itemIdx}` ? null : `${idx}-${itemIdx}`)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">{item.title}</span>
                    <ChevronRight
                      size={16}
                      className={`text-slate-400 transition-transform ${expandedTip === `${idx}-${itemIdx}` ? 'rotate-90' : ''}`}
                    />
                  </div>
                  {expandedTip === `${idx}-${itemIdx}` && (
                    <p className="text-sm text-slate-600 mt-2 animate-in fade-in">{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference Card */}
      <div className="bg-slate-900 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Zap className="text-yellow-400" /> 考场速查表
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">整数范围</div>
            <div className="text-green-400">int: ±21亿</div>
            <div className="text-green-400">long long: ±9×10¹⁸</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">取模运算</div>
            <div className="text-yellow-400">个位: n % 10</div>
            <div className="text-yellow-400">十位: n / 10 % 10</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">闰年条件</div>
            <div className="text-pink-400">y%400==0 ||</div>
            <div className="text-pink-400">(y%4==0 && y%100!=0)</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg">
            <div className="text-slate-400 text-xs mb-1">四舍五入</div>
            <div className="text-cyan-400">(n + 5) / 10 * 10</div>
          </div>
        </div>
      </div>

      {/* Common Mistakes Warning */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          <AlertTriangle /> 考场常见失误 TOP 5
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-red-700">
          <li><strong>忘记初始化变量</strong> - sum、count 等累加变量必须初始化为0</li>
          <li><strong>整数溢出</strong> - 大数累加/乘法必须用 long long</li>
          <li><strong>循环边界错误</strong> - "1到N" 是 i &lt;= n，不是 i &lt; n</li>
          <li><strong>输出格式错误</strong> - 多余空格、换行会导致判题失败</li>
          <li><strong>运算优先级混淆</strong> - 先乘除后加减，括号优先</li>
        </ol>
      </div>
    </div>
  );
};

// --- Helper Components ---

const CaseCard = ({ year, title, desc }) => (
  <div className="flex gap-3 items-start p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5">
      {year}
    </span>
    <div>
      <h5 className="font-bold text-slate-800 text-sm">{title}</h5>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

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
            className="w-full py-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
          >
            点击拆除错误
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

// --- Practice Section ---
const PracticeSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      id: 1,
      q: "C++ 表达式 (3 + 2) * 4 的值是？",
      options: ["11", "20", "14", "24"],
      correct: 1,
      explain: "先算括号里的 3+2=5，再算 5*4=20。"
    },
    {
      id: 2,
      q: "如果 int a = 10; 那么 a % 3 的结果是？",
      options: ["1", "3", "3.33", "0"],
      correct: 0,
      explain: "10 除以 3 商 3 余 1。取模运算符 % 得到的是余数。"
    },
    {
      id: 3,
      q: "以下哪个变量名是合法的？",
      options: ["2nd_place", "my-name", "_score", "int"],
      correct: 2,
      explain: "变量名不能以数字开头(2nd_place)，不能包含连字符(my-name)，不能是关键字(int)。下划线开头是允许的。"
    },
    {
      id: 4,
      q: "表达式 17 / 5 的结果是？（整数运算）",
      options: ["3.4", "3", "4", "2"],
      correct: 1,
      explain: "整数除法会向下取整，17 ÷ 5 = 3 余 2，结果是 3。"
    },
    {
      id: 5,
      q: "下列关于 cout 的说法，正确的是？",
      options: ["cout 后面必须用 >>", "cout 可以输出多个变量", "cout 只能输出字符串", "cout 是输入语句"],
      correct: 1,
      explain: "cout 使用 << 运算符，可以链式输出多个内容，如 cout << a << b;"
    },
    {
      id: 6,
      q: "for (int i = 0; i < 5; i++) 循环执行几次？",
      options: ["4次", "5次", "6次", "无限次"],
      correct: 1,
      explain: "i 从 0 开始，当 i < 5 时执行，即 i = 0,1,2,3,4，共 5 次。"
    },
    {
      id: 7,
      q: "2024 年是闰年吗？判断条件是？",
      options: ["是，能被4整除", "不是，能被100整除", "是，能被4整除且不能被100整除", "不是，不能被400整除"],
      correct: 2,
      explain: "2024 % 4 == 0 且 2024 % 100 != 0，满足闰年条件。"
    },
    {
      id: 8,
      q: "bool 类型变量的值只能是？",
      options: ["0 和 1", "true 和 false", "任意整数", "A 和 B 都对"],
      correct: 3,
      explain: "bool 类型存储 true/false，但在 C++ 中 0 表示 false，非0 表示 true。"
    },
    {
      id: 9,
      q: "第一台电子计算机 ENIAC 的主要元件是什么？",
      options: ["晶体管", "电子管", "集成电路", "芯片"],
      correct: 1,
      explain: "ENIAC（1946年）使用了约18000个电子管，是第一台通用电子计算机。"
    },
    {
      id: 10,
      q: "现代计算机基于什么体系结构？",
      options: ["图灵机", "冯·诺依曼体系", "哈佛体系", "量子体系"],
      correct: 1,
      explain: "冯·诺依曼提出了存储程序的概念，定义了运算器、控制器、存储器、输入、输出五大部件。"
    },
    {
      id: 11,
      q: "以下哪个不属于输入设备？",
      options: ["键盘", "鼠标", "打印机", "麦克风"],
      correct: 2,
      explain: "打印机是输出设备，用于将计算机处理结果打印出来。键盘、鼠标、麦克风都是输入设备。"
    },
    {
      id: 12,
      q: "表达式 12 - 3 * 2 && 2 的值是？",
      options: ["0", "1", "6", "12"],
      correct: 1,
      explain: "先算 3*2=6，再算 12-6=6，最后 6 && 2，两个非零值逻辑与结果为1(true)。"
    },
    {
      id: 13,
      q: "以下哪个是操作系统？",
      options: ["微信", "Word", "Windows", "Chrome"],
      correct: 2,
      explain: "Windows 是操作系统。微信、Word、Chrome 都是应用软件，需要运行在操作系统之上。"
    },
    {
      id: 14,
      q: "int a = 5, b = 2; cout << a / b; 输出什么？",
      options: ["2.5", "2", "3", "0"],
      correct: 1,
      explain: "整数除法自动舍去小数部分，5 / 2 = 2（不是2.5）。"
    },
    {
      id: 15,
      q: "哪种数据类型可以存储超过21亿的整数？",
      options: ["int", "short", "long long", "char"],
      correct: 2,
      explain: "int 最大约21亿，long long 最大约9×10^18，可以存储超大整数。"
    }
  ];

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === questions[activeQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setShowResult(false);
      setSelectedOption(null);
    } else {
      // Finished
      alert(`演练结束！得分: ${score + (selectedOption === questions[activeQuestion].correct ? 0 : 0)} / ${questions.length}`);
      setActiveQuestion(0);
      setScore(0);
      setShowResult(false);
      setSelectedOption(null);
    }
  };

  const q = questions[activeQuestion];

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> 真题实战演练
          </h3>
          <span className="text-sm font-mono text-slate-500 bg-white px-3 py-1 rounded border">
            Question {activeQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="p-8">
          <h4 className="text-xl font-bold text-slate-800 mb-8">{q.q}</h4>

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all flex justify-between items-center
                  ${showResult
                    ? idx === q.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : idx === selectedOption
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-slate-100 opacity-50'
                    : 'border-slate-100 hover:border-blue-400 hover:bg-blue-50 text-slate-600'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${showResult && idx === q.correct ? 'bg-green-200 text-green-800' : 'bg-slate-100 text-slate-500'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-semibold">{opt}</span>
                </div>
                {showResult && idx === q.correct && <CheckCircle className="text-green-600" />}
                {showResult && idx === selectedOption && idx !== q.correct && <XCircle className="text-red-500" />}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-8 animate-in slide-in-from-bottom-2">
              <div className={`p-4 rounded-xl mb-6 ${selectedOption === q.correct ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <p className="font-bold mb-1 flex items-center gap-2">
                  {selectedOption === q.correct ? <><CheckCircle size={18} /> 回答正确</> : <><XCircle size={18} /> 回答错误</>}
                </p>
                <p className="text-sm opacity-90">{q.explain}</p>
              </div>
              <button
                onClick={nextQuestion}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                {activeQuestion < questions.length - 1 ? '下一题' : '完成演练'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TemplateBlock = ({ title, desc, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-700">{title}</h3>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border border-slate-200"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="p-4 bg-slate-900 overflow-x-auto">
        <pre className="text-sm font-mono text-green-400">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default GESPCourseware;