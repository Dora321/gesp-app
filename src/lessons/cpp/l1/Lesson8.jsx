import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { CodeTracer, MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { ExpressSampleViewer, MoneyBranchLab, SemicolonTrap, WeekdayLab } from './Lesson8Activities';
import {
  ChefHat,
  Utensils,
  Layers,
  AlertTriangle,
  Terminal,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Smile,
  Code,
  HelpCircle,
  Thermometer,
  ArrowDown,
  Menu,
  X
} from 'lucide-react';

// --- 图标映射组件 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "chef": <ChefHat size={size} color={color} />,
    "utensils": <Utensils size={size} color={color} />,
    "layers": <Layers size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "terminal": <Terminal size={size} color={color} />,
    "book": <BookOpen size={size} color={color} />,
    "check": <CheckCircle2 size={size} color={color} />,
    "x": <XCircle size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "arrow-down": <ArrowDown size={size} color={color} />,
    "smile": <Smile size={size} color={color} />,
    "code": <Code size={size} color={color} />,
    "help": <HelpCircle size={size} color={color} />
  };
  return icons[name] || null;
};

const lesson8MasteryItems = [
  {
    label: '能说清 if / else 各在什么时候执行。',
    evidence: '说得出 if 和 else 的分工：条件为真执行 if 后的语句，为假执行 else 后的语句，两段恰好执行一段；没有 else 时，条件为假就什么也不做。',
    retryHint: '回到“if-else 双分支”，在钱够不够实验里分别输入 12 12 和 12 11。',
  },
  {
    label: '能发现 if (条件); 和缺大括号的问题。',
    evidence: '能说明 if (a > 3); 的分号让后面的代码无条件执行；不加大括号时 if 只管紧跟的一条语句，缩进不起作用；if (x = 0) 是赋值不是比较。',
    retryHint: '回到“分号与大括号陷阱”，打开分号开关对比两次输出，再看“条件里的赋值”。',
  },
  {
    label: '能写出求较大值与绝对差的代码。',
    evidence: '能写出 int mx = a; if (b > mx) mx = b;，以及 if (a > b) diff = a - b; else diff = b - a;，并手推输入 10 20 时输出 20 10。',
    retryHint: '回到“较大值、较小值与差的绝对值”，用追踪器逐步看 mx 和 diff 怎样变化。',
  },
  {
    label: '能处理取余结果为 0 的修正。',
    evidence: '知道 (x + n) % 7 得 0 时表示星期日，要用 if (d == 0) d = 7; 改成 7；能算出星期六过 8 天是星期日（输出 7）。',
    retryHint: '回到“取余后修正”，在星期实验里输入 6 8 和 1 6，观察余数为 0 时的修正。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：钱够不够", icon: "help", category: "分支结构" },
  { id: 2, title: "if 单分支", icon: "arrow-right", category: "分支结构" },
  { id: 3, title: "if-else 双分支", icon: "layers", category: "分支结构" },
  { id: 4, title: "分号与大括号陷阱", icon: "alert", category: "分支结构" },
  { id: 5, title: "条件里的赋值", icon: "x", category: "分支结构" },
  { id: 6, title: "较大值、较小值与差的绝对值", icon: "code", category: "常见写法" },
  { id: 7, title: "取余后修正", icon: "arrow-down", category: "常见写法" },
  { id: 8, title: "真题：2025 年 12 月一级编程第 1 题", icon: "check", category: "真题" },
  { id: 9, title: "选学：条件运算符", icon: "book", category: "真题" },
  { id: 10, title: "上机：零钱够不够 / 两家店", icon: "terminal", category: "真题" },
  { id: 11, title: "阶段诊断 B", icon: "check", category: "诊断" },
  { id: 12, title: "小结与课后任务", icon: "book", category: "小结与检查" },
  { id: 13, title: "离开前检查", icon: "check", category: "小结与检查" }
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

// 作答后才显示解析；选项锁定。retry 只在答错时显示“回到哪一课哪一节”。
const QuizCard = ({ source, badge = '站内真题', question, options, explanation, mono = false, retry, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const correctOption = options.find((opt) => opt.isCorrect);

  const choose = (opt) => {
    setSelected(opt);
    if (onAnswer) onAnswer(Boolean(opt.isCorrect));
  };

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
                onClick={() => choose(opt)}
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
              <HelpCircle size={16} className="mt-0.5 shrink-0 text-blue-600" />
              <p><strong>解析：</strong>{explanation}</p>
            </div>
            {retry && !selected.isCorrect && (
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-relaxed text-amber-900">错了回到：{retry}</p>
            )}
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
      <h2 className="text-3xl font-bold text-gray-800">先看一道题</h2>
      <p className="text-lg text-gray-600">商品价格 p 元，你带了 q 元。钱够就输出 Yes，不够就输出 No。程序要根据输入，从两句输出里选一句执行。</p>
    </div>

    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <CodePanel>{`int p, q;
cin >> p >> q;
if (q >= p) cout << "Yes" << endl;
else cout << "No" << endl;`}</CodePanel>
    </div>

    <PredictCheck
      className="w-full max-w-3xl"
      prompt="输入 12 12（价格 12 元，带了 12 元），程序输出什么？"
      options={['Yes', 'No', '什么也不输出']}
      correctIndex={0}
      explanation="条件 q >= p 即 12 >= 12，相等也成立，执行 if 后面的语句，输出 Yes。题目说“够钱”，刚好相等也算够，所以要写 >=；写成 q > p 就会在相等时输出 No。"
      misconception="把“够钱”写成 q > p，漏掉了刚好相等的情况。"
    />

    <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 7 课已经能算出条件的值。本课把条件放进 if：条件为真执行一段代码，为假执行另一段。按顺序学：<strong>if 单分支 → if-else 双分支 → 分号、大括号和条件里赋值三个陷阱 → 较大值与绝对差 → 取余后修正</strong>，最后用真题《小杨的爱心快递》和两道上机题收尾。
    </div>
  </div>
);

// --- 2. if 单分支 ---
const IfSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">if 语句的两种写法</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">只管一条语句</p>
          <CodePanel>{`if (条件) 语句;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">管多条语句：用大括号括起来</p>
          <CodePanel>{`if (条件) {
    语句1;
    语句2;
}`}</CodePanel>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3">条件写在圆括号里，括号不能省。</li>
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3">条件为真（非 0）才执行；为假就跳过，接着执行 if 后面的语句。</li>
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3">不加大括号时，if 只管紧跟的<strong>一条</strong>语句。</li>
      </ul>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-red-800">不加大括号</h3>
        <CodePanel>{`int a = 1;
if (a > 3)
    cout << "A";
    cout << "B";
cout << endl;`}</CodePanel>
        <p className="mb-2 mt-4 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'B'}</OutputPanel>
        <p className="mt-3 text-sm leading-relaxed text-red-900">第二个 cout 虽然缩进了，但不受 if 控制。a &gt; 3 不成立，只跳过 cout &lt;&lt; "A";，B 照样输出。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-bold text-green-800">加大括号</h3>
        <CodePanel>{`int a = 1;
if (a > 3) {
    cout << "A";
    cout << "B";
}
cout << endl;`}</CodePanel>
        <p className="mb-2 mt-4 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'（只换一行，没有字母）'}</OutputPanel>
        <p className="mt-3 text-sm leading-relaxed text-green-900">两条 cout 都在大括号里，条件不成立时一起跳过。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">缩进只是给人看的</strong>
      编译器只认大括号，不看缩进。if 要管两条以上语句时一定加大括号；只有一条语句时，加上大括号也不会错。
    </div>
  </div>
);

// --- 3. if-else 双分支 ---
const IfElseSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
        <code className="text-2xl font-bold text-blue-900">if</code>
        <p className="mt-2 text-sm text-blue-950">条件为真时，执行 if 后面的语句。</p>
      </div>
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
        <code className="text-2xl font-bold text-green-900">else</code>
        <p className="mt-2 text-sm text-green-950">条件为假时，执行 else 后面的语句。else 后面不写条件。</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <p className="text-2xl font-bold text-amber-900">二选一</p>
        <p className="mt-2 text-sm text-amber-950">两段代码恰好执行一段。只在条件成立时做事，就只写 if，else 可以省略。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例：及格判断</p>
        <CodePanel>{`int score;
cin >> score;
if (score >= 60) cout << "Pass" << endl;
else cout << "Fail" << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">两组输入</p>
        <OutputPanel>{`输入 60 → Pass
输入 59 → Fail`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">60 &gt;= 60 成立，走 if；59 &gt;= 60 不成立，走 else。测试时一定要试“刚好等于分界线”的数。</p>
      </div>
    </div>

    <MoneyBranchLab />
  </div>
);

// --- 4. 分号与大括号陷阱 ---
const TrapSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <SemicolonTrap />

    <QuizCard
      badge="课堂练习 · 例 2"
      source="课堂练习"
      question={'代码执行后的输出是（ ）。\nint a, b;\ncin >> a >> b;\nif (a > b) a = b;\nb = a;\ncout << a << " " << b;\n如果输入 10 20：'}
      mono
      options={[
        { id: 'A', text: '10 20' },
        { id: 'B', text: '10 10', isCorrect: true },
        { id: 'C', text: '20 20' },
        { id: 'D', text: '20 10' },
      ]}
      explanation="if 只管紧跟的 a = b;。10 > 20 不成立，a 仍是 10。下一行 b = a; 不受 if 控制，一定执行，b 变成 10。输出 10 10。把 b = a; 和 if 写在同一缩进层次，正是为了提醒：缩进不影响执行。"
    />

    <PredictCheck
      className="w-full"
      prompt={'把上题改成 if (a > b) { a = b; b = a; }，同样输入 10 20，输出什么？'}
      options={['10 20', '10 10', '20 20']}
      correctIndex={0}
      explanation="加了大括号后，a = b; 和 b = a; 都受 if 控制。10 > 20 不成立，两句都跳过，a、b 保持 10 和 20，输出 10 20。"
      misconception="以为大括号可有可无；它决定了哪些语句受 if 控制。"
    />
  </div>
);

// --- 5. 条件里的赋值 ---
const AssignInIfSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">把 == 写成了 =</p>
        <CodePanel>{`int x = 3;
if (x = 0) cout << "A";
else cout << "B";
cout << " " << x << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'B 0'}</OutputPanel>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">x = 0 是赋值：先把 x 改成 0，整个式子的值就是 0，当作条件为假，走 else 输出 B。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">x 已经被改成 0，所以最后输出 0，不是 3。</li>
        </ul>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">
        <code className="text-lg font-bold text-red-900">if (x = 0)</code>
        <p className="mt-2 text-sm text-red-950">x 变成 0，条件<strong>永远为假</strong>。</p>
      </div>
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">
        <code className="text-lg font-bold text-red-900">if (x = 5)</code>
        <p className="mt-2 text-sm text-red-950">x 变成 5，5 非 0，条件<strong>永远为真</strong>。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">判断相等写 ==</strong>
      编译器对 if (x = 0) 通常只给一条警告，程序照样能运行，结果却完全不对。写完条件后，逐个检查每个等号：比较用 ==，赋值才用 =。
    </div>

    <PredictCheck
      className="w-full"
      prompt={'int x = 0; if (x = 5) cout << "Y"; else cout << "N"; cout << x; 输出什么？'}
      options={['N0', 'Y5', 'N5', 'Y0']}
      correctIndex={1}
      explanation="x = 5 把 x 改成 5，式子的值 5 非 0，条件为真，输出 Y；接着输出 x，此时 x 是 5。合起来是 Y5。"
      misconception="把 x = 5 读成“x 等于 5 吗”，以为 x 是 0 所以走 else。"
    />

    <div className="grid w-full gap-6 md:grid-cols-2">
      <QuizCard
        badge="课堂练习"
        source="课堂练习"
        question="if (x = 0) 的判定结果总是 false。"
        options={judgeOptions(true)}
        explanation="x = 0 是赋值表达式，值为 0，当作条件时为假，所以 if 的判定结果总是 false，说法正确。注意 x 也被改成了 0。"
      />
      <QuizCard
        source="2023 年 3 月 GESP C++ 一级判断题第 6 题"
        question="if 语句中的条件表达式的结果必须为 bool 类型。"
        options={judgeOptions(false)}
        explanation="if 的条件可以是任何整数值：非 0 为真，0 为假。上面的 if (x = 0)、if (x = 5) 条件都是 int 值，照样能编译运行；if (n % 2) 也常用来判断 n 是奇数。所以说法错误。"
      />
    </div>
  </div>
);

// --- 6. 较大值、较小值与差的绝对值 ---
const maxDiffCode = `int a, b;
cin >> a >> b;
int mx = a;
if (b > mx) mx = b;
int diff;
if (a > b) diff = a - b;
else diff = b - a;
cout << mx << " " << diff << endl;`;

const maxDiffTraceSteps = [
  {
    active: [1],
    vars: { a: '?', b: '?', mx: '–', diff: '–' },
    action: '读入 10 20',
  },
  {
    active: [1],
    vars: { a: 10, b: 20, mx: '–', diff: '–' },
    row: ['1', 'cin >> a >> b', '—', 'a = 10，b = 20'],
    action: '执行 int mx = a;',
  },
  {
    active: [2],
    vars: { a: 10, b: 20, mx: 10, diff: '–' },
    row: ['2', 'int mx = a;', '—', '先假设 a 最大：mx = 10'],
    action: '判断 b > mx',
  },
  {
    active: [3],
    vars: { a: 10, b: 20, mx: 20, diff: '–' },
    row: ['3', 'if (b > mx) mx = b;', '20 > 10 成立', 'mx = 20'],
    action: '判断 a > b',
  },
  {
    active: [5, 6],
    vars: { a: 10, b: 20, mx: 20, diff: 10 },
    row: ['4', 'if (a > b) … else …', '10 > 20 不成立', '走 else：diff = 20 - 10 = 10'],
    action: '执行输出',
  },
  {
    active: [7],
    vars: { a: 10, b: 20, mx: 20, diff: 10 },
    exit: '较大值 20，差的绝对值 10。',
    output: '20 10',
  },
];

const MaxDiffSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
        <p className="text-lg font-bold text-blue-900">较大值</p>
        <code className="mt-2 block text-sm text-blue-950">int mx = a;<br />if (b &gt; mx) mx = b;</code>
        <p className="mt-2 text-sm text-blue-950">先假设第一个最大，再检查第二个是否更大。</p>
      </div>
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
        <p className="text-lg font-bold text-green-900">较小值</p>
        <code className="mt-2 block text-sm text-green-950">int mn = a;<br />if (b &lt; mn) mn = b;</code>
        <p className="mt-2 text-sm text-green-950">同样的写法，把 &gt; 换成 &lt;。</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <p className="text-lg font-bold text-amber-900">差的绝对值</p>
        <code className="mt-2 block text-sm text-amber-950">if (a &gt; b) diff = a - b;<br />else diff = b - a;</code>
        <p className="mt-2 text-sm text-amber-950">总是大数减小数，结果不会是负数。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（输入 10 20）</p>
        <CodePanel>{maxDiffCode}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'20 10'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">第一个 if 没有 else：b 不比 mx 大时什么也不做，mx 保持 a。第二个 if-else 二选一，diff 一定会被赋值。</p>
      </div>
    </div>

    <div className="w-full">
      <CodeTracer
        title="分支追踪器：输入 10 20 时走哪一支？"
        code={maxDiffCode}
        varOrder={['a', 'b', 'mx', 'diff']}
        columns={['步骤', '语句', '条件', '变化']}
        steps={maxDiffTraceSteps}
        hint="先预测 mx 和 diff 的最终值，再逐步核对。"
      />
    </div>

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">一级编程题里的常见写法</strong>
      “两种方案取较低者”“两数取较大值”都是这个套路：先把每种方案的结果算出来，再用 if 比较。本课第 8 节的真题《小杨的爱心快递》就是两种运费取较低者。
    </div>
  </div>
);

// --- 7. 取余后修正 ---
const ModFixSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">周期问题：% 求位置，余数为 0 时修正</h3>
      <p className="text-center text-sm leading-relaxed text-slate-700">星期按 7 天循环。(x + n) % 7 的结果是 0～6，但题目用 1～7 表示星期（7 是星期日）。余数为 0 正好对应周期里的最后一个，要用 if 改成 7。月份同理：余数为 0 时改成 12。</p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3（输入 6 8：星期六过 8 天）</p>
        <CodePanel>{`int x, n;
cin >> x >> n;
int d = (x + n) % 7;
if (d == 0) d = 7;
cout << d << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'7'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">(6 + 8) % 7 = 0，修正成 7，即星期日。不写这个 if，会输出不存在的“星期 0”。</p>
      </div>
    </div>

    <WeekdayLab />

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 8 题"
      question={'某个整数很长很长，形如：1232123212321...... 其规律是从1开始每逐一升高到3然后逐一降低到1，然后又逐一升高到3，.... 用 N 表示从左向右的该整数位数。编程解决上述问题，横线处应选（ ）。\nint N, M;\ncout << "请输入编号: ";\ncin >> N;\nM = ______________;\nif (M != 0)\n cout << M;\nelse\n cout << 2;'}
      mono
      options={[
        { id: 'A', text: 'N % 4', isCorrect: true },
        { id: 'B', text: 'N / 4' },
        { id: 'C', text: 'N % 3' },
        { id: 'D', text: 'N / 3' },
      ]}
      explanation="数字按 1、2、3、2 每 4 位重复一次，周期是 4，所以用 N % 4。余数 1、2、3 时输出的数字正好就是余数；余数为 0 表示第 4、8、12……位，那一位是 2，所以 else 输出 2。这就是“余数为 0 时修正”的写法。"
    />

    <QuizCard
      source="2025 年 9 月 GESP C++ 一级第 7 题"
      question={'当前是9月，编写C++代码求N个月后的月份。横线处应填入的代码是（ ）。\nint N, M;\ncin >> N;\nM = _____________;\nif (M == 0)\n printf("%d个月后12月", N);\nelse\n printf("%d个月后是%d月", N, M);'}
      mono
      options={[
        { id: 'A', text: 'N % 12' },
        { id: 'B', text: '9 + N % 12' },
        { id: 'C', text: '(9 + N) / 12' },
        { id: 'D', text: '(9 + N) % 12', isCorrect: true },
      ]}
      explanation="先算从 9 月往后数的位置 9 + N，再对 12 取余，括号不能省（B 会先算 N % 12）。余数为 0 时表示 12 月，代码已经用 if 单独处理。例如 N = 3：(9 + 3) % 12 = 0，走 if 分支，输出“3个月后12月”；N = 5：(9 + 5) % 12 = 2，输出“5个月后是2月”。"
    />
  </div>
);

// --- 8. 真题：2025 年 12 月一级编程第 1 题 ---
const ExpressSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：《小杨的爱心快递》</h3>
      <p className="mt-1 text-slate-500">2025 年 12 月 GESP C++ 一级编程题第 1 题</p>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-slate-800">读题：两种运费取较低者</h3>
      <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
        <li className="rounded-xl border border-blue-100 bg-blue-50 p-3">快递体积 V、重量 G。按体积计算：运费 0.5 × V 元。</li>
        <li className="rounded-xl border border-blue-100 bg-blue-50 p-3">按重量计算：G &lt; 300 时运费 M 元；G ≥ 300 时运费 N 元。</li>
        <li className="rounded-xl border border-blue-100 bg-blue-50 p-3">最终运费取两种方式中较低的一个。输入四行，每行一个一位小数：V、G、M、N；输出一行，一个一位小数。</li>
      </ul>
    </div>

    <ExpressSampleViewer />

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">参考程序</p>
        <CodePanel>{`#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double V, G, M, N;
    cin >> V >> G >> M >> N;
    double byV = 0.5 * V, byG;
    if (G < 300) byG = M;
    else byG = N;
    double ans = byV;
    if (byG < ans) ans = byG;
    cout << fixed << setprecision(1) << ans << endl;
    return 0;
}`}</CodePanel>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">按重量的运费用 if-else 二选一：分界线 300 属于 N 那一档，所以条件写 G &lt; 300。</p>
        <p className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">取较低者用第 6 节的写法：先假设 ans = byV，再看 byG 是否更低。</p>
        <p className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">保留一位小数用第 4 课的 fixed &lt;&lt; setprecision(1)，要包含 &lt;iomanip&gt;。</p>
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">自己补测重量正好 300 的情况：V = 200.0、G = 300.0、M = 60.0、N = 70.0 时，按体积 100.0，按重量 70.0，输出 70.0。</p>
      </div>
    </div>
  </div>
);

// --- 9. 选学：条件运算符 ---
const TernarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <span className="mb-3 inline-block rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">选学 · 考纲是否列入待核实</span>
      <h3 className="mb-4 text-xl font-bold text-slate-800">条件 ? 值1 : 值2</h3>
      <p className="text-sm leading-relaxed text-slate-700">条件为真，整个式子取值 1；为假，取值 2。它是一个表达式，可以直接放进 cout 或赋值语句里。真题代码里会出现，一级要求能读懂。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">例 4</p>
          <CodePanel>{`int a = 3, b = 8;
cout << (a > b ? a : b) << endl;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
          <OutputPanel>{'8'}</OutputPanel>
          <p className="mt-2 text-sm text-slate-700">3 &gt; 8 不成立，取冒号后面的 b，输出 8。放进 cout 时外面要加括号。</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">if-else 写法</p>
          <CodePanel>{`if (G < 300) byG = M;
else byG = N;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">等价的条件运算符写法</p>
          <CodePanel>{`byG = (G < 300) ? M : N;`}</CodePanel>
        </div>
      </div>
    </div>

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级判断题第 9 题"
      question="如果 x 是C++代码中的 double 型变量，则对 cout << ( x? 1227 : 12.27); 编译时将报错，因为 1227 和 12.27 分别是 int 和 double 类型，导致识别混乱。"
      options={judgeOptions(false)}
      explanation="能正常编译。冒号两边类型不同时，int 的 1227 会自动转换成 double，整个表达式是 double 类型。x 不为 0 时输出 1227，x 为 0 时输出 12.27。所以说法错误。（已用 g++ 编译运行核对。）"
    />
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 8-A',
    title: '零钱够不够',
    statement: '购买一件价格为 p 元的商品，带了 q 元。输入一行两个整数 p、q（0 ≤ p, q ≤ 10000）。钱够（q ≥ p）时输出 Yes，否则输出 No。',
    samples: [['12 12', 'Yes'], ['12 11', 'No']],
    hint: '“够钱”包含刚好相等，条件写 q >= p。自己补测 0 0（Yes）和 1 0（No）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int p, q;
    cin >> p >> q;
    if (q >= p) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 8-B',
    title: '两家店',
    statement: '同一件商品，A 店单价 a 元；B 店单价 b 元，B 店总价满 100 元减 20 元（只减一次）。买 n 件，输出两家店中较低的总价。输入一行三个整数 a、b、n（1 ≤ a, b ≤ 100，1 ≤ n ≤ 100）。',
    samples: [['12 13 8', '84'], ['5 6 10', '50']],
    hint: '先分别算出两家店的总价，B 店满 100 再减 20，最后取较小值。“满 100”包含正好 100：自己补测 10 10 10（A 店 100，B 店 100 − 20 = 80，输出 80）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b, n;
    cin >> a >> b >> n;
    int costA = a * n;
    int costB = b * n;
    if (costB >= 100) costB -= 20;
    int ans = costA;
    if (costB < ans) ans = costB;
    cout << ans << endl;
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
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Code size={18} /> 参考程序</h3>
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

// --- 11. 阶段诊断 B ---
const diagnosisItems = [
  {
    source: '2024 年 9 月 GESP C++ 一级判断题第 5 题',
    question: '在 C++ 代码中整型变量 X 被赋值为 20.24，则 cout << (X++, X + 1) / 10 执行后输出的是 2.124。',
    options: judgeOptions(false),
    explanation: 'X 是 int，存进去的是 20。逗号表达式从左到右：X++ 后 X = 21，整个括号的值是最后一项 X + 1 = 22；22 / 10 是整数除法，得 2。输出 2，不是 2.124。',
    retry: '第 5 课「逗号运算符」；截断回看第 4 课「小数存入 int：向 0 截断」。',
  },
  {
    source: '2024 年 3 月 GESP C++ 一级第 4 题',
    question: '下面 C++ 代码执行后的输出是（ ）。\nint a = 1;\ncout << "a+1= " << a+1 << endl;',
    mono: true,
    options: [
      { id: 'A', text: 'a+1= 2', isCorrect: true },
      { id: 'B', text: 'a+1=2' },
      { id: 'C', text: '2=2' },
      { id: 'D', text: '2= 2' },
    ],
    explanation: '引号里的 a+1= 原样输出，等号后面还有一个空格；引号外的 a+1 才计算，得 2。所以输出 a+1= 2。',
    retry: '第 6 课「cout 与 printf 对照」：引号里的字符（包括空格）原样输出，引号外的表达式才计算。',
  },
  {
    source: '2024 年 3 月 GESP C++ 一级第 2 题',
    question: 'C++ 语句 cout << "5%2=" << 5 % 2 执行后的输出是（ ）。',
    mono: true,
    options: [
      { id: 'A', text: '2 2' },
      { id: 'B', text: '1 1' },
      { id: 'C', text: '5%2=2' },
      { id: 'D', text: '5%2=1', isCorrect: true },
    ],
    explanation: 'cout 里的 "5%2=" 是字符串，原样输出；后面的 5 % 2 才计算，余数是 1。输出 5%2=1。',
    retry: '第 6 课「cout 与 printf 对照」：% 只在 printf 的格式串里有特殊含义。',
  },
  {
    source: '2024 年 9 月 GESP C++ 一级第 6 题',
    question: 'C++ 语句 printf("6%%2={%d}", 6 % 2) 执行后的输出是（ ）。',
    mono: true,
    options: [
      { id: 'A', text: '"6%2={6%2}"' },
      { id: 'B', text: '6%2={6%2}' },
      { id: 'C', text: '0=0' },
      { id: 'D', text: '6%2={0}', isCorrect: true },
    ],
    explanation: '格式串里 %% 输出一个 %，%d 换成参数 6 % 2 的值 0，其余字符（包括花括号）原样输出。合起来是 6%2={0}。',
    retry: '第 6 课「printf 基本用法」：占位符表里的 %% 和 %d。',
  },
  {
    source: '2025 年 12 月 GESP C++ 一级第 7 题',
    question: '下面的C++代码执行时如果先输入 10 回车后输入 20 并回车，其输出是（ ）。\nint N, M;\nprintf("第一个数:");\nscanf("%d", &N);\nprintf("第二个数:");\nscanf("%d", &M);\nprintf("%%(N+M)=%d", N+M);',
    mono: true,
    options: [
      { id: 'A', text: '30=30' },
      { id: 'B', text: '10+20=30' },
      { id: 'C', text: '%(N+M)=30', isCorrect: true },
      { id: 'D', text: '错误提示' },
    ],
    explanation: '最后一句里 %% 输出一个 %，(N+M)= 原样输出，%d 换成 N + M 的值 30，所以这一句输出 %(N+M)=30。四个选项只看最后一句的输出。',
    retry: '第 6 课「printf 基本用法」：格式串里的普通字符原样输出，%d 按顺序换成参数。',
  },
  {
    source: '2025 年 12 月 GESP C++ 一级判断题第 7 题',
    question: "执行下面C++代码，如果输入 7，将输出 'Y' ；如果输入 8，将输出 'N'。\nint N;\ncin >> N;\nif (N > 5 || N < 10 && N % 2 != 0)\n cout << 'Y';\nelse\n cout << 'N';",
    options: judgeOptions(false),
    explanation: '&& 比 || 先算，条件等于 N > 5 || (N < 10 && N % 2 != 0)。输入 8 时 N > 5 已经为真，整个条件为真，输出 Y，不是 N。说法错误。（已按优先级手推并用 g++ 运行核对。）',
    retry: '第 7 课「运算优先级」：&& 先于 ||。',
  },
  {
    source: '2024 年 6 月 GESP C++ 一级第 8 题',
    question: '下面 C++ 代码执行时输入 10 后，正确的输出是（ ）。\nint N;\ncout << "请输入正整数：";\ncin >> N;\nif (N % 3)\n printf("第5行代码%2d", N % 3);\nelse\n printf("第6行代码%2d", N % 3);',
    mono: true,
    options: [
      { id: 'A', text: '第5行代码1' },
      { id: 'B', text: '第6行代码1' },
      { id: 'C', text: '第5行代码 1', isCorrect: true },
      { id: 'D', text: '第6行代码 1' },
    ],
    explanation: '10 % 3 = 1，非 0 为真，执行第 5 行。%2d 占 2 个字符宽，1 只有一位，前面补一个空格，所以是“第5行代码 1”。A 和 C 只差这一个空格。（站内题库标注：本题选项原文待对照官方原卷，答案已按 %2d 规则手推并用 g++ 运行核对。）',
    retry: '第 8 课「if-else 双分支」看走哪一支；第 6 课「宽度与补零」看 %2d。',
  },
];

const DiagnosisSlide = () => {
  const [results, setResults] = useState({});
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold text-slate-800">阶段诊断 B：第 5～8 课</h3>
        <p className="mt-2 text-slate-600">7 道站内真题，覆盖逗号表达式、cout 与 printf 输出、逻辑优先级和 if 分支。答错的题会告诉你回到哪一课哪一节。</p>
        <p role="status" className="mt-4 inline-block rounded-full bg-slate-100 px-4 py-1 text-sm font-bold text-slate-700">已作答 {answered} / {diagnosisItems.length}，答对 {correct}</p>
      </div>
      {diagnosisItems.map((item, index) => (
        <QuizCard
          key={item.source}
          badge={`诊断第 ${index + 1} 题`}
          source={item.source}
          question={item.question}
          options={item.options}
          explanation={item.explanation}
          mono={item.mono}
          retry={item.retry}
          onAnswer={(isCorrect) => setResults((prev) => ({ ...prev, [index]: isCorrect }))}
        />
      ))}
    </div>
  );
};

// --- 12. 小结与课后任务 ---
const homeworkTasks = [
  {
    title: '《小杨的考试》',
    source: '站内题库 2023 年 12 月一级编程题第 1 题 · 来源待核',
    detail: '今天星期 X（1 ≤ X ≤ 7），还有 N 天考试（1 ≤ N ≤ 364），输出考试那天星期几，7 表示星期日。样例：1 6 → 7；5 3 → 1。',
  },
  {
    title: '《买文具》',
    source: '站内题库 2023 年 9 月一级编程题第 1 题 · 来源待核',
    detail: '签字笔 2 元一支要 X 支，记事本 5 元一本要 Y 本，直尺 3 元一把要 Z 把，手里有 Q 元。够钱输出两行 Yes 和剩下的钱，不够输出两行 No 和缺少的钱。样例：1 1 1 20 → Yes / 10；1 1 1 5 → No / 5。',
  },
  {
    title: '《假期阅读》',
    source: '站内题库 2025 年 6 月一级编程题第 1 题 · 来源待核',
    detail: '书共 n 页，每天最多读 k 页，假期 t 天，输出假期最多能读完多少页。样例：8 3 2 → 6；19 3 30 → 19。',
  },
  {
    title: '《商店折扣》',
    source: '站内题库 2025 年 9 月一级编程题第 1 题 · 来源待核',
    detail: '满 x 元减 y 元（只减一次）或直接打 n 折，只能用一种，输出最少支付的钱，保留两位小数。样例：8 7 9 10 → 3.00；8 7 2 11 → 2.20。',
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
            'if (条件) 语句;：条件为真才执行；不加大括号时只管紧跟的一条语句，缩进不起作用。',
            'if-else 二选一，两段恰好执行一段；else 后面不写条件，也可以整个省略。',
            'if (条件); 的分号让 if 只管一条空语句，后面的代码无条件执行。',
            'if (x = 0) 是赋值不是比较：x 被改掉，条件取赋值后的值；判断相等写 ==。',
            '较大值 int mx = a; if (b > mx) mx = b;；差的绝对值用 if-else 选 a - b 或 b - a。',
            '周期问题用 % 求位置，余数为 0 时修正：星期日记作 7，12 月记作 12。',
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
          <Terminal size={20} /> 课后任务：四道编程真题（站内题库 · 来源待核）
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
        下一课：多分支与 switch。两种情况用 if-else；三种以上情况时，第 9 课用 else if 和 switch。
      </p>
    </div>
  </div>
);

// --- 主应用 ---
export default function App() {
  const [activeSection, setActiveSection] = useState(1);

  const renderContent = () => {
    switch (activeSection) {
      case 1:
        return <IntroSlide />;
      case 2:
        return <IfSlide />;
      case 3:
        return <IfElseSlide />;
      case 4:
        return <TrapSlide />;
      case 5:
        return <AssignInIfSlide />;
      case 6:
        return <MaxDiffSlide />;
      case 7:
        return <ModFixSlide />;
      case 8:
        return <ExpressSlide />;
      case 9:
        return <TernarySlide />;
      case 10:
        return <PracticeSlide />;
      case 11:
        return <DiagnosisSlide />;
      case 12:
        return <SummarySlide />;
      case 13:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：输入三个整数 a、b、c，输出其中最大的一个。只用 if（不用 else if）写出核心代码，并手推输入 3 9 5 时的输出。"
                hint="沿用较大值写法：先假设 a 最大，再分别用 b、c 去比。"
                answer="int mx = a; if (b > mx) mx = b; if (c > mx) mx = c; cout << mx;  输入 3 9 5 输出 9。"
                steps={[
                    'mx 先等于 a，即 3。',
                    'b = 9 > 3，mx 改成 9；c = 5 > 9 不成立，mx 不变。',
                    '输出 mx，即 9。两个 if 互不影响，每个都要检查。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-8 if 与 if-else 离开前检查"
              description="如果能说清 if 和 else 各在什么时候执行、发现分号与大括号陷阱、写出较大值与绝对差，并处理取余为 0 的修正，就可以进入第 9 课：多分支与 switch。"
              items={lesson8MasteryItems}
            />
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['能写出关系表达式和 && / || 组合条件', '知道整数当条件时只有 0 是假', '会用 % 求余数']}
      lessonNumber={8}
      lessonTitle="if 与 if-else"
      accent="orangePurple"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/9"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={8} />}
      bottomSupport={<CppL1LessonSupport lessonId={8} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
