#!/bin/sh
set -e

# 动态替换环境变量
if [ -f "/usr/share/nginx/html/env-config.js" ]; then
  echo "正在替换环境变量..."
  
  # 替换API地址
  if [ ! -z "$API_URL" ]; then
    sed -i "s|window.ENV_CONFIG.API_URL = \".*\"|window.ENV_CONFIG.API_URL = \"$API_URL\"|g" /usr/share/nginx/html/env-config.js
  fi
  
  # 替换其他配置
  if [ ! -z "$APP_ENV" ]; then
    sed -i "s|window.ENV_CONFIG.APP_ENV = \".*\"|window.ENV_CONFIG.APP_ENV = \"$APP_ENV\"|g" /usr/share/nginx/html/env-config.js
  fi
  
  echo "环境变量替换完成"
fi

# 自动查找端口冲突并解决
if [ ! -z "$PORT" ] && [ "$PORT" != "80" ]; then
  echo "配置Nginx使用自定义端口: $PORT"
  sed -i "s|listen 80|listen $PORT|g" /etc/nginx/conf.d/default.conf
fi

# 执行CMD
exec "$@" 