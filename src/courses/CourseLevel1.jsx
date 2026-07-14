import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Code, AlertTriangle, Info, Trophy, Lightbulb, Eye, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';
import CppLessonDirectory from '../components/CppLessonDirectory';
import { cppL1Lessons } from '../data/cppL1CourseFlow';
import { OverviewSection, TopicSection } from './course-level1/CoreModules';
import { CodeTraceSection, PitfallsSection, TemplatesSection, ExamTipsSection, PracticeSection } from './course-level1/PracticeModules';

const GESPCourseware = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Items
  const navItems = [
    { id: 'overview', label: '核心考点总览', icon: <Info size={20} /> },
    { id: 'topics', label: '专题深度讲解', icon: <Book size={20} /> },
    { id: 'trace', label: '代码跟踪模拟', icon: <Eye size={20} /> },
    { id: 'pitfalls', label: '备考避坑指南', icon: <AlertTriangle size={20} /> },
    { id: 'templates', label: '万能代码模板', icon: <Code size={20} /> },
    { id: 'tips', label: '考试秘籍攻略', icon: <Lightbulb size={20} /> },
    { id: 'practice', label: '真题实战演练', icon: <Trophy size={20} /> },
  ];

  // Render Content Switcher
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection changeTab={setActiveTab} />;
      case 'topics': return <TopicSection selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />;
      case 'trace': return <CodeTraceSection />;
      case 'pitfalls': return <PitfallsSection />;
      case 'templates': return <TemplatesSection />;
      case 'tips': return <ExamTipsSection />;
      case 'practice': return <PracticeSection />;
      default: return <OverviewSection changeTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 一级
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label={isMobileMenuOpen ? '关闭课程目录' : '打开课程目录'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100 hidden md:block">
          <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <span className="bg-indigo-600 text-white p-1 rounded text-sm">C++</span>
            GESP 一级
          </h1>
          <p className="text-xs text-slate-500 mt-2">互动式备考讲义</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 bg-slate-50 text-xs text-slate-400 text-center">
          针对 2023.03 - 2025.09 真题分析
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {activeTab === 'overview' && <CppLevelSupport level={1} />}
          {activeTab === 'overview' && (
            <div className="mb-6"><CppLessonDirectory level={1} lessons={cppL1Lessons} accent="blue" /></div>
          )}
          {renderContent()}
          {activeTab === navItems[navItems.length - 1]?.id && (
            <CppLevelSupport level={1} placement="bottom" />
          )}
        </div>
      </main>
    </div>
  );
};

export default GESPCourseware;
