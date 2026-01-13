// 2025年12月 GESP C++ 八级真题
export const paperData = {
    id: '2025-12-l8',
    title: '2025年12月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在计算几何中，三维凸包的交可以通过什么降维处理？",
            options: ["投影到平面", "切片法", "二分查找", "不需要降维"],
            answer: 0,
            score: 2,
            explanation: "三维计算几何通常涉及更复杂的半平面交扩展或直接三维增量法。投影是常用手段之一。"
        }
    ]
};
