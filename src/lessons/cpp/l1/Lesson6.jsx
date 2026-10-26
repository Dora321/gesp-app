import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  Shield,
  Zap,
  Ticket,
  AlertTriangle,
  Calculator,
  Brain,
  Check,
  X,
  ArrowRight,
  Unlock,
  Key,
  Lightbulb,
  DoorOpen,
  Info,
  Menu
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "shield": <Shield size={size} color={color} />,
    "zap": <Zap size={size} color={color} />,
    "ticket": <Ticket size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "calculator": <Calculator size={size} color={color} />,
    "brain": <Brain size={size} color={color} />,
    "check": <Check size={size} color={color} />,
    "x": <X size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "unlock": <Unlock size={size} color={color} />,
    "key": <Key size={size} color={color} />,
    "lightbulb": <Lightbulb size={size} color={color} />,
    "door": <DoorOpen size={size} color={color} />,
    "info": <Info size={size} color={color} />
  };
  return icons[name] || <Info size={size} color={color} />;
};

const lesson6MasteryItems = [
  {
    label: '能写出 %d、%.2f、%% 的作用。',
    evidence: '%d 换成一个整数，%.2f 换成保留两位小数的小数，%% 输出一个 % 号；格式串里其他字符原样输出。',
    retryHint: '回到“printf 基本用法”，对照占位符表逐个说一遍。',
  },
  {
    label: '能预测 %2d、%02d、%-5d 的输出。',
    evidence: '7 用 %2d 输出“ 7”（前面 1 个空格），用 %02d 输出“07”，用 %-5d 输出“7”后跟 4 个空格；宽度不够时不截断。',
    retryHint: '回到“宽度与补零”，在格式实验里把数字换成 7、42、123 各试一次。',
  },
  {
    label: '能用 scanf("%d%d", &a, &b) 读入两个整数。',
    evidence: '知道每个变量前要写 &，读 double 用 %lf，scanf 只负责读入、不会输出提示语。',
    retryHint: '回到“scanf 读入”，把例 2 抄一遍，说清每个 & 的作用。',
  },
  {
    label: '能预测输入 14+7 时 int 变量读到的值。',
    evidence: 'scanf("%d", &P) 和 cin >> P 读到 14 就停在 + 号前，不会计算 14+7；剩下的 +7 留在输入里。',
    retryHint: '回到“输入遇到非数字字符时”，把输入从左到右一个字符一个字符地读。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：09:05 还是 9:5", icon: "info", category: "printf" },
  { id: 2, title: "printf 基本用法", icon: "key", category: "printf" },
  { id: 3, title: "宽度与补零", icon: "calculator", category: "printf" },
  { id: 4, title: "真题：2024 年 6 月一级第 4 题", icon: "check", category: "printf" },
  { id: 5, title: "真题：2024 年 6 月一级第 6 题", icon: "check", category: "printf" },
  { id: 6, title: "scanf 读入", icon: "arrow-right", category: "scanf" },
  { id: 7, title: "输入遇到非数字字符时", icon: "alert", category: "scanf" },
  { id: 8, title: "cout 与 printf 对照", icon: "brain", category: "对照与易错" },
  { id: 9, title: "常见错误与真题", icon: "x", category: "对照与易错" },
  { id: 10, title: "上机：时间格式 / 正确率", icon: "zap", category: "对照与易错" },
  { id: 11, title: "小结与课后任务", icon: "lightbulb", category: "小结与检查" },
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
  <pre className="overflow-x-auto whitespace-pre rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

// 作答后才显示解析；选项锁定，避免反复试选。
const QuizCard = ({ source, badge = '站内真题', question, options, explanation, mono = false }) => {
  const [selected, setSelected] = useState(null);
  const correctOption = options.find((opt) => opt.isCorrect);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-slate-600">
          <Check size={14} className="text-yellow-500" /> {badge}
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
                <span className={mono ? 'whitespace-pre-wrap break-all font-mono text-sm' : ''}>{opt.text}</span>
                {selected && opt.isCorrect && <Check className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />}
                {isChosen && !opt.isCorrect && <X className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />}
              </button>
            );
          })}
        </div>

        {selected && (
          <div role="status" className="mt-6 space-y-3">
            <div className={`flex items-start gap-3 rounded-xl p-4 ${selected.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selected.isCorrect ? <Check className="mt-0.5 shrink-0" /> : <X className="mt-0.5 shrink-0" />}
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

const judgeOptions = (correctIsTrue) => [
  { id: 'A', text: '正确', isCorrect: correctIsTrue },
  { id: 'B', text: '错误', isCorrect: !correctIsTrue },
];

// --- 1. 问题导入 ---
const IntroSlide = () => {
  const [showPrintf, setShowPrintf] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">先看一道题</h2>
        <p className="text-lg text-gray-600">现在是 9 点 5 分。电子表上显示的是 09:05，题目也常要求“不足两位补 0”。</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <p className="mb-2 text-sm font-bold text-gray-600">写法 A：用 cout 输出</p>
        <CodePanel>{`int h = 9, m = 5;
cout << h << ":" << m << endl;`}</CodePanel>
      </div>

      <PredictCheck
        className="w-full max-w-3xl"
        prompt="写法 A 输出什么？"
        options={['9:5', '09:05', '9:05', 'h:m']}
        correctIndex={0}
        explanation="cout 把 9、冒号、5 依次原样输出，不会自动补 0，所以是 9:5。"
        misconception="以为程序知道这是时间，会自动按 09:05 的格式输出。"
      />

      <Button onClick={() => setShowPrintf(!showPrintf)} variant={showPrintf ? 'outline' : 'primary'}>
        {showPrintf ? '收起写法 B' : <>看写法 B：用 printf 控制格式 <ArrowRight size={18} /></>}
      </Button>

      {showPrintf && (
        <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
          <p className="mb-3 text-sm font-bold text-blue-900">写法 B：%02d 表示“至少 2 位，不足在前面补 0”</p>
          <CodePanel>{`#include <cstdio>
...
printf("%02d:%02d\\n", h, m);   // 输出 09:05`}</CodePanel>
          <p className="mt-4 text-sm leading-relaxed text-blue-950">
            本课主线：<strong>printf 占位符 → 宽度与补零 → scanf 读入 → 输入遇到非数字字符 → 与 cout 对照</strong>，最后完成“时间格式”和“正确率”两道上机题。
          </p>
        </div>
      )}
    </div>
  );
};

// --- 2. printf 基本用法 ---
const placeholderRows = [
  { code: '%d', meaning: '一个整数', example: 'printf("%d", 42);', output: '42' },
  { code: '%f', meaning: '一个小数，默认 6 位小数', example: 'printf("%f", 3.14159);', output: '3.141590' },
  { code: '%.2f', meaning: '小数，保留 2 位（四舍五入）', example: 'printf("%.2f", 3.14159);', output: '3.14' },
  { code: '%c', meaning: '一个字符', example: "printf(\"%c\", 'A');", output: 'A' },
  { code: '%%', meaning: '输出一个 % 号', example: 'printf("5%%2=%d", 5 % 2);', output: '5%2=1' },
];

const PrintfBasicSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-center text-xl font-bold text-slate-800">printf(格式串, 参数1, 参数2, …);</h3>
      <p className="text-center text-sm leading-relaxed text-slate-600">
        需要 <code>#include &lt;cstdio&gt;</code>。格式串里的<strong>普通字符原样输出</strong>；以 % 开头的<strong>占位符</strong>按从左到右的顺序，依次换成后面参数的值。printf 不会自动换行，要换行就写 <code>\n</code>。
      </p>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[36rem] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[5rem_1fr_1.4fr_6rem] bg-slate-800 text-sm font-bold text-white">
            <div className="p-3">占位符</div>
            <div className="p-3">换成什么</div>
            <div className="p-3">例子</div>
            <div className="p-3">输出</div>
          </div>
          {placeholderRows.map((row) => (
            <div key={row.code} className="grid grid-cols-[5rem_1fr_1.4fr_6rem] border-t border-slate-200 text-sm text-slate-700">
              <div className="p-3 font-mono font-bold text-slate-900">{row.code}</div>
              <div className="p-3">{row.meaning}</div>
              <div className="p-3 font-mono text-xs">{row.example}</div>
              <div className="p-3 font-mono font-bold text-green-700">{row.output}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        参数的<strong>个数和类型</strong>要与占位符一一对应。<code>printf("%d", 3.14)</code> 通常能编译，但输出的数不可靠；整数用 %d，小数用 %f。
      </p>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 5 题"
      question={'下面 C++ 代码执行后的输出是（ ）。\nint a = 1;\nprintf("a+1=%d\\n", a+1);'}
      mono
      options={[
        { id: 'A', text: 'a+1= 2' },
        { id: 'B', text: 'a+1=2', isCorrect: true },
        { id: 'C', text: '2=2' },
        { id: 'D', text: '2= 2' },
      ]}
      explanation="格式串 a+1= 是普通字符，原样输出，等号后面没有空格；%d 换成参数 a+1 的值 2。所以输出 a+1=2。"
    />
  </div>
);

// --- 3. 宽度与补零 ---
const formatInt = (n, width, mode) => {
  const text = String(n);
  if (mode === 'zero') {
    if (text.length >= width) return text;
    return n < 0 ? `-${String(-n).padStart(width - 1, '0')}` : text.padStart(width, '0');
  }
  if (mode === 'left') return text.padEnd(width, ' ');
  return text.padStart(width, ' ');
};

const FormatLab = () => {
  const [rawNumber, setRawNumber] = useState('7');
  const [rawWidth, setRawWidth] = useState('3');
  const numberText = rawNumber.trim();
  const widthText = rawWidth.trim();
  const validNumber = /^-?\d{1,5}$/.test(numberText);
  const validWidth = /^[1-8]$/.test(widthText);
  const n = Number(numberText);
  const w = Number(widthText);
  const rows = validNumber && validWidth ? [
    { spec: `%${w}d`, desc: '右对齐，不足在左边补空格', out: formatInt(n, w, 'right') },
    { spec: `%0${w}d`, desc: '右对齐，不足在左边补 0', out: formatInt(n, w, 'zero') },
    { spec: `%-${w}d`, desc: '左对齐，不足在右边补空格', out: formatInt(n, w, 'left') },
  ] : [];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">格式实验：同一个数，三种宽度写法</h3>
      <div className="mb-4 flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="l1-6-format-number" className="text-sm font-bold text-gray-700">整数（-99999～99999）</label>
          <input id="l1-6-format-number" type="text" inputMode="numeric" value={rawNumber} onChange={(e) => setRawNumber(e.target.value)} className="w-32 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="l1-6-format-width" className="text-sm font-bold text-gray-700">宽度（1～8）</label>
          <input id="l1-6-format-width" type="text" inputMode="numeric" value={rawWidth} onChange={(e) => setRawWidth(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        </div>
      </div>
      {rows.length > 0 ? (
        <div role="status" className="space-y-2">
          {rows.map((row) => (
            <div key={row.spec} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="min-w-0">
                <code className="block font-mono font-bold text-slate-900">printf("[{row.spec}]", {n});</code>
                <span className="text-sm text-slate-600">{row.desc}</span>
              </div>
              <span className="whitespace-pre rounded bg-slate-900 px-3 py-1 font-mono text-green-400">[{row.out}]</span>
            </div>
          ))}
          <p className="text-xs text-gray-500">方括号是格式串里的普通字符，用来看清空格的位置。宽度是“最少宽度”：数字比宽度长时原样输出，不会被截断。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 -99999～99999 的整数和 1～8 的宽度；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

const WidthSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1</p>
        <CodePanel>{`int h = 9, m = 5;
printf("%d:%d\\n", h, m);
printf("%02d:%02d\\n", h, m);
printf("[%3d][%-3d]\\n", 7, 7);
printf("5%%2=%d\\n", 5 % 2);
double p = 3.14159;
printf("%.2f\\n", p);`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`9:5
09:05
[  7][7  ]
5%2=1
3.14`}</OutputPanel>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950"><code className="font-bold">%3d</code>：至少占 3 位，右对齐，不足在左边补空格。</div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950"><code className="font-bold">%03d</code>：至少占 3 位，不足在左边补 0。</div>
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950"><code className="font-bold">%-3d</code>：减号表示左对齐，不足在右边补空格；减号本身不输出。</div>
    </div>

    <FormatLab />

    <QuizCard
      badge="课堂练习"
      source="课堂练习"
      question="下面哪条语句的输出是 7:05？"
      mono
      options={[
        { id: 'A', text: 'printf("%d:%d", 7, 5);' },
        { id: 'B', text: 'printf("%2d:%2d", 7, 5);' },
        { id: 'C', text: 'printf("%d:%02d", 7, 5);', isCorrect: true },
        { id: 'D', text: 'printf("%02d:%02d", 7, 5);' },
      ]}
      explanation="小时 7 不补，分钟 5 补成 05，所以是 %d:%02d。A 输出 7:5；B 补的是空格，输出“ 7: 5”；D 把小时也补成 07，输出 07:05。"
    />
  </div>
);

// --- 4. 真题：2024 年 6 月一级第 4 题 ---
const ExamPercentSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：格式串里的 %%</h3>
      <p className="mt-1 text-slate-500">先把格式串分成“普通字符”和“占位符”两类，再写输出。</p>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 4 题"
      question={'C++ 语句 printf("5%%2={%d}\\n",5 % 2) 执行后的输出是（ ）。'}
      mono
      options={[
        { id: 'A', text: '1={1}' },
        { id: 'B', text: '5%2={5%2}' },
        { id: 'C', text: '5%2={1}', isCorrect: true },
        { id: 'D', text: '5 ={1}' },
      ]}
      explanation="5 原样输出；%% 输出一个 %；2={ 原样输出；%d 换成参数 5 % 2 的值 1；} 原样输出。合起来是 5%2={1}。花括号对 printf 没有特殊含义。"
    />

    <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
      <strong className="mb-1 block text-amber-800">拆格式串的方法</strong>
      <code>{'5 | %% | 2={ | %d | } | \\n'}</code>：只有 <code>%%</code> 和 <code>%d</code> 是特殊的，其余全部原样输出。
    </div>
  </div>
);

// --- 5. 真题：2024 年 6 月一级第 6 题 ---
const ExamFloatSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：%.0f 与变量的最后一次赋值</h3>
      <p className="mt-1 text-slate-500">先追踪 a 最后是多少，再看格式串怎样输出。</p>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 6 题"
      question={'下面 C++ 代码执行后的输出是（ ）。\nfloat a;\na = 101.101;\na = 101;\nprintf("a+1={%.0f}", a+1);'}
      mono
      options={[
        { id: 'A', text: '102={102}' },
        { id: 'B', text: 'a+1={a+1}' },
        { id: 'C', text: 'a+1={102}', isCorrect: true },
        { id: 'D', text: 'a 先被赋值为浮点数，后被赋值为整数，执行将报错' },
      ]}
      explanation="a 最后被赋值为 101（float 变量可以保存整数值，不会报错），a + 1 是 102。格式串里 a+1={ 原样输出，%.0f 表示按小数输出、保留 0 位小数，得 102，再输出 }。结果 a+1={102}。"
    />

    <div className="w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
      <strong className="mb-1 block text-blue-900">记一句</strong>
      格式串里的 <code>a+1</code> 只是文字，不会被计算；真正被计算的是逗号后面的参数 <code>a+1</code>。
    </div>
  </div>
);

// --- 6. scanf 读入 ---
const ScanfSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：输入 10 20</p>
        <CodePanel>{`#include <cstdio>

int main() {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'30'}</OutputPanel>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">两个数之间用空格或换行隔开都可以：先输入 10 回车、再输入 20 回车，结果也是 30。</p>
      </div>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-blue-900">scanf 的三条规则</h3>
        <ul className="space-y-2 text-sm leading-relaxed text-blue-950">
          <li className="rounded-lg border border-blue-100 bg-white p-3">每个变量前要写 <code>&amp;</code>：scanf 需要知道把数据存到哪个变量里。</li>
          <li className="rounded-lg border border-blue-100 bg-white p-3">读 int 用 <code>%d</code>；读 double 用 <code>%lf</code>，如 <code>scanf("%lf", &amp;x);</code>。</li>
          <li className="rounded-lg border border-blue-100 bg-white p-3">scanf 只负责读入，不会在屏幕上显示提示文字。</li>
        </ul>
      </div>
      <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-amber-900">printf 和 scanf 的 &amp;</h3>
        <ul className="space-y-2 text-sm leading-relaxed text-amber-950">
          <li className="rounded-lg border border-amber-100 bg-white p-3">scanf 要写 &amp;：<code>scanf("%d", &amp;a);</code></li>
          <li className="rounded-lg border border-amber-100 bg-white p-3">printf 不写 &amp;：<code>printf("%d", a);</code>。写成 <code>&amp;a</code> 输出的是变量的地址，不是 a 的值。</li>
        </ul>
      </div>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <QuizCard
        source="2024 年 3 月 GESP C++ 一级第 12 题"
        question="C++ 语言中下面可以完成数据输入的语句是（ ）。"
        options={[
          { id: 'A', text: 'printf语句' },
          { id: 'B', text: 'scanf语句', isCorrect: true },
          { id: 'C', text: 'default语句' },
          { id: 'D', text: 'cout语句' },
        ]}
        explanation="scanf 是格式化输入；printf 和 cout 都是输出；default 是 switch 语句里的一个分支标签（第 9 课学）。"
      />
      <QuizCard
        source="2024 年 3 月 GESP C++ 一级判断题第 3 题"
        question="C++ 函数 scanf() 必须含有参数，且其参数为字符串型字面量，其功能是提示输入。（ ）"
        options={judgeOptions(false)}
        explanation="scanf 的功能是读入数据，不是提示输入；除了格式串，它还需要接收数据的变量地址（如 &a）。要显示提示文字应该用 printf 或 cout，但考试程序不要输出提示语。"
      />
    </div>
  </div>
);

// --- 7. 输入遇到非数字字符时 ---
const InputStopSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：输入 14+7</p>
        <CodePanel>{`int P;
scanf("%d", &P);
printf("%d\\n", P);`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'14'}</OutputPanel>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">把 scanf 换成 <code>cin &gt;&gt; P;</code>，结果相同。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">读整数时，一个字符一个字符地看</h3>
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-2xl font-bold">
        {['1', '4', '+', '7'].map((ch, index) => (
          <span key={`${ch}-${index}`} className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 ${index < 2 ? 'border-green-400 bg-green-50 text-green-800' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>{ch}</span>
        ))}
      </div>
      <ol className="mt-6 space-y-2 text-sm leading-relaxed text-slate-700">
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">1. 先跳过开头的空格和换行。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">2. 尽量多读能组成整数的字符：1、4。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">3. 遇到第一个不能组成整数的字符 + 就停下，P = 14；+7 留在输入里，等下一次读入。</li>
      </ol>
      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">scanf 和 cin 都<strong>不会</strong>把 14+7 当作算式计算。</p>
    </div>

    <PredictCheck
      className="w-full"
      prompt="int x; cin >> x; 运行时输入 3.9，x 是多少？"
      options={['3', '4', '3.9', '0']}
      correctIndex={0}
      explanation="读 int 时读到 3，遇到小数点就停下，x = 3；后面的 .9 留在输入里。这和第 4 课的“小数存入 int 向 0 截断”结果相同，但原因不同：这里是读入时就停下了。"
      misconception="以为 cin 会四舍五入成 4，或者能把 3.9 存进 int。"
    />

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 11 题"
      question={'下面 C++ 代码执行时输入 14+7 后，正确的输出是（ ）。\nint P;\nprintf("请输入正整数P: ");\nscanf("%d", &P);\nif (P % 3 || P % 7)\n printf("第5行代码%d, %d", P % 3, P % 7);\nelse\n printf("第7行代码%2d", P % 3 && P % 7);'}
      mono
      options={[
        { id: 'A', text: '第5行代码2, 0', isCorrect: true },
        { id: 'B', text: '第5行代码1, 0' },
        { id: 'C', text: '第7行代码 1' },
        { id: 'D', text: '第7行代码 0' },
      ]}
      explanation="关键是 P 读到 14，不是 21。14 % 3 = 2，14 % 7 = 0。条件 P % 3 || P % 7 里 2 不为 0，条件成立，执行第 5 行，输出 第5行代码2, 0。（|| 和 if 在第 7、8 课学，这里先抓住读入结果。若误以为 P = 21，两个余数都是 0，会错选 D。）"
    />

    <div className="grid w-full gap-6 md:grid-cols-2">
      <QuizCard
        source="2024 年 6 月 GESP C++ 一级第 5 题"
        question="对整型变量 i，执行 C++ 语句 cin >> i, cout << i 时如果输入 5+2，下述说法正确的是（ ）。"
        options={[
          { id: 'A', text: '将输出整数 7' },
          { id: 'B', text: '将输出 5', isCorrect: true },
          { id: 'C', text: '语句执行将报错，输入表达式不能作为输出的参数' },
          { id: 'D', text: '语句能执行，但输出内容不确定' },
        ]}
        explanation="i 是 int，cin 读到 5 遇到 + 就停下，i = 5，输出 5。这条语句里的逗号是第 5 课的逗号运算符：先读入，再输出。"
      />
      <QuizCard
        source="2024 年 3 月 GESP C++ 一级第 3 题"
        question="执行 C++ 语句 cin >> a 时如果输入 5+2，下述说法正确的是（ ）。"
        options={[
          { id: 'A', text: '变量 a 将被赋值为整数 7' },
          { id: 'B', text: '变量 a 将被赋值为字符串，字符串内容为 5+2' },
          { id: 'C', text: '语句执行将报错，不能输入表达式' },
          { id: 'D', text: '依赖于变量 a 的类型。如果没有定义，会有编译错误', isCorrect: true },
        ]}
        explanation="题目没有给出 a 的类型。cin 怎样读取由 a 的类型决定：a 是 int 时读到 5；a 是 char 时只读字符 '5'。如果 a 根本没有定义，程序编译就会出错。"
      />
    </div>
  </div>
);

// --- 8. cout 与 printf 对照 ---
const compareRows = [
  ['头文件', '<iostream>', '<cstdio>'],
  ['输出整数 n', 'cout << n;', 'printf("%d", n);'],
  ['换行', 'endl 或 "\\n"', '"\\n"'],
  ['保留 2 位小数', 'cout << fixed << setprecision(2) << x;（还要 <iomanip>）', 'printf("%.2f", x);'],
  ['输出字符 c', 'cout << c;', 'printf("%c", c);'],
  ['输出一个 %', 'cout << "%";', 'printf("%%");'],
  ['至少 2 位、补 0', '一级不要求', 'printf("%02d", n);'],
];

const CompareSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">同一个要求，两种写法</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[36rem] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-[8rem_1fr_1fr] bg-slate-800 text-sm font-bold text-white">
            <div className="p-3">要求</div>
            <div className="p-3">cout</div>
            <div className="p-3">printf</div>
          </div>
          {compareRows.map(([need, coutWay, printfWay]) => (
            <div key={need} className="grid grid-cols-[8rem_1fr_1fr] border-t border-slate-200 text-sm text-slate-700">
              <div className="p-3 font-bold text-slate-900">{need}</div>
              <div className="p-3 font-mono text-xs">{coutWay}</div>
              <div className="p-3 font-mono text-xs">{printfWay}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        % 只在 printf、scanf 的格式串里有特殊含义。<code>cout &lt;&lt; "5%2="</code> 会原样输出 <code>5%2=</code>；在 printf 里要写成 <code>"5%%2="</code>。
      </p>
    </div>

    <PredictCheck
      className="w-full"
      prompt={'printf("%.1f\\n", 2.0 / 3); 输出什么？'}
      options={['0.7', '0.6', '0.66', '0']}
      correctIndex={0}
      explanation="2.0 / 3 是小数除法，约 0.6667；%.1f 保留 1 位小数，第 2 位是 6，四舍五入得 0.7。"
      misconception="把保留小数当成直接截断，写出 0.6；或忘了 2.0 是 double，以为是整数除法 0。"
    />
  </div>
);

// --- 9. 常见错误与真题 ---
const mistakeCards = [
  { title: '漏写 &', code: 'scanf("%d", a);', detail: 'scanf 拿不到变量的位置，读入失败甚至程序出错。应写 &a。' },
  { title: '把 %% 写成 %', code: 'printf("50%");', detail: '格式串里单独一个 % 不能可靠地输出 % 号，要写 %%。' },
  { title: '以为 printf 会计算格式串', code: 'printf("%d*2", N);', detail: '只有 %d 被换成 N 的值，*2 原样输出：N 为 5 时输出 5*2。' },
  { title: '输出提示语', code: 'printf("请输入：");', detail: '判题逐字比较输出，多出的提示语会让答案判错。考试程序只输出题目要求的内容。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 格式化输入输出常见错误
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mistakeCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
            <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><X size={16} /> {card.title}</div>
            <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-base">{card.code}</code>
            <div className="text-xs font-medium leading-relaxed text-red-700">{card.detail}</div>
          </div>
        ))}
      </div>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 4 题"
      question={'C++ 的整型 N 被赋值为 5，语句 printf("%d*2",N) 执行后将输出 10。（ ）'}
      options={judgeOptions(false)}
      explanation={'%d 换成 N 的值 5，*2 是普通字符，原样输出，结果是 5*2，不是 10。要输出 10 应写 printf("%d", N * 2)。'}
    />
    <QuizCard
      source="2024 年 3 月 GESP C++ 一级判断题第 2 题"
      question={'C++ 语句 printf("%d#%d&",2,3) 执行后输出的是 2#3&。（ ）'}
      options={judgeOptions(true)}
      explanation="两个 %d 按顺序换成 2 和 3，# 和 & 是普通字符原样输出，结果正是 2#3&。"
    />
    <QuizCard
      source="2024 年 9 月 GESP C++ 一级判断题第 3 题"
      question={'N 是 C++ 程序中的整型变量，则语句 scanf("%d", &N) 能接收正整数、负整数和 0 输入，但如果输入含字母或带小数点的数，将导致程序无法执行。'}
      options={judgeOptions(false)}
      explanation="%d 能读正整数、负整数和 0。遇到字母或小数点时，scanf 只是读到那里为止（或这次读入失败），程序照样继续执行，不会“无法执行”。例如输入 3.5 时 N 读到 3。"
    />

    <div className="grid w-full gap-6 md:grid-cols-2">
      <QuizCard
        badge="课堂练习"
        source="站内题库 · 来源待核（2025 年 3 月一级第 10 题）"
        question={'下面C++代码执行后的输出是( )。\nint N = 10;\nprintf("{N}*{N}={%d*%d}", N, N, N * N);'}
        mono
        options={[
          { id: 'A', text: '10*10={10*10}' },
          { id: 'B', text: '100=10' },
          { id: 'C', text: 'N*N=100' },
          { id: 'D', text: '{N}*{N}={10*10}', isCorrect: true },
        ]}
        explanation="{N} 是普通字符，原样输出；格式串里只有两个 %d，依次换成前两个参数 10 和 10；多出来的第三个参数 N * N 没有占位符，不会输出。"
      />
      <QuizCard
        badge="课堂练习"
        source="站内题库 · 来源待核（2025 年 6 月一级第 9 题）"
        question={'下面 C++ 代码执行后的输出是（　）。\nint a, b;\na = 3;\nb = 4;\nprintf("a+b=%02d#a+b={a+b}", a + b, a + b);'}
        mono
        options={[
          { id: 'A', text: 'a+b=07#a+b={a+b}', isCorrect: true },
          { id: 'B', text: 'a+b= 7#a+b=7' },
          { id: 'C', text: 'a+b=7#a+b={a+b}' },
          { id: 'D', text: 'a+b=7#a+b=7' },
        ]}
        explanation="%02d 把 7 补成 07；{a+b} 是普通字符原样输出，printf 不会替换花括号里的内容；第二个参数没有占位符，不输出。"
      />
    </div>
  </div>
);

// --- 10. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 6-A',
    title: '时间格式',
    statement: '输入一行两个整数 h、m（0 ≤ h ≤ 23，0 ≤ m ≤ 59），按 HH:MM 格式输出，不足两位补 0。要求用 scanf 和 printf。',
    samples: [['9 5', '09:05'], ['23 59', '23:59']],
    hint: '两个数都用 %02d；冒号是格式串里的普通字符。自己再补测 0 0，应输出 00:00。',
    code: `#include <cstdio>

int main() {
    int h, m;
    scanf("%d%d", &h, &m);
    printf("%02d:%02d\\n", h, m);
    return 0;
}`,
  },
  {
    tag: '提高题 6-B',
    title: '正确率',
    statement: '输入一行两个整数 a、b（1 ≤ b ≤ 100，0 ≤ a ≤ b），分别是答对题数和总题数。输出正确率，保留一位小数，后面紧跟 %。',
    samples: [['3 4', '75.0%'], ['1 3', '33.3%']],
    hint: '先乘 100.0 再除，让计算变成小数除法：a * 100.0 / b；保留一位用 %.1f，输出 % 号用 %%。',
    code: `#include <cstdio>

int main() {
    int a, b;
    scanf("%d%d", &a, &b);
    printf("%.1f%%\\n", a * 100.0 / b);
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
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Zap size={18} /> 参考程序</h3>
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
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><Lightbulb size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            'printf 需要 <cstdio>：格式串里普通字符原样输出，占位符按顺序换成参数的值，不会自动换行。',
            '%d 整数、%f 小数、%.2f 保留两位小数、%c 字符、%% 输出一个 %。',
            '%3d 右对齐补空格，%03d 补 0，%-3d 左对齐；宽度是最少宽度，不截断。',
            'scanf("%d%d", &a, &b)：每个变量前写 &；读 double 用 %lf；scanf 不输出提示。',
            '读整数时遇到不能组成整数的字符就停：输入 14+7 只读到 14，cin 也一样。',
            'cout 的 fixed << setprecision(2) 对应 printf 的 %.2f；考试程序不要输出提示语。',
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
          <Zap size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">预测任务</strong>
              <p className="text-sm text-yellow-900">先写出 printf("[%4d][%-4d][%04d]", 25, 25, 25); 的输出，再上机核对空格和 0 的位置。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">上机任务</strong>
              <p className="text-sm text-yellow-900">完成“正确率”，补测 0 5（应输出 0.0%）和 2 3（应输出 66.7%）；再把 100.0 改成 100，观察结果怎样变化。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        顺序程序（输入—计算—输出）到这里就完整了。下一课：关系与逻辑运算，开始让程序根据输入作判断。
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
        return <PrintfBasicSlide />;
      case 3:
        return <WidthSlide />;
      case 4:
        return <ExamPercentSlide />;
      case 5:
        return <ExamFloatSlide />;
      case 6:
        return <ScanfSlide />;
      case 7:
        return <InputStopSlide />;
      case 8:
        return <CompareSlide />;
      case 9:
        return <MistakesSlide />;
      case 10:
        return <PracticeSlide />;
      case 11:
        return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：用一条 printf 语句输出 07/09（7 月 9 日，月和日都占两位，不足补 0）。怎么写？"
                hint="两个数都用 %02d；斜杠是普通字符。"
                answer={'printf("%02d/%02d\\n", 7, 9);'}
                steps={[
                    '%02d 把 7 补成 07，把 9 补成 09。',
                    '斜杠 / 写在两个占位符之间，原样输出。',
                    '结尾的 \\n 换行；输出 07/09。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-6 格式化输入输出离开前检查"
              description="如果能说出常用占位符的作用、预测宽度与补零的输出、用 scanf 正确读入，并知道输入 14+7 时读到什么，就可以进入第 7 课：关系与逻辑运算。"
              items={lesson6MasteryItems}
            />
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 cout 输出、cin 读入变量', '会用 fixed 和 setprecision 保留小数', '能区分 int 和 double 的运算结果']}
      lessonNumber={6}
      lessonTitle="格式化输入输出"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/7"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={6} />}
      bottomSupport={<CppL1LessonSupport lessonId={6} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
