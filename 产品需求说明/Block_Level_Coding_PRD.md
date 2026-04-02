# PyPTO-IDE: Block-Level 编程与调优 AI IDE 产品需求文档 (PRD)

## 1. 项目背景与目标
PyPTO (Parallel Tensor/Tile Operation) 是面向昇腾 Ascend 加速器的高性能编程框架。Block Level 编程作为连接高层表达（Tile Graph）与硬件执行（Execute Graph）的核心桥梁，其子图划分、内存复用及调度策略直接决定算子最终性能。
本产品旨在通过 IDE 的形式，降低开发人员在 Block 级的认知负担与调优门槛，提升算子交付效率。

---

## 2. 目标用户画像与使用场景

### 2.1 用户画像
- **AI 算子开发专家（企业级）**：
  - 核心痛点：追求极致性能，但缺乏直观的子图合并视图，手动配置 `sg_set_scope` 等参数效率低下。
  - 需求：深度控制硬件资源（L1/L2 缓存、NBuffer）、实时性能反馈。
- **AI 模型算法工程师**：
  - 核心痛点：对底层硬件约束不敏感，难以通过调整 TileShape 间接优化 Block 性能。
  - 需求：自动化合图建议、可视化调试回溯。
- **高校师生/初学者**：
  - 核心痛点：PyPTO 学习曲线陡峭，对“计算图 -> 子图 -> 执行”的演进过程缺乏感性认知。
  - 需求：教学式的可视化流程展示、完善的代码补全与示例。

### 2.2 典型使用场景
1. **算子设计期**：开发者在 IDE 中编写 Python 代码，实时观察 Tile Graph 到 Block Graph 的动态转换。
2. **性能瓶颈定位期**：通过 IDE 的“泳道图”功能，发现计算与搬运的空隙，精准定位是 `cube_l1_reuse_setting` 还是 `vec_nbuffer_setting` 设置不当。
3. **自动化调优期**：IDE 根据静态分析结果，自动推荐最优的 `pg_upper_bound` 或 `stitch_function_max_num` 参数。

---

## 3. 功能需求

### 3.1 代码智能补全与辅助
- **上下文感知补全**：针对 `sg_set_scope`、`cube_l1_reuse_setting` 等核心 Block 参数提供精准补全。
- **参数提示与文档映射**：悬浮显示参数定义、调优影响（如：`cube_nbuffer_setting` 对内存压力的副作用说明）。
- **示例代码注入**：一键插入典型的 Block 优化配置模板（如：Vector 同构子图合并场景）。

### 3.2 可视化 Block 图编辑
- **双视图联动**：左侧代码编辑器，右侧实时渲染 Block Graph（LEAF 类图）与 Execute Graph（ROOT 类图）。
- **层级穿透分析**：点击 Block 节点可追溯回对应的 Tile 节点，并高亮源码行。
- **手动合图干预**：在图形界面拖拽节点，IDE 自动生成并插入 `sg_set_scope(id)` 代码。

### 3.3 软硬联动设计与调优
- **资源估算器**：实时静态估算当前 Block 划分下的 L1/L2 内存占用及 Workspace 需求。
- **硬件约束校验**：自动识别非法 TileShape 组合，防止在编译后期才抛出硬件执行错误。

### 3.4 实时性能分析与自动建议
- **性能泳道图 (Swimlane)**：集成运行态 Profiling 数据，将 Block 任务与硬件泳道（AI Core/AI CPU）一一对应。
- **自动建议引擎**：基于“先定 TileShape，再调 Block”的实操建议，主动推送优化策略。例如：“检测到大量小 Vector Block，建议调大 `vec_nbuffer_setting`”。

### 3.5 调试回溯
- **编译快照对比**：支持不同参数配置下的 Block 图对比，直观展示“合图”前后的子图边界变化。
- **Block 级步进调试**：在模拟器或真机环境下，支持按 Block 子图粒度进行断点调试。

---

## 4. 非功能需求
- **响应时间**：核心交互（如节点点击、代码提示）响应时间 ≤ 200ms；Block 图初次渲染 ≤ 1s。
- **渲染能力**：支持单图 10 万+ 节点的流畅缩放与拖拽，不出现掉帧。
- **内存管理**：IDE 自身内存占用（不含编译后台）控制在 2GB 以内。
- **稳定性**：支持大模型算子（如 Attention 融合算子）的复杂计算图长周期稳定运行。

---

## 5. 交互流程与信息架构

### 5.1 信息架构图 (IA)
- **主导航栏**：文件、编辑、编译配置、调优工具、性能分析。
- **侧边栏**：
  - **项目资源管理器**：源码、编译产物（LEAF/ROOT 图文件）。
  - **参数面板 (Properties)**：选中 Block 节点的详细配置与调优建议。
- **主视图区**：
  - **代码编辑器 (Tab 1)**：Python 算子描述。
  - **计算图视图 (Tab 2)**：Tile -> Block 演进视图。
- **底部面板**：控制台输出、编译日志、性能泳道图 (Profiling)。

### 5.2 核心交互流程
1. 开发者编写 `pypto.frontend.jit` 代码。
2. 保存代码触发“背景增量编译”。
3. IDE 在右侧更新 Block Graph，标记出子图边界。
4. 开发者发现 Block 过碎，在侧边栏调整 `cube_nbuffer_setting`。
5. IDE 实时重绘 Block 图并显示预估收益。
6. 点击“性能分析”，下方弹出泳道图，验证空隙是否缩小。

---

## 6. 关键界面线框图及状态说明

### 6.1 主界面布局 (Wireframe)
```text
+-----------------------------------------------------------------------+
|  [Logo] [File] [Edit] [Compile] [Profile] [Help]          [User Profile] |
+-----------------------------------------------------------------------+
|  Explorer |   Code Editor (hello_world.py)   |   Block Graph View      |
|           | 1 | @pypto.frontend.jit          |   +-------------------+ |
| - src/    | 2 | def my_op(x, y):             |   | [Block 0] <-----> | |
|   - op.py | 3 |   # User Logic               |   | [Block 1]         | |
| - graph/  | 4 |   pypto.set_vec_tile_shapes..|   +-------------------+ |
|   - leaf/ | 5 |                              |   Properties Panel      |
|   - root/ | 6 |                              | - ScopeID: 101          |
|           |                                  | - L1 Reuse: Enable      |
+-----------------------------------------------------------------------+
|  Console / Profiling (Swimlane View)                                  |
|  [Time] [---Memory Movement---] [---Computation---]                   |
+-----------------------------------------------------------------------+
```

### 6.2 状态说明
- **默认状态**：展示代码编辑器与空的图视图，引导用户选择算子入口。
- **加载状态 (Loading)**：编译中，图视图显示 Skeleton Loader，并伴有“正在生成 Block Graph...”的文字提示。
- **错误状态 (Error)**：编译失败时，图视图变为红色蒙层，点击可跳转至代码报错行；Console 高亮显示参数冲突详情。
- **空状态 (Empty)**：未选择算子或未运行 Profiling 时，在泳道图区域显示“运行 Profiling 以查看性能分析数据”及操作引导。

---

## 7. 验收标准与优先级 (MoSCoW)

| 优先级 | 功能模块 | 验收标准 |
| :--- | :--- | :--- |
| **Must Have (M)** | 实时 Block 图渲染 | 能够正确加载 LEAF/ROOT 图文件，支持点击节点高亮源码。 |
| **Must Have (M)** | 核心参数配置面板 | 支持对 `cube_l1_reuse` 等 5 个以上核心 Block 参数的图形化修改。 |
| **Must Have (M)** | 基础 Profiling 视图 | 能够展示时间轴、搬运与计算的基本占比。 |
| **Should Have (S)** | 智能合图建议引擎 | 能够识别出明显的合图收益点并主动推送通知。 |
| **Should Have (S)** | 代码自动补全 | 覆盖 PyPTO 所有 API 及其参数文档。 |
| **Could Have (C)** | 步进调试回溯 | 支持在模拟器上逐 Block 查看内存快照。 |
| **Won't Have (W)** | 跨平台真机部署 | 本期仅支持 Ascend 910/310 系列本地调试，暂不支持多节点集群。 |

---

## 8. 统一术语表
- **Block Graph**：LEAF 类图，表示单核可调度的子图。
- **Execute Graph**：ROOT 类图，表示子图间的依赖与调度入口。
- **Tile Shape**：数据切片的形状，决定 Block 划分的先决条件。
- **Stitch Task**：Runtime 层级的调度任务块。
