// 2025年12月 GESP C++ 二级真题 (第12次认证)
export const paperData = {
    id: '2025-12-l2',
    title: '2025年12月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "第1题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "小明最近为了备考 GESP ，开始看 B 站上关于⽹络知识的视频。其中提到计算机⽹络系统有不同的划分标准， 那他平时上学所在的教学楼内的⽹络是一个（ ）。",
            options: ["PAN", "LAN", "MAN", "WAN"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯有关 C++ 变量的说法，正确的是 （ ） 。",
            options: ["不可以用 for 作为变量名，因为 for 是 C++ 的关键字（保留字）。", "_tnt 不可以是变量名，因为变量名的第一个字符必须是英文字母。", "_tnt_ 不可以是变量名，因为最后一个字符容易与减号混淆。", "可以用 printf 作为变量名，因为 printf 是关键字，但这不是好习惯，因为 printf 有约定的功能与含 义。"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: "一个小数是 0.123123123…… ⽆限循环，其小数点后 1 位是 1 ，后 2 位是 2 ，依此类推，求第 N 位的值。横线处应 填入的代码是 （ ） 。 第 1 页 / 共 10 页。",
            options: ["N % 3", "(N - 1) % 3", "N / 3", "(N - 1) / 3"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "某同学执行 C++ 代码时 printf(\"%g\\n\", (3 + 3.1415926535)); 输出 6.14159，其原因最可能是 （ ） 。",
            options: ["C++ 中整数和浮点数相加时，整数会被转换为浮点数，⽽某些⼗进制小数⽆法精确表示为二进制小数，从⽽ 产⽣某些舍入误差。", "C++ 的 printf 函数在输出浮点数时根据格式有默认小数点位数，因此输出了较少的位数。", "3.1415926535 是一个⽆限循环小数，在计算机中⽆法精确表示。", "由于计算机 CPU 的运算错误导致。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "某单位⼯号的编码规则：编码总长 5 位，均为数字，前 4 位依次整除以 3 其值累加之和除以 10 的余数为第 5 位数 字。如某⼯号为 76587 ，前 4 位分别整除以 3 后，商分别为 2 . 2 . 1 . 2 ，其累加之和为 7 ，除以 10 的余数为 7 ，故第 5 位 为 7 。下⾯代码依次输入前 4 位后，两个横线处分别应填的是 （ ） 。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的 C++ 代码执行后的输出是 （ ） 。 int N; cin >> N; remainder = ______________; if (remainder == 0) cout << 1; else if (remainder == 1) cout << 2; else cout << 3; int rst = 0, N; for (int i = 0; i < 4; i++){ cin >> N; rst += ___________; // L1 } cout…",
            options: ["-1#1#", "-1#0#1#", "-2#-1#1#", "-2#-1#1#2#"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯的 C++ 代码执行后其输出是 （ ） 。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 （ ） 。",
            options: ["0 0", "（选项提取异常）", "（选项提取异常）", "0 11"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "与下⾯ C++ 输出效果不一致的代码是 （ ） 。 for (int i = -2; i < 2; i++) if (i % 2) printf(\"%d#\",i); int cnt = 0, N; for (int i =1; i < 10; i += 2) for (int j =0; j < i; j++) cnt += 1; cout << cnt; int i,j; for (i = 1; i < 12; i++){ if (i % 2 == 0) continue…",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。",
            options: ["3#6#", "3#6#6", "1#2#3#4#5#6#", "1#2#3#4#5#6#6"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后，其输出是（ ）。 int i = 0; while (i < 10){ cout << i; i += 1; } int i = 0; while (i < 10){ i += 1; cout << i; } int i = 0; while (true){ cout << i; i += 1; if (i >= 10) break; } int i = 0; while (true){ if (i >= 10) break; cout << i…",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 13,
            type: 'single',
            question: "漂亮数的定义是：如果N能被M整除，或者某位是M，或者N的每位数之和能被M整除，则说N是M的漂亮 数。如果三个条件都满⾜，则是完整漂亮数。123是3的完整漂亮数，因为123能被3整除，也含有3，其每位数之和 为6也能被3整除。下⾯的代码用于判断N是否为M的完整漂亮数并输出。相关说法正确的是（ ）。",
            options: ["代码能完成题⽬设定⽬标。", "在 while 循环中N最终将变成0，因此L1行代码中 N % M 将总是满⾜条件，可以在 while 前增加一行代码 int old_num = N; ，并将L1开始这4行代码中的 N 都改为 old_num 就可以做出正确的判定。", "while 循环中 if 判断语句可以增加 else ⼦句，其内容为 Flag = 0 。", "如果先后输入 0 和 3 ，则肯定会输出 0是3的完整漂亮数 。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["条件判断", "输入输出", "运算符"]
        },
        {
            id: 14,
            type: 'single',
            question: "阅读下⾯的C++代码。执行后如输入 5 ，其输出的字符图形是（ ）。",
            options: ["int N, M, Flag, Sum, num; cout << \"请输入N，不等于0的正整数：\"; cin >> N; cout << \"请输入M：M必须大于1小于9：\"; cin >> M; Sum = 0; // 记录各位数之和 Flag = 0; // 假设记录N不含有…", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 1,
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
            question: "C++表达式 5 < 10 && 20 对应的逻辑值为 true 。 * *** ***** ******* ********* * ** *** **** ***** * ** *** **** ***** float total_score, max_score, min_score, now_score; for ( int i = 0; i < 25…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "循环", "条件判断"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++表达式 10 / 0.333333 == 10 / (1 / 3) 的值为 true 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: "下⾯C++代码中N是整数，执行时⽆论输入负整数.0或正整数，其输出都将是 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯的C++代码执行后，其输出是 4 0 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "C++代码中对表达式 ('Z' - 'A') < ('z' - 'A') 的结果输出为 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯的C++代码可以用于判断正整数N的位数（即⼏位数，如123是3位数，12为2位数）。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "计算交叉加减的结果，形如 1-2+3-4+5-…… 。下⾯C++代码中的变量都是整型，则将 Flag = -Flag 改为 Flag -= Flag 效果相同。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "变量与标识符", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下列C++代码段 执行后将输出 55 。（ ）",
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
