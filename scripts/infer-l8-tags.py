"""Infer one primary knowledge tag for every L8 objective question."""

from pathlib import Path
import re


L8_DIR = Path("src/data/gesp/level8")

# Specific concepts must precede broad words such as "组合" and "复杂度".
RULES = [
    (r"最长公共子序列|LCS|最长上升子序列|LIS|动态规划|状态转移|记忆化|区间\s*DP|树形\s*DP|背包", "动态规划"),
    (r"Dijkstra|SPFA|Bellman|最短路|松弛", "最短路"),
    (r"Kruskal|Prim|最小生成树|MST", "最小生成树"),
    (r"并查集|Union\s*Find|连通分量", "并查集"),
    (r"深度优先|DFS|广度优先|BFS|层序遍历|先序遍历|中序遍历|后序遍历|图连通", "图的遍历"),
    (r"二叉树|二叉搜索树|完全二叉树|满二叉树|最近公共祖先|LCA|哈夫曼|Huffman", "树与二叉树"),
    (r"哈希|开放定址|链地址|哈希冲突", "哈希表"),
    (r"线段树|树状数组|二叉索引|\bBIT\b", "线段树"),
    (r"分治|逆序对", "分治"),
    (r"归并排序|快速排序|快排|堆排序|冒泡排序|排序算法|排序的(?:时间|空间|稳定性)|稳定排序|不稳定", "排序算法"),
    (r"lowbit|popcount|位运算|按位|异或|左移|右移|\bx\s*&\s*-x\b", "位运算"),
    (r"二项式|杨辉三角|卡特兰|Catalan|贝尔数|Bell|组合数学|错排|容斥", "组合数学"),
    (r"排列|组合|排法|选法|分类计数|加法原理|乘法原理|取件码|车牌", "排列组合"),
    (r"进制|二进制|八进制|十六进制|进制转换", "进制转换"),
    (r"概率|期望|随机事件|独立事件", "概率与期望"),
    (r"素数|质数|筛法|质因数|最大公约数|\bgcd\b|欧几里得|同余|取模|模运算", "数论"),
    (r"高精度|大整数|竖式", "高精度"),
    (r"KMP|回文|字符串|子串|前缀", "字符串"),
    (r"贪心|贪心策略", "贪心"),
    (r"虚函数|虚析构|纯虚|抽象类|多态", "虚函数与多态"),
    (r"构造函数|析构函数|拷贝构造|移动构造", "构造函数"),
    (r"运算符重载|函数重载", "运算符重载"),
    (r"模板|泛型|\btemplate\b", "模板"),
    (r"指针|引用|野指针|空指针|内存泄漏|解引用", "指针与内存"),
    (r"异常|\btry\b|\bcatch\b|\bthrow\b", "异常处理"),
    (r"\bSTL\b|\bvector\b|\bmap\b|\bset\b|容器|迭代器", "STL容器"),
    (r"面向对象|类的继承|类继承|派生类|基类|封装", "面向对象"),
    (r"时间复杂度|空间复杂度|复杂度分析|O\s*\(", "复杂度分析"),
]

TYPE_PATTERN = re.compile(r'type:\s*"(?:single|judge)"')
QUESTION_ID_PATTERN = re.compile(r"^\s{12}id:\s*\d+\s*,")
TAGS_PATTERN = re.compile(r"^(\s*)tags:\s*\[")


def infer(text):
    for keywords, name in RULES:
        if re.search(keywords, text, re.IGNORECASE):
            return name
    return "C++综合"


def find_tags_end(lines, start, limit):
    depth = 0
    started = False
    for index in range(start, limit):
        for char in lines[index]:
            if char == "[":
                depth += 1
                started = True
            elif char == "]":
                depth -= 1
                if started and depth == 0:
                    return index
    raise ValueError(f"未找到 tags 数组结束位置（第 {start + 1} 行）")


def infer_file(path):
    lines = path.read_text(encoding="utf-8").splitlines(keepends=True)
    updates = []

    for type_index, line in enumerate(lines):
        if not TYPE_PATTERN.search(line):
            continue

        next_question = next(
            (index for index in range(type_index + 1, len(lines)) if QUESTION_ID_PATTERN.search(lines[index])),
            len(lines),
        )
        tags_index = next(
            (index for index in range(type_index, next_question) if TAGS_PATTERN.search(lines[index])),
            None,
        )
        if tags_index is None:
            continue

        # Include the explanation and its explicit **考点** line, but exclude old tags.
        question_text = "".join(lines[type_index:tags_index])
        topic = infer(question_text)
        tags_end = find_tags_end(lines, tags_index, next_question)
        indent = TAGS_PATTERN.search(lines[tags_index]).group(1)
        replacement = f'{indent}tags: [\n{indent}    "{topic}",\n{indent}],\n'
        updates.append((tags_index, tags_end, replacement))

    for start, end, replacement in reversed(updates):
        lines[start:end + 1] = [replacement]

    path.write_text("".join(lines), encoding="utf-8")
    return len(updates)


def main():
    total = 0
    for path in sorted(L8_DIR.glob("*-l8.js")):
        if path.name == "programming.js":
            continue
        total += infer_file(path)
    print(f"L8 标签推断完成：处理客观题 {total} 道")


if __name__ == "__main__":
    main()
