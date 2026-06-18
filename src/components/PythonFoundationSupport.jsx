import { ArrowRight, CheckCircle2, Route, Target } from 'lucide-react';
import { getPythonFoundationSupport } from '../data/pythonFoundationFlow';
import LessonNextSteps from './LessonNextSteps';

const accents = {
  indigo: {
    shell: 'border-indigo-100 bg-indigo-50/70',
    icon: 'bg-indigo-600 text-white',
    eyebrow: 'text-indigo-700',
    line: 'bg-indigo-500',
  },
  blue: {
    shell: 'border-blue-100 bg-blue-50/70',
    icon: 'bg-blue-600 text-white',
    eyebrow: 'text-blue-700',
    line: 'bg-blue-500',
  },
  teal: {
    shell: 'border-teal-100 bg-teal-50/70',
    icon: 'bg-teal-600 text-white',
    eyebrow: 'text-teal-700',
    line: 'bg-teal-500',
  },
};

function FoundationBrief({ support }) {
  const styles = accents[support.accent] || accents.indigo;
  const items = [
    { label: '本课定位', value: support.focus, icon: Target },
    { label: '衔接作用', value: support.bridge, icon: Route },
    { label: '完成标准', value: support.checkpoint, icon: CheckCircle2 },
  ];

  return (
    <section className={`mb-4 rounded-lg border p-4 shadow-sm ${styles.shell}`} aria-label="基础课定位">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className={`text-xs font-black uppercase tracking-wider ${styles.eyebrow}`}>Python Foundation</div>
          <h2 className="mt-1 text-2xl font-black text-slate-900">{support.current.title}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          基础线
          <ArrowRight size={15} />
          项目线
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-white/70 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-800">
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${styles.icon}`}>
                <Icon size={15} />
              </span>
              {label}
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{value}</p>
          </div>
        ))}
      </div>

      <div className={`mt-4 h-1 w-24 rounded-full ${styles.line}`} />
    </section>
  );
}

export default function PythonFoundationSupport({ lessonId, placement = 'top' }) {
  const support = getPythonFoundationSupport(lessonId);

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

  return <FoundationBrief support={support} />;
}
