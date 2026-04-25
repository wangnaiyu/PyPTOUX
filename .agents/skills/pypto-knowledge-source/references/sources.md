# Business Knowledge Sources | 业务知识源登记

这份文件是常用 business knowledge sources 的注册表（registry），也是 URL Domain Mapping 的唯一主登记。

## Source Selection Rule | 选择规则

- 优先选择 scope 与用户问题最匹配的 source。
- 每个问题类型至多 1 个 primary source；跨问题类型的 primary 不可比较权威性。
- 跨问题类型时分别查对应 primary，回答时分别引用来源。
- PyPTO 顶层设计、架构规划、方向把控、专题设计或 design decision 类问题，先把专家设计文档纳入候选，不因某个已知子主题（例如 runtime redesign）过窄而跳过。
- CANN 官方文档默认从官网文档总入口选择当前最新版社区版；只有用户明确指定版本时，才使用特定版本链接。
- 有本地镜像的 source 才 refresh/search local mirror；在线只读 source 直接在线检索。
- 如果本地 checkout 有未提交改动，不要直接替换，先征求确认。
- `PyPTO` 相关问题，先按问题类型决定 source；只有路由到 `pypto` 且属于概念、教程、API 探索、排障、调性能或工具链类问题时，才参考 `02-knowledge/00-shared/pypto-architecture/overview.md` 收敛目录级 hint。

## URL Domain Mapping

用户给出 URL 时，按以下映射识别 source 类型：

| URL pattern | Source |
| --- | --- |
| `gitcode.com/cann/pypto/**` | `pypto` |
| `pypto.gitcode.com/**` | `pypto-official-docs` |
| `github.com/hengliao1972/**` | `pypto-top-level-design-documents` |
| `hiascend.com/**` | `cann-docs-community-edition` |
| `zhihu.com/**`、`zhuanlan.zhihu.com/**` | `curated-external-links` |
| `mp.weixin.qq.com/**` | `curated-external-links` |
| 其他 | `curated-external-links (unknown)` |

未列 domain 视为 `curated-external-links`；先识别，再走对应 source 流程。curated / unknown 外链必须抽 claim 并回 primary source 校验。

## Registered Sources | 已登记来源

### pypto

- Role | 角色：PyPTO 代码事实、字段名、运行行为、sample code 类问题的 primary source；PyPTO 文档源码 / API / tutorial 的 freshness 来源。
- Remote | 远端：`https://gitcode.com/cann/pypto`
- Local mirror | 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- Search map | 检索地图：
  - 文档 / 教程 / 排障 / 工具 / 性能调优类：先经 `02-knowledge/00-shared/pypto-architecture/overview.md` 收敛目录级 hint，再进入本地镜像检索。
  - 源码事实 / 字段名 / 错误码 / 函数签名 / Pass / CodeGen / 模块边界：跳过 `overview.md`，直接 `rg` 或定向目录检索。
  - 用户给具体 URL / freshness 强敏感问题：走线上单点 fetch。
  - 第一入口 + 第二入口两轮不命中：立即 fallback 全仓库 `rg`。
  - 线上单点内容与本地不一致：记录 drift；confirmed freshness drift 可触发 refresh，但仍遵守 overwrite guard。
- Refresh rule | 刷新规则：默认每个自然天最多 clone / refresh 一次 `pypto`；如果当天已经 refresh 过，后续检索直接复用当天的本地镜像。confirmed freshness drift 可突破每天一次限制触发 refresh，但本地镜像有未提交改动时仍需先询问用户。
- Overwrite guard | 覆盖保护：如果当前本地镜像存在未提交改动，替换前先询问用户。
- Snapshot caveat | 快照警示：`overview.md` 是阶段性快照，与本地镜像或线上仓库可能漂移。命中失败时优先考虑 drift，不要在 hint 路径上反复尝试。缺少快照日期 / commit 时，所有不命中只能记为 `suspected-drift`，不得断言 `confirmed-drift`。
- Priority note | 优先级说明：
  - 问题表述为“官网怎么说 / 官网展示 / 对外措辞” -> `pypto-official-docs`
  - 问题表述为“文档怎么写 / 教程内容 / 文档源码最新” -> `pypto`
  - 不确定 -> 默认 `pypto`；发现冲突时引用两边
- Search preference | 检索偏好：本地检索优先用 `rg`；读大文件时只读取命中附近局部内容。线上仓库只做单点 freshness backup，不做探索性检索。

### pypto-top-level-design-documents

- Role | 角色：PyPTO 顶层设计、架构意图、方向规划、专题设计与设计决策类问题的 primary design source。
- Remote | 远端：`https://github.com/hengliao1972/pypto_top_level_design_documents`
- Local mirror | 本地镜像：默认无；需要时直接浏览在线文档。
- Scope | 覆盖范围：`PyPTO / Simpler runtime redesign` 是该仓库当前重要内容之一；检索时不要因此排除更 general 的 PyPTO 顶层设计、serving、ISA、runtime、distributed、数据系统、feature proposal 等主题。
- Search map | 检索地图：先看仓库根目录专题文档，再看 `pypto-runtime-arch-docs/`；runtime redesign 相关问题优先看 `pypto-runtime-arch-docs/00-index.md`、`01-introduction.md`、`02-logical-view.md`、`02-logical-view/`、`modules/*.md`、`08-design-decisions.md`、`09-open-questions.md`、`appendix-a-glossary.md`、`appendix-b-codebase-mapping.md`。
- Refresh rule | 刷新规则：只读在线版本；检索时把 GitHub 仓库当前 `main` 分支视为当前版本。
- Overwrite guard | 覆盖保护：不适用，因为默认没有本地镜像。
- Priority note | 优先级说明：设计意图、架构目标、模块边界、未来方向以该专家设计文档优先；当前代码事实、字段名、文件名、可运行行为和上游 literal 以 `pypto` 仓库优先。
- Search preference | 检索偏好：优先查根目录专题文档、architecture index、logical / development / process / physical / scenario views、module detailed designs、design decisions、open questions、glossary、codebase mapping，以及 top level design、serving、ISA、runtime、distributed、数据系统、feature proposal 等关键词。

### pypto-official-docs

- Role | 角色：PyPTO 官网页面、官网 quick-start 编排、对外措辞类问题的 primary source。
- Remote | 远端：`https://pypto.gitcode.com/tutorials/introduction/quick_start.html`
- Local mirror | 本地镜像：默认无；需要时直接浏览在线文档。
- Refresh rule | 刷新规则：在线只读；检索时把在线文档站点视为当前版本。
- Overwrite guard | 覆盖保护：不适用，因为默认没有本地镜像。
- Priority note | 优先级说明：用户明确要求官网口径、官网页面、对外发布文案、官网教程步骤，或给出官网 URL 时使用本 source。否则，PyPTO 文档源码、API / tutorial freshness 类问题以 `pypto` 仓库优先。
- Search preference | 检索偏好：`quick-start`、tutorials、conceptual explanations、official usage guidance、对外措辞。

### cann-docs-community-edition

- Role | 角色：非 PyPTO 专属的 CANN、昇腾硬件、Ascend C、算子开发、图开发、通信、工具、API、故障处理与软硬结合概念类问题的 primary source。
- Remote | 远端：`https://www.hiascend.com/cann/document`
- Current observed entry | 当前已观测入口：用户曾提供 `https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/900beta2/index/index.html` 作为 CANN Community Edition 9.0.0 beta2 文档入口；该链接只作为示例入口，不作为固定版本。
- Local mirror | 本地镜像：默认无；需要时直接浏览在线文档。
- Search map | 检索地图：进入官网文档总入口后选择“CANN社区版文档”，使用官网版本选择器，默认选择当前官网提供的最新版社区版文档；再按问题进入安装、应用开发、Ascend C / TBE / CCE / AscendNPU IR 算子开发、GE / DataFlow 图开发、HCCL / HIXL 通信、ATB / SiP / LLM DataDist、API、开发工具、故障处理、日志、环境变量、融合规则等栏目。
- Refresh rule | 刷新规则：只读在线版本；检索时把官网当前最新版社区版文档视为当前版本。只有用户明确指定版本时，才使用特定版本链接。
- Overwrite guard | 覆盖保护：不适用，因为默认没有本地镜像。
- Priority note | 优先级说明：PyPTO 专属内容以 `pypto` 仓库优先；非 PyPTO 的 CANN 生态、昇腾芯片、硬件架构、Ascend C、算子开发、图开发、通信、工具、CANN API、软硬结合概念以 CANN 官方最新版社区版文档优先。
- Search preference | 检索偏好：检索时保留图片、架构图、概念图、图解说明，不只读正文；优先使用官网页面目录、产品版本、文档栏目和图文并读的方式定位硬件架构、Ascend C、CANN API、图开发等信息。

### pypto-sample-dataset

- Role | 角色：PyPTO 真实 demo、样例数据、编译 / 运行产物、输入输出示意、可视化素材类问题的 primary sample-data source。
- Remote | 远端：无默认远端；当前以本地数据目录为准。
- Local mirror | 本地镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`
- Current known structure | 当前已知结构：已确认存在 `three-view/` 数据集，内部包含 `code/`、`output_*/`、`program.json`、`merged_swimlane.json`、`topo.json`、`run.log` 等适合联动 demo 的真实产物。
- Refresh rule | 刷新规则：默认直接使用当前本地数据目录；只有用户明确提供了新的同步方式或更新来源时，才改变这条规则。
- Overwrite guard | 覆盖保护：不主动改写该目录内容；如果后续需要清理、替换或批量写入，先征求确认。
- Priority note | 优先级说明：当任务涉及 demo 填充、样例结果展示、输入输出示例、真实数据形态、代码-图-性能联动时，优先把这份样例数据与 `pypto` 工程里的真实代码结合起来使用。
- Search preference | 检索偏好：样例输入输出、算子运行结果、可视化演示素材、demo 填充值，以及与 `pypto` 示例代码相互印证的数据文件；优先关注 `code/`、`output_*/program.json`、`merged_swimlane.json`、`topo.json`、`run.log` 一类产物。

### curated-external-links

- Role | 角色：微信、知乎、博客、社区分享、专家解读、场景化总结的 supporting source；非 source of truth。
- Local registry | 本地登记：`09-references/curated-external-links.md`
- Schema 差异：本 source 无 remote / mirror；条目以人工录入为准。
- Refresh rule | 刷新规则：不适用。发现性检索走平台站内搜索或 web search；已处理链接的验证日志回写到 local registry。
- Overwrite guard | 覆盖保护：`09-references/` 对等共写；写入前注意未提交工作树锁。
- Selection rule | 选择规则：见 [../SKILL.md](../SKILL.md) 的 Curated External Links 流程。
- Priority note | 优先级说明：仅作为问题入口、claim 假设源、检索关键词与背景理解。任何 factual claim 必须由对应 primary source 校验后才能进入回答，不可作为事实直接回答用户。
- Search preference | 检索偏好：先识别文章涉及的主题和概念，再按 claim 级别路由到 `pypto`、`pypto-official-docs`、`pypto-top-level-design-documents`、`cann-docs-community-edition` 或 `pypto-sample-dataset` 校验。

## Maintenance Rule | 维护规则

- 新的常用业务来源，统一在这里新增 section。
- 每个新 source 至少写清楚：role、remote 或 local registry、local mirror、refresh rule、overwrite guard。
- URL Domain Mapping 只在本文件维护；其他文件引用本节，不重复维护完整表。
