# PyPTO Data 来源

本文记录 PyPTO 样例数据、测试数据、编译 / 运行产物的证据来源、mirror 计划、权限边界和可写回规则。具体 source schema 的主登记仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。

Toolkit 产品能力和 `pypto-tools` 来源见 [../pypto-toolkit/sources.md](../pypto-toolkit/sources.md)。

## Internal Knowledge Files

| 文件 | 用途 |
| --- | --- |
| [overview.md](overview.md) | PyPTO data 总入口、信息架构和选择路径 |
| [manifest.md](manifest.md) | source、数据等级、data role、`share-safe` 和写回边界 |
| `schemas/*.md` | artifact / schema family 规则 |
| `datasets/*.md` | dataset / scenario 索引 |

## Primary Sources

| Source id | 类型 | 链接或定位 | 状态 | 用途 |
| --- | --- | --- | --- | --- |
| `pypto-sample-dataset` | local PyPTO data source | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据` | active | PyPTO 样例、测试、编译 / 运行产物、demo evidence |
| `pypto-testdata` | local mirror / PyPTO data source | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`；remote: `https://gitcode.com/zhanghuixin/PTO-TestData` | active; branch `main`; commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15` | 测试数据、样例数据、运行产物、demo evidence |
| 本仓库资料 | `overview.md` | 本目录 | active | PyPTO data source 治理摘要 |
| 本仓库资料 | `manifest.md` | 本目录 | active | source intake、数据等级、可外发和写回规则 |
| 本仓库资料 | `schemas/*.md` | 本目录 | active | artifact / schema family 说明 |
| 本仓库资料 | `datasets/*.md` | 本目录 | active | dataset / scenario 索引 |

## Writeback Policy

- `pypto-sample-dataset`: 允许本仓库记录 manifest、摘要、数据等级、schema；允许抽样或脱敏后的数据进入本仓库。
- `pypto-testdata`: 数据等级为 L1，权限和可外发边界同 `pypto-sample-dataset`；允许 clone 到本地 mirror，但不写入原始全量数据。

## Share-Safe Policy

- 原始 L1 数据不默认 `share-safe`。
- 只有抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据，才可标记为 `share-safe`。
- `share-safe` 原型如使用 L2，必须在原型可见位置披露数据等级、来源摘要与生成规则摘要。

## Notes

- 本轮已 clone `pypto-testdata`，clone 后 mirror status 为 `## main...origin/main`。
- 本轮没有把原始外部数据写入 PyPTOUX。
- 新增 PyPTO data material 时，优先登记到已确认的具体 source instance；不使用泛化数据 lane。
- 原 `pypto-sample-datasets` 和 `pypto-computation-graph-nodes` 已迁入本主题；后续引用统一指向 `pypto-data/datasets/*` 和 `pypto-data/schemas/*`。
