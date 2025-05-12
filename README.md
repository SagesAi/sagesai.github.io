# Terminal Agent 官方网站

这是 Terminal Agent 的官方网站项目，基于 Astro 构建，可以部署到 GitHub Pages。

## 📝 项目介绍

Terminal Agent 是一个强大的智能终端助手，支持自然语言交互执行系统诊断、命令翻译和自动软件安装。本网站提供了项目介绍、功能展示和博客文章，帮助用户了解和使用 Terminal Agent。

## 🚀 项目结构

```text
/
├── public/                 # 静态资源目录
│   └── images/             # 图片资源
├── src/
│   ├── components/         # 组件目录
│   ├── content/            # 内容目录
│   │   └── blog/           # 博客文章 (Markdown)
│   ├── layouts/            # 布局组件
│   └── pages/              # 页面
│       ├── blog/           # 博客页面
│       └── index.astro     # 首页
├── .github/                # GitHub 配置
│   └── workflows/          # GitHub Actions 工作流
└── package.json            # 项目依赖
```

## 🧞 常用命令

所有命令都在项目根目录下的终端中运行：

| 命令                      | 功能                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 安装依赖                                         |
| `npm run dev`             | 启动本地开发服务器，地址为 `localhost:4321`      |
| `npm run build`           | 构建生产版本到 `./dist/` 目录                    |
| `npm run preview`         | 在部署前本地预览构建版本                          |

## 📦 部署到 GitHub Pages

本项目已配置好 GitHub Actions 工作流，可以自动部署到 GitHub Pages。

### 部署步骤

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages，选择 GitHub Actions 作为部署来源
3. 每次推送到 `main` 分支时，网站将自动构建并部署

### 手动部署

你也可以手动构建并部署：

```bash
# 构建网站
npm run build

# 将 dist 目录内容推送到 GitHub Pages 分支
```

## 📝 添加博客文章

在 `src/content/blog/` 目录下创建新的 Markdown 文件，格式如下：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: "2025-05-09"
heroImage: "/terminal-agent/images/your-image.jpg"
author: "作者名称"
readingTime: "阅读时间"
---

# 文章内容

这里是文章正文...
```

## 🔧 自定义

- 网站配置：修改 `astro.config.mjs` 文件
- 样式：修改 Tailwind 配置和组件样式
- 内容：更新页面内容和博客文章

## 👥 贡献

欢迎提交 Pull Request 或创建 Issue 来改进网站！
