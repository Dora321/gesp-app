import { q } from '../verifiedQuestionCorrectionHelpers.js';

export const verifiedCorrectionsPart3 = {
'2024-03-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1602047172411424.pdf',
    questions: {
      3: q(2, `int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        _________________________________ // 在此处填入代码
    }
}`),
      7: q(4, `string add(string num1, string num2) {
    string result;
    int carry = 0;
    int i = num1.size() - 1, j = num2.size() - 1;
    while (i >= 0 || j >= 0 || carry) {
        int x = (i >= 0) ? num1[i--] - '0' : 0;
        int y = (j >= 0) ? num2[j--] - '0' : 0;
        int sum = x + y + carry;
        carry = sum / 10;
        _______________________________________
    }
    return result;
}`),
      8: q(4, `int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    int times = 0;
    while (left <= right) {
        times++;
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            cout << times << endl;
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    cout << times << endl;
    return -1;
}`),
    },
  },
'2025-03-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1684804529553440.pdf',
    questions: {
      3: q(2, `// 链表结点
template <typename T>
struct ListNode {
    T data;
    ListNode* prev;
    ListNode* next;
    explicit ListNode(const T& val = T())
        : data(val), prev(nullptr), next(nullptr) {}
};

struct LinkedList {
    ListNode<T>* head;
    ListNode<T>* tail;
};

void InitLinkedList(LinkedList* list) {
    list->head = new ListNode<T>;
    list->tail = new ListNode<T>;
    ________________________________ // 在此处填入代码
};`),
      6: q(3, `vector<int> sieve_linear(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;
    if (n < 2) return primes;
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i <= n / 2; i++) {
        if (is_prime[i])
            primes.push_back(i);
        for (int j = 0; ________________________________; j++) {
            is_prime[i * primes[j]] = false;
            if (i % primes[j] == 0)
                break;
        }
    }
    for (int i = n / 2 + 1; i <= n; i++) {
        if (is_prime[i])
            primes.push_back(i);
    }
    return primes;
}`),
    },
  },
'2025-06-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1749477555699744.pdf',
    questions: {
      3: q(2, `void append(int data) {
    Node* newNode = new Node{data, nullptr, nullptr};
    if (is_empty()) {
        head = tail = newNode;
    } else {
        _______________________
    }
    ++size;
}`),
      5: q(3, `bool is_prime(int n) {
    if (n <= 1) return false;
    if (n == 2 || n == 3 || n == 5) return true;
    if (n % 2 == 0 || n % 3 == 0 || n % 5 == 0) return false;

    int i = 7;
    int step = 4;
    int finish_number = sqrt(n) + 1;
    while (i <= finish_number) {
        if (n % i == 0) return false;
        i += step;
        step = 6 - step;
    }
    return true;
}`),
      7: q(4, `bool is_prime(int n) {
    if (n <= 1) return false;
    int finish_number = static_cast<int>(sqrt(n)) + 1;
    for (int i = 2; i < finish_number; ++i) {
        if (n % i == 0)
            return false;
    }
    return true;
}`),
      9: q(5, `int find_max_recursive(const vector<int>& nums, int left, int right) {
    if (left == right) return nums[left];
    int mid = left + (right - left) / 2;
    int left_max = find_max_recursive(nums, left, mid);
    int right_max = find_max_recursive(nums, mid + 1, right);
    return max(left_max, right_max);
}

int find_max(const vector<int>& nums) {
    if (nums.empty())
        throw invalid_argument("输入数组不能为空");
    return find_max_recursive(nums, 0, nums.size() - 1);
}`),
      10: q(5, `int find_max(const vector<int>& nums) {
    if (nums.empty())
        throw invalid_argument("输入数组不能为空");
    int max_value = nums[0];
    for (int num : nums) {
        if (num > max_value)
            max_value = num;
    }
    return max_value;
}`),
      12: q(6, `double sqrt_binary(long long n, double epsilon = 1e-10) {
    if (n < 0) throw invalid_argument("输入必须为非负整数");
    if (n == 0 || n == 1) return n;

    // 阶段 1
    long long low = 1, high = n;
    long long k = 0;
    while (low <= high) {
        long long mid = (low + high) / 2;
        long long mid_sq = mid * mid;
        if (mid_sq == n) return mid;
        if (mid_sq < n) {
            k = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    long long next_k = k + 1;
    if (next_k * next_k == n) return next_k;

    // 阶段 2
    double low_d = (double)k;
    double high_d = (double)(k + 1);
    double mid;
    while (high_d - low_d >= epsilon) {
        mid = (low_d + high_d) / 2;
        double mid_sq = mid * mid;
        if (mid_sq < n) low_d = mid;
        else high_d = mid;
    }
    double result = (low_d + high_d) / 2;
    long long check_int = (long long)(result + 0.5);
    if (check_int * check_int == n) return check_int;
    return result;
}`),
      13: q(7, `const int MAX_COINS = 10;
int result[MAX_COINS] = {0}; // 假设最多 10 种面额

int find_coins(const vector<int>& coins, int amount) {
    sort(coins.begin(), coins.end(), greater<int>());
    int n = coins.size();
    for (int i = 0; i < n; ++i) {
        int coin = coins[i];
        int num = amount / coin;
        result[i] = num;
        amount -= num * coin;
        if (amount == 0) break;
    }
    cout << "找零方案如下：" << endl;
    for (int i = 0; i < n; ++i)
        cout << sorted_coins[i] << "角需要" << result[i] << "枚" << endl;
    return 0;
}`),
      18: q(11, `int main() {
    int n, m;
    cin >> n >> m;
    if (n > m) swap(n, m);
    map<int, vector<int>> prime_factor;
    for (int i = n; i <= m; ++i) {
        int j = 2, k = i;
        while (k != 1) {
            if (k % j == 0) {
                prime_factor[i] = prime_factor[i] + j;
                k /= j;
            } else {
                ++j;
            }
        }
    }
    for (auto& p : prime_factor) {
        cout << p.first << ": ";
        for (int v : p.second) cout << v << " ";
        cout << endl;
    }
    return 0;
}`),
      19: q(11, `void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int p = 0; p < k; ++p) arr[left + p] = temp[p];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    std::cout << "HERE";
    merge(arr, left, mid, right);
}`),
    },
  },
'2025-06-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1687196042002464.pdf',
    questions: {
      4: q(2, `stack<int> s;
queue<int> q;
for (int i = 1; i <= 3; ++i) {
    s.push(i);
    q.push(i);
}
cout << s.top() << " " << q.front() << endl;`),
      11: q(4, `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

void dfs(TreeNode* root, vector<int>& result) {
    if (root == nullptr) return;
    __________________________
}`),
      15: q(6, `int knapsack1D(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; ++i) {
        for (int w = W; w >= wt[i]; --w) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}`),
    },
  },
'2025-12-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1727912589918240.pdf',
    questions: {
      2: q(1, `class Instrument {
public:
    virtual void play() { cout << "乐器在演奏声音" << endl; }
    virtual ~Instrument() {}
};
class Piano : public Instrument {
public:
    void play() override { cout << "钢琴：叮咚叮咚" << endl; }
};
class Guitar : public Instrument {
public:
    void play() override { cout << "吉他：咚咚当当" << endl; }
};
int main() {
    Instrument* instruments[2];
    instruments[0] = new Piano();
    instruments[1] = new Guitar();
    for (int i = 0; i < 2; ++i) instruments[i]->play();
    for (int i = 0; i < 2; ++i) delete instruments[i];
    return 0;
}`),
      3: q(2, `class Instrument {
public:
    void play() { cout << "乐器在演奏声音" << endl; }
    virtual ~Instrument() {}
};
class Piano : public Instrument {
public:
    void play() override { cout << "钢琴：叮咚叮咚" << endl; }
};
class Guitar : public Instrument {
public:
    void play() override { cout << "吉他：咚咚当当" << endl; }
};
int main() {
    Instrument* instruments[2];
    instruments[0] = new Piano();
    instruments[1] = new Guitar();
    for (int i = 0; i < 2; ++i) instruments[i]->play();
    for (int i = 0; i < 2; ++i) delete instruments[i];
    return 0;
}`),
      8: q(4, `struct Symbol {
    char ch;
    long long freq;
    string code;
};
struct Node {
    long long w;
    int l, r;
    int sym;
    Node(long long _w=0, int _l=-1, int _r=-1, int _sym=-1)
        : w(_w), l(_l), r(_r), sym(_sym) {}
};

static int PopMinNode(const vector<Node>& nodes,
                      const vector<int>& leafIdx, int n, int& pA,
                      const vector<int>& internalIdx, int& pB) {
    if (pA < n && (pB >= (int)internalIdx.size() ||
        nodes[leafIdx[pA]].w <= nodes[internalIdx[pB]].w)) {
        return leafIdx[pA++];
    }
    return internalIdx[pB++];
}

static void DFSBuildCodes(int u, const vector<Node>& nodes,
                          Symbol sym[], string& path) {
    if (u == -1) return;
    if (nodes[u].sym != -1) {
        sym[nodes[u].sym].code = path;
        return;
    }
    path.push_back('0');
    DFSBuildCodes(nodes[u].l, nodes, sym, path);
    path.pop_back();
    path.push_back('1');
    DFSBuildCodes(nodes[u].r, nodes, sym, path);
    path.pop_back();
}

int BuildHuffmanCodes(Symbol sym[], int n) {
    for (int i = 0; i < n; i++) sym[i].code.clear();
    if (n <= 0) return -1;
    if (n == 1) {
        sym[0].code = "0";
        return 0;
    }
    vector<Node> nodes;
    nodes.reserve(2 * n);
    vector<int> leafIdx(n);
    for (int i = 0; i < n; i++) {
        leafIdx[i] = (int)nodes.size();
        nodes.push_back(Node(sym[i].freq, -1, -1, i));
    }
    sort(leafIdx.begin(), leafIdx.end(), [&](int a, int b) {
        if (nodes[a].w != nodes[b].w) return nodes[a].w < nodes[b].w;
        return nodes[a].sym < nodes[b].sym;
    });
    vector<int> internalIdx;
    internalIdx.reserve(n);
    int pA = 0, pB = 0;
    for (int k = 1; k < n; k++) {
        int x = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB);
        int y = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB);
        int z = (int)nodes.size();
        ________________________ // 在此处填写代码
    }
    int root = internalIdx.back();
    string path;
    DFSBuildCodes(root, nodes, sym, path);
    return root;
}`),
      14: q(8, `for each item (w, v):
    for (int j = W; j >= w; --j)
        dp[j] = max(dp[j], dp[j-w] + v);`),
    },
  },
'2024-12-l8': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1650239836520480.pdf',
    reviewedAt: '2026-07-10',
    questions: {
      7: {
        sourcePage: 2,
        question: '二项式 $(x+y)^6$ 的展开式中 $x^3y^3$ 项的系数是（ ）。',
        explanation: `**答案：C（20）**

**解析：**
二项式展开的通项为 $C_6^k x^{6-k}y^k$。要得到 $x^3y^3$，应取 $k=3$，系数为 $C_6^3=20$。

**考点：** 二项式定理与组合数。`,
        tags: ['组合数学'],
      },
      12: q(4, `typedef struct Edge {
    int in, out;       // 从下标 in 顶点到下标 out 顶点的边
    int len;           // 边长度
    struct Edge* next;
} Edge;

// v：顶点个数，graph：出边邻接表，start：起点下标，dis：输出每个顶点的最短距离
void dijkstra(int v, Edge* graph[], int start, int* dis) {
    const int MAX_DIS = 0x7fffff;
    for (int i = 0; i < v; i++) dis[i] = MAX_DIS;
    dis[start] = 0;

    int* visited = new int[v];
    for (int i = 0; i < v; i++) visited[i] = 0;
    visited[start] = 1;

    for (int t = 0; ; t++) {
        int min = MAX_DIS, minv = -1;
        for (int i = 0; i < v; i++) {
            if (visited[i] == 0 && min > dis[i]) {
                min = dis[i];
                minv = i;
            }
        }
        if (minv < 0) break;
        visited[minv] = 1;
        for (Edge* e = graph[minv]; e != NULL; e = e->next) {
            ______________________________ // 在此处填入代码
        }
    }
    delete[] visited;
}`, {
        question: '下列 Dijkstra 算法中，横线处应该填入的是（ ）。',
        options: [
          'if (dis[e->out] > e->len) dis[e->out] = e->len;',
          'if (dis[e->out] > min + e->len) dis[e->out] = min + e->len;',
          'if (dis[e->in] > e->len) dis[e->in] = e->len;',
          'if (dis[e->in] > min + e->len) dis[e->in] = min + e->len;',
        ],
        answer: 1,
        explanation: `**答案：B**

**解析：**
当前选中的顶点是 \`minv\`，它到起点的最短距离为 \`min\`。遍历其出边 \`e\` 时，应尝试用 \`min + e->len\` 松弛终点 \`e->out\`：只有新路径更短时才更新。

- A：漏加从起点到当前顶点的距离 \`min\`。
- B：正确，是标准松弛操作。
- C、D：更新了边的起点 \`e->in\`，方向错误。

**考点：** Dijkstra 算法的松弛操作。`,
        tags: ['最短路'],
      }),
      13: q(5, `typedef struct Edge {
    int in, out;
    int len;
    struct Edge* next;
} Edge;

void dijkstra(int v, Edge* graph[], int start, int* dis) {
    const int MAX_DIS = 0x7fffff;
    for (int i = 0; i < v; i++) dis[i] = MAX_DIS;
    dis[start] = 0;
    int* visited = new int[v]();
    visited[start] = 1;

    for (int t = 0; ; t++) {
        int min = MAX_DIS, minv = -1;
        for (int i = 0; i < v; i++) {
            if (visited[i] == 0 && min > dis[i]) {
                min = dis[i];
                minv = i;
            }
        }
        if (minv < 0) break;
        visited[minv] = 1;
        for (Edge* e = graph[minv]; e != NULL; e = e->next) {
            if (dis[e->out] > min + e->len)
                dis[e->out] = min + e->len;
        }
    }
    delete[] visited;
}`, {
        question: '假设图 graph 中顶点数为 v、边数为 e，上题程序的时间复杂度为（ ）。',
        options: ['O(e)', 'O(v²)', 'O(v log v + e)', 'O((v + e) log v)'],
        answer: 1,
        explanation: `**答案：B（O(v²)）**

**解析：**
程序没有使用优先队列。每轮都线性扫描全部 v 个顶点寻找未访问的最小距离顶点，共进行至多 v 轮，因此这一部分是 O(v²)；遍历邻接表的总开销为 O(e)。整体为 O(v²+e)，在简单图中记为 O(v²)。

**考点：** 朴素 Dijkstra 的时间复杂度。`,
        tags: ['复杂度分析'],
      }),
      14: q(5, `void quick_sort(int a[], int n) {
    if (n <= 1) return;
    int pivot = 0, l = 0, r = n - 1;
    while (________) { // 在此处填入选项
        while (r > pivot && a[r] >= a[pivot]) r--;
        if (r > pivot) {
            int temp = a[pivot];
            a[pivot] = a[r];
            a[r] = temp;
            pivot = r;
        }
        while (l < pivot && a[l] <= a[pivot]) l++;
        if (l < pivot) {
            int temp = a[pivot];
            a[pivot] = a[l];
            a[l] = temp;
            pivot = l;
        }
    }
    quick_sort(a, pivot);
    quick_sort(________); // 在此处填入选项
}`, {
        question: '下面的快速排序程序中，两处横线处分别应填入的是（ ）。',
        options: [
          'l < r; a + pivot + 1, n - pivot - 1',
          'l < r; a + pivot + 1, n - pivot',
          'l <= r; a + pivot + 1, n - pivot - 1',
          'l <= r; a + pivot + 1, n - pivot',
        ],
        answer: 0,
        explanation: `**答案：A**

**解析：**
划分过程应在左右指针尚未相遇时继续，因此第一处为 \`l < r\`。枢轴最终位于下标 \`pivot\`，左段长度为 \`pivot\`，右段从 \`a + pivot + 1\` 开始，长度为 \`n - pivot - 1\`。

- A：两个边界都正确。
- B、D：右段长度多算 1，可能越界。
- C、D：\`l <= r\` 会在指针相遇时多执行一次循环。

**考点：** 快速排序的划分边界与递归区间。`,
        tags: ['排序算法'],
      }),
      15: q(5, `void quick_sort(int a[], int n) {
    if (n <= 1) return;
    int pivot = 0, l = 0, r = n - 1;
    while (l < r) {
        while (r > pivot && a[r] >= a[pivot]) r--;
        if (r > pivot) {
            int temp = a[pivot];
            a[pivot] = a[r];
            a[r] = temp;
            pivot = r;
        }
        while (l < pivot && a[l] <= a[pivot]) l++;
        if (l < pivot) {
            int temp = a[pivot];
            a[pivot] = a[l];
            a[l] = temp;
            pivot = l;
        }
    }
    quick_sort(a, pivot);
    quick_sort(a + pivot + 1, n - pivot - 1);
}`),
    },
  }
};
