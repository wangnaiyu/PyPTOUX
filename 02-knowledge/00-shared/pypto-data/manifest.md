# PyPTO Data Manifest

本文记录 PyPTO data sources 的 intake、权限、数据等级和写回规则。它是 manifest 与治理说明，不是原始数据仓库。

Toolkit source manifest 见 [../pypto-toolkit/manifest.md](../pypto-toolkit/manifest.md)。

## Source Manifest

| Source id | Kind | Location | Access | Data level | Repository writeback | Share-safe |
| --- | --- | --- | --- | --- | --- | --- |
| `pypto-sample-dataset` | PyPTO data source / demo evidence | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据` | local active source | 原始数据按来源登记为 L1 | manifest、摘要、数据等级、schema、抽样或脱敏数据 | 仅抽样 / 脱敏后，或按 schema 编造并标记为 L2 |
| `pypto-testdata` | PyPTO data source / demo evidence | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`; remote: `https://gitcode.com/zhanghuixin/PTO-TestData` | active mirror; branch `main`; commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15` | L1 | manifest、摘要、数据等级、schema、抽样或脱敏数据 | 同 `pypto-sample-dataset` |

## Data Role Rules

同一个文件需要同时判断 source 可追溯性和数据角色：

| 数据角色 | 含义 | 默认等级 |
| --- | --- | --- |
| `runtime-observed` | 来自真实编译 / 运行产物或真实测试运行结果 | L1 |
| `testdata-artifact` | 来自已登记测试数据仓库，可作为工具能力或 schema 证据 | L1，除非文件自身声明为构造 |
| `synthetic-testcase` | 为验证转换规则、边界条件或约束而构造的数据 | L2 |
| `fixture / schema example` | 工具内置演示或 schema 示例 | L2，除非另有真实运行来源 |
| `schema-generated` | 按已知 schema 生成的数据 | L2 |
| `placeholder` | 早期布局占位 | L3 |

`PTO-TestData/mix/fake_testcase` 默认按 `synthetic-testcase` 处理：source 文件可追溯，但内容不写成真实业务运行结果。

## Data Level Rules

- `L1`: 真实数据，直接来自上游仓库、本地样例、测试数据或真实编译 / 运行产物。
- `L2`: 基于已知 schema、字段定义或业务规则整理 / 生成的数据；必须标注来源依据或生成规则。
- `L3`: 仅用于早期布局验证的占位数据，不可外发，不可标记为 `share-safe`。

## Share-Safe Rules

- 原始 L1 数据不能默认标记为 `share-safe`。
- 抽样 / 脱敏后的数据可以在记录抽样 / 脱敏规则后标记为 `share-safe`。
- 按 schema 编造的数据可以在明确标记为 L2，并披露 schema 来源和生成规则后标记为 `share-safe`。
- `share-safe` demo 必须在可见位置披露数据等级、来源摘要与生成规则摘要。

## Intake Checklist

新增 PyPTO data material 时，先补齐：

- source id
- local path 或 remote URL
- owner / provider
- data level
- data role
- raw / sampled / desensitized / schema-generated
- schema source
- allowed repository writeback
- external sharing status
- demo usage notes

## Clone / Mirror Notes

- `pypto-testdata` 已于 `2026-06-24` clone。
- 如后续执行 fetch / refresh，应先确认目标目录状态，再记录 remote、branch、commit、date 和 dirty state。
- 目标目录位于 PyPTOUX 工作区外，执行 clone / fetch / reset 需要单独授权。
