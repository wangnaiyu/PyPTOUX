# PTO ISA 来源与 Snapshot

本文记录 `02-knowledge/00-shared/pto-isa/overview.md` 的来源、snapshot、引用边界和本轮 mirror 结果。全局 source schema 仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。

## 1. Current Snapshot

| 字段 | 值 |
| --- | --- |
| mirror_date | `2026-06-24` |
| source_instance | `pto-isa` |
| local_mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa` |
| remote_url | `https://gitcode.com/cann/pto-isa` |
| local_branch | `master` |
| snapshot_commit | `4bd9a4d5175c9fce28f83560a982c5877fb6c685` |
| snapshot_short_commit | `4bd9a4d5` |
| snapshot_commit_date | `2026-06-24T17:15:57+08:00` |
| snapshot_subject | `A3 TNOT TXOR TXORS add int32 uint32 support, A3 TAND TOR update test case` |
| mirror_method | `git clone https://gitcode.com/cann/pto-isa` |
| post_clone_status | tracked worktree clean |

## 2. Evidence Inspected

| Source | Evidence | 用途 |
| --- | --- | --- |
| `README_zh.md` | 项目定位、核心特性、平台支持、目录结构、样例和路线图 | 顶层定位和仓库地图 |
| `docs/README_zh.md` | 文档导航和建议阅读路径 | 文档检索入口 |
| `docs/PTOISA_zh.md` | 自动生成 ISA 索引、指令分类、C++ intrinsic API 指向 | ISA 分类和权威入口 |
| `docs/isa/` | 每条指令参考和通信指令目录 | 指令 literal 与语义定位 |
| `docs/coding/` | Tile、Event、性能优化、debug、融合、多核、版本兼容等文档 | 编程模型和优化路径 |
| `include/README_zh.md` | include 目录说明和指令实现状态表 | 后端支持状态和实现边界 |
| `include/pto/` | common / cpu / npu / comm / costmodel 等头文件结构 | API / backend / communication 检索路径 |
| `demos/`, `kernels/`, `tests/` | 示例、manual kernels、测试脚本 | demo / validation orientation |

## 3. Source Boundary

### `pto-isa` local mirror

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `authority_scope`: PTO ISA、Tile Library、C++ intrinsic API、指令文档、后端支持状态、CPU / NPU / CostModel / communication 相关实现路径。
- `best_for`: ISA / hardware interface / Tile 编程模型相关 `lookup`、A5 / 950 技术梳理、PyPTOUX 硬件叙事和 demo 设计中的指令层证据。
- `not_for`: PyPTO 当前行为、CANN 通用官方口径、真实硬件性能结论。
- `claim_policy`: 指令名、后端支持状态、平台支持和文件路径必须回当前 snapshot 校验；硬件 claim 再对照 CANN / Ascend 官方文档。

## 4. Maintenance Rules

- refresh / fetch 后必须更新本文件 snapshot 表和 `overview.md` 的 snapshot。
- 不在本目录复制完整 ISA 指令表；必要时可抽取小型专题表并保留来源路径。
- 若 `pto-isa` 与 CANN 官方文档或 PyPTO 当前实现存在冲突，记录冲突，不直接抹平。
