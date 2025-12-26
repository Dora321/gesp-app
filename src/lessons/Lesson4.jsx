import React, { useState } from 'react';
import {
  Users,
  Scissors,
  Percent,
  AlertCircle,
  Calculator,
  Clock,
  Check,
  X,
  ArrowRight,
  Menu
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "users": <Users size={size} color={color} />,
    "scissors": <Scissors size={size} color={color} />,
    "percent": <Percent size={size} color={color} />,
    "alert": <AlertCircle size={size} color={color} />,
    "calculator": <Calculator size={size} color={color} />,
    "clock": <Clock size={size} color={color} />,
    "check": <Check size={size} color={color} />,
    "x": <X size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />
  };
  return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：体育课排队", icon: "users" },
  { id: 2, title: "第一把刀：整除运算 (/)", icon: "scissors" },
  { id: 3, title: "第二把刀：取模运算 (%)", icon: "percent" },
  { id: 4, title: "易错陷阱：小树除大树", icon: "alert" },
  { id: 5, title: "运算优先级：谁先动手？", icon: "calculator" },
  { id: 6, title: "真题实战：混合运算侦探", icon: "check" },
  { id: 7, title: "真题实战：除法陷阱", icon: "check" },
  { id: 8, title: "场景应用：时间的魔法", icon: "clock" },
  { id: 9, title: "高级技巧：数位拆解 (个位)", icon: "calculator" },
  { id: 10, title: "高级技巧：数位拆解 (砍尾)", icon: "scissors" },
  { id: 11, title: "综合练习：倒序输出", icon: "calculator" },
  { id: 12, title: "侦探找茬：奇偶判断", icon: "percent" },
  { id: 13, title: "总结与作业", icon: "check" }
];

// --- 互动演示组件：排队模型 ---
const QueueSimulator = () => {
  const [students, setStudents] = useState(10);
  const [groupSize, setGroupSize] = useState(3);

  const groups = Math.floor(students / groupSize);
  const remainder = students % groupSize;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 my-4">
      <h3 className="font-bold text-lg text-blue-600 mb-4">🖐️ 互动实验：排队分租</h3>
      <div className="flex gap-4 mb-6">
        <label className="flex flex-col">
          <span className="text-sm font-semibold">同学总数 (a): {students}</span>
          <input type="range" min="1" max="20" value={students} onChange={(e) => setStudents(parseInt(e.target.value))} className="accent-blue-500" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-semibold">每组人数 (b): {groupSize}</span>
          <input type="range" min="1" max="10" value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))} className="accent-green-500" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-lg min-h-[60px]">
        {Array.from({ length: students }).map((_, i) => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300
                        ${i < groups * groupSize ?
              (Math.floor(i / groupSize) % 2 === 0 ? 'bg-blue-400' : 'bg-blue-600')
              : 'bg-red-500 animate-bounce'}`}
          >
            🙆
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-600">整除 (/) 结果</div>
          <div className="text-3xl font-bold text-blue-700">{groups} <span className="text-sm">组</span></div>
          <code className="text-xs text-blue-500 block mt-1">int res = {students} / {groupSize};</code>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="text-sm text-gray-600">取模 (%) 结果</div>
          <div className="text-3xl font-bold text-red-600">{remainder} <span className="text-sm">人 (落单)</span></div>
          <code className="text-xs text-red-500 block mt-1">int rem = {students} % {groupSize};</code>
        </div>
      </div>
    </div>
  );
};

// --- 互动演示组件：时间魔法 ---
const TimeCalculator = () => {
  const [now, setNow] = useState(10);
  const [pass, setPass] = useState(20);

  return (
    <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-100 my-4">
      <h3 className="font-bold text-lg text-indigo-700 mb-4">🕰️ 时间旅行计算器</h3>
      <div className="flex gap-4 items-center mb-4">
        <div className="flex flex-col items-center">
          <label className="text-sm font-bold">现在时间</label>
          <input type="number" value={now} onChange={(e) => setNow(parseInt(e.target.value) || 0)} className="w-20 p-2 border rounded text-center text-xl font-bold" />
        </div>
        <span className="text-2xl font-bold text-gray-400">+</span>
        <div className="flex flex-col items-center">
          <label className="text-sm font-bold">经过小时</label>
          <input type="number" value={pass} onChange={(e) => setPass(parseInt(e.target.value) || 0)} className="w-20 p-2 border rounded text-center text-xl font-bold" />
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-inner text-center">
        <div className="text-gray-500 text-sm mb-2">计算公式：( {now} + {pass} ) % 24</div>
        <div className="text-4xl font-bold text-indigo-600 font-mono">
          {(now + pass) % 24} <span className="text-lg text-gray-600">点</span>
        </div>
      </div>
    </div>
  );
};

// --- 互动演示组件：数位拆解 ---
const DigitSplitter = () => {
  const [num, setNum] = useState(352);

  // Safe handling for empty input
  const n = num || 0;
  const digit1 = n % 10;
  const step1 = Math.floor(n / 10);
  const digit2 = step1 % 10;
  const step2 = Math.floor(step1 / 10);
  const digit3 = step2 % 10;

  return (
    <div className="bg-green-50 p-6 rounded-xl border-2 border-green-100 my-4">
      <h3 className="font-bold text-lg text-green-700 mb-4">🏭 数字拆解流水线</h3>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-bold">输入三位数：</span>
        <input type="number" value={num} onChange={(e) => setNum(parseInt(e.target.value))} className="border-2 border-green-300 rounded px-3 py-1 font-mono text-xl w-32" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="bg-gray-800 text-white p-2 rounded w-16 text-center font-mono">{n}</div>
          <span className="text-xl">→</span>
          <div className="bg-yellow-100 border border-yellow-400 p-2 rounded flex-1">
            <code className="text-sm text-gray-600">个位 = {n} % 10</code>
            <div className="font-bold text-red-600 text-xl text-right">得到：{digit1}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white p-2 rounded w-16 text-center font-mono opacity-50">{n}</div>
          <span className="text-xl">→</span>
          <div className="bg-blue-100 border border-blue-400 p-2 rounded flex-1">
            <code className="text-sm text-gray-600">砍尾 = {n} / 10</code>
            <div className="font-bold text-blue-600 text-xl text-right">剩下：{step1}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white p-2 rounded w-16 text-center font-mono">{step1}</div>
          <span className="text-xl">→</span>
          <div className="bg-yellow-100 border border-yellow-400 p-2 rounded flex-1">
            <code className="text-sm text-gray-600">个位 = {step1} % 10</code>
            <div className="font-bold text-red-600 text-xl text-right">得到：{digit2}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white p-2 rounded w-16 text-center font-mono opacity-50">{step1}</div>
          <span className="text-xl">→</span>
          <div className="bg-blue-100 border border-blue-400 p-2 rounded flex-1">
            <code className="text-sm text-gray-600">砍尾 = {step1} / 10</code>
            <div className="font-bold text-blue-600 text-xl text-right">剩下：{step2}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white p-2 rounded w-16 text-center font-mono">{step2}</div>
          <span className="text-xl">→</span>
          <div className="bg-yellow-100 border border-yellow-400 p-2 rounded flex-1">
            <code className="text-sm text-gray-600">个位 = {step2} % 10</code>
            <div className="font-bold text-red-600 text-xl text-right">得到：{digit3}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white border border-gray-200 rounded text-center">
        <span className="text-gray-500">倒序输出：</span>
        <span className="text-2xl font-bold font-mono tracking-widest">{digit1} {digit2} {digit3}</span>
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
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold uppercase">真题实战</span>
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
            {selected === idx && idx === correctIndex && <span className="float-right text-green-600 font-bold">正确!</span>}
            {selected === idx && idx !== correctIndex && <span className="float-right text-red-600 font-bold">错误</span>}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm border border-gray-200 slide-enter">
          <h4 className="font-bold text-gray-700 mb-2">🕵️ 侦探解析：</h4>
          <div className="whitespace-pre-line text-gray-600 leading-relaxed">{explanation}</div>
        </div>
      )}
    </div>
  );
};

// --- 主应用 ---
export default function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nextSection = () => {
    if (activeSection < sections.length) setActiveSection(activeSection + 1);
  };

  const prevSection = () => {
    if (activeSection > 1) setActiveSection(activeSection - 1);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🏃 课程导入：体育课排队</h2>
            <p className="text-lg text-gray-600 mb-4">体育老师吹哨子：“全班同学，每 3 人一组，快速站好！”</p>
            <QueueSimulator />
            <div className="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-yellow-800">计算机的困惑 🤖</h4>
              <p className="text-yellow-700">计算机不能像人一样一眼看到“商”和“余数”。它需要两把不同的“数学刀”来分别获取它们。</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔪 第一把刀：整除运算 (/)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-xl mb-2 text-blue-600">定义：去尾法</h3>
                <p className="mb-4">计算机里的整数除法非常“狠心”，直接切掉小数点后的所有尾巴。</p>
                <div className="bg-gray-800 text-white p-4 rounded font-mono">
                  <p>int a = 10 / 3;</p>
                  <p className="text-green-400">// 输出 3 (不是 3.333)</p>
                  <br />
                  <p>int b = 5 / 2;</p>
                  <p className="text-green-400">// 输出 2 (不是 2.5)</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🪚</div>
                  <p className="font-bold text-red-500">不要四舍五入！</p>
                  <p className="text-gray-500">直接砍断！</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔍 第二把刀：取模运算 (%)</h2>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="font-bold text-xl mb-2 text-purple-600">定义：捡漏王</h3>
              <p className="mb-4">它只关心“除不尽剩下的部分”。读作 <b>"mod"</b>。</p>
              <div className="bg-gray-800 text-white p-4 rounded font-mono">
                <p>int c = 10 % 3;</p>
                <p className="text-green-400">// 输出 1 (10 除 3 余 1)</p>
                <br />
                <p>int d = 10 % 2;</p>
                <p className="text-green-400">// 输出 0 (整除，余数为0)</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-bold text-blue-800">⚡ 重要用途：</p>
              <ul className="list-disc list-inside text-blue-700 ml-4">
                <li>判断奇偶数</li>
                <li>判断倍数</li>
                <li>周期性问题 (如时间、星期几)</li>
              </ul>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">⚠️ 易错陷阱：小树除大树</h2>
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">2 % 5 = ?</h3>
              <div className="flex gap-8 mb-6">
                <div>
                  <div className="text-4xl">🍎🍎</div>
                  <div className="text-sm text-gray-500">2个苹果</div>
                </div>
                <div className="text-2xl font-bold pt-2">分给</div>
                <div>
                  <div className="text-4xl">👶👶👶👶👶</div>
                  <div className="text-sm text-gray-500">5个小朋友</div>
                </div>
              </div>
              <p className="text-lg mb-2">每人分 1 个够不够？ <strong className="text-red-500">不够！</strong></p>
              <p className="text-lg mb-4">所以分出去 0 个，手里还剩 <strong className="text-green-600">2 个</strong>。</p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 w-full max-w-md">
                <p className="font-bold text-red-700">结论：如果 被除数 &lt; 除数，取模结果就是被除数本身。</p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">⚖️ 运算优先级：谁先动手？</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-yellow-100 p-4 rounded-lg border-l-8 border-yellow-500">
                <div className="text-3xl font-bold text-yellow-700">1</div>
                <div>
                  <h4 className="font-bold text-lg">老大：括号 ()</h4>
                  <p className="text-sm">无论里面是谁，最先算！</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-blue-100 p-4 rounded-lg border-l-8 border-blue-500">
                <div className="text-3xl font-bold text-blue-700">2</div>
                <div>
                  <h4 className="font-bold text-lg">三剑客：* / %</h4>
                  <p className="text-sm">乘、除、模平起平坐。从左往右依次算。</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg border-l-8 border-gray-500">
                <div className="text-3xl font-bold text-gray-700">3</div>
                <div>
                  <h4 className="font-bold text-lg">小兵：+ -</h4>
                  <p className="text-sm">加、减最后才轮到。</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕵️ 真题实战 (2023.12)</h2>
            <Quiz
              question="C++表达式 10 - 3 * (2 + 1) % 10 的值是（ ）。"
              options={["0", "1", "2", "3"]}
              correctIndex={1}
              explanation={`
                                1. 先算括号：2 + 1 = 3。
                                    表达式变：10 - 3 * 3 % 10
                                2. 找乘除模：* 和 % 同级，从左向右。
                                    先算 3 * 3 = 9。
                                    表达式变：10 - 9 % 10
                                3. 再算取模：9 % 10 (小除大) = 9。
                                    表达式变：10 - 9
                                4. 最后减法：10 - 9 = 1。
                            `}
            />
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕵️ 真题实战 (2024.06)</h2>
            <div className="bg-red-100 p-3 mb-4 rounded text-red-800 font-bold text-sm">⚠️ 注意：这里有除法陷阱！</div>
            <Quiz
              question="C++表达式 3 - 3 * 3 / 5 的值是（ ）。"
              options={["-1.2", "1", "0", "2"]}
              correctIndex={3}
              explanation={`
                                1. 先算乘法：3 * 3 = 9。
                                    表达式变：3 - 9 / 5
                                2. 再算除法：9 / 5 是整数除法！
                                    9 除以 5 商 1 余 4。
                                    所以 9 / 5 = 1 (切掉小数！)
                                    表达式变：3 - 1
                                3. 最后减法：3 - 1 = 2。
                            `}
            />
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕰️ 场景应用：时间的魔法</h2>
            <p className="mb-4 text-gray-600">只要涉及“转圈圈”（周期性）的问题，就召唤 <b>取模 %</b>。</p>
            <TimeCalculator />
            <div className="bg-gray-800 text-white p-4 rounded font-mono mt-4">
              <p>int now = 10;</p>
              <p>int pass = 20;</p>
              <p>cout &lt;&lt; (now + pass) % 24; <span className="text-gray-400">// 输出 6</span></p>
            </div>
          </div>
        );
      case 9:
      case 10:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔢 高级技巧：数位拆解</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-2 ${activeSection === 9 ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}>
                <h4 className="font-bold mb-2">Part 1: 取个位</h4>
                <code className="text-xl bg-white px-2 rounded">n % 10</code>
                <p className="text-sm mt-2 text-gray-600">任何数除以 10，余数就是最后一位。</p>
              </div>
              <div className={`p-4 rounded-lg border-2 ${activeSection === 10 ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}>
                <h4 className="font-bold mb-2">Part 2: 扔个位</h4>
                <code className="text-xl bg-white px-2 rounded">n / 10</code>
                <p className="text-sm mt-2 text-gray-600">整数除法切掉小数（也就是切掉个位）。</p>
              </div>
            </div>
            <DigitSplitter />
          </div>
        );
      case 11:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🏆 综合练习：倒序输出三位数</h2>
            <p className="mb-4">挑战：输入 352，输出 2 5 3。</p>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-xl font-mono text-sm shadow-xl leading-relaxed">
              <div><span className="text-purple-400">int</span> n = <span className="text-yellow-400">352</span>;</div>
              <div className="text-gray-500">// 第一步：取出个位 2</div>
              <div>cout &lt;&lt; n <span className="text-red-400">% 10</span> &lt;&lt; <span className="text-green-300">" "</span>;</div>

              <div className="text-gray-500 mt-2">// 第二步：删掉个位，n 变成 35</div>
              <div>n = n <span className="text-blue-400">/ 10</span>;</div>

              <div className="text-gray-500 mt-2">// 第三步：取出新的个位 5</div>
              <div>cout &lt;&lt; n <span className="text-red-400">% 10</span> &lt;&lt; <span className="text-green-300">" "</span>;</div>

              <div className="text-gray-500 mt-2">// 第四步：删掉个位，n 变成 3</div>
              <div>n = n <span className="text-blue-400">/ 10</span>;</div>

              <div className="text-gray-500 mt-2">// 第五步：取出最后的数字 3</div>
              <div>cout &lt;&lt; n <span className="text-red-400">% 10</span>;</div>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🕵️ 侦探找茬：奇偶判断</h2>
            <div className="flex gap-6 items-start">
              <div className="flex-1">
                <p className="mb-4 text-lg">如何判断一个数 n 是奇数还是偶数？</p>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700">偶数 (Even)</h4>
                    <p>除以 2 余数为 0</p>
                    <code className="block mt-2 font-bold">n % 2 == 0</code>
                  </div>
                  <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-700">奇数 (Odd)</h4>
                    <p>除以 2 余数为 1</p>
                    <code className="block mt-2 font-bold">n % 2 == 1</code>
                  </div>
                </div>
              </div>
              <div className="w-1/3 bg-white p-4 rounded shadow text-center">
                <div className="text-6xl mb-2">🔦</div>
                <p className="text-sm text-gray-500">真题考点 (23-12-1-单-4)</p>
                <p className="font-bold text-purple-600 mt-2">N % 2 == 0</p>
              </div>
            </div>
          </div>
        );
      case 13:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📝 总结与作业</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-4 border-b pb-2">🧠 知识点回顾</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-blue-100 p-1 rounded">/</span>
                    <span>是砍尾巴（取商）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-red-100 p-1 rounded">%</span>
                    <span>是找剩下的（取余）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-yellow-100 p-1 rounded">()</span>
                    <span>优先级最高</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-4 border-b border-white/30 pb-2">🏠 课后任务</h3>
                <ol className="list-decimal list-inside space-y-3">
                  <li>
                    <span className="font-bold">计算器：</span>
                    <p className="text-sm opacity-90 pl-5">编写程序，输入两个整数 a 和 b，输出它们相除的商和余数。</p>
                  </li>
                  <li>
                    <span className="font-bold">时间旅行者：</span>
                    <p className="text-sm opacity-90 pl-5">输入现在的时刻（0-23）和经过的小时数，计算并输出结束的时刻。</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
                🔄 从头再来
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
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <Icon name="calculator" size={24} />
          GESP C++ 一级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2">
            <Icon name="calculator" size={24} />
            GESP C++ 一级
          </h1>
          <p className="text-xs text-gray-500 mt-1">第3课：余数的妙用</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2
                                ${activeSection === section.id
                  ? 'bg-blue-100 text-blue-800 font-bold shadow-sm ring-1 ring-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="opacity-70"><Icon name={section.icon} size={16} /></span>
              <span className="truncate">{section.title.split('：')[0]}</span>
            </button>
          ))}
        </nav>
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
            disabled={activeSection === sections.length}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition
                            ${activeSection === sections.length ? 'text-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}
          >
            下一步 <Icon name="arrow-right" size={16} color="white" />
          </button>
        </footer>
      </div>
    </div>
  );
}