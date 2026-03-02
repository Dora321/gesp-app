// 2023年12月 GESP C++ 二级真题 (第4次认证)
export const paperData = {
    id: '2023-12-l2',
    title: '2023年12月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在 C++ 中，与for(int i = 10; i < 20; i +=2) cout << i;输出结果相同的是 ( ) 。",
            options: ["for(int i = 10; i < 19; i +=2) cout << i;", "for(int i = 11; i < 19; i +=2) cout << i;", "for(int i = 10; i < 21; i +=2) cout << i;", "以上均不对"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 2,
            type: 'single',
            question: "以下 C++ 代码实现从小到大的顺序输出能整除 N 的数（ N 的因⼦），例如 N=18 时输出 1 2 3 6 9 18 ，横线处应填 入（ ）。",
            options: ["int i = 0; i < N; i++", "int i = 1; i < N; i++", "int i = 0; i < N+1; i++", "int i = 1; i < N+1; i++"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯ C++ 代码用于判断输入的整数是否为对称数，如 1221 、 12321 是对称数，但 123 、 972 不是对称数。下⾯ 对该题对应代码的说法，正确的是（ ）。",
            options: ["代码没有语法错误，如果 N 为对称数，第 8 行将能正确输出。", "代码没有语法错误，但如果 N 为负数，将导致死循环。", "代码存在语法错误，程序不能被执行。", "代码没有语法错误，但不能达到预期⽬标，因为循环结束 N 总为 0 。"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码用于判断 N （大于等于 2 的正整数）是否为质数（素数）。下⾯对如下代码的说法，正确的是（ ）。",
            options: ["代码能正确判断 N 是否为质数。", "代码总是不能判断 N 是否质数。", "删除第 5 行break，将能正确判断 N 是否质数。", "代码存在漏洞，边界存在问题，应将第 2 行和第 7 行的N / 2改为 N / 2 + 1。"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["2#3#0", "1#2#0", "1#0#", "2#3#"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["0", "8#8", "4", "4#4"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["100", "95", "55", "0"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["1", "1,3", "15,17", "1,10,12"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["5", "10", "20", "30"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 10,
            type: 'single',
            question: "以下 C++ 代码用于输出 1-100 （含）的整数平⽅数（完全平⽅数），如 16 是 4 的平⽅，横线处应填写（ ）。",
            options: ["int(sqrt(i)) * int(sqrt(i)) = i", "int(sqrt(i)) == sqrt(i)", "int(sqrt(i)) * int(sqrt(i)) == i", "int(sqrt(i)) = sqrt(i)"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯的 C++ 代码用于实现如下左图所示的效果，应在以下右图 C++ 代码中填入（ ）。",
            options: ["与第 8 行下⾯填入一行：cout << nowNum;", "与第 2 行下⾯填入一行：cout << endl;", "与第 7 行下⾯填入一行：cout << nowNum;", "与第 9 行下⾯填入一行：cout << endl;"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 12,
            type: 'single',
            question: "某公司新出了一款⽆⼈驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车⽬的地，车⼦就能⾃动 选择一条优化路线，告诉乘客后驶达那里。请问下⾯哪项不是驾驶系统完成选路所必须的。（ ）",
            options: ["麦克风", "扬声器", "油量表 题号 1 2 3 4 5 6 7 8 9 10 答案", "传感器"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 13,
            type: 'single',
            question: "现代计算机是指电⼦计算机，它所基于的是（ ）体系结构。",
            options: ["艾伦·图灵", "冯·诺依曼", "阿塔纳索夫", "埃克特-莫克利"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 14,
            type: 'single',
            question: "输入一个正整数N，想找出它所有相邻的因数对，⽐如，输入12，因数对有(1,2)、(2,3)、(3,4)。下⾯哪段代 码找不到所有的因数对？（ ）",
            options: ["for(i=1;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);", "for(i=2;i<N;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);", "for(i=2;i<N/2;i++) if(!(N%(i-1)) && !(N%i)) printf(\"(%d,%d)\\n\", i-1, i);", "for(i=1;i<N/2;i++) if(!(N%i) && !(N%(i+1))) printf(\"(%d,%d)\\n\", i, i+1);"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 15,
            type: 'single',
            question: "第15题（提取待人工校对）",
            options: ["A", "B", "C", "D"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。'
        },
        {
            id: 16,
            type: 'judge',
            question: "C++表达式 2*int('9')*2 的值为36。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 17,
            type: 'judge',
            question: "C++表达式 3+2 && 5-5 的值为false。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 18,
            type: 'judge',
            question: "在C++代码中，执行 srand(0) 后连续两次执行 rand 的结果相等。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 19,
            type: 'judge',
            question: "C++代码中 while(1){...} 的判断条件不是逻辑值，将导致语法错误。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 20,
            type: 'judge',
            question: "执行以下C++代码后将输出0。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 21,
            type: 'judge',
            question: "在C++代码中，运算符只能处理相同的数据类型，不同类型之间必须转换为相同的数据类型。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 22,
            type: 'judge',
            question: "在C++代码中，虽然变量都有数据类型，但同一个变量也可以先后用不同类型的值赋值。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 23,
            type: 'judge',
            question: "小杨最近在准备考GESP，他用的Dev C++来练习和运行程序，所以Dev C++也是一个小型操作系统。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: '判断题答案待依据官方答案表人工复核。'
        },
        {
            id: 24,
            type: 'judge',
            question: "任何一个 while 循环都可以转化为等价的 for 循环（ ）。",
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
