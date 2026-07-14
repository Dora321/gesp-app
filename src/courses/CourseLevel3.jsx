import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, CheckCircle, ChevronRight, Calculator, Cpu, Hash, Trophy, Eye, Lightbulb, Menu, X } from 'lucide-react';
import CppLevelSupport from '../components/CppLevelSupport';
import { OverviewModule, StringModule, ArrayModule } from './course-level3/CoreModules';
import { BitModule, MathModule, CheckListModule, CodeTraceModule } from './course-level3/ReasoningModules';
import { TemplatesModule, ExamTipsModule, PracticeModule } from './course-level3/ReviewModules';

export default function CourseLevel3() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: '知识体系', icon: BookOpen },
        { id: 'string', label: '字符串处理', icon: Terminal },
        { id: 'array', label: '数组与模拟', icon: Hash },
        { id: 'bit', label: '位运算', icon: Cpu },
        { id: 'math', label: '枚举与数学', icon: Calculator },
        { id: 'trace', label: '代码跟踪模拟', icon: Eye },
        { id: 'templates', label: '万能代码模板', icon: Code },
        { id: 'tips', label: '考场秘籍', icon: Lightbulb },
        { id: 'practice', label: '真题实战', icon: Trophy },
        { id: 'checklist', label: '考前清单', icon: CheckCircle },
    ];

    const activeTabInfo = menuItems.find(item => item.id === activeTab);

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
                    GESP 三级
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
                        <h1 className="text-xl font-bold text-slate-800">GESP 三级</h1>
                    </div>
                    <p className="text-xs text-slate-500">实战强化 2026版</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === item.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            `}
                        >
                            <item.icon size={18} />
                            {item.label}
                            {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400">© 2026 GESP 备考互动课件</p>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 pt-16 md:pt-0">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {activeTabInfo?.icon && <activeTabInfo.icon className="text-blue-600" size={24} />}
                        {activeTabInfo?.label}
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Level 3</span>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto">
                        {activeTab === 'overview' && <CppLevelSupport level={3} />}
                        {activeTab === 'overview' && <OverviewModule onStart={setActiveTab} />}
                        {activeTab === 'string' && <div className="animate-fade-in"><StringModule /></div>}
                        {activeTab === 'array' && <div className="animate-fade-in"><ArrayModule /></div>}
                        {activeTab === 'bit' && <div className="animate-fade-in"><BitModule /></div>}
                        {activeTab === 'math' && <div className="animate-fade-in"><MathModule /></div>}
                        {activeTab === 'trace' && <CodeTraceModule />}
                        {activeTab === 'templates' && <TemplatesModule />}
                        {activeTab === 'tips' && <ExamTipsModule />}
                        {activeTab === 'practice' && <PracticeModule />}
                        {activeTab === 'checklist' && <div className="animate-fade-in"><CheckListModule /></div>}
                        {activeTab === menuItems[menuItems.length - 1]?.id && (
                            <CppLevelSupport level={3} placement="bottom" />
                        )}
                    </div>
                    <footer className="text-center text-slate-400 py-8 text-sm mt-8 border-t border-slate-100">
                        GESP C++ 三级备考互动课件 | 基于历年真题归纳
                    </footer>
                </main>
            </div>
        </div>
    );
}
