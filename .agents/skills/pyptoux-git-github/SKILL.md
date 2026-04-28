---
name: pyptoux-git-github
description: Use this skill when working inside the PyPTOUX repository and you need to create branches, stage and commit changes, push to GitHub, create pull requests, or clean up local and remote Git state with project-specific defaults.
---

# PyPTOUX Git & GitHub Workflow | GitHub 发布流程

当任务发生在 PyPTOUX 仓库内，且涉及 branch、commit、push、PR 或本地/远端 Git 状态整理时，使用这个 skill。

## 先看项目级规则 | Project Rules First

- 项目级仓库信息和通用 Git / GitHub 约定，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- 这个 skill 只保留 Git 操作流程和发布细节。

## 先读什么 | What To Read First

- 先读 [../../../AGENTS.md](../../../AGENTS.md)，确认项目级规则。
- 先读 [references/workflow.md](references/workflow.md)，确认项目默认 workflow。
- 需要准备 PR 内容时，再读 [references/pr-template.md](references/pr-template.md)。

## 核心流程 | Core Workflow

1. 先确认当前工作目录位于 PyPTOUX 仓库。
2. 用下面这些命令检查仓库状态：
   - `git status -sb`
   - `git remote -v`
   - `git branch --show-current`
3. 遇到需要 GitHub 认证的操作前，先检查 `gh auth status`。
4. 分支策略：
   - 如果当前在 `main`，先创建新的 working branch。
   - 当环境里不方便使用 slash-style branch names 时，优先用 `codex-<short-description>`。
5. 只 stage 本次任务需要的改动。
6. commit message 保持简洁，并准确描述这次 repo-scoped change。
7. push 时带上 upstream tracking。
8. 创建 PR 时：
   - 能用 `gh pr create` 就优先用它。
   - 如果 GitHub connector 可用，也可以使用，但 `gh` 是更可靠的 fallback。
   - 如果 connector 报 `must be a collaborator` 之类的权限问题，不要反复重试，直接切换到 `gh`。
   - 如果本轮没有由 agent 直接完成 PR 创建，而是把 PR 创建交给用户，包括只提供 GitHub PR 创建链接的情况，必须主动提供：
     - 一个建议的 PR title
     - 一份可直接粘贴的中文 PR description/body
     - 一句简短提示，请用户完成 `create pr` / `merge` / `delete branch` 后通知 agent 做本地 cleanup
9. PR merge 之后：
   - 切回 `main`
   - 拉取最新的 `origin/main`
   - 删除已经合并的本地分支
   - `git fetch --prune`

## 默认决策 | Default Decisions

- 除非用户明确要求 ready for review，否则默认使用 draft PR。
- 优先使用小而聚焦的 task branch，不要反复复用旧分支。
- 不要把 tokens、device codes 或其他敏感凭据写进仓库文件。
- 判断 CLI 是否能创建 PR 时，以 `gh auth status` 为准。
- 只要本轮没有由 agent 直接完成 PR 创建，而是需要用户去 GitHub 手动创建 PR，主动提供：
  - 一个建议的 PR title
  - 一份可直接粘贴的中文 PR description/body
  - 一句简短提示，请用户去 GitHub 完成 `create pr`、`merge`、`delete branch`
- 用户确认 PR 已创建 / 已 merge / 已删除远端分支 / GitHub 侧动作已经完成后，不要只给命令建议；必须立即主动做本地 cleanup：
  - `git switch main`
  - `git pull origin main`
  - `git branch -d <working-branch>`
  - `git fetch --prune`
  - `git status -sb`
  - 确认本地仓库已回到干净的 `main`
- 如果 cleanup 中遇到本地未提交变更、分支未合并、或无法判断 `<working-branch>`，先说明具体风险，再询问用户如何处理。

## 安全规则 | Safety Rules

- 不要默默 stage 与当前任务无关的改动。
- 除非用户明确要求，否则不要 force-push。
- 在确认工作已 merge 或确定不再需要之前，不要删除分支。
- 如果本地和远端分支状态出现异常分叉，先检查再行动。

## 参考资料 | References

- Workflow details: [references/workflow.md](references/workflow.md)
- PR template: [references/pr-template.md](references/pr-template.md)
