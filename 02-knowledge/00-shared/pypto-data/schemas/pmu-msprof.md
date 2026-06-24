# PMU And msprof Data Notes

本文记录 PMU CSV 与 msprof trace 在 PyPTOUX 中的 schema / rules 入口。

## 1. PMU CSV

当前在 `PTO-TestData/pmu/A5G2_case1/tilefwk_prof_pmu.csv` 和本地 `20260528-a5-pmu-g2/tilefwk_prof_pmu.csv` 中可见 PMU 表格。

表头示例：

`thread id,task id,stream id,core id,seqNo,sub task id,total cycle,pmu_idc_aic_vec_busy_o,cube_instr_busy,scalar_instr_busy,mte1_instr_busy,mte2_instr_busy,mte3_instr_busy,icache_req,icache_miss,pmu_fix_instr_busy`

## 2. PMU 使用规则

- PMU CSV 适合展示硬件计数和核利用情况。
- `task id`、`seqNo`、`sub task id` 可与泳道图 / runtime 任务做关联，但需要逐数据集校验。
- 不要把 PMU counter 解释成通用性能结论；它是特定运行和特定硬件上下文下的观察。

## 3. msprof trace

`PTO-TestData/pmu/msprof_case0/` 中包含 `msprof_*.json` 与 `msprof_*_split.json`，其中 split 版本可表现为 trace event 数组。

## 4. Demo 边界

- PMU / msprof 适合做“性能解释增强层”，不一定适合作为初学者第一入口。
- 如果与 `merged_swimlane.json` 联动，应明确哪个字段承担 join key，不能只凭时间相近推断。
