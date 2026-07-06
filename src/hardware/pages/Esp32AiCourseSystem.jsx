import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Bot,
    BrainCircuit,
    CheckCircle2,
    ClipboardCheck,
    ClipboardList,
    Code2,
    Cpu,
    FileText,
    GraduationCap,
    Home,
    LayoutList,
    Lightbulb,
    Lock,
    MessageSquareText,
    PackageCheck,
    Printer,
    ShieldCheck,
    Sparkles,
    Target
} from 'lucide-react';
import {
    courseData,
    phaseStyles,
    allLessons,
    handoutUsage,
    aiAgreements,
    aiSafetyRedLine,
    pblCycle,
    finalProject,
    rubric,
    makeStudentTasks,
    makeAiDialogue,
    makeVerificationSteps,
    NAV_ITEMS
} from '../data/esp32AiCourse';

const PROGRESS_KEY = 'esp32ai_progress';

function scrollToId(id) {
    if (typeof document !== 'undefined') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function loadProgress() {
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        const data = raw ? JSON.parse(raw) : null;
        const nums = allLessons.map((l) => l.num);
        return {
            activeNum: nums.includes(data?.activeNum) ? data.activeNum : 1,
            viewed: Array.isArray(data?.viewed) ? data.viewed.filter((n) => nums.includes(n)) : []
        };
    } catch {
        return { activeNum: 1, viewed: [] };
    }
}

function SectionHeader({ eyebrow, title, desc }) {
    return (
        <div className="mb-10 max-w-3xl">
            {eyebrow && (
                <div className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600">{eyebrow}</div>
            )}
            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">{title}</h2>
            {desc && <p className="mt-4 text-base leading-7 text-slate-600">{desc}</p>}
        </div>
    );
}

function StickyNav() {
    return (
        <nav aria-label="课程页面导航" className="sticky top-16 z-40 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="回到页面顶部"
                    className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-sm font-black text-slate-900"
                >
                    <Cpu size={18} className="text-blue-600" />
                    <span className="hidden sm:inline">ESP32 × AI 课程</span>
                </button>
                <div className="relative min-w-0 flex-1">
                    <div className="flex items-center gap-1 overflow-x-auto">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToId(item.id)}
                                className="min-h-11 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => window.print()}
                            aria-label="打印讲义"
                            className="ml-1 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-slate-900 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-700"
                        >
                            <Printer size={15} />
                            <span className="hidden sm:inline">打印</span>
                        </button>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent sm:hidden" />
                </div>
            </div>
        </nav>
    );
}

function BackToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 600);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    if (!show) return null;
    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="回到顶部"
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-colors hover:bg-slate-700 print:hidden"
        >
            <ArrowUp size={20} />
        </button>
    );
}

function ConceptSection() {
    return (
        <section id="concept" className="scroll-mt-32 bg-white py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeader
                    eyebrow="Why · 课程理念"
                    title="不教语法，教 AI 时代的工程思维"
                    desc="四条设计原则 + 一条 PBL 学习路径 + 三条 AI 使用公约，构成这门课的底层逻辑。"
                />

                <div className="grid gap-5 md:grid-cols-4">
                    {courseData.designPrinciples.map((principle) => (
                        <div key={principle.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <principle.icon className="mb-4 text-blue-600" size={28} />
                            <h3 className="mb-2 font-black text-slate-900">{principle.title}</h3>
                            <p className="text-sm leading-6 text-slate-600">{principle.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14">
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900">
                        <Sparkles size={20} className="text-blue-600" />
                        PBL 学习路径（每个项目都走这 5 步）
                    </h3>
                    <div className="grid gap-3 md:grid-cols-5">
                        {pblCycle.map((step, index) => (
                            <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white">
                                    {index + 1}
                                </div>
                                <h4 className="mb-1 font-black text-slate-900">{step.title}</h4>
                                <p className="text-sm leading-6 text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-black text-slate-900">
                        <ShieldCheck size={20} className="text-blue-600" />
                        AI 使用公约
                    </h3>
                    <p className="mb-6 max-w-3xl text-sm leading-7 text-slate-600">
                        主导权越大，责任越大——三条公约对应后面的三个阶段。
                    </p>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {aiAgreements.map((item) => {
                            const style = phaseStyles[item.color];
                            return (
                                <div key={item.phase} className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${style.border}`}>
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white ${style.solid}`}>
                                            <item.icon size={22} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">阶段 {item.phase} 公约</div>
                                            <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                                        </div>
                                    </div>
                                    <p className={`mb-4 rounded-xl p-4 text-sm leading-7 text-slate-700 ${style.bg}`}>{item.rule}</p>
                                    <ul className="mt-auto space-y-2">
                                        {item.examples.map((ex) => (
                                            <li key={ex} className="text-sm leading-6 text-slate-600">{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-red-700">
                            <Lock size={18} />
                            {aiSafetyRedLine.title}
                        </div>
                        <ul className="grid gap-2 md:grid-cols-3">
                            {aiSafetyRedLine.items.map((item) => (
                                <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                    <span className="mt-1 shrink-0 text-red-500">●</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function RoadmapSection() {
    return (
        <section id="roadmap" className="scroll-mt-32 bg-slate-50 py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeader
                    eyebrow="Roadmap · 学习路线"
                    title="三阶段，AI 的角色逐步交还给学生"
                    desc="读懂 AI → 指挥 AI → 超越 AI。每个阶段 AI 的角色都在变，学生的主导权一路变大。"
                />
                <div className="grid gap-6 lg:grid-cols-3">
                    {courseData.phases.map((phase) => {
                        const style = phaseStyles[phase.color];
                        return (
                            <div key={phase.id} className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${style.border}`}>
                                <div className="mb-5 flex items-start gap-4">
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white ${style.solid}`}>
                                        {phase.id}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{phase.lessons}</div>
                                        <h3 className="text-xl font-black text-slate-900">{phase.title}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{phase.subtitle}</p>
                                    </div>
                                </div>
                                <div className={`mb-5 space-y-2 rounded-xl p-4 text-sm leading-6 ${style.bg}`}>
                                    <p className="text-slate-700"><span className="font-bold">驱动问题：</span>{phase.drivingQuestion}</p>
                                    <p className="text-slate-700"><span className="font-bold">能力目标：</span>{phase.coreAbility}</p>
                                    <p className="text-slate-700"><span className="font-bold">AI 角色：</span>{phase.aiRole}</p>
                                </div>
                                <div className="mt-auto flex flex-wrap gap-2">
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
                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => scrollToId('handbook')}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-black text-white transition-colors hover:bg-slate-700"
                    >
                        进入课堂讲义
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function InfoBlock({ icon: Icon, title, children, className = '' }) {
    return (
        <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 ${className}`}>
            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                <Icon size={18} className="text-blue-600" />
                {title}
            </div>
            {children}
        </div>
    );
}

function LessonHandout({ lesson }) {
    const style = phaseStyles[lesson.phaseColor];
    const handout = lesson.handout;
    const studentTasks = makeStudentTasks(lesson);
    const aiDialogue = makeAiDialogue(lesson);
    const verificationSteps = makeVerificationSteps(lesson);

    return (
        <article className="break-inside-avoid rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${style.border} ${style.bg} ${style.text}`}>
                        阶段 {lesson.phaseId} · {lesson.phaseTitle}
                    </div>
                    <h3 className="text-2xl font-black text-slate-950">
                        第 {lesson.num} 课：{lesson.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-slate-600">{lesson.goal}</p>
                </div>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white ${style.solid}`}>
                    {lesson.num}
                </div>
            </div>

            <div className={`mb-6 rounded-2xl border p-5 ${style.border} ${style.bg}`}>
                <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-900">
                    <Lightbulb size={18} className={style.text} />
                    本课核心问题
                </div>
                <p className="text-lg font-bold leading-8 text-slate-900">{handout.question}</p>
            </div>

            <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                    <GraduationCap size={18} className="text-blue-600" />
                    学生任务卡
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                    {studentTasks.map((task) => (
                        <div key={task} className="flex gap-2 rounded-xl bg-white p-3 text-sm leading-6 text-slate-700 ring-1 ring-blue-100">
                            <CheckCircle2 size={16} className="mt-1 shrink-0 text-blue-600" />
                            <span>{task}</span>
                        </div>
                    ))}
                </div>
            </div>

            {handout.concepts && (
                <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                        <BrainCircuit size={18} className="text-emerald-600" />
                        今天的三组新概念
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                        {handout.concepts.map((concept) => (
                            <div key={concept.term} className="rounded-xl bg-white p-4 ring-1 ring-emerald-100">
                                <h4 className="mb-2 text-base font-black text-slate-900">{concept.term}</h4>
                                <p className="text-sm leading-6 text-slate-700">{concept.meaning}</p>
                                <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold leading-5 text-emerald-800">
                                    {concept.studentPrompt}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(handout.coreCode || handout.operationSteps) && (
                <div className="mb-6 grid gap-5 lg:grid-cols-2">
                    {handout.coreCode && (
                        <InfoBlock icon={Code2} title="AI 写的 3 行核心代码">
                            <div className="space-y-3">
                                {handout.coreCode.map((line) => (
                                    <div key={line.code} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                                        <code className="block font-mono text-sm font-bold text-slate-900">{line.code}</code>
                                        <p className="mt-2 text-xs leading-5 text-slate-500">{line.hint}</p>
                                    </div>
                                ))}
                            </div>
                        </InfoBlock>
                    )}

                    {handout.operationSteps && (
                        <InfoBlock icon={ShieldCheck} title="PyCharm 三步走">
                            <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-800 ring-1 ring-amber-100">
                                今天的规矩「三不碰」：只碰 main.py、连接按钮、上传按钮，其他一律不碰。
                            </div>
                            <ol className="space-y-3">
                                {handout.operationSteps.map((step, index) => (
                                    <li key={step.title} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${style.solid}`}>
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h4 className="mb-1 text-sm font-black text-slate-900">{step.title}</h4>
                                            <p className="text-xs leading-6 text-slate-600">{step.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </InfoBlock>
                    )}
                </div>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
                <InfoBlock icon={PackageCheck} title="准备器材">
                    <div className="flex flex-wrap gap-2">
                        {handout.materials.map((item) => (
                            <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                                {item}
                            </span>
                        ))}
                    </div>
                </InfoBlock>

                <InfoBlock icon={Target} title="课堂项目">
                    <p className="text-sm leading-6 text-slate-700">{lesson.project}</p>
                </InfoBlock>

                <InfoBlock icon={MessageSquareText} title="AI 提问模板" className="lg:col-span-2">
                    <p className="rounded-xl bg-white p-4 font-mono text-sm leading-7 text-slate-700 ring-1 ring-slate-200">
                        {handout.prompt}
                    </p>
                </InfoBlock>

                <InfoBlock icon={Bot} title="三轮 AI 对话流程" className="lg:col-span-2">
                    <ol className="grid gap-3 md:grid-cols-3">
                        {aiDialogue.map((item, index) => (
                            <li key={item.title} className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
                                <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white ${style.solid}`}>
                                    {index + 1}
                                </div>
                                <h4 className="mb-2 text-sm font-black text-slate-900">{item.title}</h4>
                                <p className="text-xs leading-6 text-slate-600">{item.text}</p>
                            </li>
                        ))}
                    </ol>
                </InfoBlock>

                <InfoBlock icon={Code2} title="代码阅读点">
                    <ul className="space-y-2">
                        {handout.codeReading.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                <CheckCircle2 size={16} className={`mt-1 shrink-0 ${style.text}`} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </InfoBlock>

                <InfoBlock icon={ClipboardList} title="课堂流程">
                    <ol className="space-y-2">
                        {handout.flow.map((item, index) => (
                            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${style.solid}`}>
                                    {index + 1}
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ol>
                </InfoBlock>

                <InfoBlock icon={ClipboardCheck} title="验证 AI 是否正确" className="lg:col-span-2">
                    <div className="grid gap-3 md:grid-cols-2">
                        {verificationSteps.map((item) => (
                            <div key={item} className="flex gap-2 rounded-xl bg-white p-3 text-sm leading-6 text-slate-700 ring-1 ring-slate-200">
                                <CheckCircle2 size={16} className={`mt-1 shrink-0 ${style.text}`} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </InfoBlock>

                <InfoBlock icon={FileText} title="学生提交成果">
                    <p className="text-sm leading-6 text-slate-700">{handout.output}</p>
                </InfoBlock>

                <InfoBlock icon={ClipboardCheck} title="达成检查">
                    <p className="text-sm leading-6 text-slate-700">{handout.check}</p>
                </InfoBlock>
            </div>

            {(handout.discoveries || handout.afterClass) && (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {handout.discoveries && (
                        <InfoBlock icon={Sparkles} title="今日三大发现">
                            <ol className="space-y-3">
                                {handout.discoveries.map((item, index) => (
                                    <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-800 ring-1 ring-slate-200">
                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${style.solid}`}>
                                            {index + 1}
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </InfoBlock>
                    )}

                    {handout.afterClass && (
                        <InfoBlock icon={Home} title="课后任务">
                            <ul className="space-y-3">
                                {handout.afterClass.map((item) => (
                                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                        <CheckCircle2 size={16} className={`mt-1 shrink-0 ${style.text}`} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </InfoBlock>
                    )}
                </div>
            )}
        </article>
    );
}

function LessonStudio() {
    const [progress] = useState(loadProgress);
    const [activeNum, setActiveNum] = useState(progress.activeNum);
    const [viewed, setViewed] = useState(() =>
        progress.viewed.includes(progress.activeNum) ? progress.viewed : [...progress.viewed, progress.activeNum]
    );
    const [showAll, setShowAll] = useState(false);
    const activeIndex = allLessons.findIndex((l) => l.num === activeNum);
    const activeLesson = allLessons[activeIndex] || allLessons[0];
    // 选课时同步标记“已学”，避免在 effect 里调用 setState（cascading renders）
    const selectLesson = (num) => {
        setActiveNum(num);
        setViewed((prev) => (prev.includes(num) ? prev : [...prev, num]));
    };
    const goPrev = () => selectLesson(allLessons[Math.max(0, activeIndex - 1)].num);
    const goNext = () => selectLesson(allLessons[Math.min(allLessons.length - 1, activeIndex + 1)].num);

    useEffect(() => {
        try {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify({ activeNum, viewed }));
        } catch {
            /* localStorage 不可用时静默忽略 */
        }
    }, [activeNum, viewed]);

    return (
        <section id="handbook" className="scroll-mt-32 bg-white py-20 md:py-24">
            <div className="mx-auto max-w-6xl px-6">
                <SectionHeader
                    eyebrow="Handbook · 课堂讲义"
                    title="16 课，一课一张学习单"
                    desc="点下面的课程编号，选一课开始自学；每张讲义都含核心问题、提问模板、操作步骤和达成检查。"
                />

                <div className="mb-8 grid gap-3 sm:grid-cols-3">
                    {handoutUsage.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <h3 className="mb-1 text-sm font-black text-slate-900">{item.title}</h3>
                            <p className="text-xs leading-6 text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="flex items-center gap-2 text-sm font-black text-slate-900">
                                <LayoutList size={18} className="text-blue-600" />
                                课程导航
                            </h3>
                            <span className="text-xs font-bold text-slate-500">已学 {viewed.length} / {allLessons.length} 课</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowAll((v) => !v)}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            {showAll ? '单课查看' : '展开全部（便于通读 / 打印）'}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {courseData.phases.map((phase) => {
                            const style = phaseStyles[phase.color];
                            return (
                                <div key={phase.id}>
                                    <div className={`mb-2 text-xs font-black ${style.text}`}>
                                        阶段 {phase.id} · {phase.title}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {phase.units.map((unit) => {
                                            const isActive = !showAll && unit.num === activeNum;
                                            const isViewed = viewed.includes(unit.num);
                                            return (
                                                <button
                                                    key={unit.num}
                                                    type="button"
                                                    aria-pressed={isActive}
                                                    onClick={() => { setShowAll(false); selectLesson(unit.num); }}
                                                    className={`inline-flex min-h-11 items-center gap-1 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isActive ? `${style.solid} border-transparent text-white shadow` : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}
                                                >
                                                    {isViewed && !isActive && <CheckCircle2 size={12} className={`shrink-0 ${style.text}`} />}
                                                    <span><span className="mr-1 opacity-60">{unit.num}.</span>{unit.title}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {showAll ? (
                    <div className="space-y-8">
                        {allLessons.map((lesson) => (
                            <LessonHandout key={lesson.num} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div>
                        <LessonHandout lesson={activeLesson} />
                        <div className="mt-6 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={goPrev}
                                disabled={activeIndex <= 0}
                                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeft size={16} />
                                上一课
                            </button>
                            <span className="text-sm font-bold text-slate-500">{activeIndex + 1} / {allLessons.length}</span>
                            <button
                                type="button"
                                onClick={goNext}
                                disabled={activeIndex >= allLessons.length - 1}
                                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                下一课
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function FinalProjectRubric() {
    return (
        <section id="assess" className="scroll-mt-32 bg-slate-50 px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-orange-700">
                        Final PBL Challenge
                    </div>
                    <h2 className="text-3xl font-black text-slate-950 md:text-4xl">{finalProject.title}</h2>
                    <p className="mt-3 max-w-3xl text-lg font-bold leading-8 text-slate-700">{finalProject.drivingQuestion}</p>
                </div>

                <div className="mb-8 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-3xl border border-orange-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center gap-2 font-black text-slate-900">
                            <Target size={20} className="text-orange-600" />
                            项目要求
                        </h3>
                        <ul className="space-y-3">
                            {finalProject.requirements.map((item) => (
                                <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-orange-600" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-blue-200 bg-white p-6">
                        <h3 className="mb-4 flex items-center gap-2 font-black text-slate-900">
                            <PackageCheck size={20} className="text-blue-600" />
                            作品包提交物
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {finalProject.deliverables.map((item) => (
                                <span key={item} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-5 flex items-center gap-2 text-xl font-black text-slate-950">
                        <ClipboardCheck size={22} className="text-slate-900" />
                        PBL 评价量规
                    </h3>
                    <p className="mb-3 text-xs font-bold text-slate-500 md:hidden">← 左右滑动查看完整量规</p>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="w-32 px-3 py-3 font-black">维度</th>
                                    <th className="px-3 py-3 font-black">1 级</th>
                                    <th className="px-3 py-3 font-black">2 级</th>
                                    <th className="px-3 py-3 font-black">3 级</th>
                                    <th className="px-3 py-3 font-black">4 级</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rubric.map((row) => (
                                    <tr key={row.criterion} className="border-b border-slate-100 align-top last:border-b-0">
                                        <td className="px-3 py-4 font-black text-slate-900">{row.criterion}</td>
                                        {row.levels.map((level, index) => (
                                            <td key={level} className="px-3 py-4 leading-6 text-slate-600">
                                                <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">
                                                    {index + 1}
                                                </span>
                                                <div>{level}</div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Esp32AiCourseSystem() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <section id="top" className="bg-slate-950 px-6 py-20 text-white">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-200 ring-1 ring-blue-400/20">
                                <Sparkles size={14} />
                                ESP32 AI Workshop
                            </div>
                            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                                {courseData.overview.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
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
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center gap-2 rounded-full bg-blue-400 px-4 py-2 text-sm font-black text-slate-950 transition-colors hover:bg-blue-300"
                                >
                                    <Printer size={16} />
                                    打印讲义
                                </button>
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

            <StickyNav />
            <ConceptSection />
            <RoadmapSection />
            <LessonStudio />
            <FinalProjectRubric />
            <BackToTop />
        </div>
    );
}
