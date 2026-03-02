// 2024年6月 GESP C++ 二级真题 (第6次认证)
export const paperData = {
    id: '2024-06-l2',
    title: '2024年6月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "（原卷题面缺失：第1题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "下⾯流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出2 月是 29 天，则图中菱形框中应该填入（ ）。",
            options: ["(yr%400==0) || (yr%4==0)", "(yr%400==0) || (yr%4==0 && yr%100!=0)", "(yr%400==0) && (yr%4==0)", "(yr%400==0) && (yr%4==0 && yr%100!=0)"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["条件判断", "输入输出", "程序分析"]
        },
        {
            id: 3,
            type: 'single',
            question: "在 C++ 中，下列不可做变量的是 （ ） 。",
            options: ["five-Star", "five_star", "fiveStar", "_fiveStar"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: "在 C++ 中，与for(int i=0; i<10; i++)效果相同的是 （ ） 。",
            options: ["for(int i=0; i<10; i+=1)", "for(int i=1; i<=10; i++)", "for(int i=10; i>0; i--)", "for(int i=10; i<1; i++)"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环"]
        },
        {
            id: 5,
            type: 'single',
            question: "在 C++ 中，cout << (5 % 2 && 5 % 3)的输出是 （ ） 。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "true", "false"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["条件判断", "输入输出", "运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: "执行下⾯的 C++ 代码时输入1，则输出是 （ ） 。",
            options: ["Jan", "Mar", "Jan Mar", "以上均不对"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "执行下⾯ C++ 代码后，有关说法错误的是（ ）。 int month; cin >> month; switch(month){ case 1: cout << \"Jan \"; case 3: cout << \"Mar \"; break; default: ; }。",
            options: ["如果先后输入 1 和 1 ，则将输出 1", "如果先后输入 0 和 1 或者 1 和 0 ，则将输出 3", "如果先后输入 0 和 0 ，则将输出 2", "如果先后输入 0 和 0 ，则将输出 4"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "分支结构", "输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: "某货币由 5 元， 2 元和 1 元组成。输入⾦额（假设为正整数），计算出最少数量。为实现其功能，横线处应填 入代码是（ ）。",
            options: ["第 1 横线处应填入： N / 2 第 2 横线处应填入： N - M5 - M2", "第 1 横线处应填入： (N - M5 * 5) / 2 第 2 横线处应填入： N - M5 * 5 - M2 * 2", "第 1 横线处应填入： N - M5 * 5 / 2 第 2 横线处应填入： N - M5 * 5 - M2 * 2", "第 1 横线处应填入： (N - M5 * 5) / 2 第 2 横线处应填入： N - M5 - M2"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["55 int a, b; cin >> a >> b; if (a && b) cout << \"1\"; else if (!(a || b)) cout << \"2\"; else if (a || b) cout << \"3\"; else cout << \"4\"; int N;…", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "假设下⾯ C++ 代码执行过程中仅输入正负整数或 0 ，有关说法错误的是（ ）。",
            options: ["执行上⾯代码如果输入 0 ，将终⽌循环", "执行上⾯代码能实现所有⾮ 0 整数的求和", "执行上⾯代码第一次输入 0 ，最后将输出 0", "执行上⾯代码将陷入死循环，可将while (N)改为while (N==0)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "执行下⾯的 C++ 代码，有关说法正确的是（ ）【质数是指仅能被 1 和它本⾝整除的正整数】。 int loopCount = 0; for (int i=0; i < 10; i++){ for (int j=0; j < i; j++) if (i * j % 2) break; loopCount += 1; } cout << loopCount; int N,Sum = 0; cin >> N; while (N){ Sum += N; cin >> N; } co…",
            options: ["如果输入正整数，上⾯代码能正确判断 N 是否为质数", "如果输入整数，上⾯代码能正确判断 N 是否为质数", "如果输入大于等于 0 的整数，上⾯代码能正确判断 N 是否质数", "如将Flag = true修改为Flag = N>=2? true:false则能判断所有整数包括负整数. 0 .正整数是否为质 数"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯ C++ 代码用于实现如下图所示的效果，其有关说法正确的是（ ）。",
            options: ["当前代码能实现预期效果，⽆需调整代码", "如果cout << endl;移到循环 L2 内部，则可实现预期效果", "如果cout << endl; 移到循环 L1 外部，则可实现预期效果", "删除cout << endl;行，则可实现预期效果"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "下⾯ C++ 代码执行后，输出是（ ）。",
            options: ["5 2", "5 0", "0 2", "0 0 cout << N << \" 是质数 \" << endl; else cout << N << \" 不是质数 \" << endl; for (int i = 1; i < 6; i++){ // L1 for (int j = 1; j < i+1; j++) //L2…"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "（原卷题面缺失：第15题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 3,
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
            question: "C++ 表达式-12 % 10的值为 2 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式int(12.56)的值为 13 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 的整型变量 N 被赋值为 10 ，则语句cout << N / 3 << \"-\" << N % 3执行后输出是 3-1 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "在 C++ 代码中，不可以将变量命名为 scanf ，因为 scanf 是 C++ 语⾔的关键字。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "变量与标识符", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将导致死循环。（ ） int N, M; cout << \" 请输入幸运数字： \"; cin >> N; cout << \" 请输入正整数： \"; cin >> M; bool Lucky; if (M % N == 0) Lucky = true; else Lucky = false; while (M){ if (M % 10…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "条件判断"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 10 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯ C++ 代码执行后，将输出 5 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯ C++ 代码能实现正整数各位数字之和。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "程序分析"]
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
