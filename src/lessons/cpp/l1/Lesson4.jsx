import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  Users,
  Scissors,
  Percent,
  AlertCircle,
  Calculator,
  Clock,
  Check,
  X,
  ArrowRight,
  Menu
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "users": <Users size={size} color={color} />,
    "scissors": <Scissors size={size} color={color} />,
    "percent": <Percent size={size} color={color} />,
    "alert": <AlertCircle size={size} color={color} />,
    "calculator": <Calculator size={size} color={color} />,
    "clock": <Clock size={size} color={color} />,
    "check": <Check size={size} color={color} />,
    "x": <X size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />
  };
  return icons[name] || null;
};

const lesson4MasteryItems = [
  {
    label: '能写出常见字面量的类型。',
    evidence: '10 是 int，3.0 是 double，\'3\' 是 char，"3" 是字符串字面量，true 是 bool。',
    retryHint: '回到“五种基本类型”，重做字面量分类练习。',
  },
  {
    label: '能判断除法的结果是整数还是小数。',
    evidence: '能预测 7 / 2 得 3、7 / 2.0 得 3.5、0.0 + 7 / 2 得 3，并说明 (double)a / b 与 (double)(a / b) 的区别。',
    retryHint: '回到“整数除法与小数除法”，先圈出每个 / 两边的类型。',
  },
  {
    label: '能说明小数存入 int 后的值。',
    evidence: '知道 2.9 存入 int 得 2、-2.9 存入 int 得 -2：向 0 截断，不四舍五入。',
    retryHint: '回到“小数存入 int：向 0 截断”，在整数盒子里输入 -2.9 和 0.6。',
  },
  {
    label: '能按要求输出固定位数的小数。',
    evidence: '能写出 #include <iomanip> 和 cout << fixed << setprecision(2) << x;，并说明 80.5 会显示成 80.50。',
    retryHint: '回到“保留小数输出”，把 setprecision 的参数改成 1、2、3 各预测一次。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：平均分为什么少了 0.5", icon: "calculator", category: "类型" },
  { id: 2, title: "五种基本类型", icon: "users", category: "类型" },
  { id: 3, title: "整数除法与小数除法", icon: "percent", category: "转换" },
  { id: 4, title: "小数存入 int：向 0 截断", icon: "scissors", category: "转换" },
  { id: 5, title: "真题：2024 年 3 月一级第 11 题", icon: "check", category: "转换" },
  { id: 6, title: "保留小数输出", icon: "calculator", category: "输出" },
  { id: 7, title: "char 与 bool", icon: "arrow-right", category: "输出" },
  { id: 8, title: "常见错误与真题", icon: "alert", category: "输出" },
  { id: 9, title: "上机：平均分的小数 / 两种除法", icon: "users", category: "输出" },
  { id: 10, title: "阶段诊断 A", icon: "clock", category: "诊断" },
  { id: 11, title: "小结与课后任务", icon: "check", category: "小结与检查" },
  {
    id: 12,
    title: "离开前检查",
    icon: "check",
    category: "小结与检查",
  },
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
                onClick={() => choose(opt)}
                disabled={selected !== null}
                className={`relative rounded-lg border-2 p-4 pr-12 text-left transition-all ${stateClass}`}
              >
                <span className="mr-2 inline-block w-6 font-bold">{opt.id}.</span>
                <span className={mono ? 'break-all font-mono text-sm' : ''}>{opt.text}</span>
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
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-blue-600" />
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
      <p className="text-lg text-gray-600">两次测验分别得 80 分和 81 分，平均分应该是 80.5。程序却输出了 80。</p>
    </div>

    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <CodePanel>{`int a = 80, b = 81;
cout << (a + b) / 2 << endl;`}</CodePanel>
    </div>

    <PredictCheck
      className="w-full max-w-3xl"
      prompt="这段程序输出什么？"
      options={['80', '80.5', '81', '编译错误']}
      correctIndex={0}
      explanation="a + b = 161。161 和 2 都是 int，/ 做的是整数除法：161 / 2 = 80，0.5 被舍去。"
      misconception="以为“答案应该是小数，C++ 就会自动给出小数”。结果是什么类型，由参与运算的数的类型决定。"
    />

    <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      第 3 课的运算全是整数。本课学会判断“结果是什么类型”：<strong>五种基本类型 → 整数除法与小数除法 → 小数存入 int → 保留小数输出 → char 与 bool</strong>，最后完成“平均分的小数”和“两种除法”，并做一次阶段诊断。
    </div>
  </div>
);

// --- 2. 五种基本类型 ---
const typeRows = [
  { type: 'int', holds: '整数', literal: '10、-3、0', size: '通常 4' },
  { type: 'double', holds: '小数（双精度）', literal: '3.0、2.5、-0.6', size: '通常 8' },
  { type: 'float', holds: '小数（单精度）', literal: '一级少见', size: '通常 4' },
  { type: 'char', holds: '单个字符', literal: "'3'、'A'", size: '1（标准规定）' },
  { type: 'bool', holds: '真或假', literal: 'true、false', size: '—' },
];

const literalItems = [
  { text: '10', answer: 'int', reason: '没有小数点、没有引号的整数。' },
  { text: '3.0', answer: 'double', reason: '带小数点就是 double，即使小数部分是 0。' },
  { text: "'3'", answer: 'char', reason: '单引号里一个字符。' },
  { text: '"3"', answer: '字符串', reason: '双引号括起来的是字符串字面量，不是数。' },
  { text: 'true', answer: 'bool', reason: 'true、false 是 bool 的两个取值。' },
];

const literalChoices = ['int', 'double', 'char', '字符串', 'bool'];

const LiteralTypeQuiz = () => {
  const [answers, setAnswers] = useState({});
  const done = literalItems.filter((item) => answers[item.text] === item.answer).length;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-800">课堂练习：写出字面量的类型</h3>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-600">已答对 {done} / {literalItems.length}</span>
      </div>
      <div className="space-y-3">
        {literalItems.map((item) => {
          const chosen = answers[item.text];
          const isRight = chosen === item.answer;
          return (
            <div key={item.text} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <code className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-mono font-bold text-slate-800">{item.text}</code>
                {literalChoices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    aria-pressed={chosen === choice}
                    onClick={() => setAnswers({ ...answers, [item.text]: choice })}
                    className={`rounded-lg border-2 px-3 py-1 text-sm font-bold transition-colors ${chosen === choice
                      ? (isRight ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800')
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'}`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              {chosen && (
                <p className={`mt-2 text-sm ${isRight ? 'text-green-800' : 'text-red-700'}`}>
                  {isRight ? `正确：${item.reason}` : `再想一想：${item.text} 不是 ${chosen}。`}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-gray-500">题源之一：站内题库 2023 年 6 月一级第 3 题（常量 '3' 的数据类型是 char，来源待核）。</p>
    </div>
  );
};

const TypesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">一级常用的基本类型</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[32rem] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-4 bg-slate-800 text-sm font-bold text-white">
            <div className="p-3">类型</div>
            <div className="p-3">存什么</div>
            <div className="p-3">字面量示例</div>
            <div className="p-3">常见字节数</div>
          </div>
          {typeRows.map((row) => (
            <div key={row.type} className="grid grid-cols-4 border-t border-slate-200 text-sm text-slate-700">
              <div className="p-3 font-mono font-bold text-slate-900">{row.type}</div>
              <div className="p-3">{row.holds}</div>
              <div className="p-3 font-mono">{row.literal}</div>
              <div className="p-3">{row.size}</div>
            </div>
          ))}
          <div className="grid grid-cols-4 border-t border-slate-200 bg-amber-50 text-sm text-amber-950">
            <div className="p-3 font-bold">字符串字面量</div>
            <div className="p-3">一串字符（不是变量类型）</div>
            <div className="p-3 font-mono">"3"、"Hello"</div>
            <div className="p-3">—</div>
          </div>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3"><code>3.0</code> 和 <code>3</code> 值相等，但一个是 double、一个是 int，占用的空间也不同。</li>
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3"><code>long long</code> 是范围更大的整数类型，本课只认识名字。</li>
      </ul>
    </div>

    <LiteralTypeQuiz />
  </div>
);

// --- 3. 整数除法与小数除法 ---
const divisionRows = [
  { code: '5 / 2', result: '2', note: '两边都是 int：整数除法' },
  { code: '5.0 / 2', result: '2.5', note: '左边是 double：小数除法' },
  { code: '5 / 2.0', result: '2.5', note: '右边是 double：小数除法' },
  { code: '1.0 * 5 / 2', result: '2.5', note: '从左到右：1.0 * 5 先得 5.0，再除以 2' },
  { code: '17 / 5', result: '3', note: '第 3 课的整数除法' },
  { code: '17 / 5.0', result: '3.4', note: '改成 5.0 后保留小数' },
];

const DivisionTypesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center shadow-sm">
      <p className="text-lg font-bold text-blue-900">规则：两个 int 运算，结果是 int；只要有一个是 double，结果就是 double。</p>
      <p className="mt-2 text-sm text-blue-950">判断时看的是每一个运算符两边的类型，而不是“最后想要什么答案”。</p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（前四行）</p>
        <CodePanel>{`int a = 7, b = 2;
cout << a / b << endl;
cout << a / 2.0 << endl;
cout << (double)a / b << endl;
cout << (double)(a / b) << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`3
3.5
3.5
3`}</OutputPanel>
      </div>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-2 font-bold text-green-900"><code>(double)a / b</code>：先转换，再除</h3>
        <p className="text-sm leading-relaxed text-green-950">a 先变成 7.0，7.0 / 2 是小数除法，得 3.5。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <h3 className="mb-2 font-bold text-red-900"><code>(double)(a / b)</code>：已经晚了</h3>
        <p className="text-sm leading-relaxed text-red-950">括号里先做整数除法得 3，再转成 3.0，cout 显示 3。0.5 在转换之前就丢了。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 font-bold text-slate-800">对照表</h3>
      <div className="grid grid-cols-1 gap-3">
        {divisionRows.map((row) => (
          <div key={row.code} className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border-l-8 p-3 ${row.result.includes('.') ? 'border-green-500 bg-green-50' : 'border-slate-400 bg-slate-50'}`}>
            <code className="font-mono text-lg font-bold text-slate-800">{row.code}</code>
            <span className={`text-lg font-bold ${row.result.includes('.') ? 'text-green-700' : 'text-slate-600'}`}>{row.result}</span>
            <span className="w-full text-sm text-slate-600 md:w-1/2 md:text-right">{row.note}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-700">强制转换的写法：<code>(double)a</code>、<code>double(a)</code>、<code>(int)x</code>、<code>int(x)</code>。</p>
    </div>

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 6 月一级第 12 题）"
      question="如果 a 为 int 类型且值为 7, b 为 int 类型且值为 2，计算结果不是 3.5 的表达式："
      mono
      options={[
        { id: 'A', text: '0.0+a / b', isCorrect: true },
        { id: 'B', text: '(double)a / b' },
        { id: 'C', text: 'a / (double)b' },
        { id: 'D', text: 'a / 2.0' },
      ]}
      explanation="/ 比 + 先算：a / b 两边都是 int，先得 3，再算 0.0 + 3 = 3.0，cout 显示 3。B、C、D 都是在除之前就让一边成为 double，结果是 3.5。"
    />
  </div>
);

// --- 4. 小数存入 int：向 0 截断 ---
const IntBox = () => {
  const [inputValue, setInputValue] = useState('-2.9');
  const trimmed = inputValue.trim();
  const parsedValue = Number(trimmed);
  const validInput = trimmed !== '' && Number.isFinite(parsedValue) && Math.abs(parsedValue) <= 1000000;
  const intValue = validInput ? Math.trunc(parsedValue) + 0 : null;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">整数盒子实验：int a = 输入的数;</h3>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex flex-col gap-2">
          <label htmlFor="l1-4-int-input" className="text-sm font-bold text-gray-700">存进 int 的数：</label>
          <input
            id="l1-4-int-input"
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-40 rounded-xl border-2 border-gray-300 p-3 text-center text-2xl focus:border-blue-500 outline-none"
          />
        </div>
        <ArrowRight className="hidden h-10 w-10 text-gray-400 md:block" />
        <div className="flex h-36 w-48 flex-col items-center justify-center rounded-2xl border-4 border-yellow-400 bg-yellow-50 shadow-lg">
          <span className="text-xs font-bold text-gray-500">int a</span>
          <span role="status" className="text-5xl font-bold text-gray-800">{validInput ? intValue : '?'}</span>
        </div>
      </div>
      <p className={`mt-4 text-center text-sm ${validInput ? 'text-gray-600' : 'text-red-700'}`}>
        {validInput
          ? (Number.isInteger(parsedValue) ? '整数原样保存。' : `小数部分被直接去掉：${trimmed} → ${intValue}（向 0 截断）。`)
          : '请输入绝对值不超过 1000000 的数；空白或非法输入不显示结果。'}
      </p>
    </div>
  );
};

const MiniCase = ({ num, res, highlight }) => (
  <div className={`flex flex-col items-center rounded-lg border p-3 ${highlight ? 'border-red-300 bg-red-50 shadow-md' : 'border-gray-200 bg-white'}`}>
    <span className="text-[10px] uppercase text-gray-500">存入 int</span>
    <span className="text-base font-bold">{num}</span>
    <ArrowRight className="my-1 rotate-90 text-gray-300" size={14} />
    <span className={`text-base font-bold ${highlight ? 'text-red-600' : 'text-blue-600'}`}>{res}</span>
  </div>
);

const TruncateSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（末行）</p>
        <CodePanel>{`int c = 2.9, d = -2.9;
cout << c << " " << d << endl;`}</CodePanel>
        <p className="mt-2 text-xs text-slate-500">编译器对这行只给警告，仍能编译运行。</p>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'2 -2'}</OutputPanel>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-center text-xl font-bold text-slate-800">向 0 截断：去掉小数部分，不四舍五入</h3>
      <p className="text-center text-sm text-slate-600">正数往小的方向去，负数往大的方向去，结果都更靠近 0。</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <MiniCase num="2.9" res="2" />
        <MiniCase num="-2.9" res="-2（不是 -3）" highlight />
        <MiniCase num="0.6" res="0" />
        <MiniCase num="3.14" res="3" />
      </div>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        负数的整数除法也向 0 截断：<code>-7 / 2</code> 得 -3，<code>-7 % 2</code> 得 -1（余数和被除数同号）。
      </p>
    </div>

    <IntBox />

    <div className="grid w-full gap-6 md:grid-cols-2">
      <QuizCard
        badge="课堂练习"
        source="课堂练习"
        question="执行语句 int a = 0.6; 后，变量 a 的值为（ ）。"
        options={[
          { id: 'A', text: '0.6' },
          { id: 'B', text: '0', isCorrect: true },
          { id: 'C', text: '1' },
          { id: 'D', text: '报错' },
        ]}
        explanation="int 只存整数，0.6 存入时去掉小数部分得 0；不会四舍五入成 1，也不会报错（只有警告）。"
      />
      <QuizCard
        badge="课堂练习"
        source="站内题库 · 来源待核（2023 年 9 月一级判断题第 3 题）"
        question="C++ 表达式 int(3.14) 的值为 3。"
        options={judgeOptions(true)}
        explanation="int(3.14) 是强制转换，把 3.14 转成 int，小数部分去掉，得 3。"
      />
    </div>
  </div>
);

// --- 5. 真题：2024 年 3 月一级第 11 题 ---
const ExamCastSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：哪一条赋值语句不合法</h3>
      <p className="mt-1 text-slate-500">“会截断”和“不能编译”是两回事，先分清。</p>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级第 11 题"
      question="下面关于整型变量 int x 的赋值语句不正确的是（ ）。"
      mono
      options={[
        { id: 'A', text: 'x=(3.16);' },
        { id: 'B', text: 'x=3.16;' },
        { id: 'C', text: 'x=int(3.16);' },
        { id: 'D', text: 'x=3.16 int;', isCorrect: true },
      ]}
      explanation="A、B 把 3.16 存进 int，会截断成 3，能编译（通常只有警告）；C 是强制转换写法，也得 3。D 把类型名 int 写在数的后面，不符合 C++ 语法，编译失败。"
    />

    <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
      <strong className="mb-1 block text-amber-800">记住两种合法的转换写法</strong>
      <code>int(3.16)</code> 和 <code>(int)3.16</code>，类型名都写在前面。
    </div>
  </div>
);

// --- 6. 保留小数输出 ---
const DecimalOutputSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2</p>
        <CodePanel>{`#include <iostream>
#include <iomanip>   // setprecision 需要它
using namespace std;

int main() {
    double avg = (80 + 81) / 2.0;
    cout << avg << endl;
    cout << fixed << setprecision(2) << avg << endl;
    return 0;
}`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`80.5
80.50`}</OutputPanel>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3"><code>(80 + 81) / 2.0</code>：除数是 2.0，做小数除法，得 80.5。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">cout 默认不显示末尾多余的 0：2.5 显示 <code>2.5</code>，80.0 显示 <code>80</code>。</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3"><code>fixed &lt;&lt; setprecision(n)</code>：固定显示 n 位小数（第 n 位之后四舍五入）。</li>
        </ul>
      </div>
    </div>

    <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
      <strong className="mb-1 block text-amber-800">设置一次，后面一直有效</strong>
      写过 <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code> 之后，后面再输出的小数都显示两位，例如再写 <code>cout &lt;&lt; 3.0;</code> 会显示 <code>3.00</code>。第 6 课的 <code>printf("%.2f", avg)</code> 也能保留两位小数。
    </div>

    <PredictCheck
      className="w-full"
      prompt="cout << fixed << setprecision(1) << (100 + 100) / 2.0; 输出什么？"
      options={['100', '100.0', '100.00', '100.5']}
      correctIndex={1}
      explanation="(100 + 100) / 2.0 = 100.0；fixed 加 setprecision(1) 固定显示 1 位小数，所以是 100.0。题目要求“固定一位小数”时，100 也必须写成 100.0。"
      misconception="以为整数结果不会显示小数位；用了 fixed 之后，小数位数是固定的。"
    />
  </div>
);

// --- 7. char 与 bool ---
const CharLiteralCheck = () => {
  const [feedback, setFeedback] = useState(null);
  const choices = [
    { text: '"A"', key: 'string', message: '"A" 是字符串字面量（双引号）。需要一个字符时写 \'A\'。', ok: false },
    { text: "'A'", key: 'char', message: "正确：'A' 是 char 字面量，单引号里恰好一个字符。", ok: true },
    { text: 'A', key: 'name', message: '没有引号的 A 是一个名字（标识符）；没有定义变量 A 时会编译出错。', ok: false },
    { text: "'AB'", key: 'multi', message: "'AB' 是多字符字面量，类型是 int，值由编译器决定，不能当作一个字符使用。", ok: false },
  ];
  const current = choices.find((choice) => choice.key === feedback);

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">课堂练习：哪一个能赋给 char c？</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {choices.map((choice) => (
          <button
            key={choice.key}
            type="button"
            aria-pressed={feedback === choice.key}
            onClick={() => setFeedback(choice.key)}
            className={`rounded-xl border-2 p-4 font-mono text-xl font-bold transition-all ${feedback === choice.key
              ? (choice.ok ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-400 bg-red-50 text-red-800')
              : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-md'}`}
          >
            {choice.text}
          </button>
        ))}
      </div>
      {current && (
        <p role="status" className={`mt-4 rounded-lg p-3 text-sm font-medium ${current.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{current.message}</p>
      )}
    </div>
  );
};

const LetterCard = () => {
  const [letter, setLetter] = useState('A');
  const validLetter = /^[A-Za-z]$/.test(letter);

  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
        <h3 className="mb-2 text-lg font-bold text-gray-800">页内练习：字符名片</h3>
        <p className="mb-3 text-sm leading-relaxed text-gray-700">读入一个英文字母，输出一行 <code>Letter: c</code>（c 换成读入的字母，冒号后有一个空格，大小写不变）。样例：<code>A</code> → <code>Letter: A</code>；<code>z</code> → <code>Letter: z</code>。</p>
        <CodePanel>{`char c;
cin >> c;
cout << "Letter: " << c << endl;`}</CodePanel>
      </div>
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <label htmlFor="l1-4-letter" className="mb-2 block text-sm font-bold text-blue-900">模拟输入一个英文字母</label>
        <input id="l1-4-letter" type="text" maxLength={1} value={letter} onChange={(event) => setLetter(event.target.value)} className="w-20 rounded-lg border-2 border-blue-200 bg-white p-2 text-center font-mono text-2xl focus:border-blue-500 focus:outline-none" />
        <output aria-live="polite" className="mt-4 block rounded-lg bg-slate-900 px-4 py-3 font-mono text-green-400">{validLetter ? `Letter: ${letter}` : '请输入 A～Z 或 a～z 中的一个字母'}</output>
      </div>
    </div>
  );
};

const CharBoolSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3：运行时输入 10</p>
        <CodePanel>{`char c;
bool ok = (3 > 2);
cin >> c;
cout << c << " " << ok << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'1 1'}</OutputPanel>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">c 是 char，<code>cin &gt;&gt; c</code> 只读走一个字符 '1'，后面的 0 留在输入里；<code>3 &gt; 2</code> 成立，bool 变量 ok 输出 1。</p>
      </div>
    </div>

    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-blue-900">char：一个字符</h3>
        <ul className="space-y-2 text-sm leading-relaxed text-blue-950">
          <li className="rounded-lg border border-blue-100 bg-white p-3">用单引号：<code>char c = 'A';</code>；<code>'A'</code> 和 <code>"A"</code> 不同。</li>
          <li className="rounded-lg border border-blue-100 bg-white p-3"><code>cin &gt;&gt; c</code> 只读入一个字符；<code>cout &lt;&lt; c</code> 原样输出这个字符。</li>
        </ul>
      </div>
      <div className="min-w-0 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-amber-900">bool：真或假</h3>
        <ul className="space-y-2 text-sm leading-relaxed text-amber-950">
          <li className="rounded-lg border border-amber-100 bg-white p-3">只有 <code>true</code> 和 <code>false</code> 两个值；cout 默认显示 1 和 0。</li>
          <li className="rounded-lg border border-amber-100 bg-white p-3">比较的结果就是 bool：<code>bool even = (n % 2 == 0);</code>，n 为 6 时 even 是 1。</li>
        </ul>
      </div>
    </div>

    <CharLiteralCheck />
    <LetterCard />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 3 月一级判断题第 3 题）"
      question={'执行如下C++代码如果在键盘上输入10，执行后将输出20。\nchar N;\ncin >> N;\nprintf("%d\\n", N * 2);'}
      options={judgeOptions(false)}
      explanation="N 是 char，输入 10 时只读入第一个字符 '1'，N 里存的不是整数 10，所以 N * 2 不会是 20。字符参与运算时用的是它的编码值，ASCII 速查和字符运算是二级前瞻选学。"
    />
  </div>
);

// --- 8. 常见错误与真题 ---
const pitfalls = [
  ['(double)(a / b)', '括号里先做了整数除法，转换已经晚了；要写 (double)a / b。'],
  ['3.0 和 3', '值相等，但类型不同（double 与 int），占用空间也不同。'],
  ['cout << 2.5', '默认显示 2.5，不会自动显示成 2.50；要固定位数用 fixed 和 setprecision。'],
  ["'A' 与 \"A\"", '单引号是一个字符，双引号是字符串；\'AB\' 不是一个字符。'],
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 text-center text-2xl font-bold text-slate-800">类型与转换常见错误</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {pitfalls.map(([code, detail]) => (
          <div key={code} className="rounded-xl border border-red-100 bg-red-50 p-5 transition-colors hover:bg-red-100">
            <code className="mb-2 block rounded border border-red-200 bg-white px-2 py-1 text-center font-mono text-lg">{code}</code>
            <div className="text-xs font-medium leading-relaxed text-red-700">{detail}</div>
          </div>
        ))}
      </div>
    </div>

    <QuizCard
      source="2024 年 3 月 GESP C++ 一级判断题第 4 题"
      question={'C++ 表达式 "10"*2 执行时将报错，因为 "10" 是字符串类型而 2 是整数类型，它们数据类型不同，不能在一起运算。（ ）'}
      options={judgeOptions(true)}
      explanation={'"10" 是字符串字面量，不是数 10，不能和整数相乘，这一行通不过编译。想算 10 × 2 要写 10 * 2。'}
    />
    <QuizCard
      source="2024 年 3 月 GESP C++ 一级判断题第 7 题"
      question="C++ 语言中 3.0 和 3 的值相等，所以它们占用的存储空间也相同。（ ）"
      options={judgeOptions(false)}
      explanation="3.0 是 double（通常 8 字节），3 是 int（通常 4 字节）。值相等不代表类型和占用空间相同。"
    />
    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 1 题"
      question="在 C++ 代码中变量 X 被赋值为 16.44，则 cout << X / 10 执行后输出的一定是 1。（ ）"
      options={judgeOptions(false)}
      explanation="题目没有给出 X 的类型。若 X 是 double，X / 10 是小数除法，输出 1.644；只有 X 是 int（16.44 被截成 16）时才输出 1。所以“一定”不成立。"
    />
    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 3 题"
      question="定义 C++ 的 float 型变量 N，则语句 cin >> N; cout << int(float(N)) 可以输入正负整数和浮点数，并将其转换为整数后输出。（ ）"
      options={judgeOptions(true)}
      explanation="float 变量能读入正负整数和小数；int(...) 把它向 0 截断成整数再输出，例如输入 -2.7 输出 -2。"
    />
    <QuizCard
      source="2024 年 9 月 GESP C++ 一级判断题第 9 题"
      question="在 C++ 语言中，整型、实数型、字符型、布尔型是不相同的数据类型，但这四种类型的变量间都可以比较大小。"
      options={judgeOptions(true)}
      explanation="不同类型的数比较时，会先转换成同一种类型再比较：char 按字符的编码值，bool 的 true、false 按 1、0。所以这四种类型之间都能写 <、> 比较。"
    />
  </div>
);

// --- 9. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 4-A',
    title: '平均分的小数',
    statement: '输入一行两个整数 a、b（0 ≤ a, b ≤ 100），是两次测验的分数。输出平均分，固定保留一位小数。',
    samples: [['80 81', '80.5'], ['100 100', '100.0']],
    hint: '除数写成 2.0；用 fixed 和 setprecision(1) 固定一位小数，别忘了 #include <iomanip>。',
    code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << fixed << setprecision(1) << (a + b) / 2.0 << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 4-B',
    title: '两种除法',
    statement: '输入一行两个整数 a、b（-1000 ≤ a ≤ 1000，1 ≤ b ≤ 100）。第一行输出 a / b 的整数结果，第二行输出精确的商，保留两位小数。',
    samples: [['7 2', '3\n3.50'], ['-7 2', '-3\n-3.50']],
    hint: '第一行直接 a / b；第二行要先转换再除：(double)a / b。负数的整数除法向 0 截断。',
    code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a / b << endl;
    cout << fixed << setprecision(2) << (double)a / b << endl;
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
              <div className="whitespace-pre-line rounded-lg border border-green-200 bg-green-50 p-2 font-bold text-green-800">{`输出：${output.includes('\n') ? '\n' : ''}${output}`}</div>
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">提示：{problem.hint}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="font-bold text-green-800">参考程序</h3>
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

// --- 10. 阶段诊断 A ---
const diagnosisItems = [
  {
    source: '2024 年 3 月 GESP C++ 一级第 13 题',
    question: '在 Dev C++ 中对一个写好的 C++ 源文件要生成一个可执行程序需要执行下面哪个处理步骤？（ ）',
    options: [
      { id: 'A', text: '创建' },
      { id: 'B', text: '编辑' },
      { id: 'C', text: '编译', isCorrect: true },
      { id: 'D', text: '调试' },
    ],
    explanation: '源文件要经过编译器编译，才能生成可执行程序；编辑是写代码，调试是查找错误。',
    retry: '第 1 课「第一次运行」：保存 → 编译 → 运行 → 核对输出。',
  },
  {
    source: '2024 年 9 月 GESP C++ 一级判断题第 8 题',
    question: '在 C++ 代码中，不可以将变量命名为 five-star，因为变量名中不可以出现 -（减号）符号。',
    options: judgeOptions(true),
    explanation: '变量名只能由字母、数字和下划线组成，减号会被当成减法运算符。',
    retry: '第 2 课「变量命名三规则」。',
  },
  {
    source: '2024 年 3 月 GESP C++ 一级第 1 题',
    question: 'C++ 表达式 (3 - 2) * 3 + 5 的值是（ ）。',
    options: [
      { id: 'A', text: '-13' },
      { id: 'B', text: '8', isCorrect: true },
      { id: 'C', text: '2' },
      { id: 'D', text: '0' },
    ],
    explanation: '括号最先：3 - 2 = 1；再乘：1 * 3 = 3；最后加：3 + 5 = 8。',
    retry: '第 3 课「运算优先级与结合」。',
  },
  {
    source: '2024 年 9 月 GESP C++ 一级第 5 题',
    question: '在 C++ 中，假设 N 为正整数 10，则 cout << (N / 3 + N % 3) 将输出（ ）。',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '4.3' },
      { id: 'C', text: '4', isCorrect: true },
      { id: 'D', text: '2' },
    ],
    explanation: '10 / 3 = 3（整数除法），10 % 3 = 1，3 + 1 = 4。',
    retry: '第 3 课「整除与取余」：/ 求商和 % 求余数；再到「时间换算与周期」练习把生活问题翻译成商和余数。',
  },
  {
    source: '2024 年 3 月 GESP C++ 一级判断题第 1 题',
    question: '在 C++ 代码中变量 n 被赋值为 27，则 cout << n%10 执行后输出的是 7。（ ）',
    options: judgeOptions(true),
    explanation: '对非负整数，n % 10 取个位：27 % 10 = 7。',
    retry: '第 3 课「拆分固定位数」。',
  },
  {
    source: '2024 年 6 月 GESP C++ 一级判断题第 2 题',
    question: 'C++ 的整型变量 N 被赋值为 10，则语句 cout << N / 4 << "->" << N % 4 << "->" << N / 4.0 执行后输出是 2->2->2.0。（ ）',
    options: judgeOptions(false),
    explanation: 'N / 4 = 2，N % 4 = 2，但 N / 4.0 是小数除法，结果 2.5，所以实际输出 2->2->2.5。',
    retry: '第 4 课「整数除法与小数除法」。',
  },
];

const DiagnosisSlide = () => {
  const [results, setResults] = useState({});
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(Boolean).length;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg">
        <h3 className="text-2xl font-bold text-slate-800">阶段诊断 A：第 1～4 课</h3>
        <p className="mt-2 text-slate-600">6 道站内真题，覆盖程序运行、命名、优先级、整除取余和类型。答错的题会告诉你回到哪一课哪一节。</p>
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
          retry={item.retry}
          onAnswer={(isCorrect) => setResults((prev) => ({ ...prev, [index]: isCorrect }))}
        />
      ))}
    </div>
  );
};

// --- 11. 小结与课后任务 ---
const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><Check size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '字面量的类型：10 是 int，3.0 是 double，\'3\' 是 char，"3" 是字符串字面量，true 是 bool。',
            '两个 int 运算结果是 int；只要一边是 double，结果就是 double。',
            '(double)a / b 先转换再除；(double)(a / b) 已经先做了整数除法。',
            '小数存入 int 向 0 截断：2.9 → 2，-2.9 → -2；-7 / 2 得 -3。',
            '固定位数输出：#include <iomanip>，cout << fixed << setprecision(n)，设置后一直有效。',
            'char 用单引号、cin 只读一个字符；bool 只有 true / false，cout 显示 1 / 0。',
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
          <Calculator size={20} /> 课后任务
        </strong>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">类型任务</strong>
              <p className="text-sm text-yellow-900">写出 0、0.0、'0'、"0"、false 五个字面量的类型，并各说一句理由。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">上机任务</strong>
              <p className="text-sm text-yellow-900">完成“两种除法”，用 7 2、-7 2 和 9 4 三组输入核对输出；再把 (double)a / b 改成 (double)(a / b)，观察第二行变成什么。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课：赋值与自增自减。本课只算出值；第 5 课学怎样改变变量本身的值（<code>+=</code>、<code>++</code>）。
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
      case 2: return <TypesSlide />;
      case 3: return <DivisionTypesSlide />;
      case 4: return <TruncateSlide />;
      case 5: return <ExamCastSlide />;
      case 6: return <DecimalOutputSlide />;
      case 7: return <CharBoolSlide />;
      case 8: return <MistakesSlide />;
      case 9: return <PracticeSlide />;
      case 10: return <DiagnosisSlide />;
      case 11: return <SummarySlide />;
      case 12: return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：int x = -3.9; cout << x; 输出什么？如果写 double y = -3.9; cout << (int)y; 呢？"
                hint="小数变成 int 时，直接去掉小数部分，结果更靠近 0。"
                answer="两次都输出 -3。"
                steps={[
                    'x 是 int，-3.9 存入时去掉小数部分，得 -3（不是 -4）。',
                    'y 是 double，保存 -3.9；(int)y 把它转换成 int，同样向 0 截断得 -3。',
                    '向 0 截断不是四舍五入，也不是“往小取”。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-4 数据类型与类型转换离开前检查"
              description="如果能写出字面量的类型、判断除法结果是整数还是小数、说明小数存入 int 的结果，并按要求输出固定位数的小数，就可以进入第 5 课：赋值与自增自减。"
              items={lesson4MasteryItems}
            />
          </div>
        );
      default: return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 / 和 % 求整数的商和余数', '能按优先级手算整数表达式', '会用 cin 读入、cout 输出变量']}
      lessonNumber={4}
      lessonTitle="数据类型与类型转换"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/5"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={4} />}
      bottomSupport={<CppL1LessonSupport lessonId={4} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
