import React, { useState, useEffect } from 'react';
import {
  Monitor, Keyboard, Mouse, Mic, Camera, Speaker, Printer,
  Cpu, Save, FileText, Terminal, CheckCircle, XCircle,
  Brain, BookOpen, User, ChevronDown, ChevronRight,
  RefreshCw, Coffee, HardDrive, AppWindow, Calculator,
  AlertTriangle, ArrowRight, Sparkles, Layout, X, Menu
} from 'lucide-react';

// --- 辅助组件 (保留原 Lesson1 的核心交互组件) ---

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "user": <User size={size} className={className} />,
    "keyboard": <Keyboard size={size} className={className} />,
    "check-circle": <CheckCircle size={size} className={className} />,
    "book-open": <BookOpen size={size} className={className} />,
    "app-window": <AppWindow size={size} className={className} />,
    "coffee": <Coffee size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "sparkles": <Sparkles size={size} className={className} />,
    "alert-triangle": <AlertTriangle size={size} className={className} />,
    "calculator": <Calculator size={size} className={className} />,
    "save": <Save size={size} className={className} />,
    "layout": <Layout size={size} className={className} />
  };
  return icons[name] || null;
};

const DeviceItem = ({ icon, name, desc }) => (
  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all hover:-translate-y-1 hover:shadow-md">
    <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">{icon}</div>
    <div>
      <div className="font-bold text-slate-800 text-sm">{name}</div>
      <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
    </div>
  </div>
);

const CodePart = ({ text, color, tooltip }) => (
  <div className="relative group cursor-help inline-block mx-1">
    <span className={`${color} font-bold hover:bg-slate-200 px-1.5 py-0.5 rounded transition-colors border-b-2 border-transparent hover:border-slate-300`}>{text}</span>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl z-20 text-center pointer-events-none animate-in fade-in zoom-in duration-200">
      {tooltip}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
    </div>
  </div>
);

const QuizCard = ({ year, question, options, hint }) => {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <TrophyIcon size={14} className="text-yellow-500" /> GESP 真题挑战
        </span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{year}</span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-6 leading-relaxed">{question}</h3>
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={`
                p-4 rounded-lg border-2 text-left transition-all relative
                ${selected === null
                  ? 'border-slate-100 hover:border-blue-400 hover:bg-blue-50'
                  : opt.id === selected?.id
                    ? (opt.isCorrect ? 'border-green-500 bg-green-50 ring-2 ring-green-200 ring-offset-1' : 'border-red-500 bg-red-50 ring-2 ring-red-200 ring-offset-1')
                    : (opt.isCorrect ? 'border-green-500 bg-green-50 opacity-100' : 'border-slate-100 opacity-50')
                }
              `}
            >
              <span className="font-bold mr-2 w-6 inline-block">{opt.id}.</span> {opt.text}
              {selected && opt.isCorrect && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 w-5 h-5" />}
              {selected?.id === opt.id && !opt.isCorrect && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />}
            </button>
          ))}
        </div>

        {selected && (
          <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2 ${selected.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {selected.isCorrect ? (
              <>
                <CheckCircle className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-lg">回答正确！🎉</p>
                  <p className="text-sm mt-1 opacity-90">你真是个小天才！</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-lg">哎呀，答错了。</p>
                  <p className="text-sm mt-1 opacity-90">别灰心，看看解析再试一次！</p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            {showHint ? '🙈 隐藏解析' : '💡 看不懂？点我看解析'}
          </button>
          {showHint && (
            <p className="mt-3 text-sm text-blue-700 bg-blue-50 p-4 rounded-xl animate-in fade-in leading-relaxed border border-blue-100">
              {hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// 简单的 Trophy 图标组件，用于 QuizCard
const TrophyIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// --- Slide 组件 (将原 Sections 拆分) ---

// 1. 热身
const WarmupSlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-3xl w-full">
      <div className="flex justify-center gap-8 mb-8 text-7xl animate-bounce">
        <span>👽</span> <span className="text-slate-200 text-4xl self-center">vs</span> <span>🤖</span>
      </div>
      <h3 className="text-3xl font-extrabold mb-8 text-slate-800">大家觉得计算机像不像人？</h3>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:scale-105 transition-transform hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="text-blue-600" size={24} />
            <span className="font-bold text-lg text-blue-900">大脑</span>
          </div>
          <p className="text-slate-600 leading-relaxed">人有大脑思考，电脑有 <strong className="text-blue-600 bg-blue-100 px-1 rounded">CPU</strong>。</p>
        </div>
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 hover:scale-105 transition-transform hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive className="text-yellow-600" size={24} />
            <span className="font-bold text-lg text-yellow-900">肚子</span>
          </div>
          <p className="text-slate-600 leading-relaxed">人有肚子装饭，电脑有 <strong className="text-yellow-600 bg-yellow-100 px-1 rounded">硬盘/内存</strong>。</p>
        </div>
        <div className="bg-green-50 p-5 rounded-xl border border-green-100 hover:scale-105 transition-transform hover:shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Speaker className="text-green-600" size={24} />
            <span className="font-bold text-lg text-green-900">嘴巴</span>
          </div>
          <p className="text-slate-600 leading-relaxed">人会说话，电脑有 <strong className="text-green-600 bg-green-100 px-1 rounded">音箱/屏幕</strong>。</p>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100">
        <p className="text-xl font-bold text-indigo-600 mb-4 flex items-center justify-center gap-2">
          <Sparkles className="text-indigo-500" /> 今天的任务：
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center text-slate-600">
          <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">1. 像医生一样解剖计算机，看看它的“五脏六腑”。</div>
          <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">2. 像魔法师一样，教它说出第一句人话。</div>
        </div>
      </div>
    </div>
  </div>
);

// 2. 输入输出
const IOSlide = () => (
  <div className="grid md:grid-cols-2 gap-8 h-full items-start">
    {/* Input */}
    <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-blue-200">
        <div className="bg-white p-3 rounded-full shadow-sm text-2xl">📥</div>
        <div>
          <h3 className="text-2xl font-bold text-blue-900">输入 (Input)</h3>
          <p className="text-blue-600 text-sm font-medium">计算机“吃”东西</p>
        </div>
      </div>
      <p className="text-slate-600 mb-6">就像你的眼睛看书、耳朵听歌，把外界的信息传给大脑。</p>
      <div className="grid grid-cols-1 gap-3">
        <DeviceItem icon={<Keyboard size={20} />} name="键盘" desc="敲字给它看" />
        <DeviceItem icon={<Mouse size={20} />} name="鼠标" desc="指挥它往哪走" />
        <DeviceItem icon={<Mic size={20} />} name="麦克风" desc="对它喊话" />
        <DeviceItem icon={<Camera size={20} />} name="摄像头" desc="让它看见你" />
      </div>
    </div>

    {/* Output */}
    <div className="bg-green-50 p-8 rounded-2xl border border-green-100 h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-200">
        <div className="bg-white p-3 rounded-full shadow-sm text-2xl">📤</div>
        <div>
          <h3 className="text-2xl font-bold text-green-900">输出 (Output)</h3>
          <p className="text-green-600 text-sm font-medium">计算机“吐”东西</p>
        </div>
      </div>
      <p className="text-slate-600 mb-6">就像你的嘴巴说话、手写作业，把处理好的结果展示出来。</p>
      <div className="grid grid-cols-1 gap-3">
        <DeviceItem icon={<Monitor size={20} />} name="显示器" desc="把画给你看" />
        <DeviceItem icon={<Speaker size={20} />} name="音箱" desc="唱歌给你听" />
        <DeviceItem icon={<Printer size={20} />} name="打印机" desc="把卷子印出来" />
      </div>
    </div>
  </div>
);

// 3. 真题闯关 (谁是卧底)
const QuizSpySlide = () => (
  <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">
    <div className="text-center mb-4">
      <h3 className="text-2xl font-bold text-slate-800">🕵️‍♀️ 侦探时间</h3>
      <p className="text-slate-500">分辨清楚谁是“输入”谁是“输出”，别被卧底骗了！</p>
    </div>

    <QuizCard
      year="2024年6月 GESP 一级"
      question="以下不属于计算机输出设备的有（ ）。"
      options={[
        { id: 'A', text: '麦克风 (Microphone)', isCorrect: true },
        { id: 'B', text: '音箱 (Speaker)' },
        { id: 'C', text: '打印机 (Printer)' },
        { id: 'D', text: '显示器 (Monitor)' }
      ]}
      hint="解析：音箱、打印机、显示器都是把信息“送出来”给你看或听的。只有麦克风是你对着它“送进去”声音的。"
    />

    <QuizCard
      year="2023年3月 GESP 一级"
      question="以下不属于计算机输入设备的有（ ）。"
      options={[
        { id: 'A', text: '键盘 (Keyboard)' },
        { id: 'B', text: '音箱 (Speaker)', isCorrect: true },
        { id: 'C', text: '鼠标 (Mouse)' },
        { id: 'D', text: '传感器 (Sensor)' }
      ]}
      hint="解析：键盘、鼠标、传感器都是给电脑发信号的。音箱是电脑发声音给你的。"
    />
  </div>
);

// 4. 计算机家谱
const HistorySlide = () => (
  <div className="grid md:grid-cols-2 gap-8 h-full items-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform inline-block">🦖</div>
      <h3 className="text-2xl font-bold mb-2 text-slate-800">第一台电子计算机：ENIAC</h3>
      <div className="text-xs bg-slate-100 inline-block px-3 py-1 rounded-full text-slate-500 mb-6 font-medium">1946年 · 美国</div>
      <ul className="text-base space-y-4 text-slate-600 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          <span><strong>身材：</strong>一间教室那么大，重30吨！</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          <span><strong>肚子里的秘密：</strong>用了18000个<strong className="text-red-500 bg-red-50 px-1 rounded">电子管</strong>（像大灯泡）。</span>
        </li>
      </ul>
      <div className="p-4 bg-red-50 text-red-900 text-sm rounded-xl border border-red-100">
        <strong className="block mb-1 text-red-700">📌 必考点 (24-6-1-单-15)：</strong>
        ENIAC的主要部件由什么组成？👉 <strong>电子管</strong>
      </div>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform inline-block">👴</div>
      <h3 className="text-2xl font-bold mb-2 text-slate-800">现代计算机之父：冯·诺依曼</h3>
      <div className="text-xs bg-slate-100 inline-block px-3 py-1 rounded-full text-slate-500 mb-6 font-medium">John von Neumann</div>
      <ul className="text-base space-y-4 text-slate-600 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          <span><strong>贡献：</strong>制定了“五大件”标准（运算器、控制器、存储器、输入、输出）。</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-500 mt-1">•</span>
          <span><strong>规则：</strong>程序和数据都要存在电脑的“肚子”（存储器）里。</span>
        </li>
      </ul>
      <div className="p-4 bg-blue-50 text-blue-900 text-sm rounded-xl border border-blue-100">
        <strong className="block mb-1 text-blue-700">📌 必考点 (23-12-1-单-15)：</strong>
        现代计算机基于什么体系结构？👉 <strong>冯·诺依曼</strong>
      </div>
    </div>
  </div>
);

// 5. 操作系统
const OSSlide = () => (
  <div className="flex flex-col gap-8 items-center justify-center h-full">
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 w-full max-w-4xl">
      <h3 className="font-bold text-xl mb-8 text-center text-slate-700 flex items-center justify-center gap-2">
        🏠 计算机的“房子比喻法”
      </h3>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 text-center">
        <div className="flex-1 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
          <div className="text-5xl mb-4">🏗️</div>
          <div className="font-bold text-slate-800 text-lg">硬件</div>
          <div className="text-sm text-slate-500 mt-2">房子本体</div>
        </div>
        <div className="hidden md:flex items-center text-slate-300">
          <ArrowRight size={32} />
        </div>
        <div className="flex-1 p-6 bg-cyan-50 rounded-xl border-2 border-cyan-200 transform md:scale-110 shadow-lg z-10">
          <div className="text-5xl mb-4">🤵</div>
          <div className="font-bold text-cyan-900 text-lg">操作系统 (OS)</div>
          <div className="text-sm text-cyan-700 mt-2 font-medium">大管家 (管理水电)</div>
        </div>
        <div className="hidden md:flex items-center text-slate-300">
          <ArrowRight size={32} />
        </div>
        <div className="flex-1 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
          <div className="text-5xl mb-4">🎮</div>
          <div className="font-bold text-slate-800 text-lg">应用软件 (App)</div>
          <div className="text-sm text-slate-500 mt-2">租客 (微信/游戏)</div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 w-full max-w-4xl">
      <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2 text-lg">
        <AppWindow className="text-indigo-600" /> 常见的管家 (操作系统)
      </h4>
      <div className="flex flex-wrap gap-3 mb-6">
        {['Windows', 'macOS', 'Linux', 'Android', 'iOS', '鸿蒙 (HarmonyOS)'].map(os => (
          <span key={os} className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm border border-indigo-100 hover:scale-105 transition-transform cursor-default">
            {os}
          </span>
        ))}
      </div>
      <div className="p-4 bg-white text-slate-700 text-sm rounded-xl border border-indigo-200 flex items-start gap-3 shadow-sm">
        <span className="text-red-500 font-bold flex-shrink-0 bg-red-50 px-2 py-0.5 rounded text-xs mt-0.5">考点</span>
        <span className="leading-relaxed">
          下列软件中是操作系统的是？ 👉 <strong>纯血鸿蒙</strong> <br />
          (像高德地图、腾讯会议、Word 都是租客 App，不是管家)。
        </span>
      </div>
    </div>
  </div>
);

// 6. 课间休息
const BreakSlide = () => (
  <div className="h-full flex flex-col justify-center items-center">
    <div className="bg-green-100 p-10 rounded-full mb-8 animate-pulse shadow-lg ring-8 ring-green-50">
      <Coffee size={80} className="text-green-600" />
    </div>
    <h2 className="text-4xl font-extrabold text-slate-800 mb-4">课间休息 (10 min)</h2>
    <p className="text-slate-500 mb-12 text-lg">休息眼睛，动动手指，喝口水吧！</p>

    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-md w-full hover:shadow-xl transition-shadow">
      <h3 className="font-bold text-center mb-6 text-slate-800 text-xl">🤔 思考题</h3>
      <p className="text-center text-slate-600 text-lg mb-8">洗衣机里有计算机吗？</p>
      <div className="text-center">
        <button
          className="px-6 py-2 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-500 rounded-full text-sm font-bold transition-all"
          onClick={(e) => {
            const btn = e.target;
            btn.textContent = '答案：有！这种专门藏在机器里的计算机叫做“嵌入式系统”。';
            btn.classList.add('bg-green-100', 'text-green-800');
            btn.classList.remove('bg-slate-100', 'hover:bg-blue-100', 'hover:text-blue-700');
          }}
        >
          👉 点击看答案
        </button>
      </div>
    </div>
  </div>
);

// 7. 魔法工坊（结构）
const StructureSlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-slate-900 text-white p-8 rounded-2xl font-mono text-base md:text-lg leading-loose shadow-2xl border-4 border-slate-700 w-full max-w-3xl overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-slate-400 text-xs font-sans">magic_spell.cpp</span>
      </div>

      <div className="mt-8 space-y-1">
        <div className="mb-6 text-slate-500 italic font-sans text-sm border-l-2 border-slate-700 pl-3">
          // 这是一个最简单的 C++ 魔法框架，鼠标悬停查看解释
        </div>

        <div className="group hover:bg-white/10 p-2 rounded transition-colors -mx-2 cursor-help">
          <span className="text-purple-400 font-bold">#include</span> <span className="text-orange-300">&lt;iostream&gt;</span>
          <span className="text-green-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-sans tracking-wide">
            ← 1. 召唤工具箱
          </span>
        </div>

        <div className="group hover:bg-white/10 p-2 rounded transition-colors -mx-2 cursor-help">
          <span className="text-purple-400 font-bold">using</span> <span className="text-blue-400">namespace</span> std;
          <span className="text-green-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-sans tracking-wide">
            ← 2. 打开工具箱盖子
          </span>
        </div>

        <div className="py-2"></div>

        <div className="group hover:bg-white/10 p-2 rounded transition-colors -mx-2 cursor-help">
          <span className="text-blue-400 font-bold">int</span> <span className="text-yellow-400 font-bold">main</span>() {'{'}
          <span className="text-green-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-sans tracking-wide">
            ← 3. 魔法主入口（大门）
          </span>
        </div>

        <div className="pl-8 py-6 text-slate-500 italic">
             // 在这里写你的咒语...
        </div>

        <div className="group hover:bg-white/10 p-2 rounded transition-colors -mx-2 pl-8 cursor-help">
          <span className="text-purple-400 font-bold">return</span> <span className="text-green-300 font-bold">0</span>;
          <span className="text-green-400 ml-4 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-sans tracking-wide">
            ← 4. 结束任务，汇报成功
          </span>
        </div>

        <div className="group hover:bg-white/10 p-2 rounded transition-colors -mx-2">{'}'}</div>
      </div>
    </div>
    <p className="mt-6 text-center text-slate-500 flex items-center gap-2 animate-bounce">
      <Mouse size={16} /> 把鼠标移到代码行上，查看每一行的作用！
    </p>
  </div>
);

// 8. Hello World
const HelloWorldSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-10">
    <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xl w-full max-w-4xl text-center">
      <h3 className="font-bold text-2xl mb-8 text-slate-800">核心咒语拆解</h3>

      <div className="flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-4xl font-mono bg-slate-50 p-8 rounded-xl border-2 border-slate-100 mb-8">
        <CodePart text="cout" color="text-yellow-600" tooltip="C-Out (看-奥特): 控制台输出，我要说话！" />
        <CodePart text="<<" color="text-pink-600" tooltip="传送带: 方向向左！把字送到屏幕里。" />
        <CodePart text={'"Hello"'} color="text-green-600" tooltip='双引号: 字符串的帽子。想原样打印必须戴上。' />
        <CodePart text=";" color="text-slate-600" tooltip="分号: 句号。每句话说完必须加！" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-red-50 p-5 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
          <div className="font-bold text-red-700 mb-3 flex items-center gap-2"><XCircle size={16} /> 错误 1</div>
          <code className="font-mono bg-white px-2 py-1 rounded border border-red-200 block mb-2 text-center text-lg">
            cout <span className="bg-red-200 text-red-800 font-bold px-1 rounded">&gt;&gt;</span> "Hi";
          </code>
          <div className="text-xs text-red-600 font-medium">箭头反了！要把字吸进去吗？</div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
          <div className="font-bold text-red-700 mb-3 flex items-center gap-2"><XCircle size={16} /> 错误 2</div>
          <code className="font-mono bg-white px-2 py-1 rounded border border-red-200 block mb-2 text-center text-lg">
            cout &lt;&lt; "Hi"
          </code>
          <div className="text-xs text-red-600 font-medium">没加分号，计算机会憋死。</div>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
          <div className="font-bold text-red-700 mb-3 flex items-center gap-2"><XCircle size={16} /> 错误 3</div>
          <code className="font-mono bg-white px-2 py-1 rounded border border-red-200 block mb-2 text-center text-lg">
            cout &lt;&lt; <span className="bg-red-200 text-red-800 font-bold px-1 rounded">'Hi'</span>;
          </code>
          <div className="text-xs text-red-600 font-medium">单引号只能包一个字。</div>
        </div>
      </div>
    </div>
  </div>
);

// 9. 侦探找茬
const DebugSlide = () => (
  <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto w-full">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
        <AlertTriangle className="text-orange-500" /> 真题侦探社
      </h3>
      <p className="text-slate-500 mt-2">C++ 里除了 cout，还有一位老前辈...</p>
    </div>

    <QuizCard
      year="2024年12月 GESP 一级"
      question={`有关下列 C++ 代码的说法，正确的是：printf("Hello,GESP!");`}
      options={[
        { id: 'A', text: '配对双引号内，不可以有汉字' },
        { id: 'B', text: '配对双引号可以相应改变为英文单引号而输出效果不变' },
        { id: 'C', text: 'C++ 中 printf 也是合法的输出方式', isCorrect: true },
        { id: 'D', text: '配对双引号可以相应改变为三个连续英文双引号' }
      ]}
      hint="解析：1. 双引号里想写什么都行，汉字也可以！A错。2. C++里单引号是给单个字符用的，'Hello'是错的！B错。3. Python才用三个引号。D错。"
    />

    <div className="w-full bg-orange-50 border border-orange-200 rounded-xl p-5 flex items-start gap-4">
      <div className="bg-orange-100 p-2 rounded-lg">
        <BookOpen className="text-orange-600" size={20} />
      </div>
      <div>
        <h4 className="font-bold text-orange-900 mb-1">冷知识：printf</h4>
        <p className="text-sm text-orange-800 leading-relaxed">
          虽然我们主要学 <code>cout</code>，但 <code>printf</code> 是 C 语言留下的老前辈，在 C++ 里完全通用！有时候它比 cout 更快哦。
        </p>
      </div>
    </div>
  </div>
);

// 10. 数学计算
const MathSlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-8 max-w-3xl mx-auto w-full">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">任务：计算 12 减 3 乘 2</h3>
        <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-3xl text-center shadow-inner">
          cout &lt;&lt; 12 - 3 * 2;
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 text-slate-600 py-4">
        <div className="text-center transform scale-125">
          <div className="font-bold text-4xl text-green-600 mb-2">6</div>
          <div className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">先乘除</div>
        </div>
        <div className="text-3xl font-bold text-slate-300">vs</div>
        <div className="text-center opacity-50 grayscale">
          <div className="font-bold text-4xl text-slate-800 mb-2 line-through decoration-red-500">18</div>
          <div className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">先加减 (错)</div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
          <Calculator size={18} /> 🔥 烧脑真题 (24-12-1-单-4)
        </h4>
        <p className="mb-4 text-base font-medium text-slate-800">表达式 <code>12 - 3 * 2 && 2</code> 的值是？</p>
        <ol className="list-none space-y-3 text-sm text-slate-700">
          <li className="flex gap-3 bg-white p-3 rounded-lg border border-blue-100">
            <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
            <span><strong>优先级：</strong>算术 &gt; 逻辑。先算 <code>3*2=6</code>，再算 <code>12-6=6</code>。</span>
          </li>
          <li className="flex gap-3 bg-white p-3 rounded-lg border border-blue-100">
            <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
            <span><strong>简化：</strong>表达式变成了 <code>6 && 2</code>。</span>
          </li>
          <li className="flex gap-3 bg-white p-3 rounded-lg border border-blue-100">
            <span className="bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
            <span><strong>判定：</strong>C++里，非0即为真。6是真，2也是真。真且真 = <strong>1 (True)</strong>。</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

// 11. 总结
const SummarySlide = () => (
  <div className="max-w-4xl mx-auto w-full h-full flex flex-col justify-center">
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Save size={120} className="text-yellow-600" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 relative z-10">
        <p className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="bg-yellow-400 text-white p-2 rounded-lg"><Save size={24} /></span>
          🔑 今日口诀
        </p>
        <ul className="space-y-4 text-slate-700 text-lg">
          <li className="flex items-start gap-4">
            <span className="bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded text-sm mt-1">1</span>
            <span>键盘鼠标是输入，屏幕音箱是输出。</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded text-sm mt-1">2</span>
            <span>冯·诺依曼定规矩，电子管造了ENIAC。</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded text-sm mt-1">3</span>
            <span className="leading-relaxed">
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono font-bold">cout</code> 跟着左箭头
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono font-bold">&lt;&lt;</code>，
              双引号里写文字，分号结尾别忘记。
            </span>
          </li>
        </ul>
      </div>

      <div className="relative z-10">
        <strong className="text-xl block mb-6 text-yellow-900 flex items-center gap-2">
          <Layout size={20} /> 课后任务
        </strong>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-start gap-4 p-4 bg-white/60 rounded-xl border border-yellow-100 cursor-pointer hover:bg-white transition-colors">
            <input type="checkbox" className="w-6 h-6 accent-yellow-600 mt-1 shrink-0" />
            <div>
              <strong className="text-yellow-900 block mb-1">小小打字员</strong>
              <p className="text-sm text-yellow-800 opacity-80">在 Dev-C++ 里敲出 Hello World，并把 "Hello, world!" 改成 "Hello, [你的名字]!"。</p>
            </div>
          </label>
          <label className="flex items-start gap-4 p-4 bg-white/60 rounded-xl border border-yellow-100 cursor-pointer hover:bg-white transition-colors">
            <input type="checkbox" className="w-6 h-6 accent-yellow-600 mt-1 shrink-0" />
            <div>
              <strong className="text-yellow-900 block mb-1">生活观察员</strong>
              <p className="text-sm text-yellow-800 opacity-80">回家找找家里的智能设备（扫地机器人、智能音箱），想一想它们的输入设备是什么？输出设备是什么？</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

// --- 章节数据配置 ---
const sections = [
  { id: 1, title: '热身：外星生物？', icon: "user", component: WarmupSlide },
  { id: 2, title: '计算机的眼耳口鼻', icon: "keyboard", component: IOSlide },
  { id: 3, title: "真题：谁是卧底？", icon: "check-circle", component: QuizSpySlide },
  { id: 4, title: "计算机家谱", icon: "book-open", component: HistorySlide },
  { id: 5, title: "谁是管家？操作系统", icon: "app-window", component: OSSlide },
  { id: 6, title: "课间休息", icon: "coffee", component: BreakSlide },
  { id: 7, title: "魔法工坊：咒语结构", icon: "terminal", component: StructureSlide },
  { id: 8, title: "实战：Hello World", icon: "sparkles", component: HelloWorldSlide },
  { id: 9, title: "侦探找茬：代码纠错", icon: "alert-triangle", component: DebugSlide },
  { id: 10, title: "进阶挑战：数学计算", icon: "calculator", component: MathSlide },
  { id: 11, title: "总结与作业", icon: "save", component: SummarySlide }
];

// --- 主组件 ---
const Lesson1 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 获取当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || (() => <div className="p-10">内容建设中...</div>);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-blue-700 flex items-center gap-2">
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
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg flex-shrink-0 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white">
          <h1 className="text-lg font-bold flex items-center gap-2 text-blue-700">
            <span className="bg-blue-600 text-white p-1 rounded">C++</span>
            <span>一级趣味课堂</span>
          </h1>
          <p className="text-xs text-blue-400 mt-2 font-medium pl-1">第 1 课：你好，计算机 🤖</p>
        </div>

        <div className="flex-1 overflow-y-auto w-full py-2 custom-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-5 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group relative
                ${activeSection === section.id
                  ? 'bg-blue-100 text-blue-800 font-bold shadow-sm ring-1 ring-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <div className={`
                p-1.5 rounded-lg transition-colors flex-shrink-0
                ${activeSection === section.id ? 'bg-white text-blue-500 shadow-sm' : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600'}
              `}>
                <Icon name={section.icon} size={16} />
              </div>
              <span className="truncate text-sm font-medium">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-center text-slate-400 bg-slate-50">
          <p>GESP C++ 培优课程</p>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative pt-16 md:pt-0">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Icon name={sections.find(s => s.id === activeSection)?.icon} size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 truncate">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveSection(Math.max(1, activeSection - 1))}
              disabled={activeSection === 1}
              className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1"
            >
              <ChevronDown className="rotate-90" size={16} /> 上一节
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
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 custom-scrollbar">
          <div className="max-w-5xl mx-auto h-full flex flex-col">
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ActiveComponent />
            </div>
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
      `}</style>
    </div>
  );
};

export default Lesson1;