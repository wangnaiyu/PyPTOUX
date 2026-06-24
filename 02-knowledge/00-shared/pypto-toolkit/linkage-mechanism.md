# 代码-计算图-泳道图联动机制

本文沉淀 `pypto-tools` 三栏联动视图的产品机制和 demo 启发。它关注用户体验与输入输出契约，不复刻插件实现。

## 1. 一句话定义

三栏联动把源码、计算图和泳道图放在同一工作面中，让用户从代码语义标签出发，定位到计算图节点，再观察对应 runtime 时间线和性能表现。

## 2. 核心输入

| 输入 | 常见文件 | 用途 |
| --- | --- | --- |
| 源码 | `.py`, `.cpp`, `.h`, `.hpp` | 展示代码行和 semantic label |
| 计算图 | `program.json` 或计算图 JSON | 提供 `entryhash`、function、operation、semantic label、function hash |
| 泳道图 | `merged_swimlane.json` 或 `perf_swimlane.json` | 提供 runtime 时间线、节点详情、`rootHash` / `leafHash` 等跳转线索 |
| 运行结果 manifest | `rundata.json` / `rundata_boot_steps.json` | 把源码、图和性能文件绑定成一次运行 |

## 3. 打开路径

三栏联动可以从源码文件右键打开，也可以在已有运行结果上下文里打开。

源码侧自动查找逻辑：

1. 如果调用方已经传入泳道图和计算图路径，直接使用。
2. 如果没有传入路径，先查本地缓存 `threeViewFiles.json`。
3. 如果缓存没有命中，在工作区 `output/` 下找最新的 `output_*` 目录。
4. 在最新 output 目录下尝试查找 `program.json` 和 `merged_swimlane.json`。
5. 如果用户只选择了泳道图，则在同目录查 `program.json`；如果只选择了计算图，则在同目录查 `merged_swimlane.json`。

Demo 启发：PyPTOUX 可以把“自动配对 + 用户补选”设计成显式状态，减少用户不知道缺哪个文件的困惑。

## 4. Semantic label 映射

三栏联动的关键不是文件并排展示，而是从计算图中抽取 semantic label 映射。

`pypto-tools` 当前处理两种形态：

- `semantic_label` 是数组：结合 operation 的 `file` 和 `line`，取第一个非空 label。
- `semantic_label` 是对象：直接使用其中的 filename / lineno / label 信息。

映射结果按文件路径和行号组织，大致可以理解为：

| key | value |
| --- | --- |
| 源文件绝对路径 | `{ 行号: semantic label }` |

如果 filename 是相对路径，会基于工作区根目录转成绝对路径。Windows 风格路径也会做兼容处理。

Demo 启发：三栏联动 demo 应把 semantic label 作为用户可见解释层，而不是只显示 hash 或 magic number。

## 5. 计算图到泳道图

泳道图侧支持根据 `rootHash` 和 `leafHash` 跳转计算图。运行结果目录树也会从计算图文件名中解析 `leafHash` 和 `leafProgramId`。

这意味着联动关系至少有三类 key：

- 源码行：`filename + lineno`
- 计算图函数 / 节点：`entryhash`, `funcHash`, `funcmagic`, `opmagic`, `nodeMagic`
- 泳道图关联：`rootHash`, `leafHash`, task / event 信息

后续做 demo 时，不必一次暴露所有 key；可以让用户看到“语义标签 -> 图节点 -> 性能事件”的自然链路，并在调试面板中保留原始 literal。

## 6. 锁定与联动状态

README 中三栏联动包含锁定模式：用户在任一视图锁定后，高亮状态不会继续随点击改变。

Demo 启发：

- 默认模式适合探索：点击任一视图，其他视图跟随。
- 锁定模式适合分析：保留当前代码 / 图 / 性能关系，允许用户继续查看局部细节。
- 如果后续加入报告或批注，锁定状态可以成为“保存证据”的起点。

## 7. 对 PyPTOUX 的沉淀口径

三栏联动应作为 `pypto-toolkit` 下的长期产品知识，而不是拆到 `pypto-data`：

- `pypto-toolkit` 负责记录联动能力、交互机制、字段如何参与产品体验。
- `pypto-data` 负责记录真实样例、fixture 抽样、数据等级、可外发状态和生成规则。
- 上游 literal 如 `program.json`、`merged_swimlane.json`、`rootHash`、`leafHash`、`semantic_label`、`opmagic` 必须保留原样。

## 8. 后续验证点

- `semantic_label` 在真实 PyPTO 样例中最常见的是数组还是对象？
- 泳道图跳计算图时，`rootHash` / `leafHash` 与计算图文件名、`program.json` 内字段的对应关系是否稳定？
- 对大型图，三栏联动是否需要默认进入局部搜索 / 聚焦模式？
- 锁定模式是否足够支撑“问题证据卡片”或“性能诊断故事线”？
