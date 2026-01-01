import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Siren,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Utensils,
  Ruler,
  Terminal,
  BookOpen,
  Code2,
  AlertOctagon,
  Scale,
  Menu,
  X
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "police": <Siren size={size} color={color} />,
    "branch": <GitBranch size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "check": <CheckCircle2 size={size} color={color} />,
    "x": <XCircle size={size} color={color} />,
    "help": <HelpCircle size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "food": <Utensils size={size} color={color} />,
    "ruler": <Ruler size={size} color={color} />,
    "terminal": <Terminal size={size} color={color} />,
    "book": <BookOpen size={size} color={color} />,
    "code": <Code2 size={size} color={color} />,
    "stop": <AlertOctagon size={size} color={color} />,
    "scale": <Scale size={size} color={color} />
  };
  return icons[name] || <HelpCircle size={size} color={color} />;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：智慧交警", icon: "police", category: "分支逻辑" },
  { id: 2, title: "情景：十字路口", icon: "stop", category: "分支逻辑" },
  { id: 3, title: "单行道：只有 if", icon: "arrow-right", category: "分支逻辑" },
  { id: 4, title: "双岔路：if 和 else", icon: "branch", category: "分支逻辑" },
  { id: 5, title: "隐形炸弹：分号陷阱", icon: "alert", category: "避坑指南" },
  { id: 6, title: "侦探工具：比较符号", icon: "scale", category: "避坑指南" },
  { id: 7, title: "实战：奇偶数审判", icon: "terminal", category: "实战演练" },
  { id: 8, title: "实战：严厉的安检", icon: "check", category: "实战演练" },
  { id: 9, title: "总结与作业", icon: "book", category: "实战演练" }
];

// --- 互动组件：红绿灯模拟器 ---
const TrafficLightSim = () => {
  const [isGreen, setIsGreen] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-xl border-4 border-gray-600 my-4 flex items-center justify-around text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-black p-4 rounded-full border-4 border-gray-500 shadow-lg">
          <div className={`w-16 h-16 rounded-full mb-2 transition-all duration-300 ${!isGreen ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-red-900 opacity-30'}`}></div>
          <div className={`w-16 h-16 rounded-full mt-2 transition-all duration-300 ${isGreen ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]' : 'bg-green-900 opacity-30'}`}></div>
        </div>
        <button
          onClick={() => setIsGreen(!isGreen)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold transition-colors"
        >
          切换信号
        </button>
      </div>

      <div className="flex-1 ml-8">
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm mb-4 border border-gray-700">
          <div><span className="text-purple-400">if</span> ( <span className="text-yellow-400">信号 == 红灯</span> ) &#123;</div>
          <div className="pl-4 text-red-400">cout &lt;&lt; "停车等待";</div>
          <div>&#125; <span className="text-purple-400">else</span> &#123;</div>
          <div className="pl-4 text-green-400">cout &lt;&lt; "开车通过";</div>
          <div>&#125;</div>
        </div>

        <div className="text-center p-4 rounded-lg bg-gray-700">
          <p className="text-gray-400 text-sm mb-1">执行结果：</p>
          <p className={`text-2xl font-bold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>
            {isGreen ? "🚗 💨 开车通过" : "🛑 ✋ 停车等待"}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 互动组件：身高检查器 (if) ---
const HeightChecker = () => {
  const [height, setHeight] = useState(140);
  const threshold = 150;
  const isSelected = height > threshold;

  return (
    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-100 my-4">
      <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
        <Ruler size={20} /> 体育老师选人搬垫子
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <span className="font-bold text-gray-700">你的身高(cm):</span>
        <input
          type="range" min="130" max="180"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          className="accent-blue-500 w-48"
        />
        <span className="font-mono text-xl bg-white px-3 py-1 rounded border border-blue-200">{height}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
          <div><span className="text-purple-400">if</span> ( <span className="text-yellow-300">height &gt; 150</span> ) &#123;</div>
          <div className={`pl-4 transition-colors duration-300 ${isSelected ? 'text-green-400 bg-green-900/30' : 'text-gray-500'}`}>
            cout &lt;&lt; "去搬垫子";
          </div>
          <div>&#125;</div>
        </div>

        <div className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-300 ${isSelected ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'}`}>
          {isSelected ? (
            <div className="text-center text-green-700 animate-bounce">
              <CheckCircle2 size={48} className="mx-auto mb-2" />
              <p className="font-bold">中选了！去干活！💪</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">😶</div>
              <p>假装没听见 (跳过)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 互动组件：食堂打饭 (if/else) ---
const CafeteriaSim = () => {
  const [hasTicket, setHasTicket] = useState(true);

  return (
    <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-100 my-4">
      <h3 className="font-bold text-lg text-orange-700 mb-4 flex items-center gap-2">
        <Utensils size={20} /> 食堂阿姨打饭
      </h3>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setHasTicket(!hasTicket)}
          className={`px-6 py-3 rounded-full font-bold shadow-md transition-all ${hasTicket ? 'bg-green-500 text-white ring-4 ring-green-200' : 'bg-gray-300 text-gray-600'}`}
        >
          {hasTicket ? "🎟️ 我有饭票" : "🤷‍♂️ 没有饭票"}
        </button>
      </div>

      <div className="flex gap-4 items-stretch">
        <div className="flex-1 bg-gray-800 text-white p-4 rounded-lg font-mono text-sm relative overflow-hidden">
          <div className={`absolute left-0 w-1 h-6 bg-yellow-400 transition-all duration-300 ${hasTicket ? 'top-[36px]' : 'top-[84px]'}`}></div>
          <div className="opacity-50">// 电脑的思考过程</div>
          <div><span className="text-purple-400">if</span> ( <span className={hasTicket ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{hasTicket ? "true" : "false"}</span> ) &#123;</div>
          <div className={`pl-4 ${hasTicket ? "text-white bg-white/10" : "text-gray-500"}`}>cout &lt;&lt; "吃鸡腿 🍗";</div>
          <div>&#125; <span className="text-purple-400">else</span> &#123;</div>
          <div className={`pl-4 ${!hasTicket ? "text-white bg-white/10" : "text-gray-500"}`}>cout &lt;&lt; "吃白菜 🥬";</div>
          <div>&#125;</div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-white rounded-lg border-2 border-orange-200">
          <div className="text-center">
            <div className="text-6xl mb-2 transition-transform duration-300 hover:scale-110">
              {hasTicket ? "🍗" : "🥬"}
            </div>
            <p className="font-bold text-gray-700">阿姨给你：{hasTicket ? "大鸡腿" : "大白菜"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 互动组件：分号陷阱 ---
const SemicolonTrap = () => {
  const [hasSemicolon, setHasSemicolon] = useState(false);
  const [aValue, setAValue] = useState(1); // a = 1, so a > 3 is false

  return (
    <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 my-4">
      <h3 className="font-bold text-lg text-red-700 mb-2 flex items-center gap-2">
        <AlertTriangle size={20} /> 超级大坑：隐形炸弹
      </h3>
      <p className="text-sm text-gray-600 mb-4">当 a = 1 时，我们希望 "a比3大" 这句话<b>不显示</b>。</p>

      <div className="flex items-center gap-4 mb-4 bg-white p-3 rounded-lg shadow-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasSemicolon}
            onChange={(e) => setHasSemicolon(e.target.checked)}
            className="w-5 h-5 accent-red-600"
          />
          <span className="font-bold text-red-600">添加错误分号 (;)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm relative">
          <div className="text-gray-400">int a = 1;</div>
          <div>
            <span className="text-purple-400">if</span> ( a &gt; 3 )
            <span className={`bg-red-600 text-white px-1 ml-1 rounded transition-opacity ${hasSemicolon ? 'opacity-100' : 'opacity-0'}`}>;</span>
            {hasSemicolon && <span className="text-red-400 text-xs ml-2 font-sans">← 炸弹在这里！判断结束了</span>}
          </div>
          <div>&#123;</div>
          <div className="pl-4 text-green-300">cout &lt;&lt; "a比3大";</div>
          <div>&#125;</div>
        </div>

        <div className={`p-4 rounded-lg border-2 ${hasSemicolon ? 'bg-red-100 border-red-400' : 'bg-gray-100 border-gray-300'}`}>
          <h4 className="font-bold text-gray-700 mb-2 border-b border-gray-300 pb-1">📺 控制台输出</h4>
          {hasSemicolon ? (
            <div className="font-mono text-red-600 font-bold">
              a比3大
              <p className="text-xs font-sans mt-2 bg-red-200 p-1 rounded text-red-800">
                😱 完了！a明明是1，电脑却胡说八道！<br />
                因为分号结束了判断，大括号里的代码变成了“路人”，无论如何都会执行。
              </p>
            </div>
          ) : (
            <div className="font-mono text-gray-400 italic">
              (空)
              <p className="text-xs font-sans mt-2 text-green-600 not-italic">
                ✅ 正常。a不大于3，所以不输出。
              </p>
            </div>
          )}
        </div>
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
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${type === 'exam' ? 'border-purple-500' : 'border-blue-500'} my-6`}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${type === 'exam' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
          {type === 'exam' ? '🏆 真题实战' : '📝 练习题'}
        </span>
      </div>
      <div className="font-bold text-lg mb-4 font-mono whitespace-pre-line">{question}</div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`p-3 text-left rounded-lg border-2 transition-all
              ${selected === null ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-100' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-100' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
            `}
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
            {selected === idx && idx === correctIndex && <span className="float-right text-green-600 font-bold"><CheckCircle2 size={20} /></span>}
            {selected === idx && idx !== correctIndex && <span className="float-right text-red-600 font-bold"><XCircle size={20} /></span>}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 slide-enter">
          <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><Icon name="help" size={16} /> 解析：</h4>
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
      navigate('/lesson8');
    }
  };

  const prevSection = () => {
    if (activeSection > 1) setActiveSection(activeSection - 1);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="slide-enter text-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 rounded-2xl shadow-xl mb-8">
              <Siren size={80} className="mx-auto mb-6 text-yellow-300 animate-pulse" />
              <h1 className="text-4xl font-bold mb-4">GESP C++ 一级 第7课</h1>
              <h2 className="text-5xl font-extrabold text-yellow-300 mb-8">分支结构：智慧交警</h2>
              <div className="inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
                <span className="font-bold">🚦 副标题：玩转 if 和 else</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">👨‍🏫 主讲人</h3>
                <p className="text-xl text-blue-600 font-bold">逻辑一号老师</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">🎯 教学目标</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>学会指挥代码“走哪条路”</li>
                  <li>掌握 <code>if</code> 和 <code>else</code> 的超级咒语</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <AlertOctagon className="text-red-500" size={32} /> 情景导入：十字路口
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <p className="text-lg text-gray-700 mb-4">
                欢迎来到 C++ 的代码路口！我是这里的<b>交警指挥官</b>。
                在这里，所有代码都要听我的口令：
              </p>
              <TrafficLightSim />
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 text-sm text-blue-700">
                  ⛈️ <strong>如果 (if)</strong> 下雨，<strong>那么</strong> 带伞。
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-sm text-red-700">
                  📝 <strong>如果 (if)</strong> 没写完作业，<strong>那么</strong> 挨骂。
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">➡️ 单行道：只有 if</h2>
            <p className="text-gray-600 mb-4">有些时候，我们只关心“满足条件”要做什么，不满足就什么都不做。</p>
            <HeightChecker />
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
              <h4 className="font-bold text-yellow-800">💡 特点</h4>
              <p className="text-yellow-700">条件满足就干活，不满足就假装没看见（直接跳过代码块）。</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔀 双岔路：if 和 else</h2>
            <p className="text-gray-600 mb-4">更多时候，我们面临“非此即彼”的选择。两条路，必须选一条走！</p>
            <CafeteriaSim />
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-lg text-center">
              <span className="font-bold text-xl text-yellow-300">口诀：两条路，必选其一。</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">💣 隐形炸弹：分号陷阱</h2>
            <SemicolonTrap />
            <div className="bg-blue-100 p-4 rounded-lg border border-blue-300 text-center">
              <p className="font-bold text-blue-800 text-lg">⚠️ 切记：小括号后无分号，大括号里写代码！</p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕵️ 侦探工具箱：比较符号</h2>
            <p className="mb-4 text-gray-600">在 if 的小括号里，我们需要特殊的工具来做判断。</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-500">
                <h3 className="font-bold text-xl mb-4 text-blue-700">判断相等</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">数学课</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">=</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">C++ 课</span>
                  <span className="font-mono font-bold text-red-500 bg-red-50 px-2 py-1 rounded">==</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">* 两个等号才是判断，一个等号是赋值！</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border-t-4 border-purple-500">
                <h3 className="font-bold text-xl mb-4 text-purple-700">判断整除</h3>
                <div className="mb-2">
                  <span className="font-bold text-gray-700">工具：</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">%</span> (取余数)
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-green-50 p-2 rounded text-green-700">
                    偶数：N % 2 == 0
                  </div>
                  <div className="bg-orange-50 p-2 rounded text-orange-700">
                    奇数：N % 2 != 0
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🛡️ 实战演练 1：奇偶数审判</h2>
            <div className="bg-gray-100 p-2 rounded text-xs text-gray-500 mb-4">2023年12月 GESP 一级真题 第4题</div>
            <Quiz
              type="exam"
              question={`题目：判断 N 是否为偶数，横线处填什么？\n\nif ( ________ ) \n    cout << "偶数";\nelse\n    cout << "奇数";`}
              options={[
                "N % 2 == 0",
                "N % 2 = 0",
                "N % 2"
              ]}
              correctIndex={0}
              explanation={`
                A. 正确。余数为0，说明能被2整除，是偶数。
                B. 错误。一个等号 = 是赋值，不能用来判断！
                C. 错误。如果 N 是奇数(如3)，3%2=1(真)，会输出"偶数"，反了！
              `}
            />
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">👮 实战演练 2：严厉的安检</h2>
            <div className="bg-gray-100 p-2 rounded text-xs text-gray-500 mb-4">2024年12月 GESP 一级真题 第11题</div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800">
              <p><strong>任务：</strong>判断 N 是否为“能被3整除的偶数”。</p>
              <ul className="list-disc list-inside mt-2">
                <li>是偶数 &rarr; <code>N % 2 == 0</code></li>
                <li>被3整除 &rarr; <code>N % 3 == 0</code></li>
                <li>两个都要 &rarr; 使用 <code>&&</code></li>
              </ul>
            </div>
            <Quiz
              type="exam"
              question="代码拼图：if ( ________ )"
              options={[
                "(N % 2 == 0) || (N % 3 == 0)",
                "N % 2 == 0 && N % 3 = 0",
                "N % 6 == 1",
                "(N % 2 == 0) && (N % 3 == 0)"
              ]}
              correctIndex={3}
              explanation={`
                A. 用了 || (或者)，满足一个就行，太宽容了。
                B. 第二个条件用了 = (赋值)，语法错误。
                C. 除以6余1，肯定不是偶数。
                D. 正确。同时满足偶数(余数0)和被3整除(余数0)。
              `}
            />
          </div>
        );
      case 9:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📝 总结与作业</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded shadow border-t-4 border-green-500 text-center">
                <div className="font-bold text-lg mb-2">if</div>
                <p className="text-sm text-gray-600">如果对，就去做</p>
              </div>
              <div className="bg-white p-4 rounded shadow border-t-4 border-blue-500 text-center">
                <div className="font-bold text-lg mb-2">else</div>
                <p className="text-sm text-gray-600">上面不对，就做这个</p>
              </div>
              <div className="bg-white p-4 rounded shadow border-t-4 border-red-500 text-center">
                <div className="font-bold text-lg mb-2">&#123; &#125;</div>
                <p className="text-sm text-gray-600">代码的家，别漏了</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">🏠 课后作业：成绩判官</h3>
              <div className="flex flex-col gap-4">
                <p>编程挑战：输入一个分数 (0-100)。</p>
                <ul className="list-disc list-inside bg-black/20 p-4 rounded-lg font-mono text-sm">
                  <li>如果分数 &gt;= 60，输出 "Pass" (及格)</li>
                  <li>否则，输出 "Fail" (不及格)</li>
                </ul>
                <div className="flex items-start gap-2 bg-yellow-500/20 p-3 rounded text-yellow-100 text-sm">
                  <HelpCircle size={16} className="mt-1" />
                  <p><strong>思考题：</strong>如果要分“优秀(&gt;=90)”、“及格”、“不及格”三种情况，该怎么办？(提示：else 里面能不能再套一个 if？)</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
                🔄 重新开始
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
              <p className="text-xs text-blue-500 font-medium">第 7 课：复杂逻辑</p>
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
            {renderContent()}
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