import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const CppL5Lesson9 = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(1);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sections = [
        { id: 1, title: '课程导入', category: '基础' },
        { id: 2, title: '知识点讲解', category: '核心' },
        { id: 3, title: '总结与作业', category: '复习' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm">
                <h1 className="text-lg font-bold text-blue-700">C++ 专家 (GESP 五级) 第 9 课</h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg transition-transform md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-slate-100">
                    <Link to="/" className="font-bold text-blue-600">返回首页</Link>
                    <h2 className="text-sm text-slate-500 mt-2">C++ 专家 (GESP 五级) 闯关地图</h2>
                </div>
                <div className="flex-1 overflow-y-auto w-full py-4">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => { setActiveSection(section.id); setIsMobileMenuOpen(false); }}
                            className={`w-full text-left px-6 py-3 transition-colors ${activeSection === section.id ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full pt-16 md:pt-0">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6">
                    <h2 className="text-lg font-bold">第 9 课：内容准备中...</h2>
                </header>
                <main className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-20 rounded-3xl shadow-xl border-2 border-dashed border-slate-200 max-w-2xl">
                        <BookOpen size={64} className="mx-auto text-blue-200 mb-6" />
                        <h1 className="text-3xl font-extrabold text-slate-300">第 9 课内容正在精心打造中</h1>
                        <p className="text-slate-400 mt-4 text-lg">这里的每一个魔法咒语都在酝酿之中，敬请期待！</p>
                    </div>
                </main>
                <footer className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8">
                    <button onClick={() => setActiveSection(Math.max(1, activeSection - 1))} className="text-slate-500 font-bold hover:text-blue-600 transition-colors">
                        上一节
                    </button>
                    <button onClick={() => setActiveSection(Math.min(sections.length, activeSection + 1))} className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-500 transition-all">
                        下一节
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CppL5Lesson9;
