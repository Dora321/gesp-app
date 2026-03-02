// 2025年9月 GESP C++ 二级真题 (第11次认证)
export const paperData = {
    id: '2025-09-l2',
    title: '2025年9月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
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
            question: "在 TCP 协议中，完成连接建⽴需要通过（ ）握⼿。",
            options: ["一次", "二次", "三次", "四次"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯的 C++ 代码用于输入姓名，然后输出姓名，正确的说法是 （ ） 。",
            options: ["XingMing 是汉语拼⾳，不能作为变量名称", "可以将 XingMing 改为 Xing Ming", "可以将 XingMing 改为 xingming", "可以将 XingMing 改为 Xing-Ming"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码用于获得正整数 N 的第 M 位数，如 N 等于 1234 ， M 等于 2 ，则输出 3。此题假设 M 的值大于等于 1 且小于等于 N 的位数。横线处应填入的代码是 （ ） 。 string XingMing; cout << \" 请输入您的姓名： \"; cin >> XingMing; cout << XingMing;。",
            options: ["N % div / 10", "N / div / 10", "N % div % 10", "N / div % 10"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["3 4 0", "3 3 3", "4 4 4", "以上都不对"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "某种编号的规则是“XX-Y”，其中XX从00到11，Y从0到9。第1个编号是00-0，第2个编号是01-1，…，第12个 编号11-1，第13个编号00-2，即其编码规则是XX和Y同时增1，到XX到11时下一个变为00，Y到9时，下一个变为0。 下⾯的C++代码用于⽣成第N个编号，横线处应填上的代码是（ ）。",
            options: ["12 10", "10 10", "11 9", "9 9"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的C++代码执行后其输出是（ ）。",
            options: ["145 int N, M, div=1; cout << \"请输入一个正整数：\"; cin >> N; cout <<\"请输入从右到左取第几位数：\"; cin >> M; for (int i =0; i < (M - 1); i++) div *= 10; cout << (_…", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯C++代码执行后其输出是（ ）。",
            options: ["（选项提取异常）", "（选项提取异常）", "不确定", "⽆输出"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "阅读下⾯的C++代码，其中变量都是整型，则说法正确的是（ ）。",
            options: ["b 不能为 0 ，因为 a % b 将导致错误", "a 必须小于 b ，否则 a % b 将导致错误", "a 和 b 都必须为正整数，否则 a % b 将导致错误", "如果 a 输入为 0 ，则不管 b 的输入值是什么，输出值的绝对值都是 abs(b)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯C++代码执行后输出是（ ）。",
            options: ["1#2#4#5#6#", "1#2#4#5#6", "1#2#3#4#5#6#", "1#2#3#4#5#6 -999 则输入结束），相关说法错误的是（"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯C++代码用于记录多个输入数中的最大数和最小数（输入 ）。 for (i =1; i < 12; i++){ if (i % 2 == 0) continue; for (j = 0; j < i; j++) if (i * j % 2) break; } if(i>= 12) cout << (i * j); cin >>a >> b; while (b != 0){ remainder = a % b; a = b; b = remainder; } cout <<…",
            options: ["程序运行时如果第一个数输入 -999 ，则输出将是 -999 -999", "程序输入过程中，如果输入的第一个数不是 -999 ，则如果待输入的数据中没有 -999 ，则程序能求出已输 入整数中的最大数和最小数", "如果用于输入考试成绩，即成绩中不可能有 -999 ，则程序能求出已输入成绩中的最⾼成绩和最低成绩", "可以将 cin >> now_num; 移动到 while (now_num != -999) { 下⾯，结果不变"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯C++代码执行后输出与 5 有关数的数量。“与 5 有关的数”定义为含有 5 或者能被 5 整除的数。相关说法 正确的是（ ）。",
            options: ["删除代码中 continue 不影响程序执行结果", "删除 j = i 并将 while 循环内的j修改为 i ，不影响程序执行结果", "代码中 break 修改为 j = 0 ，不影响程序执行结果", "将 while (j > 0) 修正为 while (j >= 0) 不影响程序执行的结果"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯C++代码实现输出如下图形，应该在横线处填入的代码是（ ）。 cin >> now_num; _ _ _ while (now_num != -999) min num = max num = now num; { if (max_num < now_num) max_num = now_num; if (min_num > now_num) min_num = now_num; cin >> now_num; } cout << min_num << ' ' << ma…",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 14,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["196 -1", "27 9", "98 97", "不确定"],
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
            answer: 3,
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
            question: "在C++代码中，假设N为正整数且大于100，则 N / 100 将舍弃个位和⼗位，如N为1234则 cout << (N / 100) 将输出 12 。如果N小于100，则其值为 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 18,
            type: 'judge',
            question: "下列C++代码执行后将输出 1 ，因为 a 确实小于 20 和 10。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 19,
            type: 'judge',
            question: "下⾯的C++代码中变量都是整型，则执行后将输出 1 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯C++代码执行时如输入 99.99 ，将输出 及格 两个汉字。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "执行下⾯的C++代码时输入 123 ，则输出是 DCB 。 G = (N - 1) / 9; // L1 R = (N - 1) % 9; // L2: 保存余数 wc += 36*G; if((1 <= R) && (R <= 4)) wc += 3*R; // L3 else if ((5 <= R) && (R <= 7)) wc += 4*R; //…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "条件判断", "输入输出"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 +#+#3#。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下列 C++ 代码用于求斐波那契数列，即第 1 个数 0 ，第 2 个数 1 ，从第三个数开始，是前两个数之和。如果输入 的值为大于 1 的正整数，该代码能实现。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯的 C++ 不能实现如下输出，但如果将 L1 标记的cout << 0行移动if块外⾯，或者说移动到 L2 标记 行，则可以。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "条件判断", "输入输出"]
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
