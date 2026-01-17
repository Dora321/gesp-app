import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, PlayCircle, Lock } from 'lucide-react';
import { courseCategories } from '../data/courses.jsx';

export default function CourseSystem() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(courseCategories[0].id);

    const activeCategory = courseCategories.find(c => c.id === activeTab);

    return (
        <section className="py-24 bg-white relative">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-full h-1/2 bg-slate-50 -skew-y-3 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                        按兴趣探索
                    </h2>
                    <p className="text-xl text-slate-500">
                        不管你想做游戏还是搞竞赛，这里都有适合你的路径。
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {courseCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`
                                px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 border
                                ${activeTab === cat.id
                                    ? `bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30 scale-105`
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-blue-600/30 hover:text-blue-600'}
                            `}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-12 gap-12 items-start animate-fade-in key={activeTab}">

                    {/* Left: Category Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className={`
                            w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl
                            ${activeCategory.color === 'blue' ? 'bg-blue-500' : ''}
                            ${activeCategory.color === 'purple' ? 'bg-purple-500' : ''}
                            ${activeCategory.color === 'emerald' ? 'bg-emerald-500' : ''}
                         `}>
                            {/* Icon placeholder logic if needed, but simple color block works well for now */}
                            <span className="text-3xl font-bold">{activeCategory.title[0]}</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-brand-slate mb-2">
                                {activeCategory.title}
                            </h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                {activeCategory.subtitle}
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                {activeCategory.desc}
                            </p>
                        </div>
                    </div>

                    {/* Right: Course Cards */}
                    <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
                        {activeCategory.courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => navigate(course.path)}
                                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                                        {React.cloneElement(course.icon, { size: 24 })}
                                    </div>
                                    <div className="flex gap-2">
                                        {course.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold text-brand-slate mb-2 group-hover:text-brand-blue transition-colors">
                                    {course.title}
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                    {course.desc}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-sm font-bold text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                                        开始学习 <ChevronRight size={16} />
                                    </span>
                                    <PlayCircle size={20} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
