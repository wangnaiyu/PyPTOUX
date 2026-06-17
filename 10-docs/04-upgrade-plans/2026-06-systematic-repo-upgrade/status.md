# 升级任务状态

## Current Status

- 状态：`active`
- 当前批次：`Ready for Batch B: PyPTO Architecture Refresh`
- 当前 focus：Batch A 已完成；Batch B prompt 和 plan shell 已准备；下一步先讨论 Batch B preflight，不直接 refresh。
- next_batch_prompt: `exists`
- next_batch_plan: `exists`
- next_batch_gate: `discuss-first`
- 最近更新：`2026-06-17`

## Progress

| Batch | 状态 | 说明 |
| --- | --- | --- |
| Batch 0: Task Package Bootstrap | `complete` | 已建立任务包与轻量索引规则 |
| Batch A: Agentic Search Governance | `complete` | 已更新 `pypto-knowledge-source`、source registry、source 状态和 checkpoint |
| Batch B: PyPTO Architecture Refresh | `pending` | 下一步启动；依赖 Batch A 的 source governance |
| Batch C: Toolkit And Runtime Data Strategy | `pending` | 依赖新增 source 边界 |
| Batch D: Design System Sync Strategy | `pending` | 可在 Batch A 后并行规划，但建议在 Batch C 边界明确后执行 |
| Batch E: Rule Consolidation | `pending` | 最后回写正式规则和索引 |

## Done This Session

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

启动 Batch B: PyPTO Architecture Refresh 的 preflight 讨论。

建议动作：

1. 读取 `README.md`、`status.md`、`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`batch-a-agentic-search-governance-plan.md` 和 `batch-b-pypto-architecture-refresh-plan.md`。
2. 使用 `prompts/batch-b-pypto-architecture-refresh.md` 启动 Batch B。
3. 先与用户确认 Batch B preflight 问题：是否允许 `fetch` / `pull`、是否需要先检查本地镜像未提交改动、`overview.md` 信息形态、snapshot 元数据落点、无法 refresh 时是否允许线上单点 freshness backup。
4. 将确认后的方案写入 `batch-b-pypto-architecture-refresh-plan.md`。
5. 确认无阻塞后，再用 `/goal` 按 Batch B plan 的 Definition of Done 修改正式文件。

## Risks

- `pypto` refresh 可能涉及外部目录和远端访问，需先检查本地镜像状态与权限。
- `pypto-architecture` 当前 snapshot 元数据为 unknown，刷新前不要把旧 overview 当作当前事实依据。
- `pypto-tools`、运行数据、`PTO-TestData` 和 toolkit 设计稿仍是 candidate / manifest source，具体 mirror、权限、数据等级和可外发边界留给 Batch C。
- `yinyucheng0601/pto-design-system` 的 mirror、同步和 `07-designsystem/` 投影策略留给 Batch D。
