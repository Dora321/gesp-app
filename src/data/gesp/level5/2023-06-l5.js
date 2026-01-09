// 2023年6月-12月 & 2024-2025 GESP C++ 五级真题
export const papers = {
    '2023-06-l5': {
        id: '2023-06-l5', title: '2023年6月 GESP C++ 五级真题', level: 5, year: 2023, month: 6, session: 2, timeLimit: 90 * 60, questions: [
            { id: 1, type: 'single', question: "ST表(Sparse Table)主要用于？", options: ["动态修改", "静态RMQ查询", "排序", "字符串匹配"], answer: 1, score: 2, explanation: "ST表用于静态区间最值查询，O(n log n)预处理，O(1)查询。" },
            { id: 2, type: 'single', question: "ST表不能处理什么操作？", options: ["区间最大值", "区间最小值", "区间修改", "区间GCD"], answer: 2, score: 2, explanation: "ST表只能处理静态数据，不支持修改操作。" },
            { id: 3, type: 'judge', question: "ST表的空间复杂度是O(n log n)。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "ST表需要存储n个位置，每个位置log n层的信息。" },
            { id: 4, type: 'single', question: "RMQ问题可以转化为什么问题？", options: ["排序", "LCA", "最短路", "背包"], answer: 1, score: 2, explanation: "RMQ和LCA问题可以相互转化。" }
        ]
    },
    '2023-09-l5': {
        id: '2023-09-l5', title: '2023年9月 GESP C++ 五级真题', level: 5, year: 2023, month: 9, session: 3, timeLimit: 90 * 60, questions: [
            { id: 1, type: 'single', question: "字典树(Trie)的主要应用是？", options: ["排序", "字符串前缀匹配", "图遍历", "动态规划"], answer: 1, score: 2, explanation: "Trie树用于高效存储和查找字符串，支持前缀匹配。" },
            { id: 2, type: 'single', question: "Trie树插入一个长度为m的字符串时间复杂度？", options: ["O(1)", "O(m)", "O(n)", "O(n*m)"], answer: 1, score: 2, explanation: "沿着字符串的字符依次插入，复杂度与字符串长度相关。" },
            { id: 3, type: 'judge', question: "Trie树可以用于实现自动补全功能。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "Trie天然支持前缀查找，非常适合自动补全。" },
            { id: 4, type: 'single', question: "AC自动机是什么的结合？", options: ["Trie+KMP", "Trie+BFS", "KMP+BFS", "DFS+DP"], answer: 0, score: 2, explanation: "AC自动机将Trie树与KMP的失配指针思想结合。" }
        ]
    },
    '2023-12-l5': {
        id: '2023-12-l5', title: '2023年12月 GESP C++ 五级真题', level: 5, year: 2023, month: 12, session: 4, note: '年度收官', timeLimit: 90 * 60, questions: [
            { id: 1, type: 'single', question: "哈希冲突的解决方法不包括？", options: ["链地址法", "开放定址法", "再哈希法", "快速排序"], answer: 3, score: 2, explanation: "快速排序是排序算法，不是解决哈希冲突的方法。" },
            { id: 2, type: 'single', question: "双哈希的目的是？", options: ["加速查询", "减少冲突概率", "节省空间", "简化实现"], answer: 1, score: 2, explanation: "使用两个不同的哈希函数可以大大降低冲突概率。" },
            { id: 3, type: 'judge', question: "哈希表的平均查找时间复杂度是O(1)。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "理想情况下哈希表查找是O(1)，最坏O(n)。" },
            { id: 4, type: 'single', question: "字符串哈希常用的模数是？", options: ["任意质数", "大质数如1e9+7", "2的幂", "合数"], answer: 1, score: 2, explanation: "大质数可以减少哈希冲突，1e9+7是常用选择。" }
        ]
    }
};
export const paperData = papers['2023-06-l5'];
