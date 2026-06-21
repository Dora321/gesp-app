import { ArrowRight, BookOpenCheck, ClipboardCheck, Route, Target } from 'lucide-react';
import { getCppLevelSupport } from '../data/cppLevelFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

const accents = {
  blue: {
    shell: 'border-blue-100 bg-blue-50/80',
    badge: 'bg-blue-600 text-white',
    icon: 'bg-white text-blue-700 ring-blue-100',
    line: 'bg-blue-500',
  },
  indigo: {
    shell: 'border-indigo-100 bg-indigo-50/80',
    badge: 'bg-indigo-600 text-white',
    icon: 'bg-white text-indigo-700 ring-indigo-100',
    line: 'bg-indigo-500',
  },
  red: {
    shell: 'border-red-100 bg-red-50/80',
    badge: 'bg-red-600 text-white',
    icon: 'bg-white text-red-700 ring-red-100',
    line: 'bg-red-500',
  },
};

function LevelBrief({ support }) {
  const styles = accents[support.accent] || accents.blue;
  const items = [
    { label: '本级定位', value: support.focus, icon: Target },
    { label: '承上启下', value: support.bridge, icon: Route },
    { label: '达标证据', value: support.deliverables[0], icon: ClipboardCheck },
  ];

  return (
    <section className={`mb-5 rounded-lg border p-4 shadow-sm ${styles.shell}`} aria-label="C++级别定位">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className={`inline-flex rounded-md px-2.5 py-1 text-xs font-black ${styles.badge}`}>
            {support.badge}
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">{support.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          语法基础
          <ArrowRight size={15} />
          考级专题
          <ArrowRight size={15} />
          真题复盘
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-white/80 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-800">
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ring-1 ${styles.icon}`}>
                <Icon size={15} />
              </span>
              {label}
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{value}</p>
          </div>
        ))}
      </div>

      {support.readiness?.length > 0 && (
        <div className="mt-4 rounded-lg border border-white/80 bg-white/80 p-3 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ring-1 ${styles.icon}`}>
              <BookOpenCheck size={15} />
            </span>
            进入前检查
          </div>
          <div className="grid gap-2 lg:grid-cols-3">
            {support.readiness.map((item) => (
              <div key={item.label} className="rounded-md border border-slate-100 bg-white px-3 py-2">
                <div className="text-sm font-black text-slate-800">{item.label}</div>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`mt-4 h-1 w-24 rounded-full ${styles.line}`} />
    </section>
  );
}

export default function CppLevelSupport({ level, placement = 'top' }) {
  const support = getCppLevelSupport(level);

  if (!support) return null;

  if (placement === 'bottom') {
    return (
      <LessonNextSteps
        previous={support.previous}
        next={support.next}
        practiceLinks={support.practiceLinks}
        reviewTasks={support.reviewTasks}
      />
    );
  }

  return (
    <>
      <LevelBrief support={support} />
      <LessonQualityBar
        goals={support.goals}
        deliverables={support.deliverables}
        checks={support.checks}
        accent={support.accent}
      />
    </>
  );
}
