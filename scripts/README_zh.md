# GESP 数据填充统计脚本 (get-backfill-stats.js) 翻译与说明

该脚本用于统计 GESP 各级考试真题的填充进度。

## 核心功能翻译

### 1. 变量定义

- `DATA_DIR`: 数据目录，指向 `src/data/gesp`。
- `isBackfilled`: 是否已标记为“已回填”。
- `hasPlaceholder`: 是否包含“题目占位”等待补全内容。
- `isHistorical`: 是否为“历史占位卷”。

### 2. 输出表格表头

- `Level` -> `等级`
- `Date` -> `日期 (年月)`
- `Objective` -> `客观题数量`
- `programming` -> `编程题数量`
- `Status` -> `状态`

### 3. 状态图标含义

- ✅: 已完成 (标记为 backfilled 或题目数量完整)
- ❌: 未开始 (无题目)
- ⚪: 历史占位 (无需填充)
- 🚧: 包含占位符 (正在填充中)
- 🕒: 进度记录 (已有部分题目)

## 脚本逻辑简述

1. **遍历目录**: 递归获取 `src/data/gesp` 下的所有 `.js` 文件。
2. **分析内容**:
   - 使用正则表达式匹配 `type: "single"`、`judge` 和 `programming` 的数量。
   - 检测关键字 `backfilled: true` 和 `题目占位`。
3. **分组排序**: 按等级分组，按日期排序。
4. **打印表格**: 在控制台输出 Markdown 格式的统计表格。
# 题库代码字段

涉及代码阅读、输出判断或程序填空的题目，推荐把代码与题干分开保存：

```js
{
  question: '阅读下面代码，判断输出结果。',
  code: 'int main() { return 0; }',
  codeLanguage: 'cpp',
  requiresCode: true,
  sourcePage: 6,
  // 或使用 sourceImage / sourceUrl
}
```

`npm run validate:bank` 会识别 Markdown 代码块、行内代码和独立 `code` 字段。显式设置
`requiresCode: true` 后，代码缺失会阻止发布；未显式标记的历史题目会作为 `[CODE]` 疑点列入报告。
