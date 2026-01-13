// 2023年9月 GESP C++ 三级真题 (第3次认证)
export const paperData = {
    id: '2023-09-l3',
    title: '2023年9月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "求最大公约数常用的算法是？",
            options: ["欧几里得算法", "牛顿迭代法", "二分法", "贪心算法"],
            answer: 0,
            score: 2,
            explanation: "欧几里得算法（辗转相除法）是求最大公约数的经典算法：gcd(a,b) = gcd(b, a%b)。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个不是线性数据结构？",
            options: ["数组", "链表", "栈", "二叉树"],
            answer: 3,
            score: 2,
            explanation: "二叉树是非线性（树形）数据结构。"
        },
        {
            id: 3,
            type: 'single',
            question: "埃拉托斯特尼筛法用于？",
            options: ["排序", "查找素数", "求最大值", "字符串匹配"],
            answer: 1,
            score: 2,
            explanation: "埃氏筛是高效找出一定范围内所有素数的算法。"
        },
        {
            id: 4,
            type: 'judge',
            question: "O(n) + O(n²) = O(n²)。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "大O表示法只保留最高阶项，O(n) + O(n²) = O(n²)。"
        }
    ]
};
