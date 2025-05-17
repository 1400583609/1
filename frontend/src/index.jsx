import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.scss';

// 创建根节点
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

// 渲染应用
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// 立即渲染
renderApp();

// 启用热模块替换，避免整页刷新
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    console.log('热更新 App 组件');
    renderApp();
  });
}

// 添加健康检查端点，用于容器健康监控
if (process.env.NODE_ENV === 'production') {
  // 生产环境中通过nginx的location匹配提供健康检查
  console.log('生产环境已启动');
} else {
  // 开发环境中模拟health端点
  const healthCheck = document.createElement('div');
  healthCheck.id = 'health-check';
  healthCheck.style.display = 'none';
  document.body.appendChild(healthCheck);
} 