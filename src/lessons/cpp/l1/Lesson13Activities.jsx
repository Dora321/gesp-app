import { useState } from 'react';
import { Hash, Replace } from 'lucide-react';

// 第 13 课的互动实验。课页 Lesson13.jsx 只负责编排，实验组件放在这里。

const parseDigits = (raw, maxLength) => {
  const text = raw.trim();
  if (!new RegExp(`^\\d{1,${maxLength}}$`).test(text)) return null;
  return Number(text);
};

const splitRounds = (n) => {
  const rounds = [];
  let t = n;
  while (t > 0) {
    rounds.push({ before: t, d: t % 10, after: Math.floor(t / 10) });
    t = Math.floor(t / 10);
  }
  return rounds;
};

// --- 逐位拆解实验：位数、数位和、反转一起看 ---
export const DigitSplitLab = () => {
  const [raw, setRaw] = useState('3050');
  const n = parseDigits(raw, 9);
  const valid = n !== null;
  const rounds = valid ? splitRounds(n) : [];
  const sum = rounds.reduce((total, { d }) => total + d, 0);
  const reversed = rounds.reduce((r, { d }) => r * 10 + d, 0);

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900">
        <Hash size={20} /> 逐位拆解实验：while (n &gt; 0) 每轮做什么
      </h3>
      <label className="mb-4 flex flex-wrap items-center gap-2 font-mono text-sm">
        n =
        <input
          aria-label="非负整数 n"
          type="text"
          inputMode="numeric"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="w-36 rounded-lg border-2 border-indigo-300 bg-white px-2 py-1 text-center font-mono outline-none focus:border-indigo-500"
        />
      </label>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="overflow-x-auto rounded-lg border border-indigo-100 bg-white">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="bg-indigo-100 text-indigo-900">
                  <th className="p-2">轮次</th>
                  <th className="p-2">本轮开始时 n</th>
                  <th className="p-2">n % 10（个位）</th>
                  <th className="p-2">n / 10（去掉个位）</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {rounds.map((round, index) => (
                  <tr key={round.before} className="odd:bg-slate-50">
                    <td className="p-2 font-sans font-bold">第 {index + 1} 轮</td>
                    <td className="p-2">{round.before}</td>
                    <td className="p-2 font-bold text-indigo-700">{round.d}</td>
                    <td className="p-2">{round.after}</td>
                  </tr>
                ))}
                <tr className="bg-rose-50">
                  <td className="p-2 font-sans text-rose-700" colSpan={4}>判断 0 &gt; 0 为假，循环结束；循环体一共执行 {rounds.length} 次。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['位数 cnt', n === 0 ? '1（特判）' : rounds.length],
              ['数位和 sum', sum],
              ['反转 r', reversed],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
                <div className="text-xs font-bold text-slate-500">{label}</div>
                <div className="font-mono text-2xl font-bold text-indigo-700">{value}</div>
              </div>
            ))}
          </div>
          {n === 0 && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">n = 0 时 0 &gt; 0 第一次就为假，循环一次也不执行：cnt 停在 0，所以求位数要单独判断 n == 0 输出 1；数位和、反转自然是 0。</p>}
          {n > 0 && n % 10 === 0 && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">个位是 0：反转时开头的 0 不会出现在整数里，所以 {n} 反转得 {reversed}。</p>}
          <p className="text-sm text-indigo-900">循环结束后 n 已经变成 0。要输出原数 {n}，必须在循环前先备份：n0 = n。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 0～999999999 的非负整数（最多 9 位）；空白、负号或其他字符不显示结果。</p>
      )}
    </div>
  );
};

// --- 按位重建实验：把数字 x 换成 y ---
const parseDigit = (raw) => (/^\d$/.test(raw.trim()) ? Number(raw.trim()) : null);

export const DigitReplaceLab = () => {
  const [aRaw, setARaw] = useState('3030');
  const [xRaw, setXRaw] = useState('3');
  const [yRaw, setYRaw] = useState('7');
  const a = parseDigits(aRaw, 8);
  const x = parseDigit(xRaw);
  const y = parseDigit(yRaw);
  const valid = a !== null && x !== null && y !== null;

  const rows = [];
  let b = 0;
  if (valid) {
    let p = 1;
    for (const { d } of splitRounds(a)) {
      const nd = d === x ? y : d;
      b += nd * p;
      rows.push({ d, nd, p, b });
      p *= 10;
    }
  }

  const inputClass = 'w-16 rounded-lg border-2 border-teal-300 bg-white px-2 py-1 text-center font-mono outline-none focus:border-teal-500';

  return (
    <div className="w-full rounded-2xl border border-teal-200 bg-teal-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-teal-900">
        <Replace size={20} /> 按位重建实验：把数字 x 全部换成 y
      </h3>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-sm">
        <label className="flex items-center gap-2">a = <input aria-label="原数 a" type="text" inputMode="numeric" value={aRaw} onChange={(e) => setARaw(e.target.value)} className={`${inputClass} w-32`} /></label>
        <label className="flex items-center gap-2">x = <input aria-label="被替换的数字 x" type="text" inputMode="numeric" value={xRaw} onChange={(e) => setXRaw(e.target.value)} className={inputClass} /></label>
        <label className="flex items-center gap-2">y = <input aria-label="替换成的数字 y" type="text" inputMode="numeric" value={yRaw} onChange={(e) => setYRaw(e.target.value)} className={inputClass} /></label>
      </div>
      {valid ? (
        <div role="status" className="space-y-3">
          <div className="overflow-x-auto rounded-lg border border-teal-100 bg-white">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="bg-teal-100 text-teal-900">
                  <th className="p-2">取出的 d</th>
                  <th className="p-2">替换后 d</th>
                  <th className="p-2">这一位的权 p</th>
                  <th className="p-2">b += d * p 后</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {rows.map((row) => (
                  <tr key={row.p} className="odd:bg-slate-50">
                    <td className="p-2">{row.d}</td>
                    <td className={`p-2 ${row.d !== row.nd ? 'font-bold text-teal-700' : ''}`}>{row.nd}</td>
                    <td className="p-2">{row.p}</td>
                    <td className="p-2 font-bold">{row.b}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td className="p-3 font-sans text-sm text-slate-500" colSpan={4}>a = 0，循环一次也不执行。</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="rounded-lg bg-white p-3 text-center font-mono text-lg font-bold text-teal-800 ring-1 ring-teal-100">输出 b = {b}</p>
          {a === 0 && x === 0 && y !== 0 && <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">a = 0 时循环不执行，输出 0；如果题目要求把 0 换成 {y}，0 这个数要单独特判。</p>}
          <p className="text-sm text-teal-900">个位的权是 1，十位是 10，百位是 100……从个位开始，每处理一位 p 乘 10，替换后的数字放回原来的位置，0 位也照样保留。</p>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">a 请输入 0～99999999 的非负整数，x、y 各输入一个数字 0～9；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};
