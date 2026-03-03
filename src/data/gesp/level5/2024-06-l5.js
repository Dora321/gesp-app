// 2024年6月 GESP C++ 五级真题
export const paperData = {
    id: '2024-06-l5',
    title: '2024年6月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面 C++ 代码用于求斐波那契数列，该数列第 1 、 2 项为 1 ，以后各项均是前两项之和。函数 fibo() 属于 ( ) 。",
            options: [
                "枚举算法",
                "贪⼼算法",
                "迭代算法",
                "递归算法",
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
            question: "下面 C++ 代码用于将输入⾦额换成最少币种组合方案，其实现算法是 ( ) 。 int fibo(int n) { if (n <= 0) return 0; if (n == 1 || n == 2) return 1; int a = 1， b = 1, next; for (int i = 3; i <= n; i++) { next = a + b; a = b; b = next; } return next; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 #include <iostream> using namespace std; #define N_COINS 7 int coins[N_COINS] = {100, 50, 20, 10, 5, 2, 1}; // 货币面值，单位相同 int coins_used[N_COINS]; void find_coins(int money) { for (int i = 0; i < N_COINS; i++) { coins_used[i] = money / coins[i]; money = money % coins[i]; } return; 1 2 3 4 5 6 7 8 9 10 11 12 13",
            options: [
                "枚举算法",
                "贪⼼算法",
                "迭代算法",
                "递归算法",
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
            question: "小杨采用如下双链表结构保存他喜欢的歌曲列表： 小杨想在头指针为head的双链表中查找他喜欢的某⾸歌曲，采用如下查询函数，该操作的时间复杂度为（ ）。",
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
            id: 4,
            type: "single",
            question: "小杨想在如上题所述的双向链表中加入一⾸新歌曲。为了能快速找到该歌曲，他将其作为链表的第一⾸歌 曲，则下面横线上应填入的代码为（ ）。 } int main() { int money; cin >> money; // 输入要换算的金额 find_coins(money); for (int i = 0; i < N_COINS; i++) cout << coins_used[i] << endl; return 0; } 14 15 16 17 18 19 20 21 22 23 24 struct dl_node { string song; dl_node* next; dl_node* prev; }; 1 2 3 4 5 dl_node* search(dl_node* head, string my_song) { dl_node* temp = head; while (temp != nullptr) { if (temp->song == my_song) return temp; temp = temp->next; } return nullptr; } 1 2 3 4 5 6 7 8 9",
            options: [
                "head->next->prev = p;",
                "head->next = p;",
                "head->prev = p;",
                "触发异常，不能对空指针进⾏操作。",
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
            id: 5,
            type: "single",
            question: "下面是根据欧⼏⾥得算法编写的函数，它计算的是 与的（ ）。",
            options: [
                "最小公倍数",
                "最大公共质因子",
                "最大公约数",
                "最小公共质因子",
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
            id: 6,
            type: "single",
            question: "欧⼏⾥得算法还可以写成如下形式 : 下面有关说法，错误的是（ ）。",
            options: [
                "本题的gcd()实现为递归方式。",
                "本题的gcd()代码量少，更容易理解其辗转相除的思想。",
                "当 较大时，本题的gcd()实现会多次调用⾃⾝，需要较多额外的辅助空间。",
                "当 较大时，相比上题中的gcd()的实现，本题的gcd()执⾏效率更高。",
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
            id: 7,
            type: "single",
            question: "下述代码实现素数表的线性筛法，筛选出所有小于等于 的素数，则横线上应填的代码是 ( ) 。 void insert(dl_node *head, string my_song) { p = new dl_node; p->song = my_song; p->prev = nullptr; p->next = head; if (head != nullptr) { ________________________________ // 在此处填入代码 } head = p; } 1 2 3 4 5 6 7 8 9 10 11 int gcd(int a, int b) { while (b != 0) { int temp = b; b = a % b; a = temp; } return a; } 1 2 3 4 5 6 7 8 int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); } 1 2 3",
            options: [
                "for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)",
                "for (int j = 0; j <= sqrt(n) && i * primes[j] <= n; j++)",
                "for (int j = 0; j <= n; j++)",
                "for (int j = 1; j <= sqrt(n); j++)",
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
            question: "上题代码的时间复杂度是（ ）。",
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
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "为了正确实现快速排序，下面横线上的代码应为（ ）。 vector<int> linear_sieve(int n) { vector<bool> is_prime(n + 1, true); vector<int> primes; is_prime[0] = is_prime[1] = 0; //0 和 1 两个数特殊处理 for (int i = 2; i <= n; ++i) { if (is_prime[i]) { primes.push_back(i); } ________________________________ { // 在此处填入代码 is_prime[i * primes[j]] = 0; if (i % primes[j] == 0) break; } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 void qsort(vector<int>& arr, int left, int right) { int i, j, mid; int pivot; i = left; j = right; mid = (left + right) / 2; // 计算中间元素的索引 pivot = arr[mid]; // 选择中间元素作为基准值 do { while (arr[i] < pivot) i++; while (arr[j] > pivot) j--; if (i <= j) { swap(arr[i], arr[j]); // 交换两个元素 i++; j--; } } ________________________________; // 在此处填入代码 if (left < j) qsort(arr, left, j); // 对左子数组进行快速排序 if (i < right) qsort(arr, i, right); // 对右子数组进行快速排序 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
            options: [
                "while (i <= mid)",
                "while (i < mid)",
                "while (i < j)",
                "while (i <= j)",
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
            id: 10,
            type: "single",
            question: "关于分治算法，以下哪个说法正确？",
            options: [
                "分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。",
                "归并排序不是分治算法的应用。",
                "分治算法通常用于解决小规模问题。",
                "分治算法的时间复杂度总是优于 。",
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
            id: 11,
            type: "single",
            question: "根据下述二分查找法，在排好序的数组1 ， 3 ， 6 ， 9 ， 17 ， 31 ， 39 ， 52 ， 61 ， 79 ， 81 ， 90 ， 96中查找数值 82 ，和 82 比较的数组元素分别是（ ）。",
            options: [
                "52, 61, 81, 90",
                "52, 79, 90, 81",
                "39, 79, 90, 81",
                "39, 79, 90",
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
            id: 12,
            type: "single",
            question: "要实现一个高精度减法函数，则下面代码中加划线应该填写的代码为（ ）。 int binary_search(vector<int>& nums, int target) { int left = 0; int right = nums.size() - 1; while (left <= right) { int mid = (left + right) / 2; if (nums[mid] == target) { return mid; } else if (nums[mid] < target) { left = mid + 1; } else { right = mid - 1; } } return -1; // 如果找不到目标元素，返回 -1 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 // 假设 a 和 b 均为正数，且 a 表示的数比 b 大 vector<int> minus(vector<int> a, vector<int> b) { vector<int> c ； int len1 = a.size(); int len2 = b.size(); int i, t; for (i = 0; i < len2; i++) { if (a[i] < b[i]) { // 借位 _____________ // 在此处填入代码 1 2 3 4 5 6 7 8 9 10",
            options: [
                "a[i + 1]--;",
                "a[i]--;",
                "b[i + 1]--;",
                "b[i]--;",
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
            question: "设 和 是两个长度为 的有序数组，现将 和 合并成一个有序数组，归并排序算法在最坏情况下⾄少要做 （ ）次比较。",
            options: [
                "选项A",
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
            id: 14,
            type: "single",
            question: "给定如下函数： 则当 时，函数返回值为（ ）。",
            options: [
                "0",
                "1",
                "21",
                "-11",
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
            id: 15,
            type: "single",
            question: "给定如下函数（函数功能同上题，增加输出打印）： a[i] += 10; } t = a[i] - b[i]; c.push_back(t); } for (; i < len1; i++) c.push_back(a[i]); len3 = c.size(); while (c[len3 - 1] == 0) {// 去除前导 0 c.pop_back(); len3--; } return c; } 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 int fun(int n) { if (n == 1) return 1; if (n == 2) return 2; return fun(n - 2) - fun(n - 1); } 1 2 3 4 5 题号 1 2 3 4 5 6 7 8 9 10 答案 则当 时，屏幕上输出序列为（ ）。",
            options: [
                "4 3 2 1",
                "1 2 3 4",
                "4 2 3 1 2",
                "4 2 3 2 1",
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
            id: 16,
            type: "judge",
            question: "如果将双向链表的最后一个结点的下一项指针指向第一个结点，第一个结点的前一项指针指向最后一个结 点，则该双向链表构成循环链表。",
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
            question: "数组和链表都是线性表，链表的优点是插入删除不需要移动元素，并且能随机查找。",
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
            question: "链表的存储空间物理上可以连续，也可以不连续。",
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
            question: "找出⾃然数 n 以内的所有质数，常用算法有埃拉托斯特尼（埃⽒）筛法和线性筛法，其中埃⽒筛法效率更 高。",
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
            question: "唯一分解定理表明任何一个大于 1 的整数都可以唯一地表⽰为一系列质数的乘积，即质因数分解是唯一的。",
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
            question: "贪⼼算法通过每一步选择局部最优解来获得全局最优解，但并不一定能找到最优解。",
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
            question: "归并排序和快速排序都采用递归实现，也都是不稳定排序。（ ）",
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
            question: "插入排序有时比快速排序时间复杂度更低。",
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
            question: "在进⾏全国⼈⼝普查时，将其分解为对每个省市县乡来进⾏普查和统计。这是典型的分治策略。",
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
            question: "在下面 C++ 代码中，由于删除了变量ptr，因此ptr所对应的数据也随之删除，故执⾏下述代码时，将报 错。 int fun(int n) { cout << n << \" \"; if (n == 1) return 1; if (n == 2) return 2; return fun(n - 2) - fun(n - 1); } 1 2 3 4 5 6 int* ptr = new int(10); cout << *ptr << endl; delete ptr; cout << ptr << endl; 1 2 3 4 子任务编号 数据点占比 1 20% 2 40% 3 40%",
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
