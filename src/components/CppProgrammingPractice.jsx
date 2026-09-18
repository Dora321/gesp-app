import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Download, ExternalLink } from 'lucide-react';
import { cppProgrammingBridges, cppProgrammingExercises, getCppProgrammingExercise } from '../data/cppProgrammingPractice';

const checks = ['已在本机编译并运行程序', '已逐组核对题目样例', '已补测边界，并能解释解题思路'];

function PracticeCard({ exercise }) {
  const storageKey = `gesp:cpp-practice:v1:${exercise.id}`;
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return checks.map((_, index) => saved?.[index] === true);
    } catch { return checks.map(() => false); }
  });
  const [storageError, setStorageError] = useState(false);
  const bridge = cppProgrammingBridges[exercise.level];

  const toggleCheck = index => {
    const next = completed.map((value, i) => i === index ? !value : value);
    setCompleted(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageError(false);
    } catch { setStorageError(true); }
  };

  const downloadTask = () => {
    const text = [
      `# ${exercise.title}`, `原创课堂练习 · C++ ${exercise.level} 级课程 · 第 ${exercise.lesson} 课`,
      `训练重点：${exercise.focus}`, exercise.statement,
      `## 输入格式\n${exercise.input}`, `## 输出格式\n${exercise.output}`,
      ...exercise.samples.map((sample, index) => `## 样例 ${index + 1}\n输入：\n\`\`\`text\n${sample.input || '（无输入）'}\n\`\`\`\n输出：\n\`\`\`text\n${sample.output}\n\`\`\``),
      `## 边界自测\n${exercise.boundary}`, '## 提交清单\n源代码 .cpp、样例运行结果、自选边界数据与结果、一句错因复盘。',
      `## GESP 阶段迁移\n${bridge.after}\n${bridge.problemTitle}：https://www.luogu.com.cn/problem/${bridge.problem}`,
    ].join('\n\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${exercise.id}-task.md`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section id="programming-practice" aria-label="本课上机练习" className="mt-8 scroll-mt-24 rounded-xl border border-teal-200 bg-white p-5 text-slate-800 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-teal-700"><Code2 size={18} /> 本课上机 · 原创课堂练习</p>
          <h2 className="mt-2 text-2xl font-black">{exercise.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{exercise.focus} · 建议 {exercise.level === 1 ? '10–20' : '20–35'} 分钟（课堂建议，非考试时限）</p>
        </div>
        <button type="button" onClick={downloadTask} className="flex min-h-11 items-center gap-2 rounded-lg border border-teal-200 px-3 py-2 text-sm font-bold text-teal-800 hover:bg-teal-50">
          <Download size={16} /> 下载题目单
        </button>
      </div>
      <p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm leading-relaxed text-teal-900">读题并手算 → 本机新建 .cpp 文件 → 编译运行 → 比对样例 → 补测边界。这里记录自查，不提供在线编译或自动判分。</p>
      <p className="mt-5 leading-relaxed">{exercise.statement}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div><h3 className="font-bold">输入格式与范围</h3><p className="mt-1 text-sm leading-relaxed">{exercise.input}</p></div>
        <div><h3 className="font-bold">输出格式</h3><p className="mt-1 text-sm leading-relaxed">{exercise.output}</p></div>
      </div>
      <div className="mt-5 space-y-3">
        {exercise.samples.map((sample, index) => (
          <div key={index} className="rounded-lg border border-slate-200 p-3">
            <h3 className="mb-2 text-sm font-bold">样例 {index + 1}</h3>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              <div className="min-w-0"><p className="mb-1 text-xs text-slate-500">输入</p><pre className="overflow-x-auto rounded bg-slate-50 p-3 text-sm"><code>{sample.input || '（无输入）'}</code></pre></div>
              <div className="min-w-0"><p className="mb-1 text-xs text-slate-500">输出</p><pre className="overflow-x-auto rounded bg-slate-50 p-3 text-sm"><code>{sample.output}</code></pre></div>
            </div>
          </div>
        ))}
      </div>
      <details className="mt-4 rounded-lg border border-amber-200 p-3">
        <summary className="cursor-pointer py-1 font-bold text-amber-900">卡住时再看：思路提示</summary>
        <p className="mt-2 text-sm leading-relaxed">{exercise.hint}</p>
      </details>
      <div className="mt-4 rounded-lg bg-slate-50 p-4">
        <h3 className="font-bold">验收与边界自测</h3>
        <p className="mt-2 text-sm leading-relaxed">{exercise.boundary}</p>
        <p className="mt-2 text-sm leading-relaxed">提交 .cpp 源代码、样例运行结果、自选边界数据与结果，再写一句“我遇到的问题和修改方法”。输出中不要添加“请输入”等题目未要求的文字。</p>
        <div className="mt-3 space-y-2">
          {checks.map((label, index) => <label key={label} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={completed[index]} onChange={() => toggleCheck(index)} className="h-4 w-4 accent-teal-700" />{label}</label>)}
        </div>
        <p className="mt-2 text-xs text-slate-600" aria-live="polite">自查 {completed.filter(Boolean).length}/{checks.length} · {storageError ? '当前浏览器无法保存，刷新后记录可能丢失。' : '记录保存在当前浏览器，不代表评测通过或考级达标。'}</p>
      </div>
      <details className="mt-4 rounded-lg border border-slate-200 p-3">
        <summary className="cursor-pointer py-1 font-bold">完成尝试后对照：参考实现（C++17）</summary>
        <p className="mt-2 text-sm text-slate-600">先保留自己的代码，比较思路与边界处理；能够重新独立写出才算掌握。</p>
        <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100"><code>{exercise.referenceCode}</code></pre>
      </details>
      <div className="mt-5 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
        <h3 className="font-bold text-indigo-900">学完后迁移到 GESP 真题</h3>
        <p className="mt-2 text-sm leading-relaxed">{bridge.focus} {bridge.after}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={`https://www.luogu.com.cn/problem/${bridge.problem}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-700 px-3 py-2 text-sm font-bold text-white hover:bg-indigo-800">{bridge.problemTitle} · 原题与提交 <ExternalLink size={14} /></a>
          <Link to={`/question-bank/${exercise.level}/${bridge.paper}`} className="inline-flex min-h-11 items-center rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-bold text-indigo-800">{bridge.title} · 阶段综合卷</Link>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-600">外部提交可能需要洛谷账号。原题的输入格式与限制以原题页为准；完成后按“读题、算法、边界、格式”归类错因，回到对应课程补练。</p>
      </div>
    </section>
  );
}

export default function CppProgrammingPractice({ level, lessonId }) {
  const exercise = getCppProgrammingExercise(level, lessonId);
  return exercise ? <PracticeCard key={exercise.id} exercise={exercise} /> : null;
}

export function CppProgrammingRoadmap({ level }) {
  const exercises = cppProgrammingExercises.filter(item => item.level === Number(level));
  if (!exercises.length) return null;
  return (
    <section aria-label="上机与备考路线" className="my-5 rounded-xl border border-teal-200 bg-white p-5 text-slate-800 shadow-sm">
      <h2 className="flex items-center gap-2 text-xl font-black"><Code2 size={22} className="text-teal-700" /> 上机与备考路线</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">本级安排 {exercises.length} 道原创上机题。按课程顺序完成，在本机编程，用样例和边界数据验收，再进入阶段真题。各级内容按当前课程编排，拓展内容不等同于本级必考范围。</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {exercises.map(exercise => <Link key={exercise.id} to={`/lesson/${level}/${exercise.lesson}#programming-practice`} className="rounded-lg border border-slate-200 p-3 transition hover:border-teal-400 hover:bg-teal-50"><span className="text-xs font-bold text-teal-700">第 {exercise.lesson} 课 · 上机任务</span><span className="mt-1 block text-sm font-bold">{exercise.title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">{exercise.focus}</span></Link>)}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">建议课堂节奏：知识点讲解 → 手算样例 → 独立编程 → 边界测试 → 错因复盘。阶段真题先独立完成，再看解析。</p>
    </section>
  );
}
