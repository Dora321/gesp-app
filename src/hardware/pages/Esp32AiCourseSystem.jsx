import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bot,
    BrainCircuit,
    Bug,
    ChevronDown,
    ChevronLeft,
    ChevronUp,
    ClipboardCheck,
    Cpu,
    FileText,
    GraduationCap,
    Home,
    Lightbulb,
    ListChecks,
    Route,
    Sparkles,
    Target,
    Wrench
} from 'lucide-react';

const courseData = {
    overview: {
        title: 'ESP32 × AI 科创课程体系',
        subtitle: '从「看懂代码」到「驾驭 AI 做项目」',
        audience: '小学高年级（5-6 年级）',
        totalLessons: '16 课时（可按学期展开）',
        philosophy: '不是教编程语法，而是培养「AI 时代的工程思维」：提出问题 → 拆解需求 → 指挥 AI → 验证判断 → 迭代改进'
    },
    phases: [
        {
            id: 1,
            title: '读懂 AI',
            subtitle: '学会阅读和验证 AI 生成的代码',
            color: 'emerald',
            lessons: '第 1-5 课',
            coreAbility: '能看懂 10 行 MicroPython 代码，能判断代码的运行结果',
            aiRole: 'AI 是一台「代码打印机」：学生不写代码，只读代码',
            units: [
                {
                    num: 1,
                    title: 'LED 亮了！',
                    goal: '第一次接触 ESP32 和 AI 生成的代码',
                    project: '控制板载 LED 亮灭',
                    aiUsage: '老师当场向 AI 提问，学生观看全过程',
                    keySkill: '认识 Pin / OUT / value() 三个概念',
                    homework: '回家试着向 AI 提一个关于 LED 的问题'
                },
                {
                    num: 2,
                    title: '闪烁密码',
                    goal: '理解 time.sleep() 和循环',
                    project: '让 LED 闪出 SOS 摩斯密码',
                    aiUsage: '学生第一次自己向 AI 提问',
                    keySkill: '把「亮 0.2 秒灭 0.2 秒」翻译成代码逻辑',
                    homework: '用闪烁编码自己名字的首字母'
                },
                {
                    num: 3,
                    title: '谁按了按钮？',
                    goal: '理解输入（IN）和条件判断（if）',
                    project: '按钮控制 LED 开关',
                    aiUsage: '学生提问时必须描述硬件接线',
                    keySkill: '学会在提问中说清楚「哪个引脚接了什么」',
                    homework: '改成「按一下亮，再按一下灭」（切换模式）'
                },
                {
                    num: 4,
                    title: '小屏幕说话了',
                    goal: '接触 OLED 显示和库的概念',
                    project: 'OLED 屏幕显示自己的名字 + 温度数据',
                    aiUsage: '让学生体验「AI 不认识某个库」的情况',
                    keySkill: '学会告诉 AI「我用的是 SSD1306/SH1106」',
                    homework: '让 OLED 显示一个倒计时'
                },
                {
                    num: 5,
                    title: 'AI 错了！',
                    goal: '建立对 AI 输出的批判意识',
                    project: '老师故意给「有 bug 的 AI 代码」，学生找错',
                    aiUsage: '学生把报错信息粘贴给 AI，让 AI 自己改',
                    keySkill: '读懂基本报错信息（NameError / SyntaxError）',
                    homework: '记录一次「AI 出错 → 你发现 → 修好了」的过程'
                }
            ]
        },
        {
            id: 2,
            title: '指挥 AI',
            subtitle: '学会精确描述需求，让 AI 写出真正想要的代码',
            color: 'indigo',
            lessons: '第 6-10 课',
            coreAbility: '能独立向 AI 描述一个传感器项目的需求并拿到可用代码',
            aiRole: 'AI 是一个「实习程序员」：学生当项目经理，下需求单',
            units: [
                {
                    num: 6,
                    title: '好问题 vs 坏问题',
                    goal: '系统学习「提示词工程」基础',
                    project: '同一个任务，对比模糊提问和精确提问的 AI 输出差异',
                    aiUsage: '老师展示 3 种提问方式，学生投票哪个结果最好',
                    keySkill: '提问模板：硬件 + 语言 + 行为 + 约束',
                    homework: '写 3 个关于 ESP32 的提问，互相评价哪个最精确'
                },
                {
                    num: 7,
                    title: '温度播报员',
                    goal: '传感器读数 + 条件逻辑的需求拆解',
                    project: 'DHT11 读温湿度，OLED 显示，超过阈值 LED 报警',
                    aiUsage: '学生写「需求单」再提问，不允许一句话描述全部功能',
                    keySkill: '把复杂需求拆成 2-3 步分别问 AI',
                    homework: '加一个功能：湿度超过 80% 也报警'
                },
                {
                    num: 8,
                    title: '光感小夜灯',
                    goal: '模拟输入（ADC）+ PWM 概念',
                    project: '光敏电阻检测环境亮度，LED 自动调节亮度',
                    aiUsage: '学生需要向 AI 解释「我要渐变亮度，不是开关」',
                    keySkill: '理解 PWM 占空比的概念（通过 AI 解释 + 实验验证）',
                    homework: '改成「天越暗灯越亮」的反向逻辑'
                },
                {
                    num: 9,
                    title: '彩虹灯带',
                    goal: 'WS2812 LED 的控制 + 循环的深入理解',
                    project: '用代码控制灯带颜色渐变、呼吸、流水效果',
                    aiUsage: '学生描述「我想要的灯光效果」让 AI 实现',
                    keySkill: '用自然语言精确描述视觉效果（颜色、速度、模式）',
                    homework: '设计一个自己的灯光效果，写好需求文档'
                },
                {
                    num: 10,
                    title: '需求文档大挑战',
                    goal: '阶段性综合检验',
                    project: '抽签拿到随机项目题目，写需求文档 → 问 AI → 调试 → 展示',
                    aiUsage: '全程自主使用 AI，老师只在硬件接线环节介入',
                    keySkill: '完整走一遍「需求 → 提问 → 验证 → 修改」闭环',
                    homework: '给同学的项目写一份改进建议'
                }
            ]
        },
        {
            id: 3,
            title: '超越 AI',
            subtitle: '做 AI 做不到的事：创意、整合、解决真实问题',
            color: 'orange',
            lessons: '第 11-16 课',
            coreAbility: '能独立完成一个多模块项目，从创意到展示全流程',
            aiRole: 'AI 是一个「工具箱」：学生决定什么时候用、用来做什么',
            units: [
                {
                    num: 11,
                    title: '我的问题，我的方案',
                    goal: '从「真实问题」出发做项目选题',
                    project: '观察校园/家庭中的一个真实问题，提出 ESP32 解决方案',
                    aiUsage: '用 AI 做头脑风暴（可行性分析），但选题由学生决定',
                    keySkill: '把「生活问题」翻译成「技术需求」',
                    homework: '写项目提案：问题描述 + 方案思路 + 需要的传感器'
                },
                {
                    num: 12,
                    title: '系统设计',
                    goal: '学习把大项目拆成小模块',
                    project: '为自己的项目画模块图（输入 → 处理 → 输出）',
                    aiUsage: '让 AI 帮忙分析方案的可行性和可能的坑',
                    keySkill: '模块化思维：每个模块独立测试再整合',
                    homework: '列出每个模块需要问 AI 的问题清单'
                },
                {
                    num: 13,
                    title: '搭积木 ①',
                    goal: '逐个实现各模块',
                    project: '先让每个传感器/执行器独立工作',
                    aiUsage: '按照问题清单逐个问 AI，记录哪些能用、哪些要改',
                    keySkill: '独立调试单个模块的能力',
                    homework: '整理已完成模块的代码和测试结果'
                },
                {
                    num: 14,
                    title: '搭积木 ②',
                    goal: '模块整合和冲突处理',
                    project: '把各模块代码合并成一个完整程序',
                    aiUsage: '把多段代码粘贴给 AI，让 AI 帮合并（学习 prompt 技巧）',
                    keySkill: '理解「合并代码时为什么会冲突」',
                    homework: '确保整合后的代码能完整运行'
                },
                {
                    num: 15,
                    title: '讲好你的故事',
                    goal: '学习技术项目的表达和展示',
                    project: '制作项目展板/PPT + 准备 3 分钟演讲',
                    aiUsage: '用 AI 帮忙整理演讲稿、生成项目说明文字',
                    keySkill: '把技术语言翻译成观众能听懂的话',
                    homework: '练习演讲，找家人当观众'
                },
                {
                    num: 16,
                    title: '科创发布会',
                    goal: '展示 + 互评 + 反思',
                    project: '全班项目展示，互相体验、投票、点评',
                    aiUsage: '无（这节课的主角是学生自己）',
                    keySkill: '接受反馈、反思改进',
                    homework: '写项目复盘：最大的收获 + 如果重来会怎么改'
                }
            ]
        }
    ],
    designPrinciples: [
        {
            icon: BrainCircuit,
            title: '先读后写',
            desc: '每节课至少 50% 时间花在「读懂代码」上，而不是「写出代码」。'
        },
        {
            icon: ClipboardCheck,
            title: '需求先行',
            desc: '任何项目先写清楚「要实现什么」，再动手，或再动用 AI。'
        },
        {
            icon: Bug,
            title: '拥抱出错',
            desc: 'AI 出错不是意外，是教学资源。每个阶段都有设计好的出错时刻。'
        },
        {
            icon: Bot,
            title: 'AI 角色递进',
            desc: '从代码打印机到实习程序员再到工具箱，学生主导权逐步递增。'
        }
    ]
};

const phaseStyles = {
    emerald: {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        solid: 'bg-emerald-600',
        ring: 'ring-emerald-100'
    },
    indigo: {
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        solid: 'bg-indigo-600',
        ring: 'ring-indigo-100'
    },
    orange: {
        text: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        solid: 'bg-orange-600',
        ring: 'ring-orange-100'
    }
};

const detailItems = [
    { label: '项目', key: 'project', icon: Wrench },
    { label: 'AI 用法', key: 'aiUsage', icon: Bot },
    { label: '核心技能', key: 'keySkill', icon: Target },
    { label: '课后任务', key: 'homework', icon: Home }
];

function PrincipleGrid() {
    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-center gap-3">
                    <ListChecks className="text-slate-900" size={24} />
                    <h2 className="text-2xl font-black text-slate-900">设计原则</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-4">
                    {courseData.designPrinciples.map((principle) => (
                        <div key={principle.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <principle.icon className="mb-4 text-blue-600" size={28} />
                            <h3 className="mb-2 font-bold text-slate-900">{principle.title}</h3>
                            <p className="text-sm leading-6 text-slate-600">{principle.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PhaseOverview() {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-center gap-3">
                    <Route className="text-slate-900" size={24} />
                    <h2 className="text-2xl font-black text-slate-900">三阶段路线</h2>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {courseData.phases.map((phase) => {
                        const style = phaseStyles[phase.color];
                        return (
                            <div key={phase.id} className={`rounded-2xl border bg-white p-6 shadow-sm ${style.border}`}>
                                <div className="mb-5 flex items-start gap-4">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white ${style.solid}`}>
                                        {phase.id}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{phase.lessons}</div>
                                        <h3 className="text-xl font-black text-slate-900">{phase.title}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{phase.subtitle}</p>
                                    </div>
                                </div>
                                <div className={`mb-5 rounded-xl p-4 text-sm leading-6 ${style.bg}`}>
                                    <p className="mb-2 text-slate-700"><span className="font-bold">能力目标：</span>{phase.coreAbility}</p>
                                    <p className="text-slate-700"><span className="font-bold">AI 角色：</span>{phase.aiRole}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {phase.units.map((unit) => (
                                        <span key={unit.num} className={`rounded-full border px-3 py-1 text-xs font-bold ${style.border} ${style.text} ${style.bg}`}>
                                            {unit.num}. {unit.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function LessonDetails() {
    const [activePhase, setActivePhase] = useState(0);
    const [expandedUnit, setExpandedUnit] = useState(1);
    const phase = courseData.phases[activePhase];
    const style = phaseStyles[phase.color];

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-center gap-3">
                    <FileText className="text-slate-900" size={24} />
                    <h2 className="text-2xl font-black text-slate-900">详细教案</h2>
                </div>

                <div className="mb-8 grid gap-3 md:grid-cols-3">
                    {courseData.phases.map((item, index) => {
                        const itemStyle = phaseStyles[item.color];
                        const isActive = activePhase === index;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setActivePhase(index);
                                    setExpandedUnit(item.units[0].num);
                                }}
                                className={`rounded-2xl border p-4 text-left transition-all ${isActive ? `${itemStyle.border} ${itemStyle.bg} ring-4 ${itemStyle.ring}` : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                            >
                                <div className={`mb-1 text-sm font-black ${isActive ? itemStyle.text : 'text-slate-600'}`}>
                                    阶段 {item.id} · {item.title}
                                </div>
                                <div className="text-xs text-slate-500">{item.lessons}</div>
                            </button>
                        );
                    })}
                </div>

                <div className={`mb-6 rounded-2xl border p-6 ${style.border} ${style.bg}`}>
                    <h3 className={`mb-2 text-xl font-black ${style.text}`}>
                        阶段 {phase.id}：{phase.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-700">{phase.aiRole}</p>
                </div>

                <div className="space-y-4">
                    {phase.units.map((unit) => {
                        const isExpanded = expandedUnit === unit.num;
                        return (
                            <div key={unit.num} className={`overflow-hidden rounded-2xl border bg-white ${isExpanded ? style.border : 'border-slate-200'}`}>
                                <button
                                    type="button"
                                    onClick={() => setExpandedUnit(isExpanded ? null : unit.num)}
                                    className="flex w-full items-center gap-4 p-5 text-left"
                                >
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black ${isExpanded ? `${style.solid} text-white` : 'bg-slate-100 text-slate-500'}`}>
                                        {unit.num}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-black text-slate-900">{unit.title}</h4>
                                        <p className="truncate text-sm text-slate-500">{unit.goal}</p>
                                    </div>
                                    {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                </button>

                                {isExpanded && (
                                    <div className="border-t border-slate-100 px-5 pb-5">
                                        <div className="grid gap-4 pt-5 md:grid-cols-2">
                                            {detailItems.map((item) => (
                                                <div key={item.key} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                                                    <item.icon className={`mt-0.5 shrink-0 ${style.text}`} size={18} />
                                                    <div>
                                                        <div className="mb-1 text-xs font-black uppercase tracking-wider text-slate-400">{item.label}</div>
                                                        <div className="text-sm leading-6 text-slate-700">{unit[item.key]}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default function Esp32AiCourseSystem() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <section className="bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-6xl">
                    <button
                        type="button"
                        onClick={() => navigate('/hardware')}
                        className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <ChevronLeft size={16} />
                        返回硬件课程
                    </button>

                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-200 ring-1 ring-blue-400/20">
                                <Sparkles size={14} />
                                ESP32 AI Workshop
                            </div>
                            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                                {courseData.overview.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-300">
                                {courseData.overview.subtitle}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
                                    <GraduationCap size={16} />
                                    {courseData.overview.audience}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200">
                                    <Cpu size={16} />
                                    {courseData.overview.totalLessons}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-950/30">
                            <Lightbulb className="mb-5 text-yellow-300" size={34} />
                            <h2 className="mb-3 text-xl font-black">贯穿始终的核心理念</h2>
                            <p className="leading-8 text-slate-300">{courseData.overview.philosophy}</p>
                        </div>
                    </div>
                </div>
            </section>

            <PrincipleGrid />
            <PhaseOverview />
            <LessonDetails />
        </div>
    );
}
