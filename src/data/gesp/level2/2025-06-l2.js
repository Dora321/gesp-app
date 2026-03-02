// 2025年6月 GESP C++ 二级真题 (第10次认证)
export const paperData = {
    id: '2025-06-l2',
    title: '2025年6月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
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
            question: "小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。",
            options: ["RAM", "ROM", "CACHE", "EPROM"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "3.5", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码用于获得正整数的第 3 位数，如 1234 则输出 2 。如果是一位数或两位数，则输出 0 。横线处应填 入的代码是 （ ） 。 int a=3; float b = 3.5; cout << (a *= b);。",
            options: ["N % 1000 / 100", "N / 1000 % 100", "N / 1000 / 100", "N % 100 / 100"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["6 28", "6 6", "28 6", "28 28"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "今天星期六，其后第N天星期⼏？如果是星期一到星期六输出形如：星期1.星期2等，星期天则输出星期 天。下⾯的C++代码用于完成上述要求，横线处应填上的代码是（ ）。",
            options: ["(N + 6) / 7", "(N + 6) // 7", "N % 7", "(N + 6) % 7"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的C++代码执行后其输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "28 int N, remainder; cout << \"请输入正整数:\"; cin >> N; cout << _________________; int a, b = (6, 28); b == a; a = b; cout << a << ' ' << b; int N…", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 （ ） 。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是 （ ） 。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。",
            options: ["A#A#", "A#0#A#0", "A#A#1", "A#0#A#0#1"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。 int i, j; for(i = 1; i < 12; i++) for(j = 1; j < i; j++) if(i * j % 2 == 1) break; cout << i * j; int i, cnt = 0; for(i = -99; i < 100; i += 2) cnt = 1 + cnt; cout << cnt; int i; for(i = 1; i < 10; i++){ if(i % 3 != 0){…",
            options: ["0#0-1#0-2#0-2#1-END", "0#0-1#0-1#1-2#0-2#1-2#2-3#0-3#1-3#2-END", "0#0-1#0-1#1-2#0-2#1-2#2-END", "1#0-2#0-2#1-END"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯C++代码执行后，将输出不能被3整除且除以5余数为2的数。下列选项不能实现的是（ ）。",
            options: ["(i % 3 != 0) && (i % 5 == 2)", "(i % 3) && (i % 5 == 2)", "(i % 3) && !(i % 5 != 2)", "!(i % 3) && (i % 5 == 2)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯C++代码用于判断一个大于0的正整数是⼏位数，横线处应填入代码先后是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "int i,j; for(i = 0; i < 3; i++) for(j = 0; j < i; j++) printf(\"%d#%d-\", i, j); printf(\"END\"); int i,j; for(i = 0; i < 100; i++) if(_________…"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "判断一个数是否为⾃守数。⾃守数的定义是如果一个数的平⽅其尾数与该数相同，则为⾃守数，如25的平 ⽅是625，其尾数是25，所以25是⾃守数。相关说法错误的是（ ）。",
            options: ["如果Flag在循环中不被改为false，则说明该数是⾃守数", "代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是⾃守数", "代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉", "将 N1 > 0 改为 N > 0 效果相同"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
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
            question: "在 C++ 代码中，假设 N 为正整数，则N / 10 舍弃个位数。如果 N 小于 10 ，则其值为 0 ，大于 10 则是舍弃个位 数的数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "程序分析"]
        },
        {
            id: 18,
            type: 'judge',
            question: "下列 C++ 代码执行后，其输出为10 20 ，即 a == b 和 b == a 对 a 和 b 的值没有任何影响。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 19,
            type: 'judge',
            question: "a 和 b 分别是 C++ 的整型变量，如果表达式max(a, b) == min(a, b) 的值为真，则说明 a 和 b 相等。 （ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯ C++ 代码编译时将报错，因为字符变量 a 被赋值了浮点值。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "变量与标识符", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行时如输入 59.99 ，将输出及格两个汉字。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 22,
            type: 'judge',
            question: "在下⾯的 C++ 代码中，因为continue 将被执行，因此不会有输出。（ ） } cout << endl; } int a = 10, b = 20; a == b; b == a; cout << (a, b); char a = '1'; a = 45.6; cout << a; int score; cout << \" 请输入学生成绩 : \"…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "输入输出"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 15 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "将下⾯ C++ 代码中的(int i = 5; i > 1; i--) 调整为(int i = 1; i < 5; i++) 输出结果相同，因为 5 到 1 与 1 到 5 的求和相同。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
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
