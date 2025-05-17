# 动维康老年人健康管理平台

## 项目简介
动维康是一个面向老年人的健康管理平台，集成了现代健康监测与中医养生理念。

## 自动备份系统

本项目配置了完整的Git自动备份方案，实现每日自动备份和版本管理。

### 备份系统初始设置

1. 运行设置脚本：
```bash
./setup-backup.sh
```

2. 按提示输入：
   - Git用户邮箱
   - Git用户名称
   - Git仓库地址

### 备份功能

- **自动备份**：系统会在每天凌晨3点自动备份
- **手动备份**：执行`./auto-commit.sh`可立即进行备份
- **备份日志**：所有备份操作记录在`backup.log`中

### 版本恢复

使用`restore-version.sh`脚本管理版本：

```bash
# 查看最近10次备份
./restore-version.sh list

# 查看特定日期备份
./restore-version.sh list 2024-03-20

# 恢复到特定版本
./restore-version.sh restore <commit-id>

# 恢复特定文件的特定版本
./restore-version.sh file <file-path> <commit-id>
```

### 备份策略

- 保留最近30天的版本历史
- 自动解决冲突（保留双方版本）
- 出错时生成错误日志

## 开发环境

### 启动开发服务器

```bash
# 使用开发脚本（自动处理端口冲突）
./start-dev.sh

# 或直接启动前端
cd frontend && npm start
```

## 技术栈

- 前端：React, TypeScript, Ant Design
- 样式：SCSS
- 后端：待实现 