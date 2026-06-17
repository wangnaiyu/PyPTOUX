# 升级任务状态

## Current Status

- 状态：`active`
- 当前批次：`Ready for Batch C: Toolkit And Runtime Data Strategy`
- 当前 focus：Batch B 已完成；Batch C prompt 和 plan shell 已准备；下一步先讨论 Batch C preflight，不直接 clone / mirror / 写入运行数据或设计稿。
- next_batch_prompt: `exists`
- next_batch_plan: `exists`
- next_batch_gate: `discuss-first`
- 最近更新：`2026-06-17`

## Progress

| Batch | 状态 | 说明 |
| --- | --- | --- |
| Batch 0: Task Package Bootstrap | `complete` | 已建立任务包与轻量索引规则 |
| Batch A: Agentic Search Governance | `complete` | 已更新 `pypto-knowledge-source`、source registry、source 状态和 checkpoint |
| Batch B: PyPTO Architecture Refresh | `complete` | 已 refresh `pypto` mirror，更新 architecture 文档和依赖旧 hint 的规则 |
| Batch C: Toolkit And Runtime Data Strategy | `pending` | 依赖新增 source 边界 |
| Batch D: Design System Sync Strategy | `pending` | 可在 Batch A 后并行规划，但建议在 Batch C 边界明确后执行 |
| Batch E: Rule Consolidation | `pending` | 最后回写正式规则和索引 |

## Done This Session

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
- 新增候选 source：`pto-isa`、`cannbot-skills`、`ops-transformer`、`pypto-tools`、`PTO-TestData`、`yinyucheng0601/pto-design-system`、pypto 算子运行数据、toolkit 设计稿源文件、user feedback sources、web discovery、CANN org repo discovery pool。
- 更新 `sources-to-refresh.md`、`decisions.md`、`open-questions.md` 和 `prompts/resume.md`。
- 未执行 clone / pull / fetch / refresh。
- 未刷新 `pypto-architecture`。
- 未启动 demo build、prototype build 或 design system sync。
- 按 Batch Handoff Gate 新增 `batch-b-pypto-architecture-refresh-plan.md` 和 `prompts/batch-b-pypto-architecture-refresh.md`。
- 更新 `README.md` 的 checkpoint 规则，要求完成任一 batch 后准备下一 batch prompt 和 plan shell。
- 将 Batch B preflight 问题提升为启动前必须确认。

## Next Step

启动 Batch C: Toolkit And Runtime Data Strategy 的 preflight 讨论。

建议动作：

1. 读取 `README.md`、`status.md`、`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`batch-c-toolkit-runtime-data-strategy-plan.md` 和 `prompts/batch-c-toolkit-runtime-data-strategy.md`。
2. 使用 `prompts/batch-c-toolkit-runtime-data-strategy.md` 启动 Batch C。
3. 先与用户确认 Batch C preflight 问题：`pypto-tools` 路径 / mirror、运行数据和 `PTO-TestData` 权限、toolkit 设计稿可引用范围、`02-knowledge/00-shared/pypto-toolkit/` canonical files。
4. 将确认后的方案写入 `batch-c-toolkit-runtime-data-strategy-plan.md`。
5. 确认无阻塞后，再用 `/goal` 按 Batch C plan 的 Definition of Done 修改正式文件。

## Risks

- `pypto-tools`、运行数据、`PTO-TestData` 和 toolkit 设计稿仍是 candidate / manifest source，具体 mirror、权限、数据等级和可外发边界留给 Batch C；不要直接 clone、复制原始数据或写入设计稿。
- `yinyucheng0601/pto-design-system` 的 mirror、同步和 `07-designsystem/` 投影策略留给 Batch D。
