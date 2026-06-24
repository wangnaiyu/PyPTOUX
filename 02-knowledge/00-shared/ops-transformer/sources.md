# ops-transformer 来源与 Snapshot

本文记录 `02-knowledge/00-shared/ops-transformer/overview.md` 的来源、snapshot、引用边界和本轮 mirror 结果。全局 source schema 仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。

## 1. Current Snapshot

| 字段 | 值 |
| --- | --- |
| mirror_date | `2026-06-24` |
| source_instance | `ops-transformer` |
| local_mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/ops-transformer` |
| remote_url | `https://gitcode.com/cann/ops-transformer` |
| local_branch | `master` |
| snapshot_commit | `0c372f8d537c6cfa7bd0ffb165c6701f8ddb79a9` |
| snapshot_short_commit | `0c372f8d` |
| snapshot_commit_date | `2026-06-24T17:44:26+08:00` |
| snapshot_subject | `mhc_pre_sinkhorn_backward: 修正MHC_PRE_GRAD_MM1/MM2 MatmulConfig配置` |
| mirror_method | `git clone https://gitcode.com/cann/ops-transformer` |
| post_clone_status | tracked worktree clean |

## 2. Evidence Inspected

| Source | Evidence | 用途 |
| --- | --- | --- |
| `README.md` | 项目定位、版本配套、最新动态、反馈入口 | 顶层定位和版本边界 |
| `docs/README.md` | 文档中心、指南类/API类/工具类文档入口 | 文档检索路径 |
| `docs/zh/install/dir_structure.md` | 标准算子目录结构和可选交付件说明 | repo / workflow map |
| `docs/zh/develop/aicore_develop_guide.md` | 标准 AI Core 算子开发流程 | 算子开发工作流 |
| `docs/zh/op_list.md` | 算子分类、目录、交付件、硬件单元 | 算子索引源 |
| `docs/zh/debug/` | 仿真、调试调优文档 | diagnostic / optimization orientation |
| top-level directories | `attention`, `ffn`, `gmm`, `mc2`, `mhc`, `moe`, `posembedding`, `experimental`, `torch_extension` | 仓库结构定位 |

## 3. Source Boundary

### `ops-transformer` local mirror

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `authority_scope`: 当前 checkout 的 transformer 类算子仓库结构、算子目录、文档路径、标准算子工程 workflow、调用方式和可追溯代码路径。
- `best_for`: `workflow-research`、`demo-material`、`ux-strategy` 中与算子迁移、operator workflow、CANN transformer 算子生态有关的问题。
- `not_for`: PyPTO current behavior；任意 CANN 版本的通用事实；未经配套 tag 校验的版本结论。
- `claim_policy`: 版本 claim 必须结合 CANN release / tag；API / 硬件 claim 回官方文档；单算子 claim 回具体算子目录。

## 4. Maintenance Rules

- refresh / fetch 后必须更新本文件 snapshot 表和 `overview.md` 的 snapshot。
- 不在本目录复制全量算子列表或源码。
- 若后续用于 demo 数据，必须标明数据等级和可外发边界。
