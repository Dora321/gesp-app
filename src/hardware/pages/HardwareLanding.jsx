import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, ChevronRight, Download, Box,
    BookOpen, FlaskConical, Hammer,
    Star, CheckCircle2,
    Code, Cpu, Settings, ArrowRight, ExternalLink
} from 'lucide-react';
import { esp32Lessons, esp32LessonsByStage, esp32Stages } from '../data/esp32Curriculum';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const PYCHARM_DOWNLOAD_URL = 'https://www.jetbrains.com/pycharm/download/';
const CH340_DRIVER_URL = 'https://www.wch.cn/downloads/category/67.html?feature=USB%E8%BD%AC%E4%B8%B2%E5%8F%A3&product_name=CH340';
// ESP32 课程的器材按阶段递增，清单跟着课程走。
const hardwareKitItems = [
    'ESP32 开发板（每组 1 块）', 'USB 数据线', '面包板与杜邦线', 'LED 与限流电阻',
    '轻触按钮', 'OLED 屏（SSD1306）', 'DHT11 温湿度传感器', '光敏电阻',
    '有源蜂鸣器', 'WS2812 灯带', '舵机（SG90）', '超声波测距模块',
];

const BackgroundDecorations = () => (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    </div>
);

const Hero = ({ onStart, onPreview }) => (
    <section className="relative border-b border-slate-200 px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:py-16">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">
                    <Cpu size={15} />
                    AI 硬件科创课
                </div>
                <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    ESP32 × AI 科创课程
                </h1>
                <p className="max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                    {esp32Lessons.length} 课时项目制课程。主线不是 MicroPython 语法，而是学生与 AI 关系的演进——
                    从只敢读 AI 写的代码，到把 AI 装进自己的作品里。
                </p>
                <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={onStart}
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                    <Play size={18} className="fill-current" />
                    开始第一课
                </button>
                <button
                    type="button"
                    onClick={onPreview}
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50"
                >
                    <ChevronRight size={18} />
                    查看学习地图
                </button>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-bold text-slate-500">
                    <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-600" /> {esp32Stages.length} 阶段 {esp32Lessons.length} 课</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-600" /> 自学 / 上课双模式</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-600" /> 每课带完成检查单</span>
                </div>
            </div>

            <div className="flex items-center justify-center" aria-label="ESP32-S3 开发板示意">
                <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl sm:max-w-[360px]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute left-[15%] top-1/2 h-0.5 w-[70%] bg-sky-400/60" />
                    <div className="absolute left-1/2 top-[15%] h-[70%] w-0.5 bg-emerald-400/50" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
                        <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-blue-400 bg-blue-600 shadow-lg">
                            <Cpu size={44} className="text-white" />
                        </div>
                        <div className="text-center">
                            <div className="font-mono text-sm font-bold text-sky-300">ESP32-S3</div>
                            <div className="mt-1 font-mono text-xs text-slate-400">Wi-Fi · Bluetooth · GPIO</div>
                        </div>
                    </div>
                    {['left-3 top-3', 'right-3 top-3', 'bottom-3 left-3', 'bottom-3 right-3'].map(position => (
                        <span key={position} className={`absolute h-3 w-3 rounded-full bg-amber-400 ${position}`} />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const ThreeEModel = () => (
    <section id="3e-model" className="relative overflow-hidden bg-white pb-16 pt-8 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-12 text-center sm:mb-16">
                <span className="mb-3 block text-sm font-bold text-blue-700">学习方法</span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">3E 探究模型</h2>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">每个实验都按探索、验证、制作三个步骤推进。</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line */}
                <div className="absolute left-[16%] right-[16%] top-16 -z-10 hidden h-1 bg-gradient-to-r from-blue-100 via-emerald-100 to-orange-100 md:block" />

                {[
                    {
                        icon: BookOpen,
                        title: "Explore 探索",
                        desc: "发现生活中的问题，激发好奇心",
                        color: "text-brand-blue",
                        bg: "bg-blue-50",
                        border: "border-blue-100",
                        step: "01"
                    },
                    {
                        icon: FlaskConical,
                        title: "Experiment 实验",
                        desc: "动手连接电路，验证你的猜想",
                        color: "text-emerald-600",
                        bg: "bg-emerald-50",
                        border: "border-emerald-100",
                        step: "02"
                    },
                    {
                        icon: Hammer,
                        title: "Engineer 工程",
                        desc: "编写程序，创造能够工作的原型",
                        color: "text-brand-orange",
                        bg: "bg-orange-50",
                        border: "border-orange-100",
                        step: "03"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className={`relative overflow-hidden rounded-lg border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg ${item.border}`}
                    >
                        <div className={`relative z-10 mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-lg border border-white shadow-sm ${item.bg}`}>
                            <item.icon size={48} className={item.color} />
                            <div className="absolute -bottom-2 rounded-md border-2 border-white bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                                STEP {item.step}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const Esp32AiSpotlight = ({ navigate }) => (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8 1px, transparent 1px), linear-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-300/20 text-xs font-black uppercase tracking-wider mb-6">
                    <Cpu size={14} />
                    New ESP32 Course
                </div>
                <h2 className="text-3xl lg:text-5xl font-black leading-tight mb-5">
                    AI 角色的五段演进
                </h2>
                <p className="text-slate-300 text-lg leading-8 max-w-2xl">
                    每个阶段重新定义一次「AI 是我的什么」。从代码打印机到协作伙伴，
                    学生的位置从旁观者一路挪到主导者。
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/hardware/esp32-curriculum')}
                        className="px-7 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-base font-black rounded-2xl shadow-xl shadow-cyan-950/40 flex items-center gap-3 transition-all hover:-translate-y-1"
                    >
                        逐课浏览 {esp32Lessons.length} 课
                        <ArrowRight size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/hardware/esp32-map')}
                        className="px-6 py-4 rounded-2xl border border-cyan-400/40 text-cyan-200 text-sm font-bold transition-all hover:bg-cyan-400/10"
                    >
                        打开学习地图
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/hardware/esp32-contest')}
                        className="px-6 py-4 rounded-2xl border border-cyan-400/40 text-cyan-200 text-sm font-bold transition-all hover:bg-cyan-400/10"
                    >
                        竞赛延伸班
                    </button>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {esp32Stages.map((phase) => (
                    <button
                        type="button"
                        key={phase.id}
                        onClick={() => navigate('/hardware/esp32-curriculum')}
                        className="rounded-lg border border-white/10 bg-white/5 p-6 text-left transition-colors hover:bg-white/10"
                    >
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white font-black text-slate-950">
                            {phase.id}
                        </div>
                        <div className="text-xs font-black uppercase tracking-widest text-cyan-200 mb-2">
                            {phase.lessonRange} · {phase.lessonCount} 课
                        </div>
                        <h3 className="text-xl font-black mb-2">{phase.title}</h3>
                        <p className="text-xs font-bold text-cyan-100/80 mb-3">{phase.aiRole}</p>
                        <p className="text-sm leading-6 text-slate-300">{phase.description}</p>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

// 课程路径直接读 esp32Curriculum：以前这里读的是另一套 16 课 Arduino 数据，
// 于是落地页和课程页说的是两门不同的课。现在只有一个数据源。
const MissionMap = ({ navigate }) => {
    const [activeStage, setActiveStage] = useState(esp32Stages[0].id);
    const missions = esp32LessonsByStage(activeStage);
    const stage = esp32Stages.find((item) => item.id === activeStage) || esp32Stages[0];

    return (
        <section id="missions" className="py-24 bg-slate-50 relative">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 rotate-3">
                                <Settings size={28} className="animate-spin-slow" />
                            </span>
                            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Course Map</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
                            课程路径
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
                        {esp32Stages.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-pressed={activeStage === item.id}
                                onClick={() => setActiveStage(item.id)}
                                className={`min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${activeStage === item.id
                                    ? 'bg-orange-700 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {item.id}. {item.title}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="mb-8 max-w-3xl text-sm font-bold leading-6 text-slate-600">
                    {stage.drivingQuestion}
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {missions.map((mission) => (
                            <motion.button
                                type="button"
                                key={mission.num}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/hardware/esp32/${mission.num}`)}
                                className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white p-6 text-left transition hover:border-blue-300 hover:shadow-lg"
                            >
                                <div className="mb-5 flex items-start justify-between gap-2">
                                    <div className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
                                        L{mission.num.toString().padStart(2, '0')}
                                    </div>
                                    {mission.referenceCode?.length > 0 && (
                                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                                            带参考代码
                                        </span>
                                    )}
                                </div>

                                <h3 className="mb-3 text-lg font-black leading-6 text-slate-800 transition-colors group-hover:text-brand-blue">
                                    {mission.title}
                                </h3>

                                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-500">
                                    {mission.hook || mission.goal}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                                        {mission.lessonType}
                                    </span>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-300 transition-all group-hover:translate-x-1 group-hover:bg-brand-blue group-hover:text-white">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const Resources = () => (
    <section id="resources" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="mb-4 text-3xl font-black text-slate-900">课程准备</h2>
                <p className="text-slate-500">安装软件并核对硬件后开始实验</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Software Card */}
                <div className="flex flex-col items-center rounded-lg border border-blue-100 bg-blue-50 p-8 text-center shadow-sm">
                    <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Code size={48} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">软件中心</h3>
                    <p className="mb-10 px-8 text-sm leading-relaxed text-slate-600">PyCharm Community + MicroPython Tools 插件，配 CH340 串口驱动，Windows / Mac 通用。</p>

                    <div className="space-y-4 w-full max-w-sm">
                        <a
                            href={PYCHARM_DOWNLOAD_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn flex w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-8 py-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        >
                            <span className="font-bold text-slate-700">PyCharm Community 下载</span>
                            <ExternalLink size={22} className="text-slate-300 group-hover/btn:text-blue-600 transition-colors" />
                        </a>
                        <a
                            href={CH340_DRIVER_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn flex w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-8 py-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        >
                            <span className="font-bold text-slate-700">CH340 官方驱动</span>
                            <Download size={22} className="text-slate-300 group-hover/btn:text-blue-600 transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Hardware Card */}
                <div className="flex flex-col items-center rounded-lg border border-orange-100 bg-orange-50 p-8 text-center shadow-sm">
                    <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Box size={48} className="text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">硬件清单</h3>
                    <p className="mb-8 px-4 text-sm leading-relaxed text-slate-600">每组一块 ESP32 开发板，传感器与模块按课程阶段逐步加入。</p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-left">
                        {hardwareKitItems.slice(0, 6).map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-lg border border-orange-100 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> {item}
                            </div>
                        ))}
                    </div>
                    <details className="mt-8 w-full max-w-sm rounded-lg border border-orange-100 bg-white text-left">
                        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-5 text-sm font-bold text-orange-700 marker:hidden">
                            查看完整清单（{hardwareKitItems.length} 类）
                            <ChevronRight size={16} />
                        </summary>
                        <ul className="grid gap-2 border-t border-orange-100 px-5 py-4 text-sm font-semibold text-slate-600">
                            {hardwareKitItems.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    </section>
);

export default function HardwareLanding() {
    const navigate = useNavigate();
    const scrollToLearningFlow = () => {
        document.getElementById('3e-model')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-brand-orange selection:text-white overflow-hidden">
            <Navigation
                darkMode={false}
                className="bg-white/70 backdrop-blur-md border-b border-slate-200/50"
                afterLogo={
                    <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                        <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Cpu size={18} />
                        </div>
                        <span className="hidden text-lg font-bold text-slate-800 sm:inline">
                            硬件实验课
                        </span>
                    </div>
                }
            />
            <BackgroundDecorations />

            <main>
                <Hero onStart={() => navigate('/hardware/esp32/1')} onPreview={scrollToLearningFlow} />
                <ThreeEModel />
                <Esp32AiSpotlight navigate={navigate} />
                <MissionMap navigate={navigate} />
                <Resources />
            </main>

            <Footer />
        </div>
    );
}
