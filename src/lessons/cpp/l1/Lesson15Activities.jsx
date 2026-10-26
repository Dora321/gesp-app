import { useState } from 'react';
import { ArrowRight, RotateCw, Search, Square } from 'lucide-react';

// 第 15 课的互动实验。课页 Lesson15.jsx 只负责编排，实验组件放在这里。
// FactorScanner 由旧第 15 课的“因数扫描仪”改写：去掉自动计时，改为逐步检验。

const parseIntInRange = (raw, min, max) => {
  const text = raw.trim();
  if (!/^\d{1,5}$/.test(text)) return null;
  const value = Number(text);
  return value >= min && value <= max ? value : null;
};

// --- 因数扫描：i 从 1 试到 n ---
export const FactorScanner = () => {
  const [raw, setRaw] = useState('12');
  const [current, setCurrent] = useState(0);
  const n = parseIntInRange(raw, 1, 60);
  const valid = n !== null;
  const safeCurrent = valid ? Math.min(current, n) : 0;
  const finished = valid && safeCurrent === n;
  const factors = valid ? Array.from({ length: safeCurrent }, (_, index) => index + 1).filter((i) => n % i === 0) : [];

  const changeN = (value) => {
    setRaw(value);
    setCurrent(0);
  };

  return (
    <div className="w-full rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-teal-800">
        <Search size={20} /> 因数扫描：i 从 1 试到 n
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 font-mono text-sm font-bold text-teal-900">
          n =
          <input
            aria-label="要找因数的 n"
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={(e) => changeN(e.target.value)}
            className="w-20 rounded-lg border-2 border-teal-300 bg-white px-2 py-1 text-center font-mono outline-none focus:border-teal-500"
          />
        </label>
        <button type="button" onClick={() => setCurrent(safeCurrent + 1)} disabled={!valid || finished} className="flex items-center gap-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300">
          试下一个 i <ArrowRight size={16} />
        </button>
        <button type="button" onClick={() => setCurrent(valid ? n : 0)} disabled={!valid || finished} className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-teal-700 ring-1 ring-teal-200 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-50">
          全部试完
        </button>
        <button type="button" onClick={() => setCurrent(0)} className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50">
          <RotateCw size={16} /> 重置
        </button>
      </div>

      {valid ? (
        <div role="status" className="space-y-3">
          <div className="flex flex-wrap gap-2 rounded-xl border border-teal-100 bg-white p-4">
            {Array.from({ length: n }, (_, index) => index + 1).map((i) => {
              const tried = i <= safeCurrent;
              const isFactor = tried && n % i === 0;
              const isCurrent = i === safeCurrent;
              return (
                <span
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold ${isFactor ? 'bg-green-500 text-white' : tried ? 'bg-slate-100 text-slate-400' : 'bg-white text-slate-500 ring-1 ring-slate-200'} ${isCurrent ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  {i}
                </span>
              );
            })}
          </div>
          <p className="rounded-lg border border-teal-100 bg-white p-3 font-mono text-sm text-slate-700">
            {safeCurrent === 0
              ? '还没有开始：i 从 1 开始，不能从 0 开始（n % 0 是除以 0）。'
              : `i = ${safeCurrent}：${n} % ${safeCurrent} = ${n % safeCurrent}，${n % safeCurrent === 0 ? '是因数，cnt++' : '不是因数'}`}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-teal-100">
              <div className="text-xs font-bold text-slate-500">已找到的因数</div>
              <div className="font-mono text-lg font-bold text-teal-700">{factors.length > 0 ? factors.join('、') : '—'}</div>
            </div>
            <div className="rounded-lg bg-white p-3 text-center ring-1 ring-teal-100">
              <div className="text-xs font-bold text-slate-500">cnt</div>
              <div className="font-mono text-3xl font-bold text-teal-700">{factors.length}</div>
            </div>
          </div>
          {finished && (
            <p className="text-sm font-bold text-teal-900">
              {n} 共有 {factors.length} 个因数，{factors.length === 2 ? '恰好 2 个，是质数。' : n === 1 ? '只有 1 个，1 不是质数。' : '多于 2 个，不是质数。'}
            </p>
          )}
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～60 的正整数；空白、0 或非法输入不显示结果。</p>
      )}
    </div>
  );
};

// --- 平方数 / 立方数：i 从 1 往上试，超过 n 就停 ---
export const PowerChecker = () => {
  const [raw, setRaw] = useState('49');
  const [mode, setMode] = useState('square');
  const n = parseIntInRange(raw, 1, 10000);
  const valid = n !== null;
  const power = (i) => (mode === 'square' ? i * i : i * i * i);
  const powerText = mode === 'square' ? 'i * i' : 'i * i * i';

  const tried = [];
  let found = null;
  if (valid) {
    for (let i = 1; power(i) <= n; i += 1) {
      tried.push({ i, value: power(i) });
      if (power(i) === n) {
        found = i;
        break;
      }
    }
  }
  const lastI = tried.length > 0 ? tried[tried.length - 1].i : 0;
  const shown = tried.length > 24 ? tried.slice(tried.length - 24) : tried;

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900">
        <Square size={20} /> 平方数与立方数：{powerText} &lt;= n 时才继续试
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        {[['square', '完全平方数'], ['cube', '立方数']].map(([id, label]) => (
          <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={`rounded-lg border px-3 py-1 font-bold ${mode === id ? 'border-indigo-500 bg-white text-indigo-800' : 'border-indigo-200 text-indigo-500 hover:bg-white'}`}>{label}</button>
        ))}
        <label className="flex items-center gap-2 font-mono font-bold text-indigo-900">
          n =
          <input aria-label="要判断的 n" type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} className="w-24 rounded-lg border-2 border-indigo-300 bg-white px-2 py-1 text-center font-mono outline-none focus:border-indigo-500" />
        </label>
      </div>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tried.length > shown.length && <span className="rounded-lg bg-white px-2 py-1 font-mono text-sm text-slate-400 ring-1 ring-indigo-100">…</span>}
            {shown.map(({ i, value }) => (
              <span key={i} className={`rounded-lg px-2 py-1 font-mono text-sm ring-1 ${value === n ? 'bg-green-100 font-bold text-green-800 ring-green-300' : 'bg-white text-slate-600 ring-indigo-100'}`}>
                i = {i}：{value}
              </span>
            ))}
          </div>
          <p className="rounded-lg border border-indigo-100 bg-white p-3 text-sm text-slate-700">
            {found !== null
              ? `i = ${found} 时 ${powerText} == ${n}，found = true，break。${n} 是${mode === 'square' ? '完全平方数' : '立方数'}。`
              : `试到 i = ${lastI} 都不相等；i = ${lastI + 1} 时 ${powerText} = ${power(lastI + 1)} > ${n}，循环结束。${n} 不是${mode === 'square' ? '完全平方数' : '立方数'}。`}
          </p>
          <p className="text-sm text-indigo-900">一共只试了 {tried.length} 个 i，不用试到 n。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～10000 的正整数；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};
