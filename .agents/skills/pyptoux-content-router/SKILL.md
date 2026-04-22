---
name: pyptoux-content-router
description: Use this skill when working inside the PyPTOUX repository and you need to decide where new content should live, how files should be named, how vibe-coding outputs should be routed, or how to quickly find relevant project information across 02-knowledge, 03-insights, 04-uxdesign, 05-prototypes, 06-tools, and 07-designsystem.
---

# PyPTOUX Content Router | 内容路由

当你需要在 PyPTOUX 仓库里创建内容、归档内容、重组内容，或快速定位相关信息时，使用这个 skill。

## 先看项目级规则 | Project Rules First

- 项目级内容写作约定、canonical filenames 偏好和索引维护原则，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- 这个 skill 只补充“具体内容该往哪里放”的路由流程。

## 先读什么 | What To Read First

- 先读 [../../../AGENTS.md](../../../AGENTS.md)，确认项目级规则。
- 先读 [10-docs/01-conventions/content-routing.md](../../../10-docs/01-conventions/content-routing.md)，获取内容路由的 decision tree。
- 需要快速检索时，读 [10-docs/03-indexes/content-map.md](../../../10-docs/03-indexes/content-map.md)。
- 如果需要确认稳定目录契约，再读 [10-docs/01-conventions/repository-structure.md](../../../10-docs/01-conventions/repository-structure.md)。
- 涉及 `.agents` 或 skill 文案改写时，遵循 [10-docs/01-conventions/agent-writing-style.md](../../../10-docs/01-conventions/agent-writing-style.md)。

## 核心流程 | Core Workflow

1. 先确认当前工作目录位于 PyPTOUX 仓库。
2. 按内容意图（intent）给 artifact 分类：
   - business understanding -> `02-knowledge/`
   - benchmark or inspiration -> `03-insights/`
   - formal design output -> `04-uxdesign/`
   - demo or prototype -> `05-prototypes/`
   - workflow helper -> `06-tools/`
   - visual baseline or reusable UI -> `07-designsystem/`
3. 决定它属于 `00-shared/` 还是某个具体 topic folder。
4. 文件命名、语言和 shared/index 规则按 `AGENTS.md` 执行。
5. 如果 artifact 来自 vibe coding，默认这样放：
   - HTML -> `05-prototypes/<numbered-topic>/experiments/html/`
   - JSX / TSX -> `05-prototypes/<numbered-topic>/experiments/jsx/`
   - prompts -> `05-prototypes/<numbered-topic>/prompts/`
   - prototype notes -> `05-prototypes/<numbered-topic>/notes/`
   - matured project -> `05-prototypes/<numbered-topic>/app/`
6. 如果仍然不确定，采用 smallest correct placement，避免发明新的顶层结构。
7. 如果新引入了 topic、shared framework、prototype track、tool 或 designsystem area，记得更新相关索引文件。

## 默认决策 | Default Decisions

- 优先复用已有 topic folders，不要创建语义几乎重复的新 topic。
- 当内容可被多个课题复用时，优先放进 `00-shared/`。
- `01-inbox/` 只用于真正尚未整理的材料，不要把它当长期堆放区。
- 外部来源优先收敛到 `sources.md`，不要把链接型笔记零散地撒在仓库里。

## 检索规则 | Retrieval Rules

当用户要求快速定位信息时，按下面顺序检索：

- 先按 topic name 搜索
- 再按 content layer 搜索
- 然后检查 `10-docs/03-indexes/content-map.md`
- 最后查看附近的 `overview.md`、`sources.md`、`meta.md`

## 参考资料 | References

- 路由例子和默认文件名写法见 [references/routing-examples.md](references/routing-examples.md)。
