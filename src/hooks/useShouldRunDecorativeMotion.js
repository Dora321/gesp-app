import { useEffect, useState } from 'react';

export function useShouldRunDecorativeMotion({ minWidth = 1024 } = {}) {
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const largeScreenQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updatePreference = () => {
      setShouldRun(largeScreenQuery.matches && !reducedMotionQuery.matches);
    };

    updatePreference();
    largeScreenQuery.addEventListener('change', updatePreference);
    reducedMotionQuery.addEventListener('change', updatePreference);

    return () => {
      largeScreenQuery.removeEventListener('change', updatePreference);
      reducedMotionQuery.removeEventListener('change', updatePreference);
    };
  }, [minWidth]);

  return shouldRun;
}
