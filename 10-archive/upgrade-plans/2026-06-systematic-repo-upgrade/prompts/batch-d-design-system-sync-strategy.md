# Batch D Prompt: Design System Sync Strategy

用于启动 `Batch D: Design System Sync Strategy`。

```md
请启动 PyPTOUX 系统性升级任务的 Batch D。

任务包位置：
`09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

本次 Batch D 的目标是建立 `yinyucheng0601/pto-design-system` 与 PyPTOUX 当前 `.agents/skills/pto-design-system`、`.agents/skills/pto-design-system/` 之间的上游同步和本仓库同步方式，明确 mirror、手动同步、变更报告、同步范围、skill 边界和 preview gate。

请先阅读：
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/sources-to-refresh.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-d-design-system-sync-strategy-plan.md`

再阅读：
- `AGENTS.md`
- `.agents/skills/pto-design-system/SKILL.md`
- `.agents/skills/pto-design-system/DESIGN.md`
- `.agents/skills/pto-design-system/references/quick-reference.md`
- `.agents/skills/pto-design-system/references/preview-gate.md`
- `.agents/skills/pypto-knowledge-source/references/sources.md`

开始前先运行并汇报：
- `git status --short`

## Batch D 启动前必须先讨论的问题

请先向用户确认以下事项，不要一上来 clone、mirror、复制上游设计系统、改 `.agents/skills/pto-design-system/` 或重写 PTO skill：

1. `yinyucheng0601/pto-design-system` 是否允许 clone 到本地 mirror？如果允许，本地 mirror 放在哪里？
2. 希望采用手动触发脚本、人工 copy，还是维护上游镜像？
3. `.agents/skills/pto-design-system/` 是否只承载稳定 bundle，不承载 agent-facing preview 和实验 pattern？
4. `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？
5. 哪些内容允许同步进 `.agents/skills/pto-design-system/`：tokens、CSS、patterns、docs、preview、screenshots、changelog？
6. 设计系统同步是否需要生成 diff / change report？

## 执行边界

- 不要默认 clone / pull / fetch `yinyucheng0601/pto-design-system`；先确认 preflight。
- 不要无确认地全量复制上游设计系统进 PyPTOUX。
- 不要开始具体 demo build、prototype build 或视觉改造。
- 不要重开 Batch C 的 Toolkit / PyPTO data source 边界。
- 不要覆盖用户或其他 agent 的未提交改动。

## Plan 阶段输出

确认 preflight 后，先更新 `batch-d-design-system-sync-strategy-plan.md`，写入：

- 当前 PTO design system source audit 结论
- 上游 mirror / copy / script 策略
- `.agents/skills/pto-design-system` 与 `.agents/skills/pto-design-system/` 的边界
- `.agents/skills/pto-design-system/` 同步信息架构
- 变更报告和同步 checklist
- source registry 和 `sources-to-refresh.md` 更新规则
- 需要用户判断的问题
- `/goal` 执行 checklist

如果发现必须由用户判断的问题，先写入 `open-questions.md` 并暂停实施。

## `/goal` 执行要求

只有在用户确认 `batch-d-design-system-sync-strategy-plan.md` 后，才用 `/goal` 执行正式文件修改。

执行完成后请说明：

- 修改了哪些文件
- `yinyucheng0601/pto-design-system` 如何登记或引用
- `.agents/skills/pto-design-system` 与 `.agents/skills/pto-design-system/` 的边界如何记录
- 哪些内容被同步或明确不同步
- 哪些问题留给 Batch E
- 下一步是否进入 Batch E

遵守 checkpoint 规则：完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时，才更新任务包状态文件。
```
