// 2025年12月 GESP C++ 六级真题
export const paperData = {
    id: '2025-12-l6',
    title: '2025年12月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在面向对象编程中，下列关于 虚函数 的描述中，错误的是（ ）。",
            options: [
                "虚函数用于支持运⾏时多态",
                "通过基类指针调用虚函数时，会根据对象实际类型决定调用版本",
                "构造函数可以声明为虚函数以支持多态",
                "基类析构函数常声明为虚函数以避免资源泄漏",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "执⾏如下代码，会输出 钢琴：叮咚叮咚 和 吉他：咚咚当当。这体现了面向对象编程的（ ）特性。 第 1 页 / 共 13 页",
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "关于以下代码，说法正确的是（ ）。 class Instrument { public: virtual void play() { cout << \" 乐器在演奏声音 \" << endl; } virtual ~Instrument() {} }; class Piano : public Instrument { public: void play() override { cout << \" 钢琴：叮咚叮咚 \" << endl; } }; class Guitar : public Instrument { public: void play() override { cout << \" 吉他：咚咚当当 \" << endl; } }; int main() { Instrument* instruments[2]; instruments[0] = new Piano(); instruments[1] = new Guitar(); for (int i = 0; i < 2; ++i) { instruments[i]->play(); } for (int i = 0; i < 3; ++i) { delete instruments[i]; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 第 2 页 / 共 13 页",
            options: [
                "执⾏代码会输出两⾏，内容分别为：钢琴：叮咚叮咚 和 吉他：咚咚当当",
                "执⾏代码会输出两⾏，内容分别为：乐器在演奏声音 和 乐器在演奏声音",
                "代码编译出现错误",
                "代码运⾏出现错误",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "某文本编辑器把用户输入的字符依次压入栈 S 。用户依次输入 A, B, C, D 后，用户按了两次撤销（每次 撤销，弹出栈顶一个字符）。此时栈从栈底到栈顶的内容是：（ ）。",
            options: [
                "A B",
                "A B C",
                "A B D",
                "B C",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "假设循环队列数组长度为 N，其中队空判断条件为：front == rear，队满判断条件为：(rear + 1) % N == front，出队对应的操作为：front = (front + 1) % N，入队对于的操作为：rear = (rear + 1) % N。循环队列长度 N = 6，初始 front = 1, rear = 1，执⾏操作序列为：入队 , 入队 , 入队 , 出队 , 入队 , 入队， 则最终 (front, rear) 的值是（ ）。",
            options: [
                "(2, 5) class Instrument { public: void play() { cout << \" 乐器在演奏声音 \" << endl; } virtual ~Instrument() {} }; class Piano : public Instrument { public: void play() override { cout << \" 钢琴：叮咚叮咚 \" << endl; } }; class Guitar : public Instrument { public: void play() override { cout << \" 吉他：咚咚当当 \" << endl; } }; int main() { Instrument* instruments[2]; instruments[0] = new Piano(); instruments[1] = new Guitar(); for (int i = 0; i < 2; ++i) { instruments[i]->play(); } for (int i = 0; i < 3; ++i) { delete instruments[i]; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 第 3 页 / 共 13 页",
                "(2, 0)",
                "(3, 5)",
                "(3, 0)",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "以下函数 check() 用于判断一棵二叉树是否为（ ）。",
            options: [
                "满二叉树",
                "完全二叉树",
                "二叉搜索树",
                "平衡二叉树",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下代码实现了二叉树的（ ）。",
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层序遍历",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面代码实现了哈夫曼编码，则横线处应填写的代码是（ ）。 bool check(TreeNode* root) { if (!root) return true; queue<TreeNode*> q; q.push(root); bool hasNull = false; while (!q.empty()) { TreeNode* cur = q.front(); q.pop(); if (!cur) { hasNull = true; } else { if (hasNull) return false; q.push(cur->left); q.push(cur->right); } } return true; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 void traverse(TreeNode* root) { if (!root) return; traverse(root->left); traverse(root->right); cout << root->val << \" \"; } 1 2 3 4 5 6 第 4 页 / 共 13 页 struct Symbol { char ch; // 字符 long long freq; // 频率 string code; // 哈夫曼编码 }; struct Node { long long w; // 权值 int l, r; // 左右孩子（节点下标）， -1 表示空 int sym; // 叶子对应符号下标；内部节点为 -1 Node(long long _w=0, int _l=-1, int _r=-1, int _sym=-1) : w(_w), l(_l), r(_r), sym(_sym) {} }; // 从 A(leafIdx) 和 B(internalIdx) 的队首取最小的一个节点下标 static int PopMinNode(const vector<Node>& nodes, const vector<int>& leafIdx, int n, int& pA, const vector<int>& internalIdx, int& pB) { if (pA < n && (pB >= (int)internalIdx.size() || nodes[leafIdx[pA]].w <= nodes[internalIdx[pB]].w)) { return leafIdx[pA++]; } else { return internalIdx[pB++]; } } // DFS 生成编码（左 0 ，右 1 ） static void DFSBuildCodes(int u, const vector<Node>& nodes, Symbol sym[], string& path) { if (u == -1) return; if (nodes[u].sym != -1) { // 叶子 sym[nodes[u].sym].code = path; return; } path.push_back('0'); DFSBuildCodes(nodes[u].l, nodes, sym, path); path.pop_back(); path.push_back('1'); DFSBuildCodes(nodes[u].r, nodes, sym, path); path.pop_back(); } int BuildHuffmanCodes(Symbol sym[], int n) { for (int i = 0; i < n; i++) sym[i].code.clear(); if (n <= 0) return -1; // 只有一个字符：约定编码为 \"0\" if (n == 1) { sym[0].code = \"0\"; return 0; } vector<Node> nodes; nodes.reserve(2 * n); // 1) 建立叶子节点 vector<int> leafIdx(n); for (int i = 0; i < n; i++) { leafIdx[i] = (int)nodes.size(); nodes.push_back(Node(sym[i].freq, -1, -1, i)); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 第 5 页 / 共 13 页",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下关于哈夫曼编码的说法，正确的是（ ）。",
            options: [
                "哈夫曼编码是定长编码",
                "哈夫曼编码中，没有任何一个字符的编码是另一个字符编码的前缀",
                "哈夫曼编码一定唯一",
                "哈夫曼编码不能用于数据压缩",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "以下函数实现了二叉排序树（ BST ）的（ ）操作。 // 2) 叶子按权值排序（ A 队列） sort(leafIdx.begin(), leafIdx.end(), [&](int a, int b) { if (nodes[a].w != nodes[b].w) return nodes[a].w < nodes[b].w; return nodes[a].sym < nodes[b].sym; // 稳定一下 }); // B 队列（内部节点下标队列） vector<int> internalIdx; internalIdx.reserve(n); int pA = 0, pB = 0; // 3) 合并 n-1 次 for (int k = 1; k < n; k++) { int x = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); int y = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); int z = (int)nodes.size(); ________________________ // 在此处填写代码 } int root = internalIdx.back(); // 4) DFS 生成编码 string path; DFSBuildCodes(root, nodes, sym, path); return root; } 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 nodes.push_back(Node(nodes[x].w + nodes[y].w, x, y, -1)); internalIdx.push_back(z); 1 2 nodes.push_back(Node(nodes[x].w + nodes[y].w, x, y, -1)); leafIdx.push_back(z); 1 2 internalIdx.push_back(z); nodes.push_back(Node(nodes[x].w + nodes[y].w, x, y, x+y)); 1 2 nodes.push_back(Node(nodes[x].w + nodes[y].w, x, y, x+y)); leafIdx.push_back(z); 1 2 第 6 页 / 共 13 页",
            options: [
                "查找",
                "插入",
                "删除",
                "遍历",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下列代码实现了树的深度优先遍历，则横线处应填入（ ）。",
            options: [
                "if (node->left) st.push(node->left);",
                "if (node->left) st.pop(node->left);",
                "if (node->left) st.front(node->left);",
                "if (node->left) st.push(node->right);",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "给定一棵普通二叉树（节点值没有大小规律），下面代码判断是否存在值为 x 的结点，则横线处应填入（ ）。 TreeNode* op(TreeNode* root, int x) { if (!root) return new TreeNode(x); if (x < root->val) root->left = op(root->left, x); else root->right = op(root->right, x); return root; } 1 2 3 4 5 6 7 8 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void dfs(TreeNode* root) { if (!root) return; stack<TreeNode*> st; st.push(root); while (!st.empty()) { TreeNode* node = st.top(); st.pop(); cout << node->val << \" \"; if (node->right) st.push(node->right); ________________________ } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 第 7 页 / 共 13 页",
            options: [
                "q.push(cur);",
                "if (cur->right) q.push(cur->right);",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在二叉排序树（ Binary Search Tree, BST ）中，假设节点值互不相同。给定如下搜索函数，以下说法一定正 确的是（ ）。",
            options: [
                "最坏情况下，访问结点数是",
                "最坏情况下，访问结点数是",
                "无论如何，访问结点数都不超过树高的一半",
                "一定比在普通二叉树中搜索快",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "0/1 背包（每件物品最多选一次）问题通常可用一维动态规划求解，核⼼代码如下。则下面说法正确的是（ ）。 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; TreeNode* bfsFind(TreeNode* root, int x) { if (!root) return nullptr; queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* cur = q.front(); q.pop(); if (cur->val == x) return cur; ________________________ } return nullptr; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 if (cur->left) q.push(cur->left); if (cur->right) q.push(cur->right); 1 2 3 4 q.push(cur->left); q.push(cur->right); 1 2 bool find(Node* root, int x) { while (root) { if (root->val == x) return true; root = (x < root->val) ? root->left : root->right; } return false; } 1 2 3 4 5 6 7 for each item (w, v): for (int j = W; j >= w; --j) dp[j] = max(dp[j], dp[j-w] + v); 1 2 3 第 8 页 / 共 13 页 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "内层 j 必须从小到大，否则会漏解",
                "内层 j 必须从大到小，否则同一件物品会被用多次",
                "j 从大到小或从小到大都一样",
                "只要 dp 初始为 0，方向无所谓",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "以下关于动态规划的说法中，错误的是（ ）。",
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "以下代码中，构造函数被调用的次数是 1 次。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "面向对象编程中，封装是指将数据和操作数据的方法绑定在一起，并对外隐藏实现细节。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "以下代码能够正确统计二叉树中叶子结点的数量。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "⼴度优先遍历二叉树可用栈来实现。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "函数调用管理可用栈来管理。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在二叉排序树（ BST ）中，若某结点的左子树为空，则该结点一定是整棵树中的最小值结点。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面的函数能正确判断一棵树是不是二叉排序树（左边的数字要比当前数字小，右边的数字要比当前数字 大）。 class Test { public: Test() { cout << \"T \"; } }; int main() { Test a; Test b = a; } 1 2 3 4 5 6 7 8 9 int countLeaf(TreeNode* root) { if (!root) return 0; if (!root->left && !root->right) return 1; return countLeaf(root->left) + countLeaf(root->right); } 1 2 3 4 5 bool isBST(TreeNode* root, int minVal, int maxVal) { if (!root) return true; if (root->val <= minVal || root->val >= maxVal) return false; return isBST(root->left, minVal, root->val) && isBST(root->right, root->val, maxVal); } 1 2 3 4 5 6 7 第 9 页 / 共 13 页",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "格雷编码相邻两个编码之间必须有多位不同，以避免数据传输错误。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨在玩一个闯关游戏，从第 1 关走到第 4 关。每一关的体力消耗如下（下标表⽰关卡编号）：cost = [ 0, 3, 5, 2, 4 ]，其中 cost[i] 表⽰到达第 i 关需要消耗的体力，cost[0]=0 表⽰在开始状态，体力消耗为 0 。小杨每次可以从当前关卡 前进 1 步或 2 步。按照上述规则，从第 1 关到第 4 关所需消耗的最小体力为 7 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "假定只有一个根节点的树的深度为 1 ，则一棵有 个节点的完全二叉树，则树的深度为 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        }
    ]
};
