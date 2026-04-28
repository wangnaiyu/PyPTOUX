# A5 / Ascend 950 硬件架构 Meta

## Keywords

- A5
- Ascend 950
- 950PR
- 950DT
- Cube-Vector fused path
- NDDMA
- BufferID
- UnifiedBus
- URMA
- CCU
- Mix task
- AIC / AIV
- data flow
- instruction flow
- DAV_3510
- MixSubgraphSplit
- CV_SYNC_WAIT
- CV_SYNC_SET
- Toolkit
- impact report

## Related Paths

- `02-knowledge/00-shared/ascend-a5-950-hardware/a5-950-pypto-impact-report.md`
- `02-knowledge/00-shared/ascend-aicore-hardware/overview.md`
- `02-knowledge/02-swimlane-profiler/overview.md`
- `04-uxdesign/03-ascend-hardware-architecture/interaction-spec.md`
- `05-prototypes/02-swimlane-profiler/experiments/html/mix-task-tuning-storyboard.html`
- `05-prototypes/03-ascend-hardware-architecture/notes/sample-data.md`

## Demo Use

当前最直接的消费方是 Mix 任务调优故事板：

- 点击计算图 Execute Graph 的 `CALL` 节点，硬件区展示 950 上的粗粒度硬件路径。
- 下钻到 Block Graph 后，硬件区展示更细的 buffer / engine 级路径。
- 点击泳道图 bar 后，硬件区按 task meta 展示数据流和指令流。
- 右侧说明必须标注当前路径属于 `L2 storyboard`，而不是 950 真机 trace。
