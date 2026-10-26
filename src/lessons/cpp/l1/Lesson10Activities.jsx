import { useState } from 'react';
import { ArrowRight, RotateCw } from 'lucide-react';

// 第 10 课的互动实验。课页 Lesson10.jsx 只负责编排，实验组件放在这里。

const OutputPanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

// for (int i = 1; i <= 3; i++) 的逐步执行：初始化只做一次，之后“判断 → 循环体 → 更新”反复。
const STEPPER_LIMIT = 3;
const stepperSteps = (() => {
  const steps = [{ part: 'init', i: 1, out: '', note: '初始化：int i = 1。这一段只执行一次。' }];
  let i = 1;
  let out = '';
  for (;;) {
    const ok = i <= STEPPER_LIMIT;
    steps.push({ part: 'cond', i, out, note: `判断 ${i} <= ${STEPPER_LIMIT}：${ok ? '真，进入循环体' : '假，循环结束'}` });
    if (!ok) break;
    out += `${i} `;
    steps.push({ part: 'body', i, out, note: `循环体：输出 ${i} 和一个空格` });
    i += 1;
    steps.push({ part: 'update', i, out, note: `更新：i++，i 变成 ${i}，回到判断` });
  }
  return steps;
})();

export const LoopStepper = () => {
  const [index, setIndex] = useState(0);
  const step = stepperSteps[index];
  const finished = index === stepperSteps.length - 1;
  const mark = (part) => (step.part === part ? 'rounded bg-yellow-200 px-1 font-bold' : '');

  return (
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-800">
        <RotateCw size={20} /> 逐步执行：for 的四个部分谁先谁后
      </h3>
      <div className="mb-4 rounded-lg border border-blue-100 bg-white p-4 font-mono text-sm">
        <div>
          <span className="text-purple-600">for</span> (<span className={mark('init')}>int i = 1</span>; <span className={mark('cond')}>i &lt;= 3</span>; <span className={mark('update')}>i++</span>) {'{'}
        </div>
        <div className={`pl-6 ${step.part === 'body' ? 'rounded bg-green-100 font-bold' : 'text-gray-600'}`}>cout &lt;&lt; i &lt;&lt; " ";</div>
        <div>{'}'}</div>
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-lg bg-blue-100 px-4 py-2">
          <span className="mr-2 font-bold text-blue-800">i =</span>
          <span className="font-mono text-2xl font-bold text-blue-700">{step.i}</span>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setIndex(index + 1)} disabled={finished} className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            下一步 <ArrowRight size={16} />
          </button>
          <button type="button" onClick={() => setIndex(0)} className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
            <RotateCw size={16} /> 重置
          </button>
        </div>
      </div>
      <p role="status" className="mb-3 rounded-lg border border-blue-100 bg-white p-3 text-sm text-slate-700">第 {index + 1} 步 / 共 {stepperSteps.length} 步：{step.note}</p>
      <OutputPanel>{step.out || '（还没有输出）'}</OutputPanel>
      {finished && <p className="mt-3 text-sm font-bold text-blue-900">循环体执行了 3 次；结束时 i = 4，是第一个让 i &lt;= 3 变假的值。</p>}
    </div>
  );
};

// 次数计算实验：列出 i 的每个取值，数出执行次数和结束值。
const parseIntInRange = (raw, min, max) => {
  const text = raw.trim();
  if (!/^-?\d{1,4}$/.test(text)) return null;
  const value = Number(text);
  return value >= min && value <= max ? value : null;
};

export const RangeCounter = () => {
  const [startRaw, setStartRaw] = useState('1');
  const [endRaw, setEndRaw] = useState('10');
  const [stepRaw, setStepRaw] = useState('3');
  const [op, setOp] = useState('<');
  const start = parseIntInRange(startRaw, -100, 100);
  const end = parseIntInRange(endRaw, -100, 100);
  const step = parseIntInRange(stepRaw, 1, 20);
  const valid = start !== null && end !== null && step !== null;

  const values = [];
  let finalI = start;
  if (valid) {
    let i = start;
    while (op === '<' ? i < end : i <= end) {
      values.push(i);
      i += step;
    }
    finalI = i;
  }
  const shown = values.length > 24 ? [...values.slice(0, 24), '…'] : values;

  const inputClass = 'w-20 rounded-lg border-2 border-indigo-300 bg-white px-2 py-1 text-center font-mono focus:border-indigo-500 outline-none';

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-indigo-900">次数实验：先列出 i 的取值，再数次数</h3>
      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-sm">
        <span className="text-purple-700">for</span> (i =
        <input aria-label="起点" type="text" inputMode="numeric" value={startRaw} onChange={(e) => setStartRaw(e.target.value)} className={inputClass} />;
        i
        <div className="flex gap-1">
          {['<', '<='].map((item) => (
            <button key={item} type="button" aria-pressed={op === item} onClick={() => setOp(item)} className={`rounded border px-2 py-1 font-bold ${op === item ? 'border-indigo-500 bg-white text-indigo-800' : 'border-indigo-200 text-indigo-500 hover:bg-white'}`}>{item}</button>
          ))}
        </div>
        <input aria-label="终点" type="text" inputMode="numeric" value={endRaw} onChange={(e) => setEndRaw(e.target.value)} className={inputClass} />;
        i +=
        <input aria-label="步长" type="text" inputMode="numeric" value={stepRaw} onChange={(e) => setStepRaw(e.target.value)} className={inputClass} />)
      </div>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="rounded-lg border border-indigo-100 bg-white p-3 text-sm text-slate-700">
            <strong>i 依次取：</strong>
            <span className="font-mono">{shown.length > 0 ? shown.join('，') : '（第一次判断就为假，一个值也没有）'}</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
              <div className="text-xs font-bold text-slate-500">循环体执行次数</div>
              <div className="font-mono text-3xl font-bold text-indigo-700">{values.length}</div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
              <div className="text-xs font-bold text-slate-500">循环结束时 i 的值</div>
              <div className="font-mono text-3xl font-bold text-indigo-700">{finalI}</div>
            </div>
          </div>
          <p className="text-sm text-indigo-900">结束值是第一个让条件变假的值：{finalI} {op} {end} 为假。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">起点、终点请输入 -100～100 的整数，步长请输入 1～20 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};
