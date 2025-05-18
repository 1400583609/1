# 动维康 - 老年人健康管理平台

动维康是一个专为老年人打造的综合健康管理平台，融合中医养生理念与现代医学科技，提供全方位的健康监测、管理和指导服务。

## 核心功能

1. 健康数据监测与管理
2. 个性化运动处方
3. 中医养生指导
4. AI智能问诊
5. 健康饮食指导
6. 日程与提醒系统
7. 冥想与心理健康
8. 社区互动
9. 个人健康档案

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 图表：Chart.js
- 开发服务器：http-server

## 项目结构

```
frontend/
├── src/
│   ├── assets/          # 图片、图标等资源
│   ├── components/      # 复用组件
│   ├── pages/           # 页面
│   ├── styles/          # 样式文件
│   └── utils/           # 工具函数
├── package.json
└── README.md
```

## 安装与运行

### 安装依赖

```bash
cd frontend
npm install
```

### 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看项目

## 页面说明

1. **首页(HomePage.html)**: 展示平台概述和主要功能模块
2. **健康数据监测(HealthMonitoring.html)**: 提供健康数据记录和分析
3. **中医养生指导(TCMMedicine.html)**: 包含经络养生、节气养生、传统运动等内容

## 自动备份

本项目已设置GitHub Actions自动备份，代码会每天自动保存到GitHub仓库。详情请查看[自动备份说明](../README.md)。 