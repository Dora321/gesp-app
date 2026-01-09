// 2023年9月 GESP C++ 七级真题
export const paperData = {
    id: '2023-09-l7',
    title: '2023年9月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在网络流中，一个可行流是最大流的充要条件是？",
            options: ["所有边都满流", "不存在增广路", "流量等于源点出度", "没有负权边"],
            answer: 1,
            score: 2,
            explanation: "根据最大流最小割定理，不存在增广路是最大流的必要充分条件。"
        }
    ]
};
