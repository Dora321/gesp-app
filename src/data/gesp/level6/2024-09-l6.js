// 2024年9月 GESP C++ 六级真题
export const paperData = {
    id: '2024-09-l6',
    title: '2024年9月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '在 C++ STL 中，std::priority_queue 默认是？',
            options: [
                '最小堆',
                '最大堆',
                '双端队列',
                '循环队列'
            ],
            answer: 1,
            score: 2,
            explanation: 'std::priority_queue 默认使用 less 比较器，即最大堆，顶部是最大元素。',
            tags: [
                '算法综合'
            ]
        }
    ]
};
