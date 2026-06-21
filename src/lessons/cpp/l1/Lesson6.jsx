import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import {
  Shield,
  Zap,
  Ticket,
  AlertTriangle,
  Calculator,
  Brain,
  Check,
  X,
  ArrowRight,
  Unlock,
  Key,
  Lightbulb,
  DoorOpen,
  Info,
  Menu
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "shield": <Shield size={size} color={color} />,
    "zap": <Zap size={size} color={color} />,
    "ticket": <Ticket size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "calculator": <Calculator size={size} color={color} />,
    "brain": <Brain size={size} color={color} />,
    "check": <Check size={size} color={color} />,
    "x": <X size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "unlock": <Unlock size={size} color={color} />,
    "key": <Key size={size} color={color} />,
    "lightbulb": <Lightbulb size={size} color={color} />,
    "door": <DoorOpen size={size} color={color} />,
    "info": <Info size={size} color={color} />
  };
  return icons[name] || <Info size={size} color={color} />;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：代码游乐园", icon: "ticket", category: "逻辑之门" },
  { id: 2, title: "规则一：严厉模式 (&&)", icon: "shield", category: "逻辑之门" },
  { id: 3, title: "规则二：宽容模式 (||)", icon: "door", category: "逻辑之门" },
  { id: 4, title: "规则三：调皮模式 (!)", icon: "zap", category: "逻辑之门" },
  { id: 5, title: "核心机密：非零即真", icon: "key", category: "避坑指南" },
  { id: 6, title: "避坑指南：连写陷阱", icon: "alert", category: "避坑指南" },
  { id: 7, title: "真题实战：冒牌警察", icon: "brain", category: "实战演练" },
  { id: 8, title: "真题实战：优先级之争", icon: "calculator", category: "实战演练" },
  { id: 9, title: "总结与作业", icon: "check", category: "实战演练" }
];


// --- 互动组件：逻辑门模拟器 ---
const LogicGateSimulator = ({ type }) => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  let result = false;
  let symbol = "";
  let title = "";
  let description = "";
  let colorClass = "";

  if (type === 'AND') {
    result = inputA && inputB;
    symbol = "&&";
    title = "严厉安检门 (AND)";
    description = "“两个都要有，缺一就不行”";
    colorClass = "blue";
  } else if (type === 'OR') {
    result = inputA || inputB;
    symbol = "||";
    title = "宽容安检门 (OR)";
    description = "“只要有一个，大门为你开”";
    colorClass = "green";
  } else if (type === 'NOT') {
    result = !inputA;
    symbol = "!";
    title = "调皮魔法师 (NOT)";
    description = "“专门唱反调，真假大变身”";
    colorClass = "purple";
  }

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 border-${colorClass}-500 my-4`}>
      <h3 className={`font-bold text-lg text-${colorClass}-600 mb-2 flex items-center gap-2`}>
        {type === 'AND' && <Shield size={20} />}
        {type === 'OR' && <DoorOpen size={20} />}
        {type === 'NOT' && <Zap size={20} />}
        {title}
      </h3>
      <p className="text-gray-500 text-sm mb-6 italic">{description}</p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* 输入区 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInputA(!inputA)}
              className={`w-16 h-8 rounded-full transition-colors relative ${inputA ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${inputA ? 'left-9' : 'left-1'}`}></div>
            </button>
            <span className="font-mono font-bold text-gray-700">Input A: {inputA ? '1 (真)' : '0 (假)'}</span>
          </div>

          {type !== 'NOT' && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setInputB(!inputB)}
                className={`w-16 h-8 rounded-full transition-colors relative ${inputB ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${inputB ? 'left-9' : 'left-1'}`}></div>
              </button>
              <span className="font-mono font-bold text-gray-700">Input B: {inputB ? '1 (真)' : '0 (假)'}</span>
            </div>
          )}
        </div>

        {/* 逻辑符号 */}
        <div className="text-4xl font-bold text-gray-300 font-mono">
          {type === 'NOT' ?
            <div className="flex flex-col items-center"><span className="text-sm text-gray-400">操作符</span><span>!A</span></div> :
            <div className="flex flex-col items-center"><span className="text-sm text-gray-400">操作符</span><span>{symbol}</span></div>
          }
        </div>

        {/* 结果区 */}
        <div className={`flex flex-col items-center p-4 rounded-lg border-2 ${result ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-200'}`}>
          <Lightbulb size={48} className={`mb-2 transition-all duration-300 ${result ? 'text-yellow-500 fill-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]' : 'text-gray-300'}`} />
          <span className={`font-bold ${result ? 'text-yellow-600' : 'text-gray-400'}`}>
            {result ? '通过 (True/1)' : '拒绝 (False/0)'}
          </span>
        </div>
      </div>

      {/* 代码展示 */}
      <div className="mt-6 bg-gray-800 text-gray-200 p-3 rounded font-mono text-sm text-center">
        {type === 'NOT' ? `cout << (!${inputA ? 1 : 0}); // 输出 ${result ? 1 : 0}` : `cout << (${inputA ? 1 : 0} ${symbol} ${inputB ? 1 : 0}); // 输出 ${result ? 1 : 0}`}
      </div>
    </div>
  );
};

// --- 互动组件：真假探测器 ---
const TruthDetector = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-100 my-4">
      <h3 className="font-bold text-lg text-indigo-700 mb-4">🔍 核心机密：真假探测器</h3>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-600">输入任意整数，看看电脑认为是真还是假？</p>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          className="text-3xl font-bold text-center w-40 p-2 rounded border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
        />

        <div className="text-2xl font-bold mt-2 flex items-center gap-3">
          <span>判定结果：</span>
          {value === 0 ? (
            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full flex items-center gap-2">
              <X size={24} /> False (假)
            </span>
          ) : (
            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full flex items-center gap-2">
              <Check size={24} /> True (真)
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">记住黄金法则：<span className="font-bold">只有 0 是假，非 0 都是真！</span></p>
      </div>
    </div>
  );
};

// --- 互动组件：连写陷阱演示 ---
const PitfallVisualizer = () => {
  const [x, setX] = useState(10);

  // 逻辑分步计算
  const step1 = x > 3; // True(1) or False(0)

  return (
    <div className="bg-red-50 p-6 rounded-xl border-2 border-red-100 my-4">
      <h3 className="font-bold text-lg text-red-700 mb-4">⚠️ 危险实验：连写陷阱</h3>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-bold">设 x = </span>
        <input
          type="range" min="0" max="10"
          value={x}
          onChange={(e) => setX(parseInt(e.target.value))}
          className="accent-red-500 w-48"
        />
        <span className="font-mono text-xl bg-white px-3 py-1 rounded border">{x}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 数学期望 */}
        <div className="bg-white p-4 rounded shadow-sm opacity-50">
          <h4 className="font-bold text-gray-500 mb-2 border-b pb-1">数学课本的理解</h4>
          <p className="font-mono text-lg mb-2">3 &lt; x &lt; 5</p>
          <p className="text-sm text-gray-600">意思：x 在 3 到 5 之间</p>
          <div className="mt-4 font-bold">
            预期结果：
            {x > 3 && x < 5 ? <span className="text-green-500">真</span> : <span className="text-red-500">假</span>}
          </div>
        </div>

        {/* C++ 实际执行 */}
        <div className="bg-white p-4 rounded shadow-sm border-2 border-red-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1">C++ 实际逻辑</div>
          <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">电脑的真实步骤</h4>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span>1. 先算 3 &lt; {x}</span>
              <span className={step1 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {step1 ? "1 (真)" : "0 (假)"}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <span>2. 式子变成</span>
              <span className="font-bold">{step1 ? "1" : "0"} &lt; 5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>3. 再算 {step1 ? 1 : 0} &lt; 5</span>
              <span className="text-green-600 font-bold text-lg">1 (真)</span>
            </div>
          </div>
          <div className="mt-3 text-red-600 font-bold text-center text-sm">
            😱 无论 x 是几，结果永远是真！
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-bold">正确写法：x &gt; 3 && x &lt; 5</span>
      </div>
    </div>
  );
};

// --- 题目组件 ---
const Quiz = ({ question, options, correctIndex, explanation, type = "normal" }) => {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${type === 'trap' ? 'border-red-500' : 'border-purple-500'} my-6`}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${type === 'trap' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}`}>
          {type === 'trap' ? '⚠️ 陷阱题' : '🏆 真题实战'}
        </span>
      </div>
      <p className="font-bold text-lg mb-4 font-mono">{question}</p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`p-3 text-left rounded-lg border-2 transition-all
              ${selected === null ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-100' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-100' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
            `}
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
            {selected === idx && idx === correctIndex && <span className="float-right text-green-600 font-bold"><Check size={20} /></span>}
            {selected === idx && idx !== correctIndex && <span className="float-right text-red-600 font-bold"><X size={20} /></span>}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 slide-enter">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><Icon name="lightbulb" size={16} /> 侦探解析：</h4>
          <div className="whitespace-pre-line text-gray-600 leading-relaxed">{explanation}</div>
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
      navigate('/lesson/1/7');
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Ticket className="text-purple-500" size={32} /> 课程导入：C++ 代码游乐园
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 mb-6">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                欢迎来到代码游乐园！我是门口的安检机器人<strong className="text-blue-600">“逻辑一号”</strong>。
                想要进园玩过山车，必须通过三种特殊的“安检规则”！
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-blue-500">
                  <Shield className="mx-auto text-blue-500 mb-2" size={32} />
                  <h4 className="font-bold text-gray-800">严厉模式</h4>
                  <p className="text-sm text-gray-500">Logic AND</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-green-500">
                  <DoorOpen className="mx-auto text-green-500 mb-2" size={32} />
                  <h4 className="font-bold text-gray-800">宽容模式</h4>
                  <p className="text-sm text-gray-500">Logic OR</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border-t-4 border-purple-500">
                  <Zap className="mx-auto text-purple-500 mb-2" size={32} />
                  <h4 className="font-bold text-gray-800">调皮模式</h4>
                  <p className="text-sm text-gray-500">Logic NOT</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🛡️ 规则一：严厉模式 (&&)</h2>
            <div className="mb-4">
              <p className="text-lg text-gray-600">
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">逻辑与 (AND)</span>，符号是 <code className="bg-gray-200 px-1 rounded font-bold">&&</code>。
              </p>
              <p className="text-gray-500 mt-2">只有当所有条件都满足时，结果才为真。</p>
            </div>
            <LogicGateSimulator type="AND" />
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              <strong>生活例子：</strong> 必须“有门票” <span className="font-bold">并且</span> “身高超过1米2” 才能玩过山车。
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🚪 规则二：宽容模式 (||)</h2>
            <div className="mb-4">
              <p className="text-lg text-gray-600">
                <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">逻辑或 (OR)</span>，符号是 <code className="bg-gray-200 px-1 rounded font-bold">||</code>。
              </p>
              <p className="text-gray-500 mt-2">只要满足其中一个条件，结果就为真。</p>
            </div>
            <LogicGateSimulator type="OR" />
            <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800">
              <strong>生活例子：</strong> “是VIP会员” <span className="font-bold">或者</span> “今天是寿星”，就可以免费入场。
            </div>
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🪄 规则三：调皮模式 (!)</h2>
            <div className="mb-4">
              <p className="text-lg text-gray-600">
                <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">逻辑非 (NOT)</span>，符号是 <code className="bg-gray-200 px-1 rounded font-bold">!</code>。
              </p>
              <p className="text-gray-500 mt-2">它专门唱反调，把真变成假，把假变成真。</p>
            </div>
            <LogicGateSimulator type="NOT" />
            <div className="bg-purple-50 p-4 rounded-lg text-sm text-purple-800">
              <strong>生活例子：</strong> 妈妈说“不许看电视”，加上魔法 <code>!</code> 就变成了“可以看电视”。
            </div>
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔑 核心机密：电脑怎么分真假？</h2>
            <p className="text-lg text-gray-600 mb-4">电脑里只有数字。在 C++ 中，真和假是这样规定的：</p>
            <TruthDetector />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded border-2 border-red-200 text-center">
                <div className="text-4xl mb-2 text-red-500 font-bold">0</div>
                <div className="text-gray-500 font-bold">假 (False)</div>
                <div className="text-xs text-gray-400">关灯、没有、不行</div>
              </div>
              <div className="bg-white p-4 rounded border-2 border-green-200 text-center">
                <div className="text-4xl mb-2 text-green-500 font-bold">1, 5, -99...</div>
                <div className="text-gray-500 font-bold">真 (True)</div>
                <div className="text-xs text-gray-400">只要不是0，统统是真！</div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">⚠️ 避坑指南：数学 vs C++</h2>
            <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
              <p className="text-yellow-800 font-bold">
                永远不要在代码里写 <code className="bg-white px-2 py-1 rounded text-red-600">3 &lt; x &lt; 5</code> ！
              </p>
            </div>
            <PitfallVisualizer />
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕵️ 真题实战：谁是冒牌警察？</h2>
            <div className="bg-gray-100 p-3 rounded mb-4 text-sm text-gray-600">
              来源：2023年3月 GESP 一级真题
            </div>
            <Quiz
              question="题目：我们要判断 a 和 b 都是 0，哪个写法是【错误】的？"
              options={[
                "(a==0)&&(b==0)",
                "(a==b==0)",
                "(!a)&&(!b)"
              ]}
              correctIndex={1}
              type="trap"
              explanation={`
                     解析：(a==b==0) 是大坑！
                     
                     假设 a=1 (坏人), b=0 (好人)。
                     1. 先算 a==b (1等于0吗？) -> 结果是 0 (假)。
                     2. 再算 0==0 (0等于0吗？) -> 结果是 1 (真)。
                     
                     结论：坏人 a=1 竟然通过了检查！所以 B 写法是错的。
                  `}
            />
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🧮 真题实战：谁先动手？</h2>
            <div className="bg-gray-100 p-3 rounded mb-4 text-sm text-gray-600">
              来源：2024年12月 GESP 一级真题
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-700 mb-2">优先级口诀：</h4>
              <p>1. 算术优先 (先乘除，后加减)</p>
              <p>2. 逻辑垫后 (&&, ||)</p>
            </div>
            <Quiz
              question="计算表达式 12 - 3 * 2 && 2 的值。"
              options={[
                "0",
                "1",
                "6",
                "12"
              ]}
              correctIndex={1}
              explanation={`
                     解题三步走：
                     1. 算术优先：先算乘除 3*2=6，再算加减 12-6=6。
                     2. 逻辑垫后：式子变成了 6 && 2。
                     3. 非零即真：6 是真，2 是真 -> 真 && 真 = 1。
                  `}
            />
          </div>
        );
      case 9:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📝 总结与作业</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-4 border-b pb-2">🧠 知识点回顾</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded font-bold font-mono">&&</span>
                    <span>全对才对 (严厉)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-600 p-2 rounded font-bold font-mono">||</span>
                    <span>有对就对 (宽容)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 p-2 rounded font-bold font-mono">!</span>
                    <span>颠倒黑白 (调皮)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-600 p-2 rounded font-bold font-mono">0</span>
                    <span>只有 0 是假，其余是真</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-4 border-b border-white/30 pb-2">🏠 课后作业</h3>
                <ol className="list-decimal list-inside space-y-3">
                  <li>
                    <span className="font-bold">上机验证：</span>
                    <p className="text-sm opacity-90 pl-5 mt-1 font-mono bg-black/20 p-2 rounded">cout &lt;&lt; (2 && 5) &lt;&lt; endl;</p>
                    <p className="text-sm opacity-90 pl-5">看看结果是不是 1？</p>
                  </li>
                  <li>
                    <span className="font-bold">思考题：</span>
                    <p className="text-sm opacity-90 pl-5 mt-1">如果式子变成 <code className="font-mono">12 - 3 * 4 && 2</code>，结果会是多少？</p>
                    <p className="text-xs opacity-75 pl-5 mt-1">(提示：先算 12 - 12 等于几？)</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
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
              <p className="text-xs text-blue-500 font-medium">第 6 课：逻辑运算</p>
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
      <div className="flex-1 flex flex-col h-full overflow-hidden pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {sections.find(s => s.id === activeSection)?.title}
          </h2>
          <div className="flex gap-2 text-sm text-gray-500">
            <span>{activeSection}</span> / <span>{sections.length}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <CppL1LessonSupport lessonId={6} />
            {renderContent()}
            <CppL1LessonSupport lessonId={6} placement="bottom" />
          </div>
        </main>

        <footer className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-8">
          <button
            onClick={prevSection}
            disabled={activeSection === 1}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition
              ${activeSection === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            上一步
          </button>

          <div className="w-1/3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(activeSection / sections.length) * 100}%` }}
            ></div>
          </div>

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
