// 2025年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "数字移动",
        problemNumber: "2025-12-20-05-C-01",
        description: "小 A 有一个包含 N 个正整数的序列 A，序列 A 恰好包含 N/2 对不同的正整数。对于任意 i，存在唯一一个 j != i 使得 A_i = A_j。小 A 希望每对相同的数字在序列中相邻。每次操作他可以选择任意一个位置 i，将当前序列的第 i 个数字移动到任意位置，并花费对应数字的体力。请你计算一个最小的 x，使得他能够在每次花费的体力均不超过 x 的情况下令每对相同的数字在序列中相邻。",
        inputDescription: "第一行一个正整数 N，代表序列长度，保证 N 为偶数。第二行包含 N 个正整数 A_1,A_2,...,A_N，代表序列 A。数据保证小 A 至少需要执行一次操作。",
        outputDescription: "输出一行，代表满足要求的 x 的最小值。",
        samples: [
            { input: "6\n1 2 1 3 2 3", output: "2" }
        ],
        explanation: "二分答案 x。把所有大于 x 的数按原顺序保留下来：由于这些数无法被移动，所以若最终能两两相邻，它们在保留序列中必须恰好按相邻成对出现。检验该条件即可。",
        tags: ["编程题", "二分答案", "贪心"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint a[N];\nint b[N];\nint pos;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 0; i < n; i++) cin >> a[i];\n    int left = 1, right = 1e6, ans = 1e6;\n    while(left <= right){\n        int mid = (left + right) / 2;\n        bool possible = true;\n        pos = 0;\n        for(int i = 0; i < n; i++) {\n            if(a[i] > mid) b[pos++] = a[i];\n        }\n        for(int i = 0; i < pos; i += 2){\n            if(b[i] != b[i+1]) {\n                possible = false;\n                break;\n            }\n        }\n        if(possible){\n            ans = mid;\n            right = mid - 1;\n        } else {\n            left = mid + 1;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "相等序列",
        problemNumber: "2025-12-20-05-C-02",
        description: "小 A 有一个包含 N 个正整数的序列 A。每次可以花费 1 个金币执行以下任意一种操作：选择 A_i，将其乘以任意质数 P；或在 A_i 能被质数 P 整除时，将其除以 P。请你计算令序列中所有整数都相同，最少需要花费多少金币。",
        inputDescription: "第一行一个正整数 N。第二行包含 N 个正整数 A_1,A_2,...,A_N，代表序列 A。",
        outputDescription: "输出一行，代表最少需要花费的金币数量。",
        samples: [
            { input: "5\n10 6 35 105 42", output: "8" }
        ],
        explanation: "把每个数进行质因数分解。对每个质数单独考虑其指数序列，乘除一次相当于指数加减 1。要让总代价最小，目标指数应取该质数在所有数中的指数中位数；最后把各质数的代价累加即可。",
        tags: ["编程题", "数论", "质因数分解", "中位数"],
        template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint num[N][20];\nint n, a[N];\nvoid calc_prime_factor(int x){\n    for(int i = 2; i * i <= x; i++){\n        if(x % i == 0){\n            int cnt = 0;\n            while(x % i == 0){\n                x /= i;\n                cnt++;\n            }\n            num[i][cnt]++;\n        }\n    }\n    if(x > 1) num[x][1]++;\n}\nint main(){\n    scanf(\"%d\", &n);\n    for(int i = 1; i <= n; i++){\n        scanf(\"%d\", &a[i]);\n        calc_prime_factor(a[i]);\n    }\n    long long ans = 0;\n    for(int i = 2; i < 100001; i++){\n        int pos = 0;\n        for(int j = 0; j < 20; j++) pos += num[i][j];\n        num[i][0] = n - pos;\n        int median_exponent = 0;\n        pos = 0;\n        for(int j = 0; j < 20; j++){\n            pos += num[i][j];\n            if(pos * 2 >= n){\n                median_exponent = j;\n                break;\n            }\n        }\n        for(int j = 0; j < 20; j++) ans += 1ll * num[i][j] * abs(j - median_exponent);\n    }\n    printf(\"%lld\\n\", ans);\n}\n"
    }
];

export const paperData = {
    id: '2025-12-l5',
    title: '2025年12月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "对如下定义的循环单链表，横线处填写（ ）。",
            options: [
                "// 循环单链表的结点 struct Node { int data; // 数据域 Node* next; // 指针域 Node(int d) : data(d), next(nullptr) {} }; // 创建一个只有一个结点的循环单链表 Node* createList(int value) { Node* head = new Node(value); head->next = head; return head; } // 在循环单链表尾部插入新结点 void insertTail(Node* head, int value) { Node* p = head; while (p->next != head) { p = p->next; } Node* node = new Node(value); node->next = head; p->next = node; } // 遍历并输出循环单链表 void printList(Node* head) { if (head == nullptr) return; Node* p = head; _______________________ // 在此处填入代码 cout << endl; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 while (p != nullptr){ cout << p->data << \" \"; p = p->next; } 1 2 3 4 第 1 页 / 共 13 页",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "区块链技术是比特币的基础。在区块链中，每个区块指向前一个区块，构成链式列表，新区块只能接在链 尾，不允许在中间插入或删除。下面代码实现插入区块添加函数，则横线处填写（ ）。",
            options: [
                "while (p->next != nullptr){ cout << p->data << \" \"; p = p->next; } 1 2 3 4 do { cout << p->data << \" \"; p = p->next; } while (p != head); 1 2 3 4 for(; p; p=p->next){ cout << p->data << \" \"; } 1 2 3 // 区块（节点） struct Block { int index; // 区块编号（高度） string data; // 区块里保存的数据 Block* prev; // 指向前一个区块 Block(int idx, const string& d, Block* p) : index(idx), data(d), prev(p) {} }; // 区块链 struct Blockchain { Block* tail; // 初始化 void init() { tail = new Block(0, \"Genesis Block\", nullptr); } // 插入新区块 void addBlock(const string& data) { _______________________ // 在此处填入代码 } // 释放内存 void clear() { Block* cur = tail; while (cur != nullptr) { Block* p = cur->prev; delete cur; cur = p; } tail = nullptr; } }; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 Block* newBlock = new Block(tail->index + 1, data, tail); tail = newBlock->prev; 1 2 第 2 页 / 共 13 页",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面关于单链表和双链表的描述中，正确的是（ ）。",
            options: [
                "双链表删除指定节点是 ，单链表是",
                "双链表删除指定节点是 ，单链表是",
                "双链表删除指定节点是 ，单链表是",
                "双链表删除指定节点是 ，单链表是",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "假设我们有两个数 和 ，它们对模 同余，即 。以下哪个值不可能是 ？",
            options: [
                "3",
                "4",
                "6 Block* newBlock = new Block(tail->index + 1, data, tail); tail = newBlock; 1 2 Block* newBlock = new Block(tail->index + 1, data, tail->prev); tail = newBlock; 1 2 Block* newBlock = new Block(tail->index + 1, data, tail->prev); tail = newBlock->prev; 1 2 struct DNode { int data; DNode* prev; DNode* next; }; // 在双链表中删除指定节点 void deleteNode(DNode* node) { if (node->prev) { node->prev->next = node->next; } if (node->next) { node->next->prev = node->prev; } delete node; } struct SNode { int data; SNode* next; }; // 在单链表中删除指定节点 void deleteSNode(SNode* head, SNode* node) { SNode* prev = head; while (prev->next != node) { prev = prev->next; } prev->next = node->next; delete node; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 第 3 页 / 共 13 页",
                "9",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面代码实现了欧⼏⾥得算法。下面有关说法，错误的是（ ）。",
            options: [
                "gcd1() 实现为递归方式。",
                "gcd2() 实现为迭代方式。",
                "当 较大时，gcd1() 实现会多次调用⾃⾝，需要较多额外的辅助空间。",
                "当 较大时，gcd1() 的实现比 gcd2() 执⾏效率更高。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "唯一分解定理描述的内容是（ ）。",
            options: [
                "任何正整数都可以表⽰为两个素数的和。",
                "任何大于 1 的合数都可以唯一分解为有限个质数的乘积。",
                "两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。",
                "所有素数都是奇数。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下述代码实现素数表的线性筛法，筛选出所有小于等于 的素数，则横线上应填的代码是 ( ) 。",
            options: [
                "for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)",
                "for(int j = sqrt(n); j <= n && i * primes[j] <= n; j++)",
                "for (int j = 1; j <= sqrt(n); j++)",
                "for(int j = 1; j < n && i * primes[j] <= n; j++)",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下列关于排序的说法，正确的是 ( ) 。 int gcd1(int a, int b) { return b == 0 ? a : gcd1(b, a % b); } int gcd2(int a, int b) { while (b != 0) { int temp = b; b = a % b; a = temp; } return a; } 1 2 3 4 5 6 7 8 9 10 11 12 vector<int> linear_sieve(int n) { vector<bool> is_prime(n +1, true); vector<int> primes; is_prime[0] = is_prime[1] = 0; //0 和 1 两个数特殊处理 for (int i = 2; i <= n; ++i) { if (is_prime[i]) { primes.push_back(i); } ________________________________ { // 在此处填入代码 is_prime[ i * primes[j] ] = 0; if (i % primes[j] == 0) break; } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 第 4 页 / 共 13 页",
            options: [
                "快速排序是稳定排序",
                "归并排序通常是稳定的",
                "插入排序是不稳定排序",
                "冒泡排序不是原地排序",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面代码实现了归并排序。下述关于归并排序的说法中，不正确的是（ ）。",
            options: [
                "归并排序的平均复杂度是 。",
                "归并排序需要 的额外空间。",
                "归并排序在最坏情况的时间复杂度是 。",
                "归并排序适合大规模数据。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下述 C++ 代码实现了快速排序算法，最坏情况的时间复杂度是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "void merge(vector<int>& arr, vector<int>& temp, int l, int mid, int r) { int i = l, j = mid + 1, k = l; while (i <= mid && j <= r) { if (arr[i] <= arr[j]) temp[k++] = arr[i++]; else temp[k++] = arr[j++]; } while (i <= mid) temp[k++] = arr[i++]; while (j <= r) temp[k++] = arr[j++]; for (int p = l; p <= r; p++) arr[p] = temp[p]; } void mergeSort(vector<int>& arr, vector<int>& temp, int l, int r) { if (l >= r) return; int mid = l + (r - l) / 2; mergeSort(arr, temp, l, mid); mergeSort(arr, temp, mid + 1, r); merge(arr, temp, l, mid, r); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 int partition(vector<int>& arr, int low, int high) { int i = low, j = high; int pivot = arr[low]; // 以首元素为基准 while (i < j) { while (i < j && arr[j] >= pivot) j--; while (i < j && arr[i] <= pivot) i++; if (i < j) swap(arr[i], arr[j]); } swap(arr[i], arr[low]); return i; } void quickSort(vector<int>& arr, int low, int high) { if (low >= high) return; int p = partition(arr, low, high); quickSort(arr, low, p - 1); quickSort(arr, p + 1, high); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 第 5 页 / 共 13 页",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面代码尝试在有序数组中查找第一个大于等于 x 的元素位置。如果没有大于等于 x 的元素，返回 arr.size()。以下说法正确的是（ ）。",
            options: [
                "上述代码逻辑正确",
                "上述代码逻辑错误，while 循环条件应该用 l <= r",
                "上述代码逻辑错误，mid 计算错误",
                "上述代码逻辑错误，边界条件不对",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "小杨要把一根长度为 L 的⽊头切成 K 段，使得每段长度小于等于 x。已知每切一⼑只能把一段⽊头分成 两段，他用二分法找到满⾜条件的最小 x（x 为正整数），则横线处应填写（ ）。",
            options: [
                "选项A",
                "int lower_bound(vector<int>& arr, int x) { int l = 0, r = arr.size(); while(l < r) { int mid = l + (r - l) / 2; if(arr[mid] >= x) r = mid; else l = mid + 1; } return l; } 1 2 3 4 5 6 7 8 9 // 判断：在不超过 K 次切割内，是否能让每段长度 <= x bool check(int L, int K, int x) { int cuts = (L - 1) / x; return cuts <= K; } // 二分查找最小可行的 x int binary_cut(int L, int K) { int l = 1, r = L; while (l < r) { int mid = l + (r - l) / 2; ________________________________ // 在此处填入代码 } return l; } int main() { int L = 10; // 木头长度 int K = 2; // 最多切 K 刀 cout << binary_cut(L, K) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 if (check(L, K, mid)) r = mid; else l = mid + 1; 1 2 3 4 if (check(L, K, mid)) r = mid+1; else l = mid + 1; 1 2 3 4 第 6 页 / 共 13 页",
                "选项C",
                "选项D",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面给出了阶乘计算的两种方式。以下说法正确的是（ ）。",
            options: [
                "上面两种实现方式的时间复杂度相同，都为",
                "上面两种实现方式的空间复杂度相同，都为",
                "上面两种实现方式的空间复杂度相同，都为",
                "函数 factorial1() 的时间复杂度为 ，函数 factorial2() 的时间复杂度为",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "给定有 个任务，每个任务有截⽌时间和利润，每个任务耗时 1 个时间单位、必须在截⽌时间前完成，且每 个时间槽最多做 1 个任务。为了在规定时间内获得最大利润，可以采用贪⼼策略，即按利润从高到低排序，尽量安 排，则横线处应填写（ ）。 if (check(L, K, mid)) r = mid + 1; else l = mid - 1; 1 2 3 4 if (check(L, K, mid)) r = mid + 1; else l = mid; 1 2 3 4 int factorial1(int n) { if (n <= 1) return 1; return n * factorial1(n - 1); } int factorial2(int n) { int acc = 1; while (n > 1) { acc = n * acc; n = n - 1; } return acc; } 1 2 3 4 5 6 7 8 9 10 11 12 13 第 7 页 / 共 13 页",
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
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面代码实现了对两个数组表⽰的正整数的高精度加法（数组低位在前），则横线上应填写（ ）。 struct Task { int deadline; // 截止时间 int profit; // 利润 }; void sortByProfit(vector<Task>& tasks) { sort(tasks.begin(), tasks.end(), [](const Task& a, const Task& b) { return a.profit > b.profit; }); } int maxProfit(vector<Task>& tasks) { sortByProfit(tasks); int maxTime = 0; for (auto& t : tasks) { maxTime = max(maxTime, t.deadline); } vector<bool> slot(maxTime + 1, false); int totalProfit = 0; for (auto& task : tasks) { for (int t = task.deadline; t >= 1; t--) { if (!slot[t]) { _______________________ // 在此处填入代码 break; } } } return totalProfit; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 slot[t] = true; totalProfit += task.profit; 1 2 slot[t] = false; totalProfit += task.profit; 1 2 slot[t] = true; totalProfit = task.profit; 1 2 slot[t] = false; totalProfit = task.profit; 1 2 3 第 8 页 / 共 13 页 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "数组和链表都是线性表。链表的优点是插入删除不需要移动元素，并且能随机查找。",
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
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "假设函数 gcd() 函数能正确求两个正整数的最大公约数，则下面的 lcm(a ， b) 函数能正确找到两个正整 数 a 和 b 的最小公倍数。",
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
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在单链表中，已知指针 p 指向要删除的结点（非尾结点），想在 删除 p，可⾏做法是用 p->next 覆盖 p 的值与 next，然后删除 p->next。",
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
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在求解所有不大于 n 的素数时，线性筛法（欧拉筛）都应当优先于埃⽒筛法使用，因为线性筛法的时间复 杂度为 ，低于埃⽒筛法的 。",
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
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "二分查找仅适用于有序数据。若输入数据无序，当仅进⾏一次查找时，为了使用二分而排序通常不划算。",
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
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "通过在数组的第一个、最中间和最后一个这 3 个数据中选择中间值作为枢轴（比较基准），快速排序算法可 降低落入最坏情况的概率。 vector<int> add(vector<int> a, vector<int> b) { vector<int> c; int carry = 0; for (int i = 0; i < a.size() || i < b.size(); i++) { if (i < a.size()) carry += a[i]; if (i < b.size()) carry += b[i]; _______________________ // 在此处填入代码 } if (carry) c.push_back(carry); return c; } 1 2 3 4 5 6 7 8 9 10 11 12 13 c.push_back(carry / 10); carry %= 10; 1 2 c.push_back(carry % 10); carry /= 10; 1 2 c.push_back(carry % 10);1 c.push_back(carry); carry /= 10; 1 2 int lcm(int a, int b) { return a / gcd(a, b) * b; } 1 2 3 第 9 页 / 共 13 页",
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
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "贪⼼算法在每一步都做出当前看来最优的局部选择，并且一旦做出选择就不再回溯；而分治算法将问题分解 为若⼲子问题分别求解，再将子问题的解合并得到原问题的解。",
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
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "以下 fib 函数计算第 n 项斐波那契数（fib(0)=0, fib(1)=1），其时间复杂度为 。",
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
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "递归函数一定要有终⽌条件，否则可能会造成栈溢出。",
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
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "使用贪⼼算法解决问题时，通过对每一步求局部最优解，最终一定能找到全局最优解。",
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
                "GESP5级",
            ]
        }
    ]
};
