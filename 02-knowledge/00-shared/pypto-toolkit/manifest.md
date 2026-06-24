# PyPTO Toolkit Manifest

本文记录 Toolkit 相关 source 的 intake、权限和写回规则。它只覆盖 `pypto-tools` 与 toolkit 设计输入，不覆盖 PyPTO 样例数据或测试数据。

PyPTO 数据 source manifest 见 [../pypto-data/manifest.md](../pypto-data/manifest.md)。

## Source Manifest

| Source id | Kind | Location | Access | Repository writeback |
| --- | --- | --- | --- | --- |
| `pypto-tools` | toolkit code / product source | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`; remote: `https://gitcode.com/cann/pypto-tools` | active mirror; branch `master`; commit `5a4fae5cb574276cedb01880f649011d7f09ca61` | 文件结构、schema、截图、少量代码片段 |
| `toolkit-design-files` | toolkit design source | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件` | user-provided local files outside repo | 缩略图、截图、结构摘要、manifest、来源说明 |
| `toolkit-boot-fixture` | toolkit fixture / schema example | `pypto-tools/vscode_plugins/pypto_toolkit/src/boot-mock-data/` | source-controlled fixture inside `pypto-tools` | 结构摘要、字段说明、demo 启发；不直接标为 L1 样例数据 |

## Intake Checklist

新增 Toolkit material 时，先补齐：

- source id
- local path 或 remote URL
- owner / provider
- material kind
- raw / screenshot / thumbnail / structure-summary / schema / snippet
- allowed repository writeback
- external sharing status
- demo usage notes

如果 material 来自 `src/boot-mock-data/`：

- 在本目录记录它作为 Toolkit fixture 的用途和结构。
- 不直接写成真实 PyPTO sample dataset。
- 若抽取为 demo 数据或样例片段，应在 `02-knowledge/00-shared/pypto-data/` 补数据等级、来源、可外发状态和生成 / 抽取规则。

## Clone / Mirror Notes

- `pypto-tools` 已于 `2026-06-24` clone。
- 如后续执行 fetch / refresh，应先确认目标目录状态，再记录 remote、branch、commit、date 和 dirty state。
- 目标目录位于 PyPTOUX 工作区外，执行 clone / fetch / reset 需要单独授权。

## Out Of Scope

- PyPTO 样例数据、测试数据、编译 / 运行产物
- 数据等级与 `share-safe` 规则
- 把 `toolkit-boot-fixture` 判定为真实 L1 运行数据

这些内容统一维护在 `02-knowledge/00-shared/pypto-data/`。
