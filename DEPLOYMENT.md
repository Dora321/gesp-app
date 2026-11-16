# 快速部署指南

## 🚀 发布到GitHub并部署到网页

### 步骤1：创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名：`gesp-app`
3. 选择 **Public**（公开）
4. **不要**勾选任何初始化选项
5. 点击 **Create repository**

### 步骤2：推送代码到GitHub

在项目目录打开PowerShell，执行：

```powershell
# 初始化Git（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接GitHub仓库（替换YOUR-USERNAME）
git remote add origin https://github.com/YOUR-USERNAME/gesp-app.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages

1. 进入GitHub仓库页面
2. 点击 **Settings** → **Pages**
3. Source 选择：**GitHub Actions**
4. 保存

### 步骤4：等待部署完成

- 在仓库的 **Actions** 标签页查看部署进度
- 部署完成后，访问：`https://YOUR-USERNAME.github.io/gesp-app/`

---

## 🔄 后续更新

每次修改代码后：

```powershell
git add .
git commit -m "更新说明"
git push
```

GitHub Actions会自动重新部署网站。

---

## 📝 注意事项

1. 如果仓库名不是 `gesp-app`，需要修改 `vite.config.js` 中的 `base` 配置
2. 首次部署可能需要等待5-10分钟
3. 确保仓库是 Public（公开）才能使用免费的GitHub Pages

---

## 🎯 其他部署选项（更简单）

### Vercel（推荐）
1. 访问 https://vercel.com
2. 使用GitHub登录
3. 导入仓库 → 自动部署
4. 每次推送自动更新

### Netlify
1. 访问 https://netlify.com
2. 使用GitHub登录
3. 导入仓库 → 自动部署

---

## 课堂服务反向代理

课堂服务默认只信任回环地址上的代理，并取 `X-Forwarded-For` 最右侧一跳作为客户端 IP。若反向代理不在本机，请用 `CLASSROOM_TRUSTED_PROXIES`（逗号分隔的精确 IP；`none` 表示不信任任何代理）配置，然后重启 `gesp-classroom`。

## 上线后验证直达链接不再 301

构建脚本会为每个非根路由额外生成一份 `dist/<route>.html`，内容与 `dist/<route>/index.html` 一致。GitHub Pages 的 `.html` 规则优先于目录重定向，因此站内链接、分享链接和收藏里不带斜杠的地址应直接返回 200（canonical 与 sitemap 仍使用带斜杠地址）。部署后执行：

```bash
curl -sI https://dora321.github.io/gesp-app/question-bank | head -1   # 期望 HTTP/2 200
curl -sI https://dora321.github.io/gesp-app/question-bank/ | head -1  # 期望 HTTP/2 200
curl -sI https://dora321.github.io/gesp-app/question-bank/2/2026-03-l2 | head -1
curl -sI https://dora321.github.io/gesp-app/hardware/esp32/16.5 | head -1
```

若不带斜杠的地址仍返回 301，说明 GitHub Pages 的实际行为与预期不符；可直接回退此改动（回退后只是少了多出来的 `.html` 文件，对现有页面没有副作用）。
