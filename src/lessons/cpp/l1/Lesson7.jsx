import React, { useState } from 'react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, PredictCheck, TransferCheck } from '../CppLessonShell';
import {
  Siren,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Utensils,
  Ruler,
  Terminal,
  BookOpen,
  Code2,
  AlertOctagon,
  Scale,
  Menu,
  X
} from 'lucide-react';

// --- 图标映射 ---
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    "branch": <GitBranch size={size} color={color} />,
    "alert": <AlertTriangle size={size} color={color} />,
    "check": <CheckCircle2 size={size} color={color} />,
    "x": <XCircle size={size} color={color} />,
    "help": <HelpCircle size={size} color={color} />,
    "arrow-right": <ArrowRight size={size} color={color} />,
    "ruler": <Ruler size={size} color={color} />,
    "terminal": <Terminal size={size} color={color} />,
    "book": <BookOpen size={size} color={color} />,
    "code": <Code2 size={size} color={color} />,
    "stop": <AlertOctagon size={size} color={color} />,
    "scale": <Scale size={size} color={color} />
  };
  return icons[name] || <HelpCircle size={size} color={color} />;
};

const lesson7MasteryItems = [
  {
    label: '能区分 = 与 ==。',
    evidence: '= 把右边的值存进左边；== 比较两边是否相等，结果是 bool，cout 显示 1 或 0。',
    retryHint: '回到“关系运算与 bool 结果”，把六个关系运算符逐个读成中文。',
  },
  {
    label: '能说出 &&、||、! 的真值规则和非零即真。',
    evidence: '&& 两边都真才真，|| 一边真就真，! 取反；整数转换成真假时，只有 0 是 false，2、-1 都是 true。',
    retryHint: '回到“逻辑运算”，对照真值表，再在真假判断实验里输入 0、5、-1。',
  },
  {
    label: '能解释 && 与 || 的短路求值。',
    evidence: '能说明 a 为 0 时 (a != 0 && 10 / a > 2) 的右边不执行；(m = 2) || (n = 5) 执行后 n 仍是 0。',
    retryHint: '回到“短路求值”，从左到右标出哪一部分没有执行。',
  },
  {
    label: '能指出 3 < x < 5 的实际含义。',
    evidence: '知道它按 (3 < x) < 5 计算，结果总是 1；区间要写成 x > 3 && x < 5，同理 1 < x < 10 要写成 x > 1 && x < 10。',
    retryHint: '回到“链式比较陷阱”，拖动 x 看两种理解的差别。',
  },
  {
    label: '能写出闰年条件。',
    evidence: '能写出 (y % 4 == 0 && y % 100 != 0) || y % 400 == 0，并用 1900、2000、2024 验证。',
    retryHint: '回到“把文字条件翻译成表达式”，在闰年实验里逐个输入三个年份。',
  },
];

// --- 章节数据 ---
const sections = [
  { id: 1, title: "问题导入：8 到 12 岁怎么写", icon: "help", category: "关系运算" },
  { id: 2, title: "关系运算与 bool 结果", icon: "scale", category: "关系运算" },
  { id: 3, title: "逻辑运算", icon: "branch", category: "逻辑运算" },
  { id: 4, title: "短路求值", icon: "arrow-right", category: "逻辑运算" },
  { id: 5, title: "运算优先级", icon: "ruler", category: "逻辑运算" },
  { id: 6, title: "链式比较陷阱", icon: "alert", category: "逻辑运算" },
  { id: 7, title: "真题：2024 年 9 月一级判断题第 10 题", icon: "check", category: "逻辑运算" },
  { id: 8, title: "把文字条件翻译成表达式", icon: "code", category: "条件翻译" },
  { id: 9, title: "真题：2024 年 6 月一级判断题第 9 题", icon: "check", category: "条件翻译" },
  { id: 10, title: "常见错误与真题", icon: "x", category: "条件翻译" },
  { id: 11, title: "上机：活动资格 / 三角形判断", icon: "terminal", category: "条件翻译" },
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
              <HelpCircle size={16} className="mt-0.5 shrink-0 text-blue-600" />
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
      <h2 className="text-3xl font-bold text-gray-800">先看一道题</h2>
      <p className="text-lg text-gray-600">活动要求年龄在 8 到 12 岁之间（含 8 和 12）。数学里写成 8 ≤ x ≤ 12。照搬到 C++ 行不行？</p>
    </div>

    <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <CodePanel>{`int x = 20;
cout << (8 <= x <= 12) << endl;   // 照搬数学写法`}</CodePanel>
    </div>

    <PredictCheck
      className="w-full max-w-3xl"
      prompt="按 C++ 的计算规则，x = 20 时 (8 <= x <= 12) 的值是多少？"
      options={['1（真）', '0（假）', '20', '12']}
      correctIndex={0}
      explanation="C++ 从左到右算：先算 8 <= 20，成立得 1；再算 1 <= 12，成立得 1。20 根本不在 8～12 之间，结果却是真。这种连写不表示区间，正确写法是 x >= 8 && x <= 12。（有的编译器会直接把这种连写判为错误。）"
      misconception="把数学里的连写不等式直接搬进 C++，以为它会同时检查两边。"
    />

    <div className="w-full max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-6 text-sm leading-relaxed text-blue-950 shadow-sm">
      <strong className="mb-2 block text-base text-blue-900">本课主线</strong>
      程序要根据输入作判断，先要会写“条件”。本课按顺序学：<strong>关系运算 → 逻辑运算与非零即真 → 短路 → 优先级 → 链式比较陷阱 → 把文字条件翻译成表达式</strong>，最后完成“活动资格”和“三角形判断”。
    </div>
  </div>
);

// --- 2. 关系运算与 bool 结果 ---
const relationRows = [
  ['>', '大于', '7 > 3', '1'],
  ['>=', '大于或等于', '7 >= 7', '1'],
  ['<', '小于', '7 < 3', '0'],
  ['<=', '小于或等于', '8 <= 7', '0'],
  ['==', '等于（两个等号）', '7 == 5', '0'],
  ['!=', '不等于', '7 != 5', '1'],
];

const ComparisonLab = () => {
  const [left, setLeft] = useState('5');
  const [right, setRight] = useState('3');
  const [op, setOp] = useState('>');
  const validOperand = (value) => /^-?\d{1,7}$/.test(value.trim()) && Math.abs(Number(value)) <= 1000000;
  const canCompare = validOperand(left) && validOperand(right);
  const a = Number(left);
  const b = Number(right);
  const resultMap = { '>': a > b, '>=': a >= b, '<': a < b, '<=': a <= b, '==': a === b, '!=': a !== b };
  const result = canCompare ? resultMap[op] : null;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">比较实验：cout &lt;&lt; (a 运算符 b);</h3>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <input type="text" inputMode="numeric" aria-label="左边的整数" value={left} onChange={(e) => setLeft(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <select aria-label="关系运算符" value={op} onChange={(e) => setOp(e.target.value)} className="rounded-lg border-2 border-gray-300 bg-white px-3 py-2 font-mono text-lg">
          {relationRows.map(([symbol]) => <option key={symbol} value={symbol}>{symbol}</option>)}
        </select>
        <input type="text" inputMode="numeric" aria-label="右边的整数" value={right} onChange={(e) => setRight(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <ArrowRight className="text-gray-400" />
        <span role="status" className={`rounded-lg px-4 py-2 font-mono text-lg font-bold ${result === null ? 'bg-amber-50 text-amber-800' : result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result === null ? '请输入两个整数' : result ? '1（成立）' : '0（不成立）'}
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">只接受绝对值不超过 1000000 的整数；空白和非法输入不会被当作 0。</p>
    </div>
  );
};

const RelationSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">六个关系运算符：==、!=、&gt;、&gt;=、&lt;、&lt;=</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[30rem] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-4 bg-slate-800 text-sm font-bold text-white">
            <div className="p-3">运算符</div>
            <div className="p-3">含义</div>
            <div className="p-3">例子</div>
            <div className="p-3">结果</div>
          </div>
          {relationRows.map(([symbol, meaning, example, value]) => (
            <div key={symbol} className="grid grid-cols-4 border-t border-slate-200 text-sm text-slate-700">
              <div className="p-3 font-mono text-lg font-bold text-slate-900">{symbol}</div>
              <div className="p-3">{meaning}</div>
              <div className="p-3 font-mono">{example}</div>
              <div className="p-3 font-mono font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3">关系运算的结果是 bool：成立为 true，cout 显示 1；不成立为 false，显示 0。</li>
        <li className="rounded-xl border border-slate-100 bg-slate-50 p-3"><code>=</code> 是赋值，<code>==</code> 才是比较。<code>&gt;=</code>、<code>&lt;=</code>、<code>!=</code> 两个符号之间不能有空格。</li>
      </ul>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（第一行）</p>
        <CodePanel>{`int x = 7;
cout << (x > 3) << " " << (x == 5) << endl;`}</CodePanel>
        <p className="mt-2 text-xs text-slate-500">用 cout 输出比较结果时要加括号，因为 &lt;&lt; 比 &gt;、== 先算。</p>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'1 0'}</OutputPanel>
      </div>
    </div>

    <ComparisonLab />
  </div>
);

// --- 3. 逻辑运算 ---
const truthRows = [
  ['真', '真', '1', '1'],
  ['真', '假', '0', '1'],
  ['假', '真', '0', '1'],
  ['假', '假', '0', '0'],
];

const TruthDetector = () => {
  const [value, setValue] = useState('0');
  const trimmed = value.trim();
  const validInput = /^-?\d+$/.test(trimmed) && Number.isSafeInteger(Number(trimmed)) && Math.abs(Number(trimmed)) <= 1000000;
  const isTrue = validInput && Number(trimmed) !== 0;

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-indigo-900">真假判断实验：整数当作条件时</h3>
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="l1-7-truth" className="text-sm text-gray-700">输入绝对值不超过 1000000 的整数：</label>
        <input
          id="l1-7-truth"
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-40 rounded-lg border-2 border-indigo-300 bg-white p-2 text-center text-3xl font-bold focus:border-indigo-500 focus:outline-none"
        />
        <div role="status" className="flex flex-wrap items-center justify-center gap-3 text-xl font-bold">
          {!validInput ? (
            <span className="rounded-full bg-amber-100 px-4 py-1 text-base text-amber-800">请输入绝对值不超过 1000000 的整数</span>
          ) : isTrue ? (
            <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-green-700"><CheckCircle2 size={22} /> true（!{trimmed} 是 0）</span>
          ) : (
            <span className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-1 text-red-700"><XCircle size={22} /> false（!0 是 1）</span>
          )}
        </div>
      </div>
    </div>
  );
};

const LogicSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
        <code className="text-2xl font-bold text-blue-900">&amp;&amp;</code>
        <p className="mt-2 text-sm font-bold text-blue-900">逻辑与（且）</p>
        <p className="mt-1 text-sm text-blue-950">两边都真，结果才真。</p>
      </div>
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
        <code className="text-2xl font-bold text-green-900">||</code>
        <p className="mt-2 text-sm font-bold text-green-900">逻辑或（或）</p>
        <p className="mt-1 text-sm text-green-950">只要有一边真，结果就真。</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <code className="text-2xl font-bold text-amber-900">!</code>
        <p className="mt-2 text-sm font-bold text-amber-900">逻辑非（不）</p>
        <p className="mt-1 text-sm text-amber-950">真变假，假变真。</p>
      </div>
    </div>

    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">&amp;&amp;、||、! 的真值表</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[24rem] overflow-hidden rounded-xl border border-slate-200">
          <div className="grid grid-cols-4 bg-slate-800 text-sm font-bold text-white">
            <div className="p-3">A</div>
            <div className="p-3">B</div>
            <div className="p-3">A &amp;&amp; B</div>
            <div className="p-3">A || B</div>
          </div>
          {truthRows.map((row) => (
            <div key={row.join('-')} className="grid grid-cols-4 border-t border-slate-200 text-sm text-slate-700">
              {row.map((cell, index) => <div key={index} className={`p-3 ${index >= 2 ? 'font-mono font-bold' : ''}`}>{cell}</div>)}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-slate-600"><code>!</code> 只有一个操作数：!真 = 0，!假 = 1。</p>
    </div>

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">非零即真</strong>
      整数放进逻辑运算或条件里时，会先转换成真假：<strong>只有 0 是 false</strong>，非 0 的数（如 5、-1）都是 true。运算结果仍按 bool 输出 1 或 0：<code>(5 &amp;&amp; 2)</code> 输出 1，<code>(5 &amp;&amp; 0)</code> 输出 0。
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（第三行）</p>
        <CodePanel>{`int x = 7;
cout << (!x) << " " << (!!x) << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'0 1'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">7 是真，!7 是 0；再取反，!!7 是 1，不是 7。</p>
      </div>
    </div>

    <TruthDetector />
  </div>
);

// --- 4. 短路求值 ---
const ShortCircuitSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-6 md:grid-cols-2">
      <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
        <h3 className="mb-2 text-xl font-bold text-blue-900">&amp;&amp; 左边为假</h3>
        <p className="text-sm leading-relaxed text-blue-950">整体一定是假，右边<strong>不再执行</strong>。</p>
      </div>
      <div className="min-w-0 rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h3 className="mb-2 text-xl font-bold text-green-900">|| 左边为真</h3>
        <p className="text-sm leading-relaxed text-green-950">整体一定是真，右边<strong>不再执行</strong>。</p>
      </div>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 2</p>
        <CodePanel>{`int a = 0, b = 0;
if (a != 0 && 10 / a > 2) b = 1;
cout << b << endl;
int m = 0, n = 0;
bool r = (m = 2) || (n = 5);
cout << r << " " << m << " " << n << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`0
1 2 0`}</OutputPanel>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">a != 0 为假，10 / a 没有执行，不会除以 0；b 保持 0。（if 第 8 课详讲，这里只看条件。）</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">m = 2 的值是 2，为真，|| 右边的 n = 5 没有执行，n 仍是 0。</li>
        </ul>
      </div>
    </div>

    <PredictCheck
      className="w-full"
      title="先预测：右边会执行吗？"
      prompt="int x = 0; cout << (x != 0 && 10 / x > 2); 会执行 10 / x 吗？输出什么？"
      options={['会执行，发生除以 0', '不会执行右边，输出 0', '不会执行右边，输出 1']}
      correctIndex={1}
      explanation="&& 从左向右求值。x != 0 为假，整个式子已经是假，右边的 10 / x 不会执行；cout 输出 0。把“除数不为 0”写在 && 左边，是常用的保护写法。"
      misconception="只按优先级把每一部分都算一遍，忽略了 && 的短路规则。"
    />

    <QuizCard
      badge="课堂练习"
      source="课堂练习"
      question="int a = 0, b = 1; 执行语句 (a = 2) && (b = 0); 后，a 和 b 的值分别为（ ）。"
      options={[
        { id: 'A', text: 'a = 2, b = 1' },
        { id: 'B', text: 'a = 0, b = 0' },
        { id: 'C', text: 'a = 1, b = 0' },
        { id: 'D', text: 'a = 2, b = 0', isCorrect: true },
      ]}
      explanation="左边 a = 2 的值是 2，为真，&& 还要看右边，于是执行 b = 0。两个赋值都发生了：a 是 2，b 是 0；整个表达式的值是假（0）。选 A 是误以为右边被短路跳过了：只有左边为假时，&& 才跳过右边。"
    />
  </div>
);

// --- 5. 运算优先级 ---
const priorityChain = [
  ['1', '!', '逻辑非（只作用于紧跟的一项）'],
  ['2', '* / %，然后 + -', '算术运算'],
  ['3', '< <= > >=', '大小比较'],
  ['4', '== !=', '相等比较'],
  ['5', '&&', '逻辑与'],
  ['6', '||', '逻辑或'],
];

const PrioritySlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">从高到低：先算谁</h3>
      <ol className="list-none space-y-3 text-sm text-slate-700">
        {priorityChain.map(([level, ops, note]) => (
          <li key={level} className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-white p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{level}</span>
            <code className="font-mono text-base font-bold text-slate-900">{ops}</code>
            <span className="text-slate-500">{note}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        手推含逻辑运算的表达式：先算算术，再算比较，最后算 &amp;&amp; 和 ||；<strong>&amp;&amp; 比 || 先算</strong>。拿不准时主动加括号，代码也更好读。
      </p>
    </div>

    <PredictCheck
      className="w-full"
      prompt="课堂练习：表达式 12 - 3 * 2 && 2 的值是多少？"
      options={['0', '1', '6', '12']}
      correctIndex={1}
      explanation="算术先算：3 * 2 = 6，12 - 6 = 6；式子变成 6 && 2。6 和 2 都不是 0，都是真，结果为 1。"
      misconception="以为 && 会得到数值 6 或 2；逻辑运算的结果只有 0 和 1。"
    />

    <QuizCard
      source="2025 年 12 月 GESP C++ 一级判断题第 7 题"
      question={"执行下面C++代码，如果输入 7，将输出 'Y' ；如果输入 8，将输出 'N'。\nint N;\ncin >> N;\nif (N > 5 || N < 10 && N % 2 != 0)\n cout << 'Y';\nelse\n cout << 'N';"}
      options={judgeOptions(false)}
      explanation="&& 比 || 先算，条件等于 N > 5 || (N < 10 && N % 2 != 0)。输入 7：N > 5 为真，输出 Y。输入 8：N > 5 仍为真，|| 左边为真，直接输出 Y，不是 N。所以说法错误。（答案已按优先级手推并用 g++ 运行核对。）"
    />

    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 3 题）"
      question="C++ 表达式 2-1 && 2 % 10 的值是（ ）。"
      mono
      options={[
        { id: 'A', text: '0' },
        { id: 'B', text: '1', isCorrect: true },
        { id: 'C', text: '2' },
        { id: 'D', text: '3' },
      ]}
      explanation="算术先算：2 - 1 = 1，2 % 10 = 2；再算 1 && 2，两边都非 0，结果为 1。"
    />
  </div>
);

// --- 6. 链式比较陷阱 ---
const PitfallVisualizer = () => {
  const [x, setX] = useState(7);
  const step1 = x > 3 ? 1 : 0;

  return (
    <div className="w-full rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-red-800">对照实验：3 &lt; x &lt; 5 到底在算什么</h3>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="font-bold text-gray-800">x =</span>
        <input type="range" min="0" max="10" aria-label="x 的值" value={x} onChange={(e) => setX(Number(e.target.value))} className="w-48 accent-red-500" />
        <span className="rounded border bg-white px-3 py-1 font-mono text-xl">{x}</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h4 className="mb-2 border-b pb-1 font-bold text-gray-600">数学里的意思</h4>
          <p className="mb-2 font-mono text-lg">3 &lt; x &lt; 5</p>
          <p className="text-sm text-gray-600">x 在 3 和 5 之间</p>
          <p className="mt-4 font-bold">应该是：{x > 3 && x < 5 ? <span className="text-green-600">真</span> : <span className="text-red-600">假</span>}</p>
        </div>
        <div className="rounded-xl border-2 border-red-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 border-b pb-1 font-bold text-gray-800">C++ 按 (3 &lt; x) &lt; 5 计算</h4>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center justify-between"><span>1. 先算 3 &lt; {x}</span><span className="font-bold">{step1}</span></div>
            <div className="flex items-center justify-between rounded bg-gray-100 p-1"><span>2. 式子变成</span><span className="font-bold">{step1} &lt; 5</span></div>
            <div className="flex items-center justify-between"><span>3. 再算 {step1} &lt; 5</span><span className="text-lg font-bold text-green-600">1</span></div>
          </div>
          <p role="status" className="mt-3 text-center text-sm font-bold text-red-600">第一步只会得到 0 或 1，都小于 5，所以结果永远是 1。</p>
        </div>
      </div>
      <p className="mt-4 text-center"><span className="rounded bg-green-100 px-3 py-1 text-sm font-bold text-green-800">正确写法：x &gt; 3 &amp;&amp; x &lt; 5</span></p>
    </div>
  );
};

const ChainSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 1（第二行）</p>
        <CodePanel>{`int x = 7;
cout << (x > 3 && x < 5) << " " << ((3 < x) < 5) << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{'0 1'}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">x = 7 不在 3 和 5 之间：用 &amp;&amp; 的写法得 0，正确；加括号显示的连写含义得 1，错误。</p>
      </div>
    </div>

    <PitfallVisualizer />

    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950 shadow-sm">
      <strong className="mb-2 block text-base text-amber-900">编译器怎样对待连写</strong>
      按 C++11 标准，<code>3 &lt; x &lt; 5</code> 是合法表达式，按 <code>(3 &lt; x) &lt; 5</code> 计算。本课用的 Apple clang 编译器会直接把这种连写判为编译错误，GCC 一般只给警告。考试题按标准规则计算；自己写程序时，区间一律写成两个比较用 &amp;&amp; 连接，例如 1 &lt; x &lt; 10 要写成 <code>x &gt; 1 &amp;&amp; x &lt; 10</code>。
    </div>
  </div>
);

// --- 7. 真题：2024 年 9 月一级判断题第 10 题 ---
const ExamChainSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：a &lt; b &lt; c 的值</h3>
      <p className="mt-1 text-slate-500">把连写拆成两步，从左往右算。</p>
    </div>

    <QuizCard
      source="2024 年 9 月 GESP C++ 一级判断题第 10 题"
      question="C++ 中，定义变量 int a = 5, b = 4, c = 3，则表达式 (a < b < c) 的值为逻辑假。"
      options={judgeOptions(false)}
      explanation="按 (a < b) < c 计算：5 < 4 不成立，得 0；再算 0 < 3，成立，得 1。表达式的值是真，不是假，所以说法错误。数学里 5 < 4 < 3 不成立，C++ 的结果却是真——这正是连写不能表示区间的原因。"
    />
  </div>
);

// --- 8. 把文字条件翻译成表达式 ---
const translateRows = [
  ['n 是偶数', 'n % 2 == 0'],
  ['n 是奇数（负数也对）', 'n % 2 != 0'],
  ['n 是 k 的倍数', 'n % k == 0'],
  ['n 的个位是 k（n ≥ 0）', 'n % 10 == k'],
  ['x 在 8～12 之间（含两端）', 'x >= 8 && x <= 12'],
  ['x 不在 8～12 之间', 'x < 8 || x > 12'],
  ['a 是 9 的倍数但不是 8 的倍数', 'a % 9 == 0 && a % 8 != 0'],
  ['y 是闰年', '(y % 4 == 0 && y % 100 != 0) || y % 400 == 0'],
];

const LeapYearLab = () => {
  const [raw, setRaw] = useState('1900');
  const trimmed = raw.trim();
  const valid = /^[1-9]\d{0,3}$/.test(trimmed);
  const y = Number(trimmed);
  const c1 = y % 4 === 0;
  const c2 = y % 100 !== 0;
  const c3 = y % 400 === 0;
  const leap = (c1 && c2) || c3;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">闰年实验：逐项看三个小条件</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-7-year" className="text-sm font-bold text-gray-700">年份 y（1～9999）：</label>
        <input id="l1-7-year" type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-28 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <div className="flex flex-wrap gap-2">
          {['1900', '2000', '2024', '2023'].map((year) => (
            <button key={year} type="button" onClick={() => setRaw(year)} className="rounded border bg-white px-2 py-1 text-xs hover:bg-blue-50">试 {year}</button>
          ))}
        </div>
      </div>
      {valid ? (
        <div role="status" className="space-y-2 font-mono text-sm">
          {[
            [`y % 4 == 0`, c1],
            [`y % 100 != 0`, c2],
            [`y % 400 == 0`, c3],
          ].map(([text, value]) => (
            <div key={text} className="flex justify-between rounded-lg border border-slate-100 bg-slate-50 p-2">
              <span>{text}</span><span className={value ? 'font-bold text-green-700' : 'font-bold text-red-600'}>{value ? '1' : '0'}</span>
            </div>
          ))}
          <div className={`rounded-lg p-3 text-center font-bold ${leap ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            ({c1 ? 1 : 0} &amp;&amp; {c2 ? 1 : 0}) || {c3 ? 1 : 0} = {leap ? 1 : 0}：{y} 年{leap ? '是' : '不是'}闰年
          </div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～9999 的整数年份；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

const TranslateSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-xl font-bold text-slate-800">文字条件 → C++ 表达式</h3>
      <div className="grid gap-3">
        {translateRows.map(([words, expr]) => (
          <div key={words} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
            <span className="text-sm font-bold text-blue-950">{words}</span>
            <code className="font-mono text-sm font-bold text-slate-900">{expr}</code>
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        翻译时抓关键词：“且、并且、同时”用 &amp;&amp;；“或、或者”用 ||；“不是、不在”用 != 或 !。闰年的意思是：能被 4 整除但不能被 100 整除，或者能被 400 整除。
      </p>
    </div>

    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">例 3</p>
        <CodePanel>{`int y = 1900, a = 72;
cout << ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) << endl;
cout << (a % 9 == 0 && a % 8 != 0) << endl;`}</CodePanel>
      </div>
      <div className="min-w-0">
        <p className="mb-2 text-sm font-bold text-slate-600">输出</p>
        <OutputPanel>{`0
0`}</OutputPanel>
        <p className="mt-2 text-sm text-slate-700">1900 能被 100 整除、不能被 400 整除，不是闰年；72 是 9 的倍数，但也是 8 的倍数，不满足“不是 8 的倍数”。</p>
      </div>
    </div>

    <LeapYearLab />

    <QuizCard
      badge="课堂练习"
      source="根据站内题库 2025 年 3 月一级第 12 题改编 · 来源待核"
      question="i 是 0～99 的整数。要表示“i 能被 2 整除，且除以 7 余数为 2”，下列条件不能实现的是（ ）。"
      mono
      options={[
        { id: 'A', text: '((i % 2 == 0) && (i % 7 == 2))' },
        { id: 'B', text: '((!(i % 2)) && (i % 7 == 2))' },
        { id: 'C', text: '((!(i % 2)) && (!(i % 7)))', isCorrect: true },
        { id: 'D', text: '((i % 2 != 1) && (i % 7 == 2))' },
      ]}
      explanation="!(i % 2) 在 i % 2 为 0 时才是真，等于“能被 2 整除”；i 不是负数时，i % 2 != 1 也等于“是偶数”。C 的后半 !(i % 7) 表示“能被 7 整除”（余数为 0），不是“余数为 2”，所以 C 不能实现。"
    />
  </div>
);

// --- 9. 真题：2024 年 6 月一级判断题第 9 题 ---
const ExamNotNotSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-800">真题：两个感叹号</h3>
      <p className="mt-1 text-slate-500">! 的结果只有 0 和 1。</p>
    </div>

    <QuizCard
      source="2024 年 6 月 GESP C++ 一级判断题第 9 题"
      question="C++ 中定义变量 int N，则表达式 (!!N) 的值也是 N 的值。（ ）"
      options={judgeOptions(false)}
      explanation="!N 把 N 当作真假再取反，结果只能是 0 或 1；再取一次反，!!N 也只能是 0 或 1。N = 5 时 !!N 是 1，不是 5。只有 N 恰好是 0 或 1 时两者才相等。"
    />

    <div className="w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
      <strong className="mb-1 block text-blue-900">用法</strong>
      <code>!!N</code> 常用来把任意整数变成“是否非 0”的 1 或 0。
    </div>
  </div>
);

// --- 10. 常见错误与真题 ---
const mistakeCards = [
  { title: '用 == 1 判断奇数', code: 'n % 2 == 1', detail: 'n 为负奇数时 n % 2 是 -1，例如 -3 % 2 得 -1，条件不成立。写 n % 2 != 0 才对负数也正确。' },
  { title: '连写区间', code: '1 < x < 10', detail: '按 (1 < x) < 10 计算，结果总是 1。写成 x > 1 && x < 10。' },
  { title: '比较写成赋值', code: 'x = 5', detail: '一个等号是赋值，会把 x 改成 5。判断相等用 x == 5。' },
  { title: '忘了 && 先于 ||', code: 'a || b && c', detail: '等于 a || (b && c)，不是 (a || b) && c。意思不同时要加括号。' },
];

const MistakesSlide = () => (
  <div className="flex flex-col items-center justify-center h-full gap-8">
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
        <AlertTriangle className="text-orange-500" /> 条件表达式常见错误
      </h3>
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
      source="2023 年 3 月 GESP C++ 一级第 11 题"
      question={'如果 a 和 b 均为 int 类型的变量，下列表达式不能正确判断"a 等于 0 且 b 等于 0"的是（ ）'}
      mono
      options={[
        { id: 'A', text: '(a == 0) && (b == 0)' },
        { id: 'B', text: '(a == b == 0)', isCorrect: true },
        { id: 'C', text: '(!a) && (!b)' },
        { id: 'D', text: '(a == 0) + (b == 0) == 2' },
      ]}
      explanation="B 是连写比较，按 (a == b) == 0 计算：a、b 都是 0 时 a == b 得 1，1 == 0 为假，结果反而是 0；a = 3、b = 5 时 a == b 得 0，0 == 0 为真。它判断的其实是“a 和 b 不相等”。A 是标准写法；C 中 !a 在 a 为 0 时才是 1，等于 a == 0；D 中 + 比 == 先算，两个比较各得 0 或 1，和为 2 说明两个都成立。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2023 年 9 月一级第 5 题）"
      question="在 C++ 语言中，int 类型的变量 x、y、z 的值分别为 2、4、6，以下表达式的值为真的是（ ）。"
      mono
      options={[
        { id: 'A', text: 'x > y || x > z' },
        { id: 'B', text: 'x != z-y' },
        { id: 'C', text: 'z > y+x' },
        { id: 'D', text: 'x < y || ! (x < z)', isCorrect: true },
      ]}
      explanation="A：2 > 4、2 > 6 都假，结果假。B：z - y = 2，2 != 2 假。C：y + x = 6，6 > 6 假。D：x < y 即 2 < 4 为真，|| 左边为真，整体为真。"
    />
    <QuizCard
      badge="课堂练习"
      source="站内题库 · 来源待核（2025 年 6 月一级判断题第 2 题）"
      question="若 N 为 5，则表达式 (N+!N) 的值为 4。"
      options={judgeOptions(false)}
      explanation="! 比 + 先算：!N 中 N = 5 是真，!N 为 0；N + 0 = 5，不是 4。"
    />
  </div>
);

// --- 11. 上机 ---
const practiceProblems = [
  {
    tag: '基础题 7-A',
    title: '活动资格',
    statement: '活动要求年龄在 8～12 岁（含两端）且已报名。输入一行两个整数 age、registered（1 ≤ age ≤ 100，registered 为 0 或 1，1 表示已报名）。满足条件输出 1，否则输出 0。',
    samples: [['8 1', '1'], ['12 0', '0']],
    hint: '三个条件用 && 连接，直接输出表达式的值；自己补测 7 1、12 1、13 1。不要写 8 <= age <= 12。',
    code: `#include <iostream>
using namespace std;

int main() {
    int age, registered;
    cin >> age >> registered;
    cout << (age >= 8 && age <= 12 && registered == 1) << endl;
    return 0;
}`,
  },
  {
    tag: '提高题 7-B',
    title: '三角形判断',
    statement: '输入一行三个正整数 a、b、c（1 ≤ a, b, c ≤ 1000）。能构成三角形（任意两边之和大于第三边）时输出 1，否则输出 0。要求直接输出一个条件表达式的值。',
    samples: [['3 4 5', '1'], ['1 2 3', '0']],
    hint: '三个“两边之和大于第三边”要同时成立。1 2 3 中 1 + 2 = 3，不大于 3，所以不是三角形。',
    code: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << (a + b > c && a + c > b && b + c > a) << endl;
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
        <h3 className="flex items-center gap-2 font-bold text-green-800"><Code2 size={18} /> 参考程序</h3>
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

// --- 12. 小结与课后任务 ---
const SummarySlide = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="w-full bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 md:p-10 space-y-8">
      <div className="rounded-2xl border border-yellow-100 bg-white p-8 shadow-sm">
        <p className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-800">
          <span className="rounded-lg bg-yellow-400 p-2 text-white"><BookOpen size={24} /></span> 本课要点
        </p>
        <ol className="space-y-4 text-slate-700">
          {[
            '六个关系运算符结果是 bool，cout 显示 1 或 0；= 是赋值，== 是比较。',
            '&& 两边都真才真，|| 一边真就真，! 取反；整数当条件时只有 0 是假。',
            '短路：&& 左边为假、|| 左边为真时，右边不执行。',
            '优先级：! → 算术 → 大小比较 → == != → && → ||；拿不准就加括号。',
            '3 < x < 5 按 (3 < x) < 5 计算，结果总为 1；区间写成 x > 3 && x < 5。',
            '常用翻译：偶数 n % 2 == 0，奇数 n % 2 != 0，倍数 n % k == 0，闰年 (y % 4 == 0 && y % 100 != 0) || y % 400 == 0。',
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
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">上机任务：闰年检测器</strong>
              <p className="text-sm text-yellow-900">输入一个年份 y（1 ≤ y ≤ 9999），是闰年输出 1，否则输出 0。用 1900（0）、2000（1）、2024（1）、2023（0）核对。</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-yellow-100 bg-white/60 p-4 transition-colors hover:bg-white">
            <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-yellow-600" />
            <div>
              <strong className="mb-1 block text-yellow-900">翻译任务</strong>
              <p className="text-sm text-yellow-900">把“n 是 3 的倍数或个位是 3”“x 不在 1～100 之间”写成 C++ 条件，各用两个数手推验证。</p>
            </div>
          </label>
        </div>
      </div>

      <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
        下一课：if 与 if-else。本课只算出条件的值；第 8 课把条件放进 if，决定执行哪段代码。
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
        return <RelationSlide />;
      case 3:
        return <LogicSlide />;
      case 4:
        return <ShortCircuitSlide />;
      case 5:
        return <PrioritySlide />;
      case 6:
        return <ChainSlide />;
      case 7:
        return <ExamChainSlide />;
      case 8:
        return <TranslateSlide />;
      case 9:
        return <ExamNotNotSlide />;
      case 10:
        return <MistakesSlide />;
      case 11:
        return <PracticeSlide />;
      case 12:
        return <SummarySlide />;
      case 13:
        return (
          <div className="slide-enter py-6">
            <TransferCheck
                prompt="换个例子：把“n 是 5 的倍数，但不是 10 的倍数”写成 C++ 条件，并分别代入 15 和 20 验证。"
                hint="“是……的倍数”用 % k == 0，“不是”用 != 0，“但”就是“且”。"
                answer="n % 5 == 0 && n % 10 != 0；15 得 1，20 得 0。"
                steps={[
                    '“是 5 的倍数”：n % 5 == 0；“不是 10 的倍数”：n % 10 != 0。',
                    '两个条件要同时成立，用 && 连接。',
                    'n = 15：15 % 5 = 0 成立，15 % 10 = 5 不为 0 成立，结果 1；n = 20：20 % 10 = 0，后半不成立，结果 0。',
                ]}
            />
            <MasteryCheck
              title="C++ L1-7 关系与逻辑运算离开前检查"
              description="如果能区分 = 与 ==、说出逻辑运算和非零即真、判断短路、看穿链式比较并写出闰年条件，就可以进入第 8 课：if 与 if-else。"
              items={lesson7MasteryItems}
            />
          </div>
        );
      default:
        return <div>Content Not Found</div>;
    }
  };

  return (
    <LegacyCppLessonShell
        prerequisites={['会用 % 判断能否整除', '知道 bool 的 true / false 输出为 1 / 0', '能按优先级手算算术表达式']}
      lessonNumber={7}
      lessonTitle="关系与逻辑运算"
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      nextLessonPath="/lesson/1/8"
      renderIcon={(name, size) => <Icon name={name} size={size} />}
      topSupport={<CppL1LessonSupport lessonId={7} />}
      bottomSupport={<CppL1LessonSupport lessonId={7} placement="bottom" />}
    >
      {renderContent()}
    </LegacyCppLessonShell>
  );
}
