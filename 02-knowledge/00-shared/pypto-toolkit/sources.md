# PyPTO Toolkit 来源

本文记录 PyPTO Toolkit 主题的证据来源、mirror 计划、权限边界和可写回规则。具体 source schema 的主登记仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。

PyPTO 样例数据、测试数据和运行产物来源见 [../pypto-data/sources.md](../pypto-data/sources.md)。

## Primary Sources

| Source id | 类型 | 链接或定位 | 状态 | 用途 |
| --- | --- | --- | --- | --- |
| `pypto` | local mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto` | active; snapshot 见 `pypto-architecture/sources.md` | Toolkit 文档源码、工具链说明、`program.json` / `merged_swimlane.json` 等产物解释 |
| `pypto-tools` | local mirror / code source | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`；remote: `https://gitcode.com/cann/pypto-tools` | active; branch `master`; commit `5a4fae5cb574276cedb01880f649011d7f09ca61` | Toolkit 产品能力、adapter、工程结构、demo workflow |
| `toolkit-design-files` | user-provided local design files | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件` | raw files outside repo | Toolkit 产品交互、结构摘要、缩略图 / 截图证据 |
| 本仓库资料 | `overview.md` | 本目录 | active | 提炼后的 Toolkit 能力地图和治理摘要 |
| 本仓库资料 | `manifest.md` | 本目录 | active | `pypto-tools` 与 toolkit 设计输入 intake 规则 |

## PyPTO Docs Evidence

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 仓库目录 | `docs/tools/index.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/index.md` | Toolkit 总入口 |
| 仓库文档 | Toolkit 简介 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/introduction/简介.md` | 工具定位与核心特性 |
| 仓库文档 | Toolkit 快速入门 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/introduction/快速入门.md` | 最短上手路径 |
| 仓库目录 | `docs/tools/computation_graph/` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/computation_graph` | 计算图功能 |
| 仓库目录 | `docs/tools/swimlane_graph/` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/swimlane_graph` | 泳道图功能 |
| 仓库文档 | 三栏联动视图 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/three_column/三栏联动视图.md` | 代码-图-性能联动 |

## Writeback Policy

- `pypto-tools`: 允许本仓库记录文件结构、schema、截图和少量代码片段；不写入完整源码镜像。
- `toolkit-design-files`: 原始设计稿不进入本仓库；允许记录缩略图、截图、结构摘要、manifest 和来源说明。

## Notes

- 本轮已 clone `pypto-tools`，clone 后 mirror status 为 `## master...origin/master`。
- 本轮没有把原始设计稿写入 PyPTOUX。
- 涉及 PyPTO data source、数据等级或 `share-safe` 的判断，统一查 `02-knowledge/00-shared/pypto-data/`。
