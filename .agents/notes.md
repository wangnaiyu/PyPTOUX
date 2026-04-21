# PyPTOUX Notes | 项目说明

- Project name | 项目名: `PyPTOUX`
- Local repository | 本地仓库: `/Users/wny/Documents/1 项目 Projects/PyPTOUX`
- GitHub repository | 远程仓库: `git@github.com:wangnaiyu/PyPTOUX.git`
- Default branch | 默认分支: `main`

## Git 约定 | Git Guidance

- 对 `PyPTOUX` 做 Git 操作前，先确认当前工作目录与上面的本地仓库路径一致。
- 在执行 `pull` 或 `push` 之前，先确认 `origin` 仍指向上面的 GitHub 仓库。
- 如果后续用户定义了 commit message 规范，记录在这里。
- 本机已安装 GitHub CLI `gh`。
- 遇到依赖 GitHub 认证的操作时，先用 `gh auth status` 检查登录状态。
- 如果 GitHub connector 无法创建 PR，或报权限问题，优先回退到 `gh`。

## 内容放置 | Content Routing

- 主路由规则见 `10-docs/01-conventions/content-routing.md`。
- agent/skill 写作风格约定见 `10-docs/01-conventions/agent-writing-style.md`。
- 项目内容路由 skill 位于 `.agents/skills/pyptoux-content-router/SKILL.md`。
- 新建内容时，优先复用 canonical filenames 和现有 topic folders，不要随意发明新结构。
- 新增 topic 或 shared framework 时，记得同步更新 `10-docs/03-indexes/` 下的相关索引文件。
- 在 PyPTOUX 中，新写的说明性内容默认优先中文；目录名、稳定文件名、代码标识和必要技术标签保持英文。

## GitHub 流程 | GitHub Workflow

- 项目级 Git/GitHub workflow skill 位于 `.agents/skills/pyptoux-git-github/SKILL.md`。
- 涉及分支、提交、推送、PR 时，优先使用该 skill 的项目内约定，不要把发布规则混进 content router。
