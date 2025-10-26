# GitHub Pages 部署指南

本指南详细说明如何将信秋映鸢博客网站部署到GitHub Pages，让您拥有一个免费的个人网站。

## 🎯 部署前准备

### 1. 创建GitHub账户

如果您还没有GitHub账户：
1. 访问 [https://github.com](https://github.com)
2. 点击 "Sign up"
3. 填写注册信息
4. 验证邮箱

### 2. 准备网站文件

确保您有以下文件：
```
├── index.html
├── articles.html
├── study.html
├── main.js
├── resources/
│   ├── hero-bg.jpg
│   └── avatar.jpg
└── README.md
```

## 📂 方法1：直接上传文件

### 步骤1：创建特殊命名的仓库

1. 登录GitHub
2. 点击右上角的 "+" → "New repository"
3. **重要**：仓库名必须为：`xinqiuyingyuan.github.io`
4. 选择 "Public"（公开仓库）
5. 不要初始化README
6. 点击 "Create repository"

### 步骤2：上传文件

1. 进入新创建的仓库
2. 点击 "uploading an existing file"
3. 拖拽所有文件到上传区域
4. 确保文件结构正确：
   ```
   xinqiuyingyuan.github.io/
   ├── index.html
   ├── articles.html
   ├── study.html
   ├── main.js
   └── resources/
       ├── hero-bg.jpg
       └── avatar.jpg
   ```
5. 在 "Commit changes" 处填写：
   - 标题：`Initial blog setup`
   - 描述：`Add all website files`
6. 点击 "Commit changes"

### 步骤3：启用GitHub Pages

1. 进入仓库的 "Settings" 标签
2. 向下滚动到 "Pages" 部分
3. 在 "Source" 部分：
   - 选择 "Deploy from a branch"
   - 选择 "main" 分支
   - 选择 "/ (root)" 文件夹
4. 点击 "Save"

### 步骤4：访问您的网站

1. 等待几分钟（GitHub需要时间来部署）
2. 访问：`https://xinqiuyingyuan.github.io`
3. 您的博客现在应该可以正常访问了！

## 🖥️ 方法2：使用Git命令行

### 步骤1：安装Git

如果您还没有安装Git：
- Windows: [下载Git](https://git-scm.com/download/win)
- Mac: `brew install git`
- Linux: `sudo apt-get install git`

### 步骤2：配置Git

```bash
git config --global user.name "您的GitHub用户名"
git config --global user.email "您的GitHub邮箱"
```

### 步骤3：初始化本地仓库

```bash
# 进入项目文件夹
cd /path/to/your/blog

# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交文件
git commit -m "Initial blog setup"
```

### 步骤4：连接到GitHub

```bash
# 添加远程仓库
git remote add origin https://github.com/xinqiuyingyuan/xinqiuyingyuan.github.io.git

# 推送到GitHub
git push -u origin main
```

### 步骤5：启用Pages

按照方法1的步骤3启用GitHub Pages。

## 🔄 更新网站内容

### 更新文件

**方法1：直接在GitHub上编辑**
1. 进入GitHub仓库
2. 点击要编辑的文件
3. 点击铅笔图标 ✏️
4. 编辑内容
5. 提交更改

**方法2：本地编辑后推送**
```bash
# 编辑文件后
git add .
git commit -m "更新内容描述"
git push origin main
```

### 添加新文件

```bash
# 添加新文件到git
git add newfile.html
git commit -m "添加新文件"
git push origin main
```

## 🎨 自定义域名（可选）

### 步骤1：购买域名

在域名服务商处购买您喜欢的域名。

### 步骤2：配置DNS

1. 进入域名管理面板
2. 添加DNS记录：
   - 类型：A
   - 主机名：@ 或 www
   - 值：GitHub Pages的IP地址
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

### 步骤3：GitHub配置

1. 进入仓库的 "Settings" → "Pages"
2. 在 "Custom domain" 中输入您的域名
3. 点击 "Save"
4. 等待DNS生效（可能需要几小时）

## 🔧 高级配置

### 1. 启用HTTPS

GitHub Pages自动提供HTTPS：
1. 在Pages设置中勾选 "Enforce HTTPS"
2. 等待证书生成
3. 所有HTTP请求将自动重定向到HTTPS

### 2. 设置404页面

创建 `404.html` 文件：
```html
<!DOCTYPE html>
<html>
<head>
    <title>页面未找到 - 信秋映鸢的博客</title>
</head>
<body>
    <h1>页面未找到</h1>
    <p>您访问的页面不存在。</p>
    <a href="/">返回首页</a>
</body>
</html>
```

### 3. 添加网站图标

1. 创建 `favicon.ico` 文件
2. 上传到仓库根目录
3. 在HTML中添加：
```html
<link rel="icon" href="/favicon.ico" type="image/x-icon">
```

### 4. 配置robots.txt

创建 `robots.txt` 文件：
```
User-agent: *
Allow: /

Sitemap: https://xinqiuyingyuan.github.io/sitemap.xml
```

## 📊 网站分析

### 添加Google Analytics

1. 注册 [Google Analytics](https://analytics.google.com)
2. 创建新的属性
3. 获取跟踪ID（格式：G-XXXXXXXXXX）
4. 在HTML文件中添加：
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 添加百度统计

1. 注册 [百度统计](https://tongji.baidu.com)
2. 获取统计代码
3. 添加到HTML文件中

## 🛡️ 安全考虑

### 1. 保护敏感信息

- **不要**在代码中包含API密钥
- 使用环境变量或配置文件
- 在 `.gitignore` 中排除敏感文件

### 2. 内容安全

- 定期备份网站内容
- 监控异常访问
- 及时更新依赖库

### 3. 访问控制

- 设置合理的管理员密码
- 限制敏感操作的访问
- 记录重要操作日志

## 🐛 常见问题解决

### 网站无法访问

1. **检查仓库名**
   - 必须为：`xinqiuyingyuan.github.io`
   - 不能有任何拼写错误

2. **检查文件结构**
   - `index.html` 必须在根目录
   - 文件路径是否正确

3. **等待部署完成**
   - GitHub Pages部署需要几分钟
   - 检查邮箱是否收到部署通知

4. **清除缓存**
   - 浏览器缓存可能导致问题
   - 尝试无痕模式访问

### 样式显示异常

1. **检查CSS文件**
   - 确认CSS文件已上传
   - 检查文件路径

2. **检查图片资源**
   - 确认图片文件存在
   - 检查图片路径和格式

3. **浏览器兼容性**
   - 尝试不同浏览器
   - 更新浏览器版本

### 功能无法正常工作

1. **检查JavaScript**
   - 查看浏览器控制台错误
   - 确认JS文件已正确加载

2. **检查API配置**
   - JSONBin.io配置是否正确
   - 网络连接是否正常

3. **权限问题**
   - 管理员权限是否生效
   - 本地存储是否可用

## 📈 性能优化

### 1. 图片优化

- 使用WebP格式
- 压缩图片大小
- 使用适当的尺寸

### 2. 代码优化

- 压缩CSS和JavaScript
- 移除未使用的代码
- 使用CDN加速

### 3. 缓存策略

- 设置合适的缓存头
- 使用浏览器缓存
- 实现资源版本控制

## 🚀 持续集成

### 使用GitHub Actions

创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📞 技术支持

### 获取帮助

1. **GitHub Issues**
   - 在您的仓库创建Issue
   - 描述遇到的问题
   - 提供错误信息

2. **GitHub文档**
   - [GitHub Pages文档](https://docs.github.com/en/pages)
   - [Pages快速入门](https://docs.github.com/en/pages/quickstart)

3. **社区支持**
   - GitHub Community
   - Stack Overflow
   - 相关技术论坛

### 最佳实践

1. **版本控制**
   - 使用有意义的提交信息
   - 定期备份重要更改
   - 使用分支进行开发

2. **文档维护**
   - 保持README更新
   - 记录重要配置
   - 添加使用说明

3. **安全维护**
   - 定期更新依赖
   - 监控安全漏洞
   - 备份重要数据

## 🎉 恭喜！

您的个人博客现在已经成功部署到GitHub Pages！您可以通过以下地址访问：

**🌐 https://xinqiuyingyuan.github.io**

享受您的博客之旅！🌸✨