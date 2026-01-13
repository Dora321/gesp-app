// 2023年3月 GESP C++ 六级真题
export const paperData = {
    id: '2023-03-l6',
    title: '2023年3月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二叉搜索树（BST）的中序遍历序列一定是？",
            options: ["升序序列", "降序序列", "先升后降", "无序"],
            answer: 0,
            score: 2,
            explanation: "根据二叉搜索树的性质，左子树 < 根 < 右子树，因此中序遍历（左-根-右）得到的是升序序列。"
        },
        {
            id: 2,
            type: 'single',
            question: "在哈夫曼树中，如果有 n 个叶子节点，则总节点数为？",
            options: ["2n", "2n-1", "2n+1", "n²"],
            answer: 1,
            score: 2,
            explanation: "哈夫曼树是严格二叉树（没有度为1的节点）。根据二叉树性质，n2 = n0 - 1，总节点数 n = n0 + n2 = n0 + n0 - 1 = 2n0 - 1。"
        }
    ]
};
