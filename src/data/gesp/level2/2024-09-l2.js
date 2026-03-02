// 2024年9月 GESP C++ 二级真题 (第7次认证)
export const paperData = {
    id: '2024-09-l2',
    title: '2024年9月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "（原卷题面缺失：第1题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "IPv4 版本的因特⽹总共有（ ）个 A 类地址⽹络。",
            options: ["（该选项文本提取异常，待按原卷补录）", "200 万", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "在 C++ 中，下列不可做变量的是 （ ） 。",
            options: ["ccf-gesp", "ccf_gesp", "ccfGesp", "_ccfGesp"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: "在 C++ 中，与for (int i = 1; i < 10; i++)效果相同的是 （ ） 。",
            options: ["for (int i = 0; i < 10; i++)", "for (int i = 0; i < 11; i++)", "for (int i = 1; i < 10; ++i)", "for (int i = 0; i < 11; ++i)"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环"]
        },
        {
            id: 5,
            type: 'single',
            question: "在 C++ 中，cout << (5 / 2 + 5 % 3)的输出是 （ ） 。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: "假定变量 a 和 b 可能是整型.字符型或浮点型，则下⾯ C++ 代码执行时先后输入-2和3.14后，其输出不可能 是 （ ） 。 [ 已知字符'+' . '-' . '='的 ASCII 码值分别是 43 . 45 和 61]。",
            options: ["（该选项文本提取异常，待按原卷补录）", "1.14", "（该选项文本提取异常，待按原卷补录）", "将触发异常"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "变量与标识符", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "在 C++ 代码中假设 N 为正整数，则下⾯代码能获得个位数的是（ ）。",
            options: ["N % 10", "N / 10", "N && 10", "以上选项均不正确"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["0#", "1#", "0#0#1", "没有输出"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "执行下⾯ C++ 代码并输入 1 和 0 ，有关说法正确的是（ ）。 cin >> a; cin >> b; cout << (a + b); int i; for (i = 0; i < 10; i++){ if (i % 2) break; cout << \"0#\"; } if(i==10) cout << \"1#\";。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下图是 C++ 程序执行后的输出。为实现其功能，横线处应填入代码是（ ）。",
            options: ["j = i; j < i; j++ int a,b; cin >> a >> b; if(a&&b) cout << (\"1\"); else if(!(a||b)) cout << (\"2\"); else if(a || b) cout << (\"3\"); else cout <…", "j = 1; j < i; j++", "j = i; j < i*2; j++", "j = i+1; j < i+i; j++"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出逆序数，如输入123则输出321。如输入120则输出21。横线处先后应填入的 代码是（ ） 。",
            options: ["rst = rst * 10 + N % 10 N = N / 10", "rst += N % 10 N = N / 10", "rst = rst * 10 + N / 10 N = N % 10", "rst += N / 10 N = N % 10"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯的 C++ 代码用于输入学⽣成绩，并根据⼈数计算出平均成绩，有关说法错误的是（ ）。",
            options: ["代码while (1)写法错误", "如果输入负数，将结束输入，并正确输出", "如果输入的学⽣成绩含有小数，程序将⽆法正常执行", "变量int score初始值不确定，但不影响程序执行"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "以下 C++ 代码判断输入的正整数是否为质数，如果该数字是质数，则输出YES，否则输出NO。质数是指仅 能被 1 和它本⾝整除的正整数。请在横线上填写代码。（ ） int N; cin >> N; int rst = 0; while (N){ ____________________; ____________________; } cout << (rst); float Sum = 0; // 保存总成绩 int cnt = 0; // 保存学生人数 while (1)…",
            options: ["num % i", "num % i == 0", "num / i", "num / i == 0"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "输入输出", "运算符"]
        },
        {
            id: 15,
            type: 'single',
            question: "（原卷题面缺失：第15题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "（原卷题面缺失：第1题，待补录）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 17,
            type: 'judge',
            question: "在 C++ 中，cout << (3, 4, 5)可以输出3 4 5，且每个输出项之间用空格分开。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式12 % 10 % 10的值为 2 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 语句cout << rand << ' ' << rand;的第二个输出值较大。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 20,
            type: 'judge',
            question: "定义 C++ 的int类型的变量ch，⽽且值为'1'，则语句cout << int(ch);的输出为1。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "变量与标识符"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 10 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码能求整数 N 和 M 之间所有整数之和，包含 N 和 M 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "将下⾯ C++ 代码中的L3标记的代码行调整为for (int i = 0; i < 5; i++)后输出结果相同。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "输入输出"]
        },
        {
            id: 24,
            type: 'judge',
            question: "某一系列数据的规律是从第 3 个数值开始是前两个数之和。下⾯的代码求第 N 个数的值， N 限定为大于 2 。（ ） int i; for (i = 0; i < 10; i++) continue; if(i == 10) cout << i; int N, M, Sum; cin >> N >> M; if (N > M){ int tmp = N; N…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "条件判断"]
        },
        {
            id: 25,
            type: 'judge',
            question: "（原卷题面缺失：第10题，待补录）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        }
    ]
};
