#!/bin/bash

echo "设置Git自动备份..."

# 1. 设置Git全局配置
echo "配置Git用户信息..."
read -p "请输入Git用户邮箱: " GIT_EMAIL
read -p "请输入Git用户名称: " GIT_USERNAME

git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_USERNAME"

# 2. 添加远程仓库
echo "配置远程仓库..."
read -p "请输入Git仓库地址(如 https://github.com/username/repo.git): " REPO_URL

git remote add origin $REPO_URL

# 3. 设置Cron定时任务
echo "设置自动备份定时任务..."
SCRIPT_PATH="$(pwd)/auto-commit.sh"

# 检查是否已存在相同的cron任务
EXISTING_CRON=$(crontab -l 2>/dev/null | grep -F "$SCRIPT_PATH")

if [ -z "$EXISTING_CRON" ]; then
    # 添加每天凌晨3点执行的cron任务
    (crontab -l 2>/dev/null; echo "0 3 * * * $SCRIPT_PATH >> $(pwd)/backup.log 2>&1") | crontab -
    echo "已添加定时任务: 每天凌晨3点自动备份"
else
    echo "定时任务已存在，无需重复添加"
fi

# 4. 执行初始提交
echo "执行初始提交..."
git add .
git commit -m "初始提交 @ $(date +"%Y%m%d-%H%M%S")" --no-verify || echo "没有更改需要提交"

echo "自动备份设置完成!"
echo "您可以通过 ./auto-commit.sh 手动触发备份"
echo "备份日志将保存在 $(pwd)/backup.log" 