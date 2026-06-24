# Batch D Design System Sync Strategy Plan

本文用于承载 Batch D 在执行前确认的方案、边界和完成标准。它不是最终设计系统规则；确认后的稳定结论需要回写到 `.agents/skills/pto-design-system/`、`07-designsystem/`、source registry、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch D 的目标是建立 `yinyucheng0601/pto-design-system` 与 PyPTOUX 当前 `.agents/skills/pto-design-system`、`07-designsystem/` 之间的上游同步和本仓库投影方式。

## 2. Workflow Gate

Batch D 分三段推进：

1. Preflight 讨论阶段：确认上游 mirror / 手动 copy / 脚本同步方式、权限、投影范围和更新频率。
2. Plan 确认阶段：审计当前 `.agents/skills/pto-design-system/`、`07-designsystem/` 和相关 prototype 使用方式，制定同步与投影方案。
3. `/goal` 执行阶段：按确认后的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应 clone / fetch / mirror `yinyucheng0601/pto-design-system`，不投影 `07-designsystem/`，不重写 PTO skill，不启动原型视觉改造。

## 3. Scope

Batch D 覆盖：

- 确认 `yinyucheng0601/pto-design-system` 的同步方式。
- 设计手动触发的拉取、对比、变更报告流程。
- 明确 `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界。
- 判断哪些内容应投影进 `07-designsystem/`。
- 更新 `pto-design-system` skill 与 design system 索引。

## 4. Non-Goals

Batch D 不做：

- 不重开 Batch C 的 Toolkit / PyPTO data source 边界。
- 不构建具体 demo 或 prototype 页面，除非用户在 Batch D 之后另起任务。
- 不无确认地覆盖 `.agents/skills/pto-design-system/` 或 `07-designsystem/` 现有内容。
- 不把上游仓库全量盲目复制进 PyPTOUX。

## 5. Preflight Questions

开始 Batch D 前必须先确认：

- `yinyucheng0601/pto-design-system` 是否允许 clone 到本地 mirror？如果允许，本地 mirror 放在哪里？
- 希望采用手动触发脚本、人工 copy，还是维护上游镜像？
- `07-designsystem/` 是否只承载稳定投影，不承载 agent-facing preview 和实验 pattern？
- `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？
- 哪些内容允许投影进 `07-designsystem/`：tokens、CSS、patterns、docs、preview、screenshots、changelog？
- 设计系统同步是否需要生成 diff / change report？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 PTO design system source audit 结论。
- 上游 mirror / copy / script 策略。
- `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界。
- `07-designsystem/` 投影信息架构。
- 变更报告和同步 checklist。
- source registry 和 `sources-to-refresh.md` 更新规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch D 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch D 方案。
- `yinyucheng0601/pto-design-system` 的 source 状态、access mode、claim policy、writeback policy 已明确。
- `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界已写清楚。
- 如需投影，`07-designsystem/` 已按确认方案更新；如不投影，已说明 no-write 原因。
- source registry、`sources-to-refresh.md`、`open-questions.md`、`status.md`、`prompts/resume.md` 已按 checkpoint 更新。
- 未越过 Batch D 边界：未开始具体 demo build，未无确认地全量复制上游设计系统，未覆盖未提交工作树。

## 8. Confirmed Design

状态：

- `batch_status`: `pending`
- `plan_status`: `needs-preflight-discussion`

本节由 Batch D preflight / Plan 确认阶段填写。确认前不要把本文件当作已批准实施方案。

### Audit Findings

待填写。

### Source Strategy

待填写。

### Design System Boundaries

待填写。

### Projection Structure

待填写。

### User Decisions Needed

待填写。

### Implementation Checklist

待填写。
