import { q } from '../verifiedQuestionCorrectionHelpers.js';

export const verifiedCorrectionsPart1 = {
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
    },
  },
'2024-09-l6': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1633836295258144.pdf',
    reviewedAt: '2026-07-10',
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
      10: q(4, `// 定义二叉树的结点结构
struct tree_node {
    int val;
    tree_node* left;
    tree_node* right;
    tree_node(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 计算二叉树的深度
int max_depth(tree_node* root) {
    if (root == nullptr) {
        return 0;
    }
    int left_depth = max_depth(root->left);
    int right_depth = max_depth(root->right);
    ______________________________ // 在此处填入代码
}`),
      11: q(5, `#include <queue>

int max_depth_bfs(tree_node* root) {
    if (root == nullptr) {
        return 0;
    }

    queue<tree_node*> q;
    q.push(root);
    int depth = 0;

    while (!q.empty()) {
        ______________________________ // 在此处填入代码
        for (int i = 0; i < level_size; ++i) {
            tree_node* node = q.front();
            q.pop();
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return depth;
}`),
      12: q(6, `// 定义二叉树的结点结构
struct tree_node {
    int val;
    tree_node* left;
    tree_node* right;
    tree_node(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 插入结点到二叉搜索树中
tree_node* insert(tree_node* root, int val) {
    if (root == nullptr) {
        return new tree_node(val);
    }
    ______________________________ // 在此处填入代码
    return root;
}

// 根据给定数组构造二叉搜索树
tree_node* constructBST(const int arr[], int size) {
    tree_node* root = nullptr;
    for (int i = 0; i < size; ++i) {
        root = insert(root, arr[i]);
    }
    return root;
}`, {
        question: '二叉搜索树中的每个结点，其左子树的所有结点值都小于该结点值，右子树的所有结点值都大于该结点值。以下代码对给定的整数数组（假设数组中没有数值相等的元素）构造二叉搜索树，横线处应填写（ ）。',
        options: [
          'if (val < root->val) root->left = insert(root->left, val); else root->right = insert(root->right, val);',
          'if (val > root->val) root->left = insert(root->left, val); else root->right = insert(root->right, val);',
          'if (val < root->val) root->left = insert(root, val); else root->right = insert(root, val);',
          'if (val > root->val) root->left = insert(root, val); else root->right = insert(root, val);',
        ],
        answer: 0,
        explanation: `**答案：A**

**解析：**
二叉搜索树插入时，待插入值比当前结点小就递归进入左子树，否则进入右子树；递归返回的新子树根结点必须重新接回当前结点。

- A：左右方向和递归参数都正确。
- B：把较大的值插入左子树，破坏二叉搜索树性质。
- C、D：递归时仍传入当前根结点，无法向子树推进，会造成无限递归。

**考点：** 二叉搜索树的递归插入。`,
      }),
      13: q(7, `#include <iostream>
using namespace std;

// 遍历二叉搜索树，输出结点值
void traversal(tree_node* root) {
    if (root == nullptr) return;
    traversal(root->left);
    cout << root->val << " ";
    traversal(root->right);
}`, {
        question: '对上题中的二叉搜索树，当输入数组为 [5, 3, 7, 2, 4, 6, 8] 时，构建二叉搜索树并采用如下遍历方式，得到的输出是（ ）。',
        options: [
          '5 3 7 2 4 6 8',
          '2 3 4 5 6 7 8',
          '2 4 3 6 8 7 5',
          '2 4 3 5 6 7 8',
        ],
        answer: 1,
        explanation: `**答案：B**

**解析：**
代码按照“左子树 → 根结点 → 右子树”的顺序遍历，这是二叉搜索树的中序遍历。二叉搜索树的中序遍历结果按结点值递增，因此输出为 \`2 3 4 5 6 7 8\`。

**考点：** 二叉搜索树的中序遍历。`,
      }),
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
  }
};
