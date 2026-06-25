# 2026-06-17 PyPTO Architecture Refresh Prompt

用于复现 2026-06-17 的 `pypto-architecture` 刷新效果。

```md
请刷新 `02-knowledge/00-shared/pypto-architecture/`，目标是让它匹配当前 `pypto` 本地 mirror，并确保 `overview.md` 只作为 `orientation_hints` 使用。

执行前读取：
- `AGENTS.md`
- `.agents/skills/pypto-knowledge-source/SKILL.md`
- `.agents/skills/pypto-knowledge-source/references/sources.md`
- `02-knowledge/00-shared/pypto-architecture/overview.md`
- `02-knowledge/00-shared/pypto-architecture/sources.md`
- `02-knowledge/00-shared/pypto-architecture/drift.md`

使用 `pypto` 本地 mirror：
`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`

refresh 策略：
- 将本地 mirror 视作 read-only upstream cache。
- 先检查 `git status --short --branch` 和 remote。
- 如 tracked worktree dirty，暂停并汇报。
- 如用户确认，执行 `git fetch --prune` 和 `git reset --hard origin/HEAD`。
- 若远端默认分支为 `origin/master`，记录 master 为 sync target。
- 清理用户允许的 untracked `.DS_Store` 和顶层 `docs/tools/` 缓存污染。

更新要求：
- `overview.md` 写成“检索地图 + 架构摘要”，顶部记录 snapshot metadata，并声明只作 `orientation_hints`。
- `sources.md` 记录 source snapshot、evidence inspected、source boundary、refresh notes 和 maintenance rules。
- `drift.md` 记录旧 overview 与当前 snapshot 的 drift；已被本轮吸收的 drift 标为 `resolved`。
- 同步 `AGENTS.md`、`pypto-demo-data-filling` 和 `pypto-knowledge-source` 相关文案，避免把 overview 当作事实入口。
- 更新主题级 `prompts/` 与 `notes/`，保留可复现 prompt 和更新记录。

不要做：
- 不启动 toolkit/runtime data、design system 等后续治理任务。
- 不 clone `pypto-tools`、`PTO-TestData` 或设计系统仓库。
- 不写入未经授权的运行数据、测试数据或设计稿原始文件。
- 不做 demo build、prototype build 或 design system sync。
```

## Provenance

对应升级任务包 `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/` 的 Batch B。
