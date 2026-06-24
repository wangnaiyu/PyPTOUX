# PyPTO Toolkit Feature Map

本文沉淀 `pypto-tools` 作为产品能力来源时的功能入口、视图路由、核心输入和 demo 启发。它服务 PyPTOUX 的产品理解和原型设计，不追求覆盖 VS Code 插件开发细节。

## 1. 证据快照

| 字段 | 值 |
| --- | --- |
| source id | `pypto-tools` |
| local mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools` |
| snapshot | branch `master`, commit `5a4fae5cb574276cedb01880f649011d7f09ca61` |
| primary project | `vscode_plugins/pypto_toolkit` |

## 2. 产品入口

`package.json` 暴露的用户入口可以归纳成四类：

| 入口 | 用户动作 | 对应产品能力 |
| --- | --- | --- |
| JSON 右键打开 | `PyPTO.Open.OpenRenderGraphForCurrent` | 根据文件内容打开计算图、泳道图或内存追踪关联计算图 |
| JSON 高级操作 | `OpenDiffComGraphForCurrent`, `OpenComGraphForNodeSearch` | 计算图差异对比、按节点搜索打开 |
| Python / C++ 右键打开 | `OpenLinkageMode` | 打开三栏联动视图 |
| Activity Bar 侧边栏 | `PyPTO-Open-Toolkit-Sidebar` | 查看历史运行结果、欢迎引导和运行材料入口 |

插件还提供配置项，用于自定义计算图节点属性 / 颜色，以及泳道图快捷键、连接层级、性能面板和 Mix 模式。

## 3. 视图路由

`pypto-tools` 的视图路由把产品能力映射到 Webview server：

| route | 产品视图 | 主要用途 |
| --- | --- | --- |
| `controlFlow` | 控制流 | 查看代码级控制逻辑、PATH、条件分支和控制流搜索 |
| `computeGraph` | 计算图 | 查看 Tensor / Operation、健康报告、节点搜索、链路锁定、内存入口 |
| `diffGraph` | 计算图对比 | 对比两个计算图文件 |
| `threeColumnGraph` | 三栏联动 | 联动源码、计算图和泳道图 |
| `swimGraph` | 泳道图 | 查看时间线、依赖、度量、性能报告和跳转计算图 |
| `memoryTrace` | 内存追踪 | 展示内存事件、buffer 状态和事件播放 |
| `opCheck` | 精度 / OpCheck | 展示精度异常、比对列表并跳回计算图 |
| `welcome` | 欢迎引导 | 用内置 fixture 走过核心功能 |
| `editRunConfig` | 运行配置 | 编辑 Toolkit 运行配置 |

## 4. 核心能力地图

### 历史运行结果

侧边栏围绕运行目录扫描构建用户入口。Toolkit 会读取 `rundata.json` / `rundata_boot_steps.json`，解析源码、控制流、计算图、泳道图和精度校验路径，再组织成可展开目录树。

Demo 启发：PyPTOUX 原型可以把“运行结果”作为一级对象，而不是从单图页面开始。

### 控制流

控制流视图以 `program.json` 为核心输入，用于呈现函数、PATH、动态条件和源码定位。

Demo 启发：控制流适合作为“理解算子执行逻辑”的第一屏，帮助用户从代码结构进入图和性能。

### 计算图

计算图视图根据文件前几行是否包含 `entryhash` 判断是否可打开；支持节点详情、搜索、子图跳转、健康报告、局部搜索、链路锁定和对比图。

Demo 启发：计算图不只是静态图，关键交互是“搜索、聚焦、跳转、对比、健康报告定位”。

### 泳道图

泳道图视图支持 `merged_swimlane.json`、`perf_swimlane.json` 和 Chrome Trace 风格数据。核心能力包括时间轴浏览、测距、观测线、节点详情、性能报告、核利用率统计、泳道置顶、Mix 模式和从 `rootHash` / `leafHash` 跳转计算图。

Demo 启发：泳道图适合承载“性能问题定位”的叙事，尤其是从宏观耗时到单个节点，再回到计算图和源码。

### 三栏联动

三栏联动把源码、计算图和泳道图放在同一视图中，并通过 semantic label 建立跨视图关联。详见 [linkage-mechanism.md](linkage-mechanism.md)。

Demo 启发：这是 PyPTO Toolkit 最适合转译成 PyPTOUX demo 的能力，可作为“代码 -> 图 -> 性能”的主叙事。

## 5. 扩展能力

### 精度报告 / OpCheck

源码中 `opCheck` 视图与 `accurancyAnylasis.ts`、`csvReader.ts`、SQLite cache 共同工作，读取精度比对 CSV、异常列表和比对详情，并支持从异常记录打开关联计算图。

沉淀价值：

- 作为“正确性问题定位”的产品能力。
- 可与计算图节点、Pass、function hash 和 CSV 记录建立联动。
- 后续 demo 可把性能分析与精度异常并列成两条诊断路径。

### 内存可视化

内存追踪围绕 `_OoO_Memory_Trace.json`，解析 `timeline`，缓存事件与 buffer 状态，并在前端展示内存图、事件轴和事件列表。

沉淀价值：

- 作为“内存生命周期”可视化能力。
- 可和计算图节点、opMagic、buffer 状态、事件播放结合。
- 大文件会走 streaming parse，这提示 demo 设计中需要考虑渐进加载和缓存状态。

### `perf_swimlane.json` 转换

`perf_swimlane.json` 只要求顶层有 `tasks` 数组；转换器会读取 task 时间、core、依赖、AICPU dispatch / finish、scheduler phase、orchestrator phase，并输出 `traceEvents`。

沉淀价值：

- 说明 Toolkit 正在把更丰富的 runtime 性能数据统一到时间线模型。
- `deps.json` 与 `name_map*.json` 是值得继续追踪的辅助输入。
- AICPU 视图与 Kernel 视图可以作为后续泳道图 demo 的扩展层。

### AICPU / pypto3.0 / Mix 泳道图

README 与源码显示泳道图已经覆盖 Kernel、AICPU、pypto3.0 和 Mix 模式。对 PyPTOUX 来说，这些可作为不同运行视角，而不是一开始就拆成多个独立产品。

## 6. 内置欢迎 fixture

`src/boot-mock-data/rundata_20251224101343/` 包含 `program.json`、`merged_swimlane.json`、`topo.json`、`run.log`、`tilefwk_L1_prof_data.json`、源码文件和引导 manifest。它的推荐标记是 `toolkit fixture / schema example`。

使用边界：

- 可用于理解 Toolkit 欢迎引导、字段结构和交互目标。
- 不直接作为 PyPTO 真实样例数据的 L1 证据。
- 如果后续抽取到 demo 数据，应在 `pypto-data` 中登记来源和数据等级。

## 7. 后续可深挖问题

- `program.json` 中哪些字段最适合支撑三栏联动 demo？
- `perf_swimlane.json` 与 `merged_swimlane.json` 是否应该在 PyPTOUX 中统一成一个中间 schema？
- 精度报告与性能报告是否应共享同一套“问题列表 -> 图节点定位 -> 源码定位”交互模式？
- 内存可视化是否应该成为独立 demo，还是作为计算图详情页的扩展 panel？
