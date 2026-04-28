---
name: pypto-knowledge-source
description: Use this skill when working inside the PyPTOUX repository and the task requires querying business knowledge, product facts, domain rules, sample-engineering details, or other operational context from frequently used external source repositories. Use it to refresh the configured local source mirror first, then search the updated source content before answering.
---

# PyPTO Knowledge Source | 外部知识源检索

## 1. 适用条件 | When To Use

当任务依赖业务知识、产品事实、领域规则、样例工程细节或其他 source-of-truth 信息时，使用这个 skill。

不要只依赖记忆，或只依赖 PyPTOUX 仓库里现成的文件；应优先从已登记的外部 source 获取信息。

## 2. 项目级规则先读 | Project Rules First

- 项目级协作约定、`pypto` refresh 规则和知识沉淀要求，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- 这个 skill 不重复解释项目级公共规则，只补充“去哪里查、怎么查”的专属流程。

## 3. 先读什么 | What To Read First

- 先读 [../../../AGENTS.md](../../../AGENTS.md)，确认项目级规则。
- 先读 [references/sources.md](references/sources.md)，确认已登记的知识源、URL Domain Mapping、refresh rules 与 source 优先级。
- 任务路由到 `pypto` 且属于概念、教程、API 探索、排障、调性能或工具链类问题时，再读 [../../../02-knowledge/00-shared/pypto-architecture/overview.md](../../../02-knowledge/00-shared/pypto-architecture/overview.md)，把它作为目录级 hint。

## 4. Source Routing Matrix

每个问题类型至多 1 个 primary source；跨问题类型的 primary 不可比较权威性。跨问题类型时，分别查对应 primary，并在回答中分别标注来源。

| Source | Primary 适用问题类型 |
| --- | --- |
| `pypto` | PyPTO 代码事实、字段名、路径、sample code、运行行为、文档源码 / API / tutorial freshness |
| `pypto-official-docs` | PyPTO 官网页面、官网 quick-start 编排、对外措辞、用户明确给官网 URL |
| `pypto-top-level-design-documents` | PyPTO 顶层设计、架构意图、方向规划、设计决策 |
| `cann-docs-community-edition` | 非 PyPTO 的 CANN、昇腾硬件、Ascend C、API、图开发、工具链 |
| `pypto-sample-dataset` | 真实 demo、样例数据、运行产物、`program.json`、`merged_swimlane.json`、`Pass_*`、`run.log` |
| `curated-external-links` | 微信、知乎、博客、社区分享、专家解读、场景化总结；supporting source，非 source of truth |

判定边界：

- “官网怎么说 / 对外措辞 / 官网展示” -> `pypto-official-docs`
- “文档怎么写 / 教程内容 / 文档源码最新” -> `pypto`
- 不确定 -> 默认 `pypto`；发现冲突时引用两边
- 用户给 URL -> 按 [references/sources.md](references/sources.md) 的 `URL Domain Mapping` 识别 source；外链或 unknown URL 走 §6 的 curated 流程入口 A。

## 5. PyPTO A/B 子流程

路由到 `pypto` 后，先做 A/B 分流。

### 5.1 分流规则

默认走 A：本地镜像 + `overview.md` 二级路由。

仅以下情况走 B：

- 用户给出明确 GitCode / 官网 URL。
- 用户问“最新 / 最近 / 是否已合入”等强 freshness 问题。
- 本地镜像不可刷新且任务强 freshness 敏感。

B 的硬约束：永远单点 fetch，一次问题最多 1-3 个文件；不使用线上 fetch 做探索性检索。

### 5.2 A 路径：本地镜像主路径

- 概念 / 教程 / API 探索 / 排障 / 调性能 / 工具链：先读 `02-knowledge/00-shared/pypto-architecture/overview.md`，只当目录级 hint。
- 错误码 / 字段名 / 函数签名 / Pass / CodeGen / 模块边界：跳过 `overview.md`，直接 `rg`。
- 第一入口 + 第二入口两轮不命中，立即 fallback 全仓库 `rg`。
- 不在错误 hint 目录里反复试关键词。
- refresh 遵守 `references/sources.md`；本地有未提交改动时触发 overwrite guard。

### 5.3 B 路径：线上单点 freshness backup

- 用户给 URL：直接 fetch。
- freshness 问题：优先使用用户给定 URL；否则先由 A 定位文件路径，再通过可用官方页面或 raw 入口单点读取线上同路径内容。不得写死 `main raw`。
- B 与本地不一致：记录 drift；若是 confirmed freshness drift，可触发 refresh，但仍必须遵守 overwrite guard。

## 6. Curated External Links 流程

`curated-external-links` 是问题入口、claim 假设源、检索关键词和背景理解，不是答案出口。事实必须由对应 primary source 背书。

### 6.1 三类入口

- A：用户提供 URL -> 读取 URL，按 `references/sources.md` 的 `URL Domain Mapping` 识别 source。若是 curated / unknown，抽 claim 并校验 primary。
- B：用户问“某平台有没有讲过某主题” -> 平台站内搜或 web search。带“最近 / 新 / 这周 / 这个月”等时间限定时必须走 B。
- C：用户明确问“我收藏过的链接里有没有某主题” -> grep `09-references/curated-external-links.md`。命中 0 时明确告知，不擅自切换到平台搜索。

### 6.2 Claim 处理

- `factual-claim`：字段名、行为、版本、API、架构关系，必须校验。
- `explanatory`：解释、类比、示意、教学表述，记录但不当事实。
- `empirical`：经验、调优观察，标 `unverifiable-empirical`。
- `opinion`：评价、感受、推测，只作背景。

校验状态：

- `verified`
- `conflict`
- `unverifiable-empirical`
- `unverifiable-missing`

回答时必须显式标注 conflict 和 empirical，不悄悄抹掉冲突。

## 7. 跨 Source 同查 | Cross-Source Lookup

当问题跨多个问题类型，例如“PyPTO 的某 API 与 Ascend C 怎么交互”：

- 分别查对应 primary source。
- 回答时分别引用，注明各自来源。
- 不互相比较权威性。
- A5 / Ascend 950 属于多源主题，具体 source 选择以 [references/sources.md](references/sources.md) 的 A5 / Ascend 950 overlay 为准。

## 8. Drift / Claim / Conflict / Empirical 运行时处理

当运行时发现 drift、值得沉淀的 verified claim、conflict 或 empirical note，但当前 agent 不应直接写目标知识库时，在最终回答末尾使用固定区块。

```markdown
## 待人工处理（本轮发现）

### Drift（02-knowledge/ 路径漂移）
- `overview.md` -> `<path>`: `<suspected-drift / confirmed-drift>`；建议 Codex 巡检 `drift.md`

### Verified Claims（值得沉淀的事实声明）
- `[<source-id>] <claim 摘要>`
  - 来源：`<curated URL>`
  - 已对照 primary：`<primary path / URL>`

### Conflicts（外部文章与 primary 不一致）
- `[<source-id>] <claim 摘要>`
  - 外部表述：`<...>`
  - primary 表述：`<...>`

### Empirical Notes（无法 primary 验证的经验性表述）
- `[<source-id>] <claim 摘要>` (`unverifiable-empirical`)
```

节奏规则：

- 一次会话只在最终回答末尾汇总一次，中间步骤不重复打断。
- 下次会话不主动重提之前发现的项，除非用户问起。
- 区块为空时整节省略。

## 9. 检索提示 | Retrieval Hints

- 用户已给具体 URL 或页面描述：直接 fetch，不先去仓库 `rg`。
- 发现性检索：走对应 source 的发现流程；路由到 `pypto` 时默认走 A 路径仓库 docs / 本地镜像。
- 本地检索优先用 `rg`。
- 读大文件时只读取命中附近局部内容，控制上下文规模。
- 回答前只读取最小必要文件集，避免无关内容进入 context。

## 10. 来源登记 | Source Registry

- authoritative source list 统一维护在 [references/sources.md](references/sources.md) 中。
- 如果用户补充了新的常用业务来源，把它加到那里，不要把规则散落到别的 skills 里。
