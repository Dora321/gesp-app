import { getCppLesson } from '../cppLessonIndex.js';
import { normalizeTopicTags } from './topicTaxonomy.js';

// 只关联课名与内容直接覆盖的考点。每行是一级别下的课号和规范考点。
const LESSON_TOPICS = {
    1: {
        1: ['计算机基础', '计算机历史', '基础语法', '编程环境', '开发环境'],
        2: ['变量与标识符', '变量初始化', '数据类型'],
        3: ['算术运算', '运算符', '表达式', '奇偶判断'],
        4: ['数据类型', '类型转换', '浮点数', '浮点运算'],
        5: ['赋值', '运算符', '表达式', '未定义行为'],
        6: ['输入输出'],
        7: ['比较运算', '逻辑运算', '逻辑判断'],
        8: ['条件判断', '逻辑判断', '边界分析'],
        9: ['条件判断'],
        10: ['循环', '变量追踪', '程序分析'],
        11: ['循环', '等价变换', '程序分析'],
        12: ['循环', '边界分析'],
        13: ['数位处理', '回文数'],
        14: ['循环', '变量追踪', '输入输出'],
        15: ['质数判定', '数论'],
        16: ['C++综合'],
    },
    2: {
        1: ['计算机基础', '操作系统', '网络基础'],
        2: ['字符与ASCII', '编码'],
        3: ['类型转换', '数据类型'],
        4: ['条件判断', '逻辑判断'],
        5: ['嵌套循环', '循环', '变量追踪'],
        6: ['图形绘制', '嵌套循环'],
        7: ['流程图', '程序分析'],
        8: ['数学函数', '数学'],
        9: ['质数判定', '边界分析'],
        10: ['数位处理', '回文数'],
        11: ['数论', '算术运算'],
        12: ['数组', '顺序查找'],
        13: ['模拟', '算法思维'],
        14: ['模拟', '变量追踪'],
    },
    3: {
        1: ['进制转换', '二进制'],
        2: ['补码', '二进制'],
        3: ['位运算', '按位取反'],
        4: ['位运算', '异或'],
        5: ['数组', '顺序查找'],
        6: ['数组', '边界分析'],
        7: ['字符串', '字符数组'],
        8: ['字符串', 'substr'],
        9: ['数组', '字符串'],
        10: ['枚举', '算法思维'],
        11: ['模拟', '程序分析'],
        12: ['编码', '字符与ASCII'],
        13: ['图形绘制', '嵌套循环'],
        14: ['进制转换'],
        15: ['逻辑运算', '算法思维'],
    },
    4: {
        1: ['函数', '作用域'],
        2: ['参数传递', '函数', '默认参数'],
        3: ['参数传递', '数组'],
        4: ['递归', '递归树', '边界分析'],
        5: ['指针'],
        6: ['指针', '数组内存', '内存管理', 'sizeof'],
        7: ['结构体'],
        8: ['二维数组'],
        9: ['冒泡排序', '排序算法', '稳定性'],
        10: ['插入排序', '排序算法', '稳定性'],
        11: ['选择排序', '排序算法', '稳定性'],
        12: ['递推', '斐波那契'],
        13: ['文件操作'],
        14: ['异常处理', '复杂度分析'],
    },
    5: {
        1: ['筛法', '线性筛', '质数判定'],
        2: ['数论'],
        3: ['高精度'],
        4: ['高精度'],
        5: ['数论', '质数判定'],
        6: ['链表', '指针', '线性表'],
        7: ['链表', '内存管理'],
        8: ['链表', '双向链表'],
        9: ['链表', '模拟'],
        10: ['二分查找', '边界分析'],
        11: ['分治', '归并排序', '快速排序', '排序算法'],
        12: ['贪心'],
        13: ['递归', '动态规划', '斐波那契'],
        14: ['复杂度分析'],
    },
    6: {
        1: ['树与二叉树'],
        2: ['树与二叉树', '遍历', '递归'],
        3: ['哈夫曼编码', '树与二叉树', '贪心', '堆'],
        4: ['广度优先搜索', '队列', '泛洪'],
        5: ['深度优先搜索', '递归', '泛洪'],
        6: ['类', '面向对象'],
        7: ['类', '面向对象'],
        8: ['类', '面向对象'],
        9: ['格雷编码', '位运算', '编码'],
        10: ['面向对象'],
        11: ['动态规划', '递推', '斐波那契'],
        12: ['动态规划'],
        13: ['动态规划'],
        14: ['二维数组', '动态规划'],
    },
    7: {
        1: ['复杂度分析'],
        2: ['树与二叉树', '遍历'],
        3: ['树与二叉树'],
        4: ['哈希表', 'STL容器'],
        5: ['图论'],
        6: ['深度优先搜索', '图的遍历', '栈'],
        7: ['广度优先搜索', '图的遍历', '队列'],
        8: ['深度优先搜索', '广度优先搜索'],
        9: ['动态规划', '递推'],
        10: ['动态规划'],
        11: ['类', '面向对象', '静态成员'],
        12: ['面向对象'],
        13: ['命名空间', '作用域'],
        14: ['排序算法', '稳定性'],
    },
    8: {
        1: ['排列组合', '组合数学'],
        2: ['组合数学', '杨辉三角'],
        3: ['概率与期望'],
        4: ['面向对象', '类', '内存管理'],
        5: ['运算符重载', '面向对象'],
        6: ['图论', '图的遍历'],
        7: ['最短路', '图论'],
        8: ['最小生成树', '图论', '贪心'],
        9: ['动态规划', '树与二叉树'],
        10: ['数论', '质数判定', '快速幂'],
        11: ['进制转换', '位运算'],
        12: ['复杂度分析'],
        13: ['分治', '递归', '递归树'],
        14: ['指针', '内存管理', '异常处理', 'C++综合'],
    },
};

export const topicLessonMap = new Map();
for (const [level, lessons] of Object.entries(LESSON_TOPICS)) {
    for (const [lessonId, tags] of Object.entries(lessons)) {
        const { level: lessonLevel, id, path, title } = getCppLesson(level, lessonId);
        const lesson = { level: lessonLevel, lessonId: id, path, title };
        for (const tag of tags) {
            if (!topicLessonMap.has(tag)) topicLessonMap.set(tag, []);
            topicLessonMap.get(tag).push(lesson);
        }
    }
}

export function getRelatedLessonsForTags(tags, preferredLevel, limit = 3) {
    const topics = normalizeTopicTags(tags);
    const matches = new Map();
    for (const tag of topics) {
        for (const lesson of topicLessonMap.get(tag) || []) {
            const match = matches.get(lesson.path);
            if (match) match.count += 1;
            else matches.set(lesson.path, { lesson, count: 1 });
        }
    }

    const level = Number(preferredLevel);
    const distance = (lesson) => (Number.isFinite(level) ? Math.abs(lesson.level - level) : 0);
    return [...matches.values()]
        .sort((a, b) => (
            distance(a.lesson) - distance(b.lesson)
            || b.count - a.count
            || a.lesson.level - b.lesson.level
            || a.lesson.lessonId - b.lesson.lessonId
        ))
        .slice(0, Math.max(0, limit))
        .map(({ lesson }) => lesson);
}

export function getRelatedTagsForLesson(level, lessonId) {
    return [...(LESSON_TOPICS[level]?.[lessonId] || [])];
}

export function getTopicPracticePathForLesson(level, lessonId) {
    if (!LESSON_TOPICS[level]?.[lessonId]?.length) return null;
    return `/question-bank/topics/${level}?lesson=${lessonId}`;
}
