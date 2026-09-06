import { ArrowDown, CheckCircle2, ClipboardCheck, Target, Timer } from 'lucide-react';

// bullet 是 600 档，本来只给装饰性小圆点用；一旦拿来压白字，
// teal/amber/cyan/orange 这几档的对比度只有 3.2~3.7，过不了 AA。
// 所以另开一个 solid（700 档）专供承载文字的按钮和徽章。
const accentStyles = {
  blue: {
    solid: 'bg-blue-700',
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    bullet: 'bg-blue-600',
    heading: 'text-blue-900',
  },
  indigo: {
    solid: 'bg-indigo-700',
    border: 'border-indigo-100',
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    bullet: 'bg-indigo-600',
    heading: 'text-indigo-900',
  },
  teal: {
    solid: 'bg-teal-700',
    border: 'border-teal-100',
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    bullet: 'bg-teal-600',
    heading: 'text-teal-900',
  },
  amber: {
    solid: 'bg-amber-700',
    border: 'border-amber-100',
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    bullet: 'bg-amber-600',
    heading: 'text-amber-900',
  },
  emerald: {
    solid: 'bg-emerald-700',
    border: 'border-emerald-100',
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    bullet: 'bg-emerald-600',
    heading: 'text-emerald-900',
  },
  purple: {
    solid: 'bg-purple-700',
    border: 'border-purple-100',
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    bullet: 'bg-purple-600',
    heading: 'text-purple-900',
  },
  rose: {
    solid: 'bg-rose-700',
    border: 'border-rose-100',
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    bullet: 'bg-rose-600',
    heading: 'text-rose-900',
  },
  slate: {
    solid: 'bg-slate-700',
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    icon: 'text-slate-600',
    bullet: 'bg-slate-600',
    heading: 'text-slate-900',
  },
  violet: {
    solid: 'bg-violet-700',
    border: 'border-violet-100',
    bg: 'bg-violet-50',
    icon: 'text-violet-600',
    bullet: 'bg-violet-600',
    heading: 'text-violet-900',
  },
  cyan: {
    solid: 'bg-cyan-700',
    border: 'border-cyan-100',
    bg: 'bg-cyan-50',
    icon: 'text-cyan-700',
    bullet: 'bg-cyan-600',
    heading: 'text-cyan-900',
  },
  orange: {
    solid: 'bg-orange-700',
    border: 'border-orange-100',
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    bullet: 'bg-orange-600',
    heading: 'text-orange-900',
  },
  red: {
    solid: 'bg-red-700',
    border: 'border-red-100',
    bg: 'bg-red-50',
    icon: 'text-red-600',
    bullet: 'bg-red-600',
    heading: 'text-red-900',
  },
};

const columns = [
  { key: 'goals', title: '先做到', helper: '先抓住最少的核心能力', icon: Target },
  { key: 'deliverables', title: '做出证据', helper: '用作品或记录证明学过', icon: ClipboardCheck },
  { key: 'checks', title: '离开前自测', helper: '能说清、能验证、能改错', icon: CheckCircle2 },
];

export function LessonStartCard({ goal, task, accent = 'blue', className = '' }) {
  const styles = accentStyles[accent] || accentStyles.blue;

  const startLesson = () => {
    const content = document.querySelector('[data-lesson-active-content="true"]');
    if (!content) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    content.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      className={`mb-5 flex flex-col gap-4 rounded-lg border ${styles.border} ${styles.bg} p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
      aria-label="本节开始任务"
    >
      <div className="min-w-0">
        <div className={`text-xs font-black ${styles.heading}`}>本节目标</div>
        <p className="mt-1 text-sm font-bold leading-6 text-slate-800">{goal}</p>
        {task && <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">动手任务：{task}</p>}
      </div>
      <button
        type="button"
        onClick={startLesson}
        className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-black text-white ${styles.solid}`}
      >
        立即开始
        <ArrowDown size={16} />
      </button>
    </section>
  );
}

export default function LessonQualityBar({
  goals = [],
  deliverables = [],
  checks = [],
  accent = 'blue',
  className = '',
  bare = false,
  phase = 'overview',
}) {
  const styles = accentStyles[accent] || accentStyles.blue;
  const data = { goals, deliverables, checks };
  const immediateTask = deliverables[0] || goals[0] || null;
  const immediateCheck = checks[0] || null;
  const isReview = phase === 'review';

  const grid = (
    <div className="grid gap-3 md:grid-cols-3">
      {columns.map(({ key, title, helper, icon: Icon }, index) => (
        <div key={key} className={`rounded-lg ${styles.bg} p-3`}>
          <div className={`mb-2 flex items-center gap-2 text-sm font-bold ${styles.heading}`}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-black text-white ${styles.solid}`}>
              {index + 1}
            </span>
            {title}
          </div>
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <Icon size={13} className={styles.icon} />
            {helper}
          </div>
          <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
            {data[key].map((item) => (
              <li key={item} className="flex gap-2">
                <span className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${styles.bullet}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // bare 模式：只渲染三栏网格，供父级合并卡内嵌，不带自己的外框
  if (bare) return grid;

  return (
    <section
      className={`mb-6 rounded-lg border ${styles.border} bg-white p-4 shadow-sm ${className}`}
      aria-label="课程质量清单"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className={`inline-flex rounded-md px-2.5 py-1 text-xs font-black ${styles.bg} ${styles.heading}`}>
            {isReview ? '离开前验收' : '今日学习闭环'}
          </div>
          <h2 className="mt-2 text-xl font-black text-slate-950">
            {isReview ? '用证据确认这节课真的会' : '先做小目标，再检查是否真的会'}
          </h2>
        </div>
        <p className="text-sm font-semibold text-slate-500">
          {isReview
            ? '完成作品或记录，再做自测和迁移。'
            : '每节课都按“目标、证据、自测”收束，避免只看懂、不迁移。'}
        </p>
      </div>
      {immediateTask && (
        <div className={`mb-4 rounded-lg border ${styles.border} ${styles.bg} p-4`}>
          <div className={`mb-2 flex items-center gap-2 text-sm font-black ${styles.heading}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-md text-white ${styles.solid}`}>
              <Timer size={15} />
            </span>
            {isReview ? '首要证据' : '马上动手'}
          </div>
          <p className="text-sm font-bold leading-relaxed text-slate-800">{immediateTask}</p>
          {immediateCheck && (
            <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-600">
              做完立刻检查：{immediateCheck}
            </p>
          )}
        </div>
      )}
      {grid}
    </section>
  );
}
