// 2025年6月 GESP C++ 三级真题 (第10次认证)
export const paperData = {
    id: '2025-06-l3',
    title: '2025年6月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "完全二叉树用数组存储时，节点 i 的左孩子下标是？",
            options: ["i+1", "2i", "2i+1", "i/2"],
            answer: 2,
            score: 2,
            explanation: "从 0 开始编号时，左孩子是 2i+1，右孩子是 2i+2，父节点是 (i-1)/2。"
        },
        {
            id: 2,
            type: 'single',
            question: "二叉树的前序遍历顺序是？",
            options: ["左-根-右", "根-左-右", "左-右-根", "根-右-左"],
            answer: 1,
            score: 2,
            explanation: "前序：根-左-右；中序：左-根-右；后序：左-右-根。"
        },
        {
            id: 3,
            type: 'single',
            question: "满二叉树深度为 h 时，节点数是？",
            options: ["h", "2h", "2^h - 1", "2^(h-1)"],
            answer: 2,
            score: 2,
            explanation: "满二叉树每层都是满的，共 1+2+4+...+2^(h-1) = 2^h - 1 个节点。"
        },
        {
            id: 4,
            type: 'judge',
            question: "二叉搜索树的中序遍历是有序的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "BST 的性质决定了中序遍历会得到升序序列。"
        }
    ]
};
