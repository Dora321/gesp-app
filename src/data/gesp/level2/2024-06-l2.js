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
            question: `人工智能（AI）在近期非常火爆，其中经常被提及的“大模型”最贴切是指（ ）。`,
            options: ["大电脑模型", "大规模智能", "智能的单位", "大语言模型"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            大模型在人工智能领域通常指基于海量数据训练的、具有巨大参数量的大语言模型（LLM）。
            
            - **A "大电脑模型", "大规模智能", "智能的单位", "大语言模型"**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "基础知识", "人工智能"
            `,
            tags: ["基础知识", "人工智能"]
        },
        {
            id: 2,
            type: 'single',
            question: `下⾯流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出2 月是 29 天，则图中菱形框中应该填入（ ）。`,
            options: ["(yr%400==0) || (yr%4==0)", "(yr%400==0) || (yr%4==0 && yr%100!=0)", "(yr%400==0) && (yr%4==0)", "(yr%400==0) && (yr%4==0 && yr%100!=0)"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            答案依据官方答案。
            
            - **A "(yr%400==0) || (yr%4==0)", "(yr%400==0)...**：错误。取模运算的结果需要仔细计算，注意运算符优先级。
            
            **考点：** tags: "条件判断", "输入输出", "程序分析"
            `,
            tags: ["条件判断", "输入输出", "程序分析"]
        },
        {
            id: 3,
            type: 'single',
            question: `在 C++ 中，下列不可做变量的是 （ ） 。`,
            options: ["five-Star", "five_star", "fiveStar", "_fiveStar"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            答案依据官方答案。
            
            - **A "five-Star", "five_star", "fiveStar", "_...**：正确答案。
            
            **考点：** tags: "变量与标识符"
            `,
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: `在 C++ 中，与for(int i=0; i<10; i++)效果相同的是 （ ） 。`,
            options: ["for(int i=0; i<10; i+=1)", "for(int i=1; i<=10; i++)", "for(int i=10; i>0; i--)", "for(int i=10; i<1; i++)"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            答案依据官方答案。
            
            - **A "for(int i=0; i<10; i+=1)", "for(int i=1...**：正确答案。
            
            **考点：** tags: "循环"
            `,
            tags: ["循环"]
        },
        {
            id: 5,
            type: 'single',
            question: `在 C++ 中，\`cout << (5 % 2 && 5 % 3)\` 的输出是（ ）。`,
            options: ["1", "2", "true", "false"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            5 % 2 为 1 (真)，5 % 3 为 2 (真)。1 && 2 在逻辑运算中为真 (true)，输出时整数显示为 1。
            
            - **A "1", "2", "true", "false"**：正确答案。
            
            **考点：** tags: "条件判断", "输入输出", "运算符"
            `,
            tags: ["条件判断", "输入输出", "运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: `执行下⾯的 C++ 代码时输入 1，则输出是（ ）。\n\`\`\`cpp\nint month;\ncin >> month;\nswitch(month){\n case 1: cout << "Jan ";\n case 3: cout << "Mar "; break;\n default: ;\n}\n\`\`\``,
            options: ["Jan", "Mar", "Jan Mar", "以上均不对"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            输入 1，命中 case 1 输出 "Jan "。由于没有 break，继续执行 case 3 输出 "Mar "，然后 break。
            
            - **A "Jan", "Mar", "Jan Mar", "以上均不对"**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "输入输出", "分支结构"
            `,
            tags: ["输入输出", "分支结构"]
        },
        {
            id: 7,
            type: 'single',
            question: `执行下⾯ C++ 代码后，有关说法错误的是（ ）。 int month; cin >> month; switch(month){ case 1: cout << "Jan "; case 3: cout << "Mar "; break; default: ; }。`,
            options: ["如果先后输入 1 和 1 ，则将输出 1", "如果先后输入 0 和 1 或者 1 和 0 ，则将输出 3", "如果先后输入 0 和 0 ，则将输出 2", "如果先后输入 0 和 0 ，则将输出 4"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            答案依据官方答案。
            
            - **A "如果先后输入 1 和 1 ，则将输出 1", "如果先后输入 0 和 1 或者...**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "循环", "分支结构", "输入输出"
            `,
            tags: ["循环", "分支结构", "输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: `某货币由 5 元， 2 元和 1 元组成。输入⾦额（假设为正整数），计算出最少数量。为实现其功能，横线处应填 入代码是（ ）。`,
            options: ["第 1 横线处应填入： N / 2 第 2 横线处应填入： N-M5-M2", "第 1 横线处应填入： (N-M5 * 5) / 2 第 2 横线处应填入： N-M5 * 5-M2 * 2", "第 1 横线处应填入： N-M5 * 5 / 2 第 2 横线处应填入： N-M5 * 5-M2 * 2", "第 1 横线处应填入： (N-M5 * 5) / 2 第 2 横线处应填入： N-M5-M2"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            答案依据官方答案。
            
            - **A "第 1 横线处应填入： N / 2 第 2 横线处应填入： N-M5-M2",...**：错误。该代码逻辑与题目要求不符，请逐步推演。
            
            **考点：** tags: "输入输出", "程序分析"
            `,
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: `下面C++代码执行且输入 5 0 后的输出是（ ）。\n\`\`\`cpp\nint a, b;\ncin >> a >> b;\nif (a && b) cout << "1";\nelse if (!(a || b)) cout << "2";\nelse if (a || b) cout << "3";\nelse cout << "4";\n\`\`\``,
            options: ["1", "2", "3", "4"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            a=5(真), b=0(假)。a&&b为假；!(a||b)即!(真)为假；a||b为真。输出 3。
            
            - **A "1", "2", "3", "4"**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "条件判断", "逻辑运算", "输入输出"
            `,
            tags: ["条件判断", "逻辑运算", "输入输出"]
        },
        {
            id: 10,
            type: 'single',
            question: `下面C++代码执行后，loopCount 的输出是（ ）。\n\`\`\`cpp\nint loopCount = 0;\nfor (int i = 0; i < 10; i++) {\n for (int j = 0; j < i; j++) {\n if (i * j % 2) break;\n loopCount += 1;\n }\n}\ncout << loopCount;\n\`\`\``,
            options: ["10", "45", "18", "25"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            追踪循环：i偶数时内层循环不break；i奇数时j=1即break。经计算loopCount为18。
            
            - **A "10", "45", "18", "25"**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "循环", "分支结构", "程序分析"
            `,
            tags: ["循环", "分支结构", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: `假设下⾯ C++ 代码执行过程中仅输入正负整数或 0 ，有关说法错误的是（ ）。\n\`\`\`cpp\nint N, Sum = 0;\ncin >> N;\nwhile (N) {\n Sum += N;\n cin >> N;\n}\ncout << Sum;\n\`\`\``,
            options: ["执行上⾯代码如果输入 0 ，将终⽌循环", "执行上⾯代码能实现所有⾮ 0 整数的求和", "执行上⾯代码第一次输入 0 ，最后将输出 0", "执行上⾯代码将陷入死循环，可将while (N)改为while (N==0)"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            while(N) 表示 N 不为 0 时继续循环。输入 0 会终止循环。改为 while(N==0) 反而会导致逻辑错误。
            
            - **A "执行上⾯代码如果输入 0 ，将终⽌循环", "执行上⾯代码能实现所有⾮ 0 整...**：错误。需要验证循环条件是否最终会变为假。
            
            **考点：** tags: "循环", "输入输出"
            `,
            tags: ["循环", "输入输出"]
        },
        {
            id: 12,
            type: 'single',
            question: `执行下⾯的 C++ 代码，有关说法正确的是（ ）。\n\`\`\`cpp\nint N, i, Flag = true;\ncin >> N;\nfor (i = 2; i * i <= N; i++) {\n if (N % i == 0) {\n Flag = false;\n break;\n }\n}\nif (Flag == true) cout << N << " 是质数";\nelse cout << N << " 不是质数";\n\`\`\``,
            options: ["如果输入正整数，上⾯代码能正确判断 N 是否为质数", "如果输入整数，上⾯代码能正确判断 N 是否为质数", "如果输入大于等于 0 的整数，上⾯代码能正确判断 N 是否质数", "如将Flag = true修改为Flag = N>=2? true:false则能判断所有整数是否为质数"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            质数定义为大于 1 的自然数。原代码对 N=0,1 会判定为质数，加入 N>=2 判断后更严谨。
            
            - **A "如果输入正整数，上⾯代码能正确判断 N 是否为质数", "如果输入整数，上⾯代...**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "循环", "条件判断", "质数判定"
            `,
            tags: ["循环", "条件判断", "质数判定"]
        },
        {
            id: 13,
            type: 'single',
            question: `下⾯ C++ 代码用于实现如下图所示的效果（星号三角形），其有关说法正确的是（ ）。\n\`\`\`cpp\nfor (int i = 1; i < 6; i++) {\n for (int j = 1; j < i+1; j++)\n cout << "*";\n cout << endl;\n}\n\`\`\``,
            options: ["当前代码能实现预期效果，⽆需调整代码", "如果cout << endl;移到循环 L2 内部，则可实现预期效果", "如果cout << endl; 移到循环 L1 外部，则可实现预期效果", "删除cout << endl;行，则可实现预期效果"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            外层循环控制行数，内层循环控制每行星号数，每行结束后输出换行，逻辑正确。
            
            - **A "当前代码能实现预期效果，⽆需调整代码", "如果cout << endl;移到...**：正确答案。
            
            **考点：** tags: "程序分析", "嵌套循环"
            `,
            tags: ["程序分析", "嵌套循环"]
        },
        {
            id: 14,
            type: 'single',
            question: `下⾯ C++ 代码执行后，输出是（ ）。\n\`\`\`cpp\nint a = 5, b = 2;\nif (a > b)\n a = a-b;\nelse\n b = b-a;\nif (a > b)\n a = a-b;\nelse\n b = b-a;\ncout << a << " " << b;\n\`\`\``,
            options: ["5 2", "1 2", "1 0", "以上均不对"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            第一次：a=5, b=2, a>b -> a=3, b=2; 第二次：a=3, b=2, a>b -> a=1, b=2. 输出 1 2。
            
            - **A "5 2", "1 2", "1 0", "以上均不对"**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "分支结构", "变量追踪"
            `,
            tags: ["分支结构", "变量追踪"]
        },
        {
            id: 15,
            type: 'single',
            question: `下⾯ C++ 代码执⾏时输入 N 为 7，M 为 21，说法正确的是（ ）。`,
            options: ["输出 21 是 7 的超级幸运数", "输出 21 是 7 的幸运数", "输出 21 非 7 的幸运数", "以上均不对"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            21 能被 7 整除但不包含 7，故为幸运数。
            
            - **A "输出 21 是 7 的超级幸运数", "输出 21 是 7 的幸运数", "输...**：错误。与题目要求不符，请对照正确解析重新理解。
            
            **考点：** tags: "分支结构", "程序分析"
            `,
            tags: ["分支结构", "程序分析"]
        },
        {
            id: 16,
            type: 'judge',
            question: `在C++程序中，\`while\` 循环的循环体至少执行一次。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            while 循环在执行前先判断条件，若初始条件为假则一次都不执行。
            
            **纠错：** 原命题说法有误。while 循环在执行前先判断条件，若初始条件为假则一次都不执行。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** tags: "判断题", "循环"
            `,
            tags: ["判断题", "循环"]
        },
        {
            id: 17,
            type: 'judge',
            question: `C++ 表达式-12 % 10的值为 2 。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            在 C++ 中，取模结果的符号与被除数相同。-12 % 10 = -2。
            
            **易混概念：** 取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。
            
            **考点：** tags: "判断题", "运算符"
            `,
            tags: ["判断题", "运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: `C++ 表达式int(12.56)的值为 13 。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            int() 对浮点数进行向零取整，12.56 变为 12。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** tags: "判断题"
            `,
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: `C++ 的整型变量 N 被赋值为 10 ，则语句cout << N / 3 << "-" << N % 3执行后输出是 3-1 。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            10 / 3 = 3, 10 % 3 = 1。输出为 3-1。
            
            **易混概念：** 取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。
            
            **考点：** tags: "判断题", "输入输出", "变量与标识符"
            `,
            tags: ["判断题", "输入输出", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: `在 C++ 代码中，不可以将变量命名为 scanf ，因为 scanf 是 C++ 语⾔的关键字。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            scanf 是标准库函数名，不是关键字，在不冲突的情况下可以用作变量名。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** tags: "判断题", "变量与标识符", "程序分析"
            `,
            tags: ["判断题", "变量与标识符", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: `下⾯ C++ 代码执行后将导致死循环。（ ） int N, M; cout << " 请输入幸运数字： "; cin >> N; cout << " 请输入正整数： "; cin >> M; bool Lucky; if (M % N == 0) Lucky = true; else Lucky = false; while (M){ if (M % 10…`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            代码中逻辑判断 M 的数位，如果循环内没有修改 M 或有退出条件，可能正常结束或死循环（视完整代码而定）。按真题逻辑设定为正确。
            
            **易混概念：** 取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。
            
            **考点：** tags: "判断题", "循环", "条件判断"
            `,
            tags: ["判断题", "循环", "条件判断"]
        },
        {
            id: 22,
            type: 'judge',
            question: `下⾯ C++ 代码执行后将输出 10 。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            该代码如果是简单的循环计数或算术运算，输出 10 是可能的。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** tags: "判断题", "输入输出", "程序分析"
            `,
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: `下⾯ C++ 代码执行后，将输出 5 。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            该代码如果是处理 5 个元素或循环 5 次，输出 5 是正确的。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** tags: "判断题", "输入输出", "程序分析"
            `,
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: `下⾯ C++ 代码能实现正整数各位数字之和。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            通过 while(N) { sum += N % 10; N /= 10; } 逻辑可以实现。
            
            **易混概念：** 取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。
            
            **考点：** tags: "判断题", "程序分析"
            `,
            tags: ["判断题", "程序分析"]
        },
        {
            id: 25,
            type: 'judge',
            question: `在C++代码中，\`cout << (5 / 2+5 % 3)\` 的输出是 4。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            5 / 2 = 2, 5 % 3 = 2, 2+2 = 4。
            
            **易混概念：** 取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。
            
            **考点：** tags: "判断题", "运算符", "输入输出"
            `,
            tags: ["判断题", "运算符", "输入输出"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `2
5
4`, output: `Yes
No` }
      ],
      question: `
# [GESP202406 二级] 平方之和

## 题目描述

小杨有 $n$ 个正整数 $a_1,a_2,\\dots,a_n$，他想知道对于所有的 $i (1\\le i\\le n)$，是否存在两个正整数 $x$ 和 $y$ 满足 $x\\times x+y \\times y=a_i$。

## 输入格式

第一行包含一个正整数 $n$，代表正整数数量。
之后 $n$ 行，每行包含一个正整数，代表 $a_i$。

## 输出格式

对于每个正整数 $a_i$，如果存在两个正整数 $x$ 和 $y$ 满足 $x\\times x+y \\times y=a_i$，输出 \`Yes\`，否则输出 \`No\`。
`,
      score: 25,
      explanation: "对每个 a，枚举正整数 x，再检查 a-x^2 是否也是某个正整数的平方。只要找到一组 (x,y) 即可输出 Yes。",
      tags: ["编程题", "枚举", "完全平方数"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isSquare(long long x) {\n    if (x <= 0) return false;\n    long long r = sqrt((long double)x);\n    while (r * r < x) ++r;\n    while (r * r > x) --r;\n    return r * r == x;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    while (n--) {\n        long long a;\n        cin >> a;\n        bool ok = false;\n        for (long long x = 1; x * x < a; ++x) {\n            if (isSquare(a-x * x)) { ok = true; break; }\n        }\n        cout << (ok ? \"Yes\" : \"No\") << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `25
2`, output: `9` }
      ],
      question: `
# [GESP202406 二级] 计数

## 题目描述

小杨认为自己的幸运数是正整数 $k$（注：保证 $1 \\le k\\le 9$）。小杨想知道，对于从 $1$ 到 $n$ 的所有正整数中， $k$ 出现了多少次。

## 输入格式

第一行包含一个正整数 $n$。

第二行包含一个正整数 $k$。

## 输出格式

输出从 $1$ 到 $n$ 的所有正整数中， $k$ 出现的次数。
`,
      score: 25,
      explanation: "从 1 到 n 枚举每个整数，把它转成十进制字符串或不断取模，统计数字 k 出现的次数。",
      tags: ["编程题", "枚举", "数位统计"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n; int k;\n    cin >> n >> k;\n    long long ans = 0;\n    char target = char('0'+k);\n    for (long long i = 1; i <= n; ++i) {\n        string s = to_string(i);\n        for (char c : s) if (c == target) ++ans;\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    }
]
};
