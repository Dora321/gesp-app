// 2024年12月 GESP C++ 二级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "第1题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "计算机系统中存储的基本单位用 B 来表示，它代表的是（ ），⽐如某个照⽚大小为 3MB 。",
            options: ["Byte", "Block", "Bulk", "Bit"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "C++ 语句cout << (3 + 3 % 3 * 2 - 1)执行后输出的值是（ ）。",
            options: ["-1", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符"]
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 （ ） 。",
            options: ["（选项提取异常）", "（选项提取异常）", "12345678910 for (int i=0; i<10; i++) printf(\"%d\",i);", "（选项提取异常）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯ C++ 代码的相关说法中，正确的是 （ ） 。",
            options: ["上述代码执行后其输出相当于求 1-10 的和（包含 10 ）", "上述代码执行后其输出相当于求 1-10 的和（不包含 10 ）", "上述代码执行后其输出相当于求 0-10 的和（不包含 10 ）", "上述代码执行后将输出不确定的值"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["0#0#0#0#0#0#0#1#", "0#0#0#0#0#0#1#", "0#0#0#0#1#", "0#0#0#0#"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码用于输出 0-100 之前（包含 100 ）能被 7 整除但不能被 3 整除的数，横线处 填入的代码是（ ）。 不能 int tnt; for (int i=0; i<10; i++) tnt += i; cout << tnt; int i; for (i=1; i<10; i++) if (i % 2) continue; else break; cout << i; for (i=0; i<10; i++){ if (i % 3) continue…",
            options: ["i % 7 == 0 && i % 3 != 0", "!(i % 7) && i % 3 != 0", "i % 7 && i % 3", "i % 7 == 0 && !(i % 3 == 0)"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码用于求正整数各位数字之和，横线处 填入代码是（ ）。不应。",
            options: ["tnt = tnt + N % 10", "tnt += N % 10", "tnt = N % 10 + tnt", "tnt = N % 10"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下图的 C++ 程序执行后的输出是（ ）。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码用于实现图示的九九乘法表。相关说法 的是（ ） 。错误 for (i=0; i<100; i++) if(_____________) cout << i << endl; int tnt, N; printf(\" 请输入正整数： \"); cin >> N; tnt = 0; while (N != 0){ ________________ N /= 10; } cout <<tnt; for (i=0; i<5; i++) for (j=0; j<i; j…",
            options: ["将 L1 注释的printf(\"\\n\")移到 L2 注释所在行，效果相同", "将 L1 注释的printf(\"\\n\")修改为print(\"%c\", '\\n')效果相同", "将Lie * Hang > 9修改为Lie * Hang >= 10效果相同", "将Lie * Hang > 9修改为Hang * Lie > 9效果相同"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 12,
            type: 'single',
            question: "在数学中 N! 表示 N 的阶乘，即 1 到 N 的乘积，如3!=1*2*3。下⾯的 C++ 用于求 1-N 的阶乘之和，如 N 为 3 ，则 是1!+2!+3!。下⾯代码段补充选项后用于实现上述功能， 实现阶乘和的选项是（ ）。其中不能。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81 */ for (int Hang=1; Hang<10; Hang++){ for (int Lie=1; Lie<Hang+1; Lie++){ if (…"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯ C++ 代码用于输出 N 和 M 之间（可以包括 N 和 M ）的孪⽣素数。孪⽣素数是指间隔为 2 的两个数均为素 数，如 11 和 13 分别是素数，且间隔为 2 。 isPrime(N) 用于判断 N 是否为素数的函数。为完成上述功能，横线处应填上的 代码是（ ）。",
            options: ["M - 2", "M - 1", "M", "M + 1"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "数学逻辑", "程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "下⾯ C++ 代码实现输出如下图形，横线应填入的代码是（ ）。",
            options: ["nowNum = nowNum + i; tnt *= nowNum; int N,M; // 本题假设 N 小于 M cin >> N >> M; for (int i = N; i < __________; i++) if (isPrime(i) && isPrime(i…", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "第15题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 2,
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
            question: "在 C++ 代码中，假设 N 为正整数，则cout << (N - N / 10 * 10)将获得 N 的个位数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 18,
            type: 'judge',
            question: "在 C++ 语句cout << (10 <= N <= 12)中，假设 N 为 12 ，则其输出为 1 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 19,
            type: 'judge',
            question: "如果 C++ 表达式int(sqrt(N))*int(sqrt(N)) == N的值为 True ，则说明 N 为完全平⽅数，如 4 . 9 . 25 等。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 2*3=6 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "以下 C++ 代码因为循环变量为将导致错误，即不能作为变量名称，不符合 C++ 变量命名规范。（ ） height 2 * i height - i 2 * i + 1 height - i - 1 2 * i + 1 int a=10,b=20,c=30; cout << _____________________ << endl; cout << end…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "循环", "输入输出"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码执行后因为有 break ，将输出 0 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "循环", "输入输出"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 18 行 “OK” 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "将下⾯ C++ 代码中的i = 1调整为i = 0的输出结果相同。（ ）",
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
