# 信秋映鸢个人博客网站

一个粉色风格的现代化个人博客网站，包含首页、文章、学习记录三个模块，具有完整的管理功能和数据存储能力。

## 🌸 项目特色

- **粉色主题设计**：温柔浪漫的粉色配色方案
- **动态视觉效果**：鼠标粉色尾巴、打字机文字效果
- **完整功能系统**：文章管理、学习记录、留言系统
- **管理员权限**：密码认证的管理员模式
- **数据持久化**：支持JSONBin.io云端存储
- **响应式设计**：适配各种屏幕尺寸

## 📁 项目结构

```
/
├── index.html          # 首页
├── articles.html       # 文章页面
├── study.html         # 学习记录页面
├── main.js            # 主要JavaScript逻辑
├── resources/         # 资源文件夹
│   ├── hero-bg.jpg    # 首页背景图
│   └── avatar.jpg     # 头像图片
├── design.md          # 设计规范文档
├── interaction.md     # 交互设计文档
├── outline.md         # 项目规划文档
└── README.md          # 部署和修改文档
```

## 🚀 快速开始

### 1. 本地运行

```bash
# 克隆项目到本地
cd /path/to/blog

# 启动本地服务器
python -m http.server 8000

# 访问网站
# http://localhost:8000
```

### 2. GitHub Pages 部署

1. **创建GitHub仓库**
   - 在GitHub上创建名为 `xinqiuyingyuan.github.io` 的仓库
   - 设置仓库为公开（Public）

2. **上传文件**
   ```bash
   # 初始化git仓库
   git init
   git add .
   git commit -m "Initial blog setup"
   
   # 连接到GitHub
   git remote add origin https://github.com/xinqiuyingyuan/xinqiuyingyuan.github.io.git
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库的 Settings > Pages
   - 选择部署源为 main 分支
   - 网站地址：`https://xinqiuyingyuan.github.io`

## 🔧 JSONBin.io 配置

### 1. 创建JSONBin.io账户

1. 访问 [https://jsonbin.io](https://jsonbin.io)
2. 注册免费账户
3. 获取API密钥（X-Master-Key）

### 2. 创建数据存储Bin

**创建文章存储Bin：**
```bash
curl -X POST "https://api.jsonbin.io/v3/b" \
  -H "Content-Type: application/json" \
  -H "X-Master-Key: YOUR_API_KEY" \
  -d '{
    "articles": [],
    "studyRecords": [],
    "messages": [],
    "created": "2025-10-24"
  }'
```

**获取Bin ID：**
- 创建成功后，响应中会包含Bin ID
- 格式类似：`670a1b2c3d4e5f6789012345`

### 3. 配置网站

在 `main.js` 中配置您的Bin信息：

```javascript
// 在文件开头添加
window.blogData.setJsonBinConfig('YOUR_BIN_ID', 'YOUR_API_KEY');
```

## 🎨 自定义修改指南

### 1. 更换头像

**方法一：直接替换文件**
- 将您的头像图片重命名为 `avatar.jpg`
- 替换 `/resources/avatar.jpg` 文件

**方法二：修改HTML代码**
在 `articles.html` 和 `study.html` 中：
```html
<!-- 找到这行代码 -->
<div class="avatar-placeholder">👤</div>

<!-- 替换为 -->
<img src="path/to/your/avatar.jpg" alt="头像" class="avatar">
```

### 2. 更换背景图片

1. 准备一张高清背景图片
2. 替换 `/resources/hero-bg.jpg` 文件
3. 或修改CSS中的背景路径：
```css
.hero-bg {
    background-image: url('path/to/your/background.jpg');
}
```

### 3. 修改颜色主题

在CSS中修改颜色变量：
```css
:root {
    --sakura-pink: #FFB7C5;    /* 樱花粉 */
    --rose-pink: #FF69B4;      /* 玫瑰粉 */
    --peach-pink: #FFC0CB;     /* 蜜桃粉 */
    --light-pink: #FFF0F5;     /* 淡粉色 */
}
```

### 4. 修改管理员密码

在所有HTML文件的JavaScript中找到：
```javascript
if (password === 'sxm1104') {
    // 修改为您想要的密码
}
```

### 5. 添加新的社交链接

在 `articles.html` 和 `study.html` 的侧边栏部分：
```html
<div class="social-links">
    <a href="your-link" class="social-link" title="新链接" target="_blank">
        🔗
    </a>
</div>
```

### 6. 修改网站标题

在每个HTML文件的 `<title>` 标签中修改：
```html
<title>您的网站标题</title>
```

### 7. 添加新功能

**添加新页面：**
1. 创建新的HTML文件
2. 复制现有页面的导航栏结构
3. 在导航栏中添加新链接

**添加新交互：**
1. 使用现有的动画库（Anime.js, p5.js）
2. 参考现有代码的交互模式
3. 保持粉色主题的一致性

## 🔐 管理员功能

### 登录方式
1. 点击右下角的小锁图标 🔒
2. 输入密码：`sxm1104`（默认）
3. 获得管理员权限

### 管理员权限
- **文章管理**：添加、删除文章
- **学习记录**：编辑表格内容、添加新行
- **数据管理**：查看所有用户数据

### 退出管理员模式
清除浏览器localStorage或重新打开浏览器

## 📱 响应式设计

网站已适配：
- **桌面端**：1200px+
- **平板端**：768px - 1024px
- **移动端**：< 768px

主要适配特性：
- 导航栏在小屏幕变为汉堡菜单
- 表格支持横向滚动
- 卡片布局自适应
- 字体大小动态调整

## 🎯 性能优化

### 图片优化
- 使用WebP格式图片
- 压缩图片文件大小
- 设置合适的图片尺寸

### 代码优化
- 使用CDN加载库文件
- 压缩CSS和JavaScript
- 启用浏览器缓存

### 加载优化
- 异步加载非关键资源
- 预加载重要图片
- 延迟加载动画效果

## 🛠️ 技术栈

- **前端框架**：原生HTML5 + CSS3 + JavaScript
- **样式框架**：Tailwind CSS
- **动画库**：Anime.js, p5.js
- **字体**：Noto Sans SC, Noto Serif SC
- **存储**：JSONBin.io, localStorage
- **部署**：GitHub Pages

## 📞 技术支持

### 常见问题

**Q: 网站无法访问**
- 检查GitHub Pages是否启用
- 确认仓库名为 `xinqiuyingyuan.github.io`
- 检查文件是否已正确上传

**Q: 数据无法保存**
- 检查JSONBin.io配置
- 确认API密钥有效
- 查看浏览器控制台错误信息

**Q: 样式显示异常**
- 清除浏览器缓存
- 检查CSS文件路径
- 确认资源文件存在

### 联系方式
- GitHub Issues: [提交问题](https://github.com/xinqiuyingyuan/xinqiuyingyuan.github.io/issues)
- 邮箱：请通过GitHub联系

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目：
- [Tailwind CSS](https://tailwindcss.com/)
- [Anime.js](https://animejs.com/)
- [p5.js](https://p5js.org/)
- [Noto Fonts](https://fonts.google.com/noto)

---

**享受您的粉色博客之旅！** 🌸✨