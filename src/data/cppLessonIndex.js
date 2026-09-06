// 96 节 C++ 互动课的扁平索引：级别、路由、标题、学习目标。
//
// 这些课是站点最有原创价值的内容，但此前既不在 sitemap 里、也没有静态 shell，
// 对爬虫完全不可见；routeMeta 给它们的标题也只是「GESP C++ N级第M课」这种
// 无差别模板。课程流数据里本来就有真实标题和学习目标，这里把它们汇成一处，
// 供 routeMeta、sitemap 生成器和预渲染共用。

// 只依赖轻量的课名模块。routeMeta 在首屏就会加载，若从 cppL*CourseFlow.js
// 取标题会把 6 份共 100KB 的课程流元数据一并拉上首屏（实测入口包 gzip +34KB）。
import {
    cppL1Lessons,
    cppL2Lessons,
    cppL3Lessons,
    cppL4Lessons,
    cppL5Lessons,
    cppL6Lessons,
    cppL7Lessons,
    cppL8Lessons,
} from './cppLessonTitles.js';

const LESSONS_BY_LEVEL = {
    1: cppL1Lessons,
    2: cppL2Lessons,
    3: cppL3Lessons,
    4: cppL4Lessons,
    5: cppL5Lessons,
    6: cppL6Lessons,
    7: cppL7Lessons,
    8: cppL8Lessons,
};

// 七、八级的大纲已排定但课时在分批建设。索引只收已经有页面的课时——
// 未建成的课如果进了 sitemap 和预渲染，爬虫拿到的会是一个 404 壳子。
const BUILT_LESSON_IDS = {
    7: new Set([1, 2, 3, 4, 5, 6, 7, 8]),
    8: new Set(),
};

const isBuilt = (level, lessonId) => {
    const built = BUILT_LESSON_IDS[level];
    return !built || built.has(lessonId);
};

// 「第 9 课：for 循环」→「for 循环」。题号在 title 里重复出现，
// 拼进页面标题会变成「第 9 课：for 循环 GESP C++ 一级第 9 课」。
const stripLessonNumber = (title) => String(title || '').replace(/^第\s*\d+\s*课[:：]\s*/, '').trim();

export const cppLessonIndex = Object.entries(LESSONS_BY_LEVEL).flatMap(([level, lessons]) => (
    (lessons || []).filter((lesson) => isBuilt(Number(level), lesson.id)).map((lesson) => ({
        level: Number(level),
        id: lesson.id,
        path: `/lesson/${level}/${lesson.id}`,
        title: stripLessonNumber(lesson.title),
        fullTitle: lesson.title,
    }))
));

const BY_PATH = new Map(cppLessonIndex.map((lesson) => [lesson.path, lesson]));

export function getCppLesson(level, lessonId) {
    return BY_PATH.get(`/lesson/${level}/${lessonId}`) || null;
}

export const cppLessonPaths = cppLessonIndex.map((lesson) => lesson.path);
