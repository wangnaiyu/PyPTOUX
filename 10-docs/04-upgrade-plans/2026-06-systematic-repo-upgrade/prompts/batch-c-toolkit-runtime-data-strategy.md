# Batch C Prompt: Toolkit And Runtime Data Strategy

用于启动 `Batch C: Toolkit And Runtime Data Strategy`。

```md
请启动 PyPTOUX 系统性升级任务的 Batch C。

任务包位置：
`10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

本次 Batch C 的目标是把 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit 设计稿源文件纳入 source governance，服务后续 demo 演进，并明确 mirror、manifest、权限、数据等级、脱敏、可外发状态和 demo 引用规则。

请先阅读：
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/plan.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/sources-to-refresh.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-c-toolkit-runtime-data-strategy-plan.md`

再阅读：
- `AGENTS.md`
- `.agents/skills/pypto-knowledge-source/SKILL.md`
- `.agents/skills/pypto-knowledge-source/references/sources.md`
- `.agents/skills/pypto-demo-data-filling/SKILL.md`
- `02-knowledge/00-shared/pypto-architecture/overview.md`
- `02-knowledge/00-shared/pypto-sample-datasets/overview.md`
- `02-knowledge/00-shared/pypto-sample-datasets/sources.md`

开始前先运行并汇报：
- `git status --short`

## Batch C 启动前必须先讨论的问题

请先向用户确认以下事项，不要一上来 clone、mirror、复制运行数据、写入设计稿或修改 demo：

1. `pypto-tools` 本地镜像计划放在哪里？是否已经下载？
2. `pypto-tools` 是否允许本仓库记录文件结构、schema、截图或代码片段？
3. `pypto-sample-dataset` 的仓库写回边界是什么：只记录 manifest / 摘要 / 数据等级，还是允许抽样或脱敏后的数据进入本仓库？
4. `pypto-sample-dataset` 中哪些数据集可以标记为 `share-safe`？
5. `pypto-testdata` 是否允许 clone 到本地 mirror，还是只登记 manifest？它的数据等级、权限和可外发边界是什么？
6. toolkit 设计稿源文件是否允许进入本仓库？如果设计稿不入仓，是否允许记录缩略图、截图或结构摘要？
7. `02-knowledge/00-shared/pypto-toolkit/` 与 `02-knowledge/00-shared/pypto-data/` 应如何拆分？两者是否都建立 canonical files，例如 `overview.md`、`sources.md`、`manifest.md`？

## 执行边界

- 不要默认 clone / pull / fetch `pypto-tools`、`pypto-testdata` 或其他候选 source；先确认 preflight。
- 不要写入未经授权的数据材料、测试数据或设计稿原始文件。
- 不要开始 Batch D：`yinyucheng0601/pto-design-system` 同步和 `07-designsystem/` 投影不在本 batch 执行。
- 不要做 demo build、prototype build 或 design system sync。
- 不要把 `L2` / `L3` 数据伪装成 `L1`。

## Plan 阶段输出

确认 preflight 后，先更新 `batch-c-toolkit-runtime-data-strategy-plan.md`，写入：

- 当前 toolkit / PyPTO data source audit 结论
- `pypto-tools` mirror / manifest 策略
- `pypto-sample-dataset` / `pypto-testdata` / design files 的数据等级和引用边界
- `02-knowledge/00-shared/pypto-toolkit/` 与 `02-knowledge/00-shared/pypto-data/` 信息架构
- `pypto-demo-data-filling` 更新范围
- source registry 和 `sources-to-refresh.md` 更新规则
- 需要用户判断的问题
- `/goal` 执行 checklist

如果发现必须由用户判断的问题，先写入 `open-questions.md` 并暂停实施。

## `/goal` 执行要求

只有在用户确认 `batch-c-toolkit-runtime-data-strategy-plan.md` 后，才用 `/goal` 执行正式文件修改。

执行完成后请说明：

- 修改了哪些文件
- `pypto-tools` 如何登记或引用
- `pypto-sample-dataset` / `pypto-testdata` / toolkit design files 的数据等级和权限边界如何记录
- `pypto-demo-data-filling` 如何变化
- 哪些问题留给 Batch D
- 下一步是否进入 Batch D

遵守 checkpoint 规则：完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新任务包状态文件。
```
