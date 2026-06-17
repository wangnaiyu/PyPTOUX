# Batch C Toolkit And Runtime Data Strategy Plan

本文用于承载 Batch C 在执行前确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `02-knowledge/00-shared/pypto-toolkit/`、`.agents/skills/pypto-demo-data-filling/`、source registry、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch C 的目标是把 `pypto-tools`、算子运行数据、`PTO-TestData` 和 toolkit 设计稿源文件纳入 demo / runtime artifact / toolkit product source governance，明确 mirror、manifest、权限、数据等级、脱敏和可外发边界。

## 2. Workflow Gate

Batch C 分三段推进：

1. Preflight 讨论阶段：确认 source 路径、权限、mirror / manifest 策略、可引用范围和数据等级。
2. Plan 确认阶段：审计现有 `pypto-toolkit`、sample dataset、demo data filling 规则，制定 source intake 和更新方案。
3. `/goal` 执行阶段：按确认后的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应 clone / mirror `pypto-tools`、不写入原始运行数据或设计稿、不修改 demo prototype。

## 3. Scope

Batch C 覆盖：

- 判断 `pypto-tools` 是否作为 external primary source、本地 mirror、adapter source 或 manifest source。
- 更新或建立 `02-knowledge/00-shared/pypto-toolkit/` 的来源、能力和使用边界。
- 建立 pypto 算子运行数据、`PTO-TestData` 和 toolkit 设计稿源文件的 intake / manifest / 数据等级规则。
- 同步 `pypto-demo-data-filling` 中 demo 素材和 toolkit/runtime artifact 选择规则。
- 更新 source registry 和 `sources-to-refresh.md` 中 Batch C 相关 source 状态。

## 4. Non-Goals

Batch C 不做：

- 不刷新 `pypto-architecture`，该工作已由 Batch B 完成。
- 不同步 `yinyucheng0601/pto-design-system` 或投影 `07-designsystem/`，该工作归 Batch D。
- 不开始具体 demo build、prototype build 或前端视觉改造。
- 不把私有运行数据、测试数据或设计稿原始文件直接写入仓库，除非用户明确授权并确认数据等级。

## 5. Preflight Questions

开始 Batch C 前必须先确认：

- `pypto-tools` 本地镜像计划放在哪里？是否已经下载？
- `pypto-tools` 是否允许本仓库记录文件结构、schema、截图或代码片段？
- pypto 算子运行数据是否允许进入本仓库？如果允许，是原始数据、抽样数据、脱敏数据，还是只进入 manifest？
- 哪些运行数据可以标记为 `share-safe`？
- `PTO-TestData` 的数据等级、权限和可外发边界是什么？是否允许 clone 到本地 mirror？
- toolkit 设计稿源文件是否允许进入本仓库？如果设计稿不入仓，是否允许记录缩略图、截图或结构摘要？
- Batch C 是否需要先补 `02-knowledge/00-shared/pypto-toolkit/overview.md`、`sources.md`、`manifest.md` 等 canonical files？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 toolkit/runtime data source audit 结论。
- `pypto-tools` mirror / manifest 策略。
- runtime data / `PTO-TestData` / design files 的数据等级和引用边界。
- `02-knowledge/00-shared/pypto-toolkit/` 信息架构。
- `pypto-demo-data-filling` 更新范围。
- source registry 和 `sources-to-refresh.md` 更新规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch C 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch C 方案。
- `pypto-tools`、runtime data、`PTO-TestData` 和 toolkit design files 的 source 状态、access mode、claim policy、writeback policy 已明确。
- `02-knowledge/00-shared/pypto-toolkit/` 已按确认方案更新或说明 no-write 原因。
- `pypto-demo-data-filling` 已同步 demo 素材选择、数据等级和 artifact 引用规则。
- source registry、`sources-to-refresh.md`、`open-questions.md`、`status.md`、`prompts/resume.md` 已按 checkpoint 更新。
- 未越过 Batch C 边界：未启动 Batch D，未写入未经授权的私有原始材料，未开始 demo build 或 design system sync。

## 8. Confirmed Design

状态：

- `batch_status`: `pending`
- `plan_status`: `needs-preflight-discussion`

本节由 Batch C preflight / Plan 确认阶段填写。确认前不要把本文件当作已批准实施方案。

### Audit Findings

待填写。

### Source Strategy

待填写。

### Data Levels And Permissions

待填写。

### Toolkit Knowledge Structure

待填写。

### Demo Data Filling Updates

待填写。

### User Decisions Needed

待填写。

### Implementation Checklist

待填写。
