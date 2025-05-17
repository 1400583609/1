# 构建阶段
FROM node:16-alpine as build

WORKDIR /app

# 优化包管理
COPY package*.json ./
RUN npm ci --only=production

# 复制源码
COPY . .

# 构建生产版本
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建好的静态文件
COPY --from=build /app/build /usr/share/nginx/html

# 复制自定义nginx配置（可选，已在docker-compose中挂载）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 健康检查端点
RUN echo '<!DOCTYPE html><html><head><title>Health Check</title></head><body>OK</body></html>' > /usr/share/nginx/html/health

# 配置容器
EXPOSE 3001

# 添加启动脚本
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"] 