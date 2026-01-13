// 2023年3月 GESP C++ 八级真题
export const paperData = {
    id: '2023-03-l8',
    title: '2023年3月 GESP C++ 八级真题',
    level: 8,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在计算几何中，判断两个凸多边形是否相交的高效算法是？",
            options: ["GJK 算法", "暴力检查每条边", "射线法", "快速排斥实验"],
            answer: 0,
            score: 2,
            explanation: "GJK 算法利用闵可夫斯基差（Minkowski Difference）将多边形相交判定转化为判断原点是否在差集内，效率极高。"
        }
    ]
};
