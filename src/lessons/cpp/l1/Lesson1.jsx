import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  Monitor, Keyboard, Mouse, Mic, Camera, Speaker, Printer, Activity,
  Cpu, HardDrive, Save, FileText, FileCode, Terminal, CheckCircle, XCircle,
  BookOpen, RefreshCw, AppWindow, Calculator, AlertTriangle, ArrowRight,
  Layout, Workflow, ClipboardList, Smartphone, Trophy, Lightbulb,
} from 'lucide-react';

const lesson1MasteryItems = [
  {
    label: '能区分输入设备和输出设备。',
    evidence: '能把键盘、鼠标、麦克风、传感器归为输入，把显示器、音箱、打印机归为输出，并说明触摸屏兼有两种功能。',
    retryHint: '回到“输入与输出设备”，按“信息进入计算机 / 从计算机送出”重新分类。',
  },
  {
    label: '能说出存储、处理部件和计算机简史考点。',
    evidence: '知道内存属于存储设备，能列出冯·诺依曼体系结构的五大部件，并知道 ENIAC 使用电子管。',
    retryHint: '回到“存储与处理”和“计算机简史考点”，把五大部件和 ENIAC 各写一句话，并附上真题出处。',
  },
  {
    label: '能区分硬件、操作系统和应用软件。',
    evidence: '知道鸿蒙、Windows 是操作系统；把源程序翻译成目标程序的是编译器，不是操作系统。',
    retryHint: '回到“硬件、软件与操作系统”，重做两道真题判断。',
  },
  {
    label: '能解释 C++ 最小程序结构。',
    evidence: '能指出 #include、main、cout、分号分别负责什么。',
    retryHint: '回到“程序结构拆解”，按从上到下的顺序复述每一行。',
  },
  {
    label: '能完成保存、编译和运行。',
    evidence: '能把源文件保存为 .cpp，先编译处理语法错误，再运行并核对实际输出。',
    retryHint: '回到“第一次运行”，按保存、编译、运行、核对输出的顺序再走一遍。',
  },
  {
    label: '能修正 Hello World 常见错误。',
    evidence: '能发现输出运算符写反、字符串引号不配对、漏写分号这三类问题。',
    retryHint: '回到“常见错误与真题”，先只检查 cout 这一行。',
  },
];

// --- 辅助组件 ---

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "workflow": <Workflow size={size} className={className} />,
    "keyboard": <Keyboard size={size} className={className} />,
    "check-circle": <CheckCircle size={size} className={className} />,
    "hard-drive": <HardDrive size={size} className={className} />,
    "book-open": <BookOpen size={size} className={className} />,
    "app-window": <AppWindow size={size} className={className} />,
    "file-code": <FileCode size={size} className={className} />,
    "layout": <Layout size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "alert-triangle": <AlertTriangle size={size} className={className} />,
    "calculator": <Calculator size={size} className={className} />,
    "clipboard": <ClipboardList size={size} className={className} />,
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

const SourceNote = ({ children }) => (
  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
    <strong className="mb-1 block text-amber-800">真题考点</strong>
    {children}
  </div>
);

// 作答后才显示解析；选项锁定，避免反复试选。
const QuizCard = ({ source, badge = '站内真题', question, options, explanation, mono = false }) => {
  const [selected, setSelected] = useState(null);
  const correctOption = options.find((opt) => opt.isCorrect);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-slate-600">
          <Trophy size={14} className="text-yellow-500" /> {badge}
        </span>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">{source}</span>
      </div>
      <div className="p-6">
        <h3 className="mb-6 whitespace-pre-line text-lg font-medium leading-relaxed text-slate-800">{question}</h3>
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => {
            const isChosen = selected?.id === opt.id;
            const stateClass = selected === null
              ? 'border-slate-200 hover:border-blue-400 hover:bg-blue-50'
              : isChosen
                ? (opt.isCorrect ? 'border-green-500 bg-green-50 ring-2 ring-green-200 ring-offset-1' : 'border-red-500 bg-red-50 ring-2 ring-red-200 ring-offset-1')
                : (opt.isCorrect ? 'border-green-500 bg-green-50' : 'border-slate-100 opacity-50');
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={isChosen}
                onClick={() => setSelected(opt)}
                disabled={selected !== null}
                className={`relative rounded-lg border-2 p-4 pr-12 text-left transition-all ${stateClass}`}
              >
                <span className="mr-2 inline-block w-6 font-bold">{opt.id}.</span>
                <span className={mono ? 'break-all font-mono text-sm' : ''}>{opt.text}</span>
                {selected && opt.isCorrect && <CheckCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />}
                {isChosen && !opt.isCorrect && <XCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />}
              </button>
            );
          })}
        </div>

        {selected && (
          <div role="status" className="mt-6 space-y-3">
            <div className={`flex items-start gap-3 rounded-xl p-4 ${selected.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selected.isCorrect ? <CheckCircle className="mt-0.5 shrink-0" /> : <XCircle className="mt-0.5 shrink-0" />}
              <p className="text-lg font-bold">{selected.isCorrect ? '回答正确' : `回答错误，正确答案是 ${correctOption?.id}`}</p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <Lightbulb size={16} className="mt-0.5 shrink-0 text-blue-600" />
              <p><strong>解析：</strong>{explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 章节内容 ---

// 1. 热身：人和计算机怎么交流
const WarmupSlide = () => {
  const stages = [
    { icon: <Keyboard size={22} />, name: '输入', detail: '键盘、鼠标、麦克风把信息送进计算机', tone: 'border-blue-200 bg-blue-50 text-blue-900' },
    { icon: <Cpu size={22} />, name: '处理', detail: 'CPU（运算器 + 控制器）按指令计算和控制', tone: 'border-slate-300 bg-white text-slate-900' },
    { icon: <HardDrive size={22} />, name: '存储', detail: '内存、硬盘保存程序和数据', tone: 'border-amber-200 bg-amber-50 text-amber-900' },
    { icon: <Monitor size={22} />, name: '输出', detail: '显示器、音箱、打印机把结果送出来', tone: 'border-green-200 bg-green-50 text-green-900' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-3xl w-full">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-slate-800">人和计算机怎么交流</h3>
          <p className="mt-3 text-slate-600">你在键盘上按下 A，屏幕上出现 A。这中间，信息依次经过下面四类部件。</p>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div className={`rounded-xl border p-4 transition-shadow hover:shadow-md ${stage.tone}`}>
                <div className="mb-2 flex items-center gap-2 text-lg font-bold">{stage.icon}{stage.name}</div>
                <p className="text-sm leading-relaxed">{stage.detail}</p>
              </div>
              {index < stages.length - 1 && (
                <div className="hidden items-center justify-center text-slate-300 md:flex">
                  <ArrowRight size={24} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="mb-4 text-center text-xl font-bold text-slate-800">本课两项任务</p>
          <ol className="grid gap-4 text-slate-700 md:grid-cols-2">
            <li className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">1</span>
              <span><strong>计算机基础考点：</strong>输入与输出设备、存储与处理、计算机简史、操作系统。每个考点都附站内一级真题出处。</span>
            </li>
            <li className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">2</span>
              <span><strong>第一个 C++ 程序：</strong>写出最小程序，完成保存—编译—运行—核对输出，并修正 Hello World 的常见错误。</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

// 2. 输入与输出设备
const IOSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white px-6 py-4 text-center text-slate-700 shadow-lg">
      <strong className="text-slate-900">判断方法：看信息流动的方向。</strong>
      从外部进入计算机的是<strong className="text-blue-700">输入设备</strong>；
      从计算机送到外部的是<strong className="text-green-700">输出设备</strong>。
    </div>

    <div className="grid md:grid-cols-2 gap-8 items-start w-full">
      <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-blue-200">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600"><Keyboard size={24} /></div>
          <div>
            <h3 className="text-2xl font-bold text-blue-900">输入设备 (Input)</h3>
            <p className="text-blue-700 text-sm font-medium">信息：外部 → 计算机</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <DeviceItem icon={<Keyboard size={20} />} name="键盘" desc="输入字符和命令" />
          <DeviceItem icon={<Mouse size={20} />} name="鼠标" desc="移动指针、点击选择" />
          <DeviceItem icon={<Mic size={20} />} name="麦克风" desc="采集声音" />
          <DeviceItem icon={<Camera size={20} />} name="摄像头" desc="采集图像" />
          <DeviceItem icon={<Activity size={20} />} name="传感器" desc="采集温度、姿态等环境信息" />
        </div>
      </div>

      <div className="bg-green-50 p-8 rounded-2xl border border-green-100 h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-200">
          <div className="bg-white p-3 rounded-full shadow-sm text-green-600"><Monitor size={24} /></div>
          <div>
            <h3 className="text-2xl font-bold text-green-900">输出设备 (Output)</h3>
            <p className="text-green-700 text-sm font-medium">信息：计算机 → 外部</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <DeviceItem icon={<Monitor size={20} />} name="显示器" desc="显示文字和图像" />
          <DeviceItem icon={<Speaker size={20} />} name="音箱" desc="播放声音" />
          <DeviceItem icon={<Printer size={20} />} name="打印机" desc="把内容印到纸上" />
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <Smartphone size={20} className="mt-0.5 shrink-0 text-slate-500" />
          <span><strong>两者兼有：</strong>触摸屏检测手指点按是输入，显示画面是输出，所以既是输入设备又是输出设备。</span>
        </div>
      </div>
    </div>
  </div>
);

// 3. 真题：输入输出设备
const IOQuizSlide = () => (
  <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto w-full">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：输入输出设备</h3>
      <p className="mt-1 text-slate-500">先用“信息流动方向”判断，再看解析核对理由。</p>
    </div>

    <QuizCard
      source="2023 年 6 月 GESP 一级第 1 题"
      question="以下不属于计算机输出设备的有（ ）。"
      options={[
        { id: 'A', text: '麦克风', isCorrect: true },
        { id: 'B', text: '打印机' },
        { id: 'C', text: '显示器' },
        { id: 'D', text: '音箱' },
      ]}
      explanation="打印机、显示器、音箱都把计算机里的信息送到外部，是输出设备；麦克风把声音送进计算机，是输入设备，所以不属于输出设备。"
    />

    <QuizCard
      source="2024 年 12 月 GESP 一级第 2 题"
      question="下列设备中，既是输入设备又是输出设备的是（ ）。"
      options={[
        { id: 'A', text: '键盘' },
        { id: 'B', text: '打印机' },
        { id: 'C', text: '触摸屏', isCorrect: true },
        { id: 'D', text: '扫描仪' },
      ]}
      explanation="触摸屏检测点按是输入，显示画面是输出。键盘和扫描仪只负责输入，打印机只负责输出。"
    />
  </div>
);

// 4. 存储与处理
const StorageSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid gap-8 md:grid-cols-2 w-full">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-blue-900">
          <span className="bg-white p-3 rounded-full shadow-sm"><Cpu className="text-blue-600" /></span> 处理：CPU
        </h3>
        <p className="mb-4 text-slate-700">CPU（中央处理器）主要由<strong>运算器</strong>和<strong>控制器</strong>组成。</p>
        <ul className="space-y-3 text-sm text-slate-700">
          <li className="rounded-xl border border-blue-100 bg-white p-3"><strong>运算器：</strong>完成算术运算和逻辑运算。</li>
          <li className="rounded-xl border border-blue-100 bg-white p-3"><strong>控制器：</strong>按程序的指令，协调各部件依次工作。</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold text-amber-900">
          <span className="bg-white p-3 rounded-full shadow-sm"><HardDrive className="text-amber-700" /></span> 存储：存储器
        </h3>
        <p className="mb-4 text-amber-950">存储器保存程序和数据。</p>
        <ul className="space-y-3 text-sm text-amber-950">
          <li className="rounded-xl border border-amber-100 bg-white p-3"><strong>内存：</strong>存放正在运行的程序和数据，读写快；断电后内容通常会丢失。</li>
          <li className="rounded-xl border border-amber-100 bg-white p-3"><strong>外存（硬盘、U 盘等）：</strong>长期保存文件，断电后不丢失。</li>
        </ul>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">冯·诺依曼体系结构的五大部件</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {['运算器', '控制器', '存储器', '输入设备', '输出设备'].map((part) => (
          <span key={part} className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-800 shadow-sm">{part}</span>
        ))}
      </div>
      <div className="mt-6">
        <SourceNote>
          2023 年 6 月一级判断题第 1 题：“计算机硬件主要包括运算器、控制器、存储器、输入设备和输出设备。” 答案：<strong>正确</strong>。
        </SourceNote>
      </div>
    </div>

    <QuizCard
      source="2023 年 9 月 GESP 一级第 1 题"
      question="我们通常说的“内存”属于计算机中的（ ）。"
      options={[
        { id: 'A', text: '输出设备' },
        { id: 'B', text: '输入设备' },
        { id: 'C', text: '存储设备', isCorrect: true },
        { id: 'D', text: '打印设备' },
      ]}
      explanation="内存用来暂存正在运行的程序和数据，属于存储设备。它既不负责把信息送进来，也不负责把结果送出去。下一课的变量，就保存在内存里。"
    />
  </div>
);

// 5. 计算机简史考点
const HistorySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid gap-8 md:grid-cols-2 w-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <h3 className="mb-2 text-2xl font-bold text-slate-800">ENIAC</h3>
        <div className="mb-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">1946 年投入运行 · 美国</div>
        <ul className="mb-5 space-y-2 text-slate-600">
          <li>• 主要部件由<strong className="text-slate-900">电子管</strong>组成。</li>
          <li>• 使用约 1.8 万个电子管，重约 30 吨。</li>
        </ul>
        <SourceNote>2024 年 6 月一级第 15 题：ENIAC 的主要部件都是由（ ）组成的。答案：<strong>电子管</strong>。</SourceNote>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <h3 className="mb-2 text-2xl font-bold text-slate-800">冯·诺依曼体系结构</h3>
        <div className="mb-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">John von Neumann</div>
        <ul className="mb-5 space-y-2 text-slate-600">
          <li>• <strong className="text-slate-900">存储程序：</strong>程序和数据都存放在存储器中，计算机按顺序取出指令执行。</li>
          <li>• 硬件由五大部件组成（见上一节）。</li>
        </ul>
        <SourceNote>2023 年 12 月一级第 15 题：典型的计算机体系结构采用的是（ ）。答案：<strong>冯·诺依曼架构</strong>。</SourceNote>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
      <h3 className="mb-6 text-center text-xl font-bold text-indigo-900">四代计算机的主要电子元件</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['第一代', '电子管'],
          ['第二代', '晶体管'],
          ['第三代', '集成电路'],
          ['第四代', '大规模和超大规模集成电路'],
        ].map(([generation, part]) => (
          <div key={generation} className="flex flex-col items-center justify-center rounded-xl border border-indigo-100 bg-white p-4 text-center shadow-sm">
            <span className="text-xs font-medium text-slate-600">{generation}</span>
            <span className="mt-1 font-bold text-slate-800">{part}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-indigo-950">
        出处：2023 年 3 月一级第 2 题（第 2 代计算机主要使用 → 晶体管）。另：2023 年 6 月一级判断题第 2 题考 “103 机是中国第一台通用数字电子计算机，ENIAC 诞生于 1946 年”，答案为正确。
      </p>
    </div>
  </div>
);

// 6. 硬件、软件与操作系统
const OSSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-8 text-center text-xl font-bold text-slate-700">三层关系：上层依赖下层</h3>
      <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100">
          <div className="text-lg font-bold text-slate-800">应用软件</div>
          <div className="mt-1 text-sm text-slate-600">浏览器、办公软件、游戏等，完成具体任务。</div>
        </div>
        <div className="relative z-10 rounded-xl border-2 border-cyan-200 bg-cyan-50 p-5 shadow-lg md:scale-105">
          <div className="text-lg font-bold text-cyan-900">操作系统 (OS)</div>
          <div className="mt-1 text-sm font-medium text-cyan-800">管理 CPU、内存、文件和设备，加载并运行程序，提供操作界面。</div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100">
          <div className="text-lg font-bold text-slate-800">硬件</div>
          <div className="mt-1 text-sm text-slate-600">CPU、内存、硬盘、键盘、显示器等实际部件。</div>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {['Windows', 'macOS', 'Linux', 'Android', 'iOS', '鸿蒙 (HarmonyOS)'].map(os => (
          <span key={os} className="rounded-lg border border-cyan-100 bg-white px-4 py-2 text-sm font-bold text-cyan-800 shadow-sm">{os}</span>
        ))}
      </div>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP 一级第 14 题"
      question="小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是？（ ）"
      options={[
        { id: 'A', text: '小程序' },
        { id: 'B', text: '计时器' },
        { id: 'C', text: '操作系统', isCorrect: true },
        { id: 'D', text: '神话人物' },
      ]}
      explanation="鸿蒙（HarmonyOS）是华为开发的操作系统，和 Windows、Android 属于同一类软件。"
    />

    <QuizCard
      source="2025 年 12 月 GESP 一级判断题第 1 题"
      question="鸿蒙是华为公司开发的一款操作系统，那么它能够将正确的源程序翻译成目标程序，并运行。"
      options={[
        { id: 'A', text: '正确' },
        { id: 'B', text: '错误', isCorrect: true },
      ]}
      explanation="把源程序翻译成目标程序是编译器的工作；操作系统负责加载并运行已经编译好的程序。这正是下面“第一次运行”里“编译”这一步。"
    />
  </div>
);

// 7. 第一个程序
const helloProgram = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, GESP!" << endl;
    return 0;
}`;

const FirstProgramSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-8 md:grid-cols-2">
      <div className="min-w-0 overflow-hidden rounded-2xl border-4 border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-2 font-sans text-xs text-slate-400">源文件 hello.cpp</span>
        </div>
        <pre tabIndex={0} className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-slate-100 md:text-base"><code>{helloProgram}</code></pre>
      </div>
      <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
        <p className="mb-3 text-sm font-bold text-slate-600">运行结果</p>
        <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-lg text-green-400 shadow-inner"><code>Hello, GESP!</code></pre>
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3"><code>endl</code> 表示换行；也可以把换行写进字符串：<code>cout &lt;&lt; "Hello, GESP!\n";</code></li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">要输出两行，就写两条输出语句，或在中间换行。</li>
        </ul>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="这段程序运行后，屏幕上显示的是哪一项？"
      options={[
        'Hello, GESP!',
        '"Hello, GESP!"（带双引号）',
        'cout << Hello, GESP!',
        '什么也不显示',
      ]}
      correctIndex={0}
      explanation="双引号只用来标出字符串的开始和结束，本身不会输出；cout 把双引号里的内容原样送到屏幕。"
      misconception="以为双引号也会被打印出来，或把代码本身当成输出。"
    />
  </div>
);

// 8. 程序结构拆解
const structureLines = [
  { code: '#include <iostream>', note: '引入输入输出库；cout、cin、endl 都由它提供。' },
  { code: 'using namespace std;', note: '使用标准命名空间 std；写了这行，后面可以直接写 cout，而不必写 std::cout。' },
  { code: 'int main() {', note: 'main 函数：程序从这里开始执行。每个 C++ 程序有且只有一个 main。' },
  { code: '    cout << "Hello, GESP!" << endl;', note: '一条输出语句，以分号结束。' },
  { code: '    return 0;', note: 'main 结束并返回 0，表示程序正常结束。' },
  { code: '}', note: '与 main 后面的 { 配对，main 的函数体到此结束。' },
];

const coutParts = [
  { text: 'cout', color: 'text-yellow-700', note: 'cout：标准输出（console output），把内容送到屏幕。' },
  { text: '<<', color: 'text-pink-700', note: '<<：输出运算符，把右边的内容交给 cout；可以连续写多个 <<。' },
  { text: '"Hello, GESP!"', color: 'text-green-700', note: '字符串：双引号里的内容原样输出，双引号本身不输出。' },
  { text: '<<', color: 'text-pink-700', note: '第二个 <<：继续把后面的内容交给 cout。' },
  { text: 'endl', color: 'text-blue-700', note: 'endl：换行，下一次输出从新的一行开始。' },
  { text: ';', color: 'text-slate-700', note: '分号：这条语句到此结束。漏写会编译失败。' },
];

const StructureSlide = () => {
  const [activePart, setActivePart] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border-4 border-slate-700 bg-slate-900 text-slate-100 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="ml-2 font-sans text-xs text-slate-400">hello.cpp · 逐行说明</span>
        </div>
        <div className="divide-y divide-slate-800">
          {structureLines.map((line) => (
            <div key={line.code} className="grid gap-1 px-4 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-4">
              <code className="block min-w-0 overflow-x-auto whitespace-pre font-mono text-sm text-amber-200">{line.code}</code>
              <span className="font-sans text-sm leading-relaxed text-slate-300">{line.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <h3 className="mb-6 text-2xl font-bold text-slate-800">拆开输出语句：点击每一部分</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border-2 border-slate-100 bg-slate-50 p-6 font-mono text-xl sm:text-3xl">
          {coutParts.map((part, index) => (
            <button
              key={`${part.text}-${index}`}
              type="button"
              aria-pressed={activePart === index}
              onClick={() => setActivePart(index)}
              className={`rounded px-1.5 py-0.5 font-bold ${part.color} ${activePart === index ? 'bg-white ring-2 ring-slate-400' : 'hover:bg-slate-200'}`}
            >
              {part.text}
            </button>
          ))}
        </div>
        <p role="status" className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-left text-sm leading-relaxed text-blue-900">{coutParts[activePart].note}</p>
      </div>
    </div>
  );
};

// 9. 第一次运行：把源代码变成结果
const RunProgramSlide = () => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const steps = [
    {
      title: '1. 保存源文件',
      detail: '保存为 hello.cpp；.cpp 表明这是 C++ 源文件。先确认保存位置和文件名。',
      icon: <Save size={22} />,
    },
    {
      title: '2. 编译',
      detail: '让编译器检查语法并生成可执行程序。编译成功只说明程序可以运行，还没有核对结果。',
      icon: <FileText size={22} />,
    },
    {
      title: '3. 运行',
      detail: '启动刚生成的程序，观察控制台中的实际输出。修改代码后，要重新编译再运行。',
      icon: <Terminal size={22} />,
    },
    {
      title: '4. 核对输出',
      detail: '逐字比较题目要求和输出，检查大小写、空格、标点与换行。',
      icon: <CheckCircle size={22} />,
    },
  ];

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col justify-center gap-6">
      <div>
        <h3 className="text-3xl font-bold text-slate-800">第一次运行：四步不能跳</h3>
        <p className="mt-2 text-slate-600">依次点击下面四步，完成一次真实的程序运行流程。</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {steps.map((step, index) => {
          const isDone = index < completedSteps;
          const isNext = index === completedSteps;
          return (
            <button
              key={step.title}
              type="button"
              aria-pressed={isDone}
              disabled={!isNext}
              onClick={() => setCompletedSteps(index + 1)}
              className={`rounded-2xl border p-5 text-left transition ${isDone
                ? 'border-green-300 bg-green-50 text-green-900'
                : isNext
                  ? 'border-amber-400 bg-amber-50 text-slate-900 shadow-sm hover:border-amber-500'
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}
            >
              <span className="mb-2 flex items-center gap-2 font-bold">{step.icon}{step.title}</span>
              <span className="text-sm leading-relaxed">{step.detail}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <strong className="mb-1 block">编译失败</strong>
          先读第一条错误信息，检查对应行附近的分号、引号和括号；修正后重新编译。
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <strong className="mb-1 block">能够运行但结果不对</strong>
          回到代码和题目逐项比较，修正后再次经历“编译 → 运行 → 核对”。
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-slate-900 p-4 text-white">
        <span>{completedSteps === steps.length ? '已走完一次完整流程，可以修改输出文字再练一次。' : `当前完成 ${completedSteps}/4 步`}</span>
        <button
          type="button"
          onClick={() => setCompletedSteps(0)}
          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
        >
          <RefreshCw size={16} /> 重新开始
        </button>
      </div>
    </div>
  );
};

// 10. 常见错误与真题
const DebugSlide = () => (
  <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto w-full">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> Hello World 常见错误
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
          <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> 错误 1：方向写反</div>
          <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-lg">
            cout <span className="rounded bg-red-200 px-1 font-bold text-red-800">&gt;&gt;</span> "Hi";
          </code>
          <div className="text-xs font-medium leading-relaxed text-red-700"><code>&gt;&gt;</code> 是输入方向，配合 <code>cin</code> 使用；<code>cout</code> 必须用 <code>&lt;&lt;</code>，否则编译失败。</div>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
          <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> 错误 2：漏写分号</div>
          <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-lg">
            cout &lt;&lt; "Hi"
          </code>
          <div className="text-xs font-medium leading-relaxed text-red-700">语句没有结束，编译失败；错误提示有时指向下一行开头，要往上一行找。</div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 transition-colors hover:bg-amber-100">
          <div className="mb-3 flex items-center gap-2 font-bold text-amber-800"><AlertTriangle size={16} /> 不应这样写</div>
          <code className="mb-2 block rounded border border-amber-200 bg-white px-2 py-1 text-center font-mono text-lg">
            cout &lt;&lt; <span className="rounded bg-amber-200 px-1 font-bold text-amber-900">'Hi'</span>;
          </code>
          <div className="text-xs font-medium leading-relaxed text-amber-800">文字串应写成 "Hi"；'Hi' 是不可移植的多字符字面量，通常会得到警告或数字，而不是字符串 Hi。</div>
        </div>
      </div>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP 一级第 3 题"
      question="在 C++ 中，下列表达式错误的是（ ）。"
      mono
      options={[
        { id: 'A', text: 'cout << "Hello,GESP!" << endl;' },
        { id: 'B', text: "cout << 'Hello,GESP!' << endl;" },
        { id: 'C', text: 'cout << """Hello,GESP!""" << endl;' },
        { id: 'D', text: 'cout << "Hello,GESP!\' << endl;', isCorrect: true },
      ]}
      explanation={'D 以双引号开始、以单引号结束，字符串没有闭合，编译失败。A 正常；C 会被拆成 ""、"Hello,GESP!"、"" 三个相邻字符串并自动拼接，输出不变；B 是多字符字面量，通常只有警告并输出一个数字——能编译不等于写对。'}
    />

    <QuizCard
      source="2025 年 3 月 GESP 一级第 7 题"
      question={'有关下列 C++ 代码的说法，错误的是（ ）。\nprintf("我爱码代码！");'}
      options={[
        { id: 'A', text: '配对双引号内的汉字改为英文 Hello，C++ 代码能正确执行' },
        { id: 'B', text: '配对双引号内的汉字改为 Hello代码！，C++ 代码能正确执行' },
        { id: 'C', text: '代码中的每个双引号，都可以改为两个单引号', isCorrect: true },
        { id: 'D', text: '代码中的每个双引号，都可以改为三个双引号' },
      ]}
      explanation={'双引号里可以写英文、汉字和标点，A、B 都成立。每个双引号改成两个单引号后会出现 \'\'（空字符字面量），编译失败，所以 C 是错误说法。D 中三个连续双引号会被拆成相邻字符串并拼接，内容不变。'}
    />

    <div className="flex w-full items-start gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5">
      <div className="rounded-lg bg-orange-100 p-2">
        <BookOpen className="text-orange-600" size={20} />
      </div>
      <div>
        <h4 className="mb-1 font-bold text-orange-900">关于 printf</h4>
        <p className="text-sm leading-relaxed text-orange-900">
          <code>printf</code> 来自 C 标准输入输出库，在 C++ 中可通过 <code>&lt;cstdio&gt;</code> 使用。它依赖格式说明符匹配参数类型；本课程先统一使用更适合入门的 <code>cout</code>。
        </p>
      </div>
    </div>
  </div>
);

// 11. 输出文字与算式结果
const MathSlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-8 max-w-3xl mx-auto w-full">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="mb-3 text-sm font-bold text-slate-600">带双引号：原样输出文字</p>
          <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-base text-green-400 shadow-inner md:text-lg"><code>{'cout << "12 - 3 * 2";'}</code></pre>
          <p className="mt-4 text-sm text-slate-700">输出：<code className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xl font-bold text-slate-800">12 - 3 * 2</code></p>
        </div>
        <div className="min-w-0 rounded-xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="mb-3 text-sm font-bold text-green-800">不带双引号：先计算，再输出结果</p>
          <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-base text-green-400 shadow-inner md:text-lg"><code>{'cout << 12 - 3 * 2;'}</code></pre>
          <p className="mt-4 text-sm text-slate-700">输出：<code className="rounded-lg border border-green-200 bg-white px-3 py-1 text-xl font-bold text-green-700">6</code></p>
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h4 className="mb-4 flex items-center gap-2 font-bold text-blue-800">
          <Calculator size={18} /> 课堂练习：先乘除，再加减
        </h4>
        <p className="mb-4 text-base font-medium text-slate-800">表达式 <code>12 - 3 * 2</code> 的值是多少？如果想先算减法，应怎样加括号？</p>
        <ol className="list-none space-y-3 text-sm text-slate-700">
          <li className="flex gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
            <span><strong>顺序：</strong>先乘除，后加减。先算 <code>3 * 2 = 6</code>。</span>
          </li>
          <li className="flex gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
            <span><strong>结果：</strong>再算 <code>12 - 6</code>，得到 <strong>6</strong>。</span>
          </li>
          <li className="flex gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
            <span><strong>改变顺序：</strong>括号最先算。写成 <code>(12 - 3) * 2</code>，结果是 <strong>18</strong>。</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

// 12. 小结与课后任务
const SummarySlide = () => (
  <div className="max-w-4xl mx-auto w-full h-full flex flex-col justify-center">
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10" aria-hidden="true">
        <ClipboardList size={120} className="text-yellow-600" />
      </div>

      <div className="relative z-10 rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><ClipboardList size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '输入设备把信息送进计算机，输出设备把结果送出来；触摸屏两者兼有。',
            'CPU 主要由运算器和控制器组成；内存属于存储设备；冯·诺依曼体系结构有五大部件。',
            'ENIAC 于 1946 年投入运行，主要部件是电子管；四代计算机依次是电子管、晶体管、集成电路、大规模和超大规模集成电路。',
            '鸿蒙、Windows 等是操作系统；把源程序翻译成目标程序的是编译器。',
            '程序从 main 开始执行；cout << 输出，双引号里的文字原样输出，语句以分号结束。',
            '上机四步：保存 → 编译 → 运行 → 核对输出；改了代码要重新编译。',
          ].map((point, index) => (
            <li key={point} className="flex items-start gap-4">
              <span className="mt-0.5 rounded bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-600">{index + 1}</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative z-10">
        <strong className="mb-6 flex items-center gap-2 text-xl text-yellow-900">
          <Layout size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">上机任务</strong>
              <p className="text-sm text-yellow-900">在本机 C++ 开发环境中敲出并保存 hello.cpp，编译运行后，把输出改成 "Hello, [你的名字]!"，再重新编译并核对输出。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">分类任务</strong>
              <p className="text-sm text-yellow-900">任选两个智能设备（如扫地机器人、智能手表），各写出一个输入设备和一个输出设备，并说明信息流动方向。</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

// --- 章节数据配置 ---
const sections = [
  { id: 1, title: '热身：人和计算机怎么交流', icon: "workflow", component: WarmupSlide, category: "计算机基础" },
  { id: 2, title: '输入与输出设备', icon: "keyboard", component: IOSlide, category: "计算机基础" },
  { id: 3, title: "真题：输入输出设备", icon: "check-circle", component: IOQuizSlide, category: "计算机基础" },
  { id: 4, title: "存储与处理", icon: "hard-drive", component: StorageSlide, category: "计算机基础" },
  { id: 5, title: "计算机简史考点", icon: "book-open", component: HistorySlide, category: "计算机基础" },
  { id: 6, title: "硬件、软件与操作系统", icon: "app-window", component: OSSlide, category: "计算机基础" },
  { id: 7, title: "第一个程序", icon: "file-code", component: FirstProgramSlide, category: "第一个 C++ 程序" },
  { id: 8, title: "程序结构拆解", icon: "layout", component: StructureSlide, category: "第一个 C++ 程序" },
  { id: 9, title: "第一次运行", icon: "terminal", component: RunProgramSlide, category: "第一个 C++ 程序" },
  { id: 10, title: "常见错误与真题", icon: "alert-triangle", component: DebugSlide, category: "第一个 C++ 程序" },
  { id: 11, title: "输出文字与算式结果", icon: "calculator", component: MathSlide, category: "第一个 C++ 程序" },
  { id: 12, title: "小结与课后任务", icon: "clipboard", component: SummarySlide, category: "小结与检查" },
  {
    id: 13,
    title: "离开前检查",
    icon: "check-circle",
    category: "小结与检查",
    component: () => (
      <div className="py-6">
        <TransferCheck
            prompt={'换个例子：用 cout 在一行里先输出 Hi 再输出数字 8（中间空一格）。这行代码怎么写？'}
            hint="cout << ... << ...; 可以连续输出多个内容，用 << 隔开。"
            answer={'cout << "Hi" << " " << 8;（也可写 cout << "Hi " << 8;）'}
            steps={[
                '用 << 把要输出的内容一个个串起来。',
                'cout << "Hi" << " " << 8; 依次输出 Hi、空格、8。',
                '屏幕显示：Hi 8。',
            ]}
        />
        <MasteryCheck
          title="C++ L1-1 你好计算机离开前检查"
          description="如果能分清输入、输出与存储，解释最小程序结构，完成保存—编译—运行并修掉 Hello World 常见错误，就可以进入变量课。"
          items={lesson1MasteryItems}
        />
      </div>
    ),
  },
];


// --- 主组件 ---
const CppL1Lesson1 = () => {
  const [activeSection, setActiveSection] = useState(1);

  // 获取当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <LegacyCppLessonShell
        prerequisites={['会用键盘和鼠标完成基本操作', '能新建、保存并找到一个文件', '能在英文输入法下输入 ; " < > { } 等符号']}
      lessonNumber={1}
      lessonTitle="计算机与第一个程序"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/2"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={1} />}
      bottomSupport={<CppL1LessonSupport lessonId={1} placement="bottom" />}
    >
      {ActiveComponent ? React.createElement(ActiveComponent) : <div className="p-10">内容建设中...</div>}
    </LegacyCppLessonShell>
  );
};

export default CppL1Lesson1;
