/**
 * 应用程序配置文件
 * @port-config { 
 *   "dev": 3001,
 *   "prod": 443,
 *   "internal": 5000 
 * }
 */

// 根据环境确定API基础URL
const getBaseApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/api'; // 生产环境通过Nginx代理
  } else {
    return 'http://localhost:5000/api'; // 开发环境直接连接后端
  }
};

const config = {
  // 应用信息
  appName: '动维康',
  appDescription: '老年人健康管理平台',
  
  // API配置
  api: {
    baseUrl: getBaseApiUrl(),
    timeout: 15000, // 默认请求超时时间 (15秒)
    retryTimes: 1,  // 请求失败自动重试次数
  },
  
  // 端口配置
  ports: {
    frontend: process.env.PORT || 3001,
    backend: 5000,
    database: 27017,
  },
  
  // 多环境配置
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  }
};

export default config; 