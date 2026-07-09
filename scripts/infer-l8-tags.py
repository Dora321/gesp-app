# L8 标签归一化：从 question + explanation 推断真实知识点，写入 tags 数组
# 元数据标签（客观题/单选题/GESP8级）在 migrateTags 中被剥离，故追加真实知识点即可
import re, os

L8_DIR = "src/data/gesp/level8"
META = {"客观题","单选题","多选题","判断题","编程题","GESP8级","GESP7级"}

# L8 知识点关键词 → 标签名
RULES = [
    (r"排列|组合|排法|选法|A?不?能?排|升国旗", "排列组合"),
    (r"进制|转?换|(\d+)进制|二进制|八进制|十六进制", "进制转换"),
    (r"深度优先|DFS|广度优先|BFS|遍历序列|先序|中序|后序|层次遍历", "图的遍历"),
    (r"最短路|Dijkstra|SPFA|Bellman|松弛", "最短路"),
    (r"最小生成树|Prim|Kruskal|生成树|MST", "最小生成树"),
    (r"并查集|并查|Union|Find|连通分量", "并查集"),
    (r"动态规划|DP|状态转移|记忆化|区间DP|树形DP|背包", "动态规划"),
    (r"树形|二叉树|完全二叉树|满二叉树|最近公共祖先|LCA|哈夫曼|Huffman", "树与二叉树"),
    (r"组合数学|卡特兰|Catalan|错排|容斥", "组合数学"),
    (r"概率|期望|随机|独立事件", "概率与期望"),
    (r"素数|质数|筛法|质因数|最大公约数|gcd|欧几里得|同余|模", "数论"),
    (r"高精度|大整数|竖式", "高精度"),
    (r"字符串|子序列|子串|前缀|KMP|回文", "字符串"),
    (r"贪心|贪心策略|最优", "贪心"),
    (r"分治|归并|逆序对", "分治"),
    (r"线段树|树状数组|二叉索引|BIT", "线段树"),
    (r"最长上升子序列|LIS|最长公共子序列|LCS", "序列DP"),
    (r"时间复杂度|空间复杂度|O\(|复杂度分析", "复杂度分析"),
    (r"面向对象|类|对象|封装|继承|多态", "面向对象"),
    (r"构造函数|析构函数|拷贝构造|移动构造", "构造函数"),
    (r"虚函数|虚析构|纯虚|抽象类|多态", "虚函数与多态"),
    (r"运算符重载|重载|函数重载", "运算符重载"),
    (r"模板|泛型|template", "模板"),
    (r"指针|引用|野指针|空指针|内存泄漏|解引用", "指针与内存"),
    (r"异常|try|catch|throw", "异常处理"),
    (r"STL|vector|map|set|容器|迭代器", "STL容器"),
    (r"排序|稳定性|快排|归并|堆排|冒泡", "排序算法"),
    (r"哈希|冲突|开放定址|链地址", "哈希表"),
]

def infer(text):
    for kw, name in RULES:
        if re.search(kw, text):
            return name
    return "C++综合"

total = 0
tagged = 0
for fn in sorted(os.listdir(L8_DIR)):
    if not fn.endswith("-l8.js") or fn == "programming.js":
        continue
    path = os.path.join(L8_DIR, fn)
    lines = open(path, encoding="utf-8").readlines()
    i = 0
    while i < len(lines):
        if re.search(r'type:\s*"(single|judge)"', lines[i]):
            qid = None
            for j in range(i, max(-1, i-15), -1):
                im = re.search(r'id:\s*(\d+)\s*,', lines[j])
                if im:
                    qid = int(im.group(1)); break
            # 收集本题 question + explanation 文本
            qtext = ""
            for k in range(i, min(len(lines), i+40)):
                if re.search(r'answer:\s*\d+\s*,', lines[k]):
                    qtext += "".join(lines[i:k+1])
                    break
            # 找 tags 行块
            topic = infer(qtext)
            # 定位 tags 数组起始
            for k in range(i, min(len(lines), i+40)):
                if re.search(r'^\s*tags:\s*\[', lines[k]):
                    # 找对应的 ] 结束
                    depth = 0
                    started = False
                    end = k
                    for m in range(k, min(len(lines), k+12)):
                        for ch in lines[m]:
                            if ch == '[':
                                started = True; depth += 1
                            elif ch == ']':
                                depth -= 1
                                if started and depth == 0:
                                    end = m
                                    break
                        if end > k:
                            break
                    indent = re.match(r'(\s*)', lines[k]).group(1)
                    new_block = f"{indent}tags: [\n{indent}    \"{topic}\",\n{indent}],\n"
                    # 保留原 metadata 标签也行，但 migrateTags 会剥离，直接替换为真实标签更干净
                    lines[k:end+1] = [new_block]
                    tagged += 1
                    total += 1
                    break
        i += 1
    open(path, "w", encoding="utf-8").writelines(lines)

print(f"L8 标签推断完成：处理客观题 {total} 道，写入知识点标签 {tagged} 道")
