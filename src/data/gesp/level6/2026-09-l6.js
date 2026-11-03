// 2026年9月 GESP C++ 六级真题 (第15次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照官方 PDF 转录。
// 客观题答案以原卷答案表为唯一证据：
//   单选题答案表在第 1 页：B A C B C B A D C B B C B C A
//   判断题答案表在第 6 页：× × × √ √ √ √ × √ ×
// 单选答案表来自文本层，判断题答案表为矢量红色 √/× 记号，已按 300dpi 渲染逐格读取并全部逻辑复核。
// Q11 哈夫曼频率（2/4/5/9/12）、J8 位数、J10 记号、编程题数据范围均渲染核对。

export const paperData = {
  id: '2026-09-l6',
  title: '2026年9月 GESP C++ 六级真题',
  level: 6,
  year: 2026,
  month: 9,
  session: 15,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1767258748452800.pdf',
    type: 'official',
    notes: '全卷依据 CCF 官网 PDF 逐题转录；Q11 哈夫曼频率、J8 位数、J10 记号、编程题数据范围等公式图片均渲染核对。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-11-03',
    scope: '单选答案串 BACBCBADCBBCBCA 与判断答案串 ×××√√√√×√× 按官方答案表转录并逐题逻辑复核，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `下列代码执行后的输出结果是（ ）。
\`\`\`cpp
class Animal {
    public:
    virtual void speak() {
        cout << "Animal ";
    }
    virtual ~Animal() = default;
};
class Cat : public Animal {
    public:
    void speak() override {
        cout << "Cat ";
    }
};
int main() {
    Animal *p = new Cat();
    p->speak();
    delete p;
    return 0;
}
\`\`\``,
      options: ['Animal', 'Cat', 'Animal Cat', '编译错误'],
      answer: 1,
      score: 2,
      tags: ['面向对象', '多态'],
      explanation: `**答案：B**

**核心解析：**
\`speak()\` 是虚函数，基类指针 p 实际指向 Cat 对象。通过基类指针调用虚函数时发生**动态绑定**，执行的是对象实际类型（Cat）的版本，输出 "Cat "。

**选项分析：**
- **A**：只有当 speak 不是虚函数（静态绑定按指针类型 Animal 解析）时才会输出 Animal。
- **B（正确）**：虚函数 + 基类指针指向派生类对象 → 调用 Cat::speak。
- **C**：只会调用一次 speak，不会两个版本都输出。
- **D**：语法完全合法，override 正确匹配基类虚函数，无编译错误。`,
    },
    {
      id: 2,
      type: 'single',
      question: `下列代码中，横线处应填写（ ），才能正确调用基类的带参数构造函数。
\`\`\`cpp
class Machine {
    protected:
    string id;
    public:
    Machine(string s) : id(s) {}
};
class Robot : public Machine {
    int level;
    public:
    Robot(string s, int n) : __________, level(n) {}
};
\`\`\``,
      options: ['Machine(s)', 'Machine::id(s)', 'super(s)', 'id(s)'],
      answer: 0,
      score: 2,
      tags: ['面向对象', '构造函数'],
      explanation: `**答案：A**

**核心解析：**
派生类构造函数在初始化列表中用**基类名(参数)**显式调用基类构造函数：\`Robot(string s, int n) : Machine(s), level(n) {}\`。由于 Machine 只定义了带参构造，编译器不再生成默认构造，派生类必须显式调用它。

**选项分析：**
- **A（正确）**：C++ 在初始化列表中调用基类构造函数的语法就是 \`基类名(实参)\`。
- **B**：Machine::id(s) 是试图直接给基类私有/受保护成员赋值的写法，且 id 的初始化属于基类的职责，派生类不能在初始化列表中直接初始化基类成员。
- **C**：super(s) 是 Java 的语法，C++ 没有 super 关键字。
- **D**：id(s) 是在派生类初始化列表中初始化基类成员，非法——基类成员只能由基类构造函数初始化。`,
    },
    {
      id: 3,
      type: 'single',
      question: `下列代码执行后的输出顺序是（ ）。
\`\`\`cpp
class Base {
    public:
    Base() {
        cout << "B ";
    }
    virtual ~Base() {
        cout << "~B ";
    }
};
class Derived : public Base {
    public:
    Derived() {
        cout << "D ";
    }
    ~Derived() {
        cout << "~D ";
    }
};
int main() {
    Base *p = new Derived();
    delete p;
    return 0;
}
\`\`\``,
      options: ['B D ~B ~D', 'D B ~D ~B', 'B D ~D ~B', 'B D ~B'],
      answer: 2,
      score: 2,
      tags: ['面向对象', '构造函数', '析构函数'],
      explanation: `**答案：C**

**核心解析：**
构造顺序：先基类后派生类 → "B D"。析构顺序：与构造严格相反，先派生类后基类 → "~D ~B"。由于 ~Base 是虚函数，delete 基类指针会先调用 ~Derived 再调用 ~Base，派生类析构不会遗漏。

**选项分析：**
- **A**：析构顺序写反，析构与构造相反才对。
- **B**：构造顺序写反，构造先基类后派生。
- **C（正确）**：构造 B D、析构 ~D ~B。
- **D**：漏掉了 ~D——只有当 ~Base 不是虚函数时，delete 基类指针才会导致派生类析构不被调用（未定义行为）；本例 ~Base 是虚的，~D 一定执行。`,
    },
    {
      id: 4,
      type: 'single',
      question: `下列代码执行后的输出结果是（ ）。
\`\`\`cpp
stack<int> s;
queue<int> q;
for (int i = 2; i <= 6; i += 2) {
    s.push(i);
    q.push(i);
}
s.pop();
q.pop();
cout << s.top() << " " << q.front();
\`\`\``,
      options: ['2 4', '4 4', '4 6', '6 2'],
      answer: 1,
      score: 2,
      tags: ['栈', '队列'],
      explanation: `**答案：B**

**核心解析：**
依次入栈/入队 2、4、6。
- 栈是后进先出：pop() 弹出最后进入的 6，此后 s.top() = **4**。
- 队列是先进先出：pop() 弹出最先进入的 2，此后 q.front() = **4**。

输出 "4 4"。

**选项分析：**
- **A**：误以为栈 pop 弹出的是最先进去的 2（那是队列的行为）。
- **B（正确）**：栈弹 6 剩 4，队弹 2 剩 4。
- **C**：q.front() 误取为最后进入的 6（那是栈顶的取值逻辑）。
- **D**：把两者都当成了"弹出最先进的"并且取值也错，s.top() 弹出 6 后不可能是 6。`,
    },
    {
      id: 5,
      type: 'single',
      question: `下面循环队列采用"空出一个位置"的方式区分队空和队满。横线处应填写（ ）。
\`\`\`cpp
const int MAXN = 8;
int data[MAXN];
int front = 0, rear = 0;
bool full() {
    return __________________________;
}
\`\`\``,
      options: [
        'rear == front',
        '(front + 1) % MAXN == rear',
        '(rear + 1) % MAXN == front',
        'rear == MAXN - 1',
      ],
      answer: 2,
      score: 2,
      tags: ['队列', '循环队列'],
      explanation: `**答案：C**

**核心解析：**
牺牲一个存储位的循环队列约定：rear 指向下一个写入位置，front 指向队头。入队后 rear 前进，当 rear 的下一格绕回到 front 时再写就会撞上队头，视为队满：\`(rear + 1) % MAXN == front\`。队空的判据则是 \`rear == front\`，两者得以区分。

**选项分析：**
- **A**：rear == front 是**队空**的判据，写进 full() 正好颠倒。
- **B**：方向反了——这是"front 的下一格是 rear"，与入队方向（rear 追 front）不匹配。
- **C（正确）**：rear 再前进一格就追上 front，说明只剩一个空位，按约定即队满。
- **D**：rear == MAXN-1 只说明 rear 到了数组末尾，绕回后可能仍有空位，没有考虑循环特性。`,
    },
    {
      id: 6,
      type: 'single',
      question: `下列函数实现了二叉树的哪种遍历方式（ ）。
\`\`\`cpp
void visit(TreeNode *root) {
    if (root == nullptr)
        return;
    visit(root->left);
    cout << root->val << " ";
    visit(root->right);
}
\`\`\``,
      options: ['前序遍历', '中序遍历', '后序遍历', '层序遍历'],
      answer: 1,
      score: 2,
      tags: ['二叉树', '遍历'],
      explanation: `**答案：B**

**核心解析：**
访问（输出）语句位于**两次递归调用之间**——先递归左子树，再输出根，最后递归右子树，即"左—根—右"，这是**中序遍历**。

**选项分析：**
- **A**：前序是"根—左—右"，输出语句应放在第一次递归之前。
- **B（正确）**：输出夹在左右递归之间，中序。
- **C**：后序是"左—右—根"，输出语句应放在最后一次递归之后。
- **D**：层序需借助队列按层访问，不是这种递归结构。`,
    },
    {
      id: 7,
      type: 'single',
      question: `已知一棵二叉树的先序遍历序列为 A B D E C F，中序遍历序列为 D B E A C F，则其后序遍历序列是（ ）。`,
      options: ['D E B F C A', 'D B E F C A', 'E D B F C A', 'D E B C F A'],
      answer: 0,
      score: 2,
      tags: ['二叉树', '遍历'],
      explanation: `**答案：A**

**核心解析：**
先序首元素 A 是根；中序中 A 左侧的 D B E 属于左子树，右侧的 C F 属于右子树。

- 左子树：先序 B D E，中序 D B E → 根 B，左孩子 D，右孩子 E。
- 右子树：先序 C F，中序 C F → 根 C，F 在 C 右侧 → F 是 C 的右孩子。

后序遍历（左—右—根）：左子树 D E B，右子树 F C，最后根 A → **D E B F C A**。

**选项分析：**
- **A（正确）**：与推导一致。
- **B**：把左子树后序写成 D B E（那是其中序），中序后序混淆。
- **C**：E D B 顺序错误，D 是叶子必须先于 E 输出。
- **D**：右子树部分写成 C F 而非 F C，根 C 应在右孩子 F 之后输出。`,
    },
    {
      id: 8,
      type: 'single',
      question: `下面函数用于计算二叉树的高度，横线处应填写（ ）。
\`\`\`cpp
int height(TreeNode *root) {
    if (root == nullptr)
        return 0;
    int leftH = height(root->left);
    int rightH = height(root->right);
    return __________________________;
}
\`\`\``,
      options: [
        'leftH + rightH',
        'min(leftH, rightH) + 1',
        'max(leftH, rightH)',
        'max(leftH, rightH) + 1',
      ],
      answer: 3,
      score: 2,
      tags: ['二叉树', '递归'],
      explanation: `**答案：D**

**核心解析：**
树的高度 = 左右子树高度的较大者 + 1（当前结点这一层）。左右子树高度已经递归算出，取 max 再加 1 即可。空树返回 0，单个结点返回 max(0,0)+1 = 1，自洽。

**选项分析：**
- **A**：左右高度相加只有在每个结点至多一棵子树时才碰巧正确，一般二叉树错误。
- **B**：取 min 会把"最深路径"忽略掉，歪斜树（一条链）会被算成 1。
- **C**：漏了当前结点所在的一层，单结点树会返回 0。
- **D（正确）**：标准写法 max(leftH, rightH) + 1。`,
    },
    {
      id: 9,
      type: 'single',
      question: `以下代码实现二叉树左子树优先的深度优先搜索算法，则横线上应填写（ ）。
\`\`\`cpp
void dfs(TreeNode *root) {
    if (root == nullptr)
        return;
    stack<TreeNode *> s;
    s.push(root);
    while (!s.empty()) {
        TreeNode *node = s.top();
        s.pop();
        cout << node->value << " ";
        ———————————————————————— // 在此处填入代码
    }
}
\`\`\``,
      options: [
        `\`\`\`cpp
s.push(node->right);
s.push(node->left);
\`\`\``,
        `\`\`\`cpp
s.push(node->left);
s.push(node->right);
\`\`\``,
        `\`\`\`cpp
if (node->right)
    s.push(node->right);
if (node->left)
    s.push(node->left);
\`\`\``,
        `\`\`\`cpp
if (node->left)
    s.push(node->left);
if (node->right)
    s.push(node->right);
\`\`\``,
      ],
      answer: 2,
      score: 2,
      tags: ['二叉树', 'DFS', '栈'],
      explanation: `**答案：C**

**核心解析：**
栈是后进先出：想让**左子树先被访问**，就必须让左孩子后入栈（最后入栈的最先弹出）。所以先压右孩子、再压左孩子。同时必须判空——把空指针压栈会在下一轮 s.top() 解引用崩溃。

**选项分析：**
- **A**：没有判空，且顺序恰好把右孩子放在栈顶，变成右优先。
- **B**：左孩子先入栈，右孩子反而先被弹出访问。
- **C（正确）**：先右后左压栈 + 判空，左子树优先且安全。
- **D**：判空了但顺序错误，右孩子会被先访问。A、B 除了顺序问题外还缺判空，遇到叶子结点就会把 nullptr 压入栈中导致崩溃。`,
    },
    {
      id: 10,
      type: 'single',
      question: `下面函数在二叉搜索树中查找值 x。横线处应填写（ ）。
\`\`\`cpp
TreeNode *searchBST(TreeNode *root, int x) {
    if (root == nullptr || root->val == x)
        return root;
    if (x < root->val)
        return searchBST(root->left, x);
    return __________________________;
}
\`\`\``,
      options: [
        'searchBST(root->left, x)',
        'searchBST(root->right, x)',
        'searchBST(root, x + 1)',
        'root->right',
      ],
      answer: 1,
      score: 2,
      tags: ['二叉搜索树', '递归'],
      explanation: `**答案：B**

**核心解析：**
二叉搜索树性质：左子树所有值 < 根 < 右子树所有值。x > root->val（前两个分支都没命中）时，目标只可能在右子树，递归查找右子树。

**选项分析：**
- **A**：与上一分支重复，x 更大却往左找，逻辑错误。
- **B（正确）**：x 比根大就去右子树。
- **C**：修改查找目标值 x+1 是无意义的操作，且会无限递归（root 始终同一结点，x 永远大于 root->val）。
- **D**：直接返回右孩子指针而不是"在右子树中查找"，x 不一定恰好是右孩子的值，还放弃了继续递归。`,
    },
    {
      id: 11,
      type: 'single',
      question: `有 5 个字符，其出现频率分别为 2、4、5、9、12。按哈夫曼算法构造编码树，其最小带权路径长度 WPL 为（ ）。`,
      options: ['68', '69', '71', '73'],
      answer: 1,
      score: 2,
      tags: ['哈夫曼树', '贪心'],
      explanation: `**答案：B**

**核心解析：**
哈夫曼构造：每次合并权值最小的两棵树。
- 2 + 4 = 6；{5, 6, 9, 12}
- 5 + 6 = 11；{9, 11, 12}
- 9 + 11 = 20；{12, 20}
- 12 + 20 = 32（根）

WPL = 所有非叶结点权值之和 = 6 + 11 + 20 + 32 = **69**。

验证（各叶深度）：2、4 在深度 3（2×3 + 4×3 = 18），5 在深度 3？重新按树形核对：根(32) = 12 + 20；20 = 9 + 11；11 = 5 + 6；6 = 2 + 4。深度：12→1，9→2，5→3，2→4，4→4。WPL = 12×1 + 9×2 + 5×3 + 2×4 + 4×4 = 12 + 18 + 15 + 8 + 16 = 69 ✓

**选项分析：**
- **A**：合并过程中某一步没有严格取最小两个（例如先合并 2+5），导致 WPL 偏大或计算失误。
- **B（正确）**：严格按哈夫曼贪心合并的结果。
- **C**：典型的错误是每次合并后没有把新树放回去重新排序，或把 9 与 12 先合并。
- **D**：合并顺序更差的构造结果。WPL 唯一由贪心过程决定，69 是最小值。`,
    },
    {
      id: 12,
      type: 'single',
      question: `下面代码用反射法生成 n 位格雷编码，横线处应填写（ ）。
\`\`\`cpp
vector<string> gray(int n) {
    vector<string> ans = {"0", "1"};
    for (int bit = 2; bit <= n; ++bit) {
        int oldSize = ans.size();
        for (int i = oldSize - 1; i >= 0; --i)
            ans.push_back(__________________________);
        for (int i = 0; i < oldSize; ++i)
            ans[i] = "0" + ans[i];
    }
    return ans;
}
\`\`\``,
      options: ['ans[i] + "1"', '"0" + ans[i]', '"1" + ans[i]', 'ans[oldSize - i - 1]'],
      answer: 2,
      score: 2,
      tags: ['格雷码', '编码'],
      explanation: `**答案：C**

**核心解析：**
反射法：n 位格雷码 = 旧表（前缀 0，正序）+ 旧表**倒序**（前缀 1）。代码里倒序循环 push_back 新元素，前 2^(bit-1) 个稍后统一加前缀 "0"。新添加的（倒序部分的）元素应加前缀 **"1"**，即 \`"1" + ans[i]\`。

**选项分析：**
- **A**：后缀加 "1" 不是格雷码反射法的前缀操作。
- **B**：加前缀 "0" 会让新旧两半相同，编码数量翻倍但出现重复。
- **C（正确）**：倒序镜像部分加前缀 1，相邻编码（镜像交界处）恰只差一位。
- **D**：不加任何前缀直接复制，直接产生重复编码。`,
    },
    {
      id: 13,
      type: 'single',
      question: `下面代码计算走到第 n 级台阶的方法数，每次可以走 1 级或 2 级。横线处应填写（ ）。
\`\`\`cpp
int ways(int n) {
    if (n <= 2)
        return n;
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; ++i)
        dp[i] = __________________________;
    return dp[n];
}
\`\`\``,
      options: ['dp[i - 1] + 1', 'dp[i - 1] + dp[i - 2]', 'dp[i - 2] + 2', '2 * dp[i - 1]'],
      answer: 1,
      score: 2,
      tags: ['动态规划', '递推'],
      explanation: `**答案：B**

**核心解析：**
最后一步要么从第 i-1 级走 1 步，要么从第 i-2 级走 2 步，两类方案不重不漏，因此 dp[i] = dp[i-1] + dp[i-2]（斐波那契递推）。

**选项分析：**
- **A**：只统计了"从 i-1 走一步"的方案数，且凭空 +1 而不是加上完整子问题。
- **B（正确）**：两类最后一步的方案数相加。
- **C**：dp[i-2] + 2 把"走 2 步"理解成固定加 2，丢掉了从 i-1 转移的所有方案。
- **D**：翻倍没有实际意义，不符合状态转移的计数逻辑。`,
    },
    {
      id: 14,
      type: 'single',
      question: `下面代码求从包含非负元素的数组中选择若干个互不相邻元素所能得到的最大和。横线处应填写（ ）。
\`\`\`cpp
int maxSum(vector<int> &a) {
    int n = a.size();
    if (n == 0)
        return 0;
    if (n == 1)
        return a[0];
    vector<int> dp(n);
    dp[0] = a[0];
    dp[1] = max(a[0], a[1]);
    for (int i = 2; i < n; ++i)
        dp[i] = __________________________;
    return dp[n - 1];
}
\`\`\``,
      options: [
        'dp[i - 1] + a[i]',
        'dp[i - 2] + a[i]',
        'max(dp[i - 1], dp[i - 2] + a[i])',
        'max(dp[i - 1], a[i])',
      ],
      answer: 2,
      score: 2,
      tags: ['动态规划'],
      explanation: `**答案：C**

**核心解析：**
经典"打家劫舍"DP：第 i 个元素只有选或不选两种决策——不选则继承 dp[i-1]；选则 i-1 不能选，取 dp[i-2] + a[i]。两者取最大。

**选项分析：**
- **A**：直接加 a[i] 会把相邻元素选到一起，违反互不相邻约束。
- **B**：强制选 a[i]，丢掉了"不选第 i 个"这一整类方案，遇到 a[i] 为 0 而前面更大的情况就错（题设非负，选了也不亏，但强制选择会导致 dp 语义崩坏，例如 a={5,0,1}：强制选 1 且只能接 dp[0]=5 → 6 恰好对，但 a={5,9,0} 时 dp[2] 被迫 = 5+0=5 < dp[1]=9，返回值取 dp[n-1] 就错了）。
- **C（正确）**：选与不选取 max，标准转移。
- **D**：漏掉了 dp[i-2] + a[i] 这条转移，只比较"不选"和"单独选 a[i]"，丢掉了与更早最优解组合的机会。`,
    },
    {
      id: 15,
      type: 'single',
      question: `下面是一维数组实现的 0/1 背包。内层循环必须从大到小枚举容量，主要原因是（ ）。
\`\`\`cpp
for (int i = 0; i < n; ++i) {
    for (int w = W; w >= weight[i]; --w) {
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
    }
}
\`\`\``,
      options: [
        '保证每件物品最多被选择一次',
        '保证物品必须按照重量从大到小选择',
        '降低时间复杂度',
        '防止数组 dp 发生越界',
      ],
      answer: 0,
      score: 2,
      tags: ['动态规划', '背包'],
      explanation: `**答案：A**

**核心解析：**
一维滚动数组里 dp[w - weight[i]] 应当是"**上一轮**（还没考虑第 i 件物品）"的值。容量从大到小枚举时，dp[w - weight[i]] 尚未在本轮被更新，天然保持旧值，等价于二维的 dp[i-1][w-wᵢ]，从而第 i 件物品最多被选一次。若从小到大枚举，dp[w-wᵢ] 已是本轮新值，同一物品可能被叠加选取——那才是完全背包的写法。

**选项分析：**
- **A（正确）**：倒序保证转移来源是旧值，0/1 语义成立。
- **B**：DP 转移与物品处理顺序无关，任何顺序处理物品结果一致。
- **C**：两种枚举方向时间复杂度相同，都是 O(nW)。
- **D**：枚举下界 w >= weight[i] 已经防住越界，与方向无关。`,
    },
    {
      id: 16,
      type: 'judge',
      question: `下列代码可以正常编译，因为编译器会自动为 Student 类生成一个无参数构造函数。
\`\`\`cpp
class Student {
    public:
    Student(int x) {
        age = x;
    }
    private:
    int age;
};
int main() {
    Student s;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['面向对象', '构造函数'],
      explanation: `**答案：×**

**解析：**
一旦类中定义了任何构造函数（此处是带参构造 Student(int)），编译器就**不再**自动生成默认无参构造。因此 \`Student s;\` 找不到可用的构造函数，编译报错。要通过对象名直接定义，需要显式提供无参构造或给参数加默认值。`,
    },
    {
      id: 17,
      type: 'judge',
      question: `下列代码合法，因为派生类可以直接访问基类的私有成员 value。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['面向对象', '访问控制'],
      explanation: `**答案：×**

**解析：**
基类的 private 成员只对基类自身的成员函数和友元可见，派生类一律**不能**直接访问，无论以何种方式继承。Child::get() 中直接 return value 无法通过编译。若希望派生类可访问又不对外公开，应声明为 protected。`,
    },
    {
      id: 18,
      type: 'judge',
      question: `下列代码执行后，输出结果为 30。
\`\`\`cpp
queue<int> q;
q.push(10);
q.push(20);
q.push(30);
q.pop();
cout << q.front();
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['队列'],
      explanation: `**答案：×**

**解析：**
队列是先进先出：依次入队 10、20、30 后，q.pop() 弹出的是**队头** 10，此时 q.front() 是 20。若想让 30 先出，得先把 10、20 都弹出。因此输出是 20 而不是 30。`,
    },
    {
      id: 19,
      type: 'judge',
      question: `一棵完全二叉树按照从上到下、从左到右的顺序，将节点依次存储在数组 tree[1]、tree[2]、...... 中。若节点 tree[i] 存在左孩子，则其左孩子存储在 tree[2 * i] 中。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['二叉树', '完全二叉树'],
      explanation: `**答案：√**

**解析：**
这是完全二叉树顺序存储的标准性质（下标从 1 开始）：结点 i 的左孩子下标为 2i，右孩子为 2i+1，父结点为 i/2（下取整）。完全二叉树按层序编号连续存放，该性质严格成立；"若存在左孩子"的限定也正确——叶子结点 2i 会超出结点总数。`,
    },
    {
      id: 20,
      type: 'judge',
      question: `对任意一棵二叉搜索树执行中序遍历，得到的关键字序列一定是非递减的。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['二叉搜索树', '遍历'],
      explanation: `**答案：√**

**解析：**
二叉搜索树满足"左子树 < 根 < 右子树"（考虑相等关键字存放约定后为 ≤）。中序遍历按"左—根—右"输出，对任意结点，其左子树的所有关键字先于它输出、右子树的所有关键字后于它输出，由 BST 性质归纳可得整个输出序列非递减。中序遍历有序正是 BST 的标志性性质，也常用来验证一棵树是否为 BST。`,
    },
    {
      id: 21,
      type: 'judge',
      question: `若使用下列代码从节点 start 开始访问一棵树，则第一次到达某个节点时所经过的边数，一定是从 start 到该节点的最少边数。
\`\`\`cpp
queue<int> q;
q.push(start);
visited[start] = true;
dist[start] = 0;
while (!q.empty()) {
    int u = q.front();
    q.pop();
    for (int v : tree[u]) {
        if (!visited[v]) {
            visited[v] = true;
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['BFS', '图论'],
      explanation: `**答案：√**

**解析：**
这是标准的 BFS。BFS 按与起点的距离分层扩展：队列中结点的 dist 值单调不减，且每个结点第一次被发现时记录的 dist[u] + 1，就是它在无权图（树）中的最短边数。因为结点在入队时立即标记 visited，不会被更长的路径重复更新。在树上（无环、路径唯一）该结论同样成立。`,
    },
    {
      id: 22,
      type: 'judge',
      question: `哈夫曼编码的生成过程基于贪心算法，出现频率越高的字符，其编码长度一定不会比出现频率更低的字符更长。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['哈夫曼树', '贪心'],
      explanation: `**答案：√**

**解析：**
哈夫曼算法每次合并频率最小的两棵子树，频率高的字符总是更晚被合并，因而离根更近、编码更短。用交换论证可证：若存在频率高的字符编码反而更长，交换这两片叶子会使 WPL 变小，与哈夫曼树的最优性矛盾。因此频率与编码深度呈反向关系（频率相等时深度可以相同），"高频率的编码不会更长"成立。`,
    },
    {
      id: 23,
      type: 'judge',
      question: `在 n 位格雷码中，任意两个编码之间都只相差一个二进制位。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['格雷码', '编码'],
      explanation: `**答案：×**

**解析：**
格雷码的性质是**相邻**两个编码（按格雷码顺序排列时）恰好相差一个二进制位，而不是任意两个都只差一位。例如 2 位格雷码序列 00, 01, 11, 10 中，00 与 11 相差两位。任意两个编码都只差一位在数学上也不可能——n 位二进制串共有 2ⁿ 个，而与某个串海明距离为 1 的串只有 n 个。`,
    },
    {
      id: 24,
      type: 'judge',
      question: `下列一维动态规划代码实现的是完全背包问题，因为在处理第 i 种物品时，同一种物品可能被重复选择。
\`\`\`cpp
for (int i = 0; i < n; ++i) {
    for (int w = weight[i]; w <= W; ++w) {
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i]);
    }
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      tags: ['动态规划', '背包'],
      explanation: `**答案：√**

**解析：**
内层容量**从小到大**枚举时，dp[w - weight[i]] 在本轮循环中已被更新过（可能已包含第 i 种物品），于是转移 dp[w] = max(dp[w], dp[w - weight[i]] + value[i]) 允许在第 i 种物品已选的基础上再选一次——这正是完全背包"每种物品可选无限次"的实现。与 0/1 背包的关键区别就在枚举方向：0/1 背包倒序（防止重复选取），完全背包正序（允许重复选取）。`,
    },
    {
      id: 25,
      type: 'judge',
      question: `下列递归程序能得到正确的斐波那契数，其时间复杂度和空间复杂度都是 O(n)。
\`\`\`cpp
int fib(int n) {
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      tags: ['递归', '时间复杂度'],
      explanation: `**答案：×**

**解析：**
递归树会重复计算大量子问题（如 fib(n-2) 被算两次、fib(n-3) 三次……），调用总数随 n 指数增长，时间复杂度为 **O(2ⁿ)** 量级（精确上界 O(1.618ⁿ)），并非 O(n)。空间复杂度取决于递归深度，即调用栈最大深度 O(n)——空间是 O(n) 没错，但时间不是。要用 O(n) 时间需改为记忆化或递推。`,
    },
    {
      id: 26,
      type: 'programming',
      title: '数组划分',
      score: 25,
      description: `给定 n 个整数构成的数组 A = [a₁, a₂, ..., aₙ]。

你需要将数组 A 划分为若干非空连续子段。对于划分得到的某个子段，它的偏差值定义为子段内整数和的平方。划分方案的偏差值定义为所有子段偏差值之和。

你需要最小化划分方案的偏差值。

形式化地，你可以将 A 划分为若干非空连续子段 A₁, A₂, ..., Aₖ，使得 A = A₁ + A₂ + ... + Aₖ，这里的 + 代表数组的连接。对于 1 ≤ i ≤ k，设数组 Aᵢ = [a₁⁽ⁱ⁾, ..., aₘᵢ⁽ⁱ⁾] 包含 mᵢ 个整数。你需要最小化 Σᵢ₌₁ᵏ (Σⱼ₌₁ᵐⁱ aⱼ⁽ⁱ⁾)²。`,
      inputFormat: `第一行，一个正整数 n，表示数组 A 的长度。

第二行，n 个整数 a₁, a₂, ..., aₙ，表示数组 A。`,
      outputFormat: `一行，一个整数，表示划分方案偏差值的最小值。`,
      samples: [
        { input: '4\n1 2 -3 4', output: '6' },
        { input: '6\n-1 -1 4 -5 -1 4', output: '0' },
      ],
      hint: `对于 40% 的测试点，保证 0 ≤ aᵢ ≤ 50。

对于所有测试点，保证 1 ≤ n ≤ 2000，-100 ≤ aᵢ ≤ 100。

时间限制：1.0 s，内存限制：512.0 MB。`,
      tags: ['动态规划', '前缀和'],
      referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 2005;\nconst long long oo = 1e18;\nint n;\nint a[N], pre[N];\nlong long f[N];\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) {\n        scanf(\"%d\", &a[i]);\n        pre[i] = pre[i - 1] + a[i];\n    }\n    for (int i = 1; i <= n; i++) {\n        f[i] = oo;\n        for (int j = 0; j < i; j++)\n            f[i] = min(f[i], f[j] + 1ll * (pre[i] - pre[j]) * (pre[i] - pre[j]));\n    }\n    printf(\"%lld\\n\", f[n]);\n    return 0;\n}\n",
      explanation: `**解题思路：**

1. **状态设计**：f[i] 表示把前 i 个数划分后偏差值之和的最小值。设 pre[i] 为前缀和，把前 i 个数的最后一段切在 j 之后（即第 j+1..i 为一段），该段的偏差值为 (pre[i] − pre[j])²。
2. **转移方程**：f[i] = min over 0 ≤ j < i of ( f[j] + (pre[i] − pre[j])² )。初始 f[0] = 0，答案为 f[n]。
3. **复杂度**：状态 O(n)，转移 O(n)，总 O(n²)。n ≤ 2000，约 4×10⁶ 次运算，轻松通过。平方项可能很大：段和绝对值 ≤ 2000×100 = 2×10⁵，平方约 4×10¹⁰，必须用 long long。
4. **特殊性质**：40% 的数据所有 aᵢ 非负——此时把每个数单独切成一段最优（和的平方的凸性保证越切越小，(Σ)² ≥ Σ(xᵢ²)），答案即 Σaᵢ²。负数出现后则需要 DP。

**参考实现：**

\`\`\`cpp
#include <cstdio>
#include <algorithm>
using namespace std;
const int N = 2005;
const long long oo = 1e18;
int n;
int a[N], pre[N];
long long f[N];
int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
        pre[i] = pre[i - 1] + a[i];
    }
    for (int i = 1; i <= n; i++) {
        f[i] = oo;
        for (int j = 0; j < i; j++)
            f[i] = min(f[i], f[j] + 1ll * (pre[i] - pre[j]) * (pre[i] - pre[j]));
    }
    printf("%lld\\n", f[n]);
    return 0;
}
\`\`\`

**样例验证：** 样例 1：A = [1,2,-3,4]。最优划分 [1][2][-3,4]，偏差 = 1² + 2² + 1² = 6 ✓（整段和为 4 时平方 16 更大；[1,2][-3,4] 为 9+1=10）。样例 2：全段和 -1-1+4-5-1+4 = 0，整段划分偏差 0² = 0，最小值 0 ✓。`,
    },
    {
      id: 27,
      type: 'programming',
      title: '分树规划',
      score: 25,
      description: `老师有一棵有 n 个结点的树，结点依次以 1, 2, ..., n 编号。

老师想将这棵树作为奖品分给两位同学。具体而言，老师会选择一条边并从树上删去它，从而将这棵树分为两个连通块。两位同学分别可以得到其中一个连通块。

如果有同学拿到的连通块结点数明显小于另一位同学，那么这位同学会不太高兴。为了避免这种情况出现，老师想知道两个连通块结点数之差的绝对值最小是多少。`,
      inputFormat: `第一行，一个正整数 n，表示结点数量。

接下来 n - 1 行，每行两个正整数 u, v，表示一条连接结点 u 和结点 v 的边。`,
      outputFormat: `输出一行，一个整数，表示答案。`,
      samples: [
        { input: '4\n1 2\n2 3\n3 4', output: '0' },
        { input: '6\n1 2\n1 3\n1 4\n1 5\n5 6', output: '2' },
      ],
      hint: `对于 40% 的测试点，保证 2 ≤ n ≤ 500。

对于所有测试点，保证 2 ≤ n ≤ 2 × 10^4。

时间限制：1.0 s，内存限制：512.0 MB。`,
      tags: ['树与二叉树', 'DFS'],
      referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 2e4 + 5;\nconst int E = N << 1;\nint n;\nint h[N], to[E], nx[E], et;\nint ans;\nvoid ae(int u, int v) {\n    et++;\n    to[et] = v;\n    nx[et] = h[u];\n    h[u] = et;\n}\nint dfs(int u, int p = 0) {\n    int sz = 1;\n    for (int i = h[u]; i; i = nx[i])\n        if (to[i] != p)\n            sz += dfs(to[i], u);\n    ans = min(ans, abs(n - 2 * sz));\n    return sz;\n}\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i < n; i++) {\n        int u, v;\n        scanf(\"%d%d\", &u, &v);\n        ae(u, v);\n        ae(v, u);\n    }\n    ans = n;\n    dfs(1);\n    printf(\"%d\\n\", ans);\n    return 0;\n}\n",
      explanation: `**解题思路：**

1. **核心观察**：删去边 (u, v) 后，树被分成两块，其中一块恰好是以 v 为根的子树（在以 1 为根的有根树中）。若该子树大小为 sz，两块大小分别为 sz 与 n − sz，差为 |n − 2·sz|。
2. **算法**：以 1 为根做一次 DFS，求出每个结点为根的子树大小；在递归过程中对每条边用 ans = min(ans, |n − 2·sz|) 更新答案。
3. **复杂度**：一次 DFS，时间 O(n)，n ≤ 2×10⁴ 轻松通过。注意递归深度在链状树下可达 2×10⁴，官方参考程序直接递归即可。

**参考实现：**

\`\`\`cpp
#include <cstdio>
#include <algorithm>
using namespace std;
const int N = 2e4 + 5;
const int E = N << 1;
int n;
int h[N], to[E], nx[E], et;
int ans;
void ae(int u, int v) {
    et++;
    to[et] = v;
    nx[et] = h[u];
    h[u] = et;
}
int dfs(int u, int p = 0) {
    int sz = 1;
    for (int i = h[u]; i; i = nx[i])
        if (to[i] != p)
            sz += dfs(to[i], u);
    ans = min(ans, abs(n - 2 * sz));
    return sz;
}
int main() {
    scanf("%d", &n);
    for (int i = 1; i < n; i++) {
        int u, v;
        scanf("%d%d", &u, &v);
        ae(u, v);
        ae(v, u);
    }
    ans = n;
    dfs(1);
    printf("%d\\n", ans);
    return 0;
}
\`\`\`

**样例验证：** 样例 1：链 1-2-3-4，删除中间边 2-3 得两块各 2 个结点，差 0 ✓。样例 2：星形 1 连 2/3/4/5、5 连 6。各边子树大小分别为 1、1、1、2（含 5、6）。最小差 = min(|6−2|, |6−2|, |6−2|, |6−4|) = 2 ✓。`,
    },
  ],
};
