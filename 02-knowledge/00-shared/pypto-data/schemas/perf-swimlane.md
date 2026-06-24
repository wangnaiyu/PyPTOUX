# `perf_swimlane.json` Schema Notes

本文记录 `perf_swimlane.json` 作为 task-level runtime schema 的字段和使用规则。

## 1. 定位

`perf_swimlane.json` 是转换前的任务级运行数据。`pypto-tools` 中的转换器会把它转换成 Chrome Trace 风格的 `traceEvents`，供泳道图 / Perfetto 类视图使用。

## 2. 顶层字段

当前在 `PTO-TestData/pypto3/perf_swimlane_20260331_203156.json` 中观测到：

- `version`
- `tasks`
- `core_to_thread`
- `aicpu_scheduler_phases`
- `aicpu_orchestrator_phases`

`tasks` 是核心字段。

## 3. `tasks[*]`

当前观测到的 task 字段包括：

- `task_id`
- `func_id`
- `core_id`
- `core_type`
- `ring_id`
- `start_time_us`
- `end_time_us`
- `duration_us`
- `kernel_ready_time_us`
- `dispatch_time_us`
- `finish_time_us`
- `fanout`
- `fanout_count`

## 4. AICPU 扩展

当 task 中存在有效 `dispatch_time_us` 和 `finish_time_us` 时，可生成 AICPU 视角事件。`aicpu_scheduler_phases` 和 `aicpu_orchestrator_phases` 则用于补充调度阶段和 orchestrator 阶段。

## 5. 使用规则

- `perf_swimlane.json` 适合沉淀“转换前 schema”和 runtime task 语义。
- `merged_swimlane.json` / `traceEvents` 适合沉淀“转换后展示 schema”。
- demo 中不要混淆 task-level 字段和 trace event 字段。
