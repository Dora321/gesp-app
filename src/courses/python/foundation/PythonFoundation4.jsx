import { Box, Package, Zap, Sparkles, BookOpen, AlertCircle, CheckCircle, Star } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell from '../shell/PythonLessonShell';
import { FunctionSlide, ScopeSlide } from './foundation4/FunctionSlides';
import { ModuleSlide, AdvancedFunctionSlide, LambdaSlide } from './foundation4/ModuleSlides';
import { QuizSlide, LibrarySlide, TryExceptSlide, SummarySlide } from './foundation4/ReviewSlides';

const sections = [
    { id: 1, title: '函数 Function', icon: BookOpen, component: FunctionSlide },
    { id: 2, title: '作用域 Scope', icon: Box, component: ScopeSlide },
    { id: 3, title: '模块 Module', icon: Package, component: ModuleSlide },
    { id: 4, title: '常用库 Library', icon: Box, component: LibrarySlide },
    { id: 5, title: '进阶 Advanced', icon: Zap, component: AdvancedFunctionSlide },
    { id: 6, title: 'Lambda 魔法', category: '进阶 · 选做', icon: Sparkles, component: LambdaSlide },
    { id: 7, title: '异常处理 try/except', icon: AlertCircle, component: TryExceptSlide },
    { id: 8, title: '挑战 Challenge', icon: Star, component: QuizSlide },
    { id: 9, title: '小结与衔接', icon: CheckCircle, component: SummarySlide },
];

export default function PythonFoundation4() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F4"
            lessonTitle="函数与模块"
            lessonSubtitle="把重复逻辑打包复用"
            accent="indigo"
            hero={{
                title: '把重复的代码打包成函数',
                description: '学会定义带参数和返回值的函数，并借用模块的现成能力——让代码可复用、可组合。',
            }}
            prerequisites={['会写循环和条件', '会用变量传递数据', '读得懂多行缩进代码']}
            sections={sections}
            previousPath="/python/f3"
            nextPath="/python/f5"
            nextLabel="下一课：F5 绘图魔法"
            topSupport={<PythonFoundationSupport lessonId="f4" />}
            bottomSupport={<PythonFoundationSupport lessonId="f4" placement="bottom" />}
        />
    );
}
