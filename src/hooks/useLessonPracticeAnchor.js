import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 上机题位于最后一节；先切换课内分页，再滚动到题面。
export default function useLessonPracticeAnchor(sections, activeSection, setActiveSection) {
  const { pathname, hash } = useLocation();
  const lastSection = sections[sections.length - 1]?.id;
  useEffect(() => {
    if (hash === '#programming-practice' && lastSection != null) setActiveSection(lastSection);
  }, [pathname, hash, lastSection, setActiveSection]);

  useEffect(() => {
    if (hash !== '#programming-practice' || activeSection !== lastSection) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('programming-practice')?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, activeSection, lastSection]);
}
