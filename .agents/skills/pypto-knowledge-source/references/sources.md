# Business Knowledge Sources | Agentic Source Registry

这份文件是 PyPTOUX 常用 business knowledge sources 的注册表（registry），也是 URL Domain Mapping 的唯一主登记。它记录 source instance 的能力、权限、可信边界、适用问题模式、claim policy 和 writeback policy；不要在其他 skill 中重复维护完整 source 表。

## 1. Governance Terms

- `source instance`：具体来源，例如 `pypto`、`pypto-tools`、`pypto-testdata`。具体来源必须保持可追溯，不能因为共享治理类型而合并。
- `source_type`：治理类型，例如 `code-source`、`pypto-data-source`、`external-discovery-source`。一个 source instance 可以有多个 `source_type`。
- `authoritative`：source 对某类 claim 的权威等级。
- `primary retrieval role`：本次问题中的首选检索角色；复杂问题可以有多个 primary retrieval roles。
- `manifest` source：原始材料不一定进仓库；仓库只保存索引、位置、权限、数据等级、可引用范围和使用规则。
- `deprecated`：可作历史背景或 drift 线索，默认不主动使用。
- `blocked`：不允许主动访问、引用或写入结果。

## 2. Source Schema

每个 source instance 应尽量按以下 schema 维护：

| Field | 含义 |
| --- | --- |
| `status` | `active` / `candidate` / `deprecated` / `blocked`。 |
| `access_mode` | `online` / `local-mirror` / `manifest` / `user-provided` / `web-discovery`。 |
| `source_type` | 可多值；复用治理类型和检索策略，但不合并 source instance。 |
| `authority_scope` | 这个 source 对哪些 claim 有权威性。 |
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
| `Priority note` | 拆成 `best_for` / `not_for` / `claim_policy`。 |
| `Search preference` | 改成 `search_mode`。 |
| `Refresh rule` | 收敛为 `freshness_policy`。 |
| `Search map` | 降级为 `orientation_hints`。 |
| `Overwrite guard` | 只保留给 local mirror / local registry source。 |
| 每个问题类型至多 1 个 primary source | 限制为简单 `lookup`；复杂 Intent Mode 允许多个 primary retrieval roles。 |

## 3. Source Status

- `active`：可被 agent 主动检索，但只能在自己的 `authority_scope` 内作为证据。
- `candidate`：可能有用，但权限、freshness、范围或可靠性未确认；可登记、可讨论，不默认当事实依据。
- `deprecated`：仍可作为历史背景、旧设计背景或 drift 线索，但默认不主动使用。
- `blocked`：不可访问、不可引用、不可写入结果。
- `discovery-pool`：不是事实源；只用于发现候选 source instance。

## 4. Source Types

| Source Type | 用途 | 可能包含 |
| --- | --- | --- |
| `code-source` | 代码事实、实现路径、API / schema / adapter 线索 | `pypto`、`pypto-3.0`、`pypto-tools`、`pto-isa`、`ops-transformer` |
| `official-doc-source` | 官方口径、API、开发指南、工具链说明 | `pypto-official-docs`、`cann-docs-community-edition` |
| `design-intent-source` | 架构意图、设计决策、方向规划 | `pypto-top-level-design-documents` |
| `pypto-data-source` | PyPTO 样例、测试数据、编译 / 运行产物、性能 / 图 / 日志证据 | `pypto-sample-dataset`、`pypto-testdata` |
| `demo-evidence-source` | demo 真实性、素材选择、联动设计依据 | `pypto-sample-dataset`、`pypto-testdata`、toolkit 设计稿源文件 |
| `external-discovery-source` | 外部文章、帖子、社区材料和候选 source 发现 | `curated-external-links`、web discovery、CANN org repo discovery pool |
| `user-feedback-source` | 痛点挖掘、诉求分析、UX 策略输入 | issues / discussions / PR / FAQ / troubleshooting |
| `design-system-source` | 视觉规范、交互模式、设计系统同步 | `yinyucheng0601/pto-design-system`、toolkit 设计稿源文件 |
| `toolkit-product-source` | Toolkit 能力、产品交互、demo 演进 | `pypto-tools`、toolkit 设计稿源文件 |
| `agent-workflow-source` | agent skill、自动化、工具链 workflow 线索 | `cannbot-skills` |
| `isa-source` | PTO ISA、硬件接口、指令语义 | `pto-isa` |

## 5. URL Domain Mapping

用户给出 URL 时，按以下映射识别 source 类型：

| URL pattern | Source |
| --- | --- |
| `gitcode.com/cann/pypto/**` | `pypto` |
| `github.com/hw-native-sys/pypto/**` | `pypto-3.0` |
| `pypto.gitcode.com/**` | `pypto-official-docs` |
| `github.com/hengliao1972/pypto_top_level_design_documents/**` | `pypto-top-level-design-documents` |
| `github.com/hengliao1972/**` | `web-discovery / no registered source by default` |
| `hiascend.com/**` | `cann-docs-community-edition` |
| `cann.csdn.net/**` | `curated-external-links (official-community-material)` |
| `gitcode.com/cann/community/tree/master/events/meetup/slides/950/**` | `curated-external-links (official-community-material)` |
| `gitcode.com/cann/community/tree/master/events/meetup/slides/950` | `curated-external-links (official-community-material)` |
| `gitcode.com/cann/pto-isa/**` | `pto-isa` |
| `gitcode.com/cann/cannbot-skills/**` | `cannbot-skills` |
| `gitcode.com/cann/ops-transformer/**` | `ops-transformer` |
| `gitcode.com/cann/pypto-tools/**` | `pypto-tools` |
| `gitcode.com/zhanghuixin/PTO-TestData/**` | `pypto-testdata` |
| `github.com/yinyucheng0601/pto-design-system/**` | `yinyucheng0601/pto-design-system` |
| `gitcode.com/org/cann/repos/**` | `cann-org-repo-discovery-pool` |
| `zhihu.com/**`、`zhuanlan.zhihu.com/**` | `curated-external-links` |
| `mp.weixin.qq.com/**` | `curated-external-links` |
| 其他 | `web-discovery / curated-external-links (unknown)` |

未列 domain 视为 `web-discovery / curated-external-links (unknown)`；先识别，再按 claim 级别回 authoritative source 校验。`official-community-material` 可长期保留为高可信公开材料入口，但仍不是长期 factual source of truth。

## 6. Registered Source Instances

### pypto

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `code-source`, `official-doc-source`
- `remote`: `https://gitcode.com/cann/pypto`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- `snapshot`: branch `master`, commit `ede29b6d7a3ff83067d7dfd34e3edc743334ca6a`, commit date `2026-06-27T09:40:24+08:00`
- `authority_scope`: PyPTO 代码事实、字段名、文件路径、sample code、运行行为、上游 literal、文档源码、API / tutorial freshness。
- `best_for`: `lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`demo-material` 中需要当前代码或文档源码证据的问题。
- `not_for`: 官网对外措辞、非 PyPTO CANN 通用概念、未校验的设计意图、外部经验 claim。
- `question_modes`: `lookup`, `freshness`, `diagnostic`, `optimization`, `workflow-research`, `demo-material`
- `output_modes`: `answer`, `research-brief`, `demo-brief`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` fast-forward 到 `origin/master`，当前 snapshot 见上方 `snapshot`。后续默认每个自然天最多 clone / refresh 一次；strong freshness 问题优先单点读取 upstream 或用户给定 URL。本地镜像只代表当前 checkout。
- `search_mode`: 本地优先 `rg`；用户给具体 URL 或强 freshness 问题时在线单点读取。线上仓库不用于大范围探索性检索。
- `discovery_policy`: 可从当前问题出发跨目录 `rg`；发现 drift 时记录，不在 Batch A 刷新。
- `claim_policy`: factual claim 以源码、文档源码或可追溯文件为准；字段名、路径、trace key、文件名等 literal 必须保留原样。
- `writeback_policy`: verified claim 可建议写回 `02-knowledge/`；drift 记录到对应 `drift.md` 或任务包。
- `orientation_hints`: `02-knowledge/00-shared/pypto-architecture/overview.md` 仅作目录 hint 和架构速读，不能限制 why/how/design/UX/demo 类探索；当前 snapshot 细节见该目录的 `sources.md`。
- `overwrite_guard`: local mirror 有未提交改动时，不得覆盖；先确认。

### pypto-3.0

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `code-source`, `official-doc-source`
- `remote`: `https://github.com/hw-native-sys/pypto`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-3.0`
- `snapshot`: branch `main`, commit `8f8de9b9c4419e526c1869b84d1f79d0f79de7a0`, commit date `2026-06-29T16:21:25+08:00`
- `authority_scope`: PyPTO 3.0 / next-generation 代码事实、字段名、文件路径、sample code、运行行为、上游 literal、文档源码、API / tutorial freshness。
- `best_for`: 涉及 PyPTO 3.0、next-generation PyPTO、GitHub `hw-native-sys/pypto`、新架构代码事实或 2.x / 3.0 差异的问题。
- `not_for`: PyPTO 2.x / GitCode `cann/pypto` 当前实现事实、官网对外措辞、非 PyPTO CANN 通用概念、未校验的设计意图、外部经验 claim。
- `question_modes`: `lookup`, `freshness`, `diagnostic`, `optimization`, `workflow-research`, `demo-material`
- `output_modes`: `answer`, `research-brief`, `demo-brief`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 于 `2026-06-29` clone 自 GitHub `hw-native-sys/pypto`，当前 snapshot 见上方 `snapshot`。后续 fetch / refresh 前需要单独确认权限、记录 snapshot，并检查本地改动；strong freshness 问题优先单点读取 upstream 或用户给定 URL。本地镜像只代表当前 checkout。
- `search_mode`: 本地优先 `rg`；用户给具体 URL 或强 freshness 问题时在线单点读取。线上仓库不用于大范围探索性检索。
- `discovery_policy`: 可从当前问题出发跨目录 `rg`；发现与 `pypto` 2.x 的差异、drift 或高价值迁移线索时记录，不直接覆盖旧 `pypto` source。
- `claim_policy`: PyPTO 3.0 factual claim 以本 source 的源码、文档源码或可追溯文件为准；涉及 PyPTO 2.x 行为时必须回 `pypto` 校验并分开标注；字段名、路径、trace key、文件名等 literal 必须保留原样。
- `writeback_policy`: verified claim 可建议写回 `02-knowledge/`；3.0 / next-gen 差异、迁移线索和 drift 记录到对应 `drift.md`、`sources.md` 或任务包。
- `orientation_hints`: 根目录 `README.md`、`README.zh-CN.md`、`docs/`、`examples/`、`include/`、`python/`、`runtime/`、`src/`、`tests/`。
- `overwrite_guard`: local mirror 有未提交改动时，不得覆盖；先确认。

### pypto-official-docs

- `status`: `active`
- `access_mode`: `online`
- `source_type`: `official-doc-source`
- `remote`: `https://pypto.gitcode.com/tutorials/`
- `authority_scope`: PyPTO 官方 tutorials 入口、官网教程编排、对外发布措辞。
- `best_for`: 用户问官网怎么说、官网展示、对外文案、官网 URL、教程入口和 tutorials 导航。
- `not_for`: 当前代码事实、字段名、文件路径、可运行行为、文档源码 freshness。
- `question_modes`: `lookup`, `freshness`, `workflow-research`
- `output_modes`: `answer`, `research-brief`, `knowledge-writeback`
- `freshness_policy`: 在线只读；检索时把在线文档站点视为当前版本。
- `search_mode`: 在线单点读取官网页面；不做无界 web crawl。
- `discovery_policy`: 可从 `https://pypto.gitcode.com/tutorials/` 导航发现相关 tutorial / guide；高价值新入口可登记。
- `claim_policy`: 官网 wording authoritative；若与 `pypto` 代码事实冲突，分开标注。
- `writeback_policy`: 官网口径可进入 `02-knowledge/` sources 或 answer；不要复制大段官网内容。

### pypto-top-level-design-documents

- `status`: `active` within design-intent / `local-mirror`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `design-intent-source`
- `remote`: `https://github.com/hengliao1972/pypto_top_level_design_documents`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto_top_level_design_documents`
- `snapshot`: branch `main`, commit `7faac0b910e40989a6bbd381a80595b65ab29708`, commit date `2026-04-28T01:22:43+08:00`
- `authority_scope`: PyPTO 顶层设计、架构意图、方向规划、专题设计、设计决策背景。
- `best_for`: `workflow-research`、`ux-strategy`、`trend-research`、架构方向和 design decision 类问题。
- `not_for`: 当前实现事实、字段名、文件路径、运行行为、上游 literal；这些必须回 `pypto` 校验。
- `question_modes`: `lookup`, `workflow-research`, `trend-research`, `ux-strategy`, `demo-design`
- `output_modes`: `answer`, `research-brief`, `ux-analysis`, `demo-brief`, `ux-design-spec`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 fetch / refresh 需要单独执行并记录 snapshot。强 freshness 问题优先在线单点读取或 refresh mirror。
- `search_mode`: 优先本地 `rg` 查根目录专题、architecture index、logical / development / process / physical / scenario views、module detailed designs、design decisions、open questions、glossary、codebase mapping；需要 freshness 时再在线单点读取。
- `discovery_policy`: 不因当前已知 runtime redesign 子主题过窄而排除更 general 的 PyPTO 顶层设计主题。`github.com/hengliao1972/**` 中除本 source 外，当前没有其他需要登记的 source；后续只有用户指定或证据充分时再登记。
- `claim_policy`: design-intent claim 可由本 source 支撑；实现事实必须回 `pypto`。
- `writeback_policy`: 可支持 UX / strategy / research writeback；若涉及当前代码行为，必须附校验来源。
- `orientation_hints`: `pypto-runtime-arch-docs/00-index.md`、`01-introduction.md`、`02-logical-view.md`、`modules/*.md`、`08-design-decisions.md`、`09-open-questions.md`、`appendix-a-glossary.md`、`appendix-b-codebase-mapping.md`。

### cann-docs-community-edition

- `status`: `active`
- `access_mode`: `online`
- `source_type`: `official-doc-source`
- `remote`: `https://www.hiascend.com/cann/document`
- `observed_entry`: `https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/900beta2/index/index.html` 仅作曾观测示例，不作固定版本。
- `authority_scope`: 非 PyPTO 专属的 CANN、Ascend 硬件、Ascend C、算子开发、图开发、通信、工具、API、故障处理与软硬结合概念。
- `best_for`: `lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`trend-research` 中需要 CANN/Ascend 官方口径的问题。
- `not_for`: PyPTO 专属代码事实、PyPTO 文档源码、私有运行数据、未公开设计稿。
- `question_modes`: `lookup`, `freshness`, `diagnostic`, `optimization`, `workflow-research`, `trend-research`, `ux-strategy`
- `output_modes`: `answer`, `research-brief`, `ux-analysis`, `knowledge-writeback`
- `freshness_policy`: 默认选择官网当前最新版社区版文档；只有用户明确指定版本时才使用特定版本链接。
- `search_mode`: 在线文档目录 + 版本选择器 + 栏目定位；需要保留图片、架构图、概念图和图解信息。
- `discovery_policy`: 可从官网文档总入口发现相关栏目。
- `claim_policy`: CANN/Ascend 官方 claim authoritative；涉及 PyPTO 封装行为时回 `pypto` 校验。
- `writeback_policy`: 可进入 `02-knowledge/`；引用时记录版本入口或页面路径。

### pypto-sample-dataset

- `status`: `active`
- `access_mode`: `local-mirror`
- `source_type`: `pypto-data-source`, `demo-evidence-source`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`
- `authority_scope`: PyPTO 真实 demo、样例数据、测试数据、编译 / 运行产物、输入输出示意、可视化素材。
- `best_for`: `demo-material`、`demo-design`、`workflow-research`、PyPTO data 佐证、代码-图-性能联动。
- `not_for`: 通用 API 事实、官网对外措辞、未运行样例的推断。
- `question_modes`: `lookup`, `workflow-research`, `demo-design`, `demo-material`, `ux-strategy`
- `output_modes`: `answer`, `research-brief`, `demo-brief`, `ux-analysis`, `prototype-implementation-plan`, `knowledge-writeback`
- `freshness_policy`: 默认直接使用当前本地数据目录；后续用户放入该目录的 PyPTO 相关样例数据继续归入本 source instance。只有用户提供新同步方式或更新来源时才改变。
- `search_mode`: 本地目录检索；优先关注 `code/`、`output_*/program.json`、`merged_swimlane.json`、`topo.json`、`run.log` 等产物。
- `discovery_policy`: 可与 `pypto` 示例代码互相印证；新增数据集需登记数据等级、来源、可外发状态和生成 / 获取规则。
- `claim_policy`: 原始数据等级按真实来源登记为 L1；L1 可作真实运行证据，但默认不等于 `share-safe`。只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。不得把 L2/L3 或推导材料伪装成 L1。
- `writeback_policy`: PyPTOUX 仓库可在 `02-knowledge/00-shared/pypto-data/` 记录 manifest、摘要、数据等级、schema、来源和生成 / 获取规则；允许写入抽样或脱敏后的数据。demo 使用时同步记录数据等级、来源、可外发状态和生成规则。
- `overwrite_guard`: 不主动改写该目录；清理、替换或批量写入前先确认。

### pypto-testdata

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `pypto-data-source`, `demo-evidence-source`
- `remote`: `https://gitcode.com/zhanghuixin/PTO-TestData`
- `display_name`: `PTO-TestData`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`
- `snapshot`: branch `main`, commit `62d909c3f1a2c6bc4bb2b22861d3c140c6c55f6e`, commit date `2026-06-26T09:08:31+08:00`
- `authority_scope`: 候选 PyPTO 测试数据、样例数据、运行产物和 demo evidence。
- `best_for`: `demo-material`、`demo-design`、PyPTO data source 对照。
- `not_for`: 原始 L1 数据不得默认作为 `share-safe` 外发；未抽样、未脱敏、未写明边界的数据不得进入对外 demo。
- `question_modes`: `lookup`, `demo-material`, `demo-design`, `ux-strategy`
- `output_modes`: `demo-brief`, `research-brief`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 clone / fetch 需要单独执行并记录 snapshot。
- `search_mode`: 优先本地 `rg`；需要 freshness 时再在线单点读取或 refresh mirror。
- `discovery_policy`: 可升级为 PyPTO data / demo evidence source。
- `claim_policy`: 数据等级为 L1；权限和可外发边界同 `pypto-sample-dataset`。只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。
- `writeback_policy`: PyPTOUX 仓库可在 `02-knowledge/00-shared/pypto-data/` 记录 manifest、摘要、数据等级、schema、来源和生成 / 获取规则；允许写入抽样或脱敏后的数据，不写入原始全量数据。

### pypto-tools

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `code-source`, `toolkit-product-source`, `demo-evidence-source`
- `remote`: `https://gitcode.com/cann/pypto-tools`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`
- `snapshot`: branch `master`, commit `f70ad69f59b7eaa76ccbd1dcf827a5c8c10851bb`, commit date `2026-06-24T21:32:32+08:00`
- `authority_scope`: 候选 PyPTO toolkit 代码、产品能力、adapter、demo workflow。
- `best_for`: `workflow-research`、`demo-design`、`demo-material`、`ux-strategy` 中的 toolkit 能力和输入输出。
- `not_for`: 不得把未对照本地 mirror、`pypto` 文档/源码或用户提供证据的 toolkit 行为写成事实。
- `question_modes`: `lookup`, `workflow-research`, `demo-design`, `demo-material`, `ux-strategy`
- `output_modes`: `research-brief`, `demo-brief`, `ux-analysis`, `prototype-implementation-plan`, `source-update`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 clone / fetch 需要单独执行并记录 snapshot。
- `search_mode`: 优先本地 `rg`；需要 freshness 时再在线单点读取或 refresh mirror。
- `discovery_policy`: 可作为 mirror candidate；本仓库允许记录文件结构、schema、截图和少量代码片段，但不得写入未经授权的大段源码或原始私有材料。
- `claim_policy`: 结构、schema、截图和代码片段可在标注来源后支持 toolkit 能力说明；涉及真实 toolkit 行为需以 `pypto-tools` mirror、`pypto` 文档/源码或用户提供证据校验。
- `writeback_policy`: 可写入 source registry、`02-knowledge/00-shared/pypto-toolkit/` 和任务包；代码片段保持最小必要，避免复制大段源码。

### pto-isa

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `code-source`, `isa-source`, `hardware-interface-source`
- `remote`: `https://gitcode.com/cann/pto-isa`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa`
- `snapshot`: branch `master`, commit `4b8e10a583e0e9539421f71bdd6dd1fa8a759d06`, commit date `2026-06-26T21:20:16+08:00`
- `knowledge_map`: `02-knowledge/00-shared/pto-isa/`
- `authority_scope`: PTO ISA、Tile Library、硬件接口、指令语义、C++ intrinsic API、CPU / NPU / CostModel / communication 后端实现路径和 A5/950 相关 technical claim。
- `best_for`: `lookup`、`trend-research`、`ux-strategy`、`demo-material` 中涉及 ISA / hardware interface / Tile 编程模型的问题。
- `not_for`: PyPTO 当前实现事实，除非回 `pypto` 或相关代码校验。
- `question_modes`: `lookup`, `trend-research`, `ux-strategy`, `demo-material`
- `output_modes`: `answer`, `research-brief`, `ux-analysis`, `demo-brief`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 clone / fetch 需要单独执行并记录 snapshot。强 freshness 问题优先在线单点读取或 refresh mirror。
- `search_mode`: 优先本地 `rg`；需要 freshness 时再在线单点读取或 refresh mirror。
- `discovery_policy`: 可从当前问题出发跨 docs / include / kernels / tests 检索；发现高价值专题可写回 `02-knowledge/00-shared/pto-isa/`。
- `claim_policy`: ISA claim 以当前 snapshot 的文档、头文件或测试为准；A5/950 硬件 claim 需与官方 CANN/Ascend 或代码 source 对照；PyPTO 当前行为仍回 `pypto`。
- `writeback_policy`: 可写入 source registry、`02-knowledge/00-shared/pto-isa/` 和任务包；不复制大段源码或完整 ISA 表。

### ops-transformer

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `code-source`, `operator-workflow-source`
- `remote`: `https://gitcode.com/cann/ops-transformer`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/ops-transformer`
- `snapshot`: branch `master`, commit `4802644f1a896baf5105bebae0544d3c235b5d06`, commit date `2026-06-27T09:24:49+08:00`
- `knowledge_map`: `02-knowledge/00-shared/ops-transformer/`
- `authority_scope`: 当前 checkout 的 transformer 类算子仓库结构、算子目录、标准算子工程 workflow、调用方式、tooling code source 和可追溯代码路径。
- `best_for`: `workflow-research`、`demo-material`、`ux-strategy` 中与算子迁移、operator workflow 或 tooling 相关的问题。
- `not_for`: PyPTO current behavior，除非经过相关代码和官方文档校验。
- `question_modes`: `lookup`, `workflow-research`, `demo-material`, `ux-strategy`
- `output_modes`: `answer`, `research-brief`, `demo-brief`, `ux-analysis`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot。README 提醒源码会跟随 CANN 软件版本发布，使用 `master` 可能存在版本不匹配风险；强版本问题必须选配套 tag / release。
- `search_mode`: 优先本地 `rg`；需要 freshness 或版本配套时再在线单点读取、checkout tag 或 refresh mirror。
- `discovery_policy`: 可从当前问题出发跨 docs / op directories / examples / torch_extension 检索；发现高价值算子 workflow 可写回 `02-knowledge/00-shared/ops-transformer/`。
- `claim_policy`: factual claim 需回当前代码、配套 tag、CANN/Ascend 官方文档或具体算子目录校验；PyPTO 当前行为仍回 `pypto`。
- `writeback_policy`: 可写入 source registry、`02-knowledge/00-shared/ops-transformer/` 和任务包；不复制全量算子列表或大段源码。

### cannbot-skills

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `tooling-source`, `agent-workflow-source`
- `remote`: `https://gitcode.com/cann/cannbot-skills`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/cannbot-skills`
- `snapshot`: branch `master`, commit `769225f86bd5a1a6993114326007064d34499efd`, commit date `2026-06-26T20:21:09+08:00`
- `knowledge_map`: `02-knowledge/00-shared/cannbot-skills/`
- `authority_scope`: agent skill taxonomy、tooling workflow、prompt pattern、skill governance、GitCode issue / PR workflow 和自动化线索。
- `best_for`: `workflow-research`、`ux-strategy` 中与 agent 辅助、工具链工作流有关的问题。
- `not_for`: PyPTO / CANN factual source of truth。
- `question_modes`: `workflow-research`, `trend-research`, `ux-strategy`
- `output_modes`: `research-brief`, `ux-analysis`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 clone / fetch 需要单独执行并记录 snapshot。强 freshness 问题优先在线单点读取或 refresh mirror。
- `search_mode`: 优先本地 `rg`；需要 freshness 时再在线单点读取或 refresh mirror。
- `discovery_policy`: 可作为 CANN agent / skill workflow 的高相关 source；不将 skill 文案中的技术 claim 直接提升为事实。
- `claim_policy`: 仅作 workflow / tooling / skill governance 线索；API、硬件、性能、PyPTO 行为等 factual claim 回 authoritative source。
- `writeback_policy`: 可写入 source registry、`02-knowledge/00-shared/cannbot-skills/` 和任务包；不复制全量 skills。

### yinyucheng0601/pto-design-system

- `status`: `active` / `local-mirror`
- `access_mode`: `local-mirror`, `online`
- `source_type`: `design-system-source`
- `remote`: `https://github.com/yinyucheng0601/pto-design-system`
- `local_mirror`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`
- `snapshot`: branch `main`, commit `7434a243904de060aa01be5f9bf8e348aad9e703`, commit date `2026-06-25T15:43:22+08:00`
- `authority_scope`: 上游 PTO design system、tokens、视觉规范、交互模式、approved patterns、agent-facing skill bundle。
- `best_for`: `design-system-application`、`ux-design-spec`、`prototype-implementation-plan`、`demo-design` 中涉及 PTO 风格和 design system 的问题。
- `not_for`: 不得把上游仓库全量盲目复制进 PyPTOUX；未批准 experimental preview 不得进入 `.agents/skills/pto-design-system/` 稳定 bundle。
- `question_modes`: `demo-design`, `ux-strategy`, `workflow-research`
- `output_modes`: `design-system-application`, `ux-design-spec`, `prototype-implementation-plan`, `source-update`
- `freshness_policy`: 本地 mirror 已于 `2026-06-27` refresh 校验，当前仍为上述 snapshot；后续 sync 采用手动触发 mirror inspect / audit / change report，不做后台自动同步。
- `search_mode`: 优先本地 `rg`；需要 freshness 时再在线单点读取或 refresh mirror。
- `discovery_policy`: 先 clone / inspect 上游 mirror，再系统性更新 `.agents/skills/pto-design-system`（如需）。
- `claim_policy`: design system claim 需区分上游 source 与 agent-facing skill bundle。实现用 token / pattern code 以当前 skill 或上游 mirror 文件为准；人类审阅以 `.agents/skills/pto-design-system/design-system-preview.html` 和 skill references 为入口。
- `writeback_policy`: 允许将 token CSS、UI CSS contract、approved pattern specs/code、usage docs、preview gate 规则和稳定 preview 写入 `.agents/skills/pto-design-system/`；不写入上游全量 mirror、未批准 experimental preview 或大量原始资产。

### toolkit-design-files

- `status`: `candidate` / `manifest`
- `access_mode`: `manifest`, `user-provided`
- `source_type`: `design-system-source`, `toolkit-product-source`, `demo-evidence-source`
- `local_storage`: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件`
- `authority_scope`: 候选 toolkit 设计稿、产品交互、视觉/流程意图。
- `best_for`: `ux-analysis`、`demo-design`、`design-system-application`、`ux-design-spec`。
- `not_for`: 原始设计稿文件不得进入 PyPTOUX 仓库。
- `question_modes`: `workflow-research`, `demo-design`, `ux-strategy`
- `output_modes`: `ux-analysis`, `demo-brief`, `ux-design-spec`, `design-system-application`, `source-update`
- `freshness_policy`: 用户已确认本地存放地址；具体文件 snapshot、版本和来源仍需在 manifest 中登记。
- `search_mode`: manifest lookup / user-provided path。
- `discovery_policy`: 只登记 manifest、权限摘要、缩略图 / 截图 / 结构摘要。
- `claim_policy`: 可记录缩略图、截图和结构摘要；必须明确可引用范围、可外发状态和与当前 design system 的关系。
- `writeback_policy`: 不写原始设计稿；可写 manifest、缩略图、截图、结构摘要和来源说明。

### user-feedback-sources

- `status`: `candidate`
- `access_mode`: `online`, `manifest`, `web-discovery`
- `source_type`: `user-feedback-source`, `painpoint-evidence-source`
- `authority_scope`: issues、discussions、PR、FAQ、troubleshooting 中的用户痛点、诉求、失败点和工作流断点。
- `best_for`: `painpoint-mining`、`workflow-research`、`diagnostic`、`ux-strategy`。
- `not_for`: API / code / version factual source of truth，除非回 authoritative source 校验。
- `question_modes`: `diagnostic`, `workflow-research`, `trend-research`, `painpoint-mining`, `ux-strategy`
- `output_modes`: `research-brief`, `ux-analysis`, `ux-design-spec`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 默认在线检索；如高频使用，再考虑导出快照或建立本地检索缓存。
- `search_mode`: issue search、discussion search、FAQ / troubleshooting lookup、web discovery。
- `discovery_policy`: 可按主题发现新反馈源；高价值反馈源经确认后登记。
- `claim_policy`: 用户反馈可证明痛点存在，不证明技术事实正确；技术事实回 authoritative source。
- `writeback_policy`: 可写入 UX analysis / painpoint notes；注意隐私和引用边界。

### curated-external-links

- `status`: `active` as discovery/supporting
- `access_mode`: `local-registry`, `web-discovery`
- `source_type`: `external-discovery-source`
- `local_registry`: `08-references/curated-external-links.md`
- `authority_scope`: 外部文章、微信、知乎、博客、社区分享、专家解读、场景化总结的发现入口和 claim 假设源。
- `best_for`: `trend-research`、`painpoint-mining`、`workflow-research`、`ux-strategy` 的背景材料、关键词和待验证 claim。
- `not_for`: factual source of truth；不可直接作为字段、API、版本、运行行为的最终依据。
- `question_modes`: `lookup`, `trend-research`, `painpoint-mining`, `workflow-research`, `ux-strategy`
- `output_modes`: `answer`, `research-brief`, `ux-analysis`, `source-update`, `knowledge-writeback`
- `freshness_policy`: local registry 条目以人工登记为准；带“最近 / 新 / 这周 / 这个月”的问题需 web discovery 或平台搜索。
- `search_mode`: 用户问收藏链接时 grep local registry；用户问某平台是否讲过某主题时平台站内搜索或 web search。
- `discovery_policy`: 高价值材料经 claim 校验后可建议写入 local registry；unknown URL 先抽 claim。
- `claim_policy`: factual claim 必须回 authoritative source 校验；empirical / opinion 必须标注。
- `writeback_policy`: 写入 `08-references/` 前注意未提交工作树锁。`cann.csdn.net/**` 可长期保留为 `official-community-material` supporting source。

### web-discovery

- `status`: `candidate`
- `access_mode`: `web-discovery`
- `source_type`: `external-discovery-source`
- `authority_scope`: 发现公开材料、趋势材料、社区讨论、supporting article 和潜在 source instance。
- `best_for`: `trend-research`、`painpoint-mining`、`workflow-research`、`optimization`、`diagnostic`、`ux-strategy`。
- `not_for`: source of truth；不得直接作为 factual claim 出口。
- `question_modes`: `freshness`, `diagnostic`, `optimization`, `workflow-research`, `trend-research`, `painpoint-mining`, `ux-strategy`
- `output_modes`: `answer`, `research-brief`, `ux-analysis`, `source-update`, `knowledge-writeback`
- `freshness_policy`: 对最新 / 最近 / 当前版本类问题必须注意发布时间、事件时间和 source 权威性。
- `search_mode`: web search、站内搜索、公开页面单点读取。
- `discovery_policy`: 高价值材料经确认后可进入 curated registry 或 source registry。
- `claim_policy`: 先抽 claim，再回 authoritative source 校验；无法校验时标注 empirical / opinion / unverifiable。
- `writeback_policy`: 只写链接、claim 摘要和验证状态，不复制长文。

### cann-org-repo-discovery-pool

- `status`: `discovery-pool`
- `access_mode`: `web-discovery`
- `source_type`: `external-discovery-source`, `candidate-source-pool`
- `remote`: `https://gitcode.com/org/cann/repos`
- `authority_scope`: CANN org 下潜在相关仓库的发现入口。
- `best_for`: 根据既有项目材料、问题相关度和使用频率筛选候选仓库。
- `not_for`: 单一事实源；不可把整个 org repos 当作 authoritative source。
- `question_modes`: `workflow-research`, `trend-research`, `demo-material`, `ux-strategy`, `source-update`
- `output_modes`: `research-brief`, `source-update`
- `freshness_policy`: 在线发现；高相关 repo 经确认后单独登记 source instance。
- `search_mode`: org repo 列表 / web discovery；Batch A 不 clone。
- `discovery_policy`: 高频或高相关 repo 可升级为 mirror candidate。
- `claim_policy`: repo pool 本身不承载 factual claim；claim 必须落到具体 source instance。
- `writeback_policy`: 只写候选 repo、相关理由和验证状态。

## 7. Clone / Local Mirror Policy

Batch A 只制定原则和候选清单，不执行 clone / pull / fetch / refresh。

- 高频、结构化、可检索、需要跨文件理解的 source，倾向建立 local mirror。
- 私有仓、大体量仓库、未归入已登记 source 的数据材料、设计稿源文件默认先走 `manifest` + 用户确认路径 / 权限。
- 只偶尔查、在线结构稳定的 source 保持在线检索。
- supporting article / 社区帖子默认不 clone，只登记链接、claim 和验证状态。
- issues / discussions / PR / FAQ 类 source 先保持在线检索；如高频用于 painpoint-mining，再考虑导出快照或 mirror。
- `pypto` 本体 refresh 归 Batch B。
- `pypto-3.0` 本地镜像已落地；后续 fetch / refresh 前单独确认权限、记录 snapshot，并检查本地改动。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的 mirror 与 `.agents/skills/pto-design-system/` 同步策略归 Batch D。

明确 mirror tracking set（包含已落地 mirror 与仍待确认的 mirror-candidate）：

- `https://gitcode.com/cann/pypto`
- `https://github.com/hw-native-sys/pypto`
- `https://gitcode.com/cann/pto-isa`
- `https://gitcode.com/cann/cannbot-skills`
- `https://gitcode.com/cann/ops-transformer`
- `https://gitcode.com/cann/pypto-tools`
- `https://gitcode.com/zhanghuixin/PTO-TestData`
- `https://github.com/hengliao1972/pypto_top_level_design_documents`
- `https://github.com/yinyucheng0601/pto-design-system`

## 8. Maintenance Rule

- 新的常用业务来源统一在这里新增 source instance。
- 每个新 source 至少写清楚 `status`、`access_mode`、`source_type`、`authority_scope`、`best_for`、`not_for`、`question_modes`、`output_modes`、`freshness_policy`、`search_mode`、`discovery_policy`、`claim_policy` 和 `writeback_policy`。
- URL Domain Mapping 只在本文件维护；其他文件引用本节，不重复维护完整表。
- 不要为了合并 `source_type` 而合并 source instance；具体来源、路径、权限、状态和 claim policy 必须保持可追溯。

### Source Registry Change Protocol

当 agent 删除、降级、升级、重命名或新增 source instance / source type / URL pattern 时，必须主动执行以下动作：

1. 先判断变更类型：
   - source instance 变更：新增、删除、重命名、`active` / `candidate` / `deprecated` / `blocked` 状态变化。
   - source type 变更：新增、删除、改名、语义收窄或扩展。
   - URL pattern 变更：新增、删除、改写匹配范围或调整匹配顺序。
2. 更新本文件对应位置：
   - source instance 变更时，同步更新 registry section、URL Domain Mapping、clone / mirror policy、candidate / manifest 说明。
   - source type 变更时，同步更新 Source Types 表，并检查所有引用该 type 的 source instance。
   - URL pattern 变更时，确保更具体的 pattern 排在更宽泛 pattern 前面，避免被宽泛规则吞掉。
3. 全仓检索旧标识和旧 URL：
   - 用 `rg` 搜索旧 source id、旧 source type、旧 URL pattern、旧 remote URL。
   - 检查命中的 `.agents/skills/`、`09-docs/04-upgrade-plans/`、`02-knowledge/`、`08-references/` 和 `09-docs/03-indexes/` 是否需要同步。
4. 处理替代关系：
   - 删除 source instance 时，优先降级为 `deprecated` 并写明替代 source；只有用户明确要求或来源不可用 / 不可信时才设为 `blocked`。
   - 降级 source 时，写清楚哪些 claim 不再允许由它支撑，以及应该回到哪个 authoritative source 校验。
   - 升级 candidate source 时，补齐权限、freshness、claim policy、writeback policy 和 mirror / manifest 边界。
5. 同步任务包或长期记录：
   - 若当前存在 active upgrade plan，同步更新 `sources-to-refresh.md`；如涉及新决策，更新 `decisions.md`；如仍需用户判断，更新 `open-questions.md`。
   - 若变更影响长期内容路由或协作边界，再更新对应 `09-docs/01-conventions/` 或 `09-docs/03-indexes/`。
6. 运行最小验证：
   - 确认新增 / 修改的 source instance 具备 schema 必填字段。
   - 确认旧 source id / source type / URL pattern 没有无意残留。
   - 确认 URL pattern 没有把更具体的 source 映射遮蔽掉。
   - 确认没有把 supporting / discovery source 提升成 factual source of truth，除非 `claim_policy` 明确允许且有用户确认。
