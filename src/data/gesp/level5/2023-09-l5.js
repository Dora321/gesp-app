// 2023年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6`, output: `2 * 3` },
        { input: `20`, output: `2^2 * 5` },
        { input: `23`, output: `23` }
      ],
      question: `
# [GESP202309 五级] 因数分解

## 题目描述

每个正整数都可以分解成素数的乘积，例如： $6=2\\times 3$，$20=2^2\\times5$。

现在，给定一个正整数，请按要求输出它的因数分解式。

## 输入格式

输入第一行，包含一个正整数 $N$。约定 $2 \\le N \\le 10^{12}$。

## 输出格式

输出一行，为的因数分解式。要求按质因数由小到大排列，乘号用星号 \`*\` 表示，且左右各空一格。当且仅当一个素数出现多次时，将它们合并为指数形式，用上箭头 \`^\` 表示，且左右不空格。
`,
      score: 25,
      explanation: `**解析：**
      使用试除法，从 2 开始遍历到 sqrt(N)，依次提取质因子并计数。

      **考点：** 数论、质因数分解
      `,
      tags: ["编程题", "数论", "质因数分解"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    long long N = 0;\n    cin >> N;\n    bool first = true;\n    for (long long p = 2; p * p <= N; p++) {\n        if (N % p != 0) continue;\n        int cnt = 0;\n        while (N % p == 0) {\n            cnt++;\n            N /= p;\n        }\n        if (first) first = false;\n        else cout << \" * \";\n        cout << p;\n        if (cnt > 1) cout << \"^\" << cnt;\n    }\n    if (N > 1) {\n        if (!first) cout << \" * \";\n        cout << N;\n    }\n    cout << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `7
4 2 4 3 1 4 6
70 60 50 40 30 20 10`, output: `230` }
      ],
      question: `
# [GESP202309 五级] 巧夺大奖

## 题目描述

小明参加了一个巧夺大奖的游戏节目。主持人宣布了游戏规则：

1. 游戏分为 $n$ 个时间段，参加者每个时间段可以选择一个小游戏。

2. 游戏中共有 $n$ 个小游戏可供选择。

3. 每个小游戏有规定的时限和奖励。对于第 $i$ 个小游戏，参加者必须在第 $T_i$ 个时间段结束前完成才能得到奖励 $R_i$。

小明发现，这些小游戏都很简单，不管选择哪个小游戏，他都能在一个时间段内完成。关键问题在于，如何安排每个时间段分别选择哪个小游戏，才能使得总奖励最高？

## 输入格式

输入第一行，包含一个正整数 $n$。$n$ 既是游戏时间段的个数，也是小游戏的个数。约定 $1\\le n\\le500$。

输入第二行，包含 $n$ 个正整数。第 $i$ 个正整数为 $T_i$，即第 $i$ 个小游戏的完成期限。约定 $1\\le T_i\\le n$。

输入第三行，包含 $n$ 个正整数。第 $i$ 个正整数为 $R_i$，即第 $i$ 个小游戏的完成奖励。约定 $1\\le R_i\\le 1000$。

## 输出格式

输出一行，包含一个正整数 $C$，为最高可获得的奖励。
`,
      score: 25,
      explanation: `**解析：**
      贪心策略：优先选择奖励高的小游戏。对于每个奖励高的小游戏，尽量安排在其截止日期的最晚可用时间段完成。

      **考点：** 贪心、排序
      `,
      tags: ["编程题", "贪心", "排序"],
      template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nstruct game_t { int T, R; } games[500];\nbool game_cmp(game_t x, game_t y) { return x.R > y.R; }\nbool arrange[501];\nint main() {\n    int n; cin >> n;\n    for (int i = 0; i < n; i++) cin >> games[i].T;\n    for (int i = 0; i < n; i++) cin >> games[i].R;\n    sort(games, games+n, game_cmp);\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        for (int t = games[i].T-1; t >= 0; t--) {\n            if (!arrange[t]) {\n                arrange[t] = true;\n                sum += games[i].R;\n                break;\n            }\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2023-09-l5',
    title: '2023年9月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `近年来，线上授课变得普遍，很多有助于改善教学效果的设备也逐渐流行，其中包括比较常用的手写板，那 么它属于哪类设备？（ ）。`,
            options: [
                "输入",
                "输出",
                "控制",
                "记录",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            手写板用于将手写信息输入计算机，属于输入设备。

            - **A 输入**：正确答案。
            - **B 输出**：错误。
            - **C 控制**：错误。
            - **D 记录**：错误。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `如果a 和b 均为int类型的变量，且b 的值不为0，那么下列能正确判断 “a 是b 的 3 倍 ” 的表达式是（ ）。`,
            options: [
                "(a >> 3 == b)",
                "(a-b) % 3 == 0",
                "(a / b == 3)",
                "(a == 3 * b)",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            判断 a 是否为 b 的 3 倍，直接使用 a == 3 * b。a / b == 3 在 a=7, b=2 时也会成立（整除）。

            - **A (a >> 3 == b)**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **B (a-b) % 3 == 0**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **C (a / b == 3)**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **D (a == 3 * b)**：正确答案。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `如果变量a 和b 分别为double类型 and int类型，则表达式(a = 6, b = 3 * (7+8) / 2, b += a)的 计算结果为（ ）。`,
            options: [
                "6",
                "21",
                "28",
                "不确定",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            逗号表达式依次计算：a=6; b=3*15/2=22; b+=6 => 28。

            - **A 6**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 21**：错误。该数值与正确计算结果不符，请重新验算。
            - **C 28**：正确答案。
            - **D 不确定**：错误。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `有关下面 C++ 代码说法错误的是（ ）。`,
            options: [
                "sumA()用循环方式求从1 到N之和，sumB()用递归方式求从1 到N之和。",
                "默认情况下，如果输入正整数1000，能实现求从1 到1000之和。",
                "默认情况下，如果输入正整数100000，能实现求从1 到100000之和。",
                "一般说来，sumA()的效率高于sumB()。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            递归深度过大（100000）会导致栈溢出，默认情况下无法完成。

            - **A sumA()用循环方式求从1 到N之和，sumB()用递归方式求从1 到N之和。**：不是本题答案。
            - **B 默认情况下，如果输入正整数1000，能实现求从1 到1000之和。**：不是本题答案。
            - **C 默认情况下，如果输入正整数100000，能实现求从1 到100000之和。**：正确答案。
            - **D 一般说来，sumA()的效率高于sumB()。**：不是本题答案。
            **考点：** 递归
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `下面 C++ 代码以递归方式实现字符串反序，横线处应填上代码是（ ）。`,
            options: [
                "sIn[sIn.length()-1]+sReverse(sIn.substr(0, sIn.length()-1));",
                "sIn[0]+sReverse(sIn.substr(1, sIn.length()-1));",
                "sReverse(sIn.substr(0, sIn.length()-1))+sIn[sIn.length()-1];",
                "sReverse(sIn.substr(1, sIn.length()-1))+sIn[sIn.length()-1];",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            反序递归：最后一个字符+其余部分的反序。

            - **A sIn[sIn.length()-1]+sReverse(sIn.substr(...**：正确答案。
            - **B sIn[0]+sReverse(sIn.substr(1, sIn.length...**：错误。
            - **C sReverse(sIn.substr(0, sIn.length()-1))+...**：错误。
            - **D sReverse(sIn.substr(1, sIn.length()-1))+...**：错误。

            **考点：** 递归
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `印度古老的汉诺塔传说：三根柱子之间一次只能移动一个圆盘，小圆盘上不能放大圆盘。下面的 C++ 代码以递归方式实现汉诺塔，横线处应填入代码是（ ）。`,
            options: [
                "Hanoi(B, C, A, N-2)",
                "Hanoi(B, A, C, N-1)",
                "Hanoi(A, B, C, N-2)",
                "Hanoi(C, B, A, N-1)",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            汉诺塔经典递归：1. $n-1$个从A借C移到B；2. 第n个从A移到C；3. $n-1$个从B借A移到C。

            - **A Hanoi(B, C, A, N-2)**：错误。
            - **B Hanoi(B, A, C, N-1)**：正确答案。
            - **C Hanoi(A, B, C, N-2)**：错误。
            - **D Hanoi(C, B, A, N-1)**：错误。

            **考点：** 递归
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `根据下面 C++ 代码的注释，两个横线处应分别填入（　）。

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isOdd(int N) {
    return N % 2 == 1;
}
bool compare(int a, int b) {
    if (a % 2 == 0 && b % 2 == 1)
        return true;
    return false;
}
int main() {
    vector<int> lstA;  // lstA是一个整型向量
    for (int i = 1; i < 100; i++)
        lstA.push_back(i);
    // 对lstA成员按比较函数执行结果排序
    sort(lstA.begin(), lstA.end(), __________);  // 此处填写代码1

    vector<int> lstB;
    for (int i = 0; i < lstA.size(); i++)  // lstB成员全为奇数
        if (____________)  // 此处填写代码2
            lstB.push_back(lstA[i]);

    cout << "lstA: ";
    for (int i = 0; i < lstA.size(); i++)
        cout << lstA[i] << " ";
    cout << endl;

    cout << "lstB: ";
    for (int i = 0; i < lstB.size(); i++)
        cout << lstB[i] << " ";
    cout << endl;
    return 0;
}
\`\`\``,
            options: [
                "compare和isOdd(lstA[i])",
                "compare(x1,y1)和isOdd",
                "compare和isOdd",
                "compare(x1,y1)和isOdd(lstA[i])",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（compare和isOdd(lstA[i])）**

两个横线的语法要求并不相同，这正是本题的考点。

**代码1** 位于 \`sort(lstA.begin(), lstA.end(), ____)\` 的第三个参数位置。sort 要的是一个**比较函数本身**，之后由它反复调用，所以这里传的是函数名 \`compare\`——不能写成 \`compare(x1,y1)\`，那是「立刻调用一次并把返回的 bool 传进去」，类型也不对。

**代码2** 位于 \`if (____)\` 的条件位置，需要的是**这一次判断的结果**（一个 bool 值），所以必须写成调用形式 \`isOdd(lstA[i])\`。只写 \`isOdd\` 是个函数指针，恒为非空，条件将永远成立，lstB 会收进全部元素而不只是奇数。

因此「传函数名 + 调用取值」的组合只有 A。

**逐项分析**：
- **A**：正确。
- **B**：两处正好写反。
- **C**：\`isOdd\` 未调用，if 条件恒真。
- **D**：\`compare(x1,y1)\` 作 sort 参数类型错误。

**考点**：函数名（函数指针）与函数调用的区别`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `有关下面代码正确的是（ ）。`,
            options: [
                "checkNum()函数定义错误。",
                "将isEven作为checkNum()参数将导致错误。",
                "执行后将输出1 。",
                "运行时触发异常。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            函数指针作为参数。执行 checkNum(isEven, 8) 会调用 isEven(8)，返回 true (1)，最终输出 1。

            - **A checkNum()函数定义错误。**：错误。
            - **B 将isEven作为checkNum()参数将导致错误。**：错误。
            - **C 执行后将输出1 。**：正确答案。
            - **D 运行时触发异常。**：错误。

            **考点：** 指针与内存
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `有关下面 C++ 代码正确的是（　）。

\`\`\`cpp
#include <iostream>
using namespace std;

bool isOdd(int N) {
    return N % 2 == 1;
}
int Square(int N) {
    return N * N;
}
bool checkNum(bool (*Fx)(int), int x) {
    return Fx(x);
}
int main() {
    cout << checkNum(isOdd, 10) << endl;    // 输出行A
    cout << checkNum(Square, 10) << endl;   // 输出行B
    return 0;
}
\`\`\``,
            options: [
                "checkNum()函数定义错误。",
                "输出行A 的语句将导致编译错误。",
                "输出行B 的语句将导致编译错误。",
                "该代码没有编译错误。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（输出行B 的语句将导致编译错误）**

\`checkNum\` 的第一个形参类型是 \`bool (*Fx)(int)\`——指向「接收 int、返回 **bool**」的函数指针。

- **输出行A**：\`checkNum(isOdd, 10)\`。\`isOdd\` 的类型是 \`bool(*)(int)\`，与形参完全匹配，编译通过。
- **输出行B**：\`checkNum(Square, 10)\`。\`Square\` 的类型是 \`int(*)(int)\`，返回类型是 int 而非 bool。函数指针类型**不存在**「返回值自动转换」这回事，类型不匹配，编译失败。

实际用 g++ 编译，报错正落在行B：

\`\`\`text
error: no matching function for call to 'checkNum'
    cout << checkNum(Square, 10) << endl;   // 输出行B
\`\`\`

**逐项分析**：
- **A**：\`checkNum\` 定义本身完全合法。
- **B**：行A 类型匹配，不会报错。
- **C**：正确。
- **D**：行B 已导致编译失败。

**考点**：函数指针的类型必须在参数与返回值上都精确匹配`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面代码执行后的输出是（　）。

\`\`\`cpp
#include <iostream>
using namespace std;

int jumpFloor(int N) {
    cout << N << "#";
    if (N == 1 || N == 2) {
        return N;
    } else {
        return jumpFloor(N - 1) + jumpFloor(N - 2);
    }
}
int main() {
    cout << jumpFloor(4) << endl;
    return 0;
}
\`\`\``,
            options: [
                "4#3#2#2#4",
                "4#3#2#2#1#5",
                "4#3#2#1#2#4",
                "4#3#2#1#2#5",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（4#3#2#1#2#5）**

\`jumpFloor\` 每次进入函数**先打印当前的 N**，再决定是否递归，因此输出顺序就是递归的访问顺序（前序）。

展开 \`jumpFloor(4)\`：

| 调用 | 打印 | 返回 |
|---|---|---|
| jumpFloor(4) | \`4#\` | jumpFloor(3) + jumpFloor(2) |
| └ jumpFloor(3) | \`3#\` | jumpFloor(2) + jumpFloor(1) |
| 　└ jumpFloor(2) | \`2#\` | 2 |
| 　└ jumpFloor(1) | \`1#\` | 1 |
| └ jumpFloor(2) | \`2#\` | 2 |

递归部分依次打印 \`4#3#2#1#2#\`，最后 \`jumpFloor(4)\` 返回 3 + 2 = **5**，由 main 打印出来，故完整输出为 \`4#3#2#1#2#5\`。

**易错点**：
- 漏掉第二次 \`jumpFloor(2)\`（右子树）会得到 \`4#3#2#1#\` 开头的错误序列。
- 把最后的返回值误算成 4（选项 C），实际 F(4) = F(3) + F(2) = 3 + 2 = 5。

**考点**：递归的前序输出顺序与返回值累加`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下面代码中的isPrimeA()和isPrimeB()都用于判断参数N是否素数，有关其时间复杂度的正确说法是 （ ）。`,
            options: [
                "isPrimeA()的最坏时间复杂度是 $O(N)$，isPrimeB()的最坏时间复杂度是 O(logN)。",
                "isPrimeA()的最坏时间复杂度是 $O(N)$，isPrimeB()的最坏时间复杂度是 O(sqrt(N))。",
                "isPrimeA()的最坏时间复杂度是 O(sqrt(N))，isPrimeB()的最坏时间复杂度是 $O(N)$。",
                "isPrimeA()的最坏时间复杂度是 O(logN)，isPrimeB()的最坏时间复杂度是 $O(N)$。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            isPrimeA 遍历到 N/2，复杂度 $O(N)$；isPrimeB 遍历到 sqrt(N)，复杂度 O(sqrt(N))。

            - **A isPrimeA()的最坏时间复杂度是 $O(N)$，isPrimeB()的最坏...**：不是本题答案。复杂度分析有误，
            - **B isPrimeA()的最坏时间复杂度是 $O(N)$，isPrimeB()的最坏...**：正确答案。
            - **C isPrimeA()的最坏时间复杂度是 O(sqrt(N))，isPrimeB(...**：不是本题答案。复杂度分析有误，
            - **D isPrimeA()的最坏时间复杂度是 O(logN)，isPrimeB()的最...**：不是本题答案。复杂度分析有误，

            **考点：** 筛法
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下面代码用于归并排序，其中merge()函数被调用次数为（ ）。`,
            options: [
                "0",
                "1",
                "6",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            归并排序的合并次数等于子区间个数减1。对于长度为 7 的数组，合并次数为 6。

            - **A 0**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 1**：错误。该数值与正确计算结果不符，请重新验算。
            - **C 6**：正确答案。
            - **D 7**：错误。该数值与正确计算结果不符，请重新验算。

            **考点：** 归并排序
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `在上题的归并排序算法中，涉及到的算法为（ ）。`,
            options: [
                "搜索算法",
                "分治算法",
                "贪心算法",
                "递推算法",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            归并排序是经典的分治算法。

            - **A 搜索算法**：不是本题答案。
            - **B 分治算法**：正确答案。
            - **C 贪心算法**：不是本题答案。
            - **D 递推算法**：不是本题答案。
            **考点：** 归并排序
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `归并排序算法的基本思想是（ ）。`,
            options: [
                "将数组分成两个子数组，分别排序后再合并。",
                "随机选择一个元素作为枢轴，将数组划分为两个部分。",
                "从数组的最后一个元素开始，依次与前一个元素比较并交换位置。",
                "比较相邻的两个元素，如果顺序错误就交换位置。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            归并排序的基本思想是分而治之，先分后合。

            - **A 将数组分成两个子数组，分别排序后再合并。**：正确答案。
            - **B 随机选择一个元素作为枢轴，将数组划分为两个部分。**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **C 从数组的最后一个元素开始，依次与前一个元素比较并交换位置。**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **D 比较相邻的两个元素，如果顺序错误就交换位置。**：错误。

            **考点：** 归并排序
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `有关下面代码的说法正确的是（ ）。`,
            options: [
                "上述代码构成单向链表。",
                "上述代码构成双向链表。",
                "上述代码构成循环链表。",
                "上述代码构成指针链表。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            该题目展示的代码（见原题图）实现了一个循环链表。

            - **A 上述代码构成单向链表。**：不是本题答案。
            - **B 上述代码构成双向链表。**：不是本题答案。
            - **C 上述代码构成循环链表。**：正确答案。
            - **D 上述代码构成指针链表。**：不是本题答案。
            **考点：** 链表
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `TCP/IP 的传输层的两个不同的协议分别是 UDP 和 TCP 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            TCP/IP协议簇在传输层主要包含TCP和UDP两个协议。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `在特殊情况下流程图中可以出现三角框和圆形框。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            标准流程图中，矩形代表处理，菱形代表决策，平行四边形代表输入输出，圆角矩形或椭圆代表起始和结束。三角框不是标准符号。

            **纠错：** 原命题说法有误。标准流程图中，矩形代表处理，菱形代表决策，平行四边形代表输入输出，圆角矩形或椭圆代表起始和结束。三角框不是标准符号。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `找出自然数N以内的所有质数，常用算法有埃氏筛法和线性筛法，其中埃氏筛法效率更高。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            线性筛法（欧拉筛）的时间复杂度为$O(N)$，优于埃氏筛法的O(N log log N)。

            **纠错：** 原命题说法有误。线性筛法（欧拉筛）的时间复杂度为$O(N)$，优于埃氏筛法的O(N log log N)。

            **易混概念：** 常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。

            **考点：** 筛法
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `在 C++ 中，可以使用二分法查找链表中的元素。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            链表不支持随机访问（$O(1)$访问任意位置），因此无法高效使用二分查找。

            **纠错：** 原命题说法有误。链表不支持随机访问（$O(1)$访问任意位置），因此无法高效使用二分查找。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `在 C++ 中，通过恰当的实现，可以将链表首尾相接，形成循环链表。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            将链表最后一个节点的指针指向头节点即可形成循环链表。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `贪心算法的解可能不是最优解。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            贪心算法在每一步选择局部最优，但不一定能得到全局最优解。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `一般说来，冒泡排序算法优于归并排序。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            冒泡排序平均时间复杂度为$O(N^2)$，归并排序为$O(n log n)$，通常归并排序更优。

            **纠错：** 原命题说法有误。冒泡排序平均时间复杂度为$O(N^2)$，归并排序为$O(n log n)$，通常归并排序更优。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `C++ 语言中的qsort库函数是不稳定排序。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            C标准库中的qsort通常基于快速排序实现，是不稳定排序。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `质数的判定和筛法的目的并不相同，质数判定旨在判断特定的正整数是否为质数，而质数筛法意在筛选出范围内的所有质数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            质数判定是针对单个数的，筛法是针对范围内的所有数。

            **易混概念：** 埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。

            **考点：** 筛法
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `下面的 C++ 代码执行后将输出0 5 1 6 2 3 4 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            题目中的代码逻辑（见原题图）输出的序列与此不符。

            **纠错：** 原命题说法有误。题目中的代码逻辑（见原题图）输出的序列与此不符。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
