# GESP App

GESP App 是一个基于 **React + Vite** 的互动教学与题库网站，包含：

- GESP C++ 历年真题题库（按等级与考期）
- 课程页面（C++ / Python）
- 专题子模块（如 `ekart`、`hardware`）
- 题库答题模式：考试模式 / 解析模式

线上示例：<https://dora321.github.io/gesp-app/>

---

## 技术栈

- React 19
- Vite 5
- React Router DOM 6
- Tailwind CSS 4
- Framer Motion
- Lucide React

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 本地预览构建结果
npm run preview

# 代码检查
npm run lint
```

---

## 目录结构（核心）

```text
src/
  App.jsx                         # 路由入口
  main.jsx                        # 应用入口

  pages/
    QuestionBankHome.jsx          # 题库首页
    ExamPaper.jsx                 # 通用试卷页（考试/解析模式）

  data/
    gesp/
      index.js                    # 试卷注册表（paperRegistry）
      level1~level8/              # 各等级题库数据（按年月）

  courses/                        # 课程页（Level/Python 等）
  lessons/cpp/l1~l6/              # C++ 逐课内容

  components/                     # 通用 UI 组件
  ekart/                          # ekart 子模块
  hardware/                       # 硬件课程子模块
```

---

## 路由说明（题库相关）

- `/question-bank`：题库首页
- `/question-bank/:level/:paperId`：试卷页面

示例：

- `/question-bank/1/2025-12`
- `/question-bank/2/2025-12-l2`

`ExamPaper.jsx` 会通过 `src/data/gesp/index.js` 的 `paperRegistry` 读取对应试卷数据。

---

## 题库数据约定（建议）

每道题建议包含以下字段：

```js
{
  id: "q1",                 // 唯一 id
  type: "single",           // single | judge
  question: "题干文本",
  options: ["A...", "B..."],
  answer: 1,                 // 正确选项索引
  score: 2,
  explanation: "答案解析"
}
```

试卷对象建议包含：

```js
{
  id: "2025-12-l2",
  title: "2025年12月 GESP C++ 二级真题",
  level: 2,
  timeLimit: 90 * 60,
  questions: [...]
}
```

---

## 部署

仓库包含 GitHub Actions 工作流：

- `.github/workflows/deploy.yml`

默认用于构建并发布到 GitHub Pages（仓库设置与权限需正确配置）。

---

## 最近修复

- 修复考试模式题目标题可能出现重复序号（如 `1.1.`）的问题：
  - 在 `ExamPaper.jsx` 渲染题干时移除题干前缀编号，统一由页面序号展示。
