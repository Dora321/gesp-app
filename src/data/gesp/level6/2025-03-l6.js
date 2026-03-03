// 2025年3月 GESP C++ 六级真题
export const paperData = {
    id: '2025-03-l6',
    title: '2025年3月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在面向对象编程中，类是一种重要的概念。下面关于类的描述中，不正确的是（ ）。",
            options: [
                "类是一个抽象的概念，用于描述具有相同属性和⾏为的对象集合。",
                "类可以包含属性和方法，属性用于描述对象的状态，方法用于描述对象的⾏为。",
                "类可以被实例化，生成具体的对象。",
                "类一旦定义后，其属性和方法不能被修改或扩展。",
            ],
            answer: 3,
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
            question: "哈夫曼编码是一种数据压缩算法。以下关于哈夫曼编码的描述中，不正确的是（ ）。",
            options: [
                "哈夫曼编码是一种变长编码，频率高的字符使用较短的编码，频率低的字符使用较长的编码。",
                "在构造哈夫曼树时，频率越低的字符离根节点越近，频率越高的字符离根节点越远。",
                "哈夫曼编码的生成过程基于贪⼼算法，每次选择频率最低的两个节点进⾏合并。",
                "哈夫曼编码是一种前缀编码，任何一个字符的编码都不会是另一个字符编码的前缀，因此可以实现唯一解 码。",
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
            id: 3,
            type: "single",
            question: "以下代码实现了树的哪种遍历方式？",
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层次遍历",
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
            id: 4,
            type: "single",
            question: "以下关于完全二叉树的代码描述，正确的是（ ）。 void traverse(TreeNode* root) { if (root == nullptr) return; cout << root->val << \" \"; traverse(root->left); traverse(root->right); } 1 2 3 4 5 6 bool isCompleteTree(TreeNode* root) {1",
            options: [
                "该代码用于判断一棵树是否为满二叉树",
                "该代码用于判断一棵树是否为完全二叉树",
                "该代码用于判断一棵树是否为二叉搜索树",
                "该代码用于计算树的高度",
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
            id: 5,
            type: "single",
            question: "以下代码实现了二叉排序树的哪种操作？",
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
            id: 6,
            type: "single",
            question: "给定字符集 {A, B, C, D} 的出现频率分别为 {5, 1, 6, 2}，则正确的哈夫曼编码是（ ）。",
            options: [
                "A: 0, B: 100, C: 11, D: 101",
                "A: 11, B: 100, C: 0, D: 101",
                "A: 0, B: 101, C: 11, D: 100",
                "A: 10, B: 101, C: 0, D: 100",
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
            question: "关于动态规划的描述，正确的是（ ）。 if (root == nullptr) return true; queue<TreeNode*> q; q.push(root); bool hasNull = false; while (!q.empty()) { TreeNode* node = q.front(); q.pop(); if (node == nullptr) { hasNull = true; } else { if (hasNull) return false; q.push(node->left); q.push(node->right); } } return true; } 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 TreeNode* op(TreeNode* root, int val) { if (root == nullptr) return new TreeNode(val); if (val < root->val) { root->left = op(root->left, val); } else { root->right = op(root->right, val); } return root; } 1 2 3 4 5 6 7 8 9",
            options: [
                "动态规划算法的时间复杂度总是低于贪⼼算法。",
                "动态规划要求问题必须具有最优子结构和重叠子问题两个性质。",
                "动态规划通过递归实现时不需要存储中间结果。",
                "动态规划的核⼼思想是将问题分解为互不重叠的子问题。",
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
            id: 8,
            type: "single",
            question: "以下代码中，类的构造函数被调用了（ ）次。",
            options: [
                "1",
                "2",
                "3",
                "0",
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
            question: "以下代码实现了循环队列的哪种操作？",
            options: [
                "入队",
                "出队",
                "查看队⾸元素",
                "判断队列是否为空 class MyClass { public: MyClass() { cout << \"Constructor called!\" << endl; } }; int main() { MyClass obj1; MyClass obj2 = obj1; return 0; } 1 2 3 4 5 6 7 8 9 10 11 class CircularQueue { int* arr; int front, rear, size; public: CircularQueue(int k) { size = k; arr = new int[k]; front = rear = -1; } bool enQueue(int value) { if (isFull()) return false; if (isEmpty()) front = 0; rear = (rear + 1) % size; arr[rear] = value; return true; } }; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
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
            id: 10,
            type: "single",
            question: "以下代码实现了二叉树的深度优先搜索（ DFS ），并统计叶子结点的数量，则横线上应填写（ ）。",
            options: [
                "if (node->left) s.push(node->left);",
                "if (node->left) s.pop(node->left);",
                "if (node->left) s.front(node->left);",
                "if (node->left) s.push(node->right);",
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
            id: 11,
            type: "single",
            question: "以下代码实现了二叉树的⼴度优先搜索（ BFS ），并查找特定值的节点，则横线上应填写（ ）。",
            options: [
                "选项A",
                "int countLeafNodes(TreeNode* root) { if (root == nullptr) return 0; stack<TreeNode*> s; s.push(root); int count = 0; while (!s.empty()) { TreeNode* node = s.top(); s.pop(); if (node->left == nullptr && node->right == nullptr) { count++; } if (node->right) s.push(node->right); ———————————————————————— // 在此处填入代码 } return count; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 TreeNode* findNode(TreeNode* root, int target) { if (root == nullptr) return nullptr; queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* current = q.front(); q.pop(); if (current->val == target) { return current; // 找到目标节点 } ———————————————————————— // 在此处填入代码 } return nullptr; // 未找到目标节点 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 if (current->left) q.push(current->left); if (current->right) q.push(current->right); 1 2",
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
            id: 12,
            type: "single",
            question: "以下代码用于生成 位格雷编码。横线上应填写（ ）。",
            options: [
                "result.push_back(\"1\" + prev[i]);",
                "result.push_back(\"0\" + prev[i]);",
                "result.push_back(prev[i] + \"1\");",
                "result.push_back(prev[i] + \"0\");",
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
            id: 13,
            type: "single",
            question: "以下代码实现了 0/1 背包问题的动态规划解法。假设物品重量为weights[]，价值为values[]，背包容 量为W，横线上应填写（ ）。 if (current->left) q.pop(current->left); if (current->right) q.pop(current->right); 1 2 if (current->left) q.front(current->left); if (current->right) q.front(current->right); 1 2 if (current->left) q.push(current->right); if (current->right) q.push(current->left); 1 2 vector<string> generateGrayCode(int n) { if (n == 0) return {\"0\"}; if (n == 1) return {\"0\", \"1\"}; vector<string> prev = generateGrayCode(n - 1); vector<string> result; for (string s : prev) { result.push_back(\"0\" + s); // 在前缀添加 0 } for (int i = prev.size() - 1; i >= 0; i--) { ———————————————————————— // 在此处填入代码 } return result; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 int knapsack(int W, vector<int>& weights, vector<int>& values) { int n = weights.size(); vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0)); for (int i = 1; i <= n; i++) { for (int j = 1; j <= W; j++) { if (weights[i-1] > j) { dp[i][j] = dp[i-1][j]; // 当前物品装不下 } else { dp[i][j] = max(_________________________); // 在此处填入代码 } } } 1 2 3 4 5 6 7 8 9 10 11 12 13",
            options: [
                "dp[i-1][j], values[i-1]",
                "dp[i-1][j], dp[i-1][j - weights[i-1]] + values[i-1]",
                "dp[i][j-1], values[i-1]",
                "dp[i-1][j - weights[i-1]] + values[i-1], dp[i][j-1]",
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
            question: "以下代码用于检查字符串中的括号是否匹配，横线上应填写（ ）。",
            options: [
                "true",
                "false",
                "st.empty()",
                "!st.empty()",
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
            id: 15,
            type: "single",
            question: "关于下面代码，说法错误的是（ ）。 return dp[n][W]; } 14 15 bool isBalanced(string s) { stack<char> st; for (char c : s) { if (c == '(' || c == '[' || c == '{') { st.push(c); } else { if (st.empty()) return false; // 无左括号匹配 char top = st.top(); st.pop(); if ((c == ')' && top != '(') || (c == ']' && top != '[') || (c == '}' && top != '{')) { return false; } } } return ________________; // 在此处填入代码 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 class Shape { protected: string name; public: Shape(const string& n) : name(n) {} virtual double area() const { return 0.0; } }; class Circle : public Shape { private: double radius; // 半径 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "语句Shape* shapePtr = &circle;和shapePtr = &rectangle;出现编译错误",
                "Shape为基类， Circle 和 Rectangle是派生类",
                "通过继承，Circle 和 Rectangle 复用了 Shape 的属性和方法，并扩展了新的功能",
                "Circle 和 Rectangle通过重写（ override ）基类的虚函数area和基类指针，实现了运⾏时多态",
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
            id: 16,
            type: "judge",
            question: "哈夫曼树在构造过程中，每次合并权值最小的两个节点，最终生成的树带权路径长度最小。",
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
            question: "格雷编码的相邻两个编码之间必须有多位不同，以避免数据传输错误。",
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
            id: 18,
            type: "judge",
            question: "在树的深度优先搜索（ DFS ）中，使用队列作为辅助数据结构以实现 “ 先进后出 ” 的访问顺序。",
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
            question: "以下代码实现的是二叉树的中序遍历： public: Circle(const string& n, double r) : Shape(n), radius(r) {} double area() const override { return 3.14159 * radius * radius; } }; class Rectangle : public Shape { private: double width; // 宽度 double height; // 高度 public: Rectangle(const string& n, double w, double h) : Shape(n), width(w), height(h) {} double area() const override { return width * height; } }; int main() { Circle circle(\"MyCircle\", 5.0); Rectangle rectangle(\"MyRectangle\", 4.0, 6.0); Shape* shapePtr = &circle; cout << \"Area: \" << shapePtr->area() << endl; shapePtr = &rectangle; cout << \"Area: \" << shapePtr->area() << endl; return 0; } 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49",
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
            question: "C++ 支持构造函数重载，但默认无参数的构造函数只能有一个。",
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
            question: "二叉排序树（ BST ）中，若某节点的左子树为空，则该节点一定是树中的最小值节点。",
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
            question: "在动态规划解决一维硬币找零问题时，若硬币面额为 [1, 3, 4]，目标⾦额为 6，则最少需要 2 枚硬币 （ 3+3 ）。",
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
            question: "面向对象编程中，封装是指将数据和⾏为绑定在一起，并对外隐藏实现细节。",
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
            id: 24,
            type: "judge",
            question: "以下代码创建的树是一棵完全二叉树：",
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
            question: "栈和队列均可以用双向链表实现，插入和删除操作的时间复杂度为 O(1) 。",
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
