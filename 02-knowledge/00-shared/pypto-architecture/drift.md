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
