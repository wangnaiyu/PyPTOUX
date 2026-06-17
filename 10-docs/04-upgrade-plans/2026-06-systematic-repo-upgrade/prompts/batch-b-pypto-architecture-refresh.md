# Batch B Prompt: PyPTO Architecture Refresh

用于启动 `Batch B: PyPTO Architecture Refresh`。

```md
请启动 PyPTOUX 系统性升级任务的 Batch B。

任务包位置：
`10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

本次 Batch B 的目标是刷新 `02-knowledge/00-shared/pypto-architecture/`，使它匹配当前 `pypto` 仓库状态，并确保它在新的 agentic search governance 中只作为 `orientation_hints` 使用，而不是重新变成唯一 source routing 入口。

请先阅读：
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/plan.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/sources-to-refresh.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-b-pypto-architecture-refresh-plan.md`

再阅读：
- `AGENTS.md`
- `.agents/skills/pypto-knowledge-source/SKILL.md`
- `.agents/skills/pypto-knowledge-source/references/sources.md`
- `02-knowledge/00-shared/pypto-architecture/overview.md`
- `02-knowledge/00-shared/pypto-architecture/sources.md`
- `02-knowledge/00-shared/pypto-architecture/drift.md`

开始前先运行并汇报：
- `git status --short`

## Batch B 启动前必须先讨论的问题

请先向用户确认以下事项，不要一上来 refresh 或重写文件：

1. 是否允许对 `pypto` 本地镜像执行 `git fetch` / `git pull`，还是只读取当前 checkout？
2. 本地 `pypto` 镜像是否可能存在需要保留的未提交改动？是否需要先检查并汇报？
3. `overview.md` 应偏“检索地图 / orientation hints”，还是保留一定“架构理解正文”？
4. snapshot 元数据记录到哪里：仅 `sources.md`，还是 `overview.md` 和 `sources.md` 都记录？
5. 如果本地镜像无法 refresh，是否允许用线上单点 freshness backup 辅助判断 drift？

## 执行边界

- 不要默认 clone / pull / fetch；先确认 preflight。
- 不要开始 Batch C：`pypto-tools`、运行数据、`PTO-TestData`、toolkit 设计稿策略不在本 batch 执行。
- 不要开始 Batch D：`yinyucheng0601/pto-design-system` 同步和 `07-designsystem/` 投影不在本 batch 执行。
- 不要做 demo build、prototype build 或 design system sync。
- 不要把 `pypto-architecture` 写成唯一事实入口；它只能作为 orientation hints 和当前架构理解摘要。

## Plan 阶段输出

确认 preflight 后，先更新 `batch-b-pypto-architecture-refresh-plan.md`，写入：

- 当前 `pypto-architecture` audit 结论
- refresh / no-refresh 策略
- snapshot 记录格式
- `overview.md` 信息架构
- `sources.md` 和 `drift.md` 更新规则
- 依赖旧 architecture hint 的文件清单和处理策略
- 需要用户判断的问题
- `/goal` 执行 checklist

如果发现必须由用户判断的问题，先写入 `open-questions.md` 并暂停实施。

## `/goal` 执行要求

只有在用户确认 `batch-b-pypto-architecture-refresh-plan.md` 后，才用 `/goal` 执行正式文件修改。

执行完成后请说明：

- 修改了哪些文件
- `pypto` snapshot 如何记录
- `overview.md` 如何作为 orientation hints 工作
- `sources.md` 和 `drift.md` 如何变化
- 哪些依赖旧 architecture hint 的规则或 skills 被同步
- 哪些问题留给 Batch C/D
- 下一步是否进入 Batch C

遵守 checkpoint 规则：完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新任务包状态文件。
```
