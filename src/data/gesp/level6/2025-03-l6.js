// 2025年3月 GESP C++ 六级真题
export const paperData = {
    id: '2025-03-l6',
    title: '2025年3月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在完全二叉树中，节点 i 的父节点下标（从1开始计数）为？",
            options: ["2i", "2i+1", "i/2 (向下取整)", "i-1"],
            answer: 2,
            score: 2,
            explanation: "根据完全二叉树性质，若根为1，则节点 i 的父节点为 floor(i/2)。"
        }
    ]
};
