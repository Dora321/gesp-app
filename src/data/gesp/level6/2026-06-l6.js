// 2026年6月 GESP C++ 六级真题 (第14次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照官方 PDF 镜像转录。
// 客观题答案以原卷答案表为唯一证据：
//   单选题答案表在第 1 页：D B C A A B A A B B D B A B A
//   判断题答案表在第 6 页：× × × √ × × √ × √ √
// 判断题答案表为矢量红色 √/× 记号，已按 200dpi 渲染逐格读取并全部逻辑复核。

export const paperData = {
  id: '2026-06-l6',
  title: '2026年6月 GESP C++ 六级真题',
  level: 6,
  year: 2026,
  month: 6,
  session: 14,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    type: 'official',
    notes: '全卷依据官方 PDF 镜像逐题转录；Q9 哈夫曼频率、编程题数据范围等公式图片均渲染核对。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-10-30',
    scope: '单选答案串 DBCAA BAABB DBABA 与判断答案串 ×××√××√×√√ 按官方答案表转录，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `下列关于 C++ 中继承和多态的描述中，错误的是（ ）。`,
      options: [
        '通过基类指针调用虚函数时，会根据对象实际类型决定调用版本。',
        '基类析构函数常声明为虚函数，以便通过基类指针正确释放派生类对象。',
        '派生类可以重写基类中的虚函数。',
        '构造函数可以声明为 virtual，以便在构造对象时实现动态绑定。',
      ],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

**核心解析：**
构造函数**不能**声明为虚函数。虚函数机制依赖虚表指针 vptr，而 vptr 是在构造过程中才被设置的——对象尚未构造完成时无从谈起"根据实际类型动态绑定"，所以 C++ 禁止虚构造函数。

**选项分析：**
- **A 正确**：这正是动态绑定的定义，虚函数通过基类指针/引用调用时按对象的实际类型分派。
- **B 正确**：基类析构函数声明为 virtual，delete 基类指针时才会先调用派生类析构再调用基类析构，避免资源泄漏。
- **C 正确**：派生类用相同签名重写（override）基类虚函数是多态的基础。

**考点：** 继承、多态、虚函数`,
      tags: ['面向对象', '虚函数'],
    },
    {
      id: 2,
      type: 'single',
      question: `下列代码中，d1->work(); 和 d2->work(); 输出不同结果的主要原因是（ ）。
\`\`\`cpp
class Device {
public:
    virtual void work() {
        cout << "Device is working" << endl;
    }
    virtual ~Device() {}
};
class Printer : public Device {
public:
    void work() override {
        cout << "Printer is printing" << endl;
    }
};
class Scanner : public Device {
public:
    void work() override {
        cout << "Scanner is scanning" << endl;
    }
};
int main() {
    Device* d1 = new Printer();
    Device* d2 = new Scanner();
    d1->work();
    d2->work();
    delete d1;
    delete d2;
    return 0;
}
\`\`\``,
      options: [
        'Printer 和 Scanner 使用了相同的构造函数。',
        'work() 是虚函数，且 d1 和 d2 实际指向不同派生类对象，发生动态绑定。',
        'd1 和 d2 是不同的指针变量。',
        '程序中使用了 delete 释放对象。',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
work() 在基类中声明为 virtual，两个派生类分别重写。d1 实际指向 Printer 对象、d2 实际指向 Scanner 对象，通过基类指针调用虚函数时发生**动态绑定**：运行期根据对象实际的虚表决定调用哪个版本的 work()，于是分别输出 "Printer is printing" 和 "Scanner is scanning"。

**选项分析：**
- **A**：与输出无关，两个类的构造函数是各自默认生成的。
- **C**：指针变量不同本身不产生不同行为，关键是"指向的对象类型不同 + 虚函数"。
- **D**：delete 与调用结果无关。

**考点：** 多态、动态绑定、虚函数`,
      tags: ['面向对象', '虚函数'],
    },
    {
      id: 3,
      type: 'single',
      question: `下面代码在 main() 中有一行会导致编译错误，请找出来。
\`\`\`cpp
class Student {
public:
    Student(string n, int s) : name(n), score(s) {}
    string getName() {
        return name;
    }
    void setScore(int s) {
        score = s;
    }
private:
    string name;
    int score;
};
int main() {
    Student stu("Tom", 85);
    cout << stu.getName();   // ①
    stu.setScore(90);        // ②
    stu.score = 100;         // ③
    cout << stu.getName();   // ④
    return 0;
}
\`\`\``,
      options: ['第 ① 行', '第 ② 行', '第 ③ 行', '第 ④ 行'],
      answer: 2,
      score: 2,
      explanation: `**答案：C（第 ③ 行会导致编译错误）**

**核心解析：**
面向对象编程的核心思想之一是“数据封装”，C++ 通过访问控制修饰符（\`public\`、\`private\`、\`protected\`）来严格限定类成员的可见性和访问权限：
1. **\`public\`（公有权限）**：修饰的成员既可以在类的内部使用，也可以在类外部（如全局函数、\`main()\` 函数中）通过类的对象直接访问和调用。
2. **\`private\`（私有权限）**：修饰的成员用于隐藏类的内部实现细节，只能由当前类的成员函数（或友元）直接访问；在类的外部作用域中，任何外部代码都无法直接通过对象名读取或修改私有成员。

在本题中，\`Student\` 类将两个成员变量 \`string name;\` 和 \`int score;\` 声明在 \`private:\` 控制区域内，因此它们是私有成员变量。而在 \`main()\` 函数中：
第 ③ 行代码 \`stu.score = 100;\` 位于类定义的外部，它试图通过对象名直接向私有成员变量 \`score\` 赋值。这破坏了类的私有封装与访问控制规则，编译器会提示类似 \`'score' is private within this context\` 的错误信息，无法通过编译。若想安全地修改分数，必须调用类提供的公有成员函数 \`stu.setScore(...)\`。

**选项逐项分析：**
- **A 第 ① 行（\`cout << stu.getName();\`）**：❌ 不会导致编译错误。\`getName()\` 函数声明在 \`public:\` 下，属于公有成员函数，外部可以通过对象正常调用以获取姓名，语法完全合法。
- **B 第 ② 行（\`stu.setScore(90);\`）**：❌ 不会导致编译错误。\`setScore(int s)\` 声明在 \`public:\` 下，属于公有的设置器（Setter）函数，允许外部传入参数 \`90\` 间接更新对象内部的私有成员 \`score\`，符合面向对象设计规范。
- **C 第 ③ 行（\`stu.score = 100;\`）**：✅ 会导致编译错误，符合题意。\`score\` 是类的私有（\`private\`）成员变量，在 \`main()\` 函数中直接进行读写访问违反了访问控制规则，引发编译错误。
- **D 第 ④ 行（\`cout << stu.getName();\`）**：❌ 不会导致编译错误。与第 ① 行相同，\`getName()\` 作为公有接口始终可以在类外部被正常调用并输出返回值，语法正确。

**易错提醒：**
- **明确“类内”与“类外”的区别**：在类的成员函数内部（如构造函数或 \`setScore\` 中），直接使用私有成员变量 \`score\` 是完全合法的；但 \`main()\` 函数属于独立的外部函数，不能直接读写对象的私有数据。
- **区分 \`class\` 与 \`struct\` 的默认权限**：如果在 \`class\` 中未书写任何访问修饰符，其成员默认都是 \`private\`（私有）；而 \`struct\` 中未标注时，成员默认是 \`public\`（公有）。

**知识延伸：**
将成员变量设为 \`private\`，并提供公有的 \`getName()\`（Getter / 访问器）与 \`setScore()\`（Setter / 修改器），是 C++ 中经典的封装模式。这种设计不仅防止了外部代码对对象内部状态的破坏性修改，还允许在 Setter 函数中加入数据合理性检查（例如限定 \`s >= 0 && s <= 100\`），从而增强程序的健壮性与安全性。`,
      tags: ['面向对象', '封装'],
    },
    {
      id: 4,
      type: 'single',
      question: `某文本编辑器把用户输入的字符依次压入栈 S。用户依次输入 X, Y, Z, W 后，连续执行两次撤销操作。每次撤销都会弹出栈顶一个字符。此时栈从栈底到栈顶的内容是（ ）。`,
      options: ['X Y', 'X Y Z', 'Y Z', 'X Z'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
依次压入 X、Y、Z、W 后，栈从底到顶为 X Y Z W。每次撤销弹出栈顶：
1. 第一次撤销弹出 W；
2. 第二次撤销弹出 Z。

剩余栈从栈底到栈顶为 **X Y**。

**选项分析：**
- **B**：忘了弹栈，未执行撤销。
- **C**：把弹出的 W、Z 留下了，顺序也错。
- **D**：栈是后进先出，不可能弹出中间的 Y 保留 Z。

**考点：** 栈、后进先出`,
      tags: ['栈'],
    },
    {
      id: 5,
      type: 'single',
      question: `假设循环队列数组长度为 N = 7，队空判断条件为 front == rear。入队和出队操作如下，依次执行：
\`\`\`cpp
const int N = 7;
int q[N];
int front = 3, rear = 3;
void enqueue(int x) {
    q[rear] = x;
    rear = (rear + 1) % N;
}
void dequeue() {
    front = (front + 1) % N;
}
\`\`\`
\`\`\`cpp
enqueue(10);
enqueue(20);
enqueue(30);
dequeue();
enqueue(40);
dequeue();
enqueue(50);
\`\`\`
最终 (front, rear) 的值是（ ）。`,
      options: ['(5, 1)', '(4, 0)', '(5, 0)', '(3, 1)'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
初始 front = rear = 3，逐步模拟：
1. enqueue(10)：rear 3→4
2. enqueue(20)：rear 4→5
3. enqueue(30)：rear 5→6
4. dequeue()：front 3→4
5. enqueue(40)：rear 6→7%7=**0**（循环回绕）
6. dequeue()：front 4→5
7. enqueue(50)：rear 0→1

最终 **(front, rear) = (5, 1)**。此时队列中有 3 个元素（50、10、20）——注意循环队列元素个数 = (rear - front + N) % N = (1 - 5 + 7) % 7 = 3 ✓。

**选项分析：**
- **B**：漏了第一次 dequeue，front 少走一步。
- **C**：enqueue(40) 忘了取模回绕。
- **D**：出队入队次数记错。

**考点：** 循环队列、取模回绕`,
      tags: ['队列', '循环队列'],
    },
    {
      id: 6,
      type: 'single',
      question: `以下函数 check() 用于判断一棵二叉树是否为（ ）。
\`\`\`cpp
bool check(TreeNode* root) {
    if (!root) return true;
    queue<TreeNode*> q;
    q.push(root);
    bool hasNull = false;
    while (!q.empty()) {
        TreeNode* cur = q.front();
        q.pop();
        if (cur == nullptr) {
            hasNull = true;
        } else {
            if (hasNull) return false;
            q.push(cur->left);
            q.push(cur->right);
        }
    }
    return true;
}
\`\`\``,
      options: ['满二叉树', '完全二叉树', '二叉搜索树', '平衡二叉树'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
这是**完全二叉树**的标准层序判定法：按层序遍历把每个结点的左右孩子（包括空指针）全部入队。一旦遇到空指针（hasNull = true），之后若再出现非空结点，说明"有空隙"，不是完全二叉树，返回 false。遍历完无违规则返回 true。

**选项分析：**
- **A 满二叉树**：还需要每个结点都有 0 或 2 个孩子，该代码不检查。
- **C 二叉搜索树**：需要比较结点值的大小关系，此处无值比较。
- **D 平衡二叉树**：需要检查左右子树高度差 ≤ 1，此处无高度计算。

**考点：** 完全二叉树、层序遍历、BFS`,
      tags: ['二叉树', '完全二叉树', 'BFS'],
    },
    {
      id: 7,
      type: 'single',
      question: `以下代码实现了二叉树的哪种遍历方式？
\`\`\`cpp
void traverse(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->val << " ";
    traverse(root->left);
    traverse(root->right);
}
\`\`\``,
      options: ['前序遍历', '中序遍历', '后序遍历', '层序遍历'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
访问顺序为"根 → 左子树 → 右子树"：先输出当前结点，再递归左、右子树，这是**前序遍历**（先根遍历）。

**选项分析：**
- **B 中序**：应为"左 → 根 → 右"，即第一个递归后输出。
- **C 后序**：应为"左 → 右 → 根"，最后输出。
- **D 层序**：需借助队列逐层访问，递归写法是 DFS。

**考点：** 二叉树遍历`,
      tags: ['二叉树', '遍历'],
    },
    {
      id: 8,
      type: 'single',
      question: `已知一棵二叉树的先序遍历序列为：A B D E H C F G，中序遍历序列为：D B H E A F C G，则该二叉树的后序遍历序列是（ ）。`,
      options: ['D H E B F G C A', 'D E H B F G C A', 'H D E B F C G A', 'D H E B G F C A'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
由先序第一个字符知根为 **A**；在中序中 A 左边 "D B H E" 是左子树、右边 "F C G" 是右子树。
- 左子树：先序 B D E H、中序 D B H E → 根 **B**，D 在其左，"H E" 在其右；再由先序 E 在前知右子树根为 **E**，中序中 H 在 E 左 → H 是 E 的左孩子。
- 右子树：先序 C F G、中序 F C G → 根 **C**，F 为左孩子、G 为右孩子。

后序遍历 = 左 → 右 → 根：
左子树部分：D → (H → E) → B，得 D H E B；右子树部分：F → G → C，得 F G C；最后根 A。

合成：**D H E B F G C A**。

**选项分析：**
- **B**：D E H B——E 与 H 顺序颠倒（后序中孩子 H 先于父 E）。
- **C**：H D E——H 是 E 的左孩子，必须紧跟在 E 的左子树输出序列首（D 之前只有 D 自己的分支），顺序错。
- **D**：F G 颠倒成 G F。

**考点：** 二叉树遍历、先序+中序重建`,
      tags: ['二叉树', '遍历'],
    },
    {
      id: 9,
      type: 'single',
      question: `有 6 个字符，它们出现的次数分别为：{3, 4, 7, 8, 12, 15}，现在用哈夫曼编码为这些字符编码，最小加权路径长度 WPL 的值为（ ）。`,
      options: ['113', '119', '126', '31'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
哈夫曼构建：每次取出频率最小的两棵树合并，合并权值之和就是 WPL 的一部分：
1. 3 + 4 = **7**
2. 7 + 7 = **14**
3. 8 + 12 = **20**
4. 14 + 15 = **29**
5. 20 + 29 = **49**

WPL = 所有内部结点权值之和 = 7 + 14 + 20 + 29 + 49 = **119**。

验证：深度 —— 3、4 在深度 4（贡献 (3+4)×4 = 28），7 在深度 3（21），8、12 在深度 2（40），15 在深度 2（30）…… 用树核对：28 + 21 + 40 + 30 = 119 ✓

**选项分析：**
- **A 113**：合并顺序出错（例如先合 8+12）导致某些频次深度分配次优。
- **C 126**：不是最优树，部分字符深度过深。
- **D 31**：只是几次部分和，不是完整 WPL。

**考点：** 哈夫曼树、WPL、贪心`,
      tags: ['哈夫曼树', '贪心', '二叉树'],
    },
    {
      id: 10,
      type: 'single',
      question: `对 n 个不同符号进行哈夫曼编码。若生成的哈夫曼树共有 63 个结点，则 n 的值是（ ）。`,
      options: ['31', '32', '63', '64'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
哈夫曼树中每次合并两个结点产生一个新结点，n 个叶子需 n - 1 次合并，故总结点数 = n + (n - 1) = **2n - 1**（不存在度为 1 的结点）。

由 2n - 1 = 63 解得 n = **32**。

**选项分析：**
- **A 31**：2×31-1 = 61 ≠ 63。
- **C 63 / D 64**：把总结点数（或加一）当作叶子数，混淆了 2n-1 关系。

**考点：** 哈夫曼树、结点数性质`,
      tags: ['哈夫曼树', '二叉树'],
    },
    {
      id: 11,
      type: 'single',
      question: `在格雷码中，相邻两个编码只能有一位不同。若当前编码为 110，则它的下一个编码不可能是（ ）。`,
      options: ['010', '111', '100', '001'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

**核心解析：**
逐位比较 110 与各选项：
- **A 010**：仅最高位不同（1→0），1 位不同，可能；
- **B 111**：仅最低位不同（0→1），1 位不同，可能；
- **C 100**：中间位、最低位不同？逐位看：1↔1 相同、1↔0 不同、0↔0 相同——只有第 2 位不同，1 位不同，可能；
- **D 001**：1↔0、1↔0、0↔1，**三位都不同**，违反格雷码相邻性，不可能。

**考点：** 格雷码、编码`,
      tags: ['格雷码', '编码'],
    },
    {
      id: 12,
      type: 'single',
      question: `给定一棵二叉树，采用广度优先搜索 BFS 返回其右视图，其中右视图中的每个节点都是该层最右侧的节点。横线处应填写（ ）。
\`\`\`cpp
vector<int> rightSideView(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; ++i) {
            TreeNode* node = q.front();
            q.pop();
            __________________________
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}
\`\`\``,
      options: [
        'if (i == 0) result.push_back(node->val);',
        'if (i == sz - 1) result.push_back(node->val);',
        'result.push_back(q.front()->val);',
        'if (node->right) result.push_back(node->right->val);',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
BFS 按层处理：每层开始时记录当前队列大小 sz。层内第 0 个是最左结点、第 sz-1 个是**最右结点**。右视图取每层最后一个，所以当 \`i == sz - 1\` 时把 node->val 加入 result。

**选项分析：**
- **A** \`i == 0\` 取的是每层**最左**结点，得到的是左视图。
- **C** 此时 node 已出队，q.front() 是下一个结点（甚至是下一层或空），逻辑错。
- **D** 只看右孩子：若某层最右结点是左叶子（父结点无右孩子），会被漏掉；且同一结点可能被多次加入。

**考点：** BFS、层序遍历、二叉树右视图`,
      tags: ['二叉树', 'BFS'],
    },
    {
      id: 13,
      type: 'single',
      question: `下面代码实现二叉搜索树的插入操作。假设树中不存在重复值，横线处应填写（ ）。
\`\`\`cpp
TreeNode* insertNode(TreeNode* root, int x) {
    if (root == nullptr) {
        return new TreeNode(x);
    }
    if (x < root->val) {
        __________________________
    } else {
        root->right = insertNode(root->right, x);
    }
    return root;
}
\`\`\``,
      options: [
        'root->left = insertNode(root->left, x);',
        'root = insertNode(root->left, x);',
        'root->right = insertNode(root->left, x);',
        'insertNode(root->left, x);',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
x 小于当前结点值时递归进入左子树，并把返回值（可能是新建的结点，也可能是原子树根）**接回左指针**：\`root->left = insertNode(root->left, x);\`。与 else 分支的右子树写法完全对称。

**选项分析：**
- **B**：修改的是局部指针 root 本身，原树的 root->left 没接上新结点，插入丢失。
- **C**：把左子树的返回值接到右指针上，既覆盖了原右子树又接错位置。
- **D**：丢弃返回值，新建结点没有挂到树上，插入无效。

**考点：** 二叉搜索树、插入、递归`,
      tags: ['二叉搜索树', '递归'],
    },
    {
      id: 14,
      type: 'single',
      question: `给定一个整数数组 a，每个元素表示一个位置上的数值。要求从数组中选择若干个元素，使得任意两个被选择的元素在原数组中都不相邻，并且所选元素的总和最大。函数 choose(vector<int>& a) 返回能够得到的最大总和，则横线处应填写（ ）。
\`\`\`cpp
int choose(vector<int>& a) {
    if (a.empty()) return 0;
    int n = a.size();
    if (n == 1) return a[0];
    vector<int> dp(n, 0);
    dp[0] = a[0];
    dp[1] = max(a[0], a[1]);
    for (int i = 2; i < n; ++i) {
        dp[i] = __________________________;
    }
    return dp[n - 1];
}
\`\`\``,
      options: [
        'dp[i - 1] + a[i]',
        'max(dp[i - 1], dp[i - 2] + a[i])',
        'max(dp[i - 2], a[i])',
        'dp[i - 1] + dp[i - 2]',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
经典的"打家劫舍"型 DP。对第 i 个位置只有两种决策：
- **不选** a[i]：收益 dp[i - 1]；
- **选** a[i]：第 i-1 个不能选，收益 dp[i - 2] + a[i]。

取两者较大值：\`dp[i] = max(dp[i - 1], dp[i - 2] + a[i])\`。

**选项分析：**
- **A**：dp[i-1] 可能已包含 a[i-1]，再选 a[i] 会相邻冲突。
- **C**：漏掉 dp[i-1] 这一不选 a[i] 时可能更优的分支（只比不选 i-2 的情形）。
- **D**：直接相加语义完全不对。

**考点：** 动态规划、不相邻最大和`,
      tags: ['动态规划'],
    },
    {
      id: 15,
      type: 'single',
      question: `下面代码实现 0/1 背包的一维动态规划。第 i 个物品重量为 wt[i]，价值为 val[i]，背包容量为 W。横线处应填写（ ）。
\`\`\`cpp
int knapsack(int W, vector<int>& wt, vector<int>& val) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; ++i) {
        for (int w = W; w >= wt[i]; --w) {
            __________________________
        }
    }
    return dp[W];
}
\`\`\``,
      options: [
        'dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);',
        'dp[w] = max(dp[w - 1], dp[w - wt[i]] + val[i]);',
        'dp[w] = dp[w] + val[i];',
        'dp[w - wt[i]] = max(dp[w], val[i]);',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
0/1 背包一维优化的标准转移：\`dp[w] = max(dp[w], dp[w - wt[i]] + val[i])\`——不选第 i 件（dp[w]）与选第 i 件（dp[w - wt[i]] + val[i]）取较大者。**关键在于内层 w 从大到小循环**：这样 dp[w - wt[i]] 还是上一轮（未考虑第 i 件物品）的值，保证每件物品至多选一次。

**选项分析：**
- **B**：dp[w-1] 是"容量 w-1 的最优解"，不是"不选当前物品"的语义，容量对不上。
- **C**：无条件累加价值，既不检查剩余容量语义也忽略不选的情况。
- **D**：把更新写到 dp[w - wt[i]] 上，方向颠倒，会破坏后续转移。

**考点：** 动态规划、0/1 背包`,
      tags: ['动态规划', '背包'],
    },
    {
      id: 16,
      type: 'judge',
      question: `C++ 中构造函数可以声明为虚函数，从而实现运行时多态。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
构造函数不能是虚函数。虚函数的动态绑定依赖对象的虚表指针 vptr，而 vptr 恰恰是在构造函数执行过程中才被初始化的——对象还没构造完成时，无法通过虚表机制"动态决定"调用哪个构造函数。实现"按实际类型创建对象"需求通常用虚函数 clone() 或工厂函数代替。`,
      tags: ['面向对象', '虚函数'],
    },
    {
      id: 17,
      type: 'judge',
      question: `通过指向 Base 的指针删除 Derived 对象时，一定会先调用 Derived 的析构函数，再调用 Base 的析构函数。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
这取决于基类析构函数是否为 **virtual**。若像如下代码那样 Base 的析构函数不是虚函数：
\`\`\`cpp
Base* p = new Derived();
delete p;   // 输出只有 "Base destructor"
\`\`\`
通过基类指针删除派生类对象是**未定义行为**，实践中通常只调用 Base 的析构函数，Derived 的析构函数根本不会执行（派生类资源泄漏）。

只有把 Base 的析构函数声明为 virtual，才"一定先 Derived 后 Base"。题干缺少这个前提，说法错误。`,
      tags: ['面向对象', '虚函数', '析构函数'],
    },
    {
      id: 18,
      type: 'judge',
      question: `在 C++ STL 中，stack 的 pop() 函数会返回栈顶元素并将其删除。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
STL 的 stack::pop() 返回类型是 **void**，只负责删除栈顶元素，不返回任何值。这是刻意设计：引用返回栈顶存在悬空引用风险（弹出后引用失效），且将"访问"与"删除"分离（top() 取值、pop() 删除）更安全。取栈顶应先用 top()，再 pop()。queue 的 pop() 同样不返回元素。`,
      tags: ['栈', 'STL'],
    },
    {
      id: 19,
      type: 'judge',
      question: `程序运行后会输出 2。
\`\`\`cpp
int main() {
    queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);
    q.pop();
    cout << q.front() << endl;
    return 0;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
\`std::queue\` 是 C++ 标准模板库（STL）中的单向队列容器，遵循「先进先出」（FIFO, First In First Out）原则。程序各语句的具体执行流程如下：

1. \`queue<int> q;\`：创建一个存储整型的空队列 \`q\`。
2. \`q.push(1);\`：元素 \`1\` 入队，此时队列（队头到队尾）为 \`[1]\`。
3. \`q.push(2);\`：元素 \`2\` 入队，队列变为 \`[1, 2]\`。
4. \`q.push(3);\`：元素 \`3\` 入队，队列变为 \`[1, 2, 3]\`。
5. \`q.pop();\`：弹出队头元素。由于队列是先进先出，最早入队的元素 \`1\` 被移除，此时队头元素更新为 \`2\`，队列剩余 \`[2, 3]\`。
6. \`cout << q.front() << endl;\`：\`q.front()\` 访问并返回当前队头元素，即数值 \`2\`，因此程序最终输出 \`2\`。

题干描述与实际输出一致，判定为正确。

**选项分析：**
- **A 正确**：✅ 队列入队后顺序为 1、2、3，执行一次 \`pop()\` 弹出原队头 1，新队头为 2，\`q.front()\` 正确输出 2。
- **B 错误**：❌ 误判了队列的操作顺序或出入队规则。

**易错提醒：**
- **返回值陷阱**：C++ STL 中 \`q.pop()\` 的返回值是 \`void\`，仅负责删除队头，不会返回被删除的元素值；若想获取队头元素，必须通过 \`q.front()\`。
- **与栈混淆**：若误将队列当成栈（后进先出 LIFO），容易误以为 \`pop()\` 弹出的是最后加入的 3 而导致推导错误。访问队头使用 \`front()\`，访问队尾使用 \`back()\`，而栈访问栈顶使用 \`top()\`。`,
      tags: ['队列', 'STL'],
    },
    {
      id: 20,
      type: 'judge',
      question: `下列函数试图将整数 x 插入到一棵二叉搜索树中。假设二叉搜索树满足如下性质：对于任意结点，左子树中所有结点的值均小于该结点的值，右子树中所有结点的值均大于或等于该结点的值。判断该函数是否能够在插入后保持二叉搜索树性质。
\`\`\`cpp
TreeNode* insertNode(TreeNode* root, int x) {
    if (root == nullptr) {
        return new TreeNode(x);
    }
    if (x < root->val) {
        root->right = insertNode(root->right, x);
    } else {
        root->left = insertNode(root->left, x);
    }
    return root;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
分支条件写反了：\`x < root->val\` 说明 x 应插入**左**子树（左子树所有值 < 结点值），代码却递归插入右子树；反之 x ≥ root->val 应插入右子树，代码却去了左子树。

例如依次插入 10、5：5 < 10，被挂到 10 的**右**子树上，得到右孩子 5 < 父 10，直接违反"右子树 ≥ 结点值"的性质。因此该函数不能保持二叉搜索树性质。`,
      tags: ['二叉搜索树'],
    },
    {
      id: 21,
      type: 'judge',
      question: `哈夫曼编码一定唯一，只要字符频率相同，得到的编码也一定完全相同。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
哈夫曼树的最优性（WPL 最小）是唯一的，但**最优树的形态不唯一**：
1. 合并时若出现权值相同的结点，选取顺序可以不同；
2. 左右子树交换不影响 WPL（0/1 编码互换）。

因此相同频率可能得到多棵不同形态的哈夫曼树，编码集不唯一（虽然各字符的**编码长度**可以一致）。说"一定完全相同"是错误的。`,
      tags: ['哈夫曼树', '编码'],
    },
    {
      id: 22,
      type: 'judge',
      question: `若用数组按层序存储完全二叉树，且根节点下标为 0，则下标为 i 的节点左孩子下标为 2 * i + 1，右孩子下标为 2 * i + 2。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
0 起始下标的层序存储：结点 i 的左孩子是 2i + 1、右孩子是 2i + 2，父结点是 (i - 1) / 2（下取整）。

推导验证：根 0 的孩子是 1、2（2×0+1, 2×0+2）✓；结点 1 的孩子是 3、4，结点 2 的孩子是 5、6 ✓——正好是层序铺开的下标。（若根下标为 1，公式才变为 2i 与 2i+1。）`,
      tags: ['二叉树', '完全二叉树', '数组'],
    },
    {
      id: 23,
      type: 'judge',
      question: `以下代码可以正确地按层换行输出二叉树的节点值。
\`\`\`cpp
void printByLevel(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        for (int i = 0; i < q.size(); ++i) {
            TreeNode* cur = q.front();
            q.pop();
            cout << cur->val << " ";
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        cout << endl;
    }
}
\`\`\``,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
错误在于循环条件 \`i < q.size()\` **每轮迭代都重新求值**，而循环体内 q 不断 pop（size 减 1）又 push 孩子（size 增 1），"本层结点数"没有被提前固定。

例如只有根和一个左孩子时：第一轮 sz 起始为 1，i=0 输出根并 push 左孩子，队列变 2，此时 i=1 < 2 继续执行——本该换行却继续输出下一层，换行位置错乱。正确写法是先 \`int sz = q.size();\` 把本层大小固定下来，再 \`for (int i = 0; i < sz; ++i)\`。`,
      tags: ['二叉树', 'BFS'],
    },
    {
      id: 24,
      type: 'judge',
      question: `使用栈非递归实现二叉树前序遍历时，若希望先访问左子树，通常应先将右孩子入栈，再将左孩子入栈。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
前序（根-左-右）非递归实现：访问当前结点后，为让"左孩子"先于"右孩子"被处理，必须利用栈**后进先出**的特性——**先压右孩子、再压左孩子**，这样下一轮 pop 出来的正是左孩子。

若顺序颠倒（先左后右），下一轮会先处理右子树，得到"根-右-左"的错误顺序。`,
      tags: ['二叉树', '栈', '遍历'],
    },
    {
      id: 25,
      type: 'judge',
      question: `动态规划问题通常要求具有最优子结构，并且常常存在重叠子问题。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
适用动态规划的两个标志性特征：
1. **最优子结构**：原问题的最优解可以由子问题的最优解构造出来；
2. **重叠子问题**：递归求解过程中同一子问题被反复计算，因此可以把子问题答案存表（记忆化/递推）避免重复求解——这正是 DP 相比朴素搜索提效的关键。

0/1 背包、打家劫舍（本题单选 Q14）都是典型例子。`,
      tags: ['动态规划'],
    },
    {
      id: 26,
      type: 'programming',
      title: '条形蛋糕',
      score: 25,
      description: `寒假到了，小杨同学打算找一份兼职，顺便体验一下打工人的生活。

小杨同学给一家蛋糕店发送了一份自己的简历，希望可以在寒假来这里帮忙。店长最近正好遇到了一个难题：店里每天会做一条长条蛋糕，但是不同长度的蛋糕块卖出的价格不同，应该怎么分才能卖得最多呢？

有趣的是店长曾经学习过计算机专业。他最近对动态规划算法很感兴趣，于是打算用这个问题考一考小杨同学，问题如下：

给定一条长度为 n 的长条蛋糕和一个价格表，该价格表表示长度为 i（i = 1, 2, …, n）的蛋糕块的价格为 p_i。求蛋糕的分割方案，使得总销售价格最大，注意蛋糕块的长度必须为整数。

## 数据范围

$1 \\leq n \\leq 10^3$，$1 \\leq p_i \\leq 10^5$。`,
      inputDescription: `第一行一个正整数 n，表示长条蛋糕的总长度。

第二行 n 个正整数 p₁, p₂, …, pₙ，表示不同长度蛋糕块的价格。`,
      outputDescription: `一行一个正整数，表示最大总销售价格。`,
      samples: [
        {
          input: `4
1 5 8 9`,
          output: `10`,
        },
        {
          input: `10
1 5 8 9 10 17 17 20 24 30`,
          output: `30`,
        },
      ],
      explanation: `**解析：**

### 1. 问题分析与模型转换
本题要求将一根长度为 \`n\` 的条形蛋糕切成若干段，使得卖出的总收益最大。已知切成长度为 \`i\` 的单段售价为 \`p[i]\`，并且每种长度可以切出多次（即每种长度的蛋糕可以重复使用任意次），各段长度之和恰好等于 \`n\`。

这是一个经典的**完全背包问题**（也是算法导论中的「钢条切割问题」）：
- **背包总容量**：蛋糕的总长度 \`n\`。
- **物品**：切出长度为 \`i\`（\`1 <= i <= n\`）的蛋糕段，其体积（重量）为 \`i\`，价值为 \`p[i]\`。
- **物品数量**：每种长度的蛋糕段数量不限，可以重复选取。
- **目标**：在总体积不超过（且恰好可以达到）\`n\` 的前提下，使总价值最大。

---

### 2. 完整算法步骤

1. **状态定义**：
   设一维数组 \`dp[j]\` 表示切出总长度为 \`j\` 的蛋糕所能获得的最大销售额（\`0 <= j <= n\`）。
2. **状态转移方程**：
   考虑是否切下一段长度为 \`i\` 的蛋糕：
   如果不切长度为 \`i\` 的段，最大收益为原来的 \`dp[j]\`；
   如果切下一段长度为 \`i\` 的蛋糕，获得的收益为 \`p[i]\`，剩余长度 \`j - i\` 的蛋糕能获得的最大收益为 \`dp[j - i]\`，因此新的总收益为 \`dp[j - i] + p[i]\`。
   转移方程为：
   \`dp[j] = max(dp[j], dp[j - i] + p[i])\`
3. **初始状态与边界**：
   \`dp[0] = 0\`，表示长度为 0 的蛋糕价值为 0。全局数组其余元素默认初始化为 0。
4. **遍历顺序**：
   - 外层循环遍历物品（蛋糕段长度 \`i\` 从 \`1\` 到 \`n\`）；
   - 内层循环遍历容量（当前蛋糕总长度 \`j\` 从 \`i\` 正序循环到 \`n\`）。
   因为每种长度可以重复使用多次，在计算 \`dp[j]\` 时允许使用当前已经更新过的 \`dp[j - i]\`（即在同一轮循环中多次切出长度 \`i\`），因此内层必须**正序遍历**。
5. **复杂度分析**：
   - 时间复杂度：外层循环 \`n\` 次，内层循环最多 \`n\` 次，总时间复杂度为 \`O(n^2)\`。在 \`n <= 1000\` 时，运算次数约为 \`10^6\`，完全可以在 1 秒内通过。
   - 空间复杂度：使用了一维 \`dp\` 数组和价格数组，空间复杂度为 \`O(n)\`。

---

### 3. 样例详细走查

#### 样例 1 走查
- **输入**：\`n = 4\`，各长度售价 \`p[1..4] = [1, 5, 8, 9]\`。
- **初始状态**：\`dp = [0, 0, 0, 0, 0]\`

1. **当 \`i = 1\` 时（单价 \`p[1] = 1\`，只用长度 1 切割）**：
   - \`j = 1\`：\`dp[1] = max(dp[1], dp[0] + 1) = max(0, 1) = 1\`
   - \`j = 2\`：\`dp[2] = max(dp[2], dp[1] + 1) = max(0, 2) = 2\`
   - \`j = 3\`：\`dp[3] = max(dp[3], dp[2] + 1) = max(0, 3) = 3\`
   - \`j = 4\`：\`dp[4] = max(dp[4], dp[3] + 1) = max(0, 4) = 4\`
   此时 \`dp\` 数组：\`[0, 1, 2, 3, 4]\`

2. **当 \`i = 2\` 时（单价 \`p[2] = 5\`，可用长度 1 和 2 切割）**：
   - \`j = 2\`：\`dp[2] = max(dp[2], dp[0] + 5) = max(2, 5) = 5\`
   - \`j = 3\`：\`dp[3] = max(dp[3], dp[1] + 5) = max(3, 1 + 5) = 6\`
   - \`j = 4\`：\`dp[4] = max(dp[4], dp[2] + 5) = max(4, 5 + 5) = 10\`
   此时 \`dp\` 数组：\`[0, 1, 5, 6, 10]\`

3. **当 \`i = 3\` 时（单价 \`p[3] = 8\`，加入长度 3 切割）**：
   - \`j = 3\`：\`dp[3] = max(dp[3], dp[0] + 8) = max(6, 8) = 8\`
   - \`j = 4\`：\`dp[4] = max(dp[4], dp[1] + 8) = max(10, 1 + 8) = 10\`
   此时 \`dp\` 数组：\`[0, 1, 5, 8, 10]\`

4. **当 \`i = 4\` 时（单价 \`p[4] = 9\`，加入长度 4 切割）**：
   - \`j = 4\`：\`dp[4] = max(dp[4], dp[0] + 9) = max(10, 9) = 10\`
   此时 \`dp\` 数组：\`[0, 1, 5, 8, 10]\`

- **最终结果**：\`dp[4] = 10\`。最优方案是切成两段长度为 2 的蛋糕，总售价 \`5 + 5 = 10\`，与输出完全一致。

#### 样例 2 简析
- **输入**：\`n = 10\`，\`p = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30]\`。
- 经过完全背包的逐层推导，由于长度为 10 的单段直接售价为 30，大于其它任何组合（例如两段长度 5 售价 \`10 + 10 = 20\`，一段长度 6 加一段长度 4 售价 \`17 + 9 = 26\` 等），最终 \`dp[10]\` 得到最大值 \`30\`。

---

### 易错提醒
- **内层循环方向**：0-1 背包每个物品只能选一次，内层循环必须逆序（\`j\` 从 \`n\` 降到 \`i\`）；而本题每种长度可以重复切割，属于完全背包，内层循环必须**正序**（\`j\` 从 \`i\` 递增到 \`n\`）。若写成逆序，会导致每种长度最多只能被切出一次。
- **下标起始点**：蛋糕长度和价格均从 1 开始对应，循环时应保证 \`i\` 和 \`j\` 的范围都是 \`1\` 到 \`n\`，内层 \`j\` 从 \`i\` 开始以防 \`j - i < 0\` 发生数组越界。`,
      template: '#include <iostream>\nusing namespace std;\n\nint dp[1010], p[1010];\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; ++i)\n        cin >> p[i];\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\nint dp[1010], p[1010];\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; ++i)\n        cin >> p[i];\n    for (int i = 1; i <= n; ++i) {\n        for (int j = i; j <= n; ++j) {\n            dp[j] = max(dp[j], dp[j - i] + p[i]);\n        }\n    }\n    cout << dp[n] << endl;\n    return 0;\n}',
      tags: ['动态规划', '背包'],
    },
    {
      id: 27,
      type: 'programming',
      title: '满二叉树',
      score: 25,
      description: `给定一棵包含 n 个结点的有根二叉树，结点依次以 1, 2, …, n 编号，根结点编号为 1。

对于结点 u，其左儿子的编号记为 l_u，右儿子编号记为 r_u。特别地，如果左儿子不存在则 l_u = 0，如果右儿子不存在则 r_u = 0。

树中每个结点都对应一棵以其为根的子树。请你求出给定有根树的所有 n 棵子树中，有多少棵子树是满二叉树。

满二叉树是指所有叶子深度均相同，且除叶子外均有两个儿子的二叉树。

## 数据范围

对于 40% 的测试点，保证 $1 \\leq n \\leq 500$。

对于所有测试点，保证 $1 \\leq n \\leq 10^5$。`,
      inputDescription: `第一行，一个正整数 n，表示有根二叉树结点数量。

接下来 n 行，每行两个非负整数 l_i, r_i，表示结点 i 的左儿子编号和右儿子编号，整数之间以空格分隔。`,
      outputDescription: `输出一行，一个整数，表示所有子树中满二叉树的数量。`,
      samples: [
        {
          input: `4
2 3
4 0
0 0
0 0`,
          output: `2`,
        },
        {
          input: `3
2 3
0 0
0 0`,
          output: `3`,
        },
      ],
      explanation: `**解析：**

树形 DP：后序遍历每个结点，自底向上统计。对结点 u 维护两个量：
- **h[u]**：以 u 为根的子树高度（叶子为 1，空结点为 0）；
- **chk[u]**：以 u 为根的子树是否为满二叉树。

转移：
$$h[u] = \\max(h[l_u], h[r_u]) + 1$$
$$chk[u] = chk[l_u] \\land chk[r_u] \\land (h[l_u] == h[r_u])$$

空结点（编号 0）视为高度 0、"是满二叉树"（chk[0] = 1），这样叶子结点自然满足 chk = true。答案 = 所有 chk[u] = true 的结点数。

**样例验证 1：** 结点 4 是满二叉树（单叶子）✓，结点 3 满 ✓，结点 2 只有左孩子（高度不齐）非满，结点 1 的子树因结点 2 非满 → 答案 2 ✓
**样例验证 2：** 结点 1 的两个孩子高度均为 1 且都是满二叉树，整树是满二叉树；加上两个叶子 → 答案 3 ✓

一次后序遍历，时间复杂度 O(n)（n ≤ 10⁵，注意递归深度，也可改用显式栈）。

**考点：** 二叉树、树形 DP、后序遍历
`,
      template: '#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint n;\nint l[100010], r[100010];\nint h[100010], chk[100010];\nlong long ans = 0;\n\nvoid dfs(int u) {\n    // 在此编写代码\n}\n\nint main() {\n    cin >> n;\n    for (int i = 1; i <= n; i++)\n        cin >> l[i] >> r[i];\n    chk[0] = 1;\n    dfs(1);\n    cout << ans << endl;\n    return 0;\n}',
      referenceCode: '#include <iostream>\n#include <algorithm>\nusing namespace std;\nint n;\nint l[100010], r[100010];\nint h[100010], chk[100010] = {1};\nint ans;\nvoid dfs(int u) {\n    if (!u)\n        return;\n    dfs(l[u]);\n    dfs(r[u]);\n    h[u] = max(h[l[u]], h[r[u]]) + 1;\n    chk[u] = chk[l[u]] && chk[r[u]] && (h[l[u]] == h[r[u]]);\n    ans += chk[u];\n}\nint main() {\n    cin >> n;\n    for (int i = 1; i <= n; i++)\n        cin >> l[i] >> r[i];\n    ans = 0;\n    dfs(1);\n    cout << ans << endl;\n    return 0;\n}',
      tags: ['二叉树', '递推与递归', '动态规划'],
    },
  ],
};
