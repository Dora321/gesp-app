// 2024年12月 GESP C++ 四级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l4',
    title: '2024年12月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "单调栈通常用于解决什么问题？",
            options: ["排序", "找下一个更大/更小元素", "区间查询", "字符串匹配"],
            answer: 1,
            score: 2,
            explanation: "单调栈可以在 O(n) 时间内找到每个元素的下一个更大/更小元素。"
        },
        {
            id: 2,
            type: 'single',
            question: "单调队列通常用于解决什么问题？",
            options: ["排序", "字符串匹配", "滑动窗口最值", "最短路径"],
            answer: 2,
            score: 2,
            explanation: "单调队列可以在 O(1) 时间内维护滑动窗口的最大/最小值。"
        },
        {
            id: 3,
            type: 'single',
            question: "双端队列 deque 的特点是？",
            options: ["只能在头部操作", "只能在尾部操作", "两端都能高效操作", "随机访问慢"],
            answer: 2,
            score: 2,
            explanation: "deque 支持在头尾两端 O(1) 插入和删除。"
        },
        {
            id: 4,
            type: 'judge',
            question: "单调栈处理完所有元素后，栈可能不为空。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "栈中剩余的元素表示它们后面没有更大/更小的元素了。"
        }
    ]
};
