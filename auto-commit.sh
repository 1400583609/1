#!/bin/bash

# 进入项目目录
cd /home/devbox/project

# 时间标记
COMMIT_DATE=$(date +"%Y%m%d-%H%M%S") 

# 执行提交
git add .memory-bank/ .cursorrules -f
git add .
git commit -m "Auto Backup @ $COMMIT_DATE" --no-verify || {
    echo "没有需要提交的更改或提交失败"
    exit 0
}

# 注释掉远程推送部分，待配置好远程仓库后再启用
# 冲突处理（保留两个版本）
#git pull --rebase || {
#    echo "拉取远程仓库失败，执行冲突处理"
#    git rebase --abort
#    git merge --abort
#    git reset --hard HEAD~1
#}

# 推送到远程仓库
#git push origin main -f || {
#    echo "推送到远程仓库失败"
#    exit 1
#}

echo "本地备份完成: $COMMIT_DATE"
echo "注意: 远程推送功能已暂时禁用，请配置好GitHub令牌后再启用"

# 版本保留策略（保留最近30天）
git reflog expire --expire=30.days.ago --expire-unreachable=now --all
git gc --prune=now

# 错误报警处理
if [ $? -ne 0 ]; then
    echo "备份失败：$COMMIT_DATE" >> /home/devbox/project/backup_error.log
    exit 1
fi 