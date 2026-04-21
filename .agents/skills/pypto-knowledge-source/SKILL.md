---
name: pypto-knowledge-source
description: Use this skill when working inside the PyPTOUX repository and the task requires querying business knowledge, product facts, domain rules, sample-engineering details, or other operational context from frequently used external source repositories. Use it to refresh the configured local source mirror first, then search the updated source content before answering.
---

# PyPTO Knowledge Source | 外部知识源检索

当任务依赖业务知识、产品事实、领域规则、样例工程细节或其他 source-of-truth 信息时，使用这个 skill。

不要只依赖记忆，或只依赖 PyPTOUX 仓库里现成的文件；应优先从已登记的外部 source repositories 获取信息。

## 先读什么 | What To Read First

- 先读 [references/sources.md](references/sources.md)，确认已登记的知识源及其 refresh rules。

## 核心流程 | Core Workflow

1. 先确认当前任务确实需要 business knowledge 或 source-of-truth lookup。
2. 打开 `references/sources.md`，选择最匹配的 source repository。
3. 搜索前先 refresh 对应的 local mirror。
4. 如果目标目录已存在且有本地未提交改动，不要直接覆盖，先停下来确认。
5. 优先在刷新后的 local mirror 中搜索。
6. 只有当登记的 primary source 缺少答案时，才回退到其他来源。
7. 回答时明确标注：结论是来自 refreshed source repository，还是基于现有信息的 inference。

## PyPTO 默认规则 | Default Rule For PyPTO

当任务与 `CANN`、`PyPTO`、sample engineering 或附近的业务/领域知识相关时，默认按下面处理：

1. 把 `pypto` 视为默认 primary source。
2. 从 `https://gitcode.com/cann/pypto` refresh 本地镜像。
3. 本地镜像固定放在 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`。
4. 搜索前默认用最新 clone 替换本地镜像；如果本地有未提交改动，需要先征求确认。
5. 当需要 tutorial-style explanation 时，把 `https://pypto.gitcode.com/tutorials/introduction/quick_start.html` 作为重要 secondary source；如果它与 GitCode 仓库冲突，默认认为仓库更新鲜。

## 检索提示 | Retrieval Hints

- 先搜精确的产品名、组件名或模块名。
- 再搜邻近词，比如 feature names、scripts、configs、docs、samples、readmes。
- 本地检索优先用 `rg`。
- 回答前只读取最小必要文件集，避免把无关内容带进上下文。

## 来源登记 | Source Registry

- authoritative source list 统一维护在 [references/sources.md](references/sources.md) 中。
- 如果用户补充了新的常用业务来源，把它加到那里，不要把规则散落到别的 skills 里。
