import React, { useState, useEffect } from 'react';
import {
  Cookie,
  Repeat,
  Scissors,
  AlertOctagon,
  Terminal,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Play,
  RotateCcw,
  Zap,
  Ghost,
  Menu,
  X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "cookie": <Cookie size={size} color={color} />,
    "repeat": <Repeat size={size} color={color} />,
    "calculator": <Calculator size={size} color={color} />, // Add calculator icon
    "scissors": <Scissors size={size} color={color} />,
    "stop": <AlertOctagon size={size} color={color} />,
    "terminal": <Terminal size={size} color={color} />,
    "book": <BookOpen size={size} color={color} />,
    "check": <CheckCircle2 size={size} color={color} />,
    "x": <XCircle size={size} color={color} />,
    "arrow": <ArrowRight size={size} color={color} />,
    "help": <HelpCircle size={size} color={color} />,
    "play": <Play size={size} color={color} />,
    "reset": <RotateCcw size={size} color={color} />,
    "zap": <Zap size={size} color={color} />,
    "ghost": <Ghost size={size} color={color} />
  };
  return icons[name] || null;
};

// --- 章节数据 ---
const sections = [
  { id: 1, title: "课程导入：吃不完的饼干", icon: "cookie" },
  { id: 2, title: "语法解密：守门员 while", icon: "repeat" },
  { id: 9, title: "深度剖析：流程图解", icon: "arrow" }, // New Section
  { id: 3, title: "核心技能：数位分离术", icon: "scissors" },
  { id: 10, title: "常见套路：累加器", icon: "calculator" }, // New Section
  { id: 4, title: "危险警报：死循环", icon: "stop" },
  { id: 5, title: "实战：贪吃蛇数数", icon: "ghost" },
  { id: 6, title: "实战：带刹车的循环", icon: "zap" },
  { id: 7, title: "对比：For vs While", icon: "help" },
  { id: 8, title: "总结与作业", icon: "check" }
];

// --- 互动组件 1：吃饼干模拟器 (While 概念) ---
const CookieJar = () => {
  const [cookies, setCookies] = useState(5);
  const [message, setMessage] = useState("袋子里有饼干吗？");

  const eatCookie = () => {
    if (cookies > 0) {
      setCookies(c => c - 1);
      setMessage("😋 吃掉一块！真香！");
    } else {
      setMessage("🚫 没啦！停止吃！");
    }
  };

  const reset = () => {
    setCookies(Math.floor(Math.random() * 5) + 3); // Random 3-7 cookies
    setMessage("老师又给了一些饼干！");
  };

  return (
    <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 my-4 shadow-sm">
      <h3 className="font-bold text-lg text-orange-700 mb-4 flex items-center gap-2">
        <Cookie className="text-orange-500" /> 情景模拟：吃饼干
      </h3>

      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg border border-orange-100 w-full mb-4 text-center min-h-[100px] flex flex-col justify-center">
          <div className="text-4xl mb-2 flex justify-center gap-1 flex-wrap">
            {cookies > 0
              ? Array(cookies).fill("🍪").map((c, i) => <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>)
              : <span className="text-gray-300 text-sm">(空空如也)</span>
            }
          </div>
          <p className="font-bold text-gray-700">{message}</p>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm w-full mb-4">
          <div><span className="text-purple-400">while</span> ( <span className={cookies > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>饼干 &gt; 0</span> ) &#123;</div>
          <div className="pl-4">吃饼干();</div>
          <div>&#125;</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={eatCookie}
            disabled={cookies === 0}
            className={`px-6 py-2 rounded-full font-bold shadow-md transition-all flex items-center gap-2
              ${cookies > 0 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {cookies > 0 ? "👄 吃一块" : "🤐 没得吃了"}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-300 flex items-center gap-1"
          >
            <RotateCcw size={16} /> 再来一袋
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 互动组件 2：数位分离流水线 ---
const DigitSplitter = () => {
  const [num, setNum] = useState(123);
  const [originalNum, setOriginalNum] = useState(123);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const step = () => {
    if (num > 0) {
      const digit = num % 10;
      const newNum = Math.floor(num / 10);
      setLogs(prev => [...prev, `🔍 还有 ${num} > 0，切掉 ${digit}，剩 ${newNum}，计数+1`]);
      setNum(newNum);
      setCount(c => c + 1);
    } else {
      setLogs(prev => [...prev, `🛑 ${num} 不大于 0，循环结束！总共 ${count} 位。`]);
      setIsRunning(false);
    }
  };

  const reset = () => {
    const newN = Math.floor(Math.random() * 9000) + 1000;
    setNum(newN);
    setOriginalNum(newN);
    setCount(0);
    setLogs([]);
    setIsRunning(true);
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200 my-4">
      <h3 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
        <Scissors className="text-indigo-600" /> 贪吃蛇数位切切乐
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">当前数字 n</span>
              <span className="font-mono text-2xl font-bold text-indigo-600">{num}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(num / originalNum) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <span className="text-gray-500 text-sm">计数器 count</span>
            <span className="font-mono text-2xl font-bold text-green-600">{count}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={step}
              disabled={num === 0}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ✂️ 切掉一位 (n/10)
            </button>
            <button onClick={reset} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <RotateCcw size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs h-48 overflow-y-auto shadow-inner">
          <div className="text-gray-500 mb-2">// 运行日志</div>
          {logs.length === 0 ? <span className="opacity-50">准备就绪...</span> : logs.map((log, i) => (
            <div key={i} className="mb-1 border-b border-gray-800 pb-1">{log}</div>
          ))}
          {num === 0 && count > 0 && <div className="text-yellow-400 mt-2 font-bold">🎉 任务完成！</div>}
        </div>
      </div>
    </div>
  );
};

// --- 互动组件 3：死循环演示 ---
const InfiniteLoopDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [hasBreak, setHasBreak] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(c => c + 1);
      }, 50); // Fast loop
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && hasBreak && count >= 20) {
      setIsRunning(false);
    }
  }, [count, hasBreak, isRunning]);

  const toggleRun = () => {
    if (!isRunning) {
      setCount(0);
      setIsRunning(true);
    } else {
      setIsRunning(false); // Manual stop
    }
  };

  return (
    <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200 my-4">
      <h3 className="font-bold text-lg text-red-700 mb-4 flex items-center gap-2">
        <AlertOctagon className="text-red-600" /> 危险警报：死循环实验
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded border shadow-sm">
          <input
            type="checkbox"
            checked={hasBreak}
            onChange={(e) => setHasBreak(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
          <span className={hasBreak ? "text-green-700 font-bold" : "text-gray-500"}>
            {hasBreak ? "✅ 已安装刹车 (break)" : "❌ 未安装刹车"}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm">
          <div><span className="text-purple-400">while</span> ( <span className="text-yellow-400">1</span> ) &#123;</div>
          <div className="pl-4 text-gray-400">// 1 永远为真</div>
          {hasBreak && <div className="pl-4 text-green-400 font-bold">if (count &gt;= 20) break;</div>}
          <div className="pl-4">count++;</div>
          <div className="pl-4">cout &lt;&lt; "停不下来！";</div>
          <div>&#125;</div>
        </div>

        <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg border border-red-100">
          <div className={`text-5xl font-mono font-bold mb-2 ${isRunning ? 'text-red-600' : 'text-gray-400'}`}>
            {count}
          </div>
          <div className="text-sm text-gray-500 mb-4">{isRunning ? "🔥 CPU 发烫中..." : "🛑 程序已停止"}</div>

          <button
            onClick={toggleRun}
            className={`w-full py-2 rounded-lg font-bold transition-all ${isRunning ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            {isRunning ? "💥 强制停止 (Task Manager)" : "🚀 运行代码"}
          </button>

          {isRunning && !hasBreak && (
            <p className="text-xs text-red-500 mt-2 animate-pulse">警报：没有终止条件！必须强制停止！</p>
          )}
          {!isRunning && hasBreak && count >= 20 && (
            <p className="text-xs text-green-600 mt-2 font-bold">安全着陆：触发 break 自动停止。</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 互动组件 4：实战 1 找茬 ---
const BugFixer = () => {
  const [fixed, setFixed] = useState(false);
  const [nVal, setNVal] = useState(123);
  const [output, setOutput] = useState("");

  const runCode = () => {
    let N = nVal;
    let N0 = nVal;
    let rc = 0;

    // Simulate loop
    while (N > 0) {
      rc++;
      N = Math.floor(N / 10);
    }

    // Output based on fixed state
    if (fixed) {
      setOutput(`${N0}是${rc}位整数`);
    } else {
      setOutput(`${N}是${rc}位整数`); // Bug: N is 0
    }
  };

  return (
    <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 my-4">
      <h3 className="font-bold text-lg text-yellow-800 mb-4 flex items-center gap-2">
        <Ghost className="text-yellow-600" /> 实战演练 1：贪吃蛇数数
      </h3>
      <div className="bg-gray-100 text-xs text-gray-500 mb-2 px-2 py-1 rounded inline-block font-mono">2024年9月 GESP 一级真题 第13题</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 text-white p-4 rounded-lg font-mono text-sm relative">
          <div>int N, N0, rc=0;</div>
          <div>cin &gt;&gt; N;</div>
          <div>N0 = N; <span className="text-gray-500">// 备份</span></div>
          <div>while (N) &#123;</div>
          <div className="pl-4">rc++;</div>
          <div className="pl-4">N /= 10;</div>
          <div>&#125;</div>
          <div className={`mt-2 p-1 rounded transition-colors ${fixed ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
            printf("%d是%d位整数\n", <span className="font-bold text-yellow-300">{fixed ? "N0" : "N"}</span>, rc);
          </div>
          {!fixed && <div className="absolute right-2 bottom-16 text-red-400 text-xs">👈 这里的 N 变成 0 了！</div>}
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-2 font-bold text-gray-700">控制台模拟：</div>
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={nVal}
                onChange={(e) => setNVal(parseInt(e.target.value) || 0)}
                className="border rounded px-2 py-1 w-24"
              />
              <button onClick={runCode} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">运行</button>
            </div>
            <div className="bg-black text-gray-100 p-2 rounded min-h-[40px] font-mono">
              {output && <span>&gt; {output}</span>}
            </div>
            {!fixed && output && output.startsWith("0") && (
              <div className="text-red-500 text-xs mt-2 font-bold">❌ 逻辑错误：原来的数字去哪了？</div>
            )}
            {fixed && output && (
              <div className="text-green-500 text-xs mt-2 font-bold">✅ 逻辑正确：使用了备份变量 N0。</div>
            )}
          </div>

          <button
            onClick={() => { setFixed(!fixed); setOutput(""); }}
            className={`py-2 rounded-lg font-bold border-2 transition-all ${fixed ? 'border-gray-300 text-gray-500 bg-gray-100' : 'border-green-500 text-green-600 bg-green-50 hover:bg-green-100'}`}
          >
            {fixed ? "🔄 还原错误代码" : "🛠️ 修复 Bug (使用 N0)"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 题目组件 ---
const Quiz = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
            onClick={() => { setSelected(idx); setShowExplanation(true); }}
            className={`p-4 text-left rounded-lg border-2 transition-all flex justify-between items-center group
              ${selected === null ? 'border-gray-100 hover:border-purple-300 hover:bg-purple-50' : ''}
              ${selected === idx && idx === correctIndex ? 'border-green-500 bg-green-50' : ''}
              ${selected === idx && idx !== correctIndex ? 'border-red-500 bg-red-50' : ''}
              ${selected !== null && idx === correctIndex ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : ''}
            `}
          >
            <span className="font-bold text-gray-700">{opt}</span>
            {selected === idx && idx === correctIndex && <CheckCircle2 className="text-green-600" size={20} />}
            {selected === idx && idx !== correctIndex && <XCircle className="text-red-600" size={20} />}
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

// --- 互动组件 5：流程图可视化 (Flowchart) ---
const FlowchartVisualizer = () => {
  const [step, setStep] = useState('start'); // start, condition, body, end
  const [n, setN] = useState(3);
  const [loopCount, setLoopCount] = useState(0);

  const nextStep = () => {
    if (step === 'start') {
      setStep('condition');
    } else if (step === 'condition') {
      if (n > 0) {
        setStep('body');
      } else {
        setStep('end');
      }
    } else if (step === 'body') {
      setN(prev => prev - 1);
      setLoopCount(prev => prev + 1);
      setStep('condition');
    } else if (step === 'end') {
      setN(3);
      setLoopCount(0);
      setStep('start');
    }
  };

  const getNodeColor = (nodeName) => {
    if (step === nodeName) return "bg-orange-500 text-white shadow-lg scale-105 border-orange-600";
    return "bg-white text-gray-600 border-gray-200";
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 my-6 shadow-sm">
      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
        <Icon name="repeat" className="text-orange-500" /> while 循环流程解剖
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Flowchart Diagram */}
        <div className="flex flex-col items-center gap-4 relative">
          {/* Start Node */}
          <div className={`px-6 py-2 rounded-full border-2 font-mono transition-all duration-300 ${getNodeColor('start')}`}>
            开始 (n={3})
          </div>
          <ArrowRight className="rotate-90 text-gray-300" />

          {/* Condition Node */}
          <div className={`px-6 py-4 transform rotate-0 rounded-lg border-2 border-dashed font-mono transition-all duration-300 relative ${getNodeColor('condition')}`}>
            <span className="relative z-10">n &gt; 0 ?</span>
            {/* Diamond Shape fake via CSS or just box */}
            {step === 'condition' && (
              <div className="absolute top-1/2 -right-12 text-xs font-bold text-green-500 whitespace-nowrap">
                {n > 0 ? "True (真) ✅" : "False (假) ❌"}
              </div>
            )}
          </div>

          <div className="flex w-full justify-between px-4 relative h-16">
            {/* Arrow to Body (True) */}
            <div className="absolute left-1/2 top-0 h-8 w-0.5 bg-gray-300 -translate-x-1/2"></div>
            <div className="absolute left-1/2 top-8 w-full border-t-2 border-gray-300 -translate-x-1/2 hidden"></div> {/* Complex lines hard in pure css, keeping simple vertical */}
          </div>

          {/* Body Node */}
          <div className={`px-8 py-3 rounded-lg border-2 font-mono transition-all duration-300 ${getNodeColor('body')}`}>
            print(n);<br />
            n--;
          </div>

          <ArrowRight className="rotate-90 text-gray-300" />

          {/* Loop Back Line (Abstracted) */}
          {step === 'body' && (
            <div className="absolute right-[-20px] top-[100px] h-24 w-12 border-r-2 border-b-2 border-t-2 border-gray-300 rounded-r-lg" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}>
              {/* Decorative loop back inference */}
              <div className="text-xs text-gray-400 absolute top-1/2 -right-12 rotate-90">回到判断</div>
            </div>
          )}


          {/* End Node */}
          <div className={`mt-4 px-6 py-2 rounded-full border-2 font-mono transition-all duration-300 ${getNodeColor('end')}`}>
            结束
          </div>
        </div>

        {/* State Panel */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full md:w-64 flex flex-col gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Current Var</div>
            <div className="text-4xl font-bold text-indigo-600 font-mono">n = {n}</div>
          </div>
          <div className="text-center border-t border-gray-200 pt-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Loop Count</div>
            <div className="text-2xl font-bold text-gray-700 font-mono">{loopCount} 次</div>
          </div>
          <button
            onClick={nextStep}
            className={`mt-2 py-2 px-4 rounded-lg font-bold text-white transition-all shadow-md flex items-center justify-center gap-2
                        ${step === 'end' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {step === 'end' ? <RotateCcw size={18} /> : <Play size={18} />}
            {step === 'end' ? '重置演示' : '下一步'}
          </button>
          <p className="text-xs text-gray-400 text-center">点击下一步跟踪执行循序</p>
        </div>
      </div>
    </div>
  );
};

// --- 互动组件 6：累加器演示 (SumAccumulator) ---
const SumAccumulator = () => {
  const [i, setI] = useState(1);
  const [sum, setSum] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const target = 5;

  const step = () => {
    if (i <= target) {
      setSum(prev => prev + i);
      setI(prev => prev + 1);
      if (i === target) setIsFinished(true);
    }
  };

  const reset = () => {
    setI(1);
    setSum(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 my-6 shadow-sm">
      <h3 className="font-bold text-lg text-green-800 mb-6 flex items-center gap-2">
        <Calculator size={24} className="text-green-600" /> 累加器模式：1 加到 5
      </h3>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Code Block */}
        <div className="flex-1 bg-gray-900 mx-auto text-gray-100 p-4 rounded-lg font-mono text-sm leading-8 shadow-inner">
          <div className="opacity-50">int i = 1;</div>
          <div className="opacity-50">int sum = 0;</div>
          <div className="text-purple-400 font-bold">while (i &lt;= 5) &#123;</div>
          <div className={`pl-4 transition-colors ${!isFinished && i <= target ? 'bg-gray-800 text-yellow-300' : ''}`}>
            sum = sum + i; <span className="text-gray-500 text-xs">// 收集 i</span>
          </div>
          <div className={`pl-4 transition-colors ${!isFinished && i <= target ? 'text-blue-300' : ''}`}>
            i++; <span className="text-gray-500 text-xs">// 下一个数字</span>
          </div>
          <div className="text-purple-400 font-bold">&#125;</div>
        </div>

        {/* Visualizer */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-end gap-2 h-40 border-b-2 border-gray-300 pb-2 px-4 relative bg-white/50 rounded-t-lg">
            {/* Sum Bar */}
            <div className="w-16 bg-blue-500 rounded-t-lg transition-all duration-500 relative flex items-center justify-center text-white font-bold shadow-lg"
              style={{ height: `${(sum / 15) * 100}%` }}>
              <span className="drop-shadow-md">{sum}</span>
              <div className="absolute -bottom-8 text-gray-600 text-sm font-bold">Sum</div>
            </div>

            {/* Current I */}
            {!isFinished && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="text-xs text-gray-500 mb-1">准备加入</div>
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold shadow-md border-2 border-yellow-200">
                  +{i}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
            <div className="font-mono text-sm">
              <span className="text-gray-500">当前公式：</span>
              <span className="font-bold text-gray-800">{sum} + {i} = {sum + i}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={step}
              disabled={isFinished}
              className="flex-1 bg-green-600 text-white rounded-lg py-2 font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              {isFinished ? "计算完成" : "🏃 执行一步"}
            </button>
            <button onClick={reset} className="px-4 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-600 transition">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 主应用 ---
function App() {
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
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center text-center">
              <Cookie size={64} className="mb-4 text-yellow-100 drop-shadow-lg" />
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">GESP C++ 一级 第10课</h2>
              <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">while 循环</h1>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
                <span className="font-bold tracking-wide">🐍 副标题：贪吃蛇的数字大餐</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <ArrowRight className="text-orange-500" /> 教学目标
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-2"><Repeat size={18} className="text-blue-500" /> 掌握 <code>while</code> 循环的运行机制。</li>
                <li className="flex items-center gap-2"><Scissors size={18} className="text-indigo-500" /> 学会“数位分离”的核心技巧。</li>
                <li className="flex items-center gap-2"><HelpCircle size={18} className="text-green-500" /> 区分 <code>for</code> 和 <code>while</code> 的使用场景。</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Repeat className="text-orange-500" size={32} /> 语法解密：守门员 while
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                <code>for</code> 循环像一个定好的闹钟，跑几圈一开始就知道。
                而 <code>while</code> 就像吃饼干，不知道袋子里有几块，只有个规则：<strong className="text-orange-600">只要还有，就继续吃。</strong>
              </p>
              <CookieJar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 text-white p-6 rounded-xl font-mono">
                <div className="text-gray-500 mb-2">// 咒语格式</div>
                <div><span className="text-purple-400">while</span> ( 条件 ) &#123;</div>
                <div className="pl-4 text-green-400">// 只要条件是真的</div>
                <div className="pl-4 text-green-400">// 就一直做这里的事</div>
                <div className="pl-4 text-yellow-400">// 做完回到门口再问一次</div>
                <div>&#125;</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl flex flex-col justify-center border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-2">执行流程：</h4>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li className="flex items-center gap-2">1️⃣ 问：条件成立吗？</li>
                  <li className="flex items-center gap-2">✅ 真 (True) &rarr; 进门干活 &rarr; 回到第1步。</li>
                  <li className="flex items-center gap-2">❌ 假 (False) &rarr; 转身离开（跳出循环）。</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Scissors className="text-indigo-500" size={32} /> 核心技能：数位分离术
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <p className="text-lg text-gray-600">
                如果不知道一个数字有几位（比如 123 还是 12345），怎么拆开它？
                <br />
                <span className="font-bold text-indigo-600">贪吃蛇吃法：</span> 只要还有得吃 (n &gt; 0)，就咬掉最后一位 (n / 10)。
              </p>
            </div>
            <DigitSplitter />
          </div>
        );
      case 4:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <AlertOctagon className="text-red-500" size={32} /> 危险警报：死循环
            </h2>
            <InfiniteLoopDemo />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                <h4 className="font-bold text-red-700 mb-2">现象</h4>
                <p className="text-sm text-gray-600">程序一直跑，停不下来，电脑卡死，风扇狂转。</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                <h4 className="font-bold text-green-700 mb-2">解决办法</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  <li>循环体内让条件发生变化（比如 n 变小）。</li>
                  <li>使用 <code>break</code> 强制刹车。</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">👻 实战演练 1：贪吃蛇数数</h2>
            <BugFixer />
          </div>
        );
      case 6:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">⚡ 实战演练 2：带刹车的循环</h2>
            <div className="bg-gray-100 text-xs text-gray-500 mb-2 px-2 py-1 rounded inline-block font-mono">2023年12月 GESP 一级真题 第7题</div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
              <pre className="font-mono text-sm bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                {`N = 10; cnt = 0;
while (1) {
    if (N == 0) break; // 刹车！
    cnt += 1;
    N -= 2;
}
cout << cnt;`}
              </pre>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>人脑模拟：</strong></p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">10 &rarr; 8</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">8 &rarr; 6</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">6 &rarr; 4</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">4 &rarr; 2</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">2 &rarr; 0</span>
                </div>
                <p className="mt-2 text-red-500 font-bold">当 N=0 时，触发 break，循环结束。</p>
              </div>
            </div>

            <Quiz
              question="程序最后输出的 cnt 是多少？"
              options={["4", "5", "6", "死循环"]}
              correctIndex={1}
              explanation={`
                一共减了 5 次 (10, 8, 6, 4, 2 分别进一次循环)。
                当 N 变为 0 时，遇到 if (N==0) break，直接跳出循环，不再执行 cnt+=1。
                所以 cnt 是 5。
              `}
            />
          </div>
        );
      case 9: // Flowchart Section
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <ArrowRight className="text-blue-500" size={32} /> 深度剖析：循环的骨架
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                代码不仅是字符，更是<strong className="text-indigo-600">流动的逻辑</strong>。让我们透过 X 光，看看 while 循环内部的骨架是如何连接的。
              </p>
              <FlowchartVisualizer />
            </div>
          </div>
        );
      case 10: // Accumulator Section
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Calculator className="text-green-500" size={32} /> 常见套路：累加器
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-green-600">累加器</strong>是编程中最常用的模式之一。就像存钱罐，每次往里丢一个硬币，总额就会增加。
              </p>
              <p className="text-gray-500 text-sm mb-4">场景：计算 1+2+3+...+100，或者计算全班同学的总分。</p>
              <SumAccumulator />
            </div>
          </div>
        );
      case 7:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">⚖️ For vs While：该选谁？</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-500 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center gap-2">
                  <Repeat size={24} /> for 循环
                </h3>
                <div className="text-4xl mb-4 text-center">⏰</div>
                <p className="font-bold text-gray-700 text-center mb-2">像定好闹钟</p>
                <p className="text-sm text-gray-600 text-center">
                  适用：明确知道要重复多少次（比如：由 1 数到 100，跑 10 圈）。
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-t-4 border-orange-500 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-xl text-orange-800 mb-4 flex items-center gap-2">
                  <Zap size={24} /> while 循环
                </h3>
                <div className="text-4xl mb-4 text-center">👀</div>
                <p className="font-bold text-gray-700 text-center mb-2">像看情况办事</p>
                <p className="text-sm text-gray-600 text-center">
                  适用：不知道次数，只知道停止条件（比如：数位分离、直到输入-1停止）。
                </p>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="slide-enter">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                  <CheckCircle2 size={20} /> 记忆口诀
                </h3>
                <ul className="space-y-3 text-gray-700 font-medium leading-relaxed">
                  <li>while 循环看条件，</li>
                  <li>为真进门以此练。</li>
                  <li>步长更新别忘记，</li>
                  <li>否则死循环两行泪。</li>
                </ul>
                <div className="mt-4 bg-indigo-50 p-3 rounded text-sm text-indigo-800 font-bold text-center">
                  必背技能：while (n) &#123; n /= 10; &#125; 用来拆解整数。
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Terminal size={24} /> 课后作业：数字拆解大师
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <p className="font-bold text-sm mb-1">1. 上机挑战</p>
                    <p className="text-xs opacity-90">编写程序输入一个整数（如 12345）。利用 while 循环计算各位数字之和。</p>
                    <p className="text-xs opacity-70 mt-1 font-mono">提示：n % 10 取个位，n / 10 删个位。</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                    <p className="font-bold text-sm mb-1">2. 思考题</p>
                    <p className="text-xs opacity-90">尝试用 for 循环改写今天的真题2（N 从 10 减到 0）。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm flex items-center gap-2 mx-auto">
                <RotateCcw size={18} /> 重新开始学习
              </button>
            </div>
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-gray-900">
      <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <Icon name="cookie" className="text-orange-500" />
          <span>第10课：while循环</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto transition-transform duration-300 shadow-lg md:shadow-none
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100 bg-orange-50/50 hidden md:block">
          <h1 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <Icon name="cookie" className="text-orange-500" />
            GESP C++ 一级
          </h1>
          <p className="text-sm text-gray-500 mt-2">第10课：while 循环</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 font-medium
                ${activeSection === section.id
                  ? 'bg-orange-100 text-orange-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <i className={`p-1 rounded ${activeSection === section.id ? 'bg-white/50' : 'bg-gray-100'}`}>
                <Icon name={section.icon} size={16} />
              </i>
              {section.title}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 text-xs text-center text-gray-400">
          逻辑一号老师 © 2024
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative pt-16 md:pt-0">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>

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
            disabled={activeSection === sections.length}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm
              ${activeSection === sections.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md hover:-translate-y-0.5'}`}
          >
            下一步 <ArrowRight size={18} color="white" />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;