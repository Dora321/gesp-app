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
            question: "小明最近为了备考 GESP ，开始看 B 站上关于⽹络知识的视频。其中提到计算机⽹络系统有不同的划分标准， 那他平时上学所在的教学楼内的⽹络是一个（ ）。",
            options: ["PAN", "LAN", "MAN", "WAN"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 2,
            type: 'single',
            question: "下⾯有关 C++ 变量的说法，正确的是 ( ) 。",
            options: ["不可以用 for 作为变量名，因为 for 是 C++ 的关键字（保留字）。", "_tnt 不可以是变量名，因为变量名的第一个字符必须是英文字母。", "_tnt_ 不可以是变量名，因为最后一个字符容易与减号混淆。", "可以用 printf 作为变量名，因为 printf 是关键字，但这不是好习惯，因为 printf 有约定的功能与含 义。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 3,
            type: 'single',
            question: "一个小数是 0.123123123…… ⽆限循环，其小数点后 1 位是 1 ，后 2 位是 2 ，依此类推，求第 N 位的值。横线处应 填入的代码是 ( ) 。 第 1 页 / 共 10 页",
            options: ["N % 3", "(N - 1) % 3", "N / 3", "(N - 1) / 3"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 4,
            type: 'single',
            question: "某同学执行 C++ 代码时 printf(\"%g\\n\", (3 + 3.1415926535)); 输出 6.14159，其原因最可能是 ( ) 。",
            options: ["C++ 中整数和浮点数相加时，整数会被转换为浮点数，⽽某些⼗进制小数⽆法精确表示为二进制小数，从⽽ 产⽣某些舍入误差。", "C++ 的 printf 函数在输出浮点数时根据格式有默认小数点位数，因此输出了较少的位数。", "3.1415926535 是一个⽆限循环小数，在计算机中⽆法精确表示。", "由于计算机 CPU 的运算错误导致。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 5,
            type: 'single',
            question: "某单位⼯号的编码规则：编码总长 5 位，均为数字，前 4 位依次整除以 3 其值累加之和除以 10 的余数为第 5 位数 字。如某⼯号为 76587 ，前 4 位分别整除以 3 后，商分别为 2 、 2 、 1 、 2 ，其累加之和为 7 ，除以 10 的余数为 7 ，故第 5 位 为 7 。下⾯代码依次输入前 4 位后，两个横线处分别应填的是 ( ) 。",
            options: ["", "", "", ""],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯的 C++ 代码执行后的输出是 ( ) 。 int N; cin >> N; remainder = ______________; if (remainder == 0) cout << 1; else if (remainder == 1) cout << 2; else cout << 3; int rst = 0, N; for (int i = 0; i < 4; i++){ cin >> N; rst += ___________; // L1 } cout << ___________; // L2 N % 3 rst / 10 N % 3 rst % 10 N / 3 rst / 10 N / 3 rst % 10 第 2 页 / 共 10 页",
            options: ["-1#1#", "-1#0#1#", "-2#-1#1#", "-2#-1#1#2#"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的 C++ 代码执行后其输出是 ( ) 。",
            options: ["100", "55", "45", "25"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 ( ) 。",
            options: ["0 0", "11", "0", "0 11"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 9,
            type: 'single',
            question: "与下⾯ C++ 输出效果不一致的代码是 ( ) 。 for (int i = -2; i < 2; i++) if (i % 2) printf(\"%d#\",i); int cnt = 0, N; for (int i =1; i < 10; i += 2) for (int j =0; j < i; j++) cnt += 1; cout << cnt; int i,j; for (i = 1; i < 12; i++){ if (i % 2 == 0) continue; for (j = 0; j < i; j++) if (i * j % 2 == 0) break; if(j >= i) cout << i * j << \" \"; } if(i >= 12) cout << (i * j); int i; for (i = 0; i < 10; i++) cout << i; 第 3 页 / 共 10 页",
            options: ["", "", "", ""],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。",
            options: ["3#6#", "3#6#6", "1#2#3#4#5#6#", "1#2#3#4#5#6#6"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码执行后，其输出是（ ）。 int i = 0; while (i < 10){ cout << i; i += 1; } int i = 0; while (i < 10){ i += 1; cout << i; } int i = 0; while (true){ cout << i; i += 1; if (i >= 10) break; } int i = 0; while (true){ if (i >= 10) break; cout << i; i += 1; } int num = 0; while (num <= 5){ num += 1; if (num % 3) continue; printf(\"%d#\",num); } if(num > 5) printf(\"%d\", num); int cnt = 0; for (int i = 0; i <5; i++) for (int j =i; j < 4; j++) cnt += 1; cout << cnt; 第 4 页 / 共 10 页",
            options: ["9", "10", "14", "20"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 12,
            type: 'single',
            question: "漂亮数的定义是：如果N能被M整除，或者某位是M，或者N的每位数之和能被M整除，则说N是M的漂亮 数。如果三个条件都满⾜，则是完整漂亮数。123是3的完整漂亮数，因为123能被3整除，也含有3，其每位数之和 为6也能被3整除。下⾯的代码用于判断N是否为M的完整漂亮数并输出。相关说法正确的是（ ）。",
            options: ["代码能完成题⽬设定⽬标。", "在 while 循环中N最终将变成0，因此L1行代码中 N % M 将总是满⾜条件，可以在 while 前增加一行代码 int old_num = N; ，并将L1开始这4行代码中的 N 都改为 old_num 就可以做出正确的判定。", "while 循环中 if 判断语句可以增加 else ⼦句，其内容为 Flag = 0 。", "如果先后输入 0 和 3 ，则肯定会输出 0是3的完整漂亮数 。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 13,
            type: 'single',
            question: "阅读下⾯的C++代码。执行后如输入 5 ，其输出的字符图形是（ ）。",
            options: ["int N, M, Flag, Sum, num; cout << \"请输入N，不等于0的正整数：\"; cin >> N; cout << \"请输入M：M必须大于1小于9：\"; cin >> M; Sum = 0; // 记录各位数之和 Flag = 0; // 假设记录N不含有M while ( N != 0){ num = N % 10; Sum += num; if ( num == M) Flag = 1; N /= 10; }", "", "", ""],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 14,
            type: 'single',
            question: "某学校举办“⼗佳歌⼿大奖赛”，经过选拔最终参赛选⼿有25⼈，评委10⼈，最终计分规则去掉一个最⾼分 去掉一个最低分作为该参赛选⼿的最终得分，并输出该得分。如果单个评委可给满分为10分，则相关说法正确的是 （ ）。",
            options: ["程序总体逻辑错误。因为要去掉最⾼分和最低分，需要排序，⽽程序没有相关代码。", "内层循环和外层循环之间的三行代码也就是 max_score = 0 开始的三行代码应该移动到外层循环外。", "L1和L2标记的两行代码可以分别改为简单的 if 语句或 ? : 语句。", "total_score += now_score 不可以更改为 total_score = total_score + now_score 。"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 15,
            type: 'single',
            question: "第15题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 16,
            type: 'judge',
            question: "C++表达式 5 < 10 && 20 对应的逻辑值为 true 。 * *** ***** ******* ********* * ** *** **** ***** * ** *** **** ***** float total_score, max_score, min_score, now_score; for ( int i = 0; i < 25; i++){ max_score = 0; // 记录最高分 min_score = 10; // 记录最低分 total_score = 0; // 记录总分 for ( int j = 0; j < 10; j++){ cin >> now_score; // 录入评委打分 max_score = max(max_score, now_score); // L1 min_score = min(min_score, now_score); // L2 total_score += now_score; } cout << ( total_score - max_score - min_score); } 第 6 页 / 共 1",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 17,
            type: 'judge',
            question: "C++表达式 10 / 0.333333 == 10 / (1 / 3) 的值为 true 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 18,
            type: 'judge',
            question: "下⾯C++代码中N是整数，执行时⽆论输入负整数、0或正整数，其输出都将是 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 19,
            type: 'judge',
            question: "下⾯的C++代码执行后，其输出是 4 0 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 20,
            type: 'judge',
            question: "C++代码中对表达式 ('Z' - 'A') < ('z' - 'A') 的结果输出为 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯的C++代码可以用于判断正整数N的位数（即⼏位数，如123是3位数，12为2位数）。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 22,
            type: 'judge',
            question: "计算交叉加减的结果，形如 1-2+3-4+5-…… 。下⾯C++代码中的变量都是整型，则将 Flag = -Flag 改为 Flag -= Flag 效果相同。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 23,
            type: 'judge',
            question: "下列C++代码段 执行后将输出 55 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯C++代码执行后输出如下，因为代码 printf(\"\\n\") 没有任何可读内容，删除不影响输出效果。（ ） cin >> N; while ( N) N /= 10; cout << N; int a,b; a = 4; b = a == 5; cout << a << ' ' << b; int N, N10, i; cin >> N; N10 = 10, i = 1; while ( 1) { if ( N % N10 == N) { printf(\"%d 是 %d 位数\", N, i); break; } i++, N10 *= 10; } cin >> N; Flag = -1; tnt = 0; for ( i = 1; i < N + 1; i++) { Flag = -Flag; tnt += Flag * i; } cout << tnt; int cnt = 0; for ( i = 0; i < 10; i++) for ( j = i; j < 10; j++) cnt += 1; cout << cnt; 页 10 共 / 页 7 第",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 25,
            type: 'judge',
            question: "第10题（提取待人工校对）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        }
    ]
};
