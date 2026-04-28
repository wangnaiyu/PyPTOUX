# 昇腾硬件结构 Demo 交互设计说明

本文面向后续制作前端 demo 使用。目标是把昇腾 AI Core 硬件对象、A5 / Ascend 950 代际结构、PyPTO Mix 任务路径和 Toolkit 调试调优线索做成一个可交互、可追溯、能承载可信度标注的结构图工作台。

视觉方向采用**黑白线框优先**：首版先用结构层级、线型、描边、纹理、角标、编号、标签和交互状态表达信息，不预设色相、色系或颜色语义。后续如需要颜色体系，再基于已验证的信息层级补充。

## 0. 事实口径与可信度

事实口径优先级：

1. A5 / Ascend 950 总览：`02-knowledge/00-shared/ascend-a5-950-hardware/overview.md`
2. A5 / Ascend 950 详细影响报告：`02-knowledge/00-shared/ascend-a5-950-hardware/a5-950-pypto-impact-report.md`
3. 通用 AI Core 主路径：`02-knowledge/00-shared/ascend-aicore-hardware/overview.md`
4. PyPTO Toolkit 与样例字段：本地 `pypto` 镜像、`pypto-toolkit`、`pypto-sample-datasets` 相关知识主题
5. 历史草稿：`01-inbox/ascend-hardware-architecture-notes.md` 仅作历史参考，不作为当前事实源

可信度分层：

| 标记 | 含义 | 画法原则 |
| --- | --- | --- |
| `verified` | 已由 CANN 官方文档、本地 `pypto` 源码 / 文档或既有知识库确认。 | 主结构、实线、常规描边。 |
| `public material` | 来自 CANN 开发者社区或公开材料，但未在本地源码中逐项确认。 | 可显示为公开能力层，详情区必须提示来源。 |
| `inferred` | 由通用硬件结构、950 公开材料和 PyPTO 机制组合推导。 | 可用于解释路径，但标明不是 trace 直出。 |
| `article claim` | 来自文章、社区解读或非 primary 材料，暂未二次确认。 | 虚线、点线、斜线纹理、`claim` 角标，可被隐藏。 |
| `unverified` | 本轮没有足够证据确认。 | 不进入默认视图，只保留在详情或待核验说明中。 |

必须区分三类信息：

- 硬件公开能力：`Ascend 950 Die`、双 DIE UMA、`Cube-Vector fused path`、`NDDMA`、`128B Sector L2`、`BufferID`、`UnifiedBus`、`URMA`、`CCU`
- PyPTO 源码事实：`DAV_3510`、`GraphUtils::IsCVMixPlatform()`、`MixSubgraphSplit`、`CV_SYNC_SRC`、`CV_SYNC_DST`
- Toolkit / UX 推导：`CV_SYNC_WAIT` / `CV_SYNC_SET`、`rootHash`、`callOpMagic`、`leafHash`、`wrapId`、Mix group、关键路径归因、硬件流解释

## 1. Demo 目标与用户

### 1.1 目标

- 让用户按“型号/代际”理解昇腾 AI Core：`310 / 910` 对应耦合架构，`910B / A2 / A3` 对应分离架构，`A5 / Ascend 950` 对应硬件架构与 PyPTO Mix / Toolkit 解释视图。
- 让用户按“场景路径”理解数据和控制如何移动：Vector、Cube、Cube 累加、AIC/AIV 协作、SDMA、PTO 同步、PTO 异步、集合通信 / CCU、CV Mix / AIC-AIV 同步、Mix 关键路径、TileShape 依赖、代码-计算图-泳道图-硬件流联动。
- 为后续 PyPTO / CANN 可视化提供一张可复用的硬件底图，而不是一次性插画。
- 帮助用户理解 `DAV_3510`、`MixSubgraphSplit`、`CV_SYNC_SRC` / `CV_SYNC_DST`、`rootHash` / `callOpMagic` / `leafHash` / `wrapId` 如何服务硬件解释与调优定位。
- 明确区分 `verified`、`public material`、`inferred`、`article claim`，避免把 950 公开能力或 claim 画成 PyPTO trace 事实。

### 1.2 目标用户

| 用户 | 关注点 | 设计重点 |
| --- | --- | --- |
| 算子开发者 | `GM`、`UB`、`L1/L0`、`MTE`、`FixPipe`、AIC/AIV 对写算子的影响 | 快速切换路径，看到数据从哪里来、到哪里去，以及 AIC/AIV 代码能访问哪些存储。 |
| 性能优化专家 | Mix 等待、TileShape 依赖、搬运和计算能否形成稳定流水 | 路径强调态、线型、对象详情、跨图定位和关键路径归因要准确。 |
| 系统 / 工具链开发者 | PyPTO 编译、调度、trace 字段和 Toolkit 展示的映射关系 | 展示 `rootHash`、`callOpMagic`、`leafHash`、`wrapId` 到硬件路径的链路。 |
| 产品 / 教学用户 | 昇腾不同代际硬件结构差异 | 三张主视图有清晰对照，默认不暴露过多底层噪音。 |

## 2. 信息架构

首屏就是可交互结构图工作台，不做 marketing hero，不做介绍型落地页。

```text
+--------------------------------------------------------------------------------+
| 顶栏: Ascend Hardware Map  [耦合架构] [分离架构] [A5 / 950 演进]               |
+--------------------------------------------------------------------------------+
| 左侧控制区          | 中央硬件结构 + PyPTO 任务路径画布                  | 右侧详情区 |
| - 型号/架构视图      | - GM / L2 / AI Core (= AIC + AIV) / IO extension    | - 选中对象 |
| - 场景路径          | - 存储、计算、调度、搬运、sync、Toolkit 定位链          | - PyPTO 映射 |
| - 路径播放          | - 当前路径强调态、可信度线型、claim 图层显隐             | - 可信度   |
| - 显示 claim        |                                                         | - 来源 / trace |
+--------------------------------------------------------------------------------+
| 底部: 当前路径步骤条 / 可信度 legend / 兼容性提示 / 跨图定位链                  |
+--------------------------------------------------------------------------------+
```

### 2.1 三张主视图

| 主视图 | 面向对象 | 必画结构 | 不要画成 |
| --- | --- | --- | --- |
| `耦合架构（310 / 910 类）` | `310 / 910` 类产品口径 | 一个 AI Core 容器内含 `Cube`、`Vector`、共享 `Scalar`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`。Cube 输出画成通用 `L0C -> UB/GM` 通路。 | 不要拆成物理独立的 `AIC` 和 `AIV`；不要出现分离架构专属 `FixPipe`。 |
| `分离架构（910B / A2 / A3 类）` | `910B / A2 / A3` 类产品口径 | 一个外框 `AI Core`，内部嵌 `AIC / Cube Core` 与 `AIV / Vector Core`；`GM` 是二者数据桥；AIC 侧有 `L1/L0/BT/FP/FixPipe`，AIV 侧有 `UB/Vector`。 | 不要把 `AI Core`、`AIC`、`AIV` 画成同级；不要画 AIC 和 AIV 的本地缓存直连。 |
| `A5 / 950 演进` | A5 / Ascend 950 硬件架构与 PyPTO Mix / Toolkit 解释视图 | 在分离架构基础上展示 `Ascend 950 Die`、双 DIE UMA、AIC / AIV、GM / L2、本地 buffer、IO / interconnect extension layer；`NDDMA`、`128B Sector L2`、`BufferID`、`UnifiedBus` 作为公开能力层；`URMA`、`CCU` 作为 extension / claim 层。 | 不要把 `URMA`、`CCU` 画成 verified 主结构；不要把 `BufferID` 写成当前 PyPTO trace 字段。 |

分离架构默认画成 `1 AIC + N AIV` 的组合，不强行固定比例；右侧详情提示“不同 SKU 配比不同，示意图只表达结构关系”。

### 2.2 控件

- 顶部使用 segmented control 切换三张主视图，并在标签中带型号副标题。
- 左侧使用列表或 tabs 选择场景路径：
  - 硬件路径：`Vector`、`Cube`、`Cube 累加`、`AIC/AIV 协作`、`GM 直传 (SDMA)`
  - 通信路径：`PTO 同步`、`PTO 异步`、`集合通信/CCU`
  - A5 / PyPTO 路径：`CV Mix / AIC-AIV 同步`、`Mix 关键路径`、`TileShape 依赖解释`、`代码-计算图-泳道图-硬件流联动`
- 提供 `显示 claim` toggle，默认开启；关闭时隐藏 `URMA`、`CCU`、PTO 异步和集合通信 claim 层。
- claim 关闭后，左侧 claim 类场景按钮进入禁用态轮廓；hover tooltip 显示“已隐藏 claim 层，开启后可查看”。
- 提供 `路径播放` 控制：播放、暂停、重置；播放时沿当前路径逐段进入强调态。
- 右侧详情区展示选中对象的 `归属`、`用途`、`软件可见性 / 可分配范围`、`PyPTO 映射`、`可信度`、`来源`、`当前是否 trace 直出`。
- 可选增加 `对比模式`：左右并排显示耦合架构与分离架构，同一场景在两侧同步强调；不存在的场景在对应侧显示禁用态轮廓。

### 2.3 场景与视图兼容矩阵

| 场景 \ 视图 | 耦合架构 | 分离架构 | A5 / 950 演进 | fallback |
| --- | --- | --- | --- | --- |
| `Vector` | 可用 | 可用 | 可用 | 无 |
| `Cube` | 可用，但不画 `FixPipe` | 可用 | 可用 | 无 |
| `Cube 累加` | 可用 | 可用 | 可用 | 无 |
| `AIC/AIV 协作` | 不适用 | 可用 | 可用 | 从分离切到耦合时，自动切到 `Vector` 并提示“耦合架构无独立 AIC/AIV”。 |
| `GM 直传 (SDMA)` | 可用 | 可用 | 可用 | 无 |
| `PTO 同步` | 可用 | 可用 | 可用 | 无 |
| `PTO 异步` | claim | claim | claim | claim 关闭时禁用。 |
| `集合通信/CCU` | 不适用 | claim | claim | 从 950 切到耦合时，自动切到 `Cube` 并提示“该场景依赖分离/claim 扩展层”。 |
| `CV Mix / AIC-AIV 同步` | 不适用 | inferred | inferred + PyPTO | 从 950 切到耦合时，自动切到 `AIC/AIV 协作` 的说明态或提示不适用。 |
| `Mix 关键路径` | 不适用 | inferred | inferred + PyPTO | 如果没有 trace 字段，只展示概念链路。 |
| `TileShape 依赖解释` | 可用 | 可用 | 可用 | 无 |
| `代码-计算图-泳道图-硬件流联动` | 可用 | 可用 | 可用 | 缺少 `rootHash` 等字段时进入空状态。 |

## 3. 视觉编码

### 3.1 黑白线框优先

- 用容器层级表达归属：`AI Core` 是外框，`AIC / Cube Core` 与 `AIV / Vector Core` 是内部子容器，`GM / L2` 位于 AI Core 外部共享层。
- 用线型表达可信度：实线、长虚线、点线、虚实混合线分别对应不同可信度，不依赖颜色。
- 用描边粗细表达层级：主结构常规描边，当前路径加粗描边，播放步骤使用加粗外框和步骤编号。
- 用纹理表达非主结构：claim / extension layer 使用斜线纹理或点状纹理；禁用态只保留轮廓。
- 用角标和标签表达状态：例如 `verified`、`public`、`inferred`、`claim`、`trace`、`not trace`。
- 用图层显隐表达复杂度：默认可看完整 verified / inferred 底图，claim 层可通过 toggle 隐藏。
- 用局部聚焦表达强调态：选中对象保持清晰，非相关对象降低线宽或淡出到背景层，但不依赖颜色区分。

### 3.2 可信度线型

| 可信度 | 线型 | 节点样式 | 文案 |
| --- | --- | --- | --- |
| `verified` | 实线 | 常规描边 | 已由 CANN 官方、本地 `pypto` 或知识库确认 |
| `public material` | 双线或实线 + `public` 角标 | 常规描边 + 来源提示 | 公开材料，未必是 PyPTO trace 字段 |
| `inferred` | 长虚线 | 常规描边 + `inferred` 角标 | 基于已知结构和工具字段推导 |
| `article claim` | 点线或短虚线 | 斜线纹理 + `claim` 角标 | claim，待官方或源码确认 |
| `unverified` | 不进入默认画布 | 仅在详情或待核验区出现 | 未确认，不作为默认展示对象 |

### 3.3 路径强调态与交互状态

- 默认图上所有通路以背景层显示，当前场景路径进入强调态。
- 当前路径每一段显示方向箭头；箭头文案使用 literal，如 `MTE2`、`MTE1`、`FixPipe`、`CV_SYNC_WAIT`。
- 播放时按路径顺序进入强调态：存储节点 -> 搬运通路 -> 计算单元 -> 输出节点。
- hover 任意通路时，强调相关起点、终点和右侧详情卡。
- 状态优先级：`playing 当前步骤` > `selected 对象/通路` > `hover` > `当前场景路径` > `默认底图`。
- 播放期间允许 hover，但 hover 只增强描边外框，不改变当前播放步骤。

### 3.4 底部路径步骤条

底部“路径矩阵”实现为当前路径的步骤化展示，不做大而全表格。

```text
当前路径: Cube（分离）
[GM] --MTE2--> [L1] --MTE1--> [L0A/L0B] --Cube--> [L0C] --FixPipe--> [GM/L1]
```

步骤条需要同步显示每一段的可信度线型；点击任一步骤后，中央画布定位到对应通路，右侧详情切到通路详情。

### 3.5 跨视图定位链

当用户从泳道图或 Toolkit 数据进入硬件图时，底部显示定位链：

```text
swimlane task
-> event-hint.rootHash
-> event-hint.callOpMagic
-> event-hint.leafHash
-> wrapId / sync event
-> Execute Graph / CALL / Block Graph / Mix group
-> AIC / AIV / GM / L2 / sync path
```

该链路是解释路径，不等于所有字段都来自同一个 trace 文件。详情区必须说明当前字段来源。

## 4. 场景脚本

### 4.1 Vector 路径

- 路径：`GM -> UB -> Vector -> UB -> GM`
- 视图：耦合架构、分离架构、A5 / 950 演进均可展示。
- 可信度：`verified`
- 说明：`MTE2` 负责 `GM -> UB`，`Vector` 以 `UB` 为输入输出，`MTE3` 负责 `UB -> GM`。
- 可选支路：`UB -> L1` 若出现，只能标 `inferred` 或 `partially verified`，并提示需按具体架构确认。

### 4.2 Cube 路径

耦合架构路径：

- 路径：`GM -> L1 -> L0A/L0B -> Cube -> L0C -> UB/GM`
- 可信度：`verified`
- 说明：耦合架构下不要出现 `FixPipe`；`L0C` 输出使用通用出路表达。

分离架构路径：

- 路径：`GM -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1`
- 可信度：`verified`
- 说明：`L0A` 是左矩阵输入，`L0B` 是右矩阵输入，`L0C` 是输出 / 累加；`FixPipe` 位于 `L0C` 后。
- 分离架构补充支路：`L1 -> BT Buffer` 经 `MTE1`，作为 Bias 相关支路，不抢主路径。

### 4.3 Cube 累加路径

- 路径：`L0C -> Cube -> L0C`
- 视图：耦合架构、分离架构、A5 / 950 演进均可展示。
- 可信度：`verified`
- 说明：分块矩阵累加时 `L0C` 既承接 Cube 输出，也参与累加反馈；这是核内路径，不需要出 AI Core。

### 4.4 AIC/AIV 协作路径

- 路径：`AIC -> GM -> AIV` 或 `AIV -> GM -> AIC`
- 视图：分离架构、A5 / 950 演进。
- 可信度：`verified`
- 说明：AIC 和 AIV 各自执行代码段，数据交换默认经 `GM`，必要时配合同步。
- 约束：图上不要出现 AIC 本地 buffer 直接连 AIV `UB` 的线。

### 4.5 GM 直传 (SDMA)

- 路径：`GM -> SDMA -> GM`
- 视图：耦合架构、分离架构、A5 / 950 演进均可展示。
- 可信度：`verified` for `SDMA` object
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
- 视图：`SDMA` 可作为跨卡异步候选通路；`URMA` 只在 A5 / 950 演进视图出现。
- 可信度：`article claim`
- 说明：硬件对象 `SDMA` 和“PTO 通过 SDMA/URMA 做异步搬运”的机制分开标注；`URMA` 和 `TPUT_ASYNC/TGET_ASYNC` 只能用 claim 线型和“待确认”标注。

### 4.8 集合通信 / CCU 路径

- verified 底层：复用 `AIC -> GM -> AIV`，这是已验证的数据桥。
- claim 叠加：AIV 组合搬运和 Reduce 的集合通信实现方式标 `article claim`。
- 950 claim 叠加：`CCU` 在 IO / interconnect extension layer 上执行集合通信卸载，AIV 负责握手。
- 视图：分离架构可展示集合通信 claim 叠加；A5 / 950 演进展示 `CCU` claim。
- 说明：`CCU`、`Memory Slice`、硬件 Reduce 引擎全部作为 extension / claim 层，不显示为已验证硬件事实。

### 4.9 CV Mix / AIC-AIV 同步

- 路径：`AIC task -> CV_SYNC_SET -> AIV CV_SYNC_WAIT -> AIV task`
- 视图：分离架构、A5 / 950 演进。
- 可信度：PyPTO `CV_SYNC_SRC` / `CV_SYNC_DST` 为 `verified`；与 950 `BufferID` 的语义解释为 `public material` / `inferred`。
- 说明：`CV_SYNC_WAIT` / `CV_SYNC_SET` 是控制依赖，不代表数据搬运；数据仍应通过 `GM/L2` 或 trace 明确路径解释。
- UI 行为：选中同步线时，同时强调发送方 task、等待方 task、对应 `wrapId` 和详情区定位链。

### 4.10 Mix 关键路径

- 路径：`wait-heavy task -> peer task -> CALL -> Block Graph leaf -> AIC/AIV path`
- 视图：A5 / 950 演进优先；分离架构可展示概念链。
- 可信度：`inferred` for UX path；底层字段按各自来源标注。
- 说明：该场景不是新增硬件对象，而是帮助用户判断“先优化哪一段最可能降低总耗时”。
- 右侧详情最少展示：等待方、信号方、`wrapId`、`rootHash`、`callOpMagic`、`leafHash`、当前是否 trace 直出。

### 4.11 TileShape 依赖解释

- 路径：`Cube tile -> dependency edge -> Vector tile`
- 视图：三张主视图均可用。
- 可信度：`inferred` for UX diagnosis；PyPTO 性能文档中的 TileShape 建议为 `verified`。
- 说明：展示一对一、多对一、多对多依赖，不使用颜色表达风险；用边数量、边型、标号和详情说明表达复杂度。
- UI 行为：点击依赖边时，右侧解释“当前依赖可能导致合图困难、并行度下降或同步等待增加”。

### 4.12 代码-计算图-泳道图-硬件流联动

- 路径：`semantic_label -> Execute Graph CALL -> Block Graph leaf -> swimlane task -> hardware path`
- 视图：三张主视图均可用，A5 / 950 演进展示最完整。
- 可信度：字段为 `verified`；硬件路径多为 `inferred`。
- 说明：保留 literal：`rootHash`、`callOpMagic`、`leafHash`、`wrapId`。不要为了统一术语改写这些字段名。
- 空状态：缺少任一关键字段时，显示“当前数据不足以完成跨视图定位”，不猜测。

## 5. 右侧详情区内容模板

### 5.1 存储 / 计算对象

```text
名称: UB / Unified Buffer
类型: 存储单元
归属: AI Core 内；分离架构下属于 AIV / Vector Core
用途: Vector 输入输出；PTO 同步路径的 staging tile
软件可见性 / 可分配范围: AIV 代码可分配；AIC 代码不可见
PyPTO 映射: Vector task / COPY_IN / COPY_OUT 候选解释
可信度: verified
当前是否 trace 直出: 否，硬件路径解释
来源: ascend-aicore-hardware/overview.md
```

```text
名称: L1 Buffer
类型: 存储单元
归属: AI Core 内；分离架构下属于 AIC / Cube Core
用途: Cube 输入数据中转与复用
软件可见性 / 可分配范围: AIC 代码可分配；AIV 代码不可见
PyPTO 映射: Cube task / L1Reuse group 候选解释
可信度: verified
当前是否 trace 直出: 否，硬件路径解释
来源: ascend-aicore-hardware/overview.md
```

### 5.2 PyPTO 同步对象

```text
名称: CV_SYNC_WAIT / CV_SYNC_SET
类型: 控制依赖
归属: AIC / AIV 协同控制
用途: 表达 Mix 子图内同步等待和信号关系
PyPTO 映射: CV_SYNC_SRC / CV_SYNC_DST；泳道图可显示 CV_SYNC_WAIT / CV_SYNC_SET
可信度: verified for PyPTO sync op；inferred for hardware path explanation
当前是否 trace 直出: 视输入数据而定
来源: pypto 本地镜像；ascend-a5-950-hardware/overview.md
```

### 5.3 Claim 对象

```text
名称: CCU
类型: 集合通信硬件协处理器
归属: 公开材料称位于 IO / interconnect extension layer
用途: 公开材料称可执行集合通信硬件卸载
软件可见性 / 可分配范围: 待确认
PyPTO 映射: 当前不绑定单卡 Mix trace
可信度: public material for object；article claim for PyPTO path
当前是否 trace 直出: 否
来源: A5 / Ascend 950 公开材料，待官方文档或源码确认
```

### 5.4 通路对象

```text
名称: MTE2
类型: 搬入通路
方向: GM -> UB / L1
所属架构: 耦合架构、分离架构、A5 / 950 演进
对应 PyPTO / 图语义: COPY_IN 候选解释
可信度: verified
当前是否 trace 直出: 否，硬件路径解释
来源: ascend-aicore-hardware/overview.md
```

说明：`画图备注`、`不要画成` 这类字段只属于实现元数据，不渲染给最终用户；UI 上使用“归属”“软件可见性”“PyPTO 映射”“可信度”“来源”“当前是否 trace 直出”。

## 6. 必须避免的错误

- 不写具体 buffer 容量数字；如需表现大小，只用相对视觉层级。
- 不把 `URMA`、`CCU`、`TPUT_ASYNC/TGET_ASYNC` 画成 verified。
- 不把 `SDMA` 硬件对象和“PTO 借 SDMA 做异步后端”的 claim 机制混成一个可信度。
- 不把 AIC 和 AIV 画成本地直连；分离架构下二者数据交换默认绕行 `GM`。
- 不把 `AI Core`、`AIC`、`AIV` 画成同级；分离架构下应表达为 `AI Core (= AIC + AIV)`。
- 不把 `L2 Cache` 放进单个 AIC 或 AIV 内部。
- 不把 `FP Buffer` 等同于 `FixPipe`；前者是 buffer，后者是搬运 / 随路处理单元。
- 不在耦合架构 Cube 路径中画 `FixPipe`。
- 不把 `CV_SYNC_WAIT` / `CV_SYNC_SET` 画成数据搬运线。
- 不把 `BufferID` 写成当前 PyPTO trace 已经暴露的字段。
- 不为了统一术语改写 `rootHash`、`callOpMagic`、`leafHash`、`wrapId`。
- 不在首版中规定颜色语义；黑白线框必须独立成立。
- 不把这做成官网宣传页或 hero page；首屏必须是可交互硬件结构工作台。
- 不用 in-app 解释文字堆满画布；细节放在右侧详情和底部路径步骤条。

## 7. 状态与验收

### 7.1 状态

| 状态 | 表现 |
| --- | --- |
| 默认状态 | 打开 `分离架构（910B / A2 / A3 类）` 视图，默认选中 `Cube` 路径，右侧显示 `AIC / Cube Core` 说明。 |
| 空状态 | 如果没有选中路径，中央显示完整结构底图，底部 legend 仍可见。 |
| Claim 隐藏状态 | 关闭 `显示 claim` 后，隐藏 `URMA`、`CCU`、`PTO 异步` 和集合通信 claim 路径，并将 claim 类场景按钮置为禁用态轮廓。 |
| 播放状态 | 当前路径按顺序进入强调态，底部显示当前段，例如 `GM -> L1 via MTE2`。 |
| 选中状态 | 选中对象或通路使用加粗描边、外框和右侧详情联动表达。 |
| 对比状态 | 左右并排显示两张视图，当前场景在两侧同步进入强调态；不兼容的一侧显示禁用态轮廓。 |
| 移动端状态 | 控制区折叠到顶部，详情区变为底部抽屉，画布可横向拖动或缩放。 |

### 7.2 验收点

- 用户能在 10 秒内看出 `耦合架构`、`分离架构`、`A5 / 950 演进` 的核心差别。
- 用户能通过切换场景看到十二类路径：Vector、Cube、Cube 累加、AIC/AIV 协作、GM 直传 (SDMA)、PTO 同步、PTO 异步、集合通信/CCU、CV Mix / AIC-AIV 同步、Mix 关键路径、TileShape 依赖解释、代码-计算图-泳道图-硬件流联动。
- 不依赖颜色也能区分 `AIC`、`AIV`、`GM/L2`、IO / interconnect extension layer。
- 不依赖颜色也能区分 `verified`、`public material`、`inferred`、`article claim`。
- 不依赖颜色也能识别选中态、hover、播放步骤和 claim 隐藏状态。
- 所有 claim 对象都有虚线、点线、纹理、角标或待确认文案。
- 右侧详情能说明选中对象属于 `AIC`、`AIV`、AI Core 内部、AI Core 外部或 extension / claim 层。
- 右侧详情能说明 `UB`、`L1`、`GM` 的软件可见性 / 可分配范围。
- 右侧详情能说明 `DAV_3510`、`MixSubgraphSplit`、`CV_SYNC`、`rootHash`、`callOpMagic`、`leafHash`、`wrapId` 的 UI 使用方式。
- 关闭 claim 后，图仍然是一张完整、可信的 Ascend C 硬件结构图。
- 耦合架构 Cube 路径不出现 `FixPipe`。
- 分离架构 AIC/AIV 数据交换必须经过 `GM`。

## 8. Backlog

- `UB -> L1` 可选支路：后续若找到更明确架构版本依据，可在图中作为 `partially verified` 支路出现。
- `L1 -> BT Buffer` 支路：分离架构 Cube 细节足够多时再作为高级模式打开。
- 对比模式：若首版实现成本过高，可延后，但数据结构和交互状态应预留。
- 多核视图：当前 demo 默认是单 AI Core 内部结构图，多核调度和负载分配不在本轮呈现。
- 颜色体系：黑白线框验证后，如确有需要，再基于可信度、路径类型或交互状态补充颜色方案。

## 9. Claude Demo Checklist

- [ ] 首屏直接展示硬件结构工作台，不做 marketing hero。
- [ ] 顶部有 `耦合架构（310 / 910 类）`、`分离架构（910B / A2 / A3 类）`、`A5 / 950 演进` 三个切换项。
- [ ] 左侧有十二个场景路径：`Vector`、`Cube`、`Cube 累加`、`AIC/AIV 协作`、`GM 直传 (SDMA)`、`PTO 同步`、`PTO 异步`、`集合通信/CCU`、`CV Mix / AIC-AIV 同步`、`Mix 关键路径`、`TileShape 依赖解释`、`代码-计算图-泳道图-硬件流联动`。
- [ ] 中央画布包含 `GM`、`L2 Cache`、`AI Core`、`Scalar`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`。
- [ ] 分离架构把 `AIC` 和 `AIV` 画在 `AI Core` 外框内部，不画成本地直连。
- [ ] 分离架构包含 `BT Buffer`、`FP Buffer`、`FixPipe`；耦合架构不画 `FixPipe`。
- [ ] A5 / 950 演进视图额外包含 `Ascend 950 Die`、双 DIE UMA、`NDDMA`、`128B Sector L2`、`BufferID`、`UnifiedBus`、`URMA`、`CCU`。
- [ ] `SDMA` 作为独立 GM 直传通路对象出现。
- [ ] 线型 legend 明确区分 `verified`、`public material`、`inferred`、`article claim`。
- [ ] `URMA`、`CCU`、`TPUT_ASYNC/TGET_ASYNC` 永远显示为 claim / 待确认。
- [ ] `CV_SYNC_WAIT` / `CV_SYNC_SET` 显示为控制依赖，不显示为数据搬运。
- [ ] AIC/AIV 协作路径必须经过 `GM`。
- [ ] claim toggle 关闭后，claim 场景按钮进入禁用态轮廓。
- [ ] 右侧详情区能响应对象和通路 hover / click，并显示软件可见性、PyPTO 映射、可信度、来源、当前是否 trace 直出。
- [ ] 底部路径步骤条显示当前路径的完整 literal。
- [ ] 跨视图定位链保留 `rootHash`、`callOpMagic`、`leafHash`、`wrapId` 原始字段名。
- [ ] 不出现未经核实的 buffer 容量数字。
- [ ] 不依赖颜色也能区分主结构、claim 层、选中态、hover 和播放步骤。
- [ ] 移动端不会出现文字重叠，详情区可折叠。
