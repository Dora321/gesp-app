import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  Pizza,
  Scissors,
  Box,
  Calculator,
  Brain,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Code,
  CheckCircle,
  XCircle,
  Play,
  Trophy,
  Menu,
  X
} from 'lucide-react';

const lesson3MasteryItems = [
  {
    label: '能区分 / 求商和 % 求余数。',
    evidence: '能预测 17 / 5 得 3、17 % 5 得 2，并用“被除数 = 除数 × 商 + 余数”验算：5 × 3 + 2 = 17。',
    retryHint: '回到“整除与取余”，在分组实验里把完整的组和剩下的人分开数。',
  },
  {
    label: '能按三层优先级手算混合表达式。',
    evidence: '能写出 9 / 4 - 6 % (6 - 2) * 10 的每一步：括号得 4，9 / 4 得 2，6 % 4 得 2，2 * 10 得 20，最后 2 - 20 = -18。',
    retryHint: '回到“运算优先级与结合”，一行只算一个运算符，同级从左到右。',
  },
  {
    label: '能用 / 100、/ 10 % 10、% 10 拆三位数。',
    evidence: '输入 472 时能写出百位 472 / 100 = 4、十位 472 / 10 % 10 = 7、个位 472 % 10 = 2。',
    retryHint: '回到“拆分固定位数”，先输入 472，再换 905 检查十位是 0 的情况。',
  },
  {
    label: '能把总秒数换成时、分、秒。',
    evidence: '能写出 s / 3600、s % 3600 / 60、s % 60，并算出 3725 秒是 1 时 2 分 5 秒。',
    retryHint: '回到“时间换算与周期”，先求小时，再对剩下的秒数求分钟。',
  },
];

// --- 课件内容数据 ---
const sections = [
  { id: 1, title: '问题导入：125 分钟是几小时几分', icon: 'calculator', component: () => <IntroSlide />, category: "整数运算" },
  { id: 2, title: '整除与取余', icon: 'scissors', component: () => <DivModSlide />, category: "整数运算" },
  { id: 3, title: '小数除以大数', icon: 'box', component: () => <SmallDividendSlide />, category: "整数运算" },
  { id: 4, title: '运算优先级与结合', icon: 'brain', component: () => <PrioritySlide />, category: "优先级" },
  { id: 5, title: '真题：2024 年 6 月一级第 2 题', icon: 'trophy', component: () => <ExamPriorityOneSlide />, category: "优先级" },
  { id: 6, title: '真题：2024 年 6 月一级第 7 题', icon: 'trophy', component: () => <ExamPriorityTwoSlide />, category: "优先级" },
  { id: 7, title: '拆分固定位数', icon: 'calculator', component: () => <DigitSlide />, category: "应用" },
  { id: 8, title: '时间换算与周期', icon: 'play', component: () => <TimeSlide />, category: "应用" },
  { id: 9, title: '常见错误与真题', icon: 'x-circle', component: () => <MistakesSlide />, category: "应用" },
  { id: 10, title: '上机：分钟变时钟 / 秒数换算', icon: 'code', component: () => <PracticeSlide />, category: "应用" },
  { id: 11, title: '小结与课后任务', icon: 'check-circle', component: () => <SummarySlide />, category: "小结与检查" },
  {
    id: 12,
    title: '离开前检查',
    icon: 'check-circle',
    category: "小结与检查",
    component: () => (
      <div className="py-6">
        <TransferCheck
            prompt={'换个例子：cout << 100 / 7 << " " << 100 % 7; 输出什么？怎样验算这两个数？'}
            hint="/ 求商、% 求余数；用“被除数 = 除数 × 商 + 余数”检查。"
            answer="输出 14 2；验算 7 × 14 + 2 = 100。"
            steps={[
                '100 里有 14 个完整的 7（7 × 14 = 98），所以 100 / 7 = 14。',
                '还剩 100 - 98 = 2，所以 100 % 7 = 2。',
                '验算：7 × 14 + 2 = 100，商和余数都对。',
            ]}
        />
        <MasteryCheck
          title="C++ L1-3 整除、取余与优先级离开前检查"
          description="如果能说清 / 与 % 的含义、按优先级手算混合表达式、拆出三位数的每一位并完成时间换算，就可以进入第 4 课：数据类型与类型转换。"
          items={lesson3MasteryItems}
        />
      </div>
    ),
  },
];


// --- 布局组件 ---
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    "box": <Box size={size} className={className} />,
    "calculator": <Calculator size={size} className={className} />,
    "scissors": <Scissors size={size} className={className} />,
    "brain": <Brain size={size} className={className} />,
    "trophy": <Trophy size={size} className={className} />,
    "code": <Code size={size} className={className} />,
    "play": <Play size={size} className={className} />,
    "x-circle": <XCircle size={size} className={className} />,
    "check-circle": <CheckCircle size={size} className={className} />,
    "arrow-right": <ArrowRight size={size} className={className} />
  };
  return icons[name] || null;
};

export default function Lesson3() {
  const [activeSection, setActiveSection] = useState(1);

  // 获得当前组件
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <LegacyCppLessonShell
        prerequisites={['会定义 int 变量并用 cin 读入整数', '会用 cout 输出表达式的值', '知道先乘除、后加减，括号最先算']}
      lessonNumber={3}
      lessonTitle="整除、取余与优先级"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/4"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={3} />}
      bottomSupport={<CppL1LessonSupport lessonId={3} placement="bottom" />}
    >
      {ActiveComponent ? React.createElement(ActiveComponent) : <div>Coming Soon</div>}
    </LegacyCppLessonShell>
  );
}

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

const SourceNote = ({ title = '真题考点', children }) => (
  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
    <strong className="mb-1 block text-amber-800">{title}</strong>
    {children}
  </div>
);

// 作答后才显示解析；选项锁定，避免反复试选。
const QuizCard = ({ source, badge = '站内真题', question, options, explanation, mono = false }) => {
  const [selected, setSelected] = useState(null);
  const correctOption = options.find((opt) => opt.isCorrect);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-slate-600">
          <Trophy size={14} className="text-yellow-500" /> {badge}
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
                {selected && opt.isCorrect && <CheckCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />}
                {isChosen && !opt.isCorrect && <XCircle className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />}
              </button>
            );
          })}
        </div>

        {selected && (
          <div role="status" className="mt-6 space-y-3">
            <div className={`flex items-start gap-3 rounded-xl p-4 ${selected.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {selected.isCorrect ? <CheckCircle className="mt-0.5 shrink-0" /> : <XCircle className="mt-0.5 shrink-0" />}
              <p className="text-lg font-bold">{selected.isCorrect ? '回答正确' : `回答错误，正确答案是 ${correctOption?.id}`}</p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <Brain size={16} className="mt-0.5 shrink-0 text-blue-600" />
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

// --- 章节内容 ---

// 1. 问题导入：125 分钟是几小时几分
const IntroSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">先看一道题</h2>
      <p className="text-lg text-gray-600">一次课外活动共 125 分钟。换成“几小时几分钟”，是多少？</p>
    </div>

    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <p className="mb-2 text-sm font-bold text-gray-600">用 C++ 计算</p>
      <CodePanel>{`int n = 125;
cout << n / 60 << " " << n % 60 << endl;`}</CodePanel>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        想一想：1 小时是 60 分钟。125 里有几个完整的 60？还剩多少分钟？C++ 用两个运算符分别求出这两个数。
      </p>
    </div>

    <PredictCheck
      className="w-full max-w-3xl"
      prompt="上面两行代码运行后输出什么？"
      options={['2 5', '2.08 5', '2 0', '5 2']}
      correctIndex={0}
      explanation="125 / 60 是整数除法，只保留商 2；125 % 60 是 125 除以 60 的余数 5。输出 2 5，表示 2 小时 5 分钟。"
      misconception="把 / 当成计算器上的除法写出 2.08，或把商和余数的位置写反。"
    />

    <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 2 课只用了 <code>+</code>、<code>-</code>、<code>*</code>。本课补全整数运算：<strong>整除 / → 取余 % → 运算优先级 → 拆位数与时间换算</strong>，最后独立写出“分钟变时钟”和“秒数换算”。
    </div>
  </div>
);

// 2. 整除与取余
const QueueSimulator = () => {
  const [students, setStudents] = useState(10);
  const [groupSize, setGroupSize] = useState(3);

  const groups = Math.floor(students / groupSize);
  const remainder = students % groupSize;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">分组实验：a 个人，每 b 人一组</h3>
      <div className="mb-6 flex flex-wrap gap-6">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">总人数 a = {students}</span>
          <input type="range" min="1" max="20" value={students} onChange={(e) => setStudents(Number(e.target.value))} className="accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-700">每组人数 b = {groupSize}</span>
          <input type="range" min="1" max="10" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))} className="accent-amber-500" />
        </label>
      </div>

      <div className="mb-4 flex min-h-[60px] flex-wrap gap-2 rounded-lg bg-gray-50 p-4">
        {Array.from({ length: students }).map((_, i) => (
          <div
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-colors duration-300 ${i < groups * groupSize
              ? (Math.floor(i / groupSize) % 2 === 0 ? 'bg-blue-400' : 'bg-blue-600')
              : 'bg-amber-500'}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="text-sm text-gray-600">a / b：完整的组数</div>
          <div className="text-3xl font-bold text-blue-700">{groups}</div>
          <code className="mt-1 block text-xs text-blue-700">{students} / {groupSize} = {groups}</code>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="text-sm text-gray-600">a % b：剩下的人数</div>
          <div className="text-3xl font-bold text-amber-700">{remainder}</div>
          <code className="mt-1 block text-xs text-amber-700">{students} % {groupSize} = {remainder}</code>
        </div>
      </div>
      <p role="status" className="mt-4 text-center text-sm text-gray-700">验算：{groupSize} × {groups} + {remainder} = {students}</p>
    </div>
  );
};

const DivModSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-8 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
        <h3 className="mb-3 text-2xl font-bold text-blue-900">整除 /：求商</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-700">两个整数相除，结果只保留<strong>商</strong>，小数部分直接舍去，不四舍五入。</p>
        <CodePanel>{`17 / 5    // 3
10 / 3    // 3
19 / 10   // 1（不是 2）`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
        <h3 className="mb-3 text-2xl font-bold text-amber-900">取余 %：求余数</h3>
        <p className="mb-4 text-sm leading-relaxed text-amber-950">结果是两个整数相除后剩下的<strong>余数</strong>，读作“模”或“取余”。</p>
        <CodePanel>{`17 % 5    // 2
10 % 3    // 1
10 % 2    // 0（能整除时余数为 0）`}</CodePanel>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-4 text-center text-xl font-bold text-slate-800">商和余数的关系</h3>
      <p className="text-center font-mono text-2xl font-bold text-slate-800">被除数 = 除数 × 商 + 余数</p>
      <p className="mt-3 text-center text-sm text-slate-600">验算：17 = 5 × 3 + 2。本课只用非负整数，余数一定比除数小；负数的情况放在第 4 课。</p>
      <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3"><strong>% 两边都必须是整数：</strong><code>7 % 2.5</code> 不能通过编译。</li>
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3"><strong>除数不能为 0：</strong><code>a / 0</code>、<code>a % 0</code> 没有有效结果，运行时通常直接出错。</li>
      </ul>
    </div>

    <div className="w-full">
      <p className="mb-2 text-sm font-bold text-slate-600">例 1：两行输出</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <CodePanel>{`int n = 125;
cout << n / 60 << " " << n % 60 << endl;
cout << 17 / 5 << " " << 17 % 5 << endl;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <OutputPanel>{`2 5
3 2`}</OutputPanel>
        </div>
      </div>
    </div>

    <QueueSimulator />
  </div>
);

// 3. 小数除以大数
const SmallDividendSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
      <h3 className="text-2xl font-bold text-slate-800">被除数比除数小时</h3>
      <p className="mt-3 text-slate-600">2 里面连一个完整的 5 都没有：商是 0，2 全部剩下。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
          <code className="text-2xl font-bold text-blue-900">2 / 5</code>
          <p className="mt-2 text-sm text-blue-950">结果是 <strong>0</strong>，不是 0.4</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <code className="text-2xl font-bold text-amber-900">2 % 5</code>
          <p className="mt-2 text-sm text-amber-950">结果是 <strong>2</strong>，就是被除数本身</p>
        </div>
      </div>
      <p className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">规律：当 0 ≤ a &lt; b 时，<code>a / b</code> 得 0，<code>a % b</code> 得 a。</p>
    </div>

    <PredictCheck
      className="w-full max-w-3xl"
      prompt={'cout << 3 / 7 << " " << 3 % 7; 输出什么？'}
      options={['0 3', '0.43 3', '0 0', '3 0']}
      correctIndex={0}
      explanation="3 里没有完整的 7，商为 0；什么都没分出去，余数就是 3 本身。"
      misconception="把 3 / 7 当成小数 0.43，或以为除不开时余数是 0。"
    />

    <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">想得到 0.4 怎么办？（第 4 课详讲）</strong>
      这里的 <code>/</code> 是<strong>整数除法</strong>，因为两边都是整数。只要有一边写成小数，就变成小数除法：<code>5 / 2</code> 得 2，<code>5.0 / 2</code> 得 2.5。int 和 double 的区别、怎样按要求保留小数，放在第 4 课。
    </div>
  </div>
);

// 4. 运算优先级与结合
const priorityExamples = [
  {
    label: '例 2-1',
    source: '题源：站内题库 · 来源待核（2023 年 12 月一级第 2 题）',
    steps: [
      { expr: '10 - 3 * (2 + 1) % 10', note: '原式。先找括号。' },
      { expr: '10 - 3 * 3 % 10', note: '括号最先：2 + 1 = 3。' },
      { expr: '10 - 9 % 10', note: '* 和 % 同级，从左到右：先算 3 * 3 = 9。' },
      { expr: '10 - 9', note: '再算 9 % 10 = 9（9 比 10 小，余数就是 9）。' },
      { expr: '1', note: '最后算减法：10 - 9 = 1。' },
    ],
  },
  {
    label: '例 2-2',
    source: '课堂练习',
    steps: [
      { expr: '10 % 4 * 3', note: '原式。% 和 * 同级。' },
      { expr: '2 * 3', note: '同级从左到右：先算 10 % 4 = 2。' },
      { expr: '6', note: '再算 2 * 3 = 6。如果先算 4 * 3，会得到 10 % 12 = 10，这是错的。' },
    ],
  },
  {
    label: '例 2-3',
    source: '课堂练习',
    steps: [
      { expr: '20 - 14 % 4 * 3', note: '原式。先算第二层的 % 和 *。' },
      { expr: '20 - 2 * 3', note: '从左到右：14 % 4 = 2。' },
      { expr: '20 - 6', note: '再算 2 * 3 = 6。' },
      { expr: '14', note: '最后 20 - 6 = 14。' },
    ],
  },
];

const ExpressionStepper = () => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [step, setStep] = useState(0);
  const example = priorityExamples[exampleIndex];
  const current = example.steps[step];
  const lastStep = example.steps.length - 1;

  const chooseExample = (index) => {
    setExampleIndex(index);
    setStep(0);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-800">例 2：一步只算一个运算符</h3>
        <div className="flex flex-wrap gap-2">
          {priorityExamples.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={exampleIndex === index}
              onClick={() => chooseExample(index)}
              className={`rounded-lg border-2 px-3 py-1 text-sm font-bold transition-colors ${exampleIndex === index ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-xs text-gray-500">{example.source}</p>

      <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-blue-100 bg-blue-50 p-8 text-center">
        <p className="text-sm font-bold text-gray-500">第 {step + 1} / {example.steps.length} 步</p>
        <div className="mt-3 break-all font-mono text-3xl font-bold text-blue-900 md:text-4xl">{current.expr}</div>
        <p role="status" className="mt-4 rounded-full bg-amber-100 px-5 py-2 text-sm font-medium text-amber-900">{current.note}</p>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <Button onClick={() => setStep(Math.max(0, step - 1))} variant="outline" disabled={step === 0}><ChevronLeft size={16} /> 上一步</Button>
        <Button onClick={() => setStep(Math.min(lastStep, step + 1))} disabled={step === lastStep}>下一步 <ChevronRight size={16} /></Button>
      </div>
    </div>
  );
};

const priorityLevels = [
  { level: '1', ops: '( )', rule: '括号最先算；有多层括号时先算最里层。', tone: 'border-blue-200 bg-blue-50 text-blue-900' },
  { level: '2', ops: '*  /  %', rule: '三者同级，从左到右依次计算。', tone: 'border-amber-200 bg-amber-50 text-amber-900' },
  { level: '3', ops: '+  -', rule: '最后计算，同级也从左到右。', tone: 'border-slate-200 bg-slate-50 text-slate-900' },
];

const PrioritySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">算术运算的三层优先级</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {priorityLevels.map((item) => (
          <div key={item.level} className={`rounded-xl border p-5 ${item.tone}`}>
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">{item.level}</span>
              <code className="text-2xl font-bold">{item.ops}</code>
            </div>
            <p className="text-sm leading-relaxed">{item.rule}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        “从左到右”叫<strong>左结合</strong>。<code>*</code>、<code>/</code>、<code>%</code> 没有谁比谁先，不能“先算 %”或“先算 *”，只能按出现的顺序算。拿不准时，主动加括号。
      </p>
    </div>

    <ExpressionStepper />

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级第 4 题"
      question="C++ 表达式 10 - 3 * 2 的值是（ ）。"
      mono
      options={[
        { id: 'A', text: '14' },
        { id: 'B', text: '4', isCorrect: true },
        { id: 'C', text: '1' },
        { id: 'D', text: '0' },
      ]}
      explanation="* 在第二层，比 - 先算：3 * 2 = 6，再算 10 - 6 = 4。选 A 的同学是从左到右先算了 10 - 3 = 7，再乘 2；只有写成 (10 - 3) * 2 才得 14。"
    />
  </div>
);

// 5. 真题：2024 年 6 月一级第 2 题
const ExamPriorityOneSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：整数除法藏在优先级里</h3>
      <p className="mt-1 text-slate-500">先按三层优先级排好顺序，再判断每一步是不是整数除法。</p>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 2 题"
      question="C++ 表达式 3 - 3 * 3 / 5 的值是（ ）。"
      mono
      options={[
        { id: 'A', text: '-1.2' },
        { id: 'B', text: '1' },
        { id: 'C', text: '0' },
        { id: 'D', text: '2', isCorrect: true },
      ]}
      explanation="* 和 / 同级，从左到右：3 * 3 = 9；9 / 5 是整数除法，得 1（不是 1.8）；最后 3 - 1 = 2。C 是不分优先级、从左到右算出的 0；B 是把 9 / 5 四舍五入成 2 得到的 1。"
    />

    <SourceNote title="解题顺序">
      <ol className="list-decimal space-y-1 pl-5">
        <li>标层次：<code>*</code>、<code>/</code> 在第二层，<code>-</code> 在第三层。</li>
        <li>第二层从左到右：<code>3 * 3 = 9</code>，<code>9 / 5 = 1</code>。</li>
        <li>第三层：<code>3 - 1 = 2</code>。</li>
      </ol>
    </SourceNote>
  </div>
);

// 6. 真题：2024 年 6 月一级第 7 题
const ExamPriorityTwoSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：括号、整除、取余一起出现</h3>
      <p className="mt-1 text-slate-500">在草稿纸上一行只写一步，写完再选。</p>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 7 题"
      question="表达式 9/4 - 6 % (6 - 2) * 10 的值是（ ）。"
      mono
      options={[
        { id: 'A', text: '-17.75' },
        { id: 'B', text: '-18', isCorrect: true },
        { id: 'C', text: '-14' },
        { id: 'D', text: '-12.75' },
      ]}
      explanation="括号：6 - 2 = 4。第二层从左到右：9 / 4 = 2（整数除法），6 % 4 = 2，2 * 10 = 20。第三层：2 - 20 = -18。A 把 9 / 4 当成了 2.25。"
    />

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
      <h4 className="mb-4 font-bold text-slate-800">逐步化简</h4>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {[
          ['9/4 - 6 % (6 - 2) * 10', '原式'],
          ['9/4 - 6 % 4 * 10', '括号最先：6 - 2 = 4'],
          ['2 - 6 % 4 * 10', '第二层最左边：9 / 4 = 2'],
          ['2 - 2 * 10', '继续从左到右：6 % 4 = 2'],
          ['2 - 20', '2 * 10 = 20'],
          ['-18', '第三层：2 - 20 = -18'],
        ].map(([expr, note], index) => (
          <li key={expr} className="flex gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{index + 1}</span>
            <span><code className="font-bold">{expr}</code><span className="ml-2 text-slate-500">{note}</span></span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

// 7. 拆分固定位数
const DigitSplitter = () => {
  const [num, setNum] = useState('472');
  const trimmed = num.trim();
  const isThreeDigit = /^[1-9][0-9]{2}$/.test(trimmed);
  const n = Number(trimmed);
  const parts = isThreeDigit ? [
    { name: '百位', formula: `${n} / 100`, detail: `${n} 里有 ${Math.floor(n / 100)} 个完整的 100`, value: Math.floor(n / 100) },
    { name: '十位', formula: `${n} / 10 % 10`, detail: `先 ${n} / 10 = ${Math.floor(n / 10)}，去掉个位；再 % 10 取它的个位`, value: Math.floor(n / 10) % 10 },
    { name: '个位', formula: `${n} % 10`, detail: `${n} 除以 10 的余数`, value: n % 10 },
  ] : [];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">拆位实验：三位数的百位、十位、个位</h3>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-3-digit-input" className="text-sm font-bold text-gray-700">输入一个三位数：</label>
        <input
          id="l1-3-digit-input"
          type="text"
          inputMode="numeric"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="w-32 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-xl focus:border-blue-500 outline-none"
        />
      </div>

      {isThreeDigit ? (
        <div className="grid gap-3 md:grid-cols-3">
          {parts.map((part) => (
            <div key={part.name} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-900">{part.name}</p>
              <code className="mt-1 block font-mono text-sm text-gray-700">{part.formula}</code>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">{part.detail}</p>
              <p className="mt-2 text-right text-3xl font-bold text-blue-700">{part.value}</p>
            </div>
          ))}
          <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-center font-mono text-lg font-bold text-green-800 md:col-span-3">
            输出：{parts.map((part) => part.value).join(' ')}
          </p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 100～999 的三位整数；格式不对时不显示结果。</p>
      )}
    </div>
  );
};

const DigitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <p className="mb-2 text-sm font-bold text-gray-600">例 3：输入 472，输出 4 7 2</p>
        <CodePanel>{`int n;
cin >> n;
int a = n / 100;      // 百位
int b = n / 10 % 10;  // 十位
int c = n % 10;       // 个位
cout << a << " " << b << " " << c << endl;`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <h3 className="mb-3 font-bold text-blue-900">两个基本动作</h3>
        <ul className="space-y-3 text-sm leading-relaxed text-blue-950">
          <li className="rounded-lg border border-blue-100 bg-white p-3"><code>n % 10</code>：取出个位（非负整数除以 10 的余数）。</li>
          <li className="rounded-lg border border-blue-100 bg-white p-3"><code>n / 10</code>：去掉个位（整数除法舍去最后一位）。</li>
          <li className="rounded-lg border border-blue-100 bg-white p-3">十位 = 先去掉个位，再取个位：<code>n / 10 % 10</code>。同级从左到右，等于 <code>(n / 10) % 10</code>。</li>
        </ul>
        <p className="mt-4 text-xs text-blue-900">本课只拆固定的三位数。位数不确定的数要用循环一位一位处理，学完循环后再讲。</p>
      </div>
    </div>

    <DigitSplitter />

    <QuizCard
      badge="课堂练习"
      source="根据 2025 年 6 月 GESP C++ 一级第 15 题改编"
      question={'三位数 i 的百位写成 int a = i / 100;，个位写成 int c = i % 10;。十位应写成（ ）。'}
      mono
      options={[
        { id: 'A', text: 'int b = (i / 10) / 10;' },
        { id: 'B', text: 'int b = (i / 10) % 10;', isCorrect: true },
        { id: 'C', text: 'int b = (i % 10) / 10;' },
        { id: 'D', text: 'int b = (i % 10) % 10;' },
      ]}
      explanation="以 345 为例：345 / 10 = 34 去掉个位，34 % 10 = 4 正好是十位。A 得到百位 3；C 得到 0；D 得到个位 5。"
    />
  </div>
);

// 8. 时间换算与周期
const TimeCalculator = () => {
  const [now, setNow] = useState('10');
  const [pass, setPass] = useState('20');
  const validWholeNumber = value => /^(0|[1-9]\d*)$/.test(value.trim());
  const validNow = validWholeNumber(now) && Number(now) <= 23;
  const validPass = validWholeNumber(pass) && Number(pass) <= 1000000;
  const canCalculate = validNow && validPass;
  const hour = canCalculate ? (Number(now) + Number(pass)) % 24 : null;

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-indigo-900">核对实验：24 小时制的时刻</h3>
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="flex flex-col">
          <label htmlFor="l1-3-current-hour" className="text-sm font-bold text-indigo-950">现在时刻（0～23 点）</label>
          <input id="l1-3-current-hour" type="text" inputMode="numeric" value={now} onChange={(e) => setNow(e.target.value)} className="w-28 rounded-lg border-2 border-indigo-200 bg-white p-2 text-center text-xl font-bold focus:border-indigo-500 focus:outline-none" />
        </div>
        <span className="pb-2 text-2xl font-bold text-gray-400">+</span>
        <div className="flex flex-col">
          <label htmlFor="l1-3-passed-hours" className="text-sm font-bold text-indigo-950">经过小时数（非负整数）</label>
          <input id="l1-3-passed-hours" type="text" inputMode="numeric" value={pass} onChange={(e) => setPass(e.target.value)} className="w-28 rounded-lg border-2 border-indigo-200 bg-white p-2 text-center text-xl font-bold focus:border-indigo-500 focus:outline-none" />
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 text-center shadow-inner">
        {canCalculate ? <>
          <div className="mb-2 text-sm text-gray-500">计算：( {now.trim()} + {pass.trim()} ) % 24</div>
          <div role="status" className="font-mono text-4xl font-bold text-indigo-600">
            {hour} <span className="text-lg text-gray-600">点</span>
          </div>
        </> : <p role="status" className="text-sm font-bold text-red-700">现在时刻请输入 0～23 的整数；经过小时数请输入 0～1000000 的整数。</p>}
      </div>
    </div>
  );
};

const TimeSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-3 text-xl font-bold text-gray-800">总秒数 → 时、分、秒</h3>
        <CodePanel>{`int s = 3725;
cout << s / 3600 << " "        // 时：1
     << s % 3600 / 60 << " "   // 分：2
     << s % 60 << endl;        // 秒：5`}</CodePanel>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          1 小时 = 3600 秒。<code>s % 3600</code> 是去掉整小时后剩下的秒数，再 <code>/ 60</code> 得分钟；<code>s % 60</code> 是不满 1 分钟的秒数。
        </p>
      </div>
      <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-amber-900">周期问题用 %</h3>
        <p className="text-sm leading-relaxed text-amber-950">钟表每 24 小时转回 0 点。“现在 x 点，再过 N 小时”就是 <code>(x + N) % 24</code>。</p>
        <ul className="mt-4 space-y-2 text-sm text-amber-950">
          <li className="rounded-lg border border-amber-100 bg-white p-3"><code>(10 + 20) % 24 = 6</code>：10 点过 20 小时是第二天 6 点。</li>
          <li className="rounded-lg border border-amber-100 bg-white p-3"><code>(10 + 14) % 24 = 0</code>：结果为 0 表示 0 点。</li>
        </ul>
      </div>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 12 月一级第 3 题）"
      question={'小杨同学现在是上午10点，求 N 小时后的时间是几点（24小时制）。横线处应选 ( )。\nint N;\ncin >> N;\ncout << ____________;'}
      mono
      options={[
        { id: 'A', text: '(10+N) % 12' },
        { id: 'B', text: '(10+N) % 24', isCorrect: true },
        { id: 'C', text: '(10+N) / 24' },
        { id: 'D', text: '10+N' },
      ]}
      explanation="24 小时制每 24 小时循环一次，所以对 24 取余，结果落在 0～23。A 是 12 小时制的周期；C 求的是经过了几个整天；D 超过 23 时不是合法时刻。"
    />

    <TimeCalculator />

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
      <h3 className="mb-1 text-xl font-bold text-slate-800">编程真题讲解：小杨买书</h3>
      <p className="mb-4 text-xs text-slate-500">2024 年 3 月 GESP C++ 一级编程第 1 题</p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="mb-1 block text-slate-900">1. 读题</strong>
          书每本 13 元。输入零用钱 m（正整数），输出两行：最多能买几本、还剩多少钱。
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="mb-1 block text-slate-900">2. 手算样例</strong>
          100 = 13 × 7 + 9，所以输出 7 和 9。199 = 13 × 15 + 4，输出 15 和 4。
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="mb-1 block text-slate-900">3. 对应代码</strong>
          本数是商 <code>m / 13</code>，剩下的钱是余数 <code>m % 13</code>。
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <CodePanel>{`int m;
cin >> m;
cout << m / 13 << endl;
cout << m % 13 << endl;`}</CodePanel>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-sm">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：100</div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800 whitespace-pre-line">{'输出：\n7\n9'}</div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">输入：199</div>
          <div className="rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800 whitespace-pre-line">{'输出：\n15\n4'}</div>
        </div>
      </div>
    </div>
  </div>
);

// 9. 常见错误与真题
const mistakeCards = [
  { title: '2 / 5 不是 0.4', code: '2 / 5', detail: '两个整数相除是整数除法，结果为 0；2 % 5 的结果是 2。' },
  { title: '同级不能跳着算', code: '10 % 4 * 3', detail: '从左到右：10 % 4 = 2，2 * 3 = 6。先算 4 * 3 得到的 10 是错的。' },
  { title: '^ 不是乘方', code: '2 ^ 3', detail: '在 C++ 里 ^ 是位运算，2 ^ 3 的值是 1，不是 8。求 2 的 3 次方写 2 * 2 * 2。' },
  { title: '除数不能为 0', code: 'n % 0', detail: 'n / 0、n % 0 都没有有效结果。写 a / b、a % b 前，先确认 b 不为 0。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 text-center text-2xl font-bold text-slate-800">整数运算常见错误</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mistakeCards.map((card) => (
          <div key={card.title} className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
            <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> {card.title}</div>
            <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-lg">{card.code}</code>
            <div className="text-xs font-medium leading-relaxed text-red-700">{card.detail}</div>
          </div>
        ))}
      </div>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级判断题第 2 题"
      question="在 C++ 中，表达式 10 / 4 和 10 % 4 的值相同，都是整数 2，说明 / 和 % 可以互相替换。"
      options={judgeOptions(false)}
      explanation="10 / 4 求的是商 2，10 % 4 求的是余数 2，结果相同只是巧合（10 = 4 × 2 + 2）。换成 11 / 4 和 11 % 4，结果分别是 2 和 3。/ 和 % 含义不同，不能互换。"
    />

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级判断题第 2 题"
      question="C++ 表达式 10 * 4 % 6 和 10 * 2 % 3 的结果相同。"
      options={judgeOptions(false)}
      explanation="同级从左到右：10 * 4 = 40，40 % 6 = 4；10 * 2 = 20，20 % 3 = 2。4 和 2 不同，说法错误。（答案已按 C++ 运算规则手算并用 g++ 运行核对。）"
    />

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级第 3 题"
      question="在 C++ 中，假设 N 为正整数，则表达式 cout << (N % 3 + N % 7) 可能输出的最大值是（ ）。"
      options={[
        { id: 'A', text: '6' },
        { id: 'B', text: '8', isCorrect: true },
        { id: 'C', text: '9' },
        { id: 'D', text: '10' },
      ]}
      explanation="余数一定比除数小：N % 3 最大是 2，N % 7 最大是 6，和最大为 8。8 能取到，例如 N = 20 时 20 % 3 = 2、20 % 7 = 6。"
    />

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级第 5 题"
      question="C++ 表达式 2+3 * 4 % 5 的值为（ ）。"
      mono
      options={[
        { id: 'A', text: '0' },
        { id: 'B', text: '4', isCorrect: true },
        { id: 'C', text: '14' },
        { id: 'D', text: '50' },
      ]}
      explanation="第二层从左到右：3 * 4 = 12，12 % 5 = 2；第三层：2 + 2 = 4。C 是漏算了 % 5 得到的 2 + 12。"
    />
  </div>
);

// 10. 上机：分钟变时钟 / 秒数换算
const practiceProblems = [
  {
    tag: '基础题 3-A',
    title: '分钟变时钟',
    statement: '输入一个整数 n（0 ≤ n ≤ 100000），表示总分钟数。输出完整的小时数和剩余的分钟数，用一个空格分隔。',
    samples: [['125', '2 5'], ['60', '1 0']],
    hint: '小时是 n / 60，剩余分钟是 n % 60。自己再补测 0 和 59。',
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << n / 60 << " " << n % 60 << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 3-B',
    title: '秒数换算',
    statement: '输入一个整数 s（0 ≤ s ≤ 86399），表示从 0 点开始经过的秒数。输出时、分、秒三个整数，用空格分隔。',
    samples: [['3725', '1 2 5'], ['86399', '23 59 59']],
    hint: '先求小时 s / 3600；分钟要从“去掉整小时后剩下的秒数”里求：s % 3600 / 60；秒是 s % 60。',
    code: `#include <iostream>
using namespace std;

int main() {
    int s;
    cin >> s;
    cout << s / 3600 << " " << s % 3600 / 60 << " " << s % 60 << endl;
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
    <p className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
      考试提示：判题逐字比较输出。只输出题目要求的数字和空格，不要输出“请输入”之类的提示语。
    </p>
  </div>
);

// 11. 小结与课后任务
const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><CheckCircle size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '两个整数相除：/ 得商，小数部分舍去；% 得余数。被除数 = 除数 × 商 + 余数。',
            '0 ≤ a < b 时，a / b 得 0，a % b 得 a。',
            '% 两边必须是整数；做 / 或 % 时除数不能为 0。',
            '优先级：括号 → * / %（同级从左到右）→ + -。拿不准就加括号。',
            '拆三位数：百位 n / 100，十位 n / 10 % 10，个位 n % 10。',
            '时间换算：s / 3600、s % 3600 / 60、s % 60；24 小时制的周期用 % 24。',
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
          <Code size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">课后真题 1：休息时间</strong>
              <p className="text-sm text-yellow-900">2024 年 6 月 GESP C++ 一级编程第 1 题。四行输入开始学习的时 h、分 m、秒 s 和学习秒数 k，输出开始休息的时、分、秒。样例：12、59、59、10 → 13 0 9。提示：先化成总秒数，再拆回时分秒。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">课后真题 2：小杨购物</strong>
              <p className="text-sm text-yellow-900">2024 年 9 月 GESP C++ 一级编程第 1 题。有 n 元，商品 A 单价 a 元、B 单价 b 元，要买相同数量，最多各买几个。样例：12、1、2 → 4；13、1、2 → 4。提示：买一组要花 a + b 元。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white md:col-span-2">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">选做：时间规划（站内题库 · 来源待核）</strong>
              <p className="text-sm text-yellow-900">站内 2023 年 6 月一级编程第 1 题。四行输入开始的时、分和结束的时、分（同一天，开始早于结束），输出相差多少分钟。样例：9、5、9、6 → 1；9、5、10、0 → 55。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课：数据类型与类型转换。本课所有运算都是整数；第 4 课回答“7 / 2 为什么是 3，怎样得到 3.5”。
      </p>
    </div>
  </div>
);
