# 批次路线图

## Batch 0: Task Package Bootstrap

目标：建立可跨 session 恢复的任务包工作区。

范围：

- 新建 `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`
- 写入 README、计划、状态、决策、开放问题、source 刷新清单和续作 prompts
- 轻量更新 `09-docs/01-conventions/` 与 `09-docs/03-indexes/content-map.md`

完成标准：

- 新 session 可只靠本目录恢复任务上下文
- 目录 owner、生命周期和使用方式明确
- 不改核心 skills 的执行规则

## Batch A: Agentic Search Governance

目标：把 `pypto-knowledge-source` 从静态 source routing 升级为面向 CANN / PyPTO / UX 工作流的 agentic search governance。

范围：

- 先在 `batch-a-agentic-search-governance-plan.md` 中确认方案、实施边界和 Definition of Done
- 重写 `pypto-knowledge-source` 的核心流程：问题模式识别、evidence strategy、多源探索、claim verification、UX-oriented synthesis
- 更新 `.agents/skills/pypto-knowledge-source/references/sources.md`
- 设计 `Intent Mode` 与 `Output Mode`
- 重构 source schema，描述 source 的能力、权限、可信边界、适用问题模式、claim policy 和 writeback policy
- 明确 `pypto-tools`、PyPTO data sources、设计稿源文件、issues / discussions / PR / FAQ、web discovery 等 source 类型
- 审计已登记 source 的 `active / candidate / deprecated / blocked` 状态
- 制定 clone / local mirror policy，但不默认执行 clone

完成标准：

- `batch-a-agentic-search-governance-plan.md` 已包含确认后的方案和可验证 Definition of Done
- Codex / Claude 遇到 lookup / why / how / demo / UX strategy / trend / painpoint 类问题时，有明确的 agentic search 流程
- source registry 不再把知识地图当作唯一检索入口，而是描述 source 权限、能力、可信边界和适用模式
- why / how / design 类问题能主动进行多源探索和 claim 分层
- clone / local mirror 的判断规则清晰，具体 clone / refresh 留给对应后续 batch

## Batch B: PyPTO Architecture Refresh

目标：刷新 `02-knowledge/00-shared/pypto-architecture`，让它匹配当前 `pypto` 仓库。

范围：

- 按 refresh 规则检查本地 `pypto` 镜像
- 记录 snapshot 日期、分支、commit
- 重写或大幅更新 `overview.md`
- 更新 `sources.md` 和 `drift.md`
- 同步依赖 `pypto-architecture` 的 skills 和项目规则

完成标准：

- `pypto-architecture/overview.md` 可继续作为目录级 hint
- drift 规则与 snapshot 元数据明确
- 依赖它的 skill 不再引用明显过期路径

## Batch C: Toolkit And Runtime Data Strategy

目标：把官方 `pypto-tools`、PyPTO data sources、toolkit 设计稿纳入 demo 资产策略。

范围：

- 判断 `pypto-tools` 是否作为外部 primary source、本地镜像或 adapter source
- 更新 `02-knowledge/00-shared/pypto-toolkit/`，只承接 Toolkit、`pypto-tools` 和 toolkit design inputs
- 建立 `02-knowledge/00-shared/pypto-data/`，承接 PyPTO data sources、数据等级和 `share-safe` 规则
- 建立 toolkit 设计稿 intake manifest
- 明确数据等级、权限、脱敏、可外发状态和 demo 引用规则
- 更新 `pypto-demo-data-filling`

完成标准：

- 后续 demo 能明确引用官方工具能力和真实产物
- 原始私有材料不被误放进仓库
- L1 / L2 / L3 规则可执行

## Batch D: Design System Sync Strategy

目标：建立 PTO design system 的上游同步与本仓库同步方式。

范围：

- 确认 `yinyucheng0601/pto-design-system` 的同步方式
- 设计手动触发的拉取、对比、变更报告流程
- 明确 `.agents/skills/pto-design-system` 与 `.agents/skills/pto-design-system/` 的边界
- 判断哪些内容应同步进 `.agents/skills/pto-design-system/`
- 更新 `pto-design-system` skill 与 design system 索引

完成标准：

- 上游设计规范可按需更新
- `.agents/skills/pto-design-system/` 不做盲目全量镜像
- agent-facing bundle 与 human-facing design system 边界清晰

## Batch E: Rule Consolidation

目标：把稳定结论回写到正式规则和索引。

范围：

- 更新 `AGENTS.md`
- 更新相关 `.agents/skills/*`
- 更新 `09-docs/01-conventions/*`
- 更新 `09-docs/03-indexes/*`
- 写 `final-report.md`

完成标准：

- 任务包中的稳定决策已经毕业到正式规则
- `status.md` 标记为 `complete`
- 可归档或保留为近期审计记录
