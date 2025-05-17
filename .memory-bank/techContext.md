# 技术上下文

## 使用的技术栈
### 前端
- React 18.2.0：核心前端框架
- TypeScript 4.9.5：类型安全的JavaScript超集
- Ant Design 5.6.0：UI组件库
- SCSS：CSS预处理器
- React Router 6.12.1：路由管理
- Axios 1.4.0：HTTP客户端
- Ant Design Charts 1.4.2：数据可视化组件

### 后端
- 尚未实现

## 开发环境设置
- 使用create-react-app脚手架创建
- 开发服务器启动：使用start-dev.sh脚本或npm start
- 默认端口：前端3001，后端5000（可配置）
- Docker容器化支持（见docker-compose.yml）

## 技术约束
- 前端兼容性要求：支持现代浏览器
- 针对老年用户的交互设计：简化操作，增大字体
- 移动设备适配：响应式设计
- 打印支持：部分内容（如养生指南）需支持打印

## 依赖项
详见package.json文件，主要包括：
- React核心库
- Ant Design UI库
- 图表可视化库
- 路由管理
- HTTP客户端

## 构建与部署
- 开发环境：`npm start`或`./start-dev.sh`
- 生产构建：`npm run build`
- 使用Docker：详见Dockerfile和docker-compose.yml 