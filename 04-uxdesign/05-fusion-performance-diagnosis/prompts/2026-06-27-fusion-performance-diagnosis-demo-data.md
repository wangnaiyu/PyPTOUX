# Fusion Performance Diagnosis Demo Data 复合 Prompt

## 目标

为 `04-uxdesign/05-fusion-performance-diagnosis/` 生成一条符合 issue #2141 场景的 demo story，并按 PyPTO data source / schema 构造尽量真实、可追溯、可外发的 demo 数据。

## 使用技能

- `pypto-knowledge-source`：确认 source registry、数据等级、A5 / Ascend 950 与 PyPTO / CANN claim 边界。
- `pypto-demo-data-filling`：按 PyPTO data schema、样例数据和 demo material 规则生成数据。
- `pyptoux-content-router`：确认故事和数据脚本落在 `04-uxdesign/05-fusion-performance-diagnosis/`。

## 关键约束

- 不触发 `pto-design-system`，本轮只生成故事与数据脚本，不做前端原型。
- 原始 L1 数据不得直接标为 `share-safe`。
- 本轮生成数据应标注为 `L2 / schema-generated / share-safe`，不能伪装成真实运行结果。
- 字段名、trace key 和 PyPTO literal 保持原样，例如 `merged_swimlane.json`、`program.json`、`traceEvents`、`event-hint`、`rootHash`、`callOpMagic`、`leafHash`、`wrapId`、`syncEvents`。
- 泳道数量按 A5 / Ascend 950 单 die 口径真实展开：18 个 core cluster，每个 cluster 1 条 AIC + 2 条 AIV，共 54 条硬件执行泳道。

## Source Basis

- `02-knowledge/00-shared/pypto-data/schemas/swimlane-trace-events.md`
- `02-knowledge/00-shared/pypto-data/schemas/pmu-msprof.md`
- `02-knowledge/00-shared/pypto-data/schemas/mix-sync-events.md`
- `02-knowledge/00-shared/pypto-data/schemas/dyn-topo.md`
- `02-knowledge/00-shared/pypto-data/datasets/a5-pmu-g2.md`
- `02-knowledge/00-shared/ascend-a5-950-hardware/overview.md`
- `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa/docs/reference/pto-cvid-cluster-id-mapping.md`

## 输出文件

- `notes/story-2026-06-27.md`：故事场景、用户旅程、诊断闭环、数据等级声明。
- `demo-data-script.py`：可复跑的数据生成脚本。
- `fusion-diagnosis-a5-demo-data.json`：脚本生成的 L2 demo 数据。
- `notes/update-2026-06-27.md`：追加本轮更新记录。

## 故事口径

故事围绕一个高阶 PyPTO / CANN 融合性能工程师优化 `interleave_rope_attention_fuse`：

1. 用户启用 `runtime_debug_mode`，运行后得到可诊断上下文。
2. Diagnosis Overview 发现 `wrapId = 7` 的 `A5D0C07V0-T023` 是 Top abnormal task。
3. 泳道图完整展示 A5 单 die 54 条硬件执行泳道。
4. 分段解释慢 task：compute / memory move / wait / unaccounted。
5. Memory Pressure 面板展示 demo UB threshold、peak live bytes、headroom、extra GM/UB bytes 和 Top contributors。
6. Wait Chain 面板展示 `CV_SYNC_WAIT` / `CV_SYNC_SET` 与 peer AIC。
7. 建议用户调小 K/V tile 并检查 `vec_nbuffer_setting`。
8. Before / After 对比验证 task time、extra GM/UB movement、UB headroom、wait ratio 改善。

## 数据口径

`fusion-diagnosis-a5-demo-data.json` 至少包含：

- `version`
- `dataLevel`
- `dataRole`
- `shareSafe`
- `scenario`
- `sourceBasis`
- `hardware`
- `lanes`
- `diagnosisSummary`
- `traceEvents`
- `pmuRows`
- `dynTopoRows`
- `memoryPressure`
- `waitChain`
- `recommendations`
- `beforeAfter`

其中 `lanes` 必须有 54 条；`traceEvents` 至少包含 54 条 duration event 加全部 lane 的 metadata event；`pmuRows` 与 duration event 数量一致。
