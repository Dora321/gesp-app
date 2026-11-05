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
      explanation: `官方答案为B。头插前必须判断pHead->next是否存在，有旧首节点时才更新它的prev，否则会解引用空指针。A只判断头节点，无法保证其next非空，C也缺少检查。原程序另有边界缺陷，命中尾节点时p->next可能为NULL，却直接执行p->next->prev，应补空指针判断。这里保留原代码和填空答案，注明整段程序的缺陷。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为B。删除current时，前驱的next必须越过current，改指向current->next，正好对应B。后面的代码已在后继存在时，将后继的prev改为current->prev，补齐反向链接。删除头节点走else更新head，删除尾节点时无需修改空后继。最后释放current，不能误删其后继或仅改current自身的指针。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `官方答案为D。D宣称循环“应该”改成i>1，这一修改并无必要。原循环保留i=1能直接识别公约数1，但删除该轮后，函数尾部return 1仍可正确处理互质输入，因此不能声称修改会漏掉互质情况。gcd0通过余数递归缩小参数，gcd1按候选因数递减枚举，最坏量级分别为对数与线性。此题D的必要性措辞应与返回结果区分。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为A。内层枚举从第一个素数primes[0]开始，同时要求j小于素数表长度、i*primes[j]不超过n，从而保证读取与标记均不越界。遇到第一个整除i的素数就break，使每个合数只由其最小质因数参与的那一对乘积标记。其他选项跳过下标0或缺少必要边界，不能保持线性筛过程。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `原卷答案为A，但题意和选项存在冲突。A称直接输出st会报错，这符合代码未提供operator<<的事实。B所述data确为成员，C调用公开构造函数也成立。D从类外访问默认private的data会产生访问权限错误，按“选错误说法”的题意应是D。保留官方A，记录ANSWER-DOUBT并停止计分。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为D。push在尾部写入并增加tail，pop先减少tail再返回元素，所以结构按后进先出工作。连续压入超过capacity个元素会越界，空栈执行pop也会使下标为负，需要检查边界并处理失败。给出的main中只压入4个元素，容量为100，可以正常操作。__data是私有成员，类外不能直接访问，B、C也不成立。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
`, {
      question: '阅读以下广度优先搜索的代码，使用该算法遍历下图的树，可能的输出是（ ）。\n\n![官方树结构](/question-assets/2024-03-l6/q8-tree.png)',
      options: [
        '1 2 8 9 4 5 3 6 7 10 11',
        '1 2 3 4 5 6 7 8 9 10 11',
        '1 2 3 8 9 6 4 5 7 10 11',
        '1 2 3 8 9 4 5 6 7 10 11',
      ],
      answer: 2,
      explanation: `答案为C。队列先进先出，根1先出队，随后2、3依次出队。再按这两个结点入队孩子的先后得到8、9、6，下一层得到4、5、7，最后是10、11。因此结果为1 2 3 8 9 6 4 5 7 10 11。深层结点4不能越过已在队列中等待的3与6，这是与深度优先搜索的区别。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为B。静态成员count由整个类共享，初值是0。构造obj1时加到1并输出，构造obj2时加到2，构造obj3时加到3，所以依次输出1 2 3。通过类名或对象名调用print_count，访问的都是同一个静态计数器。三个对象在这些输出之后才离开作用域，其析构减计数不会改变已经输出的内容。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为A。处理完current后，需要把它存在的左、右孩子加入队尾，后续才能逐层访问整棵树。push执行入队，pop只删除队首，front只查看队首，B、C的接口使用也不成立。D将判断与入队的孩子交叉，只有单侧孩子时会压入空指针或漏掉真实孩子，无法保证遍历正确。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为A。栈后进先出，程序已先压入右孩子，随后应将存在的左孩子压栈，使左孩子先被弹出并访问。与当前根先输出的步骤结合，形成根、左、右的先序深度优先遍历。pop不接收要删除的结点参数，stack也没有front接口。D检查左孩子却压右孩子，会遗漏左子树并重复处理右子树。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为C。普通二叉树的左右子树没有值的大小保证，查找x时两侧都可能包含目标，必须将非空左右孩子入队。队列先进先出，使查找按层推进。A把刚处理的cur重新入队，可能无限重复。B遗漏左子树，D没有检查空孩子，后续读取cur->val可能发生空指针访问。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为B。格雷编码要求相邻码字恰好只有一个二进制位变化，例如两位反射格雷码00、01、11、10，每次相邻转换只改变一位。位数增加不会改变这一相邻性质，所以A不成立。对普通二进制统一取反也不能保证相邻仅差一位。该性质可用于数字电路状态切换，D的绝对否定不成立。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为A。杨辉三角内部位置等于上一行相邻两项之和，即a[i-1][j-1]+a[i-1][j]。边界j=1或j=i已经被单独赋值为1，填空只处理内部位置。B引用同一行左侧，C把上一行同一项重复相加，D引用尚未赋成目标值的当前项，都没有表达杨辉三角的递推关系。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
      explanation: `答案为B。一维数组在更新前保存上一行，内部位置的新值为原a[j]+原a[j-1]。从右向左遍历可使两项都还未被本轮覆盖，因此填写a[j]+=a[j-1]。若从左向右更新，a[j-1]已属于新行，会产生错误累加。每轮先把最右边界a[i]置1，左边界a[0]保持1。`,
      reviewedBy: 'AI-Codex',
      reviewedAt: '2026-11-06',
      verificationNote: 'AI-Codex依据题面及已有代码核验推演并重写解析。',
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
