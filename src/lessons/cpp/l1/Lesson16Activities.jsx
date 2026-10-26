import { useState } from 'react';
import { ListChecks } from 'lucide-react';

// 第 16 课的互动实验：2026 年 3 月一级卷的错题回流表。课页 Lesson16.jsx 只负责编排。
// 每题只写考点和回到哪一课哪一节，不写答案；答案与解析在题库整卷页作答后查看。

const paper202603ReviewMap = [
  { id: '单选 1', topic: '计算机系统的输入设备', back: [[1, '输入与输出设备']] },
  { id: '单选 2', topic: '图形界面里给文件改名', back: [[1, '硬件、软件与操作系统']] },
  { id: '单选 3', topic: '变量名区分大小写', back: [[2, '变量命名三规则']] },
  { id: '单选 4', topic: '3 * 3 % 2：同级从左到右', back: [[3, '运算优先级与结合']] },
  { id: '单选 5', topic: 'a, b = 3, 4 是逗号表达式', back: [[5, '逗号运算符']] },
  { id: '单选 6', topic: 'cin 读 int 时输入小数或字母', back: [[6, '输入遇到非数字字符时']] },
  { id: '单选 7', topic: 'if-else 求差的绝对值', back: [[8, '较大值、较小值与差的绝对值']] },
  { id: '单选 8', topic: '累乘从 0 开始，%2d 输出', back: [[10, '计数、累加与累乘'], [6, '宽度与补零']] },
  { id: '单选 9', topic: '按 i % 3 决定加或减的累加', back: [[10, '计数、累加与累乘']] },
  { id: '单选 10', topic: 'continue、else 与循环结束值', back: [[12, 'break 与 continue 的规则']] },
  { id: '单选 11', topic: '求数位和', back: [[13, '位数与数位和']] },
  { id: '单选 12', topic: '统计奇数数位的个数', back: [[13, '取个位与去掉个位']] },
  { id: '单选 13', topic: '两数拼接与 if-else', back: [[8, 'if-else 双分支']] },
  { id: '单选 14', topic: '高 3 位与低 3 位：/ 1000 与 % 1000', back: [[3, '拆分固定位数'], [7, '把文字条件翻译成表达式']] },
  { id: '单选 15', topic: '奇数位与偶数位分别求和', back: [[13, '位数与数位和']] },
  { id: '判断 1', topic: '电话手表与操作系统', back: [[1, '硬件、软件与操作系统']] },
  { id: '判断 2', topic: '4 % 2 与 2 * 2 % 2', back: [[3, '运算优先级与结合']] },
  { id: '判断 3', topic: 'break 后循环变量的值', back: [[12, '找到就停：第一个满足条件的数']] },
  { id: '判断 4', topic: 'for 后面多了分号', back: [[10, '空循环体与循环内改 i']] },
  { id: '判断 5', topic: 'while (N) 执行 0 次或停不下来', back: [[11, '让条件最终变假']] },
  { id: '判断 6', topic: '用反转判断对称数', back: [[13, '数字反转']] },
  { id: '判断 7', topic: 'i 从 -N 开始、步长 2 的累加', back: [[10, '执行次数与结束值']] },
  { id: '判断 8', topic: 'printf 用 %d 输出小数', back: [[6, '常见错误与真题']] },
  { id: '判断 9', topic: 'cnt += i++ 与 for 的 i++', back: [[5, '自增与自减'], [10, '省略三段与自增']] },
  { id: '判断 10', topic: '%-5d 左对齐', back: [[6, '宽度与补零']] },
  { id: '编程 1', topic: '《交朋友》：最接近的身高', back: [[8, '较大值、较小值与差的绝对值']] },
  { id: '编程 2', topic: '《数字替换》：把 4 换成 8', back: [[13, '按位重建：替换数字']] },
];

const backText = (back) => back.map(([lesson, section]) => `第 ${lesson} 课「${section}」`).join('；');

// 全卷回学表：题号、考点、回到哪一课哪一节。
export const ReviewMapTable = () => (
  <div className="w-full overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-lg">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="bg-slate-100 text-slate-700">
          <th className="p-3">题号</th>
          <th className="p-3">考点</th>
          <th className="p-3">错了回到</th>
        </tr>
      </thead>
      <tbody>
        {paper202603ReviewMap.map((item) => (
          <tr key={item.id} className="border-t border-slate-100 odd:bg-slate-50">
            <td className="whitespace-nowrap p-3 font-bold text-slate-800">{item.id}</td>
            <td className="p-3 text-slate-700">{item.topic}</td>
            <td className="p-3 text-indigo-800">{backText(item.back)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ReviewRouter = () => {
  const [wrong, setWrong] = useState(() => new Set());

  const toggle = (id) => {
    setWrong((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const plan = new Map();
  paper202603ReviewMap.filter((item) => wrong.has(item.id)).forEach((item) => {
    item.back.forEach(([lesson, section]) => {
      const key = `${lesson}|${section}`;
      if (!plan.has(key)) plan.set(key, { lesson, section, items: [] });
      plan.get(key).items.push(item.id);
    });
  });
  const planRows = [...plan.values()].sort((a, b) => a.lesson - b.lesson);

  return (
    <div className="w-full rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-indigo-900">
        <ListChecks size={20} /> 错题回流表：勾选做错的题
      </h3>
      <p className="mb-4 text-sm text-indigo-900">每题只列考点，不列答案。勾选后，下方按课号汇总要回去重学的小节。</p>
      <div className="grid gap-2 md:grid-cols-3">
        {paper202603ReviewMap.map((item) => (
          <label key={item.id} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2 text-sm ${wrong.has(item.id) ? 'border-red-300 bg-red-50' : 'border-indigo-100 bg-white hover:bg-indigo-50'}`}>
            <input type="checkbox" checked={wrong.has(item.id)} onChange={() => toggle(item.id)} className="mt-1 h-4 w-4 shrink-0 accent-red-600" />
            <span>
              <strong className="block text-slate-800">{item.id}</strong>
              <span className="text-xs text-slate-600">{item.topic}</span>
            </span>
          </label>
        ))}
      </div>
      <div role="status" className="mt-4 rounded-lg border border-indigo-100 bg-white p-4">
        {planRows.length === 0 ? (
          <p className="text-sm text-slate-500">还没有勾选错题。做完整卷后回到这里勾选。</p>
        ) : (
          <ul className="space-y-2 text-sm text-slate-700">
            {planRows.map((row) => (
              <li key={`${row.lesson}-${row.section}`} className="rounded-lg bg-slate-50 p-2">
                <strong className="text-indigo-800">回到第 {row.lesson} 课「{row.section}」</strong>
                <span className="ml-2 text-slate-600">（{row.items.join('、')}）</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
