// 2025年3月 GESP C++ 七级真题
export const paperData = {
    id: '2025-03-l7',
    title: '2025年3月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列哪个选项是 C++ 中的关键字？",
            options: [
                "function",
                "class",
                "method",
                "object",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面代码输出的是（）",
            options: [
                "1",
                "2",
                "5",
                "10",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "以下代码的输出是什么？",
            options: [
                "10",
                "20",
                "地址值 int main() { int a = 5, b = 2; cout << (a >> b) << endl; } 1 2 3 4 int main() { int a = 10; int *p = &a; int *&q = p; *q = 20; cout << a << endl; return 0; } 1 2 3 4 5 6 7 8",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面代码输出的是（）",
            options: [
                "1",
                "2",
                "3",
                "4",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于排序的说法，正确的是 ( ) 。",
            options: [
                "选择排序是最快的排序算法之一。",
                "归并排序通常是稳定的。",
                "最差情况， 个元素做快速排序的时间复杂度为 。",
                "最好情况， 个元素做插入排序的时间复杂度为 。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面关于 C++ 类构造和析构函数的说法，错误的是（ ）。",
            options: [
                "构造函数不能声明为虚函数。",
                "析构函数必须声明为虚函数。",
                "类的默认构造函数可以被声明为 private 。",
                "类的析构函数可以被声明为 private 。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列关于树和图的说法，错误的是（ ）。",
            options: [
                "树是一种有向无环图，但有向无环图不都是一棵树。",
                "如果把树看做有向图，每个节点指向其子节点，则该图是强连通图。",
                "个顶点且连通的无向图，其最小生成树一定包含 个条边。",
                "个顶点、 条边的有向图，一定不是强连通的。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "是个神奇的数字，因为它是由两个数 和 拼接而成，而且 。小杨决定写个程序找找 小于 的正整数中共有多少这样神奇的数字。下面程序横线处应填入的是（ ）。 int main() { int arr[5] = {1, 2, 3, 4, 5}; int *p = arr + 2; cout << *p << endl; return 0; } 1 2 3 4 5 6 #include <string> int count_miracle(int N) { int cnt = 0; for (int n = 1; n * n < N; n++) { int n2 = n * n; std::string s = std::to_string(n2); for (int i = 1; i < s.length(); i++) 1 2 3 4 5 6 7",
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
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "给定一个无向图，图的节点编号从 0 到 n-1 ，图的边以邻接表的形式给出。下面的程序使用深度优先搜索 （ DFS ）遍历该图，并输出遍历的节点顺序。横线处应该填入的是（） if (s[i] != '0') { std::string sl = s.substr(0, i); std::string sr = s.substr(i); int nl = std::stoi(sl); int nr = std::stoi(sr); if (_________) // 在此处填入选项 cnt++; } } return cnt; } 8 9 10 11 12 13 14 15 16 17 18 nl + nr == n1 nl + nr == n21 (nl + nr) * (nl + nr) == n1 (nl + nr) ^ 2 == n21 #include <iostream> #include <vector> #include <stack> using namespace std; void DFS(int start, vector<vector<int>>& graph, vector<bool>& visited) { stack<int> s; s.push(start); visited[start] = true; while (!s.empty()) { int node = s.top(); s.pop(); cout << node << \" \"; // 输出当前节点 // 遍历邻接节点 for (int neighbor : graph[node]) { if (!visited[neighbor]) { __________________ __________________ } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "给定一个整数数组 nums ，找到其中最长的严格上升子序列的长度。 子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。 下面的程序横线处应该填入的是（） } int main() { int n, m; cin >> n >> m; vector<vector<int>> graph(n); for (int i = 0; i < m; i++) { int u, v; cin >> u >> v; graph[u].push_back(v); graph[v].push_back(u); } vector<bool> visited(n, false); // 从节点 0 开始 DFS 遍历 DFS(0, graph, visited); return 0; } 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 visited[neighbor] = true; s.push(neighbor-1); 1 2 visited[neighbor] = true; s.push(neighbor+1); 1 2 visited[neighbor] = false; s.push(neighbor); 1 2 visited[neighbor] = true; s.push(neighbor); 1 2 #include <iostream> #include <vector> #include <algorithm> using namespace std; int lengthOfLIS(vector<int>& nums) { int n = nums.size(); 1 2 3 4 5 6 7",
            options: [
                "dp[i] = max(dp[i], dp[j]);",
                "dp[i] = max(dp[i+1], dp[j] + 1);",
                "dp[i] = max(dp[i], dp[j] - 1);",
                "dp[i] = max(dp[i], dp[j] + 1);",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "给定一个整数数组 nums ，找到其中最长的严格上升子序列的长度。 子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。 该程序的时间复杂度为（） if (n == 0) return 0; vector<int> dp(n, 1); for (int i = 1; i < n; i++) { for (int j = 0; j < i; j++) { if (nums[i] > nums[j]) { _________________________ } } } return *max_element(dp.begin(), dp.end()); } int main() { int n; cin >> n; vector<int> nums(n); for (int i = 0; i < n; i++) { cin >> nums[i]; } int result = lengthOfLIS(nums); cout << result << endl; return 0; } 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 #include <iostream> #include <vector> #include <algorithm> using namespace std; int lengthOfLIS(vector<int>& nums) { int n = nums.size(); if (n == 0) return 0; vector<int> dp(n, 1); for (int i = 1; i < n; i++) { for (int j = 0; j < i; j++) { if (nums[i] > nums[j]) { _________________________ } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
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
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "给定两个无向图 G1 和 G2 ，判断它们是否同构。图的同构是指两个图的节点可以通过某种重新编号的方式完全匹配，且边的连接关 系一致。 为了简化问题，假设图的节点编号从 0 到 n-1 ，并且图的边以邻接表的形式给出。下面程序中横线处应该给出的是 （） return *max_element(dp.begin(), dp.end()); } int main() { int n; cin >> n; vector<int> nums(n); for (int i = 0; i < n; i++) { cin >> nums[i]; } int result = lengthOfLIS(nums); cout << result << endl; return 0; } 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 #include <iostream> #include <vector> #include <map> #include <algorithm> using namespace std; string graphHash(vector<vector<int>>& graph) { vector<string> nodeHashes(graph.size()); for (int i = 0; i < graph.size(); i++) { vector<int> neighbors = graph[i]; sort(neighbors.begin(), neighbors.end()); string hash; for (int neighbor : neighbors) { —————————————————————————— } nodeHashes[i] = hash; } sort(nodeHashes.begin(), nodeHashes.end()); string finalHash; for (string h : nodeHashes) { finalHash += h + \";\"; } return finalHash; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25",
            options: [
                "hash += to_string(neighbor);",
                "hash += to_string(neighbors);",
                "hash += to_string(neighbor) + \",\";",
                "hash -= to_string(neighbors);",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "给定一个 m×n 的二维⽹格 grid ，每个格子中有一个非负整数。请找出一条从左上角 (0, 0) 到右下角 (m-1, n- 1) 的路径，使得路径上的数字总和最小。每次只能向右或向下移动。横线处应该填入的是（） int main() { int n; cin >> n; vector<vector<int>> G1(n); for (int i = 0; i < n; i++) { int k; while (cin >> k) { G1[i].push_back(k); if (cin.get() == '\n') break; } } vector<vector<int>> G2(n); for (int i = 0; i < n; i++) { int k; while (cin >> k) { G2[i].push_back(k); if (cin.get() == '\n') break; } } string hash1 = graphHash(G1); string hash2 = graphHash(G2); if (hash1 == hash2) { cout << \"YES\" << endl; } else { cout << \"NO\" << endl; } return 0; } 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 #include <iostream> #include <vector> #include <algorithm> using namespace std; int minPathSum(vector<vector<int>>& grid) { int m = grid.size(); int n = grid[0].size(); vector<vector<int>> dp(m, vector<int>(n, 0)); 1 2 3 4 5 6 7 8 9 10 11",
            options: [
                "dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][1];",
                "dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];",
                "dp[i][j] = min(dp[i - 1][j], dp[i][j]) + grid[i][j];",
                "dp[i][j] = min(dp[i][j], dp[i][j - 1]) + grid[i][j];",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大 和。下面横线处应该填入的是（） dp[0][0] = grid[0][0]; for (int j = 1; j < n; j++) { dp[0][j] = dp[0][j - 1] + grid[0][j]; } for (int i = 1; i < m; i++) { dp[i][0] = dp[i - 1][0] + grid[i][0]; } for (int i = 1; i < m; i++) { for (int j = 1; j < n; j++) { ———————————————————————————————— } } return dp[m - 1][n - 1]; } int main() { int m, n; cin >> m >> n; vector<vector<int>> grid(m, vector<int>(n)); for (int i = 0; i < m; i++) { for (int j = 0; j < n; j++) { cin >> grid[i][j]; } } int result = minPathSum(grid); cout << result << endl; return 0; } 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 #include <iostream> #include <vector> #include <algorithm> using namespace std; int maxSubArray(vector<int>& nums) { int n = nums.size(); if (n == 0) return 0; vector<int> dp(n, 0); dp[0] = nums[0]; int maxSum = dp[0]; for (int i = 1; i < n; i++) { _____________________________________ 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "dp[i] = max(nums[i+1], dp[i - 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i - 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i + 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i - 1] + nums[i+1]);",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在哈希表的实现中，冲突解决是一个重要的问题。以下哪种方法 不是 常见的哈希表冲突解决策略？",
            options: [
                "链地址法（ Chaining ）",
                "开放地址法（ Open Addressing ）",
                "二次哈希法（ Double Hashing ）",
                "二分查找法（ Binary Search ）",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在 C++ 语法中，表达式1e6、1000000和10^6的值是相同的。",
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
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 语⾔中，函数调用前必须有函数声明或定义。",
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
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "快速排序一般是不稳定的。",
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
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "long long类型能表达的数都能使用double类型精确表达。",
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
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用math.h或cmath头文件中的函数，表达式cos(60)的结果类型为double、值约为0.5。",
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
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "一颗 层的满二叉树，一定有 个结点。",
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
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "邻接表和邻接矩阵都是图的存储形式。为了操作时间复杂度考虑，同一个图可以同时维护两种存储形式。 maxSum = max(maxSum, dp[i]); } return maxSum; } int main() { int n; cin >> n; vector<int> nums(n); for (int i = 0; i < n; i++) { cin >> nums[i]; } int result = maxSubArray(nums); cout << result << endl; return 0; } 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35",
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
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "子类对象包含⽗类的所有成员（包括私有成员）。从⽗类继承的私有成员也是子类的成员，因此子类可以直 接访问。",
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
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "动态规划算法通常有递归实现和递推实现。但由于递归调用在运⾏时会由于层数过多导致程序崩溃，有些动 态规划算法只能用递推实现。",
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
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "按照下面的规则生成一棵二叉树：以一个⼈为根节点，其⽗亲为左子节点，母亲为右子节点。对其⽗亲、 母亲分别用同样规则生成左子树和右子树。以此类推，记录 30 代的直系家谱，则这是一棵满二叉树。",
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
                "GESP7级",
            ]
        }
    ]
};
