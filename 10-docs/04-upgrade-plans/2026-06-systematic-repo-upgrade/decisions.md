# 已确认决策

## 2026-06-10 建立任务包工作区

- 决策：建立 `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/` 作为本次系统性升级的 active workbench。
- 原因：任务跨目录、跨 source、跨 skill、跨 session，不能依赖聊天上下文持续管理。
- 影响：后续 session 先读本目录，再按 `status.md` 的 Next Step 继续。

## 2026-06-10 先搭脚手架，不立即修改核心 skills

- 决策：Batch 0 只建立任务包和轻量路由索引，不直接修改 `.agents/skills/*` 的执行逻辑。
- 原因：source governance、私有材料权限、设计系统投影边界仍需进一步确认。
- 影响：Batch A 才正式进入 `pypto-knowledge-source` 和相关规则更新。

## 2026-06-10 `10-docs/04-upgrade-plans/` 的生命周期

- 决策：`10-docs/04-upgrade-plans/` 用作 active workbench；任务完成后先保留为近期审计记录，必要时归档到 `11-archive/upgrade-plans/`。
- 原因：计划目录承载过程状态，不应替代正式规则或知识库。
- 影响：稳定结论必须回写到正式目录，不能只停留在任务包中。

## 2026-06-10 使用 checkpoint 替代 session-end 假设

- 决策：任务包维护不依赖 agent 判断 session 何时结束；改用 checkpoint 触发条件。
- 原因：session 是否结束由用户主观决定，agent 无法可靠预判。
- 影响：完成 batch、完成会影响恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新 `status.md`、`prompts/resume.md` 等状态文件。

## 2026-06-10 Batch prompt 默认先讨论方案再实施

- 决策：Batch A prompt 先要求提出 source governance 方案、影响范围和待确认问题，再修改正式文件。
- 原因：source 优先级、私有仓、运行数据、设计稿权限等仍包含策略判断，直接实施容易过早固化错误规则。
- 影响：下次启动 Batch A 时，先进行方案确认；确认后再更新 `.agents/skills/pypto-knowledge-source` 和 source registry。

## 2026-06-11 Batch A 只制定 clone / local mirror policy

- 决策：Batch A 负责制定 source 审计规则、降级 / 屏蔽规则、web discovery 规则和 clone / local mirror 判断原则，但不默认执行 clone。
- 原因：`github.com/hengliao1972/**`、`yinyucheng0601/pto-design-system`、`gitcode.com/cann/pypto-tools` 等 source 的权限、体量、用途和后续同步方式不同，直接 clone 容易越过 batch 边界。
- 影响：`pypto` refresh 归 Batch B；`pypto-tools` mirror / adapter / demo 使用策略归 Batch C；`pto-design-system` mirror / sync / `07-designsystem` 投影策略归 Batch D。

## 2026-06-11 Batch A 重新定位为 agentic search governance

- 决策：Batch A 不再只做 source governance，而是把 `pypto-knowledge-source` 升级为 agentic search governance。
- 原因：静态知识地图和关键词路由适合 lookup 类问题，但不足以支撑 optimization、workflow-research、trend-research、painpoint-mining、demo-design 和 ux-strategy 类问题。
- 影响：Batch A prompt、plan 和 status 均改为围绕 Intent Mode / Output Mode、evidence strategy、多源探索、claim verification、UX-oriented synthesis 和 source schema 重构展开。

## 2026-06-11 区分 source instance 与 source type

- 决策：Batch A 中需要区分具体来源（source instance）与治理类型（source type）。
- 原因：`pypto-sample-dataset` 与新增算子运行数据、`curated-external-links` 与 web discovery 等存在策略重叠，但权限、状态、路径、可引用性和可追溯性不同。
- 影响：治理后可以合并 source type 和检索策略，但不能合并掉具体 source instance；每个来源仍需保留独立状态、权限、claim policy 和引用边界。

## 2026-06-11 Batch A 先确认 Definition of Done 再用 `/goal` 实施

- 决策：新增 `batch-a-agentic-search-governance-plan.md` 承载 Batch A 的 Plan 确认结果、实施边界和 Definition of Done；在该文件仍为 `pending` 或模板状态时，不直接用 `/goal` 修改核心 skill。
- 原因：Batch A 涉及 source 权限、私有材料、schema 语义和后续 batch 边界；若没有可验证完成标准，`/goal` 容易过早固化不完整方案。
- 影响：后续先在 Plan 模式确认方案并写入该文件；确认无阻塞后，再用 `/goal` 按该文件的 Definition of Done 执行 `.agents/skills/pypto-knowledge-source/` 和 source registry 更新。

## 2026-06-12 Batch A 执行完成

- 决策：按 `batch-a-agentic-search-governance-plan.md` 实施 Batch A，将 `pypto-knowledge-source` 从静态 source routing 升级为 agentic search governance。
- 原因：lookup 之外的 diagnostic、optimization、workflow-research、trend-research、painpoint-mining、demo-design、demo-material 和 ux-strategy 需要多源探索、claim verification 和 UX-oriented synthesis。
- 影响：`.agents/skills/pypto-knowledge-source/SKILL.md` 已改为 Intent Mode / Output Mode / evidence strategy / claim verification / UX synthesis 流程；`.agents/skills/pypto-knowledge-source/references/sources.md` 已按 source schema 重构。

## 2026-06-12 已登记 source 采用保守降权

- 决策：已登记 source 默认不降为 `deprecated` 或 `blocked`；通过 `authority_scope`、`best_for`、`not_for` 和 `claim_policy` 限制访问优先级和事实出口。
- 原因：当前没有足够证据证明已登记 source 应直接废弃或屏蔽，但旧规则容易把 design intent、external links 和 official docs 当成同级事实源。
- 影响：`pypto-top-level-design-documents` 保持 design-intent active，但当前实现事实必须回 `pypto` 校验；`curated-external-links` 保持 discovery/supporting，不作 factual source of truth。

## 2026-06-12 新增候选 source 和 discovery pool

- 决策：登记 `pto-isa`、`cannbot-skills`、`ops-transformer`、`pypto-tools`、`PTO-TestData`、`yinyucheng0601/pto-design-system`、`pypto`、`pypto_top_level_design_documents` 作为候选 mirror set，并把 `gitcode.com/org/cann/repos` 作为 discovery pool。
- 原因：这些仓库可能支撑 PyPTO / CANN / toolkit / runtime data / design system / UX strategy 研究，但 Batch A 不应直接 clone 或确认同步策略。
- 影响：后续相关问题可按 source registry 主动联想到这些候选源；具体 mirror、路径、权限、adapter 和投影策略分别留给 Batch B/C/D。

## 2026-06-12 Batch A 未越过后续 batch 边界

- 决策：Batch A 只更新 search governance、source registry 和任务包 checkpoint；不 clone / refresh，不刷新 `pypto-architecture`，不开始 demo build 或 design system sync。
- 原因：`pypto` refresh、toolkit/runtime data、design system sync 分别有独立权限和边界，必须按后续 batch 处理。
- 影响：下一步进入 Batch B：刷新 `pypto` 本地镜像并更新 `02-knowledge/00-shared/pypto-architecture/`。

## 2026-06-17 建立 Batch Handoff Gate

- 决策：完成任一 batch 后，必须准备下一 batch 的 prompt 和 plan shell，并在 `status.md` 记录 `next_batch_prompt`、`next_batch_plan` 和 `next_batch_gate`。
- 原因：Batch A 完成后只更新通用 resume prompt，导致 Batch B 缺少明确启动 prompt、方案承载文件和 preflight 门槛。
- 影响：已新增 `batch-b-pypto-architecture-refresh-plan.md` 和 `prompts/batch-b-pypto-architecture-refresh.md`；后续 batch 完成时必须重复这一 handoff 动作。

## 2026-06-17 Batch B 必须先进行 preflight 讨论

- 决策：Batch B 的 `next_batch_gate` 设为 `discuss-first`，不得直接 refresh 或重写 `pypto-architecture`。
- 原因：Batch B 涉及外部本地镜像、可能的 `fetch` / `pull`、未提交改动保护、snapshot 记录方式和 `overview.md` 信息形态，需要用户先确认。
- 影响：`open-questions.md` 已将 Batch B preflight 问题提升为“启动前必须确认”；`prompts/batch-b-pypto-architecture-refresh.md` 要求先讨论再写 plan。
