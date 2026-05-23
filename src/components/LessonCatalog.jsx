import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Code, Cpu, Database, Binary, Brain, Layers, ChevronRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LessonCatalog() {
    const navigate = useNavigate();
    const [activeSubject, setActiveSubject] = useState('cpp');
    const [activeTab, setActiveTab] = useState('basic');

    const lessonSections = [
        // C++ Series
        {
            id: 'basic',
            subject: 'cpp',
            title: 'C++ 基础闯关',
            subtitle: '16 节课 · 入门必备',
            color: 'emerald',
            icon: Code,
            lessons: [
                { id: 1, title: '你好，计算机', path: '/lesson/1/1' },
                { id: 2, title: '变量与数据', path: '/lesson/1/2' },
                { id: 3, title: '数字的魔法', path: '/lesson/1/3' },
                { id: 4, title: '余数的妙用', path: '/lesson/1/4' },
                { id: 5, title: '字符与ASCII码', path: '/lesson/1/5' },
                { id: 6, title: '逻辑运算', path: '/lesson/1/6' },
                { id: 7, title: '条件判断', path: '/lesson/1/7' },
                { id: 8, title: '多重选择结构', path: '/lesson/1/8' },
                { id: 9, title: 'for 循环', path: '/lesson/1/9' },
                { id: 10, title: 'while 循环', path: '/lesson/1/10' },
                { id: 11, title: '循环控制', path: '/lesson/1/11' },
                { id: 12, title: '多重循环', path: '/lesson/1/12' },
                { id: 13, title: '数学应用', path: '/lesson/1/13' },
                { id: 14, title: '模拟与逻辑', path: '/lesson/1/14' },
                { id: 15, title: '筛选与统计', path: '/lesson/1/15' },
                { id: 16, title: '考前冲刺', path: '/lesson/1/16' },
            ]
        },
        {
            id: 'advanced',
            subject: 'cpp',
            title: 'C++ 进阶闯关',
            subtitle: '16 课时 · GESP 二级',
            color: 'purple',
            icon: Cpu,
            lessons: [
                { id: 1, title: '计算机通识 (RAM/IP)', path: '/lesson/2/1' },
                { id: 2, title: '字符的密码 (ASCII)', path: '/lesson/2/2' },
                { id: 3, title: '数据变形记 (类型转换)', path: '/lesson/2/3' },
                { id: 4, title: '神奇的开关 (Switch)', path: '/lesson/2/4' },
                { id: 5, title: '嵌套循环基础', path: '/lesson/2/5' },
                { id: 6, title: '图形打印实战', path: '/lesson/2/6' },
                { id: 7, title: '流程图的秘密', path: '/lesson/2/7' },
                { id: 8, title: '数学工具箱 (cmath)', path: '/lesson/2/8' },
                { id: 9, title: '质数侦探 (Prime)', path: '/lesson/2/9' },
                { id: 10, title: '数字拆拆看 (数位)', path: '/lesson/2/10' },
                { id: 11, title: '因数与倍数', path: '/lesson/2/11' },
                { id: 12, title: '一维数组初探', path: '/lesson/2/12' },
                { id: 13, title: '模拟算法实战 1', path: '/lesson/2/13' },
                { id: 14, title: '模拟算法实战 2', path: '/lesson/2/14' },
                { id: 15, title: '易错题诊疗室', path: '/lesson/2/15' },
                { id: 16, title: '全真模拟考试', path: '/lesson/2/16' },
            ]
        },
        {
            id: 'expert',
            subject: 'cpp',
            title: 'C++ 高阶闯关',
            subtitle: '16 课时 · GESP 三级',
            color: 'rose',
            icon: Binary,
            lessons: [
                { id: 1, title: '变身数字魔术师 (进制)', path: '/lesson/3/1' },
                { id: 2, title: '负数的真面目 (补码)', path: '/lesson/3/2' },
                { id: 3, title: '位运算大冒险 (上)', path: '/lesson/3/3' },
                { id: 4, title: '位运算大冒险 (下)', path: '/lesson/3/4' },
                { id: 5, title: '一维数组的奥秘', path: '/lesson/3/5' },
                { id: 6, title: '数组操作实战', path: '/lesson/3/6' },
                { id: 7, title: '字符串魔法 (string)', path: '/lesson/3/7' },
                { id: 8, title: '字符串进阶操作', path: '/lesson/3/8' },
                { id: 9, title: '数组与字符串综合', path: '/lesson/3/9' },
                { id: 10, title: '暴力破解 (枚举法)', path: '/lesson/3/10' },
                { id: 11, title: '按部就班 (模拟法)', path: '/lesson/3/11' },
                { id: 12, title: '加密与解密', path: '/lesson/3/12' },
                { id: 13, title: '图形打印大师', path: '/lesson/3/13' },
                { id: 14, title: '进制转换编程专场', path: '/lesson/3/14' },
                { id: 15, title: '综合逻辑挑战', path: '/lesson/3/15' },
                { id: 16, title: '全真模拟与避坑', path: '/lesson/3/16' },
            ]
        },
        {
            id: 'senior',
            subject: 'cpp',
            title: 'C++ 资深闯关',
            subtitle: '16 课时 · GESP 四级',
            color: 'indigo',
            icon: Database,
            lessons: [
                { id: 1, title: '代码的积木：自定义函数', path: '/lesson/4/1' },
                { id: 2, title: '数据的替身：传值与传参', path: '/lesson/4/2' },
                { id: 3, title: '特殊的参数：数组进函数', path: '/lesson/4/3' },
                { id: 4, title: '递归初探 (函数调用自己)', path: '/lesson/4/4' },
                { id: 5, title: '神秘的门牌号：指针入门', path: '/lesson/4/5' },
                { id: 6, title: '指针与数组的纠葛', path: '/lesson/4/6' },
                { id: 7, title: '超级档案袋：结构体 (Struct)', path: '/lesson/4/7' },
                { id: 8, title: '二维数组与矩阵', path: '/lesson/4/8' },
                { id: 9, title: '排队的智慧：冒泡排序', path: '/lesson/4/9' },
                { id: 10, title: '打扑克牌：插入排序', path: '/lesson/4/10' },
                { id: 11, title: '挑选最大的：选择排序', path: '/lesson/4/11' },
                { id: 12, title: '找规律高手：递推算法', path: '/lesson/4/12' },
                { id: 13, title: '文件小管家 (freopen)', path: '/lesson/4/13' },
                { id: 14, title: '异常处理与复杂度', path: '/lesson/4/14' },
                { id: 15, title: '综合编程实战 (1)', path: '/lesson/4/15' },
                { id: 16, title: '全真模拟与避坑 (2)', path: '/lesson/4/16' },
            ]
        },
        {
            id: 'expert5',
            subject: 'cpp',
            title: 'C++ 专家闯关',
            subtitle: '16 课时 · GESP 五级',
            color: 'amber',
            icon: Brain,
            lessons: [
                { id: 1, title: '素数大筛选 (埃氏/线性)', path: '/lesson/5/1' },
                { id: 2, title: '公约数与公倍数 (GCD)', path: '/lesson/5/2' },
                { id: 3, title: '超级计算器 (高精加减)', path: '/lesson/5/3' },
                { id: 4, title: '超级计算器 (高精乘除)', path: '/lesson/5/4' },
                { id: 5, title: '数论综合实战', path: '/lesson/5/5' },
                { id: 6, title: '链表的诞生 (节点/指针)', path: '/lesson/5/6' },
                { id: 7, title: '链表的增删改 (先连后断)', path: '/lesson/5/7' },
                { id: 8, title: '复杂的链表 (双向/循环)', path: '/lesson/5/8' },
                { id: 9, title: '链表综合应用 (约瑟夫环)', path: '/lesson/5/9' },
                { id: 10, title: '猜数字的艺术 (二分查找)', path: '/lesson/5/10' },
                { id: 11, title: '分而治之 (分治思想)', path: '/lesson/5/11' },
                { id: 12, title: '眼下的最优 (贪心策略)', path: '/lesson/5/12' },
                { id: 13, title: '递归的进阶 (记忆化)', path: '/lesson/5/13' },
                { id: 14, title: '算法有多快？(复杂度)', path: '/lesson/5/14' },
                { id: 15, title: '编程题专项训练', path: '/lesson/5/15' },
                { id: 16, title: '全真模拟与技巧', path: '/lesson/5/16' },
            ]
        },
        {
            id: 'master',
            subject: 'cpp',
            title: 'C++ 大师闯关',
            subtitle: '16 课时 · GESP 六级',
            color: 'teal',
            icon: Layers,
            lessons: [
                { id: 1, title: '树的初相识 (性质/存储)', path: '/lesson/6/1' },
                { id: 2, title: '树的遍历 (前/中/后序)', path: '/lesson/6/2' },
                { id: 3, title: '最优二叉树 (哈夫曼)', path: '/lesson/6/3' },
                { id: 4, title: '地毯式搜索 (BFS)', path: '/lesson/6/4' },
                { id: 5, title: '不撞南墙不回头 (DFS)', path: '/lesson/6/5' },
                { id: 6, title: '类的蓝图 (封装/构造)', path: '/lesson/6/6' },
                { id: 7, title: '家族传承 (继承/保护)', path: '/lesson/6/7' },
                { id: 8, title: '千变万化 (多态/虚函数)', path: '/lesson/6/8' },
                { id: 9, title: '特殊的编码 (格雷码)', path: '/lesson/6/9' },
                { id: 10, title: 'OOP 综合实战', path: '/lesson/6/10' },
                { id: 11, title: '记忆的魔法 (DP 基础)', path: '/lesson/6/11' },
                { id: 12, title: '背包问题 (0/1 背包)', path: '/lesson/6/12' },
                { id: 13, title: '完全背包与简单 DP', path: '/lesson/6/13' },
                { id: 14, title: '编程实战：矩阵与路径', path: '/lesson/6/14' },
                { id: 15, title: '易错题诊疗室', path: '/lesson/6/15' },
                { id: 16, title: '全真模拟考试', path: '/lesson/6/16' },
            ]
        },

        // Python Series
        {
            id: 'python-basic',
            subject: 'python',
            title: 'Python 基础',
            subtitle: '6 节课 · 趣味编程',
            color: 'yellow',
            icon: BookOpen,
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
            subject: 'python',
            title: 'Python 进阶',
            subtitle: '9 个项目 · 实战演练',
            color: 'blue',
            icon: Terminal,
            lessons: [
                { id: 1, title: '算法思维', path: '/python/a1' },
                { id: 2, title: '游戏工坊', path: '/python/a2' },
                { id: 3, title: 'AI 入门', path: '/python/ai' },
                { id: 4, title: '网络爬虫', path: '/python/crawler' },
                { id: 5, title: '二分查找', path: '/python/binary-search' },
                { id: 6, title: '加密解密', path: '/python/encryption' },
                { id: 7, title: '排序可视化', path: '/python/sorting' },
                { id: 8, title: '摩斯密码', path: '/python/morse' },
                { id: 9, title: '文件操作', path: '/python/file-ops' },
            ]
        }
    ];

    const colorMap = {
        emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200', ring: 'ring-emerald-200' },
        purple: { bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50', border: 'border-purple-200', ring: 'ring-purple-200' },
        yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200', ring: 'ring-yellow-200' },
        blue: { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50', border: 'border-blue-200', ring: 'ring-blue-200' },
        rose: { bg: 'bg-rose-500', text: 'text-rose-500', light: 'bg-rose-50', border: 'border-rose-200', ring: 'ring-rose-200' },
        indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', light: 'bg-indigo-50', border: 'border-indigo-200', ring: 'ring-indigo-200' },
        amber: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200', ring: 'ring-amber-200' },
        teal: { bg: 'bg-teal-500', text: 'text-teal-500', light: 'bg-teal-50', border: 'border-teal-200', ring: 'ring-teal-200' },
    };

    // Filter sections based on active subject
    const filteredSections = lessonSections.filter(section => section.subject === activeSubject);

    // Auto-select first tab when subject changes
    useEffect(() => {
        if (filteredSections.length > 0) {
            setActiveTab(filteredSections[0].id);
        }
    }, [activeSubject]);

    const activeSection = lessonSections.find(s => s.id === activeTab);
    const activeColors = colorMap[activeSection?.color || 'emerald'];

    return (
        <section id="lesson-catalog" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-brand-slate mb-4">
                        全部课程目录
                    </h2>
                    <p className="text-xl text-slate-500 mb-8">
                        体系化课程设计，从入门到精通的进阶之路
                    </p>

                    {/* Tier 1: Subject Switcher */}
                    <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                        <button
                            onClick={() => setActiveSubject('cpp')}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all
                                ${activeSubject === 'cpp'
                                    ? 'bg-white text-brand-slate shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }
                            `}
                        >
                            <Code size={18} className={activeSubject === 'cpp' ? 'text-blue-500' : ''} />
                            C++ 体系
                        </button>
                        <button
                            onClick={() => setActiveSubject('python')}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all
                                ${activeSubject === 'python'
                                    ? 'bg-white text-brand-slate shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }
                            `}
                        >
                            <Terminal size={18} className={activeSubject === 'python' ? 'text-yellow-500' : ''} />
                            Python 体系
                        </button>
                    </div>
                </div>

                {/* Tier 2: Level Tabs */}
                <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar snap-x justify-center">
                    {filteredSections.map((section) => {
                        const colors = colorMap[section.color];
                        const isActive = activeTab === section.id;
                        const Icon = section.icon;

                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`
                                    flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all snap-start
                                    ${isActive
                                        ? `${colors.bg} text-white shadow-lg shadow-${section.color}-200 transform scale-105`
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }
                                `}
                            >
                                <Icon size={18} />
                                {section.title}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`rounded-3xl border p-8 ${activeColors.border} bg-white shadow-sm`}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-14 h-14 rounded-2xl ${activeColors.bg} flex items-center justify-center text-white shadow-md`}>
                                {React.createElement(activeSection.icon, { size: 28 })}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brand-slate">{activeSection.title}</h3>
                                <p className="text-slate-500">{activeSection.subtitle}</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {activeSection.lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => navigate(lesson.path)}
                                    className={`
                                        group p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white
                                        hover:shadow-md hover:border-${activeSection.color}-200 transition-all text-left flex items-start gap-3
                                    `}
                                >
                                    <div className={`
                                        w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm transition-transform group-hover:scale-110
                                        ${activeColors.light} ${activeColors.text}
                                    `}>
                                        {lesson.id}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-bold text-brand-slate text-sm truncate w-full mb-1 group-hover:text-blue-600 transition-colors">
                                            {lesson.title}
                                        </h4>
                                        <div className="flex items-center text-xs text-slate-400 group-hover:text-slate-500">
                                            <span>点击开始学习</span>
                                            <ChevronRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
