import { useState } from 'react';
import { AlertTriangle, Terminal } from 'lucide-react';

// 第 9 课的互动实验。课页 Lesson9.jsx 只负责编排，实验组件放在这里。

const OutputPanel = ({ children }) => (
  <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

export const TrapVisualizer = () => {
  const [nInput, setNInput] = useState('21');
  const parsedInput = Number(nInput);
  const hasValidInput = /^\d+$/.test(nInput) && Number.isSafeInteger(parsedInput) && parsedInput <= 1000000;

  let output = '请输入 0～1000000 的整数';
  let step1 = false;
  let step2 = false;

  if (hasValidInput && parsedInput % 3 === 0) {
    output = "能被3整除";
    step1 = true;
  } else if (hasValidInput && parsedInput % 7 === 0) {
    output = "能被7整除";
    step2 = true;
  } else if (hasValidInput) {
    output = "不能被3和7整除";
  }

  return (
    <div className="w-full rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-orange-800">
        <AlertTriangle className="text-orange-600" size={22} /> 输入实验：被忽略的 7
      </h3>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-9-trap-n" className="font-bold text-gray-700">输入 N：</label>
        <input
          id="l1-9-trap-n"
          type="text"
          inputMode="numeric"
          aria-invalid={!hasValidInput}
          value={nInput}
          onChange={(e) => setNInput(e.target.value)}
          className="w-24 rounded border-2 border-orange-300 px-3 py-2 text-center font-mono text-xl font-bold focus:border-orange-500 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {[21, 14, 9, 5].map(val => (
            <button key={val} type="button" onClick={() => setNInput(String(val))} className="rounded border bg-white px-2 py-1 text-xs transition hover:bg-orange-100">
              试 {val}
            </button>
          ))}
        </div>
      </div>
      {!hasValidInput && <p role="alert" className="mb-4 text-sm font-semibold text-red-700">请输入 0～1000000 的整数，再观察分支。</p>}

      <div className="rounded-lg border border-orange-100 bg-white p-5 font-mono text-sm shadow-sm">
        <div className={`mb-2 flex items-center justify-between rounded p-3 transition-all ${step1 ? 'border-l-4 border-green-500 bg-green-100' : 'bg-gray-50'}`}>
          <span className="text-gray-800"><span className="font-bold text-purple-600">if</span> (N % 3 == 0)</span>
          <span className={step1 ? "font-bold text-green-700" : "text-red-400"}>
            {hasValidInput ? (parsedInput % 3 === 0 ? "成立" : "不成立") : "待输入"}
          </span>
        </div>
        {step1 && <div className="mb-2 ml-8 italic text-gray-500">执行 cout &lt;&lt; "能被3整除";</div>}

        <div className={`mb-2 flex items-center justify-between rounded p-3 transition-all ${step1 ? 'opacity-30 grayscale' : (step2 ? 'border-l-4 border-green-500 bg-green-100' : 'bg-gray-50')}`}>
          <span className="text-gray-800"><span className="font-bold text-purple-600">else if</span> (N % 7 == 0)</span>
          <span className={step1 ? "font-bold text-gray-400" : (hasValidInput && parsedInput % 7 === 0 ? "font-bold text-green-700" : "text-red-400")}>
            {step1 ? "不再检查" : (hasValidInput ? (parsedInput % 7 === 0 ? "成立" : "不成立") : "待输入")}
          </span>
        </div>
        <div className={`mb-2 rounded p-3 transition-all ${hasValidInput && !step1 && !step2 ? 'border-l-4 border-green-500 bg-green-100' : 'opacity-40'}`}>
          <span className="text-gray-800"><span className="font-bold text-purple-600">else</span> 输出“不能被3和7整除”</span>
        </div>

        {hasValidInput && parsedInput % 21 === 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-100 p-3 text-sm font-bold text-red-700">
            <AlertTriangle size={16} /> {parsedInput} 也能被 7 整除，但第一支已经命中，第二个条件根本没有检查。
          </div>
        )}
      </div>

      <div role="status" className="mt-4 rounded-lg bg-gray-800 p-3 font-mono text-green-400 shadow-inner">
        <span className="select-none text-gray-500">$ </span>
        输出：{output}
      </div>
    </div>
  );
};

export const WeatherReporter = () => {
  const [temp, setTemp] = useState(25);
  const [brokenMode, setBrokenMode] = useState(false);

  const output = [];
  if (brokenMode) {
    // 改成两个独立的 if：else 只属于 if (t < 10)
    if (temp > 35) output.push("Hot");
    if (temp < 10) output.push("Cold");
    else output.push("Good");
  } else if (temp > 35) {
    output.push("Hot");
  } else if (temp < 10) {
    output.push("Cold");
  } else {
    output.push("Good");
  }

  return (
    <div className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-800">
        <Terminal className="text-blue-600" size={22} /> 对照实验：把 else if 改成 if
      </h3>

      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">温度 t：</span>
          <input
            type="range" min="-5" max="45"
            aria-label="温度，单位摄氏度"
            value={temp}
            onChange={(e) => setTemp(parseInt(e.target.value, 10))}
            className="w-32 cursor-pointer accent-blue-600"
          />
          <span className="rounded border border-blue-200 bg-white px-3 py-1 font-mono text-xl font-bold text-blue-600">{temp}</span>
        </div>

        <label className={`flex cursor-pointer select-none items-center gap-2 rounded border px-3 py-1 transition-colors ${brokenMode ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
          <input
            type="checkbox"
            checked={brokenMode}
            onChange={(e) => setBrokenMode(e.target.checked)}
            className="h-4 w-4 accent-red-500"
          />
          <span className={brokenMode ? "text-sm font-bold text-red-600" : "text-sm text-gray-600"}>
            把第二行的 else if 改成 if
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-300 shadow-inner">
          <div><span className="text-purple-400">if</span> (t &gt; 35) cout &lt;&lt; "Hot";</div>
          <div className="mt-2">
            <span className={brokenMode ? "rounded bg-red-900/50 px-1 font-bold text-red-400" : "text-purple-400"}>
              {brokenMode ? "if" : "else if"}
            </span> (t &lt; 10) cout &lt;&lt; "Cold";
          </div>
          <div className="mt-2"><span className="text-purple-400">else</span> cout &lt;&lt; "Good";</div>
        </div>

        <div role="status" className="flex flex-col justify-center rounded-lg bg-black p-4 font-mono text-green-400 shadow-lg">
          <div className="mb-2 border-b border-gray-800 pb-1 text-xs text-gray-500">输出</div>
          <div className="ml-2 text-xl font-bold">{output.join('')}</div>
          {brokenMode && output.length > 1 && (
            <div className="mt-4 border-t border-red-900/50 pt-2 text-xs font-bold text-red-400">
              {temp} 度既输出 Hot 又输出 Good：第二个 if 独立了，最后的 else 只属于 if (t &lt; 10)，t ≥ 10 时都会输出 Good。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const fallCode = [
  { text: 'switch (k) {', kind: 'head' },
  { text: '    case 1: cout << "one" << endl;', kind: 'case', value: 1, out: 'one' },
  { text: '    case 2: cout << "two" << endl;', kind: 'case', value: 2, out: 'two' },
  { text: '    case 3: cout << "three" << endl; break;', kind: 'case', value: 3, out: 'three', breaks: true },
  { text: '    default: cout << "other" << endl;', kind: 'default', out: 'other' },
  { text: '}', kind: 'tail' },
];

export const FallThroughLab = () => {
  const [k, setK] = useState(2);
  const startIndex = fallCode.findIndex((line) => line.kind === 'case' && line.value === k);
  const entry = startIndex === -1 ? fallCode.findIndex((line) => line.kind === 'default') : startIndex;
  const executed = [];
  for (let i = entry; i < fallCode.length; i += 1) {
    const line = fallCode[i];
    if (line.kind === 'tail') break;
    executed.push(i);
    if (line.breaks) break;
  }
  const outputs = executed.map((i) => fallCode[i].out);

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">执行路径实验：k 取不同值时执行哪几行</h3>
      <div className="mb-4 flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((value) => (
          <button key={value} type="button" aria-pressed={k === value} onClick={() => setK(value)} className={`rounded-lg border px-3 py-1 font-mono text-sm font-bold ${k === value ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-200 bg-white text-gray-600 hover:bg-blue-50'}`}>k = {value}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1 rounded-xl bg-gray-900 p-4 font-mono text-sm text-gray-300">
          {fallCode.map((line, index) => (
            <div key={line.text} className={`whitespace-pre rounded px-2 py-1 ${executed.includes(index) ? (index === entry ? 'border-l-4 border-green-500 bg-green-900/50 font-bold text-green-400' : 'border-l-4 border-amber-400 bg-amber-900/40 text-amber-200') : ''}`}>{line.text}</div>
          ))}
        </div>
        <div role="status" className="flex flex-col justify-center gap-3">
          <OutputPanel>{outputs.join('\n')}</OutputPanel>
          <p className="text-sm text-gray-700">
            {startIndex === -1
              ? `没有值为 ${k} 的 case，执行 default。`
              : `从 case ${k} 开始执行${executed.length > 1 ? '，没有 break 就继续往下（黄色行是穿透执行的）' : ''}${fallCode[executed[executed.length - 1]].breaks ? '，到 case 3 的 break 跳出。' : '。'}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export const DaysLab = () => {
  const [rawY, setRawY] = useState('2024');
  const [rawM, setRawM] = useState('2');
  const validY = /^[1-9]\d{0,3}$/.test(rawY.trim());
  const validM = /^\d{1,2}$/.test(rawM.trim()) && Number(rawM) >= 1 && Number(rawM) <= 12;
  const valid = validY && validM;
  const y = Number(rawY);
  const m = Number(rawM);
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  let group = 'default（2 月）';
  let days = leap ? 29 : 28;
  if ([1, 3, 5, 7, 8, 10, 12].includes(m)) {
    group = 'case 1: case 3: case 5: case 7: case 8: case 10: case 12:';
    days = 31;
  } else if ([4, 6, 9, 11].includes(m)) {
    group = 'case 4: case 6: case 9: case 11:';
    days = 30;
  }

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">每月天数实验</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-9-year" className="text-sm font-bold text-gray-700">年 y（1～9999）：</label>
        <input id="l1-9-year" type="text" inputMode="numeric" value={rawY} onChange={(e) => setRawY(e.target.value)} className="w-28 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <label htmlFor="l1-9-month" className="text-sm font-bold text-gray-700">月 m（1～12）：</label>
        <input id="l1-9-month" type="text" inputMode="numeric" value={rawM} onChange={(e) => setRawM(e.target.value)} className="w-20 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
      </div>
      {valid ? (
        <div role="status" className="space-y-2 font-mono text-sm">
          <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            <span>进入</span><span className="font-bold">{group}</span>
          </div>
          {m === 2 && (
            <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2">
              <span>(y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0</span><span className="font-bold">{leap ? '1，闰年' : '0，平年'}</span>
            </div>
          )}
          <div className="rounded-lg bg-green-100 p-3 text-center font-bold text-green-800">输出 {days}</div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～9999 的年份和 1～12 的月份；空白或非法输入不显示结果。</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {[['2024', '2'], ['2100', '2'], ['2022', '1'], ['2020', '2'], ['2023', '11']].map(([yy, mm]) => (
          <button key={`${yy}-${mm}`} type="button" onClick={() => { setRawY(yy); setRawM(mm); }} className="rounded border bg-white px-2 py-1 text-xs hover:bg-blue-50">试 {yy} {mm}</button>
        ))}
      </div>
    </div>
  );
};

export const BatteryLab = () => {
  const [raw, setRaw] = useState('19');
  const trimmed = raw.trim();
  const valid = /^\d{1,3}$/.test(trimmed) && Number(trimmed) >= 1 && Number(trimmed) <= 100;
  const p = Number(trimmed);
  const hit = !valid ? -1 : p <= 10 ? 0 : p <= 20 ? 1 : 2;
  const lines = ['if (P <= 10) cout << "R" << endl;', 'else if (P <= 20) cout << "L" << endl;', 'else cout << P << endl;'];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <span className="mb-3 inline-block rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">2025 年 12 月 GESP C++ 一级编程题第 2 题《手机电量显示》的分支部分</span>
      <h3 className="mb-2 text-lg font-bold text-gray-800">电量显示：一组输入的版本</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-700">电量 P ≤ 10 显示 R；10 &lt; P ≤ 20 显示 L；P &gt; 20 直接显示数字 P。原题先读入组数 T，再处理 T 组数据；学完循环后再写完整版。</p>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-9-battery" className="text-sm font-bold text-gray-700">电量 P（1～100）：</label>
        <input id="l1-9-battery" type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <div className="flex flex-wrap gap-2">
          {['10', '1', '20', '99', '19'].map((value) => (
            <button key={value} type="button" onClick={() => setRaw(value)} className="rounded border bg-white px-2 py-1 text-xs hover:bg-blue-50">试 {value}</button>
          ))}
        </div>
      </div>
      {valid ? (
        <div role="status" className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 rounded-xl bg-gray-900 p-4 font-mono text-sm text-gray-300">
            {lines.map((line, index) => (
              <div key={line} className={`rounded px-2 py-1 ${index === hit ? 'border-l-4 border-green-500 bg-green-900/50 font-bold text-green-400' : index > hit ? 'opacity-40 line-through' : ''}`}>{line}</div>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <OutputPanel>{hit === 0 ? 'R' : hit === 1 ? 'L' : String(p)}</OutputPanel>
            <p className="text-sm text-gray-700">第二支只写 P &lt;= 20：能走到这里，P 一定大于 10。</p>
          </div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～100 的整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};
