# Swimlane TraceEvents Schema Notes

本文记录 `merged_swimlane.json`、msprof split trace 和其他 Chrome Trace / Perfetto 风格泳道图数据的使用规则。

## 1. 适用范围

当前已观测到两类常见形态：

- 对象形态：顶层为 `{ "traceEvents": [...] }`，例如 `merged_swimlane.json`。
- 数组形态：顶层直接是 event 数组，例如部分 `msprof_*_split.json`。

两者都可被视为 trace events 数据，但进入 PyPTOUX demo 或 schema 说明时应保留原始形态。

## 2. 基础事件字段

常见字段包括：

- `name`
- `ph`
- `pid`
- `tid`
- `ts`
- `dur`
- `cat`
- `args`

常见 `ph`：

- `M`：metadata，例如 `process_name`、`thread_name`
- `X`：duration event，表示一个任务或阶段持续时间
- `s` / `f`：flow 起点 / 终点，常见于 Mix 转换结果

## 3. `args` 中的 PyPTO 关联字段

在 three-column / swimlane 数据中，`args` 常见：

- `event-hint`
- `execution-hint`
- `ioperand-hint`
- `ooperand-hint`
- `color`
- `taskId`
- `seqNo`

`event-hint` 中最关键的 literal 是：

- `rootHash`
- `callOpMagic`
- `leafHash`
- `TaskId`

这些字段用于从泳道图事件跳回 Execute Graph、CALL op 和 Block Graph。

## 4. AICPU / msprof 变体

`PTO-TestData/aicpu/1.7M/merged_swimlane.json` 中可见 AICPU 视图事件，例如 `AICPU View`、`AICPU-CTRL`、`AICPU-SCHED`。

`PTO-TestData/pmu/msprof_case0/msprof_20260527091521_split.json` 是数组形态 trace，适合作为 msprof / Perfetto 类数据的 schema 参考。

## 5. 使用规则

- 展示时保留原始 `pid` / `tid` / `ph` / `ts` / `dur`。
- 解释 PyPTO 跳图时优先使用 `event-hint`，不要只靠事件名猜测。
- 如果事件名括号内含 semantic label，可作为用户可读标签；但映射关系仍应回 `event-hint`、`program.json` 或 `dyn_topo.txt` 校验。
