// 2024年3月 GESP C++ 七级真题
export const paperData = {
    id: '2024-03-l7',
    title: '2024年3月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二分图最大匹配可以转化为什么问题求解？",
            options: ["最短路", "最大流", "最小生成树", "拓扑排序"],
            answer: 1,
            score: 2,
            explanation: "通过建立超级源点和超级汇点，将边权设为1，二分图最大匹配等价于该网络的最大流。"
        }
    ]
};
