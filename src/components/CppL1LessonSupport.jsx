import { getCppL1LessonSupport } from '../data/cppL1CourseFlow';
import LessonNextSteps from './LessonNextSteps';
import LessonQualityBar, { LessonStartCard } from './LessonQualityBar';

export default function CppL1LessonSupport({ lessonId, placement = 'top' }) {
  const support = getCppL1LessonSupport(lessonId);

  if (placement === 'bottom') {
    if (!support) return null;

    return (
      <>
        <LessonQualityBar {...support.quality} phase="review" />
        <LessonNextSteps
          previous={support.previous}
          next={support.next}
          practiceLinks={support.practiceLinks}
          reviewTasks={support.reviewTasks}
        />
      </>
    );
  }

  if (!support?.quality) return null;

  return (
    <LessonStartCard
      goal={support.quality.goals[0]}
      task={support.quality.deliverables[0]}
      accent={support.quality.accent}
    />
  );
}
