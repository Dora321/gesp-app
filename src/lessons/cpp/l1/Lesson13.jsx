import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Hash,
  HelpCircle,
  Replace,
  Scissors,
  Search,
  Undo2,
  Grid3x3,
  AlertTriangle,
  Terminal,
  XCircle
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { CodeTracer, MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { DigitReplaceLab, DigitSplitLab } from './Lesson13Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "scissors": <Scissors size={size} className={className} />,
    "hash": <Hash size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "undo": <Undo2 size={size} className={className} />,
    "replace": <Replace size={size} className={className} />,
    "search": <Search size={size} className={className} />,
    "grid": <Grid3x3 size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson13MasteryItems = [
  {
    label: '能用 % 10 取个位、/ 10 去掉个位。',
    evidence: '3050 % 10 = 0，3050 / 10 = 305；能写出模板 while (n > 0) { d = n % 10; 处理 d; n /= 10; }，说明每轮处理一位、n 最后变成 0。',
    retryHint: '回到“取个位与去掉个位”，先算几个数的 % 10 和 / 10，再看模板每一行在做什么。',
  },
  {
    label: '能手推数位分离过程。',
    evidence: '能写出 n = 123 时每轮的 n、个位、count：123 → 12 → 1 → 0，取到 3、2、1，共 3 位；判断 0 > 0 为假时循环结束。例 1 输入 3050 输出 3050 4 8。',
    retryHint: '回到数位分离追踪器，把 n、sum、count 三列写出来，再在逐位拆解实验里输入 3050 核对。',
  },
  {
    label: '能先备份原数再处理，并特判 0。',
    evidence: '循环结束后 n 已经是 0，要输出原数先写 n0 = n；n = 0 时循环一次也不执行，求位数要特判输出 1，数位和自然是 0。',
    retryHint: '回到“真题：备份原值”，对照 2024 年 9 月第 13 题说明 L11 行错在哪里。',
  },
  {
    label: '能写出反转与按位重建。',
    evidence: '反转 r = r * 10 + n % 10，1200 反转得 21；按位重建 b += d * p; p *= 10;，把 3 换成 7 时 3030 得 7070。',
    retryHint: '回到“数字反转”和“按位重建”，在两个实验里各输入一个带 0 的数。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：位数不知道的数", icon: "help", category: "数位分离" },
  { id: 2, title: "取个位与去掉个位", icon: "scissors", category: "数位分离" },
  { id: 3, title: "位数与数位和", icon: "hash", category: "数位分离" },
  { id: 4, title: "真题：备份原值", icon: "check", category: "数位分离" },
  { id: 5, title: "数字反转", icon: "undo", category: "常见写法" },
  { id: 6, title: "按位重建：替换数字", icon: "replace", category: "常见写法" },
  { id: 7, title: "逐位判断：找到就停", icon: "search", category: "常见写法" },
  { id: 8, title: "固定位数：直接拆", icon: "grid", category: "真题" },
  { id: 9, title: "常见错误与真题", icon: "x", category: "真题" },
  { id: 10, title: "上机：数字能量 / 数字反转", icon: "terminal", category: "真题" },
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
  <pre className="overflow-x-auto rounded-xl bg-gray-800 p-5 font-mono text-sm leading-relaxed text-gray-100"><code>{children}</code></pre>
);

const OutputPanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
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
      <h2 className="text-3xl font-bold text-gray-800">位数不知道的数</h2>
      <p className="text-lg text-gray-600">输入一个正整数，输出它的各位数字之和。三位数可以按第 3 课的写法一位一位拆；可是输入可能是 7，也可能是 1234567，写代码时并不知道它有几位。</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">第 3 课：位数固定时直接拆</p>
        <CodePanel>{`int n = 345;
cout << n / 100 << " "      // 百位 3
     << n / 10 % 10 << " "  // 十位 4
     << n % 10;             // 个位 5`}</CodePanel>
        <p className="mt-3 text-sm text-slate-700">每一位都要单独写一个表达式。位数一变，代码就得重写。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">本课：每轮只处理个位</p>
        <CodePanel>{`while (n > 0) {
    int d = n % 10;   // 取出个位
    // …处理 d…
    n /= 10;          // 去掉个位
}`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">个位处理完就扔掉，原来的十位变成新的个位。n 有几位，循环就执行几次，直到 n 变成 0。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="3050 % 10 和 3050 / 10 分别是多少？"
      options={['0 和 305', '5 和 305', '0 和 305.0']}
      correctIndex={0}
      explanation="% 10 是除以 10 的余数，也就是个位 0；两个 int 相除是整数除法，3050 / 10 = 305，正好去掉了个位。"
      misconception="把 % 10 当成取最后一个非 0 数字，或忘了 int 除以 int 不会得到小数。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      循环的写法已经学完，本课做一级真题里最常见的循环应用：<strong>取个位与去掉个位 → 位数与数位和 → 备份原值 → 反转 → 按位重建 → 逐位判断找到就停</strong>，最后完成“数字能量”和“数字反转”两道上机题。
    </div>
  </div>
);

// --- 2. 取个位与去掉个位 ---
const digitSplitCode = `int n = 123, count = 0, sum = 0;
while (n > 0) {
    sum += n % 10;
    count++;
    n /= 10;
}
cout << count << " " << sum;`;

const digitSplitRounds = [
  { before: 123, digit: 3, after: 12, count: 1, sum: 3 },
  { before: 12, digit: 2, after: 1, count: 2, sum: 5 },
  { before: 1, digit: 1, after: 0, count: 3, sum: 6 },
];

const digitSplitTraceSteps = [
  {
    active: [0],
    vars: { n: 123, sum: 0, count: 0 },
    action: '判断 123 > 0',
  },
  ...digitSplitRounds.flatMap(({ before, digit, after, count, sum }, index) => [
    {
      active: [1],
      vars: { n: before, sum: sum - digit, count: count - 1 },
      row: [`判断第 ${index + 1} 次`, `${before} > 0`, '真', count - 1, '进入循环体'],
      action: `取第 ${index + 1} 位`,
    },
    {
      active: [2, 3],
      vars: { n: before, sum, count },
      row: ['取个位并计数', `${before} % 10`, digit, count, `sum = ${sum}`],
      action: '去掉个位',
    },
    {
      active: [4],
      vars: { n: after, sum, count },
      row: ['去掉个位', `${before} / 10`, '—', count, `n 变成 ${after}`],
      action: after === 0 ? '检查退出条件' : `判断 ${after} > 0`,
    },
  ]),
  {
    active: [1],
    vars: { n: 0, sum: 6, count: 3 },
    exit: '再次判断 0 > 0 为假，循环结束。此时 count 已经记录了 3 位，n 已经变成 0。',
    action: '查看输出',
  },
  {
    active: [6],
    vars: { n: 0, sum: 6, count: 3 },
    action: '显示最终结果',
    output: '123 一共有 3 位，数位和是 6，输出 3 6',
  },
];

const SplitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">两个运算，一个模板</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '对非负整数 n：n % 10 得到个位；n / 10（写成 n /= 10 就是改掉 n 本身）去掉个位。',
          '模板：while (n > 0) { d = n % 10; 处理 d; n /= 10; }。每轮处理一位，顺序是从个位往高位走。',
          '循环会把 n 变成 0。循环后还要用原数，就在循环前先备份：n0 = n。',
          '位数固定时仍可直接拆（第 3 课）：千位 n / 1000，十位 n / 10 % 10。',
        ].map((rule, index) => (
          <li key={rule} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="w-full">
      <CodeTracer
        title="数位分离追踪器：n 怎样一位一位消失？"
        code={digitSplitCode}
        varOrder={['n', 'sum', 'count']}
        columns={['阶段', '判断/运算', '个位', 'count', '结果']}
        steps={digitSplitTraceSteps}
        hint="先观察 n，再看 % 10 取个位、/ 10 去掉个位。"
      />
    </div>

    <PredictCheck
      className="w-full"
      prompt="把追踪器里的 n 改成 7，循环体执行几次？"
      options={['0 次', '1 次', '7 次']}
      correctIndex={1}
      explanation="7 > 0 为真，执行一次：sum = 7，count = 1，n = 7 / 10 = 0；再判断 0 > 0 为假，结束。一位数执行 1 次。"
      misconception="以为一位数不用拆、循环不执行；或者把 n 的值当成循环次数。"
    />
  </div>
);

// --- 3. 位数与数位和 ---
const CountSumSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1：原数、位数、数位和</p>
        <CodePanel>{`int n, n0, cnt = 0, sum = 0;
cin >> n;
n0 = n;
while (n > 0) {
    sum += n % 10;
    cnt++;
    n /= 10;
}
cout << n0 << " " << cnt << " " << sum << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输入 3050 时</p>
        <OutputPanel>{`3050 → 305 → 30 → 3 → 0
取到的个位：0、5、0、3
输出 3050 4 8`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">中间和末尾的 0 也是一位，cnt 照样加 1，只是不改变 sum。n0 = n 这一行让循环结束后还能输出原数 3050。</p>
      </div>
    </div>

    <DigitSplitLab />

    <PredictCheck
      className="w-full"
      prompt="例 1 输入 0，输出什么？"
      options={['0 0 0', '0 1 0', '什么也不输出']}
      correctIndex={0}
      explanation="0 > 0 第一次就为假，循环一次也不执行，cnt、sum 都还是 0，输出 0 0 0。数位和是 0 没问题，但 0 是 1 位数，求位数时要特判：if (n0 == 0) cnt = 1;。"
      misconception="以为循环至少执行一次。while 先判断，n = 0 时循环体一次也不执行。"
    />
  </div>
);

// --- 4. 真题：备份原值 ---
const BackupExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：循环结束后，n 还是原来的数吗？</h3>
      <p className="mt-1 text-slate-500">两道题都在考：数位循环改掉了 n，结束条件写错会停在哪。</p>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 13 题"
      question={'下面 C++ 代码拟用于计算整数 N 的位数，比如对 123 则输出 123是3位整数，但代码中可能存在 bug。下列描述正确的是（ ）。\nint N, N0, rc = 0;\ncout << "请输入整数:";\ncin >> N;\nN0 = N;\nwhile (N) {\n rc++;\n N /= 10;\n}\nprintf("%d是%d位整数\\n", N, rc); // L11'}
      mono
      options={[
        { id: 'A', text: '变量 N0 占用额外空间，可以去掉' },
        { id: 'B', text: '代码对所有整数都能计算出正确位数' },
        { id: 'C', text: 'L11 标记的代码行简单修改后可以对正整数给出正确输出', isCorrect: true },
        { id: 'D', text: 'L11 标记的代码行的输出格式有误' },
      ]}
      explanation="循环结束时 N 已经变成 0，L11 输出的是 0 而不是原数；把 L11 的 N 改成 N0，正整数就能正确输出，C 正确。N0 正是备份，不能去掉（A 错）。输入 0 时 while (N) 一次也不执行，rc = 0，输出“0是0位整数”，不是所有整数都对（B 错）。格式串本身没有问题（D 错）。"
    />
    <QuizCard
      source="2025 年 12 月 GESP C++ 一级判断题第 6 题"
      question={'下面C++代码执行后，其输出为 N % 10。\nint N;\ncin >> N;\nwhile (N > 10)\n N /= 10;\ncout << N;'}
      options={judgeOptions(false)}
      explanation="N % 10 是个位，这段代码却在不断去掉个位，留下的是最高位：输入 123 输出 1，不是 3。条件 while (N > 10) 还有边界问题：输入 10 或 100 时停在 10，输出两位数 10；想留下一位数要写 N >= 10。说法错误。（本卷判断题的站内答案待核，这里按运行结果判断，已用 g++ 运行核对。）"
    />
  </div>
);

// --- 5. 数字反转 ---
const ReverseSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：反转一个整数</p>
        <CodePanel>{`int n = 1200, r = 0;
while (n > 0) {
    r = r * 10 + n % 10;
    n /= 10;
}
cout << r << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">每轮的 n 和 r</p>
        <OutputPanel>{`n = 1200：r = 0 * 10 + 0 = 0
n = 120 ：r = 0 * 10 + 0 = 0
n = 12  ：r = 0 * 10 + 2 = 2
n = 1   ：r = 2 * 10 + 1 = 21
输出 21`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">r * 10 把已有的数字整体左移一位，再把新取出的个位接在末尾。1200 末尾的两个 0 先被取出，接在 r = 0 后面还是 0，所以结果是 21 而不是 0021。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="用例 2 的写法反转 123，第 2 轮结束时 r 是多少？"
      options={['3', '32', '321']}
      correctIndex={1}
      explanation="第 1 轮取出 3，r = 3；第 2 轮取出 2，r = 3 * 10 + 2 = 32；第 3 轮取出 1，r = 321。"
      misconception="以为 r 一次就得到最终结果。r 是一轮一轮接出来的，每轮只多一位。"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 9 月一级第 11 题）"
      question={'下面的C++代码用于求N的镜面数（N的个位到最高位的各位数字依次反过来出现在数字中，但高位0将被忽略，不输出），如输入1234，则将输出 4321 ，又如输入120，则将输出 21 ，错误的选项是（ ）。\ncout << "请输入个位数不为0的正整数：";\ncin >> N;\nrst = 0; // 保存逆序结果\nwhile (______________){\n    rst = rst * 10 + N % 10;\n    N = N / 10;\n}\ncout << rst << endl;'}
      mono
      options={[
        { id: 'A', text: 'N != 0' },
        { id: 'B', text: 'not (N == 0)' },
        { id: 'C', text: 'N = 0', isCorrect: true },
        { id: 'D', text: 'N > 0' },
      ]}
      explanation="A、B、D 在 N 为正整数时都表示“还有数位没取完”（not 是 ! 的另一种写法）。C 是赋值不是比较：N = 0 把 N 改成 0，整个表达式的值是 0，为假，循环一次也不执行，输出 0。所以错误的是 C。"
    />
  </div>
);

// --- 6. 按位重建 ---
const RebuildSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：把所有数字 3 换成 7</p>
        <CodePanel>{`int a, b = 0, p = 1;
cin >> a;
while (a > 0) {
    int d = a % 10;
    if (d == 3) d = 7;
    b += d * p;
    p *= 10;
    a /= 10;
}
cout << b << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">三组输入</p>
        <OutputPanel>{`输入 1353 → 输出 1757
输入 3030 → 输出 7070
输入 0    → 输出 0`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">反转是把个位接到末尾；按位重建是把每一位放回原来的位置：个位乘 1，十位乘 10，百位乘 100……p 记录当前这一位的权。3030 里的 0 也照样乘权、加进 b，所以 0 位不会丢。</p>
      </div>
    </div>

    <DigitReplaceLab />

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">同型真题留到第 16 课</strong>
      2026 年 3 月一级编程第 2 题《数字替换》把数字 4 换成 8，和例 3 是同一个模板。这套卷留给第 16 课做整卷测评，讲评时再回到这里。
    </div>
  </div>
);

// --- 7. 逐位判断：找到就停 ---
const CheckDigitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">“某一位满足条件”= 逐位检查 + 找到就停</strong>
      用标志变量记结果：先设为假；循环里取出个位判断，满足就把标志设为真并 break（第 12 课），剩下的位不必再看。
    </div>

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 13 题"
      question={'如果一个正整数能被3整除，或者其某一位能被3整除，则称之为"漂亮数"。下面的C++代码用于判断正整数 N 是否为漂亮数。L1行的横线处应该填入的代码是（ ）。\nint N, Flag;\ncin >> N;\nFlag = 0;\nif (N % 3 == 0)\n Flag = 1;\nelse\n while (N != 0) {\n if (____________){ // L1\n Flag = 1;\n break;\n }\n N /= 10;\n }\ncout << (Flag? "漂亮数" : "非漂亮数");'}
      mono
      options={[
        { id: 'A', text: 'N % 10 == 0' },
        { id: 'B', text: 'N % 3 % 10 == 0' },
        { id: 'C', text: 'N % 10 % 3' },
        { id: 'D', text: 'N % 10 % 3 == 0', isCorrect: true },
      ]}
      explanation="N % 10 取出当前个位，再判断它 % 3 == 0；找到一位就置 Flag = 1 并 break。C 少了 == 0，能编译，但意思正好相反（这一位不能被 3 整除时为真）。A 只认出数字 0；B 先对 3 取余，看的不是数位。"
    />

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">课堂练习：逢七过（含 7 或是 7 的倍数就说“过”）</p>
        <CodePanel>{`int t = n;
bool has7 = false;
while (t > 0) {
    if (t % 10 == 7) {
        has7 = true;
        break;
    }
    t /= 10;
}
if (n % 7 == 0 || has7) cout << "过";
else cout << n;`}</CodePanel>
      </div>
      <div className="min-w-0 space-y-3">
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">逐位检查用的是副本 t，n 保持不变，后面还要用 n 判断是不是 7 的倍数。</p>
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">只看个位（n % 10 == 7）会漏掉 70～79 这类十位是 7 的数。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="1～30 中，按这个规则要说“过”的数有几个？"
      options={['4 个', '6 个', '7 个']}
      correctIndex={1}
      explanation="7 的倍数：7、14、21、28；含数字 7：7、17、27。7 两边都满足，只算一次。合起来是 7、14、17、21、27、28，共 6 个（已用 g++ 运行核对）。"
      misconception="把 7 数了两次，或只判断倍数、漏掉 17 和 27。"
    />
  </div>
);

// --- 8. 固定位数：直接拆 ---
const FixedDigitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">位数已知时，取第 k 位不必循环</h3>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">先用 / 去掉低位，再用 % 10 取新的个位：百位 n / 100 % 10，十位 n / 10 % 10。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">也可以先用 % 留下低几位，再用 / 取最高位：百位 n % 1000 / 100。两种写法对正整数结果相同。</li>
      </ul>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 14 题"
      question={'下面的 C++ 代码用于求连续输入的若干正五位数的百位数之和。例如输入 32488 25731 41232 0，则输出 3个正五位数的百位数之和为13。有关描述错误的是（ ）。\nint M, Sum = 0, rc = 0;\ncout << "请输入正整数:";\ncin >> M;\nwhile (M) {\n M = (M / 100 % 10); // L6\n Sum += M;\n rc++;\n cin >> M;\n}\ncout << rc << "个正五位数的百位数之和为" << Sum;'}
      mono
      options={[
        { id: 'A', text: '如果输入 23221 23453 12345 11111 0，则最后一行中 Sum 的值是 10' },
        { id: 'B', text: '如果输入 2322 2345 1234 1111 0，程序也能运行' },
        { id: 'C', text: '将 L6 改为 M = (M % 1000 / 100); 同样能实现题目要求' },
        { id: 'D', text: '将 L6 改为 M = (M % 100 / 10); 同样能实现题目要求', isCorrect: true },
      ]}
      explanation="M / 100 % 10 取百位：32488 / 100 = 324，324 % 10 = 4。A：百位是 2、4、3、1，和为 10，正确。B：四位数也能运行，只是不符合“五位数”的题意。C：M % 1000 / 100 先留下后三位再取最高位，也是百位，正确。D：M % 100 / 10 取的是十位，错误。"
    />

    <PredictCheck
      className="w-full"
      title="根据 2025 年 12 月 GESP C++ 一级第 15 题改编"
      prompt="i = 5116 时，执行 a = (tmp = i) / 1000; tmp -= a * 1000; bc = tmp / 10; d = tmp - bc * 10; 之后，a、bc、d 分别是多少？"
      options={['5、11、6', '5、116、6', '5、1、16']}
      correctIndex={0}
      explanation="(tmp = i) 先把 5116 赋给 tmp，这个表达式的值就是 5116，除以 1000 得千位 a = 5；tmp -= 5000 剥掉千位，tmp = 116；bc = 116 / 10 = 11 是中间两位；d = 116 − 110 = 6 是个位。5 + 6 == 11，原题要统计的正是这种“千位加个位等于中间两位”的四位数。原题问横线处填 tmp -= a * 1000;，但 tmp = i % 1000; 也能得到同样的 tmp，站内只给前者，所以这里改成预测题。"
      misconception="把 bc 当成一位数字，或以为 tmp -= a * 1000 只减去了 a。"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级第 15 题）"
      question={'以下 C++ 代码可以找出百位、十位和个位满足特定条件的三位数，横线处应该填入的是（ ）。\nint count = 0;\nfor (int i = 100; i <= 999; i++) {\n    int a = i / 100;\n    _________________________\n    int c = i % 10;\n    if (a * a + b * b == c * c) {\n        count++;\n    }\n}'}
      mono
      options={[
        { id: 'A', text: 'int b = (i / 10) / 10;' },
        { id: 'B', text: 'int b = (i / 10) % 10;', isCorrect: true },
        { id: 'C', text: 'int b = (i % 10) / 10;' },
        { id: 'D', text: 'int b = (i % 10) % 10;' },
      ]}
      explanation="b 应该是十位：i / 10 去掉个位，再 % 10 取新的个位，345 → 34 → 4。A 得到的是百位，C 恒为 0，D 是个位。"
    />
  </div>
);

// --- 9. 常见错误与真题 ---
const mistakeCards = [
  { title: '循环后再用 n 输出原数', code: 'while (n) { … n /= 10; } cout << n;', detail: '循环结束 n 已经是 0。循环前先 n0 = n 备份（2024 年 9 月第 13 题）。' },
  { title: '0 的位数', code: 'cnt = 0; while (n > 0) { … }', detail: 'n = 0 时一次也不执行，cnt 为 0。0 是 1 位数，求位数要特判。' },
  { title: '反转后末尾的 0 消失', code: '1200 → 21', detail: '整数开头的 0 不会显示。题目要求逐位输出（如 0021）时要换写法。' },
  { title: '条件写成 N > 10', code: 'while (N > 10) N /= 10;', detail: 'N 恰好是 10、100 时停在 10。要留下一位数，条件写 N >= 10（2025 年 12 月判断题第 6 题）。' },
  { title: '负数取余为负', code: '-123 % 10 的值是 -3', detail: 'C++ 的余数与被除数同号。一级题目一般给正整数，遇到负数先看数据范围。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 数位分离常见错误
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

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <span className="mb-3 inline-block rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">站内题库 2025 年 3 月一级编程题第 2 题 · 来源待核</span>
        <h3 className="mb-3 text-xl font-bold text-gray-800">《四舍五入》</h3>
        <p className="text-sm leading-relaxed text-gray-700">给定 n 个整数，把每个整数四舍五入到最接近的整十数；个位是 5 时向上取整。第一行 n，之后每行一个整数；输出 n 行。</p>
        <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：5 / 43 58 25 67 90（逐行）</div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：40 60 30 70 90（逐行）</div>
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">站内题面的数据范围缺下界（待核）。这里按非负整数处理；负数的 a % 10 是负数，规则会不一样。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-3 font-bold text-green-800">只看个位就够</h3>
        <CodePanel>{`int n;
cin >> n;
for (int i = 1; i <= n; i++) {
    int a;
    cin >> a;
    int r = a % 10;
    if (r >= 5) a = a + 10 - r;
    else a = a - r;
    cout << a << endl;
}`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">43：r = 3，减掉得 40；58：r = 8，加 2 得 60；25：r = 5，加 5 得 30。外层“先读 n 再读 n 个数”是下一课的主题。</p>
      </div>
    </div>
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 13-A',
    title: '数字能量',
    statement: '输入一个非负整数 n（0 ≤ n ≤ 10⁹），输出它的各位数字之和。',
    samples: [['3050', '8'], ['0', '0']],
    hint: '用 n % 10 取个位，n /= 10 去掉个位，直到 n 为 0。输入 0 时循环不执行，sum 仍是 0，正好是答案。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    cout << sum << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 13-B',
    title: '数字反转',
    statement: '输入一个非负整数 n（0 ≤ n < 10⁹），输出把 n 的数字顺序倒过来后得到的整数（结果的前导 0 不输出）。',
    samples: [['1200', '21'], ['123', '321']],
    hint: 'r 初值为 0，每轮 r = r * 10 + n % 10。n < 10⁹ 时反转结果最多 9 位，不会超出 int。补测 0（输出 0）和 5（输出 5）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, r = 0;
    cin >> n;
    while (n > 0) {
        r = r * 10 + n % 10;
        n /= 10;
    }
    cout << r << endl;
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
    title: '最大的一位数字',
    source: '课堂练习',
    detail: '输入非负整数 n，输出它各位数字中最大的一个。样例：3050 → 5；0 → 0；7 → 7。最大值初值写 0 为什么在这里没问题？',
  },
  {
    title: '数字 0 的个数',
    source: '课堂练习',
    detail: '输入正整数 n，输出它有几个数字 0。样例：3050 → 2；7 → 0。注意 0 位要计数，不能因为 d 是 0 就当成“没取到”。',
  },
  {
    title: '《四舍五入》',
    source: '站内题库 2025 年 3 月一级编程题第 2 题 · 来源待核',
    detail: '在本机写完常见错误页里的程序，用样例 43 58 25 67 90 核对输出 40 60 30 70 90，再补测 5（10）和 4（0）。',
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
            'n % 10 取个位，n /= 10 去掉个位；while (n > 0) 每轮处理一位，n 有几位就执行几次。',
            '循环会把 n 变成 0：要输出原数，先 n0 = n 备份。',
            'n = 0 时循环一次也不执行：求位数要特判输出 1，数位和自然得 0。',
            '反转：r = r * 10 + n % 10，末尾的 0 反转后消失（1200 → 21）。',
            '按位重建：b += d * p; p *= 10;，每一位放回原位置，0 位保留。',
            '“某一位满足条件”用标志变量逐位检查，找到就 break；位数固定时直接用 / 和 % 拆。',
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
        下一课：循环读入与统计。本课处理的是“一个数的每一位”；下一课处理“读进来的一批数”，计数、累加、求最值的方法相同。
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
      case 2: return <SplitSlide />;
      case 3: return <CountSumSlide />;
      case 4: return <BackupExamSlide />;
      case 5: return <ReverseSlide />;
      case 6: return <RebuildSlide />;
      case 7: return <CheckDigitSlide />;
      case 8: return <FixedDigitSlide />;
      case 9: return <MistakesSlide />;
      case 10: return <PracticeSlide />;
      case 11: return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：输入正整数 n，输出它的各位数字之积（如 234 → 24）。写出核心代码，并手推 n = 205 时的输出。"
                hint="把数位和的 sum += 换成乘法：积的初值是多少？"
                answer="int p = 1; while (n > 0) { p *= n % 10; n /= 10; } cout << p;  205 依次取出 5、0、2，p 是 5、0、0，输出 0。"
                steps={[
                    '累乘器 p 的初值写 1（第 10 课）。',
                    '每轮 p *= n % 10，再 n /= 10 去掉个位。',
                    'n = 205：p = 5，再乘 0 得 0，再乘 2 仍是 0；中间有 0 位，积就是 0。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-13 数位分离离开前检查"
              description="如果能用 % 10 和 / 10 逐位处理整数、手推每轮的 n 和累加器、记得备份原数并特判 0，并写出反转与按位重建，就可以进入第 14 课：循环读入与统计。"
              items={lesson13MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 / 和 % 拆位数固定的整数（第 3 课）', '会写 while 循环并让条件最终变假（第 11 课）', '会用 break 找到就停（第 12 课）']}
      lessonNumber={13}
      lessonTitle="数位分离"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/14"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={13} />}
      bottomSupport={<CppL1LessonSupport lessonId={13} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
