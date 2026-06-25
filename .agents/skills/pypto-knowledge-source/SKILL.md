---
name: pypto-knowledge-source
description: Use this skill when working inside the PyPTOUX repository and the task requires querying PyPTO/CANN business knowledge, product facts, source-of-truth evidence, runtime artifacts, UX research inputs, demo materials, or other governed external sources. Use it to classify intent, plan evidence, explore multiple sources, verify claims, and synthesize answer, research, UX, demo, source-update, or knowledge-writeback outputs.
---

# PyPTO Knowledge Source | Agentic Search Governance

## 1. 适用条件 | When To Use

当任务依赖 PyPTO / CANN / Toolkit / demo / UX 相关业务知识、产品事实、领域规则、样例工程、运行产物、用户反馈或外部 source-of-truth 时，使用这个 skill。

不要只依赖记忆，或只依赖 PyPTOUX 仓库里现成的总结；应根据问题模式主动规划 evidence strategy，再到已登记 source、候选 source、manifest source 或必要的 web discovery 中检索与校验。

## 2. 项目级规则先读 | Project Rules First

- 项目级协作约定、`pypto` refresh 规则、demo 数据等级和知识沉淀要求，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- source registry、URL Domain Mapping、source schema、source 状态和 clone / mirror policy 见 [references/sources.md](references/sources.md)。
- 如需把结论写回正式目录，结合 [../../../09-docs/01-conventions/content-routing.md](../../../09-docs/01-conventions/content-routing.md) 和 canonical filenames 决定落点。
- 涉及 `.agents` 或 skill 文案改写时，遵循 [../../../09-docs/01-conventions/agent-writing-style.md](../../../09-docs/01-conventions/agent-writing-style.md)。

## 3. 核心流程 | Core Flow

每次使用本 skill，按以下顺序推进：

1. 识别 `Intent Mode`：判断用户是在查事实、追 freshness、诊断、优化、研究工作流、挖痛点、设计 demo、找 demo 材料，还是转 UX 策略。
2. 选择 `Output Mode`：判断交付是直接回答、research brief、UX analysis、demo brief、设计规格、prototype plan、source update、knowledge writeback 或 design-system application。
3. 制定 evidence strategy：按 claim 类型选择 authoritative sources、primary retrieval roles、supporting sources、discovery mechanisms 和 freshness requirements。
4. 多源探索：复杂问题允许多个 primary retrieval roles；不要把某个 source、外链或 `overview.md` 当作唯一入口。
5. Claim verification：把 claim 分层并标注校验状态；冲突、过期和经验性材料必须显式保留。
6. UX-oriented synthesis：对 UX / demo / strategy 输出，把技术证据转成任务流、决策点、失败点、工具断点、数据需求和设计机会。
7. Writeback routing：如需沉淀，按 content routing 规则决定是否进入 `02-knowledge/`、`03-insights/`、`04-uxdesign/`、`05-prototypes/`、`08-references/` 或任务包。

## 4. Intent Mode

| Intent Mode | 典型问题 | 默认证据策略 |
| --- | --- | --- |
| `lookup` | `xxx` 是什么、有哪些字段 / 参数 / 类型 / 阶段、与 `yyy` 有何区别、对应哪里 | 可选 1 个 primary retrieval role；按 claim 类型回 authoritative source 校验。 |
| `freshness` | 最新变化、是否已合入、当前版本是否变化 | 优先官方在线 / upstream 当前版本；本地镜像只作当前 checkout，不作最新断言。 |
| `diagnostic` | 为什么报错、为什么慢、哪里异常 | 组合代码、官方文档、runtime artifact、sample dataset、issues / FAQ / troubleshooting。 |
| `optimization` | 怎么调优、怎么改进、下一步怎么做 | 组合代码实现、CANN/Ascend 文档、runtime artifact 和经验材料；经验 claim 必须标注。 |
| `workflow-research` | 用户如何完成某类任务 | 从 `docs/zh/tutorials`、examples/models/tests、toolkit、runtime manifest、issues/FAQ、既有 UX/prototype notes 还原任务流。 |
| `trend-research` | 技术变化如何影响 UX 和开发方式 | 比较 CANN/Ascend 官方材料、release notes、PyPTO/toolkit 代码文档、公开文章、社区讨论和必要 web discovery。 |
| `painpoint-mining` | 用户痛点、诉求、FAQ、社区反馈 | 优先 issues / discussions / PR / FAQ / troubleshooting，外链只作 supporting claim。 |
| `demo-design` | 针对主题或对话设计 demo | 先 research，再转成 demo narrative、数据需求、交互结构和 PTO design system 约束。 |
| `demo-material` | 为 demo 找真实代码、运行产物、样例数据、manifest | 优先 L1 数据；私有/未知材料走 `manifest` + 权限确认，不伪装成真实可外发数据。 |
| `ux-strategy` | 从技术证据转 UX opportunity / design principle / strategy | 多源技术证据 + 用户反馈 + 既有 UX/prototype notes，输出机会、原则和方案方向。 |

## 5. Output Mode

| Output Mode | 交付形态 | 后续工作流 |
| --- | --- | --- |
| `answer` | 直接回答问题 | 不默认落盘；必要时附待处理 claim。 |
| `research-brief` | 研究简报 | 可能进入 `02-knowledge/`、`03-insights/` 或 upgrade plan。 |
| `ux-analysis` | UX 分析 | 按 content routing 判断是否进入 `04-uxdesign/`。 |
| `demo-brief` | demo 叙事和素材需求 | 可衔接 `pypto-demo-data-filling` 和 `pto-design-system`。 |
| `ux-design-spec` | 设计规格 | 可衔接 `04-uxdesign/` canonical files。 |
| `prototype-implementation-plan` | 原型实现计划 | 可衔接 `05-prototypes/`；本 skill 不直接 build。 |
| `prototype-build` | 原型构建请求 | 只判断需要哪些 source / skill；构建由后续明确任务执行。 |
| `source-update` | source registry 更新建议 | 进入 `references/sources.md` 或任务包。 |
| `knowledge-writeback` | 知识库沉淀 | 结合 `pyptoux-content-router` 决定目录和 canonical filename。 |
| `design-system-application` | 设计系统应用或同步方向 | 衔接 `pto-design-system`；上游同步归 Batch D 或明确后续任务。 |

Output Mode 只判断交付形态和后续工作流，不直接预设文件名或落点。

## 6. Evidence Strategy

### 6.1 Source 角色

- `authoritative`：source 对某类 claim 的权威等级，例如代码事实、官方措辞、设计意图、runtime artifact。
- `primary retrieval role`：本次问题的首选检索角色；复杂问题可以有多个 primary retrieval roles。
- `supporting source`：用于背景、关键词、claim 假设、社区反馈或经验材料。
- `discovery mechanism`：用于发现新材料，例如 web discovery、CANN org repo discovery pool、platform search。

简单 `lookup` 可以只选 1 个 primary retrieval role。`diagnostic`、`optimization`、`workflow-research`、`trend-research`、`painpoint-mining`、`demo-design`、`demo-material` 和 `ux-strategy` 必须考虑多源探索。

### 6.2 `pypto-architecture` 降级规则

[../../../02-knowledge/00-shared/pypto-architecture/overview.md](../../../02-knowledge/00-shared/pypto-architecture/overview.md) 只能作为 `pypto` 本地探索的 `orientation_hints`：

- 可用于快速理解目录、模块和已知路径。
- 不能限制 why/how/design/UX/demo 类问题的探索范围。
- 命中失败时优先考虑 drift，及时 fallback 到 `pypto` 本地镜像或其他 authoritative source。
- 不用旧 overview 断言当前实现事实；当前代码事实以 `pypto` 源码或经确认的 upstream 内容为准。

## 7. Claim Verification

### 7.1 Claim 类型

| Claim Type | 处理规则 |
| --- | --- |
| `factual` | 字段名、路径、API、版本、行为、schema、指标；必须回 authoritative source 校验。 |
| `design-intent` | 架构意图、方向、设计取舍；可由 design docs 支撑，但当前实现事实仍回代码校验。 |
| `empirical` | 经验、性能观察、调优建议；标注 `unverifiable-empirical`，不伪装成通用事实。 |
| `opinion` | 评价、观点、推测；只作背景。 |
| `derived` | 基于已验证事实推导出的结论；说明推导依据和不确定性。 |

### 7.2 校验状态

- `verified`
- `conflict`
- `stale`
- `unverifiable-missing`
- `unverifiable-empirical`
- `needs-user-confirmation`

回答、写回或记录时必须显式保留 `conflict`、`stale` 和 `unverifiable-empirical`，不要悄悄抹平冲突。

## 8. Source 使用规则

- source registry 是 [references/sources.md](references/sources.md)；URL Domain Mapping 只在那里维护。
- 已登记 source 的 `status`、`authority_scope`、`best_for`、`not_for`、`question_modes`、`output_modes`、`freshness_policy`、`search_mode`、`discovery_policy`、`claim_policy` 和 `writeback_policy` 以 registry 为准。
- `candidate` source 可用于规划、候选说明和用户确认，不默认当事实出口。
- `deprecated` source 只作历史背景或 drift 线索，默认不主动使用。
- `blocked` source 不允许主动访问、引用或写入结果。
- `manifest` source 的原始材料不一定进仓库；仓库只保存索引、位置、权限、数据等级、可引用范围和使用规则。

## 9. Web Discovery

Web discovery 是 discovery mechanism，不是 source of truth。

- 适用：`trend-research`、`painpoint-mining`、`workflow-research`、`optimization`、`diagnostic`、`ux-strategy`，以及用户明确要求查最新公开材料时。
- 不适用：可由本地 authoritative source 直接回答的简单 `lookup`。
- 发现材料后先抽 claim，再按 claim 类型回 `pypto`、官方 docs、CANN docs、runtime artifact、design docs 或其他 authoritative source 校验。
- 高价值公开材料经确认后可进入 `curated-external-links` 或 source registry；未确认前只作 discovery result。
- `curated-external-links` 与 web discovery 可共享 `external-discovery-source` 类型，但前者是已登记 registry，后者是发现机制。

## 10. UX / Demo 输出规则

UX / demo 类问题不能只给技术事实，应把证据转成工作流和设计输入：

- `workflow-research`：输出任务流、角色、输入输出、决策点、失败点、工具断点。
- `painpoint-mining`：输出痛点、证据强度、相关 source、潜在 UX 策略。
- `demo-design`：输出 demo narrative、数据需求、交互结构、真实性等级和 PTO design system 约束。
- `demo-material`：输出候选真实材料、数据等级、来源路径、可外发状态、缺口和 manifest 需求。
- `ux-strategy`：输出 UX opportunity、设计原则、策略方向和需要继续验证的 claim。

如需继续做 demo 真实素材，衔接 `pypto-demo-data-filling`；如需继续做 PTO 风格或 design system 应用，衔接 `pto-design-system`。

## 11. 运行时待处理区块

当运行时发现 drift、值得沉淀的 verified claim、conflict、stale source、empirical note 或 source update 建议，但当前任务不应直接写目标知识库时，在最终回答末尾使用固定区块：

```markdown
## 待人工处理（本轮发现）

### Drift
- `[<source-id>] <claim/path>`: `<suspected-drift / confirmed-drift / stale>`；建议处理：`<...>`

### Verified Claims
- `[<source-id>] <claim 摘要>`
  - 来源：`<path / URL / manifest>`
  - 已对照：`<authoritative source>`

### Conflicts
- `[<source-id>] <claim 摘要>`
  - 外部表述：`<...>`
  - authoritative source：`<...>`

### Empirical Notes
- `[<source-id>] <claim 摘要>` (`unverifiable-empirical`)

### Source Updates
- `<source-id>`: `<candidate / deprecated / blocked / new-source / mirror-candidate>`；理由：`<...>`
```

区块为空时整节省略；一次会话只在最终回答末尾汇总一次。
