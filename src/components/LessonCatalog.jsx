import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Binary,
    BookOpen,
    Brain,
    Check,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Code,
    Cpu,
    Database,
    Layers,
    Lightbulb,
    Target,
    Terminal,
    Trophy,
    Users
} from 'lucide-react';
import { getCppLevelCatalogItem } from '../data/cppLevelCatalog';
import { pythonFoundationLessons, pythonProjects } from '../data/pythonCourseCatalog';
import { getLessonStatus, LESSON_STATUS_META, readLessonProgress } from '../utils/lessonProgress';

import { arduinoLessons, contestLessons, foundationLessons, innovationLessons } from '../data/innovationCourseCatalog';

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
        id: 'science-foundation', subject: 'science-foundation', title: '初阶科创',
        subtitle: '电路 · 电与磁 · 动手探究', badge: '15 课', color: 'amber', icon: Lightbulb,
        audience: '希望通过动手实验认识电路、电与磁的学生',
        goal: '从点亮小灯到搭建小型发电站，学会连接、观察、比较与解释。',
        bridge: '按第 1–15 课逐步完成实验，再进入 ESP32 MicroPython 高阶科创。',
        checkpoints: ['能连接并画出简单电路', '能观察材料、电阻与电容的作用', '能探索电磁转换并制作小型发电站'],
        examPath: '/innovation-foundation', lessons: foundationLessons,
    },
    {
        id: 'arduino-foundation', subject: 'arduino', title: 'Arduino UNO',
        subtitle: '零基础硬件编程 · 网页课件', badge: '16 课', color: 'blue', icon: Cpu,
        audience: '初次接触 Arduino、希望从灯光与按键开始学习硬件编程的学生',
        goal: '从读懂 Blink 到使用传感器和舵机，完成智能垃圾桶综合项目。',
        bridge: '按第 1–16 课顺序学习，逐步建立 Arduino 程序结构与硬件调试能力。',
        checkpoints: ['能读懂 setup 与 loop', '能控制灯光、按键、串口与传感器', '能组合模块完成智能垃圾桶'],
        examPath: '/hardware/arduino', lessons: arduinoLessons,
    },
    {
        id: 'innovation-advanced', subject: 'innovation', title: '高阶科创',
        subtitle: 'ESP32 MicroPython · 网页课件', badge: '36 课', color: 'teal', icon: Cpu,
        audience: '希望通过动手制作认识编程、硬件与 AI 的学生',
        goal: '从点亮 LED 开始，用 MicroPython 与 AI 完成真实的硬件任务。',
        bridge: '按五个阶段完成第 1–35 课与第 16.5 课，再用竞赛延伸包整理参赛材料。',
        checkpoints: ['能控制灯光、按钮和屏幕', '能阅读并验证 AI 生成的代码', '能将创意整理成需求文档'],
        examPath: '/hardware/esp32-curriculum',
        lessons: innovationLessons,
    },
    {
        id: 'innovation-contest', subject: 'innovation', title: '竞赛延伸包',
        subtitle: '选修 · 与主线并行', badge: '7 课', color: 'amber', icon: Trophy,
        audience: '已经有可演示作品，准备开展研究与参赛展示的学生',
        goal: '围绕一个真实问题，完成实验、数据图表、展板、演示和答辩材料。',
        bridge: '先完成主线中的作品，再按 C1–C7 整理完整的参赛包。',
        checkpoints: ['能提出清楚的研究问题', '能用实验数据支持结论', '能向评委讲清作品和证据'],
        examPath: '/hardware/esp32-contest', lessons: contestLessons,
    },
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
            '计算机与第一个程序',
            '变量与数据',
            '整除、取余与优先级',
            '数据类型与类型转换',
            '赋值与自增自减',
            '格式化输入输出',
            '关系与逻辑运算',
            'if 与 if-else',
            '多分支与 switch',
            'for 循环',
            'while 与 do-while',
            'break 与 continue',
            '数位分离',
            '循环读入与统计',
            '因数、质数与平方数',
            '一级综合复盘',
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
        id: 'sprint',
        subject: 'cpp',
        title: 'C++ 冲刺闯关',
        subtitle: 'GESP 七级',
        badge: 'L7',
        color: 'indigo',
        icon: Layers,
        audience: '已完成六级、要系统攻克搜索与动态规划的学生',
        goal: '把复杂度意识、图搜索和 DP 建模串成一条可复用的解题路径',
        bridge: '完成后适合进入七级整卷训练，并衔接八级的综合建模',
        checkpoints: ['能根据数据范围反推该用什么复杂度的算法', '能写出 DFS/BFS 与判重剪枝', '能独立设计线性 DP 与背包状态'],
        examPath: getCppLevelCatalogItem(7).path,
        lessons: toCppLessons(7, [
            '复杂度分析实战',
            '二叉树的存储与遍历',
            '二叉排序树与平衡',
            '哈希表与冲突处理',
            '图的存储：邻接表与邻接矩阵',
            '深度优先搜索 DFS',
            '广度优先搜索 BFS',
            '搜索的剪枝与状态判重',
            '动态规划入门：线性 DP',
            '背包问题家族',
            '类、封装与构造析构',
            '继承、虚函数与多态',
            '命名空间与作用域',
            '排序算法的稳定性与选择',
            '易错题诊疗室',
            '全真模拟与应试策略',
        ])
    },
    {
        id: 'summit',
        subject: 'cpp',
        title: 'C++ 登顶闯关',
        subtitle: 'GESP 八级',
        badge: 'L8',
        color: 'rose',
        icon: Layers,
        audience: '目标八级、需要计数、图论与综合建模能力的学生',
        goal: '把排列组合、图论算法与 C++ 工程细节整合成竞赛级解题能力',
        bridge: '完成后可直接进入八级整卷训练与竞赛方向',
        checkpoints: ['能用计数原理拆解带限制的问题', '能选择并实现最短路与最小生成树', '能严格分析递归与均摊复杂度'],
        examPath: getCppLevelCatalogItem(8).path,
        lessons: toCppLessons(8, [
            '计数原理与排列组合',
            '组合数与杨辉三角',
            '概率与期望初步',
            '面向对象进阶：拷贝与资源管理',
            '运算符重载与模板',
            '图论基础回顾与建模',
            '最短路：Dijkstra 与 Floyd',
            '最小生成树：Prim 与 Kruskal',
            '动态规划：区间与树形',
            '数论：质数、gcd 与快速幂',
            '进制转换与位运算技巧',
            '复杂度的严格分析',
            '分治与递归优化',
            'C++ 综合：指针、内存与异常',
            '易错题诊疗室',
            '全真模拟与应试策略',
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
        badge: 'A1-A9',
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

// 未建成的课时在目录里标为「建设中」，而不是给出一个点开就 404 的入口。
// 一至八级 16 课已全部建成（src/lessons/cpp/l1–l8，LessonRouter 支持 1–8 级），
// 这张表暂时为空；以后新增课段分批上线时，在这里登记未建成的课时编号。
const unavailableLessonIdsBySection = {
};

function isLessonReady(sectionId, lessonId) {
    return !unavailableLessonIdsBySection[sectionId]?.includes(lessonId);
}

// 配色按「体系 → 线路」统一取（见 docs/site-design-language.md）：
// 同一体系的所有课段共用一条线路色，课段之间靠标题和编号区分，
// 课段数据里的 color 字段不再参与首页配色。
const subjectTabs = [
    { id: 'cpp', label: 'C++ 体系', line: 'cpp', Icon: Code },
    { id: 'python', label: 'Python 体系', line: 'python', Icon: Terminal },
    { id: 'science-foundation', label: '初阶科创', line: 'maker', Icon: Lightbulb },
    { id: 'arduino', label: 'Arduino 体系', line: 'maker', Icon: Cpu },
    { id: 'innovation', label: '高阶科创', line: 'maker', Icon: Cpu },
];

const lineClassForSubject = (subject) => {
    const tab = subjectTabs.find((item) => item.id === subject);
    return `mw-line-${tab ? tab.line : 'cpp'}`;
};

const subjectSummaries = {
    'science-foundation': {
        label: '初阶科创', title: '从小灯到发电站，动手发现科学',
        description: '15 节科创探究课：连接电路、比较导电材料、认识电与磁，把观察变成自己的作品。',
        cta: '从第 1 课开始', ctaPath: '/innovation-foundation/1',
    },
    arduino: {
        label: 'Arduino UNO 硬件编程', title: '从 Blink 到智能垃圾桶',
        description: '16 节零基础 Arduino 网页课件：读懂 setup / loop，控制灯光、按键、串口、传感器与舵机，最后组装一个完整项目。',
        cta: '从第 1 课开始', ctaPath: '/hardware/arduino/1',
    },
    innovation: {
        label: 'ESP32 MicroPython 高阶科创', title: '用 MicroPython 与 AI 完成硬件项目',
        description: 'ESP32 × AI 网页课件：第 1–35 课、联网预备包第 16.5 课，以及 7 节竞赛延伸课。',
        cta: '从第 1 课开始', ctaPath: '/hardware/esp32/1',
    },
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
    if (subject === 'science-foundation') return [`${foundationLessons.length} 节网页课`, '电与磁', '动手探究'];
    if (subject === 'arduino') return [`${arduinoLessons.length} 节网页课`, 'Arduino UNO', '综合项目'];
    if (subject === 'innovation') return [`${innovationLessons.length + contestLessons.length} 节网页课`, 'ESP32 × AI', '动手做作品'];
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
    if (subject === 'science-foundation') return { label: '查看初阶课程目录', path: '/innovation-foundation', Icon: Lightbulb };
    if (subject === 'arduino') return { label: '查看 Arduino 课程目录', path: '/hardware/arduino', Icon: Cpu };
    if (subject === 'innovation') return { label: section.id === 'innovation-contest' ? '查看竞赛课程目录' : '查看高阶课程目录', path: section.examPath, Icon: section.icon };
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
    if (subject === 'science-foundation') return { label: '查看课程目录', path: '/innovation-foundation', hint: '按第 1–15 课顺序学习，打开网页课件跟着实验一起探索。' };
    if (subject === 'arduino') return { label: '查看课程目录', path: '/hardware/arduino', hint: '16 节网页课已经全部上线，建议按顺序完成到智能垃圾桶项目。' };
    if (subject === 'innovation') return { label: '查看课程目录', path: section.examPath, hint: section.id === 'innovation-contest' ? '竞赛 C1–C7 已上线，按顺序整理参赛材料。' : '第 1–35 课与第 16.5 课已上线，按五个阶段学习。' };
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

// 首页导航用 ?subject=arduino 之类的参数直接落到对应体系，这里做一次白名单校验。
const VALID_SUBJECTS = new Set(subjectTabs.map((tab) => tab.id));
const getRequestedSubject = () => {
    const requested = new URLSearchParams(window.location.search).get('subject');
    return VALID_SUBJECTS.has(requested) ? requested : 'cpp';
};

export default function LessonCatalog() {
    const [activeSubject, setActiveSubject] = useState(getRequestedSubject);
    const [activeTab, setActiveTab] = useState(() => {
        const first = lessonSections.find(section => section.subject === getRequestedSubject());
        return first ? first.id : 'basic';
    });
    const [progress, setProgress] = useState(() => readLessonProgress());

    useEffect(() => {
        if (new URLSearchParams(window.location.search).get('subject')) {
            document.getElementById('lesson-catalog')?.scrollIntoView();
        }
    }, []);

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

    // 切换体系的那一帧 activeTab 还是旧体系的课段，这里只认当前体系里的课段。
    const activeSection = filteredSections.find(section => section.id === activeTab) || filteredSections[0];
    const lineClass = lineClassForSubject(activeSubject);
    const summary = subjectSummaries[activeSubject];
    const summaryStats = getSubjectSummaryStats(activeSubject);
    const readyLessons = activeSection.lessons.filter(lesson => isLessonReady(activeSection.id, lesson.id));
    const readyCount = readyLessons.length;
    const masteredCount = readyLessons.filter(lesson => ['mastered', 'review'].includes(getLessonStatus(lesson.path, progress))).length;
    const isPriorityCppSection = readyLessons.some(lesson => /^\/lesson\/[1-3]\//.test(lesson.path));
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
    const statusLabel = (status, meta) => (
        isPriorityCppSection && status === 'mastered' ? '已完成自查' : meta.label
    );

    return (
        <section className="home-catalog" aria-labelledby="home-catalog-title">
            <div className="home-container">
                <div className="home-catalog-head">
                    <div className="home-section-head">
                        <div>
                            <p className="mw-kicker">课程目录</p>
                            <h2 id="home-catalog-title">全部课程，按体系排好</h2>
                            <p>
                                根据当前基础选择课段：看清适合对象、学习目标和下一步练习，再进入具体课时。课时编号外的圆圈记录你在这台设备上的学习进度。
                            </p>
                        </div>
                    </div>

                    <aside className={`home-catalog-summary ${lineClass}`} aria-label={`${summary.label}简介`}>
                        <p className="home-catalog-summary-label">{summary.label}</p>
                        <h3>{summary.title}</h3>
                        <p>{summary.description}</p>
                        <ul className="home-catalog-stats">
                            {summaryStats.map((stat) => (
                                <li key={stat}>{stat}</li>
                            ))}
                        </ul>
                        <Link to={summary.ctaPath} className="mw-button mw-button--primary">
                            {summary.cta}
                            <ChevronRight size={16} aria-hidden="true" />
                        </Link>
                    </aside>
                </div>

                <div className="home-subjects" role="group" aria-label="选择课程体系">
                    {subjectTabs.map(({ id, label, line, Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveSubject(id)}
                            aria-pressed={activeSubject === id}
                            className={`home-subject mw-line-${line}`}
                        >
                            <Icon size={18} aria-hidden="true" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className={`home-section-tabs ${lineClass}`} role="group" aria-label="选择课段">
                    {filteredSections.map((section) => {
                        const sectionReadyCount = section.lessons.filter(lesson => isLessonReady(section.id, lesson.id)).length;
                        const sectionStatusText = sectionReadyCount === section.lessons.length
                            ? '全部上线'
                            : `${sectionReadyCount}/${section.lessons.length} 已上线`;

                        return (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => setActiveTab(section.id)}
                                aria-pressed={activeSection.id === section.id}
                                className="home-section-tab"
                            >
                                <span className="home-section-tab-badge">{section.badge}</span>
                                <span>
                                    <span className="home-section-tab-title">{section.title}</span>
                                    <span className="home-section-tab-status">{sectionStatusText}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div key={activeSection.id} className={`home-board ${lineClass}`}>
                    <aside className="home-board-aside">
                        <span className="home-board-icon" aria-hidden="true">
                            {React.createElement(activeSection.icon, { size: 22 })}
                        </span>
                        <p className="home-board-subtitle">{getSectionSubtitle(activeSection)}</p>
                        <h3>{activeSection.title}</h3>
                        <p className="home-board-goal">{activeSection.goal}</p>
                        <p className="home-board-status">课时状态：{lessonStatusText}</p>

                        <div className="home-board-block">
                            <h4>
                                <Users size={15} aria-hidden="true" />
                                适合对象
                            </h4>
                            <p>{activeSection.audience}</p>
                        </div>
                        <div className="home-board-block">
                            <h4>
                                <Target size={15} aria-hidden="true" />
                                学完能做
                            </h4>
                            <ul className="home-board-checks">
                                {activeSection.checkpoints.map((checkpoint) => (
                                    <li key={checkpoint}>
                                        <CheckCircle2 size={16} aria-hidden="true" />
                                        <span>{checkpoint}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="home-board-block home-board-bridge">
                            <h4>
                                <ClipboardList size={15} aria-hidden="true" />
                                衔接建议
                            </h4>
                            <p>{activeSection.bridge}</p>
                        </div>

                        <div className="home-board-actions">
                            {hasReadyLessons ? (
                                <Link to={readyLessons[0].path} className="mw-button mw-button--primary">
                                    从已上线课开始
                                    <ChevronRight size={16} aria-hidden="true" />
                                </Link>
                            ) : (
                                <button type="button" disabled className="mw-button">课时建设中</button>
                            )}
                            <Link to={sectionAction.path} className="mw-button mw-button--secondary">
                                <SectionActionIcon size={16} aria-hidden="true" />
                                {sectionAction.label}
                            </Link>
                        </div>
                    </aside>

                    <div className="home-board-main">
                        <div className="home-board-main-head">
                            <div>
                                <h4>课时列表</h4>
                                <p>{hasReadyLessons ? practiceAction.hint : unavailableLessonHint}</p>
                            </div>
                            <Link to={practiceAction.path} className="mw-button mw-button--secondary mw-button--small">
                                {practiceAction.label}
                                <ChevronRight size={16} aria-hidden="true" />
                            </Link>
                        </div>

                        {hasReadyLessons && (
                            <div className="home-board-legend">
                                {Object.entries(LESSON_STATUS_META).map(([key, meta]) => (
                                    <span key={key}>
                                        <span className="mw-station" data-state={key} aria-hidden="true" />
                                        {statusLabel(key, meta)}
                                    </span>
                                ))}
                                <span className="home-board-passed">
                                    {isPriorityCppSection ? '本课段已完成自查' : '本课段已过关'} {masteredCount}/{readyCount}
                                </span>
                            </div>
                        )}

                        <ol className="home-lessons">
                            {activeSection.lessons.map((lesson) => {
                                const lessonReady = isLessonReady(activeSection.id, lesson.id);
                                const status = lessonReady ? getLessonStatus(lesson.path, progress) : null;
                                const statusMeta = status ? LESSON_STATUS_META[status] : null;
                                const passed = status === 'mastered' || status === 'review';
                                const content = (
                                    <>
                                        <span className="mw-sr-only">第 {lesson.id} 课：</span>
                                        <span className="home-lesson-no" aria-hidden="true">
                                            {passed ? <Check size={16} strokeWidth={3} /> : lesson.id}
                                        </span>
                                        <span className="home-lesson-text">
                                            <span className="home-lesson-title">{lesson.title}</span>
                                            <span className="home-lesson-status">
                                                {!lessonReady && '建设中'}
                                                {lessonReady && status === 'unseen' && '开始学习'}
                                                {lessonReady && status !== 'unseen' && statusLabel(status, statusMeta)}
                                            </span>
                                        </span>
                                    </>
                                );

                                return (
                                    <li key={lesson.id}>
                                        {lessonReady ? (
                                            <Link to={lesson.path} className="home-lesson" data-status={status}>
                                                {content}
                                            </Link>
                                        ) : (
                                            <div className="home-lesson" data-status="unavailable">
                                                {content}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>

                        {activeSubject === 'cpp' && (
                            <div className="home-board-links">
                                <h4>
                                    <Trophy size={16} aria-hidden="true" />
                                    高等级冲刺入口
                                </h4>
                                <ul>
                                    {seniorExamLinks.map((link) => (
                                        <li key={link.path}>
                                            <Link to={link.path} className="home-board-link">
                                                <span>
                                                    <strong>{link.title}</strong>
                                                    <span>{link.desc}</span>
                                                </span>
                                                <ChevronRight size={16} aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeSubject === 'python' && (
                            <div className="home-board-links">
                                <h4>
                                    <BookOpen size={16} aria-hidden="true" />
                                    Python 学习衔接
                                </h4>
                                <ul>
                                    {pythonProgressionLinks.map((link) => (
                                        <li key={link.path}>
                                            <Link to={link.path} className="home-board-link">
                                                <span>
                                                    <strong>{link.title}</strong>
                                                    <span>{link.desc}</span>
                                                </span>
                                                <ChevronRight size={16} aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
