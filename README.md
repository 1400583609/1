# 项目自动备份系统

本项目已设置自动备份机制，代码会每天自动保存到GitHub仓库。

## 备份机制说明

- 使用GitHub Actions实现自动备份
- 每天午夜（UTC时间）自动运行
- 自动提交当天的所有更改
- 提交信息格式为："自动备份 YYYY-MM-DD"

## 如何查找历史版本

1. 在GitHub仓库页面上点击"Commits"查看所有提交历史
2. 根据日期找到需要的历史版本
3. 点击对应的提交查看详细变更
4. 可通过"Browse files"按钮浏览该时间点的完整代码

## 手动触发备份

如需立即备份当前代码：
1. 在GitHub仓库页面上点击"Actions"
2. 选择"Daily Code Backup"工作流
3. 点击"Run workflow"按钮
4. 确认运行 