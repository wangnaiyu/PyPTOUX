# Design Principles

PTO 是 dark-first developer workstation 设计系统，用于 PyPTOUX 的 graph、timeline、architecture、operator workbench 和 review preview。

## Principles

- 技术、冷静、精确：界面应服务理解源码、pass、runtime 和 hardware 之间的关系。
- 证据可见：关键状态、来源、trace、节点、时间线和 inspector 不应被装饰性视觉淹没。
- 密度适中：专家工作流需要信息密度，但不能牺牲扫描速度。
- 中性 surface 承载布局：大面积容器使用 neutral tokens，饱和色只用于动作、状态或数据含义。
- Pattern first：IDE、workbench、graph、timeline、architecture 和 playback 页面优先匹配 `02-components/patterns/`。
- Preview before spreading：新增共享视觉模式必须先走 `preview-gate.md`。

## Anti-Patterns

- 为每个 demo 私造按钮、卡片、badge 或 panel chrome。
- 用营销页 hero、装饰渐变或大面积彩色面板包装工具界面。
- 在业务页面复制 graph、timeline、architecture pattern 的内部几何和状态逻辑。
- 仅把旧 demo 的硬编码颜色替换成 token，却保留旧边框、左侧 rail、inset shadow 或伪元素高亮。
