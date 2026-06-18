import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import NotFound from '../pages/NotFound';

/**
 * Redirects old lesson paths to the new parameterized format.
 *
 * Old → New:
 *   /lessonN       → /lesson/1/N
 *   /adv-lessonN   → /lesson/2/N
 *   /expert-lessonN → /lesson/3/N
 *   /senior-lessonN → /lesson/4/N
 *   /expert5-lessonN → /lesson/5/N
 *   /master-lessonN  → /lesson/6/N
 */
const LEGACY_MAP = [
  { prefix: '/expert5-lesson', level: 5 },
  { prefix: '/expert-lesson',  level: 3 },
  { prefix: '/adv-lesson',     level: 2 },
  { prefix: '/senior-lesson',  level: 4 },
  { prefix: '/master-lesson',  level: 6 },
  { prefix: '/lesson',         level: 1 },
];

function LegacyLessonRedirect() {
  const { pathname } = useLocation();

  for (const { prefix, level } of LEGACY_MAP) {
    if (pathname.startsWith(prefix)) {
      const numStr = pathname.slice(prefix.length);
      const num = parseInt(numStr, 10);
      if (num >= 1 && num <= 16) {
        return <Navigate to={`/lesson/${level}/${num}`} replace />;
      }
      break;
    }
  }

  return <NotFound />;
}

export default LegacyLessonRedirect;
