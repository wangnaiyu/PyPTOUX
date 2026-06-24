# PyPTO Data

本文用于沉淀 PyPTO 样例数据、测试数据、编译 / 运行产物、数据等级和 `share-safe` 规则。它不保存原始外部数据，只记录 source governance、manifest、schema 和可写回边界。

Toolkit 产品能力、`pypto-tools` 和 toolkit 设计稿来源见 [../pypto-toolkit/overview.md](../pypto-toolkit/overview.md)。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | PyPTO data source orientation |
| last_updated | `2026-06-24` |
| source_registry | `.agents/skills/pypto-knowledge-source/references/sources.md` |
| canonical_files | `overview.md`, `sources.md`, `manifest.md` |

使用规则：

- `pypto-sample-dataset` 和 `pypto-testdata` 都属于 `pypto-data-source`，可作为 demo evidence。
- 原始 L1 数据可用于真实性校验，但不能默认标记为 `share-safe`。
- 只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。
- 新增 PyPTO 数据材料应归入 `pypto-sample-dataset`、`pypto-testdata` 或后续明确的新 source instance。

## 1. Source Governance

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
- data level: L1
- permission / external boundary: 同 `pypto-sample-dataset`

`pypto-testdata` 已 clone 到本地 mirror。进入 PyPTOUX 仓库时仍按 manifest、摘要、schema、抽样 / 脱敏规则处理。

## 2. Demo 使用边界

- L1 代表真实来源，不代表可外发。
- `share-safe` 只给抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据。
- 原始 L1 数据用于内部真实性校验和 demo 设计依据时，需要保留来源、路径、数据等级和可外发状态。
- Demo 面板可以使用 schema、字段摘要、结构摘要、截图或脱敏样本；不要把 L2/L3 伪装成 L1。

## 3. Data Level Rules

- `L1`: 真实数据，直接来自上游仓库、本地样例、测试数据或真实编译 / 运行产物。
- `L2`: 基于已知 schema、字段定义或业务规则整理 / 生成的数据；必须标注来源依据或生成规则。
- `L3`: 仅用于早期布局验证的占位数据，不可外发，不可标记为 `share-safe`。

## 4. Share-Safe Rules

- 原始 L1 数据不能默认标记为 `share-safe`。
- 抽样 / 脱敏后的数据可以在记录抽样 / 脱敏规则后标记为 `share-safe`。
- 按 schema 编造的数据可以在明确标记为 L2，并披露 schema 来源和生成规则后标记为 `share-safe`。
- `share-safe` demo 必须在可见位置披露数据等级、来源摘要与生成规则摘要。

## 5. 与 Toolkit 的关系

Toolkit 可以消费 `program.json`、`merged_swimlane.json`、图结构、性能摘要和截图，但这些材料的 source instance、数据等级和可外发边界归本目录治理。

`pypto-toolkit` 只回答 Toolkit 产品能力、`pypto-tools` mirror、设计稿和工具文档证据；遇到样例数据或测试数据问题时应跳转回本目录。
