# 昇腾硬件结构 Demo 交互设计说明

本文面向 Claude 后续制作前端 demo 使用。目标是把昇腾 AI Core 硬件对象、代际结构差异和关键数据搬移路径做成一个可交互、可追溯、能承载可信度标注的结构图工作台。

事实口径优先级：

1. 已核对知识库：`02-knowledge/00-shared/ascend-aicore-hardware/overview.md`
2. Claude review：`04-uxdesign/03-ascend-hardware-architecture/notes/review-2026-04-27.md`
3. Claude 调研底稿：`01-inbox/ascend-hardware-architecture-notes.md`
4. 外部文章 claim：仅用于 `URMA`、`CCU`、PTO 异步路径等待确认扩展层，不进入已验证主图

## 1. Demo 目标与用户

### 1.1 目标

- 让用户按“型号/代际”理解昇腾 AI Core：`310 / 910` 对应耦合架构，`910B / A2 / A3` 对应分离架构，`950` 作为带 claim 扩展的演进视图。
- 让用户按“场景路径”理解数据如何移动：Vector、Cube、Cube 累加、AIC/AIV 协作、SDMA 直传、PTO 同步、PTO 异步、集合通信/CCU。
- 为后续 PyPTO / CANN 相关可视化提供一张可复用的硬件底图，而不是一次性插画。
- 明确区分 `verified`、`partially verified`、`article claim`，避免把未确认的 950 能力画成强事实。

### 1.2 目标用户

| 用户 | 关注点 | 设计重点 |
| --- | --- | --- |
| 算子开发者 | `GM`、`UB`、`L1/L0`、`MTE`、`FixPipe` 对写 kernel 的影响 | 快速切换场景路径，看到数据从哪里来、到哪里去，以及 AIC/AIV 代码能访问哪些存储。 |
| 性能优化专家 | 搬运和计算能否并行、哪些路径可掩盖通信 | 路径高亮、legend、对象详情和场景兼容性要准确。 |
| 产品 / 教学用户 | 昇腾不同代际硬件结构差异 | 三张主视图有清晰对照，默认不暴露过多底层噪音。 |

## 2. 信息架构

首屏就是可交互结构图工作台，不做 marketing hero，不做介绍型落地页。

```text
+--------------------------------------------------------------------------------+
| 顶栏: Ascend Hardware Map  [耦合架构 310/910] [分离架构 910B/A2/A3] [950 演进]   |
+--------------------------------------------------------------------------------+
| 左侧控制区          | 中央硬件结构画布                                      | 右侧详情区 |
| - 型号/架构视图      | - GM / L2 / AI Core (= AIC + AIV) / IO-Die            | - 选中对象 |
| - 场景路径          | - 存储单元、计算单元、调度单元、搬运通路                 | - 归属说明 |
| - 路径播放          | - 高亮当前路径和可信度线型                              | - 可见性   |
| - 显示 claim        |                                                         | - 来源提示 |
+--------------------------------------------------------------------------------+
| 底部: 当前路径步骤条 / legend / 兼容性提示                                       |
+--------------------------------------------------------------------------------+
```

### 2.1 三张主视图

| 主视图 | 面向对象 | 必画结构 | 不要画成 |
| --- | --- | --- | --- |
| `耦合架构（310 / 910 类）` | `310 / 910` 类产品口径 | 一个 AI Core 容器内含 `Cube`、`Vector`、共享 `Scalar`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`。Cube 输出画成通用 `L0C -> UB/GM` 通路。 | 不要拆成物理独立的 `AIC` 和 `AIV`；不要出现分离架构专属 `FixPipe`。 |
| `分离架构（910B / A2 / A3 类）` | `910B / A2 / A3` 类产品口径 | 一个外框 `AI Core`，内部嵌 `AIC / Cube Core` 与 `AIV / Vector Core`；`GM` 是二者数据桥；AIC 侧有 `L1/L0/BT/FP/FixPipe`，AIV 侧有 `UB/Vector`。 | 不要把 `AI Core`、`AIC`、`AIV` 画成同级；不要画 AIC 和 AIV 的本地缓存直连。 |
| `950 演进` | 基于文章 claim 的扩展视图 | 在分离架构基础上额外显示 `URMA`、`CCU`、`IO-Die / Memory Slice` 等灰色 claim 层。 | 不要把 `URMA`、`CCU` 画成 verified 主结构。 |

分离架构默认画成 `1 AIC + N AIV` 的组合，不强行固定比例；右侧详情可提示“不同 SKU 配比不同，示意图只表达结构关系”。

### 2.2 控件

- 顶部使用 segmented control 切换三张主视图，并在标签中带型号副标题。
- 左侧使用列表或 tabs 选择场景路径：`Vector`、`Cube`、`Cube 累加`、`AIC/AIV 协作`、`GM 直传 (SDMA)`、`PTO 同步`、`PTO 异步`、`集合通信/CCU`。
- 提供 `显示 claim` toggle，默认开启但以灰色虚线显示；关闭时隐藏 `URMA`、`CCU` 和 PTO 异步 claim 路径。
- claim 关闭后，左侧 claim 类场景按钮同步置灰；hover tooltip 显示“已隐藏 claim 层，开启后可查看”。
- 提供 `路径播放` 控制：播放、暂停、重置；播放时沿当前路径逐段高亮。
- 右侧详情区展示选中对象的 `归属`、`用途`、`软件可见性 / 可分配范围`、`可信度`、`来源`。
- 可选增加 `对比模式`：左右并排显示耦合架构与分离架构，同一场景在两侧同步高亮；不存在的场景在对应侧置灰。

### 2.3 场景与视图兼容矩阵

| 场景 \ 视图 | 耦合架构 | 分离架构 | 950 演进 | fallback |
| --- | --- | --- | --- | --- |
| `Vector` | 可用 | 可用 | 可用 | 无 |
| `Cube` | 可用，但不画 `FixPipe` | 可用 | 可用 | 无 |
| `Cube 累加` | 可用 | 可用 | 可用 | 无 |
| `AIC/AIV 协作` | 置灰 | 可用 | 可用 | 从分离切到耦合时，自动切到 `Vector` 并提示“耦合架构无独立 AIC/AIV”。 |
| `GM 直传 (SDMA)` | 可用 | 可用 | 可用 | 无 |
| `PTO 同步` | 可用 | 可用 | 可用 | 无 |
| `PTO 异步` | claim | claim | claim | claim 关闭时置灰。 |
| `集合通信/CCU` | 置灰 | claim | claim | 从 950 切到耦合时，自动切到 `Cube` 并提示“该场景依赖分离/claim 扩展层”。 |

## 3. 视觉编码

### 3.1 结构色彩

- `GM / L2`：中性灰蓝，表示 AI Core 外部共享层。
- `AIC / Cube Core`：冷色系，用于矩阵计算侧；内部 `L1`、`L0A/L0B/L0C` 使用同色不同明度。
- `AIV / Vector Core`：绿色或青色系，用于向量计算侧；`UB` 使用更亮的同系色。
- `Scalar`：小尺寸中性节点，作为调度/取指单元，不抢计算单元视觉权重；耦合架构画共享 `Scalar`，分离架构在 AIC/AIV 内各画一份。
- `MTE / FixPipe`：琥珀或金色，用于搬运与随路处理。
- `SDMA`：独立 DMA 通路对象，使用实线或正常节点样式展示；“PTO 借 SDMA 做异步后端”仍是 claim 场景层。
- `URMA / CCU`：灰紫或低饱和色，配合 claim 线型，避免压过 verified 主图。

避免让界面成为单一蓝紫或单一深色主题；图面应像工程工作台，克制但足够可读。

### 3.2 可信度线型

| 可信度 | 线型 | 节点样式 | 文案 |
| --- | --- | --- | --- |
| `verified` | 实线 | 正常填充 | 已由 CANN 官方或本地 `pypto` 代码确认 |
| `partially verified` | 半实线 / 长虚实混合 | 正常填充 + 小角标 | 主路径已确认，机制细节待补充 |
| `article claim` | 虚线 | 灰化填充 | 文章 claim，待官方或源码确认 |

### 3.3 路径高亮与交互状态

- 默认图上所有通路低对比显示，当前场景路径高亮。
- 当前路径每一段显示方向箭头；箭头文案使用 literal，如 `MTE2`、`MTE1`、`FixPipe`。
- 播放时按路径顺序点亮：存储节点 -> 搬运通路 -> 计算单元 -> 输出节点。
- hover 任意通路时，高亮相关起点、终点和右侧详情卡。
- 状态优先级：`playing 当前步骤` > `selected 对象/通路` > `hover` > `当前场景路径` > `默认底图`。
- 播放期间允许 hover，但 hover 只增强描边，不改变当前播放步骤。

### 3.4 底部路径步骤条

底部“路径矩阵”实现为当前路径的步骤化展示，不做大而全表格。

```text
当前路径: Cube（分离）
[GM] --MTE2--> [L1] --MTE1--> [L0A/L0B] --Cube--> [L0C] --FixPipe--> [GM/L1]
```

步骤条需要同步显示每一段的可信度线型；点击任一步骤后，中央画布定位到对应通路，右侧详情切到通路详情。

## 4. 场景脚本

### 4.1 Vector 路径

- 路径：`GM -> UB -> Vector -> UB -> GM`
- 视图：耦合架构、分离架构、950 演进均可展示。
- 可信度：`verified`
- 说明：`MTE2` 负责 `GM -> UB`，`Vector` 以 `UB` 为输入输出，`MTE3` 负责 `UB -> GM`。
- 可选支路：`UB -> L1` 若出现，只能标 `partially verified`，并提示需按具体架构确认。

### 4.2 Cube 路径

耦合架构路径：

- 路径：`GM -> L1 -> L0A/L0B -> Cube -> L0C -> UB/GM`
- 可信度：`verified`
- 说明：耦合架构下不要出现 `FixPipe`；`L0C` 输出使用通用出路表达。

分离架构路径：

- 路径：`GM -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1`
- 可信度：`verified`
- 说明：`L0A` 是左矩阵输入，`L0B` 是右矩阵输入，`L0C` 是输出/累加；`FixPipe` 位于 `L0C` 后。
- 分离架构补充支路：`L1 -> BT Buffer` 经 `MTE1`，作为 Bias 相关支路，不抢主路径。

### 4.3 Cube 累加路径

- 路径：`L0C -> Cube -> L0C`
- 视图：耦合架构、分离架构、950 演进均可展示。
- 可信度：`verified`
- 说明：分块矩阵累加时 `L0C` 既承接 Cube 输出，也参与累加反馈；这是核内路径，不需要出 AI Core。

### 4.4 AIC/AIV 协作路径

- 路径：`AIC -> GM -> AIV` 或 `AIV -> GM -> AIC`
- 视图：分离架构、950 演进。
- 可信度：`verified`
- 说明：AIC 和 AIV 各自执行代码段，数据交换默认经 `GM`，必要时配合同步。
- 约束：图上不要出现 AIC 本地 buffer 直接连 AIV `UB` 的线。

### 4.5 GM 直传 (SDMA)

- 路径：`GM -> SDMA -> GM`
- 视图：耦合架构、分离架构、950 演进均可展示。
- 可信度：`verified`
- 说明：`SDMA` 作为独立 DMA 通路对象展示，不等同于 PTO 异步 ISA。若叠加“PTO 借 SDMA 做异步后端”，该叠加关系仍按 `article claim` 处理。

### 4.6 PTO 同步路径

- 路径：`local GM -> UB staging tile -> remote GM`
- 对应：`TPUT/TGET`
- 视图：作为通信叠加层出现在三张主视图。
- 可信度：`partially verified`
- 说明：本地 `pypto` 镜像确认 `TPUT/TGET`、`pingTile/pongTile`、`AtomicAdd` 调用；文章中的自动切块、完整 PTO ISA 机制仍只作为补充说明。

### 4.7 PTO 异步路径

- 路径：`local GM -> SDMA/URMA -> remote GM`
- 对应：`TPUT_ASYNC/TGET_ASYNC`
- 视图：`SDMA` 可作为跨卡异步候选通路；`URMA` 只在 950 演进视图出现。
- 可信度：`article claim`
- 说明：硬件对象 `SDMA` 和“PTO 通过 SDMA/URMA 做异步搬运”的机制分开标注；`URMA` 和 `TPUT_ASYNC/TGET_ASYNC` 只能用虚线和“待确认”标注。

### 4.8 集合通信 / CCU 路径

- 910B verified 底层：复用 `AIC -> GM -> AIV`，这是已验证的数据桥。
- 910B claim 叠加：AIV 组合搬运和 Reduce 的集合通信实现方式标 `article claim`。
- 950 claim 叠加：`CCU` 在 `IO-Die` 上执行集合通信卸载，AIV 负责握手。
- 视图：分离架构可展示 910B claim 叠加；950 演进展示 `CCU` claim。
- 说明：`CCU`、`Memory Slice`、硬件 Reduce 引擎全部灰化，不显示为已验证硬件事实。

## 5. 右侧详情区内容模板

### 5.1 存储 / 计算对象

```text
名称: UB / Unified Buffer
类型: 存储单元
归属: AI Core 内；分离架构下属于 AIV / Vector Core
用途: Vector 输入输出；PTO 同步路径的 staging tile
软件可见性 / 可分配范围: AIV 代码可分配；AIC 代码不可见
可信度: verified
来源: ascend-aicore-hardware/overview.md
```

```text
名称: L1 Buffer
类型: 存储单元
归属: AI Core 内；分离架构下属于 AIC / Cube Core
用途: Cube 输入数据中转与复用
软件可见性 / 可分配范围: AIC 代码可分配；AIV 代码不可见
可信度: verified
来源: ascend-aicore-hardware/overview.md
```

### 5.2 Claim 对象

```text
名称: CCU
类型: 集合通信硬件协处理器
归属: 文章称位于 IO-Die
用途: 文章称可执行集合通信硬件卸载
软件可见性 / 可分配范围: 待确认
可信度: article claim
来源: CANN/CSDN PTO ISA 文章 claim，待官方或源码确认
```

### 5.3 通路对象

```text
名称: MTE2
类型: 搬入通路
方向: GM -> UB / L1
所属架构: 耦合架构、分离架构
对应 PyPTO / 图语义: COPY_IN
可信度: verified
来源: ascend-aicore-hardware/overview.md
```

说明：`画图备注`、`不要画成` 这类字段只属于实现元数据，不渲染给最终用户；UI 上使用“归属”“软件可见性”“可信度”“来源”。

## 6. 必须避免的错误

- 不写具体 buffer 容量数字；如需表现大小，只用相对视觉层级。
- 不把 `URMA`、`CCU`、`TPUT_ASYNC/TGET_ASYNC` 画成 verified。
- 不把 `SDMA` 硬件对象和“PTO 借 SDMA 做异步后端”的 claim 机制混成一个可信度。
- 不把 AIC 和 AIV 画成本地直连；分离架构下二者数据交换默认绕行 `GM`。
- 不把 `AI Core`、`AIC`、`AIV` 画成同级；分离架构下应表达为 `AI Core (= AIC + AIV)`。
- 不把 `L2 Cache` 放进单个 AIC 或 AIV 内部。
- 不把 `FP Buffer` 等同于 `FixPipe`；前者是 buffer，后者是搬运/随路处理单元。
- 不在耦合架构 Cube 路径中画 `FixPipe`。
- 不把这做成官网宣传页或 hero page；首屏必须是可交互硬件结构工作台。
- 不用 in-app 解释文字堆满画布；细节放在右侧详情和底部路径步骤条。

## 7. 状态与验收

### 7.1 状态

| 状态 | 表现 |
| --- | --- |
| 默认状态 | 打开 `分离架构（910B / A2 / A3 类）` 视图，默认选中 `Cube` 路径，右侧显示 `AIC / Cube Core` 说明。 |
| 空状态 | 如果没有选中路径，中央显示完整结构底图，底部 legend 仍可见。 |
| Claim 隐藏状态 | 关闭 `显示 claim` 后，隐藏 `URMA`、`CCU`、`PTO 异步` 虚线路径，并将 claim 类场景按钮置灰。 |
| 播放状态 | 当前路径按顺序高亮，底部显示当前段，例如 `GM -> L1 via MTE2`。 |
| 对比状态 | 左右并排显示两张视图，当前场景在两侧同步高亮；不兼容的一侧显示灰化提示。 |
| 移动端状态 | 控制区折叠到顶部，详情区变为底部抽屉，画布可横向拖动或缩放。 |

### 7.2 验收点

- 用户能在 10 秒内看出 `耦合架构` 和 `分离架构` 的核心差别。
- 用户能通过切换场景看到八类路径：Vector、Cube、Cube 累加、AIC/AIV 协作、GM 直传 (SDMA)、PTO 同步、PTO 异步、集合通信/CCU。
- 所有 claim 对象都有灰化、虚线或待确认文案。
- 右侧详情能说明选中对象属于 `AIC`、`AIV`、AI Core 内部、AI Core 外部或 claim 扩展层。
- 右侧详情能说明 `UB`、`L1`、`GM` 的软件可见性 / 可分配范围。
- 关闭 claim 后，图仍然是一张完整、可信的 Ascend C 硬件结构图。
- 耦合架构 Cube 路径不出现 `FixPipe`。
- 分离架构 AIC/AIV 数据交换必须经过 `GM`。

## 8. Backlog

- `UB -> L1` 可选支路：后续若找到更明确架构版本依据，可在图中作为 `partially verified` 支路出现。
- `L1 -> BT Buffer` 支路：分离架构 Cube 细节足够多时再作为高级模式打开。
- 对比模式：若首版实现成本过高，可延后，但数据结构和交互状态应预留。
- 多核视图：当前 demo 默认是单 AI Core 内部结构图，多核调度和负载分配不在本轮呈现。

## 9. Claude Demo Checklist

- [ ] 首屏直接展示硬件结构工作台，不做 marketing hero。
- [ ] 顶部有 `耦合架构（310 / 910 类）`、`分离架构（910B / A2 / A3 类）`、`950 演进` 三个切换项。
- [ ] 左侧有八个场景路径：`Vector`、`Cube`、`Cube 累加`、`AIC/AIV 协作`、`GM 直传 (SDMA)`、`PTO 同步`、`PTO 异步`、`集合通信/CCU`。
- [ ] 中央画布包含 `GM`、`L2 Cache`、`AI Core`、`Scalar`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`。
- [ ] 分离架构把 `AIC` 和 `AIV` 画在 `AI Core` 外框内部，不画成本地直连。
- [ ] 分离架构包含 `BT Buffer`、`FP Buffer`、`FixPipe`；耦合架构不画 `FixPipe`。
- [ ] `SDMA` 作为独立 GM 直传通路对象出现。
- [ ] 950 演进视图额外包含灰化的 `URMA`、`CCU`、`IO-Die / Memory Slice`。
- [ ] 线型 legend 明确区分 `verified`、`partially verified`、`article claim`。
- [ ] `URMA`、`CCU`、`TPUT_ASYNC/TGET_ASYNC` 永远显示为 claim/待确认。
- [ ] AIC/AIV 协作路径必须经过 `GM`。
- [ ] claim toggle 关闭后，claim 场景按钮置灰。
- [ ] 右侧详情区能响应对象和通路 hover/click，并显示软件可见性。
- [ ] 底部路径步骤条显示当前路径的完整 literal。
- [ ] 不出现未经核实的 buffer 容量数字。
- [ ] 移动端不会出现文字重叠，详情区可折叠。
