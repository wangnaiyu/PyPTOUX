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

## 4. Plan Gate

启动 Batch E 前需要确认：

- 是否将当前任务包中的 Batch A-D 结论全部视为可毕业到正式规则。
- 是否需要对 `AGENTS.md` 做轻量摘要，还是完整展开更多 source governance 细节。
- `final-report.md` 需要中文摘要即可，还是需要附更完整的审计表。

## 5. Implementation Checklist

- [ ] 读取 `README.md`、`status.md`、`decisions.md`、`open-questions.md`、`sources-to-refresh.md` 和 Batch A-D plan。
- [ ] 检查 PyPTOUX `git status --short`。
- [ ] 更新 `AGENTS.md`，保留 concise project entry。
- [ ] 更新必要的 `.agents/skills/*` 长期规则。
- [ ] 更新 `09-docs/01-conventions/*`。
- [ ] 更新 `09-docs/03-indexes/*`。
- [ ] 写 `final-report.md`。
- [ ] 更新 `status.md` 为 `complete` 或明确剩余阻塞。
- [ ] 更新 `prompts/resume.md`，说明系统性升级已收束或剩余动作。

## 6. Definition Of Done

- Batch A-D 稳定结论已回写到正式规则或明确说明不回写原因。
- `final-report.md` 已创建。
- `status.md` 和 `prompts/resume.md` 可让新 session 正确判断任务已完成或只剩归档。
- 未覆盖用户或其他 agent 的未提交改动。
