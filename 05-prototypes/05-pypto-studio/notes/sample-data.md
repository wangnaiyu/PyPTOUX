# Sample Data · PyPTO Studio v1

数据等级 `L3`，仅供剧本驱动的 UX demo。

## Session

```
kernel:   glm_attention.py
session:  #c4a7e21
device:   Ascend910B (虚构 demo 配置)
compile:  ✓ 1.8s
runtime:  ⚠ 2.3× baseline · cube_util 28% · vec_idle 68%
```

## 旋钮当前状态

| 旋钮 | 值 | 来历 |
|------|----|----|
| `enable_axis_fusion` | off | Pass Tracer 第一幕里被关掉了（OoOSchedule 炸过）|
| `enable_unroll` | on | 默认 |
| `mix_mode` | sequential | 默认串行 |
| `stitch_mode` | none | 默认 |
| `block_dim` | 24 | matmul shape 推导 |

## 78 lane 分组

```
AI CPU
├─ Ctrl[0]              (control flow / kernel dispatch)
└─ Sched[0..2]          (3 sched threads)
AIC (24 cores)           折叠态展示聚合热力条
AIV (48 cores)           折叠态展示聚合热力条
MTE
├─ mte_in
└─ mte_out
```

## 7 步剧本

| # | 看到 X | 怀疑 Y | 试 Z | 分支结果 |
|---|--------|--------|------|----------|
| 1 | Cube 利用率 28% / 120μs 持续 | Cube 真的在等 | 看 vec stream 同窗口 | ✓ confirmed |
| 2 | vec_0 有 80μs gap @ t=160μs | vec 不在跑 → cube 等 vec | 检查 mix_mode | ✓ |
| 3 | mix_mode=sequential | cube/vec 被强串行 | 改 mix_mode=parallel 重跑 | ▶ try |
| 4 | 改完后 cube_util 仍 36% | 假设错，不是 mix_mode | 回退假设 → 看 IR scope | ✗ refuted |
| 5 | IR: cube/vec 在不同 scope | scope 没合是因为 axis_fusion 被关了 | 🔗 跳到 Compile 看当时 AxisFusion | 跨模式 |
| 6 | Compile 模式: AxisFusion 当时炸在 OoOSchedule | stitch_mode=concat 可以绕过 OoO 问题 | axis_fusion=on + stitch_mode=concat 重编译 | ▶ try |
| 7 | 重跑: cube_util=71% / runtime 1.06× baseline | 成功 | 沉淀回 Playbook | ✓ done |

## 症状指纹候选

```
当前指纹: cube_util=28% · vec_idle=68% · mix=seq · dma=normal

候选 Playbook:
  ★ 89%  "Mix 流水阻塞"            @张明 · 47 次 · 89% 成功 · avg 8min
    62%  "Cube 单核利用率低"        @李华 · 23 次 · 74% 成功
    41%  "DMA 带宽瓶颈"             @王芳 · 12 次 · 67% 成功
```

## 沉淀回路（Contribute Back）

走完后系统检测到这次 run 有 2 个偏离原 Playbook 的点：

1. Step 4：尝试了 `mix_mode=parallel` 后被证伪（原 Playbook 在 Step 3 的"试 Z"未预测此分支会失败）
2. Step 6：发现新组合 `axis_fusion=on + stitch_mode=concat`（原 Playbook 不知道这个组合）

提示作者 @张明 是否合并此分支进 Playbook。
