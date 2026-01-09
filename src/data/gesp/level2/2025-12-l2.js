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
        // === 单选题 (1-15) ===
        {
            id: 1,
            type: 'single',
            question: "1. 近日，空客 A320 系列飞机需更换一种易受太阳辐射影响的部件。强烈的太阳辐射可能会损坏飞行控制系统所需的关键数据，导致判断失误。执行判断的部件最可能是：",
            options: ["A. 辐射传感器", "B. 处理器", "C. 内存单元", "D. 输出设备"],
            answer: 1,
            score: 2,
            explanation: "处理器（CPU）是计算机的'大脑'，负责执行指令和逻辑判断。题目中提到'执行判断'和'关键数据'处理，这是处理器的核心功能。"
        },
        {
            id: 2,
            type: 'single',
            question: "2. 小明所在的教学楼内的网络属于哪种类型？",
            options: ["A. PAN (个人局域网)", "B. LAN (局域网)", "C. MAN (城域网)", "D. WAN (广域网)"],
            answer: 1,
            score: 2,
            explanation: "LAN (Local Area Network) 指局域网，通常覆盖一个房间、一栋楼或校园。"
        },
        {
            id: 3,
            type: 'single',
            question: "3. 下面有关 C++ 变量的说法，正确的是：",
            options: [
                "A. 不可以用 for 作为变量名，因为 for 是关键字",
                "B. _tnt 不可以是变量名，因为首字符必须是字母",
                "C. _tnt_ 不可以是变量名，容易混淆",
                "D. 可以用 printf 作为变量名，但不是好习惯"
            ],
            answer: 0,
            score: 2,
            explanation: "C++ 关键字绝不能作为变量名。变量名可以以字母或下划线开头。"
        },
        {
            id: 4,
            type: 'single',
            question: "4. 小数 0.123123... 循环，求第 N 位的值。代码逻辑：若余数为0输1，余1输2... 横线处应填：\n\n```cpp\ncin >> N;\nremainder = ______;\nif (remainder == 0) cout << 1;\nelse if (remainder == 1) cout << 2;\nelse cout << 3;\n```",
            options: ["A. N % 3", "B. (N-1) % 3", "C. N / 3", "D. (N-1) / 3"],
            answer: 1,
            score: 2,
            explanation: "我们需要建立 N 与输出的映射：N=1 -> 1, N=2 -> 2, N=3 -> 3。如果用 (N-1)%3，当 N=1 时余数为 0，刚好对应输出 1。"
        },
        {
            id: 5,
            type: 'single',
            question: "5. 执行 printf(\"%g\\n\", (3 + 3.1415926535)); 输出 6.14159。其原因最可能是：",
            options: [
                "A. 整数转浮点数时产生舍入误差",
                "B. printf 默认小数点位数限制",
                "C. 无限循环小数无法精确表示",
                "D. CPU 运算错误"
            ],
            answer: 1,
            score: 2,
            explanation: "printf 的 %g 格式通常默认显示 6 位有效数字。"
        },
        {
            id: 6,
            type: 'single',
            question: "6. 工号编码规则：前4位依次整除以3，累加之和除以10的余数为第5位。填空 L1 和 L2。\n\n```cpp\nfor (int i=0; i<4; i++) {\n  cin >> N;\n  rst += ______; // L1\n}\ncout << ______; // L2\n```",
            options: ["A. N%3, rst/10", "B. N%3, rst%10", "C. N/3, rst/10", "D. N/3, rst%10"],
            answer: 3,
            score: 2,
            explanation: "L1: 整除以3，即 N/3。L2: 除以10的余数，即 rst % 10。"
        },
        {
            id: 7,
            type: 'single',
            question: "7. 下面的 C++ 代码执行后的输出是：\n\n```cpp\nfor (int i=-2; i<2; i++)\n  if (i % 2)\n    printf(\"%d#\", i);\n```",
            options: ["A. -1#1#", "B. -1#0#1#", "C. -2#-1#1#", "D. -2#-1#1#2#"],
            answer: 0,
            score: 2,
            explanation: "i 取值 -2, -1, 0, 1。if (i % 2) 为真的只有 -1 和 1。"
        },
        {
            id: 8,
            type: 'single',
            question: "8. 下面的 C++ 代码执行后其输出是：\n\n```cpp\nint cnt=0;\nfor (int i=1; i<10; i+=2)\n  for (int j=0; j<i; j++)\n    cnt += 1;\ncout << cnt;\n```",
            options: ["A. 100", "B. 55", "C. 45", "D. 25"],
            answer: 3,
            score: 2,
            explanation: "cnt = 1 + 3 + 5 + 7 + 9 = 25。"
        },
        {
            id: 9,
            type: 'single',
            question: "9. 下面 C++ 代码执行后其输出是：\n\n```cpp\nfor (int i=1; i<=12; i++) {\n  if (i%2==0) continue;\n  int j;\n  for (j=0; j<i; j++)\n    if (i*j % 2 == 0) cout << i*j << \" \";\n  if (j >= i) break;\n}\nif (i >= 12) cout << i*j;\n```",
            options: ["A. 0 0", "B. 1 1", "C. 0", "D. 0 1 1"],
            answer: 2,
            score: 2,
            explanation: "i=1时，j=0输出'0 '，然后 j 变成 1，满足 j>=i 退出外层循环。"
        },
        {
            id: 10,
            type: 'single',
            question: "10. 与下面 C++ for 循环输出效果【不一致】的代码是：\n\n```cpp\nfor (int i=0; i<10; i++) cout << i; // 输出 0123456789\n```",
            options: [
                "A. while loop: cout 在 i+=1 之前",
                "B. while loop: i+=1 在 cout 之前",
                "C. while(true) + if break (后置判断)",
                "D. while(true) + if break (前置判断)"
            ],
            answer: 1,
            score: 2,
            explanation: "选项 B 的代码先执行 i+=1 再输出，会输出 1 到 10。"
        },
        {
            id: 11,
            type: 'single',
            question: "11. 下面 C++ 代码执行后输出是：\n\n```cpp\nint num=0;\nwhile (num <= 5) {\n  num += 1;\n  if (num % 3) continue;\n  printf(\"%d#\", num);\n  if (num > 5) printf(\"%d\", num);\n}\n```",
            options: ["A. 3#6#", "B. 3#6#6", "C. 1#2#3#4#5#6#", "D. 1#2#3#4#5#6#6"],
            answer: 1,
            score: 2,
            explanation: "num 分别为 3 和 6 时输出。num=6 时满足 num>5 又输出一次 6。"
        },
        {
            id: 12,
            type: 'single',
            question: "12. 下面 C++ 代码执行后，其输出是：\n\n```cpp\nint cnt=0;\nfor (int i=0; i<5; i++)\n  for (int j=i; j<4; j++)\n    cnt += 1;\ncout << cnt;\n```",
            options: ["A. 9", "B. 10", "C. 14", "D. 20"],
            answer: 1,
            score: 2,
            explanation: "4 + 3 + 2 + 1 = 10。"
        },
        {
            id: 13,
            type: 'single',
            question: "13. 关于“漂亮数”代码（判断 N 是否能被 M 整除/含 M/各位和被 M 整除），相关说法正确的是：\n\n```cpp\n... while (N != 0) { ... N /= 10; } ...\nif ((N % M == 0) && ... )\n```",
            options: [
                "A. 代码能完成目标",
                "B. while 循环中 N 变成了 0，需要在循环前保存 N",
                "C. while 循环中 if 可以加 else",
                "D. 输入 0 和 3 肯定输出 0 是完整漂亮数"
            ],
            answer: 1,
            score: 2,
            explanation: "循环结束后 N 为 0，必须提前备份原始数值。"
        },
        {
            id: 14,
            type: 'single',
            question: "14. 阅读代码：输入 5，输出什么图形？\n\n```cpp\nfor (int i=0; i<n; i++) {\n  for(int j=0; j < n-i-1; j++) cout << \" \";\n  for(int k=0; k < 2*i+1; k++) cout << \"*\";\n  cout << endl;\n}\n```",
            options: ["A. 倒三角形", "B. 正金字塔", "C. 直角三角形", "D. 矩形"],
            answer: 1,
            score: 2,
            explanation: "空格递减且星号递增，呈现正金字塔形。"
        },
        {
            id: 15,
            type: 'single',
            question: "15. 歌手打分程序（去掉最高分最低分）。如果单个评委可给满分10分，相关说法正确的是：\n\n```cpp\n... max_score = max(max_score, now_score); ...\n```",
            options: [
                "A. 逻辑错误，因为没有排序",
                "B. 初始化代码应移到外层循环外",
                "C. L1和L2的代码可以分别改为简单的 if 语句",
                "D. total_score 计算不可更改"
            ],
            answer: 2,
            score: 2,
            explanation: "max() 函数可用简单的 if 语句替代。"
        },

        // === 判断题 (1-10) ===
        {
            id: 16,
            type: 'judge',
            question: "1. 鸿蒙是华为公司开发的一款操作系统，它能够将正确的源程序翻译成目标程序，并运行。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "操作系统不负责源代码翻译。"
        },
        {
            id: 17,
            type: 'judge',
            question: "2. C++ 表达式 5 < 10 && 20 对应的逻辑值为 true。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "true && true 为 true。"
        },
        {
            id: 18,
            type: 'judge',
            question: "3. C++ 表达式 10 / 0.333333 == 10 / (1/3) 的值为 true。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "1/3 是整数除法，结果为 0。左边浮点除法结果非零。"
        },
        {
            id: 19,
            type: 'judge',
            question: "4. 代码 while(N) N /= 10; 无论输入负整数、0 或正整数，其输出都将是 0。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "不断除以 10 最终会变成 0。"
        },
        {
            id: 20,
            type: 'judge',
            question: "5. 代码 int a=4; int b=a==5; cout << a << b; 执行后输出 40。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "a 为 4，b 为 0。"
        },
        {
            id: 21,
            type: 'judge',
            question: "6. C++ 代码中对表达式 ('Z'-'A') < ('z'-'a') 的结果输出为 0。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "25 < 25 为假。"
        },
        {
            id: 22,
            type: 'judge',
            question: "7. 提供的代码利用 N%N10 == N 来判断 N 的位数（如 123 是 3 位数）。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "逻辑正确。"
        },
        {
            id: 23,
            type: 'judge',
            question: "8. 计算交叉加减 (1-2+3-4...)。将代码中的 Flag = -Flag 改为 Flag - Flag 效果相同。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "Flag - Flag 结果固定为 0。"
        },
        {
            id: 24,
            type: 'judge',
            question: "9. 双重循环代码 (i=0..9, j=i..9) 执行后将输出 55。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "10+9+...+1 = 55。"
        },
        {
            id: 25,
            type: 'judge',
            question: "10. 代码中 printf(\"\\n\") 没有任何可读内容，删除不影响输出效果。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "换行符对输出格式非常重要。"
        },

        // === 编程题 (2) ===
        {
            id: 26,
            type: 'single',
            question: "编程题 1：环保能量球\n\n每走 1 公里得 1 分，每走 X 公里额外奖 1 分。请编写程序计算总分。\n\n**提示**：在解析模式中查看交互式实验室。",
            options: ["OK"],
            answer: 0,
            score: 25,
            explanation: "本题建议通过循环模拟或数学公式 total = n + n/x 求解。"
        },
        {
            id: 27,
            type: 'single',
            question: "编程题 2：黄金格\n\n给定 HxW 的地图，寻找满足 sqrt(r^2 + c^2) <= x + r - c 的格子总数。\n\n**提示**：在解析模式中查看交互式实验室。",
            options: ["OK"],
            answer: 0,
            score: 25,
            explanation: "本题使用双重循环遍历所有格子，并判定不等式是否成立。"
        }
    ]
};
