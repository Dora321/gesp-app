import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { recordLessonVisit } from '../../utils/lessonProgress';
import LessonMobileHeader from '../../components/LessonMobileHeader';
import { Prerequisites } from './CppLessonComponents';

const accentClasses = {
  blue: {
    progress: 'bg-blue-500',
    next: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-blue-200/20',
    bottomBlob: 'bg-cyan-200/20',
  },
  bluePurple: {
    progress: 'bg-blue-500',
    next: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-blue-200/20',
    bottomBlob: 'bg-purple-200/20',
  },
  blueIndigo: {
    progress: 'bg-blue-500',
    next: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-blue-200/20',
    bottomBlob: 'bg-indigo-200/20',
  },
  orange: {
    progress: 'bg-orange-500',
    next: 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-orange-200/20',
    bottomBlob: 'bg-indigo-200/20',
  },
  orangePurple: {
    progress: 'bg-orange-500',
    next: 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-orange-200/20',
    bottomBlob: 'bg-purple-200/20',
  },
  greenTeal: {
    progress: 'bg-green-500',
    next: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5',
    topBlob: 'bg-green-200/20',
    bottomBlob: 'bg-teal-200/20',
  },
};

export default function LegacyCppLessonShell({
  lessonNumber,
  lessonTitle,
  sections,
  activeSection,
  setActiveSection,
  nextLessonPath,
  renderIcon,
  topSupport,
  bottomSupport,
  // 这个 shell 此前不接受 prerequisites，于是用它的一级 16 节课加二级前两课
  // 一律没有前置提示——学生点进去不会被告知「你得先会什么」。
  prerequisites,
  children,
  accent = 'blue',
  levelLabel = '一级趣味课堂',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const currentIndex = sections.findIndex((section) => section.id === activeSection);
  const activeSectionMeta = sections[currentIndex] || sections[0];
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === sections.length - 1;
  const theme = accentClasses[accent] || accentClasses.blue;

  useEffect(() => {
    recordLessonVisit(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeSection]);

  const goToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const nextSection = () => {
    if (!isLast && currentIndex >= 0) {
      setActiveSection(sections[currentIndex + 1].id);
      return;
    }

    if (nextLessonPath) {
      navigate(nextLessonPath);
    }
  };

  const prevSection = () => {
    if (!isFirst) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <style>{`
        .slide-enter { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <LessonMobileHeader
        label={`C++ · ${levelLabel}`}
        open={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="关闭课程目录遮罩"
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full md:visible'
        }`}
      >
        <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-blue-50/50 to-white/50 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">C++ 趣味课堂</h1>
              <p className="text-xs text-blue-500 font-medium">第 {lessonNumber} 课：{lessonTitle}</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto w-full py-4 custom-scrollbar">
          {sections.map((section, index) => {
            const showCategory = index === 0 || sections[index - 1].category !== section.category;
            const isActive = activeSection === section.id;

            return (
              <React.Fragment key={section.id}>
                {showCategory && (
                  <div className="px-6 pb-2 pt-4 first:pt-0">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">{section.category}</h3>
                  </div>
                )}
                <div className="px-3">
                  <button
                    type="button"
                    onClick={() => goToSection(section.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 group relative mb-1 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-500'
                      }`}
                    >
                      {renderIcon(section.icon, 18)}
                    </span>
                    <span className="truncate text-sm">{section.title}</span>
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative pt-16 md:pt-0">
        <div className={`absolute top-0 right-0 w-96 h-96 ${theme.topBlob} rounded-full blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 ${theme.bottomBlob} rounded-full blur-3xl pointer-events-none`} />

        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="flex min-w-0 items-center gap-2 text-lg font-bold text-gray-800">
            <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">Section {activeSection}</span>
            <span className="hidden min-w-0 truncate sm:inline">{activeSectionMeta?.title}</span>
          </h2>
          <div className="flex gap-2 text-sm text-gray-500">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full ${theme.progress} transition-all duration-500 ease-out`}
                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
        </header>

        <main ref={scrollRef} className="flex-1 overflow-y-auto p-8 z-0">
          <div className="max-w-4xl mx-auto pb-12">
            {isFirst && prerequisites?.length > 0 && (
              <div className="mb-6">
                <Prerequisites items={prerequisites} />
              </div>
            )}
            {isFirst && topSupport}
            <div data-lesson-active-content="true">
              {children}
            </div>
            {isLast && bottomSupport}
          </div>
        </main>

        <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-20">
          <button
            type="button"
            onClick={prevSection}
            disabled={isFirst}
            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all ${
              isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm'
            }`}
          >
            <ArrowRight className="rotate-180" size={18} /> 上一步
          </button>

          <button
            type="button"
            onClick={nextSection}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold transition-all shadow-sm ${
              isLast
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                : theme.next
            }`}
          >
            {isLast ? '下一课' : '下一步'} <ArrowRight size={18} color="white" />
          </button>
        </footer>
      </div>
    </div>
  );
}
