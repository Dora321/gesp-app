import { List, Key, Edit3, Grid3x3, BookOpen } from 'lucide-react';
import PythonFoundationSupport from '../../../components/PythonFoundationSupport';
import PythonLessonShell from '../shell/PythonLessonShell';
import { ListSlide } from './foundation3/ListSlides';
import { DictSlide } from './foundation3/DictSlides';
import { StringSlide } from './foundation3/StringSlides';
import { Grid2DSlide, SummarySlide } from './foundation3/GridSlides';

const sections = [
    { id: 1, title: '列表 List', icon: List, component: ListSlide },
    { id: 2, title: '二维列表 Grid', icon: Grid3x3, component: Grid2DSlide },
    { id: 3, title: '字典 Dict', icon: Key, component: DictSlide },
    { id: 4, title: '字符串 String', icon: Edit3, component: StringSlide },
    { id: 5, title: '小结与衔接', icon: BookOpen, component: SummarySlide },
];

export default function PythonFoundation3() {
    return (
        <PythonLessonShell
            eyebrow="PYTHON FOUNDATION"
            lessonCode="F3"
            lessonTitle="列表与字典"
            lessonSubtitle="用数据结构装住真实信息"
            accent="teal"
            hero={{
                title: '用列表和字典装住真实世界的数据',
                description: '学会用 list、dict、string 组织一组数据并完成增删查改——这是函数和项目处理信息的原料。',
            }}
            prerequisites={['会用变量和 for 循环', '会写 if 条件判断', '理解下标从 0 开始']}
            sections={sections}
            previousPath="/python/f2"
            nextPath="/python/f4"
            nextLabel="下一课：F4 函数与模块"
            topSupport={<PythonFoundationSupport lessonId="f3" />}
            bottomSupport={<PythonFoundationSupport lessonId="f3" placement="bottom" />}
        />
    );
}
