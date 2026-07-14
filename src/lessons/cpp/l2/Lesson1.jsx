import React, { useState, useEffect } from 'react';
import {
    Cpu,
    Save,
    Zap,
    Globe,
    Home,
    MapPin,
    HelpCircle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Menu,
    X,
    BookOpen,
    HardDrive,
    Trash2,
    Server,
    Wifi,
    Monitor,
    Lightbulb,
    FastForward,
    TrainFront,
    Timer,
    FileText,
    Library,
    Building2,
    Layers
} from 'lucide-react';
import CppL2LessonSupport from '../../../components/CppL2LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck } from '../CppLessonShell';

import { Icon, DataScaleVisualizer, PowerOutageSim, MemorySpeedRace, StorageTriad, NetworkVisual, DNSVisual, IPDeliverySim, Quiz } from './Lesson1Activities';

// --- 章节配置 ---
const sections = [
    { id: 1, title: "封面：健忘的电脑与快递员", icon: "cpu", category: "导语" },
    { id: 2, title: "情景导入：只有七秒记忆的鱼？", icon: "zap", category: "存储原理" },
    { id: 3, title: "知识讲解：存储器三兄弟", icon: "save", category: "存储原理" },
    { id: 4, title: "知识讲解：计算机的社交网络", icon: "globe", category: "网络基础" },
    { id: 5, title: "知识讲解：域名系统 DNS", icon: "server", category: "网络基础" },
    { id: 6, title: "知识讲解：门牌号 IP", icon: "map", category: "网络基础" },
    { id: 7, title: "真题挑战 1：内存扩容", icon: "help", category: "实战演练" },
    { id: 8, title: "真题挑战 2：磁心存储", icon: "help", category: "实战演练" },
    { id: 9, title: "真题挑战 3：易错判断", icon: "help", category: "实战演练" },
    { id: 10, title: "总结回顾：口诀记忆", icon: "book", category: "总结" },
    { id: 11, title: "课后作业：小小观察员", icon: "disk", category: "总结" },
];

const masteryItems = [
    {
        label: '能说出存储器三兄弟的分工。',
        evidence: '高速缓存最快最小，内存 RAM 负责临时中转，硬盘外存负责长期保存。',
        retryHint: '回到「存储器三兄弟」。',
    },
    {
        label: '能解释断电后哪些数据会丢。',
        evidence: 'RAM 断电即忘，没保存的内容会消失；存进硬盘的数据还在。',
        retryHint: '回到断电模拟器再试一次。',
    },
    {
        label: '能区分 LAN 和 WAN。',
        evidence: '局域网覆盖家和教室，广域网连接城市和国家，互联网是最大的广域网。',
        retryHint: '回到「计算机的社交网络」。',
    },
    {
        label: '能说出 IP 和 DNS 各管什么。',
        evidence: 'IP 是设备的门牌号，DNS 把好记的域名翻译成 IP 地址。',
        retryHint: '回到「域名系统 DNS」和「门牌号 IP」。',
    },
];

// --- 主应用 ---
export default function AdvLesson1() {
    const [activeSection, setActiveSection] = useState(1);

    // 键盘导航
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') setActiveSection((s) => (s < sections.length ? s + 1 : s));
            if (e.key === 'ArrowLeft') setActiveSection((s) => (s > 1 ? s - 1 : s));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 rounded-3xl shadow-2xl text-center mb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 p-24 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-4 border border-white/20">
                                GESP C++ 二级 | 第 1 课
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                                计算机的记忆与网络
                            </h1>
                            <h2 className="text-xl md:text-2xl text-indigo-100 font-medium mb-8">
                                —— 健忘的电脑与快递员 🚚
                            </h2>

                            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex-1">
                                    <div className="bg-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Save size={24} />
                                    </div>
                                    <h3 className="font-bold">存储器</h3>
                                    <p className="text-xs text-indigo-200 mt-1">RAM vs ROM vs Cache</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex-1">
                                    <div className="bg-purple-500 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <Globe size={24} />
                                    </div>
                                    <h3 className="font-bold">网络</h3>
                                    <p className="text-xs text-indigo-200 mt-1">LAN vs WAN & IP</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">🎯 本课目标</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    理解 RAM、ROM 和 Cache 的区别（谁是健忘鬼？）
                                </li>
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    区分局域网 (LAN) 和广域网 (WAN)。
                                </li>
                                <li className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    认识 IP 地址的作用（网络世界的门牌号）。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-yellow-400 p-2 rounded-lg text-white"><Zap size={28} /></span>
                            情景导入：只有七秒记忆的鱼？
                        </h2>
                        <div className="prose max-w-none text-gray-600 mb-6">
                            <p>
                                如果把电脑比作一个学生，它其实有两个大脑：
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                                <li className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <strong className="text-green-700 block mb-1">黑板 (RAM)</strong>
                                    写得快，擦得也快。一旦下课（断电），老师就会把黑板擦干净。
                                </li>
                                <li className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <strong className="text-blue-700 block mb-1">课本 (ROM)</strong>
                                    印刷好的，无论你怎么折腾，甚至把书合上（断电），里面的字都不会跑。
                                </li>
                            </ul>
                        </div>

                        <PowerOutageSim />

                        <p className="text-center text-gray-500 italic mt-4">
                            👇 点击上方红色/绿色按钮，看看会发生什么？
                        </p>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-blue-500 p-2 rounded-lg text-white"><Save size={28} /></span>
                            知识讲解 1：存储器三兄弟
                        </h2>
                        <p className="text-gray-600 mb-4">
                            计算机里有三个性格迥异的兄弟，它们负责帮 CPU（大脑）存东西。点击下方的卡片认识它们：
                        </p>

                        <StorageTriad />

                        <MemorySpeedRace />

                        <DataScaleVisualizer />
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-indigo-500 p-2 rounded-lg text-white"><Globe size={28} /></span>
                            知识讲解 2：计算机的社交网络
                        </h2>

                        <NetworkVisual />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-indigo-700 text-lg mb-2">局域网 (LAN)</h3>
                                <p className="text-sm text-gray-600">Local Area Network</p>
                                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                    <li>范围小：家里、学校机房、公司办公区。</li>
                                    <li>速度快：通常比宽带还快。</li>
                                    <li>自己管理：不用给电信局交钱（除了买路由器）。</li>
                                </ul>
                            </div>
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-blue-700 text-lg mb-2">广域网 (WAN)</h3>
                                <p className="text-sm text-gray-600">Wide Area Network</p>
                                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                                    <li>范围大：跨越城市、国家。</li>
                                    <li>最著名的 WAN：Internet (因特网)。</li>
                                    <li>结构复杂：由无数个局域网连接而成。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-blue-400 p-2 rounded-lg text-white"><Server size={28} /></span>
                            知识讲解 3：域名系统 DNS
                        </h2>
                        <p className="text-gray-600 mb-4">
                            如果你要去好朋友家玩，但只知道他叫“张三”（网址），不知道他住在哪个房间号（IP），这时你就需要问“保安大叔”（DNS）。
                        </p>

                        <DNSVisual />

                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 mt-6">
                            <h4 className="font-bold text-indigo-800 mb-1">💡 知识点：</h4>
                            <p className="text-indigo-700 text-sm">
                                <strong>域名</strong>（www.baidu.com）是给人类看的，<strong>IP 地址</strong>（110.242.68.66）是给电脑看的。DNS 的作用就是将域名解析为 IP 地址。
                            </p>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-red-500 p-2 rounded-lg text-white"><MapPin size={28} /></span>
                            知识讲解 4：门牌号 IP
                        </h2>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mr-2 uppercase">IPv4</span>
                                    <p className="mt-2 font-mono font-bold text-lg text-gray-800">192.168.1.1</p>
                                    <p className="mt-1 text-xs text-gray-400">目前最常用，4 个数字组成。</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2 uppercase">IPv6</span>
                                    <p className="mt-2 font-mono font-bold text-lg text-gray-800 truncate">2001:0db8:85a3...</p>
                                    <p className="mt-1 text-xs text-gray-400">下一代 IP，号称可以给地球上每颗沙子分配一个地址。</p>
                                </div>
                            </div>
                        </div>

                        <IPDeliverySim />
                    </div>
                );
            case 7:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 1</h2>
                        <Quiz
                            question="(2025年6月 GESP 二级) 小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时 he 需要的内存条是（ ）。"
                            options={["RAM", "ROM", "CACHE", "EPROM"]}
                            correctIndex={0}
                            explanation={
                                <>
                                    <p className="mb-2"><strong>关键词分析：</strong>"内存不够用了"。</p>
                                    <p>我们常说的"加内存条"，加的就是 <strong>RAM (随机存储器)</strong>。它就像给电脑换了一个更大的桌子，可以同时处理更多的任务。</p>
                                    <p className="mt-2 text-xs text-gray-500">
                                        * ROM 一般是固化的。<br />
                                        * Cache 集成在 CPU 里，通常不能单独买来插。<br />
                                        * EPROM 是老式可擦写 ROM。
                                    </p>
                                </>
                            }
                        />
                    </div>
                );
            case 8:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 2</h2>
                        <Quiz
                            question="(2024年9月 GESP 一级/二级) DJL-1 计算机的磁心存储元件相当于现代计算机的（ ）。"
                            options={["内存", "磁盘", "CPU", "显示器"]}
                            correctIndex={0}
                            explanation={
                                <>
                                    <p><strong>背景知识：</strong>老式计算机（如几十年前）使用"磁心存储器"来作为主存储器。</p>
                                    <p>磁心存储器的作用是存放正在运行的数据，这与现代计算机的 <strong>内存 (RAM)</strong> 作用是一致的。</p>
                                    <p className="mt-2 font-bold text-indigo-600">记住：看到"磁心存储" → 联想"内存"。</p>
                                </>
                            }
                        />
                    </div>
                );
            case 9:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">GESP 真题挑战 3 (易错题)</h2>
                        <Quiz
                            question="【判断题】局域网（LAN）中的计算机不需要 IP 地址，只有广域网（WAN）才需要。"
                            options={["正确 (True)", "错误 (False)"]}
                            correctIndex={1}
                            explanation={
                                <>
                                    <p className="font-bold text-red-600">这是个大坑！❌</p>
                                    <p>任何连入网络（无论是局域网还是广域网）的设备，都需要一个唯一的标识符才能通信，这个标识符就是 IP 地址。</p>
                                    <p>比如你在家里（局域网）用手机投屏到电视，手机和电视都必须有 IP 地址才能找到对方。</p>
                                </>
                            }
                        />
                    </div>
                );
            case 10:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-pink-500 p-2 rounded-lg text-white"><BookOpen size={28} /></span>
                            总结回顾：超级记忆口诀
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:scale-105 transition-transform">
                                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                                    💾 存储器篇
                                </h3>
                                <ul className="space-y-4 text-lg font-medium text-green-900">
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                                        <span><strong>RAM</strong> 是桌，断电就没货。</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                                        <span><strong>ROM</strong> 是书，断电也不输。</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                                        <span><strong>Cache</strong> 是手心，CPU 最亲。</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:scale-105 transition-transform">
                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    🌐 网络篇
                                </h3>
                                <div className="flex flex-col items-center justify-center h-full pb-8">
                                    <p className="text-2xl font-bold text-blue-900 text-center leading-loose">
                                        <span className="text-3xl">LAN</span> 小 <span className="text-3xl">WAN</span> 大<br />
                                        <span className="text-4xl text-red-500 mx-2">IP</span> 走天下
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 11:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="bg-orange-500 p-2 rounded-lg text-white"><HardDrive size={28} /></span>
                            课后作业
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border-l-8 border-orange-500 shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">1. 小小观察员 🕵️‍♂️</h3>
                                <p className="text-gray-600 mb-4">回家查看自家电脑或爸爸妈妈电脑的配置：</p>
                                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                                    <p>👉 内存 (RAM) 是多少 GB？ (例如 16GB)</p>
                                    <p className="mt-2">👉 硬盘 (ROM/外存) 是多少 GB？ (例如 512GB)</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border-l-8 border-purple-500 shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">2. 预习下节课 🔮</h3>
                                <p className="text-gray-600">
                                    下节课我们将揭秘<strong>“字符的密码”</strong>。
                                    请提前查一查：字母 <code className="bg-purple-100 text-purple-800 px-1 rounded">'A'</code> 在电脑里对应的数字是多少？
                                </p>
                            </div>
                        </div>

                        <MasteryCheck
                            className="mt-8"
                            title="C++ L2-1 计算机通识离开前检查"
                            description="离开前确认存储和网络两条线都能自己讲出来，再进入下节课的字符密码。"
                            items={masteryItems}
                        />

                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setActiveSection(1)}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition hover:-translate-y-1"
                            >
                                🎉 课程结束，回到首页
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Error</div>;
        }
    };

    return (
        <LegacyCppLessonShell
            lessonNumber={1}
            lessonTitle="计算机通识 (RAM/IP)"
            levelLabel="二级趣味课堂"
            accent="bluePurple"
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            nextLessonPath="/lesson/2/2"
            renderIcon={(name, size) => <Icon name={name} size={size} />}
            topSupport={<CppL2LessonSupport lessonId={1} />}
            bottomSupport={<CppL2LessonSupport lessonId={1} placement="bottom" />}
        >
            {renderContent()}
        </LegacyCppLessonShell>
    );
}
