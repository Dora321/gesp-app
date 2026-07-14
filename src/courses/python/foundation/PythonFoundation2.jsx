import { GitBranch, Repeat, HelpCircle, CheckCircle, AlertTriangle, Zap, TreePine, BookOpen } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell from '../shell/PythonLessonShell';
import { BooleanSlide, ComparisonSlide, ConditionSlide, NestedConditionSlide } from './foundation2/DecisionSlides';
import { LoopSlide, ChallengeSlide } from './foundation2/LoopSlides';
import { QuizSlide, SummarySlide } from './foundation2/ReviewSlides';

const sections = [
    { id: 1, title: '布尔逻辑', category: '真与假', icon: CheckCircle, component: BooleanSlide },
    { id: 2, title: '比较运算', category: '得到真假', icon: Zap, component: ComparisonSlide },
    { id: 3, title: '条件判断', category: 'if / elif / else', icon: GitBranch, component: ConditionSlide },
    { id: 4, title: '嵌套条件', category: '决策树', icon: TreePine, component: NestedConditionSlide },
    { id: 5, title: 'For 循环', category: '按次数重复', icon: Repeat, component: LoopSlide },
    { id: 6, title: 'While 火箭', category: '按条件重复', icon: AlertTriangle, component: ChallengeSlide },
    { id: 7, title: '逻辑大师', category: '闯关测验', icon: HelpCircle, component: QuizSlide },
    { id: 8, title: '小结与衔接', category: '复盘 + 下一步', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation2() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F2"
            lessonTitle="控制流程"
            lessonSubtitle="让程序学会判断和重复"
            accent="blue"
            hero={{
                title: '让程序学会“判断”和“重复”',
                description: '这一课把程序从“一行一行往下走”，升级成会根据条件做选择、按规则重复——这是后面写任何小游戏和小工具的基础。',
            }}
            prerequisites={['会用变量保存一个值', '会用 print 输出结果', '理解 True / False 两种结果']}
            sections={sections}
            previousPath="/python/f1"
            nextPath="/python/f3"
            nextLabel="下一课：F3 列表与字典"
            topSupport={<PythonFoundationSupport lessonId="f2" />}
            bottomSupport={<PythonFoundationSupport lessonId="f2" placement="bottom" />}
        />
    );
}
