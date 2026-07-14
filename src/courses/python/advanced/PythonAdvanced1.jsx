import { Layers, Trophy, Box, Lock, Search, CheckCircle } from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell, { MasteryCheck, TransferCheck } from '../shell/PythonLessonShell';
import { IntroSlide } from './advanced1/RecursionSlides';
import { EnumerationSlide } from './advanced1/EnumerationSlides';
import { GreedySlide } from './advanced1/GreedySlides';
import { RecursionSlide, QuizSlide } from './advanced1/ReviewSlides';

const a1MasteryItems = [
    {
        label: '能把一个小问题拆成输入、过程、输出。',
        evidence: '例如“找 1-100 里满足条件的数”，能说清输入范围、判断规则和输出结果。',
        retryHint: '回到课程简介，先用三列表写下“给我什么、怎么处理、交付什么”。',
    },
    {
        label: '能区分枚举、贪心、递归各适合什么场景。',
        evidence: '能说出枚举是试所有可能，贪心是每步选最好，递归是把大问题拆成相似小问题。',
        retryHint: '回到三种算法小节，给每种方法各配一个生活例子。',
    },
    {
        label: '能指出递归一定要有终止条件。',
        evidence: '看到递归代码时，能先找到“什么时候不再调用自己”。',
        retryHint: '回到“递归：分治之美”，先圈出 base case 再看递归调用。',
    },
    {
        label: '能为一个策略写出最小代码实验并记录错因。',
        evidence: '至少完成一个枚举或贪心小实验，并能说明哪一步曾经想错。',
        retryHint: '回到结业测验，把错题改写成一个最小可运行例子。',
    },
];

const sections = [
    { id: 1, title: '课程简介: 算法思维', category: '导入', icon: Search, component: IntroSlide },
    { id: 2, title: '枚举: 暴力破解', category: '试所有可能', icon: Lock, component: EnumerationSlide },
    { id: 3, title: '贪心: 最佳策略', category: '每步选最好', icon: Box, component: GreedySlide },
    { id: 4, title: '递归: 分治之美', category: '自己调自己', icon: Layers, component: RecursionSlide },
    { id: 5, title: '结业测验', category: '闯关', icon: Trophy, component: QuizSlide },
    {
        id: 6,
        title: '项目过关',
        category: '进入 A2 前',
        icon: CheckCircle,
        component: () => (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TransferCheck
                    prompt="换个例子：三个任务各配哪种策略？① 找出 1~100 里所有能被 7 整除的数；② 用最少的纸币凑出 87 元（每次拿不超过剩余的最大面额）；③ 计算 n!（n 的阶乘）。"
                    hint="回忆三种策略的适用场景：全部试一遍 / 每步拿当前最优 / 问题能拆成更小的同类问题。"
                    answer="① 枚举；② 贪心；③ 递归——且递归必须写终止条件（n 为 1 或 0 时返回 1）。"
                    steps={[
                        '① 范围明确、逐个检查 → 枚举 for i in range(1, 101)。',
                        '② 每一步选当前最大面额 → 贪心（人民币面额下贪心恰好最优）。',
                        '③ n! = n × (n-1)!，同类小问题 → 递归，先写终止再写递归式。',
                    ]}
                />
                <MasteryCheck
                    title="A1 算法思维项目过关检查"
                    description="如果能拆输入输出、区分三种策略、找到递归终止条件、写最小实验，就可以进入二分搜索。"
                    accent="indigo"
                    items={a1MasteryItems}
                />
            </div>
        ),
    },
];

export default function PythonAdvanced1() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 项目"
            lessonCode="A1"
            lessonTitle="算法思维入门"
            lessonSubtitle="枚举 · 贪心 · 递归"
            accent="indigo"
            hero={{
                title: '做项目不止会写代码，更要"想得聪明"',
                description: '枚举试所有可能、贪心每步选最好、递归自己调自己——三种最基础的算法思维，是整条项目线的解题底座。',
            }}
            sections={sections}
            previousPath="/python/bridge"
            nextPath="/python/binary-search"
            nextLabel="下一个：A2 二分搜索"
            topSupport={<PythonProjectSupport projectId="a1" />}
            bottomSupport={<PythonProjectSupport projectId="a1" placement="bottom" />}
        />
    );
}
