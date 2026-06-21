import { CheckCircle2, ClipboardCheck, Target } from 'lucide-react';

const accentStyles = {
  blue: {
    border: 'border-blue-100',
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    bullet: 'bg-blue-600',
    heading: 'text-blue-900',
  },
  indigo: {
    border: 'border-indigo-100',
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    bullet: 'bg-indigo-600',
    heading: 'text-indigo-900',
  },
  teal: {
    border: 'border-teal-100',
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    bullet: 'bg-teal-600',
    heading: 'text-teal-900',
  },
  amber: {
    border: 'border-amber-100',
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    bullet: 'bg-amber-600',
    heading: 'text-amber-900',
  },
  emerald: {
    border: 'border-emerald-100',
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    bullet: 'bg-emerald-600',
    heading: 'text-emerald-900',
  },
  purple: {
    border: 'border-purple-100',
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    bullet: 'bg-purple-600',
    heading: 'text-purple-900',
  },
  rose: {
    border: 'border-rose-100',
    bg: 'bg-rose-50',
    icon: 'text-rose-600',
    bullet: 'bg-rose-600',
    heading: 'text-rose-900',
  },
  slate: {
    border: 'border-slate-200',
    bg: 'bg-slate-50',
    icon: 'text-slate-600',
    bullet: 'bg-slate-600',
    heading: 'text-slate-900',
  },
  red: {
    border: 'border-red-100',
    bg: 'bg-red-50',
    icon: 'text-red-600',
    bullet: 'bg-red-600',
    heading: 'text-red-900',
  },
};

const columns = [
  { key: 'goals', title: '本课目标', icon: Target },
  { key: 'deliverables', title: '课堂产出', icon: ClipboardCheck },
  { key: 'checks', title: '自测标准', icon: CheckCircle2 },
];

export default function LessonQualityBar({
  goals = [],
  deliverables = [],
  checks = [],
  accent = 'blue',
  className = '',
}) {
  const styles = accentStyles[accent] || accentStyles.blue;
  const data = { goals, deliverables, checks };

  return (
    <section
      className={`mb-6 rounded-lg border ${styles.border} bg-white p-4 shadow-sm ${className}`}
      aria-label="课程质量清单"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {columns.map(({ key, title, icon: Icon }) => (
          <div key={key} className={`rounded-lg ${styles.bg} p-3`}>
            <div className={`mb-2 flex items-center gap-2 text-sm font-bold ${styles.heading}`}>
              <Icon size={16} className={styles.icon} />
              {title}
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
    </section>
  );
}
