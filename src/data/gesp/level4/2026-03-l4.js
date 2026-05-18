// 2026年3月 GESP C++ 四级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        {
          input: `3 5
7 6 6 7 9
6 5 6 7 6
6 5 7 8 9`,
          output: `3`
        }
      ],
      question: `
# [GESP202603 四级] 山之谷

## 题目描述

现有一片山地，可以视为一个 \\\\\\\\\\\\\\$N\\\\\\\\\\\\\\$ 行 \\\\\\\\\\\\\\$M\\\\\\\\\\\\\\$ 列的网格图，第 \\\\\\\\\\\\\\$i\\\\\\\\\\\\\\$ 行 \\\\\\\\\\\\\\$j\\\\\\\\\\\\\\$ 列的海拔为 \\\\\\\\\\\\\\$h_{i,j}\\\\\\\\\\\\\\$。如果一个单元格的海拔不高于其所有相邻单元格（相邻包括上、下、左、右、左上、右上、左下、右下，最多 8 个方向）的海拔，则称该单元格为山谷。请你数一数该片山地中有多少山谷。

## 输入格式

第一行包含 2 个整数 \\\\\\\\\\\\\\$N, M\\\\\\\\\\\\\\$，表示山地的大小。之后 \\\\\\\\\\\\\\$N\\\\\\\\\\\\\\$ 行，每行包含 \\\\\\\\\\\\\\$M\\\\\\\\\\\\\\$ 个整数 \\\\\\\\\\\\\\$h_{i,1}, h_{i,2}, \\\\\\\\\\\\\\\\dots, h_{i,M}\\\\\\\\\\\\\\$，表示海拔。

## 输出格式

输出 1 行，包含 1 个整数 \\\\\\\\\\\\\\$C\\\\\\\\\\\\\\$，表示山谷的数量。
`,
      score: 25,
      explanation: `**解析：**
本题考察对二维数组的邻居定义与条件判断。
1.  **山谷定义**：一个格子的海拔 $h_{i,j}$ 如果小于或等于它周围所有相邻格子的海拔，则该格子是山谷。
2.  **邻居查找**：
    - 周围相邻格子包括 8 个方向（上、下、左、右及四个对角线）。
    - 可以通过两个偏移数组 \`dx[] = {-1, -1, -1, 0, 0, 1, 1, 1}\` 和 \`dy[] = {-1, 0, 1, -1, 1, -1, 0, 1}\` 来遍历。
3.  **边界处理**：在遍历邻居时，必须检查坐标 $(ni, nj)$ 是否仍在网格范围内（即 $1 \leq ni \leq N, 1 \leq nj \leq M$）。
4.  **算法流程**：嵌套循环遍历每一个格子，对每个格子再循环遍历其 8 个邻居。若发现任何一个邻居的海拔低于当前格子，则当前格子不是山谷。

**核心逻辑提示：**
\`\`\`cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        bool isValley = true;
        for (int k = 0; k < 8; k++) {
            int ni = i + dx[k], nj = j + dy[k];
            if (ni >= 1 && ni <= n && nj >= 1 && nj <= m) {
                if (h[i][j] > h[ni][nj]) { // 如果有邻居比它更低
                    isValley = false;
                    break;
                }
            }
        }
        if (isValley) ans++;
    }
}
\`\`\``,
      tags: ["编程题", "二维数组", "模拟"],
      template: "#include <iostream>\n\nusing namespace std;\n\nint h[105][105];\nint dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};\nint dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            cin >> h[i][j];\n        }\n    }\n    \n    int ans = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            bool ok = true;\n            for (int k = 0; k < 8; k++) {\n                int ni = i+dx[k];\n                int nj = j+dy[k];\n                if (ni >= 1 && ni <= n && nj >= 1 && nj <= m) {\n                    if (h[i][j] > h[ni][nj]) {\n                        ok = false;\n                        break;\n                    }\n                }\n            }\n            if (ok) ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      referenceCode: "#include <iostream>\n\nusing namespace std;\n\nint h[105][105];\nint dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};\nint dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            cin >> h[i][j];\n        }\n    }\n    \n    int ans = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            bool ok = true;\n            for (int k = 0; k < 8; k++) {\n                int ni = i+dx[k];\n                int nj = j+dy[k];\n                if (ni >= 1 && ni <= n && nj >= 1 && nj <= m) {\n                    if (h[i][j] > h[ni][nj]) {\n                        ok = false;\n                        break;\n                    }\n                }\n            }\n            if (ok) ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
      problemNumber: 'B4501',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        {
          input: `4 3
3 5 2
4 1 5
2 2 4
3 4 3`,
          output: `3 4 2 1`
        }
      ],
      question: `
# [GESP202603 四级] 礼盒排序

## 题目描述

商店推出了许多礼盒，每个礼盒中包含 \\\\\\\\\\\\\\$k\\\\\\\\\\\\\\$ 件商品，每件商品都有一个价格。现在需要对这些礼盒进行排序，排序规则如下：
1. 先按礼盒总价格从小到大排序；
2. 如果总价格相同，则按礼盒中最贵商品的价格从小到大排序；
3. 如果仍然相同，则按礼盒中最便宜商品的价格从小到大排序；
4. 如果上述规则都相同，则按礼盒原本的编号（从 1 开始）从小到大排序。

## 输入格式

第一行包含两个整数 \\\\\\\\\\\\\\$n, k\\\\\\\\\\\\\\$，表示礼盒数量和每个礼盒中的商品数量。接下来的 \\\\\\\\\\\\\\$n\\\\\\\\\\\\\\$ 行，每行包含 \\\\\\\\\\\\\\$k\\\\\\\\\\\\\\$ 个整数，表示对应礼盒中商品的价格。

## 输出格式

输出一行，包含 \\\\\\\\\\\\\\$n\\\\\\\\\\\\\\$ 个整数，用空格分隔，表示排序后的礼盒编号。
`,
      score: 25,
      explanation: `**解析：**
本题考察结构体多关键字排序的实现。
1.  **数据预处理**：
    - 为每个礼盒建立结构体，存储：总价格 \`sum\`、最高价格 \`mx\`、最低价格 \`mn\` 以及原始编号 \`id\`。
2.  **排序优先级**：
    - 第一优先级：\`sum\`（从小到大）。
    - 第二优先级：\`mx\`（从小到大）。
    - 第三优先级：\`mn\`（从小到大）。
    - 第四优先级：\`id\`（从小到大）。
3.  **实现方式**：自定义比较函数 \`cmp\`，依次判断四个字段，若前一字段不相等则返回比较结果，否则继续比较下一字段。

**核心逻辑提示：**
\`\`\`cpp
struct Box {
    long long sum;
    int mx, mn, id;
};

bool cmp(const Box &a, const Box &b) {
    if (a.sum != b.sum) return a.sum < b.sum;
    if (a.mx != b.mx) return a.mx < b.mx;
    if (a.mn != b.mn) return a.mn < b.mn;
    return a.id < b.id;
}
\`\`\``,
      tags: ["编程题", "结构体", "排序"],
      template: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Combo {\n    int sum, mx, mn, id;\n};\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Combo {\n    int sum, mx, mn, id;\n};\n\nbool cmp(const Combo &a, const Combo &b) {\n    if (a.sum != b.sum) return a.sum < b.sum;\n    if (a.mx != b.mx) return a.mx < b.mx;\n    if (a.mn != b.mn) return a.mn < b.mn;\n    return a.id < b.id;\n}\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<Combo> v(n);\n    for (int i = 0; i < n; i++) {\n        v[i].sum = 0;\n        v[i].mx = -1;\n        v[i].mn = 1000000000;\n        v[i].id = i+1;\n        int x;\n        for (int j = 0; j < k; j++) {\n            cin >> x;\n            v[i].sum += x;\n            v[i].mx = max(v[i].mx, x);\n            v[i].mn = min(v[i].mn, x);\n        }\n    }\n    sort(v.begin(), v.end(), cmp);\n    for (int i = 0; i < n; i++) {\n        cout << v[i].id << (i == n-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
      answer: '',
      problemNumber: 'B4502',
    }
];

export const paperData = {
    id: '2026-03-l4',
    title: '2026年3月 GESP C++ 四级真题',
    level: 4,
    year: 2026,
    month: 3,
    session: 1,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `执行下面程序后，输出为（ ）。\n\`\`\`cpp\nint f(int x = 2){\n return x * 3;\n}\n\nint main(){\n cout << f() << " " << f(4);\n return 0;\n}\n\`\`\``,
            options: ["2 12", "6 12", "6 4", "12 6"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (6 12)**

**选项逐项分析：**
- **A 2 12 / C 6 4 / D 12 6**：❌ 错误。
- **B 6 12**：✅ 正确。
  1. 函数 \`f(int x = 2)\` 定义了默认参数为 2。
  2. \`f()\`：调用时未传参，使用默认值 \`x = 2\`，返回 $2 \times 3 = 6$。
  3. \`f(4)\`：调用时传入 4，\`x = 4\`，返回 $4 \times 3 = 12$。
  4. 最终输出结果为 "6 12"。

**考点：** C++ 函数的默认参数（Default Arguments）机制。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `执行下面代码后，输出为（ ）。\n\`\`\`cpp\nint main() {\n int a = 5;\n int* p = &a;\n int** q = &p;\n **q += 7;\n cout << a << " " << *p;\n return 0;\n}\n\`\`\``,
            options: ["5 5", "12 12", "12 5", "5 12"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (12 12)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B 12 12**：✅ 正确。
  1. \`p\` 指向 \`a\` 的地址。
  2. \`q\` 是二级指针，指向指针 \`p\`。
  3. \`**q\` 相当于 \`*p\`，即变量 \`a\`。
  4. \`**q += 7\` 即 \`a = a + 7\`，\`a\` 变为 12。
  5. \`cout << a << " " << *p\`：两者最终访问的都是变量 \`a\`，故输出 12 12。

**考点：** C++ 多级指针（二级指针）的指向与解引用逻辑。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `已知有如下定义：\n\`\`\`cpp\nint a[3][4] = {\n {1, 2, 3, 4},\n {5, 6, 7, 8},\n {9, 10, 11, 12}\n};\nint (*p)[4] = a;\n\`\`\`\n则表达式 \`*(*(p+2)+1)\` 的值为（ ）。`,
            options: ["6", "10", "7", "11"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (10)**

**选项逐项分析：**
- **A 6 / C 7 / D 11**：❌ 错误。
- **B 10**：✅ 正确。
  1. \`p\` 指向数组 \`a\` 的起始（第 0 行）。
  2. \`p+2\` 指向第 2 行（即索引为 2 的那一行 \`{9, 10, 11, 12}\`）。
  3. \`*(p+2)\` 退化为指向该行首元素 \`9\` 的指针。
  4. \`*(p+2)+1\` 指向该行第二个元素 \`10\`。
  5. \`*(*(p+2)+1)\` 解引用取出该元素的值 10。

**考点：** 数组指针（Array Pointer）在二维数组访问中的应用。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `执行下列代码后，输出是（ ）。\n\`\`\`cpp\nint main() {\n int a[] = {1, 2, 3, 4, 5};\n int *p = a+1;\n cout << p[2];\n return 0;\n}\n\`\`\``,
            options: ["2", "4", "3", "5"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (4)**

**选项逐项分析：**
- **A 2 / C 3 / D 5**：❌ 错误。
- **B 4**：✅ 正确。
  1. \`a\` 为 \`{1, 2, 3, 4, 5}\`。
  2. \`p = a + 1\`，此时 \`p\` 指向元素 \`2\`（索引为 1 的位置）。
  3. \`p[2]\` 等价于 \`*(p + 2)\`。
  4. 由于 \`p\` 已经偏离了起始位置 1 个单位，\`p + 2\` 相当于 \`a + 1 + 2 = a + 3\`。
  5. \`a[3]\` 的值是 4。

**考点：** C++ 指针算术运算与数组索引的等价性。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `执行下面代码后，输出为（ ）。\n\`\`\`cpp\nint main() {\n char s[] = "GESP";\n char *p = s+2;\n cout << *p << " " << p[1];\n return 0;\n}\n\`\`\``,
            options: ["S P", "G E", "E S", "S G"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (S P)**

**选项逐项分析：**
- **A S P**：✅ 正确。
  1. 字符串 \`s\` 为 "GESP"，即 \`s[0]='G', s[1]='E', s[2]='S', s[3]='P'\`。
  2. \`p = s + 2\`，指针 \`p\` 指向 \`s[2]\`（即 'S'）。
  3. \`*p\` 取出当前指向的值：'S'。
  4. \`p[1]\` 等价于 \`*(p + 1)\`，即 \`s[3]\`：'P'。
- **B / C / D**：❌ 错误。

**考点：** C 风格字符串（字符数组）的内存分布与指针访问。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下列关于 C++ 中 delete 运算符的说法，错误的是（ ）。`,
            options: ["delete 用于释放 new 分配的内存", "delete 只能用于释放数组内存", "释放数组内存时应使用 delete[]", "对同一个指针多次使用 delete 可能会导致程序崩溃"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (delete 只能用于释放数组内存)**

**选项逐项分析：**
- **A delete 用于释放 new 分配的内存**：✅ 正确。\`new\` 申请，\`delete\` 释放。
- **B delete 只能用于释放数组内存**：❌ 错误。\`delete\` 用于释放单个对象（由 \`new\` 分配），释放数组应当使用 \`delete[]\`。
- **C 释放数组内存时应使用 delete[]**：✅ 正确。这是 C++ 内存管理的规范要求。
- **D 对同一个指针多次使用 delete 可能导致崩溃**：✅ 正确。这被称为“二次释放（Double Free）”，会导致未定义行为。

**考点：** C++ 动态内存管理（Dynamic Memory Management）的基本规则。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `执行下面代码后，输出为（ ）。\n\`\`\`cpp\nint f(int n) {\n if (n <= 1) return 1;\n return n * f(n-1);\n}\n\nint main() {\n cout << f(4);\n return 0;\n}\n\`\`\``,
            options: ["6", "24", "12", "4"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (24)**

**选项逐项分析：**
- **A 6 / C 12 / D 4**：❌ 错误。
- **B 24**：✅ 正确。
  递归执行过程：
  - $f(4) = 4 \times f(3)$
  - $f(3) = 3 \times f(2)$
  - $f(2) = 2 \times f(1)$
  - $f(1) = 1$（触发基准条件）
  - 回溯计算：$1 \times 2 \times 3 \times 4 = 24$。

**考点：** 递归算法（Recursion）的执行流程与阶乘计算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `下列关于递归的说法，正确的是（ ）。`,
            options: ["递归函数不能有返回值", "递归过程必须有终止条件以防止死递归", "递归函数只能在 main 函数中调用", "任何问题都可以用递归非常高效地解决"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (递归过程必须有终止条件以防止死递归)**

**选项逐项分析：**
- **A 递归函数不能有返回值**：❌ 错误。递归函数通常需要返回值来向上一层回传计算结果。
- **B 必须有终止条件**：✅ 正确。没有终止条件的递归会陷入无限死循环，最终导致“栈溢出（Stack Overflow）”。
- **C 只能在 main 中调用**：❌ 错误。递归函数最重要的特征就是它会调用自身（或互相调用）。
- **D 总是非常高效**：❌ 错误。递归若不加优化（如记忆化），在处理重复子问题（如普通斐波那契递归）时效率极低。

**考点：** 递归算法的核心要素与优缺点。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `已知一个序列为 {8, 3, 5, 2, 9}，使用插入排序（从小到大）进行第一轮排序后的结果是（ ）。`,
            options: ["{3, 5, 8, 2, 9}", "{3, 8, 5, 2, 9}", "{2, 3, 5, 8, 9}", "{3, 2, 5, 8, 9}"],
            answer: 1,
            score: 2,
            explanation: `**答案：B ({3, 8, 5, 2, 9})**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B {3, 8, 5, 2, 9}**：✅ 正确。
  1. 初始序列：\`{8, 3, 5, 2, 9}\`。
  2. 第一轮排序：从第二个元素 3 开始，将其与前面的有序部分 \`{8}\` 比较。
  3. 因为 $3 < 8$，将 8 后移，3 插入到首位。
  4. 得到结果：\`{3, 8, 5, 2, 9}\`。

**考点：** 插入排序（Insertion Sort）的单步执行过程。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `在 5 个元素（从小到大已排好序）中进行折半查找，目标元素位于最后一位，查找过程中需要比较的次数是（ ）。`,
            options: ["1", "3", "4", "5"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (3)**

**选项逐项分析：**
- **A 1 / C 4 / D 5**：❌ 错误。
- **B 3**：✅ 正确。
  折半查找（Binary Search）过程：
  1. 查找范围 \`[0, 4]\`（元素：1, 2, 3, 4, 5）。
  2. 第一次比较：中间位置 \`mid = (0+4)/2 = 2\`，\`arr[2] = 3\`。因为 $5 > 3$，去右侧查找。
  3. 第二次比较：中间位置 \`mid = (3+4)/2 = 3\`，\`arr[3] = 4\`。因为 $5 > 4$，去右侧查找。
  4. 第三次比较：中间位置 \`mid = (4+4)/2 = 4\`，\`arr[4] = 5\`。命中目标。
  共比较 3 次。

**考点：** 二分查找算法（Binary Search）的模拟计算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `下面代码试图把数组按升序进行“插入排序”，横线处应填写（ ）。\n\`\`\`cpp\nvoid ins(int a[], int n){\n    for(int i = 1; i < n; i++){\n        int key = a[i];\n        int j = i-1;\n        while(j >= 0 && __________){\n            a[j+1] = a[j];\n            j--;\n        }\n        a[j+1] = key;\n    }\n}\n\`\`\``,
            options: ["a[j] < key", "a[j] > key", "a[j+1] > key", "a[j] == key"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (a[j] > key)**

**选项逐项分析：**
- **A a[j] < key**：❌ 错误。这会把较小元素右移，形成降序方向。
- **B a[j] > key**：✅ 正确。升序插入排序中，当前面已排序部分的元素大于待插入值 \`key\` 时，需要把该元素向右移动，为 \`key\` 腾出位置。
- **C a[j+1] > key**：❌ 错误。\`a[j+1]\` 在循环中会被覆盖，不是用于比较已排序区元素的正确位置。
- **D a[j] == key**：❌ 错误。只在相等时移动无法完成升序排序。

**考点：** 插入排序的内层移动条件。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `下列代码段的时间复杂度为（ ）。\n\`\`\`cpp\nint cnt=0;\nfor(int i=0; i<n; i++){\n    for(int j=0; j<n; j++){\n        if((i+j) % 3 == 0) cnt++;\n    }\n}\n\`\`\``,
            options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(2^n)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：C ($O(n^2)$)**

**选项逐项分析：**
- **A $O(n)$**：❌ 错误。代码不是单层循环。
- **B $O(n \\log n)$**：❌ 错误。没有折半、分治合并或排序这类对数因子结构。
- **C $O(n^2)$**：✅ 正确。外层循环执行 $n$ 次，内层循环对每个 \`i\` 也执行 $n$ 次，总循环次数为 $n \\times n$。循环内的取模和判断都是常数时间，所以总时间复杂度为 $O(n^2)$。
- **D $O(2^n)$**：❌ 错误。代码没有指数级递归或组合枚举。

**考点：** 双重循环时间复杂度分析。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `下列哪个算法的时间复杂度是 $O(n log n)$？`,
            options: ["计数排序", "快速排序（平均情况）", "冒泡排序", "顺序查找"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (快速排序（平均情况）)**

**选项逐项分析：**
- **A 计数排序**：❌ 错误。计数排序的时间复杂度为 $O(N + K)$。
- **B 快速排序（平均情况）**：✅ 正确。基于分治思想，平均每次将规模减半，复杂度为 $O(n log n)$。
- **C 冒泡排序**：❌ 错误。复杂度为 $O(N^2)$。
- **D 顺序查找**：❌ 错误。复杂度为 $O(N)$。

**考点：** 常用排序与查找算法的时间复杂度分析。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `一个长度为 N 的序列，使用选择排序进行排序，比较次数的数量级是（ ）。`,
            options: ["$O(N)$", "$O(N^2)$", "$O(log n)$", "$O(n log n)$"],
            answer: 1,
            score: 2,
            explanation: `**答案：B ($O(N^2)$)**

**选项逐项分析：**
- **A $O(N)$ / C $O(log n)$ / D $O(n log n)$**：❌ 错误。
- **B $O(N^2)$**：✅ 正确。
  选择排序（Selection Sort）的核心逻辑是：
  1. 遍历 $N-1$ 轮。
  2. 每一轮都要扫描剩余未排序的部分以寻找极值。
  3. 比较次数总计为 $(N-1) + (N-2) + \dots + 1 = \frac{N(N-1)}{2}$ 次。
  4. 无论数据初始状态如何（有序或逆序），比较次数均保持在此量级。

**考点：** 选择排序算法的时间复杂度计算。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `执行下面代码后，输出为（ ）。\n\`\`\`cpp\nint main() {\n vector<int> v = {1, 2, 3};\n v.push_back(4);\n cout << v.size() << " " << v.back();\n return 0;\n}\n\`\`\``,
            options: ["4 4", "3 3", "3 4", "4 3"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (4 4)**

**选项逐项分析：**
- **A 4 4**：✅ 正确。
  1. 初始：\`v = {1, 2, 3}\`，\`size()\` 为 3。
  2. \`v.push_back(4)\`：在末尾添加 4，此时 \`v = {1, 2, 3, 4}\`。
  3. \`v.size()\`：返回元素个数，为 4。
  4. \`v.back()\`：返回最后一个元素的引用，值为 4。
- **B / C / D**：❌ 错误。

**考点：** C++ STL \`vector\` 容器的基本操作（size, push_back, back）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `下面代码执行结束后，变量 a 的值变成 15。\n\`\`\`cpp\nvoid add10(int &x) { x += 10; }\nint main() {\n int a = 5;\n add10(a);\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`void add10(int &x)\` 定义了形参 \`x\` 为引用类型。
2.  引用传递（Pass by Reference）使得 \`x\` 成为实参 \`a\` 的一个别名。
3.  在函数内部执行 \`x += 10\`，直接修改了 \`main\` 函数中 \`a\` 变量所在的内存。
4.  \`a\` 的值从 5 变为 15。

**考点：** C++ 函数参数的引用传递特性。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `引用一旦绑定某个变量，就不能再绑定其他变量。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
在 C++ 中，引用（Reference）本质上是变量的一个别名。它在定义时必须被初始化（绑定到一个对象），且一旦绑定后，**终生不能更改其指向**（即不能再重新绑定到另一个对象）。对引用的再次赋值操作只会修改其当前所绑定的那个变量的值。

**考点：** C++ 引用的核心性质（不可重绑定）。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `执行下面代码，输出结果为 5。\n\`\`\`cpp\nint main() {\n int a[2][3];\n cout << &a[1][2]-&a[0][1] << endl;\n return 0;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  **指针相减含义**：指针相减的结果是两个地址之间相隔的元素个数。
2.  **元素索引计算**：
    - \`a[0][1]\` 是第 2 个元素（索引为 1）。
    - \`a[1][2]\` 对应行索引 1，列索引 2。在 $2 \times 3$ 的数组中，其物理序号为 $1 \times 3 + 2 = 5$（索引从 0 开始）。
3.  **相减结果**：$5 - 1 = 4$。
4.  因此输出结果应为 4，而不是 5。

**考点：** 二维数组物理内存排布与指针算术运算。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `下面程序可以正常编译并输出 10。\n\`\`\`cpp\nint calc(int x, int y = 10);\nint calc(int x) { return x * 2; }\nint calc(int x, int y) { return x * y; }\n\nint main() {\n cout << calc(5);\n return 0;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  函数 1：\`calc(int x, int y = 10)\`（带默认参数）。
2.  函数 2：\`calc(int x)\`（普通函数）。
3.  调用处：\`calc(5)\` 只有一个参数。
4.  **二义性冲突**：编译器既可以调用第一个函数（使用默认值 \`y=10\`），也可以调用第二个函数。由于两者都完全匹配，编译器无法抉择，会产生“重载二义性（Ambiguity）”编译错误。

**考点：** C++ 函数重载与默认参数导致的二义性冲突。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `下面程序执行后输出 2010。\n\`\`\`cpp\nint x = 10;\nvoid f() { int x = 20; cout << x; }\nint main() {\n f();\n cout << x;\n return 0;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`f()\` 执行：内部定义了局部变量 \`x = 20\`，并输出 20。
2.  主程序继续：执行 \`cout << x\`。此时访问的是全局变量 \`x = 10\`，输出 10。
3.  由于两次输出之间没有空格或换行符，屏幕最终显示为 "2010"。

**考点：** 局部变量屏蔽与全局变量的访问顺序。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `在 C++ 中，如果声明了一个指针变量但没有显式初始化，该指针会自动初始化为 nullptr。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，**局部非静态变量**（包括指针）在声明时如果没有显式初始化，其初始值是未定义的（随机的垃圾值），并不会自动初始化为 \`nullptr\`。只有全局变量或静态变量才会被自动初始化为零值。

**考点：** C++ 变量初始化规则与未定义行为。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `下面代码没有语法错误。\n\`\`\`cpp\nstruct GameCharacter {\n string name;\n int level;\n struct Equipment {\n string weapon;\n int attack_bonus;\n int defense_bonus;\n } equipment;\n struct Skill {\n string name;\n int damage;\n } skills[8];\n int skill_count;\n};\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
C++ 允许结构体嵌套定义。代码中 \`GameCharacter\` 内部嵌套定义并实例化了 \`Equipment\` 和 \`Skill\` 结构体，且数组定义 \`skills[8]\` 也符合语法规则。

**考点：** C++ 结构体（struct）的嵌套定义与成员数组。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `下面程序能够把 Hello 写入 data.txt 文件中。\n\`\`\`cpp\nofstream fout("data.txt");\ncout << "Hello";\nfout.close();\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  \`ofstream fout("data.txt");\` 创建了一个指向文件的输出流。
2.  \`cout << "Hello";\` 是将字符串输出到**标准输出设备（通常是屏幕）**，而不是文件。
3.  要写入文件，应当使用 \`fout << "Hello";\`。

**考点：** C++ 标准输出流（cout）与文件流（ofstream）的区别。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `由于选择排序和插入排序的时间复杂度均为 $O(N^2)$，在任何实际场景下两者的性能表现几乎相同，可以互相替代。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
尽管时间复杂度相同，但两者的执行细节和适用场景不同：
1.  **插入排序**：在处理“近乎有序”的数组时，其效率接近 $O(N)$，且由于其交换次数较少（常数项小），通常优于选择排序。
2.  **选择排序**：无论数据分布如何，其比较次数恒定，且由于其交换次数较少，可能在某些特殊情况下有微弱优势，但在大多数实际场景中表现不如插入排序。

**考点：** 常用排序算法（$O(N^2)$ 级别）的性能细微差异分析。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `下面用递归方式计算斐波那契数列第 n 项的程序，时间复杂度是 $O($2^n$)$。\n\`\`\`cpp\nint fib(int n) {\n if (n <= 1) return n;\n int f0 = 0, f1 = 1, cur = 0;\n for (int i = 2; i <= n; i++) {\n cur = f0+f1;\n f0 = f1;\n f1 = cur;\n }\n return cur;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  **递归方式**：是指函数通过调用自身来解决问题，如 \`fib(n) = fib(n-1) + fib(n-2)\`，其复杂度为 $O(2^n)$。
2.  **当前代码**：使用了 \`for\` 循环和三个辅助变量进行滚动计算。这属于**递推（或动态规划）**实现方式。
3.  **复杂度**：单层循环的执行次数为 $n-1$，因此时间复杂度是 $O(N)$，而不是 $O(2^n)$。

**考点：** 递归与递推实现方式的区别及其对时间复杂度的影响。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
