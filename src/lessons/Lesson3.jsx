import React, { useState, useEffect } from 'react';
import {
  Pizza,
  Scissors,
  Box,
  Calculator,
  Brain,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Code,
  CheckCircle,
  XCircle,
  Play,
  Trophy
} from 'lucide-react';

// --- 课件内容数据 ---
const sections = [
  { id: 1, title: '课程封面', icon: 'box', component: () => <CoverSlide /> },
  { id: 2, title: '课前热身：披萨分不分？', icon: 'pizza', component: () => <WarmupSlide /> },
  { id: 3, title: '整数盒子 (int)', icon: 'box', component: () => <IntBoxSlide /> },
  { id: 4, title: '小数盒子 (double)', icon: 'calculator', component: () => <DoubleBoxSlide /> },
  { id: 5, title: '无情的去尾刀', icon: 'scissors', component: () => <DivisionSlide /> },
  { id: 6, title: '魔法实验：保留小数', icon: 'brain', component: () => <Brain /> },
  { id: 7, title: '真题实战：消失的数值', icon: 'trophy', component: () => <ExamWalkthroughSlide /> },
  { id: 8, title: '上机挑战：平均分计算器', icon: 'code', component: () => <CodeChallengeSlide /> },
  { id: 9, title: '总结与作业', icon: 'check-circle', component: () => <HomeworkSlide /> }
];

// --- 布局组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "box": <Box size={size} className={className} />,
    "pizza": <Pizza size={size} className={className} />,
    "calculator": <Calculator size={size} className={className} />,
    "scissors": <Scissors size={size} className={className} />,
    "brain": <Brain size={size} className={className} />,
    "trophy": <Trophy size={size} className={className} />,
    "code": <Code size={size} className={className} />,
    "check-circle": <CheckCircle size={size} className={className} />,
    "arrow-right": <ArrowRight size={size} className={className} />
  };
  return icons[name] || null;
};

export default function Lesson3() {
  const [activeSection, setActiveSection] = useState(1);

  // 获得当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div>Coming Soon</div>);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* 侧边栏 */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10">
        <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white">
          <h1 className="text-xl font-bold flex items-center gap-2 text-blue-700">
            <Trophy size={24} className="text-yellow-500" />
            <span>GESP C++ 一级</span>
          </h1>
          <p className="text-xs text-blue-400 mt-1 ml-8 font-medium">第 3 课：数字的魔法</p>
        </div>

        <div className="flex-1 overflow-y-auto w-full py-2 custom-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-5 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group
                ${activeSection === section.id
                  ? 'bg-blue-100 text-blue-800 font-bold shadow-sm ring-1 ring-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <div className={`
                p-1.5 rounded-lg transition-colors
                ${activeSection === section.id ? 'bg-white text-indigo-500 shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'}
              `}>
                <Icon name={section.icon} size={18} />
              </div>
              <span className="truncate text-sm">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-center text-slate-400 bg-slate-50">
          <p>GESP C++ 培优课程</p>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-6 z-10 absolute top-0 left-0 right-0 w-full bg-opacity-90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Icon name={sections.find(s => s.id === activeSection)?.icon} size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 truncate max-w-md">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection(Math.max(1, activeSection - 1))}
              disabled={activeSection === 1}
              className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              上一节
            </button>
            <button
              onClick={() => setActiveSection(Math.min(sections.length, activeSection + 1))}
              disabled={activeSection === sections.length}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 font-medium flex items-center gap-1"
            >
              下一节 <ArrowRight size={16} />
            </button>
          </div>
        </header>

        {/* 内容滚动区 */}
        <main className="flex-1 overflow-y-auto p-8 pt-24 pb-20 custom-scrollbar scroll-smooth">
          <div className="max-w-5xl mx-auto h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <ActiveComponent />
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// --- Slide Components ---

const CoverSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in py-12">
    <div className="relative">
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <h1 className="text-6xl font-extrabold text-indigo-900 relative z-10">数字的魔法</h1>
    </div>
    <h2 className="text-3xl text-indigo-600 font-bold">GESP C++ 一级考级培优</h2>
    <div className="flex gap-8 mt-10">
      <CardIcon icon={<Box size={40} />} label="整数盒子 int" color="bg-blue-100 text-blue-600" />
      <CardIcon icon={<Scissors size={40} />} label="去尾刀 /" color="bg-red-100 text-red-600" />
      <CardIcon icon={<Calculator size={40} />} label="小数盒子 double" color="bg-green-100 text-green-600" />
    </div>
    <p className="text-gray-500 mt-10 text-lg">90分钟深度版 | 互动式教学</p>
  </div>
);

const WarmupSlide = () => {
  const [showCpp, setShowCpp] = useState(false);

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-indigo-800">
        <Pizza className="text-orange-500" /> 课前热身：披萨分不分？
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-100 flex flex-col items-center">
          <h3 className="text-xl font-bold text-orange-700 mb-4">生活数学题</h3>
          <div className="text-lg mb-4">
            老师有 <span className="font-bold text-2xl">5</span> 块披萨 🍕 <br />
            分给 <span className="font-bold text-2xl">2</span> 个小朋友 👶
          </div>
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map(i => (
              <Pizza key={i} className="text-orange-500 w-8 h-8" />
            ))}
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm w-full text-center">
            <p className="text-gray-600">每个人分到：</p>
            <p className="text-4xl font-bold text-orange-600 mt-2">2.5 块</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 flex flex-col items-center relative overflow-hidden">
          <h3 className="text-xl font-bold text-blue-700 mb-4">C++ 的回答</h3>
          <div className="text-lg mb-4">
            计算机有时候是个<br />“老顽固”...
          </div>

          {!showCpp ? (
            <button
              onClick={() => setShowCpp(true)}
              className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform transition hover:scale-105 flex items-center gap-2"
            >
              <Code size={20} /> 问问 C++
            </button>
          ) : (
            <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-xl w-full text-center mt-4 animate-in fade-in zoom-in duration-500">
              <p className="text-sm text-gray-500 text-left border-b border-gray-700 mb-2 pb-1">Console Output</p>
              <p className="text-4xl font-bold">2</p>
              <p className="text-xs text-gray-400 mt-2">（半块披萨消失了？！）</p>
            </div>
          )}
        </div>
      </div>

      {showCpp && (
        <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-200 max-w-2xl text-center">
          <p className="font-bold text-lg">为什么？🤔</p>
          <p>因为 5 和 2 都是整数，C++ 认为结果也必须是整数！</p>
        </div>
      )}
    </div>
  );
};

const IntBoxSlide = () => {
  const [inputValue, setInputValue] = useState('');
  const intValue = inputValue === '' ? '?' : Math.floor(Number(inputValue) || 0);

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-800">
        <Box className="text-blue-600" /> 认识新朋友：整数盒子 (int)
      </h2>

      <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full mt-4">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-lg text-gray-700">给它一个数字：</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="例如: 2.9"
            className="border-4 border-gray-300 rounded-xl p-4 text-3xl w-48 text-center focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <ArrowRight className="w-12 h-12 text-gray-400 hidden md:block" />

        <div className="relative group">
          <div className="w-64 h-64 bg-blue-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white relative overflow-hidden transition-transform transform group-hover:scale-105">
            <span className="absolute top-4 left-4 text-blue-200 font-mono font-bold">int a;</span>
            <div className="text-6xl font-bold z-10">{intValue}</div>
            {inputValue.toString().includes('.') && (
              <div className="absolute bottom-4 right-4 text-blue-200 flex items-center gap-1 bg-blue-600 px-3 py-1 rounded-full text-sm">
                <Scissors size={14} /> 尾巴被剪掉了
              </div>
            )}
          </div>
          <div className="text-center mt-4 text-gray-600 font-medium">
            "我有洁癖，只喜欢完整的数字！"
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 max-w-2xl w-full">
        <CodeBlock code="int a = 5;" comment="// 开心，完美匹配" valid={true} />
        <CodeBlock code="int b = 2.9;" comment="// 不开心，变成 2" valid={false} />
      </div>
    </div>
  );
};

const DoubleBoxSlide = () => {
  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-800">
        <Calculator className="text-green-600" /> 认识新朋友：小数盒子 (double)
      </h2>

      <div className="flex gap-8 items-start justify-center w-full mt-4">
        <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-200 w-full max-w-3xl">
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="text-green-600" /></div>
              <div>
                <h4 className="font-bold text-lg">性格非常精确</h4>
                <p className="text-gray-600">连头发丝都数得清。</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="text-green-600" /></div>
              <div>
                <h4 className="font-bold text-lg">特征：长着一颗“痣” (小数点)</h4>
                <div className="flex flex-wrap gap-4 mt-2">
                  <NumberBadge num="3.14" />
                  <NumberBadge num="2.5" />
                  <NumberBadge num="5.0" desc="即使是整数，带了点就是 double" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl w-full max-w-3xl">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
          🏆 真题考点 (23-3-1-单-3)
        </h3>
        <p className="text-lg mb-4">问：常量 <code className="bg-white px-2 py-1 rounded border">7.0</code> 的类型是？</p>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-3 bg-white border rounded-lg hover:bg-gray-50 text-left">A. int</button>
          <button className="p-3 bg-green-600 text-white border border-green-700 rounded-lg shadow-md text-left font-bold relative">
            B. double
            <span className="absolute right-4 top-3 text-xs opacity-80">✅ 选我！因为它有"点"</span>
          </button>
          <button className="p-3 bg-white border rounded-lg hover:bg-gray-50 text-left">C. bool</button>
          <button className="p-3 bg-white border rounded-lg hover:bg-gray-50 text-left">D. char</button>
        </div>
      </div>
    </div>
  );
};

const DivisionSlide = () => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(2);
  const result = Math.floor(num1 / num2);
  const actual = (num1 / num2).toFixed(1);

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-red-700">
        <Scissors className="text-red-500" /> 无情的“去尾刀”：整数除法
      </h2>

      <div className="bg-gray-100 p-8 rounded-3xl w-full max-w-3xl flex flex-col items-center shadow-inner">
        <div className="flex items-center gap-4 text-4xl font-mono font-bold mb-8">
          <input
            type="number"
            value={num1}
            onChange={e => setNum1(Number(e.target.value))}
            className="w-24 p-2 text-center rounded-lg border-2 border-blue-300 focus:border-blue-500 outline-none"
          />
          <span className="text-red-500">/</span>
          <input
            type="number"
            value={num2}
            onChange={e => setNum2(Number(e.target.value))}
            className="w-24 p-2 text-center rounded-lg border-2 border-blue-300 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-lg line-through decoration-red-500 decoration-4">
              {actual}
            </div>
            <ArrowRight className="rotate-90 text-gray-300 my-2" />
            <div className="text-6xl font-extrabold text-blue-700 bg-white px-8 py-4 rounded-xl shadow-xl border-b-4 border-blue-800">
              {result === Infinity ? '💥' : result}
            </div>
          </div>

          <div className="absolute right-10 top-0 hidden md:flex flex-col items-center animate-bounce">
            <span className="text-red-500 font-bold mb-2">我是去尾刀！</span>
            <Scissors className="text-red-600 w-12 h-12 transform -scale-x-100" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700">
            C++ 规则：<span className="font-bold text-blue-600">整数</span> 除以 <span className="font-bold text-blue-600">整数</span> = <span className="font-bold text-blue-600">整数</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">它不是四舍五入，而是直接切断！</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <MiniCase num="3.1" res="3" />
        <MiniCase num="3.9" res="3 (不是4!)" highlight />
        <MiniCase num="0.9" res="0" />
      </div>
    </div>
  );
};

const MagicExperimentSlide = () => {
  const experiments = [
    { code: "5 / 2", result: "2", type: "bad", desc: "两个整数打架，两败俱伤" },
    { code: "5.0 / 2", result: "2.5", type: "good", desc: "有一个小数，结果保留" },
    { code: "5 / 2.0", result: "2.5", type: "good", desc: "除数是小数也可以" },
    { code: "1.0 * 5 / 2", result: "2.5", type: "good", desc: "先变身小数，再计算" },
  ];

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-purple-700">
        🧪 魔法实验：如何保留小数？
      </h2>

      <p className="mb-6 text-xl text-center bg-purple-100 px-6 py-3 rounded-full text-purple-800 font-medium">
        秘诀：除号两边，只要有一个是“小数人”，刀就会收起来。
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {experiments.map((exp, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border-l-8 shadow-sm transition-all hover:shadow-md ${exp.type === 'good' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-400'
            }`}>
            <div className="font-mono text-2xl font-bold text-slate-700">{exp.code}</div>
            <ArrowRight className="text-gray-300" />
            <div className={`text-2xl font-bold ${exp.type === 'good' ? 'text-green-600' : 'text-gray-500'}`}>
              {exp.result}
            </div>
            <div className="text-sm text-gray-500 italic w-1/3 text-right">{exp.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamWalkthroughSlide = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { text: "原始表达式", expr: "3 - 3 * 3 / 5", highlight: "" },
    { text: "第一步：先算乘法 (*)", expr: "3 - 9 / 5", highlight: "9", desc: "3 * 3 = 9" },
    { text: "第二步：再算除法 (/)", expr: "3 - 1", highlight: "1", desc: "警告：9 和 5 都是整数！9/5 变成 1" },
    { text: "第三步：最后算减法 (-)", expr: "2", highlight: "2", desc: "3 - 1 = 2" },
  ];

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-800">
        🏆 真题实战：消失的数值 (24年6月)
      </h2>

      <div className="bg-slate-800 text-white p-6 rounded-xl w-full max-w-3xl text-center mb-8">
        <p className="text-xl mb-4">题目：C++表达式 <code className="text-yellow-400">3 - 3 * 3 / 5</code> 的值是？</p>
        <div className="flex justify-center gap-6">
          <span className="opacity-50 text-sm">A. -1.2</span>
          <span className="opacity-50 text-sm">B. 1</span>
          <span className="opacity-50 text-sm">C. 0</span>
          <span className="font-bold text-green-400 border-b-2 border-green-400 text-sm">D. 2</span>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={step === 0}
          >
            上一步
          </button>
          <span className="font-bold text-gray-500">步骤 {step + 1} / 4</span>
          <button
            onClick={() => setStep(Math.min(3, step + 1))}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            disabled={step === 3}
          >
            下一步
          </button>
        </div>

        <div className="bg-white border-2 border-indigo-100 p-10 rounded-2xl shadow-lg flex flex-col items-center min-h-[250px] justify-center transition-all text-center">
          <h3 className="text-lg font-bold text-gray-400 mb-6">{steps[step].text}</h3>
          <div className="text-5xl font-mono font-bold text-indigo-900 mb-6">
            {steps[step].expr}
          </div>
          {steps[step].desc && (
            <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full animate-pulse font-medium text-sm">
              💡 {steps[step].desc}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CodeChallengeSlide = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="h-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-800">
        💻 上机挑战：平均分计算器
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 mb-2">任务要求：</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>输入：语文(90)，数学(95)</li>
              <li>计算：平均分</li>
              <li>要求：<span className="font-bold text-red-500">必须保留小数</span> (92.5)</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold text-lg text-gray-700 mb-2">当前输出结果：</h3>
            <div className="font-mono text-4xl font-bold">
              {fixed ? <span className="text-green-600">92.5</span> : <span className="text-red-600">92</span>}
            </div>
            {!fixed && <p className="text-red-500 text-sm mt-2">❌ 哎呀！0.5 分弄丢了！</p>}
            {fixed && <p className="text-green-600 text-sm mt-2">✅ 完美！</p>}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[300px]">
          <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400 ml-2">average.cpp</span>
          </div>
          <div className="p-6 font-mono text-sm text-gray-300 flex-1">
            <div><span className="text-purple-400">int</span> chinese = <span className="text-orange-400">90</span>;</div>
            <div><span className="text-purple-400">int</span> math = <span className="text-orange-400">95</span>;</div>
            <div className="my-4 border-l-2 border-slate-700 pl-4">
              <span className="text-gray-500 text-xs">// 请修复下面这行代码:</span><br />
              <span className="text-blue-400">cout</span> &lt;&lt; (chinese + math) /
              {fixed ? (
                <span className="text-green-400 font-bold px-1 border border-green-500 rounded mx-1">2.0</span>
              ) : (
                <span className="text-red-400 font-bold px-1 border border-red-500 rounded mx-1">2</span>
              )}
              ;
            </div>
          </div>
          <div className="p-4 bg-slate-800 border-t border-slate-700 text-center">
            {!fixed ? (
              <button
                onClick={() => setFixed(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto animate-pulse text-sm"
              >
                <Brain size={18} /> 修复 Bug (加个 .0)
              </button>
            ) : (
              <button
                onClick={() => setFixed(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto text-sm"
              >
                ↺ 重置代码
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeworkSlide = () => (
  <div className="h-full flex flex-col items-center justify-center py-8">
    <h2 className="text-3xl font-bold mb-10 flex items-center gap-3 text-indigo-800">
      📝 总结与作业
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div className="bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200">
        <h3 className="text-2xl font-bold text-yellow-800 mb-6">🔑 记忆口诀</h3>
        <ul className="space-y-4 text-lg">
          <li className="flex gap-3"><span className="text-2xl">🤖</span> int 只有整数脸，double 带点很明显。</li>
          <li className="flex gap-3"><span className="text-2xl">🔪</span> 整数除整数，尾巴全切除。</li>
          <li className="flex gap-3"><span className="text-2xl">🚑</span> 想要有小数，点零 (.0) 来帮助。</li>
        </ul>
      </div>

      <div className="bg-indigo-50 p-8 rounded-2xl border-2 border-indigo-200">
        <h3 className="text-2xl font-bold text-indigo-800 mb-6">🏠 课后挑战</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">找茬</span>
            <p className="font-mono text-sm leading-relaxed">double res = 5 / 2 + 1;</p>
            <p className="text-gray-600 text-xs mt-1">为什么结果不是 3.5？</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">编程</span>
            <p className="text-gray-600 text-xs leading-relaxed">输入一个三位数 (如 352)，计算并输出各位数字之和。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Helper Components ---

const CardIcon = ({ icon, label, color }) => (
  <div className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${color} shadow-md w-32`}>
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </div>
);

const CodeBlock = ({ code, comment, valid }) => (
  <div className="bg-slate-800 text-white p-4 rounded-lg font-mono flex items-center justify-between text-sm">
    <div className="truncate pr-4">
      <span className="text-purple-300">{code.split(' ')[0]}</span> {code.split(' ').slice(1).join(' ')}
      <span className="text-gray-500 ml-2 block text-xs mt-1">{comment}</span>
    </div>
    {valid ? <CheckCircle className="text-green-500 flex-shrink-0" /> : <XCircle className="text-red-500 flex-shrink-0" />}
  </div>
);

const NumberBadge = ({ num, desc }) => (
  <div className="group relative">
    <span className="bg-white px-3 py-1 rounded border border-green-300 font-mono font-bold text-green-700 shadow-sm cursor-help text-sm">
      {num}
    </span>
    {desc && (
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        {desc}
      </div>
    )}
  </div>
);

const MiniCase = ({ num, res, highlight }) => (
  <div className={`flex flex-col items-center p-3 rounded-lg border ${highlight ? 'bg-red-50 border-red-300 scale-105 shadow-md z-10' : 'bg-white border-gray-200'}`}>
    <span className="text-gray-500 text-[10px] uppercase">输入</span>
    <span className="font-bold text-base">{num}</span>
    <ArrowRight className="text-gray-300 rotate-90 my-1" size={14} />
    <span className={`font-bold text-base ${highlight ? 'text-red-600' : 'text-blue-600'}`}>{res}</span>
  </div>
);