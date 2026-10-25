import { useLocation } from 'react-router-dom';
const officialStandard = 'https://gesp.ccf.org.cn/101/1002/10255.html';
const extensions = {
  '/lesson/1/5': '本课的 ASCII 数值部分为二级前瞻。',
  '/lesson/1/12': '本课的多重循环为二级前瞻；一级先掌握单层循环。',
  '/lesson/2/12': '本课的一维数组为三级前瞻。',
  '/lesson/3/13': '本课图形练习用于复习拓展。',
};
export default function CourseScopeNote() {
  const { pathname } = useLocation();
  const cpp = pathname.startsWith('/lesson/');
  const project = pathname.startsWith('/python/') && !/^\/python\/f[1-7]$/.test(pathname);
  return <details className="mb-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700" aria-label="课程范围说明">
    <summary className="min-h-11 cursor-pointer py-3 font-semibold">学习范围与考试说明</summary>
    <p className="pb-3 leading-7">{cpp ? (extensions[pathname] || '本课属于站内教学路线，包含复习与拓展，课程编号不代表所有内容都是同级考点。') : project ? '这是综合应用或拓展项目；A 编号表示站内学习顺序，不是 GESP 认证等级。先完成页面列出的基础课程，再独立完成项目。' : 'F 编号表示 Python 基础课顺序，不是 GESP 认证等级。二维列表、异常处理等内容为后续项目铺垫，按学习目标逐步掌握。'}</p>
    {cpp && <p className="pb-3 leading-7">备考代码默认采用 C++11；不使用变长数组。四级函数考点不含匿名函数。课堂上机参考实现已按 C++11 检查，例题的拓展写法需与考点区分。</p>}
    <a className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline" href={officialStandard} target="_blank" rel="noreferrer">查看官方认证标准修订说明</a>
  </details>;
}
