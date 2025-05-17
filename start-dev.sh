#!/bin/bash

# 开发环境启动脚本 - 自动处理端口冲突
# 使用: ./start-dev.sh [前端端口] [后端端口]

# 默认端口配置
FRONTEND_PORT=${1:-3001}
BACKEND_PORT=${2:-5000}

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 恢复默认颜色

# 打印带颜色的消息
print_message() {
  echo -e "${2}${1}${NC}"
}

# 检查端口是否被占用
check_port() {
  local port=$1
  local service=$2
  
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    print_message "警告: $service 端口 $port 已被占用!" $YELLOW
    return 1
  fi
  return 0
}

# 查找可用端口
find_available_port() {
  local base_port=$1
  local port=$base_port
  
  while ! check_port $port "测试"; do
    print_message "尝试端口 $((port+1))..." $BLUE
    port=$((port+1))
  done
  
  echo $port
}

# 确保前端端口可用
if ! check_port $FRONTEND_PORT "前端"; then
  FRONTEND_PORT=$(find_available_port $FRONTEND_PORT)
  print_message "前端将使用端口: $FRONTEND_PORT" $GREEN
fi

# 确保后端端口可用
if ! check_port $BACKEND_PORT "后端"; then
  BACKEND_PORT=$(find_available_port $BACKEND_PORT)
  print_message "后端将使用端口: $BACKEND_PORT" $GREEN
fi

# 保存端口配置
echo "PORT=$FRONTEND_PORT" > frontend/.env.local
echo "REACT_APP_API_URL=http://localhost:$BACKEND_PORT/api" >> frontend/.env.local

# 添加其他环境变量
echo "REACT_APP_DEV_MODE=true" >> frontend/.env.local

# 显示启动信息
print_message "正在启动开发环境..." $GREEN
print_message "前端端口: $FRONTEND_PORT" $BLUE
print_message "后端端口: $BACKEND_PORT" $BLUE
print_message "API地址: http://localhost:$BACKEND_PORT/api" $BLUE

# 启动前端
cd frontend && npm start &
FRONTEND_PID=$!

# 先不启动后端，等待后端实现后再添加
# cd ../backend && PORT=$BACKEND_PORT npm start &
# BACKEND_PID=$!

print_message "开发服务器已启动!" $GREEN
print_message "前端地址: http://localhost:$FRONTEND_PORT" $GREEN
# print_message "后端地址: http://localhost:$BACKEND_PORT" $GREEN

# 捕获中断信号
trap 'echo -e "${RED}停止服务...${NC}"; kill $FRONTEND_PID 2>/dev/null; exit 0' INT

# 等待子进程
wait 