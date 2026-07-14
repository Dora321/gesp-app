import { q } from '../verifiedQuestionCorrectionHelpers.js';

export const verifiedCorrectionsPart2 = {
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
'2025-09-l8': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1703973115396128.pdf',
    questions: {
      17: q(6, `int n = 5;
int arr[n] = {1, 2, 3};
std::cout << arr[5];`),
    },
  }
};
