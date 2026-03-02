// 2023年9月 GESP C++ 二级真题 (第3次认证)
export const paperData = {
    id: '2023-09-l2',
    title: '2023年9月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "第1题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "下列流程图的输出结果是（ ）？",
            options: ["5 12", "12 5", "5 5", "12 12"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 3,
            type: 'single',
            question: "如果要找出整数a.b 中较大一个，通常要用下⾯哪种程序结构？（ ）。",
            options: ["顺序结构", "循环结构", "分⽀结构", "跳转结构"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "以下不是 C++ 关键字的是（ ）。",
            options: ["continue", "cout", "break", "goto"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 5,
            type: 'single',
            question: "C++ 表达式int(-123.123 / 10)的值是（ ）。",
            options: ["-124", "-123", "-13", "-12"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 6,
            type: 'single',
            question: "以下 C++ 代码实现从大到小的顺序输出N 的所有因⼦。例如，输入N = 18时输出18 9 6 3 2 1，横线处 应填入（ ）。",
            options: ["; ;", "int i = 1; i < N; i++", "int i = N; i > 0; i--", "int i = N; i > 1; i--"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "如下图所示，输出N 行N 列的矩阵，对角线为 1 ，横线处应填入（ ）。",
            options: ["i = j", "j != j", "i >= j", "i == j"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码用于判断N 是否为质数（素数），约定输入N 为大于等于 2 的正整数，请在横线处填入合适的 代码（ ）。",
            options: ["break", "continue", "exit", "return"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "数学逻辑", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["1#0", "1#", "1#1#1#1#1#1", "1#1#1#1#1#1#0"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "没有输出"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（选项提取异常）", "3,9,11", "3,6,9,10", "1,5,7,11,13,15"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯图形每一行从字母 A 开始，以 ABC ⽅式重复。行数为输入的整数。请在 C++ 代码段横线处填入合适代码 （ ）。",
            options: ["'A' + j / 3", "(char)('A' + j / 3)", "'A' + j % 3", "(char)('A' + j % 3)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "输入行数，约定 ，输出以下图形。应在 C++ 代码横线处填入（ ）。",
            options: ["(lineCount - i - 1) * 2", "(lineCount - i) * 2", "lineCount - i - 1", "lineCount - i"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "第15题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "第1题（提取待人工校对）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 17,
            type: 'judge',
            question: "神威 · 太湖之光超级计算机是中国⾃主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜 ⾸。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式7.8 / 2的值为3.9，类型为float。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 表达式(2 * 3) || (2 + 5)的值为67。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "条件判断"]
        },
        {
            id: 20,
            type: 'judge',
            question: "如果m 和n为int类型变量，则执行for (m = 0, n = 1; n < 9; ) n = ((m = 3 * n, m + 1), m - 1);之后n的值为偶数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "循环", "变量与标识符"]
        },
        {
            id: 21,
            type: 'judge',
            question: "如果a为int类型的变量，则表达式(a >= 5 && a <= 10)与(5 <= a <= 10)的值总是相同的。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "条件判断", "变量与标识符"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出为10。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "执行以下 C++ 代码后的输出为0。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "执行以下 C++ 代码后的输出为30。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 25,
            type: 'judge',
            question: "第10题（提取待人工校对）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        }
    ]
};
