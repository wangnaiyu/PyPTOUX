# Workflow | 发布工作流

## 默认发布路径 | Default Publish Path

1. 检查 repo state
2. 从 `main` 创建一个短生命周期的 working branch
3. 只 stage 本次任务需要的文件
4. 用简洁的 commit message 提交
5. 以 upstream tracking 方式 push
6. 用 `gh pr create` 创建 PR
7. 在 GitHub 上完成 merge
8. 清理本地分支状态

## 推荐命令 | Preferred Commands

- Check auth | 检查认证：
  - `gh auth status`
- Create branch | 创建分支：
  - `git switch -c codex-<short-description>`
- Push | 推送：
  - `git push -u origin <branch>`
- Create PR | 创建 PR：
  - `gh pr create --draft`
- Cleanup after merge | 合并后清理：
  - `git switch main`
  - `git pull origin main`
  - `git branch -d <branch>`
  - `git fetch --prune`

## 说明 | Notes

- 即使是用户自己的仓库，如果 GitHub app installation 缺少写权限，GitHub connector 也可能在创建 PR 时失败。
- 遇到这种情况，不要反复重试 connector，优先改用 `gh`。
