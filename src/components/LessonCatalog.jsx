import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Binary,
    BookOpen,
    Brain,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Code,
    Cpu,
    Database,
    Layers,
    Route,
    Target,
    Terminal,
    Trophy,
    Users
} from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { getLessonStatus, LESSON_STATUS_META, readLessonProgress } from '../utils/lessonProgress';

const pythonStart = pythonFoundationLessons[0];
const pythonProjectStart = pythonProjects[0];
const pythonFileProject = pythonProjects.find((project) => project.id === 'file-ops');

function toCatalogLessons(items) {
    return items.map((item, index) => ({
        id: index + 1,
        title: item.catalogTitle,
        path: item.path,
    }));
}

function toCppLessons(level, titles) {
    return titles.map((title, index) => ({
        id: index + 1,
        title,
        path: `/lesson/${level}/${index + 1}`,
    }));
}

const lessonSections = [
    {
        id: 'basic',
        subject: 'cpp',
        title: 'C++ 基础闯关',
        subtitle: 'GESP 一级',
        badge: 'L1',
        color: 'emerald',
        icon: Code,
        audience: '零基础或刚学完输入输出、变量的学生',
        goal: '把语法基础、条件、循环和简单模拟练扎实',
        bridge: '完成后适合进入 GESP 一级冲刺与基础真题',
        checkpoints: ['会读懂顺序/分支/循环程序', '能处理倍数、闰年、统计类题', '能独立完成一轮基础模拟卷'],
        examPath: getCppLevelCatalogItem(1).path,
        lessons: toCppLessons(1, [
            '你好，计算机',
            '变量与数据',
            '数字的魔法',
            '余数的妙用',
            '字符与ASCII码',
            '逻辑运算',
            '条件判断',
            '多重选择结构',
            'for 循环',
            'while 循环',
            '循环控制',
            '多重循环',
            '数学应用',
            '模拟与逻辑',
            '筛选与统计',
            '考前冲刺',
        ])
    },
    {
        id: 'advanced',
        subject: 'cpp',
        title: 'C++ 进阶闯关',
        subtitle: 'GESP 二级',
        badge: 'L2',
        color: 'purple',
        icon: Cpu,
        audience: '已经掌握循环，开始接触数组和数位处理的学生',
        goal: '补齐嵌套循环、数位拆解、数组和模拟题的稳定做法',
        bridge: '完成后建议刷二级近年真题，重点复盘循环边界',
        checkpoints: ['能拆解数位和因数倍数问题', '能用数组保存和统计数据', '能画出嵌套循环执行过程'],
        examPath: getCppLevelCatalogItem(2).path,
        lessons: toCppLessons(2, [
            '计算机通识 (RAM/IP)',
            '字符的密码 (ASCII)',
            '数据变形记 (类型转换)',
            '神奇的开关 (Switch)',
            '嵌套循环基础',
            '图形打印实战',
            '流程图的秘密',
            '数学工具箱 (cmath)',
            '质数侦探 (Prime)',
            '数字拆拆看 (数位)',
            '因数与倍数',
            '一维数组初探',
            '模拟算法实战 1',
            '模拟算法实战 2',
            '易错题诊疗室',
            '全真模拟考试',
        ])
    },
    {
        id: 'expert',
        subject: 'cpp',
        title: 'C++ 高阶闯关',
        subtitle: 'GESP 三级',
        badge: 'L3',
        color: 'rose',
        icon: Binary,
        audience: '需要攻克数组、字符串、进制和位运算的学生',
        goal: '把抽象数据表示转成可推演、可编码的解题步骤',
        bridge: '完成后适合做三级综合卷，重点看程序阅读和边界样例',
        checkpoints: ['能解释进制、补码和位运算结果', '能处理字符串与数组综合题', '能用枚举和模拟解决中等逻辑题'],
        examPath: getCppLevelCatalogItem(3).path,
        lessons: toCppLessons(3, [
            '变身数字魔术师 (进制)',
            '负数的真面目 (补码)',
            '位运算大冒险 (上)',
            '位运算大冒险 (下)',
            '一维数组的奥秘',
            '数组操作实战',
            '字符串魔法 (string)',
            '字符串进阶操作',
            '数组与字符串综合',
            '暴力破解 (枚举法)',
            '按部就班 (模拟法)',
            '加密与解密',
            '图形打印大师',
            '进制转换编程专场',
            '综合逻辑挑战',
            '全真模拟与避坑',
        ])
    },
    {
        id: 'senior',
        subject: 'cpp',
        title: 'C++ 资深闯关',
        subtitle: 'GESP 四级',
        badge: 'L4',
        color: 'indigo',
        icon: Database,
        audience: '开始学习函数、指针、结构体、二维数组和排序的学生',
        goal: '建立模块化编程能力，能把复杂题拆成函数和数据结构',
        bridge: '完成后建议做四级编程题专项，再进入排序与递推复盘',
        checkpoints: ['能设计函数并传入数组参数', '能使用结构体组织多字段数据', '能手写基础排序和二维数组遍历'],
        examPath: getCppLevelCatalogItem(4).path,
        lessons: toCppLessons(4, [
            '代码的积木：自定义函数',
            '数据的替身：传值与传参',
            '特殊的参数：数组进函数',
            '递归初探 (函数调用自己)',
            '神秘的门牌号：指针入门',
            '指针与数组的纠葛',
            '超级档案袋：结构体 (Struct)',
            '二维数组与矩阵',
            '排队的智慧：冒泡排序',
            '打扑克牌：插入排序',
            '挑选最小的：选择排序',
            '找规律高手：递推算法',
            '文件小管家 (freopen)',
            '异常处理与复杂度',
            '综合编程实战 (1)',
            '全真模拟与避坑 (2)',
        ])
    },
    {
        id: 'expert5',
        subject: 'cpp',
        title: 'C++ 专家闯关',
        subtitle: 'GESP 五级',
        badge: 'L5',
        color: 'amber',
        icon: Brain,
        audience: '已经能写中等模拟题，准备进入算法专题的学生',
        goal: '集中训练数论、高精度、链表、二分、贪心和复杂度',
        bridge: '完成后建议刷五级编程题，错题按“算法选择”分类',
        checkpoints: ['能判断何时使用二分或贪心', '能处理大整数与链表基础题', '能估算复杂度并避开超时写法'],
        examPath: getCppLevelCatalogItem(5).path,
        lessons: toCppLessons(5, [
            '素数大筛选 (埃氏/线性)',
            '公约数与公倍数 (GCD)',
            '超级计算器 (高精加减)',
            '超级计算器 (高精乘除)',
            '数论综合实战',
            '链表的诞生 (节点/指针)',
            '链表的增删改 (先连后断)',
            '复杂的链表 (双向/循环)',
            '链表综合应用 (约瑟夫环)',
            '猜数字的艺术 (二分查找)',
            '分而治之 (分治思想)',
            '眼下的最优 (贪心策略)',
            '递归的进阶 (记忆化)',
            '算法有多快？(复杂度)',
            '编程题专项训练',
            '全真模拟与技巧',
        ])
    },
    {
        id: 'master',
        subject: 'cpp',
        title: 'C++ 大师闯关',
        subtitle: 'GESP 六级',
        badge: 'L6',
        color: 'teal',
        icon: Layers,
        audience: '需要系统学习树、搜索、面向对象和动态规划的学生',
        goal: '把算法模型和 C++ 工程语法放进同一套训练框架',
        bridge: '完成后适合进入六级整卷训练，并开始准备 L7/L8 专题',
        checkpoints: ['能区分 BFS、DFS 和树遍历场景', '能写基础类与对象代码', '能建立背包和路径类 DP 状态'],
        examPath: getCppLevelCatalogItem(6).path,
        lessons: toCppLessons(6, [
            '树的初相识 (性质/存储)',
            '树的遍历 (前/中/后序)',
            '最优二叉树 (哈夫曼)',
            '地毯式搜索 (BFS)',
            '不撞南墙不回头 (DFS)',
            '类的蓝图 (封装/构造)',
            '家族传承 (继承/保护)',
            '千变万化 (多态/虚函数)',
            '特殊的编码 (格雷码)',
            'OOP 综合实战',
            '记忆的魔法 (DP 基础)',
            '背包问题 (0/1 背包)',
            '完全背包与简单 DP',
            '编程实战：矩阵与路径',
            '易错题诊疗室',
            '全真模拟考试',
        ])
    },
    {
        id: 'python-basic',
        subject: 'python',
        title: 'Python 基础',
        subtitle: '趣味编程',
        badge: 'F1-F7',
        color: 'yellow',
        icon: BookOpen,
        audience: '零基础、低龄入门或希望先建立编程兴趣的学生',
        goal: '通过输出、条件、容器、函数、绘图和随机项目建立基本编程直觉',
        bridge: '完成后适合进入 Python 项目课，或转入 C++ 基础体系',
        checkpoints: ['能读写变量、条件和循环代码', '能使用列表、字典、集合组织数据', '能完成一个小型绘图或随机小游戏'],
        examPath: pythonStart.path,
        lessons: toCatalogLessons(pythonFoundationLessons)
    },
    {
        id: 'python-advanced',
        subject: 'python',
        title: 'Python 进阶',
        subtitle: '实战演练',
        badge: 'Project',
        color: 'blue',
        icon: Terminal,
        audience: '已经掌握基础语法，想通过作品理解算法和应用的学生',
        goal: '用游戏、AI、爬虫、加密、排序和文件项目连接真实应用',
        bridge: '完成后适合做作品集，也能反向巩固算法和数据结构',
        checkpoints: ['能把需求拆成输入、处理、输出', '能读懂项目代码结构', '能解释作品的核心算法或模块'],
        examPath: pythonProjectStart.path,
        lessons: toCatalogLessons(pythonProjects)
    }
];

const unavailableLessonIdsBySection = {
};

function isLessonReady(sectionId, lessonId) {
    return !unavailableLessonIdsBySection[sectionId]?.includes(lessonId);
}

const colorMap = {
    emerald: {
        bg: 'bg-emerald-600',
        text: 'text-emerald-700',
        light: 'bg-emerald-50',
        border: 'border-emerald-200',
        active: 'bg-emerald-600 text-white shadow-md shadow-emerald-200',
        hoverBorder: 'hover:border-emerald-200'
    },
    purple: {
        bg: 'bg-purple-600',
        text: 'text-purple-700',
        light: 'bg-purple-50',
        border: 'border-purple-200',
        active: 'bg-purple-600 text-white shadow-md shadow-purple-200',
        hoverBorder: 'hover:border-purple-200'
    },
    yellow: {
        bg: 'bg-yellow-500',
        text: 'text-yellow-700',
        light: 'bg-yellow-50',
        border: 'border-yellow-200',
        active: 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-200',
        hoverBorder: 'hover:border-yellow-200'
    },
    blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-700',
        light: 'bg-blue-50',
        border: 'border-blue-200',
        active: 'bg-blue-600 text-white shadow-md shadow-blue-200',
        hoverBorder: 'hover:border-blue-200'
    },
    rose: {
        bg: 'bg-rose-600',
        text: 'text-rose-700',
        light: 'bg-rose-50',
        border: 'border-rose-200',
        active: 'bg-rose-600 text-white shadow-md shadow-rose-200',
        hoverBorder: 'hover:border-rose-200'
    },
    indigo: {
        bg: 'bg-indigo-600',
        text: 'text-indigo-700',
        light: 'bg-indigo-50',
        border: 'border-indigo-200',
        active: 'bg-indigo-600 text-white shadow-md shadow-indigo-200',
        hoverBorder: 'hover:border-indigo-200'
    },
    amber: {
        bg: 'bg-amber-500',
        text: 'text-amber-700',
        light: 'bg-amber-50',
        border: 'border-amber-200',
        active: 'bg-amber-500 text-slate-950 shadow-md shadow-amber-200',
        hoverBorder: 'hover:border-amber-200'
    },
    teal: {
        bg: 'bg-teal-600',
        text: 'text-teal-700',
        light: 'bg-teal-50',
        border: 'border-teal-200',
        active: 'bg-teal-600 text-white shadow-md shadow-teal-200',
        hoverBorder: 'hover:border-teal-200'
    },
};

const subjectSummaries = {
    cpp: {
        label: 'C++ GESP 体系',
        title: '按等级推进，最后落到真题复盘',
        description: '适合目标明确、需要阶段考试反馈的学生。每一级先补概念和题型，再进入冲刺页与真题库。',
        cta: '进入真题题库',
        ctaPath: '/question-bank'
    },
    python: {
        label: 'Python 兴趣与项目体系',
        title: '先建立兴趣，再把语法做成作品',
        description: '适合零基础启蒙、项目制学习和作品展示。基础课负责概念，进阶课负责把代码连接到真实任务。',
        cta: '从 Python F1 开始',
        ctaPath: pythonStart.path
    }
};

const seniorExamLinks = [
    { title: `${getCppLevelCatalogItem(7).title}冲刺`, desc: '树与图论搜索专题', path: getCppLevelCatalogItem(7).path },
    { title: `${getCppLevelCatalogItem(8).title}冲刺`, desc: '图论算法与动态规划', path: getCppLevelCatalogItem(8).path },
];

function getSubjectSummaryStats(subject) {
    const sections = lessonSections.filter(section => section.subject === subject);

    if (subject === 'cpp') {
        const lessonCount = sections.reduce((sum, section) => sum + section.lessons.length, 0);
        const sprintEntryCount = sections.length + seniorExamLinks.length;

        return [
            `${sections.length} 个系统课段`,
            `${lessonCount} 节等级课`,
            `L1-L${sprintEntryCount} 冲刺入口`,
        ];
    }

    const foundationCount = sections.find(section => section.id === 'python-basic')?.lessons.length || 0;
    const projectCount = sections.find(section => section.id === 'python-advanced')?.lessons.length || 0;

    return [
        `${foundationCount} 节基础课`,
        `${projectCount} 个项目课`,
        '适合作品集',
    ];
}

function getSectionSubtitle(section) {
    const countLabel = section.id === 'python-advanced'
        ? `${section.lessons.length} 个项目`
        : `${section.lessons.length} 课时`;

    return `${countLabel} · ${section.subtitle}`;
}

function getSectionAction(section, subject) {
    if (subject === 'cpp') {
        return {
            label: '查看冲刺课',
            path: section.examPath,
            Icon: Trophy
        };
    }

    if (section.id === 'python-basic') {
        return {
            label: '进入项目线',
            path: pythonProjectStart.path,
            Icon: Terminal
        };
    }

    return {
        label: '回基础线复习',
        path: pythonStart.path,
        Icon: BookOpen
    };
}

function getPracticeAction(section, subject) {
    if (subject === 'cpp') {
        return {
            label: '练真题',
            path: '/question-bank',
            hint: '已上线课时可以直接进入，建设中课时先看冲刺课或真题复盘。'
        };
    }

    if (section.id === 'python-basic') {
        return {
            label: '看项目课',
            path: pythonProjectStart.path,
            hint: '基础课完成后进入项目课，把语法变成可展示的小作品。'
        };
    }

    return {
        label: '复习基础课',
        path: pythonStart.path,
        hint: '项目课建议结合基础课回看前置概念，重点补变量、循环、函数和容器。'
    };
}

function getUnavailableLessonHint(section, subject) {
    if (subject === 'cpp') {
        return '本课段课时正在建设中，建议先看冲刺课和真题复盘。';
    }

    if (section.id === 'python-basic') {
        return '本课段课时正在建设中，建议先完成已上线基础课，再进入项目线做作品。';
    }

    return '本课段课时正在建设中，建议先复习 Python 基础课，再回到项目课继续推进。';
}

function getPythonProgressionLinks(section) {
    if (section.id === 'python-basic') {
        return [
            { title: '进入 Python 项目线', desc: '从算法思维开始，把基础语法连接到作品。', path: pythonProjectStart.path },
            { title: '回到学习路径', desc: '对比 Python、C++ 与项目制学习入口。', path: '/' },
        ];
    }

    return [
        { title: '复习 Python 基础', desc: '回看变量、循环、函数、列表和字典等前置能力。', path: pythonStart.path },
        { title: '收束到文件项目', desc: '把项目输出保存、复盘并整理成可展示作品。', path: pythonFileProject.path },
    ];
}

export default function LessonCatalog() {
    const navigate = useNavigate();
    const [activeSubject, setActiveSubject] = useState('cpp');
    const [activeTab, setActiveTab] = useState('basic');
    const [progress, setProgress] = useState(() => readLessonProgress());

    // Re-read learning status whenever the catalog regains focus, so finishing a
    // lesson in another tab/route reflects here without a full reload.
    useEffect(() => {
        const refresh = () => setProgress(readLessonProgress());
        window.addEventListener('focus', refresh);
        document.addEventListener('visibilitychange', refresh);
        return () => {
            window.removeEventListener('focus', refresh);
            document.removeEventListener('visibilitychange', refresh);
        };
    }, []);

    const filteredSections = useMemo(
        () => lessonSections.filter(section => section.subject === activeSubject),
        [activeSubject]
    );

    useEffect(() => {
        const firstSection = lessonSections.find(section => section.subject === activeSubject);
        if (firstSection) {
            setActiveTab(firstSection.id);
        }
    }, [activeSubject]);

    const activeSection = lessonSections.find(section => section.id === activeTab) || filteredSections[0];
    const activeColors = colorMap[activeSection.color];
    const summary = subjectSummaries[activeSubject];
    const summaryStats = getSubjectSummaryStats(activeSubject);
    const readyLessons = activeSection.lessons.filter(lesson => isLessonReady(activeSection.id, lesson.id));
    const readyCount = readyLessons.length;
    const masteredCount = readyLessons.filter(lesson => ['mastered', 'review'].includes(getLessonStatus(lesson.path, progress))).length;
    const hasReadyLessons = readyCount > 0;
    const lessonStatusText = readyCount === activeSection.lessons.length
        ? '全部上线'
        : `${readyCount}/${activeSection.lessons.length} 已上线`;
    const sectionAction = getSectionAction(activeSection, activeSubject);
    const practiceAction = getPracticeAction(activeSection, activeSubject);
    const unavailableLessonHint = getUnavailableLessonHint(activeSection, activeSubject);
    const SectionActionIcon = sectionAction.Icon;
    const pythonProgressionLinks = activeSubject === 'python'
        ? getPythonProgressionLinks(activeSection)
        : [];

    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-500">
                            <Route size={14} />
                            课程目录
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            先判断阶段，再进入具体课时
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                            根据当前基础选择课段：看清适合对象、学习目标和下一步练习，再进入具体课时。
                        </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                        <div className="mb-2 text-xs font-black uppercase tracking-wider text-slate-500">{summary.label}</div>
                        <h3 className="text-xl font-black text-slate-950">{summary.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{summary.description}</p>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
                            {summaryStats.map((stat) => (
                                <div key={stat} className="rounded-lg bg-white px-2 py-3 ring-1 ring-slate-200">
                                    {stat}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate(summary.ctaPath)}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700"
                        >
                            {summary.cta}
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-2 rounded-lg bg-slate-100 p-1.5">
                    <button
                        onClick={() => setActiveSubject('cpp')}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition sm:flex-none ${activeSubject === 'cpp'
                            ? 'bg-white text-slate-950 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <Code size={18} className={activeSubject === 'cpp' ? 'text-blue-600' : ''} />
                        C++ 体系
                    </button>
                    <button
                        onClick={() => setActiveSubject('python')}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition sm:flex-none ${activeSubject === 'python'
                            ? 'bg-white text-slate-950 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <Terminal size={18} className={activeSubject === 'python' ? 'text-yellow-600' : ''} />
                        Python 体系
                    </button>
                </div>

                <div className="mb-8 flex gap-2 overflow-x-auto pb-3">
                    {filteredSections.map((section) => {
                        const colors = colorMap[section.color];
                        const isActive = activeTab === section.id;
                        const Icon = section.icon;
                        const sectionReadyCount = section.lessons.filter(lesson => isLessonReady(section.id, lesson.id)).length;
                        const sectionStatusText = sectionReadyCount === section.lessons.length
                            ? '全部上线'
                            : `${sectionReadyCount}/${section.lessons.length} 已上线`;

                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`flex min-w-fit items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black transition ${isActive
                                    ? colors.active
                                    : 'bg-slate-50 text-slate-500 ring-1 ring-slate-200 hover:bg-white hover:text-slate-900'
                                    }`}
                            >
                                <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-white/20' : 'bg-white'}`}>
                                    <Icon size={18} />
                                </span>
                                <span>
                                    <span className="block">{section.title}</span>
                                    <span className={`block text-xs ${isActive ? 'opacity-80' : 'text-slate-400'}`}>
                                        {section.badge} · {sectionStatusText}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    key={activeTab}
                    className={`rounded-lg border ${activeColors.border} bg-white shadow-sm`}
                >
                        <div className="grid gap-0 lg:grid-cols-[22rem_minmax(0,1fr)]">
                            <aside className={`${activeColors.light} border-b ${activeColors.border} p-6 lg:border-b-0 lg:border-r`}>
                                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${activeColors.bg} text-white`}>
                                    {React.createElement(activeSection.icon, { size: 26 })}
                                </div>
                                <div className="mb-3 inline-flex rounded-lg bg-white px-2.5 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">
                                    {getSectionSubtitle(activeSection)}
                                </div>
                                <h3 className="text-2xl font-black text-slate-950">{activeSection.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{activeSection.goal}</p>
                                <div className="mt-4 inline-flex rounded-lg bg-white px-3 py-1.5 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                                    课时状态：{lessonStatusText}
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div>
                                        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                                            <Users size={14} />
                                            适合对象
                                        </div>
                                        <p className="text-sm font-semibold leading-6 text-slate-700">{activeSection.audience}</p>
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                                            <Target size={14} />
                                            学完能做
                                        </div>
                                        <ul className="space-y-2">
                                            {activeSection.checkpoints.map((checkpoint) => (
                                                <li key={checkpoint} className="flex gap-2 text-sm font-semibold leading-6 text-slate-700">
                                                    <CheckCircle2 className={activeColors.text} size={16} />
                                                    <span>{checkpoint}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-lg bg-white p-4 ring-1 ring-slate-200">
                                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                                        <ClipboardList size={14} />
                                        衔接建议
                                    </div>
                                    <p className="text-sm leading-6 text-slate-600">{activeSection.bridge}</p>
                                </div>

                                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                                    <button
                                        onClick={() => hasReadyLessons && navigate(readyLessons[0].path)}
                                        disabled={!hasReadyLessons}
                                        className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black text-white transition ${hasReadyLessons ? `${activeColors.bg} hover:brightness-95` : 'cursor-not-allowed bg-slate-300 text-slate-500'}`}
                                    >
                                        {hasReadyLessons ? '从已上线课开始' : '课时建设中'}
                                        {hasReadyLessons && <ChevronRight size={16} />}
                                    </button>
                                    <button
                                        onClick={() => navigate(sectionAction.path)}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                                    >
                                        <SectionActionIcon size={16} />
                                        {sectionAction.label}
                                    </button>
                                </div>
                            </aside>

                            <div className="p-5 sm:p-6">
                                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h4 className="text-lg font-black text-slate-950">课时列表</h4>
                                        <p className="text-sm text-slate-500">
                                            {hasReadyLessons
                                                ? practiceAction.hint
                                                : unavailableLessonHint}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => navigate(practiceAction.path)}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                                    >
                                        {practiceAction.label}
                                        <ChevronRight size={16} />
                                    </button>
                                </div>

                                {hasReadyLessons && (
                                    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold">
                                        {Object.entries(LESSON_STATUS_META).map(([key, meta]) => (
                                            <span key={key} className="inline-flex items-center gap-1.5 text-slate-500">
                                                <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                                                {meta.label}
                                            </span>
                                        ))}
                                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200">
                                            本课段已过关 {masteredCount}/{readyCount}
                                        </span>
                                    </div>
                                )}

                                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    {activeSection.lessons.map((lesson) => {
                                        const lessonReady = isLessonReady(activeSection.id, lesson.id);
                                        const status = lessonReady ? getLessonStatus(lesson.path, progress) : null;
                                        const statusMeta = status ? LESSON_STATUS_META[status] : null;
                                        const passed = status === 'mastered' || status === 'review';
                                        return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => lessonReady && navigate(lesson.path)}
                                            disabled={!lessonReady}
                                            className={`group flex min-h-[5.25rem] items-start gap-3 rounded-lg border p-3 text-left transition ${lessonReady
                                                ? `border-slate-200 bg-slate-50/60 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${activeColors.hoverBorder}`
                                                : 'cursor-not-allowed border-slate-200 bg-slate-100/70 opacity-75'
                                                }`}
                                        >
                                            <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black ${passed ? 'bg-emerald-50 text-emerald-700' : lessonReady ? `${activeColors.light} ${activeColors.text}` : 'bg-white text-slate-400'}`}>
                                                {passed ? <CheckCircle2 size={18} /> : lesson.id}
                                                {statusMeta && status !== 'unseen' && (
                                                    <span className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white ${statusMeta.dot}`} />
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className={`line-clamp-2 text-sm font-black leading-5 transition ${lessonReady ? 'text-slate-800 group-hover:text-blue-700' : 'text-slate-500'}`}>
                                                    {lesson.title}
                                                </span>
                                                <span className={`mt-2 inline-flex items-center gap-1 text-xs font-bold ${statusMeta ? statusMeta.text : 'text-slate-400'}`}>
                                                    {lessonReady ? (
                                                        <>
                                                            {status !== 'unseen' && <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dot}`} />}
                                                            {status === 'unseen' ? '开始学习' : statusMeta.label}
                                                            <ChevronRight size={12} className="transition group-hover:translate-x-0.5" />
                                                        </>
                                                    ) : '建设中'}
                                                </span>
                                            </span>
                                        </button>
                                        );
                                    })}
                                </div>

                                {activeSubject === 'cpp' && (
                                    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                                            <Trophy size={16} className="text-amber-600" />
                                            高等级冲刺入口
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {seniorExamLinks.map((link) => (
                                                <button
                                                    key={link.path}
                                                    onClick={() => navigate(link.path)}
                                                    className="flex items-center justify-between gap-3 rounded-lg bg-white p-4 text-left ring-1 ring-slate-200 transition hover:ring-blue-200"
                                                >
                                                    <span>
                                                        <span className="block text-sm font-black text-slate-900">{link.title}</span>
                                                        <span className="mt-1 block text-xs font-semibold text-slate-500">{link.desc}</span>
                                                    </span>
                                                    <ChevronRight size={16} className="text-slate-400" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSubject === 'python' && (
                                    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-800">
                                            <BookOpen size={16} className="text-yellow-600" />
                                            Python 学习衔接
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {pythonProgressionLinks.map((link) => (
                                                <button
                                                    key={link.path}
                                                    onClick={() => navigate(link.path)}
                                                    className="flex items-center justify-between gap-3 rounded-lg bg-white p-4 text-left ring-1 ring-slate-200 transition hover:ring-yellow-200"
                                                >
                                                    <span>
                                                        <span className="block text-sm font-black text-slate-900">{link.title}</span>
                                                        <span className="mt-1 block text-xs font-semibold text-slate-500">{link.desc}</span>
                                                    </span>
                                                    <ChevronRight size={16} className="text-slate-400" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}
