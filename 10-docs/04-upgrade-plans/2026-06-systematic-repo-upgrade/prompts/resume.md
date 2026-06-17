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

然后根据 `status.md` 的 `Current Focus` 和 `Next Step` 继续，不要从头重做。

当前状态：
- Batch 0 已完成。
- Batch A: Agentic Search Governance 已完成。
- Batch B prompt 和 plan shell 已准备。
- 下一步是 Batch B: PyPTO Architecture Refresh 的 preflight 讨论。

执行规则：
- 开始前先确认 `git status --short`。
- 如果要新增或移动内容，使用 `pyptoux-content-router`。
- 如果要更新业务知识源，使用 `pypto-knowledge-source`。
- 如果要处理 demo 真实素材，使用 `pypto-demo-data-filling`。
- 如果要处理 PTO 视觉规范或前端原型，使用 `pto-design-system`。
- Batch A 已把 `pypto-knowledge-source` 升级为 agentic search governance；后续 source 检索应按 Intent Mode / Output Mode / evidence strategy / claim verification 流程执行。
- Batch B 需要刷新 `pypto` 本地镜像并更新 `02-knowledge/00-shared/pypto-architecture/`，但开始前必须先按 `prompts/batch-b-pypto-architecture-refresh.md` 与用户确认 preflight 问题。
- `status.md` 中的 next batch gate 为 `discuss-first` 时，不要直接执行 `/goal` 或 refresh。
- 不要猜测 session 何时结束；只在完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时执行 checkpoint。
- Checkpoint 时更新 `status.md`；如有新决策更新 `decisions.md`；如有阻塞更新 `open-questions.md`；如有 source 状态变化更新 `sources-to-refresh.md`；完成任一 batch 后准备下一 batch prompt 和 plan shell；最后更新本 resume prompt。

请先报告你读到的当前状态和建议的下一步，然后继续执行。
```
