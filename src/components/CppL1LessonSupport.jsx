import { getCppL1LessonSupport } from '../data/cppL1CourseFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

export default function CppL1LessonSupport({ lessonId, placement = 'top' }) {
  const support = getCppL1LessonSupport(lessonId);

  if (placement === 'bottom') {
    if (!support) return null;

    return (
      <LessonNextSteps
        previous={support.previous}
        next={support.next}
        practiceLinks={support.practiceLinks}
        reviewTasks={support.reviewTasks}
      />
    );
  }

  if (!support?.quality) return null;

  return (
    <LessonQualityBar
      goals={support.quality.goals}
      deliverables={support.quality.deliverables}
      checks={support.quality.checks}
      accent={support.quality.accent}
    />
  );
}
