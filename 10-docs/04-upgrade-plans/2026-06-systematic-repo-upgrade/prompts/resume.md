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
- `batch-a-agentic-search-governance-plan.md`（如果当前状态仍处于 Batch A）

然后根据 `status.md` 的 `Current Focus` 和 `Next Step` 继续，不要从头重做。

执行规则：
- 开始前先确认 `git status --short`。
- 如果要新增或移动内容，使用 `pyptoux-content-router`。
- 如果要更新业务知识源，使用 `pypto-knowledge-source`。
- 如果要处理 demo 真实素材，使用 `pypto-demo-data-filling`。
- 如果要处理 PTO 视觉规范或前端原型，使用 `pto-design-system`。
- 如果 Batch A 方案文件仍是 `pending` 或模板状态，先在 Plan 模式确认方案和 Definition of Done，不要直接修改 `.agents/skills/pypto-knowledge-source/`。
- 如果 Batch A 方案已经确认，再用 `/goal` 按 `batch-a-agentic-search-governance-plan.md` 的 Definition of Done 执行。
- 不要猜测 session 何时结束；只在完成 batch、完成影响后续恢复的子任务、修改计划/决策/source 状态/开放问题、发现阻塞，或用户明确要求收尾时执行 checkpoint。
- Checkpoint 时更新 `status.md`；如有新决策更新 `decisions.md`；如有阻塞更新 `open-questions.md`；如有 source 状态变化更新 `sources-to-refresh.md`；最后更新本 resume prompt。

请先报告你读到的当前状态和建议的下一步，然后继续执行。
```
