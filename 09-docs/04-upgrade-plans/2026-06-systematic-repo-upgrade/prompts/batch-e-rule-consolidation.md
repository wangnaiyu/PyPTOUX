# Batch E Prompt: Rule Consolidation

用于启动 `Batch E: Rule Consolidation`。

```md
请启动 PyPTOUX 系统性升级任务的 Batch E。

任务包位置：
`09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

本次 Batch E 的目标是把 Batch A-D 中已经稳定的结论回写到正式项目规则、索引和最终报告。

请先阅读：
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/sources-to-refresh.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-b-pypto-architecture-refresh-plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-c-toolkit-runtime-data-strategy-plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-d-design-system-sync-strategy-plan.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-e-rule-consolidation-plan.md`

开始前先运行并汇报：
- `git status --short`

## Batch E 执行边界

- 不要重新 clone / refresh 外部 mirror，除非用户明确要求。
- 不要新建 demo、prototype 或视觉改造。
- 不要把任务包内容原封不动复制到正式规则；要提炼成长期可维护的 concise rules。
- 不要覆盖用户或其他 agent 的未提交改动。

## Batch E 输出

完成后请说明：

- 修改了哪些正式规则 / 索引文件
- 哪些任务包结论已毕业到正式位置
- 哪些内容保留在任务包中作为审计记录
- `final-report.md` 的位置
- 系统性升级是否可标记 complete
```
