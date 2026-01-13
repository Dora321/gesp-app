export const paperData = {
    id: '2023-12-l5', title: '2023年12月 GESP C++ 五级真题', level: 5, year: 2023, month: 12, session: 4, note: '年度收官', timeLimit: 90 * 60, questions: [
        { id: 1, type: 'single', question: "哈希冲突的解决方法不包括？", options: ["链地址法", "开放定址法", "再哈希法", "快速排序"], answer: 3, score: 2, explanation: "快速排序是排序算法，不是解决哈希冲突的方法。" },
        { id: 2, type: 'single', question: "双哈希的目的是？", options: ["加速查询", "减少冲突概率", "节省空间", "简化实现"], answer: 1, score: 2, explanation: "使用两个不同的哈希函数可以大大降低冲突概率。" },
        { id: 3, type: 'judge', question: "哈希表的平均查找时间复杂度是O(1)。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "理想情况下哈希表查找是O(1)，最坏O(n)。" },
        { id: 4, type: 'single', question: "字符串哈希常用的模数是？", options: ["任意质数", "大质数如1e9+7", "2的幂", "合数"], answer: 1, score: 2, explanation: "大质数可以减少哈希冲突，1e9+7是常用选择。" }
    ]
};
