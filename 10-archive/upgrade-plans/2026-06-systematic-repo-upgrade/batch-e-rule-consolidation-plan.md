# Batch E Rule Consolidation Plan

本文用于承载 Batch E 在执行前确认的方案、边界和完成标准。Batch E 的目标是把 Batch A-D 已稳定的 source governance、PyPTO architecture、Toolkit/data、design system sync 结论回写到正式项目规则、索引和最终报告。

## 1. Purpose

Batch E 是本次系统性升级的收束批次。

目标：

- 更新 `AGENTS.md` 中的长期项目级规则。
- 更新相关 `.agents/skills/*` 的稳定说明。
- 更新 `09-docs/01-conventions/*` 与 `09-docs/03-indexes/*`。
- 写入 `final-report.md`。
- 将任务包状态标记为 `complete` 或准备归档。

## 2. Scope

Batch E 覆盖：

- Consolidate Batch A agentic source governance.
- Consolidate Batch B `pypto-architecture` refresh and orientation hint rules.
- Consolidate Batch C `pypto-toolkit` / `pypto-data` and demo data policy.
- Consolidate Batch D design system sync, mirror and `.agents/skills/pto-design-system/` skill rules.
- Update indexes and final report.

## 3. Non-Goals

Batch E 不做：

- 不再 clone / refresh 外部 mirror，除非用户明确要求。
- 不新建 demo、prototype 或视觉改造。
- 不重写已完成 batch 的事实内容；只做稳定规则回写和索引收束。

## 4. Execution Assumptions

Batch E 执行时采用以下收束假设：

- 当前任务包中的 Batch A-D 稳定结论可毕业到正式规则。
- `AGENTS.md` 保持轻量项目级入口，不完整展开 source governance 细节。
- `final-report.md` 使用中文摘要，并附正式回写清单、审计记录边界和剩余非阻塞事项。

## 5. Implementation Checklist

- [x] 读取 `README.md`、`status.md`、`decisions.md`、`open-questions.md`、`sources-to-refresh.md` 和 Batch A-D plan。
- [x] 检查 PyPTOUX `git status --short`。
- [x] 更新 `AGENTS.md`，保留 concise project entry。
- [x] 更新必要的 `.agents/skills/*` 长期规则。
- [x] 更新 `09-docs/01-conventions/*`。
- [x] 更新 `09-docs/03-indexes/*`。
- [x] 写 `final-report.md`。
- [x] 更新 `status.md` 为 `complete` 或明确剩余阻塞。
- [x] 更新 `prompts/resume.md`，说明系统性升级已收束或剩余动作。

## 6. Definition Of Done

- Batch A-D 稳定结论已回写到正式规则或明确说明不回写原因。
- `final-report.md` 已创建。
- `status.md` 和 `prompts/resume.md` 可让新 session 正确判断任务已完成或只剩归档。
- 未覆盖用户或其他 agent 的未提交改动。

## 7. Batch E Result

状态：

- `batch_status`: `complete`
- `plan_status`: `implemented`

执行摘要：

- Batch A-D 稳定结论已回写到 `AGENTS.md`、正式 conventions、索引、source registry、相关 skills 和知识目录。
- 本轮没有重新 clone / refresh 外部 mirror。
- 本轮没有新建 demo、prototype 或视觉改造。
- `final-report.md` 已创建，用于替代任务包过程文件成为本次系统性升级的收束入口。
- 任务包保留为近期审计记录；是否归档到 `10-archive/upgrade-plans/` 留给后续用户指令。
