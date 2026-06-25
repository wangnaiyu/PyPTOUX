# Batch A Prompt: Agentic Search Governance

用于启动 `Batch A: Agentic Search Governance`。

```md
请启动 PyPTOUX 系统性升级任务的 Batch A。

任务包位置：
`09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

本次 Batch A 的目标不是简单补充 source 列表，而是把 `pypto-knowledge-source` 从静态 source routing 升级为面向 CANN / PyPTO / UX 工作流的 agentic search governance。

请先阅读：
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/sources-to-refresh.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md`

再阅读：
- `AGENTS.md`
- `.agents/skills/pypto-knowledge-source/SKILL.md`
- `.agents/skills/pypto-knowledge-source/references/sources.md`
- `09-docs/01-conventions/content-routing.md`
- `09-docs/01-conventions/agent-writing-style.md`

开始前先运行并汇报：
- `git status --short`

## Batch A 的核心设计目标

请围绕以下方向设计并实施：

1. 将 `pypto-knowledge-source` 从“关键词 / source 路由”升级为“问题模式识别 + evidence strategy + 多源探索 + claim verification + UX-oriented synthesis”。
2. 降低 `02-knowledge/00-shared/pypto-architecture/overview.md` 的地位：它只能作为 `pypto` 本地探索的 orientation hint，不能限制 agent 对 why/how/design 类问题的探索。
3. 修改 `sources.md` schema，使 source registry 描述 source 的能力、权限、可信边界和适用问题模式，而不是描述固定检索路径。
4. 为 PyPTOUX 的 UX 工作场景增加更强的 agentic search 规则，让 agent 能主动联想到需要查哪些材料，而不是只根据用户原始问题做字面匹配。
5. 先提出方案并识别阻塞问题，再修改正式文件；不要一上来直接大改 skill。

## 必须引入的问题模式

请设计 `Intent Mode`，至少覆盖：

- `lookup`：回答概念、对象、机制、字段、工具、文件、接口或指标的基础含义与用途。典型问题包括：`xxx` 是什么、`xxx` 有哪些类型 / 字段 / 参数 / 阶段、`xxx` 的作用是什么、`xxx` 是用来做什么的、`xxx` 在 PyPTO / CANN / Toolkit 里对应哪里、`xxx` 和 `yyy` 有什么区别。
- `freshness`：最新变化、是否已合入、当前版本是否已经变化。
- `diagnostic`：为什么报错、为什么慢、哪里异常。
- `optimization`：怎么调优、怎么改进、下一步怎么做。
- `workflow-research`：研究用户实际如何完成某类任务。应从官方 docs / tutorials、`pypto` examples / models / tests、`pypto-tools` / toolkit docs、sample dataset / runtime manifest、issues / discussions / FAQ / trouble shooting、已有 PyPTOUX UX / prototype notes 中还原任务流、角色、输入输出、决策点、失败点、工具断点。
- `trend-research`：研究技术变化对用户体验和开发方式的影响。应从 CANN / Ascend 官方文档、官方社区材料 / slides / release notes、PyPTO / toolkit 代码和文档、公开文章 / 帖子 / 演讲材料、issues / 社区讨论、必要 web discovery 中比较 / 归纳 / 提炼趋势。
- `painpoint-mining`：根据 issue、PR、讨论、FAQ、社区反馈、文档缺口分析用户痛点、诉求和 UX 策略。
- `demo-design`：针对某主题或基于前面对话设计 demo。应在 research 后转成 demo narrative、数据需求、交互结构，并按 PTO design system 约束输出设计方向。
- `demo-material`：为 demo 查找真实代码、运行产物、样例数据、toolkit 输入输出、manifest source。
- `ux-strategy`：从技术证据转成 UX opportunity、设计原则、策略和方案。

请同时设计 `Output Mode`，至少覆盖：

- `answer`
- `research-brief`
- `ux-analysis`
- `demo-brief`
- `ux-design-spec`
- `prototype-implementation-plan`
- `prototype-build`
- `source-update`
- `knowledge-writeback`
- `design-system-application`

注意：Output Mode 只用于判断交付形态和后续所需工作流，不在本 prompt 中预设具体文件名或落点。执行 Batch A 时，如需定义各类输出应写入哪里，必须结合 `content-routing.md`、canonical filenames 和现有目录约束另行讨论。

## Source schema 设计要求

请重新设计 `.agents/skills/pypto-knowledge-source/references/sources.md` 的 source schema。不要只新增属性，也要判断旧属性是否应保留、改名、降级或删除。

建议方向：

- `Role` 拆成 `authority_scope` + `best_for`
- `Priority note` 拆成 `use_when` + `not_for`
- `Search preference` 改成 `search_mode`
- `Refresh rule` 改成或收敛为 `freshness_policy`
- `Search map` 降级为 `orientation_hints`，明确不能限制 agent 探索
- `Overwrite guard` 只保留给 local mirror source
- 删除或限制“每个问题类型至多 1 个 primary source”：这条只适用于简单 `lookup`，不适用于 `optimization / diagnostic / workflow-research / trend-research / painpoint-mining / demo-design / ux-strategy`

请新增或明确：

- `status`: `active / candidate / deprecated / blocked`
- `access_mode`: `online / local-mirror / manifest / user-provided / web-discovery`
- `source_type`: 可多值，用于合并治理类型和检索策略，但不合并具体 source instance
- `authority_scope`
- `best_for`
- `not_for`
- `question_modes`
- `output_modes`
- `freshness_policy`
- `search_mode`
- `discovery_policy`
- `claim_policy`
- `writeback_policy`

请解释：

- `authoritative` 和 `primary` 的区别：`authoritative` 是 source 对某类 claim 的权威等级；`primary` 是本次问题中的首选检索角色。
- `deprecated` 和 `blocked` 的区别：`deprecated` 可作历史背景但默认不主动使用；`blocked` 不允许使用。
- `manifest` source 的含义：原始材料不一定进仓库，仓库只保存索引、位置、权限、数据等级、可引用范围和使用规则。
- `source instance` 和 `source type` 的区别：source instance 是具体来源，source type 是治理类型；可以合并类型和策略，但不能丢失具体来源的可追溯性。

## 必须考虑的 source instance / source type / discovery mechanism

请至少覆盖以下三层，并在 Batch A 中判断是否需要为它们定义共享 `source_type`。

### 已登记 source instance

- `pypto`
- `pypto-official-docs`
- `pypto-top-level-design-documents`
- `cann-docs-community-edition`
- `pypto-sample-dataset`
- `curated-external-links`

### 新增候选 source instance / manifest source

- `pypto-tools`
- pypto 算子运行数据
- pypto toolkit 设计稿源文件
- `yinyucheng0601/pto-design-system`
- issues / discussions / PR / FAQ / trouble shooting 类用户反馈 source

### Discovery mechanism

- 必要时的 web discovery

说明：

- `pypto-sample-dataset` 和 pypto 算子运行数据可以共享 `runtime-artifact-source` / `demo-evidence-source` 等治理类型，但一个是已知 active source instance，另一个通常是新增 candidate / manifest source instance。
- `curated-external-links` 和 web discovery 可以共享 `external-discovery-source` 等治理类型，但前者是 known registry，后者是发现机制。web discovery 发现的高价值材料，经确认后可进入 curated registry。
- issues / discussions / PR / FAQ / trouble shooting 可以共享 `user-feedback-source` / `painpoint-evidence-source` 等治理类型。
- `pypto-tools` 和 toolkit 设计稿源文件在部分任务下可共享 `toolkit-product-source`，但代码仓、设计稿和运行数据的权限、引用方式和可外发状态必须分别记录。
- 不要为了合并类型而合并 source instance；具体来源、路径、权限、状态和 claim policy 必须保持可追溯。

私有仓、私有运行数据、设计稿源文件都先按 `candidate` 或 `manifest` 处理。不要假设已经可访问，也不要把原始私有材料放入仓库。

## Clone / Local Mirror Policy

Batch A 需要制定 clone / local mirror 判断规则，但不要默认执行 clone。

请覆盖：

- 高频、结构化、可检索、可能需要跨文件理解的 source，是否倾向本地 clone。
- 私有仓或大仓库是否先使用 `manifest` + 用户确认路径。
- 只偶尔查、在线结构稳定的 source 是否保持在线检索。
- supporting article / 社区帖子是否只登记链接、claim 和验证状态。
- issues / discussions / PR / FAQ 类 source 是否需要本地导出快照，还是保持在线检索。

批次边界：

- `pypto` 本体 refresh 归 Batch B。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的 mirror 与 `.agents/skills/pto-design-system/` 同步策略归 Batch D。

## 实施顺序

1. 先 audit 当前 `pypto-knowledge-source` 和 `sources.md` 的问题。
2. 输出 Batch A 的实施方案，包括：
   - 新 skill 流程结构
   - Intent Mode / Output Mode 表
   - source schema
   - source 状态分类
   - claim verification 规则
   - web discovery 规则
   - clone / local mirror policy
   - UX / demo 输出规则
   - 需要用户判断的问题
3. 将确认后的方案写入 `batch-a-agentic-search-governance-plan.md`，并以其中的 Definition of Done 作为后续 `/goal` 执行标准。
4. 如果发现必须由用户判断的问题，先写入 `open-questions.md` 并暂停实施。
5. 如果没有阻塞，修改：
   - `.agents/skills/pypto-knowledge-source/SKILL.md`
   - `.agents/skills/pypto-knowledge-source/references/sources.md`
   - 必要时更新任务包中的 `sources-to-refresh.md`、`decisions.md`、`status.md`、`prompts/resume.md`
6. 不要刷新 `pypto-architecture`，那是 Batch B。
7. 不要开始设计 demo 或更新 design system，除非只是为了定义 Batch A 中的 mode / source 规则。

## 输出要求

实施前先给出方案摘要，确认是否存在阻塞。
实施后请说明：

- 修改了哪些文件
- 新的 question mode / output mode 如何工作
- source schema 如何变化
- 哪些旧规则被删除、降级或重命名
- 哪些问题留给后续 batch
- 下一步是否进入 Batch B

遵守 checkpoint 规则：不要猜测 session 何时结束；只有完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新任务包状态文件。
```
