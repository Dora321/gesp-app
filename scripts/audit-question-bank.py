#!/usr/bin/env python3
"""
GESP 题库审计脚本
审计维度：真实性、准确性、完整性、可用性、美观性
"""

import os
import re
import sys
import json
from pathlib import Path
from collections import defaultdict

# ─── 配置 ───────────────────────────────────────────────
DATA_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "gesp"
VALID_TYPES = {"single", "judge", "programming", "multiple", "fill"}
REQUIRED_FIELDS = {
    "single": ["id", "type", "question", "options", "answer", "score"],
    "judge": ["id", "type", "question", "answer", "score"],
    "programming": ["id", "type", "question", "score"],
}
OPTIONAL_FIELDS = ["explanation", "tags", "source", "confidence", "template", "referenceCode", "samples", "note", "session"]

# ─── 工具函数 ────────────────────────────────────────────
def extract_paper_data(js_content: str, filepath: str):
    """从 JS 文件中提取 paperData 对象（简易解析，不用 Node）"""
    issues = []
    
    # 检查是否 export 了 paperData
    if "export const paperData" not in js_content and "export default paperData" not in js_content:
        issues.append(("CRITICAL", "缺少 paperData 导出"))
        return None, issues
    
    # 检查 questions 数组是否存在
    if "questions" not in js_content:
        issues.append(("CRITICAL", "缺少 questions 字段"))
        return None, issues
    
    return js_content, issues


def parse_js_object_lite(js_content: str):
    """
    轻量级 JS 对象解析：提取 questions 数组中的各题目对象。
    不依赖完整 JS 引擎，用正则+状态机做基本提取。
    """
    questions = []
    errors = []
    
    # 找到 questions: [ 的位置
    q_match = re.search(r'questions\s*:\s*\[', js_content)
    if not q_match:
        return questions, [("CRITICAL", "无法定位 questions 数组")]
    
    # 从 questions 开始，逐个提取 { ... } 块
    start = q_match.end()
    depth = 0
    obj_start = None
    
    i = start
    while i < len(js_content):
        ch = js_content[i]
        
        # 跳过字符串内容（简易处理）
        if ch in ('"', "'", '`'):
            quote = ch
            j = i + 1
            while j < len(js_content):
                if js_content[j] == '\\':
                    j += 2
                    continue
                if js_content[j] == quote:
                    break
                j += 1
            i = j + 1
            continue
        
        if ch == '{':
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and obj_start is not None:
                obj_text = js_content[obj_start:i+1]
                questions.append(obj_text)
                obj_start = None
        i += 1
    
    return questions, errors


def extract_field(obj_text: str, field_name: str):
    """从对象文本中提取字段值（简易版）"""
    # 匹配 field: value 或 field: [array] 或 field: {object}
    patterns = [
        # 字符串值 (单引号/双引号/模板字符串)
        rf'{field_name}\s*:\s*"((?:[^"\\]|\\.)*)"',
        rf"{field_name}\s*:\s*'((?:[^'\\]|\\.)*)'",
        # 数值
        rf'{field_name}\s*:\s*(-?\d+\.?\d*)',
        # 布尔
        rf'{field_name}\s*:\s*(true|false)',
        # 数组
        rf'{field_name}\s*:\s*\[',
    ]
    
    for pat in patterns:
        m = re.search(pat, obj_text)
        if m:
            return m.group(1) if m.lastindex else m.group(0)
    return None


def extract_string_field(obj_text: str, field_name: str):
    """提取字符串类型字段"""
    for quote in ['"', "'", '`']:
        pat = rf'{field_name}\s*:\s*{quote}((?:[^{quote}\\]|\\.)*){quote}'
        m = re.search(pat, obj_text, re.DOTALL)
        if m:
            return m.group(1)
    return None


def extract_number_field(obj_text: str, field_name: str):
    """提取数值类型字段"""
    pat = rf'{field_name}\s*:\s*(-?\d+\.?\d*)'
    m = re.search(pat, obj_text)
    if m:
        try:
            val = m.group(1)
            return int(val) if '.' not in val else float(val)
        except:
            return None
    return None


def extract_array_field(obj_text: str, field_name: str):
    """提取数组字段（返回元素数量和原始文本）"""
    pat = rf'{field_name}\s*:\s*\['
    m = re.search(pat, obj_text)
    if not m:
        return None, None
    
    start = m.end()
    depth = 1
    i = start
    while i < len(obj_text) and depth > 0:
        ch = obj_text[i]
        if ch in ('"', "'", '`'):
            quote = ch
            j = i + 1
            while j < len(obj_text):
                if obj_text[j] == '\\':
                    j += 2
                    continue
                if obj_text[j] == quote:
                    break
                j += 1
            i = j + 1
            continue
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
        i += 1
    
    array_text = obj_text[m.start():i]
    # 简易计数：数顶层元素
    # 对于 options，数引号对
    elem_count = 0
    in_str = False
    quote_char = None
    for c in array_text[1:-1]:  # 去掉外层 []
        if c in ('"', "'", '`') and not in_str:
            in_str = True
            quote_char = c
            elem_count += 1
        elif c == quote_char and in_str:
            in_str = False
            quote_char = None
    
    return elem_count, array_text


# ─── 审计函数 ────────────────────────────────────────────

def audit_completeness(level_dir: Path, filepath: Path, obj_texts: list):
    """完整性审计：检查必填字段是否齐全"""
    issues = []
    paper_id = filepath.stem
    
    for idx, obj_text in enumerate(obj_texts):
        q_id = extract_number_field(obj_text, "id") or f"unknown_{idx}"
        q_type = extract_string_field(obj_text, "type")
        
        # 确定必填字段
        required = REQUIRED_FIELDS.get(q_type or "single", REQUIRED_FIELDS["single"])
        
        for field in required:
            if field == "id":
                if extract_number_field(obj_text, "id") is None:
                    issues.append(("P1", f"Q{q_id}", f"缺少必填字段: id"))
            elif field == "type":
                if q_type is None:
                    issues.append(("P1", f"Q{q_id}", f"缺少必填字段: type"))
            elif field == "question":
                q_text = extract_string_field(obj_text, "question")
                if q_text is None or len(q_text.strip()) < 2:
                    issues.append(("P1", f"Q{q_id}", f"缺少或过短: question"))
            elif field == "options":
                count, _ = extract_array_field(obj_text, "options")
                if count is None:
                    issues.append(("P1", f"Q{q_id}", f"缺少必填字段: options"))
                elif q_type == "single" and count < 2:
                    issues.append(("P1", f"Q{q_id}", f"单选题选项不足: 仅 {count} 项"))
            elif field == "answer":
                ans = extract_number_field(obj_text, "answer")
                ans_str = extract_string_field(obj_text, "answer")
                if ans is None and (ans_str is None or ans_str == ''):
                    issues.append(("P1", f"Q{q_id}", f"缺少必填字段: answer"))
            elif field == "score":
                if extract_number_field(obj_text, "score") is None:
                    issues.append(("P2", f"Q{q_id}", f"缺少字段: score"))
        
        # 检查 explanation（强烈建议）
        expl = extract_string_field(obj_text, "explanation")
        if expl is None or (isinstance(expl, str) and len(expl.strip()) < 2):
            issues.append(("P2", f"Q{q_id}", f"缺少或过短: explanation（建议补充解析）"))
    
    return issues


def audit_accuracy(level_dir: Path, filepath: Path, obj_texts: list):
    """准确性审计：答案索引、分数合理性"""
    issues = []
    
    for idx, obj_text in enumerate(obj_texts):
        q_id = extract_number_field(obj_text, "id") or f"unknown_{idx}"
        q_type = extract_string_field(obj_text, "type")
        answer = extract_number_field(obj_text, "answer")
        opt_count, _ = extract_array_field(obj_text, "options")
        score = extract_number_field(obj_text, "score")
        
        # 答案索引越界检查
        if q_type == "single" and answer is not None and opt_count is not None:
            if answer < 0 or answer >= opt_count:
                issues.append(("P0", f"Q{q_id}", f"答案索引越界: answer={answer}, 但仅有 {opt_count} 个选项"))
        
        # 判断题答案应为 0 或 1
        if q_type == "judge" and answer is not None:
            if answer not in (0, 1):
                issues.append(("P1", f"Q{q_id}", f"判断题答案异常: answer={answer}（应为 0 或 1）"))
        
        # 分数合理性
        if score is not None:
            if score <= 0:
                issues.append(("P1", f"Q{q_id}", f"分数异常: score={score}"))
            elif score > 50:
                issues.append(("P2", f"Q{q_id}", f"分数偏高: score={score}（编程题请忽略）"))
        
        # type 合法性
        if q_type and q_type not in VALID_TYPES:
            issues.append(("P1", f"Q{q_id}", f"未知题型: type='{q_type}'"))
    
    return issues


def audit_usability(level_dir: Path, filepath: Path, obj_texts: list):
    """可用性审计：ID 唯一性、顺序性、选项格式"""
    issues = []
    seen_ids = set()
    prev_id = -1
    id_gap = False
    
    for idx, obj_text in enumerate(obj_texts):
        q_id = extract_number_field(obj_text, "id") or f"unknown_{idx}"
        q_type = extract_string_field(obj_text, "type")
        
        # ID 唯一性
        if q_id in seen_ids:
            issues.append(("P0", f"Q{q_id}", f"ID 重复: {q_id}"))
        seen_ids.add(q_id)
        
        # ID 顺序性（允许不连续，但记录跳跃）
        if isinstance(q_id, (int, float)) and q_id != prev_id + 1 and prev_id > 0:
            if q_id > prev_id + 1:
                id_gap = True
        if isinstance(q_id, (int, float)):
            prev_id = q_id
        
        # 选项格式检查
        opt_count, opt_text = extract_array_field(obj_text, "options")
        if opt_text and q_type == "single":
            # 检查选项是否为空字符串
            empty_opts = re.findall(r"['\"]\s*['\"]", opt_text)
            if empty_opts:
                issues.append(("P1", f"Q{q_id}", f"存在空选项"))
            
            # 检查选项重复
            opt_strings = re.findall(r"['\"]([^'\"]+)['\"]", opt_text)
            if len(opt_strings) != len(set(opt_strings)):
                issues.append(("P1", f"Q{q_id}", f"存在重复选项"))
        
        # question 中含代码但未用代码块
        q_text = extract_string_field(obj_text, "question") or ""
        if "int " in q_text or "cout" in q_text or "for (" in q_text:
            if "```" not in q_text and "\n    " not in q_text:
                issues.append(("P2", f"Q{q_id}", f"题干含代码但未使用代码块格式"))
    
    if id_gap:
        issues.append(("P2", "整体", f"ID 不连续（可能有跳号）"))
    
    return issues


def audit_beauty(level_dir: Path, filepath: Path, obj_texts: list):
    """美观性审计：格式规范、排版问题"""
    issues = []
    
    for idx, obj_text in enumerate(obj_texts):
        q_id = extract_number_field(obj_text, "id") or f"unknown_{idx}"
        q_text = extract_string_field(obj_text, "question") or ""
        expl = extract_string_field(obj_text, "explanation") or ""
        
        # 题干含编号前缀（如 "1." "2."）
        if re.match(r'^\s*\d+[.、）)]', q_text):
            issues.append(("P2", f"Q{q_id}", f"题干含编号前缀（应由页面自动编号）"))
        
        # 题干过长（超过 500 字符）
        if len(q_text) > 500:
            issues.append(("P2", f"Q{q_id}", f"题干过长: {len(q_text)} 字符（>500）"))
        
        # 解析过短（少于 5 字符）
        if expl and len(expl.strip()) < 5 and expl.strip() not in ('', '// 待补充'):
            issues.append(("P2", f"Q{q_id}", f"解析过短: '{expl.strip()}'"))
        
        # 含中英标点混用
        if re.search(r'[\u4e00-\u9fff]\.(?=[\u4e00-\u9fff])', q_text):
            pass  # 中文语境中英文句号可接受
        
        # 含多余空白
        if '  ' in q_text and '```' not in q_text:
            issues.append(("P2", f"Q{q_id}", f"题干含多余连续空格"))
        
        # 选项以 A/B/C/D 开头（与页面编号冲突）
        opt_count, opt_text = extract_array_field(obj_text, "options")
        if opt_text:
            opt_strings = re.findall(r"['\"]([ABCD][.、）)][^'\"]*)['\"]", opt_text)
            if opt_strings:
                issues.append(("P2", f"Q{q_id}", f"选项含 A/B/C/D 前缀（与页面编号可能冲突）"))
    
    return issues


def audit_paper_metadata(filepath: Path, js_content: str):
    """审计试卷元数据"""
    issues = []
    paper_id = filepath.stem
    
    # 检查 paperData 必需字段
    for field in ["id", "title", "level", "timeLimit", "questions"]:
        if field not in js_content:
            issues.append(("P1", "元数据", f"试卷缺少字段: {field}"))
    
    # 检查 id 一致性
    id_match = re.search(r"id\s*:\s*['\"]([^'\"]+)['\"]", js_content)
    if id_match and id_match.group(1) != paper_id:
        issues.append(("P1", "元数据", f"试卷 id='{id_match.group(1)}' 与文件名 '{paper_id}' 不一致"))
    
    # 检查 level 一致性
    level_match = re.search(r"level\s*:\s*(\d+)", js_content)
    if level_match:
        level_in_data = int(level_match.group(1))
        dir_level = level_dir_name_to_num(filepath.parent.name)
        if dir_level and level_in_data != dir_level:
            issues.append(("P0", "元数据", f"试卷 level={level_in_data} 与目录 level{dir_level} 不一致"))
    
    return issues


def level_dir_name_to_num(name: str):
    """level1 -> 1"""
    m = re.match(r'level(\d+)', name)
    return int(m.group(1)) if m else None


# ─── 主流程 ──────────────────────────────────────────────

def audit_all():
    """执行全量审计"""
    total_issues = defaultdict(list)  # paper_id -> [issues]
    stats = {
        "total_papers": 0,
        "total_questions": 0,
        "papers_with_issues": 0,
        "p0_count": 0,
        "p1_count": 0,
        "p2_count": 0,
    }
    
    # 遍历 level1~level8
    for level_dir in sorted(DATA_DIR.iterdir()):
        if not level_dir.is_dir() or not level_dir.name.startswith("level"):
            continue
        
        for js_file in sorted(level_dir.glob("*.js")):
            if js_file.name == "shared.js":
                continue
            
            stats["total_papers"] += 1
            paper_id = js_file.stem
            all_issues = []
            
            try:
                js_content = js_file.read_text(encoding="utf-8")
            except Exception as e:
                all_issues.append(("P0", "文件", f"读取失败: {e}"))
                total_issues[paper_id] = all_issues
                continue
            
            # 元数据审计
            for issue in audit_paper_metadata(js_file, js_content):
                if len(issue) == 2:
                    all_issues.append((issue[0], "元数据", issue[1]))
                else:
                    all_issues.append(issue)
            
            # 提取题目
            obj_texts, parse_errors = parse_js_object_lite(js_content)
            # 统一为 3 元组格式
            for err in parse_errors:
                if len(err) == 2:
                    all_issues.append((err[0], "整体", err[1]))
                else:
                    all_issues.append(err)
            
            if not obj_texts:
                all_issues.append(("P0", "整体", "未找到任何题目对象"))
                total_issues[paper_id] = all_issues
                continue
            
            stats["total_questions"] += len(obj_texts)
            
            # 四维审计
            all_issues.extend(audit_completeness(level_dir, js_file, obj_texts))
            all_issues.extend(audit_accuracy(level_dir, js_file, obj_texts))
            all_issues.extend(audit_usability(level_dir, js_file, obj_texts))
            all_issues.extend(audit_beauty(level_dir, js_file, obj_texts))
            
            if all_issues:
                stats["papers_with_issues"] += 1
                for issue in all_issues:
                    severity = issue[0]
                    if severity == "P0":
                        stats["p0_count"] += 1
                    elif severity == "P1":
                        stats["p1_count"] += 1
                    elif severity == "P2":
                        stats["p2_count"] += 1
            
            total_issues[paper_id] = all_issues
    
    return total_issues, stats


def generate_report(total_issues, stats):
    """生成审计报告"""
    lines = []
    lines.append("# GESP 题库审计报告")
    lines.append("")
    lines.append(f"**审计时间**: 2026-04-25")
    lines.append(f"**审计范围**: Level 1 ~ Level 8，共 {stats['total_papers']} 份试卷，{stats['total_questions']} 道题目")
    lines.append("")
    
    # 摘要
    lines.append("## 📊 审计摘要")
    lines.append("")
    lines.append("| 严重等级 | 数量 | 说明 |")
    lines.append("|---------|------|------|")
    lines.append(f"| **P0 严重** | {stats['p0_count']} | 数据错误，必须修复（答案越界、ID重复、level不一致等） |")
    lines.append(f"| **P1 重要** | {stats['p1_count']} | 影响使用，建议修复（字段缺失、选项不足等） |")
    lines.append(f"| **P2 建议** | {stats['p2_count']} | 体验优化，可选修复（解析缺失、格式问题等） |")
    lines.append(f"| **有问题试卷** | {stats['papers_with_issues']} / {stats['total_papers']} | |")
    lines.append("")
    
    # P0 问题详情
    p0_issues = []
    p1_issues = []
    p2_issues = []
    
    for paper_id in sorted(total_issues.keys()):
        for severity, q_id, desc in total_issues[paper_id]:
            entry = (paper_id, q_id, desc)
            if severity == "P0":
                p0_issues.append(entry)
            elif severity == "P1":
                p1_issues.append(entry)
            else:
                p2_issues.append(entry)
    
    if p0_issues:
        lines.append("## 🔴 P0 严重问题（必须修复）")
        lines.append("")
        lines.append("| 试卷 | 题号 | 问题描述 |")
        lines.append("|------|------|---------|")
        for paper_id, q_id, desc in p0_issues:
            lines.append(f"| {paper_id} | {q_id} | {desc} |")
        lines.append("")
    
    if p1_issues:
        lines.append("## 🟠 P1 重要问题（建议修复）")
        lines.append("")
        lines.append("| 试卷 | 题号 | 问题描述 |")
        lines.append("|------|------|---------|")
        for paper_id, q_id, desc in p1_issues:
            lines.append(f"| {paper_id} | {q_id} | {desc} |")
        lines.append("")
    
    if p2_issues:
        # P2 问题太多，按试卷分组统计
        lines.append("## 🟡 P2 建议优化（体验改善）")
        lines.append("")
        
        # 按试卷分组
        p2_by_paper = defaultdict(list)
        for paper_id, q_id, desc in p2_issues:
            p2_by_paper[paper_id].append((q_id, desc))
        
        lines.append("| 试卷 | P2 问题数 | 典型问题 |")
        lines.append("|------|----------|---------|")
        for paper_id in sorted(p2_by_paper.keys()):
            items = p2_by_paper[paper_id]
            # 取前2个典型问题
            typical = items[:2]
            typical_str = "; ".join(f"{q}: {d[:30]}" for q, d in typical)
            if len(items) > 2:
                typical_str += f" ... 等共 {len(items)} 项"
            lines.append(f"| {paper_id} | {len(items)} | {typical_str} |")
        lines.append("")
        
        # P2 问题类型统计
        p2_type_count = defaultdict(int)
        for paper_id, q_id, desc in p2_issues:
            # 提取问题类型关键词
            if "解析" in desc:
                p2_type_count["缺少/过短解析"] += 1
            elif "编号前缀" in desc:
                p2_type_count["题干含编号前缀"] += 1
            elif "代码块" in desc:
                p2_type_count["代码未用代码块"] += 1
            elif "选项前缀" in desc:
                p2_type_count["选项含A/B/C/D前缀"] += 1
            elif "题干过长" in desc:
                p2_type_count["题干过长"] += 1
            elif "空格" in desc:
                p2_type_count["多余空格"] += 1
            elif "ID" in desc:
                p2_type_count["ID不连续"] += 1
            else:
                p2_type_count[desc[:20]] += 1
        
        lines.append("### P2 问题类型分布")
        lines.append("")
        lines.append("| 问题类型 | 数量 |")
        lines.append("|---------|------|")
        for ptype, count in sorted(p2_type_count.items(), key=lambda x: -x[1]):
            lines.append(f"| {ptype} | {count} |")
        lines.append("")
    
    # 按等级统计
    lines.append("## 📈 各等级问题分布")
    lines.append("")
    lines.append("| 等级 | 试卷数 | P0 | P1 | P2 | 总计 |")
    lines.append("|------|--------|----|----|----|-----|")
    
    for level in range(1, 9):
        level_papers = [pid for pid in total_issues.keys() if f"-l{level}" in pid]
        p0 = sum(1 for pid in level_papers for s, _, _ in total_issues[pid] if s == "P0")
        p1 = sum(1 for pid in level_papers for s, _, _ in total_issues[pid] if s == "P1")
        p2 = sum(1 for pid in level_papers for s, _, _ in total_issues[pid] if s == "P2")
        total = p0 + p1 + p2
        lines.append(f"| Level {level} | {len(level_papers)} | {p0} | {p1} | {p2} | {total} |")
    lines.append("")
    
    # 结论与建议
    lines.append("## 📝 审计结论与建议")
    lines.append("")
    
    if stats["p0_count"] == 0:
        lines.append("✅ **无 P0 严重问题**，题库数据基本可用。")
    else:
        lines.append(f"⚠️ **发现 {stats['p0_count']} 个 P0 严重问题**，需优先修复。")
    lines.append("")
    
    if stats["p1_count"] > 0:
        lines.append(f"- **P1 问题 {stats['p1_count']} 个**：主要集中在字段缺失和选项不足，影响答题体验。")
    
    if stats["p2_count"] > 0:
        lines.append(f"- **P2 问题 {stats['p2_count']} 个**：主要为解析缺失和格式优化，建议逐步完善。")
    
    lines.append("")
    lines.append("### 优先修复建议")
    lines.append("")
    lines.append("1. **P0 全部修复**：答案越界、level 不一致等数据错误")
    lines.append("2. **P1 按等级批量修复**：先修 Level 1-2（用户量最大），再修高等级")
    lines.append("3. **P2 渐进式改善**：解析补充可结合教学进度逐步完成")
    
    return "\n".join(lines)


if __name__ == "__main__":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    
    print("[AUDIT] GESP 题库审计开始...\n")
    
    total_issues, stats = audit_all()
    
    report = generate_report(total_issues, stats)
    
    # 输出到文件
    report_path = Path(__file__).resolve().parent.parent / "AUDIT_REPORT.md"
    report_path.write_text(report, encoding="utf-8")
    
    print(report)
    print(f"\n[SAVED] 报告已保存至: {report_path}")
