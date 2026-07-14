import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Calculator, Grid, Play, Lightbulb, AlertTriangle, ArrowRight, Bug, Trophy, Eye, Menu, X, FileText } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';
import CppLessonDirectory from '../components/CppLessonDirectory';
import { cppL2Lessons } from '../data/cppL2CourseFlow';
import { OverviewModule, PatternModule, MathModule } from './course-level2/CoreModules';
import { ErrorAnalysisModule, LogicModule, PitfallsModule, CodeTraceModule } from './course-level2/ReasoningModules';
import { TemplatesModule, ExamTipsModule, PracticeModule } from './course-level2/ReviewModules';

export default function GESP_Level2_Courseware() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: '知识体系', icon: BookOpen },
    { id: 'patterns', label: '图形打印专题', icon: Grid },
    { id: 'math', label: '数位与数学', icon: Calculator },
    { id: 'logic', label: '逻辑模拟', icon: Play },
    { id: 'pitfalls', label: '备考避坑指南', icon: AlertTriangle },
    { id: 'trace', label: '代码跟踪模拟', icon: Eye },
    { id: 'error', label: '错误博物馆', icon: Bug },
    { id: 'templates', label: '万能代码模板', icon: Code },
    { id: 'tips', label: '考试秘籍攻略', icon: Lightbulb },
    { id: 'practice', label: '真题实战演练', icon: Trophy },
    { id: 'exam202512', label: '2025-12 真题解析', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewModule onStart={setActiveTab} />;
      case 'patterns': return <PatternModule />;
      case 'math': return <MathModule />;
      case 'logic': return <LogicModule />;
      case 'pitfalls': return <PitfallsModule />;
      case 'trace': return <CodeTraceModule />;
      case 'error': return <ErrorAnalysisModule />;
      case 'templates': return <TemplatesModule />;
      case 'tips': return <ExamTipsModule />;
      case 'practice': return <PracticeModule />;
      case 'exam202512': return (
        <div className="animate-fade-in bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-4">
          <FileText size={40} className="mx-auto text-indigo-500" />
          <h2 className="text-2xl font-bold text-slate-800">2025 年 12 月二级真题</h2>
          <p className="text-slate-500">该卷已收录进题库，提供整卷模考与逐题交互解析两种模式。</p>
          <Link
            to="/question-bank/2/2025-12-l2"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white shadow hover:bg-indigo-700 transition"
          >
            进入题库练习 <ArrowRight size={18} />
          </Link>
        </div>
      );
      default: return <OverviewModule />;
    }
  };

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Mobile Menu Button - Fixed Top */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">C++</span>
          GESP 二级
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
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-300
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <h1 className="text-xl font-bold text-slate-800">GESP 二级</h1>
          </div>
          <p className="text-xs text-slate-500">交互式备考讲义</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">© 2026 GESP 备考系统</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {activeTabInfo?.icon && <activeTabInfo.icon className="text-blue-600" size={24} />}
            {activeTabInfo?.label}
          </h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">Level 2</span>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {activeTab === 'overview' && <CppLevelSupport level={2} />}
            {activeTab === 'overview' && (
              <div className="mb-6"><CppLessonDirectory level={2} lessons={cppL2Lessons} accent="purple" /></div>
            )}
            {renderContent()}
            {activeTab === tabs[tabs.length - 1]?.id && (
              <CppLevelSupport level={2} placement="bottom" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
