# PyPTO Toolkit

本文用于沉淀 PyPTO Toolkit 的产品能力地图、`pypto-tools` source governance、demo 交互探索基准和 toolkit 设计输入边界。它不是 `pypto-tools` 的代码镜像，也不保存原始设计稿。

PyPTO 样例数据、测试数据、编译 / 运行产物、数据等级与 `share-safe` 规则已拆到 [../pypto-data/overview.md](../pypto-data/overview.md)。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | Toolkit / pypto-tools orientation |
| last_updated | `2026-06-24` |
| source_registry | `.agents/skills/pypto-knowledge-source/references/sources.md` |
| canonical_files | `overview.md`, `sources.md`, `manifest.md` |
| product_maps | `feature-map.md`, `linkage-mechanism.md` |

使用规则：

- Toolkit 当前实现事实必须回 `pypto`、`pypto-tools` mirror 或用户提供的可追溯材料校验。
- `pypto-tools` mirror 已 clone；本仓库可记录文件结构、schema、截图和少量代码片段。
- toolkit 设计稿原始文件不进入本仓库；本仓库可记录缩略图、截图和结构摘要。
- 与 PyPTO 样例数据或测试数据相关的内容统一查 `02-knowledge/00-shared/pypto-data/`。
- 本主题面向产品理解和 demo 探索，不追求成为 VS Code 插件开发手册；源码结构只沉淀到足以支持交互设计和 demo 取材的程度。

## 1. Toolkit 是什么

根据 `pypto` 文档中的 `docs/tools/introduction/简介.md`，PyPTO Toolkit 是面向 PyPTO 框架全流程的辅助工具，重点不在“写算子”，而在“看清楚算子如何被表达、编译、执行和调优”。

它的定位可以概括为：

- 可视化编译与运行状态
- 支撑算子开发工作流
- 帮助理解框架内部过程
- 降低调试调优门槛

## 2. 主要功能和特性

### 控制流图

把基于 PyPTO 表达的控制逻辑可视化，帮助理解代码级逻辑结构。

入口：

- `docs/tools/control_flow/index.md`

下属能力：

- 查看控制流图
- 搜索控制流图节点

### 计算图

展示从原始计算图到可执行图的编译过程，适合看 Tensor / Operation 关系、子图划分和编译健康状态。

入口：

- `docs/tools/computation_graph/index.md`

下属能力包括：

- 查看计算图
- 查看健康报告
- 搜索计算图节点
- 控制图层布局展示
- 锁定计算链路
- 对比计算图差异
- 自定义节点颜色及节点信息
- 跳转到代码行
- 局部搜索渲染计算图

### 泳道图

展示核间 / 核内流水与统计信息，帮助分析任务顺序、依赖关系、耗时和性能瓶颈。

入口：

- `docs/tools/swimlane_graph/index.md`

下属能力包括：

- 从泳道图跳转到计算图
- 搜索泳道图节点
- 测量节点间时间间隔
- 按时间范围查看
- 设置时间观测线
- 查看性能报告
- 设置着色模式
- 配置系统参数

### 三栏联动视图

把代码、计算图和泳道图放到同一页面里联动高亮，是 Toolkit 最有辨识度的一项能力。

入口：

- `docs/tools/three_column/三栏联动视图.md`

前提是代码里使用 `pypto.set_semantic_label(...)` 或对应 C++ 侧语义标签接口，并生成 `program.json` 与 `merged_swimlane.json`。这两个产物的 demo 数据等级和可外发边界以 `pypto-data` 规则为准。

更细的联动机制见 [linkage-mechanism.md](linkage-mechanism.md)。

### 扩展能力

`pypto-tools` 源码与 README 还显示 Toolkit 已覆盖若干主链路之外的扩展能力：

- 历史运行结果侧边栏：扫描、展示和搜索运行结果。
- 精度报告 / OpCheck：读取精度比对 CSV，支持从异常记录跳回计算图。
- 内存可视化：读取 `_OoO_Memory_Trace.json`，展示内存图、事件轴和事件列表。
- `perf_swimlane.json` 转换：将 task 记录、依赖、AICPU 调度和 name map 转成 Chrome Trace 风格的 `traceEvents`。
- AICPU / pypto3.0 / Mix 泳道图：作为泳道图视图的扩展展示模式。
- 欢迎引导：以内置 fixture 带用户走过控制流、计算图、泳道图和三栏联动。

完整产品能力入口见 [feature-map.md](feature-map.md)。

## 3. 运行结果模型

`pypto-tools` 把一次 PyPTO 执行结果组织成可再次打开的历史运行结果。这个模型适合作为 demo 的一等知识沉淀，因为它把“用户看什么”和“工具怎么找到材料”连接起来。

### 运行目录

运行结果目录通常形如 `rundata_YYYYMMDDHHMMSS`，Toolkit 会从目录名解析执行时间，并用 `runtype + 执行时间` 生成历史记录标题。

每个运行结果通过 `rundata.json` 或引导样例中的 `rundata_boot_steps.json` 描述关键路径：

| 字段 | 含义 | Toolkit 使用方式 |
| --- | --- | --- |
| `runtype` | 运行类型，例如 simulation / on-chip | 参与历史记录标题 |
| `pto_src_file` | 源码路径 | 三栏联动和源码入口 |
| `program_file` | 控制流 / program 文件路径 | 控制流视图与计算图关联 |
| `compute_graph_path` | 计算图目录 | 扫描 `Pass_*` 目录和计算图文件 |
| `swim_graph_path` | 泳道图文件路径 | 打开泳道图 |
| `flow_verify_path` | 精度校验路径 | 发现 OpCheck / 精度报告入口 |

### 目录树

Toolkit 会把运行结果整理成三类可点击材料：

- 控制流文件：来自 `program_file`。
- 泳道图文件：来自 `swim_graph_path`。
- 计算图目录：来自 `compute_graph_path`，下钻到 `Pass_<index>_<name>/After_...json`。

计算图文件名会被解析出 `pathName`、`computeType`、`leafProgramId` 和 `leafHash`。这些字段对“从泳道图跳回计算图”“定位 leaf function”“按 Pass 阶段解释编译过程”很有价值。

### Demo 启发

后续做 PyPTOUX demo 时，可以优先模拟这个运行结果模型，而不是只把单个 JSON 文件扔给界面：

1. 先让用户看到一次运行的历史记录。
2. 再从历史记录展开控制流、计算图、泳道图、精度报告。
3. 最后在三栏联动里把源码行、semantic label、计算节点和性能事件连起来。

## 4. Fixture 与数据归属

`src/boot-mock-data/` 是 `pypto-tools` 内置欢迎引导样例，当前建议标记为 `toolkit fixture / schema example`。

归属规则：

- 在 `pypto-toolkit` 中记录它的存在、用途、字段结构和对交互设计的启发。
- 不把它直接当成 `pypto-sample-dataset` 的 L1 真实运行数据。
- 如果后续需要把其中的 `program.json`、`merged_swimlane.json` 或源码片段抽取成 demo 数据，应在 `02-knowledge/00-shared/pypto-data/` 另行登记来源、数据等级、可外发状态和生成 / 抽取规则。
- 对外展示时应说明它是 Toolkit 内置 fixture，而不是新的真实 benchmark 或用户运行产物。

## 5. Source Governance

### pypto-tools

- source id: `pypto-tools`
- remote: `https://gitcode.com/cann/pypto-tools`
- local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`
- current snapshot: branch `master`, commit `5a4fae5cb574276cedb01880f649011d7f09ca61`, commit date `2026-06-24T14:11:17+08:00`
- repository writeback: 可记录文件结构、schema、截图和少量代码片段

`pypto-tools` 用于补足 Toolkit 产品能力、adapter、工程结构和 demo workflow 的证据。clone 或 refresh 时需要记录 snapshot，不在本目录存放完整源码。

### toolkit-design-files

- source id: `toolkit-design-files`
- local storage: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件`
- raw files in PyPTOUX: not allowed
- allowed writeback: 缩略图、截图、结构摘要、manifest、来源说明

设计稿用于 Toolkit 产品交互、信息架构、视觉意图和 demo 设计输入。原始设计稿不放入 PyPTOUX。

## 6. 快速上手路径

`docs/tools/introduction/快速入门.md` 给出了一条实用的最短路径：

1. 运行一个 PyPTO 样例，例如 softmax
2. 在输出目录找到 `program.json`
3. 用 Toolkit 打开 `program.json` 查看计算图
4. 打开 `runtime_debug_mode`
5. 重新运行生成 `merged_swimlane.json`
6. 用 Toolkit 打开泳道图

其中两个关键产物是：

- `program.json`：Execute Graph 和 Block Graph 的汇总信息
- `merged_swimlane.json`：泳道图性能数据

这些产物是否能进入仓库或标记为 `share-safe`，不在本目录判断，统一按 `02-knowledge/00-shared/pypto-data/manifest.md`。

## 7. 查询 Toolkit 文档时的推荐路径

1. 先看 `docs/tools/introduction/简介.md` 和 `快速入门.md`
2. 如果是“看什么图、怎么操作”，进入对应的 `control_flow/`、`computation_graph/`、`swimlane_graph/`
3. 如果是“怎么把代码、图和性能关联起来”，看 `three_column/三栏联动视图.md`
4. 如果是插件问题和已知限制，查 `others/其他功能.md` 和 `faq/已知问题.md`
5. 如果是 `pypto-tools` 源码侧能力入口，查本目录 [feature-map.md](feature-map.md)

## 8. 与调试调优文档的关系

Toolkit 更偏“可视化观察和交互操作”，而 `docs/tutorials/debug/` 更偏“调试方法论和性能策略”。

一个实用组合是：

- 先在 `tutorials/debug/` 里明确排查思路
- 再用 Toolkit 观察计算图、泳道图和联动视图
- 最后回到 `examples/`、`models/`、源码或数据 manifest 里调整写法、TileShape、loop 或配置
