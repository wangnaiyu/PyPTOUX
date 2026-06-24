# PyPTO 架构来源与 Snapshot

本文记录 `02-knowledge/00-shared/pypto-architecture/overview.md` 的来源、snapshot、引用边界和本轮 refresh 结果。全局 source 能力与治理规则仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准；本文只维护本主题的具体证据和快照。

## 1. Current Snapshot

| 字段 | 值 |
| --- | --- |
| refresh_date | `2026-06-17` |
| source_instance | `pypto` |
| local_mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto` |
| remote_url | `https://gitcode.com/cann/pypto` |
| remote_head | `origin/HEAD -> origin/master` |
| sync_target | `origin/master` |
| local_branch | `master` |
| snapshot_commit | `91ea6d019b9e0d170934c6861ad63b89c63b9bf9` |
| snapshot_short_commit | `91ea6d01` |
| snapshot_commit_date | `2026-06-17T10:32:51+08:00` |
| snapshot_subject | `fix(machine): Change aicore_runtime function from uint64 to int64.` |
| refresh_method | `git fetch --prune` + `git reset --hard origin/HEAD` |
| post_refresh_status | tracked worktree clean |
| cache_cleanup | removed untracked `.DS_Store` files and untracked top-level `docs/tools/` |

## 2. Evidence Inspected

| Source | Evidence | 用途 |
| --- | --- | --- |
| `README.md` | 项目概述、核心特性、目标用户、目录结构、示例和 quick-start 链接 | 架构摘要、用户角色、顶层目录 |
| `docs/zh/index.md` | 文档中心总览和 PyPTO 概念表述 | 官方文档源码口径 |
| `docs/zh/tutorials/development/index.md` | 算子开发 toctree | 编程指南路径 |
| `docs/zh/tutorials/debug/` | debug / performance / precision / matmul guide 等文件 | 调试调优路径 |
| `docs/zh/api/` | config / controlflow / datatype / distributed / operation / symbolic / tensor 等目录 | API 检索路径 |
| `docs/zh/tools/index.md` | 工具文档 toctree | 控制流图、计算图、泳道图、三栏联动路径 |
| `docs/zh/trouble_shooting/index.md` | FUNCTION / PASS / CODEGEN / MACHINE 等组件专题 | 排障路径 |
| `examples/README.md` | 样例层级和学习路径 | examples 路径 |
| `models/` | `arctic`、`deepseek_v32_exp`、`deepseek_v4`、`glm_v4_5`、`kimi`、`qat`、`qwen3_next` | 真实模型 / 大模型样例入口 |
| `python/pypto/` | Python 前端、IR、runtime、operator 等源码入口 | Python 侧实现定位 |
| `framework/src/` | adapter、runtime、CodeGen、Pass、machine、operator 等源码入口 | C++ 框架实现定位 |
| `tools/` | profiling、verifier、schema、workflow 等脚本工具 | 仓库工具脚本定位 |

## 3. Source Boundary

### `pypto` local mirror

- `status`: `active`
- `access_mode`: `local-mirror`
- `authority_scope`: 当前 checkout 的代码事实、路径事实、文档源码、样例结构、上游 literal。
- `best_for`: `lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`demo-material` 中需要当前代码或文档源码证据的问题。
- `not_for`: 官网对外发布措辞、未校验设计意图、外部经验 claim。
- `claim_policy`: factual claim 必须回当前 snapshot 或更高权威 source 校验；字段名、路径、文件名、trace key 等 literal 保持原样。
- `overwrite_guard`: 本地 mirror 作为 read-only upstream cache；refresh 前检查 tracked worktree，dirty 时暂停。

### `pypto-official-docs`

- `status`: `active`
- `access_mode`: `online`
- `authority_scope`: 官网教程、对外措辞、文档站入口。
- `best_for`: 用户问官网怎么说、公开教程入口、对外可引用文案。
- `not_for`: 当前代码路径、当前源码行为、未发布实现细节。
- `freshness_policy`: 需要官网当前口径时在线单点读取，不做无界 crawl。

### `pypto-architecture/overview.md`

- `status`: `active` as `orientation_hints`
- `authority_scope`: 帮助定位 PyPTO 目录、文档和源码入口。
- `not_for`: 当前实现事实出口、唯一 source routing 入口。
- `claim_policy`: 本文中的架构摘要和检索路径需要回 `pypto` snapshot 或其他 authoritative source 校验。

## 4. Refresh Notes

- 本轮确认 GitCode 上 `pypto` 的默认 sync target 是 `master`，不是 `main`。
- 本轮已执行 hard sync，当前 snapshot 可作为 `2026-06-17` 的 local mirror evidence。
- 本轮清理了本地 mirror 中 untracked 的 `.DS_Store` 和顶层 `docs/tools/`，避免它污染路径判断。
- tracked 工具文档入口是 `docs/zh/tools/`；顶层 `tools/` 是脚本工具目录，不等同于工具文档。
- 如果后续需要判断“最新线上状态”，应优先单点读取 GitCode 或官方文档，不要只凭本地 snapshot 推断。

## 5. Maintenance Rules

- 每次刷新 `overview.md` 时，同时更新本文件的 snapshot 表。
- 如果发现旧 overview 与当前 snapshot 不一致，记录到 `drift.md`；修订 overview 后把对应 drift 标为 `resolved`。
- 不在本文登记全局 source schema；新增 source instance 或 source type 时更新 `.agents/skills/pypto-knowledge-source/references/sources.md`。
- 不把外部数据材料、`pypto-tools`、`pypto-testdata` 或 toolkit 设计稿源文件放入本目录；这些由 toolkit / PyPTO data source 和 design-system source governance 另行处理。
