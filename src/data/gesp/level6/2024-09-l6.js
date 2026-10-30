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
      explanation: `**解析：**
      这是“最少完全平方数分拆”。先用四平方定理：答案一定在 1~4 之间；依次判断是否本身是平方数、是否可写成两个平方数之和，再用 Legendre 三平方定理判断是否必须是 4，否则就是 3。

      **考点：** 动态规划
      `,
      tags: ["编程题", "动态规划"],
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
      先对每个知识点把题目价值从大到小排序，求出达到总掌握度至少 k 所需的最少题数 need_i。若某个知识点总和都不足 k，则无解。随后还要满足“相邻题知识点不同”，等价于所选题目能重排为相邻不同；若最大 need_i 过大，就必须从其他知识点再补选一些题直到 maxCnt <= total-maxCnt+1。

      **考点：** 贪心、排序
      `,
      tags: ["编程题", "贪心", "排序"],
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
            explanation: `
**答案：B**

**解析：**
题目问**没有**涉及 C++ 面向对象特性的选项。C++ 的 OOP 特性围绕 class/struct、封装、继承、多态展开。

逐项分析：
- **A 构造 class 或 struct**：涉及，类的定义是 OOP 的基础。
- **B 调用 printf 函数**：不涉及，printf 是 C 标准库的**过程式** I/O 函数，与类/对象毫无关系（C++ 中更常用 cout）。
- **C 调用用户定义的类成员函数**：涉及，通过对象调用成员函数是封装的体现。
- **D 构造来源于同一基类的多个派生类**：涉及，这是继承与多态的典型场景。

**易错点：** printf/cout 都能输出，但 printf 是 C 语言函数库遗产，不依附于任何类；cout 是 ostream 类的对象——「是否依附于类」是判断是否涉及 OOP 的标尺。

**考点：** 面向对象特性的辨识
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            explanation: `**答案：A**

**解析：**
Base 类中 \`a\` 是 private、\`b\` 是 protected、\`c\` 是 public。派生类 Derived 的成员函数可以访问基类的 protected 和 public 成员，但 private 成员对派生类完全不可见。

- **A Line 1**：正确答案。\`a\` 是 Base 的 private 成员，Derived::show() 中访问它，编译器报 \`'int Base::a' is private within this context\`。
- **B Line 2**：\`b\` 是 protected 成员，派生类内部可以访问，不报错。
- **C Line 3**：\`c\` 是 public 成员，任何位置都可以访问，不报错。
- **D 没有编译错误**：错误，Line 1 已无法通过编译。

g++ 编译验证：仅 Line 1 报 private 访问错误，Line 2、Line 3 无错误。

**考点：** 面向对象、访问控制
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            explanation: `
**答案：C**

**解析：**
进栈顺序 6,5,4,3,2,1（固定顺序），出栈可在任意时刻插入。用「进栈指针、出栈指针双指针模拟」逐项验证：

- **A 5,4,3,6,1,2**：push6,push5 → pop5 → push4 → pop4 → push3 → pop3 → pop6 → push2,push1 → pop1,pop2 ✓ 可行。
- **B 4,5,3,1,2,6**：push6,5,4 → pop4 → pop5 → push3 → pop3 → push2,1 → pop1,pop2 → pop6 ✓ 可行。
- **C 3,4,6,5,2,1**：pop3、pop4 之后栈内剩 [6,5]（5 在栈顶），下一个要出 **6**——但 5 压在 6 上面，必须先出 5 ✗ **不可行**。
- **D 2,3,4,1,5,6**：push6,5,4,3,2 → pop2,3,4 → push1 → pop1 → pop5,pop6 ✓ 可行。

**易错点：** 判断「出栈序列不可能」的标志：序列中出现「大数先于压在它上面的数出栈」的倒置——C 中 6 先于 5 出栈即矛盾。

**考点：** 栈的出栈序列合法性
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `一棵有 n 个结点的完全二叉树用数组进行存储与表示，已知根结点存储在数组的第 1 个位置。若存储在数组第 9 个位置的结点存在兄弟结点和两个子结点，则它的兄弟结点和右子结点的位置分别是（ ）。`,
            options: [
                "8, 18",
                "10, 18",
                "8, 19",
                "10, 19",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
完全二叉树数组存储、**从 1 开始编号**：节点 i 的父节点是 ⌊i/2⌋，孩子是 2i（左）、2i+1（右）。

节点 9：
- **兄弟结点**：父节点 = ⌊9/2⌋ = 4；9 是偶数（右孩子），兄弟是同一父节点的另一个孩子 = 2×4 = **8**。
- **右子结点**：2×9+1 = **19**。

所以兄弟 8、右孩子 19，选 C。

逐项分析：
- **A 8, 18**：错误，18=2×9 是**左**孩子。
- **B 10, 18**：错误，10 不是 9 的兄弟（10 的父节点是 5）。
- **C 8, 19**：正确。
- **D 10, 19**：错误，兄弟错了。

**易错点：** 兄弟结点的找法：先求父节点 ⌊i/2⌋，兄弟就是父节点的另一个孩子——i 为偶数（左孩子）时兄弟是 i+1，i 为奇数（右孩子）时兄弟是 i−1。9 是奇数 → 9 是父节点的右孩子，兄弟 = 8 ✓。

**考点：** 完全二叉树数组索引关系
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            explanation: `
**答案：A**

**解析：**
BST 插入：**val 小于根 → 挂左子树，大于根 → 挂右子树**（题目保证无相等值），递归返回值接回孩子指针。

\`\`\`cpp
if (val < root->val)
  root->left = insert(root->left, val);
else
  root->right = insert(root->right, val);
\`\`\`

逐项分析：
- **A**：正确，方向与参数都对。
- **B**：错误，大于根反而进左子树。
- **C/D**：错误，递归仍传 \`root\` 自身而不是子树，无法向深层推进，无限递归爆栈。

**易错点：** \`root->left = insert(...)\` 的赋值不可省——insert 返回（可能新建的）子树根，必须接回；本题函数参数是值传递的指针，这一点尤其关键。

**考点：** BST 递归插入
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `如果根结点的深度记为 ，则一棵恰有 个叶结点的二叉树的深度最少是 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
设根深度为 1，二叉树有 n 个叶结点时，**深度最少是 ⌈log₂n⌉ + 1**。

原因：深度为 h 的二叉树最多有 2^(h−1) 个叶结点（第 h 层全满）。要容纳 n 个叶子，需 2^(h−1) ≥ n，即 h ≥ log₂n + 1，最少 h = ⌈log₂n⌉（当 n 恰为 2 的幂时 h = log₂n + 1，一般写 ⌈log₂n⌉ + 1 的约定差异源于「恰有」与层的定义）。

按官方口径（根深度记 1）：n 个叶子的最少深度 h 满足第 h 层至少 n 个位置可放叶子，h = ⌈log₂n⌉ + 1 与 ⌈log₂(n+1)⌉ 在 n 为 2 的幂时一致。结论：叶结点越多，树的最少深度越大，命题成立。

**易错点：** 「最少深度」对应**完全/满**的形态；「最多深度」是 n−1（退化成链，此时叶子只有 1 个，注意约束对象是叶子数）。

**考点：** 二叉树叶子数与深度的关系
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        ...programmingQuestions
    ]
};
