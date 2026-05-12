# Sample Data · A5 PMU Group 2 Loop

## 数据来源

**L3 demo · exploration-only**。全部由 `js/data/tasks.js` 用 mulberry32 种子化随机生成（seed = `20260512`，每次运行可复现）。

## 总览

- 时间轴：`0 µs – 10000 µs`
- Lane 数：78（1 AICCtrl + 3 AICSched + 24 AIC + 48 AIV + 1 MTEIn + 1 MTEOut）
- Task 总数：约 700+ 条
- 时间单位：**µs**（cycle-like counter、`total_cycle`、`clc_cycle` 均使用 µs，不使用 M）

## Wrap 配比

每个 Wrap k 包含：
- AIC k 主任务（matmul / conv / matmul_trans）
- AIV (2k-1) 主任务（vec_softmax / vec_layernorm / …）
- AIV (2k) 主任务
- 同 lane 上还会有数个填充小任务（前置 / 后置）

## 三个 critical Wrap 的手工设计

| Wrap | 设计形态 | 主任务 profile | 期望 status | dominant counter |
|---|---|---|---|---|
| W7 | C 拖尾过长，V 早结束 | `wait` (mte2-bound, clc≈55-65% of total) | wait | `mte2_instr_busy` |
| W12 | C scalar 拖尾，V 也有 mte3 等待 | `scalar-bound` (clc≈68-76% of total) | wait | `scalar_instr_busy` |
| W19 | overlap suspect（pipe 重叠或 double-count） | `overlap` (clc≈118-133% of total) | overlap | `cube_instr_busy` |

其余非 critical Wrap：profile 从 `['accounted','accounted','compute-bound','compute-bound','mte1-bound','fix-bound']` 中均匀挑选；`compute-bound` / `mte1-bound` / `fix-bound` 的 clc 范围都收紧到接近 `total`（gap < ±10%），多数会归入 `accounted`。

## AI CPU lane

- `cpu_ctrl` / `cpu_sched` 类小任务，稀疏（每 lane 约 5–15 条），无 group 2 PMU 数据。
- 仅用于让 lane 不空，并为以后 AI CPU PMU 留位置。

## MTE lane

- `mte_in`（GM → on-chip 加载）/ `mte_out`（on-chip → GM 写回）。
- 无 group 2 PMU 数据（这些 lane 属于 chip-scope 数据流，与 AIC/AIV 内部 mte1/2/3 是不同抽象层）。

## 已知 placeholder（待 Codex 替换）

- `traceLinks.rootHash` / `leafHash` / `callOpMagic`：每个 task 随机生成 hash 字符串
- `traceLinks.source.path` / `lineStart` / `lineEnd` / `hotLine`：模板路径 + 随机行号
- 硬件路径 modal 的 SVG 节点 / 边：从 `03-ascend-hardware-architecture/experiments/html/ascend-950-hardware-v1.html` 的语义简化重排
- Block Graph SVG：9 节点示意，非真实 IR 拓扑
- CALL 树：8 节点 mock 调用链

## 替换为真实数据时

只需替换 `js/data/tasks.js` 的 `LANES` / `TASKS` 数据导出和 `js/data/hw-map.js` 的 counter 元数据。`derived/`、`groups/`、`view/`、`jump/` 不需要改。

最理想是上游提供：
- `tilefwk_prof_pmu.csv` → group 2 cycle-like counter / icache 事件计数（per task）
- `merged_swimlane.json` → lane / Wrap / start / end / taskIdentity
- 一份 counter → hardware pipe / 下一次建议 group 的映射表（可作为 hw-map.js 的真实版本）
