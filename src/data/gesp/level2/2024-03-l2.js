// 2024年3月 GESP C++ 二级真题 (第5次认证)
export const paperData = {
    id: '2024-03-l2',
    title: '2024年3月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
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
            question: "以下选项中不符合 C++ 变量命名规则的是？（ ）",
            options: ["student", "2_from", "_to", "Text"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 3,
            type: 'single',
            question: "以下选项中，不能用于表示分⽀结构的 C++ 保留字是？（ ）",
            options: ["switch", "return", "else", "if"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 4,
            type: 'single',
            question: "下列说法错误的是？（ ）",
            options: ["while循环满⾜循环条件时不断地运行，直到指定的条件不满⾜为⽌", "if语句通常用于执行条件判断", "在 C++ 中可以使用foreach循环", "break和continue语句都可以用在for循环和while循环中"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 5,
            type: 'single',
            question: "下列 4 个表达式中，答案不是整数 8 的是？（ ）",
            options: ["abs(-8)", "min(max(8, 9), 10)", "int(8.88)", "sqrt(64)"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（） int n,a,m,i; n=3, a = 5; m = (a - 1) * 2; for (i=0; i<n-1; i++) m = (m - 1) * 2; cout << m; int n,i,result; n = 81; i = 1, result = 1; while (i * i <= n){ if (n % (i * i) == 0) result = i * i; i += 1; } cout << result;。",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（选项提取异常）", "（选项提取异常）", "（选项提取异常）", "（选项提取异常）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "以下 C++ 代码判断一个正整数 N 的各个数位是否都是偶数。如果都是，则输出 “ 是 ” ，否则输出 “ 否 ” 。例如 N=2024 时输出 “ 是 ” 。则横线处应填入（ ）。 int s,t,ans; s = 2, t = 10; ans = 0; while (s != t){ if (t % 2 == 0 && t / 2 >= s) t /= 2; else t -= 1; ans += 1; } cout << ans; int n, masks, days…",
            options: ["break", "continue", "N = N / 10", "N = N % 10"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 11,
            type: 'single',
            question: "有句俗话叫 “ 三天打渔，两天晒⽹ ” 。如果小杨前三天打渔，后两天晒⽹，一直重复这个过程，以下程序代码 用于判断，第 n 天小杨是在打鱼还是晒⽹，横线处应填写？（ ）",
            options: ["i == 0", "i == 4", "i == 0 && i == 4", "i == 0 || i == 4"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "一个数的所有数字倒序排列后这个数的大小保持不变，这个数就是回文数，⽐如 101 与 6886 都是回文数， ⽽ 100 不是回文数。以下程序代码用于判断一个数是否为回文数，横线处应填写？（ ）",
            options: ["10 * a + n % 10", "a + n % 10", "10 * a + n / 10", "a + n / 10 } if(Flag == true) cout << \" 是 \"; else cout << \" 否 \"; int n,i; cin >> n; i = n % 5; if (__________________) // 在此处填写代码 cout << \"…"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "给定两个整数 与 ，打印出一个栅栏图形，这个栅栏应该分成 段，段与段之间的间隔为 + ， 段内的填 充为 个 - 。形如 ， 时，图形如下： 以下程序代码用于绘制该图形，横线处应填写？（ ）",
            options: ["cout << '+' << endl;", "cout << '+' << ' ' << endl;", "cout << '+';", "cout << '+' << ' ';"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "小杨的父母最近刚刚给他买了一块华为⼿表，他说⼿表上跑的是鸿蒙，这个鸿蒙是。（ ）",
            options: ["小程序", "计时器", "操作系统", "神话⼈物"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
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
            question: "Xyz，xYz，xyZ是三个不同的变量。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "变量与标识符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "cout << (8< 9< 10)的输出结果为true。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 19,
            type: 'judge',
            question: "for (i = 0; i < 100; i+=2) ;语句中变量 i 的取值范围是 0 到 99 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "循环", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "C++ 中cout << float(2022)与 cout << float('2022')运行后的输出结果均为 2022 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 21,
            type: 'judge',
            question: "已知A的 ASCII 码值为 65 ，表达式int('C')+abs(-5.8)的值为 72.8 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 22,
            type: 'judge',
            question: "bool 函数用于将给定参数或表达式转换为布尔类型。语句 bool(-1) 返回的是 false 值。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题"]
        },
        {
            id: 23,
            type: 'judge',
            question: "如果变量a的值使得 C++ 表达式sqrt(a)==abs(a)，则a的值为 0 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "变量与标识符"]
        },
        {
            id: 24,
            type: 'judge',
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒⼦才能收看节⽬，那这个 WIFI 盒 ⼦具有路由器的功能。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "判断题答案待复核（待复核）。",
            tags: ["判断题", "条件判断"]
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
