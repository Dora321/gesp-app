import { ArrowRight, BookOpenCheck, Boxes, Clock, PackageCheck, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPythonProjectSupport } from '../data/pythonProjectFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

const themeStyles = {
  light: {
    shell: 'border-slate-200 bg-white text-slate-900',
    muted: 'text-slate-500',
    tile: 'border-slate-200 bg-slate-50',
    icon: 'bg-blue-600 text-white',
    prereqLink: 'border-blue-100 bg-blue-50 text-blue-800 hover:border-blue-200 hover:bg-blue-100',
  },
  dark: {
    shell: 'border-slate-700 bg-slate-900/80 text-white',
    muted: 'text-slate-400',
    tile: 'border-slate-700 bg-slate-800/70',
    icon: 'bg-cyan-500 text-slate-950',
    prereqLink: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-100 hover:border-cyan-500/40 hover:bg-cyan-500/20',
  },
};

function ProjectBrief({ support, theme = 'light' }) {
  const styles = themeStyles[theme] || themeStyles.light;
  const items = [
    { label: '适合对象', value: support.brief.audience, icon: UsersRound },
    { label: '学习结果', value: support.brief.outcome, icon: Boxes },
    { label: '建议课时', value: support.brief.duration, icon: Clock },
  ];

  return (
    <section className={`mb-4 rounded-lg border p-4 shadow-sm ${styles.shell}`} aria-label="项目卡">
      <div className="mb-4">
        <div className={`text-xs font-black uppercase tracking-wider ${styles.muted}`}>今日项目闭环</div>
        <h2 className="mt-1 text-2xl font-black">先做出一个可解释的成果</h2>
      </div>
      <div className={`mb-3 rounded-lg border p-3 ${styles.tile}`}>
        <div className="mb-2 flex items-center gap-2 text-sm font-black">
          <span className={`flex h-7 w-7 items-center justify-center rounded-md ${styles.icon}`}>
            <PackageCheck size={15} />
          </span>
          本项目先交付
        </div>
        <p className={`text-sm font-semibold leading-relaxed ${styles.muted}`}>{support.brief.artifact}</p>
        {support.quality.checks?.[0] && (
          <p className={`mt-2 text-xs font-bold leading-relaxed ${styles.muted}`}>
            离开前先确认：{support.quality.checks[0]}
          </p>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`rounded-lg border p-3 ${styles.tile}`}>
            <div className="mb-2 flex items-center gap-2 text-sm font-black">
              <span className={`flex h-7 w-7 items-center justify-center rounded-md ${styles.icon}`}>
                <Icon size={15} />
              </span>
              {label}
            </div>
            <p className={`text-sm leading-relaxed ${styles.muted}`}>{value}</p>
          </div>
        ))}
      </div>
      {support.prerequisiteLinks?.length > 0 && (
        <div className={`mt-3 rounded-lg border p-3 ${styles.tile}`}>
          <div className="mb-2 flex items-center gap-2 text-sm font-black">
            <span className={`flex h-7 w-7 items-center justify-center rounded-md ${styles.icon}`}>
              <BookOpenCheck size={15} />
            </span>
            建议先复习
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {support.prerequisiteLinks.map((item) => (
              <Link
                key={`${item.path}-${item.label}`}
                to={item.path}
                className={`group rounded-md border px-3 py-2 text-sm transition ${styles.prereqLink}`}
              >
                <span className="flex items-center justify-between gap-2 font-black">
                  {item.label}
                  <ArrowRight size={13} className="shrink-0 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-1 block text-xs font-semibold leading-relaxed opacity-80">{item.focus}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function PythonProjectSupport({ projectId, placement = 'top', theme = 'light' }) {
  const support = getPythonProjectSupport(projectId);

  if (!support) return null;

  if (placement === 'bottom') {
    return (
      <LessonNextSteps
        previous={support.previous}
        next={support.next}
        practiceLinks={support.practiceLinks}
        reviewTasks={support.reviewTasks}
        variant={theme}
      />
    );
  }

  return (
    <div className="mb-6">
      <ProjectBrief support={support} theme={theme} />
      <LessonQualityBar
        bare
        goals={support.quality.goals}
        deliverables={support.quality.deliverables}
        checks={support.quality.checks}
        accent={support.quality.accent}
      />
    </div>
  );
}
