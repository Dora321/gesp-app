export const paperData = {
    id: '2024-03-l5', title: '2024年3月 GESP C++ 五级真题', level: 5, year: 2024, month: 3, session: 5, note: '2024年首场', timeLimit: 90 * 60, questions: [
        { id: 1, type: 'single', question: "状态压缩DP中，状态通常用什么表示？", options: ["数组", "二进制数", "链表", "字符串"], answer: 1, score: 2, explanation: "状压DP用二进制数的每一位表示一个状态，如是否访问过某点。" },
        { id: 2, type: 'single', question: "旅行商问题(TSP)的状压DP时间复杂度是？", options: ["O(n!)", "O(n²2ⁿ)", "O(n³)", "O(2ⁿ)"], answer: 1, score: 2, explanation: "状态数2ⁿ，每个状态枚举n个点，转移O(n)，共O(n²2ⁿ)。" },
        { id: 3, type: 'judge', question: "状压DP适合处理n较小(如n≤20)的问题。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "状态数是2ⁿ，n超过20时状态数过大，不适合状压。" },
        { id: 4, type: 'single', question: "子集枚举s的所有子集的技巧是？", options: ["for(t=s;t;t=(t-1)&s)", "for(t=0;t<s;t++)", "for(t=s;t>=0;t--)", "for(t=1;t<=s;t++)"], answer: 0, score: 2, explanation: "t=(t-1)&s可以高效枚举s的所有非空子集。" }
    ]
};
