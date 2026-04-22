# PyPTO 样例数据集

本文用于沉淀 PyPTO 相关的可复用样例数据集，帮助后续在做 demo、可视化样例、代码解释或工具链演示时，快速找到“真实代码 + 真实产物 + 真实性能数据”的组合素材。

当前已确认可用的第一个数据集是 `three-view`。

## 1. 这个主题为什么存在

`pypto` 工程本身提供的是源码、文档和样例工程，但在做 demo 填充时，经常还需要另一类素材：

- 真实源码文件
- 编译过程的中间产物
- 计算图输出
- 泳道图性能数据
- 运行日志

这类数据非常适合用来填充：

- 三栏联动 demo
- 计算图 / 编译链路演示
- 泳道图性能演示
- “代码 -> 图 -> 性能” 的故事线页面

因此，样例数据集应该作为一个独立的 shared knowledge 主题维护，而不是只零散记在 skill 规则里。

## 2. 当前已确认的数据集

### three-view

| 项目 | 内容 |
| --- | --- |
| 数据集路径 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view` |
| 当前已见源码 | `code/page_attention.cpp` |
| 当前已见输出目录 | `output_20251112_170823_664974/` |
| 最适合的用途 | 三栏联动 demo、计算图展示、泳道图展示、Pass 编译链路说明 |

## 3. three-view 的结构理解

### 3.1 代码侧

当前已看到：

- `code/page_attention.cpp`

从源码内容看，它不是一个极简 toy case，而是一个比较适合展示真实编译链路的 Page Attention 相关实现，包含：

- 多层 `FUNCTION / LOOP / IF` 结构
- `View` / `Assemble`
- `Matrix::Matmul`
- `config::SetSemanticLabel(...)`
- 多处 TileShape 配置

这意味着它天然适合拿来做：

- 代码与计算图节点之间的映射
- 语义标签驱动的三栏联动
- Tile、Loop、Matmul、Softmax 等复杂结构的演示

### 3.2 产物侧

当前已确认的关键产物包括：

| 文件 / 目录 | 用途理解 |
| --- | --- |
| `program.json` | 计算图主入口，适合驱动图结构展示 |
| `merged_swimlane.json` | 泳道图性能数据主入口 |
| `topo.json` | 拓扑或图结构相关辅助数据 |
| `dyn_topo.txt` | 动态拓扑类文本产物 |
| `run.log` | 运行日志、排查说明素材 |
| `function.cpp` | 生成后的函数级代码产物，可用于展示 Lower 后结果 |
| `Pass_*` 目录 | 编译 Pass 各阶段中间产物，适合解释编译过程 |
| `PROGRAM_ENTRY` | 入口阶段产物 |
| `kernel_aicore/` | AICore 相关产物 |
| `kernel_aicpu/` | AICPU 相关产物 |

### 3.3 Pass 过程可视化价值

`output_20251112_170823_664974/` 下当前可见大量 `Pass_*` 目录，例如：

- `Pass_00_LoopUnroll`
- `Pass_14_GraphPartition`
- `Pass_15_NBufferMerge`
- `Pass_19_L1CopyInReuseMerge`
- `Pass_30_OoOSchedule`
- `Pass_35_CodegenPreproc`

这说明 `three-view` 数据集不仅能用于“结果展示”，也很适合解释：

- 图是如何逐步变化的
- 哪些 Pass 对结构、合图、调度产生了影响
- 为什么某些 demo 可以做“前后对比”或“Pass timeline”展示

## 4. three-view 适合填充什么 demo

| demo 类型 | 是否适合 | 原因 |
| --- | --- | --- |
| 三栏联动 demo | 很适合 | 同时具备源码、图、泳道图三类核心素材 |
| 计算图浏览 demo | 很适合 | 有 `program.json` 和拓扑相关产物 |
| 编译 Pass 演示 demo | 很适合 | 有大量 `Pass_*` 目录可做阶段对比 |
| 泳道图性能分析 demo | 很适合 | 有 `merged_swimlane.json` 和运行日志 |
| 纯输入输出结果展示 demo | 一般 | 当前更强的是过程性产物，而不是业务结果表格式展示 |

## 5. 后续使用建议

后续如果要用这份数据填充 demo，建议按下面方式组合：

1. 从 `code/page_attention.cpp` 提取核心代码片段，填充源码面板
2. 用 `program.json` / `topo.json` 生成图结构面板
3. 用 `merged_swimlane.json` 生成泳道图或性能面板
4. 用 `Pass_*` 目录补充“编译过程如何变化”的说明
5. 用 `run.log` 和 `function.cpp` 补充调试说明或 Lower 结果展示

## 6. 当前阶段的结论

`three-view` 已经可以视为一份高价值的 PyPTO demo 数据集，因为它具备了：

- 真实 C++ 源码
- 真实编译中间产物
- 真实计算图数据
- 真实泳道图性能数据
- 真实运行日志

后续只要需要做“代码 -> 图 -> 性能”的说明型 demo，优先考虑先从这份数据集取材。
