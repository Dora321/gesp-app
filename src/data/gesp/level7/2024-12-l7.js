// 2024年12月 GESP C++ 七级真题
export const paperData = {
    id: '2024-12-l7',
    title: '2024年12月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在求解最大流问题时，增广路算法中‘反向弧’的作用是？",
            options: ["增加流量", "减少流量", "提供悔错机会", "防止死循环"],
            answer: 2,
            score: 2,
            explanation: "反向弧允许流量‘回退’，从而让原本分配给某条路径的流量流向更优的路径，是贪心寻找增广路能达到最大流的关键。"
        }
    ]
};
