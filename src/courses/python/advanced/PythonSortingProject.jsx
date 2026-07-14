import { HelpCircle, Trophy, Code, ArrowRight, BarChart2, Layers, Brain, Zap, CheckCircle, Globe, Target, Rocket, GitMerge, Dices, Share2 } from 'lucide-react';
import PythonProjectSupport from '../../../components/PythonProjectSupport';
import PythonLessonShell, { MasteryCheck, TransferCheck } from '../shell/PythonLessonShell';
import { sortingMasteryItems } from './sortingProjectData';
import { IntroSlide, BubbleSortSlide, SelectionSortSlide, InsertionSortSlide, HeapSortSlide, RadixSortSlide } from './sortingProjectBasicSlides';
import { AlgorithmBattleSlide, QuickSortSlide, MergeSortSlide, HumanSortSlide } from './sortingProjectAdvancedSlides';
import { ApplicationSlide, BogoSortSlide, QuizSlide, CodeSlide } from './sortingProjectReviewSlides';

const sections = [
    { id: 1, title: '秩序的意义', category: '为什么排序', icon: Brain, component: IntroSlide },
    { id: 2, title: '冒泡可视化', category: '相邻交换', icon: BarChart2, component: BubbleSortSlide },
    { id: 3, title: '选择排序', category: '每轮选最小', icon: Target, component: SelectionSortSlide },
    { id: 4, title: '插入排序', category: '插到合适位', icon: ArrowRight, component: InsertionSortSlide },
    { id: 5, title: '算法对决', category: '速度对比', icon: Zap, component: AlgorithmBattleSlide },
    { id: 6, title: '归并排序', category: '分治合并', icon: GitMerge, component: MergeSortSlide },
    { id: 7, title: '堆排序', category: '堆结构', icon: Share2, component: HeapSortSlide },
    { id: 8, title: '快速排序', category: '基准划分', icon: Rocket, component: QuickSortSlide },
    { id: 9, title: '基数排序', category: '按位分桶', icon: Layers, component: RadixSortSlide },
    { id: 10, title: '代码魔法书', category: 'Python 实现', icon: Code, component: CodeSlide },
    { id: 11, title: '猴子排序(彩蛋)', category: '反面教材', icon: Dices, component: BogoSortSlide },
    { id: 12, title: '真实应用', category: '生活中的排序', icon: Globe, component: ApplicationSlide },
    { id: 13, title: '挑战：排序大师', category: '动手闯关', icon: Trophy, component: HumanSortSlide },
    { id: 14, title: '知识测验', category: '复盘', icon: HelpCircle, component: QuizSlide },
    {
        id: 15,
        title: '项目过关',
        category: '进入 A4 前',
        icon: CheckCircle,
        component: () => (
            <div className="slide-enter space-y-6 pb-20">
                <TransferCheck
                    prompt="换个例子：对 [4, 2, 3, 1] 做升序冒泡排序，手推第一轮的每次相邻比较，写出第一轮结束后的列表。谁归位了？"
                    hint="从左到右依次比较相邻两个，前者大就交换；第一轮结束时最大值到最右。"
                    answer="第一轮后是 [2, 3, 1, 4]，最大值 4 归位到最右。"
                    steps={[
                        '4 vs 2：交换 → [2, 4, 3, 1]。',
                        '4 vs 3：交换 → [2, 3, 4, 1]。',
                        '4 vs 1：交换 → [2, 3, 1, 4]。',
                        '3 次比较 3 次交换，4 沉底；下一轮只需比到倒数第二位。',
                    ]}
                />
                <MasteryCheck
                    title="A3 排序算法项目过关检查"
                    description="如果能追踪排序过程、设计测试样例、比较复杂度、解释循环，就可以进入字符串加密项目。"
                    accent="blue"
                    items={sortingMasteryItems}
                />
            </div>
        ),
    },
];

export default function PythonSortingProject() {
    return (
        <>
            <style>{`
                .slide-enter { animation: slideIn 0.4s ease-out; }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <PythonLessonShell
                eyebrow="PYTHON 项目"
                lessonCode="A3"
                lessonTitle="排序算法项目"
                lessonSubtitle="看清每种排序怎么动"
                accent="blue"
                hero={{
                    title: '把"乱"变成"有序"的几种思路',
                    description: '从冒泡到快排，用可视化看清每种排序每一步在做什么，并比较它们的快慢——排序是算法线的集大成项目。',
                }}
                sections={sections}
                previousPath="/python/binary-search"
                nextPath="/python/encryption"
                nextLabel="下一个：A4 加密解密"
                topSupport={<PythonProjectSupport projectId="sorting" />}
                bottomSupport={<PythonProjectSupport projectId="sorting" placement="bottom" />}
            />
        </>
    );
}
