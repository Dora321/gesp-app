// 2024年3月 GESP C++ 八级真题
export const paperData = {
    id: '2024-03-l8',
    title: '2024年3月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "卢卡斯（Lucas）定理主要解决的是？",
            options: ["组合数取大质数模", "求解线性同余方程组", "判定大素数", "求逆元"],
            answer: 0,
            score: 2,
            explanation: "Lucas 定理用于在模 p（p为质数）意义下高效计算组合数 C(n, m)，尤其当 n, m 很大而 p 较小时。"
        }
    ]
};
