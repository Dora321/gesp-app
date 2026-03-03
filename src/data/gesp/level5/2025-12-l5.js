// 2025年12月 GESP C++ 五级真题
export const paperData = {
    id: '2025-12-l5',
    title: '2025年12月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '计算几何中，判断点在多边形内常用？',
            options: [
                '叉积',
                '射线法',
                '点积',
                '距离公式'
            ],
            answer: 1,
            score: 2,
            explanation: '射线法从点引射线，统计与多边形边的交点数判断内外。',
            tags: [
                '基础概念'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '凸包的Graham扫描算法时间复杂度是？',
            options: [
                'O(n)',
                'O(n log n)',
                'O(n²)',
                'O(n³)'
            ],
            answer: 1,
            score: 2,
            explanation: '主要时间花在排序上，扫描过程只需O(n)。',
            tags: [
                '复杂度分析'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: '叉积可以判断点在直线的哪一侧。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '叉积的符号可以判断点相对于向量的位置关系。',
            tags: [
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: '两条线段是否相交可以用什么判断？',
            options: [
                '点积',
                '叉积和跨立实验',
                '距离',
                '夹角'
            ],
            answer: 1,
            score: 2,
            explanation: '用叉积判断两线段是否互相跨立对方所在直线。',
            tags: [
                '基础概念'
            ]
        }
    ]
};
