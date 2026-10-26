import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  HelpCircle,
  Box,
  ListChecks,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Trophy,
  Search,
  BookOpen,
  Code,
  Keyboard,
  LockKeyhole,
} from 'lucide-react';

const lesson2MasteryItems = [
  {
    label: '能说清变量是“带名字的数据盒子”。',
    evidence: '能用 int a = 5; 说明类型、变量名、赋值号、初始值和分号，并说出 a = a + 2; 是先算右边、再存回 a。',
    retryHint: '回到“变量定义与初始化”，逐个点击代码组成部分，再单步执行三行赋值。',
  },
  {
    label: '能判断变量名是否合法。',
    evidence: '能检查是否有空格/减号、是否数字开头、是否用了 int 等关键字。',
    retryHint: '回到“变量命名三规则”，把每条规则各写一个反例。',
  },
  {
    label: '能解释大小写和下划线在变量名里的作用。',
    evidence: '知道 score、Score、my_score 是不同名字，下划线合法但减号不合法。',
    retryHint: '回到“命名规则练习”，用 super_man 和 super-man 对比。',
  },
  {
    label: '能区分变量和 const 常量。',
    evidence: '知道变量可以重新赋值；const 常量初始化后不能再次赋值，并能读懂 const int PASS_SCORE = 60;。',
    retryHint: '回到“变量与 const 常量”，分别判断两条赋值语句能否编译。',
  },
  {
    label: '能读入两个整数并输出文具总价。',
    evidence: '能用 cin 读入两种文具的数量，结合两个单价常量写出 PENCIL_PRICE * pencilCount + NOTEBOOK_PRICE * notebookCount 并输出。',
    retryHint: '回到“cin 读入与计算”和“上机：文具总价”，对照输入、变量和输出三步。',
  },
];

// --- 课件内容数据 ---
const sections = [
  { id: 1, title: '问题导入：为什么需要变量', icon: 'help', component: () => <IntroSlide />, category: "变量与常量" },
  { id: 2, title: '变量定义与初始化', icon: 'box', component: () => <DefinitionSlide />, category: "变量与常量" },
  { id: 3, title: '变量与 const 常量', icon: 'lock', component: () => <ConstSlide />, category: "变量与常量" },
  { id: 4, title: '变量命名三规则', icon: 'list', component: () => <NamingRulesSlide />, category: "命名规则" },
  { id: 5, title: '命名规则练习', icon: 'search', component: () => <GameSlide />, category: "命名规则" },
  { id: 6, title: '真题：2023 年 12 月一级第 1 题', icon: 'trophy', component: () => <QuizSlide data={{ source: '2023 年 12 月 GESP C++ 一级第 1 题', question: '以下 C++ 不可以作为变量的名称的是（ ）。', options: ['CCF GESP', 'ccfGESP', 'CCFgesp', 'CCF_GESP'], correct: 0, analysis: 'A 选项中间有空格，不是一个合法标识符；D 选项中的下划线可以出现在标识符中。' }} />, category: "命名规则" },
  { id: 7, title: '真题：2024 年 6 月一级第 1 题', icon: 'trophy', component: () => <QuizSlide data={{ source: '2024 年 6 月 GESP C++ 一级第 1 题', question: '在 C++ 中，下列不可做变量的是（ ）。', options: ['five-Star', 'five_star', 'fiveStar', '_fiveStar'], correct: 0, analysis: 'A 选项不是一个变量名；它会被分成 five、减号和 Star。其余三个选项均符合本题考查的命名规则。' }} />, category: "命名规则" },
  { id: 8, title: 'cin 读入与计算', icon: 'keyboard', component: () => <CinSlide />, category: "输入与计算" },
  { id: 9, title: '上机：文具总价', icon: 'code', component: () => <SummarySlide />, category: "输入与计算" },
  {
    id: 10,
    title: '离开前检查',
    icon: 'check',
    category: "小结与检查",
    component: () => (
      <div className="py-6">
        <TransferCheck
            prompt={'换个例子：int age = 10; age = age + 5; 执行后 age 是多少？这两行分别做了什么？'}
            hint="= 是赋值：先算出右边的值，再存回左边的变量。"
            answer="age = 15。"
            steps={[
                'int age = 10; 定义变量 age，并初始化为 10。',
                'age = age + 5; 先算右边 10+5=15，再存回 age。',
                'age 变成 15。',
            ]}
        />
        <MasteryCheck
          title="C++ L1-2 变量与数据离开前检查"
          description="如果能解释变量与常量、判断变量名，并用 cin 读入整数完成总价计算，就可以进入下一课：整除、取余与优先级。"
          items={lesson2MasteryItems}
        />
      </div>
    ),
  },
];


// --- 组件部分 ---

const Button = ({ onClick, children, variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
    secondary: "bg-green-500 text-white hover:bg-green-600 shadow-green-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
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

// 1. 问题导入：为什么需要变量
const IntroSlide = () => {
  const [showVariableVersion, setShowVariableVersion] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">先看一道题</h2>
        <p className="text-lg text-gray-600">铅笔每支 2 元，本子每本 5 元。买 3 支铅笔、2 本本子，一共多少钱？</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-gray-600">写法 A：直接写数字</p>
          <CodePanel>{'cout << 2 * 3 + 5 * 2;   // 输出 16'}</CodePanel>
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          想一想：如果改成买 4 支铅笔、1 本本子，写法 A 要改哪里？如果每次购买数量都不一样，难道每次都改代码、重新编译？
        </p>
      </div>

      <Button onClick={() => setShowVariableVersion(!showVariableVersion)} variant={showVariableVersion ? 'outline' : 'primary'}>
        {showVariableVersion ? <><RotateCcw size={18} /> 收起写法 B</> : <><ArrowRight size={18} /> 看写法 B：用变量和输入</>}
      </Button>

      {showVariableVersion && (
        <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
          <p className="mb-3 text-sm font-bold text-blue-900">写法 B：数量存进变量，单价存成常量</p>
          <CodePanel>{`const int PENCIL_PRICE = 2;
const int NOTEBOOK_PRICE = 5;
int pencilCount, notebookCount;
cin >> pencilCount >> notebookCount;
cout << PENCIL_PRICE * pencilCount + NOTEBOOK_PRICE * notebookCount;`}</CodePanel>
          <p className="mt-4 text-sm leading-relaxed text-blue-950">
            购买数量变了，只需要换输入，代码不用改。本课按这个顺序学完写法 B：<strong>变量定义 → const 常量 → 命名规则 → cin 读入</strong>，最后独立写出“文具总价”。
          </p>
        </div>
      )}
    </div>
  );
};

// 2. 变量定义与初始化
const reassignSteps = [
  { code: 'int a = 5;', value: 5, note: '定义变量 a 并初始化：a 一开始就是 5。' },
  { code: 'a = 8;', value: 8, note: '再次赋值：新值 8 覆盖旧值 5。' },
  { code: 'a = a + 2;', value: 10, note: '先算右边 8 + 2 = 10，再存回 a。' },
];

const ReassignTrace = () => {
  const [executed, setExecuted] = useState(0);
  const current = executed > 0 ? reassignSteps[executed - 1] : null;

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">单步执行：定义、再赋值、用自己计算</h3>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <ol className="space-y-1 font-mono text-sm">
          {reassignSteps.map((step, index) => (
            <li
              key={step.code}
              className={`rounded px-3 py-1.5 ${index < executed ? 'bg-green-50 text-green-900' : index === executed ? 'bg-amber-50 text-gray-900 ring-1 ring-amber-300' : 'text-gray-500'}`}
            >
              {index + 1}. {step.code}
            </li>
          ))}
        </ol>
        <div className="flex h-24 w-28 flex-col items-center justify-center rounded-lg border-4 border-yellow-400 bg-yellow-50">
          <span className="text-xs font-bold text-gray-500">a</span>
          <span className="text-3xl font-bold text-gray-800">{current ? current.value : '—'}</span>
        </div>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm text-gray-700">
        {current ? current.note : '点击“执行下一行”，观察 a 的值如何变化。'}
      </p>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => setExecuted(executed + 1)} disabled={executed >= reassignSteps.length}>执行下一行</Button>
        <Button onClick={() => setExecuted(0)} variant="outline"><RotateCcw size={16} /> 重来</Button>
      </div>
    </div>
  );
};

const DefinitionSlide = () => {
  const [step, setStep] = useState(0);
  const [rawValue, setRawValue] = useState('5');
  const trimmed = rawValue.trim();
  const isValidInt = /^-?\d{1,7}$/.test(trimmed) && Math.abs(Number(trimmed)) <= 1000000;
  const shownValue = isValidInt ? String(Number(trimmed)) : '?';

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="bg-gray-800 text-white p-6 rounded-xl font-mono text-2xl shadow-2xl relative w-full max-w-lg text-center">
        <button
          type="button"
          aria-pressed={step === 1}
          aria-label="查看 int 类型的说明"
          className={`hover:text-blue-300 transition-colors ${step === 1 ? 'text-blue-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(1)}
        >
          int
        </button>
        &nbsp;
        <button
          type="button"
          aria-pressed={step === 2}
          aria-label="查看变量名 a 的说明"
          className={`hover:text-yellow-300 transition-colors ${step === 2 ? 'text-yellow-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(2)}
        >
          a
        </button>
        &nbsp;
        <button
          type="button"
          aria-pressed={step === 3}
          aria-label="查看赋值号的说明"
          className={`hover:text-red-300 transition-colors ${step === 3 ? 'text-red-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(3)}
        >
          =
        </button>
        &nbsp;
        <button
          type="button"
          aria-pressed={step === 4}
          aria-label="查看初始值的说明"
          className={`hover:text-green-300 transition-colors ${step === 4 ? 'text-green-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(4)}
        >
          {shownValue}
        </button>
        <button
          type="button"
          aria-pressed={step === 5}
          aria-label="查看分号的说明"
          className={`hover:text-gray-300 transition-colors ${step === 5 ? 'text-gray-400 font-bold scale-110 inline-block' : ''}`}
          onClick={() => setStep(5)}
        >
          ;
        </button>

        {step > 0 && (
          <div role="status" className="absolute -bottom-16 left-0 right-0 text-sm bg-white text-gray-800 p-2 rounded-lg border shadow-lg z-10 animate-fade-in-up">
            {step === 1 && "类型 int：这个变量用来保存整数。"}
            {step === 2 && "变量名 a：之后通过这个名字读取或修改这块存储。"}
            {step === 3 && "赋值号 =：把右边的值存进左边的变量，不是数学里的“等于”。"}
            {step === 4 && "初始值：定义的同时放进去的值，这叫初始化。"}
            {step === 5 && "分号 ;：这条语句结束。"}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8 items-center mt-12">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 bg-yellow-100 border-4 border-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-gray-700">{shownValue}</span>
            <div className="absolute -top-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow">
              int a
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">内存中名为 a 的存储格子</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lesson2-variable-value" className="text-sm font-bold text-gray-600">尝试修改初始值：</label>
          <input
            id="lesson2-variable-value"
            type="text"
            inputMode="numeric"
            value={rawValue}
            onChange={(e) => setRawValue(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-3 py-2 w-32 text-center focus:border-blue-500 outline-none"
          />
          <p className={`max-w-[12rem] text-xs ${isValidInt ? 'text-gray-500' : 'text-red-600'}`}>
            {isValidInt ? '输入整数，观察左边格子的变化。' : 'int 变量只保存整数：请输入 -1000000～1000000 的整数。'}
          </p>
        </div>
      </div>

      <ReassignTrace />

      <p className="w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        注意：局部变量只定义、不赋值（如 <code>int b;</code>）时，里面的值不确定，不能直接拿来计算或输出。先赋值，再使用。
      </p>
    </div>
  );
};

// 3. 变量与 const 常量
const ConstSlide = () => {
  const [choice, setChoice] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center gap-3 text-gray-800">
          <LockKeyhole className="text-amber-600" />
          <h2 className="text-2xl font-bold">变量可以更新，const 常量不能再次赋值</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <p className="mb-3 text-lg font-bold text-blue-900">变量</p>
            <CodePanel>{`int score = 80;\nscore = 90;`}</CodePanel>
            <p className="mt-3 text-sm leading-6 text-blue-950">第二行把新值 90 存回 score，可以编译。</p>
          </div>
          <div className="min-w-0 rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="mb-3 text-lg font-bold text-amber-900">常量</p>
            <CodePanel>{`const int PASS_SCORE = 60;\n// PASS_SCORE = 70;  // 错误示例`}</CodePanel>
            <p className="mt-3 text-sm leading-6 text-amber-950">const 常量必须初始化，之后不能再次赋值。全大写是常见命名习惯，不是编译规则。</p>
          </div>
        </div>
        <p className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-6 text-gray-700">
          怎么选：运行中会变化的量（如购买数量）用变量；题目规定、不会变化的量（如单价、及格线）用 const 常量。
        </p>
      </div>

      <fieldset className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
        <legend className="float-left mb-4 w-full text-lg font-bold text-gray-800">判断：哪一条赋值语句可以编译？</legend>
        <div className="clear-both grid gap-3 sm:grid-cols-2">
          <button type="button" aria-pressed={choice === 'variable'} onClick={() => setChoice('variable')} className={`rounded-xl border-2 p-4 text-left font-mono text-lg transition-all hover:border-blue-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${choice === 'variable' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            score = 90;
          </button>
          <button type="button" aria-pressed={choice === 'constant'} onClick={() => setChoice('constant')} className={`rounded-xl border-2 p-4 text-left font-mono text-lg transition-all hover:border-blue-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${choice === 'constant' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            PASS_SCORE = 70;
          </button>
        </div>
        {choice && (
          <p role="status" className={`mt-4 rounded-lg p-3 text-sm font-medium ${choice === 'variable' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            {choice === 'variable'
              ? '正确：score 是变量，可以保存新值。'
              : '这条语句不能编译：PASS_SCORE 已经声明为 const 常量。'}
          </p>
        )}
      </fieldset>
    </div>
  );
};

// 4. 变量命名三规则
const namingRules = [
  {
    title: '规则一：只用英文字母、数字和下划线',
    valid: ['pen_count', 'score2'],
    invalid: [
      { name: 'my score', reason: '含空格，会被看成两个名字' },
      { name: 'five-Star', reason: '减号会被当成减法运算' },
    ],
  },
  {
    title: '规则二：不能以数字开头',
    valid: ['box1'],
    invalid: [{ name: '1box', reason: '第一个字符是数字' }],
  },
  {
    title: '规则三：不能使用关键字',
    valid: ['myClass'],
    invalid: [{ name: 'int、if、return、class、const', reason: '这些词已被 C++ 占用' }],
  },
];

const NamingRulesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6">
    <h2 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
      <ListChecks className="text-blue-600" /> 变量命名三规则
    </h2>

    <div className="grid w-full gap-6 md:grid-cols-3">
      {namingRules.map((rule) => (
        <div key={rule.title} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-lg">
          <h3 className="mb-4 flex items-start gap-3 text-lg font-bold leading-snug text-gray-800">
            <span className="shrink-0 rounded-lg bg-amber-100 p-2"><AlertTriangle className="text-amber-700" size={20} /></span>
            <span className="pt-1">{rule.title}</span>
          </h3>
          <div className="flex flex-1 flex-col gap-3">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="mb-3 flex items-center gap-1 text-sm font-bold text-green-800"><Check size={16} /> 合法</p>
              <div className="flex flex-wrap gap-2">
                {rule.valid.map((name) => (
                  <code key={name} className="rounded-lg border border-green-200 bg-white px-3 py-1 font-mono font-bold text-green-800 shadow-sm">{name}</code>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="mb-3 flex items-center gap-1 text-sm font-bold text-red-800"><X size={16} /> 不合法</p>
              <div className="space-y-2">
                {rule.invalid.map((item) => (
                  <p key={item.name} className="text-sm leading-relaxed text-red-900">
                    <code className="mr-1 box-decoration-clone rounded-lg border border-red-200 bg-white px-2 py-0.5 font-mono font-bold text-red-800 shadow-sm">{item.name}</code>
                    {item.reason}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="w-full rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 flex items-center gap-2 text-base text-blue-900"><BookOpen size={18} /> 补充两点</strong>
      <p>1. 区分大小写：<code>score</code>、<code>Score</code>、<code>SCORE</code> 是三个不同的名字。</p>
      <p>2. 以下划线开头的名字（如 <code>_fiveStar</code>）也合法。本课按考试常见写法只用字母、数字、下划线判断。</p>
    </div>
  </div>
);

// 5. 命名规则练习
const GameSlide = () => {
  const [solved, setSolved] = useState([]);
  const [message, setMessage] = useState(null);

  const items = [
    { id: 1, text: 'super_man', valid: true, reason: '只含字母和下划线' },
    { id: 2, text: 'super man', valid: false, reason: '含空格，变量名必须连在一起' },
    { id: 3, text: 'super-man', valid: false, reason: '含减号，会被读成 super 减 man' },
    { id: 4, text: 'man2024', valid: true, reason: '数字不在开头' },
    { id: 5, text: '2024man', valid: false, reason: '以数字开头' },
    { id: 6, text: 'int', valid: false, reason: 'int 是关键字' },
    { id: 7, text: '_count', valid: true, reason: '下划线开头也合法' },
    { id: 8, text: 'Score', valid: true, reason: '大写字母合法，且与 score 是不同名字' },
  ];
  const invalidCount = items.filter((item) => !item.valid).length;

  const handleInspect = (item) => {
    if (solved.includes(item.id)) return;

    if (!item.valid) {
      setSolved([...solved, item.id]);
      setMessage({ type: 'success', text: `${item.text} 不合法：${item.reason}。` });
    } else {
      setMessage({ type: 'error', text: `${item.text} 是合法变量名：${item.reason}。` });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
          <Search className="text-blue-600" /> 任务：点击所有 <span className="text-red-600">不合法</span> 的变量名
        </h3>
        <p className="mt-3 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-bold text-gray-600">已找出：{solved.length} / {invalidCount} 个</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        {items.map(item => {
          const isCaught = solved.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isCaught}
              aria-label={`判断变量名 ${item.text} 是否不合法`}
              onClick={() => handleInspect(item)}
              className={`
                 p-5 rounded-xl font-mono text-lg font-bold border-2 transition-all duration-300
                 ${isCaught
                  ? 'bg-red-50 border-red-500 text-red-700 line-through cursor-default'
                  : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1'
                }
               `}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {message && (
        <div role="status" className={`mt-6 w-full max-w-3xl p-4 rounded-xl flex items-center gap-2 shadow-sm ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>
          {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
          {message.text}
        </div>
      )}

      {solved.length === invalidCount && (
        <p className="mt-4 rounded-lg bg-gray-800 px-4 py-2 font-bold text-white">
          {invalidCount} 个不合法名字已全部找出。继续前，先说出每个名字违反了哪条规则。
        </p>
      )}
    </div>
  );
};

// 6 & 7. 真题
const QuizSlide = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl w-full mx-auto">
      <div className="w-full bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-4 inline-block">{data.source}</span>
        <h3 className="text-xl font-bold text-gray-800 mb-6">{data.question}</h3>

        <div className="space-y-3">
          {data.options.map((opt, idx) => {
            let itemStyle = "border-gray-200 hover:bg-gray-50";
            let icon = null;

            if (answered) {
              if (idx === data.correct) {
                itemStyle = "bg-green-100 border-green-500 text-green-800";
                icon = <Check className="text-green-600" />;
              } else if (idx === selected) {
                itemStyle = "bg-red-100 border-red-500 text-red-800";
                icon = <X className="text-red-600" />;
              } else {
                itemStyle = "opacity-50 border-gray-100";
              }
            }

            return (
              <button
                key={opt}
                type="button"
                aria-pressed={selected === idx}
                onClick={() => setSelected(idx)}
                disabled={answered}
                className={`w-full p-4 border-2 rounded-lg cursor-pointer transition-all flex justify-between items-center text-left ${itemStyle}`}
              >
                <span className="font-mono text-lg"><span className="mr-2 font-sans font-bold">{String.fromCharCode(65 + idx)}.</span>{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {answered && (
          <div role="status" className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2">
              <BookOpen size={16} /> {selected === data.correct ? '回答正确。' : `回答错误，正确答案是 ${String.fromCharCode(65 + data.correct)}。`}
            </h4>
            <p className="text-yellow-900">解析：{data.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 8. cin 读入与计算
const PENCIL_PRICE = 2;
const NOTEBOOK_PRICE = 5;

const parseCounts = (line) => {
  const parts = line.trim().split(/\s+/).filter(Boolean);
  if (parts.length !== 2 || !parts.every((part) => /^\d{1,3}$/.test(part))) return null;
  const [pencils, notebooks] = parts.map(Number);
  if (pencils > 100 || notebooks > 100) return null;
  return { pencils, notebooks };
};

const CinSlide = () => {
  const [inputLine, setInputLine] = useState('3 2');
  const counts = parseCounts(inputLine);
  const total = counts ? PENCIL_PRICE * counts.pencils + NOTEBOOK_PRICE * counts.notebooks : null;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800">
          <Keyboard className="text-blue-600" /> cin &gt;&gt; 变量：从键盘读入数据
        </h3>
        <CodePanel>{'cin >> pencilCount >> notebookCount;'}</CodePanel>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-gray-700">
          <li className="rounded-lg border border-gray-100 bg-gray-50 p-3"><code>cin</code> 从键盘读入；<code>&gt;&gt;</code> 把读到的数据<strong>按顺序</strong>送进右边的变量。</li>
          <li className="rounded-lg border border-gray-100 bg-gray-50 p-3">多个数据之间用空格或换行隔开都可以。</li>
          <li className="rounded-lg border border-gray-100 bg-gray-50 p-3">方向记法：<code>cout &lt;&lt;</code> 把数据送向屏幕，<code>cin &gt;&gt;</code> 把数据送进变量。</li>
        </ul>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
        <label htmlFor="lesson2-cin-line" className="mb-2 block text-sm font-bold text-blue-900">模拟键盘输入（两个 0～100 的整数，用空格隔开）</label>
        <input
          id="lesson2-cin-line"
          type="text"
          value={inputLine}
          onChange={(event) => setInputLine(event.target.value)}
          className="w-full max-w-xs rounded-lg border-2 border-blue-200 bg-white px-3 py-2 font-mono focus:border-blue-500 focus:outline-none"
        />
        {counts ? (
          <div role="status" className="mt-4 grid gap-3 font-mono text-sm text-blue-950 sm:grid-cols-3">
            <div className="rounded-lg border border-blue-100 bg-white p-3 shadow-sm">pencilCount = {counts.pencils}</div>
            <div className="rounded-lg border border-blue-100 bg-white p-3 shadow-sm">notebookCount = {counts.notebooks}</div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 font-bold text-green-800 shadow-sm">输出：{total}</div>
            <p className="font-sans sm:col-span-3">计算：{PENCIL_PRICE} × {counts.pencils} + {NOTEBOOK_PRICE} × {counts.notebooks} = {total}</p>
          </div>
        ) : (
          <p role="status" className="mt-4 text-sm font-medium text-red-700">请输入两个 0～100 的整数，用空格隔开；格式不对时不显示计算结果。</p>
        )}
      </div>

      <PredictCheck
        className="w-full max-w-3xl"
        prompt="int a, b; cin >> a >> b; 运行时输入 7 4，接着执行 cout << a - b;，输出是多少？"
        options={['3', '-3', '74', '7 4']}
        correctIndex={0}
        explanation="第一个数 7 存入 a，第二个数 4 存入 b；a - b = 3。"
        misconception="把读入顺序弄反，或把空格隔开的两个数看成一个 74。"
      />

      <p className="w-full max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        考试提示：判题会逐字比较输出。不要输出“请输入数量：”这类提示语，只输出题目要求的内容。
      </p>
    </div>
  );
};

// 9. 上机：文具总价
const SummarySlide = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 h-full items-stretch">
      <div className="min-w-0 space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-3 text-2xl font-bold text-gray-800">题目：文具总价</h2>
          <p className="text-sm leading-relaxed text-gray-700">铅笔每支 2 元，本子每本 5 元。输入一行两个整数，分别是铅笔和本子的数量（0～100），输出总价。</p>
          <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：3 2</div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：16</div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：0 0</div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">输出：0</div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-2 font-bold text-blue-900">本课要点</h3>
          <ul className="space-y-1 text-sm leading-relaxed text-blue-950">
            <li>• 定义并初始化：<code>类型 变量名 = 初始值;</code></li>
            <li>• 变量可以再次赋值；const 常量初始化后不能再赋值。</li>
            <li>• 命名：字母、数字、下划线；不以数字开头；不用关键字；区分大小写。</li>
            <li>• 读入：<code>cin &gt;&gt; a &gt;&gt; b;</code> 按顺序存入 a、b。</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl border border-green-200 shadow-sm">
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Code size={18} /> 上机任务</h3>
          <ul className="list-disc list-inside text-sm text-green-900 space-y-1">
            <li>纠错：判断 <code>my score</code>、<code>2pens</code>、<code>pen_count</code>、<code>class</code> 哪些能作变量名。</li>
            <li>编码：先不看右边，自己写出程序；输入 <code>3 2</code> 与 <code>0 0</code> 分别核对输出 <code>16</code> 与 <code>0</code>。</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 text-white font-mono shadow-2xl h-full flex min-w-0 flex-col">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 space-y-2 text-sm md:text-base overflow-auto">
          <p className="text-gray-400">// 参考程序：文具总价</p>
          <p><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;iostream&gt;</span></p>
          <p><span className="text-purple-400">using</span> <span className="text-purple-400">namespace</span> std;</p>
          <p>&nbsp;</p>
          <p><span className="text-blue-400">int</span> main() {'{'}</p>
          <p className="pl-4"><span className="text-gray-400">// Step 1: 单价不变，用 const 常量保存</span></p>
          <p className="pl-4"><span className="text-purple-400">const</span> <span className="text-blue-400">int</span> PENCIL_PRICE = 2;</p>
          <p className="pl-4"><span className="text-purple-400">const</span> <span className="text-blue-400">int</span> NOTEBOOK_PRICE = 5;</p>
          <p className="pl-4"><span className="text-blue-400">int</span> pencilCount, notebookCount;</p>
          <p>&nbsp;</p>
          <p className="pl-4"><span className="text-gray-400">// Step 2: 输入数量，例如 3 2</span></p>
          <p className="pl-4">cin &gt;&gt; pencilCount &gt;&gt; notebookCount;</p>
          <p>&nbsp;</p>
          <p className="pl-4"><span className="text-gray-400">// Step 3: 计算并输出总价</span></p>
          <p className="pl-4"><span className="text-blue-400">int</span> total = PENCIL_PRICE * pencilCount</p>
          <p className="pl-8">+ NOTEBOOK_PRICE * notebookCount;</p>
          <p className="pl-4">cout &lt;&lt; total &lt;&lt; &quot;\n&quot;;</p>
          <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-yellow-300">0</span>;</p>
          <p>{'}'}</p>
        </div>
      </div>
    </div>
  );
};

// --- 布局组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "box": <Box size={size} className={className} />,
    "list": <ListChecks size={size} className={className} />,
    "search": <Search size={size} className={className} />,
    "trophy": <Trophy size={size} className={className} />,
    "keyboard": <Keyboard size={size} className={className} />,
    "code": <Code size={size} className={className} />,
    "lock": <LockKeyhole size={size} className={className} />,
    "check": <Check size={size} className={className} />
  };
  return icons[name] || null;
};

function App() {
  const [activeSection, setActiveSection] = useState(1);

  // 获得当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <LegacyCppLessonShell
        prerequisites={['能写出并运行 Hello World', '知道程序从 main 开始、自上而下逐行执行', '能分清英文标点和中文标点']}
      lessonNumber={2}
      lessonTitle="变量与数据"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/3"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={2} />}
      bottomSupport={<CppL1LessonSupport lessonId={2} placement="bottom" />}
    >
      {ActiveComponent ? React.createElement(ActiveComponent) : <div>Coming Soon</div>}
    </LegacyCppLessonShell>
  );
}

export default App;
