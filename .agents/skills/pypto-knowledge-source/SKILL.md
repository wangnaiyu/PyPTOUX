---
name: pypto-knowledge-source
description: Use this skill when working inside the PyPTOUX repository and the task requires querying business knowledge, product facts, domain rules, sample-engineering details, or other operational context from frequently used external source repositories. Use it to refresh the configured local source mirror first, then search the updated source content before answering.
---

# PyPTO Knowledge Source | 外部知识源检索

当任务依赖业务知识、产品事实、领域规则、样例工程细节或其他 source-of-truth 信息时，使用这个 skill。

不要只依赖记忆，或只依赖 PyPTOUX 仓库里现成的文件；应优先从已登记的外部 source repositories 获取信息。

## 先看项目级规则 | Project Rules First

- 项目级协作约定、`pypto` refresh 规则和知识沉淀要求，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- 这个 skill 不重复解释项目级公共规则，只补充“去哪里查、怎么查”的专属流程。

## 先读什么 | What To Read First

- 先读 [../../../AGENTS.md](../../../AGENTS.md)，确认项目级规则。
- 先读 [references/sources.md](references/sources.md)，确认已登记的知识源及其 refresh rules。
- 如果任务与 `PyPTO`、`CANN`、sample engineering 或 PyPTO 框架理解相关，再读 [../../../02-knowledge/00-shared/pypto-architecture/overview.md](../../../02-knowledge/00-shared/pypto-architecture/overview.md)，用它先缩小到更可能命中的目录、文档类型和查询路径。

## 核心流程 | Core Workflow

1. 先确认当前任务确实需要 business knowledge 或 source-of-truth lookup。
2. 打开 `references/sources.md`，选择最匹配的 source repository。
3. 如果任务与 `PyPTO` 强相关，先用 `02-knowledge/00-shared/pypto-architecture/overview.md` 缩小检索范围，再决定去 `docs/`、`examples/`、`models/`、`python/pypto/` 还是 `framework/src/`。
4. 仅在需要时 refresh 对应 local mirror；精确 refresh 规则遵循 `AGENTS.md` 和 `references/sources.md`。
5. 优先在当前可用的最新 local mirror 中搜索；只有 primary source 缺少答案时，才回退到其他来源。
6. 把提炼后的结论回填到 `02-knowledge/` 的对应主题下。
7. 回答时明确标注：结论来自 refreshed source、当天已有本地镜像，还是基于现有信息的 inference。

## PyPTO 默认规则 | Default Rule For PyPTO

当任务与 `CANN`、`PyPTO`、sample engineering 或附近的业务/领域知识相关时，默认按下面处理：

1. 把 `pypto` 视为默认 primary source。
2. 先参考 `02-knowledge/00-shared/pypto-architecture/overview.md` 缩小检索范围。
3. 精确的本地镜像路径、refresh 节奏和 secondary sources 以 `references/sources.md` 为准。
4. 当需要 tutorial-style explanation 时，优先同时对照代码仓库和官方文档口径。

## 检索提示 | Retrieval Hints

- `PyPTO` 相关问题优先参考 `02-knowledge/00-shared/pypto-architecture/overview.md`，再进入最接近的问题路径。
- 先搜精确的产品名、组件名或模块名。
- 再搜邻近词，比如 feature names、scripts、configs、docs、samples、readmes。
- 本地检索优先用 `rg`。
- 回答前只读取最小必要文件集，避免把无关内容带进上下文。

## 来源登记 | Source Registry

- authoritative source list 统一维护在 [references/sources.md](references/sources.md) 中。
- 如果用户补充了新的常用业务来源，把它加到那里，不要把规则散落到别的 skills 里。
