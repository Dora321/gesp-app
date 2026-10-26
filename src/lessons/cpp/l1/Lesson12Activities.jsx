import { useState } from 'react';
import { ArrowRight, RotateCw, Search } from 'lucide-react';
import { CodeTracer } from '../CppLessonShell';

// 第 12 课的互动实验。课页 Lesson12.jsx 只负责编排，实验组件放在这里。
// 由旧 Lesson11Activities.jsx 的对照演示（RunRaceSimulator / ComparisonArena / BadBeanGame）、
// while (1) 追踪（InfiniteBreakTracer）和混合追踪表（LogicTable）改写而来；嵌套循环演示不再使用。

const OutputPanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

const parseIntInRange = (raw, min, max) => {
  const text = raw.trim();
  if (!/^\d{1,4}$/.test(text)) return null;
  const value = Number(text);
  return value >= min && value <= max ? value : null;
};

// --- 对照实验：同一个循环，换成 continue 或 break ---
const LAB_LIMIT = 6;
const labModes = [
  { id: 'none', label: '不写跳转', line: '// 这一行不写' },
  { id: 'continue', label: 'continue', line: 'continue;' },
  { id: 'break', label: 'break', line: 'break;' },
];

const buildLabSteps = (mode, k) => {
  const steps = [{ part: 'init', i: 1, out: '', note: '初始化：i = 1。这一段只执行一次。' }];
  let i = 1;
  let out = '';
  for (;;) {
    const ok = i <= LAB_LIMIT;
    steps.push({ part: 'cond', i, out, note: `判断 ${i} <= ${LAB_LIMIT}：${ok ? '真，进入循环体' : '假，循环结束'}` });
    if (!ok) break;
    const hit = mode !== 'none' && i === k;
    if (mode !== 'none') {
      steps.push({ part: 'if', i, out, note: `判断 ${i} == ${k}：${hit ? '真，执行后面的跳转语句' : '假，不跳转'}` });
    }
    if (hit && mode === 'break') {
      steps.push({ part: 'jump', i, out, note: `break：立即结束整个循环，i++ 不再执行，i 停在 ${i}。` });
      break;
    }
    if (hit) {
      steps.push({ part: 'jump', i, out, note: 'continue：本轮剩下的 cout 不执行，直接去更新 i++。' });
    } else {
      out += `${i} `;
      steps.push({ part: 'body', i, out, note: `输出 ${i} 和一个空格` });
    }
    i += 1;
    steps.push({ part: 'update', i, out, note: `更新：i++，i 变成 ${i}，回到判断` });
  }
  steps.push({ part: 'after', i, out: `${out}\n${i}`, note: `循环后面的语句：换行，再输出 i 的值 ${i}` });
  return { steps, finalI: i };
};

export const BreakContinueLab = () => {
  const [mode, setMode] = useState('continue');
  const [kRaw, setKRaw] = useState('3');
  const [index, setIndex] = useState(0);
  const k = parseIntInRange(kRaw, 1, LAB_LIMIT);
  const valid = k !== null;
  const { steps, finalI } = buildLabSteps(mode, valid ? k : 0);
  const safeIndex = Math.min(index, steps.length - 1);
  const step = steps[safeIndex];
  const finished = safeIndex === steps.length - 1;
  const mark = (part) => (step.part === part ? 'rounded bg-yellow-200 px-1 font-bold' : '');
  const lineText = labModes.find((item) => item.id === mode).line;

  const summary = mode === 'none'
    ? `没有跳转：1～6 全部输出，结束时 i = ${finalI}。`
    : mode === 'continue'
      ? `continue 只跳过 i = ${k} 这一轮的输出，循环照常跑完，结束时 i = ${finalI}。`
      : `break 在 i = ${k} 时结束整个循环，后面的数不再检查，i 停在 ${finalI}。`;

  return (
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-800">
        <RotateCw size={20} /> 对照实验：同一个循环，换一条跳转语句
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-bold text-blue-900">跳转语句：</span>
        {labModes.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            onClick={() => { setMode(item.id); setIndex(0); }}
            className={`rounded-lg border px-3 py-1 font-mono font-bold ${mode === item.id ? 'border-blue-500 bg-white text-blue-800' : 'border-blue-200 text-blue-500 hover:bg-white'}`}
          >
            {item.label}
          </button>
        ))}
        <label className="flex items-center gap-2 font-bold text-blue-900">
          k =
          <input
            aria-label="触发跳转的 k"
            type="text"
            inputMode="numeric"
            value={kRaw}
            onChange={(e) => { setKRaw(e.target.value); setIndex(0); }}
            className="w-16 rounded-lg border-2 border-blue-300 bg-white px-2 py-1 text-center font-mono outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <div className="mb-4 rounded-lg border border-blue-100 bg-white p-4 font-mono text-sm">
        <div>int i;</div>
        <div>
          <span className="text-purple-600">for</span> (<span className={mark('init')}>i = 1</span>; <span className={mark('cond')}>i &lt;= 6</span>; <span className={mark('update')}>i++</span>) {'{'}
        </div>
        {mode === 'none' ? (
          <div className="pl-6 text-gray-400">{lineText}</div>
        ) : (
          <div className="pl-6">
            <span className={mark('if')}>if (i == {valid ? k : 'k'})</span>{' '}
            <span className={step.part === 'jump' ? 'rounded bg-red-200 px-1 font-bold text-red-800' : 'text-gray-600'}>{lineText}</span>
          </div>
        )}
        <div className={`pl-6 ${step.part === 'body' ? 'rounded bg-green-100 font-bold' : 'text-gray-600'}`}>cout &lt;&lt; i &lt;&lt; " ";</div>
        <div>{'}'}</div>
        <div className={step.part === 'after' ? 'rounded bg-green-100 font-bold' : ''}>cout &lt;&lt; endl &lt;&lt; i;</div>
      </div>

      {valid ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-lg bg-blue-100 px-4 py-2">
              <span className="mr-2 font-bold text-blue-800">i =</span>
              <span className="font-mono text-2xl font-bold text-blue-700">{step.i}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setIndex(safeIndex + 1)} disabled={finished} className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                下一步 <ArrowRight size={16} />
              </button>
              <button type="button" onClick={() => setIndex(0)} className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
                <RotateCw size={16} /> 重置
              </button>
            </div>
          </div>
          <p role="status" className="mb-3 rounded-lg border border-blue-100 bg-white p-3 text-sm text-slate-700">第 {safeIndex + 1} 步 / 共 {steps.length} 步：{step.note}</p>
          <OutputPanel>{step.out || '（还没有输出）'}</OutputPanel>
          {finished && <p className="mt-3 text-sm font-bold text-blue-900">{summary}</p>}
        </>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">k 请输入 1～6 的整数；空白或非法输入不显示执行过程。</p>
      )}
    </div>
  );
};

// --- 找到就停：从 n 开始逐个检验，第一个 k 的倍数出现就 break ---
const SHOW_LIMIT = 30;

export const FirstMultipleLab = () => {
  const [nRaw, setNRaw] = useState('10');
  const [kRaw, setKRaw] = useState('4');
  const n = parseIntInRange(nRaw, 1, 1000);
  const k = parseIntInRange(kRaw, 1, 100);
  const valid = n !== null && k !== null;

  const checked = [];
  if (valid) {
    for (let d = n; ; d += 1) {
      checked.push({ d, r: d % k });
      if (d % k === 0) break;
    }
  }
  const ans = valid ? checked[checked.length - 1].d : null;
  const shown = checked.length > SHOW_LIMIT ? checked.slice(checked.length - SHOW_LIMIT) : checked;

  const inputClass = 'w-20 rounded-lg border-2 border-indigo-300 bg-white px-2 py-1 text-center font-mono focus:border-indigo-500 outline-none';

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900">
        <Search size={20} /> 找到就停：大于等于 n 的第一个 k 的倍数
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-sm">
        <label className="flex items-center gap-2">n = <input aria-label="起点 n" type="text" inputMode="numeric" value={nRaw} onChange={(e) => setNRaw(e.target.value)} className={inputClass} /></label>
        <label className="flex items-center gap-2">k = <input aria-label="倍数 k" type="text" inputMode="numeric" value={kRaw} onChange={(e) => setKRaw(e.target.value)} className={inputClass} /></label>
      </div>
      <pre className="mb-4 overflow-x-auto rounded-lg border border-indigo-100 bg-white p-4 font-mono text-sm text-slate-800"><code>{`for (int d = n; ; d++) {
    if (d % k == 0) {
        ans = d;
        break;   // 找到第一个就停
    }
}`}</code></pre>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {checked.length > SHOW_LIMIT && <span className="rounded-lg bg-white px-2 py-1 font-mono text-sm text-slate-400 ring-1 ring-indigo-100">…</span>}
            {shown.map(({ d, r }) => (
              <span key={d} className={`rounded-lg px-2 py-1 font-mono text-sm ring-1 ${r === 0 ? 'bg-green-100 font-bold text-green-800 ring-green-300' : 'bg-white text-slate-600 ring-indigo-100'}`}>
                {d} % {k} = {r}
              </span>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
              <div className="text-xs font-bold text-slate-500">检验了几个数</div>
              <div className="font-mono text-3xl font-bold text-indigo-700">{checked.length}</div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
              <div className="text-xs font-bold text-slate-500">ans（break 时 d 的值）</div>
              <div className="font-mono text-3xl font-bold text-indigo-700">{ans}</div>
            </div>
          </div>
          <p className="text-sm text-indigo-900">{ans} % {k} == 0，执行 break；{ans} 后面的数一个也不再检验。循环头没写条件，唯一的出口就是这条 break。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">n 请输入 1～1000 的整数，k 请输入 1～100 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};

// --- while (1) 与 break：读到 0 为止的另一种写法 ---
const whileOneCode = `int x, sum = 0;
while (1) {
    cin >> x;
    if (x == 0) break;
    sum += x;
}
cout << sum;`;

const whileOneInputs = [5, 3, -2];
const whileOneSteps = (() => {
  const steps = [{ active: [0], vars: { x: '未读', sum: 0 }, action: '进入第 1 轮' }];
  let sum = 0;
  whileOneInputs.forEach((x, index) => {
    sum += x;
    steps.push({
      active: [1, 2, 3, 4],
      vars: { x, sum },
      row: [`第 ${index + 1} 轮`, x, '假', 'sum += x', sum],
      action: `进入第 ${index + 2} 轮`,
    });
  });
  steps.push({
    active: [1, 2, 3],
    vars: { x: 0, sum },
    row: [`第 ${whileOneInputs.length + 1} 轮`, 0, '真', 'break', sum],
    action: '看循环怎样结束',
  });
  steps.push({
    active: [3],
    vars: { x: 0, sum },
    exit: 'break 立即离开 while (1)；sum += x 这一轮没有执行，0 没有被加进去。',
    action: '执行循环后的输出',
  });
  steps.push({ active: [6], vars: { x: 0, sum }, action: '显示最终结果', output: `输入 5 3 -2 0，输出 ${sum}` });
  return steps;
})();

export const WhileOneTracer = () => (
  <CodeTracer
    title="while (1) 追踪器：唯一的出口是 break"
    code={whileOneCode}
    varOrder={['x', 'sum']}
    columns={['轮次', '读到 x', 'x == 0', '动作', 'sum']}
    steps={whileOneSteps}
    hint="输入是 5 3 -2 0。逐步看每一轮先读、再判断、最后累加。"
  />
);

// --- continue 与 break 混合追踪 ---
const mixedCode = `int s = 0, i;
for (i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;
    if (i > 6) break;
    s += i;
}
cout << s << " " << i;`;

const mixedSteps = (() => {
  const steps = [{ active: [0], vars: { s: 0, i: '未定' }, action: '初始化 i = 1' }];
  let s = 0;
  for (let i = 1; i <= 10; i += 1) {
    if (i % 2 === 0) {
      steps.push({
        active: [1, 2],
        vars: { s, i },
        row: [i, '真', '不判断', 'continue，去 i++', s],
        action: `i++，检查 i = ${i + 1}`,
      });
      continue;
    }
    if (i > 6) {
      steps.push({
        active: [1, 2, 3],
        vars: { s, i },
        row: [i, '假', '真', 'break', s],
        action: '看循环怎样结束',
      });
      steps.push({
        active: [3],
        vars: { s, i },
        exit: `break 直接离开循环，没有执行 i++，i 停在 ${i}；${i + 1}～10 都没有检查。`,
        action: '执行输出',
      });
      steps.push({ active: [6], vars: { s, i }, action: '显示最终结果', output: `${s} ${i}` });
      break;
    }
    s += i;
    steps.push({
      active: [1, 2, 3, 4],
      vars: { s, i },
      row: [i, '假', '假', `s += ${i}`, s],
      action: `i++，检查 i = ${i + 1}`,
    });
  }
  return steps;
})();

export const MixedJumpTracer = () => (
  <CodeTracer
    title="混合追踪器：先过 continue，再过 break"
    code={mixedCode}
    varOrder={['s', 'i']}
    columns={['i', 'i % 2 == 0', 'i > 6', '动作', 's']}
    steps={mixedSteps}
    hint="每一轮先看第一个 if；它成立就不会再看第二个 if。"
  />
);
