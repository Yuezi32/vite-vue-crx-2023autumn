# 2023金秋版：基于Vite4+Vue3的Chrome插件开发教程

基于Vite4的Chrome Extension Manifest V3工程脚手架。

本项目架构实现了以下功能：

- 基于Vite 4.x搭建
- 基于Chrome Extension Manifest V3规范
- 集成Sass/Scss/Less/Stylus
- 集成Element Plus
- 集成mock.js、mockjs-fetch模拟请求
- 集成vue-router
- 将popup、content、background目录互相独立，便于团队协作开发维护
- 按照Chrome Extension最终生成目录要求配置Vite
- 封装fetch，满足popup、content script、background script跨域请求
- 实现了完整的Chrome Extension MV3项目Demo。


## 安装项目
执行：
```
npm install
```
或
```
yarn
```

## 使用方法：开发环境

> ※注：为方便演示接口请求，本Demo使用了mock.js，也配置了反向代理。
> mock.js便于直接调试，使用前请修改src/api/index.js，将import '@/mock'前的注释去掉，保证mock.js的正确引入。
> 如使用反向代理，需要自行在本地搭建API服务，接口返回数据可参考src/mock.js中的数据。

执行：
```
npm run dev
```
或
```
yarn dev
```

## 使用方法：build项目

> ※注：
> 1. 执行build前一定检查是否取消mock.js，即确认src/api/index.js中，将import '@/mock'注释掉。这是因为mock.js使用window变量，而运行background script的Service Worker不支持window，将导致插件运行失败。
> 2. 执行build前一定检查src/popup/popup.vue代码中，注释掉import '@/content'。这段代码是用于方便在开发环境调试content script的，否则content script会被集成到popup页面中。

执行：
```
npm run build
```
或
```
yarn build
```

build完成后，打开Chrome浏览器，地址栏输入：
```
chrome://extensions/
```
进入扩展程序界面。

1. 开启右上角的“开发者模式”。
2. 点击左上角的“加载已解压的扩展程序”。
3. 选择项目工程中刚生成的build目录。

## 关于真实API请求（非mock.js模拟请求）

本Demo不包含后端API服务。如在开发环境使用反向代理请求API，或者在build后的正式插件中请求API，请自行搭建后端API服务，返回的数据可参照src/mock.js或教程中相应章节的截图。

## 配套教程

📚📚本项目有详细的讲解教程，原文请关注我的微信公众号【卧梅又闻花】📚📚

查阅本项目完整教程：[《2023金秋版：基于Vite4+Vue3的Chrome插件开发教程》](https://mp.weixin.qq.com/s/sQI1gvMFu8W2SrWNm0WvYw)

### 教程目录

先看下目录了解本教程都有哪些内容。强烈建议按照以下章节一步一步边学边做，可以快速掌握整个项目的原理和细节，在以后遇到新问题的时候，可以知道从哪个环节入手。

```
1 初始化项目
• 1.1 使用Vite新建项目
• 1.2 安装并运行项目
• 1.3 精简项目
2 Vite基础配置
• 2.1 配置国内镜像源
• 2.2 支持Sass/Scss/Less/Stylus
• 2.3 设置dev环境的Server端口号
• 2.4 设置dev环境自动打开浏览器
• 2.5 设置路径别名
3 Chrome Extension基础
• 3.1 Manifest V3概述
• 3.2 Manifest V3 主要新特性
• 3.3 Chrome Extension的组成
• 3.4 规划build生成的目录结构
• 3.5 配置manifest.json
4 项目目录结构设计
5 针对Chrome Extension的Vite配置
• 5.1 设置全局配置
• 5.2 设置popup的build配置
• 5.3 设置content script的build配置
• 5.4 设置background script的build配置
• 5.5 通过补充脚本合并三个build
6 设置公用样式并集成Element Plus
• 6.1 关于样式命名规范
• 6.2 设置全局公用样式
• 6.3 集成Element Plus
• 6.4 设置Element Plus为中文语言
7 Popup开发
• 7.1 迁移main.js至popup目录
• 7.2 构建popup的Login页面
• 7.3 构建popup的Home页面
• 7.4 构建popup的Account页面
• 7.5 配置popup页面路由
• 7.6 构建Nav导航组件
• 7.7 构建Entry二级路由框架页面
• 7.8 调整popup入口页面，打通全部路由
• 7.9 完善Login页面的登录跳转
• 7.10 设置popup页面尺寸
8 build项目并载入插件
9 background script开发
• 9.1 设置允许运行popup的页面规则
• 9.2 为什么插件图标在禁用页面不变成灰色
10 content script开发
• 10.1 向目标页面注入悬浮球
• 10.2 在content script中集成Element Plus并解决样式污染
• 10.3 在content script中使用Element Plus
11 在开发环境中调试content script
12 API请求
• 12.1 background pages不支持XMLHttpRequest（axios）
• 12.2 使用mock.js和mockjs-fetch模拟请求
• 12.3 封装API及fetch业务逻辑
• 12.4 委托background script完成API请求
• 12.5 实现popup的Login页面API请求
• 12.6 设置开发环境的反向代理请求
• 12.7 实现content script的API请求
• 12.8 关键知识点小结
13 其他说明
• 13.1 permission权限配置
• 13.2 以<script>方式向目标页面插入js
• 13.3 Service Worker调试
• 13.4 popup页面调试
• 13.5 批量升级全部项目npm依赖包
14 项目Git源码
结束语
```
