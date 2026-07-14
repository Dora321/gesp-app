import React, { useState } from 'react';
import {
    Ban,
    FastForward,
    Play,
    RotateCcw,
    Flag,
    AlertTriangle,
    Terminal,
    BookOpen,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Footprints,
    CloudRain,
    Banana,
    Trophy,
    Utensils,
    Search,
    StopCircle,
    Layers,
    Zap,
    Target
} from 'lucide-react';
import CppL1LessonSupport from '../../../components/CppL1LessonSupport';
import LegacyCppLessonShell from '../LegacyCppLessonShell';
import { MasteryCheck, TransferCheck } from '../CppLessonShell';

import { Icon, RunRaceSimulator, GoldAppleGame, BadBeanGame, ComparisonArena, PitfallGuide, NestedLoopVisualizer, InfiniteBreakTracer, LogicTable } from './Lesson11Activities';

const lesson11MasteryItems = [
    {
        label: '能区分 break 和 continue。',
        evidence: '能说清 break 结束整个循环，continue 只跳过本轮剩余代码。',
        retryHint: '回到“急刹车 vs 捣蛋鬼”，用跑圈例子各说一遍。',
    },
    {
        label: '能手推 continue 后下一步去哪。',
        evidence: '知道 continue 后会回到循环更新或条件判断，而不是直接退出循环。',
        retryHint: '回到“跳过坏豆子”，把被跳过的动作划掉。',
    },
    {
        label: '能判断 break 在嵌套循环里只跳出一层。',
        evidence: '知道内层 break 不会自动结束外层循环。',
        retryHint: '回到“嵌套循环中的break”，圈出 break 所在的大括号。',
    },
    {
        label: '能手推含 break/continue 的输出。',
        evidence: '能逐轮记录 i 的变化、是否跳过、是否停止，并写出最终输出。',
        retryHint: '回到两道真题，把每轮写成“i、动作、输出”三列。',
    },
];

// --- 章节数据 ---
const sections = [
    { id: 1, title: "课程导入：酷跑大赛", icon: "flag", category: "控制奥秘" },
    { id: 2, title: "核心概念：急刹车 vs 捣蛋鬼", icon: "book", category: "控制奥秘" },
    { id: 3, title: "演示：寻找金苹果 (break)", icon: "ban", category: "控制奥秘" },
    { id: 4, title: "演示：跳过坏豆子 (continue)", icon: "skip", category: "控制奥秘" },
    { id: 5, title: "对比PK台：同一场景不同结果", icon: "trophy", category: "深度辨析" },
    { id: 6, title: "避坑指南：常见误区", icon: "alert", category: "深度辨析" },
    { id: 7, title: "真题实战 1：无限循环急刹车", icon: "stop", category: "实战与进阶" },
    { id: 8, title: "真题实战 2：混合双打", icon: "zap", category: "实战与进阶" },
    { id: 9, title: "高级知识：嵌套循环中的break", icon: "layers", category: "实战与进阶" },
    { id: 10, title: "总结与作业", icon: "check", category: "实战与进阶" },
    { id: 11, title: "离开前检查", icon: "check", category: "实战与进阶" }
];

// --- 主应用 ---
export default function App() {
    const [activeSection, setActiveSection] = useState(1);

    const renderContent = () => {
        switch (activeSection) {
            case 1:
                return (
                    <div className="slide-enter text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-2xl shadow-xl mb-8 flex flex-col items-center border border-blue-400/30">
                            <div className="flex gap-4 mb-6">
                                <Ban size={64} className="text-red-300 animate-pulse" />
                                <FastForward size={64} className="text-yellow-300 animate-bounce" />
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2 text-blue-100 tracking-wider">GESP C++ 一级 第11课</h2>
                            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-md">循环控制</h1>
                            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30">
                                <span className="font-bold tracking-wide">🚧 副标题：捣蛋鬼与急刹车</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-left">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <ArrowRight className="text-blue-600" /> 教学目标
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="bg-red-100 text-red-600 p-1 rounded"><Ban size={18} /></span>
                                    理解 <code>break</code> (立刻停止) 和 <code>continue</code> (跳过这一次) 的区别。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-600 p-1 rounded"><Terminal size={18} /></span>
                                    能模拟代码执行流程，算出带有循环控制语句的最终结果。
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="bg-yellow-100 text-yellow-600 p-1 rounded"><AlertTriangle size={18} /></span>
                                    结合之前的 <code>if</code> 判断，解决 GESP 真题中的逻辑陷阱。
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <BookOpen className="text-purple-500" size={32} /> 核心概念：急刹车 vs 捣蛋鬼
                        </h2>

                        <RunRaceSimulator />

                        {/* 新增：对比表格 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
                            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                <Zap className="text-yellow-500" /> 一张表看懂区别
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="p-3 text-left rounded-l-lg">特性</th>
                                            <th className="p-3 text-left">break (破坏王)</th>
                                            <th className="p-3 text-left rounded-r-lg">continue (跳跳糖)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">作用</td>
                                            <td className="p-3 text-red-600 flex items-center gap-2"><Ban size={16} /> 彻底终止循环</td>
                                            <td className="p-3 text-yellow-600 flex items-center gap-2"><FastForward size={16} /> 跳过本次，继续下次</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">去哪了</td>
                                            <td className="p-3 text-gray-700">跳出大括号，执行循环后面的代码</td>
                                            <td className="p-3 text-gray-700">跳到循环开头 (或 i++ )，开始下一圈</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-gray-600">生活类比</td>
                                            <td className="p-3 text-gray-700">下课铃响了，全班放学</td>
                                            <td className="p-3 text-gray-700">这道题不会做，跳过做下一道</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:-translate-y-1 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-red-100 p-3 rounded-full text-red-600"><Ban size={32} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">break</h3>
                                        <span className="text-xs text-red-500 font-bold uppercase">破坏王</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong className="text-red-600">彻底不干了！</strong><br />
                                    遇到它，直接跳出整个循环，剩下的圈数全部作废，直接下课。
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 hover:-translate-y-1 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><FastForward size={32} /></div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">continue</h3>
                                        <span className="text-xs text-yellow-600 font-bold uppercase">跳跳糖</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    <strong className="text-yellow-600">这局不算！</strong><br />
                                    遇到它，只跳过这一轮剩下的动作，赶紧去跑下一圈。
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Ban className="text-red-500" size={32} /> 演示：破坏王 break
                        </h2>
                        <GoldAppleGame />
                        <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                            <div className="text-gray-500">// 代码示例</div>
                            <div>for (int i = 1; i &lt;= 100; i++) &#123;</div>
                            <div className="pl-4">if (i == 5) &#123;</div>
                            <div className="pl-8 text-green-400">cout &lt;&lt; "找到金苹果！";</div>
                            <div className="pl-8 text-red-400 font-bold">break; <span className="text-gray-500">// 直接跳出大括号，下班！</span></div>
                            <div className="pl-4">&#125;</div>
                            <div className="pl-4">cout &lt;&lt; "检查第" &lt;&lt; i &lt;&lt; "个...";</div>
                            <div>&#125;</div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <FastForward className="text-yellow-500" size={32} /> 演示：跳跳糖 continue
                        </h2>
                        <BadBeanGame />
                        <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                            <div className="text-gray-500">// 代码示例</div>
                            <div>for (int i = 1; i &lt;= 5; i++) &#123;</div>
                            <div className="pl-4">if (i == 3) &#123;</div>
                            <div className="pl-8 text-green-400">cout &lt;&lt; "坏豆子，扔掉！";</div>
                            <div className="pl-8 text-yellow-400 font-bold">continue; <span className="text-gray-500">// 下面的"吃掉"不执行了，直接i++</span></div>
                            <div className="pl-4">&#125;</div>
                            <div className="pl-4">cout &lt;&lt; "吃掉第" &lt;&lt; i &lt;&lt; "颗";</div>
                            <div>&#125;</div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Trophy className="text-yellow-500" size={32} /> 对比PK台：同一场景不同结果
                        </h2>
                        <ComparisonArena />
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm text-blue-900 mt-4">
                            <strong>👀 观察重点：</strong> 当数字数到 5 的时候，break 直接让比赛结束了（后面的数字都没了），而 continue 只是跳过了 5，后面的 6,7,8,9,10 还在！
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <AlertTriangle className="text-orange-500" size={32} /> 避坑指南：常见误区
                        </h2>
                        <PitfallGuide />
                    </div>
                );
            case 7:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛑 真题实战 1：无限循环急刹车</h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-3 py-1 rounded inline-block font-mono">2023年12月 GESP 一级真题 第7题</div>
                        <InfiniteBreakTracer />
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><CheckCircle2 size={18} className="text-green-600" /> 解题思路：人脑模拟机器人</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                1. 识别陷阱：<code>while(1)</code> 是死循环，除非遇到 <code>break</code>。<br />
                                2. 寻找规律：N 从 10 开始，每次减 2 (10, 8, 6, 4, 2, 0)。cnt 负责数数。<br />
                                3. 关键时刻：当 N 变成 0 时，<code>if(N==0) break</code> 生效，循环终止。<br />
                                4. 清点：一共减了 5 次，所以 cnt 是 5。
                            </p>
                        </div>
                    </div>
                );
            case 8:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">⚠️ 真题实战 2：混合双打</h2>
                        <div className="bg-gray-100 text-xs text-gray-500 mb-4 px-3 py-1 rounded inline-block font-mono">2024年12月 GESP 一级真题 第10题</div>
                        <LogicTable />
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4 text-sm text-blue-900">
                            <strong>💡 发现规律：</strong><br />
                            <code>if (i % 2 == 0) continue;</code> 这句话帮我们过滤掉了所有的偶数。<br />
                            只有奇数 (5, 15, 25, 35, 45, 55...) 才能走到 <code>tnt += 1</code>。<br />
                            当走到 55 时，虽然它是奇数，但满足了 <code>i &gt;= 50</code>，触发 <code>break</code>，游戏结束。
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Layers className="text-indigo-500" size={32} /> 高级知识：嵌套循环中的 break
                        </h2>
                        <NestedLoopVisualizer />
                        <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 mt-4 text-sm text-indigo-900">
                            <strong>🗝️ 关键点：</strong> break 只能跳出<strong>它所在的那一层</strong>大括号。如果你在内层循环写 break，外层循环还会继续跑！想要一次跳出所有循环，需要使用标志变量（flag）。
                        </div>
                    </div>
                );
            case 10:
                return (
                    <div className="slide-enter">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 总结与作业</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <BookOpen size={100} />
                                </div>
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-700 border-b pb-2">
                                    <CheckCircle2 size={20} /> 核心考点
                                </h3>
                                <ul className="space-y-4 text-gray-700 font-medium">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-red-100 text-red-600 p-1 rounded mt-1"><Ban size={16} /></span>
                                        <div>
                                            <strong>break (红灯)：</strong><br />
                                            遇到它，整个循环彻底停止，就像下课铃响了。
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-yellow-100 text-yellow-600 p-1 rounded mt-1"><FastForward size={16} /></span>
                                        <div>
                                            <strong>continue (跳过)：</strong><br />
                                            遇到它，只跳过本轮剩下的动作，直接开始下一轮。
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <Terminal size={24} /> 课后作业
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">1. 修改代码</p>
                                        <p className="text-xs opacity-90">
                                            把今天第二题的代码输入电脑。如果把 <code>i += 5</code> 改成 <code>i++</code>，tnt 会变成多少？
                                        </p>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                                        <p className="font-bold text-sm mb-1">2. 思考题</p>
                                        <p className="text-xs opacity-90">
                                            如果我想打印 1 到 10 之间的数字，但是不喜欢 4 和 7，该怎么用 <code>continue</code> 把它们“吃掉”？
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button onClick={() => setActiveSection(1)} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-bold shadow-sm flex items-center gap-2 mx-auto">
                                <RotateCcw size={18} /> 重新开始学习
                            </button>
                        </div>
                    </div>
                );
            case 11:
                return (
                    <div className="slide-enter py-6">
                        <TransferCheck
                            prompt={'换个例子：for(int i=1;i<=5;i++){ if(i==3) continue; cout<<i; } 输出什么？把 continue 换成 break 又输出什么？'}
                            hint="continue 跳过本次剩余、进下一次；break 直接结束整个循环。"
                            answer="continue 输出 1245；break 输出 12。"
                            steps={[
                                'continue：i==3 时跳过输出，其余都输出 → 1 2 4 5。',
                                'break：i==3 时直接退出循环 → 只输出 1 2。',
                                'continue 跳一次，break 跳全部。',
                            ]}
                        />
                        <MasteryCheck
                            title="C++ L1-11 break 和 continue 离开前检查"
                            description="如果能分清停止整个循环、跳过本轮、嵌套层级和输出手推，就可以进入嵌套循环。"
                            items={lesson11MasteryItems}
                        />
                    </div>
                );
            default:
                return <div>Content Not Found</div>;
        }
    };

    return (
        <LegacyCppLessonShell
            lessonNumber={11}
            lessonTitle="循环控制"
            sections={sections}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            nextLessonPath="/lesson/1/12"
            renderIcon={(name, size) => <Icon name={name} size={size} />}
            topSupport={<CppL1LessonSupport lessonId={11} />}
            bottomSupport={<CppL1LessonSupport lessonId={11} placement="bottom" />}
            accent="bluePurple"
        >
            {renderContent()}
        </LegacyCppLessonShell>
    );
}
