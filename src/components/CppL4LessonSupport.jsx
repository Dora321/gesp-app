import { getCppL4LessonSupport } from '../data/cppL4CourseFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar, { LessonStartCard } from './LessonQualityBar';

export default function CppL4LessonSupport({ lessonId, placement = 'top' }) {
  const support = getCppL4LessonSupport(lessonId);

  if (!support) return null;

  if (placement === 'bottom') {
    return (<>
      <LessonQualityBar {...support.quality} phase="review" />
      <LessonNextSteps
        previous={support.previous}
        next={support.next}
        practiceLinks={support.practiceLinks}
        reviewTasks={support.reviewTasks}
      />
    </>);
  }

  return (
    <LessonStartCard
      goal={support.quality.goals[0]}
      task={support.quality.deliverables[0]}
      accent={support.quality.accent}
    />
  );
}
