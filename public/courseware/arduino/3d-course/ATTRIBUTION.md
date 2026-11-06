# 致谢与来源 / Attribution

本目录是 [Learn Arduino](https://learn-arduino-red.vercel.app/) 的离线镜像，嵌入 gesp-app 供课堂使用（ESP32 版见 `public/courseware/esp32/3d-course/`）。

- **原作者**：Dilum Sanjaya（[x.com/DilumSanjaya](https://x.com/DilumSanjaya)，GitHub [@dilums](https://github.com/dilums)）
- **原站**：https://learn-arduino-red.vercel.app/
- **首次镜像**：2026-10-23（commit `1780c38c`）
- **最近同步**：2026-11-07，入口 `assets/index-DOAqqu4h.js`、样式 `assets/index-Db24VE9E.css`。
- **许可**：上游未见公开源码和开源许可证；这是站点所有者接受风险后的离线镜像。作者要求时请立即下线。

## 改动
- 资源路径改成相对路径，可放在任意子路径（`/courseware/arduino/3d-course/`）。
- 语言：显式语言子页面优先；默认入口使用 localStorage 中已选择的语言，否则显示简体中文（`zh`），不根据浏览器地区自动切换成繁体中文。语言菜单记住选择，并在本站子目录中切换。
- canonical 链接改成相对路径。
- 保留页面里的 “Designed by x.com/DilumSanjaya” 署名。

## 2026-11-07 同步记录

- 同步原站现行的主程序、样式及依赖资源；新增繁体中文、希伯来语语言包与页面，以及希伯来语字体、从右向左排版和代码注释方向支持。
- 对比前后课程数据和 3D 场景代码：课程仍为 16 节，未发现新增课程；场景、组件和缩略图模块的变化是依赖引用更新。
- 保留作者署名与本站路径适配；默认入口的加载提示和元数据改为简体中文。
- 补齐原站引用的分享预览图片与应用图标，并将字体、预加载、语言跳转及 Web App Manifest 路径适配到课程子目录。
- 上游原始文件 SHA-256 见 `UPSTREAM.json`，用于下次更新比较；摘要为适配前的下载内容。
