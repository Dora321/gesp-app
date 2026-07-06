const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-06';

const q = (sourcePage, code) => ({ sourcePage, code });

export const verifiedQuestionCorrections = {
  '2023-09-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1570611325304864.pdf',
    questions: {
      4: q(2, `// sumA() 和 sumB() 用于求从 1 到 N 之和
#include <iostream>
using namespace std;
int sumA(int n) {
    int sum = 0;
    for (int i = 1; i < n + 1; i++)
        sum += i;
    return sum;
}
int sumB(int n) {
    if (n == 1)
        return 1;
    else
        return n + sumB(n - 1);
}
int main() {
    int n = 0;
    cin >> n;
    cout << sumA(n) << " " << sumB(n) << endl;
    return 0;
}`),
      5: q(2, `// 字符串反序
#include <iostream>
#include <string>
using namespace std;
string sReverse(string sIn) {
    if (sIn.length() <= 1) {
        return sIn;
    } else {
        return ________; // 此处填写代码
    }
}
int main() {
    string sIn;
    cin >> sIn;
    cout << sReverse(sIn) << endl;
    return 0;
}`),
      6: q(3, `#include <iostream>
using namespace std;
// 递归实现汉诺塔，将 N 个圆盘从 A 通过 B 移到 C
// 圆盘从底到顶，半径必须从大到小
void Hanoi(string A, string B, string C, int N) {
    if (N == 1) {
        cout << A << " -> " << C << endl;
    } else {
        Hanoi(A, C, B, N - 1);
        cout << A << " -> " << C << endl;
        ________; // 此处填写代码
    }
}
int main() {
    Hanoi("甲", "乙", "丙", 3);
    return 0;
}`),
      7: q(4, `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isOdd(int N) {
    return N % 2 == 1;
}
bool compare(int a, int b) {
    if (a % 2 == 0 && b % 2 == 1)
        return true;
    return false;
}
int main() {
    vector<int> lstA;
    for (int i = 1; i < 100; i++)
        lstA.push_back(i);
    sort(lstA.begin(), lstA.end(), ________); // 此处填写代码 1

    vector<int> lstB;
    for (int i = 0; i < lstA.size(); i++)
        if (________) // 此处填写代码 2
            lstB.push_back(lstA[i]);

    cout << "lstA: ";
    for (int i = 0; i < lstA.size(); i++) cout << lstA[i] << " ";
    cout << endl;
    cout << "lstB: ";
    for (int i = 0; i < lstB.size(); i++) cout << lstB[i] << " ";
    cout << endl;
    return 0;
}`),
      10: q(6, `#include <iostream>
using namespace std;

int jumpFloor(int N) {
    cout << N << "#";
    if (N == 1 || N == 2) {
        return N;
    } else {
        return jumpFloor(N - 1) + jumpFloor(N - 2);
    }
}
int main() {
    cout << jumpFloor(4) << endl;
    return 0;
}`),
      15: q(9, `#include <iostream>

class Node {
public:
    int Value;
    Node * Next;

    Node(int Val, Node * Nxt = nullptr) {
        Value = Val;
        Next = Nxt;
    }
};

int main() {
    Node * firstNode = new Node(10);
    firstNode->Next = new Node(100);
    firstNode->Next->Next = new Node(111, firstNode);
    return 0;
}`),
      25: q(10, `#include <iostream>
#include <algorithm>
using namespace std;

bool compareModulo5(int a, int b) {
    return a % 5 < b % 5;
}
int main() {
    int lst[7];
    for (int i = 0; i < 7; i++)
        lst[i] = i;
    sort(lst, lst + 7, compareModulo5);
    for (int i = 0; i < 7; i++)
        cout << lst[i] << " ";
    cout << endl;
    return 0;
}`),
    },
  },
  '2023-12-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1599969567965216.pdf',
    questions: {
      2: q(1, `void mergeSort(int SList[], int TList[], int s, int t, int len)
{
    if (s == t) {
        TList[s] = SList[s];
        return;
    }
    int *T2 = new int[len]; // 保存中间结果
    int m = (s + t) / 2;
    ________________________________________________;
    merge(T2, SList, s, m, t);
    delete T2;
    return;
}`),
      3: q(2, `int stepCount = 0;
int fracA(int N)
{
    stepCount += 1;
    cout << stepCount << "->";
    int rtn = 1;
    for (int i = 1; i <= N; i++)
        rtn *= i;
    return rtn;
}
int fracB(int N)
{
    stepCount += 1;
    cout << stepCount << "->";
    if (N == 1)
        return 1;
    return N * fracB(N - 1);
}
int main()
{
    cout << fracA(5);
    cout << "<===>";
    cout << fracB(5);
    return 0;
}`),
      6: q(4, `int rc;
int foo(int x, int y)
{
    int r;
    if (y == 0)
        r = x;
    else {
        r = foo(y, x % y);
        rc++;
    }
    return r;
}`),
      7: q(4, `vector<int> operator + (vector<int> lA, vector<int> lB)
{
    vector<int> lst;
    for (int i = 1; i < lA.size(); i++)
        lst.push_back(lA[i]);
    for (int i = 1; i < lB.size(); i++)
        lst.push_back(lB[i]);
    return lst;
}

vector<int> qSort(vector<int> lst)
{
    if (lst.size() < 2) return lst;
    int pivot = lst[0];
    vector<int> less, greater;
    for (int i = 1; i < lst.size(); i++)
        if (lst[i] <= pivot) less.push_back(lst[i]);
        else greater.push_back(lst[i]);
    return __________________________________________;
}`),
      9: q(5, `int _binarySearch(vector<int> lst, int Low, int High, int Target)
{
    if (Low > High) return -1;
    int Mid = (Low + High) / 2;
    if (Target == lst[Mid]) return Mid;
    else if (Target < lst[Mid])
        return _binarySearch(lst, Low, Mid - 1, Target);
    else
        return _binarySearch(lst, Mid + 1, High, Target);
}
int bSearch(vector<int> lst, int Val)
{
    return _binarySearch(lst, 0, lst.size(), Val);
}`),
      12: q(6, `class Node
{
public:
    int Value;
    Node* Prev;
    Node* Next;
    Node(int Val, Node* Prv = NULL, Node* Nxt = NULL);
};

Node::Node(int Val, Node* Prv, Node* Nxt)
{
    this->Value = Val;
    this->Prev = Prv;
    this->Next = Nxt;
}

int main()
{
    Node firstNode = Node(10);
    firstNode.Next = new Node(100, &firstNode);
    firstNode.Next->Next = new Node(111, firstNode.Next);
}`),
      22: q(7, `char s[10];
int main()
{
    int N;
    cin >> N;
    string rst = "";
    while (N != 0)
    {
        s[0] = N % 8 + '0';
        rst += string(s);
        N /= 8;
    }
    cout << rst << endl;
    return 0;
}`),
    },
  },
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
  '2025-09-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1704013600915488.pdf',
    questions: {
      5: q(3, `int gcd0(int a, int b) {
    if (a < b) swap(a, b);
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return ______;
}`),
      12: q(5, `void merge(vector<int>& nums, int left, int mid, int right) {
    vector<int> tmp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (nums[i] <= nums[j]) tmp[k++] = nums[i++];
        else tmp[k++] = nums[j++];
    }
    while (i <= mid) tmp[k++] = nums[i++];
    while (________) {
        tmp[k++] = nums[j++];
    }
    for (k = 0; k < tmp.size(); k++) nums[left + k] = tmp[k];
}

void mergeSort(vector<int>& nums, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(nums, left, mid);
    mergeSort(nums, mid + 1, right);
    merge(nums, left, mid, right);
}`),
      14: q(7, `int crossSum(vector<int>& nums, int left, int mid, int right) {
    int leftSum = INT_MIN, rightSum = INT_MIN;
    int sum = 0;
    for (int i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = max(leftSum, sum);
    }
    sum = 0;
    for (int i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = max(rightSum, sum);
    }
    return leftSum + rightSum;
}
int helper(vector<int>& nums, int left, int right) {
    if (left == right) return nums[left];
    int mid = left + (right - left) / 2;
    int leftMax = helper(nums, left, mid);
    int rightMax = helper(nums, mid + 1, right);
    int crossMax = crossSum(nums, left, mid, right);
    return max({leftMax, rightMax, crossMax});
}
int maxSubArray(vector<int>& nums) {
    return helper(nums, 0, nums.size() - 1);
}`),
      15: q(7, `vector<int> plusOne(vector<int>& digits) {
    for (int i = (int)digits.size() - 1; i >= 0; --i) {
        if (digits[i] < 9) {
            digits[i] += 1;
            return digits;
        }
        ________________ // 在此处填入代码
    }
    digits.insert(digits.begin(), 1);
    return digits;
}`),
    },
  },
  '2025-12-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1727912539586592.pdf',
    questions: {
      5: q(4, `int gcd1(int a, int b) {
    return b == 0 ? a : gcd1(b, a % b);
}
int gcd2(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`),
      9: q(5, `void merge(vector<int>& arr, vector<int>& temp, int l, int mid, int r) {
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= r) temp[k++] = arr[j++];
    for (int p = l; p <= r; p++) arr[p] = temp[p];
}
void mergeSort(vector<int>& arr, vector<int>& temp, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, temp, l, mid);
    mergeSort(arr, temp, mid + 1, r);
    merge(arr, temp, l, mid, r);
}`),
      15: q(8, `vector<int> add(vector<int> a, vector<int> b) {
    vector<int> c;
    int carry = 0;
    for (int i = 0; i < a.size() || i < b.size(); i++) {
        if (i < a.size()) carry += a[i];
        if (i < b.size()) carry += b[i];
        _______________________ // 在此处填入代码
    }
    if (carry) c.push_back(carry);
    return c;
}`),
    },
  },
  '2026-03-l5': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734457367199776.pdf',
    questions: {
      4: q(2, `int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}`),
    },
  },
  '2024-03-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1602047203868704.pdf',
    questions: {
      5: q(2, `TreeNode* search(TreeNode* root, int target) {
    if (root == NULL || root->val == target) {
        return root;
    }
    if (_______________) {
        return search(root->left, target);
    } else {
        return search(root->right, target);
    }
}`),
      14: q(4, `int gcd(int a, int b) {
    while (b != 0) {
        ______________________
    }
    return a;
}`),
    },
  },
  '2024-06-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1621071589539872.pdf',
    questions: {
      12: q(6, `int jump_recur(int n) {
    if (n == 1) return 1;
    if (n == 2) return 2;
    return jump_recur(n - 1) + jump_recur(n - 2);
}
int jump_dp(int n) {
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`),
    },
  },
  '2024-09-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1633836295258144.pdf',
    questions: {
      4: q(2, `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool is_valid(string s) {
    stack<char> st;
    char top;
    for (char& ch : s) {
        if (ch == '(' || ch == '{' || ch == '[') {
            st.push(ch);
        } else {
            if (st.empty()) return false;
            ________________________ // 在此处填入代码
            if ((ch == ')' && top != '(') ||
                (ch == '}' && top != '{') ||
                (ch == ']' && top != '[')) {
                return false;
            }
        }
    }
    return st.empty();
}`),
      13: q(7, `#include <iostream>
using namespace std;

// 遍历二叉搜索树，输出结点值
void traversal(tree_node* root) {
    if (root == nullptr) return;
    traversal(root->left);
    cout << root->val << " ";
    traversal(root->right);
}`),
    },
  },
  '2024-12-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1733580036243488.pdf',
    questions: {
      12: q(5, `#include <queue>
void bfs(TreeNode* root) {
    if (root == NULL) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        ________________________ // 在此处填入代码
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}`),
    },
  },
  '2025-03-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1669256961851424.pdf',
    questions: {
      12: q(5, `vector<string> generateGrayCode(int n) {
    if (n == 0) return {"0"};
    if (n == 1) return {"0", "1"};
    vector<string> prev = generateGrayCode(n - 1);
    vector<string> result;
    for (string s : prev) {
        result.push_back("0" + s);
    }
    for (int i = prev.size() - 1; i >= 0; i--) {
        ________________________ // 在此处填入代码
    }
    return result;
}`),
      14: q(6, `bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    return ________________; // 在此处填入代码
}`),
      15: q(6, `class Shape {
protected:
    string name;
public:
    Shape(const string& n) : name(n) {}
    virtual double area() const { return 0.0; }
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(const string& n, double r) : Shape(n), radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
private:
    double width;
    double height;
public:
    Rectangle(const string& n, double w, double h)
        : Shape(n), width(w), height(h) {}
    double area() const override { return width * height; }
};

int main() {
    Circle circle("MyCircle", 5.0);
    Rectangle rectangle("MyRectangle", 4.0, 6.0);
    Shape* shapePtr = &circle;
    cout << "Area: " << shapePtr->area() << endl;
    shapePtr = &rectangle;
    cout << "Area: " << shapePtr->area() << endl;
    return 0;
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
  '2025-09-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1703973079744544.pdf',
    questions: {
      3: q(2, `class Vehicle {
private:
    string brand;
public:
    Vehicle(string b) : brand(b) {}
    void setBrand(const string& b) { brand = b; }
    string getBrand() const { return brand; }
    virtual void move() const {
        cout << brand << " is moving..." << endl;
    }
};

class Car : public Vehicle {
private:
    int seatCount;
public:
    Car(string b, int seats) : Vehicle(b), seatCount(seats) {}
    void showInfo() const {
        cout << "This car is a " << getBrand()
             << " with " << seatCount << " seats." << endl;
    }
    void move() const override {
        cout << getBrand() << " car is driving on the road!" << endl;
    }
};

class Bike : public Vehicle {
public:
    Bike(string b) : Vehicle(b) {}
    void move() const override {
        cout << getBrand() << " bike is cycling on the path!" << endl;
    }
};

int main() {
    Vehicle* v1 = new Car("Toyota", 5);
    Vehicle* v2 = new Bike("Giant");
    v1->move();
    v2->move();
    delete v1;
    delete v2;
    return 0;
}`),
      10: q(4, `vector<string> grayCode(int n) {
    if (n == 0) return {"0"};
    if (n == 1) return {"0", "1"};
    vector<string> prev = grayCode(n - 1);
    vector<string> result;
    for (string s : prev) {
        result.push_back("0" + s);
    }
    for (_______________) { // 在此处填写代码
        result.push_back("1" + prev[i]);
    }
    return result;
}`),
      11: q(4, `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

void dfs(TreeNode* root) {
    if (!root) return;
    ______<TreeNode*> temp; // 在此处填写代码
    temp.push(root);
    while (!temp.empty()) {
        TreeNode* node = temp.top();
        temp.pop();
        cout << node->val << " ";
        if (node->right) temp.push(node->right);
        if (node->left) temp.push(node->left);
    }
}`),
      22: q(6, `//     1
//    / \\
//   2   3
//  / \\   \\
// 4   5   6
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorderIterative(TreeNode* root) {
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) {
            st.push(curr);
            curr = curr->left;
        }
        curr = st.top();
        st.pop();
        cout << curr->val << " ";
        curr = curr->right;
    }
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
  '2026-03-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1738426015547424.pdf',
    questions: {
      2: q(1, `class Shape {
public:
    virtual void draw() { cout << "绘制图形" << endl; }
    virtual ~Shape() {}
};
class Circle : public Shape {
public:
    void draw() override { cout << "绘制圆形" << endl; }
};
class Rectangle : public Shape {
public:
    void draw() override { cout << "绘制矩形" << endl; }
};
int main() {
    Shape* s1 = new Circle();
    Shape* s2 = new Rectangle();
    s1->draw();
    s2->draw();
    delete s1;
    delete s2;
    return 0;
}`),
      3: q(2, `class Pet {
public:
    Pet(string n, int a) : name(n), age(a) {}
    string getName() { return name; }
    void birthday() { age++; }
private:
    string name;
    int age;
};
int main() {
    Pet cat("奶茶", 2);
    cout << cat.getName(); // ①
    cat.birthday();        // ②
    cat.name = "大橘";     // ③
    cout << cat.getName(); // ④
}`),
      8: {
        sourcePage: 4,
        question: '下列关于树的遍历的说法中，正确的一项是（ ）。',
        options: [
          '对任意一棵树进行深度优先遍历，所得序列一定唯一。',
          '已知一棵二叉树的先序遍历和后序遍历序列，可以唯一确定这棵二叉树。',
          '已知一棵二叉树的先序遍历和中序遍历序列，可以唯一确定这棵二叉树。',
          '已知一棵二叉树的先序遍历序列，可以唯一确定这棵二叉树。',
        ],
        answer: 2,
      },
    },
  },
  '2023-09-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1718304913752096.pdf',
    questions: {
      8: q(3, `#include <iostream>
using namespace std;

class ManyData {
    int * __data;
    int head, tail, capacity;
public:
    ManyData(int cap) {
        capacity = cap;
        __data = new int[capacity];
        head = tail = 0;
    }
    void push(int val) {
        __data[tail++] = val;
    }
    int pop() {
        return __data[--tail];
    }
    int size() {
        return tail - head;
    }
};
int main() {
    auto myData = ManyData(100);
    myData.push(1);
    myData.push(2);
    myData.push(3);
    myData.push(100);
    cout << myData.size() << endl;
    cout << myData.pop() << endl;
    return 0;
}`),
    },
  },
  '2023-12-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1584918408724512.pdf',
    questions: {
      2: q(1, `class Rectangle
{
private:
    class Point
    {
    public:
        double x;
        double y;
    };
    Point a, b, c, d;
    double length;
    double width;
public:
    // ...
};`),
      3: q(2, `using namespace std;
class newClass
{
public:
    static int objCounter;
};
int newClass::objCounter = 2;
int main()
{
    newClass classA;
    newClass classB;
    cout << newClass::objCounter << endl;
    cout << classB.objCounter << endl;
}`),
      4: q(2, `struct BiNode {
    char data;
    BiNode* lchid, *rchid;
};
class BiTree {
private:
    BiNode* Creat();
    void Release(BiNode* bt);
    BiNode* root;
public:
    BiTree() {
        root = Creat();
    }
    ~BiTree() {
        Release(root);
    }
};`),
      6: q(3, `void Order(BiNode* bt) {
    if (bt == nullptr)
        return;
    else {
        cout << bt->data;
        Order(bt->lchid);
        Order(bt->rchid);
    }
}`),
      7: q(3, `typedef struct LinkList {
    int data;
    LinkList* next;
    LinkList* prev;
} LinkList, LinkNode;

bool ListInit(LinkList* &L) {
    L = new LinkNode;
    if (!L) return false;
    L->next = NULL;
    L->prev = NULL;
    L->data = -1;
    return true;
}`),
      10: q(4, `int Depth(BiTree T)
{
    if (T == NULL) {
        return 0;
    } else {
        int m = Depth(T->lchild);
        int n = Depth(T->rchild);
        if (m > n) {
            return m + 1;
        } else {
            return n + 1;
        }
    }
}`),
    },
  },
  '2024-06-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1621071620997152.pdf',
    questions: {
      1: q(1, `#include <iostream>
#include <cmath>
using namespace std;
int main() {
    cout << sin(3.1415926 / 2);
    return 0;
}`),
    },
  },
  '2024-09-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1633836324618272.pdf',
    questions: {
      1: q(1, `#include <iostream>
using namespace std;
int main() {
    char a = 'b';
    a++;
    cout << a;
    return 0;
}`),
    },
  },
  '2024-12-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1650239779897376.pdf',
    questions: {
      1: q(1, `#include <iostream>
using namespace std;
int main() {
    char a = 'b';
    cout << a + 1;
    return 0;
}`),
    },
  },
  '2025-03-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1669256997503008.pdf',
    questions: {
      2: q(1, `int main() {
    int a = 5, b = 2;
    cout << (a >> b) << endl;
}`),
      3: q(1, `int main() {
    int a = 10;
    int *p = &a;
    int *&q = p;
    *q = 20;
    cout << a << endl;
    return 0;
}`),
      4: q(2, `int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p = arr + 2;
    cout << *p << endl;
    return 0;
}`),
    },
  },
  '2025-06-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf',
    questions: {
      1: q(1, `#include <iostream>
using namespace std;
int main() {
    char a = 'b' ^ 4;
    cout << a;
    return 0;
}`),
    },
  },
  '2025-09-l7': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1703973098618912.pdf',
    questions: {
      1: q(1, `#include <iostream>
using namespace std;
int main() {
    char a = 'b' + 1;
    cout << a;
    return 0;
}`),
    },
  },
  '2025-09-l8': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1703973115396128.pdf',
    questions: {
      17: q(6, `int n = 5;
int arr[n] = {1, 2, 3};
std::cout << arr[5];`),
    },
  },
};

export function applyVerifiedQuestionCorrections(paper) {
  const correction = paper && verifiedQuestionCorrections[paper.id];
  if (!correction) return paper;

  const questions = (paper.questions || []).map((question) => {
    const verified = correction.questions[question.id];
    if (!verified) return question;
    return {
      ...question,
      ...verified,
      requiresCode: typeof verified.code === 'string',
      sourceVerified: true,
      reviewedBy: REVIEWED_BY,
      reviewedAt: REVIEWED_AT,
    };
  });

  return {
    ...paper,
    source: {
      ...paper.source,
      officialPdf: correction.sourceUrl,
    },
    verification: {
      status: 'partial',
      reviewedBy: REVIEWED_BY,
      reviewedAt: REVIEWED_AT,
      scope: '疑似缺失代码题已对照官方 PDF 校订。',
    },
    questions,
  };
}
