// 2025年3月 GESP C++ 二级真题 (第9次认证)
export const paperData = {
    id: '2025-03-l2',
    title: '2025年3月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "对整型变量 N ，如果它能够同时被 3 和 5 整除，则输出N 是含有至少两个质因数。如果用流程图来描述处理过 程，则输出语句应该在哪种图形框中（ ）。",
            options: ["圆形框", "椭圆形框", "平行四边形框", "菱形框"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 2,
            type: 'single',
            question: "下⾯ C++ 代码执行，其输出是 ( ) 。",
            options: ["3 4", "3 3", "4 4", "4 3"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 3,
            type: 'single',
            question: "求三⾊彩球的颜⾊。有数量⽆限的红 (Red) 绿 (Green) 蓝 (Blue) 三种彩球排成一行，每组先为 5 个红⾊球，随后 3 个绿⾊，最后为 2 个蓝⾊。每个球都有编号，从左到右依次为 1,2,3…… 。输入整数代表编号，求该编号球的颜⾊。下 ⾯是 C++ 代码是实现，正确说法是 ( ) 。 int a=3, b = 4; a == b; b == a; cout << a << ' ' << b << endl;",
            options: ["将else if ((remainder == 9) || (remainder == 0))修改为else效果相同", "将((1 <= remainder) && (remainder<= 5))修改为(remainder <= 5)效果相同", "else if ((6 <= remainder) && (remainder <= 8))写法错误，应修改为else if (6 <= remainder <= 8)", "根据题意remainder = N % 10应修改为remainder = N / 10"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 ( ) 。",
            options: ["18", "17", "16", "14"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是 ( ) 。",
            options: ["10", "8", "0", "因为循环执行时会执行 break 语句⽽终⽌循环，所以 i 的值不确定"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。 int N, remainder; cin >> N; remainder = N % 10; // remainder 变量保存余数 if((1 <= remainder) && (remainder<= 5)) cout << \"Red\"; else if ((6 <= remainder) && (remainder <= 8)) cout << \"Green\"; else if ((remainder == 9) || (remainder == 0)) cout << \"Blue\"; int tnt = 0; for (int i = 0; i < 10;i ++) if (i % 3) tnt += 1; else tnt += 2; cout << tnt; int i; for (i = 10; i > 0; i -= 2) break; cout << i;",
            options: ["0#0#0#0#0#0#", "0#0#0#0#0#0#0#1#", "0#0#0#0#1#", "0#0#0#0#0#0#1#"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["1-2-1-3-2-1-4-3-2-1-", "1-2-1-3-2-1-4-3-2-1", "0-0-1-0-1-2-0-1-2-3-", "0-0-1-0-1-2-0-1-2-3"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后，将输出能被 2 整除且除以 7 余数为 2 的数。下列选项不能实现的是（ ）。",
            options: ["((i % 2 == 0) && (i % 7 == 2))", "((!(i % 2)) && (i % 7 == 2))", "((!(i % 2)) && (!(i % 7)))", "((i % 2 != 1) && (i % 7 == 2))"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码用于求 1 到 N 之间正整数中含有 3 的数的个数，⽐如123和32都是符合条件的数。则前后两处 横线应填入代码分别是（ ）。 int i; for (i =0; i < 10; i++){ if (i % 3 == 0) continue; cout << \"0\" << \"#\"; } if (i >= 10) cout << \"1\" << \"#\"; int i,j; for (i = 0; i < 5; i++) for (j = i; j > 0; j -= 1) printf(\"%d-\",j); for (int i = 0; i < 100; i++) if _______________________ cout << i << \" \";",
            options: ["", "", "", ""],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 10,
            type: 'single',
            question: "在数学中 N! 表示 N 的阶乘，即 1 到 N 的乘积，如3!=1*2*3，且0! = 1。下⾯的两段 C++ 代码用于求 1 到 N 的阶乘之和，如 N 为 3 ，则结果是 9 （1!+2!+3!的值）。选项中的说法正确的是（ ）。 int i,j; int cnt = 0, N; cout << \" 请输入正整数 N ： \"; cin >> N; for (i = 1; (j=i) < N; i++) while (j != 0) if (j % 10 == 3){ cnt +=1; __________; } else __________; cout << cnt << \" \"; continue j /= 10 break j /= 10 continue j %= 10 break j %= 10 // 实现 1 int i,N; cin >> N; int tnt = 0, last = 1; for (i = 1; i < N + 1; i++){ last *= i; tnt += last; } cout << tnt << endl;",
            options: ["虽然实现 1 的代码短小，但效率并不⾼", "实现 2 的代码效率更⾼，且更易于理解", "实现 1 因为应用了前项计算结果，计算量更小，因此效率⾼", "两种实现，效率⼏乎一致"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 11,
            type: 'single',
            question: "哥德巴赫猜想是指大于 2 的偶数都可以分解为两个质数之和，下⾯的代码用于验证 4-1000 之内的偶数能否分 解为两个质数之和。下⾯ C++ 代码中假设 isPrime() 是已经定义好用于判断正整数 N 是否为质数 , 返回 bool 值。对该段代 码， 的说法是（ ）。错误",
            options: ["将代码isPrime(j) && isPrime(i-j)修改为 isPrime(j) == true && isPrime(i-j) == true效果相同", "代码执行后，输出的一对质数，一定是小的数在前", "即便将外层循环中 i 的上界 1000 修改为很大的整数，也不能说从数学上证明了哥德巴赫猜想", "根据题意， break 语句应该移到 if 语句块之外"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 12,
            type: 'single',
            question: "已知 C++ 代码和执行后的期望输出如下，相关说法正确的是（ ）。 // 实现 2 int i,N; cin >> N; int tnt = 0, tmp; for (i = 1; i < N + 1; i++){ tmp = 1; for (int j = 1; j < i + 1; j++) tmp *= j; tnt += tmp; } cout << tnt << endl; for (i = 4; i < 1000; i += 2) for (j = 2; j < i; j++) if (isPrime(j) && isPrime(i-j)){ printf(\"%d=%d+%d\\n\", i, j, i-j); break; } int i,j; int last, N; cout << \" 请输入层数 N ： \"; cin >> N; last = 1; for (i = 1; i < N; i++){ for (j = 1; j < i + 1; j++){ // L1 if (last > 9) last = 1; cout << last << \" \"; 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: ["倒数第二行的printf(\"\\n\")有错，应该修改为cout << endl;， printf( ) 函数不能输出换行", "last += 1修改为last = last + 1执行效果相同", "代码中 L1 标记行中的j < i + 1应修改为j < i", "外层 for 循环前的last = 1修改为last = 0执行效果相同"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 13,
            type: 'single',
            question: "在 C++ 中，（ ）最适合填入横线处连续 5 次正确⽣成 1 到 10 之间的随机整数？",
            options: ["rand( ) % 11", "rand( ) % 10", "rand( ) % 10 + 1", "rand() % 9 + 1"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 14,
            type: 'single',
            question: "在 C++ 中，如果a和b均为float类型的变量，那么二者如果相差⾜够小（⽐如 0.000001 ），就可以视作 相等。⽐如2.2345676和2.2345677就可以视作相等。下列哪个表达式能用来正确判断 “a 等于 b” ( ) 。",
            options: ["((b-a) < 0.000001 )", "((b-a) <= 0.000001 )", "(abs(b-a) <= 0.000001 )", "(sqrt(b-a) <= 0.000001 )"],
            answer: 2,
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
            question: "在 C++ 代码中，假设 N 为正整数，则N - N / 10 * 10与N % 10都将获得 N 的个位数。 last += 1; } printf(\"\\n\"); } 请输入层数 N ： 10 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 1 2 3 4 5 6 7 8 9 for(int i=0; i<5; i++) __________________;",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 17,
            type: 'judge',
            question: "C++ 语句cout << ((10 <= N <= 12)? \"true\":\"false\")中，假设整型变量 N 为 12 ，则其输出为 true。原因是执行10 <= N后其值为true，true与12相⽐仍然是true。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式(sqrt(N) * sqrt(N)) == N中的 N 如果为正整数，则表达式的值为 true ，相当于开平⽅后平⽅ 是本⾝。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 19,
            type: 'judge',
            question: "下⾯ C++ 执行后将输出3*2=6。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 10 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 1 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 10 行 \"OK\" 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 23,
            type: 'judge',
            question: "将下⾯ C++ 代码中的 for 循环中的i = 1调整为i = 0的输出结果相同。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出0123。（ ） int a=2, b = 3; a=a-b; b=a+b; a=b-a; printf(\"%d*%d=%d\\n\", a, b, a*b); int i; for (i = 0; i < 10; i++) continue; cout << i << endl; int i; for (i = 1; i < 10; i++){ break; continue; } cout << i << endl; for (int i = 0; i < 5; i++) for(int j = 0; j < i; j++) printf(\"OK\\n\"); int tnt = 0; for (int i = 1; i < 5; i++) // i=1 tnt += i; cout << tnt; for (i = 0; i < 5; i++) for (i = 0; i < i; i++) continue; printf(\"%d\\n\", i);",
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
