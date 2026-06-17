# PyPTO Architecture Drift Log

记录 `02-knowledge/00-shared/pypto-architecture/overview.md` 与本地镜像 / 线上单点内容不一致的漂移。

本文件由 Codex 维护。Claude 运行时发现 drift 时，不直接写本文件，而是在回答末尾“待人工处理”区块汇总，由用户决定是否通知 Codex。

## 状态枚举

- `suspected-drift`：缺少快照元数据或证据不足，只能怀疑。
- `confirmed-drift`：已对比刷新后的本地镜像或线上单点确认。
- `resolved`：已被后续 `overview.md` 修订吸收；保留条目，不删除。

## 单条 Schema

新增条目时 append 到文件末尾，使用下面的 markdown section 结构：

### `YYYY-MM-DD <短描述>`

- 状态: `suspected-drift` / `confirmed-drift` / `resolved`
- 涉及路径:
- overview 期望:
- 实际观察:
- 证据来源: `local-mirror-refreshed` / `online-single-fetch` / `user-report`
- 触发问题:
- 发现日期: `YYYY-MM-DD`
- 解决日期:
- 解决备注:

## 滚动策略

- 单文件达到约 50 条时按年份归档，例如 `drift-YYYY.md`。
- `resolved` 条目保留在原文件，不删除。

## 维护流程

- Codex 接到具体业务查询且发现 drift 时追加条目。
- Codex 周期性 review 本文件，把 `confirmed-drift` 吸收到 `overview.md`，并把对应条目状态改为 `resolved`。
- Claude 运行时发现 drift 不写本文件，在回答末尾“待人工处理”区块汇总，由用户决定是否通知 Codex。

## Drift Entries

### `2026-06-17 snapshot metadata unknown`

- 状态: `resolved`
- 涉及路径: `02-knowledge/00-shared/pypto-architecture/overview.md`
- overview 期望: 对应 pypto 仓库快照日期、提交和分支为 `unknown`
- 实际观察: 本轮已 hard sync 到 `origin/master`，commit `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`
- 证据来源: `local-mirror-refreshed`
- 触发问题: 2026-06-17 architecture refresh
- 发现日期: `2026-06-17`
- 解决日期: `2026-06-17`
- 解决备注: `overview.md` 与 `sources.md` 已记录 snapshot metadata。

### `2026-06-17 docs path moved under docs/zh`

- 状态: `resolved`
- 涉及路径: `docs/`、`docs/zh/`
- overview 期望: `docs/tutorials/`、`docs/api/`、`docs/trouble_shooting/`、`docs/tools/`、`docs/install/`、`docs/invocation/`
- 实际观察: 当前 tracked 文档主入口是 `docs/zh/`，下含 `tutorials/`、`api/`、`tools/`、`trouble_shooting/`、`install/`、`invocation/`
- 证据来源: `local-mirror-refreshed`
- 触发问题: 2026-06-17 architecture refresh
- 发现日期: `2026-06-17`
- 解决日期: `2026-06-17`
- 解决备注: `overview.md` 已更新为 `docs/zh/...` 路径。

### `2026-06-17 top-level docs/tools was untracked cache pollution`

- 状态: `resolved`
- 涉及路径: `docs/tools/`、`docs/zh/tools/`
- overview 期望: 顶层 `docs/tools/` 可作为工具文档入口
- 实际观察: 顶层 `docs/tools/` 是本地 untracked 内容；tracked 工具文档入口是 `docs/zh/tools/`
- 证据来源: `local-mirror-refreshed`
- 触发问题: 2026-06-17 architecture refresh
- 发现日期: `2026-06-17`
- 解决日期: `2026-06-17`
- 解决备注: 已清理 untracked `docs/tools/`；`overview.md` 和 `sources.md` 已明确使用 `docs/zh/tools/`。

### `2026-06-17 models and source directories changed`

- 状态: `resolved`
- 涉及路径: `models/`、`python/pypto/`、`framework/src/`
- overview 期望: `models/`、`python/pypto/`、`framework/src/` 只作粗略入口
- 实际观察: 当前 snapshot 中 `models/` 包含 `arctic`、`deepseek_v32_exp`、`deepseek_v4`、`glm_v4_5`、`kimi`、`qat`、`qwen3_next`；`python/pypto/` 和 `framework/src/` 有更多可定位子目录
- 证据来源: `local-mirror-refreshed`
- 触发问题: 2026-06-17 architecture refresh
- 发现日期: `2026-06-17`
- 解决日期: `2026-06-17`
- 解决备注: `overview.md` 已更新模型、Python 和 C++ 源码入口。
