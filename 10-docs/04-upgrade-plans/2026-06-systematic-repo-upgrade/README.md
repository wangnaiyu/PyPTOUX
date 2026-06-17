# PyPTOUX 系统性升级任务包

## 1. 任务定位

本目录用于承载 PyPTOUX 仓库的一次跨 session、跨目录、跨 agent 的系统性升级工作。

本任务包不是最终知识库，也不是正式长期规则本身；它是 active workbench，用于保存：

- 当前目标和批次计划
- 每个 session 的进度状态
- 已确认决策和未确认问题
- 外部知识源刷新清单
- 可直接用于新 session 续作的 prompt

稳定结论最终应回写到正式位置，例如 `AGENTS.md`、`.agents/skills/*`、`02-knowledge/00-shared/*`、`07-designsystem/*` 和 `10-docs/03-indexes/*`。

## 2. Owner

- 总体 owner：Codex
- 状态维护 owner：Codex
- 用户决策 owner：User
- Claude 协作方式：可读取本目录，可在用户要求时提供 review 或原型侧补充；默认不直接改 `decisions.md`、`plan.md`、`status.md` 等核心任务控制文件。

如后续需要改变 owner 边界，先记录到 `decisions.md`，再视情况同步到 `10-docs/01-conventions/dual-agent-collaboration.md`。

## 3. 当前目标

本次系统升级围绕六类问题：

1. 更新 `02-knowledge/00-shared/pypto-architecture`，使其反映当前 `pypto` 仓库状态，并同步依赖它的 skills。
2. 建立 `.agents/skills/pto-design-system` 从上游 `yinyucheng0601/pto-design-system` 手动更新的方式，并判断 `07-designsystem/` 应吸收哪些稳定内容。
3. 将私有 `pypto-tools` 仓库纳入 source governance，服务后续 demo 演进。
4. 建立 pypto 算子运行数据和 toolkit 设计稿源文件的 intake、分级、脱敏、引用规则。
5. 优化 `pypto-knowledge-source`，让 Codex / Claude 更稳定地主动查询已登记外部来源。
6. 更新新增、过时、降级或屏蔽的知识源及相关项目规则。

## 4. 文件说明

- `plan.md`：批次路线图，说明每个 batch 的目标、输入、输出和完成标准。
- `status.md`：每次 checkpoint 更新的进度表。
- `decisions.md`：已经确认的决策和原因。
- `open-questions.md`：等待用户判断或需要进一步确认的问题。
- `sources-to-refresh.md`：外部源、优先级、刷新状态和处理策略。
- `batch-a-agentic-search-governance-plan.md`：Batch A 在 Plan 模式中确认的方案、实施边界和 `/goal` Definition of Done。
- `batch-b-pypto-architecture-refresh-plan.md`：Batch B 在启动前讨论和 Plan 模式中确认的方案、实施边界和 `/goal` Definition of Done。
- `batch-c-toolkit-runtime-data-strategy-plan.md`：Batch C 在启动前讨论和 Plan 模式中确认的方案、实施边界和 `/goal` Definition of Done。
- `prompts/resume.md`：新 session 续作时优先使用的通用 prompt。
- `prompts/batch-a-source-governance.md`：正式启动 Batch A 时使用的 prompt。
- `prompts/batch-b-pypto-architecture-refresh.md`：正式启动 Batch B 时使用的 prompt。
- `prompts/batch-c-toolkit-runtime-data-strategy.md`：正式启动 Batch C 时使用的 prompt。

## 5. 新 Session 如何继续

### 5.1 通用恢复方式

新建 session 后，推荐直接发送下面这段 prompt：

```md
请继续 PyPTOUX 系统性升级任务。

先阅读：
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/README.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/open-questions.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md`
- `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/prompts/resume.md`

然后根据 `status.md` 的 Next Step 继续，不要从头重做。
```

### 5.2 Prompt 选择规则

- 不确定当前做到哪里：使用 `prompts/resume.md`。
- 只是想恢复上下文、让 agent 判断下一步：使用 `prompts/resume.md`。
- 已经明确要启动某个 batch：使用对应 batch prompt，例如 `prompts/batch-a-source-governance.md` 或 `prompts/batch-b-pypto-architecture-refresh.md`。
- Batch C 使用 `prompts/batch-c-toolkit-runtime-data-strategy.md`。
- 最稳做法：先使用 `prompts/resume.md`，等 agent 汇报当前状态后，再要求继续执行某个 batch prompt。

也可以直接使用组合句：

```md
请先按 `prompts/resume.md` 恢复上下文；如果确认当前状态适合启动 `<Batch 名称>`，再继续执行对应 batch prompt。
```

## 6. Checkpoint 规则

Agent 不能自动判断用户何时会结束一个 session，因此本任务包不依赖“session 结束前”这个隐含时点。

改用 checkpoint 规则：只要本轮工作产生了会影响后续恢复的状态变化，就更新任务包。

### 6.1 每轮开始动作

每轮开始时：

1. 确认当前工作目录是 PyPTOUX 仓库。
2. 读取本目录的 `README.md`、`status.md`、`decisions.md`、`open-questions.md`。
3. 根据 `status.md` 的 `Current Focus` 和 `Next Step` 继续。
4. 如果任务涉及新增或移动内容，使用 `pyptoux-content-router`。
5. 如果任务涉及业务知识源，使用 `pypto-knowledge-source`。
6. 如果任务涉及 demo 真实素材，使用 `pypto-demo-data-filling`。
7. 如果任务涉及 PTO 前端风格或设计系统，使用 `pto-design-system`。

### 6.2 触发 checkpoint 的时机

出现以下任一情况时，执行 checkpoint：

- 完成一个 batch。
- 完成一个会影响后续恢复的子任务。
- 修改了任务计划、决策、source 状态或开放问题。
- 发现新的阻塞、风险或需要用户判断的问题。
- 用户明确说“本轮收尾”、“准备换 session”、“更新状态”、“到这里先停”。

### 6.3 Batch Handoff Gate

完成任一 batch 后，必须为下一 batch 准备 handoff 信息，除非整个系统性升级已经完成：

1. 确认下一 batch 是否已有 `prompts/batch-*.md`。
2. 确认下一 batch 是否已有 `batch-*-plan.md`。
3. 在 `status.md` 中更新：
   - `next_batch_prompt`: `exists` / `missing`
   - `next_batch_plan`: `exists` / `missing`
   - `next_batch_gate`: `discuss-first` / `goal-ready` / `blocked`
4. 如果下一 batch 需要用户先判断，必须在 `open-questions.md` 中新增或提升为 “启动前必须确认”。
5. 如果缺少下一 batch prompt 或 plan shell，先补齐，不要只依赖通用 `prompts/resume.md`。

### 6.4 Checkpoint 动作

1. 更新 `status.md`。
2. 如有新决策，更新 `decisions.md`。
3. 如有新阻塞，更新 `open-questions.md`。
4. 如有 source 状态变化，更新 `sources-to-refresh.md`。
5. 按 Batch Handoff Gate 准备下一 batch prompt 和 plan shell。
6. 更新 `prompts/resume.md`，让下一次 session 可以继续。
7. 最终回答里简要说明本轮改了哪些文件、下一步是什么。

## 7. 生命周期

- `active`：任务仍在推进，目录保留在 `10-docs/04-upgrade-plans/`。
- `complete`：所有稳定结论已经回写到正式位置，目录保留为近期审计记录。
- `archived`：任务完成且不再需要日常检索时，整体移动到 `11-archive/upgrade-plans/2026-06-systematic-repo-upgrade/`。

归档前必须确认：

- `status.md` 标记为 `complete`
- 已写 `final-report.md`
- 关键规则已回写到正式目录
- `10-docs/03-indexes/*` 已同步
