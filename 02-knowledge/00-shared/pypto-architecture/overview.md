# PyPTO 架构与检索地图

本文整合了此前的“架构初步理解”和“使用与检索路径”，用于建立一份更适合速读和检索的统一文档。

说明：

- 本文基于 `pypto` 仓库 `README.md`、`docs/`、`examples/` 的阶段性阅读整理。
- 其中 `docs/` 与 `examples/` 部分来自当前本地镜像；对应那轮阅读按用户要求**未刷新本地 pypto 镜像**。

## 1. 项目概述

PyPTO 是一个面向 AI 加速器的高性能编程框架，核心目标不是只提供一组前端 API，而是把高层模型/算子表达逐步 Lower 为目标平台可执行代码。

### 1.1 核心理解

当前可以先把 PyPTO 理解成一个同时包含“前端表达、编译链路、代码生成、运行时调度、工具链支持”的系统。

| 维度 | 核心内容 | 关键关键词 / 特性 |
| --- | --- | --- |
| 前端表达 | 使用 Python 友好的 Tensor 级 API 描述模型或算子 | Tensor、JIT、PyTorch 集成、Python 友好 API |
| 图级编译 | 逐步从高层图 Lower 到可执行图，并在多层 IR 上做转换与优化 | Tensor Graph、Tile Graph、Block Graph、Execution Graph、多层级计算图转换 |
| 代码生成 | 生成 PTO 虚拟指令并进一步编译为目标平台代码 | CodeGen、自动化代码生成 |
| 运行时执行 | 在设备侧按 MPMD 方式组织任务调度和执行 | MPMD 执行调度 |
| 计算抽象 | 所有计算围绕硬件感知的数据块组织 | 基于 Tile 的编程模型 |
| 开发体验 | 对不同角色暴露不同层次能力，并提供图与性能视图辅助分析 | 分层抽象设计、工具链支撑 |

### 1.2 目标用户与常见关注点

| 用户角色 | 主要工作层次 | 常见问题 |
| --- | --- | --- |
| 算法开发者 | Tensor 层 | 怎么写 kernel、怎么跑样例、某个 API 怎么用 |
| 性能优化专家 | Tile / Block 层 | TileShape 怎么调、loop 怎么写、性能瓶颈在哪 |
| 系统开发者 | 跨层集成 | 编译链路怎么组织、Pass / CodeGen / 调度怎么工作 |

## 2. 目录结构

### 2.1 仓库与文档目录树

```text
pypto/
├── docs/                       # 官方文档源文件总入口
│   ├── tutorials/              # 编程指南、开发指南、调试调优、FAQ
│   ├── api/                    # API 总索引与分组索引
│   ├── trouble_shooting/       # 组件级错误码与排障文档
│   ├── tools/                  # PyPTO Toolkit 用户指南
│   ├── install/                # 环境准备与安装
│   └── invocation/             # 样例运行说明
├── examples/                   # 从入门到高级的分层样例，适合查官方推荐写法
├── models/                     # 更接近真实业务的模型/算子实现
├── python/pypto/               # Python 前端 API 行为和 Python 侧机制
├── framework/src/              # Pass、CodeGen、编译链路与底层实现
└── tools/                      # 辅助工作流与脚本级能力
```

## 3. 检索与学习路径

这一章不再按“资料类型”并列罗列，而是按更符合实际使用的顺序组织：

1. 先判断你当前处于什么场景
2. 再走对应的编程、API、排障、工具或学习路径
3. 最后用速查表做日常跳转

### 3.1 查询场景

| 当前问题 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 刚开始接触 PyPTO，不知道先看什么 | `docs/tutorials/introduction/` | `examples/README.md` | 先建立概念和整体路径 |
| 正在写算子，不知道功能该怎么表达 | `docs/tutorials/development/` | `examples/01_beginner/`、`02_intermediate/` | 先看教程，再看官方写法 |
| 想确认某个接口的参数、约束或返回值 | `docs/api/` | `examples/` | API 给定义，样例给写法 |
| 结果不对、报错了、想排障 | `docs/tutorials/debug/`、`appendix/faq.md` | `docs/trouble_shooting/` | 先按现象排，再按错误码钻取 |
| 性能不好，想看瓶颈在哪 | `docs/tutorials/debug/performance.md` | `docs/tools/swimlane_graph/` | 先拿方法论，再看泳道图 |
| 想看真实复杂实现 | `models/` | `examples/03_advanced/` | 优先看真实工程或高级样例 |
| 想看框架内部机制 | `python/pypto/`、`framework/src/` | `docs/tutorials/` | 教程帮助建立源码阅读心智 |

### 3.2 编程指南路径

| 开发问题 | 首选文档 | 对应样例 |
| --- | --- | --- |
| Tensor 怎么创建、怎么看属性 | `docs/tutorials/development/tensor_creation.md` | `examples/01_beginner/basic/` |
| 基础数学运算、矩阵运算、view/reshape/cast | `docs/tutorials/development/tensor_operation.md` | `examples/01_beginner/compute/`、`transform/` |
| TileShape 怎么配置 | `docs/tutorials/development/tiling.md` | `examples/01_beginner/tiling/` |
| JIT kernel 怎么定义与编译 | `docs/tutorials/development/compile.md` | `examples/00_hello_world/`、`01_beginner/basic/` |
| loop 和数据切分怎么写 | `docs/tutorials/development/loops.md` | `examples/02_intermediate/controlflow/` |
| 条件分支怎么写 | `docs/tutorials/development/conditions.md` | `examples/02_intermediate/controlflow/condition/` |

### 3.3 API 参考路径

| API 类别 | 目录 | 常见高频接口 |
| --- | --- | --- |
| 配置与 JIT | `docs/api/config/` | `pypto.frontend.jit`、`set_vec_tile_shapes`、`set_cube_tile_shapes` |
| Tensor 方法 | `docs/api/tensor/` | `view`、`reshape`、`transpose`、`softmax`、`matmul` |
| 算子总表 | `docs/api/operation/` | `add`、`matmul`、`sum`、`softmax`、`assemble`、`gather` |
| 控制流 | `docs/api/controlflow/` | `pypto.loop`、`pypto.cond` |
| 符号化 | `docs/api/symbolic/` | `SymbolicScalar` 系列 |
| 辅助接口 | `docs/api/others/` | `pypto.from_torch`、`pass_verify_print`、`pass_verify_save` |

### 3.4 故障排查路径

排查时可以先按“现象级入口”进入，再根据错误码、组件名或问题域钻取到 `docs/trouble_shooting/` 下的专题页。

| 问题类别 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 故障排查总览 | `docs/trouble_shooting/index.md` | `docs/trouble_shooting/README.md` | 先看组件总表，再理解错误码方案和范围 |
| 编译 / 执行流程调试 | `docs/tutorials/debug/debug.md` | `docs/tools/` | 适合先看图编译 / 图执行流程，再决定是否用工具观察 |
| 精度问题 | `docs/tutorials/debug/precision.md` | `docs/api/others/verify*`、`docs/trouble_shooting/verify.md` | 适合处理结果不一致、dump、自检和验证链路问题 |
| 性能问题 | `docs/tutorials/debug/performance.md` | `docs/tools/swimlane_graph/`、`docs/trouble_shooting/machine.md` | 先看调优方法，再看泳道图和运行时异常 |
| CodeGen 问题 | `docs/trouble_shooting/codegen.md` | `framework/src/` | 适合处理 kernel 代码生成、指令参数、二进制编译失败 |
| 卷积问题 | `docs/trouble_shooting/conv.md` | `docs/tutorials/development/tiling.md` | 覆盖 Conv 的 Operation、Tile 切分、CodeGen、TileOp 问题 |
| 分布式问题 | `docs/trouble_shooting/distributed.md` | `docs/api/distributed/`、`docs/tutorials/distributed/` | 适合处理 group、shmem、tile、machine 相关问题 |
| 函数问题 | `docs/trouble_shooting/function.md` | `docs/tutorials/development/compile.md`、`loops.md` | 适合处理动态函数、类型、shape、view、loop 命名等错误 |
| 矩阵乘问题 | `docs/trouble_shooting/matmul.md` | `docs/tutorials/debug/matmul_performance_guide.md` | 覆盖参数、Tile、对齐、运行时状态和典型 Matmul 场景 |
| 算子问题 | `docs/trouble_shooting/operation.md` | `docs/api/operation/` | 适合处理算子组件错误码和操作语义问题 |
| Pass 问题 | `docs/trouble_shooting/pass.md` | `docs/tools/computation_graph/` | 覆盖 Tensor、Operation、Function、Graph、Config 级错误 |
| 仿真问题 | `docs/trouble_shooting/simulation.md` | `docs/tutorials/debug/debug.md` | 适合处理配置、文件、外部依赖和 forward / precision sim 问题 |
| 向量问题 | `docs/trouble_shooting/vector.md` | `docs/tutorials/development/tiling.md` | 覆盖 Vector 参数、Tile 配置、对齐和运行时逻辑 |
| 精度验证问题 | `docs/trouble_shooting/verify.md` | `docs/tutorials/debug/precision.md` | 适合处理 verify mismatch、shape / dtype diff、runtime exception |
| View 操作问题 | `docs/trouble_shooting/view_op.md` | `docs/tutorials/development/tensor_operation.md`、`loops.md` | 适合处理 view / valid_shape / offset 相关问题 |
| 机器环境问题 | `docs/trouble_shooting/machine.md` | `docs/install/`、`docs/tutorials/debug/debug.md` | 适合处理设备、内存、超时、泳道图采集和环境异常 |
| 图结构异常问题 | `docs/tutorials/debug/debug.md` | `docs/tools/computation_graph/`、`docs/trouble_shooting/pass.md` | 适合处理图结构、子图边界、拓扑和编译图观察问题 |
| FAQ | `docs/tutorials/appendix/faq.md` | `docs/trouble_shooting/` | 适合先按现象快速命中已知问题，再回到组件专题深挖 |

### 3.5 工具链

| 目标 | 首选文档 | 作用 |
| --- | --- | --- |
| 先理解 Toolkit 是什么 | `docs/tools/introduction/简介.md` | 工具定位与核心能力 |
| 跑通最小工具链 | `docs/tools/introduction/快速入门.md` | `program.json` / `merged_swimlane.json` 上手 |
| 看控制流图 | `docs/tools/control_flow/index.md` | 逻辑结构可视化 |
| 看计算图 | `docs/tools/computation_graph/index.md` | 图结构、健康报告、差异对比 |
| 看泳道图 | `docs/tools/swimlane_graph/index.md` | 调度、耗时、性能报告 |
| 做代码-图-性能联动 | `docs/tools/three_column/三栏联动视图.md` | 三栏联动分析 |

### 3.6 学习路径

先走官方入门，再依次通过 examples、高级样例、真实模型和源码建立理解深度。

#### 官方入门顺序

| 顺序 | 文档 | 用途 |
| --- | --- | --- |
| 1 | `docs/tutorials/introduction/introduction.md` | 先理解 PyPTO 的架构、特性和适用场景 |
| 2 | `docs/tutorials/introduction/quick_start.md` | 跑通最小样例，建立可执行心智 |
| 3 | `docs/tutorials/introduction/program_paradigms.md` | 建立 PTO 范式、Tensor / 图 / MPMD 的核心心智 |
| 4 | `examples/README.md` | 对齐样例目录全貌，并进入分层样例学习 |

#### examples 与进阶源码顺序

| 学习阶段 | 主目录 | 建议顺序 | 重点 |
| --- | --- | --- | --- |
| 第一阶段 | `00_hello_world/` + `01_beginner/` | `00_hello_world/` → `basic/` → `tiling/` → `compute/` → `transform/` | 建立最小可运行心智，熟悉 Tensor、基础算子和 TileShape |
| 第二阶段 | `02_intermediate/` | `operators/` → `basic_nn/` → `controlflow/` | 理解算子组合、基础模块、动态 shape 和控制流 |
| 第三阶段 | `03_advanced/` | `advanced_nn/` → `patterns/` → `cost_model/` → `aclgraph/` | 进入高级模式、调优方法和官方高级范式 |
| 第四阶段 | `models/` | 从最相关模型样例切入 | 看更接近真实业务的模型 / 算子实现 |
| 第五阶段 | `python/pypto/` → `framework/src/` | 先 Python 前端，再 C++ 编译链路 | 建立 API 包装、Pass、CodeGen、图 Lower 与调度的源码心智 |

### 3.7 关键文档速查

这一节可以直接当作日常导航页使用。

| 类别 | 建议优先记住的文档 |
| --- | --- |
| 入门 | `docs/tutorials/introduction/quick_start.md`、`program_paradigms.md` |
| 开发 | `tensor_creation.md`、`tensor_operation.md`、`tiling.md`、`compile.md`、`loops.md`、`conditions.md` |
| 调试调优 | `debug.md`、`precision.md`、`performance.md`、`matmul_performance_guide.md`、`faq.md` |
| API | `pypto-frontend-jit.md`、`pypto-set_vec_tile_shapes.md`、`pypto-set_cube_tile_shapes.md`、`pypto-loop.md`、`pypto-cond.md`、`pypto-from_torch.md` |
| 排障 | `docs/trouble_shooting/index.md`、`pass.md`、`vector.md`、`matmul.md` |
| 样例 | `examples/README.md` |
| 工具 | `docs/tools/index.md`、`简介.md`、`快速入门.md`、`computation_graph/index.md`、`swimlane_graph/index.md` |
