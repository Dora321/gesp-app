import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Bug,
  Calculator,
  CheckCircle2,
  HelpCircle,
  Repeat,
  AlertTriangle,
  Terminal,
  XCircle,
  Hash
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { CodeTracer, MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { LoopStepper, RangeCounter } from './Lesson10Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "repeat": <Repeat size={size} className={className} />,
    "hash": <Hash size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "calc": <Calculator size={size} className={className} />,
    "arrow": <ArrowRight size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "bug": <Bug size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson10MasteryItems = [
  {
    label: '能说出 for 三段的执行顺序。',
    evidence: '初始化只执行一次；之后每轮先判断条件，为真才执行循环体，执行完再做更新，然后回到判断。条件第一次就为假时，循环体一次也不执行。',
    retryHint: '回到“for 的执行顺序”，用逐步执行实验数一数判断一共做了几次（比循环体多 1 次）。',
  },
  {
    label: '能手推循环结束后 i 的值。',
    evidence: '循环结束时 i 是第一个让条件变假的值：for (i = 1; i < 10; i++) 结束后 i 是 10；for (i = 1; i < 10; i += 3) 执行 3 次，结束后 i 也是 10。',
    retryHint: '回到陷阱追踪器，不要跳过最后一次判断；把“最后一次进入”和“循环结束后”分成两列写。',
  },
  {
    label: '能写出计数、累加、累乘并选对初值。',
    evidence: '计数器和累加器先清 0，累乘器初值为 1；累乘从 i = 0 开始结果恒为 0。例 2 输入 4 输出 10 20。',
    retryHint: '回到“计数、累加与累乘”，把例 2 每轮的 i、s、total 写成表格。',
  },
  {
    label: '能识别空循环体分号和循环内改 i。',
    evidence: 'for (i = 1; i < 4; i++); 的分号让循环体为空，后面的 total += i 只执行一次，输出 4；循环体里再写 i += 2，执行次数会变少。',
    retryHint: '回到“空循环体与循环内改 i”，对照例 4 有分号和没分号两种写法。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：重复 n 次", icon: "help", category: "for 循环" },
  { id: 2, title: "for 的执行顺序", icon: "repeat", category: "for 循环" },
  { id: 3, title: "执行次数与结束值", icon: "hash", category: "for 循环" },
  { id: 4, title: "真题：执行次数", icon: "check", category: "for 循环" },
  { id: 5, title: "计数、累加与累乘", icon: "calc", category: "常见写法" },
  { id: 6, title: "省略三段与自增", icon: "arrow", category: "常见写法" },
  { id: 7, title: "空循环体与循环内改 i", icon: "alert", category: "常见写法" },
  { id: 8, title: "单步调试", icon: "bug", category: "常见写法" },
  { id: 9, title: "常见错误与真题", icon: "x", category: "真题" },
  { id: 10, title: "上机：每天多读一页 / 区间个数与和", icon: "terminal", category: "真题" },
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

const judgeOptions = (correctIsTrue) => [
  { id: 'A', text: '正确', isCorrect: correctIsTrue },
  { id: 'B', text: '错误', isCorrect: !correctIsTrue },
];

// --- 1. 问题导入 ---
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">重复 n 次</h2>
      <p className="text-lg text-gray-600">求 1 + 2 + … + 100。一行一行写 100 次加法显然不行；更麻烦的是 n 由输入决定，写代码时根本不知道要写几行。</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">顺序写法：只能写死次数</p>
        <CodePanel>{`int s = 0;
s += 1;
s += 2;
s += 3;
// …… 要一直写到 s += 100;`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">for 循环：把“重复”交给程序</p>
        <CodePanel>{`int n, s = 0;
cin >> n;
for (int i = 1; i <= n; i++) {
    s += i;
}
cout << s << endl;`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">输入 100 输出 5050，输入 4 输出 10。同一段代码，次数随 n 变化。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="右边的程序输入 3，循环体 s += i 一共执行几次？"
      options={['2 次', '3 次', '4 次']}
      correctIndex={1}
      explanation="i 依次取 1、2、3，每个值执行一次循环体，共 3 次；i 变成 4 时 4 <= 3 为假，循环结束。s = 1 + 2 + 3 = 6。"
      misconception="把最后那次“判断为假”也算成一次执行。判断比循环体多做 1 次。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      前 9 课的程序每行最多执行一次。本课学第一种循环：<strong>for 的执行顺序 → 执行次数与结束值 → 计数、累加、累乘 → 自增、空循环体等边角写法 → 单步调试核对</strong>，最后完成“每天多读一页”和“区间个数与和”两道上机题。
    </div>
  </div>
);

// --- 2. for 的执行顺序 ---
const OrderSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">for (初始化; 条件; 更新) 循环体</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '初始化：只在开始时执行一次，通常给循环变量赋初值，如 int i = 1。',
          '判断条件：为真，执行循环体；为假，整个循环结束，接着执行循环后面的语句。',
          '执行循环体：大括号里的语句；只有一条语句时可以不写大括号。',
          '执行更新：如 i++，然后回到第 2 步再判断。',
        ].map((rule, index) => (
          <li key={rule} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">顺序是“判断 → 循环体 → 更新 → 判断……”。所以条件第一次就为假时，循环体一次也不执行；判断的次数总比循环体多 1 次。</p>
    </div>

    <LoopStepper />

    <PredictCheck
      className="w-full"
      prompt="int cnt = 0; for (int i = 1; i <= 0; i++) cnt++; 执行后 cnt 是多少？"
      options={['0，条件一开始就为假', '1，循环体至少执行一次', '会无限循环']}
      correctIndex={0}
      explanation="初始化后先判断 1 <= 0，结果为假，循环体一次都不执行，cnt 仍是 0。for 循环可以执行 0 次。"
      misconception="以为先执行一次循环体再判断。先执行后判断的是第 11 课的 do-while。"
    />
  </div>
);

// --- 3. 执行次数与结束值 ---
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
    return [
      {
        active: [1],
        vars: { N: index, i },
        row: [`判断 ${i}`, `${i} < 10`, '真', index, '进入循环体'],
        action: `执行第 ${i} 轮`,
      },
      {
        active: [2],
        vars: { N: index + 1, i },
        row: [`第 ${i} 轮`, `i = ${i}`, 'N += 1', index + 1, `i++ 后变成 ${i + 1}`],
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

const CountSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">数次数，看终点</h3>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">for (i = a; i &lt; b; i++) 执行 b − a 次；for (i = a; i &lt;= b; i++) 执行 b − a + 1 次。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">步长不是 1 时，不要套公式，先把 i 的取值列出来再数。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">循环结束时，i 是<strong>第一个让条件变假的值</strong>，不是最后一次进入循环体时的值。</li>
        <li className="rounded-lg border border-amber-200 bg-amber-50 p-3">要在循环外读 i，就把 i 声明在循环外（int i; for (i = 1; …)）。写成 for (int i = 1; …) 时，i 只在循环里有效。</li>
      </ul>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1：步长为 3</p>
        <CodePanel>{`int i, cnt = 0;
for (i = 1; i < 10; i += 3) {
    cnt++;
}
cout << cnt << " " << i << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'3 10'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">i 取 1、4、7，共 3 次；7 + 3 = 10，10 &lt; 10 为假，循环结束，i 停在 10。</p>
      </div>
    </div>

    <RangeCounter />

    <div className="w-full">
      <CodeTracer
        title="陷阱追踪器：循环结束时 i 到底是多少？"
        code={trapCode}
        varOrder={['N', 'i']}
        columns={['阶段', 'i', '动作', 'N', '结果']}
        steps={trapTraceSteps}
        hint="先别猜答案，逐步看每次判断和更新。"
      />
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <PredictCheck
        prompt="int i; for (i = 1; i < 10; i++) 结束后，i 停在几？"
        options={['9', '10', '不确定']}
        correctIndex={1}
        explanation="最后一次执行时 i = 9，执行完 i++ 变成 10；再次判断 10 < 10 为假，所以停在 10。"
        misconception="把最后一次执行的 i 值，当成循环结束后的 i 值。"
      />
      <PredictCheck
        prompt="for (int i = 0; i < 5; i++) 最后一次进入循环体时 i 是多少？"
        options={['4', '5', '6']}
        correctIndex={0}
        explanation="条件是 i < 5，所以 i = 0、1、2、3、4 都能进入；i = 5 时不能进入，循环结束。"
        misconception="把循环结束时的 i = 5，当成最后一次执行时的 i。"
      />
    </div>
  </div>
);

// --- 4. 真题：执行次数 ---
const CountExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：先列取值，再数次数</h3>
      <p className="mt-1 text-slate-500">四道题都只考次数和结束值。</p>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 7 题"
      question={'下面 C++ 代码第 2 行，总共被执行次数是（ ）。\nfor(int i=-10; i<10; i++)\n    cout << i << " ";'}
      mono
      options={[
        { id: 'A', text: '10' },
        { id: 'B', text: '19' },
        { id: 'C', text: '20', isCorrect: true },
        { id: 'D', text: '21' },
      ]}
      explanation="i 从 -10 取到 9。条件是 i < 10，用 b − a：10 − (−10) = 20。也可以分段数：-10～-1 有 10 个，0～9 有 10 个，共 20 次。"
    />
    <QuizCard
      source="2024 年 9 月 GESP C++ 一级判断题第 6 题"
      question={'下面 C++ 代码执行后，最后一次输出是 10。\nfor (int i = 1; i < 10; i += 3)\n cout << i << endl;'}
      options={judgeOptions(false)}
      explanation="输出的是循环体里的 i：1、4、7。i 变成 10 时 10 < 10 为假，循环已经结束，10 不会被输出。说法错误。“结束后 i 是 10”和“最后一次输出 10”是两回事。"
    />
    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 9 题"
      question={"下面C++代码执行后其输出是 ( )。\nint i, tnt = 0;\nfor (i = 0; i < 100; i++)\n tnt += 1;\ncout << tnt << ' ' << i;"}
      mono
      options={[
        { id: 'A', text: '99 99' },
        { id: 'B', text: '100 99' },
        { id: 'C', text: '99 100' },
        { id: 'D', text: '100 100', isCorrect: true },
      ]}
      explanation="i 取 0～99，共 100 次，tnt = 100；i 在循环外声明，结束时停在第一个让 i < 100 为假的值 100。输出 100 100。"
    />
    <QuizCard
      source="2025 年 12 月 GESP C++ 一级判断题第 5 题"
      question={'下面C++代码执行后将输出 99，因为 i < 100 不包括 100，而是到 99。\nint cnt = 0;\nfor (int i = 0; i < 100; i++)\n cnt++;\ncout << cnt;'}
      options={judgeOptions(false)}
      explanation="i 确实只到 99，但 i 从 0 开始，0～99 共 100 个值，cnt 是 100。说法错误。数次数要同时看起点和终点。"
    />
  </div>
);

// --- 5. 计数、累加与累乘 ---
const AccumulateSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-3">
      {[
        ['计数器', 'int cnt = 0;', 'cnt++;', '统计“有几个”。初值 0。'],
        ['累加器', 'int s = 0;', 's += i;', '求“一共多少”。初值 0。'],
        ['累乘器', 'int p = 1;', 'p *= i;', '求连乘。初值 1；写成 0 结果恒为 0。'],
      ].map(([title, init, update, note]) => (
        <div key={title} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-3 text-lg font-bold text-gray-800">{title}</h3>
          <CodePanel>{`${init}\nfor (…) {\n    ${update}\n}`}</CodePanel>
          <p className="mt-3 text-sm text-slate-700">{note}</p>
        </div>
      ))}
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：累计相加</p>
        <CodePanel>{`int n, s = 0, total = 0;
cin >> n;
for (int i = 1; i <= n; i++) {
    s += i;
    total += s;
}
cout << s << " " << total << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输入 4 时每轮的值</p>
        <OutputPanel>{`i = 1：s = 1，total = 1
i = 2：s = 3，total = 4
i = 3：s = 6，total = 10
i = 4：s = 10，total = 20
输出 10 20（输入 10 时输出 55 220）`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">s 是 1 + 2 + … + i，total 把每轮的 s 再加起来，就是 1 + (1+2) + (1+2+3) + …。</p>
      </div>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 8 题"
      question={'下面 C++ 代码执行后输出是（ ）。\nint Sum = 0;\nfor (int i = 0; i < 10; i++)\n Sum += i;\ncout << Sum;'}
      mono
      options={[
        { id: 'A', text: '55' },
        { id: 'B', text: '45', isCorrect: true },
        { id: 'C', text: '10' },
        { id: 'D', text: '9' },
      ]}
      explanation="累加的是 i 本身：0 + 1 + … + 9 = 45。i 不会取到 10，所以不是 55。同卷第 9 题把 Sum += i 换成 N += 1，那是计数，结果是 10。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 6 月一级第 15 题）"
      question={'未初始化 sum 变量的输出：\nint sum;\nfor (int i = 1; i <= 10; i++) sum += i;\ncout << sum << endl;'}
      mono
      options={[
        { id: 'A', text: '55' },
        { id: 'B', text: '0' },
        { id: 'C', text: '45' },
        { id: 'D', text: '无法确定', isCorrect: true },
      ]}
      explanation="sum 定义时没有赋初值，它原来是什么值无法确定，加上 55 之后仍然无法确定。累加器、计数器在循环前一定先清 0。"
    />
  </div>
);

// --- 6. 省略三段与自增 ---
const OmitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">三段都可以省略，两个分号不能省</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <CodePanel>{`int i = 0;          // 初始化写在前面
for ( ; i < 3; ) {
    cout << i;
    i++;            // 更新写进循环体
}`}</CodePanel>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">省略初始化：变量要在前面先赋好初值。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">省略更新：循环体里必须有让条件变假的语句，否则停不下来。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">更新段可以用逗号写两件事，如 i++, count++（第 5 课的逗号运算）。</li>
        </ul>
      </div>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 9 题"
      question={'下面 C++ 代码执行后输出是（ ）。\nint Sum = 0, i = 0;\nfor ( ; i < 10; )\n    Sum += i++;\ncout << i << " " << Sum;'}
      mono
      options={[
        { id: 'A', text: '9 45' },
        { id: 'B', text: '10 55' },
        { id: 'C', text: '10 45', isCorrect: true },
        { id: 'D', text: '11 55' },
      ]}
      explanation="Sum += i++ 先用 i 的旧值累加，再让 i 加 1（第 5 课）。所以加进去的是 0、1、…、9，Sum = 45；i 加到 10 时 10 < 10 为假，循环结束。输出 10 45。"
    />
    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 12 题"
      question={'执行下面 C++ 代码后得到的输出是（ ）。\nint count = 0, i, s;\nfor (i = 0, s = 0; i < 20; i++, count++)\n s += i++;\ncout << s << " " << count;'}
      mono
      options={[
        { id: 'A', text: '190 20' },
        { id: 'B', text: '95 10' },
        { id: 'C', text: '90 19' },
        { id: 'D', text: '90 10', isCorrect: true },
      ]}
      explanation="每轮 i 加 2：循环体里 i++ 一次，更新段 i++ 再一次。所以累加的是 0、2、4、…、18，共 10 轮，s = 90；count 每轮加 1，是 10。"
    />
  </div>
);

// --- 7. 空循环体与循环内改 i ---
const EmptyBodySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 4：for 后面多了分号</p>
        <CodePanel>{`int total = 0, i;
for (i = 1; i < 4; i++);
total += i;
cout << total << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'4'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">分号本身就是一条空语句，成了循环体。循环空转 3 次，i 停在 4；total += i 在循环外，只执行一次，total = 4。和第 8 课的 if (条件); 是同一个陷阱。</p>
      </div>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 12 月一级第 6 题）"
      question={'下面C++代码执行后的输出是（　）。\ncnt = 0;\nfor(int i = 1; i < 10; i++){\n    cnt += 1;\n    i += 2;\n}\ncout << cnt;'}
      mono
      options={[
        { id: 'A', text: '10' },
        { id: 'B', text: '9' },
        { id: 'C', text: '3', isCorrect: true },
        { id: 'D', text: '1' },
      ]}
      explanation="循环体里 i += 2，更新段再 i++，每轮 i 共加 3。i 取 1、4、7，共 3 轮，cnt = 3。在循环体里改循环变量会改变次数。"
    />

    <QuizCard
      badge="提高"
      source="2025 年 12 月 GESP C++ 一级判断题第 4 题"
      question={'下面C++代码中的 i > -10; i-- 改为 i < 10; i++ 执行结果相同。\nint tnt = 0;\nfor (int i = 0; i > -10; i--){\n if (i < 0)\n i = -i;\n tnt += i;\n}\ncout << tnt;'}
      mono
      options={judgeOptions(false)}
      explanation="原代码：i = 0 时累加 0，i-- 变成 -1；判断 -1 > -10 为真，循环体把 i 改成 1，累加 1，i-- 又回到 0……i 在 0 和 1 之间来回，永远不会小于等于 -10，是死循环。改成 i < 10; i++ 后 i 从 0 到 9，输出 45。结果不同，说法错误。"
    />

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">for 也可能是死循环</strong>
      条件永远为真（如上题），或省略了更新段又没有在循环体里更新，for 一样停不下来。写完循环先问：每轮之后，i 离“条件变假”是不是更近了一步？
    </div>
  </div>
);

// --- 8. 单步调试 ---
const DebugSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">调试：让机器帮你画追踪表</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['断点', '在某一行设置断点，程序运行到这一行之前会暂停。'],
          ['单步执行', '每按一次只执行一行，循环的每一轮都能看清。'],
          ['查看变量', '暂停时查看 i、s 等变量的当前值，和自己手推的表格逐行对照。'],
        ].map(([title, detail]) => (
          <div key={title} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-2 font-bold text-blue-900">{title}</p>
            <p className="text-sm text-blue-950">{detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">对循环最有用的做法：在循环体第一行设断点，每停一次记下 i 和累加器的值。也可以临时加一句 cout 输出中间结果，核对完再删掉。</p>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 2 题"
      question="C++ 程序执行出现错误时，不太常见的调试手段是（ ）。"
      options={[
        { id: 'A', text: '阅读源代码' },
        { id: 'B', text: '单步调试' },
        { id: 'C', text: '输出执行中间结果' },
        { id: 'D', text: '跟踪汇编代码', isCorrect: true },
      ]}
      explanation="阅读源代码、单步调试、输出中间结果都是写 C++ 时常用的调试手段。跟踪汇编代码要读机器层面的指令，一般写程序时很少用到。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级第 2 题）"
      question={'关于计算机编程环境及断点调试，下列说法是错误的是( )。\n1 int N = 0; // L1\n2 cin >> N; // L2\n3 if (N < 9)\n4 printf("N不能大于等于9"); // L4'}
      mono
      options={[
        { id: 'A', text: '断点不可以设置在L1标记的代码行', isCorrect: true },
        { id: 'B', text: '执行暂停在L2标记的代码行时，可以检测N的值' },
        { id: 'C', text: '执行暂停在L3标记的代码行时，可以修改局部变量N' },
        { id: 'D', text: '执行有可能暂停在L4标记的代码行' },
      ]}
      explanation="定义并初始化变量的语句也是可执行的语句，断点可以设在 L1，A 的说法错误。暂停时可以查看、修改变量；输入小于 9 时程序会执行到 L4，所以也可能停在 L4。"
    />
  </div>
);

// --- 9. 常见错误与真题 ---
const mistakeCards = [
  { title: '把最后一次进入当成结束值', code: 'for (i = 1; i < 10; i++)', detail: '最后一次进入时 i = 9，结束后 i = 10。结束值是第一个让条件变假的值。' },
  { title: '累加器没有清 0', code: 'int sum; … sum += i;', detail: '未初始化的变量值无法确定，结果也无法确定。' },
  { title: 'i < 100 当成 99 次', code: 'for (int i = 0; i < 100; i++)', detail: '0～99 共 100 个值。用 b − a 算：100 − 0 = 100。' },
  { title: '累乘从 0 开始', code: 'int p = 1; for (i = 0; …) p *= i;', detail: '第一轮就乘了 0，结果恒为 0。累乘的初值和起点都要检查。' },
  { title: '以为 for 不会死循环', code: 'for (int i = 0; i > -10; i--) { if (i < 0) i = -i; … }', detail: '循环体改了 i，条件可能永远为真。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> for 循环常见错误
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
      source="2025 年 12 月 GESP C++ 一级第 10 题"
      question={'有关下面C++代码的发展，错误的是 ( )\nint tnt = 0;\nfor (int i = 1; i < 10; i += 2) // L1\n tnt += i; // L2\ncout << tnt;'}
      mono
      options={[
        { id: 'A', text: 'L1 的 i < 10 改为 i < 11 结果相同。' },
        { id: 'B', text: 'L1 的 i = 1 改为 i = 0 结果相同。', isCorrect: true },
        { id: 'C', text: 'tnt += i 与 tnt = tnt+i 结果相同。' },
        { id: 'D', text: 'tnt += i 与 tnt = i+tnt 结果相同。' },
      ]}
      explanation="原代码 i 取 1、3、5、7、9，tnt = 25。改成 i < 11 时 i 仍取这 5 个值（11 不满足），结果相同；改成 i = 0 后 i 取 0、2、4、6、8，tnt = 20，结果不同，B 错误。C、D 是复合赋值的等价写法。"
    />
    <QuizCard
      source="2024 年 3 月 GESP C++ 一级判断题第 10 题"
      question="任何一个 for 循环都可以转化为等价的 while 循环。（ ）"
      options={judgeOptions(true)}
      explanation="把 for 的初始化写在 while 前面，条件写进 while 的括号，更新写在循环体末尾，就得到等价的 while 循环。第 11 课会具体改写。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 3 月一级第 13 题）"
      question={'下面C++代码执行后输出是（ ）。\nint tnt = 0;\nfor (int i = -1000; i < 1000; i++)\n tnt += i;\ncout << tnt << endl;'}
      mono
      options={[
        { id: 'A', text: '-1000', isCorrect: true },
        { id: 'B', text: '0' },
        { id: 'C', text: '999' },
        { id: 'D', text: '1000' },
      ]}
      explanation="i 从 -1000 到 999。-999 和 999、-998 和 998……两两抵消为 0，0 本身也是 0，只剩下 -1000 没有配对，结果是 -1000。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 9 月一级第 8 题）"
      question={'下面C++代码执行后的输出是（ ）。\nint n = 0;\nfor (int i = 0; i < 100; i++)\n    n += i % 2;\ncout << n;'}
      mono
      options={[
        { id: 'A', text: '5050' },
        { id: 'B', text: '4950' },
        { id: 'C', text: '50', isCorrect: true },
        { id: 'D', text: '49' },
      ]}
      explanation="i % 2 在 i 为奇数时是 1，偶数时是 0。0～99 中有 50 个奇数，n 累加 50 个 1，结果是 50。累加一个“是或否”的值，就是在计数。"
    />
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 10-A',
    title: '每天多读一页',
    statement: '第 i 天读 i 页书。输入整数 n（1 ≤ n ≤ 1000），输出 n 天一共读了多少页。要求用循环实现。',
    samples: [['4', '10'], ['1', '1']],
    hint: '累加器先清 0，i 从 1 循环到 n，每轮加上 i。检查是否漏加了第 n 天（条件写 i <= n）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    cout << sum << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 10-B',
    title: '区间个数与和',
    statement: '输入一行两个整数 L、R（-1000 ≤ L ≤ R ≤ 1000）。输出区间 [L, R] 内整数的个数与总和，用空格分隔。要求用循环逐个累计，不用公式。',
    samples: [['-3 5', '9 9'], ['4 4', '1 4']],
    hint: '一个计数器、一个累加器，都在循环前清 0；i 从 L 循环到 R（包含 R）。L = R 时区间里只有一个数。',
    code: `#include <iostream>
using namespace std;

int main() {
    int L, R, cnt = 0, sum = 0;
    cin >> L >> R;
    for (int i = L; i <= R; i++) {
        cnt++;
        sum += i;
    }
    cout << cnt << " " << sum << endl;
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
const homeworkTasks = [
  {
    title: '《累计相加》',
    source: '站内题库 2023 年 6 月一级编程题第 2 题 · 来源待核',
    detail: '输入 n（1 ≤ n ≤ 100），求 1 + (1+2) + (1+2+3) + … + (1+2+…+n)。样例：3 → 10；4 → 20；10 → 220。就是例 2 的 total。',
  },
  {
    title: '《金字塔》',
    source: '站内题库 2025 年 9 月一级编程题第 2 题 · 来源待核',
    detail: '金字塔有 n 层，从塔底向上每层需要 n×n、(n−1)×(n−1)、…、1×1 块石块，输出总数。样例：2 → 5；5 → 55。核心是 sum += i * i。',
  },
  {
    title: '小小存钱罐（逐天累计）',
    source: '课堂练习',
    detail: '最初有 s 元，每天先存 a 元再花 b 元（a ≥ b），用 for 逐天更新余额，输出 n 天后的余额。样例：10 5 3 4 → 18；0 2 2 3 → 0。',
  },
];

const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><BookOpen size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '执行顺序：初始化（一次）→ 判断 → 循环体 → 更新 → 判断……条件一开始为假时一次也不执行。',
            'i < b 执行 b − a 次，i <= b 执行 b − a + 1 次；步长不是 1 时先列取值再数。',
            '循环结束时 i 是第一个让条件变假的值；要在循环外用 i，就在循环外声明。',
            '计数器、累加器初值为 0，累乘器初值为 1；变量不初始化，结果无法确定。',
            '三段都可以省略但分号不能省；for (…); 的分号让循环体为空；循环体里改 i 会改变次数，甚至死循环。',
            '调试：断点让程序停下，单步执行时查看变量，就是一张机器生成的追踪表。',
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
          {homeworkTasks.map((task) => (
            <label key={task.title} className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
              <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
              <div>
                <strong className="mb-1 block text-yellow-900">{task.title}</strong>
                <p className="mb-1 text-xs text-yellow-800">{task.source}</p>
                <p className="text-sm text-yellow-900">{task.detail}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课：while 与 do-while。for 适合次数事先能算出来的情况；次数要等条件自然变假才知道时，用 while。
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
      case 2: return <OrderSlide />;
      case 3: return <CountSlide />;
      case 4: return <CountExamSlide />;
      case 5: return <AccumulateSlide />;
      case 6: return <OmitSlide />;
      case 7: return <EmptyBodySlide />;
      case 8: return <DebugSlide />;
      case 9: return <MistakesSlide />;
      case 10: return <PracticeSlide />;
      case 11: return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：写出求 1×2×3×…×n 的核心代码（n ≤ 10），并手推 n = 5 时的输出。"
                hint="这是累乘：累乘器的初值是多少？i 从几开始？"
                answer="int p = 1; for (int i = 1; i <= n; i++) p *= i; cout << p;  n = 5 时输出 120。"
                steps={[
                    '累乘器 p 的初值写 1；写 0 的话乘什么都是 0。',
                    'i 从 1 开始到 n（含 n），条件写 i <= n。',
                    'n = 5：p 依次是 1、2、6、24、120，输出 120。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-10 for 循环离开前检查"
              description="如果能说出 for 三段的执行顺序、手推执行次数和结束后 i 的值、选对计数累加累乘的初值，并识别空循环体分号，就可以进入第 11 课：while 与 do-while。"
              items={lesson10MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 i++ 和 += 修改变量（第 5 课）', '能写出关系条件（第 7 课）', '知道 if 后面多写分号会出错（第 8 课）']}
      lessonNumber={10}
      lessonTitle="for 循环"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/11"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={10} />}
      bottomSupport={<CppL1LessonSupport lessonId={10} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
