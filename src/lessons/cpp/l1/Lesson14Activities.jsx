import { useState } from 'react';
import { Inbox } from 'lucide-react';

// 第 14 课的互动实验。课页 Lesson14.jsx 只负责编排，实验组件放在这里。

const MAX_COUNT = 20;

const parseNumbers = (raw) => {
  const parts = raw.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0 || parts.length > MAX_COUNT) return null;
  if (!parts.every((part) => /^-?\d{1,4}$/.test(part))) return null;
  const values = parts.map(Number);
  return values.every((value) => value >= -1000 && value <= 1000) ? values : null;
};

// --- 读入统计实验：一边读一边更新计数器、累加器和最值 ---
export const ReadStatsLab = () => {
  const [raw, setRaw] = useState('90 45 60 59 100');
  const values = parseNumbers(raw);
  const valid = values !== null;

  const rows = [];
  let cnt = 0;
  let sum = 0;
  let mx = 0;
  let mn = 0;
  let mxZero = 0;
  if (valid) {
    values.forEach((x, index) => {
      if (x >= 60) cnt += 1;
      sum += x;
      if (index === 0) {
        mx = x;
        mn = x;
      } else {
        if (x > mx) mx = x;
        if (x < mn) mn = x;
      }
      if (x > mxZero) mxZero = x;
      rows.push({ index: index + 1, x, pass: x >= 60, cnt, sum, mx, mn });
    });
  }

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-indigo-900">
        <Inbox size={20} /> 读入统计实验：每读一个数，变量怎样更新
      </h3>
      <label className="mb-2 block text-sm font-bold text-indigo-900" htmlFor="lesson14-read-values">第二行的 n 个整数（空格分隔，-1000～1000，最多 20 个）</label>
      <input
        id="lesson14-read-values"
        type="text"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        className="mb-4 w-full rounded-lg border-2 border-indigo-300 bg-white px-3 py-2 font-mono outline-none focus:border-indigo-500"
      />
      {valid ? (
        <div role="status" className="space-y-3">
          <p className="rounded-lg border border-indigo-100 bg-white p-3 font-mono text-sm text-slate-700">程序读到的输入：第一行 n = {values.length}；第二行 {values.join(' ')}</p>
          <div className="overflow-x-auto rounded-lg border border-indigo-100 bg-white">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="bg-indigo-100 text-indigo-900">
                  <th className="p-2">第 i 个</th>
                  <th className="p-2">x</th>
                  <th className="p-2">x &gt;= 60</th>
                  <th className="p-2">cnt</th>
                  <th className="p-2">sum</th>
                  <th className="p-2">mx</th>
                  <th className="p-2">mn</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {rows.map((row) => (
                  <tr key={row.index} className="odd:bg-slate-50">
                    <td className="p-2 font-sans font-bold">{row.index}</td>
                    <td className="p-2">{row.x}</td>
                    <td className={`p-2 ${row.pass ? 'font-bold text-green-700' : 'text-slate-400'}`}>{row.pass ? '真' : '假'}</td>
                    <td className="p-2">{row.cnt}</td>
                    <td className="p-2">{row.sum}</td>
                    <td className="p-2">{row.mx}</td>
                    <td className="p-2">{row.mn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['及格人数 cnt', cnt],
              ['总和 sum', sum],
              ['最高 mx / 最低 mn', `${mx} ${mn}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white p-3 text-center ring-1 ring-indigo-100">
                <div className="text-xs font-bold text-slate-500">{label}</div>
                <div className="font-mono text-2xl font-bold text-indigo-700">{value}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-indigo-900">第 1 行的 mx、mn 直接取第一个数；从第 2 个数开始才比较。</p>
          {mxZero !== mx && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950">如果 mx 的初值随手写 0，这组数据会得到 mx = {mxZero}，而真正的最大值是 {mx}：所有数都小于 0 时，0 从来没有被换掉。</p>
          )}
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～20 个整数，用空格分隔，每个在 -1000～1000 之间；空白或非法输入不显示结果。</p>
      )}
    </div>
  );
};
