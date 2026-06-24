# 升级任务状态

## Current Status

- 状态：`active`
- 当前批次：`Ready for Batch D: Design System Sync Strategy`
- 当前 focus：Batch C 已完成 source governance、`pypto-toolkit` / `pypto-data` 回写；下一步先讨论 Batch D preflight，不直接 clone / mirror / 投影设计系统。
- next_batch_prompt: `exists`
- next_batch_plan: `exists`
- next_batch_gate: `discuss-first`
- 最近更新：`2026-06-24`

## Progress

| Batch | 状态 | 说明 |
| --- | --- | --- |
| Batch 0: Task Package Bootstrap | `complete` | 已建立任务包与轻量索引规则 |
| Batch A: Agentic Search Governance | `complete` | 已更新 `pypto-knowledge-source`、source registry、source 状态和 checkpoint |
| Batch B: PyPTO Architecture Refresh | `complete` | 已 refresh `pypto` mirror，更新 architecture 文档和依赖旧 hint 的规则 |
| Batch C: Toolkit And Runtime Data Strategy | `complete` | 已确认 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit design files 的治理边界，并更新 `pypto-toolkit` / `pypto-data` |
| Batch D: Design System Sync Strategy | `pending` | 可在 Batch A 后并行规划，但建议在 Batch C 边界明确后执行 |
| Batch E: Rule Consolidation | `pending` | 最后回写正式规则和索引 |

## Done This Session

- 2026-06-24：确认 Batch C 剩余 preflight：`pypto-tools` planned mirror root、可记录结构/schema/截图/代码片段；`pypto-sample-dataset` writeback 边界；`pypto-testdata` clone 许可、planned mirror root、L1 数据等级；toolkit 设计稿不入仓但可记录缩略图/截图/结构摘要；`pypto-toolkit` canonical files。
- 2026-06-24：更新 source registry 中 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata`、`toolkit-design-files` 的 access、claim 和 writeback policy。
- 2026-06-24：更新 `.agents/skills/pypto-demo-data-filling/SKILL.md`，明确原始 L1 不默认 `share-safe`，只有抽样/脱敏或 schema-generated L2 可标记 `share-safe`。
- 2026-06-24：将 `02-knowledge/00-shared/pypto-toolkit/` 收窄为 Toolkit、`pypto-tools` 和 toolkit design inputs；新增 `02-knowledge/00-shared/pypto-data/` 承接 `pypto-sample-dataset`、`pypto-testdata`、数据等级和 `share-safe` 规则。
- 2026-06-24：更新 `02-knowledge/00-shared/pypto-toolkit/overview.md`、`sources.md`、`manifest.md`、`notes/update-2026-06-24.md` 和复现 prompt；新增 `pypto-data` 的 `overview.md`、`sources.md`、`manifest.md`、notes 和复现 prompt。
- 2026-06-24：完成 Batch C checkpoint，并新增 Batch D plan shell `batch-d-design-system-sync-strategy-plan.md` 和 prompt `prompts/batch-d-design-system-sync-strategy.md`。
- 2026-06-24：按用户要求配置 GitCode 专用 SSH key，clone `pypto-tools` 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`，snapshot branch `master`，commit `5a4fae5cb574276cedb01880f649011d7f09ca61`。
- 2026-06-24：clone `PTO-TestData` 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`，snapshot branch `main`，commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`；两个 mirror clone 后均 clean。
- 2026-06-24：clone 后未复制原始外部数据进入 PyPTOUX；未写入原始设计稿；未启动 Batch D。
- 2026-06-23：确认 Batch C data source taxonomy：保留 `pypto-sample-dataset` 作为本地 active PyPTO data source，后续用户放入 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据` 的 PyPTO 相关样例、测试或运行产物继续归入本 source。
- 2026-06-23：新增 source instance `pypto-testdata`，remote 指向 `https://gitcode.com/zhanghuixin/PTO-TestData`，display name 为 `PTO-TestData`。
- 2026-06-23：将 source type `runtime-artifact-source` 重命名为 `pypto-data-source`；`pypto-sample-dataset` 和 `pypto-testdata` 都属于 `pypto-data-source`，并可同时作为 `demo-evidence-source`。
- 2026-06-23：移除泛化 source instance `pypto-runtime-data`，避免后续 agent 把 PyPTO 数据材料误判为独立 source lane。
- 2026-06-23：同步 source registry、Batch C plan、open questions、source refresh 清单、Batch C prompt、resume prompt 和 `pypto-architecture` orientation wording；新增对应 notes / prompt 追溯记录；尚未 clone / mirror / 写入外部数据或设计稿。
- 启动 Batch B preflight，并按用户确认记录 refresh 策略：本地 `pypto` 是 read-only upstream mirror / agent 检索缓存；允许 `git fetch --prune`；不使用普通 `git pull`；tracked dirty 时暂停汇报。
- 运行 PyPTOUX `git status --short`，确认工作树中已有任务包 checkpoint 改动；继续在此基础上执行 Batch B。
- 检查本地 `pypto` mirror：
  - remote: `https://gitcode.com/cann/pypto`
  - local branch: `master`
  - fetch 前 commit: `4fec8188c4788318225ad90ede46e19c31846cdf`
  - tracked worktree clean
  - 清理前存在 untracked `.DS_Store` 文件和顶层 `docs/tools/` 等内容，后续已按用户许可清理。
- 已执行 `git fetch --prune`；远端默认分支为 `origin/HEAD -> origin/master`，`origin/master` 为 `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`；remote 不存在 `origin/main`。
- 用户确认 GitCode 上 sync 目标应为 `master` 而不是 `main`。
- 已执行 `git reset --hard origin/HEAD`；本地 `pypto` 当前 commit 为 `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`，commit date 为 `2026-06-17T10:32:51+08:00`。
- 已清理本地 `pypto` mirror 中 untracked `.DS_Store` 与顶层 `docs/tools/` 缓存污染；清理后 mirror status 为 `## master...origin/master`。
- 基于 hard-synced snapshot 初步采样 `README.md`、`docs/zh/index.md`、`docs/zh/tools/index.md`、`docs/zh/tutorials/development/index.md`、`docs/zh/trouble_shooting/index.md`、`examples/README.md`、`models/`、`python/pypto/`、`framework/src/`、`tools/`。
- 更新 `batch-b-pypto-architecture-refresh-plan.md`，写入 audit 结论、refresh 策略、snapshot 格式、overview 信息架构、sources/drift 规则、dependent files、阻塞问题和 checklist。
- 更新 `02-knowledge/00-shared/pypto-architecture/overview.md`，将其刷新为带 snapshot metadata、架构摘要、claim matrix、当前仓库地图和检索路径的 `orientation_hints`。
- 更新 `02-knowledge/00-shared/pypto-architecture/sources.md`，记录本轮 source snapshot、evidence inspected、source boundary、refresh notes 和 maintenance rules。
- 更新 `02-knowledge/00-shared/pypto-architecture/drift.md`，记录并标记 resolved drift：snapshot unknown、docs path 迁移到 `docs/zh`、顶层 `docs/tools` 缓存污染、models/source 目录变化。
- 新增 `02-knowledge/00-shared/pypto-architecture/prompts/2026-06-17-pypto-architecture-refresh.md` 和 `notes/update-2026-06-17.md`，满足正式知识输出的复现 prompt 与执行记录约定。
- 同步 `AGENTS.md`、`.agents/skills/pypto-demo-data-filling/SKILL.md`、`.agents/skills/pypto-knowledge-source/SKILL.md` 和 `.agents/skills/pypto-knowledge-source/references/sources.md`，确保 overview 只作为 `orientation_hints` 使用。
- 新增 `batch-c-toolkit-runtime-data-strategy-plan.md` 和 `prompts/batch-c-toolkit-runtime-data-strategy.md`，满足 Batch Handoff Gate。
- 更新 `README.md`、`open-questions.md`、`sources-to-refresh.md`、`decisions.md` 和 `prompts/resume.md`。
- 更新 `decisions.md`，记录 Batch B read-only mirror hard sync 策略、overview 形态和 snapshot 落点。

## Done In Previous Batch A Session

- 按 `batch-a-agentic-search-governance-plan.md` 执行 Batch A。
- 将 `.agents/skills/pypto-knowledge-source/SKILL.md` 从静态 source routing 改为 agentic search governance 流程。
- 在 skill 中新增并固化 `Intent Mode`：`lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`trend-research`、`painpoint-mining`、`demo-design`、`demo-material`、`ux-strategy`。
- 在 skill 中新增并固化 `Output Mode`：`answer`、`research-brief`、`ux-analysis`、`demo-brief`、`ux-design-spec`、`prototype-implementation-plan`、`prototype-build`、`source-update`、`knowledge-writeback`、`design-system-application`。
- 将 `.agents/skills/pypto-knowledge-source/references/sources.md` 重构为 source instance registry，覆盖 source schema、source type、URL Domain Mapping、source 状态、claim policy、writeback policy 和 clone / mirror policy。
- 将 `02-knowledge/00-shared/pypto-architecture/overview.md` 降级为 `orientation_hints`，只辅助定位，不限制 why/how/design/UX/demo 类探索。
- 已登记 source 采用“保守降权”：默认不 `deprecated` / `blocked`，通过 `authority_scope`、`best_for`、`not_for` 和 `claim_policy` 限制误用。
- 新增候选 source：`pto-isa`、`cannbot-skills`、`ops-transformer`、`pypto-tools`、`PTO-TestData`、`yinyucheng0601/pto-design-system`、toolkit 设计稿源文件、user feedback sources、web discovery、CANN org repo discovery pool；其中 `PTO-TestData` 和泛化数据 lane 已在 2026-06-23 Batch C preflight 中收敛为 `pypto-testdata` + `pypto-sample-dataset` taxonomy。
- 更新 `sources-to-refresh.md`、`decisions.md`、`open-questions.md` 和 `prompts/resume.md`。
- 未执行 clone / pull / fetch / refresh。
- 未刷新 `pypto-architecture`。
- 未启动 demo build、prototype build 或 design system sync。
- 按 Batch Handoff Gate 新增 `batch-b-pypto-architecture-refresh-plan.md` 和 `prompts/batch-b-pypto-architecture-refresh.md`。
- 更新 `README.md` 的 checkpoint 规则，要求完成任一 batch 后准备下一 batch prompt 和 plan shell。
- 将 Batch B preflight 问题提升为启动前必须确认。

## Next Step

启动 Batch D: Design System Sync Strategy 的 preflight 讨论。

建议动作：

1. 读取 `README.md`、`status.md`、`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`batch-d-design-system-sync-strategy-plan.md` 和 `prompts/batch-d-design-system-sync-strategy.md`。
2. 使用 `prompts/batch-d-design-system-sync-strategy.md` 启动 Batch D。
3. 先与用户确认 Batch D preflight 问题：`yinyucheng0601/pto-design-system` mirror / copy / script 策略、`07-designsystem/` 投影范围、`.agents/skills/pto-design-system` 边界和 change report 规则。
4. 将确认后的方案写入 `batch-d-design-system-sync-strategy-plan.md`。
5. 确认无阻塞后，再用 `/goal` 按 Batch D plan 的 Definition of Done 修改正式文件。

## Risks

- `pypto-tools` 和 `pypto-testdata` 已 clone；如后续要 refresh，需要单独授权外部目录写入和网络访问，并记录 snapshot。
- `yinyucheng0601/pto-design-system` 的 mirror、同步和 `07-designsystem/` 投影策略留给 Batch D；不要直接 clone、复制上游设计系统或改 `07-designsystem/`。
