# Batch A Agentic Search Governance Plan

本文用于承载 Batch A 在 Plan 模式中确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `.agents/skills/pypto-knowledge-source/`、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch A 的目标是把 `pypto-knowledge-source` 从静态 source routing 升级为 agentic search governance，使 Codex / Claude 在 CANN、PyPTO、Toolkit、UX、demo 和设计策略问题中能够主动识别问题模式、规划证据策略、进行多源探索、验证 claim，并输出面向 UX 工作流的综合结论。

## 2. Workflow Gate

Batch A 分两段推进：

1. Plan 确认阶段：审计当前 skill 和 source registry，提出完整方案，识别阻塞问题，并将确认后的方案写入本文。
2. `/goal` 执行阶段：以本文确认的 Definition of Done 为完成标准，实施 Batch A 文件修改和 checkpoint 更新。

在本文尚未形成确认方案前，不应直接用 `/goal` 修改 `.agents/skills/pypto-knowledge-source/SKILL.md` 或 `.agents/skills/pypto-knowledge-source/references/sources.md`。

## 3. Scope

Batch A 覆盖：

- `pypto-knowledge-source` 的问题模式识别流程。
- `Intent Mode` 与 `Output Mode` 的定义和使用规则。
- evidence strategy、多源探索、claim verification 和 UX-oriented synthesis。
- `sources.md` 的 source schema 重构。
- source instance、source type、discovery mechanism 的治理边界。
- source 状态：`active`、`candidate`、`deprecated`、`blocked`。
- web discovery 规则。
- clone / local mirror 判断规则。
- UX / demo 类输出如何触发后续工作流。

## 4. Non-Goals

Batch A 不做：

- 不刷新 `02-knowledge/00-shared/pypto-architecture/`，该工作归 Batch B。
- 不默认 clone、pull、fetch 或 refresh 外部仓库。
- 不确认 `pypto-tools` 的本地 mirror、adapter 或 demo 使用策略，该工作归 Batch C。
- 不确认 `yinyucheng0601/pto-design-system` 的 mirror 和 `.agents/skills/pto-design-system/` 同步策略，该工作归 Batch D。
- 不把私有仓、私有运行数据或设计稿源文件的原始材料放入本仓库。
- 不开始具体 demo 设计、prototype build 或 design system sync；只定义它们在 search governance 中的 mode、source 和输出触发规则。

## 5. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文对应章节：

- 当前 `pypto-knowledge-source` 和 `sources.md` 的 audit 结论。
- 新 skill 流程结构。
- `Intent Mode` 表。
- `Output Mode` 表。
- source schema 字段定义、旧字段处理和迁移规则。
- source instance / source type / discovery mechanism 分类。
- source 状态分类。
- claim verification 规则。
- web discovery 规则。
- clone / local mirror policy。
- UX / demo 输出规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 6. Definition Of Done

Batch A 完成时，必须同时满足以下条件：

- 本文已经包含经用户确认的 Batch A 方案，而不是只有模板。
- `.agents/skills/pypto-knowledge-source/SKILL.md` 已体现 agentic search governance 流程。
- `.agents/skills/pypto-knowledge-source/references/sources.md` 已按确认后的 schema 重构。
- 已覆盖 prompt 要求的全部 `Intent Mode`：`lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`trend-research`、`painpoint-mining`、`demo-design`、`demo-material`、`ux-strategy`。
- 已覆盖 prompt 要求的全部 `Output Mode`：`answer`、`research-brief`、`ux-analysis`、`demo-brief`、`ux-design-spec`、`prototype-implementation-plan`、`prototype-build`、`source-update`、`knowledge-writeback`、`design-system-application`。
- source schema 至少覆盖：`status`、`access_mode`、`source_type`、`authority_scope`、`best_for`、`not_for`、`question_modes`、`output_modes`、`freshness_policy`、`search_mode`、`discovery_policy`、`claim_policy`、`writeback_policy`。
- 已明确处理旧规则：`Search map` 降级为 `orientation_hints`；`Role`、`Priority note`、`Search preference`、`Refresh rule` 的保留、改名或删除有说明；“每个问题类型至多 1 个 primary source”已限制为简单 lookup 场景。
- 已解释 `authoritative` 与 `primary`、`deprecated` 与 `blocked`、`manifest` source、source instance 与 source type 的区别。
- 已覆盖已登记 source instance、新增 candidate / manifest source、issues / discussions / PR / FAQ / trouble shooting source，以及 web discovery 机制。
- 已明确 Batch A 没有越过边界：未刷新 `pypto-architecture`，未默认 clone，未开始 Batch B/C/D，未写入私有原始材料。
- 已按 checkpoint 规则更新必要文件：`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`status.md`、`prompts/resume.md`。
- 最终汇报能说明：修改了哪些文件、新 mode 如何工作、source schema 如何变化、旧规则如何处理、哪些问题留给后续 batch、是否可以进入 Batch B。

## 7. Later `/goal` Execution Contract

只有用户显式确认本文方案，并要求进入 `/goal` 执行后，才开始修改 `.agents/skills/pypto-knowledge-source/SKILL.md`、`.agents/skills/pypto-knowledge-source/references/sources.md` 和任务包 checkpoint 文件。初次落盘本文不代表 Batch A 已完成，也不代表可以自动开始执行 skill 改造。

进入 `/goal` 前建议状态：

- `batch_status`: `plan-ready`
- `plan_status`: `approved-for-goal`

推荐目标文本：

```md
按 `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md` 中已确认的方案实施 Batch A。完成标准以该文件的 Definition of Done 为准；不得越过 Batch A 边界，不执行 clone / refresh / demo build / design system sync。
```

`/goal` 执行时按已确认方案直接推进；只有遇到本文未覆盖、且会影响 source 权限、私有材料引用、schema 语义或 batch 边界的判断，才先更新 `open-questions.md` 并暂停实施。

## 8. Plan-Mode Writeback

状态：

- `batch_status`: `complete`
- `plan_status`: `implemented`

本节记录 Plan 模式已讨论形成并在 `/goal` 中执行的 Batch A 方案。2026-06-12 已按本文 Definition of Done 更新 `pypto-knowledge-source`、source registry 和任务包 checkpoint 文件；未执行 clone / refresh / demo build / design system sync。

### Plan-Mode Scope

初次落盘本文时只做计划写回：

- 写入 audit findings、mode 表、source schema、source governance defaults、claim policy、web discovery、clone / mirror policy 和 `/goal` pause policy。
- 不修改 `.agents/skills/pypto-knowledge-source/SKILL.md`。
- 不修改 `.agents/skills/pypto-knowledge-source/references/sources.md`。
- 不 clone、不 refresh、不读取私有仓原始材料。
- 不刷新 `02-knowledge/00-shared/pypto-architecture/`。
- 不启动 demo build、prototype build 或 design system sync。

### Audit Findings

- 当前 `pypto-knowledge-source` 仍以静态 source routing 为主：先按问题类型选一个 primary source，再进入 source-specific 子流程。
- 当前 `sources.md` 把 source 角色、优先级、refresh 规则、search map 和 overwrite guard 混在一起；这些字段无法清楚表达 source 的能力边界、权限边界、claim 权威等级和适用问题模式。
- `02-knowledge/00-shared/pypto-architecture/overview.md` 在现有流程中仍容易成为 PyPTO 本地探索入口；Batch A 需要把它降级为 `orientation_hints`，只辅助定位，不限制 why/how/design/UX/demo 类问题的探索。
- “每个问题类型至多 1 个 primary source”适合简单 `lookup`，但不适合 `diagnostic`、`optimization`、`workflow-research`、`trend-research`、`painpoint-mining`、`demo-design`、`demo-material` 和 `ux-strategy`。
- `curated-external-links` 已有 claim 校验意识，但还需要被纳入更一般的 external discovery / claim policy，而不是单独作为特殊流程。
- 已登记 source 目前没有明确需要默认 `deprecated` 或 `blocked` 的对象；先采用保守降权，通过 `authority_scope` 和 `claim_policy` 限制误用。

### Skill Flow

Batch A 的目标流程：

1. 识别 `Intent Mode`：判断用户是在查事实、追 freshness、诊断、优化、研究工作流、挖痛点、找 demo 材料，还是把技术证据转成 UX 策略。
2. 选择 `Output Mode`：判断交付是简短回答、research brief、UX analysis、demo brief、设计规格、prototype plan、source update 还是 knowledge writeback。
3. 制定 evidence strategy：按 claim 类型选择可能权威 source、supporting source、discovery mechanism 和必要的 freshness 检查。
4. 多源探索：复杂问题允许多个 primary retrieval roles；不要把 `overview.md` 或某个外链当作唯一入口。
5. Claim verification：把 claim 分为 `factual`、`design-intent`、`empirical`、`opinion`、`derived`，再标注校验状态。
6. UX-oriented synthesis：对 UX / demo / strategy 输出，把技术证据转成用户任务、决策点、失败点、工具断点、机会点和后续工作流。
7. Writeback routing：如需沉淀，按 `content-routing.md` 和 canonical filenames 决定落点；Output Mode 本身不预设文件名。

### Intent Mode

| Intent Mode | 触发问题 | Evidence strategy |
| --- | --- | --- |
| `lookup` | `xxx` 是什么、字段 / 参数 / 类型 / 阶段 / 区别 / 对应哪里 | 可选 1 个 primary retrieval role；按 claim 类型回 authoritative source 校验。 |
| `freshness` | 最新变化、是否已合入、当前版本是否变化 | 优先官方在线 / upstream 当前版本；本地镜像只作当前 checkout，不作最新断言。 |
| `diagnostic` | 为什么报错、为什么慢、哪里异常 | 组合代码、官方文档、runtime artifact、sample dataset、issues / FAQ / troubleshooting。 |
| `optimization` | 怎么调优、怎么改进、下一步怎么做 | 组合代码实现、CANN/Ascend 文档、经验性材料、runtime artifact；经验 claim 必须标注。 |
| `workflow-research` | 用户如何完成某类任务 | 从 docs/tutorials、examples/models/tests、toolkit、runtime manifest、issues/FAQ、既有 UX/prototype notes 还原任务流。 |
| `trend-research` | 技术变化如何影响 UX 和开发方式 | 比较 CANN/Ascend 官方材料、release notes、PyPTO/toolkit 代码文档、公开文章、社区讨论和必要 web discovery。 |
| `painpoint-mining` | 用户痛点、诉求、FAQ、社区反馈 | 优先 issues / discussions / PR / FAQ / troubleshooting，外链只作 supporting claim。 |
| `demo-design` | 针对主题或对话设计 demo | 先 research，再转成 demo narrative、数据需求、交互结构和 PTO design system 约束。 |
| `demo-material` | 为 demo 找真实代码、运行产物、样例数据、manifest | 优先 L1 数据；私有/未知材料走 `manifest` + 权限确认，不伪装成真实可外发数据。 |
| `ux-strategy` | 从技术证据转 UX opportunity / design principle / strategy | 多源技术证据 + 用户反馈 + 现有 UX/prototype notes，输出机会、原则和方案方向。 |

### Output Mode

| Output Mode | 交付形态 | 后续工作流 |
| --- | --- | --- |
| `answer` | 直接回答问题 | 不默认落盘；必要时附待处理 claim。 |
| `research-brief` | 研究简报 | 可能进入 `02-knowledge/`、`03-insights/` 或 upgrade plan。 |
| `ux-analysis` | UX 分析 | 按 `content-routing.md` 判断是否进入 `04-uxdesign/`。 |
| `demo-brief` | demo 叙事和素材需求 | 可衔接 `pypto-demo-data-filling` 和 `pto-design-system`。 |
| `ux-design-spec` | 设计规格 | 可衔接 `04-uxdesign/` canonical files。 |
| `prototype-implementation-plan` | 原型实现计划 | 可衔接 `05-prototypes/`，但 Batch A 不执行 build。 |
| `prototype-build` | 原型构建请求 | 只判断需要哪些 source / skill；构建由后续明确任务执行。 |
| `source-update` | source registry 更新建议 | 进入 `.agents/skills/pypto-knowledge-source/references/sources.md` 或任务包。 |
| `knowledge-writeback` | 知识库沉淀 | 结合 `pyptoux-content-router` 决定目录和 canonical filename。 |
| `design-system-application` | 设计系统应用或同步方向 | 衔接 `pto-design-system`；上游同步归 Batch D。 |

### Source Schema

Batch A 后的 source registry 应按 source instance 维护，至少包含以下字段：

| Field | 含义 |
| --- | --- |
| `status` | `active` / `candidate` / `deprecated` / `blocked`。 |
| `access_mode` | `online` / `local-mirror` / `manifest` / `user-provided` / `web-discovery`。 |
| `source_type` | 可多值；复用治理类型和检索策略，但不合并 source instance。 |
| `authority_scope` | 这个 source 对哪些 claim 有权威性，例如代码事实、官网措辞、设计意图、runtime artifact。 |
| `best_for` | 最适合回答的问题模式或材料类型。 |
| `not_for` | 不应用于回答的 claim 或任务。 |
| `question_modes` | 支持的 `Intent Mode`。 |
| `output_modes` | 可支持的 `Output Mode`。 |
| `freshness_policy` | 当前性、refresh、版本选择和 drift 处理规则。 |
| `search_mode` | 本地 `rg`、在线单点读取、站内搜索、web discovery、manifest lookup 等。 |
| `discovery_policy` | 是否可主动发现新材料，以及发现后如何登记。 |
| `claim_policy` | claim 分层、校验要求、冲突处理和引用边界。 |
| `writeback_policy` | 何时允许写回 registry / knowledge base / notes。 |
| `orientation_hints` | 可帮助定位的目录或路径提示；不能限制探索范围。 |
| `overwrite_guard` | 仅适用于 local mirror / local registry，防止覆盖未提交改动或外部原始材料。 |

旧字段迁移：

| Old Field / Rule | New Handling |
| --- | --- |
| `Role` | 拆成 `authority_scope` + `best_for`。 |
| `Priority note` | 拆成 `use_when` / `best_for` + `not_for`。 |
| `Search preference` | 改成 `search_mode`。 |
| `Refresh rule` | 收敛为 `freshness_policy`。 |
| `Search map` | 降级为 `orientation_hints`。 |
| `Overwrite guard` | 只保留给 local mirror / local registry source。 |
| 每个问题类型至多 1 个 primary source | 限制为简单 `lookup`；复杂 Intent Mode 允许多个 primary retrieval roles。 |

### Source Governance

术语：

- `authoritative`：source 对某类 claim 的权威等级。
- `primary`：本次问题中的首选检索角色，不等于永久权威。
- `deprecated`：可作历史背景或 drift 线索，默认不主动使用。
- `blocked`：不允许主动访问、引用或写入结果。
- `manifest` source：原始材料不一定进仓库；仓库只保存索引、位置、权限、数据等级、可引用范围和使用规则。
- `source instance`：具体来源，例如 `pypto`、`pypto-tools`、`PTO-TestData`。
- `source type`：治理类型，例如 `code-source`、`runtime-artifact-source`；可复用策略，但不能抹掉具体来源。

已登记 source 初始状态采用保守降权：

| Source | 状态 | 口径 |
| --- | --- | --- |
| `pypto` | `active` | 代码事实、字段、literal、文档源码 freshness 的最高优先级；refresh 归 Batch B。 |
| `pypto-official-docs` | `active` | 官网口径、对外措辞、教程入口 authoritative；不替代源码事实。 |
| `pypto-top-level-design-documents` | `active` within design-intent | 设计意图、架构方向、决策背景可主动用；当前实现事实需回 `pypto` 校验。 |
| `cann-docs-community-edition` | `active` | 非 PyPTO CANN / Ascend / API / 工具链官方来源。 |
| `pypto-sample-dataset` | `active` | demo/runtime artifact 证据源；必须保留数据等级与可外发边界。 |
| `curated-external-links` | `active` as discovery/supporting | 只作发现、背景、claim 假设和关键词来源；不作事实出口。 |

新增候选 source / discovery pool：

| Source | 初始状态 | 建议 source_type | 说明 |
| --- | --- | --- | --- |
| `https://gitcode.com/cann/pto-isa` | `candidate` | `code-source`, `isa-source`, `hardware-interface-source` | PTO ISA、A5/950、硬件/指令相关 claim 候选。 |
| `https://gitcode.com/cann/cannbot-skills` | `candidate` | `tooling-source`, `agent-workflow-source` | agent / tooling / workflow 线索；不当 PyPTO 事实源。 |
| `https://gitcode.com/cann/ops-transformer` | `candidate` | `code-source`, `operator-workflow-source` | operator / workflow / tooling 相关候选。 |
| `https://gitcode.com/cann/pypto-tools` | `candidate` | `code-source`, `toolkit-product-source`, `demo-evidence-source` | Batch C 决定 mirror、adapter 和 demo 使用策略。 |
| `https://gitcode.com/zhanghuixin/PTO-TestData` | `candidate` / `manifest` | `runtime-artifact-source`, `demo-evidence-source` | 测试 / 运行 / demo 数据候选；需数据等级和引用边界。 |
| `https://github.com/hengliao1972/pypto_top_level_design_documents` | `active` within design-intent / `mirror-candidate` | `design-intent-source` | 已登记 source；可考虑本地 mirror 供跨文件检索。 |
| `https://github.com/yinyucheng0601/pto-design-system` | `candidate-active` / `mirror-candidate` | `design-system-source` | Batch D 决定同步方式和 `.agents/skills/pto-design-system/` 同步。 |
| `https://gitcode.com/org/cann/repos` | `discovery-pool` | `external-discovery-source`, `candidate-source-pool` | 不作为单一事实源；用于后续筛选高相关 CANN org repo。 |

### Claim Verification

Claim 类型：

| Claim Type | 处理规则 |
| --- | --- |
| `factual` | 字段名、路径、API、版本、行为、schema、指标；必须回 authoritative source 校验。 |
| `design-intent` | 架构意图、方向、设计取舍；可由 design docs 支撑，但当前实现事实仍回代码校验。 |
| `empirical` | 经验、性能观察、调优建议；标注 `unverifiable-empirical`，不伪装成通用事实。 |
| `opinion` | 评价、观点、推测；只作背景。 |
| `derived` | 基于已验证事实推导出的结论；说明推导依据和不确定性。 |

校验状态：

- `verified`
- `conflict`
- `stale`
- `unverifiable-missing`
- `unverifiable-empirical`
- `needs-user-confirmation`

回答或写回时必须显式保留 conflict、stale 和 empirical，不悄悄抹平冲突。

### Web Discovery

Web discovery 是 discovery mechanism，不是 source of truth。

- 适用：`trend-research`、`painpoint-mining`、`workflow-research`、`optimization`、`diagnostic`、`ux-strategy`，以及用户明确要求查最新公开材料时。
- 不适用：可由本地权威 source 直接回答的简单 `lookup`。
- 发现材料后先抽 claim，再按 claim 类型回 `pypto`、官方 docs、CANN docs、runtime artifact、design docs 或其他 authoritative source 校验。
- 高价值公开材料经确认后可进入 `curated-external-links` 或 source registry；未确认前只作 discovery result。
- `curated-external-links` 与 web discovery 可共享 `external-discovery-source` 类型，但前者是已登记 registry，后者是发现机制。

### Clone / Local Mirror Policy

Batch A 只制定原则和候选清单，不执行 clone。

- 高频、结构化、可检索、需要跨文件理解的 source，倾向建立 local mirror。
- 私有仓、大体量仓库、运行数据、设计稿源文件默认先走 `manifest` + 用户确认路径 / 权限。
- 只偶尔查、在线结构稳定的 source 保持在线检索。
- supporting article / 社区帖子默认不 clone，只登记链接、claim 和验证状态。
- issues / discussions / PR / FAQ 类 source 先保持在线检索；如高频用于 painpoint-mining，再考虑导出快照或 mirror。
- `pypto` 本体 refresh 归 Batch B。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的 mirror 与 `.agents/skills/pto-design-system/` 同步策略归 Batch D。

明确候选 mirror set：

- `https://gitcode.com/cann/pypto`
- `https://gitcode.com/cann/pto-isa`
- `https://gitcode.com/cann/cannbot-skills`
- `https://gitcode.com/cann/ops-transformer`
- `https://gitcode.com/cann/pypto-tools`
- `https://gitcode.com/zhanghuixin/PTO-TestData`
- `https://github.com/hengliao1972/pypto_top_level_design_documents`
- `https://github.com/yinyucheng0601/pto-design-system`

`https://gitcode.com/org/cann/repos` 只登记为 discovery pool。Codex 后续可根据既有项目材料、对话历史、问题相关度和使用频率筛选高相关 repo；高频使用后再升级为 mirror candidate。

### UX / Demo Output Rules

UX / demo 类问题不能只给技术事实，应把证据转成工作流和设计输入：

- `workflow-research` 输出任务流、角色、输入输出、决策点、失败点、工具断点。
- `painpoint-mining` 输出痛点、频率/证据强度、相关 source、潜在 UX 策略。
- `demo-design` 输出 demo narrative、数据需求、交互结构、真实性等级和 PTO design system 约束。
- `demo-material` 输出候选真实材料、数据等级、来源路径、可外发状态、缺口和 manifest 需求。
- `ux-strategy` 输出 UX opportunity、设计原则、策略方向和需要继续验证的 claim。
- Output Mode 只决定交付形态和后续 workflow；实际文件落点必须结合 `content-routing.md`、canonical filenames 和现有目录约束。

### User Decisions Needed

当前不阻塞初次 plan 落盘，但会影响后续 batch：

- 哪些 source 需要明确 `deprecated` 或 `blocked`。
- `pypto-tools` 本地路径、权限、可引用范围和是否允许记录文件结构 / schema / 截图 / 代码片段。
- `pto-isa`、`cannbot-skills`、`ops-transformer`、`PTO-TestData` 是否允许 clone 到本地 mirror，以及 mirror 放置位置。
- `PTO-TestData`、算子运行数据和 toolkit 设计稿源文件的数据等级、脱敏规则和可外发状态。
- `yinyucheng0601/pto-design-system` 的同步方式和 `.agents/skills/pto-design-system/` 同步边界。
- issues / discussions / PR / FAQ 是否需要在线检索、导出快照，或建立本地检索缓存。

### Batch A Acceptance Checks

- 本文不再暗示“落盘即完成 Batch A”。
- `batch_status` 与 `plan_status` 已分离；当前为 `complete` / `implemented`。
- `Implementation Steps` 已拆为本节 `Plan-Mode Writeback` 和 §7 `Later /goal Execution Contract`。
- 已登记 source 没有默认 `deprecated` / `blocked`；只做保守降权。
- 新增候选仓库和 CANN org discovery pool 已写入方案。
- `/goal` 行为明确为“按已确认方案执行，只遇阻塞暂停”。

### Later `/goal` Implementation Checklist

- 更新 `.agents/skills/pypto-knowledge-source/SKILL.md`。
- 重构 `.agents/skills/pypto-knowledge-source/references/sources.md`。
- 必要时同步更新 `sources-to-refresh.md`、`decisions.md`、`open-questions.md`、`status.md`、`prompts/resume.md`。
- 用 `rg` 检查旧全局规则是否仍存在，例如未限定的“每个问题类型至多 1 个 primary source”。
- 检查全部 `Intent Mode`、`Output Mode` 和 source schema 字段是否已覆盖。
- 检查没有执行 clone / refresh / demo build / design system sync。
