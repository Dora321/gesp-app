import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

// 第 8 课的互动实验。课页 Lesson8.jsx 只负责编排，实验组件放在这里。

const OutputPanel = ({ children }) => (
  <pre tabIndex={0} className="overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm leading-relaxed text-green-400 shadow-inner"><code>{children}</code></pre>
);

export const MoneyBranchLab = () => {
  const [price, setPrice] = useState('12');
  const [money, setMoney] = useState('11');
  const validAmount = (value) => /^\d{1,5}$/.test(value.trim()) && Number(value) <= 10000;
  const valid = validAmount(price) && validAmount(money);
  const p = Number(price);
  const q = Number(money);
  const enough = valid && q >= p;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">钱够不够实验：看哪一支被执行</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-8-price" className="text-sm font-bold text-gray-700">价格 p：</label>
        <input id="l1-8-price" type="text" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <label htmlFor="l1-8-money" className="text-sm font-bold text-gray-700">带的钱 q：</label>
        <input id="l1-8-money" type="text" inputMode="numeric" value={money} onChange={(e) => setMoney(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
      </div>
      {valid ? (
        <div role="status" className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-xl bg-gray-900 p-4 font-mono text-sm text-gray-300">
            <div className="rounded p-2">
              <span className="text-purple-400">if</span> (q &gt;= p)
              <span className={`ml-3 font-bold ${enough ? 'text-green-400' : 'text-red-400'}`}>{q} &gt;= {p} {enough ? '成立' : '不成立'}</span>
            </div>
            <div className={`rounded p-2 pl-6 ${enough ? 'border-l-4 border-green-500 bg-green-900/50 font-bold text-green-400' : 'opacity-40 line-through'}`}>cout &lt;&lt; "Yes" &lt;&lt; endl;</div>
            <div className="rounded p-2"><span className="text-purple-400">else</span></div>
            <div className={`rounded p-2 pl-6 ${!enough ? 'border-l-4 border-green-500 bg-green-900/50 font-bold text-green-400' : 'opacity-40 line-through'}`}>cout &lt;&lt; "No" &lt;&lt; endl;</div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <OutputPanel>{enough ? 'Yes' : 'No'}</OutputPanel>
            <p className="text-sm text-gray-700">{enough ? '条件为真，执行 if 后面的语句，else 那一支被跳过。' : '条件为假，跳过 if 后面的语句，执行 else 后面的语句。'}</p>
          </div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 0～10000 的整数；空白或非法输入不显示结果。</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {[['12', '12'], ['12', '11'], ['0', '0']].map(([pp, qq]) => (
          <button key={`${pp}-${qq}`} type="button" onClick={() => { setPrice(pp); setMoney(qq); }} className="rounded border bg-white px-2 py-1 text-xs hover:bg-blue-50">试 p = {pp}，q = {qq}</button>
        ))}
      </div>
    </div>
  );
};

export const SemicolonTrap = () => {
  const [hasSemicolon, setHasSemicolon] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm">
      <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-800">
        <AlertTriangle size={20} /> 分号陷阱开关：if 后面多了一个分号
      </h3>
      <p className="mb-4 text-sm text-gray-700">a = 1 时，a &gt; 3 不成立，大括号里的输出本来不该执行。打开开关，在 if (a &gt; 3) 后面加一个分号再看输出。</p>

      <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={hasSemicolon}
            onChange={(e) => setHasSemicolon(e.target.checked)}
            className="h-5 w-5 accent-red-600"
          />
          <span className="font-bold text-red-700">在 if (a &gt; 3) 后面加分号</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-900 p-4 font-mono text-sm text-white">
          <div className="text-gray-400">int a = 1;</div>
          <div>
            <span className="text-purple-400">if</span> (a &gt; 3)
            {hasSemicolon && <span className="ml-1 rounded bg-red-600 px-1 text-white">;</span>}
            {hasSemicolon && <span className="ml-2 font-sans text-xs text-red-300">← if 到这里就结束了</span>}
          </div>
          <div>&#123;</div>
          <div className="pl-4 text-green-300">cout &lt;&lt; "big" &lt;&lt; endl;</div>
          <div>&#125;</div>
          <div>cout &lt;&lt; "end" &lt;&lt; endl;</div>
        </div>

        <div role="status" className={`rounded-lg border-2 p-4 ${hasSemicolon ? 'border-red-400 bg-red-100' : 'border-gray-300 bg-gray-100'}`}>
          <h4 className="mb-2 border-b border-gray-300 pb-1 font-bold text-gray-700">输出</h4>
          <pre className="font-mono font-bold text-gray-800">{hasSemicolon ? 'big\nend' : 'end'}</pre>
          <p className={`mt-2 text-xs leading-relaxed ${hasSemicolon ? 'text-red-800' : 'text-green-700'}`}>
            {hasSemicolon
              ? '分号本身是一条空语句，if 只管这条空语句；下面的大括号成了普通代码块，不管条件真假都会执行，所以多输出了 big。编译器不会报错，最多给一条警告。'
              : '没有分号时，大括号里的语句受 if 控制。a > 3 不成立，跳过 big，只输出 end。'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const WeekdayLab = () => {
  const [rawX, setRawX] = useState('6');
  const [rawN, setRawN] = useState('8');
  const validX = /^[1-7]$/.test(rawX.trim());
  const validN = /^\d{1,3}$/.test(rawN.trim()) && Number(rawN) >= 1 && Number(rawN) <= 364;
  const valid = validX && validN;
  const x = Number(rawX);
  const n = Number(rawN);
  const remainder = (x + n) % 7;
  const day = remainder === 0 ? 7 : remainder;

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-bold text-gray-800">星期实验：今天星期 x，过 n 天是星期几</h3>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label htmlFor="l1-8-week-x" className="text-sm font-bold text-gray-700">x（1～7，7 表示星期日）：</label>
        <input id="l1-8-week-x" type="text" inputMode="numeric" value={rawX} onChange={(e) => setRawX(e.target.value)} className="w-20 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
        <label htmlFor="l1-8-week-n" className="text-sm font-bold text-gray-700">n（1～364）：</label>
        <input id="l1-8-week-n" type="text" inputMode="numeric" value={rawN} onChange={(e) => setRawN(e.target.value)} className="w-24 rounded-lg border-2 border-gray-300 px-3 py-2 text-center font-mono text-lg focus:border-blue-500 outline-none" />
      </div>
      {valid ? (
        <div role="status" className="space-y-2 font-mono text-sm">
          <div className="flex justify-between rounded-lg border border-slate-100 bg-slate-50 p-2">
            <span>d = (x + n) % 7</span><span className="font-bold">({x} + {n}) % 7 = {remainder}</span>
          </div>
          <div className={`flex justify-between rounded-lg border p-2 ${remainder === 0 ? 'border-amber-300 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
            <span>if (d == 0) d = 7;</span><span className="font-bold">{remainder === 0 ? '余数为 0，改成 7' : '余数不为 0，不修正'}</span>
          </div>
          <div className="rounded-lg bg-green-100 p-3 text-center font-bold text-green-800">输出 {day}：星期{day === 7 ? '日' : '一二三四五六'[day - 1]}</div>
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">请输入 1～7 的 x 和 1～364 的 n；空白或非法输入不显示结果。</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {[['6', '8'], ['1', '6'], ['5', '3']].map(([xx, nn]) => (
          <button key={`${xx}-${nn}`} type="button" onClick={() => { setRawX(xx); setRawN(nn); }} className="rounded border bg-white px-2 py-1 text-xs hover:bg-blue-50">试 x = {xx}，n = {nn}</button>
        ))}
      </div>
    </div>
  );
};

const expressSamples = [
  { label: '样例 1', input: '100.4\n300.2\n60.6\n70.5', byV: '0.5 × 100.4 = 50.2', byG: 'G = 300.2 ≥ 300，按重量 N = 70.5', ans: '50.2' },
  { label: '样例 2', input: '99.8\n200.9\n60.2\n70.1', byV: '0.5 × 99.8 = 49.9', byG: 'G = 200.9 < 300，按重量 M = 60.2', ans: '49.9' },
];

export const ExpressSampleViewer = () => {
  const [index, setIndex] = useState(0);
  const sample = expressSamples[index];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h3 className="mr-2 text-lg font-bold text-gray-800">手算两组样例</h3>
        {expressSamples.map((item, i) => (
          <button key={item.label} type="button" aria-pressed={index === i} onClick={() => setIndex(i)} className={`rounded-lg border px-3 py-1 text-sm font-bold ${index === i ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-200 bg-white text-gray-600 hover:bg-blue-50'}`}>{item.label}</button>
        ))}
      </div>
      <div role="status" className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-bold text-slate-600">输入（四行）</p>
          <OutputPanel>{sample.input}</OutputPanel>
        </div>
        <ol className="list-none space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">1. 按体积：{sample.byV}</li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">2. {sample.byG}</li>
          <li className="rounded-lg border border-green-200 bg-green-50 p-3 font-bold text-green-800">3. 取较低者，保留一位小数：输出 {sample.ans}</li>
        </ol>
      </div>
    </div>
  );
};
