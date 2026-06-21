import { ArrowRight, CheckCircle2, ClipboardCheck, Target } from 'lucide-react';
import { getPythonFoundationSupport } from '../data/pythonFoundationFlow';
import LessonNextSteps from './LessonNextSteps';

const accents = {
  indigo: { shell: 'border-indigo-100 bg-indigo-50/70', eyebrow: 'text-indigo-700', icon: 'text-indigo-600', bullet: 'bg-indigo-500', line: 'bg-indigo-500' },
  blue: { shell: 'border-blue-100 bg-blue-50/70', eyebrow: 'text-blue-700', icon: 'text-blue-600', bullet: 'bg-blue-500', line: 'bg-blue-500' },
  teal: { shell: 'border-teal-100 bg-teal-50/70', eyebrow: 'text-teal-700', icon: 'text-teal-600', bullet: 'bg-teal-500', line: 'bg-teal-500' },
};

function FoundationOverview({ support }) {
  const styles = accents[support.accent] || accents.indigo;
  const columns = [
    { label: '本课目标', icon: Target, items: support.quality.goals },
    { label: '课堂产出', icon: ClipboardCheck, items: support.quality.deliverables },
    { label: '自测标准', icon: CheckCircle2, items: support.quality.checks },
  ];

  return (
    <section className={`mb-6 rounded-lg border p-5 shadow-sm ${styles.shell}`} aria-label="基础课导航">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
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

      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{support.focus}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {columns.map(({ label, icon: Icon, items }) => (
          <div key={label} className="rounded-lg border border-white/70 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-800">
              <Icon size={16} className={styles.icon} />
              {label}
            </div>
            <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700">
              {items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${styles.bullet}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mt-4 mb-2 h-1 w-16 rounded-full ${styles.line}`} />
      <p className="text-xs font-semibold leading-relaxed text-slate-500">
        <span className={`font-black ${styles.eyebrow}`}>衔接 · </span>
        {support.bridge}
      </p>
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

  return <FoundationOverview support={support} />;
}
