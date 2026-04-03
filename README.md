# 个人网站模板

一个现代化、响应式的静态个人网站模板，采用纯 HTML、CSS 和 JavaScript 构建，易于部署到 GitHub Pages。

## 特性

- 响应式设计 - 完美适配桌面端、平板和移动设备
- 现代化 UI - 采用渐变色彩和流畅动画
- 模块化结构 - 清晰的代码组织，易于扩展
- 交互丰富 - 打字机效果、滚动动画、项目筛选等
- 性能优化 - 懒加载、防抖节流等优化手段
- SEO 友好 - 语义化标签和 meta 信息
- 无障碍支持 - ARIA 标签和键盘导航

## 项目结构

```
personal_website/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # JavaScript 交互
├── images/             # 图片资源（自行添加）
└── README.md           # 项目说明
```

## 快速开始

### 1. 克隆或下载项目

```bash
git clone https://github.com/yourusername/personal_website.git
cd personal_website
```

### 2. 本地预览

直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js
npx serve

# 或使用 VS Code Live Server 插件
```

### 3. 自定义内容

编辑 `index.html` 文件，修改以下内容：

- **个人信息**：搜索 "你的名字" 并替换
- **头像图片**：替换 `hero-avatar` 中的图片链接
- **关于我**：修改关于部分的文字描述
- **技能**：调整技能卡片中的内容
- **项目**：更新项目展示区的内容
- **联系方式**：修改邮箱、电话等信息

### 4. 部署到 GitHub Pages

1. 在 GitHub 创建新仓库
2. 将代码推送到仓库
3. 进入仓库 Settings → Pages
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "main" 或 "master"，文件夹选择 "/ (root)"
6. 点击 Save，等待几分钟即可访问

访问地址格式：`https://yourusername.github.io/repository-name/`

## 自定义指南

### 修改颜色主题

在 `css/style.css` 中修改 CSS 变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 辅助色 */
    --accent-color: #ec4899;     /* 强调色 */
}
```

### 添加新项目

在 `index.html` 的项目区域复制一个 `.project-card` 并修改内容：

```html
<div class="project-card" data-category="web">
    <div class="project-image">
        <img src="项目图片链接" alt="项目名称">
        <div class="project-overlay">
            <a href="项目链接" class="project-link">查看</a>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-title">项目名称</h3>
        <p class="project-description">项目描述</p>
        <div class="project-tags">
            <span class="tag">技术标签</span>
        </div>
    </div>
</div>
```

### 修改打字机文字

在 `js/main.js` 中修改：

```javascript
const typingConfig = {
    texts: ['前端开发者', 'UI/UX 设计师', '全栈工程师'],
    // ...
};
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 扩展建议

### 添加博客功能

考虑使用以下静态网站生成器：
- [Jekyll](https://jekyllrb.com/) - GitHub Pages 原生支持
- [Hugo](https://gohugo.io/) - 速度极快
- [Hexo](https://hexo.io/) - 简单易用

### 添加深色模式切换

在 `js/main.js` 中添加主题切换逻辑，使用 `localStorage` 保存用户偏好。

### 添加评论系统

- [Disqus](https://disqus.com/)
- [Gitalk](https://gitalk.github.io/)
- [Utterances](https://utteranc.es/)

### 添加分析工具

- [Google Analytics](https://analytics.google.com/)
- [Plausible](https://plausible.io/) (隐私友好)

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, 自定义属性)
- Vanilla JavaScript (ES6+)
- 无外部依赖（字体除外）

## 许可证

MIT License - 可自由使用和修改

## 致谢

- 图标：[Feather Icons](https://feathericons.com/)
- 字体：[Google Fonts - Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC)

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！
