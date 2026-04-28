# Workflow | 发布工作流

## 默认发布路径 | Default Publish Path

1. 检查 repo state
2. 从 `main` 创建一个短生命周期的 working branch
3. 只 stage 本次任务需要的文件
4. 用简洁的 commit message 提交
5. 以 upstream tracking 方式 push
6. 用 `gh pr create` 创建 PR
   - 如果本轮没有由 agent 直接完成 PR 创建，而是让用户手动创建 PR，必须同时提供建议 PR title 和可直接粘贴的中文 PR description/body。
7. 在 GitHub 上完成 merge
8. 用户确认 GitHub 侧动作已完成后，agent 主动清理本地分支状态

## 推荐命令 | Preferred Commands

- Check auth | 检查认证：
  - `gh auth status`
- Create branch | 创建分支：
  - `git switch -c codex-<short-description>`
- Push | 推送：
  - `git push -u origin <branch>`
- Create PR | 创建 PR：
  - `gh pr create --draft`
- Manual PR handoff | 手动创建 PR 交接：
  - 提供 GitHub PR 创建链接
  - 提供建议 PR title
  - 提供可直接粘贴的中文 PR description/body
  - 提醒用户完成 create / merge / delete branch 后通知 agent cleanup
- Cleanup after merge | 合并后清理：
  - `git switch main`
  - `git pull origin main`
  - `git branch -d <branch>`
  - `git fetch --prune`
  - `git status -sb`

## 说明 | Notes

- 即使是用户自己的仓库，如果 GitHub app installation 缺少写权限，GitHub connector 也可能在创建 PR 时失败。
- 遇到这种情况，不要反复重试 connector，优先改用 `gh`。
- 只要 PR 创建交给用户完成，包括 agent 只提供 GitHub PR 创建链接的情况，都视为 manual PR handoff，必须提供中文 PR 描述。
- 当用户说 PR 已创建、已 merge、已删除远端分支、或 GitHub 侧已完成时，不要只回复命令；应直接执行 cleanup 命令。只有遇到本地未提交变更、分支未合并、或无法判断待删分支时才停下来说明风险并询问。
