# Resume Prompt

用于新 session 查看本次系统性升级的完成状态。

```md
请查看 PyPTOUX 系统性升级任务包的完成状态。

任务包位置：
`09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

请先阅读：
- `README.md`
- `status.md`
- `final-report.md`
- `decisions.md`
- `open-questions.md`
- `sources-to-refresh.md`

当前状态：
- 系统性升级已完成，`status.md` 标记为 `complete`。
- Batch A: Agentic Search Governance 已完成。
- Batch B: PyPTO Architecture Refresh 已完成。
- Batch C: Toolkit And Runtime Data Strategy 已完成。
- Batch D: Design System Sync Strategy 已完成。
- Batch E: Rule Consolidation 已完成。
- `final-report.md` 是本次系统性升级的最终入口。

已毕业到正式位置的稳定结论：
- 项目级摘要规则：`AGENTS.md`
- 内容路由和仓库结构：`09-docs/01-conventions/content-routing.md`、`09-docs/01-conventions/repository-structure.md`
- source registry 和 URL Domain Mapping：`.agents/skills/pypto-knowledge-source/references/sources.md`
- PyPTO architecture orientation hints：`02-knowledge/00-shared/pypto-architecture/`
- Toolkit source governance：`02-knowledge/00-shared/pypto-toolkit/`
- PyPTO data / data level / share-safe 规则：`02-knowledge/00-shared/pypto-data/`
- PTO design system bundle：`.agents/skills/pto-design-system/`
- 索引：`09-docs/03-indexes/`

执行规则：
- 日常任务不要把本任务包当作主规则入口；优先读取正式规则、skills、知识目录和索引。
- 不要重新 clone / refresh 外部 mirror，除非用户明确要求。
- 后续如需 refresh `pypto`、`pypto-tools`、`PTO-TestData`、`pto-design-system` 或其他 mirror，先检查本地改动、确认权限并记录 snapshot。
- 后续如需归档本任务包，等待用户明确指令后再移动到 `10-archive/upgrade-plans/2026-06-systematic-repo-upgrade/`。
- 若用户只是问本次升级结果，直接读 `final-report.md` 并摘要即可。

建议回答：
先说明系统性升级已完成，再按用户问题引用 `final-report.md`、正式规则或审计记录。
```
