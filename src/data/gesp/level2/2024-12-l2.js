// 2024年12月 GESP C++ 二级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: '2024年10月8日，诺贝尔物理学奖“意外地”颁给了两位计算机科学家（Hopfield、Hinton），两人的主要研究方向是（ ）。', options: ['天体物理', '流体力学', '人工智能', '量子理论'], answer: 2, score: 2, explanation: 'Hopfield 和 Hinton 因在人工神经网络和机器学习方面的贡献获奖。', tags: ['计算机基础'] },
        { id: 2, type: 'single', question: '计算机系统中存储的基本单位用 B 表示，它代表的是（ ）。', options: ['Byte', 'Block', 'Bulk', 'Bit'], answer: 0, score: 2, explanation: 'B 代表 Byte (字节)，b 代表 bit (比特)。', tags: ['计算机基础'] },
        { id: 3, type: 'single', question: 'C++ 语句 cout << (3+3 % 3 * 2-1) 执行后输出的值是（ ）。', options: ['-1', '4', '56', '2'], answer: 3, score: 2, explanation: '3 % 3 = 0, 0 * 2 = 0, 3+0-1 = 2。', tags: ['算术运算'] },
        { id: 4, type: 'single', question: '下面 C++ 代码执行后其输出是（ ）。\n```cpp\nfor (int i = 0; i < 10; i++) printf("%d", i);\n```', options: ['0123456789', '0,1,2,3,4,5,6,7,8,9', '0 1 2 3 4 5 6 7 8 9', '12345678910'], answer: 0, score: 2, explanation: '循环输出 0 到 9，中间没有分隔符。', tags: ['程序分析'] },
        { id: 5, type: 'single', question: '下面 C++ 代码的相关说法中，正确的是（ ）。\n```cpp\nint tnt; for (int i = 0; i < 10; i++) tnt += i; cout << tnt;\n```', options: ['求 1-10 的和（含10）', '求 1-10 的和（不含10）', '求 0-10 的和（不含10）', '将输出不确定的值'], answer: 3, score: 2, explanation: '变量 tnt 未初始化，初始值不确定。', tags: ['变量初始化'] },
        { id: 6, type: 'single', question: '下面 C++ 代码执行后其输出是（ ）。\n```cpp\nint i = 1; for ( ; i < 10; i++) { if (i % 2) continue; else break; } cout << i;\n```', options: ['1', '2', '10', '11'], answer: 1, score: 2, explanation: 'i=1时 i%2 为 true，跳过；i=2时 i%2 为 false，执行 break。输出 2。', tags: ['循环控制'] },
        { id: 7, type: 'single', question: '下面 C++ 代码执行后其输出是（ ）。\n```cpp\nint i = 0; for ( ; i < 10; i++) { if (i % 3) continue; cout << "0#"; } cout << "1#";\n```', options: ['0#0#0#0#1#', '0#1#', '0#0#1#', '0#0#0#0#'], answer: 0, score: 2, explanation: 'i 分别为 0, 3, 6, 9 时输出 0#（共4次），最后输出 1#。', tags: ['程序分析'] },
        { id: 8, type: 'single', question: '下面代码输出 0 到 99 能被 7 整除但不能被 3 整除的数，横线处“不能”填入的代码是（ ）。', options: ['i % 7 == 0 && i % 3 != 0', '!(i % 7) && i % 3 != 0', 'i % 7 && i % 3', 'i % 7 == 0 && !(i % 3 == 0)'], answer: 2, score: 2, explanation: 'i % 7 && i % 3 表示 i 不能被 7 整除且不能被 3 整除，逻辑相反。', tags: ['逻辑运算'] },
        { id: 9, type: 'single', question: '代码求正整数各位数字之和，横线处“不应”填入的是（ ）。\n```cpp\nwhile (N != 0) { ____________ N /= 10; }\n```', options: ['tnt = tnt+N % 10', 'tnt += N % 10', 'tnt = N % 10+tnt', 'tnt = N % 10'], answer: 3, score: 2, explanation: 'tnt = N % 10 会覆盖之前累加的结果。', tags: ['程序分析'] },
        { id: 10, type: 'single', question: '下面 C++ 代码执行后其输出是（ ）。\n```cpp\nfor (int i = 0; i < 5; i++) for (int j = 0; j < i; j++) printf("%d", j);\n```', options: ['0010120123', '1234', '0123', '00101201234'], answer: 0, score: 2, explanation: 'i=1:0; i=2:01; i=3:012; i=4:0123。串联起来是 0010120123。', tags: ['嵌套循环'] },
        { id: 11, type: 'single', question: '关于输出九九乘法表代码的说法，错误的是（ ）。', options: ['将 L1 换行移到 L2 位置效果相同', '将 printf("\\n") 改为 cout << endl 功能相同', '%-2d 表示左对齐占 2 位', 'Hang < 10 可改为 Hang <= 9'], answer: 0, score: 2, explanation: '移到 L2 会导致每输出一个等式就换行，破坏表结构。', tags: ['程序设计'] },
        { id: 12, type: 'single', question: '计算 1!+2!+...+10! 的正确方案是（ ）。', options: ['i从1到9累加', 'nowNum初始化为0', 'nowNum从0开始乘积', 'tnt=0, nowNum=1, i从1到10循环'], answer: 3, score: 2, explanation: '需正确初始化累加器和阶乘器。', tags: ['算法'] },
        { id: 13, type: 'single', question: '求 1 到 M 之间的所有孪生素数，for 循环上界应填写（ ）。\n```cpp\nif (isPrime(i) && isPrime(i+2))\n```', options: ['M', 'M-2', 'M+2', 'M / 2'], answer: 1, score: 2, explanation: '因为要检查 i+2，所以 i 最大到 M-2。', tags: ['程序分析'] },
        { id: 14, type: 'single', question: '输出高度为 5 的金字塔图形，横线应填（ ）。', options: ['height-i, i * 2-1', 'height-i-1, i * 2+1', 'height-i, i * 2+1', 'height-i-1, i * 2-1'], answer: 1, score: 2, explanation: '空格规律为 height-i-1，星号规律为 2*i+1。', tags: ['图形输出'] },
        { id: 15, type: 'single', question: '以下哪个 C++ 表达式的结果不是 30？', options: ['max(10, max(20, 30))', 'min(30, (10+20))', 'sqrt(10+20+30)', '(10+20+30) / 2'], answer: 2, score: 2, explanation: 'sqrt(60) 约等于 7.75。', tags: ['数学函数'] },

        { id: 16, type: 'judge', question: 'Windows 系统中，可通过快捷键 Ctrl+C 和 Ctrl+V 把一个文件复制多份副本。', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'Ctrl+C 复制，Ctrl+V 粘贴即可建立副本。', tags: ['操作系统'] },
        { id: 17, type: 'judge', question: '表达式 (N-N / 10 * 10) 的值就是整数 N 的个位数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'N/10*10 抹去了个位。N 减去它即得个位。', tags: ['算术运算'] },
        { id: 18, type: 'judge', question: '表达式 (10 <= N <= 12) 的值不论 N 为多少，其结果总是为真。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '10 <= N 结果是 0 或 1，都小于等于 12，所以整体恒为真。', tags: ['逻辑运算'] },
        { id: 19, type: 'judge', question: 'int a = sqrt(N); 执行后，a 是 N 算术平方根的整数部分。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '浮点数强转 int 会直接截断小数部分。', tags: ['数学函数'] },
        { id: 20, type: 'judge', question: '代码 printf("%%a*%%b=%d", a*b); 执行后其输出为 a*b=6。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '%% 会输出一个 %，效果是 %a*%b=6。', tags: ['输入输出'] },
        { id: 21, type: 'judge', question: '变量名不论长短，只要是由英文字母组成的，都是合法的。', options: ['正确', '错误'], answer: 1, score: 2, explanation: '关键字（如 for, if）不能作为变量名。', tags: ['变量命名'] },
        { id: 22, type: 'judge', question: '循环 if(i < 10) continue; break; 执行后将输出 0。', options: ['正确', '错误'], answer: 1, score: 2, explanation: 'i=0..9 都会 continue，i=10 时跳出，输出 10。', tags: ['程序分析'] },
        { id: 23, type: 'judge', question: '双层循环 8, 6, 4 累加执行后将输出 18。', options: ['正确', '错误'], answer: 0, score: 2, explanation: '8+6+4 = 18。', tags: ['组合计数'] },
        { id: 24, type: 'judge', question: '循环从 0 到 10，if(i % 2) tnt++; 能统计奇数个数。', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'i 为奇数时 i % 2 为 1 (true)，累加器工作。', tags: ['程序分析'] },
        { id: 25, type: 'judge', question: '通常说来，for 循环都可以用 while 循环实现。', options: ['正确', '错误'], answer: 0, score: 2, explanation: 'for 循环的三部分（初始化、条件、迭代）都可以对应到 while 结构中。', tags: ['循环结构'] }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202412 二级] 寻找数字

## 题目描述

小杨有一个正整数 \$a\$，小杨想知道是否存在一个正整数 \$b\$ 满足 \$a=b^4\$。

## 输入格式

第一行包含一个正整数 \$t\$，代表测试数据组数。

对于每组测试数据，第一行包含一个正整数代表 \$a\$。

## 输出格式

对于每组测试数据，如果存在满足条件的正整数 \$b\$，则输出 \$b\$，否则输出 \$-1\$。
`,
      score: 25,
      explanation: "对每个 a，检查其整数四次方根。b = pow(a, 0.25) 附近寻找。",
      tags: ["编程题", "数学", "开方"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        long long a;\n        cin >> a;\n        // \n    }\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        long long a;\n        cin >> a;\n        long long b = round(pow(a, 0.25));\n        if (b * b * b * b == a) cout << b << endl;\n        else cout << -1 << endl;\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202412 二级] 数位和

## 题目描述

小杨有 \$n\$ 个正整数，小杨想知道这些正整数的数位和中最大值是多少。“数位和”指的是一个数字中所有数位的和。例如:对于数字 \$12345\$，它的各个数位分别是 \$1,2,3,4,5\$。将这些数位相加，得到 

\$1+2+3+4+5=15\$

因此，\$12345\$ 的数位和是 \$15\$。

## 输入格式

第一行包含一个正整数 \$n\$，代表正整数个数。

之后 \$n\$ 行，每行包含一个正整数。

## 输出格式

输出这些正整数的数位和的最大值。
`,
      score: 25,
      explanation: "对每个数不断 %10 和 /10 累加各数位。",
      tags: ["编程题", "数位处理", "统计"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // \n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint getSum(long long n) {\n    int s = 0;\n    while (n) { s += n % 10; n /= 10; }\n    return s;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    int mx = 0;\n    while (n--) {\n        long long x;\n        cin >> x;\n        mx = max(mx, getSum(x));\n    }\n    cout << mx << endl;\n    return 0;\n}",
      answer: '',
    }
]
};
