# 升级任务状态

## Current Status

- 状态：`active`
- 当前批次：`Ready for Batch A: Agentic Search Governance`
- 当前 focus：Batch 0 已完成；下一步先在 Plan 模式确认 Batch A 方案和 Definition of Done，再用 `/goal` 按确认方案实施。
- 最近更新：`2026-06-11`

## Progress

| Batch | 状态 | 说明 |
| --- | --- | --- |
| Batch 0: Task Package Bootstrap | `complete` | 已建立任务包与轻量索引规则 |
| Batch A: Agentic Search Governance | `pending` | 下一步启动 |
| Batch B: PyPTO Architecture Refresh | `pending` | 依赖 Batch A 的 source governance |
| Batch C: Toolkit And Runtime Data Strategy | `pending` | 依赖新增 source 边界 |
| Batch D: Design System Sync Strategy | `pending` | 可在 Batch A 后并行规划，但建议在 Batch C 边界明确后执行 |
| Batch E: Rule Consolidation | `pending` | 最后回写正式规则和索引 |

## Done This Session

- 创建系统性升级任务包目录。
- 写入任务包 README、路线图、状态、决策、开放问题、source 刷新清单和续作 prompt 初稿。
- 更新 `10-docs/01-conventions/` 与 `10-docs/03-indexes/content-map.md` 的轻量路由规则。
- 将“每个 session 结束前”的规则修正为 checkpoint 规则。
- 增加新 session 的通用 prompt / batch prompt 选择规则。
- 将 Batch A prompt 改为完整的 agentic search governance 启动 prompt，并要求“先讨论方案，再实施”。
- 补充 Batch A 与 clone / local mirror policy 的边界：Batch A 定规则，不默认执行 clone。
- 补充 source instance / source type / discovery mechanism 的区分，允许合并治理类型但保留具体来源可追溯。
- 新增 `batch-a-agentic-search-governance-plan.md` 作为 Plan 确认结果和 `/goal` Definition of Done 的承载文件。
- 阶段性收尾检查：任务包入口、resume prompt、Batch A prompt、路线图和内容路由规则已互相指向；核心 skill 尚未修改，Batch A 仍处于待 Plan 确认状态。

## Next Step

先进行 Batch A preflight / Plan 确认：

1. 读取 `.agents/skills/pypto-knowledge-source/SKILL.md`。
2. 读取 `.agents/skills/pypto-knowledge-source/references/sources.md`。
3. 读取 `batch-a-agentic-search-governance-plan.md`。
4. 基于 `open-questions.md` 和 `sources-to-refresh.md` 设计 agentic search governance 更新方案。
5. 先与用户讨论 Intent Mode / Output Mode、source schema、source instance / source type、source 状态、claim policy、web discovery、clone / local mirror policy、实施边界和 Definition of Done。
6. 将确认后的方案写入 `batch-a-agentic-search-governance-plan.md`。
7. 确认无阻塞后，再用 `/goal` 按该文件的 Definition of Done 修改正式 source registry 和相关 skill。

## Risks

- `pypto-tools` 是私有仓，当前任务包只登记意图，不能假设可直接联网访问。
- 设计稿源文件和运行数据可能包含不可外发内容，必须先做 intake 和权限分级。
- `pypto-architecture` 当前 snapshot 元数据为 unknown，刷新前不要把旧 overview 当作事实依据。
