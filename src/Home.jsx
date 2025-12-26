import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Star, ChevronRight, FileText, Monitor, Lock, CheckCircle, PlayCircle, Flag, Sparkles, Map, Zap, Scissors, ArrowRight, Box, Key, Terminal, Shield, Repeat, Layers, AlignJustify, Scan, Type, Package, Trophy, ArrowUp } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();
    const [showBackToTop, setShowBackToTop] = useState(false);

    // 监听滚动事件，显示/隐藏回到顶部按钮
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 回到顶部函数
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const courses = [
        {
            id: 'level1',
            title: 'GESP C++ 一级',
            description: '知识体系 + 逻辑游乐场 + 互动陷阱卡，零基础轻松入门',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level1',
            status: 'ready',
            badge: '入门',
            badgeColor: 'from-green-500 to-emerald-500'
        },
        {
            id: 'level2',
            title: 'GESP C++ 二级',
            description: '代码执行可视化跟踪 + 万能模板库 + 考前满分秘籍',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level2',
            status: 'ready',
            badge: '基础',
            badgeColor: 'from-blue-500 to-indigo-500'
        },
        {
            id: 'level3',
            title: 'GESP C++ 三级',
            description: '位运算模拟 + 算法逻辑可视化 + 真题实战演练',
            icon: <Award className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level3',
            status: 'ready',
            badge: '进阶',
            badgeColor: 'from-indigo-500 to-violet-500'
        },
        {
            id: 'level4',
            title: 'GESP C++ 四级',
            description: '递归树展示 + 排序算法动画 + 结构体内存可视化',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level4',
            status: 'ready',
            badge: '核心',
            badgeColor: 'from-violet-500 to-purple-500'
        },
        {
            id: 'level5',
            title: 'GESP C++ 五级',
            description: '贪心策略模拟 + 二分查找动画 + 动规入门可视化',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level5',
            status: 'ready',
            badge: '提高',
            badgeColor: 'from-purple-500 to-fuchsia-500'
        },
        {
            id: 'level6',
            title: 'GESP C++ 六级',
            description: '广搜/深搜迷宫寻路实战 + 树结构动态可视化',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level6',
            status: 'ready',
            badge: '挑战',
            badgeColor: 'from-fuchsia-500 to-pink-500'
        },
        {
            id: 'level7',
            title: 'GESP C++ 七级',
            description: '高级图论算法 + 复杂搜索模拟 + 竞赛万能模板',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level7',
            status: 'ready',
            badge: '专家',
            badgeColor: 'from-pink-500 to-rose-500'
        },
        {
            id: 'level8',
            title: 'GESP C++ 八级',
            description: '最短路/MST 动画 + 组合数学 + 动规表格推演',
            icon: <Star className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20',
            path: '/level8',
            status: 'ready',
            badge: '大师',
            badgeColor: 'from-rose-500 to-red-500'
        },
    ];

    const pythonCourses = [
        {
            id: 'py_level1',
            title: 'Python 趣味启蒙',
            description: '零基础通过游戏化项目掌握编程核心逻辑',
            icon: <Terminal className="w-8 h-8 text-yellow-400" />,
            color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/20',
            path: '/python/level1',
            status: 'ready'
        },
        {

            id: 'py_level2',
            title: 'Python 进阶探险：2048 大作战',
            description: '边玩边学！用二维列表搭建游戏地图，列表推导式挤泡泡合并，矩阵变换玩转四个方向',
            icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
            color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/20',
            path: '/python/level2',
            status: 'ready'
        },
        {
            id: 'py_ai',
            title: 'Python AI 初探',
            description: '揭开人工智能的神秘面纱，训练你的第一个模型',
            icon: <Monitor className="w-8 h-8 text-yellow-400" />,
            color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/20',
            path: '/python/ai',
            status: 'locked'
        },
        {
            id: 'py_crawler',
            title: 'Python 网络爬虫',
            description: '编写聪明的爬虫助手，自动收集全网数据',
            icon: <Map className="w-8 h-8 text-yellow-400" />,
            color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg shadow-yellow-500/20',
            path: '/python/crawler',
            status: 'locked'
        }
    ];

    const lessons = [
        {
            id: 'lesson1',
            title: '第 1 课：你好,计算机',
            description: '探索计算机的五脏六腑，认识 ENIAC 和冯·诺依曼',
            icon: <CheckCircle className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-emerald-500/50',
            path: '/lesson1',
            status: 'completed'
        },
        {
            id: 'lesson2',
            title: '第 2 课：变量与数据',
            description: '给数据找个家，学会用盒子装东西',
            icon: <Zap className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/50',
            path: '/lesson2',
            status: 'completed'
        },
        {
            id: 'lesson3',
            title: '第 3 课：数字的魔法',
            description: '整数盒子与小数盒子，探索除法的秘密',
            icon: <Box className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/50',
            path: '/lesson3',
            status: 'completed'
        },
        {
            id: 'lesson4',
            title: '第 4 课：余数的妙用',
            description: '整除与取模运算，掌握两把数学刀',
            icon: <Scissors className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/50',
            path: '/lesson4',
            status: 'completed'
        },
        {
            id: 'lesson5',
            title: '第 5 课：字符与布尔',
            description: '破解 ASCII 密码，掌握真假测谎仪',
            icon: <Key className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-cyan-500 to-teal-600 shadow-cyan-500/50',
            path: '/lesson5',
            status: 'completed'
        },
        {
            id: 'lesson6',
            title: '第 6 课：逻辑判断',
            description: '代码游乐园的三种安检规则：严厉、宽容与调皮',
            icon: <Shield className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/50',
            path: '/lesson6',
            status: 'completed'
        },
        {
            id: 'lesson7',
            title: '第 7 课：条件分支',
            description: '学会让程序做选择，掌握 if-else 的魔法',
            icon: <ArrowRight className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/50',
            path: '/lesson7',
            status: 'completed'
        },
        {
            id: 'lesson8',
            title: '第 8 课：循环控制',
            description: '让代码自动重复，探索 for 和 while 的奥秘',
            icon: <PlayCircle className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/50',
            path: '/lesson8',
            status: 'completed'
        },
        {
            id: 'lesson9',
            title: '第 9 课：for 循环',
            description: '超级跑圈机器人！三步手指舞，让代码精准重复',
            icon: <PlayCircle className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/50',
            path: '/lesson9',
            status: 'completed'
        },
        {
            id: 'lesson10',
            title: '第 10 课：while 循环',
            description: '吃饼干直到没有为止！守门员循环的智慧',
            icon: <Repeat className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/50',
            path: '/lesson10',
            status: 'completed'
        },
        {
            id: 'lesson11',
            title: '第 11 课：循环控制',
            description: '破坏王与跳跳糖！掌握 break 和 continue 的魔法',
            icon: <Layers className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-fuchsia-500/50',
            path: '/lesson11',
            status: 'completed'
        },
        {
            id: 'lesson12',
            title: '第 12 课：多重循环',
            description: '忙碌的时钟与排队操！外层动一下，内层跑全程',
            icon: <AlignJustify className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-lime-500 to-green-600 shadow-lime-500/50',
            path: '/lesson12',
            status: 'completed'
        },
        {
            id: 'lesson13',
            title: '第 13 课：数学应用',
            description: '数字侦探与时间魔法！掌握取模运算和闰年判断',
            icon: <Scan className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/50',
            path: '/lesson13',
            status: 'completed'
        },
        {
            id: 'lesson14',
            title: '第 14 课：模拟与逻辑',
            description: '小小精算师的挑战！把现实问题翻译成代码',
            icon: <Type className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/50',
            path: '/lesson14',
            status: 'completed'
        },
        {
            id: 'lesson15',
            title: '第 15 课：筛选与统计',
            description: '挑西瓜与数豆子！掌握计数器与筛选技巧',
            icon: <Package className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/50',
            path: '/lesson15',
            status: 'completed'
        },
        {
            id: 'lesson16',
            title: '第 16 课：考前冲刺',
            description: '编程宇航员的发射日！最后的安检与真题实战',
            icon: <Trophy className="w-6 h-6 text-white" />,
            color: 'bg-gradient-to-br from-yellow-500 to-amber-600 shadow-yellow-500/50',
            path: '/lesson16',
            status: 'completed'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-100 pb-20 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
            {/* 回到顶部按钮 */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                aria-label="回到顶部"
            >
                <ArrowUp size={24} />
            </button>
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">G</div>
                    <h1 className="font-bold text-xl text-slate-100 tracking-tight">代码冒险岛</h1>
                </div>
            </header>

            <main className="relative z-10 w-full">
                <section className="max-w-5xl mx-auto px-4 py-12">

                    {/* Hero Section */}
                    <div className="text-center mb-20 animate-fade-in relative">
                        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-yellow-400 mb-6 tracking-tight drop-shadow-sm">
                            C++ 全程互动可视化课程
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            拒绝枯燥，让算法"动"起来！从入门到精通，每一步都有交互式动画伴你前行。
                        </p>
                    </div>

                    {/* Core Courses Card */}
                    <div className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Award className="text-blue-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100">核心考级课程</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    onClick={() => course.status === 'ready' && navigate(course.path)}
                                    className={`
                  rounded-2xl border p-6 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm
                  ${course.status === 'ready'
                                            ? 'bg-gradient-to-b from-slate-800 to-slate-800/50 border-blue-500/30 cursor-pointer hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-600/20 hover:-translate-y-2'
                                            : 'bg-slate-900/30 border-slate-800 cursor-not-allowed opacity-60 grayscale hover:opacity-80'
                                        }
                `}
                                >
                                    {course.status === 'ready' && (
                                        <>
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                            {course.badge && (
                                                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r ${course.badgeColor || 'from-indigo-500 to-blue-500'} text-white shadow-lg animate-fade-in ring-1 ring-white/20`}>
                                                    {course.badge}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${course.color} shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                                        {course.status === 'locked' ? <Lock size={24} /> : course.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-3 transition-colors ${course.status === 'ready' ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-500'}`}>
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className={`
                    flex items-center font-bold text-sm w-fit px-4 py-2 rounded-full transition-all
                    ${course.status === 'ready'
                                            ? 'text-blue-400 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white'
                                            : 'text-slate-600 bg-slate-800'
                                        }
                  `}>
                                        {course.status === 'ready' ? (
                                            <>开始学习 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></>
                                        ) : (
                                            <>敬请期待 <Lock size={14} className="ml-1" /></>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Python Section (Full Band) */}
                <section className="relative py-24 bg-slate-900 border-y border-yellow-900/30 overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-slate-900 to-slate-900 pointer-events-none"></div>
                    <div className="absolute -left-20 top-20 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative max-w-5xl mx-auto px-4">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Terminal className="text-yellow-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100">Python 创意编程</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pythonCourses.map((course) => (
                                <div
                                    key={course.id}
                                    onClick={() => course.status === 'ready' && navigate(course.path)}
                                    className={`
                  rounded-2xl border p-6 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm
                  ${course.status === 'ready'
                                            ? 'bg-gradient-to-b from-slate-800 to-slate-800/50 border-yellow-500/30 cursor-pointer hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-600/20 hover:-translate-y-2'
                                            : 'bg-slate-900/30 border-slate-800 cursor-not-allowed opacity-60 grayscale hover:opacity-80'
                                        }
                `}
                                >
                                    {course.status === 'ready' && (
                                        <>
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                                        </>
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${course.color} shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                                        {course.status === 'locked' ? <Lock size={24} /> : course.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-3 transition-colors ${course.status === 'ready' ? 'text-slate-100 group-hover:text-yellow-400' : 'text-slate-500'}`}>
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed line-clamp-2">
                                        {course.description}
                                    </p>
                                    <div className={`
                  flex items-center font-bold text-sm w-fit px-4 py-2 rounded-full transition-all
                  ${course.status === 'ready'
                                            ? 'text-yellow-400 bg-yellow-500/10 group-hover:bg-yellow-500 group-hover:text-black'
                                            : 'text-slate-600 bg-slate-800'
                                        }
                `}>
                                        {course.status === 'ready' ? (
                                            <>立即探索 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></>
                                        ) : (
                                            <>筹备中 <Lock size={14} className="ml-1" /></>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative z-10 max-w-5xl mx-auto px-4 py-12">

                    {/* Knowledge Map Section */}
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-16 justify-center md:justify-start">
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <Map className="text-indigo-400" size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100">一级趣味闯关地图</h3>
                        </div>

                        <div className="relative max-w-4xl mx-auto px-4 pb-20">
                            {/* The Winding Path Line (SVG) */}
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                                <defs>
                                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <path
                                    d="M 150 60 Q 400 60 650 180 T 150 300 T 650 420 T 150 540 T 650 660 T 150 780 T 650 900 T 150 1020 T 650 1140 T 150 1260 T 650 1380 T 150 1500 T 650 1620 T 150 1740 T 650 1860"
                                    fill="none"
                                    stroke="url(#pathGradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    filter="url(#glow)"
                                    className="opacity-60"
                                />
                                {/* Animated Dash */}
                                <path
                                    d="M 150 60 Q 400 60 650 180 T 150 300 T 650 420 T 150 540 T 650 660 T 150 780 T 650 900 T 150 1020 T 650 1140 T 150 1260 T 650 1380 T 150 1500 T 650 1620 T 150 1740 T 650 1860"
                                    fill="none"
                                    stroke="#60a5fa"
                                    strokeWidth="2"
                                    strokeDasharray="20 20"
                                    className="animate-[dash_20s_linear_infinite] opacity-80"
                                />
                            </svg>

                            {/* Mobile Vertical Line */}
                            <div className="absolute top-4 bottom-4 left-8 w-1 bg-gradient-to-b from-blue-500 to-slate-800 md:hidden -z-10"></div>

                            <div className="space-y-16 md:space-y-0 md:relative md:h-[1920px]">
                                {lessons.map((lesson, index) => {
                                    const isEven = index % 2 === 0;
                                    // Calculate position for winding effect
                                    return (
                                        <div
                                            key={lesson.id}
                                            onClick={() => lesson.status !== 'locked' && navigate(lesson.path)}
                                            className={`
                      flex items-center gap-6 transition-all duration-500 group
                      relative md:absolute md:w-[400px]
                      md:top-[var(--desktop-top)]
                      ${isEven ? 'md:left-[5%]' : 'md:left-[55%]'}
                      ${lesson.status === 'locked' ? 'cursor-not-allowed opacity-60 grayscale' : 'cursor-pointer hover:scale-105 z-10'}
                    `}
                                            style={{
                                                '--desktop-top': `${index * 120}px`
                                            }}
                                        >
                                            {/* Node Circle */}
                                            <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-2xl border-4 border-slate-900 relative z-10
                      ${lesson.color}
                      ${lesson.status === 'current' ? 'animate-bounce shadow-blue-500/50' : ''}
                      group-hover:rotate-12 transition-transform
                    `}>
                                                {lesson.icon}
                                                {lesson.status === 'current' && (
                                                    <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
                                                )}
                                            </div>

                                            {/* Content Card */}
                                            <div className={`
                      flex-1 p-5 rounded-2xl border backdrop-blur-md transition-all duration-300
                      ${lesson.status === 'current'
                                                    ? 'bg-slate-800/80 border-blue-500/50 shadow-lg shadow-blue-900/30'
                                                    : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/60 hover:border-slate-600'}
                    `}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className={`font-bold text-lg ${lesson.status === 'locked' ? 'text-slate-500' : 'text-slate-200 group-hover:text-blue-400'}`}>
                                                        {lesson.title}
                                                    </h4>
                                                    {lesson.status === 'completed' && <CheckCircle size={16} className="text-emerald-500" />}
                                                    {lesson.status === 'locked' && <Lock size={16} className="text-slate-600" />}
                                                </div>

                                                <p className="text-sm text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                                                    {lesson.description}
                                                </p>

                                                {lesson.status === 'current' && (
                                                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                        <div className="bg-blue-500 h-full w-1/3 animate-[shimmer_2s_infinite]"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-800/50 py-12 mt-24 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex justify-center gap-6 mb-6 text-slate-500">
                        <Sparkles size={20} className="hover:text-yellow-400 transition-colors cursor-pointer" />
                        <Monitor size={20} className="hover:text-blue-400 transition-colors cursor-pointer" />
                        <BookOpen size={20} className="hover:text-emerald-400 transition-colors cursor-pointer" />
                    </div>
                    <p className="text-slate-300 font-bold text-base mb-2">代码冒险岛</p>
                    <p className="text-slate-500 text-sm">沐新青少年科创活动中心 出品</p>
                </div>
            </footer>

            <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div >
    );
}
