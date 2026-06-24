# Dataset: A5 PMU G2

本文记录本地 `20260528-a5-pmu-g2` 数据集的定位和可用素材。

## 1. 基本信息

| 项目 | 内容 |
| --- | --- |
| source instance | `pypto-sample-dataset` |
| 数据集路径 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/20260528-a5-pmu-g2` |
| 当前已见文件 | `merged_swimlane.json`, `msprof_20260529151453.json`, `tilefwk_prof_pmu.csv` |
| 数据角色 | `runtime-observed` |
| 默认数据等级 | L1 |
| 最适合用途 | A5 PMU、msprof、泳道图性能说明 |

## 2. 素材定位

- `merged_swimlane.json`：泳道图 / traceEvents 入口。
- `msprof_20260529151453.json`：msprof trace 证据。
- `tilefwk_prof_pmu.csv`：PMU counter 表格。

## 3. 使用边界

- 这套数据更适合做性能说明，不适合作为三栏联动的第一选择。
- PMU counter 不能直接推广为通用性能结论；必须保留硬件、运行和 source 上下文。
- 若要与图节点或源码联动，需要额外确认 join key，不能只凭时间相近推断。
