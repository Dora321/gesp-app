// 2023年12月 GESP C++ 四级真题
export const paperData = {
    id: '2023-12-l4',
    title: '2023年12月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '并查集的主要操作是？',
            options: [
                '插入和删除',
                '查找和合并',
                '排序和查找',
                '入栈和出栈'
            ],
            answer: 1,
            score: 2,
            explanation: '并查集支持查找(Find)元素所在集合和合并(Union)两个集合。',
            tags: [
                '图论'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '路径压缩优化后，并查集的查找时间复杂度接近？',
            options: [
                'O(n)',
                'O(log n)',
                'O(1)',
                'O(n²)'
            ],
            answer: 2,
            score: 2,
            explanation: '路径压缩使查找几乎为常数时间，严格来说是 O(α(n))，约等于 O(1)。',
            tags: [
                '复杂度分析',
                '图论'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: 'Kruskal 算法使用什么数据结构判断是否形成环？',
            options: [
                '栈',
                '队列',
                '并查集',
                '堆'
            ],
            answer: 2,
            score: 2,
            explanation: 'Kruskal 用并查集判断两个顶点是否已在同一集合，避免形成环。',
            tags: [
                '图论'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: '按秩合并可以优化并查集的效率。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '按秩合并将矮的树合并到高的树下，保持树的平衡。',
            tags: [
                '图论',
                '树与数据结构',
                '判断题'
            ]
        }
    ]
};
