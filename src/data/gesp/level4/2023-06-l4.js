// 2023年6月 GESP C++ 四级真题
export const paperData = {
    id: '2023-06-l4',
    title: '2023年6月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '图的邻接矩阵存储的空间复杂度是？',
            options: [
                'O(V)',
                'O(E)',
                'O(V²)',
                'O(V+E)'
            ],
            answer: 2,
            score: 2,
            explanation: '邻接矩阵需要 V×V 的二维数组，空间复杂度 O(V²)。',
            tags: [
                '复杂度分析',
                '图论'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '图的邻接表存储的空间复杂度是？',
            options: [
                'O(V)',
                'O(E)',
                'O(V²)',
                'O(V+E)'
            ],
            answer: 3,
            score: 2,
            explanation: '邻接表需要 V 个链表头和 E 条边，空间复杂度 O(V+E)。',
            tags: [
                '复杂度分析',
                '图论'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: '拓扑排序适用于什么类型的图？',
            options: [
                '无向图',
                '有向无环图(DAG)',
                '完全图',
                '带权图'
            ],
            answer: 1,
            score: 2,
            explanation: '拓扑排序只能用于有向无环图(DAG)，用于确定任务执行顺序。',
            tags: [
                '图论',
                '程序分析'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: '有向图中存在环，则无法进行拓扑排序。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '拓扑排序要求图是有向无环图，有环则无法排序。',
            tags: [
                '图论',
                '判断题'
            ]
        }
    ]
};
