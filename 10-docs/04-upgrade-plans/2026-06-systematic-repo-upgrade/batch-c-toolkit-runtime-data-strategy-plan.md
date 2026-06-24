# Batch C Toolkit And Runtime Data Strategy Plan

本文用于承载 Batch C 在执行前确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `02-knowledge/00-shared/pypto-toolkit/`、`02-knowledge/00-shared/pypto-data/`、`.agents/skills/pypto-demo-data-filling/`、source registry、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch C 的目标是把 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit 设计稿源文件纳入 demo / PyPTO data / toolkit product source governance，明确 mirror、manifest、权限、数据等级、脱敏和可外发边界。

## 2. Workflow Gate

Batch C 分三段推进：

1. Preflight 讨论阶段：确认 source 路径、权限、mirror / manifest 策略、可引用范围和数据等级。
2. Plan 确认阶段：审计现有 `pypto-toolkit`、sample dataset、demo data filling 规则，制定 source intake 和更新方案。
3. `/goal` 执行阶段：按确认后的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应 clone / mirror `pypto-tools` 或 `pypto-testdata`、不写入外部原始数据或设计稿、不修改 demo prototype。

## 3. Scope

Batch C 覆盖：

- 判断 `pypto-tools` 是否作为 external primary source、本地 mirror、adapter source 或 manifest source。
- 更新或建立 `02-knowledge/00-shared/pypto-toolkit/` 的来源、能力和使用边界，仅承接 Toolkit、`pypto-tools` 和 toolkit design inputs。
- 建立 `02-knowledge/00-shared/pypto-data/`，承接 `pypto-sample-dataset`、`pypto-testdata`、PyPTO 数据等级和 `share-safe` 规则。
- 建立 toolkit 设计稿源文件的 intake / manifest 规则。
- 同步 `pypto-demo-data-filling` 中 demo 素材和 toolkit/runtime artifact 选择规则。
- 更新 source registry 和 `sources-to-refresh.md` 中 Batch C 相关 source 状态。

## 4. Non-Goals

Batch C 不做：

- 不刷新 `pypto-architecture`，该工作已由 Batch B 完成。
- 不同步 `yinyucheng0601/pto-design-system` 或投影 `07-designsystem/`，该工作归 Batch D。
- 不开始具体 demo build、prototype build 或前端视觉改造。
- 不把未授权数据材料、测试数据或设计稿原始文件直接写入仓库，除非用户明确授权并确认数据等级。

## 5. Preflight Questions

开始 Batch C 前必须先确认：

- `pypto-tools` 本地镜像计划放在哪里？是否已经下载？
- `pypto-tools` 是否允许本仓库记录文件结构、schema、截图或代码片段？
- `pypto-sample-dataset` 的仓库写回边界是什么：只记录 manifest / 摘要 / 数据等级，还是允许抽样或脱敏后的数据进入本仓库？
- `pypto-sample-dataset` 中哪些数据集可以标记为 `share-safe`？
- `pypto-testdata` 的数据等级、权限和可外发边界是什么？是否允许 clone 到本地 mirror？
- toolkit 设计稿源文件是否允许进入本仓库？如果设计稿不入仓，是否允许记录缩略图、截图或结构摘要？
- Batch C 是否需要先补 `02-knowledge/00-shared/pypto-toolkit/overview.md`、`sources.md`、`manifest.md` 等 canonical files？PyPTO data source 是否需要独立 canonical 目录？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 toolkit / PyPTO data source audit 结论。
- `pypto-tools` mirror / manifest 策略。
- `pypto-sample-dataset` / `pypto-testdata` / design files 的数据等级和引用边界。
- `02-knowledge/00-shared/pypto-toolkit/` 与 `02-knowledge/00-shared/pypto-data/` 信息架构。
- `pypto-demo-data-filling` 更新范围。
- source registry 和 `sources-to-refresh.md` 更新规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch C 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch C 方案。
- `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit design files 的 source 状态、access mode、claim policy、writeback policy 已明确。
- `02-knowledge/00-shared/pypto-toolkit/` 和 `02-knowledge/00-shared/pypto-data/` 已按确认方案更新或说明 no-write 原因。
- `pypto-demo-data-filling` 已同步 demo 素材选择、数据等级和 artifact 引用规则。
- source registry、`sources-to-refresh.md`、`open-questions.md`、`status.md`、`prompts/resume.md` 已按 checkpoint 更新。
- 未越过 Batch C 边界：未启动 Batch D，未写入未经授权的私有原始材料，未开始 demo build 或 design system sync。

## 8. Confirmed Design

状态：

- `batch_status`: `complete`
- `plan_status`: `implemented`

本节由 Batch C preflight / Plan 确认阶段填写。确认前不要把本文件当作已批准实施方案。

### Audit Findings

- 已确认 source taxonomy：保留 `pypto-sample-dataset` 作为本地 active PyPTO data source；新增 `pypto-testdata` 指向 `https://gitcode.com/zhanghuixin/PTO-TestData`；移除泛化 source instance `pypto-runtime-data`。
- 已确认 source type rename：`runtime-artifact-source` 更名为 `pypto-data-source`，避免 agent 把“运行数据”误解为独立 source lane。
- 已确认 `pypto-toolkit` 和 `pypto-data` 知识目录均使用 canonical files：`overview.md`、`sources.md`、`manifest.md`。
- 已确认 `pypto-toolkit` 只保留 Toolkit、`pypto-tools` 和 toolkit design inputs；样例数据、测试数据、编译 / 运行产物、数据等级与 `share-safe` 规则拆到 `pypto-data`。
- 已确认原始数据或设计稿不写入 PyPTOUX；`pypto-tools` 与 `pypto-testdata` 已在用户后续要求下 clone 到本地 mirror，并记录 snapshot。

### Source Strategy

- `pypto-sample-dataset`：继续作为本地 source instance，路径为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`；后续用户放入该目录的 PyPTO 相关样例、测试或运行产物都归入本 source。
- `pypto-tools`：本地 mirror path 为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`；branch `master`，commit `5a4fae5cb574276cedb01880f649011d7f09ca61`；本仓库允许记录文件结构、schema、截图和少量代码片段。
- `pypto-testdata`：active local mirror，display name 为 `PTO-TestData`；path 为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`；branch `main`，commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`。
- `pypto-runtime-data`：不再作为 source instance 使用；新增数据材料应归入已登记 source 或后续明确的新 source instance。
- `toolkit-design-files`：原始文件不进入 PyPTOUX；本地存放地址为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件`；允许记录缩略图、截图和结构摘要。

### Data Levels And Permissions

- `pypto-sample-dataset`：仓库可写回 manifest、摘要、数据等级和 schema；允许抽样或脱敏后的数据进入本仓库。
- `pypto-sample-dataset` 的 `share-safe` 仅适用于抽样 / 脱敏后的数据，或按 schema 编造并明确标记为 L2 的数据。
- `pypto-testdata`：数据等级为 L1；权限和可外发边界同 `pypto-sample-dataset`。
- `toolkit-design-files`：原始设计稿不入仓；缩略图、截图和结构摘要可入仓，具体可外发状态需按内容判断。

### Knowledge Structure

- 更新已建立的 `02-knowledge/00-shared/pypto-toolkit/`，只保留 Toolkit、`pypto-tools` 和 toolkit design inputs。
- 新增 `02-knowledge/00-shared/pypto-data/`，承接 `pypto-sample-dataset`、`pypto-testdata`、PyPTO 数据等级和 `share-safe` 规则。
- 两个目录均使用 canonical files:
  - `overview.md`
  - `sources.md`
  - `manifest.md`
- `notes/` 与 `prompts/` 记录本轮治理更新和可复现 prompt。

### Demo Data Filling Updates

- `pypto-demo-data-filling` 需要同步 `share-safe` 规则：原始 L1 不默认可外发，只有抽样 / 脱敏或 schema-generated L2 可以标记 `share-safe`。
- Demo 填充时优先使用 L1 做真实性依据，但对外原型必须明确数据等级、来源摘要和生成 / 脱敏规则。

### User Decisions Needed

- 若后续要 refresh `pypto-tools` 或 `pypto-testdata`，需单独授权执行外部目录写入和网络访问，并记录新 snapshot。
- 若后续要将具体截图、缩略图、抽样数据或脱敏数据写入仓库，需按具体 material 再确认是否 `share-safe`。

### Implementation Checklist

- [x] Update source registry entries for `pypto-tools`, `pypto-sample-dataset`, `pypto-testdata`, and `toolkit-design-files`.
- [x] Update `pypto-demo-data-filling` with `share-safe` and writeback rules.
- [x] Update `02-knowledge/00-shared/pypto-toolkit/overview.md`.
- [x] Update `02-knowledge/00-shared/pypto-toolkit/sources.md`.
- [x] Add `02-knowledge/00-shared/pypto-toolkit/manifest.md`.
- [x] Add `pypto-toolkit` notes and reproducible prompt.
- [x] Add `02-knowledge/00-shared/pypto-data/overview.md`.
- [x] Add `02-knowledge/00-shared/pypto-data/sources.md`.
- [x] Add `02-knowledge/00-shared/pypto-data/manifest.md`.
- [x] Add `pypto-data` notes and reproducible prompt.
- [x] Update task package checkpoint files.
- [x] Clone `pypto-tools` with explicit approval and record snapshot.
- [x] Clone `pypto-testdata` with explicit approval and record snapshot.
