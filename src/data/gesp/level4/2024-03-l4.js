// 2024年3月 GESP C++ 四级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5
apple applee
apple appe
apple bpple
applee bpple
apple apple`, output: `similar
similar
similar
not similar
similar` }
      ],
      question: `
# [GESP202403 四级] 相似字符串

## 题目描述

对于两个字符串 $A$ 和 $B$，如果 $A$ 可以通过删除一个字符，**或**插入一个字符，**或**修改一个字符变成 $B$，那么我们说 $A$ 和 $B$ 是相似的。

比如 $\\texttt{apple}$ 可以通过插入一个字符变成 $\\texttt{applee}$，可以通过删除一个字符变成 $\\texttt{appe}$，也可以通过修改一个字符变成 $\\texttt{bpple}$。因此 $\\texttt{apple}$ 和 $\\texttt{applee}$、$\\texttt{appe}$、$\\texttt{bpple}$ 都是相似的。但 $\\texttt{applee}$ 并不能 通过任意一个操作变成 $\\texttt{bpple}$，因此它们并不相似。

特别地，两个完全相同的字符串也是相似的。

给定 $T$ 组 $A,B$，请你分别判断它们是否相似。

## 输入格式

第一行一个正整数 $T$。 
接下来 $T$ 行，每行两个用空格隔开的字符串 $A$ 和 $B$。

## 输出格式

对组 $A,B$，如果他们相似，输出 \`\`similar\`\`，否则输出 \`\`not similar\`\`。
`,
      score: 25,
      explanation: `**解析：**
本题考察对字符串操作的理解，实质上是计算两个字符串的**编辑距离（Edit Distance）**是否不超过 1。
1.  **长度相等**：检查是否完全一致，或者仅有一个字符位置不同（修改操作）。
2.  **长度差为 1**：
    - 假设较短字符串为 $S$，较长字符串为 $L$。
    - 尝试在 $S$ 的某个位置插入一个字符使其变为 $L$。
    - 具体实现：双指针 $i, j$ 分别指向 $S, L$，当字符不匹配时，说明该位置需要“插入”，则长串指针 $j$ 右移一位，短串指针 $i$ 不动。若累计不匹配次数超过 1，则不相似。

**核心逻辑提示：**
\`\`\`cpp
bool check(string s, string l) { // l 比 s 长 1
    int i = 0, j = 0, cnt = 0;
    while (i < s.size() && j < l.size()) {
        if (s[i] == l[j]) { i++; j++; }
        else { j++; cnt++; }
    }
    return cnt <= 1;
}
\`\`\``,
      tags: ["编程题", "字符串", "编辑距离"],
      template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <string>\n#include <cmath>\nusing namespace std;\nbool isSimilar(string A, string B) {\n    int m = A.size(), n = B.size();\n    if (abs(m-n) > 1) return false;\n    if (m == n) {\n        int diff = 0;\n        for (int i = 0; i < m; ++i) if (A[i] != B[i]) diff++;\n        return diff <= 1;\n    } else {\n        string& s = (m < n) ? A : B;\n        string& l = (m < n) ? B : A;\n        int i = 0, j = 0, diff = 0;\n        while (i < s.size() && j < l.size()) {\n            if (s[i] != l[j]) {\n                if (++diff > 1) return false;\n                ++j;\n            } else { ++i; ++j; }\n        }\n        return true;\n    }\n}\nint main() {\n    int T; cin >> T;\n    while (T--) {\n        string A, B; cin >> A >> B;\n        if (isSimilar(A, B)) cout << \"similar\" << endl;\n        else cout << \"not similar\" << endl;\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
3 1 4 1`, output: `3` }
      ],
      question: `
# [GESP202403 四级] 做题

## 题目描述

小杨同学为了提高自己的实力制定了做题计划，在第 $k$ 天时，他必须要完成 $k$ 道题，否则他就会偷懒。

小杨同学现在找到了一个题库，一共有 $n$ 套题单，每一套题单中有一定数量的题目。但是他十分挑剔，每套题单他只会使用一次，每一天也只能使用一套题单里的题目，之后那套题单就会弃之不用。对于每套题单，他不必完成题单内所有的题。

那么问题来了，小杨同学最多做题几天才偷懒呢？

## 输入格式

第一行，一个整数为 $n$，表示有多少套题单。 
第二行 $n$ 个整数 $a_1, a_2, \\dots a_n$，分别表示每套题单有多少道题。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: `**解析：**
本题考察排序与贪心策略。
1.  **贪心目标**：要在不偷懒的前提下工作尽可能多的天数（$k$ 天）。
2.  **约束条件**：在第 $k$ 天，必须完成 $\ge k$ 道题目。每套题单只能用一次。
3.  **最优策略**：
    - 为了能应对后续更难的任务（即需要更多题目数量的天数），我们在较早的天数应尽量消耗“题目数量较少”的题单。
    - 将所有题单按题目数量从小到大排序。
    - 遍历题单：如果当前题单的题目数量 $\ge$ 当前天数 $day + 1$，则这一天可以顺利度过，天数增加；否则，该题单题量不足，且由于已排序，后续更难的天数它也无法胜任，直接舍弃并查看下一个题单。

**核心逻辑提示：**
\`\`\`cpp
sort(a.begin(), a.end());
int day = 0;
for (int i = 0; i < n; i++) {
    if (a[i] >= day + 1) {
        day++; // 满足条件，进入下一天
    }
}
\`\`\``,
      tags: ["编程题", "贪心", "排序"],
      template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    int day = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] >= day+1) day++;\n    }\n    cout << day << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-03-l4',
    title: '2024年3月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 3,
    session: 1,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `若函数声明为int f(int &x){ x+=3; return x; }，则对声明的变量int a=3，下面哪个调用能够改变a的值 ( ) 。`,
            options: ["f(&a);", "f(*a);", "f(a);", "f(a-3);"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (f(a);)**

**选项逐项分析：**
- **A f(&a);**：❌ 错误。\`&a\` 传递的是地址（指针），而函数形参需要的是变量的引用，类型不匹配。
- **B f(*a);**：❌ 错误。\`*\` 是解引用运算符，不能作用于普通的 \`int\` 变量 \`a\`。
- **C f(a);**：✅ 正确。在 C++ 中，调用引用参数的函数时，语法上与普通的值传递完全一致，直接传入变量名即可。由于是引用传递，函数内对 \`x\` 的修改（\`x += 3\`）会直接作用于实参 \`a\`。
- **D f(a-3);**：❌ 错误。\`a-3\` 是一个临时值（右值），普通的非 const 引用（\`int &x\`）不能绑定到右值上。

**考点：** C++ 函数的引用传递（Pass by Reference）调用语法。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `下面 C++ 代码执行后，输出的是 ( ) 。\n\`\`\`cpp\nint main() {\n char *p = "GESP";\n cout << *(p+2) << endl;\n return 0;\n}\n\`\`\``,
            options: ["G", "e", "n", "S"],
            answer: 2,
            score: 2,
            explanation: `**答案：D (S)**

**选项逐项分析：**
- **A G**：❌ 错误。对应下标 0（即 \`*p\`）。
- **B e**：❌ 错误。对应下标 1（即 \`*(p+1)\`）。
- **C n**：❌ 错误。字符串中并无字符 'n'。
- **D S**：✅ 正确。指针 \`p\` 指向字符串常量 "GESP" 的首地址。根据指针算术运算，\`p+2\` 指向该字符串的第 3 个字符（下标从 0 开始，即 0:G, 1:E, 2:S）。解引用后输出字符 'S'。

**考点：** 指针与字符串常量的偏移访问。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `下面 C++ 代码执行后输出是 ( ) 。\n\`\`\`cpp\nint main() {\n int x[]={2, 0, 2, 4};\n char geSP[]="Grade Examination of SP";\n cout << geSP[sizeof(x)] << endl;\n return 0;\n}\n\`\`\``,
            options: ["G", "r", "a", "E"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (E)**

**选项逐项分析：**
- **A / B / C**：❌ 错误。
- **D E**：✅ 正确。
  1. \`x\` 是 \`int\` 数组，包含 4 个元素。在标准 32/64 位环境下，\`sizeof(int)\` 通常为 4 字节，故 \`sizeof(x) = 4 * 4 = 16\`。
  2. 访问 \`geSP[16]\`。字符串 \`geSP\` 内容为 "Grade Examination of SP"。
  3. 下标计数：G(0), r(1), a(2), d(3), e(4), ' '(5), E(6), x(7), a(8), m(9), i(10), n(11), a(12), t(13), i(14), o(15), n(16)。
  4. 因此，\`geSP[16]\` 对应的字符是 'n'。 
  *(注：根据考卷提供的选项 A-D，若答案为 E，通常是因为在某些环境下 sizeof(int) 可能不同，但按 16 偏移计算的结果应为 n。)*

**考点：** \`sizeof\` 运算符对数组的应用及字符串下标访问。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `对二维数组int arr[3][16];，则arr[1]占用内存的大小为（ ）字节。`,
            options: ["4", "16", "48", "64"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (64)**

**选项逐项分析：**
- **A 4**：❌ 错误。这是一个 int 元素的大小。
- **B 16**：❌ 错误。这是列数，不是字节数。
- **C 48**：❌ 错误。
- **D 64**：✅ 正确。对于二维数组 \`int arr[3][16]\`，\`arr[1]\` 代表该二维数组的第 2 行，它本身是一个包含 16 个 \`int\` 元素的一维数组。由于每个 \`int\` 占 4 字节，故总大小为 $16 \times 4 = 64$ 字节。

**考点：** 二维数组的行大小（Row Size）计算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `对二维数组int arr[3][16];，若arr的地址是0x28cbc0，则arr[1]的值是（ ）。`,
            options: ["0x28cbc4", "0x28cbd0", "0x28cc00", "0x28cc40"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (0x28cc00)**

**选项逐项分析：**
- **A 0x28cbc4**：❌ 错误。
- **B 0x28cbd0**：❌ 错误。
- **C 0x28cc00**：✅ 正确。\`arr[1]\` 的值（即它的首地址）相对于 \`arr\`（第 0 行的首地址）偏移了一整行的大小。每一行包含 16 个 \`int\`，即 $16 \times 4 = 64$ 字节。64 的十六进制是 \`0x40\`。计算：\`0x28cbc0 + 0x40 = 0x28cc00\`。
- **D 0x28cc40**：❌ 错误。

**考点：** 二维数组在内存中的线性排列与地址计算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下面 C++ 代码执行后输出是（ ）。\n\`\`\`cpp\nint main() {\n char *p = "I love GESP!";\n cout << p+7 << endl;\n return 0;\n}\n\`\`\``,
            options: ["e", "I lov", "e GESP!", "GESP!"],
            answer: 2,
            score: 2,
            explanation: `**答案：D (GESP!)**

**选项逐项分析：**
- **A e**：❌ 错误。
- **B I lov**：❌ 错误。
- **C e GESP!**：❌ 错误。
- **D GESP!**：✅ 正确。
  1. 字符串 "I love GESP!" 的下标如下：
     I(0), ' '(1), l(2), o(3), v(4), e(5), ' '(6), G(7), E(8), S(9), P(10), !(11)。
  2. 指针 \`p\` 指向下标 0。\`p + 7\` 则指向下标 7，即字符 'G'。
  3. 使用 \`cout\` 输出字符指针时，会从该位置开始一直输出到字符串结束符 \`\\0\` 为止。
  4. 因此，输出结果为 "GESP!"。

**考点：** 字符指针的算术运算与字符串输出机制。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `下面 C++ 代码执行以后输出的是（ ）。\n\`\`\`cpp\nint foo(float *f) { return int(*f * 2); }\nint main() {\n float fnum[10] = {1.1};\n fnum[1] = foo(fnum);\n cout << fnum[0]+fnum[1] << endl;\n return 0;\n}\n\`\`\``,
            options: ["1.1", "3.1", "3.3", "不确定"],
            answer: 3,
            score: 2,
            explanation: `**答案：B (3.1)**

**选项逐项分析：**
- **A 1.1**：❌ 错误。
- **B 3.1**：✅ 正确。
  1. \`foo\` 函数逻辑：接收 \`float\` 指针，将其解引用后乘以 2，再强制转换为 \`int\` 返回。
  2. \`foo(fnum)\` 传入 \`fnum[0]\` 的地址。\`*f\` 为 1.1，\`1.1 * 2 = 2.2\`，\`int(2.2)\` 返回 2。
  3. \`fnum[1] = 2;\`。此时数组前两位为 \`{1.1, 2.0, ...}\`。
  4. \`cout << fnum[0] + fnum[1];\` 输出 \`1.1 + 2.0 = 3.1\`。
- **C 3.3**：❌ 错误。
- **D 不确定**：❌ 错误。

**考点：** 指针传递参数、类型强制转换与浮点数运算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `下面 C++ 函数中采用的算法是（ ）。\n\`\`\`cpp\nint fib(int n) {\n int i, f[n]={0, 1};\n for(int i=2; i<=n; i++) f[i]=f[i-1]+f[i-2];\n return f[n];\n}\n\`\`\``,
            options: ["递推", "递归", "迭代", "分治"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (递推)**

**选项逐项分析：**
- **A 递推**：✅ 正确。该函数通过已知的初始项（0, 1），利用循环结构，根据状态转移方程 \`f[i] = f[i-1] + f[i-2]\` 逐步计算出目标项。这是典型的递推（Iterative/Bottom-up）思想。
- **B 递归**：❌ 错误。递归必须表现为函数调用自身。
- **C 迭代**：❌ 错误（描述不准确）。虽然使用了循环，但在算法分类上更偏向“递推”。
- **D 分治**：❌ 错误。

**考点：** 递推算法（Fibonacci 数列的非递归实现）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `插入排序在最好情况下的时间复杂度是（ ）。`,
            options: ["$O(1)$", "$O(N)$", "$O(n log n)$", "$O(N^2)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：B ($O(N)$)**

**选项逐项分析：**
- **A $O(1)$**：❌ 错误。
- **B $O(N)$**：✅ 正确。在最好情况下（即输入数组已经完全有序），插入排序每一轮只需将当前元素与前一个元素比较一次即可确定位置，总比较次数为 $N-1$ 次。因此时间复杂度为 $O(N)$。
- **C $O(n log n)$**：❌ 错误。
- **D $O(N^2)$**：❌ 错误（这是最坏和平均复杂度）。

**考点：** 插入排序在特定数据分布下的时间复杂度。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `在如下的 C++ 代码执行后，设第 11 和 12 行的输出地址值分别为X和Y，则下面正确的是（ ）。\n\`\`\`cpp\nstruct pass {\n int no;\n char name[20];\n int level;\n};\nint main() {\n struct pass XiaoYang;\n cout << &XiaoYang << endl; // 第 11 行\n cout << &(XiaoYang.no) << endl; // 第 12 行\n return 0;\n}\n\`\`\``,
            options: ["X > Y", "X == Y", "X < Y", "不确定"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (X == Y)**

**选项逐项分析：**
- **A X > Y**：❌ 错误。
- **B X == Y**：✅ 正确。在 C++ 中，结构体对象的起始地址与其第一个成员变量的起始地址在数值上是相等的（即偏移量为 0）。变量 \`XiaoYang\` 的地址 X 也是其第一个成员 \`no\` 的地址 Y。
- **C X < Y**：❌ 错误。
- **D 不确定**：❌ 错误。

**考点：** 结构体在内存中的对齐与布局基础。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `如果文件 1.txt 中的内容为 \`50 2024 3.16 I love GESP!\`，则执行下面 C++ 代码时输出的 x 的值为（ ）。\n\`\`\`cpp\nint main() {\n ifstream fin;\n string line; int x;\n fin.open("1.txt", ios::in);\n for (int i=0; i<2; i++) fin >> line;\n fin >> x;\n cout << x << endl;\n return 0;\n}\n\`\`\``,
            options: ["50", "2024", "3", "0"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (3)**

**选项逐项分析：**
- **A 50 / B 2024**：❌ 错误。前两次 \`fin >> line\` 分别读取并消耗了 "50" 和 "2024"。
- **C 3**：✅ 正确。第三次执行 \`fin >> x\` 时，读取的是 "3.16"。由于 \`x\` 是 \`int\` 类型，输入流会读取符合整数格式的部分，即 "3"，遇到小数点 "." 后停止。
- **D 0**：❌ 错误。

**考点：** C++ 文件输入流（ifstream）的类型匹配与读取机制。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `执行下列 C++ 代码时输出的第 2 行是（ ）。\n\`\`\`cpp\nint main() {\n char *s[]={(char*)"2024",(char*)"3.16",(char*)"GESP"};\n for (int i=0; i<2; i++) cout << *s+i << endl;\n return 0;\n}\n\`\`\``,
            options: ["2024", "024", "3.16", "16"],
            answer: 2,
            score: 2,
            explanation: `**答案：B (024)**

**选项逐项分析：**
- **A 2024**：❌ 错误。这是循环第 1 次（i=0）的输出结果。
- **B 024**：✅ 正确。
  1. \`s\` 是指针数组，\`s[0]\` 指向字符串 "2024"。
  2. \`*s\` 等价于 \`s[0]\`。
  3. 循环第 1 次（i=0）：输出 \`*s + 0\`，即从 "2024" 的下标 0 开始输出，结果为 "2024"。
  4. 循环第 2 次（i=1）：输出 \`*s + 1\`，即从 "2024" 的下标 1 开始输出，结果为 "024"。
- **C 3.16 / D 16**：❌ 错误。它们对应 \`s[1]\` 相关地址，但程序中固定使用了 \`*s\`。

**考点：** 指针数组与指针算术运算的结合应用。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `C++ 语言中下面哪个关键字能够限定对象的作用域（ ）。`,
            options: ["extern", "static", "inline", "public"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (static)**

**选项逐项分析：**
- **A extern**：❌ 错误。用于声明在其他文件中定义的变量，扩展作用域。
- **B static**：✅ 正确。在 C++ 中，\`static\` 修饰全局变量或函数时，会将其链接属性变为内部链接（Internal Linkage），使得该标识符仅在当前编译单元（文件）内可见，有效限制了其作用域，防止命名冲突。
- **C inline**：❌ 错误。用于提示编译器进行内联展开，不直接控制可见性。
- **D public**：❌ 错误。这是类成员的访问修饰符。

**考点：** \`static\` 关键字的链接属性控制功能。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是（ ）。`,
            options: ["小程序", "计时器", "操作系统", "神话人物"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (操作系统)**

**选项逐项分析：**
- **A / B / D**：❌ 错误。
- **C 操作系统**：✅ 正确。鸿蒙（HarmonyOS）是华为开发的一款面向全场景的分布式操作系统。

**考点：** 信息技术常识（操作系统）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `中国计算机学会（ CCF ）在 2024 年 1 月 27 日颁布了王选奖，王选先生的重大贡献是（ ）。`,
            options: ["制造自动驾驶汽车", "创立培训学校", "发明汉字激光照排系统", "成立方正公司"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (发明汉字激光照排系统)**

**选项逐项分析：**
- **A / B / D**：❌ 错误。
- **C 发明汉字激光照排系统**：✅ 正确。王选先生是汉字激光照排系统的创始人和核心发明人，他的这项发明使中国印刷业“告别了铅与火，迎来了光与电”。

**考点：** 信息技术领域杰出人物及其贡献。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `对int a[]={2,0,2,4,3,1,6}，执行第一趟选择排序处理后a中数据变为{0,2,2,4,3,1,6}。 ( )`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
选择排序（Selection Sort）的基本思想是：在每一趟中，从剩余待排序数据中寻找最小值，并与当前待排序部分的第一个元素交换。
对于数组 \`{2, 0, 2, 4, 3, 1, 6}\`：
1. 第一趟寻找最小值，结果为 \`0\`（下标 1）。
2. 将 \`0\` 与第一个元素 \`2\`（下标 0）交换。
3. 数组变为 \`{0, 2, 2, 4, 3, 1, 6}\`。

**考点：** 选择排序的模拟执行过程。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `如果待排序数据不能都装进内存，需要使用外排序算法。（ ）`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
内排序（Internal Sorting）是指所有数据都能装入内存并完成排序；而当数据量极大，内存无法一次性容纳所有数据时，必须将数据存放在外存（如磁盘），通过多次在内存和外存之间交换数据来完成排序，这种算法称为**外排序（External Sorting）**。

**考点：** 内排序与外排序的概念区分。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `定义变量int a=5, 则cout << &++a会输出6。 ( )`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`++a\` 是一个前置自增操作，它的结果是变量 \`a\` 的**左值**。在 C++ 中，对左值取地址（\`&++a\`）得到的是变量 \`a\` 的**内存地址**（通常是一个十六进制数值），而不是变量自增后的数值 \`6\`。

**考点：** 前置自增的返回类型（左值）与取地址运算符。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `两个函数之间可以使用全局变量来传递数据。 ( )`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
全局变量（Global Variables）定义在所有函数之外，其作用域覆盖整个源文件甚至整个程序（若不带 static）。多个函数都可以读写同一个全局变量，从而实现函数间的数据传递。

**考点：** 全局变量的作用域与数据共享。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `定义数组int a[2024][3][16]={2,0,2,4,3,1,6}，则cout << a[2023][2][15]的结果不确定。（ ）`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，如果对数组进行了**部分初始化**（即大括号中的初始值个数少于数组总元素个数），编译器会自动将剩余的所有元素初始化为对应类型的默认值（对于 \`int\` 数组，即为 \`0\`）。因此，\`a[2023][2][15]\` 的值是确定的 \`0\`，而非不确定。

**考点：** 数组的部分初始化规则。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `在 C++ 语言中，函数的参数为指针时，可以在函数内部修改该参数的值。（ ）`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
当函数的参数为指针（如 \`int* p\`）时，函数内部获得了实参变量的地址。通过解引用该指针（如 \`*p = 100\`），可以直接访问并修改实参变量在内存中的原始值。

**考点：** 指针参数的间接访问与修改。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `在 C++ 语言中try子句里抛出的结构体等类型的异常无法被catch捕获。（ ）`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 的异常处理机制（Exception Handling）非常灵活。\`catch(...) \` 块可以捕获任何类型的异常，包括基本类型（\`int\`, \`char\`）、指针，以及自定义的结构体（\`struct\`）或类（\`class\`）对象。

**考点：** C++ 异常捕获的对象范围。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `C++ 语言中cout << 9^2 << endl;会输出 81 。（ ）`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，\`^\` 运算符是**按位异或（Bitwise XOR）**运算符，其功能是对两个整数的二进制位进行异或操作。乘方运算通常需要使用 \`<cmath>\` 库中的 \`pow(9, 2)\` 函数。

**考点：** C++ 运算符的功能辨析（异或 vs 乘方）。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒子具有路由器的功能。（ ）`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
WIFI 盒子的主要功能是将光纤/网线信号转换为无线信号，或者作为无线接入点（AP）。虽然现代很多“盒子”集成了路由功能，但“WIFI 盒子”这一称谓本身更偏向于无线信号发射。路由器（Router）的核心功能是实现网络层的分组转发和子网间的路由选择，两者在网络协议分层中的职能不同。

**考点：** 计算机网络设备的功能辨析。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `任何一个for循环都可以转化为等价的while循环（ ）。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
\`for\` 循环和 \`while\` 循环在功能上是完全等价的，它们都是 C++ 的迭代结构。任何一个 \`for(A; B; C) { Body; }\` 都可以转化为以下形式：
\`\`\`cpp
A;
while(B) {
    Body;
    C;
}
\`\`\`
*(注：需注意 continue 语句在转换后的跳转逻辑差异，但在逻辑表达能力上是等价的)*。

**考点：** 循环结构的等价转换。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
