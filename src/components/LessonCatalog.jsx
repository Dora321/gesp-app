import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Zap, Star, Play, Lock, CheckCircle } from 'lucide-react';

export default function LessonCatalog() {
    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState('basic');

    const lessonSections = [
        {
            id: 'basic',
            title: 'C++ 基础闯关',
            subtitle: '16 节课 · 入门必备',
            color: 'emerald',
            lessons: [
                { id: 1, title: '你好，计算机', path: '/lesson1' },
                { id: 2, title: '变量与数据', path: '/lesson2' },
                { id: 3, title: '数字的魔法', path: '/lesson3' },
                { id: 4, title: '余数的妙用', path: '/lesson4' },
                { id: 5, title: '字符与ASCII码', path: '/lesson5' },
                { id: 6, title: '条件判断', path: '/lesson6' },
                { id: 7, title: '多重选择结构', path: '/lesson7' },
                { id: 8, title: 'for 循环', path: '/lesson8' },
                { id: 9, title: '循环魔法', path: '/lesson9' },
                { id: 10, title: 'while 循环', path: '/lesson10' },
                { id: 11, title: '循环控制', path: '/lesson11' },
                { id: 12, title: '多重循环', path: '/lesson12' },
                { id: 13, title: '数学应用', path: '/lesson13' },
                { id: 14, title: '模拟与逻辑', path: '/lesson14' },
                { id: 15, title: '筛选与统计', path: '/lesson15' },
                { id: 16, title: '考前冲刺', path: '/lesson16' },
            ]
        },
        {
            id: 'advanced',
            title: 'C++ 进阶闯关',
            subtitle: '16 节课 · 算法进阶',
            color: 'purple',
            lessons: [
                { id: 1, title: '计算机内存与网络', path: '/adv-lesson1' },
                { id: 2, title: '字符的密码 (ASCII)', path: '/adv-lesson2' },
                { id: 3, title: '位运算', path: '/adv-lesson3' },
                { id: 4, title: '时间复杂度', path: '/adv-lesson4' },
                { id: 5, title: '贪心算法', path: '/adv-lesson5' },
                { id: 6, title: '二分查找', path: '/adv-lesson6' },
                { id: 7, title: '栈与队列', path: '/adv-lesson7' },
                { id: 8, title: '动态规划入门', path: '/adv-lesson8' },
                { id: 9, title: '递归进阶', path: '/adv-lesson9' },
                { id: 10, title: '图论基础', path: '/adv-lesson10' },
                { id: 11, title: 'DFS 深度搜索', path: '/adv-lesson11' },
                { id: 12, title: 'BFS 广度搜索', path: '/adv-lesson12' },
                { id: 13, title: '树结构', path: '/adv-lesson13' },
                { id: 14, title: '字符串算法', path: '/adv-lesson14' },
                { id: 15, title: '数学进阶', path: '/adv-lesson15' },
                { id: 16, title: '综合考核', path: '/adv-lesson16' },
            ]
        },
        {
            id: 'python-basic',
            title: 'Python 基础课程',
            subtitle: '6 节课 · 趣味编程',
            color: 'yellow',
            lessons: [
                { id: 1, title: 'Python 入门', path: '/python/f1' },
                { id: 2, title: '控制流程', path: '/python/f2' },
                { id: 3, title: '列表与字典', path: '/python/f3' },
                { id: 4, title: '函数与模块', path: '/python/f4' },
                { id: 5, title: '绘图魔法', path: '/python/f5' },
                { id: 6, title: '随机世界', path: '/python/f6' },
                { id: 7, title: '集合宝藏', path: '/python/f7' },
            ]
        },
        {
            id: 'python-advanced',
            title: 'Python 进阶项目',
            subtitle: '8 个项目 · 实战演练',
            color: 'blue',
            lessons: [
                { id: 1, title: '文件与异常', path: '/python/a1' },
                { id: 2, title: '游戏工坊', path: '/python/a2' },
                { id: 3, title: 'AI 入门', path: '/python/ai' },
                { id: 4, title: '网络爬虫', path: '/python/crawler' },
                { id: 5, title: '二分查找', path: '/python/binary-search' },
                { id: 6, title: '加密解密', path: '/python/encryption' },
                { id: 7, title: '排序可视化', path: '/python/sorting' },
                { id: 8, title: '摩斯密码', path: '/python/morse' },
            ]
        }
    ];

    const colorMap = {
        emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200' },
        purple: { bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50', border: 'border-purple-200' },
        yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200' },
        blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50', border: 'border-blue-200' },
    };

    return (
        <section id="lesson-catalog" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                        全部课程目录
                    </h2>
                    <p className="text-xl text-slate-500">
                        选择你想要学习的课程，开始你的编程之旅。
                    </p>
                </div>

                <div className="space-y-4">
                    {lessonSections.map((section) => {
                        const colors = colorMap[section.color];
                        const isExpanded = expandedSection === section.id;

                        return (
                            <div key={section.id} className={`rounded-2xl border overflow-hidden transition-all ${isExpanded ? colors.border : 'border-slate-200'}`}>
                                {/* Section Header */}
                                <button
                                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                    className={`w-full p-6 flex items-center justify-between transition-colors ${isExpanded ? colors.light : 'bg-white hover:bg-slate-50'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-white`}>
                                            <BookOpen size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold text-brand-slate">{section.title}</h3>
                                            <p className="text-sm text-slate-400">{section.subtitle}</p>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        size={24}
                                        className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Lessons Grid */}
                                <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                        {section.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => navigate(lesson.path)}
                                                className="group p-4 rounded-xl bg-white border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all text-left"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg ${colors.light} ${colors.text} flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform`}>
                                                        {lesson.id}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-slate truncate flex-1">
                                                        {lesson.title}
                                                    </span>
                                                    <Play size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
