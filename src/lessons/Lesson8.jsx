import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChefHat,
  Utensils,
  Layers,
  AlertTriangle,
  Terminal,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Smile,
  Code,
  HelpCircle,
  Thermometer,
  ArrowDown,
  Menu,
  X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "chef": <ChefHat size={size} color={color} />,
    "utensils": <Utensils size={size} color={color} />,
    "layers": <Layers size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "terminal": <Terminal size={size} color={color} />,
    "book": <BookOpen size={size} color={color} />,
    "check": <CheckCircle2 size={size} color={color} />,
    "x": <XCircle size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "smile": <Smile size={size} color={color} />,
    "code": <Code size={size} color={color} />,
    "help": <HelpCircle size={size} color={color} />
  };
  return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：挑剔的美食家", icon: "chef", category: "多重选择" },
  { id: 2, title: "情景导入：AI 智能餐厅", icon: "utensils", category: "多重选择" },
  { id: 3, title: "代码变身：多重选择结构", icon: "code", category: "核心逻辑" },
  { id: 4, title: "核心逻辑：楼梯法则", icon: "layers", category: "核心逻辑" },
  { id: 5, title: "互动游戏：人体编译器", icon: "smile", category: "核心逻辑" },
  { id: 6, title: "真题实战：到底谁是偶数", icon: "terminal", category: "实战演练" },
  { id: 7, title: "真题实战：被忽略的 7", icon: "alert", category: "实战演练" },
  { id: 8, title: "语法秘籍：小贴士", icon: "book", category: "实战演练" },
  { id: 9, title: "总结与作业", icon: "check", category: "实战演练" }
];

// --- 互动演示组件：AI 餐厅 ---
const RestaurantSimulator = () => {
  const [hasWatermelon, setHasWatermelon] = useState(true);
  const [hasStrawberry, setHasStrawberry] = useState(true);
  const [hasApple, setHasApple] = useState(true);

  // 逻辑判断
  let result = "💨 喝西北风";
  let activeStep = 4;
  let bgColor = "bg-gray-100";
  let borderColor = "border-gray-200";

  if (hasWatermelon) {
    result = "🍉 吃西瓜";
    activeStep = 1;
    bgColor = "bg-green-50";
    borderColor = "border-green-300";
  } else if (hasStrawberry) {
    result = "🍓 吃草莓";
    activeStep = 2;
    bgColor = "bg-red-50";
    borderColor = "border-red-300";
  } else if (hasApple) {
    result = "🍎 吃苹果";
    activeStep = 3;
    bgColor = "bg-yellow-50";
    borderColor = "border-yellow-300";
  }

  return (
    <div className={`p-6 rounded-xl shadow-md border-2 my-4 transition-colors duration-300 ${bgColor} ${borderColor}`}>
      <h3 className="font-bold text-lg text-gray-700 mb-4 flex items-center gap-2">
        <Utensils className="text-orange-500" size={24} /> AI 餐厅后厨库存
      </h3>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button onClick={() => setHasWatermelon(!hasWatermelon)} className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${hasWatermelon ? 'bg-green-500 text-white border-green-600 shadow-sm' : 'bg-white text-gray-400 border-gray-200 border-dashed'}`}>
          {hasWatermelon ? "✅ 有西瓜" : "❌ 没西瓜"}
        </button>
        <button onClick={() => setHasStrawberry(!hasStrawberry)} className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${hasStrawberry ? 'bg-red-500 text-white border-red-600 shadow-sm' : 'bg-white text-gray-400 border-gray-200 border-dashed'}`}>
          {hasStrawberry ? "✅ 有草莓" : "❌ 没草莓"}
        </button>
        <button onClick={() => setHasApple(!hasApple)} className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${hasApple ? 'bg-yellow-500 text-white border-yellow-600 shadow-sm' : 'bg-white text-gray-400 border-gray-200 border-dashed'}`}>
          {hasApple ? "✅ 有苹果" : "❌ 没苹果"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg font-mono text-sm shadow-inner border border-gray-100 relative overflow-hidden">
        <div className={`p-2 rounded mb-1 transition-colors ${activeStep === 1 ? 'bg-yellow-100 border-l-4 border-yellow-500 font-bold' : (activeStep < 1 ? 'opacity-40' : '')}`}>
          <span className="text-purple-600">if</span> (有西瓜) ➜ 吃西瓜;
        </div>
        <div className={`p-2 rounded mb-1 transition-colors ${activeStep === 2 ? 'bg-yellow-100 border-l-4 border-yellow-500 font-bold' : (activeStep < 2 ? 'opacity-30 line-through' : '')}`}>
          <span className="text-purple-600">else if</span> (有草莓) ➜ 吃草莓;
        </div>
        <div className={`p-2 rounded mb-1 transition-colors ${activeStep === 3 ? 'bg-yellow-100 border-l-4 border-yellow-500 font-bold' : (activeStep < 3 ? 'opacity-30 line-through' : '')}`}>
          <span className="text-purple-600">else if</span> (有苹果) ➜ 吃苹果;
        </div>
        <div className={`p-2 rounded mb-1 transition-colors ${activeStep === 4 ? 'bg-yellow-100 border-l-4 border-yellow-500 font-bold' : (activeStep < 4 ? 'opacity-30 line-through' : '')}`}>
          <span className="text-purple-600">else</span> ➜ 喝西北风;
        </div>

        {activeStep < 4 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 border-4 border-red-500 p-2 rounded-full font-black text-xl opacity-20 -rotate-12 pointer-events-none">
            停止检查
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm mb-1">您的决定：</p>
        <div className="text-3xl font-bold animate-bounce drop-shadow-sm">{result}</div>
      </div>
    </div>
  );
};

// --- 互动演示组件：人体编译器 ---
const HumanCompiler = () => {
  const [nValue, setNValue] = useState(20);

  let action = "🦶 跺跺脚 (else)";
  let activeCondition = 3;

  if (nValue > 10) {
    action = "💆‍♂️ 摸摸头 (if)";
    activeCondition = 1;
  } else if (nValue > 5) {
    action = "👏 拍拍手 (else if)";
    activeCondition = 2;
  }

  return (
    <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-100 my-4">
      <h3 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
        <Smile className="text-indigo-600" size={24} /> 互动游戏：人体编译器
      </h3>

      <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
        <span className="font-bold text-gray-700">变量 N 的值:</span>
        <input
          type="range" min="0" max="25"
          value={nValue}
          onChange={(e) => setNValue(parseInt(e.target.value))}
          className="flex-1 accent-indigo-600 cursor-pointer"
        />
        <span className="font-mono text-2xl font-bold text-indigo-600 w-12 text-center bg-indigo-50 rounded">{nValue}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm space-y-3 shadow-lg">
          <div className={`p-2 rounded ${activeCondition === 1 ? 'bg-green-900/50 text-green-400 font-bold border-l-4 border-green-500' : ''}`}>
            <span className="text-purple-400">if</span> (N &gt; 10) 摸摸头;
          </div>
          <div className={`p-2 rounded ${activeCondition === 2 ? 'bg-green-900/50 text-green-400 font-bold border-l-4 border-green-500' : (activeCondition < 2 ? 'opacity-40 line-through' : '')}`}>
            <span className="text-purple-400">else if</span> (N &gt; 5) 拍拍手;
          </div>
          <div className={`p-2 rounded ${activeCondition === 3 ? 'bg-green-900/50 text-green-400 font-bold border-l-4 border-green-500' : 'opacity-40 line-through'}`}>
            <span className="text-purple-400">else</span> 跺跺脚;
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg border-2 border-indigo-100 shadow-sm">
          <div className="text-6xl mb-4 transition-transform duration-300 hover:scale-110 cursor-default">
            {activeCondition === 1 && "💆‍♂️"}
            {activeCondition === 2 && "👏"}
            {activeCondition === 3 && "🦶"}
          </div>
          <p className="font-bold text-xl text-indigo-800 bg-indigo-50 px-4 py-2 rounded-full">{action}</p>

          {nValue > 5 && nValue <= 10 && (
            <p className="text-xs text-orange-600 mt-2 bg-orange-100 px-2 py-1 rounded">虽然 N&gt;5，但没进第一层</p>
          )}
          {nValue > 10 && (
            <p className="text-xs text-red-600 mt-2 font-bold bg-red-100 px-2 py-1 rounded border border-red-200">
              陷阱：20 &gt; 5 成立，但被第一层拦截了！
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 互动演示组件：被忽略的7 ---
const TrapVisualizer = () => {
  const [nInput, setNInput] = useState(21);

  let output = "";
  let step1 = false;
  let step2 = false;

  if (nInput % 3 === 0) {
    output = "能被3整除";
    step1 = true;
  } else if (nInput % 7 === 0) {
    output = "能被7整除";
    step2 = true;
  } else {
    output = "(无输出)";
  }

  return (
    <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-4">
      <h3 className="font-bold text-lg text-orange-700 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-600" size={24} /> 陷阱演示：被忽略的 7
      </h3>

      <div className="mb-6 flex items-center gap-4">
        <label className="font-bold text-gray-700">输入 N:</label>
        <input
          type="number"
          value={nInput}
          onChange={(e) => setNInput(parseInt(e.target.value) || 0)}
          className="border-2 border-orange-300 rounded px-3 py-2 w-24 text-center font-mono font-bold text-xl focus:outline-none focus:border-orange-500"
        />
        <div className="flex gap-2">
          {[21, 14, 7, 3].map(val => (
            <button key={val} onClick={() => setNInput(val)} className="text-xs bg-white px-2 py-1 rounded border hover:bg-orange-100 transition">
              试 {val}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm font-mono text-sm relative border border-orange-100">
        <div className={`p-3 rounded mb-2 transition-all flex justify-between items-center ${step1 ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-50'}`}>
          <span className="text-gray-800"><span className="text-purple-600 font-bold">if</span> (N % 3 == 0)</span>
          <span className={step1 ? "text-green-700 font-bold" : "text-red-400"}>
            {nInput % 3 === 0 ? "True (成立)" : "False"}
          </span>
        </div>
        {step1 && <div className="ml-8 text-gray-500 mb-2 italic">↳ 执行 cout &lt;&lt; "能被3整除";</div>}

        <div className={`p-3 rounded mb-2 transition-all flex justify-between items-center ${step1 ? 'opacity-30 grayscale' : (step2 ? 'bg-green-100 border-l-4 border-green-500' : 'bg-gray-50')}`}>
          <span className="text-gray-800"><span className="text-purple-600 font-bold">else if</span> (N % 7 == 0)</span>
          <span className={step1 ? "text-gray-400 font-bold" : (nInput % 7 === 0 ? "text-green-700 font-bold" : "text-red-400")}>
            {step1 ? "🚫 被跳过 (SKIP)" : (nInput % 7 === 0 ? "True" : "False")}
          </span>
        </div>

        {nInput === 21 && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 text-sm font-bold flex items-center gap-2">
            <AlertTriangle size={16} /> 警报：21 也能被 7 整除，但代码永远走不到第二行！
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-gray-800 text-green-400 font-mono rounded-lg shadow-inner">
        <span className="text-gray-500 select-none">$ </span>
        输出：{output}
      </div>
    </div>
  );
};

// --- 互动演示组件：小小气象员 ---
const WeatherReporter = () => {
  const [temp, setTemp] = useState(25);
  const [brokenMode, setBrokenMode] = useState(false);

  let output = [];

  if (brokenMode) {
    // 错误模式：全是 if
    if (temp > 35) output.push("Hot");
    if (temp < 10) output.push("Cold");
    else output.push("Good"); // 这个 else 只属于 if(temp < 10)
  } else {
    // 正常模式
    if (temp > 35) {
      output.push("Hot");
    } else if (temp < 10) {
      output.push("Cold");
    } else {
      output.push("Good");
    }
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4 shadow-sm">
      <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
        <Thermometer className="text-blue-600" size={24} /> 课后作业：小小气象员
      </h3>

      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">温度:</span>
          <input
            type="range" min="-5" max="45"
            value={temp}
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="accent-blue-600 w-32 cursor-pointer"
          />
          <span className="font-mono text-xl font-bold bg-white px-3 py-1 rounded border border-blue-200 text-blue-600">{temp}°C</span>
        </div>

        <label className={`flex items-center gap-2 cursor-pointer select-none px-3 py-1 rounded border transition-colors ${brokenMode ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            checked={brokenMode}
            onChange={(e) => setBrokenMode(e.target.checked)}
            className="accent-red-500 w-4 h-4"
          />
          <span className={brokenMode ? "text-red-600 font-bold text-sm" : "text-gray-600 text-sm"}>
            🔧 破坏模式 (把 else if 改成 if)
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm shadow-inner">
          <div className={temp > 35 ? "text-green-400 font-bold" : ""}>
            <span className="text-purple-400">if</span> (t &gt; 35) "Hot";
          </div>
          <div className={`mt-2 ${brokenMode ? "border-t border-dashed border-red-500/50 pt-2" : ""} ${!brokenMode && temp > 35 ? "opacity-30 line-through" : (temp < 10 ? "text-green-400 font-bold" : "")}`}>
            <span className={brokenMode ? "text-red-400 font-bold bg-red-900/50 px-1 rounded" : "text-purple-400"}>
              {brokenMode ? "if" : "else if"}
            </span> (t &lt; 10) "Cold";
          </div>
          <div className={`mt-2 ${!brokenMode && (temp > 35 || temp < 10) ? "opacity-30 line-through" : (brokenMode ? (temp >= 10 ? "text-green-400 font-bold" : "opacity-30") : "text-green-400 font-bold")}`}>
            <span className="text-purple-400">else</span> "Good";
          </div>
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg font-mono flex flex-col justify-center shadow-lg relative overflow-hidden">
          <div className="text-xs text-gray-500 mb-2 border-b border-gray-800 pb-1">Console Output</div>
          {output.map((line, i) => (
            <div key={i} className="text-xl font-bold ml-2 flex items-center gap-2">
              <span className="text-gray-600">&gt;</span> {line}
            </div>
          ))}
          {brokenMode && output.length > 1 && (
            <div className="text-red-400 text-xs mt-4 border-t border-red-900/50 pt-2 animate-pulse font-bold">
              ❌ BUG: 40度 既 Hot 又 Good？<br />
              因为第二个 if 独立了，Good 变成了只要 &gt;=10 就输出！
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 题目组件 ---
const Quiz = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 my-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">真题实战</span>
      </div>
      <p className="font-bold text-lg mb-4 font-mono text-gray-800 whitespace-pre-wrap">{question}</p>
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`p-4 text-left rounded-lg border-2 transition-all flex justify-between items-center group
              ${selected === null ? 'border-gray-100 hover:border-purple-300 hover:bg-purple-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-50' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : ''}
            `}
          >
            <div className="flex items-center">
              <span className={`font-bold mr-3 w-6 h-6 rounded-full flex items-center justify-center text-sm ${selected === idx ? 'bg-white shadow-sm' : 'bg-gray-200 group-hover:bg-purple-200'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-gray-700 font-medium">{opt}</span>
            </div>
            {selected === idx && idx === correctIndex && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={18} /> 正确</span>}
            {selected === idx && idx !== correctIndex && <span className="text-red-600 font-bold flex items-center gap-1"><XCircle size={18} /> 错误</span>}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 slide-enter">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <HelpCircle size={16} className="text-purple-500" /> 侦探解析：
          </h4>
          <div className="whitespace-pre-line text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-300">{explanation}</div>
        </div>
      )}
    </div>
  );
};

// --- 主应用 ---
export default function App() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nextSection = () => {
    if (activeSection < sections.length) {
      setActiveSection(activeSection + 1);
    } else {
      navigate('/lesson9');
    }
  };

  const prevSection = () => {
    if (activeSection > 1) setActiveSection(activeSection - 1);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="slide-enter">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center text-center">
              <ChefHat size={64} className="mb-4 text-yellow-300 drop-shadow-lg" />
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">GESP C++ 一级 第8课</h2>
              <h1 className="text-5xl font-bold mb-6 text-yellow-50 drop-shadow-md">多重选择结构</h1>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
                <span className="font-bold tracking-wide">🍽️ 副标题：我是“挑剔的美食家”</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <ArrowRight className="text-orange-500" /> 教学目标
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mt-1">
                    <Layers size={20} />
                  </div>
                  <div>
                    <strong className="block text-gray-800 text-lg">学会处理复杂情况</strong>
                    <span className="text-gray-500">不再只有非黑即白，我们可以处理 3 种及以上的情况 (if...else if...else)。</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
                    <ArrowDown size={20} />
                  </div>
                  <div>
                    <strong className="block text-gray-800 text-lg">掌握“楼梯法则”</strong>
                    <span className="text-gray-500">一旦选了一个，剩下的都不看！这是电脑的高效秘诀。</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Utensils className="text-orange-500" size={32} /> 情景导入：AI 智能餐厅
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              肚子饿了，去 AI 餐厅点水果。但我是一个<strong className="text-orange-600">“挑剔”</strong>的美食家，我的规则如下：
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">1</span> 如果有 <strong className="text-green-600">西瓜</strong> &rarr; 吃西瓜（最解渴）。</li>
                <li className="flex items-center gap-2"><span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">2</span> 如果没西瓜，但有 <strong className="text-red-600">草莓</strong> &rarr; 吃草莓。</li>
                <li className="flex items-center gap-2"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">3</span> 如果都没，但有 <strong className="text-yellow-600">苹果</strong> &rarr; 吃苹果。</li>
                <li className="flex items-center gap-2"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold">4</span> 如果以上都没有 &rarr; <strong className="text-gray-500">喝西北风</strong>。</li>
              </ul>
            </div>
            <RestaurantSimulator />
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-blue-800">
              <p className="font-bold flex items-center gap-2"><HelpCircle size={18} /> 提问：</p>
              <p>如果餐厅同时有“西瓜”和“草莓”，我会吃什么？</p>
              <p className="mt-2 text-sm bg-white/50 p-2 rounded inline-block">答案：<strong className="text-green-600">西瓜！</strong> 因为它是第一选择，满足了就不往下看了。</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🧙‍♂️ 代码变身术</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">自然语言</h3>
                  <ul className="space-y-3 text-sm font-medium">
                    <li className="bg-green-50 text-green-800 p-3 rounded flex items-center gap-3">
                      <span className="bg-white px-2 rounded shadow-sm border text-xs">If</span>
                      如果 (是西瓜) ➜ 吃西瓜
                    </li>
                    <li className="bg-red-50 text-red-800 p-3 rounded flex items-center gap-3">
                      <span className="bg-white px-2 rounded shadow-sm border text-xs">Else If</span>
                      否则 如果 (是草莓) ➜ 吃草莓
                    </li>
                    <li className="bg-yellow-50 text-yellow-800 p-3 rounded flex items-center gap-3">
                      <span className="bg-white px-2 rounded shadow-sm border text-xs">Else If</span>
                      否则 如果 (是苹果) ➜ 吃苹果
                    </li>
                    <li className="bg-gray-100 text-gray-800 p-3 rounded flex items-center gap-3">
                      <span className="bg-white px-2 rounded shadow-sm border text-xs">Else</span>
                      否则 (都没有) ➜ 喝西北风
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 text-gray-300 p-6 rounded-xl shadow-xl font-mono text-sm leading-relaxed">
                  <div className="flex items-center gap-2 text-gray-500 mb-4 border-b border-gray-700 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs">main.cpp</span>
                  </div>
                  <div>
                    <span className="text-purple-400">if</span> (food == 1) &#123;<br />
                    &nbsp;&nbsp;cout &lt;&lt; <span className="text-green-400">"吃西瓜"</span>;<br />
                    &#125;<br />
                    <span className="text-purple-400">else if</span> (food == 2) &#123;<br />
                    &nbsp;&nbsp;cout &lt;&lt; <span className="text-green-400">"吃草莓"</span>;<br />
                    &#125;<br />
                    <span className="text-purple-400">else if</span> (food == 3) &#123;<br />
                    &nbsp;&nbsp;cout &lt;&lt; <span className="text-green-400">"吃苹果"</span>;<br />
                    &#125;<br />
                    <span className="text-purple-400">else</span> &#123;<br />
                    &nbsp;&nbsp;cout &lt;&lt; <span className="text-green-400">"喝西北风"</span>;<br />
                    &#125;
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🪜 核心逻辑：“楼梯”法则</h2>
            <div className="flex flex-col gap-3 max-w-xl mx-auto items-start">
              <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg relative z-40 w-full hover:bg-blue-500 transition-colors cursor-default group">
                <div className="font-bold flex justify-between items-center">
                  1. if (西瓜?)
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded hidden group-hover:inline-block">满足则跳楼！</span>
                </div>
              </div>
              <div className="pl-8 text-gray-400 flex items-center gap-2"><ArrowDown size={16} /> 不满足，往下走</div>

              <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg relative z-30 w-full translate-x-8 hover:bg-blue-400 transition-colors cursor-default group">
                <div className="font-bold flex justify-between items-center">
                  2. else if (草莓?)
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded hidden group-hover:inline-block">满足则跳楼！</span>
                </div>
              </div>
              <div className="pl-16 text-gray-400 translate-x-8 flex items-center gap-2"><ArrowDown size={16} /> 不满足，往下走</div>

              <div className="bg-blue-400 text-white p-4 rounded-xl shadow-lg relative z-20 w-full translate-x-16 hover:bg-blue-300 transition-colors cursor-default group">
                <div className="font-bold flex justify-between items-center">
                  3. else if (苹果?)
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded hidden group-hover:inline-block">满足则跳楼！</span>
                </div>
              </div>
              <div className="pl-24 text-gray-400 translate-x-16 flex items-center gap-2"><ArrowDown size={16} /> 不满足，往下走</div>

              <div className="bg-gray-500 text-white p-4 rounded-xl shadow-lg relative z-10 w-full translate-x-24">
                4. else (兜底)
              </div>
            </div>
            <div className="mt-8 text-center bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <strong className="text-xl text-yellow-800">⚡ 特点：互斥</strong>
              <p className="text-yellow-700 mt-1">电脑一次只能走一条路，走了一条就不会看其他的！</p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎮 互动游戏：人体编译器</h2>
            <HumanCompiler />
            <div className="bg-white p-5 rounded-lg border-l-4 border-indigo-500 shadow-sm mt-6">
              <h4 className="font-bold text-indigo-700 text-lg mb-2">💡 关键知识点</h4>
              <p className="text-gray-600 leading-relaxed">
                当 N = 20 时，虽然它也大于 5，但因为已经满足了第一个条件 <code>N &gt; 10</code>，
                所以执行完“摸摸头”就直接结束了。这就是 <code>else if</code> 的排他性。
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">⚔️ 实战演练 1：到底谁是偶数？</h2>
            <Quiz
              question={`int m = 14, n = 12;\nif (m % 2 == 0 && n % 2 == 0)\n    cout << "都是偶数";\nelse if (m % 2 == 1 && n % 2 == 1)\n    cout << "都是奇数";\nelse\n    cout << "一奇一偶";\n\n程序会输出什么？`}
              options={["都是偶数", "都是奇数", "一奇一偶", "无输出"]}
              correctIndex={0}
              explanation={`m=14, n=12 都是偶数。
                1. 检查第一个 if：m%2==0 (真) 且 n%2==0 (真) -> 条件成立！
                2. 执行 cout << "都是偶数"。
                3. 触发“跳楼”机制：后面的 else if 和 else 直接跳过，不予理会。
                
                所以答案是 A。`}
            />
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🪤 实战演练 2：被忽略的“7”</h2>
            <div className="bg-gray-100 text-xs text-gray-500 mb-2 px-2 py-1 rounded inline-block font-mono">2024年3月 GESP 一级真题</div>
            <TrapVisualizer />
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4 rounded-r-lg">
              <p className="font-bold text-yellow-800 flex items-center gap-2"><AlertTriangle size={18} /> 避坑指南：</p>
              <p className="text-yellow-700 text-sm mt-1">
                不要“贪心”！在 <code>if...else if</code> 结构中，如果想要多个条件都能被检测到（例如既能被3整除又能被7整除），应该使用两个独立的 <code>if</code>，而不是 <code>else if</code>。
              </p>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📘 语法小贴士</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4 text-center">♾️</div>
                <h3 className="font-bold text-center mb-2 text-lg">数量不限</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  中间的 <code>else if</code> 可以写 1 个，也可以写 100 个，就像楼梯可以无限长。
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4 text-center">👻</div>
                <h3 className="font-bold text-center mb-2 text-lg">可有可无</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  最后的 <code>else</code> 可以省略。如果不关心“其他情况”（比如不想喝西北风），完全可以不写。
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4 text-center">☝️</div>
                <h3 className="font-bold text-center mb-2 text-lg">唯一性</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  不管写了多少层，最终最多只有 <strong>1 个</strong>大括号里的代码会被执行。
                </p>
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                  <CheckCircle2 size={20} /> 记忆口诀
                </h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">1</span>
                    if 带头，else if 排队，else 垫底。
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">2</span>
                    从上往下找，谁对听谁的。
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">3</span>
                    做完赶紧跑（后面不看了）。
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                  <BookOpen size={24} /> 课后思考
                </h3>
                <p className="text-indigo-100 mb-4">
                  除了 if...else if...else，C++ 还有一个专门处理“多选一”的魔法开关，叫做 <code>switch</code>。
                </p>
                <p className="text-sm bg-white/10 p-3 rounded-lg border border-white/20">
                  它能像按电梯按钮一样直接到达指定楼层吗？我们下节课揭晓！
                </p>
              </div>
            </div>

            <WeatherReporter />

            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm">
                🔄 重新开始学习
              </button>
            </div>
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      {/* 内嵌样式以支持动画 */}
      <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-blue-700 flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          <span>一级趣味课堂</span>
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

      {/* 侧边栏 */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-40 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-blue-50/50 to-white/50 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">C++ 趣味课堂</h1>
              <p className="text-xs text-blue-500 font-medium">第 8 课：循环入门</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto w-full py-4 custom-scrollbar">
          {sections.map((section, index) => {
            const showCategory = index === 0 || sections[index - 1].category !== section.category;
            return (
              <React.Fragment key={section.id}>
                {showCategory && (
                  <div className="px-6 pb-2 pt-4 first:pt-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.category}</h3>
                  </div>
                )}
                <div className="px-3">
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 group relative mb-1
                    ${activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <div className={`
                    p-1.5 rounded-md transition-colors flex-shrink-0
                    ${activeSection === section.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-500'}
                  `}>
                      <Icon name={section.icon} size={18} />
                    </div>
                    <span className="truncate text-sm">{section.title}</span>
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative pt-16 md:pt-0">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-lg font-bold text-gray-800 truncate flex items-center gap-2">
            <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">Section {activeSection}</span>
            {sections.find(s => s.id === activeSection)?.title}
          </h2>
          <div className="flex gap-2 text-sm text-gray-500">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-orange-500 transition-all duration-500 ease-out"
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
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition
              ${activeSection === sections.length ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
          >
            {activeSection === sections.length ? '下一课' : '下一步'} <Icon name="arrow-right" size={16} color="white" />
          </button>
        </footer>
      </div>
    </div>
  );
}