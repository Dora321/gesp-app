import { Boxes, Clock, PackageCheck, UsersRound } from 'lucide-react';
import { getPythonProjectSupport } from '../data/pythonProjectFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

const themeStyles = {
  light: {
    shell: 'border-slate-200 bg-white text-slate-900',
    muted: 'text-slate-500',
    tile: 'border-slate-200 bg-slate-50',
    icon: 'bg-blue-600 text-white',
  },
  dark: {
    shell: 'border-slate-700 bg-slate-900/80 text-white',
    muted: 'text-slate-400',
    tile: 'border-slate-700 bg-slate-800/70',
    icon: 'bg-cyan-500 text-slate-950',
  },
};

function ProjectBrief({ support, theme = 'light' }) {
  const styles = themeStyles[theme] || themeStyles.light;
  const items = [
    { label: '适合对象', value: support.brief.audience, icon: UsersRound },
    { label: '项目产出', value: support.brief.artifact, icon: PackageCheck },
    { label: '学习结果', value: support.brief.outcome, icon: Boxes },
    { label: '建议课时', value: support.brief.duration, icon: Clock },
  ];

  return (
    <section className={`mb-4 rounded-lg border p-4 shadow-sm ${styles.shell}`} aria-label="项目卡">
      <div className="mb-4">
        <div className={`text-xs font-black uppercase tracking-wider ${styles.muted}`}>Python Project</div>
        <h2 className="mt-1 text-2xl font-black">{support.current.title}</h2>
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
        goals={support.quality.goals}
        deliverables={support.quality.deliverables}
        checks={support.quality.checks}
        accent={support.quality.accent}
      />
    </div>
  );
}
