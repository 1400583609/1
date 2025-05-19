const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'src')));

// 添加健康检查端点
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 日志记录中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.headers['user-agent'] || 'Unknown'}`);
  next();
});

// 处理根路径请求，重定向到index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// 处理/hello路径，返回简单的HTML
app.get('/hello', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hello World</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 100px;
          background-color: #f0f8ff;
        }
        h1 {
          color: #0077cc;
        }
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello World!</h1>
        <p>如果您看到此消息，说明服务器工作正常。</p>
        <p>当前时间: ${new Date().toLocaleString()}</p>
        <p><a href="/pages/SimpleHome.html">查看主页</a></p>
      </div>
    </body>
    </html>
  `);
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
  console.log(`源文件目录: ${path.join(__dirname, 'src')}`);
}); 