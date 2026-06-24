# Resume Prompt

用于新 session 继续本次系统性升级。

```md
请继续 PyPTOUX 系统性升级任务。

当前任务包在：
`10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/`

请先阅读：
- `README.md`
- `plan.md`
- `status.md`
- `decisions.md`
- `open-questions.md`
- `sources-to-refresh.md`
- `batch-a-agentic-search-governance-plan.md`
- `batch-b-pypto-architecture-refresh-plan.md`
- `batch-c-toolkit-runtime-data-strategy-plan.md`
- `batch-d-design-system-sync-strategy-plan.md`
- `batch-e-rule-consolidation-plan.md`

然后根据 `status.md` 的 `Current Focus` 和 `Next Step` 继续，不要从头重做。

当前状态：
- Batch 0 已完成。
- Batch A: Agentic Search Governance 已完成。
- Batch B: PyPTO Architecture Refresh 已完成。
- Batch C: Toolkit And Runtime Data Strategy 已完成。
- `pypto` 本地 mirror 已 hard sync 到 `origin/HEAD -> origin/master`，snapshot commit 为 `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`。
- `02-knowledge/00-shared/pypto-architecture/overview.md`、`sources.md`、`drift.md` 已刷新。
- 依赖旧 architecture hint 的 `AGENTS.md`、`pypto-demo-data-filling` 和 `pypto-knowledge-source` 相关文案已同步。
- Batch C 已确认并回写 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit design files 的 governance；`02-knowledge/00-shared/pypto-toolkit/` 只保留 Toolkit / `pypto-tools` / toolkit design inputs，`02-knowledge/00-shared/pypto-data/` 承接样例数据、测试数据、数据等级和 `share-safe` 规则，两者均已建立 `overview.md`、`sources.md`、`manifest.md`。
- `pypto-tools` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`，snapshot branch `master`，commit `5a4fae5cb574276cedb01880f649011d7f09ca61`。
- `PTO-TestData` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`，snapshot branch `main`，commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`。
- Batch D: Design System Sync Strategy 已完成。
- `yinyucheng0601/pto-design-system` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`，snapshot branch `main`，commit `e26a85628658fa2894aba52e95e335cf60f8dfdc`，commit date `2026-06-16T17:35:58+08:00`。
- `.agents/skills/pto-design-system/` 已按上游 stable bundle 更新，保留 PyPTOUX project integration 说明。
- `07-designsystem/` 已建立 HTML portal、token CSS、UI CSS、全部 approved pattern code、pattern overviews、source sync / change report / preview gate / changelog 文档。
- Batch E prompt 和 plan shell 已准备。

执行规则：
- 开始前先确认 `git status --short`。
- 如果要新增或移动内容，使用 `pyptoux-content-router`。
- 如果要更新业务知识源，使用 `pypto-knowledge-source`。
- 如果要处理 demo 真实素材，使用 `pypto-demo-data-filling`。
- 如果要处理 PTO 视觉规范或前端原型，使用 `pto-design-system`。
- Batch A 已把 `pypto-knowledge-source` 升级为 agentic search governance；后续 source 检索应按 Intent Mode / Output Mode / evidence strategy / claim verification 流程执行。
- Batch D 已完成；下一步启动 Batch E: Rule Consolidation，把 Batch A-D 稳定规则回写到正式项目规则、索引和 `final-report.md`。
- `status.md` 中的 next batch gate 为 `discuss-first` 时，不要直接执行 `/goal` 或 refresh。
- `status.md` 中的 next batch gate 为 `blocked` 时，先读取 `open-questions.md` 的当前阻塞，不要越过用户判断。
- 不要猜测 session 何时结束；只在完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时执行 checkpoint。
- Checkpoint 时更新 `status.md`；如有新决策更新 `decisions.md`；如有阻塞更新 `open-questions.md`；如有 source 状态变化更新 `sources-to-refresh.md`；完成任一 batch 后准备下一 batch prompt 和 plan shell；最后更新本 resume prompt。

请先报告你读到的当前状态和建议的下一步，然后继续执行。当前建议下一步：启动 Batch E preflight；不要重新 clone / refresh 外部 mirror，除非用户明确要求。
```
