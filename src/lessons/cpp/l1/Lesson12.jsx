import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FastForward,
  HelpCircle,
  Layers,
  Repeat,
  Search,
  StopCircle,
  AlertTriangle,
  Terminal,
  XCircle
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { BreakContinueLab, FirstMultipleLab, MixedJumpTracer, WhileOneTracer } from './Lesson12Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "repeat": <Repeat size={size} className={className} />,
    "skip": <FastForward size={size} className={className} />,
    "search": <Search size={size} className={className} />,
    "stop": <StopCircle size={size} className={className} />,
    "layers": <Layers size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson12MasteryItems = [
  {
    label: '能区分 break 和 continue。',
    evidence: 'break 立即结束整个循环，接着执行循环后面的语句；continue 只跳过本轮剩下的语句，循环还会继续。例 1 的两段循环分别输出 1245 和 12。',
    retryHint: '回到“break 与 continue 的规则”，在对照实验里把 k 设成 3，分别选 continue 和 break 各走一遍。',
  },
  {
    label: '能手推 continue 后下一步去哪。',
    evidence: 'for 里 continue 之后先执行更新 i++，再判断条件；while 里 continue 直接回到条件判断，所以更新语句要写在 continue 前面，否则死循环。例 3 输出 12。',
    retryHint: '回到“continue 在 for 与 while 里”，对照例 3 和下面那段死循环，指出 i++ 的位置。',
  },
  {
    label: '能说出 break 后循环变量停在哪个值。',
    evidence: 'break 时不再执行更新，循环变量停在触发 break 的那个值：for (i = 1; i < 5; i++) { if (i % 3 == 0) break; … } 结束后 i 是 3；只有 continue 的循环照常结束，i 是第一个让条件变假的值。',
    retryHint: '回到“找到就停”，在实验里改几组 n、k，看 break 时 d 停在哪里。',
  },
  {
    label: '能手推含 break/continue 的输出。',
    evidence: '能逐轮写出 i、两个条件的真假和累加器：混合追踪器输出 9 7；站内练习 2025 年 6 月第 13 题输出 4。',
    retryHint: '回到“continue 与 break 混合追踪”，把每一轮的 i、i % 2 == 0、i > 6 和 s 写成表格。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：找到就停", icon: "help", category: "break 与 continue" },
  { id: 2, title: "break 与 continue 的规则", icon: "repeat", category: "break 与 continue" },
  { id: 3, title: "continue 在 for 与 while 里", icon: "skip", category: "break 与 continue" },
  { id: 4, title: "找到就停：第一个满足条件的数", icon: "search", category: "常见写法" },
  { id: 5, title: "while (1) 与 break", icon: "stop", category: "常见写法" },
  { id: 6, title: "continue 与 break 混合追踪", icon: "layers", category: "常见写法" },
  { id: 7, title: "真题：break 与 continue", icon: "check", category: "真题" },
  { id: 8, title: "常见错误与真题", icon: "x", category: "真题" },
  { id: 9, title: "上机：跳过三的倍数 / 第一个倍数", icon: "terminal", category: "真题" },
  { id: 10, title: "阶段诊断 C", icon: "check", category: "诊断" },
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
              <ArrowRight size={16} className="mt-0.5 shrink-0 text-blue-600" />
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
      <h2 className="text-3xl font-bold text-gray-800">找到就停</h2>
      <p className="text-lg text-gray-600">在 1～100 中找第一个既是 4 的倍数、又是 6 的倍数的数。答案是 12，可是只用前两课的循环，程序找到 12 之后还会接着往下找。</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">没有 break：找到了还在找</p>
        <CodePanel>{`int ans = 0;
for (int d = 1; d <= 100; d++) {
    if (d % 4 == 0 && d % 6 == 0)
        ans = d;
}
cout << ans;`}</CodePanel>
        <p className="mt-3 text-sm text-slate-700">12、24、36……每找到一个都覆盖 ans，循环要跑满 100 轮。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">加上 break：第一个出现就离开</p>
        <CodePanel>{`int ans = 0;
for (int d = 1; d <= 100; d++) {
    if (d % 4 == 0 && d % 6 == 0) {
        ans = d;
        break;
    }
}
cout << ans;`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">d = 12 时条件成立，ans = 12，break 立即结束循环，输出 12。循环只跑了 12 轮。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="左边没有 break 的程序，最后输出几？"
      options={['12', '96', '100']}
      correctIndex={1}
      explanation="每遇到一个 12 的倍数就把 ans 改掉：12、24、…、96。100 以内最后一个是 96，所以输出 96。要“第一个”，找到时就得 break。"
      misconception="以为 if 成立一次，循环就会自己停下来。if 只决定这一轮做不做 ans = d，不会结束循环。"
    />

    <div className="grid w-full gap-4 md:grid-cols-3">
      {[
        ['break', '整个循环到此为止，接着执行循环后面的语句。'],
        ['continue', '这一轮剩下的语句不做了，循环还会继续下一轮。'],
        ['两者共同点', '几乎总写在 if 里：满足某个条件才跳转。'],
      ].map(([title, detail]) => (
        <div key={title} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-2 font-mono font-bold text-blue-900">{title}</p>
          <p className="text-sm text-blue-950">{detail}</p>
        </div>
      ))}
    </div>

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 10、11 课的循环只能等条件变假才结束。本课学两条跳转语句：<strong>break 与 continue 的规则 → continue 在 for、while 里各去哪 → 找到就停 → while (1) 与 break → 混合追踪</strong>，最后完成“跳过三的倍数”和“第一个倍数”两道上机题，并做第 9～12 课的阶段诊断 C。
    </div>
  </div>
);

// --- 2. break 与 continue 的规则 ---
const RulesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">两条跳转语句</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          'break：立即结束它所在的那一层循环（或 switch），接着执行循环后面的语句。',
          'continue：跳过本轮循环体里剩下的语句，进入下一轮；循环本身没有结束。',
          '两者通常和 if 一起用：if (条件) break; 或 if (条件) continue;。',
          'break 之后不再执行更新，循环变量停在触发 break 时的值。',
        ].map((rule, index) => (
          <li key={rule} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">第 9 课 switch 里的 break 是同一条语句：执行到它就离开 switch。一级只考单层循环；循环里再套循环时 break 只离开最近的一层，这一点在二级 L2-5 嵌套循环里再验证。</p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1：同一个循环，一个 continue，一个 break</p>
        <CodePanel>{`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    cout << i;
}
cout << endl;
for (int i = 1; i <= 5; i++) {
    if (i == 3) break;
    cout << i;
}
cout << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`1245
12`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">第一段：i = 3 那一轮跳过 cout，4、5 照常输出。第二段：i = 3 时整个循环结束，4、5 根本没有机会判断。</p>
      </div>
    </div>

    <BreakContinueLab />

    <PredictCheck
      className="w-full"
      prompt="for (int i = 1; i <= 5; i++) { if (i == 4) break; cout << i; } 输出什么？"
      options={['123', '1235', '12345']}
      correctIndex={0}
      explanation="i = 1、2、3 时条件为假，各输出一次；i = 4 时执行 break，循环结束，5 不再处理。输出 123。"
      misconception="把 break 当成 continue，以为只跳过 4、还会输出 5。"
    />
  </div>
);

// --- 3. continue 在 for 与 while 里 ---
const ContinueSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-lg font-bold text-gray-800">for 里的 continue</h3>
        <p className="text-sm text-slate-700">跳过本轮剩下的语句后，<strong>先执行更新</strong>（如 i++），再回到条件判断。更新写在 for 的括号里，continue 跳不过它。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-lg font-bold text-gray-800">while 里的 continue</h3>
        <p className="text-sm text-slate-700">跳过本轮剩下的语句后，<strong>直接回到条件判断</strong>。更新写在循环体里，如果它在 continue 后面，就会被一起跳过。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：while 里先更新，再 continue</p>
        <CodePanel>{`int i = 0, s = 0;
while (i < 5) {
    i++;
    if (i == 3) continue;
    s += i;
}
cout << s << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'12'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">i 依次变成 1、2、3、4、5。i = 3 时 continue 跳过 s += i，回到判断 3 &lt; 5；所以 s = 1 + 2 + 4 + 5 = 12。i 变成 5 后判断 5 &lt; 5 为假，循环结束。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-red-700">反例：更新写在 continue 后面</p>
        <CodePanel>{`int i = 0;
while (i < 5) {
    if (i == 3) continue;
    i++;
}`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
        <strong className="mb-2 block text-base text-amber-900">i 停在 3，再也加不上去</strong>
        i 加到 3 后，每一轮都先执行 continue 回到判断，i++ 永远轮不到，3 &lt; 5 一直为真，死循环。在 while 里用 continue，先检查：更新语句是不是写在 continue 前面？
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="把例 3 里的 i++ 移到 s += i 后面（也就是 continue 后面），程序会怎样？"
      options={['仍然输出 12', '输出 15', '死循环']}
      correctIndex={2}
      explanation="i = 0、1、2 时都正常累加并加 1；i 变成 3 后，continue 跳过了后面的 s += i 和 i++，i 永远是 3，条件 3 < 5 一直为真，程序停不下来。"
      misconception="以为 continue 在 while 里也会自动执行更新。自动执行更新的只有 for 括号里的第三段。"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 9 月一级第 14 题）"
      question={'下面C++代码执行后输出是（ ）。\nnum = 0;\nwhile (num <= 5){\n    num += 1;\n    if (num == 3)\n        continue;\n    printf("%d#", num);\n}'}
      mono
      options={[
        { id: 'A', text: '1#2#4#5#6#', isCorrect: true },
        { id: 'B', text: '1#2#4#5#6' },
        { id: 'C', text: '1#2#3#4#5#6#' },
        { id: 'D', text: '1#2#3#4#5#6' },
      ]}
      explanation="num += 1 写在 continue 前面，不会死循环。num 依次变成 1～6，只有 num = 3 那一轮跳过 printf；每个数后面都跟着 #。num = 5 时判断 5 <= 5 为真，还会再加到 6 并输出 6#，所以是 1#2#4#5#6#。"
    />
  </div>
);

// --- 4. 找到就停 ---
const FindFirstSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">“第一个满足条件的数”的写法</h3>
      <ul className="space-y-2 text-sm text-slate-700">
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">从小到大逐个检验；条件成立时先记下答案，再 break。</li>
        <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">break 后循环变量停在答案上，不会再加 1。所以也可以在循环外直接用循环变量（要把它声明在循环外）。</li>
        <li className="rounded-lg border border-amber-200 bg-amber-50 p-3">不写 break，后面满足条件的数会把答案覆盖，得到的是“最后一个”。</li>
      </ul>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：m、n 的最小公倍数</p>
        <CodePanel>{`int m = 4, n = 6, ans = 0;
for (int d = 1; d <= m * n; d++) {
    if (d % m == 0 && d % n == 0) {
        ans = d;
        break;
    }
}
cout << ans << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'12'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">m × n 一定同时是 m 和 n 的倍数，所以上限写 m * n 一定能找到。d 从 1 往上试，第一个同时整除的是 12。课后任务《值日》就是这道题的输入版。</p>
      </div>
    </div>

    <FirstMultipleLab />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 9 月一级第 10 题）"
      question={'下面C++代码执行后输出是（ ）。\nint i;\nfor(i = 1; i < 5; i++){\n    if(i % 3 == 0)\n        break;\n    printf("%d#",i);\n}\nif(i > 5) printf("END\\n");'}
      mono
      options={[
        { id: 'A', text: '1#2#', isCorrect: true },
        { id: 'B', text: '1#2#END' },
        { id: 'C', text: '1#2' },
        { id: 'D', text: '1#2#3#4#END' },
      ]}
      explanation="i = 1、2 时输出 1#2#；i = 3 时 3 % 3 == 0，执行 break，i 停在 3，不再加 1。循环后判断 3 > 5 为假，END 不输出。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 14 题）"
      question={'下面 C++ 代码段执行后的输出是（ ）。\nint n = 10;\nwhile (n > 0) {\n    if (n % 3 == 0) break;\n    n -= 2;\n}\ncout << n;'}
      mono
      options={[
        { id: 'A', text: '10' },
        { id: 'B', text: '8' },
        { id: 'C', text: '4' },
        { id: 'D', text: '6', isCorrect: true },
      ]}
      explanation="n = 10：10 % 3 = 1，减 2 得 8；n = 8：8 % 3 = 2，减 2 得 6；n = 6：6 % 3 == 0，break，n 停在 6。这就是“从 10 往下找第一个 3 的倍数（步长 2）”。"
    />
  </div>
);

// --- 5. while (1) 与 break ---
const WhileOneSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">条件永远为真的循环</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">while (1) 的条件是 1，非 0 即真，永远成立；for ( ; ; ) 同理。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">这种循环唯一的出口是循环体里的 break，而且必须保证它最终会执行到。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">适合“先读、再判断要不要停”的过程：读入和判断都写在循环体里，不用在循环前多读一次。</li>
        </ul>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">对照第 11 课“读到 0 为止”</p>
          <CodePanel>{`cin >> x;            // 循环前先读一个
while (x != 0) {
    sum += x;
    cin >> x;        // 处理完再读
}`}</CodePanel>
        </div>
      </div>
    </div>

    <WhileOneTracer />

    <PredictCheck
      className="w-full"
      prompt="把追踪器里的 if (x == 0) break; 删掉，程序还能停下来吗？"
      options={['能，读到 0 就停', '不能，while (1) 没有别的出口', '能，执行 4 轮就停']}
      correctIndex={1}
      explanation="while (1) 的条件永远为真，删掉 break 后循环体里没有任何语句能结束循环。读到 0 也只是把 0 加进 sum，然后继续等下一个输入。"
      misconception="以为读到 0 时循环会“自然”结束。结束循环的只有条件变假或执行 break，while (1) 的条件不会变假。"
    />
  </div>
);

// --- 6. continue 与 break 混合追踪 ---
const MixedSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">一轮里有两个 if 时，按顺序看</strong>
      第一个 if 成立并执行了 continue 或 break，这一轮后面的语句（包括第二个 if）都不会执行。手推时每一轮写一行：i、第一个条件、第二个条件、动作、累加器。
    </div>

    <MixedJumpTracer />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级第 13 题）"
      question={'下面 C++ 代码执行后输出的是（　）。\nint Sum = 0;\nfor (int i = 0; i < 10; i++){\n    if (i % 2 == 0)\n        continue;\n    if (i % 5 == 0)\n        break;\n    Sum += i;\n}\ncout << Sum;'}
      mono
      options={[
        { id: 'A', text: '55' },
        { id: 'B', text: '15' },
        { id: 'C', text: '9' },
        { id: 'D', text: '4', isCorrect: true },
      ]}
      explanation="偶数 0、2、4 被 continue 跳过；奇数 1、3 累加，Sum = 4；i = 5 时第二个 if 成立，break，5 本身没有加进去。输出 4。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 3 月一级第 15 题）"
      question={'下面C++代码执行后输出的是（ ）。\nint tnt = 0;\nfor (int i = 5; i < 100; i += 5){\n    if (i % 2 == 0) continue;\n    tnt += 1;\n    if (i % 3 == 0 && i % 7 == 0) break;\n}\ncout << tnt << endl;'}
      mono
      options={[
        { id: 'A', text: '500' },
        { id: 'B', text: '450' },
        { id: 'C', text: '10', isCorrect: true },
        { id: 'D', text: '1' },
      ]}
      explanation="i 取 5、10、…、95。偶数被 continue 跳过，剩下 5、15、25、…、95 共 10 个奇数，tnt 各加 1。break 要求 i 同时是 3 和 7 的倍数，而 i 又是 5 的倍数，那就得是 105 的倍数，100 以内没有，break 从未执行。输出 10。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 12 月一级第 7 题）"
      question={'下面C++代码执行后的输出是（　）。\ncnt = 0;\nfor(int i = 1; i < 20; i++){\n    if(i%2)\n        continue;\n    else if(i%3==0 && i%5==0)\n        break;\n    cnt += i;\n}\ncout << cnt;'}
      mono
      options={[
        { id: 'A', text: '90', isCorrect: true },
        { id: 'B', text: '44' },
        { id: 'C', text: '20' },
        { id: 'D', text: '10' },
      ]}
      explanation="i % 2 为 1（奇数）时 continue。偶数里同时是 3 和 5 的倍数的最小是 30，不在 1～19 中（15 是奇数，已被跳过），break 没有机会执行。累加 2 + 4 + … + 18 = 90。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 15 题）"
      question={'下面 C++ 代码段执行后的输出是（ ）。\nint s = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) continue;\n    s = s+i;\n}\ncout << s;'}
      mono
      options={[
        { id: 'A', text: '25', isCorrect: true },
        { id: 'B', text: '10' },
        { id: 'C', text: '55' },
        { id: 'D', text: '30' },
      ]}
      explanation="偶数被 continue 跳过，只累加奇数 1 + 3 + 5 + 7 + 9 = 25。"
    />
  </div>
);

// --- 7. 真题 ---
const ExamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：先判断跳转，再数次数</h3>
      <p className="mt-1 text-slate-500">前两题考输出，后三题考规则。</p>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 10 题"
      question={'下面 C++ 代码执行后输出的是（ ）。\nint N = 0;\nfor (int i = 1; i < 10; i += 2) {\n if (i % 2 == 1)\n continue;\n N += 1;\n}\ncout << N;'}
      mono
      options={[
        { id: 'A', text: '5' },
        { id: 'B', text: '4' },
        { id: 'C', text: '2' },
        { id: 'D', text: '0', isCorrect: true },
      ]}
      explanation="i 取 1、3、5、7、9，全是奇数，每一轮 i % 2 == 1 都为真，continue 跳过 N += 1。N 一次也没加，输出 0。"
    />
    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 11 题"
      question={'下面C++代码执行后输出是 ( )。\nint i;\nfor (i = 10; i < 100; i += 10) {\n if (i % 10 == 0)\n continue;\n printf("%d#", i);\n}\nif (i >= 100)\n printf("%d END", i);'}
      mono
      options={[
        { id: 'A', text: '10#20#30#40#50#60#70#80#90#100 END' },
        { id: 'B', text: '100#100 END' },
        { id: 'C', text: '100 END', isCorrect: true },
        { id: 'D', text: '110 END' },
      ]}
      explanation="i 取 10、20、…、90，都是 10 的倍数，每一轮都 continue，printf 一次也没执行。continue 不影响更新，循环正常结束时 i = 100；100 >= 100 为真，输出 100 END。"
    />
    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 5 题"
      question="在 C++ 中，break 语句用于终止当前层次的循环，循环可以是 for 循环，也可以是 while 循环。（ ）"
      options={judgeOptions(true)}
      explanation="break 可以用在 for、while、do-while 循环里，终止它所在的那一层循环。说法正确。"
    />
    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 6 题"
      question="在 C++，continue 语句通常与 if 语句配合使用。（ ）"
      options={judgeOptions(true)}
      explanation="无条件的 continue 会让它后面的语句永远执行不到，没有意义；实际都是“满足某个条件才跳过本轮”，所以和 if 配合使用。说法正确。"
    />
    <QuizCard
      source="2024 年 3 月 GESP C++ 一级判断题第 6 题"
      question="在 C++，break 语句用于提前终止当前层次循环，适用于 while 循环，但不适用于 for 循环。（ ）"
      options={judgeOptions(false)}
      explanation="break 对 for、while、do-while 都适用，还可以用在 switch 里。说它不适用于 for 循环是错的；例 1 第二段就是 for 里的 break。"
    />
  </div>
);

// --- 8. 常见错误与真题 ---
const mistakeCards = [
  { title: '以为 continue 会结束循环', code: 'if (i == 3) continue;', detail: 'continue 只跳过这一轮剩下的语句，下一轮照常进行。要结束整个循环用 break。' },
  { title: '以为 break 不能用在 for 里', code: 'for (…) { if (…) break; }', detail: 'for、while、do-while 和 switch 里都能用 break。' },
  { title: 'while 里 continue 写在更新前', code: 'if (i == 3) continue; i++;', detail: 'i++ 被跳过，i 停住不动，死循环。更新语句放在 continue 前面。' },
  { title: '只有 continue 的循环，以为 i 停在 0', code: 'for (i = 0; i < 10; i++) if (…) continue;', detail: 'continue 不影响更新，循环照常结束，i 是第一个让条件变假的值 10。' },
  { title: '找到后忘了 break', code: 'if (d % k == 0) ans = d;', detail: '后面满足条件的数会把 ans 覆盖，得到的是最后一个，不是第一个。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> break 与 continue 常见错误
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
      source="站内题库 · 来源待核（2025 年 3 月一级判断题第 9 题）"
      question="C++语言中continue语句可以来提前结束循环。"
      options={judgeOptions(false)}
      explanation="continue 只结束本轮循环剩下的部分，然后进入下一轮（for 先更新再判断，while 直接判断），并不终止整个循环。提前结束循环的是 break。说法错误。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 3 月一级第 14 题）"
      question={'下面C++代码执行后输出的是（ ）。\nint i;\nfor (i = 1; i < 100; i += 5)\n continue;\ncout << i << endl;'}
      mono
      options={[
        { id: 'A', text: '101', isCorrect: true },
        { id: 'B', text: '100' },
        { id: 'C', text: '99' },
        { id: 'D', text: '96' },
      ]}
      explanation="循环体只有一条 continue，相当于每轮什么也不做，但更新 i += 5 照常执行。i 取 1、6、…、96，96 + 5 = 101，101 < 100 为假，循环结束，输出 101。"
    />
  </div>
);

// --- 9. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 12-A',
    title: '跳过三的倍数',
    statement: '输入整数 n（1 ≤ n ≤ 1000），求 1～n 中所有不是 3 的倍数的整数之和。要求用 continue 跳过 3 的倍数。',
    samples: [['6', '12'], ['1', '1']],
    hint: '遇到 i % 3 == 0 时 continue，累加语句写在 continue 后面。6 以内要加的是 1、2、4、5。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, sum = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 3 == 0) continue;
        sum += i;
    }
    cout << sum << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 12-B',
    title: '第一个倍数',
    statement: '输入一行两个正整数 n、k（1 ≤ n ≤ 10⁶，1 ≤ k ≤ 1000）。输出大于等于 n 的最小的 k 的倍数。要求从 n 开始逐个检验，找到就用 break 结束循环。',
    samples: [['10 4', '12'], ['8 4', '8']],
    hint: '循环变量从 n 开始，不是从 1 开始；n 本身就是 k 的倍数时答案是 n。补测 1 1（输出 1）。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, k, ans = 0;
    cin >> n >> k;
    for (int d = n; ; d++) {
        if (d % k == 0) {
            ans = d;
            break;
        }
    }
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
    <p className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">12-B 的 for 省略了条件段，循环头本身永远不会让循环结束；能停下来全靠找到答案时的 break。k ≤ 1000，所以最多检验 k 个数就一定能找到。</p>
  </div>
);

// --- 10. 阶段诊断 C ---
const diagnosisItems = [
  {
    badge: '诊断第 1 题',
    source: '站内题库 · 来源待核（2023 年 9 月一级第 9 题）',
    question: '下面 C++ 代码执行后的输出是（ ）。\nint n = 7;\nif (n / 5 != 0) cout << 0;\nelse if (n / 3 != 0) cout << 1;\nelse if (n % 2 != 0) cout << 2;\nelse cout << 3;',
    mono: true,
    options: [
      { id: 'A', text: '0', isCorrect: true },
      { id: 'B', text: '1' },
      { id: 'C', text: '2' },
      { id: 'D', text: '3' },
    ],
    explanation: '7 / 5 = 1，1 != 0 为真，第一支成立，输出 0。后面三个条件虽然也成立，但 else if 链只执行第一个成立的分支。',
    retry: '第 9 课「if / else if / else」：从上往下，第一个成立的分支执行后，后面的 else if 都不再判断。',
  },
  {
    badge: '诊断第 2 题',
    source: '2024 年 6 月 GESP C++ 一级第 13 题',
    question: '执行下面 C++ 代码后输出的 cnt 的值是（ ）。\nint cnt=0;\nfor(int i = 0; i*i < 64; i+=2)\n    cnt++;\ncout << cnt;',
    mono: true,
    options: [
      { id: 'A', text: '8' },
      { id: 'B', text: '7' },
      { id: 'C', text: '4', isCorrect: true },
      { id: 'D', text: '1' },
    ],
    explanation: 'i 取 0、2、4、6，平方依次是 0、4、16、36，都小于 64；i = 8 时 64 < 64 为假，循环结束。共 4 次。',
    retry: '第 10 课「执行次数与结束值」：步长不是 1、条件不是简单比较时，先列出 i 的取值再数。',
  },
  {
    badge: '诊断第 3 题',
    source: '2024 年 3 月 GESP C++ 一级判断题第 5 题',
    question: '在 C++ 中，while 可能是死循环，而 for 循环不可能是死循环。（ ）',
    options: judgeOptions(false),
    explanation: 'for ( ; ; ) 省略了条件，就是一个死循环；条件永远为真，或循环体把循环变量改回去，for 一样停不下来。说法错误。',
    retry: '第 10 课「空循环体与循环内改 i」：for 也可能是死循环。',
  },
  {
    badge: '诊断第 4 题',
    source: '2024 年 6 月 GESP C++ 一级第 11 题',
    question: '下面的 C++ 代码用于求 1~N 之间所有奇数之和，其中 N 为正整数，如果 N 为奇数，则求和时包括 N。有关描述错误的是（ ）。\nint N;\ncout << "请输入正整数：";\ncin >> N;\nint i = 1, Sum = 0;\nwhile (i <= N){\n    if (i % 2 == 1)\n        Sum += i;\n    i += 1;\n}\ncout << i << " " << Sum;',
    mono: true,
    options: [
      { id: 'A', text: '执行代码时如果输入 10，则最后一行输出将是 11 25' },
      { id: 'B', text: '执行代码时如果输入 5，则最后一行输出将是 6 9' },
      { id: 'C', text: '将 i += 1 移到 if (i % 2 == 1) 前一行，同样能实现题目要求', isCorrect: true },
      { id: 'D', text: '删除 if (i % 2 == 1)，并将 i += 1 改为 i += 2，同样可以实现题目要求' },
    ],
    explanation: '原代码输入 10 输出 11 25，输入 5 输出 6 9，A、B 正确。把 i += 1 提到判断前面，第一轮就先变成 2，奇数 1 被跳过，最后还会多处理一个 N + 1：输入 10 时 Sum 变成 3 + 5 + 7 + 9 + 11 = 35，C 错误。D 让 i 只取 1、3、5……，正确。',
    retry: '第 11 课「常见错误与真题」：更新语句放到处理之前，第一个值被跳过，最后还多处理一个越界的值。',
  },
  {
    badge: '诊断第 5 题',
    source: '2025 年 12 月 GESP C++ 一级判断题第 3 题',
    question: '下面C++代码执行后输出 0。\nint i;\nfor (i = 0; i < 10; i++)\n if (i % 3 == 0)\n continue;\ncout << i;',
    options: judgeOptions(false),
    explanation: '循环体里只有 continue，不影响更新 i++，循环照常结束；i 是第一个让 i < 10 变假的值 10，输出 10，不是 0。说法错误。（本卷判断题的站内答案待核，这里按运行结果判断，已用 g++ 运行核对。）',
    retry: '第 12 课「常见错误与真题」：只有 continue 的循环照常结束，i 停在第一个让条件变假的值。',
  },
];

const DiagnosisSlide = () => {
  const [results, setResults] = useState({});
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold text-slate-800">阶段诊断 C：第 9～12 课</h3>
        <p className="mt-2 text-slate-600">5 道题，覆盖 else if 链、for 执行次数、死循环、while 更新位置和 continue 后的循环变量。答错的题会告诉你回到哪一课哪一节。</p>
        <p role="status" className="mt-4 inline-block rounded-full bg-slate-100 px-4 py-1 text-sm font-bold text-slate-700">已作答 {answered} / {diagnosisItems.length}，答对 {correct}</p>
      </div>
      {diagnosisItems.map((item, index) => (
        <QuizCard
          key={item.badge}
          badge={item.badge}
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

// --- 11. 小结与课后任务 ---
const homeworkTasks = [
  {
    title: '《值日》',
    source: '站内题库 2025 年 6 月一级编程题第 2 题 · 来源待核',
    detail: '小杨每 m 天值日一次，小红每 n 天值日一次，今天两人一起值日，至少多少天后再次同一天值日？输入两行 m、n。样例：4、6 → 12。就是例 2 的输入版：d 从 m 开始每次加 m，第一个能被 n 整除的 d 就是答案。',
  },
  {
    title: '改写练习',
    source: '课堂练习',
    detail: '把例 3 改写成 for 循环（for (int i = 1; i <= 5; i++) { if (i == 3) continue; s += i; }），运行核对仍输出 12；再说明为什么 for 版不用担心 continue 跳过更新。',
  },
  {
    title: '换一条跳转语句',
    source: '课堂练习',
    detail: '把站内练习 2025 年 9 月第 14 题里的 continue 换成 break，先预测输出（1#2#），再在本机运行核对。',
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
            'break 立即结束整个循环，接着执行循环后面的语句；continue 只跳过本轮剩下的语句。',
            'for 里 continue 之后先执行更新再判断；while 里 continue 直接回到判断，更新要写在 continue 前面。',
            'break 时不再执行更新，循环变量停在触发值；只有 continue 的循环照常结束，变量是第一个让条件变假的值。',
            '求“第一个满足条件的数”：从小到大逐个检验，找到就记下答案并 break；不写 break 得到的是最后一个。',
            'while (1) 和 for ( ; ; ) 的唯一出口是 break，要保证它最终会执行到。',
            '一轮里有多个 if 时按顺序看：前面的 if 已经跳转，后面的语句本轮不再执行。',
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
        下一课：数位分离。循环工具到此齐了，下一课用 while、% 10 和 / 10 逐位处理一个位数未知的整数——这是一级真题里最常见的循环应用。
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
      case 2: return <RulesSlide />;
      case 3: return <ContinueSlide />;
      case 4: return <FindFirstSlide />;
      case 5: return <WhileOneSlide />;
      case 6: return <MixedSlide />;
      case 7: return <ExamSlide />;
      case 8: return <MistakesSlide />;
      case 9: return <PracticeSlide />;
      case 10: return <DiagnosisSlide />;
      case 11: return <SummarySlide />;
      case 12:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：输入一个正整数 n（n ≥ 2），输出 n 的大于 1 的最小因数。写出核心代码，并手推 n = 15 时的输出。"
                hint="从 2 开始逐个试，第一个能整除 n 的数就是答案——找到就停。"
                answer="int d; for (d = 2; d <= n; d++) if (n % d == 0) break; cout << d;  n = 15 时 15 % 2 = 1，15 % 3 = 0，break，输出 3。"
                steps={[
                    'd 声明在循环外，break 之后还能在循环外输出它。',
                    '条件写 d <= n：n 本身一定能整除自己，所以一定会 break。',
                    'n = 15：d = 2 不行，d = 3 时 15 % 3 == 0，break，d 停在 3，输出 3。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-12 break 与 continue 离开前检查"
              description="如果能区分 break 和 continue、说清 continue 之后 for 和 while 各去哪、说出 break 后循环变量停在哪个值，并手推含跳转的输出，就可以进入第 13 课：数位分离。"
              items={lesson12MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['能手推 for 循环的执行次数和结束值（第 10 课）', '会写 while 并让条件最终变假（第 11 课）', '见过 switch 里的 break（第 9 课）']}
      lessonNumber={12}
      lessonTitle="break 与 continue"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/13"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={12} />}
      bottomSupport={<CppL1LessonSupport lessonId={12} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
