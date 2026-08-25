import { q } from './verifiedQuestionCorrectionHelpers.js';
import { verifiedCorrectionsPart1 } from './verified-corrections/part1.js';
import { verifiedCorrectionsPart2 } from './verified-corrections/part2.js';
import { verifiedCorrectionsPart3 } from './verified-corrections/part3.js';
import { verifiedCorrectionsPart4 } from './verified-corrections/part4.js';

const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-06';

const mergeVerifiedCorrections = (...parts) => parts.reduce((merged, part) => {
  for (const [paperId, correction] of Object.entries(part)) {
    const current = merged[paperId] || {};
    merged[paperId] = {
      ...current,
      ...correction,
      questions: {
        ...(current.questions || {}),
        ...(correction.questions || {}),
      },
    };
  }
  return merged;
}, {});

export const verifiedQuestionCorrections = mergeVerifiedCorrections(
  verifiedCorrectionsPart1,
  verifiedCorrectionsPart2,
  verifiedCorrectionsPart3,
  verifiedCorrectionsPart4,
);

const CONTENT_AUDIT_REVIEWED_AT = '2026-07-14';

const addVerifiedQuestionCorrections = (paperId, sourceUrl, questions) => {
  const current = verifiedQuestionCorrections[paperId] || {};
  verifiedQuestionCorrections[paperId] = {
    ...current,
    sourceUrl,
    reviewedAt: CONTENT_AUDIT_REVIEWED_AT,
    questions: {
      ...(current.questions || {}),
      ...questions,
    },
  };
};

// Corrections from the 2026-07 content audit of code-dependent questions.
addVerifiedQuestionCorrections(
  '2023-12-l5',
  'https://gesp.ccf.org.cn/101/attach/1599969567965216.pdf',
  {
    5: q(3, `typedef struct Node {
    string str;
    int ref;
    struct Node *next, *prev;
} Node;

Node *Insert(Node *pHead, string s)
{
    Node *p = pHead->next;
    Node *q;
    while (p) {
        if (p->str == s) {
            p->ref++;
            p->next->prev = p->prev;
            p->prev->next = p->next;
            break;
        }
        p = p->next;
    }
    if (!p) {
        p = new Node;
        p->str = s;
        p->ref = 0;
        p->next = p->prev = NULL;
    }
    __________________________________________
    pHead->next = p, p->prev = pHead;
    return pHead;
}`, {
      question: '下面的 C++ 代码用于将字符串保存到带头节点的双向链表中，并对重复的串计数，然后将最新访问的串的节点放在链头便于查找。横线处应填入代码是（ ）。',
      options: [
        'if (pHead) { p->next = pHead->next; pHead->next->prev = p; }',
        'if (pHead->next) { p->next = pHead->next; pHead->next->prev = p; }',
        'p->next = pHead->next; pHead->next->prev = p;',
        '触发异常，不能对空指针进行操作。',
      ],
      answer: 1,
      explanation: '应先判断原链表的第一个数据节点是否存在；存在时把它接到 p 后并更新其 prev，再把 p 接到头节点之后。',
      tags: ['双向链表'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2024-03-l5',
  'https://gesp.ccf.org.cn/101/attach/1602047172411424.pdf',
  {
    4: q(2, `void deleteNode(DoublyListNode*& head, int value) {
    DoublyListNode* current = head;
    while (current != nullptr && current->val != value) {
        current = current->next;
    }
    if (current != nullptr) {
        if (current->prev != nullptr) {
            __________________________________ // 在此处填入代码
        } else {
            head = current->next;
        }
        if (current->next != nullptr) {
            current->next->prev = current->prev;
        }
        delete current;
    }
}`, {
      answer: 1,
      explanation: '删除中间节点时，前驱节点的 next 应越过 current，指向 current->next。',
      tags: ['双向链表'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2025-06-l5',
  'https://gesp.ccf.org.cn/101/attach/1749477555699744.pdf',
  {
    6: q(4, `int gcd0(int big, int small) {
    if (big < small) {
        swap(big, small);
    }
    if (big % small == 0) {
        return small;
    }
    return gcd0(small, big % small);
}

int gcd1(int big, int small) {
    if (big < small) {
        swap(big, small);
    }
    for (int i = small; i >= 1; --i) {
        if (big % i == 0 && small % i == 0)
            return i;
    }
    return 1;
}`, {
      question: '下列 C++ 代码用两种方式求解两个正整数的最大公约数，说法错误的是（ ）。',
      options: [
        'gcd0() 函数的时间复杂度为 O(log n)',
        'gcd1() 函数的时间复杂度为 O(n)',
        '一般说来，gcd0() 的效率高于 gcd1()',
        'gcd1() 中的代码 for (int i = small; i >= 1; --i) 应该修改为 for (int i = small; i > 1; --i)',
      ],
      answer: 3,
      explanation: '两个正整数的最大公约数可能为 1，因此 gcd1 的循环必须检查 i == 1，D 项修改会漏掉互质情况。',
      tags: ['最大公约数', '时间复杂度'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2025-12-l5',
  'https://gesp.ccf.org.cn/101/attach/1727912539586592.pdf',
  {
    7: q(4, `vector<int> linear_sieve(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;

    is_prime[0] = is_prime[1] = 0;
    for (int i = 2; i <= n; ++i) {
        if (is_prime[i]) {
            primes.push_back(i);
        }
        __________________________________________ {
            is_prime[i * primes[j]] = 0;
            if (i % primes[j] == 0)
                break;
        }
    }

    return primes;
}`, {
      options: [
        'for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)',
        'for (int j = sqrt(n); j <= n && i * primes[j] <= n; j++)',
        'for (int j = 1; j <= sqrt(n); j++)',
        'for (int j = 1; j < n && i * primes[j] <= n; j++)',
      ],
      answer: 0,
      explanation: '线性筛应从 primes[0] 开始枚举，并同时限制质数下标与乘积不越界。',
      tags: ['线性筛', '质数'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2023-09-l6',
  'https://gesp.ccf.org.cn/101/attach/1718304913752096.pdf',
  {
    5: q(2, `#include <iostream>
#include <string>
using namespace std;

class MyStr {
    string data;
public:
    MyStr(string _data): data(_data) {}
};

int main() {
    MyStr st("ABC");
    cout << st << endl;
    return 0;
}`, {
      options: [
        '代码 cout << st << endl; 会报错，因为没有为 MyStr 类重载 << 运算符。',
        '第 6 行代码的 data 是 MyStr 类的成员变量。',
        '代码 MyStr st("ABC"); 不会报错，将执行构造函数。',
        '代码 cout << st.data << endl; 可输出 ABC。',
      ],
      answer: 0,
      explanation: '官方答案为 A。该题按原卷录入；MyStr 没有提供 operator<<，因此直接输出对象 st 不成立。',
      tags: ['类', '运算符重载'],
    }),
    7: q(3, `#include <iostream>
using namespace std;

class ManyData {
    int *__data;
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
}`, {
      question: '有关下面 C++ 代码的说法，正确的是（ ）。',
      options: [
        '这段代码不能正常运行。',
        'ManyData 类可用于构造队列（Queue）数据结构。',
        '在上面代码环境，代码 cout << myData.__data[0] << endl; 可以增加到 main 函数末尾（return 0; 之前），且不会导致报错。',
        '可以为 ManyData 类的 push()、pop() 函数增加异常处理代码，否则在使用 ManyData 类时可能导致运行时错误或逻辑错误（不一定局限于上述代码中的 main 函数）。',
      ],
      answer: 3,
      explanation: 'push 和 pop 都没有检查容量或空栈边界，超量压入或空栈弹出时可能越界，应增加异常处理。',
      tags: ['栈', '异常处理'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2024-03-l6',
  'https://gesp.ccf.org.cn/101/attach/1602047203868704.pdf',
  {
    8: q(3, `void bfs(TreeNode* root) {
    if (root == NULL) {
        return;
    }
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();
        cout << current->val << " ";
        if (current->left) {
            q.push(current->left);
        }
        if (current->right) {
            q.push(current->right);
        }
    }
}

// 树结构：
//         1
//        / \
//       2   3
//      / \   \
//     8   9   6
//    / \       \
//   4   5       7
//              / \
//             10 11`, {
      question: '阅读以下广度优先搜索的代码，使用以上算法遍历下列树，可能的输出是（ ）。',
      options: [
        '1 2 8 9 4 5 3 6 7 10 11',
        '1 2 3 4 5 6 7 8 9 10 11',
        '1 2 3 8 9 6 4 5 7 10 11',
        '1 2 3 8 9 4 5 6 7 10 11',
      ],
      answer: 2,
      explanation: '广度优先搜索按层从左到右访问，顺序为 1、2、3、8、9、6、4、5、7、10、11。',
      tags: ['广度优先搜索', '二叉树'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2024-06-l6',
  'https://gesp.ccf.org.cn/101/attach/1621071589539872.pdf',
  {
    2: q(1, `#include <iostream>
using namespace std;

class my_class {
public:
    static int count;
    my_class() {
        count++;
    }
    ~my_class() {
        count--;
    }
    static void print_count() {
        cout << count << " ";
    }
};
int my_class::count = 0;

int main() {
    my_class obj1;
    my_class::print_count();
    my_class obj2;
    obj2.print_count();
    my_class obj3;
    obj3.print_count();
    return 0;
}`, {
      options: ['1 1 1', '1 2 3', '1 1 2', '1 2 2'],
      answer: 1,
      explanation: 'count 是所有对象共享的静态成员；三个对象依次构造后，输出分别为 1、2、3。',
      tags: ['静态成员', '类'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2025-03-l6',
  'https://gesp.ccf.org.cn/101/attach/1669256961851424.pdf',
  {
    11: q(4, `TreeNode* findNode(TreeNode* root, int target) {
    if (root == nullptr) return nullptr;

    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();

        if (current->val == target) {
            return current;
        }

        ______________________________________
    }
    return nullptr;
}`, {
      answer: 0,
      explanation: '广度优先搜索应把当前节点存在的左右孩子依次加入队列。',
      tags: ['广度优先搜索', '二叉树'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2025-12-l6',
  'https://gesp.ccf.org.cn/101/attach/1727912589918240.pdf',
  {
    11: q(7, `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

void dfs(TreeNode* root) {
    if (!root) return;
    stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        cout << node->val << " ";
        if (node->right) st.push(node->right);
        _________________________
    }
}`, {
      answer: 0,
      explanation: '栈后进先出；先压右孩子、再压左孩子，才能按根、左、右的顺序遍历。',
      tags: ['深度优先搜索', '二叉树'],
    }),
    12: q(8, `struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

TreeNode* bfsFind(TreeNode* root, int x) {
    if (!root) return nullptr;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        TreeNode* cur = q.front(); q.pop();
        if (cur->val == x) return cur;
        __________________
    }
    return nullptr;
}`, {
      question: '给定一棵普通二叉树（节点值没有大小规律），下面代码判断是否存在值为 x 的结点，则横线处应填入（ ）。',
      options: [
        'q.push(cur);',
        'if (cur->right) q.push(cur->right);',
        'if (cur->left) q.push(cur->left);\nif (cur->right) q.push(cur->right);',
        'q.push(cur->left);\nq.push(cur->right);',
      ],
      answer: 2,
      explanation: '普通二叉树没有大小规律，广度优先搜索需要把存在的左右孩子都加入队列。',
      tags: ['广度优先搜索', '二叉树'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2026-03-l6',
  'https://gesp.ccf.org.cn/101/attach/1738426015547424.pdf',
  {
    11: {
      sourcePage: 4,
      question: '关于格雷编码（Gray Code），下列说法正确的是（ ）。',
      options: [
        '格雷编码中，编码位数越多，相邻编码之间变化的位数也越多',
        '格雷编码中，相邻两个编码的二进制位恰好有一位不同',
        '格雷编码就是把普通二进制编码按位取反后得到的结果',
        '格雷编码不能用于数字电路和状态转换的设计中',
      ],
      answer: 1,
      explanation: '格雷编码的核心性质是相邻两个编码恰好只有一位不同，可减少状态切换时的瞬时错误。',
      tags: ['格雷编码'],
    },
  },
);

addVerifiedQuestionCorrections(
  '2024-09-l8',
  'https://gesp.ccf.org.cn/101/attach/1633836360269856.pdf',
  {
    9: q(3, `#include <iostream>
using namespace std;
#define N 35
int a[N][N];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= i; j++) {
            if (j == 1 || j == i)
                a[i][j] = 1;
            else
                __________________; // 在此处填入选项
        }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++)
            cout << a[i][j];
        cout << endl;
    }
    return 0;
}`, {
      options: [
        'a[i][j] = a[i - 1][j - 1] + a[i - 1][j];',
        'a[i][j] = a[i][j - 1] + a[i - 1][j];',
        'a[i][j] = a[i - 1][j] + a[i - 1][j];',
        'a[i][j] = a[i - 1][j - 1] + a[i][j];',
      ],
      answer: 0,
      explanation: '杨辉三角的内部元素等于上一行左上方与正上方两个元素之和。',
      tags: ['动态规划', '杨辉三角'],
    }),
  },
);

addVerifiedQuestionCorrections(
  '2025-03-l8',
  'https://gesp.ccf.org.cn/101/attach/1669257026863136.pdf',
  {
    14: q(6, `#include <iostream>
using namespace std;
#define N 35
int a[N];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        a[i] = 1;
        for (int j = i - 1; j > 0; j--)
            __________; // 在此处填入选项
        for (int j = 0; j <= i; j++)
            cout << a[j] << " ";
        cout << endl;
    }
    return 0;
}`, {
      options: [
        'a[j] += a[j + 1]',
        'a[j] += a[j - 1]',
        'a[j - 1] += a[j]',
        'a[j + 1] += a[j]',
      ],
      answer: 1,
      explanation: '一维数组原地生成杨辉三角时必须从右向左更新，使 a[j] 仍能使用上一行的 a[j - 1]。',
      tags: ['动态规划', '杨辉三角'],
    }),
  },
);

export function applyVerifiedQuestionCorrections(paper) {
  const correction = paper && verifiedQuestionCorrections[paper.id];
  if (!correction) return paper;
  const reviewedAt = correction.reviewedAt || REVIEWED_AT;

  const questions = (paper.questions || []).map((question) => {
    const verified = correction.questions[question.id];
    if (!verified) return question;
    return {
      ...question,
      ...verified,
      requiresCode: typeof verified.code === 'string',
      sourceVerified: true,
      reviewedBy: verified.reviewedBy || question.reviewedBy || REVIEWED_BY,
      reviewedAt: verified.reviewedAt || question.reviewedAt || reviewedAt,
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
      reviewedAt,
      scope: '疑似缺失代码题已对照官方 PDF 校订。',
    },
    questions,
  };
}
