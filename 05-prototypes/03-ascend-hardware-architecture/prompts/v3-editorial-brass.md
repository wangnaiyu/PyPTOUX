# Prompt — v3 Editorial Dark · Brass on Slate

## 目标

第三轮单文件 demo，基于
[interaction-spec.md](../../../04-uxdesign/03-ascend-hardware-architecture/interaction-spec.md)
+ [review-2026-04-27.md](../../../04-uxdesign/03-ascend-hardware-architecture/notes/review-2026-04-27.md)

继续在长期 demo 探索里积累互补图元语言。和 v1（dark-tech glassmorphic）、v2（paper hatch blueprint）刻意拉开。

## 视觉关键词

`editorial dark` · `premium tech magazine` · `brass on slate`

参考精神：Bloomberg Businessweek graphic、Linear / Vercel 产品页插图、FT 数据图。

## 主张

- 不靠纹理、不靠渐变、不靠玻璃。视觉张力靠**克制 + 排版 + 单一强调色**。
- 一种唯一的高饱和强调色（**warm amber / brass**），其它一律低饱和的暖灰。
- 类型层级要像杂志：display 大粗号 + mono kicker + 极小 figure 序号注释。
- 容器与节点用极细 1px hairline + 内 1px highlight 制造"金属薄片"质感，而不是阴影。

## 调色

- bg ink: `#0e0f14`
- surface: `#16171f`
- lift:    `#1d1f29`
- card:    `#252734`
- hairline: `rgba(255,255,255,0.06)`
- hairline-strong: `rgba(255,255,255,0.14)`
- highlight: `rgba(255,255,255,0.04)`（内 1px）
- text-1: `#f3efe3`（warm ivory）
- text-2: `#a39f95`
- text-3: `#6b6960`
- text-faint: `#3f3e3a`
- accent: `#e8a948`（brass）
- accent-bright: `#ffc972`（active path）
- accent-bg: `rgba(232,169,72,0.12)`
- tier hints（低饱和、点到为止）：
  - shared: `#7a7a82`
  - aic:    `#7a96b8`
  - aiv:    `#84a896`
  - claim:  `#9c948a`

## 图元升级清单

- `node--storage`：纯色 + 8×8 tier 小色块（左上角）+ mono label + figure 序号
- `node--compute`：内 2×2 quartered 网格暗示矩阵 / 向量
- `node--control`：极小 chip，黑底金字
- `node--engine`：六边形 stamp，加细线"散热片"
- `node--claim`：低对比度 dotted 边 + claim 角标
- `edge`：1px 暗灰，active 升 2px brass + 箭头加大
- `edge__badge`：胶囊小卡，active 时填 amber-bg + 黑字
- `container`：1px hairline + 顶部"FIG.X"序号注释 + 编号标题
- `path-bar`：圆形 step number `01 → 02 → 03`，active 反白 amber

## 动画

- play 按钮：让 brass 粒子沿当前路径**有节奏地脉冲**，节奏接近"心跳"（每段中间略停顿，让用户读懂）
- 同步把底部 path-bar 的对应 step 高亮起来

## 不做

- 不引入运行时远程字体（share-safe）
- 不写 buffer 容量
- 不重复 v2 的 hatch / floorplan tick mark
- 不重复 v1 的 glass / gradient
