# Batch B PyPTO Architecture Refresh Plan

本文用于承载 Batch B 在执行前确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `02-knowledge/00-shared/pypto-architecture/`、相关 `.agents/skills/*`、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch B 的目标是刷新 `02-knowledge/00-shared/pypto-architecture/`，使其反映当前 `pypto` 仓库状态，并让后续 agent 把该目录作为 `orientation_hints` 使用，而不是把旧 overview 当作当前事实来源。

## 2. Workflow Gate

Batch B 分三段推进：

1. Preflight 讨论阶段：确认 refresh 权限、本地镜像状态、snapshot 记录方式、`overview.md` 的信息密度和输出边界。
2. Plan 确认阶段：审计旧 `pypto-architecture`、制定 refresh 方案、识别阻塞问题，并将确认方案写入本文。
3. `/goal` 执行阶段：按本文确认的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应直接 refresh `pypto` 或重写 `02-knowledge/00-shared/pypto-architecture/`。

## 3. Scope

Batch B 覆盖：

- 检查 `pypto` 本地镜像状态。
- 遵守 refresh 频率和未提交改动保护。
- 记录 snapshot 日期、分支、commit。
- 更新 `02-knowledge/00-shared/pypto-architecture/overview.md`。
- 更新 `02-knowledge/00-shared/pypto-architecture/sources.md`。
- 更新 `02-knowledge/00-shared/pypto-architecture/drift.md`。
- 审计依赖旧 `pypto-architecture` hint 的 skills、规则或任务包说明。

## 4. Non-Goals

Batch B 不做：

- 不纳入 `pypto-tools` mirror / adapter / demo 使用策略，该工作归 Batch C。
- 不建立运行数据或 toolkit 设计稿 intake，该工作归 Batch C。
- 不同步 `yinyucheng0601/pto-design-system`，该工作归 Batch D。
- 不开始 demo build、prototype build 或 design system sync。
- 不把 `pypto-architecture` 恢复成唯一 source routing 入口；它只能作为 orientation hints。

## 5. Preflight Questions

开始 Batch B 前必须先确认：

- 是否允许对 `pypto` 本地镜像执行 `git fetch` / `git pull`，还是只读取当前 checkout？
- 本地 `pypto` 镜像是否可能存在需要保留的未提交改动？是否需要先检查并汇报？
- `overview.md` 应偏“检索地图 / orientation hints”，还是保留一定“架构理解正文”？
- snapshot 元数据记录到哪里：仅 `sources.md`，还是 `overview.md` 和 `sources.md` 都记录？
- 如果本地镜像无法 refresh，是否允许用线上单点 freshness backup 辅助判断 drift？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 `pypto-architecture` audit 结论。
- refresh / no-refresh 决策和证据。
- snapshot 记录格式。
- `overview.md` 信息架构。
- `sources.md` 和 `drift.md` 更新规则。
- 依赖旧 architecture hint 的文件清单和处理策略。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch B 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch B 方案。
- `pypto` snapshot 日期、分支、commit 或 no-refresh 原因已经记录。
- `02-knowledge/00-shared/pypto-architecture/overview.md` 已更新为当前可用的 orientation hints / 架构理解。
- `02-knowledge/00-shared/pypto-architecture/sources.md` 已记录本轮 source、snapshot、refresh 和引用边界。
- `02-knowledge/00-shared/pypto-architecture/drift.md` 已记录旧 overview 与当前 source 的 drift 判断。
- 依赖旧 `pypto-architecture` 的 skills / 规则已审计并按需更新。
- 未越过 Batch B 边界：未启动 Batch C/D，未写入私有原始材料，未开始 demo build 或 design system sync。
- 已按 checkpoint 规则更新必要文件：`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`status.md`、`prompts/resume.md`。

## 8. Confirmed Design

状态：

- `batch_status`: `pending`
- `plan_status`: `needs-preflight-discussion`

本节由 Batch B preflight / Plan 确认阶段填写。确认前不要把本文件当作已批准实施方案。

### Audit Findings

待填写。

### Refresh Strategy

待填写。

### Snapshot Metadata

待填写。

### Overview Structure

待填写。

### Sources And Drift Rules

待填写。

### Dependent Files

待填写。

### User Decisions Needed

待填写。

### Implementation Checklist

待填写。
