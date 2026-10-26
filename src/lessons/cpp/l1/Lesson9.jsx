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
import { CodeTracer, MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import CodeSnippet from '../CodeSnippet';
import { BatteryLab, DaysLab, FallThroughLab, TrapVisualizer, WeatherReporter } from './Lesson9Activities';

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

const lesson9MasteryItems = [
  {
    label: '能预测多个条件都成立时命中哪一支。',
    evidence: '知道 if / else if / else 从上往下检查，只命中第一个成立的分支：输入 21 时“能被3整除”先成立，后面的 N % 7 == 0 不再检查。',
    retryHint: '回到“真题：2024 年 3 月一级第 6 题”，在被忽略的 7 实验里输入 21、14、5。',
  },
  {
    label: '能按从高到低写出区间分档。',
    evidence: '能写出 if (s >= 90) … else if (s >= 80) … else if (s >= 60) … else …，并说明后面的条件不必再写上界；先判 s >= 60 会把 95 分也分到 C。',
    retryHint: '回到“条件顺序”，切换“顺序写反”再输入 95。',
  },
  {
    label: '能预测漏写 break 时的输出。',
    evidence: '能说明 switch 从匹配的 case 开始往下执行，直到遇到 break 或 switch 结束；例 2 中 k = 2 时输出 two 和 three。',
    retryHint: '回到“穿透与合并 case”，在执行路径实验里依次选 k = 1、2、3、4。',
  },
  {
    label: '能用合并 case 写出每月天数。',
    evidence: '能写出 case 1: case 3: case 5: case 7: case 8: case 10: case 12: d = 31; break;，并在 2 月用闰年条件区分 29 和 28。',
    retryHint: '回到“每月天数”，用 2024 2、2100 2、2022 1 三组输入核对。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：成绩分四档", icon: "arrow", category: "多分支" },
  { id: 2, title: "if / else if / else", icon: "play", category: "多分支" },
  { id: 3, title: "条件顺序", icon: "calc", category: "多分支" },
  { id: 4, title: "真题：2024 年 3 月一级第 6 题", icon: "check", category: "多分支" },
  { id: 5, title: "多个 if 与 else if", icon: "alert", category: "多分支" },
  { id: 6, title: "switch 语法", icon: "hash", category: "switch" },
  { id: 7, title: "穿透与合并 case", icon: "rotate", category: "switch" },
  { id: 8, title: "每月天数", icon: "timer", category: "switch" },
  { id: 9, title: "常见错误与真题", icon: "x", category: "真题" },
  { id: 10, title: "上机：成绩分档 / 季节", icon: "terminal", category: "真题" },
  { id: 11, title: "小结与课后任务", icon: "book", category: "小结与检查" },
  { id: 12, title: "离开前检查", icon: "check", category: "小结与检查" }
];

// --- 通用小组件（沿用第 1、2 课样板） ---
const Button = ({ onClick, children, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
    secondary: "bg-green-500 text-white hover:bg-green-600 shadow-green-200",
    outline: "border-2 border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 shadow-md'} ${className}`}
    >
      {children}
    </button>
  );
};

const CodePanel = ({ children }) => (
  <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-gray-800 p-5 font-mono text-sm leading-relaxed text-gray-100"><code>{children}</code></pre>
);

const OutputPanel = ({ children }) => (
  <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

// 作答后才显示解析；选项锁定，避免反复试选。
const QuizCard = ({ source, badge = '站内真题', question, options, explanation, mono = false }) => {
  const [selected, setSelected] = useState(null);
  const correctOption = options.find((opt) => opt.isCorrect);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-slate-600">
          <BookOpen size={14} className="text-yellow-500" /> {badge}
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
                {selected && opt.isCorrect && <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />}
                {isChosen && !opt.isCorrect && <XCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />}
              </button>
            );
          })}
        </div>

        {selected && (
          <div role="status" className="mt-6 space-y-3">
            <div className={`flex items-start gap-3 rounded-xl p-4 ${selected.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selected.isCorrect ? <CheckCircle2 className="mt-0.5 shrink-0" /> : <XCircle className="mt-0.5 shrink-0" />}
              <p className="text-lg font-bold">{selected.isCorrect ? '回答正确' : `回答错误，正确答案是 ${correctOption?.id}`}</p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-600" />
              <p><strong>解析：</strong>{explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 1. 问题导入 ---
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">成绩分四档</h2>
      <p className="text-lg text-gray-600">90 分及以上为 A，80～89 为 B，60～79 为 C，其余为 D。一个 if-else 只能分两种情况，四种情况怎么写？</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">用 if-else 一层套一层</p>
        <CodePanel>{`if (s >= 90) cout << "A";
else {
    if (s >= 80) cout << "B";
    else {
        if (s >= 60) cout << "C";
        else cout << "D";
    }
}`}</CodePanel>
        <p className="mt-3 text-sm text-slate-600">能运行，但越套越深，括号容易配错。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">写成 else if</p>
        <CodePanel>{`if (s >= 90) cout << "A";
else if (s >= 80) cout << "B";
else if (s >= 60) cout << "C";
else cout << "D";`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">else if 就是把下一个 if 直接写在 else 后面，执行效果与左边完全相同。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="s = 85 时，上面两段代码分别输出什么？"
      options={['都输出 B', '左边输出 B，右边输出 C', '都输出 B 和 C']}
      correctIndex={0}
      explanation="两段代码逻辑相同：85 >= 90 不成立，进入 else；85 >= 80 成立，输出 B，后面的条件不再检查。所以都只输出 B。"
      misconception="以为 85 同时满足 s >= 80 和 s >= 60，会输出两个等级。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 8 课处理两种情况。本课处理三种以上：<strong>else if 链只命中第一个成立的分支 → 区间分档从高到低写 → 什么时候要用多个独立的 if → switch 处理固定选项 → 穿透与合并 case</strong>，最后完成“成绩分档”和“季节”两道上机题。
    </div>
  </div>
);

// --- 2. if / else if / else ---
const gradeCode = `int s = 85;
if (s >= 90) cout << "A";
else if (s >= 80) cout << "B";
else if (s >= 60) cout << "C";
else cout << "D";
cout << endl;`;

const gradeTraceSteps = [
  {
    active: [0],
    vars: { s: 85 },
    action: '检查第 1 个条件',
  },
  {
    active: [1],
    vars: { s: 85 },
    row: ['第 1 支', 's >= 90', '85 >= 90', '不成立，往下检查'],
    action: '检查第 2 个条件',
  },
  {
    active: [2],
    vars: { s: 85 },
    row: ['第 2 支', 's >= 80', '85 >= 80', '成立，输出 B'],
    action: '看后面的分支',
  },
  {
    active: [3, 4],
    vars: { s: 85 },
    exit: '已经命中第 2 支，s >= 60 和 else 都不再检查。',
    action: '执行 cout << endl;',
  },
  {
    active: [5],
    vars: { s: 85 },
    output: 'B',
  },
];

const ElseIfSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">if / else if / else 的执行规则</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '从上往下逐个检查条件。',
          '遇到第一个成立的条件，执行它后面的语句，然后跳出整个结构；后面的条件不再检查。',
          '所有条件都不成立时，执行最后的 else；没有 else 就什么也不做。',
          '整个结构最多执行一支；有 else 时恰好执行一支。',
        ].map((rule, index) => (
          <li key={rule} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1</p>
        <CodePanel>{gradeCode}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'B'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">85 也满足 s &gt;= 60，但第 2 支已经命中，第 3 支根本没有被检查。</p>
      </div>
    </div>

    <div className="w-full">
      <CodeTracer
        title="分档追踪器：s = 85 逐条检查"
        code={gradeCode}
        varOrder={['s']}
        columns={['检查', '条件', '代入', '结果']}
        steps={gradeTraceSteps}
        hint="先预测会在第几支停下，再逐步核对。"
      />
    </div>
  </div>
);

// --- 3. 条件顺序 ---
const branchOrders = {
  high: [
    { cond: 's >= 90', test: (s) => s >= 90, out: 'A' },
    { cond: 's >= 80', test: (s) => s >= 80, out: 'B' },
    { cond: 's >= 60', test: (s) => s >= 60, out: 'C' },
    { cond: null, test: () => true, out: 'D' },
  ],
  low: [
    { cond: 's >= 60', test: (s) => s >= 60, out: 'C' },
    { cond: 's >= 80', test: (s) => s >= 80, out: 'B' },
    { cond: 's >= 90', test: (s) => s >= 90, out: 'A' },
    { cond: null, test: () => true, out: 'D' },
  ],
};

// 自动逐条检查：每隔一段时间检查下一个条件，命中后停下。
const ElseIfStepper = () => {
  const [raw, setRaw] = useState('95');
  const [order, setOrder] = useState('high');
  const [checked, setChecked] = useState(0);
  const [playing, setPlaying] = useState(false);
  const trimmed = raw.trim();
  const valid = /^\d{1,3}$/.test(trimmed) && Number(trimmed) <= 100;
  const s = Number(trimmed);
  const branches = branchOrders[order];
  const matchIndex = valid ? branches.findIndex((branch) => branch.test(s)) : -1;
  const finished = valid && checked > matchIndex;

  useEffect(() => {
    if (!playing) return undefined;
    if (!valid || checked > matchIndex) {
      setPlaying(false);
      return undefined;
    }
    const timer = setTimeout(() => setChecked((value) => value + 1), 800);
    return () => clearTimeout(timer);
  }, [playing, checked, matchIndex, valid]);

  const reset = () => {
    setChecked(0);
    setPlaying(false);
  };

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-indigo-900">逐条检查实验：顺序不同，结果不同</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-9-score" className="text-sm font-bold text-gray-700">分数 s（0～100）：</label>
        <input id="l1-9-score" type="text" inputMode="numeric" value={raw} onChange={(e) => { setRaw(e.target.value); reset(); }} className="w-24 rounded-lg border-2 border-indigo-300 bg-white px-3 py-2 text-center font-mono text-lg focus:border-indigo-500 outline-none" />
        <div className="flex gap-2">
          {[['high', '从高到低（正确）'], ['low', '顺序写反']].map(([key, label]) => (
            <button key={key} type="button" aria-pressed={order === key} onClick={() => { setOrder(key); reset(); }} className={`rounded-lg border px-3 py-1 text-sm font-bold ${order === key ? 'border-indigo-500 bg-white text-indigo-800' : 'border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-white'}`}>{label}</button>
          ))}
        </div>
      </div>

      {valid ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-xl bg-gray-900 p-4 font-mono text-sm text-gray-300">
            {branches.map((branch, index) => {
              const keyword = index === 0 ? 'if' : branch.cond ? 'else if' : 'else';
              let state = '待检查';
              let rowClass = '';
              if (index < checked && index === matchIndex) {
                state = `成立，输出 ${branch.out}`;
                rowClass = 'border-l-4 border-green-500 bg-green-900/50 font-bold text-green-400';
              } else if (index < checked) {
                state = '不成立';
                rowClass = 'text-red-300';
              } else if (finished) {
                state = '不再检查';
                rowClass = 'opacity-40 line-through';
              }
              return (
                <div key={keyword + index} className={`flex flex-wrap items-center justify-between gap-2 rounded p-2 ${rowClass}`}>
                  <span><span className="text-purple-400">{keyword}</span>{branch.cond ? ` (${branch.cond})` : ''} 输出 {branch.out}</span>
                  <span className="text-xs">{state}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setPlaying(!playing)} disabled={finished} className="flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? '暂停' : '逐条检查'}
              </button>
              <button type="button" onClick={reset} className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
                <RotateCw size={16} /> 重置
              </button>
            </div>
            <div role="status">
              {finished ? (
                <OutputPanel>{`输出 ${branches[matchIndex].out}`}</OutputPanel>
              ) : (
                <p className="text-sm text-slate-600">点“逐条检查”，看程序在第几支停下。</p>
              )}
              {finished && order === 'low' && s >= 80 && (
                <p className="mt-2 rounded-lg bg-red-100 p-2 text-sm font-bold text-red-700">顺序写反：{s} 分在第一支 s &gt;= 60 就停下了，被分到了 C。</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 0～100 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

const OrderSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">区间分档：从高到低写</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <CodePanel>{`if (s >= 90) cout << "A";
else if (s >= 80) cout << "B";  // 此时 s < 90
else if (s >= 60) cout << "C";  // 此时 s < 80
else cout << "D";               // 此时 s < 60`}</CodePanel>
        </div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">能走到第 2 支，说明第 1 个条件不成立，s 一定小于 90，所以不必写成 s &gt;= 80 &amp;&amp; s &lt; 90。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">按从高到低（或从低到高）的一个方向排好，每一支只写一个分界线。</li>
          <li className="rounded-lg border border-amber-200 bg-amber-50 p-3">分界线要逐个补测：90、89、80、79、60、59。</li>
        </ul>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt={'如果先判 s >= 60，写成 if (s >= 60) C; else if (s >= 80) B; else if (s >= 90) A; else D;，s = 95 时输出什么？'}
      options={['A', 'C', 'A 和 C', 'D']}
      correctIndex={1}
      explanation="95 >= 60 在第一支就成立，输出 C，后面的 s >= 80、s >= 90 不再检查。按这个顺序，A 和 B 永远不会被输出。"
      misconception="以为 else if 会挑“最合适”的那一支；其实只命中从上往下第一个成立的分支。"
    />

    <ElseIfStepper />
  </div>
);

// --- 4. 真题：2024 年 3 月一级第 6 题 ---
const ExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：输入 21 时执行哪一行</h3>
      <p className="mt-1 text-slate-500">题目代码左边的数字是行号。</p>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 6 题"
      question={'下面 C++ 代码执行时输入 21 后，有关描述正确的是（ ）。\n1 int N;\n2 cin >> N;\n3 if(N % 3 == 0)\n4     cout << "能被3整除";\n5 else if (N % 7 == 0)\n6     cout << "能被7整除";\n7 else\n8     cout << "不能被3和7整除";\n9 cout << endl;'}
      mono
      options={[
        { id: 'A', text: '代码第 4 行被执行', isCorrect: true },
        { id: 'B', text: '第 4 和第 7 行代码都被执行' },
        { id: 'C', text: '仅有代码第 7 行被执行' },
        { id: 'D', text: '第 8 行代码将被执行，因为 input() 输入为字符串' },
      ]}
      explanation="21 % 3 == 0 成立，执行第 4 行，输出“能被3整除”。第 5 行的 else if 不再检查，第 6、8 行都不执行。21 也是 7 的倍数，但 else if 链只命中第一个成立的分支。第 9 行不属于分支，一定执行。"
    />

    <div className="w-full">
      <span className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">根据 2024 年 3 月 GESP C++ 一级第 6 题改编的输入实验</span>
      <TrapVisualizer />
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">两个条件都要检查时</strong>
      21 既能被 3 整除也能被 7 整除，else if 链却只输出一句。如果题目要求“能被 3 整除就输出一句，能被 7 整除也输出一句”，要写成两个独立的 if，见下一节。
    </div>
  </div>
);

// --- 5. 多个 if 与 else if ---
const MultiIfSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-lg font-bold text-gray-800">else if 链：最多执行一支</h3>
        <CodePanel>{`if (N % 3 == 0) cout << "能被3整除" << endl;
else if (N % 7 == 0) cout << "能被7整除" << endl;`}</CodePanel>
        <p className="mb-2 mt-4 text-sm font-bold text-slate-600">输入 21 的输出</p>
        <OutputPanel>{'能被3整除'}</OutputPanel>
        <p className="mt-3 text-sm text-gray-700">适合几种情况互相排斥、只能选一种的题，比如分档。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-green-800">多个独立的 if：每个都检查</h3>
        <CodePanel>{`if (N % 3 == 0) cout << "能被3整除" << endl;
if (N % 7 == 0) cout << "能被7整除" << endl;`}</CodePanel>
        <p className="mb-2 mt-4 text-sm font-bold text-slate-600">输入 21 的输出</p>
        <OutputPanel>{`能被3整除
能被7整除`}</OutputPanel>
        <p className="mt-3 text-sm text-green-900">适合题目要求“几个条件都要检测”的情况。</p>
      </div>
    </div>

    <WeatherReporter />

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">怎样选</strong>
      先问自己：这几种情况会不会同时成立、同时都要处理？只能选一种，用 else if 链，并且要排好顺序；每种都要单独处理，用多个独立的 if。
    </div>
  </div>
);

// --- 6. switch 语法 ---
const SwitchSyntaxSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">switch：按一个整数或字符的值选择</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <CodePanel>{`switch (表达式) {
    case 常量1:
        语句;
        break;
    case 常量2:
        语句;
        break;
    default:
        语句;
}`}</CodePanel>
        </div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">括号里的表达式必须是整数或字符（int、char 等），不能是 double 或字符串。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">case 后面只能写常量，如 1、'A'；不能写变量，也不能写区间。各个 case 的值不能重复。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">从值相等的 case 开始往下执行，遇到 break 就跳出整个 switch。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">没有相等的 case 时执行 default；default 可以省略，省略时什么也不做。</li>
        </ul>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例：菜单编号</p>
        <CodePanel>{`int choice = 2;
switch (choice) {
    case 1: cout << "茶" << endl; break;
    case 2: cout << "水" << endl; break;
    default: cout << "无此选项" << endl;
}`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'水'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">choice 等于 2，从 case 2 开始执行，输出“水”后遇到 break，跳出 switch。choice 是 5 时没有相等的 case，输出“无此选项”。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">switch 和 else if 怎样选</strong>
      值是几个固定的整数或字符（菜单编号、月份、等级字母），用 switch 清楚；要判断范围（s &gt;= 90）或复杂条件，用 if / else if。
    </div>
  </div>
);

// --- 7. 穿透与合并 case ---
const FallThroughSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2</p>
        <CodePanel>{`int k = 2;
switch (k) {
    case 1: cout << "one" << endl;
    case 2: cout << "two" << endl;
    case 3: cout << "three" << endl; break;
    default: cout << "other" << endl;
}`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`two
three`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">case 只是“入口”。从 case 2 进入后，没有 break 就接着执行 case 3 的语句，直到 break 才跳出。这叫穿透。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="例 2 中把 k 改成 1，输出什么？"
      options={['one', 'one two', 'one two three', 'one two three other']}
      correctIndex={2}
      explanation="从 case 1 进入，输出 one；没有 break，继续输出 two、three；case 3 后面有 break，跳出 switch，default 不执行。三个单词各占一行。"
      misconception="以为执行完匹配的 case 就会自动停下，忘了只有 break 才会跳出。"
    />

    <FallThroughLab />

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-slate-800">合并 case：几个值共用一段代码</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <CodePanel>{`switch (level) {
    case 'A': case 'B':
        cout << "pass" << endl; break;
    case 'C':
        cout << "retry" << endl; break;
    default:
        cout << "unknown" << endl;
}`}</CodePanel>
        <p className="text-sm leading-relaxed text-slate-700">case 'A' 后面不写语句也不写 break，进入后直接穿透到 case 'B' 的语句。所以 level 是 'A' 或 'B' 都输出 pass。穿透不一定是错误：合并 case 就是有意利用它。</p>
      </div>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 12 月一级第 13 题）"
      question={'下图所示 C++ 代码对大写字母\'A\'到\'Z\'分组，对每个字母输出所属的组号，那么输入\'C\'时将输出的组号是？（ ）\nchar c;\nwhile(1){\n cin >> c;\n if(c==\'q\') break;\n switch(c){\n case \'A\': cout << "1 "; break;\n case \'B\': cout << "3 ";\n case \'C\': cout << "3 ";\n case \'D\': cout << "5 "; break;\n case \'E\': cout << "5 "; break;\n default: cout << "9 ";\n }\n cout << endl;\n}'}
      mono
      options={[
        { id: 'A', text: '3' },
        { id: 'B', text: '3 5', isCorrect: true },
        { id: 'C', text: '3 5 9' },
        { id: 'D', text: '以上都不对' },
      ]}
      explanation="while(1) 让程序反复读入字母（循环在后面的课学），这里只看一次 switch。输入 'C' 从 case 'C' 进入，输出 3；没有 break，穿透到 case 'D'，输出 5，遇到 break 跳出。所以是 3 5。"
    />
  </div>
);

// --- 8. 每月天数 ---
const DaysSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：输入年和月，输出这个月有几天</p>
        <CodePanel>{`int y, m, d;
cin >> y >> m;
switch (m) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        d = 31; break;
    case 4: case 6: case 9: case 11:
        d = 30; break;
    default:
        if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) d = 29;
        else d = 28;
}
cout << d << endl;`}</CodePanel>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-sm font-bold text-slate-600">几组输入</p>
        <OutputPanel>{`输入 2024 2 → 29
输入 2100 2 → 28
输入 2022 1 → 31
输入 2020 2 → 29`}</OutputPanel>
        <p className="text-sm text-slate-700">大月 7 个 case 合并成一组，小月 4 个 case 合并成一组；剩下的只有 2 月（题目保证 1 ≤ m ≤ 12），放进 default，再用第 7 课的闰年条件区分 29 和 28。</p>
        <p className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-950">对应 2023 年 3 月 GESP C++ 一级编程题第 2 题《每月天数》，后两组是它的样例。用 if / else if 加 || 也能写，switch 合并 case 更直观。</p>
      </div>
    </div>

    <DaysLab />
  </div>
);

// --- 9. 常见错误与真题 ---
const mistakeCards = [
  { title: '分档顺序写反', code: 'if (s >= 60) … else if (s >= 90) …', detail: '95 分在第一支就停下，被分到 C。区间分档按一个方向排好，从高到低写。' },
  { title: '该用两个 if 却用了 else if', code: 'if (N % 3 == 0) … else if (N % 7 == 0) …', detail: '输入 21 只输出“能被3整除”。几个条件都要检测时，写成独立的 if。' },
  { title: 'case 后写区间或变量', code: 'case score >= 90:', detail: 'case 后面必须是常量，这样写编译失败。判断范围用 if / else if。' },
  { title: '漏写 break', code: "case 'B': cout << \"3 \";", detail: '执行完这一支会穿透到下一个 case。除非有意合并，每个 case 组末尾都写 break。' },
  { title: 'break 写在单独的 if 里', code: 'if (i == 0) { break; }', detail: 'break 只能用在循环或 switch 里。外面没有循环或 switch 时，编译失败。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 多分支与 switch 常见错误
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mistakeCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
            <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> {card.title}</div>
            <code className="mb-2 block break-all rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-sm">{card.code}</code>
            <div className="text-xs font-medium leading-relaxed text-red-700">{card.detail}</div>
          </div>
        ))}
      </div>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 3 月一级第 5 题）"
      question={'下面的框架在L1和L2标记的两行处分别填写选项中的代码，哪组不能通过编译（ ）。\nint main () {\n int i = 0;\n ______________ // L1\n break;\n ______________ // L2\n return 0;\n}'}
      mono
      options={[
        { id: 'A', text: 'do { (L1) 和 } while (i != 0); (L2)' },
        { id: 'B', text: 'for (; i < 10; i++) { (L1) 和 } (L2)' },
        { id: 'C', text: 'if (i == 0) { (L1) 和 } (L2)', isCorrect: true },
        { id: 'D', text: 'switch (i) { (L1) 和 } (L2)' },
      ]}
      explanation="break 只能出现在循环（do-while、for、while）或 switch 里。A、B 是循环，D 是 switch，都能编译；C 只有 if，break 外面既没有循环也没有 switch，编译失败。（四组已分别用 g++ 编译核对。）"
    />

    <BatteryLab />
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 9-A',
    title: '成绩分档',
    statement: '输入整数 s（0 ≤ s ≤ 100）。s ≥ 90 输出 A，80～89 输出 B，60～79 输出 C，其余输出 D。',
    samples: [['90', 'A'], ['59', 'D']],
    hint: '从高到低写 else if，后面的条件只写下界。自己补测分界线 89、80、60（应输出 B、B、C）和 0、100（D、A）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int s;
    cin >> s;
    if (s >= 90) cout << "A" << endl;
    else if (s >= 80) cout << "B" << endl;
    else if (s >= 60) cout << "C" << endl;
    else cout << "D" << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 9-B',
    title: '季节',
    statement: '输入月份 m（1 ≤ m ≤ 12）。3～5 月输出 Spring，6～8 月输出 Summer，9～11 月输出 Autumn，12、1、2 月输出 Winter。要求用 switch 并合并 case。',
    samples: [['4', 'Spring'], ['12', 'Winter']],
    hint: '同一季节的几个月写成连在一起的 case，组末写 break。自己补测 2（Winter）、6（Summer）、11（Autumn）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    switch (m) {
        case 3: case 4: case 5:
            cout << "Spring" << endl; break;
        case 6: case 7: case 8:
            cout << "Summer" << endl; break;
        case 9: case 10: case 11:
            cout << "Autumn" << endl; break;
        case 12: case 1: case 2:
            cout << "Winter" << endl; break;
    }
    return 0;
}`,
  },
];

const PracticeProblem = ({ problem }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">{problem.tag}</span>
        <h2 className="mb-3 text-2xl font-bold text-gray-800">{problem.title}</h2>
        <p className="text-sm leading-relaxed text-gray-700">{problem.statement}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
          {problem.samples.map(([input, output]) => (
            <React.Fragment key={input}>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：{input}</div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：{output}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">提示：{problem.hint}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Terminal size={18} /> 参考程序</h3>
        <p className="text-sm text-green-900">先在本机写出程序，用两组样例核对输出，再打开参考程序对照。</p>
        <Button onClick={() => setShowCode(!showCode)} variant={showCode ? 'outline' : 'secondary'}>
          {showCode ? '收起参考程序' : '我写完了，显示参考程序'}
        </Button>
        {showCode && <CodePanel>{problem.code}</CodePanel>}
      </div>
    </div>
  );
};

const PracticeSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    {practiceProblems.map((problem) => (
      <PracticeProblem key={problem.title} problem={problem} />
    ))}
  </div>
);

// --- 11. 小结与课后任务 ---
const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><BookOpen size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            'if / else if / else 从上往下检查，只命中第一个成立的分支，后面的条件不再检查；else 兜底。',
            '区间分档按一个方向排好（如从高到低），后面的条件不必再写上界；分界线要逐个补测。',
            '几个条件都要检测时，用多个独立的 if，不用 else if。',
            'switch 的表达式是整数或字符；case 后只能写常量；没有相等的 case 时执行 default。',
            '从匹配的 case 开始往下执行，遇到 break 才跳出；漏写 break 会穿透，合并 case 是有意利用穿透。',
            'break 只能用在循环或 switch 里，单独写在 if 里编译失败。',
          ].map((point, index) => (
            <li key={point} className="flex items-start gap-4">
              <span className="mt-0.5 rounded bg-slate-100 px-2 py-0.5 text-sm font-bold text-slate-600">{index + 1}</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <strong className="mb-6 flex items-center gap-2 text-xl text-yellow-900">
          <Terminal size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">else if 链真题</strong>
              <p className="text-sm text-yellow-900">完成下面两道站内题库题（来源待核）。第 8 题的条件少了 == 0，先手推 m % 2 &amp;&amp; n % 2 的值再选。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">上机任务：每月天数</strong>
              <p className="text-sm text-yellow-900">不看例 3，自己用 switch 写出每月天数，用 2022 1（31）、2020 2（29）、2100 2（28）、2023 11（30）核对。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课开始学习循环。分支到这里就学完了：程序重复执行时，分支会写进循环体里。
      </p>
    </div>

    <QuizCard
      badge="课后真题"
      source="站内题库 · 来源待核（2023 年 9 月一级第 7 题）"
      question={'下面 C++ 代码执行后的输出是（ ）。\nint m = 14;\nint n = 12;\nif (m % 2 == 0 && n % 2 == 0)\n cout << "都是偶数";\nelse if (m % 2 == 1 && n % 2 == 1)\n cout << "都是奇数";\nelse\n cout << "不都是偶数或奇数";'}
      mono
      options={[
        { id: 'A', text: '都是偶数', isCorrect: true },
        { id: 'B', text: '都是奇数' },
        { id: 'C', text: '不都是偶数或奇数' },
        { id: 'D', text: '以上说法都不正确' },
      ]}
      explanation="14 % 2 == 0 和 12 % 2 == 0 都成立，第一个条件为真，输出“都是偶数”，后面的 else if 和 else 不再检查。"
    />
    <QuizCard
      badge="课后真题"
      source="站内题库 · 来源待核（2023 年 9 月一级第 8 题）"
      question={'下面 C++ 代码执行后的输出是（ ）。\nint m = 14;\nint n = 12;\nif (m % 2 && n % 2) cout << "A";\nelse if (m % 2 == 1 && n % 2 == 1) cout << "B";\nelse cout << "C";'}
      mono
      options={[
        { id: 'A', text: 'A' },
        { id: 'B', text: 'B' },
        { id: 'C', text: 'C', isCorrect: true },
        { id: 'D', text: '程序运行错误' },
      ]}
      explanation="m % 2 和 n % 2 都是 0，第一个条件是 0 && 0，为假；第二个条件 0 == 1 也为假；最后走 else，输出 C。注意 m % 2 当条件时，非 0 才为真，判断的是“是奇数”。"
    />
  </div>
);

// --- 主应用 ---
export default function App() {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1: return <IntroSlide />;
      case 2: return <ElseIfSlide />;
      case 3: return <OrderSlide />;
      case 4: return <ExamSlide />;
      case 5: return <MultiIfSlide />;
      case 6: return <SwitchSyntaxSlide />;
      case 7: return <FallThroughSlide />;
      case 8: return <DaysSlide />;
      case 9: return <MistakesSlide />;
      case 10: return <PracticeSlide />;
      case 11: return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个写法：把上机题“季节”改用 if / else if 写出核心代码，并分别代入 m = 4 和 m = 12 验证。"
                hint="每个季节是一个月份区间，用 && 连接上下界；12、1、2 月不连续，可以放进最后的 else。"
                answer={'if (m >= 3 && m <= 5) cout << "Spring"; else if (m >= 6 && m <= 8) cout << "Summer"; else if (m >= 9 && m <= 11) cout << "Autumn"; else cout << "Winter";  m = 4 输出 Spring，m = 12 输出 Winter。'}
                steps={[
                    '3～5、6～8、9～11 各写成一个区间条件，例如 m >= 3 && m <= 5。',
                    '剩下的 12、1、2 月放进 else，因为题目保证 1 ≤ m ≤ 12。',
                    'm = 4 第一个条件成立，输出 Spring；m = 12 前三个条件都不成立，走 else 输出 Winter。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-9 多分支与 switch 离开前检查"
              description="如果能预测 else if 命中哪一支、按从高到低写出分档、预测漏写 break 的输出，并用合并 case 写出每月天数，就可以进入第 10 课，开始学习循环。"
              items={lesson9MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会写 if 与 if-else，知道两段只执行一段', '能写出闰年条件', '会用 % 判断能否整除']}
      lessonNumber={9}
      lessonTitle="多分支与 switch"
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
