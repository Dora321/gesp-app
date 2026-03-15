# GESP C++ 一级题库状态（level1）

更新时间：2026-03-16

## 本次已完成

- 盘点了 `src/data/gesp/level1/*.js` 共 12 套试卷（2023-03 ~ 2025-12）。
- 统一了一级题库结构：
  - 新增 `src/data/gesp/level1/shared.js`
  - 12 套试卷统一改为通过 `createLevel1Paper()` 生成，去掉重复拷贝
  - 补齐 `2024-12`、`2025-03` 的 `session` 字段
- 统一并清洗了模板题的标签与解释文案，减少明显不合语义的标签组合。
- 新增一级专项校验脚本：`scripts/check-level1-objective.js`
- 在 `package.json` 新增 `npm run check:level1`

## 当前判断

一级题库目前已经从“多文件重复拷贝、局部字段不一致”提升为“结构统一、可校验、可维护”。

但**内容层面仍不是完整真题版**：

- 12 套试卷仍共用同一套 25 题模板题。
- 也就是说，目前一级已经解决了**结构规范性**问题，但**尚未完成逐卷真题还原**。
- `sourceStatus: 'template-placeholder'` 已显式标记当前数据状态，方便后续替换为正式题面。

## 已确认的问题

1. **卷面内容高度重复**
   - 现状：12 套卷子题面基本一致，本质是占位模板，不是真正逐卷数据。
   - 风险：前端能跑，但不适合作为正式题库交付。

2. **可靠来源尚未接入到一级补题流程**
   - 仓库里已有 `scripts/fetch_official_gesp_sources.py`，但本次未直接拉取并清洗一级官方 PDF。
   - 需要后续按卷抓取官方来源，再逐卷替换模板题。

## 建议下一步优先级

### P1：补真题源
优先抓取一级 12 套官方 PDF / 公告页，建立 `sources/level1/` 或 `tmp/official/level1/` 原始材料留档。

### P2：逐卷替换模板题
按卷录入真实题面、选项、答案、解析，并保留统一结构与标签规范。

### P3：扩展校验
在 `check:level1` 基础上增加：
- 题面重复度检测
- tags 白名单检查
- `paper.id / 文件名 / 注册表 key` 一致性自动校验
- 占位状态阻断（正式发布前不允许 `template-placeholder` 存在）

## 本次涉及文件

- `src/data/gesp/level1/shared.js`
- `src/data/gesp/level1/2023-03-l1.js`
- `src/data/gesp/level1/2023-06-l1.js`
- `src/data/gesp/level1/2023-09-l1.js`
- `src/data/gesp/level1/2023-12-l1.js`
- `src/data/gesp/level1/2024-03-l1.js`
- `src/data/gesp/level1/2024-06-l1.js`
- `src/data/gesp/level1/2024-09-l1.js`
- `src/data/gesp/level1/2024-12-l1.js`
- `src/data/gesp/level1/2025-03-l1.js`
- `src/data/gesp/level1/2025-06-l1.js`
- `src/data/gesp/level1/2025-09-l1.js`
- `src/data/gesp/level1/2025-12-l1.js`
- `scripts/check-level1-objective.js`
- `package.json`
- `docs/level1-status.md`
