import { Grid, ArrowUp, RotateCw, Play, Code, Box, Hash, Trophy, CheckCircle } from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell, { MasteryCheck, TransferCheck } from '../shell/PythonLessonShell';
import { IntroSlide, RoadmapSlide, DataStructureSlide, MergeLogicSlide } from './advanced2/CoreSlides';
import { TransformSlide, SummarySlide, QuizSlide, PackagingSlide } from './advanced2/BuildSlides';

const game2048MasteryItems = [
    {
        label: '能用二维列表表示 2048 棋盘。',
        evidence: '能用 grid[row][col] 指出任意格子，并解释 0 代表空格。',
        retryHint: '回到“构建世界”，先画 4x4 表格，再写出对应列表。',
    },
    {
        label: '能把一次移动拆成压缩、合并、再压缩。',
        evidence: '能拿 [2, 0, 2, 2] 推出 [4, 2, 0, 0]，并说明不能重复合并。',
        retryHint: '回到“核心魔法”，只跟踪一行数字，不急着处理整张棋盘。',
    },
    {
        label: '能用旋转或转置复用同一套移动逻辑。',
        evidence: '能解释为什么先变换棋盘方向，再统一做“向左移动”。',
        retryHint: '回到“空间变换”，用箭头画出上、下、右如何转成左移。',
    },
    {
        label: '能用样例测试胜负和随机生成方块。',
        evidence: '至少准备满盘、可合并、不可移动、移动后生成新块四类样例。',
        retryHint: '回到“开发任务书”，先写测试表，再补游戏规则。',
    },
];

const sections = [
    { id: 1, title: '游戏初体验', category: '玩中学', icon: Play, component: IntroSlide },
    { id: 1.5, title: '开发任务书', category: '拆需求', icon: Hash, component: RoadmapSlide },
    { id: 2, title: '构建世界', category: '二维列表棋盘', icon: Grid, component: DataStructureSlide },
    { id: 3, title: '核心魔法', category: '移动与合并', icon: ArrowUp, component: MergeLogicSlide },
    { id: 4, title: '空间变换', category: '旋转复用', icon: RotateCw, component: TransformSlide },
    { id: 5, title: '代码全览', category: 'Python 实现', icon: Code, component: SummarySlide },
    { id: 6, title: '课间小测验', category: '闯关', icon: Trophy, component: QuizSlide },
    { id: 7, title: '打包发布', category: '收尾', icon: Box, component: PackagingSlide },
    {
        id: 8,
        title: '项目过关',
        category: '进入 A8 前',
        icon: CheckCircle,
        component: () => (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TransferCheck
                    prompt="换个例子：2048 的一行是 [2, 2, 4, 4]，向左移动一次后这一行变成什么？这次移动得多少分？"
                    hint="按「压缩 → 合并（每格一次）→ 再压缩」三步推，得分是本次所有合并产生的新数字之和。"
                    answer="变成 [4, 8, 0, 0]，得分 4 + 8 = 12。"
                    steps={[
                        '压缩：没有空格，仍是 [2, 2, 4, 4]。',
                        '合并：2+2=4（得 4 分），4+4=8（得 8 分）→ [4, 8]。',
                        '再压缩补零：[4, 8, 0, 0]。注意合并后的 4 不会再和 8 前面的 4 连锁合并——每格每次移动只合并一次。',
                    ]}
                />
                <MasteryCheck
                    title="A7 2048 游戏项目过关检查"
                    description="如果能讲清棋盘表示、移动合并、方向复用和测试样例，就可以进入 AI 初探。"
                    accent="teal"
                    items={game2048MasteryItems}
                />
            </div>
        ),
    },
];

export default function PythonAdvanced2() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON 项目"
            lessonCode="A7"
            lessonTitle="2048 游戏项目"
            lessonSubtitle="用二维列表搭一个能玩的游戏"
            accent="teal"
            hero={{
                title: '把语法拼成一个能玩的 2048',
                description: '用二维列表当棋盘，把移动、合并、生成方块拆成函数——这是综合运用列表、循环、函数的第一个大项目。',
            }}
            sections={sections}
            previousPath="/python/file-ops"
            nextPath="/python/ai"
            nextLabel="下一个：A8 AI 初探"
            topSupport={<PythonProjectSupport projectId="a2" />}
            bottomSupport={<PythonProjectSupport projectId="a2" placement="bottom" />}
        />
    );
}
