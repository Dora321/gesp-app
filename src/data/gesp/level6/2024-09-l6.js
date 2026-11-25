// 2024年9月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `18`, output: `2` }
      ],
      question: `
# [GESP202409 六级] 小杨和整数拆分

## 题目描述

小杨有一个正整数 $n$，小杨想将它拆分成若干完全平方数的和，同时小杨希望拆分的数量越少越好。

编程计算总和为 $n$ 的完全平方数的最小数量。

## 输入格式

输入只有一行一个正整数 $n$。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: `**答案为 1**：如果 \`n\` 本身就是一个完全平方数，显然只需 \`1\` 个数。
- **答案为 4**：先将 \`n\` 中所有的因子 \`4\` 全部除掉，若此时 \`n % 8 == 7\`，则必须用 \`4\` 个数。
- **答案为 2**：枚举一个整数 \`i\`（\`1 <= i*i <= n\`），检查剩余的部分 \`n - i*i\` 是否为完全平方数。如果是，则说明可以拆分为 \`i*i\` 和 \`(n - i*i)\` 两个平方数之和，答案为 \`2\`。
- **答案为 3**：如果排除了 \`1\`、\`2\`、\`4\` 的情况，剩下的情况答案必然为 \`3\`。

**完整算法步骤：**
1. **实现完全平方数判断函数 \`isSquare(x)\`**：利用浮点开方函数求得近似平方根，并做微调校准，验证其平方是否严格等于 \`x\`，避免浮点精度误差。
2. **第一步（判断 1）**：调用 \`isSquare(n)\`，若为真则直接输出 \`1\` 并结束程序。
3. **第二步（判断 2）**：循环变量 \`i\` 从 \`1\` 开始枚举，直到 \`i*i > n\`。每次检查 \`isSquare(n - i*i)\` 是否成立，若成立则直接输出 \`2\` 并结束程序。
4. **第三步（判断 4 与 3）**：定义临时变量 \`x = n\`，当 \`x % 4 == 0\` 时，持续执行 \`x /= 4\`；除尽因子 \`4\` 后，判断若 \`x % 8 == 7\`，则输出 \`4\`，否则输出 \`3\`。

---

**样例走查：**

以输入 \`n = 18\` 为例：
1. **判断是否为 1**：
   - 开方 \`sqrt(18)\` 约为 \`4.24\`，整数部分为 \`4\`。
   - \`4*4 = 16 != 18\`，\`5*5 = 25 != 18\`，不是完全平方数，答案不为 \`1\`。
2. **判断是否为 2**：
   - 尝试 \`i = 1\`：\`i*i = 1\`，剩余 \`18 - 1 = 17\`，\`17\` 不是平方数；
   - 尝试 \`i = 2\`：\`i*i = 4\`，剩余 \`18 - 4 = 14\`，\`14\` 不是平方数；
   - 尝试 \`i = 3\`：\`i*i = 9\`，剩余 \`18 - 9 = 9\`，\`9\` 是完全平方数（\`3*3 = 9\`）。
   - 成功找到拆分方式 \`18 = 3*3 + 3*3\`，直接输出 \`2\`，程序终止。

**补充样例走查（3 和 4 的情况）：**
- **若输入 \`n = 7\`**：
  - \`7\` 不是平方数，答案不为 \`1\`；
  - 枚举 \`i = 1\`，\`7 - 1 = 6\` 不是平方数；\`i = 2\`，\`7 - 4 = 3\` 不是平方数；答案不为 \`2\`；
  - \`7\` 没有因子 \`4\`，直接判断 \`7 % 8 == 7\` 成立，输出 \`4\`（\`7 = 2*2 + 1*1 + 1*1 + 1*1\`）。
- **若输入 \`n = 12\`**：
  - 不是平方数，不能拆为两个平方数之和；
  - \`12\` 除以 \`4\` 得到 \`3\`，\`3 % 8 = 3 != 7\`，排除 \`4\`，最终输出 \`3\`（\`12 = 2*2 + 2*2 + 2*2\`）。

---

**易错提醒：**
- **浮点数开方精度问题**：在编写 \`isSquare\` 函数时，直接写 \`sqrt(x) * sqrt(x) == x\` 容易因双精度浮点数舍入误差导致误判。标准做法是先将开方结果转为整型，再通过前后微调并验证 \`r * r == x\`。
- **除尽因子 4 的时机**：在套用勒让德定理判断答案是否为 \`4\` 时，务必先用循环将 \`n\` 中的因数 \`4\` 全部除干净，再判断 \`% 8\`，不能直接对原数取模。例如 \`n = 28\`，直接 \`28 % 8 = 4 != 7\`，但除以 \`4\` 后得到 \`7\`，实际上必须拆分成 \`4\` 个平方数（\`28 = 4*4 + 2*2 + 2*2 + 2*2\`）。

---

**知识延伸：**
本题是经典的“四平方和问题”。正是由于拉格朗日四平方和定理保证了任何数最多只需要 \`4\` 个完全平方数相加，我们在排除了 \`1\`、\`2\`、\`4\` 之后，无需再去耗时遍历验证三个数的情况，即可直接断定答案是 \`3\`。整体时间复杂度仅为 \`O(sqrt(n))\`，能轻松应对超大规模的数据。`,
      tags: ["编程题", "动态规划"],
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstatic bool isSquare(long long x) {\n    long long r = sqrtl((long double)x);\n    while (r * r < x) ++r;\n    while (r * r > x) --r;\n    return r * r == x;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    cin >> n;\n    if (isSquare(n)) {\n        cout << 1 << '\\n';\n        return 0;\n    }\n    for (long long i = 1; i * i <= n; ++i) {\n        if (isSquare(n-i * i)) {\n            cout << 2 << '\\n';\n            return 0;\n        }\n    }\n    long long x = n;\n    while (x % 4 == 0) x /= 4;\n    if (x % 8 == 7) cout << 4 << '\\n';\n    else cout << 3 << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 5 10
1 1 2 3 3
9 1 10 10 1`, output: `4` },
        { input: `2 4 10
1 1 1 2
1 2 7 10`, output: `-1` }
      ],
      question: `
# [GESP202409 六级] 算法学习

## 题目描述

小杨计划学习 $m$ 种算法，为此他找了 $n$ 道题目来帮助自己学习，每道题目最多学习一次。

小杨对于 $m$ 种算法的初始掌握程度均为 $0$。第 $i$ 道题目有对应的知识点 $a_i$，即学习第 $i$ 道题目可以令小杨对第 $a_i$ 种算法的掌握程度提高 $b_i$。小杨的学习目标是对于 $m$ 种算法的掌握程度均至少为 $k$。

小杨认为连续学习两道相同知识点的题目是不好的，小杨想请你编写程序帮他计算出他最少需要学习多少道题目才能使得他在完成学习目标的同时避免连续学习两道相同知识点的题目。

## 输入格式

第一行三个正整数 $m, n, k$，代表算法种类数，题目数和目标掌握程度。 
第二行 $n$ 个正整数 $a_1, a_2, ..., a_n$，代表每道题目的知识点。 
第三行 $n$ 个正整数 $b_1, b_2, ..., b_n$，代表每道题目提升的掌握程度。

## 输出格式

输出一个整数，代表小杨最少需要学习题目的数量，如果不存在满足条件的方案，输出 -1。
`,
      score: 25,
      explanation: `**解析：**
本题要求在所有算法掌握程度均达到目标值的前提下，选出最少数量的题目，并保证能排成“任意相邻两道题所属算法不同”的学习序列。这是一道结合了**贪心排序**与**隔板插空（鸽巢原理）**的综合算法题，解题过程可以分为以下三个核心步骤：

### 算法步骤

1. **分组贪心求基础需求：**
   - 将所有题目按所属算法分为 \`m\` 组。
   - 为使每种算法达到掌握度 \`k\` 且所选题目最少，每种算法内部显然应优先选择提升掌握度最大的题目。因此对每组题目按掌握程度从大到小排序。
   - 对第 \`i\` 种算法，从大到小贪心累加，计算达到 \`>= k\` 最少需要的题数，记为 \`need[i]\`。如果把该算法所有题目全加上总和依然小于 \`k\`，说明目标无法达成，直接输出 \`-1\`。
   - 记录该算法剩余未被选中的备选题目数量 \`extra[i] = size[i] - need[i]\`，这些题后续可用作“间隔缓冲题”。

2. **检验相邻不重复的充要条件：**
   - 统计当前选出的总题数 \`total = sum(need[i])\`，以及选出题数最多的那种主导算法 \`who\` 及其题数 \`mx = max(need[i])\`，其余算法选出的题数之和为 \`others = total - mx\`。
   - 根据经典排列原理（隔板插空法），若要让同种算法的题目不相邻，出现次数最多的算法最多只能占据所有奇数位。因此可合法排列的充要条件是：
     \`mx <= others + 1\`
   - 若该条件成立，说明当前选出的题目已经能构造出相邻不同的合法学习序列，最少题数就是 \`total\`。

3. **补充其他算法题目以消除冲突：**
   - 若 \`mx > others + 1\`，说明主导算法的题数偏多，两两之间缺少足够的其他题目进行隔离。
   - 为了使 \`mx <= others' + 1\` 成立，其他算法的新题数之和 \`others'\` 至少需要达到 \`mx - 1\`。因此，我们必须从**除该主导算法外的其他所有算法**中额外补充至少 \`needMore = (mx - 1) - others\` 道题。
   - 统计除主导算法外，其他算法剩余可用的备选题总数 \`available = sum(extra[j])\`（其中 \`j != who\`）。
   - 若 \`available < needMore\`，说明即使把其他算法剩下的所有题都用上，也无法将主导算法的题目完全隔开，输出 \`-1\`；
   - 若 \`available >= needMore\`，只需再补选 \`needMore\` 道题即可（由于达标要求已满足，补选哪些题均可），最少题目数即为 \`total + needMore\`。

---

### 样例走查

#### 样例 1
输入：
\`3 5 10\`
\`1 1 2 3 3\`
\`9 1 10 10 1\`

- **步骤 1：分组与贪心选择**
  - 算法 1 题目分值降序为 \`[9, 1]\`：累加 \`9 < 10\`，\`9 + 1 = 10 >= 10\`，需选 2 题，\`need[1] = 2\`，剩余可用 \`extra[1] = 0\`。
  - 算法 2 题目分值降序为 \`[10]\`：\`10 >= 10\`，需选 1 题，\`need[2] = 1\`，剩余可用 \`extra[2] = 0\`。
  - 算法 3 题目分值降序为 \`[10, 1]\`：\`10 >= 10\`，需选 1 题，\`need[3] = 1\`，剩余可用 \`extra[3] = 1\`。
- **步骤 2：统计与合法性检验**
  - 选出的总题数 \`total = 2 + 1 + 1 = 4\`。
  - 最多的算法为算法 1，\`mx = 2\`；其余算法题数 \`others = 4 - 2 = 2\`。
  - 检验条件：\`mx <= others + 1\` 即 \`2 <= 2 + 1\` 成立！
  - 构造排列如 \`算法1 -> 算法2 -> 算法1 -> 算法3\`，无连续相同算法。
- **步骤 3：输出结果**
  - 无需额外补充题目，输出 \`4\`。

#### 样例 2
输入：
\`2 4 10\`
\`1 1 1 2\`
\`1 2 7 10\`

- **步骤 1：分组与贪心选择**
  - 算法 1 题目分值降序为 \`[7, 2, 1]\`：累加 \`7 + 2 + 1 = 10 >= 10\`，需选 3 题，\`need[1] = 3\`，剩余可用 \`extra[1] = 0\`。
  - 算法 2 题目分值降序为 \`[10]\`：需选 1 题，\`need[2] = 1\`，剩余可用 \`extra[2] = 0\`。
- **步骤 2：统计与合法性检验**
  - 选出的总题数 \`total = 3 + 1 = 4\`。
  - 最多的算法为算法 1，\`mx = 3\`；其余算法题数 \`others = 4 - 3 = 1\`。
  - 检验条件：\`mx <= others + 1\` 即 \`3 <= 1 + 1\` 不成立（\`3 > 2\`）。
- **步骤 3：计算额外补充量**
  - 隔离算法 1 至少需要其他算法题目达到 \`mx - 1 = 2\` 题，当前只有 1 题，故还需补充 \`needMore = 2 - 1 = 1\` 题。
  - 统计除算法 1 外其余算法的备选题目：算法 2 的 \`extra[2] = 0\`，可用题目 \`available = 0\`。
  - 因为 \`available < needMore\`（\`0 < 1\`），无法通过补题隔开算法 1，输出 \`-1\`。

---

### 易错提醒
1. **掌握程度与累加溢出**：题中掌握程度目标值 \`k\` 和单题提升值可能较大，计算各算法总提升程度与目标值时应使用 64 位整数（\`long long\`）。
2. **缓冲题目必须来自其他算法**：当 \`mx > others + 1\` 时，绝不能从主导算法中再选题，因为增加主导算法的题数只会让相邻冲突更严重；额外选取的题目必须且只能来自 \`i != who\` 的其他算法。
3. **单算法特殊情况**：当 \`m = 1\` 时，若达成目标需要 \`>= 2\` 道题，此时 \`others = 0\`，\`mx > 1\` 必定无法通过相邻不重复检查且无其他算法可借调，算法会正确识别并输出 \`-1\`。`,
      tags: ["编程题", "贪心", "排序"],
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int m, n;\n    long long k;\n    cin >> m >> n >> k;\n    vector<int> c(n);\n    for (int i = 0; i < n; ++i) cin >> c[i];\n    vector<long long> v(n);\n    for (int i = 0; i < n; ++i) cin >> v[i];\n\n    vector<vector<long long>> groups(m+1);\n    for (int i = 0; i < n; ++i) groups[c[i]].push_back(v[i]);\n\n    vector<int> need(m+1, 0), extra(m+1, 0);\n    long long total = 0;\n    int mx = 0, who = -1;\n    for (int i = 1; i <= m; ++i) {\n        auto &g = groups[i];\n        sort(g.begin(), g.end(), greater<long long>());\n        long long sum = 0;\n        while (need[i] < (int)g.size() && sum < k) {\n            sum += g[need[i]];\n            ++need[i];\n        }\n        if (sum < k) {\n            cout << -1 << '\\n';\n            return 0;\n        }\n        extra[i] = (int)g.size()-need[i];\n        total += need[i];\n        if (need[i] > mx) {\n            mx = need[i];\n            who = i;\n        }\n    }\n\n    long long others = total-mx;\n    long long needMore = max(0LL, 2LL * mx-others-1-mx); // extra items needed outside dominant color\n    long long available = 0;\n    for (int i = 1; i <= m; ++i) if (i != who) available += extra[i];\n    if (needMore > available) {\n        cout << -1 << '\\n';\n        return 0;\n    }\n    cout << total+needMore << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-09-l6',
    title: '2024年9月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `以下（ ）没有涉及 C++ 语言的面向对象特性支持。`,
            options: [
                "C++ 中构造一个 class 或 struct",
                "C++ 中调用 printf 函数",
                "C++ 中调用用户定义的类成员函数",
                "C++ 中构造来源于同一基类的多个派生类",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：不正确的是 B（C++ 中调用 printf 函数）**

**核心解析：**
面向对象编程（OOP）的核心思想是将数据（属性）与对数据的操作（方法）绑定在一起，形成独立的对象，并通过封装、继承与多态三大特性来组织程序结构。
C++ 是一门支持多范式的编程语言，它不仅支持面向对象编程，还完全兼容 C 语言的面向过程（过程式）编程范式。
辨识一段代码是否涉及面向对象特性，关键在于观察其是否依赖类、对象以及面向对象的核心机制：
- 面向对象特性通常依托类（\`class\` / \`struct\`）、对象实例、访问权限控制（\`public\` / \`private\`）、成员函数、继承与派生、虚函数与多态等；
- 面向过程特性则是以独立的函数为中心组织代码，函数不归属于任何类或对象，直接通过传入参数完成处理，不具备对象的封装与状态维护。

**选项逐项分析：**
- **A C++ 中构造一个 class 或 struct**：❌ 涉及面向对象特性，不符合题意。在 C++ 中，\`class\` 与 \`struct\` 均用于定义类（唯一差别仅是成员的默认访问权限不同：\`class\` 默认为私有，\`struct\` 默认为公有）。构造类是面向对象中“封装”的起点，也是后续实现继承和多态的基石。
- **B C++ 中调用 printf 函数**：✅ 没有涉及面向对象特性，符合题意。\`printf\` 是源自 C 语言标准库（\`<cstdio>\`）的过程式格式化输出函数，它直接接收格式化字符串与对应参数，并不属于任何类，调用过程完全是传统的面向过程函数调用，没有使用任何面向对象机制。
- **C C++ 中调用用户定义的类成员函数**：❌ 涉及面向对象特性，不符合题意。成员函数必须绑定在具体的类或对象实例上进行调用（如 \`object.func()\`），体现了将“数据”与“操作数据的方法”结合在一起的封装特性。
- **D C++ 中构造来源于同一基类的多个派生类**：❌ 涉及面向对象特性，不符合题意。从一个基类（父类）派生出多个子类的过程，直接应用了面向对象中的“继承”特性；若基类中含有虚函数，派生类还能重写虚函数以实现运行时“多态”。

**易错提醒：**
- **\`printf\` 与 \`cout\` 的范式差别**：虽然二者在 C++ 中都能完成控制台输出，但实现机制不同。\`printf\` 是独立的全局函数，属于面向过程；而 \`std::cout\` 是标准库 \`std::ostream\` 类预定义好的全局“对象”，通过重载运算符 \`<<\` 进行流输出，本质上依托了面向对象的类与方法设计。
- **C++ 中 \`struct\` 的定位**：C 语言中的 \`struct\` 只是纯粹的数据聚合体，但在 C++ 中，\`struct\` 已经被扩充为完整的类类型，可以定义成员函数和构造函数，也可以参与继承，属于面向对象支持的范畴。

**知识延伸：**
C++ 面向对象的三大核心特征：
1. **封装**：将数据和函数绑定在类中，隐藏内部细节，仅暴露规范接口；
2. **继承**：子类复用并拓展父类的属性和方法，建立清晰的类层次关系；
3. **多态**：同一接口在不同派生类中呈现出不同的行为（主要通过虚函数实现），提高代码的灵活性与通用性。`,
            tags: ['面向对象'],
        },
        {
            id: 2,
            type: "single",
            question: `关于以下 C++ 代码，（ ）行代码会引起编译错误。

\`\`\`cpp
#include <iostream>
using namespace std;

class Base {
private:
    int a;
protected:
    int b;
public:
    int c;
    Base() : a(1), b(2), c(3) {}
};

class Derived : public Base {
public:
    void show() {
        cout << a << endl;   // Line 1
        cout << b << endl;   // Line 2
        cout << c << endl;   // Line 3
    }
};
\`\`\``,
            options: [
                "Line 1",
                "Line 2",
                "Line 3",
                "没有编译错误",
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A（Line 1）**\n\n**核心解析：** Base 中 a 为 private、b 为 protected、c 为 public。Derived 公有继承 Base 后，在成员函数 show() 中：Line 1 直接访问 a，基类私有成员对派生类不可见，编译报错；Line 2 访问 b，protected 成员允许派生类内部访问；Line 3 访问 c，public 成员在类内外都可访问。因此只有 Line 1 引起编译错误。\n\n**选项分析：** B、C 两行均合法；D 忽略了 Line 1 的访问权限错误。\n\n**考点：** 面向对象、访问控制。\n\n**易错点：** **易错点：** 公有继承不会改变基类 private 成员的可访问性；派生类若要使用基类私有数据，只能通过基类提供的 public 或 protected 成员函数间接访问。判断访问权限时，先看成员在基类中的修饰符，再看继承方式；private 成员无论哪种继承方式都不可直接访问。",
            tags: ['面向对象'],
        },
        {
            id: 3,
            type: "single",
            question: `有 6 个元素，按照 6,5,4,3,2,1 的顺序进入栈 S ，下列（ ）的出栈序列是不能出现的（ ）。`,
            options: [
                "5,4,3,6,1,2",
                "4,5,3,1,2,6",
                "3,4,6,5,2,1",
                "2,3,4,1,5,6",
            ],
            answer: 2,
            score: 2,
            explanation: "**答案：C（3,4,6,5,2,1 不能出现）**\n\n**核心解析：** 入栈顺序固定为 6,5,4,3,2,1，出栈可在任意时刻穿插。判断时按入栈顺序压栈，并不断弹出与目标序列当前元素相同的栈顶；若某元素尚未成为栈顶却要求先出栈，则序列非法。\n\n对 C：要首出 3，需先压入 6,5,4,3，弹出 3 后栈为 [6,5,4]，再弹出 4，栈为 [6,5]。下一步目标要求 6 出栈，但 5 压在 6 上方，必须先出 5，故 C 无法实现。\n\nA、B、D 均可按“压入到目标元素、再弹出”的规则完成。例如 B 先压 6,5,4，弹出 4,5，再压 3 并弹出，最后处理 2,1,6 即可。\n\n**考点：** 栈、出栈序列判定。\n\n**易错点：** **易错点：** 判断出栈序列时，不要在某个选项验证成功后立即作答；本题问的是“不能出现”的序列，必须逐项检查，重点看栈内上下压盖关系。A、B、D 都能通过模拟完整走通，只有 C 在弹出 4 后卡住。",
            tags: ['栈'],
        },
        {
            id: 4,
            type: "single",
            question: `采用如下代码实现检查输入的字符串括号是否匹配，横线上应填入的代码为（ ）。\n\n\`\`\`cpp\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\nbool is_valid(string s) {\n    stack<char> st;\n    char top;\n    for (char& ch : s) {\n        if (ch == '(' || ch == '{' || ch == '[') {\n            st.push(ch);    // 左括号入栈\n        }\n        else {\n            if (st.empty())\n                return false;\n            ______________________ // 在此处填入代码\n            if ((ch == ')' && top != '(') ||\n                (ch == '}' && top != '{') ||\n                (ch == ']' && top != '[')) {\n                return false;\n            }\n        }\n    }\n    return st.empty();      // 栈为空则说明所有括号匹配成功\n}\n\`\`\`\n`,
            options: [
                "top = st.top(); st.pop();",
                "st.pop(); top = st.top();",
                "st.pop(); top = st.front();",
                "top = st.front(); st.pop();",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
横线位于遇到右括号时的分支内：需要**先取栈顶元素存入 top，再弹出**。

\`\`\`cpp
top = st.top(); st.pop();
\`\`\`

后续代码用 top 与 ch 比较判断是否匹配，若顺序颠倒或取错元素都会出错。

逐项分析：
- **A 先 top() 后 pop()**：正确。
- **B 先 pop() 后 top()**：错误，弹出后栈顶已变（或栈空），取到的是下一个括号。
- **C/D 用 \`st.front()\`**：错误，std::stack 只有 top() 接口，没有 front()（那是 queue 的）。

**易错点：** 与上卷同型题一样，top/pop 的先后顺序与 stack/queue 的接口区分是两大陷阱。

**考点：** 括号匹配（栈的经典应用）
        `,
            tags: ['栈', '字符串'],
        },
        {
            id: 5,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第2,3页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",


            question: `下面代码判断队列的第一个元素是否等于 a，并删除该元素，横线上应填写（ ）。\n\n\`\`\`cpp\n#include <iostream>\n#include <queue>\nusing namespace std;\nbool is_front_equal(std::queue<int>& q, int a) {\n    bool is_equal = false;\n    if (!q.empty()) {\n        ______________________ // 在此处填入代码\n    }\n    return is_equal;\n}\n\`\`\`\n`,
            options: [
                "is_equal = (q.front() == a);",
                "is_equal = (q.front() == a); q.pop();",
                "q.pop(); is_equal = (q.front() == a);",
                "q.pop(); is_equal = (q.top() == a);",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
函数目标：判断队首元素是否等于 a，**并删除该元素**——两个动作都要完成。

\`\`\`cpp
is_equal = (q.front() == a);  // 先取队首比较
q.pop();                      // 再删除
\`\`\`

逐项分析：
- **A 只比较不删除**：错误，漏了「删除该元素」的要求。
- **B 先比较后删除**：正确。
- **C 先删除后比较**：错误，删掉后 front() 取到的是下一个元素，比较对象错了。
- **D 用 \`q.top()\`**：错误，std::queue 没有 top() 接口（那是 stack 的）。

**易错点：** 题目要求「判断**并**删除」，只做一半就不完整；front/pop 顺序颠倒会改变语义。

**考点：** 队列 front/pop 配合
        `,
            tags: ['队列'],
        },
        {
            id: 6,
            type: "single",
            question: `假设字母表{a,b,c,d,e}在字符串出现的频率分别为 10% ， 15% ， 30% ， 16% ， 29% 。若使用哈夫曼编码方 式对字母进行二进制编码，则字符abcdef分别对应的一组哈夫曼编码的长度分别为（ ）。`,
            options: [
                "4, 4, 1, 3, 2",
                "3, 3, 2, 2, 2",
                "3, 3, 1, 2, 1",
                "4, 4, 1, 2, 2",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
频率：a=10，b=15，c=30，d=16，e=29。哈夫曼构建（每次取最小两个合并）：

1. 10+15=25（a、b）
2. 16+25=41（d、25）
3. 29+30=59（e、c）
4. 41+59=100（根）

编码长度 = 字符在树中的深度（边数）：a=3，b=3，c=2，d=2，e=2 → **3, 3, 2, 2, 2**，选 B。

逐项分析：
- **A 4,4,1,3,2**：错误，c 的频率最大（30），不可能编到 4 位而更短的是别的字符。
- **B 3,3,2,2,2**：正确。
- **C 3,3,1,2,1**：错误，若 c、e 深度只有 1，根的两个孩子直接是叶子，其余节点无处挂靠。
- **D 4,4,1,2,2**：错误。

验证 WPL = 10×3+15×3+30×2+16×2+29×2 = 225，恰好等于所有**合并产生的中间权值之和**（25+41+59+100=225）✓。

**易错点：** 编码长度是「根到叶子的边数」：根深度为 0，根的孩子深度 1；自检方法——Σ(频率×长度) 必须等于各次合并的中间权值之和，不等说明深度数错了。

**考点：** 哈夫曼编码长度计算
        `,
            tags: ['哈夫曼编码'],
        },
        {
            id: 7,
            type: "single",
            question: `以下 C++ 代码实现 n 位的格雷码，则横线上应填写（ ）。\n\n\`\`\`cpp\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n// 生成 n 位的格雷码\nvector<string> generate_graycode(int n) {\n    vector<string> graycode_list;\n    if (n <= 0) {\n        return graycode_list;\n    }\n    // 初始 1 位格雷码\n    graycode_list.push_back("0");\n    graycode_list.push_back("1");\n    // 迭代生成 n 位的格雷码\n    for (int i = 2; i <= n; i++) {\n        int current_size = graycode_list.size();\n        for (int j = current_size - 1; j >= 0; j--) {\n            graycode_list.push_back("1" + graycode_list[j]);\n        }\n        for (int j = 0; j < current_size; j++) {\n            ________________________________ // 在此处填入代码\n        }\n    }\n    return graycode_list;\n}\n\`\`\`\n`,
            options: [
                "graycode_list.push_back(\"0\"+graycode_list[j]);",
                "graycode_list[j] = \"0\"+graycode_list[j];",
                "graycode_list.push_back(\"1\"+graycode_list[j]);",
                "graycode_list[j] = \"1\"+graycode_list[j];",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
格雷码的**反射生成法**：n 位格雷码 = 在 (n−1) 位格雷码基础上，前半保持（前面补 0），后半**倒序**（前面补 1）。

代码中第一个循环已倒序加 \`"1" + graycode_list[j]\`；第二个循环（横线处）正序遍历前半部分，保持原码不变（相当于前面补 0）：

\`\`\`cpp
graycode_list[j] = "0" + graycode_list[j];
\`\`\`

逐项分析：
- **A \`push_back("0"+...)\`**：错误，会在尾部追加，破坏「前半 0 后半 1」的结构，列表长度也翻倍错误。
- **B \`graycode_list[j] = "0" + graycode_list[j];\`**：正确，原地给前半部分补前缀 0。
- **C push_back("1"+...)**：错误，与第一个循环重复，且位置不对。
- **D \`"1" + ...\` 原地改**：错误，前半部分应补 0 而非 1（补 1 会使相邻码多位变化）。

**易错点：** 反射法的对称结构：前半 = 旧码前加 0（顺序不变），后半 = 旧码倒序前加 1。用 n=2 验证：00,01,11,10——前半 00,01 正是 "0"+0,"0"+1。

**考点：** 格雷码的迭代生成
        `,
            tags: ['格雷编码'],
        },
        {
            id: 8,
            type: "single",
            question: `给定一棵二叉树，其前序遍历结果为： ABDECFG, 中序遍历结果为： DEBACFG ，则这棵树的正确后序遍历 结果是（ ）。`,
            options: [
                "EDBGFCA",
                "EDGBFCA",
                "DEBGFCA",
                "DBEGFCA",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
前序 ABDECFG 定根；中序 DEBACFG 分左右：

1. 根 **A**；中序左 \`DEB\`、右 \`CFG\`。
2. 左子树：前序 \`BDE\` → 根 **B**；中序 \`D|B|E\` → D 左、E 右。
3. 右子树：前序 \`CFG\` → 根 **C**；中序 \`F|C|G\` → F 左、G 右。

后序（左右根）：**D, E, B, F, G, C, A** = EDBGFCA，选 A。

逐项分析：
- **A EDBGFCA**：正确。
- **B EDGBFCA**：错误，F、G 顺序颠倒（F 是 C 的左孩子，后序应先于 G）。
- **C DEBGFCA**：错误，B 的左孩子是 D（D 先于 E）。
- **D DBEGFCA**：错误，同上。

**易错点：** 重建时逐层递归，别把「前序第二位是左子树根」当成固定规律——它只是本例巧合；标准做法是切中序。

**考点：** 由前序+中序求后序
        `,
            tags: ['树与二叉树', '遍历'],
        },
        {
            id: 9,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第4页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 4,
            sourcePages: [4],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",


            question: `一棵有 n 个结点的完全二叉树用数组进行存储与表示，已知根结点存储在数组的第 1 个位置。若存储在数组第 9 个位置的结点存在兄弟结点和两个子结点，则它的兄弟结点和右子结点的位置分别是（ ）。`,
            options: [
                "8, 18",
                "10, 18",
                "8, 19",
                "10, 19",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案为C。**

根下标从1开始时，结点i的父亲为floor(i/2)，左孩子为2i，右孩子为2i+1。结点9是奇数下标，对应父亲4的右孩子，兄弟为父亲的左孩子8。它自己的右孩子为2*9+1=19。

18是它的左孩子，10的父亲为5，二者都不是所问的位置。题目已保证兄弟与两个孩子存在，不需要另外处理缺少结点的边界。`,
            tags: ['树与二叉树', '数组'],
        },
        {
            id: 10,
            type: "single",
            question: `二叉树的深度定义为从根结点到叶结点的最长路径上的结点数，则以下基于二叉树的深度优先搜索实现的深度计算函数中横线上应填写（ ）。\n\n\`\`\`cpp\n// 定义二叉树的结点结构\nstruct tree_node {\n    int val;\n    tree_node* left;\n    tree_node* right;\n    tree_node(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n// 计算二叉树的深度\nint max_depth(tree_node* root) {\n    if (root == nullptr) {\n        return 0;  // 如果根结点为空，则深度为 0\n    }\n    int left_depth = max_depth(root->left);\n    int right_depth = max_depth(root->right);\n    ________________________________ // 在此处填入代码\n}\n\`\`\`\n`,
            options: [
                "return left_depth+right_depth;",
                "return max(left_depth, right_depth);",
                "return max(left_depth, right_depth)+1;",
                "return left_depth+right_depth+1;",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
递归计算深度：树深 = max(左子树深, 右子树深) + 1（加上根这一层）。

\`\`\`cpp
return max(left_depth, right_depth) + 1;
\`\`\`

空树返回 0（已给出），单节点树 = max(0,0)+1 = 1 ✓。

逐项分析：
- **A left+right**：错误，把两条路径长度相加没有意义。
- **B max 不加 1**：错误，漏掉根节点层，单节点树会得 0。
- **C max+1**：正确。
- **D left+right+1**：错误。

**易错点：** 「深度定义为路径上的**结点数**」——所以空树 0、单节点 1，递归式必须 +1；若定义是「边数」，则单节点为 0，递归不加 1。

**考点：** 递归求二叉树深度
        `,
            tags: ['树与二叉树', '深度优先搜索', '递归'],
        },
        {
            id: 11,
            type: "single",
            question: `上一题的二叉树深度计算还可以采用二叉树的广度优先搜索来实现。以下基于二叉树的广度优先搜索实现的深度计算函数中横线上应填写（ ）。\n\n\`\`\`cpp\n#include <queue>\nint max_depth_bfs(tree_node* root) {\n    if (root == nullptr) {\n        return 0; // 如果树为空，深度为 0\n    }\n    queue<tree_node*> q;\n    q.push(root);\n    int depth = 0;\n    // 使用队列进行层序遍历\n    while (!q.empty()) {\n        ________________________________ // 在此处填入代码\n        for (int i = 0; i < level_size; ++i) {\n            tree_node* node = q.front();\n            q.pop();\n            if (node->left) {\n                q.push(node->left);\n            }\n            if (node->right) {\n                q.push(node->right);\n            }\n        }\n    }\n    return depth;\n}\n\`\`\`\n`,
            options: [
                "int level_size = q.size(); depth++;",
                "int level_size = 2; depth++;",
                "int level_size = q.size(); depth += level_size;",
                "int level_size = 2; depth += level_size;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
BFS 求深度用**按层计数**：每轮 while 处理一整层——先记录当前层节点数 \`level_size = q.size()\`，处理完这层后 \`depth++\`。

\`\`\`cpp
int level_size = q.size(); depth++;
\`\`\`

横线后面紧跟 \`for (int i = 0; i < level_size; ++i)\` 逐个出队，变量 level_size 必须在循环前定义。

逐项分析：
- **A \`int level_size = q.size(); depth++;\`**：正确。
- **B \`int level_size = 2; depth++;\`**：错误，每层节点数不一定为 2。
- **C \`depth += level_size;\`**：错误，把节点数累加进深度，语义全错（且 level_size 未定义）。
- **D \`int level_size = 2; depth += level_size;\`**：错误，双重错误。

**易错点：** q.size() 必须在 for 循环**之前**存入 level_size——循环内 push 会改变 q.size()，直接在条件里用 q.size() 会越处理越多。

**考点：** BFS 按层计数求深度
        `,
            tags: ['树与二叉树', '广度优先搜索', '队列'],
        },
        {
            id: 12,
            type: "single",
            question: `二叉搜索树中的每个结点，其左子树的所有结点值都小于该结点值，右子树的所有结点值都大于该结点值。以下代码对给定的整数数组（假设数组中没有数值相等的元素），构造一个对应的二叉搜索树，横线上应填写（ ）:\n\n\`\`\`cpp\n// 定义二叉树的结点结构\nstruct tree_node {\n    int val;\n    tree_node* left;\n    tree_node* right;\n    tree_node(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n// 插入结点到二叉搜索树中\ntree_node* insert(tree_node* root, int val) {\n    if (root == nullptr) {\n        return new tree_node(val);\n    }\n    ________________________________ // 在此处填入代码\n    return root;\n}\n// 根据给定数组构造二叉搜索树\ntree_node* constructBST(const int arr[], int size) {\n    tree_node* root = nullptr;\n    for (int i = 0; i < size; ++i) {\n        root = insert(root, arr[i]);\n    }\n    return root;\n}\n\`\`\`\n`,
            options: [
                "if (val < root->val)\n  root->left = insert(root->left, val);\nelse\n  root->right = insert(root->right, val);",
                "if (val > root->val)\n  root->left = insert(root->left, val);\nelse\n  root->right = insert(root->right, val);",
                "if (val < root->val)\n  root->left = insert(root, val);\nelse\n  root->right = insert(root, val);",
                "if (val > root->val)\n  root->left = insert(root, val);\nelse\n  root->right = insert(root, val);",
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**核心解析：** BST 插入按“小往左、大往右”递归。当前结点为空时新建结点；否则 val<root->val 应递归插入左子树，val>root->val 递归插入右子树。由于 root 是指针值传递，必须把递归返回的新子树根赋回 root->left 或 root->right，才能把新结点挂到树上。因此横线应填 `if(val<root->val) root->left=insert(root->left,val); else root->right=insert(root->right,val);`。\n\n**选项分析：** B 比较方向颠倒；C 递归时仍传 root 自身，问题规模不缩小，会无限递归；D 同时犯这两个错误。\n\n**考点：** 树与二叉树、递归。\n\n**易错点：** 递归插入 BST 时，左右方向、递归参数和返回值挂接三处必须同时正确；任何一处写错都会破坏树结构或导致无限递归。",
            tags: ['树与二叉树', '递归'],
        },
        {
            id: 13,
            type: "single",
            question: `对上题中的二叉搜索树，当输入数组为 [5, 3, 7, 2, 4, 6, 8] 时，构建二叉搜索树，并采用如下代码实现的遍历方式，得到的输出是（ ）。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n// 遍历二叉搜索树，输出结点值\nvoid traversal(tree_node* root) {\n    if (root == nullptr) {\n        return;\n    }\n    traversal(root->left);\n    cout << root->val << " ";\n    traversal(root->right);\n}\n\`\`\`\n`,
            options: [
                "5 3 7 2 4 6 8",
                "2 3 4 5 6 7 8",
                "2 4 3 6 8 7 5",
                "2 4 3 5 6 7 8",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
输入 [5,3,7,2,4,6,8] 依次插入构建 BST：

\`\`\`text
        5
       / \
      3   7
     / \ / \
    2  4 6  8
\`\`\`

traversal 代码是**中序遍历**（左→根→右），BST 的中序遍历输出**升序序列**：

\`2 3 4 5 6 7 8\`，选 B。

逐项分析：
- **A 5 3 7 2 4 6 8**：错误，这是按输入顺序输出（前序恰好与输入同序，但代码是中序）。
- **B 2 3 4 5 6 7 8**：正确。
- **C/D**：错误，都不是中序结果。

**易错点：** 「BST + 中序 = 有序序列」是必考结论；判断遍历类型看 \`cout\` 与递归调用的相对位置：前（前序）、中（中序）、后（后序）。

**考点：** BST 构建与中序遍历
        `,
            tags: ['树与二叉树', '遍历'],
        },
        {
            id: 14,
            type: "single",
            question: `动态规划通常用于解决（ ）。`,
            options: [
                "无法分解的问题",
                "可以分解成相互依赖的子问题的问题",
                "可以通过贪心算法解决的问题",
                "只能通过递归解决的问题",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
动态规划的适用前提：问题能**分解成相互依赖（重叠）的子问题**，且具有最优子结构——DP 把重叠子问题的解存表复用。

逐项分析：
- **A 无法分解的问题**：错误，不能分解就没法用 DP。
- **B 可以分解成相互依赖的子问题的问题**：正确，「相互依赖」正是子问题重叠的体现。
- **C 可以通过贪心算法解决的问题**：错误，贪心能解的问题不必用 DP（DP 是更通用的框架，但题目问的是 DP 的典型适用场景）。
- **D 只能通过递归解决的问题**：错误，DP 恰恰常用**迭代**（自底向上填表）避免递归开销。

**易错点：** 分治（子问题独立）与 DP（子问题重叠/相互依赖）的分界，是概念辨析题的常见考点。

**考点：** 动态规划的适用场景
        `,
            tags: ['动态规划'],
        },
        {
            id: 15,
            type: "single",
            question: `阅读以下用动态规划解决的 0-1 背包问题的函数。假设背包容量 \`W\` 为 10kg，输入 4 个物品的重量 \`weights\` 分别为 1、3、4、6（单位为 kg），每个物品对应的价值 \`values\` 分别为 20、30、50、60，则函数的输出为（ ）。

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// 0/1 背包问题
int knapsack(int W, const vector<int>& weights,
             const vector<int>& values, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= W; ++w) {
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w],
                               dp[i - 1][w - weights[i - 1]]
                                   + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}
\`\`\``,
            options: [
                "90",
                "100",
                "110",
                "140",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C（110）**

**推导过程：**

容量为 10。四件物品为 \`(重量, 价值) = (1,20)、(3,30)、(4,50)、(6,60)\`。比较主要可行组合：

- 选重量 4 和 6：总重量 10，总价值 110；
- 选重量 1、3 和 4：总重量 8，总价值 100；
- 选重量 3 和 6：总重量 9，总价值 90；
- 四件全选的价值虽为 160，但总重量 14，超过容量。

因此最优值是 110。A 和 B 分别只得到次优组合；D 的 140 不对应任何不超过容量 10 的可行组合。

**易错点：** 0-1 背包中每件物品最多选一次；判断组合时必须同时检查总价值与总重量。

**考点：** 动态规划、0-1 背包、状态转移。`,
            tags: ['动态规划'],
        },
        {
            id: 16,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `C++ 、 Python 和 JAVA 等都是面向对象的编程语言。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
C++、Python、Java 都是支持**类、封装、继承、多态**的面向对象语言：

- C++：多范式语言，完整支持 OOP（还有过程式/泛型）；
- Python：一切皆对象，class 支持多态与继承；
- Java：纯面向对象设计（除基本类型外）。

说法正确。

**易错点：** C++ 同时支持多种范式，说它是「面向对象语言」是指它**支持** OOP，不代表它只有 OOP。

**考点：** 编程语言范式
        `,
            tags: ['面向对象'],
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，类的静态成员变量只能被该类对象的成员函数访问。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

静态成员变量属于**类**而不属于某个对象，访问方式是"类名::变量名"，不需要创建对象：

\`\`\`cpp
class A {
public:
    static int cnt;      // 声明
};
int A::cnt = 0;          // 定义

int main() {
    A::cnt = 10;         // 直接用类名访问，合法
    cout << A::cnt;
}
\`\`\`

只要静态成员是 \`public\`，在任何函数（含 \`main\`、其他类的成员函数）里都能通过类名访问；即使是 \`private\`，也可以由本类的成员函数（含静态成员函数）访问。

题干说"只能被该类对象的成员函数访问"，把"属于类"说成了"属于对象"，命题错误。

**易错提醒：** 静态成员变量不在对象内部，\`sizeof\` 对象时不计入；它存放在静态存储区，全程序只有一份。

**考点：** 类的静态成员变量、访问方式与存储特性。`,
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['静态成员'],
        },
        {
            id: 18,
            type: "judge",
            question: `栈是一种线性结构，可通过数组或链表来实现。二者相比，数组实现占用的内存较少，链表实现的入队和出 队操作的时间复杂度较低。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

前半句"数组实现占用的内存较少"成立——数组不需要为每个元素额外保存指针，链表每个结点都要多一个（或两个）指针域。

后半句不成立：栈只能在**一端**（栈顶）插入和删除，两种实现都是 $O(1)$：

- 数组实现：用一个 \`top\` 下标，入栈出栈都是改下标；
- 链表实现：在表头插入/删除。

也就是说"链表实现的时间复杂度较低"没有依据，二者同阶。另外栈的操作叫入栈（push）和出栈（pop），题干写成"入队和出队"是队列的说法。

**易错提醒：** 数组实现栈的短板不是时间而是**容量固定**（需扩容）；链表实现没有容量上限，但有指针开销。

**考点：** 栈的顺序存储与链式存储对比。`,
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['栈', '数组', '链表'],
        },
        {
            id: 19,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `运行以下 C++ 代码，屏幕将输出 \"derived class\"。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nclass base {\npublic:\n    virtual void show() {\n        cout << \"base class\" << endl;\n    }\n};\nclass derived : public base {\npublic:\n    void show() override {\n        cout << \"derived class\" << endl;\n    }\n};\nint main() {\n    base* b;\n    derived d;\n    b = &d;\n    b->show();\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
代码中 base::show() 是 **virtual**，derived 用 override 重写。main 里：

\`\`\`cpp
base* b;
derived d;
b = &d;
b->show();   // 动态绑定 → derived::show()
\`\`\`

基类指针指向派生类对象，调用虚函数发生**动态绑定**，输出 \`derived class\`，说法正确。

**易错点：** 若 show() 没有 virtual，b->show() 会静态绑定输出 "base class"——virtual 关键字是本题的唯一分水岭。

**考点：** 虚函数与动态绑定
        `,
            tags: ['面向对象'],
        },
        {
            id: 20,
            type: "judge",
            question: `如下列代码所示的基类（ base ）及其派生类（ derived ），则生成一个派生类的对象时，只调用派生类的构造 函数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

派生类对象的构造顺序是：**先基类，后派生类**。创建 \`derived\` 对象时，编译器会先调用 \`base\` 的构造函数，再执行 \`derived\` 的构造函数体：

\`\`\`cpp
class base {
public:
    base() { cout << "base constructor" << endl; }
    ~base() { cout << "base destructor" << endl; }
};
class derived : public base {
public:
    derived() { cout << "derived constructor" << endl; }
    ~derived() { cout << "derived destructor" << endl; }
};
// derived d; 的输出顺序：
// base constructor
// derived constructor
\`\`\`

所以不是"只调用派生类的构造函数"，命题错误。析构顺序与构造相反：先派生类，后基类。

**易错提醒：** 普通继承一律"基类先、派生类后"；只有虚基类等特殊场景才有额外规则。

**考点：** 继承体系中构造与析构函数的调用顺序。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['面向对象'],
        },
        {
            id: 21,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `哈夫曼编码本质上是一种贪心策略。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
哈夫曼编码的构建过程：每次从森林中取**频率最小的两个**节点合并——这正是贪心策略（每步局部最优选择，最终达到全局最优 WPL）。

贪心正确性由哈夫曼的「最优前缀码」定理保证：频率高的字符编码短。

**易错点：** 贪心策略不一定都得到全局最优，但哈夫曼构建是可以**证明**的贪心最优特例。

**考点：** 哈夫曼编码与贪心策略
        `,
            tags: ['哈夫曼编码', '贪心'],
        },
        {
            id: 22,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `如果根结点的深度记为 1，则一棵恰有2024个叶结点的二叉树的深度最少是12。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案为正确。**

根深度记为1时，深度为h的二叉树最多有2^(h-1)个叶结点。h=11时最多1024个，不足2024。h=12时最多2048个，足以容纳2024个叶结点。

这个下界可以达到。例如从深度12的满二叉树出发，将最底层24对兄弟叶子各折叠为其父叶子，叶子数从2048减少到2024，仍保留深度12。因此最少深度恰为12。`,
            tags: ['树与二叉树'],
        },
        {
            id: 23,
            type: "judge",
            question: `在非递归实现的树的广度优先搜索中，通常使用栈来辅助实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

广度优先搜索（BFS）按层访问，遵循**先进先出**，因此用**队列**；栈是先进后出，用栈会得到深度优先的顺序。

- BFS：队列（\`queue\`），按层扩展；
- DFS（非递归）：栈（\`stack\`），沿一条路走到底再回溯。

题干把两者弄反了，命题错误。

**易错提醒：** 记忆口诀"广队深栈"。判断这类题先想先进先出还是先进后出。

**考点：** 图的遍历、BFS 与 DFS 的辅助数据结构。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['广度优先搜索', '队列'],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `状态转移方程是动态规划的核心，可以通过递推方式表示问题状态的变化。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
状态转移方程是 DP 的核心：它用**递推式**描述状态之间的演化关系（如 dp[i][w] = max(dp[i-1][w], dp[i-1][w-wᵢ]+vᵢ)），把大问题的解由小问题的解逐步推出。

有了转移方程，既可以自底向上递推填表（迭代），也可以自顶向下记忆化搜索（递归）。

**易错点：** 「递推方式表示」不等于「只能递推实现」——记忆化搜索同样基于转移方程。

**考点：** 状态转移方程的作用
        `,
            tags: ['动态规划', '递推'],
        },
        {
            id: 25,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第8,9页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `应用动态规划算法时，识别并存储重叠子问题的解是必须的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
DP 效率的来源正是**存储重叠子问题的解**：识别哪些子问题会被反复计算，把它们的结果存入表格（记忆化），之后直接查表而不重复计算。

若子问题互不重叠（如归并排序的分治），存储反而浪费空间——但那类问题本就不属于 DP 适用范围。对 DP 适用的问题，识别并存储重叠子问题解是必要步骤，说法正确。

**易错点：** 「识别」与「存储」缺一不可：只识别不存储，仍是指数级重复计算；这也是 0-1 背包二维 dp 表存在的意义。

**考点：** 重叠子问题的存储
        `,
            tags: ['动态规划'],
        },
        ...programmingQuestions
    ]
};
