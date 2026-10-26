import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Key, Cpu, Shield, ArrowRight, CheckCircle, XCircle, RefreshCw, Lock, Unlock, Quote, ArrowDownUp, AlertTriangle, Play, BookOpen, User, Binary, Menu, X } from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';

const lesson5MasteryItems = [
  {
    label: '能把复合赋值改写成普通赋值。',
    evidence: '知道 a op= x 等价于 a = a op (x)：a *= 2 + 3 就是 a = a * (2 + 3)，a 乘的是 5。',
    retryHint: '回到“复合赋值”，把例 1 的五行逐行改写成普通赋值。',
  },
  {
    label: '能预测 cout << x++ 与 cout << ++x 的输出。',
    evidence: 'x 为 5 时，cout << x++ 输出 5、之后 x 为 6；cout << ++x 先把 x 变成 6 再输出 6。',
    retryHint: '回到“自增与自减”，在自增实验里分别点 x++ 和 ++x。',
  },
  {
    label: '能说出逗号表达式的值。',
    evidence: '知道逗号表达式从左到右依次计算，整个表达式的值是最后一项：(X = 3, X++, ++X) 的值是 5。',
    retryHint: '回到“逗号运算符”，把每一项执行后 X 的值写成一行。',
  },
  {
    label: '能借助第三个变量交换两个数，并解释为什么两句不行。',
    evidence: '能写出 t = a; a = b; b = t;，并说明先写 a = b; 会把 a 原来的值覆盖掉。',
    retryHint: '回到“交换两个变量”，单步观察 a、b、t 的变化。',
  },
];

const sections = [
  { id: 1, title: '问题导入：a = a + 1 在数学里不成立', icon: 'terminal', component: () => <IntroStage />, category: "赋值" },
  { id: 2, title: '赋值表达式', icon: 'key', component: () => <AssignStage />, category: "赋值" },
  { id: 3, title: '真题：2025 年 12 月一级第 6 题', icon: 'check', component: () => <ChainExamStage />, category: "赋值" },
  { id: 4, title: '复合赋值', icon: 'cpu', component: () => <CompoundStage />, category: "赋值" },
  { id: 5, title: '自增与自减', icon: 'play', component: () => <IncrementStage />, category: "自增自减" },
  { id: 6, title: '逗号运算符', icon: 'book', component: () => <CommaStage />, category: "逗号与交换" },
  { id: 7, title: '交换两个变量', icon: 'refresh', component: () => <SwapStage />, category: "逗号与交换" },
  { id: 8, title: '常见错误与真题', icon: 'alert', component: () => <MistakeStage />, category: "易错与上机" },
  { id: 9, title: '上机：交换两个数 / 复合赋值连算', icon: 'terminal', component: () => <PracticeStage />, category: "易错与上机" },
  { id: 10, title: '小结与课后任务', icon: 'flag', component: () => <SummaryStage />, category: "小结与检查" },
  {
    id: 11,
    title: '离开前检查',
    icon: 'check',
    component: () => (
      <div className="py-6">
      <TransferCheck
          prompt={'换个例子：int a = 4; a *= 2; a += 3; 执行后 a 是多少？把两条复合赋值改写成普通赋值。'}
          hint="a op= x 就是 a = a op (x)，一行一行往下算。"
          answer="a = 11。"
          steps={[
              'a *= 2 就是 a = a * 2：4 * 2 = 8。',
              'a += 3 就是 a = a + 3：8 + 3 = 11。',
              '所以最后 a 是 11。',
          ]}
      />
      <MasteryCheck
        title="C++ L1-5 赋值与自增自减离开前检查"
        description="如果能改写复合赋值、预测 x++ 与 ++x、说出逗号表达式的值，并借助第三个变量完成交换，就可以进入第 6 课：格式化输入输出。"
        items={lesson5MasteryItems}
      />
      </div>
    ),
    category: "小结与检查",
  },
];


export default function Lesson5() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);

  const nextSection = () => {
    if (activeSection < sections.length) {
      setActiveSection(activeSection + 1);
    } else {
      navigate('/lesson/1/6');
    }
  };

  const currentSection = sections.find(s => s.id === activeSection);

  // Helper for icons in sidebar
  const getIcon = (name) => {
    const icons = {
      terminal: <Terminal size={16} />,
      key: <Key size={16} />,
      book: <BookOpen size={16} />,
      cpu: <Cpu size={16} />,
      play: <Play size={16} />,
      refresh: <ArrowDownUp size={16} />,
      alert: <AlertTriangle size={16} />,
      check: <CheckCircle size={16} />,
      flag: <CheckCircle size={16} />
    };
    return icons[name] || <Terminal size={16} />;
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会定义 int 变量并再次赋值', '能按优先级手算含 / 和 % 的整数表达式', '知道小数存入 int 会向 0 截断']}
      lessonNumber={5}
      lessonTitle="赋值与自增自减"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/6"
      renderIcon={(name) => getIcon(name)}
      topSupport={<CppL1LessonSupport lessonId={5} />}
      bottomSupport={<CppL1LessonSupport lessonId={5} placement="bottom" />}
    >
      {currentSection?.component({ onNext: nextSection })}
    </LegacyCppLessonShell>
  );
}

// --- 通用小组件（沿用第 1、2 课样板） ---
function Button({ onClick, children, variant = 'primary', disabled = false, className = '' }) {
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
}

function CodePanel({ children }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-gray-800 p-5 font-mono text-sm leading-relaxed text-gray-100"><code>{children}</code></pre>
  );
}

function OutputPanel({ children }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
  );
}

// 作答后才显示解析；选项锁定，避免反复试选。
function QuizCard({ source, badge = '站内真题', question, options, explanation, mono = false }) {
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
              <Key size={16} className="mt-0.5 shrink-0 text-blue-600" />
              <p><strong>解析：</strong>{explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 单步执行：沿用第 2 课“定义、再赋值、用自己计算”的追踪写法，支持多个变量。
function StepTrace({ title, steps, varNames }) {
  const [executed, setExecuted] = useState(0);
  const current = executed > 0 ? steps[executed - 1] : null;

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <ol className="space-y-1 font-mono text-sm">
          {steps.map((step, index) => (
            <li
              key={`${step.code}-${index}`}
              className={`rounded px-3 py-1.5 ${index < executed ? 'bg-green-50 text-green-900' : index === executed ? 'bg-amber-50 text-gray-900 ring-1 ring-amber-300' : 'text-gray-500'}`}
            >
              {index + 1}. {step.code}
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-2">
          {varNames.map((name) => (
            <div key={name} className="flex h-24 w-20 flex-col items-center justify-center rounded-lg border-4 border-yellow-400 bg-yellow-50">
              <span className="text-xs font-bold text-gray-500">{name}</span>
              <span className="text-3xl font-bold text-gray-800">{current ? (current.vars[name] ?? '—') : '—'}</span>
            </div>
          ))}
        </div>
      </div>
      <p role="status" className="mt-3 min-h-6 text-sm text-gray-700">
        {current ? current.note : '点击“执行下一行”，观察变量的值如何变化。'}
      </p>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => setExecuted(executed + 1)} disabled={executed >= steps.length}>执行下一行</Button>
        <Button onClick={() => setExecuted(0)} variant="outline"><RefreshCw size={16} /> 重来</Button>
      </div>
    </div>
  );
}

// 1. 问题导入
const introSteps = [
  { code: 'int a = 5;', vars: { a: 5 }, note: '定义 a 并初始化为 5。' },
  { code: 'a = a + 1;', vars: { a: 6 }, note: '先算右边：a + 1 = 5 + 1 = 6；再把 6 存回 a。' },
  { code: 'a = a * 2;', vars: { a: 12 }, note: '先算右边：6 * 2 = 12；再存回 a。' },
  { code: 'a = 3;', vars: { a: 3 }, note: '新值 3 覆盖旧值 12，旧值不再保留。' },
];

function IntroStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">a = a + 1 是什么意思？</h2>
        <p className="text-lg text-gray-600">在数学里，a = a + 1 这个等式无解。在 C++ 里，它是一条命令。</p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center shadow-sm">
        <p className="text-lg font-bold text-blue-900">= 是赋值，不是“相等”：先算右边，再把结果存进左边的变量。</p>
        <p className="mt-2 text-sm text-blue-950">右边用到的 a 是“执行这一行之前”的值。</p>
      </div>

      <StepTrace title="单步执行：右边先算，再存回左边" steps={introSteps} varNames={['a']} />

      <PredictCheck
        className="w-full max-w-3xl"
        prompt="int b = 10; b = b - 3; b = b * 2; 执行后 b 是多少？"
        options={['14', '7', '20', '10']}
        correctIndex={0}
        explanation="第二行 b = 10 - 3 = 7；第三行 b = 7 * 2 = 14。每一行右边用的都是上一行执行后的 b。"
        misconception="把三行当成方程一起解，或以为每一行都用最初的 10 计算。"
      />

      <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
        <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
        第 3、4 课只算出表达式的值。本课学怎样改变变量本身：<strong>赋值表达式 → 复合赋值 → 自增自减 → 逗号运算符 → 交换两个数</strong>，最后完成“交换两个数”和“复合赋值连算”。
      </div>
    </div>
  );
}

// 2. 赋值表达式
const chainSteps = [
  { code: 'int x, y, z;', vars: { x: '?', y: '?', z: '?' }, note: '只定义不赋值，三个变量的值都不确定。' },
  { code: 'x = y = z = 7;', vars: { x: 7, y: 7, z: 7 }, note: '从右往左：先 z = 7，这个表达式的值是 7；再 y = 7；最后 x = 7。' },
];

function AssignStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="grid w-full gap-8 md:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-green-900">左边必须是变量</h3>
          <CodePanel>{`a = b + c;      // 可以：结果存进 a
b = a;          // 可以`}</CodePanel>
          <p className="mt-3 text-sm leading-relaxed text-green-950">赋值号左边要能“存东西”，所以只能是一个变量。</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-red-900">这些不能通过编译</h3>
          <CodePanel>{`a + c = b + c;  // 左边是表达式
5 = a;          // 左边是常数
N % 2 = 0;      // 左边是计算结果`}</CodePanel>
          <p className="mt-3 text-sm leading-relaxed text-red-950">判断“N % 2 是否等于 0”要写 <code>N % 2 == 0</code>，第 7 课详讲。</p>
        </div>
      </div>

      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
        <h3 className="mb-3 text-center text-xl font-bold text-slate-800">赋值表达式本身也有值</h3>
        <p className="text-center text-sm leading-relaxed text-slate-600">
          <code>a = 4</code> 这个表达式的值，就是赋值后 a 的值 4。所以连续赋值 <code>x = y = z = 7</code> 按<strong>从右往左</strong>执行。
        </p>
      </div>

      <StepTrace title="单步执行：连续赋值" steps={chainSteps} varNames={['x', 'y', 'z']} />

      <QuizCard
        badge="课堂练习"
        source="站内题库 · 来源待核（2023 年 6 月一级第 7 题）"
        question="不符合C++语法的语句是（ ）。"
        mono
        options={[
          { id: 'A', text: 'a = b+c;' },
          { id: 'B', text: 'b = a;' },
          { id: 'C', text: 'c = a / b;' },
          { id: 'D', text: 'a+c = b+c;', isCorrect: true },
        ]}
        explanation="赋值号左边必须是变量。D 的左边 a+c 是一个计算结果，不能存东西，编译失败；A、B、C 的左边都是变量。"
      />
    </div>
  );
}

// 3. 真题：2025 年 12 月一级第 6 题
function ChainExamStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800">真题：连续赋值</h3>
        <p className="mt-1 text-slate-500">先写出 b = a = 4 的执行顺序，再选。</p>
      </div>

      <QuizCard
        source="2025 年 12 月 GESP C++ 一级第 6 题"
        question={'下面的C++代码执行后，其输出是（ ）。\nint a, b;\na = 3;\nb = a = 4;\nprintf("%d %d", a, b);'}
        mono
        options={[
          { id: 'A', text: '4 4', isCorrect: true },
          { id: 'B', text: '3 3' },
          { id: 'C', text: '3 4' },
          { id: 'D', text: '4 3' },
        ]}
        explanation="b = a = 4 等价于 b = (a = 4)：先把 4 存进 a（原来的 3 被覆盖），这个赋值表达式的值是 4，再存进 b。输出 4 4。printf 的两个 %d 依次换成 a、b 的值，第 6 课详讲。"
      />

      <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        <strong className="mb-1 block text-amber-800">常见错因</strong>
        选 C 的同学以为 b 拿到的是 a 原来的 3。连续赋值是从右往左做的，b 拿到的是 a 被赋值之后的 4。
      </div>
    </div>
  );
}

// 4. 复合赋值
const compoundRows = [
  ['a += x', 'a = a + (x)'],
  ['a -= x', 'a = a - (x)'],
  ['a *= x', 'a = a * (x)'],
  ['a /= x', 'a = a / (x)'],
  ['a %= x', 'a = a % (x)'],
];

function CompoundStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-center text-xl font-bold text-slate-800">复合赋值：a op= x 等价于 a = a op (x)</h3>
        <div className="grid gap-3 md:grid-cols-5">
          {compoundRows.map(([short, full]) => (
            <div key={short} className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
              <code className="block text-xl font-bold text-blue-900">{short}</code>
              <ArrowRight className="mx-auto my-2 rotate-90 text-blue-300" size={16} />
              <code className="block text-sm text-blue-950">{full}</code>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          注意右边的括号：<code>a *= 2 + 3</code> 是 <code>a = a * (2 + 3)</code>，a 乘的是 5，不是先乘 2 再加 3。
        </p>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">例 1：每一行都在上一行的基础上算</p>
          <CodePanel>{`int a = 10;
a += 5;  cout << a << endl;   // 10 + 5
a -= 3;  cout << a << endl;   // 15 - 3
a *= 2;  cout << a << endl;   // 12 * 2
a /= 5;  cout << a << endl;   // 24 / 5（整数除法）
a %= 3;  cout << a << endl;   // 4 % 3`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
          <OutputPanel>{`15
12
24
4
1`}</OutputPanel>
        </div>
      </div>

      <PredictCheck
        className="w-full"
        prompt="int k = 2; k *= 2 + 3; 执行后 k 是多少？"
        options={['10', '7', '12', '25']}
        correctIndex={0}
        explanation="k *= 2 + 3 等价于 k = k * (2 + 3) = 2 * 5 = 10。"
        misconception="把它读成 k = k * 2 + 3，得到 7。复合赋值右边整体先算。"
      />

      <QuizCard
        badge="课堂练习"
        source="站内题库 · 来源待核（2023 年 6 月一级第 10 题）"
        question="执行 a %= 4; 之后 a 的值（原值为 6）："
        options={[
          { id: 'A', text: '1' },
          { id: 'B', text: '2', isCorrect: true },
          { id: 'C', text: '4' },
          { id: 'D', text: '6' },
        ]}
        explanation="a %= 4 等价于 a = a % 4 = 6 % 4 = 2。"
      />
    </div>
  );
}

// 5. 自增与自减
function IncrementLab() {
  const [raw, setRaw] = useState('5');
  const [op, setOp] = useState('x++');
  const trimmed = raw.trim();
  const valid = /^-?\d{1,4}$/.test(trimmed) && Math.abs(Number(trimmed)) <= 1000;
  const x = Number(trimmed);
  const table = { 'x++': [x, x + 1], '++x': [x + 1, x + 1], 'x--': [x, x - 1], '--x': [x - 1, x - 1] };
  const [shown, after] = valid ? table[op] : [null, null];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">自增实验：表达式的值和执行后的 x</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-5-inc-x" className="text-sm font-bold text-gray-700">int x =</label>
        <input id="l1-5-inc-x" type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <div className="flex flex-wrap gap-2">
          {Object.keys(table).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={op === key}
              onClick={() => setOp(key)}
              className={`rounded-lg border-2 px-3 py-1 font-mono text-sm font-bold ${op === key ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
            >
              cout &lt;&lt; {key};
            </button>
          ))}
        </div>
      </div>
      {valid ? (
        <div role="status" className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-gray-600">屏幕输出</p>
            <p className="font-mono text-3xl font-bold text-green-800">{shown}</p>
          </div>
          <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-center">
            <p className="text-sm text-gray-600">这一行执行后 x</p>
            <p className="font-mono text-3xl font-bold text-gray-800">{after}</p>
          </div>
          <p className="text-sm text-gray-700 md:col-span-2">
            {op.startsWith('x') ? `${op} 先用旧值 ${x} 参与输出，再改变 x。` : `${op} 先改变 x，再用新值 ${after} 参与输出。`}
          </p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 -1000～1000 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
}

function IncrementStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="grid w-full gap-6 md:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-blue-900">单独成一句：效果相同</h3>
          <p className="text-sm leading-relaxed text-blue-950"><code>i++;</code> 和 <code>++i;</code> 都等于 <code>i = i + 1;</code>；<code>i--;</code> 和 <code>--i;</code> 都等于 <code>i = i - 1;</code>。</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-amber-900">放在表达式里：先后不同</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-amber-950">
            <li className="rounded-lg border border-amber-100 bg-white p-3"><code>x++</code>（后置）：先用旧值参与运算，再把 x 加 1。</li>
            <li className="rounded-lg border border-amber-100 bg-white p-3"><code>++x</code>（前置）：先把 x 加 1，再用新值参与运算。</li>
          </ul>
        </div>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">例 2</p>
          <CodePanel>{`int x = 5;
cout << x++ << endl;   // 先输出 5，x 变 6
cout << x << endl;
cout << ++x << endl;   // x 先变 7，再输出
int i = 0, s = 0;
s += i++;              // s 加上 0，i 变 1
s += i++;              // s 加上 1，i 变 2
cout << i << " " << s << endl;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
          <OutputPanel>{`5
6
7
2 1`}</OutputPanel>
        </div>
      </div>

      <IncrementLab />

      <PredictCheck
        className="w-full"
        prompt={'int y = 7; int z = y--; cout << z << " " << y; 输出什么？'}
        options={['7 6', '6 6', '6 7', '7 7']}
        correctIndex={0}
        explanation="y-- 是后置自减：先把旧值 7 交给 z，再把 y 变成 6。所以 z 是 7，y 是 6。"
        misconception="以为自减一定先发生，写出 6 6。"
      />
    </div>
  );
}

// 6. 逗号运算符
function CommaStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
        <h3 className="mb-3 text-center text-xl font-bold text-slate-800">逗号运算符：从左到右依次算，值是最后一项</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <CodePanel>{`int m, n;
m = (n = 2, n + 5);
cout << m << " " << n << endl;`}</CodePanel>
          </div>
          <div className="min-w-0">
            <OutputPanel>{'7 2'}</OutputPanel>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">括号里先执行 <code>n = 2</code>，再算 <code>n + 5</code> 得 7；整个括号的值是最后一项 7，存进 m。</p>
          </div>
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          逗号的优先级最低。不加括号写成 <code>m = n = 2, n + 5;</code> 时，先完成 <code>m = n = 2</code>，m 是 2；后面的 <code>n + 5</code> 算完就被丢掉。
        </p>
      </div>

      <QuizCard
        source="2025 年 12 月 GESP C++ 一级第 4 题"
        question="X 是C++的整型变量，则 cout << (X=3, X++, ++X); 执行后的输出是（ ）。"
        mono
        options={[
          { id: 'A', text: '3' },
          { id: 'B', text: '4' },
          { id: 'C', text: '5', isCorrect: true },
          { id: 'D', text: '不确定' },
        ]}
        explanation="从左到右：X = 3；X++ 让 X 变成 4；++X 让 X 变成 5，这一项的值是 5。逗号表达式的值是最后一项，输出 5。X 原来是多少不影响结果，因为第一项就把它赋成了 3。"
      />
    </div>
  );
}

// 7. 交换两个变量
const swapSteps = [
  { code: 'int a = 3, b = 8, t;', vars: { a: 3, b: 8, t: '?' }, note: 't 只定义未赋值，值不确定。' },
  { code: 't = a;', vars: { a: 3, b: 8, t: 3 }, note: '先把 a 的值 3 存进 t 备份。' },
  { code: 'a = b;', vars: { a: 8, b: 8, t: 3 }, note: 'a 被覆盖成 8；原来的 3 还保存在 t 里。' },
  { code: 'b = t;', vars: { a: 8, b: 3, t: 3 }, note: '把备份的 3 交给 b，交换完成。' },
];

const wrongSwapSteps = [
  { code: 'int a = 3, b = 8;', vars: { a: 3, b: 8 }, note: '初始值。' },
  { code: 'a = b;', vars: { a: 8, b: 8 }, note: 'a 变成 8，原来的 3 丢了。' },
  { code: 'b = a;', vars: { a: 8, b: 8 }, note: 'b 拿到的是 a 现在的 8，两个都是 8，交换失败。' },
];

function SwapStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="grid w-full gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">例 4：借第三个变量 t 交换</p>
          <CodePanel>{`int a = 3, b = 8, t;
t = a;
a = b;
b = t;
cout << a << " " << b << endl;`}</CodePanel>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
          <OutputPanel>{'8 3'}</OutputPanel>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">像交换两杯水，需要第三个空杯子：先把一杯倒进空杯，再倒另一杯。t 就是那个空杯，它的作用是<strong>备份即将被覆盖的值</strong>。</p>
        </div>
      </div>

      <StepTrace title="单步执行：正确的交换" steps={swapSteps} varNames={['a', 'b', 't']} />
      <StepTrace title="单步执行：只写两句为什么不行" steps={wrongSwapSteps} varNames={['a', 'b']} />

      <div className="grid w-full gap-6 md:grid-cols-2">
        <QuizCard
          badge="课堂练习"
          source="站内题库 · 来源待核（2025 年 6 月一级第 6 题）"
          question={'下面的C++代码执行后，其输出是 ( )。\nint x = 10, y = 20;\nx = x+y;\ny = x-y;\nx = x-y;\ncout << x << " " << y;'}
          mono
          options={[
            { id: 'A', text: '10 20' },
            { id: 'B', text: '20 10', isCorrect: true },
            { id: 'C', text: '10 10' },
            { id: 'D', text: '20 20' },
          ]}
          explanation="逐行追踪：x = 30；y = 30 - 20 = 10；x = 30 - 10 = 20。输出 20 10。这是不用第三个变量的交换写法，了解即可，考试写程序时用第三个变量更稳妥。"
        />
        <QuizCard
          badge="课堂练习"
          source="站内题库 · 来源待核（2023 年 6 月一级第 13 题）"
          question={'在下列代码的横线处填写（ ），可以使得输出是“20 10”。\nint a = 10, b = 20;\na = ________;\nb = a + b;\na = b - a;\ncout << a << " " << b << endl;'}
          mono
          options={[
            { id: 'A', text: 'a+b' },
            { id: 'B', text: 'b' },
            { id: 'C', text: 'a-b', isCorrect: true },
            { id: 'D', text: 'b-a' },
          ]}
          explanation="把选项逐个代进去追踪。C：a = 10 - 20 = -10；b = -10 + 20 = 10；a = 10 - (-10) = 20，输出 20 10。A 得到 20 50，B 得到 20 40，D 得到 20 30。和上一题一样，这也是不借第三个变量、只用加减完成交换的写法。"
        />
      </div>
    </div>
  );
}

// 8. 常见错误与真题
const mistakeCards = [
  { title: '把 = 当成判断', code: 'N % 2 = 0;', detail: '左边是计算结果，不能被赋值，编译失败。判断相等用 ==。' },
  { title: '两句交换', code: 'a = b; b = a;', detail: '第一句已经覆盖了 a，两个变量最后都等于原来的 b。' },
  { title: '一个表达式里既读又改', code: 'x = x++;  cout << i << i++;', detail: '按 C++11 规则，这类写法的结果不确定，不要写。逗号运算符规定了从左到右，不在此列。' },
  { title: 'int 存不下小数', code: 'int X = 20.24;', detail: 'X 实际保存的是 20，后面的 X++ 从 20 开始加。' },
];

function MistakeStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
          <AlertTriangle className="text-orange-500" /> 赋值与自增常见错误
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mistakeCards.map((card) => (
            <div key={card.title} className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
              <div className="mb-3 flex items-center gap-2 font-bold text-red-700"><XCircle size={16} /> {card.title}</div>
              <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-base">{card.code}</code>
              <div className="text-xs font-medium leading-relaxed text-red-700">{card.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-950">
        <strong className="mb-1 block text-indigo-900">选学：前置自增的结果还是变量本身</strong>
        下面两题来自站内题库（来源待核），考的是“++a 的结果就是 a 这个变量”。答案已在本机按 C++11 编译运行核对；不会也不影响一级主线。
      </div>

      <div className="grid w-full gap-6 md:grid-cols-2">
        <QuizCard
          badge="选学"
          source="站内题库 · 来源待核（2025 年 6 月一级第 7 题）"
          question="定义整型变量 int a=16 ，则执行 ++a += 3 之后，a的值会是（ ）。"
          mono
          options={[
            { id: 'A', text: '3' },
            { id: 'B', text: '17' },
            { id: 'C', text: '19' },
            { id: 'D', text: '20', isCorrect: true },
          ]}
          explanation="++a 先把 a 变成 17，结果就是变量 a；再执行 a += 3，a 变成 20。"
        />
        <QuizCard
          badge="选学"
          source="站内题库 · 来源待核（2025 年 6 月一级第 8 题）"
          question="已知 C++ 的 int 类型变量 x 的值为 8，如果执行 cout << (++x)++ ; 则输出和执行后 x 的值分别是 ( )。"
          mono
          options={[
            { id: 'A', text: '8 9' },
            { id: 'B', text: '9 9' },
            { id: 'C', text: '9 10', isCorrect: true },
            { id: 'D', text: '编译错误，无法执行' },
          ]}
          explanation="++x 先把 x 变成 9，结果是变量 x；外面的后置 ++ 先交出当前值 9 用于输出，再把 x 变成 10。"
        />
      </div>
    </div>
  );
}

// 9. 上机
const practiceProblems = [
  {
    tag: '基础题 5-A',
    title: '交换两个数',
    statement: '输入一行两个整数 a、b（-1000000 ≤ a, b ≤ 1000000）。先交换两个变量的值，再按 a b 的顺序输出。',
    samples: [['3 8', '8 3'], ['5 5', '5 5']],
    hint: '用第三个变量 t：t = a; a = b; b = t;。不要直接输出 b、a 了事，题目要求交换变量本身。',
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b, t;
    cin >> a >> b;
    t = a;
    a = b;
    b = t;
    cout << a << " " << b << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 5-B',
    title: '复合赋值连算',
    statement: '输入整数 x（0 ≤ x ≤ 1000）。依次执行 x += 5、x *= 3、x -= 4、x /= 2、x %= 7，每执行一步输出一次 x，五个数在同一行，用空格分隔。必须用复合赋值写。',
    samples: [['3', '8 24 20 10 3'], ['0', '5 15 11 5 5']],
    hint: '每一步都在上一步的结果上算；x /= 2 是整数除法，11 / 2 得 5。',
    code: `#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    x += 5;
    cout << x << " ";
    x *= 3;
    cout << x << " ";
    x -= 4;
    cout << x << " ";
    x /= 2;
    cout << x << " ";
    x %= 7;
    cout << x << endl;
    return 0;
}`,
  },
];

function PracticeProblem({ problem }) {
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
}

function PracticeStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      {practiceProblems.map((problem) => (
        <PracticeProblem key={problem.title} problem={problem} />
      ))}
    </div>
  );
}

// 10. 小结与课后任务
function SummaryStage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
        <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
          <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
            <span className="rounded-lg bg-yellow-400 p-2 text-white"><CheckCircle size={24} /></span> 本课要点
          </p>
          <ol className="space-y-4 text-slate-700">
            {[
              '= 是赋值：先算右边，再存进左边；左边必须是变量。',
              '赋值表达式的值就是赋值后的左边，所以 b = a = 4 从右往左执行。',
              'a op= x 等价于 a = a op (x)，右边整体先算。',
              'x++ 先用旧值再加 1；++x 先加 1 再用新值。单独成句时效果相同。',
              '逗号表达式从左到右依次计算，值是最后一项；它的优先级最低，通常要加括号。',
              '交换两个变量要借第三个变量备份：t = a; a = b; b = t;。',
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
            <BookOpen size={20} /> 课后任务
          </strong>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
              <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
              <div>
                <strong className="mb-1 block text-yellow-900">手推任务</strong>
                <p className="text-sm text-yellow-900">手推 int i = 1, s = 0; s += i++; s += ++i; 每一行之后 i 和 s 的值，最后输出 i 和 s，再编译运行核对。</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
              <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
              <div>
                <strong className="mb-1 block text-yellow-900">上机任务</strong>
                <p className="text-sm text-yellow-900">完成“复合赋值连算”，再自己补测 x = 1000，先手算五个输出，再运行核对。</p>
              </div>
            </label>
          </div>
        </div>

        <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
          下一课：格式化输入输出。用 printf 控制宽度、补零和小数位，用 scanf 读入数据。
        </p>
      </div>
    </div>
  );
}
