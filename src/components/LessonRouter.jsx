import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

/**
 * LessonRouter — dynamic lesson loader based on level and lessonId params.
 * Replaces 96 hand-written Route + lazy() entries in App.jsx.
 *
 * URL format: /lesson/:level/:lessonId
 * Example: /lesson/1/5 → loads lessons/cpp/l1/Lesson5.jsx
 */

// Module-level cache so each lazy component is created exactly once per
// lesson — creating lazy() during render (even memoized) remounts the lesson
// whenever React discards the memo cache.
const lessonCache = new Map();

const getLessonComponent = (level, lessonId) => {
  const lvl = parseInt(level, 10);
  const lid = parseInt(lessonId, 10);
  if (isNaN(lvl) || isNaN(lid) || lvl < 1 || lvl > 6 || lid < 1 || lid > 16) {
    return null;
  }
  const key = `${lvl}-${lid}`;
  if (!lessonCache.has(key)) {
    lessonCache.set(key, lazy(() => import(`../lessons/cpp/l${lvl}/Lesson${lid}.jsx`)));
  }
  return lessonCache.get(key);
};

const LessonRouter = () => {
  const { level, lessonId } = useParams();
  const lessonKey = `${level}-${lessonId}`;
  const LessonComponent = getLessonComponent(level, lessonId);

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
      {/* eslint-disable-next-line react-hooks/static-components -- component identity is stable: getLessonComponent returns from a module-level cache */}
      <LessonComponent key={lessonKey} />
    </Suspense>
  );
};

export default LessonRouter;
