import { ArrowLeft, ArrowRight, ClipboardCheck, FileQuestion, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

const linkCardBase =
  'group flex min-h-24 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md';

const variants = {
  light: {
    shell: 'border-slate-200 bg-slate-50',
    badge: 'bg-white text-slate-500 ring-slate-200',
    title: 'text-slate-900',
    muted: 'text-slate-500',
    linkCard: linkCardBase,
    panel: 'border-blue-100 bg-white',
    practiceLink: 'bg-blue-50 text-blue-800 hover:bg-blue-100',
    reviewPanel: 'border-emerald-100 bg-white',
    reviewText: 'text-slate-700',
  },
  dark: {
    shell: 'border-slate-700 bg-slate-900/80',
    badge: 'bg-slate-800 text-slate-300 ring-slate-700',
    title: 'text-white',
    muted: 'text-slate-400',
    linkCard:
      'group flex min-h-24 flex-col justify-between rounded-lg border border-slate-700 bg-slate-800/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-md',
    panel: 'border-blue-500/20 bg-slate-800/90',
    practiceLink: 'bg-blue-500/10 text-blue-200 hover:bg-blue-500/20',
    reviewPanel: 'border-emerald-500/20 bg-slate-800/90',
    reviewText: 'text-slate-300',
  },
};

export default function LessonNextSteps({
  previous,
  next,
  practiceLinks = [],
  reviewTasks = [],
  variant = 'light',
  className = '',
}) {
  const styles = variants[variant] || variants.light;

  return (
    <section
      className={`mt-8 rounded-lg border p-4 shadow-sm ${styles.shell} ${className}`}
      aria-label="课后衔接"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${styles.badge}`}>
            <ListChecks size={14} />
            下一步
          </div>
          <h2 className={`mt-2 text-xl font-black ${styles.title}`}>学完这一课，别停在这里</h2>
        </div>
        <p className={`text-sm font-medium ${styles.muted}`}>用复习、练习和下一课把知识接上。</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {previous && (
          <Link to={previous.path} className={styles.linkCard}>
            <div className="flex items-center gap-2 text-sm font-black text-slate-500">
              <ArrowLeft size={16} />
              回看上一课
            </div>
            <div className="mt-3">
              <div className={`text-base font-black ${styles.title}`}>{previous.title}</div>
              {previous.reason && <div className={`mt-1 text-sm leading-relaxed ${styles.muted}`}>{previous.reason}</div>}
            </div>
          </Link>
        )}

        {next && (
          <Link to={next.path} className={styles.linkCard}>
            <div className="flex items-center gap-2 text-sm font-black text-blue-600">
              进入下一课
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </div>
            <div className="mt-3">
              <div className={`text-base font-black ${styles.title}`}>{next.title}</div>
              {next.reason && <div className={`mt-1 text-sm leading-relaxed ${styles.muted}`}>{next.reason}</div>}
            </div>
          </Link>
        )}
      </div>

      {(practiceLinks.length > 0 || reviewTasks.length > 0) && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {practiceLinks.length > 0 && (
            <div className={`rounded-lg border p-4 ${styles.panel}`}>
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-blue-700">
                <FileQuestion size={16} />
                配套练习
              </div>
              <div className="space-y-2">
                {practiceLinks.map((item) => (
                  <Link
                    key={`${item.path}-${item.label}`}
                    to={item.path}
                    className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-bold transition ${styles.practiceLink}`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {reviewTasks.length > 0 && (
            <div className={`rounded-lg border p-4 ${styles.reviewPanel}`}>
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-700">
                <ClipboardCheck size={16} />
                复习任务
              </div>
              <ul className={`space-y-2 text-sm leading-relaxed ${styles.reviewText}`}>
                {reviewTasks.map((task) => (
                  <li key={task} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
