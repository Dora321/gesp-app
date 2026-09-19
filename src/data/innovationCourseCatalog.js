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
    path: `/hardware/esp32/${id}`,
    file: `第${String(id).padStart(2, '0')}课_${title}.html`,
}));

export const foundationLessons = [
    {
        "id": 1,
        "title": "让小灯亮起来",
        "path": "/innovation-foundation/1",
        "file": "第01课_让小灯亮起来/index.html"
    },
    {
        "id": 2,
        "title": "两根线都要接",
        "path": "/innovation-foundation/2",
        "file": "第02课_两根线都要接/index.html"
    },
    {
        "id": 3,
        "title": "两个灯一起亮",
        "path": "/innovation-foundation/3",
        "file": "第03课_两个灯一起亮/index.html"
    },
    {
        "id": 4,
        "title": "面包板探险",
        "path": "/innovation-foundation/4",
        "file": "第04课_面包板探险/index.html"
    },
    {
        "id": 5,
        "title": "画出电的路线",
        "path": "/innovation-foundation/5",
        "file": "第05课_画出电的路线/index.html"
    },
    {
        "id": 6,
        "title": "我来控制这盏灯",
        "path": "/innovation-foundation/6",
        "file": "第06课_我来控制这盏灯/index.html"
    },
    {
        "id": 7,
        "title": "什么材料能让灯亮",
        "path": "/innovation-foundation/7",
        "file": "第07课_什么材料能让灯亮/index.html"
    },
    {
        "id": 8,
        "title": "铅笔芯让灯变暗",
        "path": "/innovation-foundation/8",
        "file": "第08课_铅笔芯让灯变暗/index.html"
    },
    {
        "id": 9,
        "title": "断电了灯还亮着",
        "path": "/innovation-foundation/9",
        "file": "第09课_断电了灯还亮着/index.html"
    },
    {
        "id": 10,
        "title": "延时小夜灯",
        "path": "/innovation-foundation/10",
        "file": "第10课_延时小夜灯/index.html"
    },
    {
        "id": 11,
        "title": "铁钉变成磁铁",
        "path": "/innovation-foundation/11",
        "file": "第11课_铁钉变成磁铁/index.html"
    },
    {
        "id": 12,
        "title": "磁能变电吗",
        "path": "/innovation-foundation/12",
        "file": "第12课_磁能变电吗/index.html"
    },
    {
        "id": 13,
        "title": "造一个小发电机",
        "path": "/innovation-foundation/13",
        "file": "第13课_造一个小发电机/index.html"
    },
    {
        "id": 14,
        "title": "小型发电站上",
        "path": "/innovation-foundation/14",
        "file": "第14课_小型发电站上/index.html"
    },
    {
        "id": 15,
        "title": "小型发电站下",
        "path": "/innovation-foundation/15",
        "file": "第15课_小型发电站下/index.html"
    }
];

export const scienceCourses = {
    advanced: {
        title: 'ESP32 MicroPython 高阶科创', shortTitle: '高阶科创',
        path: '/hardware/esp32-curriculum', assetDirectory: 'innovation',
        description: '用 MicroPython 与 AI 完成 ESP32 硬件项目，在实践中读懂代码、验证想法、表达需求。',
        updateNote: '目前已上线第 1–5、9、10 课，保留原课号。其余网页课件将陆续补充。',
        lessons: innovationLessons,
    },
    foundation: {
        title: '初阶科创', shortTitle: '初阶科创',
        path: '/innovation-foundation', assetDirectory: 'innovation-foundation',
        description: '从点亮小灯开始，动手探索电路、导电材料、电与磁，逐步完成自己的小型发电站。',
        updateNote: '15 节科创探究课，按第 1–15 课顺序学习。',
        lessons: foundationLessons,
    },
};

export function innovationLessonUrl(lesson, courseId = 'advanced') {
    const course = scienceCourses[courseId];
    return `${import.meta.env.BASE_URL}courseware/${course.assetDirectory}/${lesson.file.split('/').map(encodeURIComponent).join('/')}`;
}
