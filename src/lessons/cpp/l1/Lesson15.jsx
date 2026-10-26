import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flag,
  Hash,
  HelpCircle,
  ListOrdered,
  Search,
  Square,
  AlertTriangle,
  Terminal,
  XCircle
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { FactorScanner, PowerChecker } from './Lesson15Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "search": <Search size={size} className={className} />,
    "hash": <Hash size={size} className={className} />,
    "flag": <Flag size={size} className={className} />,
    "square": <Square size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "list": <ListOrdered size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson15MasteryItems = [
  {
    label: '能按定义找出 n 的全部因数。',
    evidence: 'for (i = 1; i <= n; i++) if (n % i == 0) …，i 从 1 开始（从 0 开始会除以 0），一直试到 n 本身；12 的因数是 1、2、3、4、6、12，共 6 个。',
    retryHint: '回到“因数：从 1 试到 n”，在因数扫描里输入 12 和 1，逐个试一遍。',
  },
  {
    label: '能用计数法和标志法判断质数。',
    evidence: '计数法：因数恰有 2 个才是质数，1 只有 1 个因数，不是质数。标志法：n >= 2 时先设 flag = true，在 2～n−1 中找到因数就置 false 并 break；输入 2 时循环一次不执行，仍是质数。',
    retryHint: '回到“质数：计数法”和“质数：标志法与 break”，分别用 1、2、9 手推两种写法。',
  },
  {
    label: '能用 i * i <= n 判断完全平方数。',
    evidence: '存在 i 使 i * i == n 就是完全平方数，循环条件写 i * i <= n，超过 n 就不用再试；立方数同理写 x * x * x <= n。例 3 输入 49 输出 1；8 是立方数，9 不是。',
    retryHint: '回到“完全平方数与立方数”，在实验里输入 49、50，再切到立方数输入 8、9。',
  },
  {
    label: '能识别整数除法造成的误判。',
    evidence: '用 N / (i + 1) == i 判断兄弟数时，N = 7、i = 2 也成立（7 / 3 = 2），而 7 不是兄弟数；判断乘积关系要直接写 N == i * (i + 1)。',
    retryHint: '回到“整数除法的误判”，对 N = 7 把四个表达式各算一遍。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：按定义逐个试", icon: "help", category: "因数与质数" },
  { id: 2, title: "因数：从 1 试到 n", icon: "search", category: "因数与质数" },
  { id: 3, title: "质数：计数法", icon: "hash", category: "因数与质数" },
  { id: 4, title: "质数：标志法与 break", icon: "flag", category: "因数与质数" },
  { id: 5, title: "完全平方数与立方数", icon: "square", category: "平方数" },
  { id: 6, title: "整数除法的误判", icon: "alert", category: "平方数" },
  { id: 7, title: "因数的筛选与输出顺序", icon: "list", category: "真题" },
  { id: 8, title: "真题编程：找因数 / 立方数 / 长方形面积", icon: "check", category: "真题" },
  { id: 9, title: "常见错误", icon: "x", category: "真题" },
  { id: 10, title: "上机：因数个数 / 质数判断", icon: "terminal", category: "真题" },
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

// 编程题卡片：题面 + 样例 + 写完后才显示参考程序。上机题和真题编程共用。
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
              <div className="whitespace-pre-line rounded-lg border border-gray-200 bg-gray-50 p-2">输入：{'\n'}{input}</div>
              <div className="whitespace-pre-line rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：{'\n'}{output}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">提示：{problem.hint}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Terminal size={18} /> 参考程序</h3>
        <p className="text-sm text-green-900">先在本机写出程序，用样例核对输出，再打开参考程序对照。</p>
        <Button onClick={() => setShowCode(!showCode)} variant={showCode ? 'outline' : 'secondary'}>
          {showCode ? '收起参考程序' : '我写完了，显示参考程序'}
        </Button>
        {showCode && <CodePanel>{problem.code}</CodePanel>}
      </div>
    </div>
  );
};

// --- 1. 问题导入 ---
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">按定义逐个试</h2>
      <p className="text-lg text-gray-600">12 有哪些因数？97 是不是质数？49 是不是完全平方数？人可以背结论，程序只能照着定义，把 1、2、3……每个候选数都检验一遍。</p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-3">
      {[
        ['因数', 'i 能整除 n', 'n % i == 0'],
        ['质数', '大于 1，且因数只有 1 和它本身', '因数个数 == 2'],
        ['完全平方数', '存在整数 i，i × i 等于 n', 'i * i == n'],
      ].map(([title, meaning, code]) => (
        <div key={title} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
          <p className="mb-3 text-sm text-slate-700">{meaning}</p>
          <code className="block rounded-lg bg-slate-100 px-3 py-2 font-mono text-sm text-slate-800">{code}</code>
        </div>
      ))}
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">共同的骨架：for 枚举 + if 检验</p>
        <CodePanel>{`for (int i = 1; i <= n; i++) {
    if (按定义写出的条件) {
        // 计数、累加、输出或置标志
    }
}`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
        <strong className="mb-2 block text-base text-blue-900">和第 14 课的区别</strong>
        第 14 课检验的是读进来的 n 个数；本课检验的是 1～n 这些候选数本身，它们由循环变量 i 产生，不用输入。if 里的条件照着定义写，计数器、标志变量、break 都是前几课的工具。
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="按定义找 12 的全部因数，i 至少要试到几？"
      options={['6', '12', '144']}
      correctIndex={1}
      explanation="n 本身也是 n 的因数，按定义写 i <= n，要试到 12。一级只要求按定义逐个试；“试到 √n 就够”的写法在二级 L2-9 再学。"
      misconception="以为最大的因数是 n / 2，漏掉 n 本身。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      <strong>因数 → 质数（计数法、标志法）→ 完全平方数与立方数 → 整数除法的误判 → 因数的筛选与输出顺序</strong>，再做三道真题编程，最后完成“因数个数”和“质数判断”两道上机题。
    </div>
  </div>
);

// --- 2. 因数 ---
const FactorSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1：12 有几个因数</p>
        <CodePanel>{`int n = 12, cnt = 0;
for (int i = 1; i <= n; i++) {
    if (n % i == 0) cnt++;
}
cout << cnt << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'6'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">i = 1、2、3、4、6、12 时余数为 0，共 6 个。i 从 1 开始：从 0 开始的第一轮是 12 % 0，除数为 0，程序会出错。</p>
      </div>
    </div>

    <FactorScanner />

    <PredictCheck
      className="w-full"
      prompt="把例 1 的 n 改成 1，输出几？"
      options={['0', '1', '2']}
      correctIndex={1}
      explanation="i 只取 1，1 % 1 == 0，cnt = 1。1 只有一个因数，这也是 1 不是质数的原因。"
      misconception="以为每个数都至少有 1 和它本身两个因数。n = 1 时这两个是同一个数。"
    />
  </div>
);

// --- 3. 质数：计数法 ---
const PrimeCountSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：数因数，恰好 2 个就是质数</p>
        <CodePanel>{`int n = 7, cnt = 0;
for (int i = 1; i <= n; i++)
    if (n % i == 0) cnt++;
if (cnt == 2) cout << "Yes" << endl;
else cout << "No" << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'Yes'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">7 只有 1 和 7 两个因数，cnt = 2。计数法不用单独处理 1：n = 1 时 cnt = 1，不等于 2，自动输出 No。</p>
      </div>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 10 题"
      question={'下面 C++ 代码用于判断键盘输入的整数是否为质数。质数是只能被 1 和它本身整除的数。在横线处应填入代码是（ ）。\nint N;\ncin >> N;\nint cnt = 0; // 记录N被整除的次数\nfor(int i=1; i<N+1; i++)\n    if(________________)\n        cnt += 1;\nif(cnt == 2)\n    cout << N << "是质数";\nelse\n    cout << N << "不是质数";'}
      mono
      options={[
        { id: 'A', text: 'N % i' },
        { id: 'B', text: 'N % i == 0', isCorrect: true },
        { id: 'C', text: 'N / i == 0' },
        { id: 'D', text: 'N / i' },
      ]}
      explanation="要数的是能整除 N 的 i，条件是 N % i == 0。A 正好相反（不能整除时为真）。C、D 用的是整数除法：i <= N 时 N / i 至少是 1，C 一次也不计数，D 每个 i 都计数。i < N+1 就是 i <= N。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 12 月一级第 9 题）"
      question={'下面 C++ 代码用于判断一个数是否为质数（素数），在横线处应填入代码是（　）。\ncin >> N;\ncnt = 0;\nfor (int i = 1; i < N + 1; i++)\n    if (N % i == 0)\n        ________;\nif (cnt == 2)\n    cout << N << "是质数。";\nelse\n    cout << N << "不是质数。";'}
      mono
      options={[
        { id: 'A', text: 'cnt = 1' },
        { id: 'B', text: 'cnt = 2' },
        { id: 'C', text: 'cnt =+ 1' },
        { id: 'D', text: 'cnt += 1', isCorrect: true },
      ]}
      explanation="每找到一个因数，计数器加 1，写 cnt += 1。A、B 是赋值；C 的 =+ 1 其实是 cnt = +1，也只是赋值成 1（编译器会警告“可能想写 +=”）。只有 D 能把因数个数数出来。"
    />
  </div>
);

// --- 4. 质数：标志法 ---
const PrimeFlagSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">标志法：先假设是质数，找到反例就推翻</p>
        <CodePanel>{`bool flag = false;
if (n >= 2) {
    flag = true;
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            flag = false;
            break;
        }
    }
}
if (flag) cout << "Yes" << endl;
else cout << "No" << endl;`}</CodePanel>
      </div>
      <div className="min-w-0 space-y-3">
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">只在 2～n−1 中找因数：找到一个就说明不是质数，flag = false 并 break，剩下的不必再试（第 12 课“找到就停”）。</p>
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">n &lt; 2（0、1、负数）不进 if，flag 保持 false，直接判为不是质数。</p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">n = 2 时循环条件 2 &lt; 2 一开始就为假，循环体一次也不执行；flag 保持 true，2 是质数。这正是下面这道真题考的点。</p>
      </div>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 10 题"
      question={'下面 C++ 代码用于判断 N 是否为质数（只能被 1 和它本身整除的正整数）。程序执行后，下面有关描述正确的是（ ）。\nint N;\ncout << "请输入整数：";\ncin >> N;\nbool Flag = false;\nif (N >= 2){\n    Flag = true;\n    for (int i=2; i < N; i++)\n        if (N % i == 0){\n            Flag = false;\n            break;\n        }\n}\nif(Flag)\n    cout << "是质数";\nelse\n    cout << "不是质数";'}
      mono
      options={[
        { id: 'A', text: '如果输入负整数，可能输出“是质数”' },
        { id: 'B', text: '如果输入 2，将输出“不是质数”，因为此时循环不起作用' },
        { id: 'C', text: '如果输入 2，将输出“是质数”，即便此时循环体没有被执行', isCorrect: true },
        { id: 'D', text: '如果将 if (N >= 2) 改为 if (N > 2) 将能正确判断 N 是否质数' },
      ]}
      explanation="负整数不满足 N >= 2，Flag 保持 false，只会输出“不是质数”（A 错）。输入 2 时 Flag 先被设为 true，循环 2 < 2 为假、一次不执行，Flag 不变，输出“是质数”（C 对，B 错）。改成 N > 2 后，2 进不了 if，会被误判为不是质数（D 错）。"
    />

    <PredictCheck
      className="w-full"
      prompt="用标志法判断 n = 9，for 循环的循环体执行几次？"
      options={['1 次', '2 次', '7 次']}
      correctIndex={1}
      explanation="i = 2：9 % 2 = 1，继续；i = 3：9 % 3 == 0，flag = false，break。循环体执行 2 次就结束了，4～8 不再试。"
      misconception="忘了 break，以为一定要试完 2～n−1。"
    />
  </div>
);

// --- 5. 完全平方数与立方数 ---
const SquareSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：49 是不是完全平方数</p>
        <CodePanel>{`int n = 49;
bool found = false;
for (int i = 1; i * i <= n; i++) {
    if (i * i == n) {
        found = true;
        break;
    }
}
cout << found << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'1'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">i = 7 时 7 × 7 == 49，found = true，break；bool 用 cout 输出是 1（第 4 课）。i * i 已经大于 n 时，后面的 i 只会更大，不可能再相等，所以条件写 i * i &lt;= n 就能提前停。立方数同理：x * x * x &lt;= n。</p>
      </div>
    </div>

    <PowerChecker />

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 12 题"
      question={'如果一个整数 N 能够表示为 X*X 的形式，那么它就是一个完全平方数，下面 C++ 代码用于完成判断 N 是否为一个完全平方数，在横线处应填入的代码是（ ）。\nint N;\ncin >> N;\nfor(int i = 0; i <= N; i++)\n    if(___________________)\n        cout << N << "是一个完全平方数\\n";'}
      mono
      options={[
        { id: 'A', text: 'i == N*N' },
        { id: 'B', text: 'i*10 == N' },
        { id: 'C', text: 'i+i == N' },
        { id: 'D', text: 'i*i == N', isCorrect: true },
      ]}
      explanation="完全平方数的定义是存在整数 i 使 i × i 等于 N，条件写 i*i == N。A 是“i 等于 N 的平方”，B、C 是 10 倍和 2 倍。这段代码一直试到 N、也没有 break，结果正确但做了很多无用的检验；例 3 的写法更快。"
    />
  </div>
);

// --- 6. 整数除法的误判 ---
const DivisionTrapSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">a / b == c 不能推出 a == b * c</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">整数除法会丢掉余数：6 / 3、7 / 3、8 / 3 都等于 2。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">所以“N 除以 3 得 2”说明不了 N 就是 6。要判断乘积关系，直接用乘法写 N == 2 * 3。</li>
          <li className="rounded-lg border border-amber-200 bg-amber-50 p-3">用除法还有除数为 0 的风险，比如 i 从 1 开始时的 N / (i − 1)。</li>
        </ul>
        <OutputPanel>{`6 / 3 = 2   6 == 2 * 3 成立
7 / 3 = 2   7 == 2 * 3 不成立
8 / 3 = 2   8 == 2 * 3 不成立`}</OutputPanel>
      </div>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 15 题"
      question={'如果一个正整数 N 能够表示成 X * (X + 1) 的形式，就称它是一个“兄弟数”。用来判断 N 是否为兄弟数，在 if() 中可选的表达式有几个？\ni) N == i * (i + 1)\nii) N == i * (i - 1)\niii) N / (i + 1) == i\niv) N / (i - 1) == i'}
      mono
      options={[
        { id: 'A', text: '1' },
        { id: 'B', text: '2', isCorrect: true },
        { id: 'C', text: '3' },
        { id: 'D', text: '4' },
      ]}
      explanation="i) 就是定义。ii) 的 i * (i − 1) 就是 X = i − 1 时的 X * (X + 1)，逐个枚举 i 时同样能找到，也可用。iii) 用整数除法：N = 7、i = 2 时 7 / 3 = 2 == i 成立，但 7 不是兄弟数（2 × 3 = 6）；iv) 同样会误判，i = 1 时还会除以 0。可用的是 i) 和 ii)，共 2 个（已用 g++ 对 N = 6、7、8 运行核对）。"
    />
  </div>
);

// --- 7. 因数的筛选与输出顺序 ---
const FactorFilterSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">在“是因数”上再加条件，或者换个方向输出</strong>
      “奇因数”就是“是因数 并且 是奇数”，两个条件用 {'&&'} 连接（第 7 课）。题目要求从小到大输出，i 从 1 往上；要求从大到小，i 从 n 往下。
    </div>

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 14 题"
      question={'如果正整数N的所有奇因数（即能平整除N的奇数）的和是27的倍数，则称N为27的神秘数。下面的C++代码用于判断输入的N是否为27的神秘数。L2横线处应填入的代码是（ ）。\nint i, N, cnt = 0;\ncin >> N;\nfor (i=1; i <= N; i++) {\n if (____________) // L2\n cnt += i;\n}\nif (cnt % 27 == 0) cout << \'Y\';\nelse cout << \'N\';'}
      mono
      options={[
        { id: 'A', text: '(N % i == 0) || (i % 2 == 0)' },
        { id: 'B', text: '(N % i == 0) || (i % 2 != 0)' },
        { id: 'C', text: '(N % i == 0) && (i % 2 != 0)', isCorrect: true },
        { id: 'D', text: '(N % i == 0) && (i % 2 == 0)' },
      ]}
      explanation="要累加的 i 必须同时是 N 的因数（N % i == 0）和奇数（i % 2 != 0），用 &&。A、B 用 || 会把不是因数的数也加进去；D 加的是偶因数。注意这里的 cnt 是累加器，名字叫 cnt 但做的是 += i。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 13 题）"
      question={'下面C++代码用于求正整数的所有因数。在横线处应填写（ ）。\nint n; cin >> n;\nfor (______) {\n if (n % i == 0) cout << i << endl;\n}'}
      mono
      options={[
        { id: 'A', text: 'int i = 1; i < n; i+1' },
        { id: 'B', text: 'int i = 1; i < n+1; i+1' },
        { id: 'C', text: 'int i = 1; i < n; i = i+1' },
        { id: 'D', text: 'int i = 1; i <= n; i = i+1', isCorrect: true },
      ]}
      explanation="A、B 的更新段写成 i+1，只算出一个值，并没有改变 i，i 永远是 1，死循环。C 的条件 i < n 漏掉了 n 本身。D 从 1 试到 n（含 n），每轮 i 加 1。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级第 12 题）"
      question={'下面的 C++ 代码用于求 N 的所有因数（即能将 N 整除的数），如输入 12 则将输出 12,6,4,3,2,1。横线处应填入（　）。\nint i, N;\ncin >> N;\ni = N;\nwhile (_______){\n    if (N % i == 0)\n        printf("%d,", i);\n    i -= 1;\n}\nprintf("1");'}
      mono
      options={[
        { id: 'A', text: 'i -= 1' },
        { id: 'B', text: 'i == 1' },
        { id: 'C', text: 'i > 1', isCorrect: true },
        { id: 'D', text: 'i >= 1' },
      ]}
      explanation="循环外还有一句 printf 单独输出 1，所以循环只处理 N 到 2，条件是 i > 1。写成 i >= 1 会把 1 输出两次（12,6,4,3,2,1,1）；B 的 i == 1 第一次就为假，只输出 1。这是从大到小输出因数的写法。"
    />
  </div>
);

// --- 8. 真题编程 ---
const examProblems = [
  {
    tag: '2024 年 3 月 GESP C++ 一级编程题第 2 题',
    title: '《找因数》',
    statement: '从小到大输出正整数 a 的所有因数，每个一行（a ≤ 1000）。',
    samples: [['6', '1\n2\n3\n6'], ['10', '1\n2\n5\n10']],
    hint: '例 1 把 cnt++ 换成输出 i。另测 1（只输出 1）。从小到大，i 就从 1 往上。',
    code: `#include <iostream>
using namespace std;

int main() {
    int a;
    cin >> a;
    for (int i = 1; i <= a; i++) {
        if (a % i == 0) cout << i << endl;
    }
    return 0;
}`,
  },
  {
    tag: '2024 年 6 月 GESP C++ 一级编程题第 2 题',
    title: '《立方数》',
    statement: '输入一个正整数 n，如果存在正整数 x 使 x × x × x = n，输出 Yes，否则输出 No。（站内题面未给数据范围，待核。）',
    samples: [['8', 'Yes'], ['9', 'No']],
    hint: '例 3 的写法把 i * i 换成 x * x * x。另测 1（Yes）和 27（Yes）。n 很大时 x * x * x 可能超出 int 的范围，二级再讨论。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool ok = false;
    for (int x = 1; x * x * x <= n; x++) {
        if (x * x * x == n) {
            ok = true;
            break;
        }
    }
    if (ok) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}`,
  },
  {
    tag: '2023 年 3 月 GESP C++ 一级编程题第 1 题',
    title: '《长方形面积》',
    statement: '长方形的长和宽都是整数，约定长大于等于宽（正方形也算）。给定面积 A（2 ≤ A ≤ 1000），输出有多少种不同的长方形。',
    samples: [['4', '2'], ['6', '2']],
    hint: '枚举宽 w：w 能整除 A，长就是 A / w。长大于等于宽，等价于 w * w <= A，所以循环条件写 w * w <= A。4 = 1×4 = 2×2；6 = 1×6 = 2×3。',
    code: `#include <iostream>
using namespace std;

int main() {
    int A, cnt = 0;
    cin >> A;
    for (int w = 1; w * w <= A; w++) {
        if (A % w == 0) cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
  },
];

const ExamCodingSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题编程：按定义枚举</h3>
      <p className="mt-1 text-slate-500">三道题都是“for 枚举 + if 检验”，区别只在条件和找到后做什么。</p>
    </div>
    {examProblems.map((problem) => (
      <PracticeProblem key={problem.title} problem={problem} />
    ))}
  </div>
);

// --- 9. 常见错误 ---
const mistakeCards = [
  { title: 'i 从 0 开始', code: 'for (i = 0; i <= n; i++) if (n % i == 0)', detail: '第一轮就是 n % 0，除数为 0，程序出错。因数从 1 开始试。' },
  { title: '把 1 判成质数', code: 'flag = true; for (i = 2; i < n; i++) …', detail: 'n = 1 时循环不执行，flag 还是 true。标志法要先判断 n >= 2。' },
  { title: '以为 2 会被判错', code: 'for (int i = 2; i < 2; i++)', detail: '循环一次也不执行不代表出错：flag 保持 true，2 是质数（2024 年 6 月第 10 题）。' },
  { title: '用除法判断乘积', code: 'N / (i + 1) == i', detail: '整数除法丢掉余数，7 / 3 == 2 成立但 7 ≠ 2 × 3。判断乘积关系用乘法。' },
  { title: '标志法漏了 break', code: 'if (n % i == 0) flag = false;', detail: '结果不会错，但找到因数后还在白白试下去；需要“第一个因数”时，没有 break 还会被后面的覆盖。' },
  { title: '输出顺序与题目不符', code: '从小到大 / 从大到小', detail: '从小到大 i 从 1 往上，从大到小 i 从 n 往下；1 是否单独输出也要看清。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 因数、质数与平方数常见错误
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

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">判断质数时必测的四个数</strong>
      1（不是质数）、2（是质数，标志法的循环一次不执行）、9（不是质数，最小因数 3）、一个较大的质数如 97（是质数）。四个都对再提交。
    </div>
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 15-A',
    title: '因数个数',
    statement: '输入正整数 n（1 ≤ n ≤ 1000），输出 n 的因数个数。',
    samples: [['12', '6'], ['1', '1']],
    hint: 'i 从 1 试到 n，n % i == 0 时计数器加 1。另测 7（输出 2）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 15-B',
    title: '质数判断',
    statement: '输入正整数 n（1 ≤ n ≤ 1000）。是质数输出 Yes，否则输出 No。要求按定义统计因数个数。',
    samples: [['7', 'Yes'], ['1', 'No']],
    hint: '在 15-A 的基础上判断 cnt == 2。另测 2（Yes）和 9（No）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) cnt++;
    }
    if (cnt == 2) cout << "Yes" << endl;
    else cout << "No" << endl;
    return 0;
}`,
  },
];

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
    title: '因数之和',
    source: '课堂练习',
    detail: '输入正整数 n，输出 n 的所有因数之和。样例：6 → 12；28 → 56；1 → 1。把计数器换成累加器。',
  },
  {
    title: '最大的真因数',
    source: '课堂练习',
    detail: '输入正整数 n（n ≥ 2），输出小于 n 的最大因数。样例：12 → 6；7 → 1；49 → 7。从 n − 1 往下试，第一个能整除的就 break。',
  },
  {
    title: '完全平方数有几个',
    source: '课堂练习',
    detail: '输入正整数 n，输出 1～n 中完全平方数的个数。样例：20 → 4（1、4、9、16）；1 → 1。想一想：为什么只需要数满足 i * i <= n 的 i？',
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
            '骨架：for 枚举候选数 + if 按定义检验；结果用计数器、累加器、输出或标志变量记录。',
            '因数：i 从 1 试到 n，条件 n % i == 0；从 0 开始会除以 0。',
            '质数计数法：因数恰有 2 个；1 只有 1 个因数，不是质数。',
            '质数标志法：n >= 2 时先设 flag = true，2～n−1 中找到因数就置 false 并 break；n = 2 时循环不执行，仍是质数。',
            '完全平方数：i * i == n，循环条件 i * i <= n 可以提前停；立方数写 x * x * x <= n。',
            '判断乘积关系用乘法，不用整数除法：N / (i + 1) == i 会把 7 误判成兄弟数。',
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
        下一课：一级综合复盘。一级编程题的两种主型——“读 n 个数统计”和“按定义检验”——到此齐了；下一课用 2026 年 3 月整卷测评，按错因回到对应的课复习。二级 L2-9 会在本课基础上学“试到 √n 就够”。
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
      case 2: return <FactorSlide />;
      case 3: return <PrimeCountSlide />;
      case 4: return <PrimeFlagSlide />;
      case 5: return <SquareSlide />;
      case 6: return <DivisionTrapSlide />;
      case 7: return <FactorFilterSlide />;
      case 8: return <ExamCodingSlide />;
      case 9: return <MistakesSlide />;
      case 10: return <PracticeSlide />;
      case 11: return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：输入正整数 n，按从小到大的顺序输出 n 的所有偶因数，空格分隔。写出核心代码，并手推 n = 12 时的输出。"
                hint="“偶因数”= 是因数 并且 是偶数，两个条件用什么连接？"
                answer="for (int i = 1; i <= n; i++) if (n % i == 0 && i % 2 == 0) cout << i << ' ';  n = 12 时输出 2 4 6 12。"
                steps={[
                    '枚举 i 从 1 到 n（含 n），从小到大输出。',
                    '条件：n % i == 0 && i % 2 == 0，两个都要满足。',
                    '12 的因数 1、2、3、4、6、12 中偶数是 2、4、6、12。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-15 因数、质数与平方数离开前检查"
              description="如果能按定义找出全部因数、用计数法和标志法判断质数、用 i * i <= n 判断完全平方数，并识别整数除法造成的误判，就可以进入第 16 课：一级综合复盘。"
              items={lesson15MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 for 计数并选对初值（第 10 课）', '会用 break 找到就停（第 12 课）', '知道 bool 变量输出 1 或 0（第 4 课）']}
      lessonNumber={15}
      lessonTitle="因数、质数与平方数"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/16"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={15} />}
      bottomSupport={<CppL1LessonSupport lessonId={15} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
