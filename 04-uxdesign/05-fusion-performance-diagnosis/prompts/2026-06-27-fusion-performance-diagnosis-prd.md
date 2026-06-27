# Fusion Performance Diagnosis PRD 复合 Prompt

## 目标

基于以下两份既有研究材料，生成一份中文阅读型 HTML PRD，落在 `04-uxdesign/05-fusion-performance-diagnosis/prd.html`：

- `04-uxdesign/05-fusion-performance-diagnosis/ux-analysis.html`
- `03-insights/01-fusion-performance-diagnosis/competitive-analysis.html`

PRD 需要把 issue #2141 触发的慢 task、UB pressure、spill-like、额外 GM/UB 搬运、等待和流水利用率观测诉求，转化为 PyPTO Toolkit 的 Fusion Performance Diagnosis 产品需求。

## 路由与输出约束

- 使用 `pyptoux-content-router`。
- 这是正式设计输出 / 阅读型 HTML 报告，放在 `04-uxdesign/05-fusion-performance-diagnosis/`。
- 不触发 `pto-design-system`，不做 app、workbench、dashboard 或 prototype 风格。
- 正文优先中文；路径、文件名、字段名、trace key 保持英文或上游 literal。
- 需要同步维护 `prompts/` 与 `notes/`。

## 内容口径

PRD 应强调：

- 产品不是 Memory Viewer，也不是大而全 Trace Viewer，而是性能诊断入口。
- 核心价值是把“看见慢 task”翻译为“根因假设、证据强度、下一步 PyPTO 修改动作、复跑验证指标”。
- 目标用户是 PyPTO / CANN 高阶融合算子开发与性能调优用户。
- 非目标用户包括 PyPTO 入门用户、纯算法研究者、应用层调用方和平台管理视角。
- 设计原则包括：先归因再下钻、痛点绑定动作、建议必须可验证。
- 诊断输出必须显式区分 evidence level，缺证据时降级表达。

## 建议结构

1. 产品判断
2. 背景与问题
3. 目标用户
4. 目标与非目标
5. 分期范围
6. 目标体验
7. 功能需求
8. 数据需求与诊断契约
9. 成功指标与验收标准
10. 风险与开放问题
11. 输入依据

## 关键需求

- `FR-01` 运行产物自动绑定：识别同轮 `merged_swimlane.json`、`program.json`、计算图、PMU 文件与源码映射状态。
- `FR-02` Top abnormal tasks / wraps：展示 duration、severity、bottleneck type、evidence level。
- `FR-03` 分段泳道图：compute、memory move、wait、unaccounted。
- `FR-04` Memory Pressure 下钻：live memory、UB headroom、extra GM/UB movement、copy edge、Top contributors。
- `FR-05` Wait Chain 下钻：predecessor wait、schedule wait、sync wait、resource / uncovered gap。
- `FR-06` Pipeline Balance 诊断：AIC / AIV / MTE / FixPipe / Scalar，PMU group 诊断镜头。
- `FR-07` 源码与产物联动：`program.json`、计算图节点、源码位置，保留 `rootHash`、`callOpMagic`、`leafHash` 等 literal。
- `FR-08` Before / After 诊断对比：run id、task identity matching、metric delta、diagnosis delta。

## 分期口径

- `P0`：Diagnosis Overview、Top abnormal tasks、Segmented Swimlane、Memory Pressure。
- `P1`：Wait Chain、Pipeline Balance by PMU group。
- `P2`：源码 / 计算图 / program 联动、Before / After 自动对比。

## 验收重点

- P0 完成后，用户可以完成一次“慢 task -> 内存证据 -> 调参方向”的诊断。
- P1 完成后，用户可以区分 memory movement、wait chain 与 pipeline imbalance。
- P2 完成后，用户可以把诊断跳回源码 / 计算图 / `program.json`，并通过两轮运行对比验证动作效果。
