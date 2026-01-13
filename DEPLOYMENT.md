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
