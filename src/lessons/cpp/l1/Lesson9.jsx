import React, { useState, useEffect } from 'react';
import {
  Bot,
  Play,
  Pause,
  RotateCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Terminal,
  BookOpen,
  ArrowRight,
  Footprints,
  Calculator,
  Timer,
  Hash
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { CodeTracer, MasteryCheck, PredictCheck } from '../CppLessonShell';
import CodeSnippet from '../CodeSnippet';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "bot": <Bot size={size} className={className} />,
    "play": <Play size={size} className={className} />,
    "pause": <Pause size={size} className={className} />,
    "rotate": <RotateCw size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />,
    "arrow": <ArrowRight size={size} className={className} />,
    "foot": <Footprints size={size} className={className} />,
    "calc": <Calculator size={size} className={className} />,
    "timer": <Timer size={size} className={className} />,
    "hash": <Hash size={size} className={className} />
  };
  return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：超级跑圈机器人", icon: "bot", category: "循环奥秘" },
  { id: 2, title: "情景：体育课噩梦", icon: "foot", category: "循环奥秘" },
  { id: 3, title: "语法：代码咒语", icon: "book", category: "循环奥秘" },
  { id: 4, title: "流程：手指舞模拟", icon: "rotate", category: "循环奥秘" },
  { id: 5, title: "实战：简单的计数器", icon: "hash", category: "实战与难点" },
  { id: 6, title: "实战：谁是大陷阱？", icon: "alert", category: "实战与难点" },
  { id: 7, title: "难点：循环结束那一刻", icon: "calc", category: "实战与难点" },
  { id: 8, title: "避坑指南", icon: "x", category: "避坑与总结" },
  { id: 9, title: "总结与作业", icon: "book", category: "避坑与总结" },
  { id: 10, title: "离开前检查", icon: "check", category: "避坑与总结" }
];

// --- 互动组件：无限跑圈机器人 ---
const RunawayRobot = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState(0);
  const [energy, setEnergy] = useState(100);

  useEffect(() => {
    let interval;
    if (isRunning && energy > 0) {
      interval = setInterval(() => {
        setLaps(l => l + 1);
        setEnergy(e => Math.max(0, e - 2));
      }, 200);
    } else if (energy === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, energy]);

  const reset = () => {
    setIsRunning(false);
    setLaps(0);
    setEnergy(100);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border-4 border-slate-600 my-4 text-white">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-cyan-400">
        <Bot /> 傻瓜机器人测试
      </h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsRunning(true)}
          disabled={energy === 0 || isRunning}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Play size={16} /> 指令：跑！
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-bold"
        >
          <Pause size={16} /> 强制断电
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded font-bold"
        >
          <RotateCw size={16} /> 重置
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-lg text-center">
          <div className="text-gray-400 text-xs uppercase mb-1">Total Laps</div>
          <div className="text-4xl font-mono font-bold text-yellow-400">{laps}</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-lg text-center">
          <div className="text-gray-400 text-xs uppercase mb-1">Battery Level</div>
          <div className={`text-4xl font-mono font-bold ${energy < 20 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
            {energy}%
          </div>
        </div>
      </div>

      {isRunning && (
        <div className="mt-4 p-2 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm text-center animate-pulse">
          ⚠️ 警告：没有停止指令！死循环中！撞墙预警！
        </div>
      )}

      {!isRunning && energy === 0 && (
        <div className="mt-4 p-2 bg-gray-700 rounded text-gray-300 text-sm text-center">
          🪫 机器人没电了... 它终于停下了。
        </div>
      )}
    </div>
  );
};

// --- 互动组件：For 循环步进器 ---
const LoopStepper = () => {
  const [i, setI] = useState(1);
  const [step, setStep] = useState(0); // 0: Init, 1: Check, 2: Body, 3: Update, 4: Done
  const [logs, setLogs] = useState([]);

  const limit = 3;

  const nextStep = () => {
    if (step === 0) { // After Init
      setStep(1); // Go to Check
    } else if (step === 1) { // After Check
      if (i <= limit) {
        setStep(2); // Go to Body
      } else {
        setStep(4); // Done
        setLogs(prev => [...prev, `🛑 判断 ${i} <= ${limit} 为假，循环结束`]);
      }
    } else if (step === 2) { // After Body
      setLogs(prev => [...prev, `🏃 跑第 ${i} 圈`]);
      setStep(3); // Go to Update
    } else if (step === 3) { // After Update
      setI(prev => prev + 1);
      setStep(1); // Go back to Check
    }
  };

  const reset = () => {
    setI(1);
    setStep(0);
    setLogs([]);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 my-4">
      <h3 className="font-bold text-lg text-blue-700 mb-4 flex items-center gap-2">
        <RotateCw size={20} /> 慢动作回放：手指舞模拟
      </h3>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border font-mono text-sm">
        <div><span className="text-purple-600">for</span> ( <span className={step === 0 ? "bg-yellow-200 font-bold px-1" : ""}>int i = 1</span>; <span className={step === 1 ? "bg-yellow-200 font-bold px-1" : ""}>i &lt;= 3</span>; <span className={step === 3 ? "bg-yellow-200 font-bold px-1" : ""}>i++</span> ) &#123;</div>
        <div className={`pl-4 ${step === 2 ? "bg-green-100 font-bold" : "text-gray-500"}`}>cout &lt;&lt; "跑第" &lt;&lt; i &lt;&lt; "圈";</div>
        <div>&#125;</div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="text-blue-800 font-bold mr-2">变量 i:</span>
          <span className="font-mono text-2xl font-bold text-blue-600">{i}</span>
        </div>

        <div className="flex gap-2">
          {step < 4 ? (
            <button onClick={nextStep} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all">
              下一步 <ArrowRight size={16} className="inline ml-1" />
            </button>
          ) : (
            <button onClick={reset} className="px-6 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700">
              重置
            </button>
          )}
        </div>
      </div>

      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto shadow-inner">
        <div className="text-gray-500 mb-2">// 控制台输出</div>
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1 border-b border-gray-800 pb-1">{log}</div>
        ))}
        {step === 4 && <div className="text-red-400 mt-2 font-bold">程序结束。</div>}
      </div>
    </div>
  );
};

const trapCode = `int N = 0, i;
for (i = 1; i < 10; i++)
    N += 1;
cout << (N + i);`;

const trapTraceSteps = [
  {
    active: [0],
    vars: { N: 0, i: '未定' },
    action: '初始化 i = 1',
  },
  ...Array.from({ length: 9 }, (_, index) => {
    const i = index + 1;
    const beforeN = index;
    const afterN = index + 1;

    return [
      {
        active: [1],
        vars: { N: beforeN, i },
        row: [`判断 ${i}`, `${i} < 10`, '真', beforeN, '进入循环体'],
        action: `执行第 ${i} 轮`,
      },
      {
        active: [2],
        vars: { N: afterN, i },
        row: [`第 ${i} 轮`, `i = ${i}`, 'N += 1', afterN, i === 9 ? 'i++ 后变成 10' : `i++ 后变成 ${i + 1}`],
        action: i === 9 ? '检查退出条件' : '检查下一轮条件',
      },
    ];
  }).flat(),
  {
    active: [1],
    vars: { N: 9, i: 10 },
    exit: '再次判断 10 < 10 为假，循环结束。关键：此时 i 留在 10。',
    action: '计算输出',
  },
  {
    active: [3],
    vars: { N: 9, i: 10 },
    action: '显示最终结果',
    output: 'N + i = 9 + 10 = 19',
  },
];

// --- 互动组件：陷阱追踪器 ---
const TrapTracer = () => {
  return (
    <CodeTracer
      title="陷阱追踪器：循环结束时 i 到底是多少？"
      code={trapCode}
      varOrder={['N', 'i']}
      columns={['阶段', 'i', '动作', 'N', '结果']}
      steps={trapTraceSteps}
      hint="先别猜答案，逐步看每次判断和更新。"
    />
  );
};

const ForLoopPredictionChecks = () => (
  <div className="my-6 grid gap-4 lg:grid-cols-3">
    <PredictCheck
      prompt="for (int i = 1; i <= 3; i++) 会执行几次循环体？"
      options={['2 次', '3 次', '4 次']}
      correctIndex={1}
      explanation="i 会取 1、2、3 三个值。更新到 4 后，再判断 4 <= 3 为假，循环才结束。"
      misconception="只看到了更新后的 4，忘了循环体只在条件为真时执行。"
    />
    <PredictCheck
      prompt="for (i = 1; i < 10; i++) 结束后，i 停在几？"
      options={['9', '10', '不确定']}
      correctIndex={1}
      explanation="最后一次执行时 i = 9，执行完 i++ 变成 10；再次判断 10 < 10 为假，所以停在 10。"
      misconception="把最后一次执行的 i 值，当成循环结束后的 i 值。"
    />
    <PredictCheck
      prompt="for (int i = 0; i < 5; i++) 最后一次进入循环体时 i 是多少？"
      options={['4', '5', '6']}
      correctIndex={0}
      explanation="条件是 i < 5，所以 i = 0、1、2、3、4 都能进入；i = 5 时不能进入。"
      misconception="把循环结束时的 i = 5，当成最后一次执行时的 i。"
    />
  </div>
);

const forLoopMasteryItems = [
  {
    label: '能说清 for 循环三段分别负责什么。',
    evidence: '能把 int i = 1、i <= 3、i++ 分别说成起点、能否继续、跑完后更新。',
    retryHint: '回到“代码咒语”小节，把三段分别遮住再解释。',
  },
  {
    label: '能手推循环结束后 i 的值。',
    evidence: '能解释 i = 9 执行完会先 i++ 到 10，再因为 10 < 10 为假停下。',
    retryHint: '回到陷阱追踪器，不要跳过最后一次判断。',
  },
  {
    label: '能换一个边界重新判断循环次数。',
    evidence: '例如 i < 5 最后一次进入是 4，i <= 5 最后一次进入是 5。',
    retryHint: '把“最后一次进入”和“循环结束后”分成两列写。',
  },
  {
    label: '能判断什么时候该用 for 循环。',
    evidence: '知道“次数已经数得出来”（跑固定圈数）时，for 比 while 更顺手。',
    retryHint: '回到本课开头的任务，先问一句“我知道要跑几次吗”。',
  },
];

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
      <div className="font-bold text-lg mb-4 font-mono text-gray-800 whitespace-pre-wrap">{question}</div>
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
            <BookOpen size={16} className="text-purple-500" /> 侦探解析：
          </h4>
          <div className="whitespace-pre-line text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-300">{explanation}</div>
        </div>
      )}
    </div>
  );
};

// --- 主应用 ---
function App() {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return (
          <div className="slide-enter text-center">
            <div className="bg-gradient-to-br from-slate-800 to-cyan-900 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center border border-cyan-500/30">
              <Bot size={80} className="mb-6 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-bounce" />
              <h2 className="text-3xl font-extrabold mb-2 text-cyan-200 tracking-wider">GESP C++ 一级 第9课</h2>
              <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">for 循环</h1>
              <div className="bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-cyan-500/50">
                <span className="font-bold tracking-wide text-cyan-100">🏃‍♂️ 副标题：我是“超级跑圈机器人”</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">👨‍🏫 主讲人</h3>
                <p className="text-xl text-blue-600 font-bold">逻辑一号老师</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">🎯 教学目标</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>学会指挥电脑“重复做某事”。</li>
                  <li>掌握 <code>for</code> 循环的三大要素。</li>
                  <li>破解循环结束后的“变量尸体”之谜。</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Footprints className="text-orange-500" size={32} /> 情景导入：体育课噩梦
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                体育老师买了个“傻瓜机器人”替大家跑圈。
                但是，如果只给它一个指令 <strong className="text-red-600">“跑！”</strong>，会发生什么？
              </p>
              <RunawayRobot />
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 text-blue-800">
              <h4 className="font-bold mb-2 text-lg">🧠 关键三问 (缺一不可)：</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs">1</div> <strong>从哪开始？</strong> (第 1 圈)</li>
                <li className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs">2</div> <strong>何时停下？</strong> (跑完 10 圈)</li>
                <li className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-xs">3</div> <strong>怎么计数？</strong> (跑完一圈，计数器 +1)</li>
              </ul>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <BookOpen className="text-purple-500" size={32} /> 代码咒语：for 循环结构
            </h2>

            <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl font-mono text-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500"></div>

              <div className="mb-2 text-gray-500">// 语法格式</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-purple-400 font-bold">for</span>
                <span>(</span>
                <span className="text-blue-400 border-b-2 border-blue-400 pb-1">穿鞋</span>
                <span>;</span>
                <span className="text-yellow-400 border-b-2 border-yellow-400 pb-1">裁判检查</span>
                <span>;</span>
                <span className="text-green-400 border-b-2 border-green-400 pb-1">计分员</span>
                <span>) &#123;</span>
              </div>
              <div className="pl-8 my-2 text-gray-300">// 跑步动作</div>
              <div>&#125;</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="text-blue-600 font-bold mb-1 text-sm uppercase">Initialization</div>
                <div className="text-xl font-bold mb-2">1. 初始化</div>
                <code className="bg-white px-2 py-1 rounded border border-blue-200 text-blue-700 block text-center">int i = 1</code>
                <p className="text-sm text-gray-500 mt-2">站在起跑线，只执行一次。</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <div className="text-yellow-600 font-bold mb-1 text-sm uppercase">Condition</div>
                <div className="text-xl font-bold mb-2">2. 循环条件</div>
                <code className="bg-white px-2 py-1 rounded border border-yellow-200 text-yellow-700 block text-center">i &lt;= 10</code>
                <p className="text-sm text-gray-500 mt-2">裁判问：还没到10圈吗？满足才跑。</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="text-green-600 font-bold mb-1 text-sm uppercase">Update</div>
                <div className="text-xl font-bold mb-2">3. 更新步长</div>
                <code className="bg-white px-2 py-1 rounded border border-green-200 text-green-700 block text-center">i++</code>
                <p className="text-sm text-gray-500 mt-2">跑完打卡，i 变成 i+1。</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🔄 执行流程：手指舞模拟</h2>
            <p className="text-gray-600 mb-4">电脑执行 for 循环时，就像跳一支有规律的舞。让我们慢动作回放：</p>
            <LoopStepper />
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🛡️ 实战演练 1：简单的计数器</h2>
            <div className="bg-gray-100 text-xs text-gray-500 mb-2 px-2 py-1 rounded inline-block font-mono">2023年9月 GESP 一级真题 第10题</div>
            <Quiz
              question={`int cnt = 0;\nfor (int i = 1; i <= 5; i++) {\n    cnt = cnt + 1;\n}\ncout << cnt;`}
              options={["4", "5", "6", "0"]}
              correctIndex={1}
              explanation={`
                1. 变量 cnt 专门用来数数。
                2. 循环从 i=1 到 i=5，包含 1, 2, 3, 4, 5。
                3. 一共执行了 5 次。
                4. 每次 cnt 加 1，所以最后是 5。
              `}
            />
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">💣 实战演练 2：谁是大陷阱？</h2>
            <div className="bg-gray-100 text-xs text-gray-500 mb-2 px-2 py-1 rounded inline-block font-mono">2024年12月 GESP 一级真题 第8题</div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h4 className="font-bold text-orange-800 mb-2">题目代码：</h4>
              <CodeSnippet
                code={`int N = 0, i;
for (i = 1; i < 10; i++)
    N += 1;
cout << (N + i);`}
              />
              <div className="mt-2 text-sm text-orange-700 flex items-center gap-2">
                <AlertTriangle size={16} /> <strong>陷阱警报：</strong> 注意条件是 <code>i &lt; 10</code> (不包含10)，以及最后输出的是 <code>N + i</code>。
              </div>
            </div>

            <Quiz
              question="程序运行后，输出的结果是多少？"
              options={["18", "19", "20", "10"]}
              correctIndex={1}
              explanation={`
                1. 循环次数：i 从 1 到 9 (因为 i < 10)，共执行 9 次。所以 N = 9。
                2. 关键点：循环结束时，i 是多少？
                   - 当 i=9 时，满足条件，执行 N+=1，然后 i++ 变成 10。
                   - 再次判断 10 < 10 ? 假！循环结束。
                   - 此时 i 停留在 10。
                3. 计算：N(9) + i(10) = 19。
              `}
            />
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🧠 核心难点：循环结束那一刻</h2>
            <p className="text-gray-600 mb-4">
              很多同学以为循环写着 <code>i &lt; 10</code>，i 最大就是 9。
              <strong className="text-red-600">错！</strong> 为了打破循环，<code>i</code> 必须变成不满足条件的那个数。
            </p>
            <TrapTracer />
            <ForLoopPredictionChecks />
            <div className="mt-6 bg-slate-800 text-white p-4 rounded-lg text-center shadow-lg">
              <span className="font-bold text-yellow-400 text-xl block mb-1">结论</span>
              循环结束时，i 的值通常比最后一次执行的值 <span className="bg-white text-slate-900 px-1 rounded font-bold">大 1</span> (对于 i++ 来说)。
            </div>
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🚧 避坑指南</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full text-red-600 mt-1"><XCircle /></div>
                <div>
                  <h4 className="font-bold text-red-800 text-lg">坑 1：分号不能少</h4>
                  <p className="text-red-700 text-sm font-mono mt-1 bg-white inline-block px-2 py-1 rounded border border-red-200">
                    for(int i=1, i&lt;=10, i++) ❌
                  </p>
                  <p className="text-sm text-gray-600 mt-1">必须用分号 <code>;</code> 分隔，不能用逗号！</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500 flex items-start gap-4">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 mt-1"><AlertTriangle /></div>
                <div>
                  <h4 className="font-bold text-yellow-800 text-lg">坑 2：小于 vs 小于等于</h4>
                  <div className="flex gap-4 mt-2">
                    <div className="bg-white px-3 py-1 rounded border border-yellow-200 text-sm">
                      <code>i &lt; 10</code><br />
                      <span className="text-gray-500">跑 9 次 (1~9)</span>
                    </div>
                    <div className="bg-white px-3 py-1 rounded border border-yellow-200 text-sm">
                      <code>i &lt;= 10</code><br />
                      <span className="text-gray-500">跑 10 次 (1~10)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-xl border-l-4 border-slate-500 flex items-start gap-4">
                <div className="bg-slate-200 p-2 rounded-full text-slate-600 mt-1"><Bot /></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">坑 3：死循环</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    如果忘记写 <code>i++</code>，或者写成了 <code>i--</code>，机器人会跑到没电为止！
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen size={100} />
                </div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                  <CheckCircle2 size={20} /> 记忆口诀
                </h3>
                <ul className="space-y-3 text-gray-700 font-medium leading-relaxed">
                  <li>for 循环，三步走，</li>
                  <li>一初始化二判断，</li>
                  <li>成立进屋做任务，</li>
                  <li>出屋加一再回看。</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Terminal size={24} /> 课后作业
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <p className="font-bold text-sm mb-1">1. 上机验证</p>
                    <p className="text-xs opacity-80">输入真题2的代码，亲眼看看 i 最后是不是 10。</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <p className="font-bold text-sm mb-1">2. 思考题</p>
                    <p className="text-xs opacity-80 mb-2">如果把 <code>i++</code> 改成 <code>i += 2</code> (每次跨两步)：</p>
                    <code className="bg-black/30 px-2 py-1 rounded text-xs block">for (int i = 1; i &lt; 10; i += 2)</code>
                    <p className="text-xs opacity-80 mt-2">i 会变成哪些数字？最后停在几？</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        );
      case 10:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🏁 离开前检查</h2>
            <MasteryCheck
              title="C++ L1-9 for 循环离开前检查"
              description="如果只会背口诀，还不算过关。至少要能手推一次结束边界。"
              items={forLoopMasteryItems}
            />
            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm flex items-center gap-2 mx-auto">
                <RotateCw size={18} /> 重新开始学习
              </button>
            </div>
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
      lessonNumber={9}
      lessonTitle="for 循环"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/10"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={9} />}
      bottomSupport={<CppL1LessonSupport lessonId={9} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}

export default App;
