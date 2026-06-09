# PyPTO Studio · Prototype Notes

## 原型目标

把"编译期失败诊断（Pass Tracer）"与"运行期性能调优引导（Perf Playbook）"统一进同一个工具
**PyPTO Studio**，两者通过同一组旋钮、同一个 kernel session 接合。重点验证：

- 把内部专家"看到 X → 怀疑 Y → 试 Z"的诊断经验沉淀为可被 msprof 直接调用的引导路径。
- 跨模式跳转（Runtime 怀疑 → 回 Compile 看 Pass 决策）作为"一个工具两个模式"的核心交互证据。
- "沉淀回路"（Contribute Back）作为 Playbook 从"专家个人经验"演进为"团队资产"的产品化兑现。

## 当前版本说明

- 路径：`experiments/v1/`
- 形态：SPA（单 index.html 入口 + 多文件代码组织），不使用页面跳转。
- 视觉与状态色复用 Pass Tracer V4（`01-inbox/PassTracer_UX_Demo_V4.html`）。
- 入口剧本：`glm_attention.py · session #c4a7e21`，Compile 已通过但 runtime 2.3× 慢。

## 数据等级

- 等级：`L3`（早期布局/剧本探索）
- 来源或推导依据：
  - 旋钮命名（`axis_fusion / unroll / mix_mode / stitch_mode`）沿用 V4 demo literal。
  - 78 lane 分组（1 AI CPU Ctrl + 3 AI CPU Sched + 24 AIC + 48 AIV + mte_in + mte_out）依据用户给定。
  - op 名、时延、利用率等具体数值为剧本驱动的构造数据。
- 待替换项：
  - 真实 msprof trace 切片（op 序列与 stream 调度时间戳）。
  - 真实 Playbook 库（作者、使用次数、成功率、症状指纹规则）。
  - 真实 IR Diff 在跨模式跳转后展示的 Pass 上下文。

## 共享形态

- 类型：`exploration-only`
- 说明：剧本与数据均为 L3 构造，仅用于内部 UX 方向校准与团队评审，不外发。

## 已验证结论

（待原型 review 后填）

## 待解决问题

- AIC[24] / AIV[48] 折叠态的"聚合利用率热力条"在密集 op 序列下的可读性。
- Contribute Back 模态的"路径对比可视化"在分支多于 2 时的复杂度上限。
- Compile 模式占位的最低信息量边界：要不要直接复用 V4 的 Pass 时间轴片段（图像或简化版）。

## 下一步

- 走完一遍 7 步剧本后，请 Codex 做数据/术语事实 review。
- 若方向通过，请 Codex 把"症状指纹 → Playbook 索引"结构化为 L2 数据规范。
- 后续可拆"调参实验"独立 tab、"性能对比视图"。

## 关联资源

- `01-inbox/PassTracer_UX_Demo_V4.html`（设计语言与同 session 的 Compile 期场景）
- `05-prototypes/02-swimlane-profiler/`（既有泳道相关探索）
- `01-inbox/pmu-swimlane-visualization/`、`01-inbox/a5-pmu-pipeline-balance/`（PMU 维度的相邻参考）
