import { getCppL6LessonSupport } from '../data/cppL6CourseFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar from './LessonQualityBar';

export default function CppL6LessonSupport({ lessonId, placement = 'top' }) {
  const support = getCppL6LessonSupport(lessonId);

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
    <LessonQualityBar
      goals={support.quality.goals}
      deliverables={support.quality.deliverables}
      checks={support.quality.checks}
      accent={support.quality.accent}
    />
  );
}
