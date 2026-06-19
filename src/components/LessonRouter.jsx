import React, { Suspense, lazy, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

/**
 * LessonRouter — dynamic lesson loader based on level and lessonId params.
 * Replaces 96 hand-written Route + lazy() entries in App.jsx.
 *
 * URL format: /lesson/:level/:lessonId
 * Example: /lesson/1/5 → loads lessons/cpp/l1/Lesson5.jsx
 */
const LessonRouter = () => {
  const { level, lessonId } = useParams();
  const lessonKey = `${level}-${lessonId}`;

  const LessonComponent = useMemo(() => {
    const lvl = parseInt(level, 10);
    const lid = parseInt(lessonId, 10);
    if (isNaN(lvl) || isNaN(lid) || lvl < 1 || lvl > 6 || lid < 1 || lid > 16) {
      return null;
    }
    return lazy(() => import(`../lessons/cpp/l${lvl}/Lesson${lid}.jsx`));
  }, [level, lessonId]);

  if (!LessonComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-2">课程未找到</h1>
          <p className="text-slate-500">请检查课程链接是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingScreen message="正在加载课程" />}>
      <LessonComponent key={lessonKey} />
    </Suspense>
  );
};

export default LessonRouter;
