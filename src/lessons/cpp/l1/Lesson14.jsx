import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Filter,
  HelpCircle,
  Inbox,
  Layers,
  TrendingUp,
  AlertTriangle,
  Terminal,
  XCircle
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import { ReadStatsLab } from './Lesson14Activities';

// --- 图标组件 ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    "help": <HelpCircle size={size} className={className} />,
    "inbox": <Inbox size={size} className={className} />,
    "calc": <Calculator size={size} className={className} />,
    "trend": <TrendingUp size={size} className={className} />,
    "filter": <Filter size={size} className={className} />,
    "layers": <Layers size={size} className={className} />,
    "check": <CheckCircle2 size={size} className={className} />,
    "alert": <AlertTriangle size={size} className={className} />,
    "x": <XCircle size={size} className={className} />,
    "terminal": <Terminal size={size} className={className} />,
    "book": <BookOpen size={size} className={className} />
  };
  return icons[name] || null;
};

const lesson14MasteryItems = [
  {
    label: '能写出先读 n 再循环读 n 个数的模板。',
    evidence: 'cin >> n; for (i = 1; i <= n; i++) { cin >> x; 处理 x; }，每读一个数当场处理，不需要数组；例 1 输入 5 / 90 45 60 59 100 输出 3。',
    retryHint: '回到“先读 n，再读 n 个数”，在读入统计实验里换几组数，看 cnt 每一行怎样变化。',
  },
  {
    label: '能选对计数器、累加器的初值和位置。',
    evidence: 'cnt = 0、sum = 0 写在循环前；写进循环体里会每轮被清 0。奇数、偶数各用一个计数器，输出顺序按题目要求写（《奇数和偶数》输出 3 2）。',
    retryHint: '回到“计数与筛选条件”，对照预测题里把 cnt = 0 移进循环后的输出。',
  },
  {
    label: '能用第一个数作最值初值。',
    evidence: '先读第一个数，mx = mn = x，再循环读剩下的 n − 1 个；初值写 0 时，全是负数的数据会得到错误的最大值。例 2 输出 100 45，输入 -5 -3 -8 输出 -3 -8。',
    retryHint: '回到“最值：第一个数作初值”，在实验里输入 -5 -3 -8 看提示。',
  },
  {
    label: '能处理多组数据并在每组重新初始化。',
    evidence: '先读组数 T，每组在循环内读、算、输出；每组用到的累加器在这一组开始时清 0。《手机电量显示》输入 5 / 10 1 20 99 19 输出 R R L 99 L（逐行）。',
    retryHint: '回到“多组数据”，对照正确写法和错误写法各自输出的 2、2 与 2、4。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：读进来一批数", icon: "help", category: "循环读入" },
  { id: 2, title: "先读 n，再读 n 个数", icon: "inbox", category: "循环读入" },
  { id: 3, title: "计数与筛选条件", icon: "calc", category: "循环读入" },
  { id: 4, title: "最值：第一个数作初值", icon: "trend", category: "循环读入" },
  { id: 5, title: "筛选输出与输出格式", icon: "filter", category: "常见写法" },
  { id: 6, title: "多组数据", icon: "layers", category: "常见写法" },
  { id: 7, title: "真题编程：美丽数字 / 奇数和偶数", icon: "check", category: "真题" },
  { id: 8, title: "常见错误", icon: "x", category: "真题" },
  { id: 9, title: "上机：及格人数 / 最高分与最低分", icon: "terminal", category: "真题" },
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
      <h2 className="text-3xl font-bold text-gray-800">读进来一批数</h2>
      <p className="text-lg text-gray-600">一级编程题最常见的输入是：第一行一个 n，下面给出 n 个数，要求统计其中满足条件的有几个、总和是多少、最大最小是多少。n 由输入决定，不能为每个数写一个变量。</p>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-slate-600">输入格式</p>
        <OutputPanel>{`5
90 45 60 59 100`}</OutputPanel>
        <p className="mt-3 text-sm text-slate-700">第一行 n = 5 是“后面还有几个数”；第二行才是 5 个分数。要求：输出及格（≥ 60）的人数。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">做法：读一个，处理一个</p>
        <CodePanel>{`cin >> n;
for (int i = 1; i <= n; i++) {
    cin >> x;      // 读第 i 个数
    // …当场处理 x…
}`}</CodePanel>
        <p className="mt-3 text-sm text-green-900">只用一个变量 x 反复接收输入。每个数读进来就处理掉，统计结果放在循环外的计数器、累加器里，不需要数组。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="输入 5 / 90 45 60 59 100 时，循环体里的 cin >> x 一共执行几次？"
      options={['1 次', '5 次', '6 次']}
      correctIndex={1}
      explanation="n 在循环前已经读掉了；循环执行 5 次，每次读一个分数。读入的次数要和 n 一致，多读一次会把后面的数据吃掉。"
      misconception="把第一行的 n 也算进循环读入的次数里。"
    />

    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 13 课逐位处理一个数，本课逐个处理读进来的一批数：<strong>读入模板 → 计数与筛选 → 最值初值 → 筛选输出与格式 → 多组数据</strong>，再做三道站内真题编程，最后完成“及格人数”和“最高分与最低分”两道上机题。
    </div>
  </div>
);

// --- 2. 先读 n，再读 n 个数 ---
const TemplateSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">读入模板的三个位置</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          '循环前：读 n；计数器 cnt = 0、累加器 sum = 0 也在这里写好。',
          '循环里：读一个数 x，判断、计数、累加都在这一轮完成。',
          '循环后：输出统计结果。每个数都处理完，结果才是完整的。',
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
        <p className="mb-2 text-sm font-bold text-slate-600">例 1：及格人数</p>
        <CodePanel>{`int n, cnt = 0;
cin >> n;
for (int i = 1; i <= n; i++) {
    int x;
    cin >> x;
    if (x >= 60) cnt++;
}
cout << cnt << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输入 5 / 90 45 60 59 100</p>
        <OutputPanel>{`90  ≥ 60，cnt = 1
45  不及格
60  ≥ 60，cnt = 2
59  不及格
100 ≥ 60，cnt = 3
输出 3`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">60 也算及格，所以条件是 x &gt;= 60 而不是 x &gt; 60。59 和 60 正好是边界，补测时两边都要试。</p>
      </div>
    </div>

    <ReadStatsLab />

    <PredictCheck
      className="w-full"
      prompt="把 cnt = 0; 这句赋值移到循环体第一行（cnt 仍在循环外定义），例 1 输出几？"
      options={['3', '1', '0']}
      correctIndex={1}
      explanation="每读一个数之前 cnt 都被清 0，前面数过的全部作废。最后一轮读到 100，100 >= 60，cnt 从 0 变成 1，输出 1。初始化只能做一次，必须放在循环前。"
      misconception="以为把初始化写进循环更“保险”。写进循环，计数器就只记得最后一个数。"
    />
  </div>
);

// --- 3. 计数与筛选条件 ---
const CountSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">两个计数器：奇数个数、偶数个数</p>
        <CodePanel>{`int n, odd = 0, even = 0;
cin >> n;
for (int i = 1; i <= n; i++) {
    int x;
    cin >> x;
    if (x % 2 == 1) odd++;
    else even++;
}
cout << odd << " " << even << endl;`}</CodePanel>
      </div>
      <div className="min-w-0 space-y-3">
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">每个数只会进 if 或 else 中的一个，所以 odd + even 一定等于 n，可以用来自查。</p>
        <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">输出顺序按题目写：要求“奇数个数 偶数个数”，就先输出 odd。</p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">题目给的是正整数时 x % 2 == 1 没问题；如果可能有负数，-3 % 2 是 -1，判奇数要写 x % 2 != 0。</p>
      </div>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 8 题"
      question={'下面 C++ 代码执行后的输出是（ ）。\nint tnt = 0;\nfor(int i=0; i<10; i++)\n    if(i%3 && i%7)\n        tnt += i;\ncout << tnt << endl;'}
      mono
      options={[
        { id: 'A', text: '0' },
        { id: 'B', text: '7' },
        { id: 'C', text: '18' },
        { id: 'D', text: '20', isCorrect: true },
      ]}
      explanation="i % 3 非 0 即真，表示 i 不是 3 的倍数；i % 7 同理。合起来是“既不是 3 的倍数，也不是 7 的倍数”。0～9 中满足的是 1、2、4、5、8（0 % 3 为 0，0 不算），和为 20。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 6 月一级第 14 题）"
      question={'在 C++ 代码中，执行后输出 “147” 的横线处填写：\nfor (int i = 1; i <= 9; i++) {\n if (________) cout << i;\n}'}
      mono
      options={[
        { id: 'A', text: 'i % 2 == 1' },
        { id: 'B', text: 'i % 3 == 1', isCorrect: true },
        { id: 'C', text: 'i % 4 == 1' },
        { id: 'D', text: 'i % 7 == 1' },
      ]}
      explanation="1、4、7 除以 3 都余 1，B 正确。A 输出 13579，C 输出 159，D 输出 18。筛选题先把要选出的数列出来，再找它们的共同点。"
    />
  </div>
);

// --- 4. 最值 ---
const MaxMinSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2：最高分与最低分</p>
        <CodePanel>{`int n, x, mx, mn;
cin >> n >> x;
mx = x;
mn = x;
for (int i = 2; i <= n; i++) {
    cin >> x;
    if (x > mx) mx = x;
    if (x < mn) mn = x;
}
cout << mx << " " << mn << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输入 5 / 90 45 60 59 100</p>
        <OutputPanel>{'100 45'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">第一个数 90 先读出来，同时当最大值和最小值的初值；循环从 i = 2 开始，读剩下的 4 个数。两个 if 互不影响，每个数都要和 mx、mn 各比一次。</p>
        <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">初值为什么不随手写 0？最小值写 0，全是正数时 mn 永远是 0；最大值写 0，全是负数时 mx 永远是 0。第一个数一定是真实数据，用它最安全。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="把例 2 改成 mx = 0、mn = 0，循环从 i = 1 读全部 n 个数。输入 3 / -5 -3 -8，输出什么？"
      options={['-3 -8', '0 -8', '0 0']}
      correctIndex={1}
      explanation="-5、-3、-8 都不大于 0，mx 一直是 0；最小值依次被换成 -5、-8，mn = -8。输出 0 -8，最大值错了。"
      misconception="以为 0 是“最小的数”，可以当最大值的初值。整数可以是负数。"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 9 月一级第 15 题）"
      question={'下面C++代码用于记录多个输入数中的最大数和最小数（输入 -999 则输入结束），相关说法错误的是（ ）。\ncin >> now_num;\nmin_num = max_num = now_num;\nwhile (now_num != -999){\n    if (max_num < now_num)\n        max_num = now_num;\n    if (min_num > now_num)\n        min_num = now_num;\n    cin >> now_num;\n}\ncout << min_num << \' \' << max_num;'}
      mono
      options={[
        { id: 'A', text: '程序运行时如果第一个数输入 -999 ，则输出将是 -999 -999' },
        { id: 'B', text: '程序输入过程中，如果输入的第一个数不是 -999 ，则如果待输入的数据中没有 -999 ，则程序能求出已输入整数中的最大数和最小数' },
        { id: 'C', text: '如果用于输入考试成绩，即成绩中不可能有 -999 ，则程序能求出已输入成绩中的最高成绩和最低成绩' },
        { id: 'D', text: '可以将 cin >> now_num; 移动到 while (now_num != -999) { 下面，结果不变', isCorrect: true },
      ]}
      explanation="这是第 11 课“读到某个值为止”与本课最值的组合：先读一个数作初值，循环里先比较、最后再读下一个，-999 只负责结束循环。第一个就是 -999 时循环不执行，输出 -999 -999（A 对）；B、C 中已输入的每个数都参与了比较（对）。把 cin 移到循环体开头后，读到的 -999 会先参与比较再回到判断，最小值变成 -999，结果改变，D 错误。"
    />
  </div>
);

// --- 5. 筛选输出与输出格式 ---
const FilterOutputSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">满足条件的数逐个输出</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-2 font-bold text-blue-900">同一行，空格分隔</p>
          <CodePanel>{`cout << i << " ";`}</CodePanel>
          <p className="mt-2 text-sm text-blue-950">输出 1 3 5 。一级评测通常忽略行末空格，但题目明确要求时要按要求处理。</p>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="mb-2 font-bold text-blue-900">每个一行</p>
          <CodePanel>{`cout << i << endl;`}</CodePanel>
          <p className="mt-2 text-sm text-blue-950">输出三行 1、3、5。题面写“输出若干行”就是这种。</p>
        </div>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">《小杨报数》：从 1 报到 N，跳过 M 的倍数，每个一行</p>
        <CodePanel>{`int N, M;
cin >> N >> M;
for (int i = 1; i <= N; i++) {
    if (i % M == 0) continue;
    cout << i << endl;
}`}</CodePanel>
        <p className="mt-2 text-xs text-slate-500">站内题库 2023 年 12 月一级编程题第 2 题 · 来源待核。输入两行 N、M。</p>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">样例</p>
        <OutputPanel>{`输入 5 和 2  → 输出 1、3、5（各一行）
输入 10 和 3 → 输出 1、2、4、5、7、8、10（各一行）`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">这里的“候选数”不是读进来的，而是 1～N 本身；筛选的写法相同。continue 跳过不要的数（第 12 课），也可以写成 if (i % M != 0) cout &lt;&lt; i &lt;&lt; endl;。</p>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      prompt="《小杨报数》输入 10 和 3，一共输出几行？"
      options={['3 行', '7 行', '10 行']}
      correctIndex={1}
      explanation="1～10 中 3 的倍数是 3、6、9，跳过这 3 个，剩下 10 − 3 = 7 个数，每个一行，共 7 行。"
      misconception="把要跳过的个数当成输出的行数。"
    />
  </div>
);

// --- 6. 多组数据 ---
const MultiCaseSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">多组数据：先读组数 T，每组读、算、输出</strong>
      外层循环跑 T 次，每一次就是一道完整的小题。这一组用到的累加器、计数器，要在这一组开始时重新清 0，否则上一组的结果会带进下一组。
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：《手机电量显示》（2025 年 12 月 GESP C++ 一级编程题第 2 题）</p>
        <CodePanel>{`int T, P;
cin >> T;
for (int t = 1; t <= T; t++) {
    cin >> P;
    if (P <= 10) cout << "R" << endl;
    else if (P <= 20) cout << "L" << endl;
    else cout << P << endl;
}`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输入 5 / 10 / 1 / 20 / 99 / 19（逐行）</p>
        <OutputPanel>{`R
R
L
99
L`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">第 9 课做过单组版：读一个 P 分三档。多组版只是在外面套一层“读 T、循环 T 次”，每组输出一行。10 和 20 是两个边界，分别落在 R 和 L。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-green-800">正确：每组开始时 cnt = 0</p>
        <CodePanel>{`int T;
cin >> T;
for (int t = 1; t <= T; t++) {
    int a, b, c, cnt = 0;
    cin >> a >> b >> c;
    if (a >= 60) cnt++;
    if (b >= 60) cnt++;
    if (c >= 60) cnt++;
    cout << cnt << endl;
}`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
        <p className="mb-2 text-sm font-bold text-red-700">错误：cnt 只在最前面清 0 一次</p>
        <CodePanel>{`int T, a, b, c, cnt = 0;
cin >> T;
for (int t = 1; t <= T; t++) {
    cin >> a >> b >> c;
    if (a >= 60) cnt++;
    if (b >= 60) cnt++;
    if (c >= 60) cnt++;
    cout << cnt << endl;
}`}</CodePanel>
      </div>
    </div>
    <p className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">每组是一个人的三门成绩，输出这个人及格的门数。两段程序都输入 2 / 90 45 60 / 59 100 70：左边输出 2、2；右边输出 2、4，第二个人把第一个人的 2 门也算了进去。</p>

    <PredictCheck
      className="w-full"
      prompt="右边的错误写法输入 3 / 60 60 60 / 60 60 60 / 60 60 60（三个人，三门都及格），输出哪三行？"
      options={['3、3、3', '3、6、9', '9、9、9']}
      correctIndex={1}
      explanation="cnt 没有在每组开始时清 0：第一组后 cnt = 3，第二组再加 3 变成 6，第三组变成 9。每组都应该输出 3。"
      misconception="以为每组的变量会自动重新开始。变量只在执行到赋值语句时才改变。"
    />
  </div>
);

// --- 7. 真题编程 ---
const examProblems = [
  {
    tag: '2024 年 9 月 GESP C++ 一级编程题第 2 题',
    title: '《美丽数字》',
    statement: '小杨有 n 个正整数。一个正整数是美丽数字，当且仅当它是 9 的倍数但不是 8 的倍数。输出这 n 个数中美丽数字的数量。第一行 n，第二行 n 个正整数。',
    samples: [['3\n1 9 72', '1']],
    hint: '条件翻译（第 7 课）：a % 9 == 0 && a % 8 != 0。72 = 8 × 9，是 9 的倍数也是 8 的倍数，不算。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int a;
        cin >> a;
        if (a % 9 == 0 && a % 8 != 0) cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
  },
  {
    tag: '2024 年 12 月 GESP C++ 一级编程题第 2 题',
    title: '《奇数和偶数》',
    statement: '小杨有 n 个正整数，输出其中奇数的个数和偶数的个数，用一个空格分隔；个数为 0 时输出 0。第一行 n，之后 n 行每行一个正整数（1 ≤ n ≤ 10⁵，每个数不超过 10⁵）。',
    samples: [['5\n1\n2\n3\n4\n5', '3 2']],
    hint: '两个计数器都在循环前清 0；每个数只进 if、else 其中一支。输出顺序是“奇数个数 偶数个数”。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, odd = 0, even = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (x % 2 == 1) odd++;
        else even++;
    }
    cout << odd << " " << even << endl;
    return 0;
}`,
  },
];

const ExamCodingSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题编程：读 n 个数，按条件计数</h3>
      <p className="mt-1 text-slate-500">两道都是本课模板加一个条件。先手算样例，再写程序。</p>
    </div>
    {examProblems.map((problem) => (
      <PracticeProblem key={problem.title} problem={problem} />
    ))}
  </div>
);

// --- 8. 常见错误 ---
const mistakeCards = [
  { title: '计数器没有清 0', code: 'int cnt; … cnt++;', detail: '局部变量不初始化，初值不确定，计数结果也不确定。' },
  { title: '清 0 写进了循环', code: 'for (…) { cnt = 0; cin >> x; … }', detail: '每读一个数就清一次，最后只剩最后一个数的结果。' },
  { title: '最值初值写 0', code: 'int mx = 0;', detail: '全是负数时 mx 停在 0。用第一个数作初值。' },
  { title: '多组数据结果累积', code: 'sum 只在所有组之前清 0', detail: '上一组的和带进下一组。每组开始时重新清 0。' },
  { title: '两个计数器输出顺序反了', code: 'cout << even << " " << odd;', detail: '题目要求“奇数个数 偶数个数”时，顺序反了整题都错。' },
  { title: '读入次数不对', code: 'for (i = 0; i <= n; i++) cin >> x;', detail: '多读一次，会把下一行或下一组的数据吃掉；i 从 0 开始就写 i < n。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 循环读入与统计常见错误
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
      <strong className="mb-2 block text-base text-blue-900">交卷前的三组测试</strong>
      正常数据（题目样例）、边界数据（n = 1；分数恰好 60；电量恰好 10、20）、特殊数据（全部不满足条件，计数应输出 0；全是负数，最值不能是 0）。三组都对再提交。
    </div>
  </div>
);

// --- 9. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 14-A',
    title: '及格人数',
    statement: '第一行一个正整数 n（1 ≤ n ≤ 100），第二行 n 个整数分数（0～100）。输出分数大于等于 60 的人数。',
    samples: [['5\n90 45 60 59 100', '3'], ['1\n30', '0']],
    hint: '计数器在循环外清 0；循环 n 次，每次读入一个分数，x >= 60 时加 1。全部不及格时输出 0。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        if (x >= 60) cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 14-B',
    title: '最高分与最低分',
    statement: '输入格式同 14-A。输出最高分和最低分，用空格分隔。不能用数组。',
    samples: [['5\n90 45 60 59 100', '100 45'], ['1\n7', '7 7']],
    hint: '先读第一个分数，同时作为 mx、mn 的初值，再循环读剩下的 n − 1 个。n = 1 时循环一次也不执行，输出 7 7。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n, x, mx, mn;
    cin >> n >> x;
    mx = x;
    mn = x;
    for (int i = 2; i <= n; i++) {
        cin >> x;
        if (x > mx) mx = x;
        if (x < mn) mn = x;
    }
    cout << mx << " " << mn << endl;
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

// --- 10. 小结与课后任务 ---
const homeworkTasks = [
  {
    title: '《小杨报数》',
    source: '站内题库 2023 年 12 月一级编程题第 2 题 · 来源待核',
    detail: '在本机写完筛选输出页的程序，用 5、2（输出 1 3 5，各一行）和 10、3（输出 1 2 4 5 7 8 10，各一行）核对。',
  },
  {
    title: '倍数筛选站',
    source: '课堂练习',
    detail: '输入一行两个整数 L、R（1 ≤ L ≤ R ≤ 10000），统计 [L, R] 中能被 3 整除、但不能被 5 整除的整数个数。样例：1 15 → 4；15 15 → 0。',
  },
  {
    title: '《小明的幸运数》',
    source: '站内题库 2023 年 9 月一级编程题第 2 题 · 来源待核',
    detail: '个位为 k 的正整数和 k 的倍数都叫 k 幸运数，求 L 到 R（含两端）所有 k 幸运数的和。输入三行 k、L、R（2 ≤ k ≤ 9，1 ≤ L ≤ R ≤ 1000）。样例：7、1、10 → 7；7、10、20 → 31。两个条件用 || 合成一个，每个数只加一次。',
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
            '读入模板：cin >> n; for (i = 1; i <= n; i++) { cin >> x; 处理 x; }，读一个处理一个，不需要数组。',
            '计数器 cnt++、累加器 sum += x，初值 0，写在循环前；奇数、偶数各用一个计数器。',
            '最值：先读第一个数作 mx、mn 的初值，再循环读剩下的 n − 1 个；不要随手写 0。',
            '筛选输出：满足条件就输出，看清“同一行空格分隔”还是“每个一行”。',
            '多组数据：先读组数 T，每组在循环内读、算、输出；每组用到的变量在这一组开始时重新初始化。',
            '交卷前测三组：样例、边界（n = 1、恰好在分界线上）、特殊（全部不满足、全是负数）。',
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
        下一课：因数、质数与平方数。本课逐个检验的是“读进来的数”；下一课逐个检验“1 到 n 的每个候选数”，按定义判断因数、质数和平方数。
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
      case 2: return <TemplateSlide />;
      case 3: return <CountSlide />;
      case 4: return <MaxMinSlide />;
      case 5: return <FilterOutputSlide />;
      case 6: return <MultiCaseSlide />;
      case 7: return <ExamCodingSlide />;
      case 8: return <MistakesSlide />;
      case 9: return <PracticeSlide />;
      case 10: return <SummarySlide />;
      case 11:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：第一行 n，第二行 n 个整数，输出其中正数的和与负数的个数（空格分隔）。写出核心代码，并手推输入 4 / 3 -2 5 -1 的输出。"
                hint="一个累加器、一个计数器，都在循环前清 0；0 既不是正数也不是负数。"
                answer="int sum = 0, neg = 0; for (int i = 1; i <= n; i++) { cin >> x; if (x > 0) sum += x; else if (x < 0) neg++; } cout << sum << ' ' << neg;  输出 8 2。"
                steps={[
                    'sum、neg 写在循环前并清 0。',
                    '循环 n 次，每次读一个 x：正数加进 sum，负数让 neg 加 1。',
                    '3 和 5 是正数，sum = 8；-2 和 -1 是负数，neg = 2，输出 8 2。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-14 循环读入与统计离开前检查"
              description="如果能写出先读 n 再读 n 个数的模板、选对计数器和累加器的初值与位置、用第一个数作最值初值，并在多组数据中每组重新初始化，就可以进入第 15 课：因数、质数与平方数。"
              items={lesson14MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会写 for 循环并选对计数器、累加器初值（第 10 课）', '能把文字条件翻译成表达式（第 7 课）', '会用 else if 分档（第 9 课）']}
      lessonNumber={14}
      lessonTitle="循环读入与统计"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/15"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={14} />}
      bottomSupport={<CppL1LessonSupport lessonId={14} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
