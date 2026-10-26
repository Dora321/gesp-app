import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Repeat,
  RefreshCw,
  AlertTriangle,
  Terminal,
  XCircle,
  Inbox,
  RotateCcw
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { CodeTracer, MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "repeat": <Repeat size={size} className={className} />,
    "refresh": <RefreshCw size={size} className={className} />,
    "inbox": <Inbox size={size} className={className} />,
    "rotate": <RotateCcw size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson11MasteryItems = [
  {
    label: '能说清 while 先判断后执行，可能一次都不执行。',
    evidence: 'while (条件) 每轮先判断，为真才执行循环体；n = 5 时 while (n < 5) 一次也不执行，n 仍是 5。',
    retryHint: '回到“while 的执行规则”，用减半追踪器数一数判断做了几次、循环体做了几次。',
  },
  {
    label: '能指出循环体里让条件变假的语句。',
    evidence: '能在例 1 里指出 n /= 2 让 n 最终变成 0；能说明删掉这句（或把它写在 continue 等跳转之后）会变成死循环。',
    retryHint: '回到“让条件最终变假”，对照两段代码找出哪一句在推动循环结束。',
  },
  {
    label: '能写出“读到 0 为止”的循环。',
    evidence: '能写出 cin >> x; while (x != 0) { 处理 x; cin >> x; }：先读一个，处理完再读下一个；输入 5 3 -2 0 输出 6 3，只输入 0 时输出 0 0。',
    retryHint: '回到“读到 0 为止”，在读入实验里输入 0 和 5 3 -2 0 各试一次。',
  },
  {
    label: '能说明 do-while 至少执行一次且结尾有分号。',
    evidence: '能说明 do { … } while (条件); 先执行后判断，所以至少执行一次；例 2 输出 0 1；while (条件) 后面的分号不能漏。',
    retryHint: '回到“do-while”，对照例 2 的两段循环，各数一次循环体执行次数。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：要做几次才停", icon: "help", category: "while" },
  { id: 2, title: "while 的执行规则", icon: "repeat", category: "while" },
  { id: 3, title: "让条件最终变假", icon: "alert", category: "while" },
  { id: 4, title: "for 与 while 互相改写", icon: "refresh", category: "while" },
  { id: 5, title: "读到 0 为止", icon: "inbox", category: "while" },
  { id: 6, title: "do-while", icon: "rotate", category: "do-while" },
  { id: 7, title: "真题：2024 年 3 月 / 2025 年 12 月", icon: "check", category: "真题" },
  { id: 8, title: "常见错误与真题", icon: "x", category: "真题" },
  { id: 9, title: "上机：每次减半 / 更相减损", icon: "terminal", category: "真题" },
  { id: 10, title: "小结与课后任务", icon: "book", category: "小结与检查" },
  { id: 11, title: "离开前检查", icon: "check", category: "小结与检查" }
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

const judgeOptions = (correctIsTrue) => [
  { id: 'A', text: '正确', isCorrect: correctIsTrue },
  { id: 'B', text: '错误', isCorrect: !correctIsTrue },
];

// --- 1. 问题导入 ---
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">要做几次才停</h2>
      <p className="text-lg text-gray-600">一个正整数 n 反复除以 2（整数除法），直到变成 0。13 要除几次？1000000000 呢？次数要算完才知道，没法事先写进 for 的终点。</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">for：适合次数能事先算出来</p>
        <CodePanel>{`for (int i = 1; i <= n; i++) {
    …   // 一共 n 次
}`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">while：只写“什么时候继续”</p>
        <CodePanel>{`while (n > 0) {
    n /= 2;   // 次数由 n 自己决定
    steps++;
}`}</CodePanel>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="n = 13 时，右边的循环体执行几次？"
      options={['3 次', '4 次', '13 次']}
      correctIndex={1}
      explanation="13 → 6 → 3 → 1 → 0，除了 4 次；n 变成 0 后 0 > 0 为假，循环结束。"
      misconception="以为要执行 n 次。while 不按次数走，只看条件什么时候变假。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 10 课的 for 处理次数已知的重复。本课处理次数事先不知道的过程：<strong>while 先判断后执行 → 循环体里必须有让条件变假的语句 → for 与 while 互相改写 → 读到 0 为止 → do-while 至少执行一次</strong>，最后完成“每次减半”和“更相减损”两道上机题。
    </div>
  </div>
);

// --- 2. while 的执行规则 ---
const halvingCode = `int n = 13, steps = 0;
while (n > 0) {
    n /= 2;
    steps++;
}
cout << steps << endl;`;

const halvingRounds = [[13, 6], [6, 3], [3, 1], [1, 0]];

const halvingTraceSteps = [
  {
    active: [0],
    vars: { n: 13, steps: 0 },
    action: '判断 13 > 0',
  },
  ...halvingRounds.flatMap(([before, after], index) => [
    {
      active: [1],
      vars: { n: before, steps: index },
      row: [`判断第 ${index + 1} 次`, `${before} > 0`, before, index, '真，进入循环体'],
      action: `执行第 ${index + 1} 轮`,
    },
    {
      active: [2, 3],
      vars: { n: after, steps: index + 1 },
      row: [`第 ${index + 1} 轮`, `${before} / 2 = ${after}`, after, index + 1, `n 变成 ${after}`],
      action: after === 0 ? '检查退出条件' : `判断 ${after} > 0`,
    },
  ]),
  {
    active: [1],
    vars: { n: 0, steps: 4 },
    exit: '再次判断 0 > 0 为假，循环结束。判断做了 5 次，循环体做了 4 次。',
    action: '查看输出',
  },
  {
    active: [5],
    vars: { n: 0, steps: 4 },
    action: '显示结果',
    output: 'steps = 4',
  },
];

const WhileSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">while (条件) 循环体</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '先判断条件：为真，执行一遍循环体；为假，循环结束，接着执行循环后面的语句。',
          '执行完循环体，回到第 1 步再判断。',
          '第一次判断就为假时，循环体一次也不执行。',
          '循环体里必须有语句改变条件里的变量，让条件最终变假。',
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
        <CodePanel>{halvingCode}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'4'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">13 → 6 → 3 → 1 → 0。推动循环结束的是 n /= 2：每轮 n 变小，最后变成 0。</p>
      </div>
    </div>

    <div className="w-full">
      <CodeTracer
        title="减半追踪器：n 每轮除以 2"
        code={halvingCode}
        varOrder={['n', 'steps']}
        columns={['阶段', '判断/运算', 'n', 'steps', '结果']}
        steps={halvingTraceSteps}
        hint="先预测一共判断几次、循环体执行几次，再逐步核对。"
      />
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 11 题）"
      question={'下面 C++ 代码段执行后的输出是（ ）。\nint n = 5;\nwhile (n < 5) n += 2;\ncout << n;'}
      mono
      options={[
        { id: 'A', text: '7' },
        { id: 'B', text: '5', isCorrect: true },
        { id: 'C', text: '4' },
        { id: 'D', text: '6' },
      ]}
      explanation="第一次判断 5 < 5 就为假，n += 2 一次也不执行，输出 5。while 先判断后执行，可能一次都不执行。"
    />
  </div>
);

// --- 3. 让条件最终变假 ---
const ProgressSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-red-800">死循环：条件里的变量不变</h3>
        <CodePanel>{`int n = 3;
while (n > 0)
    cout << n;
n--;   // 不在循环体里`}</CodePanel>
        <p className="mt-3 text-sm text-red-900">while 后面没有大括号，循环体只有 cout 一句。n 一直是 3，条件永远为真，程序不停地输出 3。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-green-800">正确：每轮都靠近结束</h3>
        <CodePanel>{`int n = 3;
while (n > 0) {
    cout << n;
    n--;
}`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">输出 321。n 每轮减 1，减到 0 时条件为假，循环结束。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">写完 while 先问两句</strong>
      条件里用到了哪个变量？循环体里哪一句在改变它，改变的方向能不能让条件变假？两句都答得出来，才不会写成死循环。
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 12 题）"
      question={'下面 C++ 代码段执行后的输出是（ ）。\nint n = 5; int cnt = 1;\nwhile (n >= 0) {\n cnt += 1;\n n -= 2;\n}\ncout << cnt;'}
      mono
      options={[
        { id: 'A', text: '3' },
        { id: 'B', text: '4', isCorrect: true },
        { id: 'C', text: '5' },
        { id: 'D', text: '2' },
      ]}
      explanation="n 依次是 5、3、1 时条件为真，执行 3 轮；n 变成 -1 时 -1 >= 0 为假。cnt 从 1 开始加了 3 次，输出 4。注意计数器的初值不是 0。"
    />
  </div>
);

// --- 4. for 与 while 互相改写 ---
const RewriteSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">同一个循环的两种写法</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">for</p>
          <CodePanel>{`int s = 0, i;
for (i = 1; i <= 5; i++) {
    s += i;
}`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">while</p>
          <CodePanel>{`int s = 0, i;
i = 1;              // 初始化
while (i <= 5) {    // 条件
    s += i;
    i++;            // 更新放在循环体末尾
}`}</CodePanel>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-700">两段执行后都是 s = 15、i = 6。for 的三段分别放到 while 前面、while 的括号里和循环体末尾，就能互相改写。次数已知时 for 更紧凑，次数要等条件变假才知道时 while 更自然。</p>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级第 11 题）"
      question={'下面 C++ 代码执行后的输出是 ( )。\nint n = 10, i = 1;\nwhile (i < n) {\n n--;\n i++;\n}\ncout << n << " " << i;'}
      mono
      options={[
        { id: 'A', text: '5 6', isCorrect: true },
        { id: 'B', text: '6 5' },
        { id: 'C', text: '6 6' },
        { id: 'D', text: '5 5' },
      ]}
      explanation="两个变量相向变化：(n, i) 依次是 (10, 1)、(9, 2)、(8, 3)、(7, 4)、(6, 5)，此时 5 < 6 仍为真，再走一轮变成 (5, 6)；6 < 5 为假，循环结束。输出 5 6。"
    />
  </div>
);

// --- 5. 读到 0 为止 ---
const SentinelLab = () => {
  const [raw, setRaw] = useState('5 3 -2 0');
  const tokens = raw.trim() === '' ? [] : raw.trim().split(/\s+/);
  const valid = tokens.length > 0 && tokens.every((token) => /^-?\d{1,4}$/.test(token));
  const numbers = valid ? tokens.map(Number) : [];
  const zeroAt = numbers.indexOf(0);
  const used = zeroAt === -1 ? numbers : numbers.slice(0, zeroAt);
  const sum = used.reduce((total, value) => total + value, 0);

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-indigo-900">读入实验：程序读到哪个数为止</h3>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="l1-11-sentinel" className="text-sm font-bold text-gray-700">输入（空格分隔的整数）：</label>
        <input id="l1-11-sentinel" type="text" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-56 rounded-lg border-2 border-indigo-300 bg-white px-3 py-2 font-mono focus:border-indigo-500 outline-none" />
        {['5 3 -2 0', '0', '7 0 9 9'].map((sample) => (
          <button key={sample} type="button" onClick={() => setRaw(sample)} className="rounded border bg-white px-2 py-1 text-xs hover:bg-indigo-100">试 {sample}</button>
        ))}
      </div>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {numbers.map((value, index) => {
              const state = zeroAt === -1 || index < zeroAt ? 'used' : index === zeroAt ? 'stop' : 'unread';
              const cls = state === 'used' ? 'bg-green-100 text-green-800 ring-green-300' : state === 'stop' ? 'bg-red-100 text-red-700 ring-red-300' : 'bg-slate-100 text-slate-400 ring-slate-200 line-through';
              return <span key={`${value}-${index}`} className={`rounded-lg px-3 py-1 font-mono font-bold ring-1 ${cls}`}>{value}</span>;
            })}
          </div>
          {zeroAt === -1 ? (
            <p className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">输入里没有 0：程序处理完这些数后会停在 cin &gt;&gt; x 等待下一个数，循环不会结束。</p>
          ) : (
            <>
              <OutputPanel>{`${sum} ${used.length}`}</OutputPanel>
              <p className="text-sm text-indigo-900">绿色的数被累加；读到红色的 0 时 x != 0 为假，循环结束，0 不计入；0 后面灰色的数根本没被读。</p>
            </>
          )}
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入用空格分隔的整数（每个 -9999～9999）；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

const SentinelSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：输入若干整数，以 0 结束，求和与个数</p>
        <CodePanel>{`int x, sum = 0, cnt = 0;
cin >> x;              // 先读一个
while (x != 0) {
    sum += x;          // 处理
    cnt++;
    cin >> x;          // 再读下一个
}
cout << sum << " " << cnt << endl;`}</CodePanel>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-sm font-bold text-slate-600">两组输入</p>
        <OutputPanel>{`输入 5 3 -2 0 → 6 3
输入 0       → 0 0`}</OutputPanel>
        <p className="text-sm text-slate-700">“读到 0 为止”的固定写法：循环前先读一个；循环体先处理，最后一句再读下一个。这样读到 0 时，下一次判断立即结束，0 不会被当成数据处理。</p>
        <p className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-950">只输入 0 时，循环体一次也不执行，输出 0 0。这正是 while 先判断的好处。</p>
      </div>
    </div>

    <SentinelLab />

    <PredictCheck
      className="w-full"
      prompt="把例 3 循环体里的 cin >> x; 挪到 sum += x; 前面（循环前那句不动），输入 5 3 -2 0 时输出什么？"
      options={['6 3', '1 3', '1 4']}
      correctIndex={2}
      explanation="第一个 5 读进来后马上被下一句 cin 覆盖，没有被加；之后依次加了 3、-2 和结束标志 0，sum = 1、cnt = 4。读入和处理的顺序一换，第一个数丢了，0 也被算进去。"
      misconception="以为读入语句放在循环体哪里都一样。"
    />
  </div>
);

// --- 6. do-while ---
const DoWhileSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">do 循环体 while (条件);</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <CodePanel>{`do {
    循环体;
} while (条件);   // 结尾的分号不能少`}</CodePanel>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">先执行一遍循环体，再判断条件；条件为真就再执行一遍。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">所以循环体<strong>至少执行一次</strong>，这是它和 while 唯一的区别。</li>
          <li className="rounded-lg border border-amber-200 bg-amber-50 p-3">while (条件) 后面要写分号；普通 while 的括号后面写分号反而会出错（循环体变成空语句）。</li>
        </ul>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：初始条件就为假</p>
        <CodePanel>{`int a = 10, c1 = 0, c2 = 0;
while (a < 5) { c1++; a++; }
int b = 10;
do { c2++; b++; } while (b < 5);
cout << c1 << " " << c2 << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'0 1'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">while 先判断 10 &lt; 5 为假，一次不执行，c1 = 0。do-while 先执行一次，c2 变成 1、b 变成 11，再判断 11 &lt; 5 为假，结束。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="int k = 0; do { k += 3; } while (k < 10); 执行后 k 是多少？"
      options={['9', '10', '12']}
      correctIndex={2}
      explanation="k 依次变成 3、6、9（每次判断都 < 10，继续），再加到 12，判断 12 < 10 为假，结束。k = 12。"
      misconception="以为 k 一到接近 10 就停。条件是在加完之后才判断的。"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 6 月一级判断题第 7 题）"
      question="do ... while 语句的循环体至少会执行一次。"
      options={judgeOptions(true)}
      explanation="do-while 先执行循环体再判断条件，所以无论条件开始时真假，循环体都至少执行一次。"
    />
  </div>
);

// --- 7. 真题 ---
const ExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 9 题"
      question={'下面 C++ 代码执行后的输出是（ ）。\nint N = 10;\nwhile(N){\n    N -= 1;\n    if(N%3 == 0)\n        cout << N << "#";\n}'}
      mono
      options={[
        { id: 'A', text: '9#6#3#' },
        { id: 'B', text: '9#6#3#0#', isCorrect: true },
        { id: 'C', text: '8#7#5#4#2#1#' },
        { id: 'D', text: '10#8#7#5#4#2#1#' },
      ]}
      explanation="while(N) 等于 while(N != 0)（第 7 课：非零即真）。每轮先减 1 再判断：N 依次是 9、8、…、1、0，其中 9、6、3、0 能被 3 整除，都输出。N 变成 0 的那一轮仍在循环体里，所以 0# 也会输出；之后判断 while(0) 为假才结束。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">更相减损</strong>
      两个正整数只要不相等，就用大数减去小数替换大数，直到两数相等。例如 12 和 18：(12, 18) → (12, 6) → (6, 6)，结果是 6，就是两数的最大公因数。减几次事先不知道，正适合 while。
    </div>

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 12 题"
      question={'两个正整数，只要不相等，就一直进行如下操作：最大数减去最小数得到一个值，该值和两个数中的最小数构成两个新的正整数，重复操作，直到两个数相等。此时输出。编程解决上述问题，横线处应选 ( )。\nwhile (N != M) {\n if (N > M)\n ________________\n else\n ________________\n}\ncout << N;'}
      mono
      options={[
        { id: 'A', text: 'N = N-M; M = M-N;', isCorrect: true },
        { id: 'B', text: 'N -= M; M -= N;' },
        { id: 'C', text: 'N = M; M = N;' },
        { id: 'D', text: 'M = N; N = M;' },
      ]}
      explanation="两个横线分别填在 if 和 else 后：N 大时 N = N - M，否则 M = M - N，大数被差替换。A 把这两句依次填入两条横线，正确。B 按同样方式拆开也是 N -= M 和 M -= N，与 A 等价——但站内题库给出的答案是 A，选项 B 若按原卷写法是一条横线里连写两句，就会每轮都执行两次减法。C、D 只是赋值，两数立刻相等，结果不对。（A 已用 12 18 编译运行核对，输出 6。）"
    />
  </div>
);

// --- 8. 常见错误与真题 ---
const UpdatePositionLab = () => {
  const [raw, setRaw] = useState('10');
  const trimmed = raw.trim();
  const valid = /^\d{1,2}$/.test(trimmed) && Number(trimmed) >= 1 && Number(trimmed) <= 30;
  const N = Number(trimmed);

  const run = (moveFirst) => {
    let i = 1;
    let sum = 0;
    const added = [];
    while (i <= N) {
      if (moveFirst) i += 1;
      if (i % 2 === 1) { sum += i; added.push(i); }
      if (!moveFirst) i += 1;
    }
    return { i, sum, added };
  };
  const original = valid ? run(false) : null;
  const moved = valid ? run(true) : null;

  return (
    <div className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
      <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-orange-800">
        <AlertTriangle className="text-orange-600" size={22} /> 更新位置实验：i += 1 放在哪里
      </h3>
      <p className="mb-4 text-sm text-orange-900">根据 2024 年 6 月 GESP C++ 一级第 11 题改编：求 1～N 中所有奇数之和。</p>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="l1-11-update-n" className="text-sm font-bold text-gray-700">N（1～30）：</label>
        <input id="l1-11-update-n" type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-24 rounded border-2 border-orange-300 px-3 py-2 text-center font-mono text-lg focus:border-orange-500 focus:outline-none" />
      </div>
      {valid ? (
        <div role="status" className="grid gap-4 md:grid-cols-2">
          {[['更新在 if 之后（原程序）', original, 'while (i <= N) {\n    if (i % 2 == 1) Sum += i;\n    i += 1;\n}'], ['更新挪到 if 之前', moved, 'while (i <= N) {\n    i += 1;\n    if (i % 2 == 1) Sum += i;\n}']].map(([label, result, code]) => (
            <div key={label} className="min-w-0 rounded-xl border border-orange-100 bg-white p-4">
              <p className="mb-2 text-sm font-bold text-slate-700">{label}</p>
              <CodePanel>{code}</CodePanel>
              <p className="mt-2 text-sm text-slate-700">加进去的数：<span className="font-mono">{result.added.join(' + ') || '无'}</span></p>
              <OutputPanel>{`i = ${result.i}，Sum = ${result.sum}`}</OutputPanel>
            </div>
          ))}
          <p className="text-sm font-bold text-orange-900 md:col-span-2">挪到前面后，第一个被检查的是 2，1 被漏掉；N 为偶数时还会多加一个 N + 1。更新语句的位置决定了循环体处理的是哪些值。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～30 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

const mistakeCards = [
  { title: '忘了更新条件里的变量', code: 'while (n > 0) cout << n;', detail: 'n 不变，条件永远为真，死循环。循环体里要有推动结束的语句。' },
  { title: '更新语句放错位置', code: 'i += 1; if (i % 2 == 1) Sum += i;', detail: '先更新再处理，第一个值被跳过，最后还可能多处理一个越界的值。' },
  { title: 'do-while 结尾漏分号', code: 'do { … } while (b < 5)', detail: '编译错误。do-while 的 while (条件) 后面必须有分号。' },
  { title: '读入循环忘了再读', code: 'cin >> x; while (x != 0) { sum += x; }', detail: '循环体里没有 cin >> x，x 不变，死循环。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> while 与 do-while 常见错误
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

    <UpdatePositionLab />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">while (1) 必须配一条能执行到的 break</strong>
      while (1) 的条件永远为真，只能靠循环体里的 break 离开。break 在第 9 课的 switch 里见过：执行到它就立即跳出。下一课专门学循环里的 break 和 continue。
    </div>

    <QuizCard
      source="2023 年 12 月 GESP C++ 一级第 8 题（本站已对照官方卷校订）"
      question={'下面 C++ 代码执行后的输出是（　）。\nN = 10;\ncnt = 0;\nwhile (1) {\n    if (N == 0) break;\n    cnt += 1;\n    N -= 2;\n}\ncout << cnt;'}
      mono
      options={[
        { id: 'A', text: '11' },
        { id: 'B', text: '10' },
        { id: 'C', text: '5', isCorrect: true },
        { id: 'D', text: '4' },
      ]}
      explanation="N 依次是 10、8、6、4、2 时不等于 0，cnt 各加 1，共 5 次；N 变成 0 后，下一轮执行 break 跳出循环。输出 5。"
    />
  </div>
);

// --- 9. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 11-A',
    title: '每次减半',
    statement: '输入正整数 n（1 ≤ n ≤ 10⁹）。反复执行 n = n / 2（整数除法），直到 n 为 0，输出一共执行了几次。要求用 while 循环。',
    samples: [['13', '4'], ['1', '1']],
    hint: '条件写 n > 0，循环体里 n /= 2 和计数各一句。自己再补测 1000000000，应输出 30。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, cnt = 0;
    cin >> n;
    while (n > 0) {
        n /= 2;
        cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 11-B',
    title: '更相减损',
    statement: '输入一行两个正整数 a、b（1 ≤ a, b ≤ 1000）。只要两数不相等，就用大数减去小数替换大数，直到两数相等，输出这个数。',
    samples: [['12 18', '6'], ['7 7', '7']],
    hint: '核心是 while (a != b) { if (a > b) a -= b; else b -= a; }。两数一开始就相等时，循环一次也不执行。',
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    while (a != b) {
        if (a > b) a -= b;
        else b -= a;
    }
    cout << a << endl;
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

// --- 10. 小结与课后任务 ---
const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><BookOpen size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            'while (条件) 先判断后执行，第一次判断为假时一次也不执行；适合次数事先不知道的过程。',
            '循环体里必须有改变条件变量的语句，并且朝着让条件变假的方向变化，否则死循环。',
            'for 和 while 可以互相改写：初始化写在 while 前，条件写进括号，更新写在循环体末尾。',
            '读到 0 为止：循环前先读一个，循环体先处理、最后再读下一个。',
            'do { … } while (条件); 先执行后判断，至少执行一次，结尾的分号不能少。',
            'while (1) 条件永远为真，必须靠一条能执行到的 break 离开。',
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
              <strong className="mb-1 block text-yellow-900">改写练习</strong>
              <p className="text-sm text-yellow-900">把第 10 课上机题“每天多读一页”改用 while 写一遍，用 4（10）和 1（1）核对；再说明初始化、条件、更新各放在了哪里。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">读入练习：正数个数</strong>
              <p className="text-sm text-yellow-900">输入若干整数，以 0 结束，输出其中正数的个数。用 5 -3 8 0（2）和 0（0）核对。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课：break 与 continue。两种循环都会写了，下一课学怎样在循环中途跳过一轮，或者找到答案就提前结束。
      </p>
    </div>
  </div>
);

// --- 主应用 ---
export default function App() {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1: return <IntroSlide />;
      case 2: return <WhileSlide />;
      case 3: return <ProgressSlide />;
      case 4: return <RewriteSlide />;
      case 5: return <SentinelSlide />;
      case 6: return <DoWhileSlide />;
      case 7: return <ExamSlide />;
      case 8: return <MistakesSlide />;
      case 9: return <PracticeSlide />;
      case 10: return <SummarySlide />;
      case 11:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：输入一个正整数 n，每次把 n 减去 3，直到 n 小于等于 0，输出减了几次。写出核心代码，并手推 n = 10 时的输出。"
                hint="条件写“还要继续”的情况：n > 0。循环体里减 3 并计数。"
                answer="int cnt = 0; while (n > 0) { n -= 3; cnt++; } cout << cnt;  n = 10 时 n 依次变成 7、4、1、-2，输出 4。"
                steps={[
                    '条件是 n > 0：n 还大于 0 就继续减。',
                    '循环体两句：n -= 3; cnt++;，其中 n -= 3 推动循环结束。',
                    'n = 10：7、4、1、-2，减了 4 次；-2 > 0 为假，输出 4。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-11 while 与 do-while 离开前检查"
              description="如果能说清 while 先判断后执行、指出让条件变假的语句、写出“读到 0 为止”的循环，并说明 do-while 至少执行一次，就可以进入第 12 课：break 与 continue。"
              items={lesson11MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['能手推 for 循环的执行次数和结束值（第 10 课）', '知道整数当条件时只有 0 是假（第 7 课）', '会用 / 求整数除法的商（第 3 课）']}
      lessonNumber={11}
      lessonTitle="while 与 do-while"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/12"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={11} />}
      bottomSupport={<CppL1LessonSupport lessonId={11} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
