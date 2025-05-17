#!/bin/bash

# 版本恢复脚本

function print_help {
    echo "动维康项目版本恢复工具"
    echo "用法:"
    echo "  ./restore-version.sh list              - 显示最近10次备份记录"
    echo "  ./restore-version.sh list YYYY-MM-DD   - 显示特定日期的备份记录"
    echo "  ./restore-version.sh restore COMMIT_ID - 恢复特定提交ID的版本"
    echo "  ./restore-version.sh file FILE COMMIT_ID - 只恢复特定文件的特定版本"
    echo "例如:"
    echo "  ./restore-version.sh list 2024-03-20"
    echo "  ./restore-version.sh restore a1b2c3d"
    echo "  ./restore-version.sh file frontend/src/components/TCMGuidance.tsx a1b2c3d"
}

function list_backups {
    if [ -z "$1" ]; then
        echo "显示最近10次备份:"
        git log -n 10 --pretty=format:"%h - %ad : %s" --date=format:"%Y-%m-%d %H:%M:%S"
    else
        echo "显示 $1 的备份:"
        git log --since="$1 00:00:00" --until="$1 23:59:59" --pretty=format:"%h - %ad : %s" --date=format:"%Y-%m-%d %H:%M:%S"
    fi
}

function restore_version {
    if [ -z "$1" ]; then
        echo "错误: 未指定提交ID"
        print_help
        exit 1
    fi
    
    read -p "警告: 将恢复到提交 $1, 当前未提交的更改将丢失! 确认操作? (y/n): " confirm
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        echo "正在恢复到提交 $1..."
        git reset --hard "$1"
        echo "恢复完成. 当前版本:"
        git log -n 1 --pretty=format:"%h - %ad : %s" --date=format:"%Y-%m-%d %H:%M:%S"
    else
        echo "操作已取消"
    fi
}

function restore_file {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "错误: 未指定文件路径或提交ID"
        print_help
        exit 1
    fi
    
    read -p "将恢复文件 $1 到提交 $2 版本, 确认操作? (y/n): " confirm
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        echo "正在恢复文件 $1 到提交 $2..."
        git checkout "$2" -- "$1"
        echo "文件恢复完成."
    else
        echo "操作已取消"
    fi
}

# 主逻辑
case "$1" in
    list)
        list_backups "$2"
        ;;
    restore)
        restore_version "$2"
        ;;
    file)
        restore_file "$2" "$3"
        ;;
    *)
        print_help
        ;;
esac 