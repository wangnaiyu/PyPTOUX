# PyPTO Data

本文是 PyPTO 数据治理、artifact schema / rules 和可复用数据集索引的总入口。它承接原 `pypto-sample-datasets` 与 `pypto-computation-graph-nodes` 主题：`pypto-data` 负责统一管理 source 权限、数据等级、`share-safe` 边界、schema family 和 dataset / scenario 索引。

Toolkit 产品能力、`pypto-tools` 和 toolkit 设计稿来源见 [../pypto-toolkit/overview.md](../pypto-toolkit/overview.md)。Toolkit 可消费 `program.json`、`merged_swimlane.json`、图结构、性能摘要和截图，但这些材料的 source instance、数据等级和可外发边界归本目录治理。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | PyPTO data governance and schema / dataset orientation |
| last_updated | `2026-06-24` |
| source_registry | `.agents/skills/pypto-knowledge-source/references/sources.md` |
| canonical_files | `overview.md`, `sources.md`, `manifest.md`, `schemas/*.md`, `datasets/*.md` |

使用规则：

- `pypto-sample-dataset` 和 `pypto-testdata` 都属于 `pypto-data-source`，可作为 demo evidence。
- 原始 L1 数据可用于真实性校验，但不能默认标记为 `share-safe`。
- 只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。
- 新增 PyPTO 数据材料应归入 `pypto-sample-dataset`、`pypto-testdata` 或后续明确的新 source instance。
- schema / rules 按 artifact family 沉淀；数据集按 dataset / scenario 索引；权限和可外发边界按 source instance 管理。
- 文件名、字段名、trace key 和上游 literal 必须保持原样，例如 `program.json`、`merged_swimlane.json`、`rootHash`、`callOpMagic`、`leafHash`。

## 1. 如何选择入口

| 你要回答的问题 | 先看哪里 | 说明 |
| --- | --- | --- |
| 这份数据能不能入仓、能不能外发 | [manifest.md](manifest.md) | source、数据等级、`share-safe` 和写回边界 |
| 某个字段 / 文件格式怎么解释 | `schemas/*.md` | 按 artifact / schema family 组织 |
| 要给 demo 找真实素材 | `datasets/*.md` | 按数据集或场景说明素材闭环 |
| 要追溯证据来源 | [sources.md](sources.md) | source、路径和已读证据 |
| 要理解 Toolkit 怎么消费这些数据 | [../pypto-toolkit/overview.md](../pypto-toolkit/overview.md) | 产品能力和交互机制归 toolkit |

## 2. Source Governance

### pypto-sample-dataset

- source id: `pypto-sample-dataset`
- local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`
- data level: 原始数据按来源登记为 L1
- repository writeback: 可记录 manifest、摘要、数据等级、schema；允许抽样或脱敏后的数据进入本仓库
- share-safe: 只能用于抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据

后续用户放入该目录的 PyPTO 相关样例、测试或编译 / 运行产物继续归入本 source。

### pypto-testdata

- source id: `pypto-testdata`
- display name: `PTO-TestData`
- remote: `https://gitcode.com/zhanghuixin/PTO-TestData`
- local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`
- current snapshot: branch `main`, commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`, commit date `2026-06-17T16:16:59+08:00`
- data level: L1；构造测试用例另行标记为 L2
- permission / external boundary: 同 `pypto-sample-dataset`

`pypto-testdata` 已 clone 到本地 mirror。进入 PyPTOUX 仓库时仍按 manifest、摘要、schema、抽样 / 脱敏规则处理。

## 3. Schema / Rules Index

| Schema family | 文件 | 适合回答 |
| --- | --- | --- |
| `program.json` | [schemas/program-json.md](schemas/program-json.md) | 图结构主入口、function / operation 字段、semantic label |
| `merged_swimlane.json` / traceEvents | [schemas/swimlane-trace-events.md](schemas/swimlane-trace-events.md) | Chrome Trace 风格事件、`event-hint`、`rootHash` / `leafHash` |
| `perf_swimlane.json` | [schemas/perf-swimlane.md](schemas/perf-swimlane.md) | task-level runtime schema、AICPU 调度、转换前数据 |
| `dyn_topo.txt` | [schemas/dyn-topo.md](schemas/dyn-topo.md) | `taskId`、`rootHash`、`opmagic`、`successors` 桥接 |
| PMU / msprof | [schemas/pmu-msprof.md](schemas/pmu-msprof.md) | PMU CSV、msprof trace、硬件性能计数 |
| Mix sync events | [schemas/mix-sync-events.md](schemas/mix-sync-events.md) | `wrapId`、`syncEvents`、SET / WAIT 转换规则 |
| computation graph nodes | [schemas/computation-graph-nodes.md](schemas/computation-graph-nodes.md) | Tensor / Tile / Block / Execute Graph 节点显示参数 |

## 4. Dataset / Scenario Index

| Dataset / scenario | 文件 | Source instance | 数据角色 | 最适合用途 |
| --- | --- | --- | --- | --- |
| three-view | [datasets/three-view.md](datasets/three-view.md) | `pypto-sample-dataset` | runtime-observed L1 | 三栏联动、代码 -> 图 -> 性能闭环 |
| A5 PMU G2 | [datasets/a5-pmu-g2.md](datasets/a5-pmu-g2.md) | `pypto-sample-dataset` | runtime-observed L1 | PMU / msprof / swimlane 性能说明 |
| PTO-TestData | [datasets/pto-testdata.md](datasets/pto-testdata.md) | `pypto-testdata` | mixed | AICPU、Mix、PMU、pypto3、threeColumn、kernel schema 探索 |

`PTO-TestData/mix/fake_testcase` 虽然真实来自 `pypto-testdata` source，但内容角色应按构造测试数据处理，默认标为 L2 / synthetic-testcase，不写成真实业务运行结果。

## 5. Demo 使用边界

- L1 代表真实来源，不代表可外发。
- `share-safe` 只给抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据。
- 原始 L1 数据用于内部真实性校验和 demo 设计依据时，需要保留来源、路径、数据等级和可外发状态。
- Demo 面板可以使用 schema、字段摘要、结构摘要、截图或脱敏样本；不要把 L2/L3 伪装成 L1。

## 6. Data Level Rules

- `L1`: 真实数据，直接来自上游仓库、本地样例、测试数据或真实编译 / 运行产物。
- `L2`: 基于已知 schema、字段定义或业务规则整理 / 生成的数据；必须标注来源依据或生成规则。
- `L3`: 仅用于早期布局验证的占位数据，不可外发，不可标记为 `share-safe`。

补充说明：source 可追溯性和 runtime 真实性要分开判断。一个文件可以真实来自 `PTO-TestData` source，但其内容仍可能是 synthetic / fixture / schema example。

## 7. Share-Safe Rules

- 原始 L1 数据不能默认标记为 `share-safe`。
- 抽样 / 脱敏后的数据可以在记录抽样 / 脱敏规则后标记为 `share-safe`。
- 按 schema 编造的数据可以在明确标记为 L2，并披露 schema 来源和生成规则后标记为 `share-safe`。
- `share-safe` demo 必须在可见位置披露数据等级、来源摘要与生成规则摘要。

## 8. 迁移决策

- 原 `02-knowledge/00-shared/pypto-sample-datasets/` 已整合到 [datasets/three-view.md](datasets/three-view.md) 和后续 `datasets/*.md`。
- 原 `02-knowledge/00-shared/pypto-computation-graph-nodes/` 已整合到 [schemas/computation-graph-nodes.md](schemas/computation-graph-nodes.md)。
- 后续新增数据主题优先在本目录下增加 `schemas/*.md` 或 `datasets/*.md`，不要再创建平行的 shared topic。

## 9. 与 Toolkit 的关系

`pypto-toolkit` 只回答 Toolkit 产品能力、`pypto-tools` mirror、设计稿和工具文档证据；遇到样例数据或测试数据问题时应跳转回本目录。
