// 2024年12月 GESP C++ 五级真题
export const paperData = {
    id: '2024-12-l5',
    title: '2024年12月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于链表和数组的描述，错误的是（ ）。",
            options: [
                "当数据数量不确定时，为了应对各种可能的情况，需要申请一个较大的数组，可能浪费空间；此时用链表比 较合适，大小可动态调整。",
                "在链表中访问节点的效率较低，时间复杂度为 。",
                "链表插入和删除元素效率较低，时间复杂度为 。",
                "链表的节点在内存中是分散存储的，通过指针连在一起。",
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
            question: "在循环单链表中，节点的 next 指针指向下一个节点，最后一个节点的 next 指针指向（ ）。",
            options: [
                "当前节点",
                "nullptr",
                "第一个节点",
                "上一个节点",
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
            id: 3,
            type: "single",
            question: "为了方便链表的增删操作，一些算法生成一个虚拟头节点，方便统一删除头节点和其他节点。下面代码实现 了删除链表中值为val的节点，横线上应填的最佳代码是 ( ) 。 struct LinkedNode { int val; LinkedNode* next; LinkedNode(int val):val(val), next(nullptr){} }; void removeElements(LinkedNode* head, int val) { if (head == nullptr) { return; } LinkedNode* cur; LinkedNode* dummyHead = new LinkedNode(0); // 虚拟头节点 ________________________________ // 在此处填入代码 while(cur ->next ！= nullptr) { if(cur->next->val == val) { LinkedNode* tmp = cur->next; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
            options: [
                "dummyHead->next = head; cur = dummyHead;",
                "dummyHead->next = head->next; cur = dummyHead;",
                "dummyHead->next = head; cur = dummyHead->next;",
                "dummyHead->next = head->next; cur = dummyHead->next;",
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
            id: 4,
            type: "single",
            question: "对下面两个函数，说法错误的是（ ）。",
            options: [
                "两个函数的实现的功能相同。",
                "fibA 采用递推方式。",
                "fibB 采用的是递归方式。",
                "fibA 时间复杂度为 ， fibB 的时间复杂度为 。",
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
            question: "两块长方形⼟地的长宽分别为 和 ⽶，要将它们分成正方形的小块，使得正方形的尺⼨尽可能大。小杨 采用如下的辗转相除函数gcd(24, 36)来求正方形分块的边长，则函数gcd调用顺序为（ ）。 cur->next = cur->next->next; delete tmp; tmp = nullptr; } else { cur = cur ->next; } } head = dummyHead->next; delete dummyHead; dummyHead = nullptr; } 18 19 20 21 22 23 24 25 26 27 28 29 int fibA(int n) { if (n <= 1) return n; int f1 = 0, f2 = 1; for (int i = 2; i <= n; ++i) { int temp = f2; f2 = f1 + f2; f1 = temp; } return f2; } int fibB(int n) { if (n <= 1) return n; return fibB(n - 1) + fibB(n - 2); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
            options: [
                "gcd(24, 36) 、 gcd(24, 12) 、 gcd(12, 0)",
                "gcd(24, 36) 、 gcd(12, 24) 、 gcd(0, 12)",
                "gcd(24, 36) 、 gcd(24, 12)",
                "gcd(24, 36) 、 gcd(12, 24)",
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
            question: "唯一分解定理表明，每个大于 1 的⾃然数可以唯一地写成若⼲个质数的乘积。下面函数将⾃然数 的所有质因 素找出来，横线上能填写的最佳代码是（ ）。",
            options: [
                "for (int i = 3; i <= n; i ++)",
                "for (int i = 3; i * i <= n; i ++)",
                "for (int i = 3; i <= n; i += 2)",
                "for (int i = 3; i * i <= n; i += 2)",
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
            question: "下述代码实现素数表的埃拉托⾊尼 ( 埃⽒ ) 筛法，筛选出所有小于等于 的素数。 int gcd(int a, int b) { int big = a > b ? a : b; int small = a < b ? a : b; if (big % small == 0) { return small; } return gcd(small, big % small); } 1 2 3 4 5 6 7 8 #include <vector> vector<int> get_prime_factors(int n) { vector<int> factors; if (n <= 1) { cout << \" 输入的数必须是大于 1 的正整数 \" << endl; return; } while (n % 2 == 0) { factors.push_back(2); n /= 2; } ________________________________ { // 在此处填入代码 while (n % i == 0) { factors.push_back(i); n /= i; } } if (n > 2) { factors.push_back(n); } return factors; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 下面说法，正确的是（ ）。",
            options: [
                "代码的时间复杂度是 。",
                "在标记非素数时，代码从 开始，可以减少重复标记。",
                "代码会输出所有小于等于 的奇数。",
                "调用函数sieve_Eratosthenes(10)，函数返回值的数组中包含的元素有：2, 3, 5, 7, 9。",
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
            id: 8,
            type: "single",
            question: "下述代码实现素数表的线性筛法，筛选出所有小于等于 的素数。下面说法正确的是 ( ) 。 vector<int> sieve_Eratosthenes(int n) { vector<bool> is_prime(n +1, true); vector<int> primes; for (int i = 2; i * i <= n; i++) { if (is_prime[i]) { primes.push_back(i); for (int j = i * i; j <= n; j += i) { is_prime[j] = false; } } } for (int i = sqrt(n) + 1; i <= n; i++) { if (is_prime[i]) { primes.push_back(i); } } return primes; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 vector<int> sieve_linear(int n) { vector<bool> is_prime(n +1, true); vector<int> primes; for (int i = 2; i <= n/2; i++) { if (is_prime[i]) primes.push_back(i); for (int j = 0; j < primes.size() && i * primes[j] <= n; j++) { is_prime[ i * primes[j] ] = 0; if (i % primes[j] == 0) break; } } for (int i = n/2 +1; i <= n; i++) { if (is_prime[i]) primes.push_back(i); } return primes; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21",
            options: [
                "线性筛的时间复杂度是 。",
                "每个合数会被其所有的质因子标记一次。",
                "线性筛和埃拉托⾊尼筛的实现思路完全相同。",
                "以上都不对",
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
            id: 9,
            type: "single",
            question: "考虑以下 C++ 代码实现的快速排序算法： 以下关于快速排序的说法，正确的是（ ）。",
            options: [
                "快速排序通过递归对子问题进⾏求解。",
                "快速排序的最坏时间复杂度是 。",
                "快速排序是一个稳定的排序算法。",
                "在最优情况下，快速排序的时间复杂度是 。",
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
            id: 10,
            type: "single",
            question: "下面关于归并排序，描述正确的是（ ）。",
            options: [
                "归并排序是一个不稳定的排序算法。",
                "归并排序的时间复杂度在最优、最差和平均情况下都是 。",
                "归并排序需要额外的 空间。",
                "对于输入数组 {12, 11, 13, 5, 6, 7} ，代码输出结果为： 7 6 5 13 12 11 。",
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
            id: 11,
            type: "single",
            question: "给定一个长度为 的有序数组nums，其中所有元素都是唯一的。下面的函数返回数组中元素target的索 引。 }22 int partition(vector<int>& arr, int left, int right) { int pivot = arr[right]; // 基准值 int i = left - 1; for (int j = left; j < right; j++) { if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); } } swap(arr[i + 1], arr[right]); return i + 1; } // 快速排序 void quickSort(vector<int>& arr, int left, int right) { if (left < right) { int pi = partition(arr, left, right); quickSort(arr, left, pi - 1); quickSort(arr, pi + 1, right); } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 关于上述函数，描述不正确的是（ ）。",
            options: [
                "函数采用二分查找，每次计算搜索当前搜索区间的中点，然后根据中点的元素值排除一半搜索区间。",
                "函数采用递归求解，每次问题的规模减小一半。",
                "递归的终⽌条件是中间元素的值等于target，若数组中不包含该元素，递归不会终⽌。",
                "算法的复杂度为 .",
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
            question: "给定一个长度为 的有序数组nums，其中可能包含重复元素。下面的函数返回数组中某个元素target的 左边界，若数组中不包含该元素，则返回−1。例如在数组nums = [5,7,7,8,8,10]中查找target=8，函数返 回 在数组中的左边界的索引为 。则横线上应填写的代码为（ ）。",
            options: [
                "right = middle - 1;",
                "right = middle;",
                "right = middle + 1; int binarySearch(vector<int> &nums, int target, int left, int right) { if (left > right) { return -1; } int middle = left + ((right - left) / 2); if (nums[middle] == target) { return middle; } else if (nums[middle] < target) { return binarySearch(nums, target, middle + 1, right); } else return binarySearch(nums, target, left, middle - 1); } } int Find(vector<int> &nums, int target) { int n = nums.size(); return binarySearch(nums, target, 0, n - 1); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 int getLeftBoundary(vector<int>& nums, int target) { int left = 0; int right = nums.size() - 1; while (left < right) { int middle = left + ((right - left) / 2); if (target <= nums[middle]) ________________________________ // 在此处填入代码 else left = middle+1; } return nums[left]==target?left:-1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14",
                "以上都不对",
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
            id: 13,
            type: "single",
            question: "假设有多个孩子，数组g保存所有孩子的胃⼝值。有多块饼⼲，数组s保存所有饼⼲的尺⼨。小杨给孩子 们发饼⼲，每个孩子最多只能给一块饼⼲。饼⼲的尺⼨大于等于孩子的胃⼝时，孩子才能得到满⾜。小杨的目标是 尽可能满⾜越多数量的孩子，因此打算采用贪⼼算法来找出能满⾜的孩子的数目，则横线上应填写的代码为（ ）。",
            options: [
                "result++; index--;",
                "result--; index--;",
                "result--; index++;",
                "result++; index++;",
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
            question: "关于分治算法，以下说法中不正确的是（ ）。",
            options: [
                "分治算法将问题分成子问题，然后分别解决子问题，最后合并结果。",
                "归并排序采用了分治思想。",
                "快速排序采用了分治思想。",
                "冒泡排序采用了分治思想。",
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
            question: "小杨编写了一个如下的高精度减法函数： int cooki4children(vector<int>& g, vector<int>& s) { sort(g.begin(), g.end()); sort(s.begin(), s.end()); int index = s.size() - 1; // 饼干数组下标 int result = 0; for (int i = g.size() - 1; i >= 0; i--) { if (index >= 0 && s[index] >= g[i]) { ________________________________ // 在此处填入代码 } } return result; } 1 2 3 4 5 6 7 8 9 10 11 12 13 vector<int> highPrecisionSubtract(vector<int> a, vector<int> b) { vector<int> result; int borrow = 0; for (int i = 0; i < a.size(); ++i) { int digitA = a[i]; int digitB = i < b.size() ? b[i] : 0; int diff = digitA - digitB - borrow; if (diff < 0) { diff += 10; borrow = 1; } else { borrow = 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 题号 1 2 3 4 5 6 7 8 9 10 答案 下面说法，正确的是（ ）。",
            options: [
                "如果数组 表⽰的整数小于表⽰的整数，代码会正确返回二者的差为负数。",
                "代码假设输入数字是以倒序存储的，例如 存储为 {0, 0, 5}。",
                "代码的时间复杂度为",
                "当减法结果为 时，结果数组仍然会存储很多个元素 。",
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
            question: "单链表只支持在表头进⾏插入和删除操作。",
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
            question: "线性筛相对于埃拉托斯特尼筛法，每个合数只会被它的最小质因数筛去一次，因此效率更高。",
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
            question: "任何一个大于 1 的⾃然数都可以分解成若⼲个不同的质数的乘积，且分解方式是唯一的。",
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
            question: "贪⼼算法通过每一步选择当前最优解，从而一定能获得全局最优解。",
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
            question: "递归算法必须有一个明确的结束条件，否则会导致无限递归并可能引发栈溢出。",
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
            question: "快速排序和归并排序的平均时间复杂度均为 ，且都是稳定排序。",
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
            question: "快速排序的时间复杂度总比插入排序的时间复杂度低。",
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
            question: "二分查找仅适用于数组而不适合链表，因为二分查找需要跳跃式访问元素，链表中执⾏跳跃式访问的效率 低。",
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
            question: "对有序数组{5,13,19,21,37,56,64,75,88,92,100} 进⾏二分查找，成功查找元素19 的比较次数是 2 。",
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
            question: "递归函数每次调用⾃⾝时，系统都会为新开启的函数分配内存，以存储局部变量、调用地址和其他信息 等，导致递归通常比迭代更加耗费内存空间。",
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
