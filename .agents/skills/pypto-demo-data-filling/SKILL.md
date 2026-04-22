---
name: pypto-demo-data-filling
description: Use this skill when working inside the PyPTOUX repository and you need to fill a PyPTO-related demo with realistic materials from the local pypto codebase and registered sample datasets, especially for code-to-graph-to-performance demos, three-view demos, or other artifact-driven visual explanations.
---

# PyPTO Demo Data Filling | Demo 数据填充

当你要为 `PyPTO` 相关 demo 填充真实素材时，使用这个 skill。

## 和其他 Skills 的关系 | Skill Boundaries

- 这个 skill 负责“给 demo 填什么真实素材、怎么装配素材”。
- 如果任务先要做业务知识检索、框架事实确认或 source-of-truth 查证，先使用 `pypto-knowledge-source`，再回到本 skill 做 demo 填充。
- 如果任务需要决定内容最终沉淀到仓库哪里，配合 `pyptoux-content-router` 使用。

## 先看项目级规则 | Project Rules First

- 项目级 demo 素材规则、可追溯要求和常用来源，统一见 [../../../AGENTS.md](../../../AGENTS.md)。
- 这个 skill 只保留“怎么给 demo 配真实素材”的专属流程。

## 先读什么 | What To Read First

- 先读 [../../../AGENTS.md](../../../AGENTS.md)，确认项目级 demo 规则。
- 先读 [../../../02-knowledge/00-shared/pypto-architecture/overview.md](../../../02-knowledge/00-shared/pypto-architecture/overview.md)，用它缩小检索范围。
- 再读 [../../../02-knowledge/00-shared/pypto-sample-datasets/overview.md](../../../02-knowledge/00-shared/pypto-sample-datasets/overview.md)，确认当前有哪些已整理好的样例数据集。
- 如果需要把代码、计算图、泳道图精确对齐，再读 [../../../02-knowledge/00-shared/pypto-sample-datasets/sources.md](../../../02-knowledge/00-shared/pypto-sample-datasets/sources.md)，优先复用已经确认过的映射入口。
- 需要更快决定 demo 面板和素材映射时，读 [references/demo-patterns.md](references/demo-patterns.md)。

## 核心流程 | Core Workflow

1. 先判断 demo 的主线：
   - 代码讲解
   - 计算图 / Pass 演示
   - 泳道图 / 性能分析
   - 三栏联动
   - 混合型说明
2. 用 `pypto-architecture/overview.md` 缩小检索范围，决定先去：
   - `docs/` 找编程指南、API、排障口径
   - `examples/` 找官方推荐写法
   - `models/` 找更接近真实业务的实现
   - `python/pypto/`、`framework/src/` 找前端机制和底层编译链路
3. 用 `pypto-sample-datasets/overview.md` 选择最合适的数据集，优先复用已确认可用的数据集。
4. 先明确当前 demo 想走哪条关联链，再选素材：
   - 代码标签联动 -> 优先找 `SetSemanticLabel(...)` 或 `pypto.set_semantic_label(...)`
   - 图到任务的跳转 -> 优先找 `program.json` + `dyn_topo.txt`
   - 任务到性能的定位 -> 优先找 `merged_swimlane.json`
   - Pass 前后对比 -> 优先找 `Pass_*`
   - 生成代码说明 -> 优先找 `kernel_aicore/` 或 `function.cpp`
5. 按 demo 面板绑定真实素材：
   - 源码面板 -> `pypto` 工程真实代码，或样例数据集里的 `code/`
   - 计算图面板 -> `program.json`，必要时下钻到 `Pass_*/*_ROOT.json`、`*_LEAF_program_id_*.json`
   - 泳道图面板 -> `merged_swimlane.json`
   - 图任务桥接层 -> `dyn_topo.txt`
   - 编译过程面板 -> `Pass_*` 目录
   - 生成代码面板 -> `kernel_aicore/`、`function.cpp`
   - 调试说明面板 -> 仅当真实存在非空日志时再用 `run.log`
6. 先保证“面板素材真实”，再补解释性标题、摘要和标注；不要先写文案、后补素材。
7. 做映射时优先复用这条顺序：
   `semantic_label -> program.json -> dyn_topo.txt -> merged_swimlane.json -> Pass / kernel`
8. 如果真实素材缺失，再退一步使用“基于真实结构整理”的摘要内容，不要伪造并不存在的字段、节点、性能数值或运行阶段。
9. 在产出里保留来源意识：哪些内容来自真实文件，哪些是为展示做的裁剪或简化。
10. 如果这次整理出了新的可复用数据集理解、素材组合套路或 demo 填充经验，回填到 `02-knowledge/` 对应主题下。

## 真实性规则 | Fidelity Rules

- 优先使用真实文件、真实路径、真实字段名。
- 不要把 mock 数据伪装成真实运行产物。
- 如果某个文件是 `null`、空文件或当前目录里根本不存在，要明确写出这个状态，不要按经验脑补其内容。
- 如果某个 demo 面板暂时没有真实素材，明确标注为“示意内容”或“基于真实结构整理”。
- 如果真实代码与真实数据冲突，优先回源核对，不要自行拍脑袋修补。
- 不要因为版面更好看，就把不同数据集的素材混成一个看似连贯但实际不可追溯的故事。

## 适合什么时候用 | Good Fits

- 要把 `program.json`、`merged_swimlane.json`、源码片段填进 demo
- 要做 “代码 -> 图 -> 性能” 的可视化说明
- 要给 PyPTO 的 IDE / 图工具 / 性能工具做更真实的演示稿
- 要从 `pypto` 工程和样例数据里抽一套可信素材，而不是只做风格稿

## 不适合什么时候用 | Not A Fit

- 只是做纯视觉探索，不关心真实代码或真实产物
- 只是写框架知识总结，不需要 demo 素材填充
- 只是查 API 或排障，没有 demo 设计需求
