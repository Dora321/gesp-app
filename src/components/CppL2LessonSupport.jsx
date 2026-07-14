import { getCppL2LessonSupport } from '../data/cppL2CourseFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar, { LessonStartCard } from './LessonQualityBar';

export default function CppL2LessonSupport({ lessonId, placement = 'top' }) {
  const support = getCppL2LessonSupport(lessonId);

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
