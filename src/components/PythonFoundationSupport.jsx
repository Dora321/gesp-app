import { ArrowRight } from 'lucide-react';
import { getPythonFoundationSupport } from '../data/pythonFoundationFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

const accents = {
  indigo: { border: 'border-indigo-100', eyebrow: 'text-indigo-700', line: 'bg-indigo-500' },
  blue: { border: 'border-blue-100', eyebrow: 'text-blue-700', line: 'bg-blue-500' },
  teal: { border: 'border-teal-100', eyebrow: 'text-teal-700', line: 'bg-teal-500' },
};

function FoundationOverview({ support }) {
  const styles = accents[support.accent] || accents.indigo;

  return (
    <section className={`mb-6 rounded-lg border bg-white p-5 shadow-sm ${styles.border}`} aria-label="基础课导航">
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

      <div className="mt-4">
        <LessonQualityBar
          bare
          goals={support.quality.goals}
          deliverables={support.quality.deliverables}
          checks={support.quality.checks}
          accent={support.quality.accent}
        />
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
