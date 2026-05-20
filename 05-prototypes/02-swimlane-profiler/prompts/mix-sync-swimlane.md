# Prompt — mix-sync-swimlane.html

## 来源
- 课题：`04-uxdesign/02-swimlane-profiler/ux-analysis.md`（PyPTO Issue #1121）
- 用户指令：基于 ux-analysis 做一个 PTO 风格 HTML 原型，输出到
  `05-prototypes/02-swimlane-profiler/experiments/html/`。

## 硬性要求
1. 泳道真实、不简化。泳道数量与默认顺序：
   `1 AI CPU Ctrl + 3 AI CPU Sched + 24 AIC + 48 AIV + mte_in + mte_out`（共 78 条），
   默认按 `AI CPU → AIC → AIV → MTE` 顺序显示。
2. 填充数据可合理编造，但要有逻辑与依据，整体合理。

## 产出
- `experiments/html/mix-sync-swimlane.html`（单文件，self-contained）

## 实现要点
- 设计系统：复用 `.agents/skills/pto-design-system`
  - 内联固化 `tokens/foundation|semantic|components.css`、`css/style.css` 组件子集
    （`.btn` / `.btn-solid` / `.btn-ghost` / `.segmented-control` / `.stat-chip`）。
  - task bar 经 `patterns/swimlane-task/pattern.js` 的 `PtoSwimlaneTaskPattern.drawTaskBar`
    渲染，未本地重写 segment / alpha / 字体阈值。
- 已实现的 UX 分析项：
  - P0 task bar 计算段 / 同步等待段区分（pattern bar + 斜纹等待段）
  - P0 同一 mix group 颜色统一
  - P1 经典 ↔ Mix 双视图：
    - 经典顺序 `AI CPU → AIC → AIV → MTE`
    - Mix 顺序 `AI CPU → Wrap(1C2V: AIC + 两 AIV) → MTE`，泳道按 wrap 重排
  - P1 mix 模式：连续 12 行 group 染色带 + 圆角虚线框
  - P1 核间同步弧线，按下钻层级渐进显示（概览不画 → 子图中等 → wrap/task 强）
  - P2 「概览 → 子图 → Wrap → Task」四级下钻 + 面包屑导航
  - P2 hover tooltip、inspector（计算/等待拆解 + 同步事件 + 优化建议）
  - “只看同步路径”过滤、迭代 barrier 竖线、缩放、「下钻到瓶颈 Wrap」引导

## 数据剧本（迭代二）
- 3 次迭代解码层 × 6 mix 子图 × 24 个 1C2V wrap。
- 植入瓶颈：`Attention Score` 子图的 `Wrap 06`，AIC 跑超大 BMM（K 未切分），
  配对两个 AIV 长时间 stall；同组其他 wrap 早完空转 → 负载不均。
- 未实现：双击展开核内流水（P2）、关键路径高亮 / 同步线虚拟化（P3）。

## 数据等级
- `L3-placeholder` / `exploration-only`：见 `notes/build-2026-05-20.md`。
</content>
