// 2025年12月 GESP C++ 一级真题
export const paperData = {
    id: '2025-12',
    title: '2025年12月 GESP C++ 一级真题',
    level: 1,
    year: 2025,
    month: 12,
    session: 12,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在 C++ 中，程序开始执行的函数是（ ）。",
            options: ["main","start","init","run"],
            answer: 0,
            score: 2,
            explanation: "程序从 main 函数开始执行。",
            tags: ["函数","运算符"]
        },
        {
            id: 2,
            type: 'single',
            question: "下列标识符中，合法的是（ ）。",
            options: ["2num","my-name","_count","class"],
            answer: 2,
            score: 2,
            explanation: "标识符不能以数字开头、不能含减号、不能是关键字。",
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "表达式 17 % 5 的值是（ ）。",
            options: ["2","3","4","5"],
            answer: 0,
            score: 2,
            explanation: "17 除以 5 余数为 2。",
            tags: ["运算符"]
        },
        {
            id: 4,
            type: 'single',
            question: "若 int a = 8, b = 3; 则 a / b 的结果是（ ）。",
            options: ["2.666","2","3","2.0"],
            answer: 1,
            score: 2,
            explanation: "整型相除结果仍为整型，截断小数部分。",
            tags: ["基础语法"]
        },
        {
            id: 5,
            type: 'single',
            question: "执行 cout << (3 > 2); 输出的是（ ）。",
            options: ["true","false","1","0"],
            answer: 2,
            score: 2,
            explanation: "关系表达式为真时输出 1。",
            tags: ["输入输出","运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: "下列语句中，能够从标准输入读入 x 的是（ ）。",
            options: ["cout << x;","cin >> x;","scanf(x);","input x;"],
            answer: 1,
            score: 2,
            explanation: "cin >> x 用于输入。",
            tags: ["输入输出"]
        },
        {
            id: 7,
            type: 'single',
            question: "if (x >= 60) cout << \"及格\"; 中条件成立时会（ ）。",
            options: ["输出“及格”","停止程序","重新输入","进入循环"],
            answer: 0,
            score: 2,
            explanation: "if 条件成立执行后面的语句。",
            tags: ["条件判断","输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: "for(int i=1;i<=5;i++) 循环体会执行（ ）次。",
            options: ["4","5","6","不确定"],
            answer: 1,
            score: 2,
            explanation: "i 依次取 1~5，共 5 次。",
            tags: ["循环","运算符"]
        },
        {
            id: 9,
            type: 'single',
            question: "数组 int a[5]; 的合法下标范围是（ ）。",
            options: ["1~5","0~4","0~5","-1~4"],
            answer: 1,
            score: 2,
            explanation: "长度 5 的数组下标从 0 到 4。",
            tags: ["数组与字符串"]
        },
        {
            id: 10,
            type: 'single',
            question: "char c = \"A\"; 这行代码的问题是（ ）。",
            options: ["没有问题","字符应使用单引号","必须用 string","A 不是字符"],
            answer: 1,
            score: 2,
            explanation: "char 单个字符应使用单引号。",
            tags: ["基础语法"]
        },
        {
            id: 11,
            type: 'single',
            question: "关于 while 循环，下列说法正确的是（ ）。",
            options: ["至少执行一次循环体","先判断条件再执行循环体","不能与 break 同时使用","不能嵌套"],
            answer: 1,
            score: 2,
            explanation: "while 是前测循环，先判定条件。",
            tags: ["循环","条件判断"]
        },
        {
            id: 12,
            type: 'single',
            question: "执行 int x=5; x++; 后，x 的值为（ ）。",
            options: ["4","5","6","7"],
            answer: 2,
            score: 2,
            explanation: "x++ 使变量增加 1。",
            tags: ["运算符"]
        },
        {
            id: 13,
            type: 'single',
            question: "当需要“多分支选择”时，更适合使用（ ）。",
            options: ["if / else if / else","for","while","continue"],
            answer: 0,
            score: 2,
            explanation: "多分支判断可用 if-else 链。",
            tags: ["条件判断"]
        },
        {
            id: 14,
            type: 'single',
            question: "下面哪个类型可表示“真/假”两种状态（ ）。",
            options: ["int","double","bool","char"],
            answer: 2,
            score: 2,
            explanation: "bool 专用于布尔值。",
            tags: ["基础语法"]
        },
        {
            id: 15,
            type: 'single',
            question: "若要换行输出，常用的是（ ）。",
            options: ["\t","\n","\r","\u0000"],
            answer: 1,
            score: 2,
            explanation: "\n 表示换行。",
            tags: ["输入输出"]
        },
        {
            id: 16,
            type: 'judge',
            question: "C++ 中，语句末尾通常需要分号。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "语句末尾一般以分号结束。",
            tags: ["判断题","运算符"]
        },
        {
            id: 17,
            type: 'judge',
            question: "表达式 5 < 3 的结果为 true。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "5 小于 3 为假。",
            tags: ["判断题","运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "int 类型可以存储整数。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "int 是整型。",
            tags: ["判断题","基础语法"]
        },
        {
            id: 19,
            type: 'judge',
            question: "for 循环中，i++ 表示 i 每次减 1。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "i++ 是加 1。",
            tags: ["判断题","循环","运算符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "数组越界访问在 C++ 中是安全的。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "越界属于未定义行为，不安全。",
            tags: ["判断题","数组与字符串","运算符"]
        },
        {
            id: 21,
            type: 'judge',
            question: "if 条件表达式的结果可以是布尔值。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "if 条件可为布尔表达式。",
            tags: ["判断题","条件判断","运算符"]
        },
        {
            id: 22,
            type: 'judge',
            question: "cin 和 cout 都位于 iostream 头文件相关体系中。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "基础输入输出依赖 iostream。",
            tags: ["判断题","输入输出"]
        },
        {
            id: 23,
            type: 'judge',
            question: "while(false){...} 的循环体会执行一次。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "条件一开始为假，不执行。",
            tags: ["判断题","循环","条件判断"]
        },
        {
            id: 24,
            type: 'judge',
            question: "表达式 10 % 2 的结果是 0。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "10 能被 2 整除，余数 0。",
            tags: ["判断题","运算符"]
        },
        {
            id: 25,
            type: 'judge',
            question: "continue 语句用于立即结束整个程序。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "continue 仅跳过本次循环后续语句。",
            tags: ["判断题","循环"]
        }
    ],
    programmingQuestions: [
    {
        "id": 26,
        "type": "programming",
        "title": "小杨的爱心快递",
        "problemNumber": "B4445",
        "description": "小杨是“爱心社区”的小志愿者，每周他都会帮助邻居们寄送捐赠给山区小学的文具和书籍。快递公司为了支持公益行动，制定了特殊的运费规则，鼓励大家合理包装： 假设快递的体积为 V，重量为 G。 - 按体积计算：运费按体积计算，公式是 0.5 × V 元。 - 按重量计算：为了鼓励减轻包裹重量，规则是：当重量小于 300 克，即 G < 300 时，运费为 M 元；当重量达到或超过 300 克，即 G ≥ 300 时，运费为 N 元。 快递公司的叔叔说：“我们应该选择最公平合理的计费方式。” 所以，最终的运费会取按体积计算和按重量计算这两种方式中**价格较低**的那一个，这样对寄件人最公道。",
        "inputDescription": "四行，每行一个一位小数的浮点数，分别代表，快递的体积 V，快递的重量 G，第一档重量运费 M，第二档重量运费 N。",
        "outputDescription": "一行一个一位小数，代表实际快递运费。",
        "samples": [
            {
                "input": "10.0\n280.0\n8.0\n12.0",
                "output": "5.0"
            }
        ],
        "explanation": "先算体积计费 0.5*V，再根据重量是否小于 300 选择重量计费 M 或 N，最后输出两种方式中的较小值。",
        "tags": [
            "编程题",
            "模拟",
            "浮点数"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    double V, G, M, N;\n    cin >> V >> G >> M >> N;\n    double byVolume = 0.5 * V;\n    double byWeight = (G < 300.0 ? M : N);\n    cout << fixed << setprecision(1) << min(byVolume, byWeight) << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "手机电量显示",
        "problemNumber": "B4446",
        "description": "小杨的手机就像一个聪明的小助手，当电量变化时，它会用不同的方式来提醒我们，假设当前的电量百分比为 P： - 当电量非常低（不超过 10，即 P ≤ 10），它会显示一个大写字母 R，就像在说：“快给我充电吧！（Red 警告色）” - 当电量有点低（超过 10 但不超过 20，即 10 20），它就会直接显示具体的数字，比如直接显示 50，表示还有 50 的电量。",
        "inputDescription": "第一行一个正整数 T，代表数据组数。 对于每组数据，一行包含一个正整数 P，代表手机电量百分比。",
        "outputDescription": "对于每组数据，输出一行，代表当前手机显示的电量信息。",
        "samples": [
            {
                "input": "4\n8\n16\n20\n50",
                "output": "R\nW\nW\n50"
            }
        ],
        "explanation": "按电量区间分类：P<=10 输出 R，10<P<=20 输出 W，其余直接输出百分比数字。",
        "tags": [
            "编程题",
            "分类讨论",
            "模拟"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int T;\n    cin >> T;\n    while (T--) {\n        int P;\n        cin >> P;\n        if (P <= 10) cout << \"R\\n\";\n        else if (P <= 20) cout << \"W\\n\";\n        else cout << P << '\\n';\n    }\n    return 0;\n}"
    }
]
};
