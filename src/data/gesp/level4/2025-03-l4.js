// 2025年3月 GESP C++ 四级真题 (第9次认证)
export const paperData = {
    id: '2025-03-l4',
    title: '2025年3月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "树的直径是指？",
            options: ["树的高度", "树中最长的路径", "根节点的度", "叶子节点数"],
            answer: 1,
            score: 2,
            explanation: "树的直径是树中任意两点之间最长路径的长度。"
        },
        {
            id: 2,
            type: 'single',
            question: "求树的直径通常用什么方法？",
            options: ["排序", "两次 BFS/DFS", "拓扑排序", "并查集"],
            answer: 1,
            score: 2,
            explanation: "第一次从任意点找最远点 u，第二次从 u 找最远点 v，u-v 就是直径。"
        },
        {
            id: 3,
            type: 'single',
            question: "树形 DP 的遍历顺序通常是？",
            options: ["从根到叶", "从叶到根", "层次遍历", "随机顺序"],
            answer: 1,
            score: 2,
            explanation: "树形 DP 通常自底向上，先处理子树再处理父节点。"
        },
        {
            id: 4,
            type: 'judge',
            question: "树的重心是使最大子树最小的节点。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "删除重心后，剩余各子树中最大的那棵尽可能小。"
        }
    ]
};
