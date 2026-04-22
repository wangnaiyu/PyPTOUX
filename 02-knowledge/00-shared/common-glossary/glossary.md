# Common Glossary

这份词表用于沉淀会被多个课题反复引用的 `PyPTO` 通用业务术语与公共概念。

## 统一口径

- 按 `PyPTO` 官方文档口径，仓库内统一使用 `Execute Graph`，不再混用 `Execution Graph`。
- 只属于单一课题的专有术语，不放在这里，应保留在对应 topic 的 `glossary.md`。

## 图层与任务术语

- `Tensor Graph`
  - 高层算法语义图，主要承载偏硬件无关的计算表达与优化。
- `Tile Graph`
  - 在 `Tensor Graph` 基础上引入 Tile 粒度与内存层级语义后的计算图。
- `Block Graph`
  - 将计算组织成可在单个 AI Core 上调度执行的子图，是硬件相关优化的重要承载层。
- `Execute Graph`
  - 整合 `Block Graph` 之间依赖与调度关系的执行入口图，用于衔接后续代码生成与运行时调度。
- `Tile Shape`
  - 数据切片的形状配置，用于决定 Tile 级并行粒度与后续 Block 划分条件。
- `Stitch Task`
  - Runtime 层级的调度任务块，用于组织一批 loop 或 root function 的执行。
