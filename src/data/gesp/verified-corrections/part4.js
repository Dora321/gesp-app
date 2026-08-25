import { q } from '../verifiedQuestionCorrectionHelpers.js';

// Generated from the official GESP Markdown archive.
// Re-run scripts/audit-official-code-gaps.mjs with GESP_OFFICIAL_MARKDOWN_DIR
// when the official PDF/Markdown mirror is refreshed.
export const verifiedCorrectionsPart4 = {
  '2023-12-l2': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      21: q(5, `for (i = -500; i < 500; i++)
    Sum += i;
cout << Sum;`),
    },
  },
  '2023-12-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      11: q(5, `vector<int> operator +(vector<int> a, vector<int> b)
{
    vector<int> c;
    int t = 0;

    for (int i = 0; i < a.size() || i < b.size(); i++)
    {
        if (i < a.size()) t = t + a[i];
        if (i < b.size()) t = t + b[i];
        ____
    }

    if (t) c.push_back(t);

    return c;
}`),
    },
  },
  '2023-12-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      9: q(4, `int Depth(BiNode* T)
{
    if (T == NULL)
    {
        return 0;
    }
    else
    {
        int m = Depth(T->lchild);
        int n = Depth(T->rchild);
        if (m > n)
        {
            return m + 1;
        }
        else
        {
            return n + 1;
        }
    }
}`),
    },
  },
  '2024-06-l2': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      12: q(4, `int N;
cin >> N;
bool Flag = true;
for ( int i = 2; i < N; i++){
    if (i * i > N)
        break;
    if (N % i == 0){
        Flag = false;
        break;

}
}
if (Flag)

cout << N << "是质数" << endl;
else
    cout << N << "不是质数" << endl;`),
    },
  },
  '2024-06-l3': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      12: q(5, `using namespace std;

int main() {
    string s = "0629";

    int n = s.length();

int x = 0;
    for(int i = 0; i < n; i++)
        x += s[i];

    cout << x << endl;
    return 0;
}`),
    },
  },
  '2024-06-l4': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      17: q(8, `using namespace std;
int main()
{
    int a=20;
    int& ra;
    ra=&a;
    cout<<ra<<endl;
}`),
      22: q(8, `using namespace std;
int main()
{
    int *p=NULL;
    cout<<p<<endl;
}`),
    },
  },
  '2024-06-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      7: q(3, `vector<int> linear_sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;
    is_prime[0] = is_prime[1] = 0; //0和1两个数特殊处理
    for (int i = 2; i <= n; ++i) {
        if (is_prime[i]) {

primes.push_back(i);
        }
        ________________________________ {    // 在此处填入代码
            is_prime[i * primes[j]] = 0;
            if (i % primes[j] == 0)
                break;
        }
    }
    return primes;
}`),
    },
  },
  '2024-06-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      3: q(2, `using namespace std;

class shape {
protected:
    int width, height;
public:
    shape(int a = 0, int b = 0) {
        width = a;
        height = b;

}
    virtual int area() {
        cout << "parent class area: " <<endl;
        return 0;
    }
};

class rectangle: public shape {
public:
    rectangle(int a = 0, int b = 0) : shape(a, b) { }

int area () {
        cout << "rectangle area: ";
        return (width * height);
    }
};

class triangle: public shape {
public:
    triangle(int a = 0, int b = 0) : shape(a, b) { }

int area () {

cout << "triangle area: ";
        return (width * height / 2);
    }
};

int main() {
   shape *pshape;
   rectangle rec(10, 7);
   triangle  tri(10, 5);

pshape = &rec;
   pshape->area();

pshape = &tri;
   pshape->area();
   return 0;

}`),
    },
  },
  '2024-09-l1': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      15: q(4, `int N;

cin >> N;
for(int i = 0; i <= N; i++)
    if(___________________)
        cout << N << "是一个兄弟数\\n";`),
    },
  },
  '2024-09-l4': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      4: q(2, `int arr[3] = {24, 9, 7};
int* p = arr;
p++;
cout << *p << endl;`),
      5: q(2, `int x = 20;
int y = 24;

int* p = &x;
int* q = &y;

p = q;`),
      11: q(3, `void swap(vector<int> &arr, int i, int j) {
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

int bubble_sort(vector<int> &arr) {
    for (int i = arr.size() - 1; i > 0; i--) {
        bool flag = false; // 标志位
        ________________________________ {    // 在此处填入代码

if (arr[j] > arr[j + 1]) {
                swap(arr, i, j);
                flag = true;
            }
        }

if (!flag)
            break; // 此轮“冒泡”未交换任何元素
    }
}`),
      13: q(4, `void insertion_sort(vector<int> &nums) {
    for (int i = 1; i < nums.size(); i++) {
        int base = nums[i], j = i - 1;

________________________________ {    // 在此处填入代码
            nums[j + 1] = nums[j];

j--;
        }
        nums[j + 1] = base;
    }
}`),
      15: q(5, `using namespace std;

int divide(int a, int b) {
    if (b == 0) {
        throw runtime_error("division by zero error ");
    }
    return a / b;
}

int main() {

int x = 10;
    int y = 0;  // 设为 0 会导致除零错误

try {
        int result = divide(x, y);
        cout << "result: " << result << endl;
    } catch (const runtime_error& e) {
        cout << "caught an exception: " << e.what() << endl;
    }

return 0;

}`),
      25: q(6, `int point(int* p){
    return *p * 2;
}

int main() {
    int a = 10;
    int* p = &a;
    *p = point(p);
    cout << *p << endl;
}`),
    },
  },
  '2024-09-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      5: q(2, `void sieve_Eratosthenes(int n) {
    vector<bool> is_prime(n + 1, true);

vector<int> primes;

for (int i = 2; i * i <= n; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            ________________________________ {    // 在此处填入代码
                is_prime[j] = false;
            }
        }
    }

for (int i = sqrt(n) + 1; i <= n; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
    }

return primes;
}`),
    },
  },
  '2024-09-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      5: q(2, `using namespace std;

bool is_front_equal(std::queue<int>& q, int a) {
    bool is_equal = false;

if (!q.empty()) {
        ———————————————————————— // 在此处填入代码
    }
    return is_equal;
}`),
      7: q(3, `using namespace std;
// 生成 n 位的格雷码
vector<string> generate_graycode(int n) {
    vector<string> graycode_list;
    if (n <= 0) {
        return graycode_list;
    }

// 初始1位格雷码
    graycode_list.push_back("0");
    graycode_list.push_back("1");

// 迭代生成 n 位的格雷码
    for (int i = 2; i <= n; i++) {
        int current_size = graycode_list.size();

for (int j = current_size - 1; j >= 0; j--) {
            graycode_list.push_back("1" + graycode_list[j]);

}

for (int j = 0; j < current_size; j++) {

———————————————————————— // 在此处填入代码
        }
    }

return graycode_list;
}`),
      19: q(8, `using namespace std;

class base {
public:
    virtual void show() {
        cout << "base class" << endl;
    }
};

class derived : public base {
public:

void show() override {
        cout << "derived class" << endl;
    }
};

int main() {
    base* b;
    derived d;
    b = &d;

b->show();
    return 0;
}`),
    },
  },
  '2024-12-l1': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      7: q(2, `int N, nowDay, afterDays;

cout << "今天星期几？" <<endl;
cin >> nowDay;

cout << "求几天后星期几？"<< endl;
cin >>afterDays;

N = nowDay+afterDays;

if(
)

printf("星期天");
else

printf("星期%d", N%7);`),
      8: q(2, `int N=0,i;
for (i = 1; i < 10; i++)

N += 1;

cout << (N + i);`),
      9: q(3, `int tnt = 0;
for (i = 0; i < 100; i++)

tnt += i % 10;

cout << tnt;`),
      10: q(3, `int N=0,i;
int tnt = 0;

for (i = 5; i < 100; i+=5){

if (i % 2 == 0)

continue;
tnt += 1;

if (i >= 50)

break;
}

cout << tnt;`),
      12: q(4, `int cnt;

cnt = 0;
for(int i = 1; i < 10; i++)

cnt += i++;

cout << cnt;

cout << endl;`),
      19: q(5, `int N = 0;
for (int i = 0; i < 10; i++){

continue;

N += 1;
}

cout << N;`),
      20: q(5, `int i;
for (i = 0; i <= 100; i++)

continue;

cout << i;`),
      21: q(5, `for (int i = 0; i < 10; i+=3)

cout << i;
//L2`),
    },
  },
  '2024-12-l4': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      5: q(2, `int x = 20;
int* p = &x;
*p = *p + 2；`),
      13: q(5, `void insertion_sort(vector<int> &nums) {
    for (int i = 1; i < nums.size(); i++) {

________________________________ {    // 在此处填入代码

while (j >= 0 && nums[j] > base)

nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = base;
    }
}`),
    },
  },
  '2025-03-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      10: q(4, `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // 基准值
    int i = low - 1;

for (int j = low; j < high; j++) {
        ________________________________       // 在此处填入代码
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;

}

// 快速排序
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);

quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`),
    },
  },
  '2025-03-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      10: q(4, `int countLeafNodes(TreeNode* root) {
    if (root == nullptr) return 0;

stack<TreeNode*> s;

s.push(root);
    int count = 0;
    while (!s.empty()) {
        TreeNode* node = s.top();
        s.pop();

if (node->left == nullptr && node->right == nullptr) {
            count++;
        }

if (node->right) s.push(node->right);

———————————————————————— // 在此处填入代码
    }
    return count;
}`),
    },
  },
  '2025-06-l1': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      18: q(5, `int i;
for (i = 0; i < 10; i++){
    continue;
    cout << i << "#";
    break;
}
if (i >= 10)
    cout << "END";`),
      19: q(5, `int i;
for (i = 0; i < 10; i++){
    if (i % 2 == 0){
        cout << i << "#";
        continue;
    }
}
if (i >= 10)
    cout << "END";`),
      20: q(5, `int cnt = 0;
for (int i = 0; i < 100; i = i + 1)
    cnt += 1;
cout << cnt;`),
      21: q(6, `int i, cnt = 0;
cnt = 0;
while (i < 10){
    i += 2;
    cnt += 1;
}
cout << cnt;`),
      22: q(6, `int cnt;
for (int i = 0; i < 10; i++)
    cnt += 1;
cout << cnt;`),
    },
  },
  '2025-06-l4': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      17: q(5, `void foo(int x) {
    x += 5;
}
int main() {
    int a = 10;
    foo(a);
    cout << a << endl;
}`),
    },
  },
  '2025-06-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      11: q(6, `int binary_search_last_occurrence(const vector<int>& lst, int target) {
    if (lst.empty()) return -1;

int low = 0, high = lst.size() - 1;

while (low < high) {
        int mid = (low + high + 1) / 2;
        if (lst[mid] <= target) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }

if (lst[low] == target)
        return low;
    else
        return -1;
}`),
    },
  },
  '2025-06-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      13: q(5, `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

void insert(TreeNode*& root, int key) {
    if (!root) {
        root = new TreeNode(key);
        return;
    }
    _______________________________
}`),
    },
  },
  '2025-09-l1': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      9: q(2, `int N = 0, i;
for (i = -100; i < 100; i++)
    N += i % 10;
cout << N;`),
      18: q(5, `for (i = 0; i < 10; i++)
    break;
cout << i;`),
      19: q(5, `for (int i = 0; i > -10; i--)
    n = n + i * -1;
cout << n;`),
      21: q(6, `int n, i;
n = i = 0;
while (i < 10){
    n += i;
    i += 1;
}
cout << n;`),
      22: q(6, `int n, i;
n = i = 0;
while (i < 10){
    i += 1;
    n += i;
}
cout << n;`),
      24: q(6, `int count = 0;
while (count < 5){
    count += 1;
    if (count == 3)
        continue;
    cout << count << ' ';
}`),
    },
  },
  '2025-12-l3': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B412%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      3: q(1, `int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 8>>2)
            continue;
        sum += i;
    }
}`),
    },
  },
  '2025-12-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B412%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      2: q(2, `struct Block {
    int index;          // 区块编号（高度）
    string data;        // 区块里保存的数据
    Block* prev;        // 指向前一个区块

Block(int idx, const string& d, Block* p) : index(idx), data(d), prev(p) {}
};

// 区块链
struct Blockchain {
    Block* tail;

// 初始化
    void init() {
        tail = new Block(0, "Genesis Block", nullptr);
    }

// 插入新区块
    void addBlock(const string& data) {
        _______________________     //在此处填入代码
    }

// 释放内存
    void clear() {
        Block* cur = tail;
        while (cur != nullptr) {
            Block* p = cur->prev;
            delete cur;
            cur = p;
        }
        tail = nullptr;
    }
};`),
    },
  },
  '2026-03-l5': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B43%E6%9C%88-C%2B%2B5%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      5: q(2, `vector<int> euler_sieve(int n) {
    vector<bool> is_composite(n + 1, false);
    vector<int>  primes;

for (int i = 2; i <= n; i++) {
        if (!is_composite[i])
            primes.push_back(i);

for (int j = 0; __________________________ && (long long)i * primes[j] <= n; j++) {
            is_composite[i * primes[j]] = true;

if (i % primes[j] == 0)
                break;
        }
    }
    return primes;
}`),
    },
  },
  '2026-03-l6': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B43%E6%9C%88-C%2B%2B6%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      4: q(3, `const int MAX = 5;
int queue[MAX];
int front = 0, rear = 0;

// 入队
void enqueue(int x) {
    queue[rear] = x;
    rear = (rear + 1) % MAX;
}
// 出队
void dequeue() {
    front = (front + 1) % MAX;
}

int main() {
    enqueue(1); enqueue(2); enqueue(3); enqueue(4);
    dequeue(); dequeue();
    enqueue(5); enqueue(6);
}`),
    },
  },
  '2026-03-l8': {
    sourceUrl: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf',
    reviewedAt: '2026-08-25',
    questions: {
      11: q(3, `void floyd(int n, int dist[][MAXN]) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (__________) // 在此处填入选项
                    dist[i][j] = dist[i][k] + dist[k][j];
}`),
      13: q(3, `int prim(vector<vector<int>>& graph, int n) {
    vector<bool> inMST(n, false);
    vector<int> minEdge(n, INT_MAX);
    minEdge[0] = 0;
    int result = 0;
    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 0; j < n; j++)
            if (!inMST[j] && (u == -1 || minEdge[j] < minEdge[u]))
                u = j;
        inMST[u] = true;
        result += minEdge[u];
        for (int v = 0; v < n; v++)
            if (__________) // 在此处填入选项
                minEdge[v] = graph[u][v];
    }
    return result;
}`),
    },
  },
};
