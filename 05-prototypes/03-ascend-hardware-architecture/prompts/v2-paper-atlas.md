# Prompt — v2 Paper Atlas

## 目标

基于 [interaction-spec.md](../../../04-uxdesign/03-ascend-hardware-architecture/interaction-spec.md)
+ [review-2026-04-27.md](../../../04-uxdesign/03-ascend-hardware-architecture/notes/review-2026-04-27.md)
做第二版单文件 demo，**与 v1 dark-tech 风格刻意区别**，让长期 demo 探索能积累两套互补图元语言。

## 视觉方向

`technical atlas / engineering blueprint`：

- 暖纸色背景（off-white warm paper）
- 深墨主笔 + 单一 rust accent（active path）
- hatch / ruled 纹理用于存储单元（让 buffer 看起来像"内存"而不是色块）
- 强排版：`SF Mono` / system mono 做 literal label，sans 做正文
- 容器使用双线边框 + 顶部 ribbon label（floorplan 风）
- 边线偏 orthogonal（直角 + 一次拐弯），arrowhead 为 V 形细钩
- 不使用 v1 的玻璃 / 渐变光晕 / 霓虹高亮

## 图元清单（要求都做成可复用 primitive）

1. `node--storage`：矩形 + hatch 填充 + 左侧 tier ribbon + label/sub
2. `node--compute`：六边形 stamp + label/sub
3. `node--control`：圆角小标签（Scalar）
4. `node--engine`：方形带斜角（SDMA / URMA）
5. `edge` + `edge__badge`：直角折线 + mid-line 文字 badge（写 MTE2 / FixPipe 等 literal）
6. `container`：双线框 + 顶部带斜纹 ribbon
7. `legend`：底部状态/可信度图例
8. `path-bar`：底部步骤化路径展示（编号 + literal）
9. `detail-card`：右侧详情卡，含 status pill + 字段网格

## 状态编码

- `verified`：实线 1.5px，全饱和填充 / 强 hatch
- `partial`：实线 + 内点缀虚线，半饱和
- `claim`：dotted 1px + 60% 透明度 + sparse hatch

## 必做事实修正（落实 review-2026-04-27 P0）

- 耦合架构 Cube 路径**不画 FixPipe**
- SDMA 在画布上独立成 `verified` 通路（不归 PTO claim 名下）
- 集合通信场景拆两层：底层 `AIC→GM→AIV` 实线 verified，上层"组装/CCU"虚线 claim
- 顶部加架构副标题（耦合架构（310/910 类）/ 分离架构（910B 类）/ 950 演进）

## 必做交互

- 三视图 segmented control
- 八条场景路径列表（Vector / Cube / L0C累加 / AIC↔AIV / SDMA / PTO同步 / PTO异步 / CCU）
- claim toggle（关闭后 claim 类场景置灰）
- hover/click 节点 → 详情卡更新
- click 边 → 详情卡显示通路信息（review B4）
- play 按钮：沿当前路径 pulse 动画
- 视图切换时若当前场景在新视图不可用，自动回退到 `cube`

## 不做（保持 share-safe + 单文件克制）

- 不引入 Google Fonts 等运行时远程资源（CLAUDE.md §5）
- 不写具体 buffer 容量数字（review C1 同源）
- 不做对比模式（B6，留 backlog）
- 不做移动端断点优化（先桌面）
