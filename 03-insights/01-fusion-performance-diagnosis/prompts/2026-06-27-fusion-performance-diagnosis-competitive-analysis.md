# 复合 Prompt：融合算子性能诊断竞品分析

## 目标

从资深 PTO 算子开发专家和 PyPTO 产品经理视角，围绕“融合算子慢 task 的可行动根因诊断”形成一份阅读型 HTML 竞品分析报告。报告要回答：如何设计“额外搬运 / 等待 / 流水利用率”的观测体验，并把 Chrome DevTools Performance、Nsight Systems、Nsight Compute、PyTorch Profiler、Perfetto 等产品模式转译到 PyPTO Toolkit。

## 业务输入

- 触发来源：GitCode `cann/pypto` issue `#2141`。
- 证据边界：GitCode issue 页面为 SPA，未登录或无前端 API 上下文时无法稳定读取 raw issue body；正文应明确说明这一边界。
- 已沉淀 issue 诉求：UB pressure、spill-like 行为、额外 GM/UB movement、同步或调度等待、pipeline utilization 观测不足。
- 业务目标：不要把问题收窄成“Memory Viewer”，而应上升为“Fusion Performance Diagnosis”，即从慢 task 发现、区间选择、归因解释、源码或图节点下钻、复跑验证形成闭环。

## 必用材料

- PyPTOUX / PyPTO 本地证据：
  - `tools/profiling/draw_swim_lane.py` 中 `TaskInfo` 的 task timing、wrap、operand、sync、pipe cycle/time 相关字段。
  - `tools/profiling/tilefwk_pmu_to_csv.py` 中 PMU event group 与 pipeline / memory / conflict / L2 counter 相关字段。
  - `tools/schema/schema_memory_check.py` 中 `TraceCopy`、`TraceLeafTask.copy_in_list`、`copy_out_list`、memory range 相关逻辑。
- 真实竞品来源：
  - NVIDIA Nsight Systems User Guide。
  - NVIDIA Nsight Compute Profiling Guide。
  - Chrome DevTools Performance reference。
  - PyTorch Profiler 文档。
  - Perfetto UI 文档。
- 用户上传的 Chrome DevTools Performance 截图：用于深入分析 overview + screenshots + tracks + summary 的时间轴体验。

## 报告结构

1. 用 bullet points 简洁说明本次竞品研究要回答的关键问题。
2. 分析 issue 暴露的业务本质：慢 task 的根因证据不足，而不是单纯缺少内存图。
3. 拆解竞品模式，优先使用真实产品图；没有真实 UI 时才用代码生成示意图，并在图注标明。
4. 深入展开 Chrome DevTools Performance 的启发：
   - overview 是选择入口，不只是装饰。
   - screenshots 可迁移为计算图状态、fusion graph、memory heat、wrap topology 等时间片缩略图。
   - tracks 可迁移为 Host CPU、Device CPU、AICPU、AICore、Memory、Sync/deps。
   - summary 必须随选区联动，回答“这段时间为什么慢”。
5. 分析 PyPTO Toolkit 当前真实效果与缺口：泳道已有时间与 task 结构，PMU 和 memory schema 已有数据基础，但缺少跨视图归因、时间片状态、证据强度和下一步动作。
6. 仅在“代码生成示意图：PyPTO 目标态”部分使用 PTO design system 风格，模拟目标态 UI；其余报告使用 Codex 原生阅读型 HTML。
7. 示意融合 AICPU / AICore / Memory 的泳道图如何设计：
   - 顶部 overview 承载全局性能曲线。
   - filmstrip 承载时间片状态截图。
   - 下方 process-fused lanes 承载 AICPU、AICore、Memory、Sync。
   - 选中任意 task 或区间后，右侧给出因果解释、证据字段和下一步动作。

## 输出与目录

- topic 目录：`03-insights/01-fusion-performance-diagnosis/`
- 主报告：`competitive-analysis.html`
- 伴随记录：
  - `notes/update-YYYY-MM-DD.md`
  - `prompts/YYYY-MM-DD-fusion-performance-diagnosis-competitive-analysis.md`
- 暂不新增 `overview.md` 与 `sources.md`，除非用户后续要求；当前报告底部保留 sources。

## 写作约束

- 中文正文，英文路径、字段名、产品名、trace key 保持原样。
- 不把 L2 / 自编示意数据伪装成真实运行结果。
- 报告标题字号要克制，不做夸张 landing page。
- 阅读型 HTML 不套完整 app/workbench 风格；只有目标态示意图区域可以使用 PTO 风格。
