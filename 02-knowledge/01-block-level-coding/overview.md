# Block Level 编程

## 1. PyPTO 简介

PyPTO（Parallel Tensor/Tile Operation）是面向 AI 加速器的高性能编程框架，目标是在降低算子与模型开发复杂度的同时，保留硬件级性能优化能力。其核心思想是以 Tensor 表达高层计算，再通过多级计算图和编译 Pass 逐步 Lower 到可执行任务。

### 分层架构设计

PyPTO 采用从“用户表达”到“设备执行”的分层架构，核心可概括为四层：

1. 用户 API 层（User Interface Layer）
- 提供 Python 友好的开发接口（如 `@pypto.frontend.jit`、Tensor/Operation API）。
- 开发者主要在这一层描述“做什么”，而非直接编写硬件指令。

2. 计算图编译层（Compute Graph Compile Layer）
- 将高层计算逐步转换与优化为多级图：
- `Tensor Graph`：算法语义层，偏硬件无关优化。
- `Tile Graph`：引入 Tile 粒度与内存层级语义。
- `Block Graph`：形成可在单个 AI Core 调度的子图，并进行硬件相关优化。
- `Execute Graph`：整合 Block 间依赖与调度信息，作为执行入口图。

3. 代码生成层（Code Generation Layer）
- 基于 Execute Graph 生成 PTO 虚拟指令，再编译为目标平台可执行代码。
- 承接“图级优化结果”到“设备可运行二进制”的转换。

4. 调度执行层（Scheduling & Execution Layer）
- 在设备侧按 MPMD 方式调度执行任务。
- 运行时根据依赖关系组织 AI CPU / AI Core 协同，完成任务分发与执行。

### 与本文主题的关系

本文聚焦的 Block Level，正处于“计算图编译层”的关键中后段：它承接 Tile 级语义并面向硬件执行约束完成子图组织与优化，是连接高层表达与运行时调度的核心桥梁。

## 2. Block Level 编程是什么

在 PyPTO 中，Block Level 编程本质上是“**单核可执行子图**”级别的抽象与优化：

1. 将 Tile Graph 切分为可在单个 AI Core 上调度执行的子图（Block Graph）
2. 针对这些子图做硬件相关优化，如：
- 指令编排
- 片上内存分配
- 同步操作插入
- 乱序调度

文档还强调：系统开发者对应使用 Block 层次能力；但当前版本主要开放 Tensor 层接口，Block 层通常通过编译器 Pass 与配置项间接控制。

## 3. Block Level 编程发生在编译时哪个阶段？起什么作用？

### 所处阶段

发生在编译链路的中后段：

- `Tile Graph -> Block Graph`
- 以及后续 `Block Graph -> Execute Graph` 的衔接阶段

在调试产物中也能看到对应关系：

- `LEAF` 类图文件：Block Graph
- `ROOT` 类图文件：Execute Graph

### 作用

- 把 Tile 级计算组织成可调度子图任务
- 在子图层面做硬件执行优化
- 最终由 Execute Graph 统一表达子图依赖与调度入口（如带 `fx` 的调用节点）

## 4. Block Level 编程要配置的核心参数

建议分为“核心必看”和“补充参数”两层。

| 参数类别 | 参数名 | 作用说明 | 调优影响 | 配置案例 |
| --- | --- | --- | --- | --- |
| 前置关键参数-并行粒度与数据划分 | `set_vec_tile_shapes` | 配置 Vector TileShape，影响 Tile 展开与上下游依赖关系；虽非 Block 参数名，但强影响 Block 图质量。 | 属于先决项；合理设置可提升后续合图质量与并行性，不合理会导致依赖复杂、难合图。 | `pypto.set_vec_tile_shapes(1, 4, 1, 64)`（`examples/00_hello_world/hello_world.py:62`）；`pypto.set_vec_tile_shapes(64, 64)`（`examples/02_intermediate/controlflow/loop/loop.py:88`） |
| 前置关键参数-并行粒度与数据划分 | `set_cube_tile_shapes` | 配置 Cube TileShape，决定 Matmul 等场景的 Tile 组织方式。 | 属于先决项；直接影响 Block 子图形态、搬运模式与整体吞吐。 | `pypto.set_cube_tile_shapes([32, 32], [64, 64], [64, 64])`（`examples/01_beginner/basic/basic_ops.py:138`）；`pypto.set_cube_tile_shapes([64, 64], [64, 64], [64, 64])`（`examples/03_advanced/advanced_nn/attention/attention.py:136`） |
| 核心参数-子图划分 | `sg_set_scope` | 手动给 operation 赋 scopeId；相邻且同 scopeId（且非 -1）的 op 会被强制合到一个子图，主要作用在 GraphPartition。 | 可按意图控制深度方向合图；不合理设置可能使子图边界过于僵化，影响自动优化。 | `examples` 目录检索无命中（关键词：`sg_set_scope`）。 |
| 核心参数-调度优化 | `vec_nbuffer_setting` | 控制 Vector/AIV 同构子图的广度合并粒度，面向 NBufferMerge。 | 调大常可减少调度与 kernel 头开销；过大可能增加资源压力或降低调度灵活性。 | `examples` 目录检索无命中（关键词：`vec_nbuffer_setting`）。 |
| 核心参数-缓存复用 | `cube_l1_reuse_setting` | 控制 Cube/AIC 子图按 L1 复用策略合并，常用于减少重复搬运。 | 合理调优可明显降低搬运开销；过度合并可能提升内存占用或带来额外调度成本。 | `examples` 目录检索无命中（关键词：`cube_l1_reuse_setting`）。 |
| 核心参数-并行掩盖 | `cube_nbuffer_setting` | 控制 Cube/AIC 同构子图的广度合并粒度。 | 可在多分支矩阵乘场景中增强搬运与计算的并行掩盖，同时降低调度开销；参数过激可能带来内存/调度副作用。 | `examples` 目录检索无命中（关键词：`cube_nbuffer_setting`）。 |
| 补充参数-子图划分 | `pg_upper_bound` | Pass 参数（编译期），用于限制子图大小上界；达到上界后不再继续合并。文档中有 `deprecated` 提示，但模型与测试仍在使用。 | 调小：子图更碎、调度开销可能上升，但可降低单子图复杂度与资源压力。调大：子图更大，可能减少调度开销，但可能带来编译/运行资源压力。 | `examples` 目录检索无命中（关键词：`pg_upper_bound`）。 |
| 补充参数-子图划分 | `cycle_upper_bound` | FAQ 中提到可控制单子图最大规模；公开 API 文档未完整列出，可能属于高级/兼容配置项。 | 倾向于限制过大子图，帮助控制复杂度；具体收益与副作用需结合算子和版本验证。 | `examples` 目录检索无命中（关键词：`cycle_upper_bound`）。 |
| 补充参数-调度优化 | `stitch_function_max_num` | Runtime 参数（运行期），控制每次 `Stitch Task` 最多处理多少 loop/root-function（任务批大小上限）。 | 调小：同步频繁、调度开销大、泳道图可能空隙多。调大：并行度提升，但 workspace 占用和调度管理开销上升。 | `examples` 目录检索无命中（关键词：`stitch_function_max_num`）；同类 Stitch 运行态配置可见 `runtime_options={"stitch_cfgcache_size": 2100000}`（`examples/03_advanced/cost_model/cost_model.py:88`）。 |
| 补充参数-内存管理 | `stitch_function_inner_memory` | Runtime 参数（运行期），控制 root function 中间结果内存池大小。 | 调大通常可提升 stitch 内并行度；代价是 workspace/显存占用上升，需要与 `stitch_function_outcast_memory` 联合权衡。 | `examples` 目录检索无命中（关键词：`stitch_function_inner_memory`）。 |

## 5. 实操建议

1. 先定 TileShape，再调 Block 合图参数
- 因为 TileShape 决定依赖形态，不合理时后续很难得到“既并行又融合”的好子图

2. Block 合图先用自动策略，再逐步人工收敛
- `cube_l1_reuse_setting` 通常优先于 `cube_nbuffer_setting`
- Vector 场景出现大量小同构子图时再重点考虑 `vec_nbuffer_setting`

3. Stitch 参数用泳道图闭环调优
- 以端到端耗时（不仅是 kernel 耗时）为准
- 在内存预算内逐步增大 `stitch_function_max_num`，观察收益拐点

## 6. 延伸阅读

- 如果你关心 `Loop -> PATH -> Tile Graph -> Execute Graph / Block Graph -> swimlane task` 这条链怎么在真实样例里被文件互证，可以继续看 [block-graph.md](block-graph.md)。
