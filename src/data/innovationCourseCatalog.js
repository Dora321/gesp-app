export const innovationLessons = [
    [1, 'LED亮了'],
    [2, '闪烁密码'],
    [3, '谁按了按钮'],
    [4, '小屏幕说话了'],
    [5, 'AI错了'],
    [9, '彩虹灯带'],
    [10, '需求文档大挑战'],
].map(([id, title]) => ({
    id,
    title,
    path: `/innovation/${id}`,
    file: `第${String(id).padStart(2, '0')}课_${title}.html`,
}));

export function innovationLessonUrl(lesson) {
    return `${import.meta.env.BASE_URL}courseware/innovation/${encodeURIComponent(lesson.file)}`;
}
