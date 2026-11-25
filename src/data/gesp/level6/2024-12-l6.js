// 2024年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 2
URR`, output: `7` }
      ],
      question: "# [GESP202412 六级] 树上游走\n\n## 题目描述\n\n小杨有一棵包含无穷节点的二叉树（即每个节点都有左儿子节点和右儿子节点；除根节点外，每个节点都有父节点），其中根节点的编号为 $1$，对于节点 $i$，其左儿子的编号为 $2\\times i$，右儿子的编号为 $2\\times i + 1$。\n\n小杨会从节点 $s$ 开始在二叉树上移动，每次移动为以下三种移动方式的任意一种：\n\n- **第 1 种移动方式**：如果当前节点存在父亲节点，向上移动到当前节点的父节点，否则不移动；\n- **第 2 种移动方式**：移动到当前节点的左儿子；\n- **第 3 种移动方式**：移动到当前节点的右儿子。\n\n小杨想知道移动 $n$ 次后自己所处的节点编号。**数据保证最后所处的节点编号不超过 $10^{12}$**。\n\n## 输入格式\n\n第一行包含两个正整数 $n$ 和 $s$，代表移动次数和初始节点编号。\n\n第二行包含一个长度为 $n$ 且仅包含大写字母 $\\tt{U}$、$\\tt{L}$ 和 $\\tt{R}$ 的字符串，代表每次移动的方式，其中 $\\tt{U}$ 代表第 1 种移动方式，$\\tt{L}$ 代表第 2 种移动方式，$\\tt{R}$ 代表第 3 种移动方式。\n\n## 输出格式\n\n输出一个正整数，代表最后所处的节点编号。\n\n## 数据范围\n\n对于 20% 的测试点，保证 $1\\le n\\le 10$，$1\\le s\\le 2$。\n\n对于 20% 的测试点，保证 $1\\le n\\le 50$，$1\\le s\\le 10$。\n\n对于另外 60% 的测试点，保证 $1\\le n\\le 10^6$，$1\\le s\\le 10^{12}$。\n\n对于所有测试点，保证 $1\\le n\\le 10^6$，$1\\le s\\le 10^{12}$，且最终节点编号不超过 $10^{12}$。\n",
      score: 25,
      explanation: "**解析：**\n\n### 题目分析\n题目给定一棵无限满二叉树：节点 i 的左儿子为 2i、右儿子为 2i+1，父节点为 floor(i/2)；在根节点 1 执行 U 时原地不动。需要模拟长度为 n 的操作序列。\n\n### 算法\n直接维护当前节点 x：\n- U：若 x>1，x/=2；否则不动。\n- L：x=2x。\n- R：x=2x+1。\n\n但 n 可达 10^6，s 可达 10^12，连续向下移动可能使中间值超过 long long，即使最终值不超过 10^12。因此用一个栈保存“暂时不展开的向下移动”：\n1. 读入 n、s、操作串。\n2. 对每个字符：\n   - U：若栈非空，弹出栈顶（抵消最近一次被推迟的向下移动）；否则若 s>1，s/=2。\n   - L/R：若 s>10^12/2，说明再向下走会超出最终值上界，把该方向压栈；否则直接更新 s=2s 或 2s+1。\n3. 输出 s。\n\n由于题目保证最终节点编号不超过 10^12，所有被压栈的向下移动最终都会被 U 抵消，结束时栈为空；当前 s 就是答案。\n\n### 样例走查\nn=3,s=2,URR：U 使 s=1；R 使 s=3；R 使 s=7，输出 7。\n\n### 复杂度\n每个字符最多入栈、出栈一次，时间 O(n)，空间 O(n)（栈最深可达 n）。\n\n**易错点：** 根节点执行 U 必须保持 1，不能写成 1/2=0；同时要防止中间节点编号溢出。",
      tags: ["编程题", "模拟", "栈"],
      timeLimit: '1.0 s',
      memoryLimit: '512 MB',
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    long long s;\n    string ops;\n    cin >> n >> s >> ops;\n    const long long LIMIT = 1000000000000LL;\n    stack<char> pending;\n    for (char ch : ops) {\n        if (ch == 'U') {\n            if (!pending.empty()) {\n                pending.pop();\n            } else if (s > 1) {\n                s /= 2;\n            }\n        } else {\n            if (s > LIMIT / 2) {\n                pending.push(ch);\n            } else {\n                s = (ch == 'L') ? s * 2 : s * 2 + 1;\n            }\n        }\n    }\n    cout << s << '\\n';\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 7,
      "reviewedFields": ["question","explanation","referenceCode","reviewedBy","reviewedAt","sourcePage"],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 4 10
1 1
2 1
8 3
5 3
7 2
9 0
1 10000`, output: `40186` }
      ],
      question: "# [GESP202412 六级] 运送物资\n\n## 题目描述\n\n小杨管理着 $m$ 辆货车，每辆货车每天需要向 A 市和 B 市运送若干次物资。小杨同时拥有 $n$ 个运输站点，这些站点位于 A 市和 B 市之间。\n\n每次运送物资时，货车从初始运输站点出发，前往 A 市或 B 市，之后返回初始运输站点。A 市、B 市和运输站点的位置可以视作数轴上的三个点，其中 A 市的坐标为 $0$，B 市的坐标为 $x$，运输站点的坐标为 $p$ 且有 $0 \\lt p \\lt x$。货车每次去 A 市运送物资的总行驶路程为 $2p$，去 B 市运送物资的总行驶路程为 $2(x - p)$。\n\n对于第 $i$ 个运输站点，其位置为 $p_i$ 且至多作为 $c_i$ 辆车的初始运输站点。小杨想知道，在最优分配每辆货车的初始运输站点的情况下，所有货车每天的最短总行驶路程是多少。\n\n## 输入格式\n\n第一行包含三个正整数 $n,m,x$，代表运输站点数量、货车数量和两市距离。\n\n之后 $n$ 行，每行包含两个正整数 $p_i$ 和 $c_i$，代表第 $i$ 个运输站点的位置和最多容纳车辆数。\n\n之后 $m$ 行，每行包含两个正整数 $a_i$ 和 $b_i$，代表第 $i$ 辆货车每天需要向 A 市运送 $a_i$ 次物资，向 B 市运送 $b_i$ 次物资。\n\n## 输出格式\n\n输出一个正整数，代表所有货车每天的最短总行驶路程。\n\n## 数据范围\n\n对于 20% 的测试点，保证 $n=2$，$m=2$，$c_i=1$。\n\n对于 20% 的测试点，保证 $n,m\\le 10^5$，$c_i=1$。\n\n对于另外 60% 的测试点，保证 $n,m\\le 10^5$，$c_i\\le 10^5$。\n\n对于所有测试点，保证 $1\\le n,m\\le 10^5$，$2\\le x\\le 10^8$，$0<p_i<x$，$1\\le c_i\\le 10^5$，$0\\le a_i,b_i\\le 10^5$，且 $\\sum c_i\\ge m$。\n",
      score: 25,
      explanation: "**解析：**\n\n设 A 市坐标 0、B 市坐标 x，货车 i 去 A 市 a_i 次、去 B 市 b_i 次。若初始站点为 p，则每天路程为\n2a_i p + 2b_i (x-p) = 2x b_i + 2p(a_i-b_i)。\n\n所有货车的第一项 Σ2x b_i 与分配无关，只需最小化 Σ2p(a_i-b_i)。\n\n记 d_i=a_i-b_i：\n- d_i>0 的货车更靠近 A 市有利，应优先分配较小的 p；\n- d_i<0 的货车更靠近 B 市有利，应优先分配较大的 p；\n- d_i=0 的货车对 p 不敏感，可并入任一组。\n\n因此：\n1. 站点按 p 升序排序。\n2. 将 d_i>=0 的货车按 d_i 降序排序，从最左端站点开始分配，容量用完则右移。\n3. 将 d_i<0 的货车按 d_i 升序（越负越先）排序，从最右端站点开始分配，容量用完则左移。\n4. 两组分别从两端取站点，容量互不重叠；答案为 Σ2x b_i + Σ2p(a_i-b_i)。\n\n### 样例走查\nn=3,m=4,x=10，站点 (1,1),(2,1),(8,3)；货车：\n(5,3) d=2，(7,2) d=5，(9,0) d=9，(1,10000) d=-9999。\n固定项 2*10*(3+2+0+10000)=200100。\n正 d 降序：9,5,2，依次分配 p=1,2,8，变动项 18+20+32=70。\n负 d：-9999，分配最右站点 p=8，变动项 2*8*(-9999)=-159984。\n总计 200100+70-159984=40186。\n\n### 复杂度\n排序 O(n log n + m log m)，分配 O(n+m)，空间 O(n+m)。\n\n**易错点：** 不能把所有货车都按 d 降序后统一从最小 p 开始分配；d<0 的货车应使用较大的 p。样例中若把 (1,10000) 分到 p=1，答案会明显偏大。",
      tags: ["编程题", "贪心", "排序"],
      timeLimit: '1.0 s',
      memoryLimit: '512 MB',
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n, m;\n    long long x;\n    cin >> n >> m >> x;\n    vector<pair<long long, long long>> stations(n);\n    for (auto &s : stations) cin >> s.first >> s.second;\n    sort(stations.begin(), stations.end());\n\n    vector<pair<long long, int>> neg, pos;\n    long long fixedPart = 0;\n    for (int i = 0; i < m; ++i) {\n        long long a, b;\n        cin >> a >> b;\n        fixedPart += 2 * x * b;\n        if (a >= b) pos.push_back({a - b, i});\n        else neg.push_back({a - b, i});\n    }\n    sort(pos.begin(), pos.end(), [](const auto &l, const auto &r) {\n        return l.first > r.first;\n    });\n    sort(neg.begin(), neg.end());\n\n    long long variablePart = 0;\n    vector<long long> remaining(n);\n    for (int i = 0; i < n; ++i) remaining[i] = stations[i].second;\n    int l = 0, r = n - 1;\n    for (auto &t : neg) {\n        while (r >= 0 && remaining[r] == 0) --r;\n        variablePart += 2 * stations[r].first * t.first;\n        --remaining[r];\n    }\n    for (auto &t : pos) {\n        while (l < n && remaining[l] == 0) ++l;\n        variablePart += 2 * stations[l].first * t.first;\n        --remaining[l];\n    }\n    cout << fixedPart + variablePart << '\\n';\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 9,
      "reviewedFields": ["question","explanation","referenceCode","reviewedBy","reviewedAt","sourcePage"],
    }
];

export const paperData = {
    id: '2024-12-l6',
    title: '2024年12月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `面向对象编程 (OOP) 是一种特殊的程序设计方法。下面 ( ) 不是重要的 OOP 特性。`,
            options: [
                "抽象",
                "封装",
                "继承",
                "模块化",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
题目要求选出**不是** OOP 重要特性的一项。OOP 的核心特性：**抽象、封装、继承、多态**。

逐项分析：
- **A 抽象**：是，提取事物的本质特征形成类。
- **B 封装**：是，隐藏内部细节、通过接口访问。
- **C 继承**：是，派生类复用基类。
- **D 模块化**：不是 OOP 的标志性特性——模块化是**程序组织**的一般原则（过程式语言同样可以模块化），不是面向对象独有的思想。

**易错点：** 「多态」不在选项中时，常见的干扰项就是「模块化」「结构化」这类通用软件工程概念。

**考点：** OOP 核心特性
        `,
            tags: ['面向对象'],
        },
        {
            id: 2,
            type: "single",
            question: `以下关于 C++ 中类的说法，哪一项是正确的？`,
            options: [
                "类中定义的所有成员变量和成员函数默认是public访问权限。",
                "类的构造函数必须显式声明返回类型为void。",
                "在 C++ 中，类的数据一般设置为私有，其公有成员函数提供访问私有数据的唯一途径。",
                "同一个类的实例有各自的成员数据和成员函数。",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
逐项分析：
- **A 默认 public**：错误，**class** 的成员默认是 **private**（struct 才默认 public）。
- **B 构造函数返回 void**：错误，构造函数**不写返回类型**（连 void 都不写）。
- **C 数据私有、公有函数提供访问途径**：正确，这正是**封装**的标准实践。
- **D 实例有各自的成员函数**：错误，成员**数据**每实例一份，成员**函数**全类共享同一份代码。

**易错点：** class 与 struct 的默认访问权限差异是 C++ 高频考点；「成员函数属于每个对象」是常见误解——每个对象只拥有自己的数据副本。

**考点：** 类的基本概念（访问控制/构造函数/成员）
        `,
            tags: ['类'],
        },
        {
            id: 3,
            type: "single",
            question: `以下 C++ 代码段中存在语法错误或逻辑错误，（ ）是正确的。

\`\`\`cpp
#include <iostream>
using namespace std;
class MyClass {
  public:
    MyClass() {
        cout << "Constructor called!" << endl;
    }
    void display() {
        cout << "Display function called!" << endl;
    }
};
int main() {
    MyClass* obj = NULL;
    obj->display();
    return 0;
}
\`\`\``,
            options: [
                "NULL 在 C++ 中无法用于指针初始化，应使用 nullptr。",
                "obj 的定义应该是 MyClass obj; 而不是指针类型。",
                "obj->display() 语句存在空指针访问错误，obj 应该初始化为一个有效的对象。",
                "obj->display() 语句会调用 display() 函数，但它没有输出任何内容。",
            ],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**核心解析：** obj 被初始化为 NULL，没有指向任何有效对象。执行 obj->display() 等于通过空指针调用非静态成员函数，属于未定义行为，通常直接崩溃，因此 C 正确。\n\n**选项分析：**\n- A 错：NULL 可以用于指针初始化，nullptr 只是 C++11 更类型安全的推荐写法。\n- B 错：用指针管理对象本身合法，问题是指针未指向有效对象。\n- D 错：display() 内有输出语句，且空指针调用并不是“正常调用但没有输出”。\n\n**考点：** 类、指针、未定义行为。\n\n**易错点：** **易错点：** 指针声明只分配存放地址的空间，不会自动创建对象；通过指针访问成员前，必须确保它已经指向有效对象，否则属于未定义行为。在 C++11 中更推荐用 nullptr 初始化空指针，但这不会改变 NULL 本身的语法合法性；解引用前应先 new 或取已有对象地址。",
            tags: ['类', '指针'],
        },
        {
            id: 4,
            type: "single",
            question: `阅读以下代码，下面哪一项是正确的？

\`\`\`cpp
void processData() {
    stack<int> s;
    queue<int> q;
    for (int i = 1; i <= 5; ++i) {
        s.push(i);
        q.push(i);
    }
    while (!s.empty()) {
        cout << "Stack pop: " << s.top() << endl;
        s.pop();
    }
    while (!q.empty()) {
        cout << "Queue pop: " << q.front() << endl;
        q.pop();
    }
}
\`\`\``,
            options: [
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 5 4 3 2 1。",
                "栈s的输出顺序是 5 4 3 2 1，队列q的输出顺序是 1 2 3 4 5。",
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5。",
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5，程序不会正常执行。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
代码把 1~5 依次压入栈 s 和队列 q，再分别依次弹出并输出。栈是后进先出（LIFO），最后压入的 5 最先弹出，输出 5 4 3 2 1；队列是先进先出（FIFO），输出顺序与入队顺序一致，为 1 2 3 4 5。

- **A** 错误：栈、队列的输出顺序刚好说反了。
- **B** 正确：栈输出 5 4 3 2 1，队列输出 1 2 3 4 5。
- **C** 错误：栈的输出顺序不是 1 2 3 4 5，那是队列的特性。
- **D** 错误：程序可以正常编译执行，两个循环都正常弹出，不存在执行错误。

g++ 编译运行转写代码，输出 Stack pop: 5→1、Queue pop: 1→5，与 B 一致。

**考点：** 栈、队列
            `,
            tags: ['栈', '队列'],
        },
        {
            id: 5,
            type: "single",
            question: `n 个节点的双向循环链表，在其中查找某个节点的平均时间复杂度是（ ）。`,
            options: ["O(1)","O(N)","O(log N)","O(N^3)"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：**\n双向循环链表中查找某节点：最坏要从头（或尾）沿指针逐个访问，平均需要遍历约一半节点，时间与节点数成正比，平均时间复杂度 **O(N)**。\n\n- 双向（prev/next）只是让「给定节点删自己」变为 O(1)，**按值查找**仍需线性扫描；\n- 循环结构也不改变查找的线性本质。\n\n逐项分析：\n- **A O(1)**：错误，O(1) 的查找需要哈希或数组下标随机访问，链表做不到。\n- **B O(N)**：正确。\n- **C O(log N)**：错误，链表不支持二分（无法 O(1) 定位中点）。\n- **D O(N³)**：错误，链表查找至多线性扫描 N 个节点，立方级明显夸大。\n\n**易错点：** 别把「双向」误当「可二分」——链表内存不连续，即使双向也无法 O(1) 跳到中间。\n\n**考点：** 链表的查找复杂度\n        ",
            tags: ['双向链表', '复杂度分析'],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 6,
            type: "single",
            question: `以下关于树的说法，（ ）是正确的。`,
            options: ["在一棵二叉树中，叶子结点的度一定是2。","满二叉树中每一层的结点数等于 2^(层数-1)。","在一棵树中，所有结点的度之和等于所有叶子结点的度之和。","一棵二叉树的先序遍历结果和中序遍历结果一定相同。"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：**\n逐项分析：\n- **A 在一棵二叉树中，叶子结点的度一定是2**：错误，叶子结点的度为 0，不是 2。\n- **B 满二叉树中每一层的结点数等于 2^(层数-1)**：正确（根为第 1 层时第 k 层恰有 2^(k-1) 个结点）。\n- **C 在一棵树中，所有结点的度之和等于所有叶子结点的度之和**：错误，所有结点的度之和等于边数 n-1，而叶子结点的度之和为 0，两者不相等。\n- **D 一棵二叉树的先序遍历结果和中序遍历结果一定相同**：错误，只有每个结点都无左子树等特殊情形才可能相同，一般不同。\n\n**易错点：** 注意区分满二叉树与完全二叉树；满二叉树每层都达到最大结点数。\n\n**考点：** 树与二叉树的基本性质",
            tags: ['树与二叉树'],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: "已知字符集 {A, B, C, D} 的出现频率分别为 A:8、B:3、C:1、D:6。根据哈夫曼编码法，下面（ ）是正确的哈夫曼树。",
            options: ["根 ABCD：左孩子 A，右孩子 BCD；BCD 左孩子 D、右孩子 BC；BC 左孩子 B、右孩子 C。","根 ABCD：左孩子 A，右孩子 BCD；BCD 左孩子 B、右孩子 CD；CD 左孩子 C、右孩子 D。","根 ABCD：左孩子 D，右孩子 ABC；ABC 左孩子 A、右孩子 BC；BC 左孩子 B、右孩子 C。","根 ABCD：左孩子 C，右孩子 ABD；ABD 左孩子 B、右孩子 AD；AD 左孩子 A、右孩子 D。"],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：**\n频率：A=8，B=3，C=1，D=6。哈夫曼算法每次合并当前权值最小的两棵树：\n1. C(1)+B(3)=4；\n2. 4+D(6)=10；\n3. 10+A(8)=18（根）。\n\n因此树形为：根 18 的左孩子是 A(8)，右孩子是 10；10 的左孩子是 D(6)，右孩子是 4；4 的左孩子是 B(3)，右孩子是 C(1)。这与选项 A 的描述完全一致。\n\n逐项分析：\n- A：正确，符合上述合并过程。\n- B：把 B 放在 D 的上一层（B 深度 2、D 深度 3），与合并顺序不符。\n- C：把 D 放在根的直接孩子（D 深度 1），但 D 的频率 6 小于 A 的 8，不应比 A 更浅。\n- D：把 C 放在根的直接孩子（C 深度 1），频率最低的字符反而最短，明显错误。\n\n验证 WPL = 8×1+6×2+3×3+1×3 = 8+12+9+3 = 32，等于合并中间权值之和 4+10+18=32。\n\n**易错点：** 哈夫曼树中频率越高的字符离根越近；每次合并的是当前森林中权值最小的两棵树，而不是原始字符中固定的两个。\n\n**考点：** 哈夫曼树的构造",
            tags: ['哈夫曼编码'],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 8,
            type: "single",
            question: `上一题中各字符的哈夫曼编码是（ ）。`,
            options: ["A: 0, B: 10, C: 110, D: 111","A: 0, B: 10, C: 11, D: 10","A: 0, B: 101, C: 100, D: 11","A: 11, B: 10, C: 01, D: 00"],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
由上题的哈夫曼树（根的孩子：A 与 10；10 的孩子：D 与 4；4 的孩子：B 与 C）：

- A：深度 1 → **0**（设左分支为 0）
- D：深度 2 → **11**
- B：深度 3 → **101**
- C：深度 3 → **100**

即 **A: 0, B: 101, C: 100, D: 11**，选 C。

逐项分析：
- **A A:0, B:10, C:110, D:111**：错误，这组里 D 的编码 111 是 3 位，与树结构不符。
- **B B:10 与 D:10 重复**：错误，前缀码不允许两个字符编码相同。
- **C**：正确，与树形一致且满足前缀性质。
- **D A:11, B:10, C:01, D:00**：错误，这是 2 位定长编码，不是哈夫曼编码。

**易错点：** 同一棵哈夫曼树左右子树互换会得到不同但**等长**的编码组；判断时先核对**长度序列**（A1, D2, B3, C3）再核对具体值。

**考点：** 哈夫曼编码的生成
        `,
            tags: ['哈夫曼编码'],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 3,
      "reviewedFields": ["options","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 9,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第4页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 4,
            sourcePages: [4],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",


            question: `（ ）是 3 位格雷编码。`,
            options: [
                "000 001 011 010 110 111 101 100",
                "000 001 010 011 100 101 110 111",
                "000 001 100 101 011 010 111 110",
                "000 010 001 011 100 110 101 111",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
3 位格雷码的判定标准：**相邻两个编码有且只有一位不同**（首尾 100 与 000 也只差一位，构成循环）。

验证 A：000→001（1位）→011（1位）→010（1位）→110（1位）→111（1位）→101（1位）→100（1位）✓ 全部相邻只变一位。

逐项分析：
- **A**：正确，标准反射格雷码。
- **B**：000→001→010，001 与 010 差**两位**，是普通二进制递增。
- **C**：001→100 差两位，错。
- **D**：000→010→001，010 与 001 差两位，错。

**易错点：** 逐对检查是唯一可靠方法；B 选项前几对合法，容易让只看开头的人上当。

**考点：** 格雷码的判定
        `,
            tags: ['格雷编码'],
        },
        {
            id: 10,
            type: "single",
            question: `给定以下二叉搜索树，调用函数 search(root, 7) 时，输出的结果是（ ）。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\nTreeNode* search(TreeNode* root, int val) {\n    cout << root->val << " ";\n    if (root == NULL || root->val == val) return root;\n    if (val < root->val)\n        return search(root->left, val);\n    else\n        return search(root->right, val);\n}\n\`\`\`\n\n\`\`\`text\n        5\n       / \\\n      3   7\n     / \\ / \\\n    2  4 6  8\n\`\`\`\n`,
            options: [
                "5 3 7",
                "5 7",
                "2 3 4 5 6 7",
                "8 7",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
search 函数**先输出当前节点值**再比较：

1. 访问根 5，输出 \`5\`；5 ≠ 7 且 7 > 5 → 走右子树
2. 访问 7，输出 \`7\`；7 == 7 → 命中返回

输出：**5 7**，选 B。

逐项分析：
- **A 5 3 7**：错误，7 > 5 应走右子树，不会经过左孩子 3。
- **B 5 7**：正确。
- **C 2 3 4 5 6 7**：错误，这是整棵树中序输出，search 命中即返回。
- **D 8 7**：错误，方向反了（若搜 8 则输出 5 7 8）。

**易错点：** cout 语句在函数**开头**——即使根就是目标值也会先输出；BST 搜索路径 = 根到目标节点的路径，每经过一个节点输出一次。

**考点：** BST 搜索路径的输出
        `,
            tags: ['树与二叉树', '遍历'],
        },
        {
            id: 11,
            type: "single",
            question: `阅读以下二叉树的深度优先搜索算法，横线上应填写（ ）。\n\n\`\`\`cpp\nvoid dfs(TreeNode* root) {\n    if (root == nullptr)\n        return;\n    stack<TreeNode*> s;\n    s.push(root);\n    while (!s.empty()) {\n        ______________________________ // 在此处填入代码\n        cout << node->val << " ";\n        if (node->right) s.push(node->right);\n        if (node->left) s.push(node->left);\n    }\n}\n\`\`\`\n`,
            options: [
                "TreeNode* node = s.top();",
                "TreeNode* node = s.top(); s.pop();",
                "TreeNode* node = s.front();",
                "TreeNode* node = s.front(); s.pop();",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
非递归 DFS：栈顶节点要**先取出再弹出**，才能访问并让循环推进。

\`\`\`cpp
TreeNode* node = s.top(); s.pop();
\`\`\`

随后 \`cout << node->val\`、压右、压左——node 必须已被赋值且从栈中移除。

逐项分析：
- **A 只 top 不 pop**：错误，栈顶永远不变，while 死循环。
- **B top + pop**：正确。
- **C 用 \`s.front()\`**：错误，std::stack 无 front 接口。
- **D front + pop**：错误，接口不存在。

**易错点：** 与 BFS（front+pop）对照记忆：栈用 top，队列用 front；pop 都无返回值，必须先取后弹。

**考点：** 非递归 DFS 的栈操作
        `,
            tags: ['深度优先搜索', '栈'],
        },
        {
            id: 12,
            type: "single",
            question: `阅读以下二叉树的广度优先搜索的代码，横线上应填写（ ）。\n\n\`\`\`cpp\n#include <queue>\nvoid bfs(TreeNode* root) {\n    if (root == NULL) return;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        ______________________________ // 在此处填入代码\n        cout << node->val << " ";\n        if (node->left) {\n            q.push(node->left);\n        }\n        if (node->right) {\n            q.push(node->right);\n        }\n    }\n}\n\`\`\`\n`,
            options: [
                "TreeNode* node = q.top();",
                "TreeNode* node = q.top(); q.pop();",
                "TreeNode* node = q.front();",
                "TreeNode* node = q.front(); q.pop();",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
BFS 用队列：出队访问当前节点，需要**先取队首再弹出**。

\`\`\`cpp
TreeNode* node = q.front(); q.pop();
\`\`\`

逐项分析：
- **A \`q.top()\`**：错误，std::queue 无 top 接口（那是 stack 的）。
- **B top + pop**：错误，接口不存在。
- **C 只 front 不 pop**：错误，队首不变，死循环。
- **D front + pop**：正确。

**易错点：** 与上题 DFS（s.top()+s.pop()）成对出现，考查 stack/queue 接口与弹出顺序的区分——这是 GESP 六级的高频组合拳。

**考点：** BFS 的队列操作
        `,
            tags: ['广度优先搜索', '队列'],
        },
        {
            id: 13,
            type: "single",
            question: `使用上题中的宽度优先搜索算法遍历以下这棵树，可能的输出是（ ）。

\`\`\`text
        1
       / \\
      2   3
     / \\   \\
    8   9   6
       / \\   \\
      4   5   7
\`\`\``,
            options: [
                "1 2 8 9 4 5 3 6 7",
                "1 2 3 4 5 6 6 8 9",
                "1 2 3 8 9 6 4 5 7",
                "8 4 5 9 2 1 3 6 7",
],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C**

**推导过程：**

宽度优先搜索使用队列，按层从左到右访问：

- 第 1 层：\`1\`
- 第 2 层：\`2 3\`
- 第 3 层：\`8 9 6\`
- 第 4 层：\`4 5 7\`

合并后得到 \`1 2 3 8 9 6 4 5 7\`。A 在完成同一层前就深入到下一层；B 含有重复的 6 且遗漏 7；D 从叶结点 8 开始，不可能是从根结点 1 启动的 BFS。

**易错点：** BFS 必须先访问完当前层，再访问下一层；孩子进入队列的左右顺序会决定同层访问顺序。

**考点：** 二叉树、宽度优先搜索、队列、层序遍历。`,
            tags: ['广度优先搜索'],
        },
        {
            id: 14,
            type: "single",
            question: `以下关于动态规划的描述，（ ）是正确的。`,
            options: [
                "动态规划适用于没有重叠子问题的优化问题。",
                "动态规划要求问题具有最优子结构和无后效性。",
                "动态规划通常通过递归来实现。",
                "动态规划与贪心算法不同，贪心算法不适用于有重叠子问题的问题。",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
动态规划的两大前提：**最优子结构**（原问题最优解包含子问题最优解）与**无后效性**（某阶段状态一旦确定，之后的决策不受此前路径影响）。

逐项分析：
- **A 无重叠子问题**：错误，恰恰相反，DP 适合**有**重叠子问题的问题。
- **B 最优子结构 + 无后效性**：正确。
- **C 通常通过递归来实现**：错误，DP 常用**迭代填表**（自底向上），递归记忆化只是实现方式之一。
- **D 贪心不适用于有重叠子问题的问题**：错误，贪心与「是否重叠」无关——贪心适用于贪心选择性质成立的问题，与 DP 是不同框架。

**易错点：** 「无后效性」容易被忽略——它保证状态定义完整，否则需要增加状态维度。

**考点：** 动态规划的性质
        `,
            tags: ['动态规划'],
        },
        {
            id: 15,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",


            question: `假设背包的最大容量 W = 8kg，共有 4 个物品可供选择，4 个物品的重量分别为 weights = [2, 3, 5, 7]，对应的价值分别为 values = [30, 40, 60, 80]，则该 0/1 背包问题中，背包的最大价值为（ ）。`,
            options: [
                "70",
                "90",
                "100",
                "120",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
0/1 背包：容量 W=8kg，物品（重量, 价值）：(2,30)、(3,40)、(5,60)、(7,80)。

枚举可行组合（总重 ≤ 8）：

| 组合 | 重量 | 价值 |
|------|------|------|
| 单品 | 2/3/5/7 | 30/40/60/80 |
| (2,3) | 5 | 70 |
| (2,5) | 7 | 90 |
| (2,7) | 9 ✗ | — |
| (3,5) | **8** | **100** |
| (3,7) | 10 ✗ | — |
| (5,7) | 12 ✗ | — |
| 三件及以上均超重 | — | — |

最大价值 **100**，选 C。

逐项分析：
- **A 70**：错误，只选了 (2,30)+(3,40)。
- **B 90**：错误，(2,30)+(5,60) 不是最优。
- **C 100**：正确，物品 2+3（重 8kg）恰好装满。
- **D 120**：错误，不存在这样的可行组合。

**易错点：** 0/1 背包每件物品只能选一次；枚举组合时按「重量和」剪枝可加速——重量超过 8 的组合直接排除。

**考点：** 0/1 背包的手工求解
        `,
            tags: ['动态规划'],
        },
        {
            id: 16,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6,7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6, 7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `构造函数是一种特殊的类成员函数，构造函数的名称和类名相同。但通过函数重载，可以创建多个同名的构 造函数，条件是每个构造函数的参数列表不同。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
构造函数确实与类同名、不写返回类型，并且**可以重载**——只要参数列表（个数或类型）不同：

\`\`\`cpp
class Box {
public:
    Box();               // 无参构造
    Box(int w);          // 重载 1
    Box(int w, int h);   // 重载 2
};
\`\`\`

创建对象时编译器按实参匹配对应的构造函数。

**易错点：** 重载只看**参数列表**，与返回类型无关（构造函数本就没有返回类型）；参数列表完全相同仅返回类型不同不能构成重载。

**考点：** 构造函数的重载
        `,
            tags: ['面向对象'],
        },
        {
            id: 17,
            type: "judge",
            question: `类的静态成员函数既能访问类的静态数据成员，也能访问非静态数据成员。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

静态成员函数没有 \`this\` 指针，不绑定任何具体对象，因此**不能直接访问**非静态数据成员——它不知道该成员属于哪个对象。

\`\`\`cpp
class A {
    int x;                 // 非静态成员
    static int s;          // 静态成员
public:
    static void f() {
        s = 1;             // 合法：静态成员属于类
        // x = 2;          // 非法：没有 this，不知道改哪个对象的 x
    }
};
\`\`\`

要访问非静态成员，必须把对象显式传进来，例如 \`static void f(A& a){ a.x = 2; }\`。

题干说"也能访问非静态数据成员"，命题错误。

**易错提醒：** 静态成员函数可以访问静态成员（含其他静态成员函数），这正是它与普通成员函数的主要差别。

**考点：** 静态成员函数的特性、this 指针。`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['静态成员'],
        },
        {
            id: 18,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6,7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6, 7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `栈中元素的插入和删除操作都在栈的顶端进行，所以方便用单向链表实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
栈的所有操作（push/pop/top）都发生在**栈顶**一端。用单向链表实现时把**表头当栈顶**：

- push：头插，O(1)；
- pop：头删，O(1)；
- top：读首节点，O(1)。

单向链表 + 表头指针就能完成全部操作，说法正确。

**易错点：** 对比队列：入队在尾、出队在头，单向链表若不额外维护尾指针，入队需 O(n) 遍历——所以队列常用双向链表或带尾指针的单向链表。

**考点：** 栈的链式实现
        `,
            tags: ['栈', '链表'],
        },
        {
            id: 19,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6,7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6, 7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `下面代码构建的树一定是完全二叉树：\n\n\`\`\`cpp\nstruct TreeNode {\n    int value;\n    TreeNode* left;\n    TreeNode* right;\n};\nTreeNode* buildCompleteBinaryTree() {\n    TreeNode* root = new TreeNode{1};\n    root->left = new TreeNode{2};\n    root->right = new TreeNode{3};\n    root->left->left = new TreeNode{4};\n    root->left->right = new TreeNode{5};\n    root->right->left = new TreeNode{6};\n    return root;\n}\n\`\`\`\n`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案为正确。**

构造出的树第一层是1，第二层是2、3，第三层依次为4、5、6。前两层全满，最后一层从左到右连续占据前三个位置，空缺仅在最右端，因此是完全二叉树。

花括号中未显式给出的left与right指针会进行零初始化，所以这些新结点的孩子为空。若把6放在3的右侧而空着左侧，才会出现最后一层左边空缺的情况。`,
            tags: ['树与二叉树'],
        },
        {
            id: 20,
            type: "judge",
            question: `在二叉排序树中，左子树所有节点的值都大于根节点的值，右子树所有节点的值都小于根节点的值。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

题干把左右子树的取值范围说反了。二叉排序树（BST）的定义是：

- 左子树所有结点的值 **小于** 根结点的值；
- 右子树所有结点的值 **大于** 根结点的值。

按中序遍历 BST 得到的是**递增**序列，这正是"左小右大"的推论。题干写成"左子树大于根、右子树小于根"，对应的是降序排列，不符合 BST 定义。

**易错提醒：** 比较对象是整棵子树而不只是孩子结点——左子树的**所有**结点都小于根，不仅是左孩子。

**考点：** 二叉排序树的定义与中序遍历性质。`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['树与二叉树'],
        },
        {
            id: 21,
            type: "judge",
            question: `在生成一个派生类的对象时，只调用派生类的构造函数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

生成派生类对象时，构造函数按"**基类先、派生类后**"的顺序执行：编译器先在派生类构造函数的初始化列表里（隐式或显式）调用基类构造函数，然后才执行派生类自己的函数体。

因此至少会调用两次构造函数（多层继承则更多），不可能"只调用派生类的构造函数"。析构顺序相反：先派生类析构，再基类析构。

**易错提醒：** 若基类没有默认构造函数，派生类必须在初始化列表里显式调用基类构造——这恰好说明基类构造一定会被执行。

**考点：** 继承体系中的构造/析构顺序。`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['面向对象'],
        },
        {
            id: 22,
            type: "judge",
            question: `下面的代码实现了二叉树的前序遍历，它通过递归方法访问每个节点并打印节点值。

\`\`\`cpp
void preorder(TreeNode* root) {
    if (root == NULL) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
前序遍历的顺序是「根 → 左子树 → 右子树」。代码先输出当前结点的值（根），再递归遍历左子树，最后递归遍历右子树；\`root == NULL\` 时直接返回，作为空子树的边界条件。整个函数完全符合前序遍历的定义，且确实通过递归访问每个节点并打印节点值，故该说法正确。

**考点：** 树与二叉树、递归
            `,
            tags: ['树与二叉树', '遍历', '递归'],
        },
        {
            id: 23,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6,7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6, 7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `宽度优先搜索算法（ BFS ）保证了每个节点在最短路径的情况下被访问。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
BFS 按「距离起点 0 层、1 层、2 层……」的顺序逐层扩展：每个节点第一次被访问时，经过的边数一定是从起点到它的**最少边数**。

因此在**无权图**（或所有边等权）中，BFS 天然保证按最短路径到达每个节点——这也是无权图单源最短路用 BFS 而不是 Dijkstra 的原因。按官方口径，命题成立。

**易错点：** 该结论**只对无权图成立**；带权图中 BFS 找到的是「边数最少」路径而非「权值和最小」路径，后者要用 Dijkstra。

**考点：** BFS 与最短路径
        `,
            tags: ['广度优先搜索'],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf 第6,7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6, 7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",


            question: `在解决简单背包问题时，动态规划的状态转移方程如下：\n\n\`\`\`cpp\ndp[i][w] = max(dp[i-1][w], dp[i-1][w - weights[i-1]] + values[i-1]);\n\`\`\`\n\n该方程表示：在考虑第 i 个物品时，当前背包容量为 w，如果不放物品 i，则最大价值是 dp[i-1][w]；如果放入物品 i，则最大价值是 dp[i-1][w-weights[i-1]]+values[i-1]，其中数组 weights 和 values 分别存储每个物品的重量和价值。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
0/1 背包的状态转移方程：

\`\`\`cpp
dp[i][w] = max(dp[i-1][w], dp[i-1][w - weights[i-1]] + values[i-1]);
\`\`\`

两项含义与题干描述完全一致：
- **不放物品 i**：容量 w 不变，价值继承 \`dp[i-1][w]\`；
- **放物品 i**：先腾出 weights[i-1] 的空间（w − weights[i-1]），得到 \`dp[i-1][w-weights[i-1]] + values[i-1]\`。

取 max 即「放或不放中较优者」，描述正确。

**易错点：** 第二项的前提是 \`w >= weights[i-1]\`（装得下才考虑放）；下标 i-1 是因为数组从 0 存储而状态从 1 编号。

**考点：** 0/1 背包状态转移方程
        `,
            tags: ['动态规划'],
        },
        {
            id: 25,
            type: "judge",
            question: `栈中元素的插入和删除操作都在栈的顶端进行，所以方便用双向链表比单向链表更合适表实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

栈只在线性表的一端（栈顶）插入和删除，天然对应**表头操作**。单向链表在表头插入、删除都是 $O(1)$，已经满足栈的全部需求，不需要维护 \`prev\` 指针。

双向链表每个结点多一个前驱指针：占用更多内存，插入删除时要多改一处指针。对"只在头部操作"的栈来说是多余的，所以"用双向链表比单向链表更合适"不成立。

**易错提醒：** 双向链表的优势在于"已知某结点时能 $O(1)$ 删除它"，适用于需要从中间删除的场景；栈用不到这个能力。

**考点：** 栈的链式实现、单链表与双向链表的取舍。`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ['栈', '链表'],
        },
        ...programmingQuestions
    ]
};
