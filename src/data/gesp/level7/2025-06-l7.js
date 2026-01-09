// 2025年6月 GESP C++ 七级真题
export const paperData = {
    id: '2025-06-l7',
    title: '2025年6月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二分图最小点覆盖数等于？",
            options: ["最大匹配数", "最大独立集数", "顶点数 - 最大匹配数", "边数 - 最大匹配数"],
            answer: 0,
            score: 2,
            explanation: "根据柯尼希（König）定理，二分图的最小点覆盖数等于其最大匹配数。"
        }
    ]
};
