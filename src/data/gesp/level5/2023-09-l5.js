export const paperData = {
    id: '2023-09-l5', title: '2023年9月 GESP C++ 五级真题', level: 5, year: 2023, month: 9, session: 3, timeLimit: 90 * 60, questions: [
        { id: 1, type: 'single', question: "字典树(Trie)的主要应用是？", options: ["排序", "字符串前缀匹配", "图遍历", "动态规划"], answer: 1, score: 2, explanation: "Trie树用于高效存储和查找字符串，支持前缀匹配。" },
        { id: 2, type: 'single', question: "Trie树插入一个长度为m的字符串时间复杂度？", options: ["O(1)", "O(m)", "O(n)", "O(n*m)"], answer: 1, score: 2, explanation: "沿着字符串的字符依次插入，复杂度与字符串长度相关。" },
        { id: 3, type: 'judge', question: "Trie树可以用于实现自动补全功能。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "Trie天然支持前缀查找，非常适合自动补全。" },
        { id: 4, type: 'single', question: "AC自动机是什么的结合？", options: ["Trie+KMP", "Trie+BFS", "KMP+BFS", "DFS+DP"], answer: 0, score: 2, explanation: "AC自动机将Trie树与KMP的失配指针思想结合。" }
    ]
};
