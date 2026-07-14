import { getPythonFoundationSupport } from '../data/pythonFoundationFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar, { LessonStartCard } from './LessonQualityBar';

const accents = {
  indigo: { border: 'border-indigo-100', eyebrow: 'text-indigo-700', line: 'bg-indigo-500' },
  blue: { border: 'border-blue-100', eyebrow: 'text-blue-700', line: 'bg-blue-500' },
  teal: { border: 'border-teal-100', eyebrow: 'text-teal-700', line: 'bg-teal-500' },
};

function FoundationReview({ support }) {
  const styles = accents[support.accent] || accents.indigo;

  return (
    <div className="mb-6">
      <LessonQualityBar {...support.quality} phase="review" />
      <div className={`mt-4 mb-2 h-1 w-16 rounded-full ${styles.line}`} />
      <p className="text-xs font-semibold leading-relaxed text-slate-500">
        <span className={`font-black ${styles.eyebrow}`}>衔接 · </span>
        {support.bridge}
      </p>
    </div>
  );
}

export default function PythonFoundationSupport({ lessonId, placement = 'top' }) {
  const support = getPythonFoundationSupport(lessonId);

  if (!support) return null;

  if (placement === 'bottom') {
    return (
      <>
        <FoundationReview support={support} />
        <LessonNextSteps
          previous={support.previous}
          next={support.next}
          practiceLinks={support.practiceLinks}
          reviewTasks={support.reviewTasks}
        />
      </>
    );
  }

  return (
    <LessonStartCard
      goal={support.quality.goals[0] || support.focus}
      task={support.quality.deliverables[0]}
      accent={support.quality.accent}
    />
  );
}
