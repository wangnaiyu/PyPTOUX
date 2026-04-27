# 昇腾 AI Core 硬件对象与数据搬移路径

本文用于为后续绘制昇腾硬件结构图提供结构化输入。核心目标不是复述文章，而是把“对象归属”和“数据搬移路径”拆成可追溯、可标注可信度的表格。

来源处理原则：

- 微信原文 `https://mp.weixin.qq.com/s/xsirSciqrQ6F6LcdLEW3CQ` 当前无法直接读取，本轮使用同文 CANN/CSDN 镜像《解读 PTO 通信指令集：昇腾多卡数据搬移的 N 种路径》作为 claim 入口。
- AI Core 内部存储、计算单元、搬运单元、耦合/分离模式以昇腾官方 CANN 文档为准。
- `URMA`、`CCU`、PTO 异步会话、`Quiet` 语义、950 路径选择等内容，本轮未找到足够官方或本地代码证据，保留为 `article claim` 或 `unverified`。

## 可信度标记

| 标记 | 含义 | 后续画图建议 |
| --- | --- | --- |
| `verified` | 已由昇腾官方 CANN 文档或本地 `pypto` 镜像确认。 | 可画成实线结构或主路径。 |
| `partially verified` | 关键对象或代码局部已确认，但文章里的完整机制未全部命中。 | 可画主路径，但要在注释里说明未覆盖部分。 |
| `article claim` | 来自文章，尚未由官方文档或本地代码二次确认。 | 用虚线、灰色注释或“待确认”层表达。 |
| `unverified` | 本轮没有找到足够证据。 | 不建议进入正式硬件结构主图。 |

## 对象归属表

### 存储单元

| 对象 | 位置 / 归属 | 主要用途 | 可信度 | 画图备注 |
| --- | --- | --- | --- | --- |
| `GM` / `Global Memory` | AI Core 外部存储；设备端主内存；通常为跨卡通信起点/终点。 | 存储大规模数据；AIC/AIV 分离架构下二者通过 `GM` 传递数据。 | `verified` | 画在 AI Core 外，作为所有 AI Core 共享或可访问的主存层。 |
| `L2 Cache` | 核外缓存层；用于缓存访问 `GM` 的数据。 | 加速通过搬运单元读写 `GM` 的访问。 | `verified` | 可画在 `GM` 与 AI Core 总线之间；不要画进单个 AIC/AIV 内部。 |
| `UB` / `Unified Buffer` / `UBuffer` | AI Core 内部存储；在分离模式下属于 `Vector Core` / `AIV` 的核心本地存储。 | Vector/Scalar 计算输入输出；跨卡同步 `TPUT/TGET` 的 staging tile 也使用 UB。 | `verified` | Vector 路径主缓存；画在 AIV/Vector 侧。 |
| `L1 Buffer` | AI Core 内部存储；分离模式下属于 `Cube Core` / `AIC` 侧。 | Cube 输入数据中转和复用，通常从 `GM` 搬入后再进 `L0A/L0B`。 | `verified` | Cube 路径的大中转层；画在 L0 之前。 |
| `L0A Buffer` | AI Core 内部存储；Cube 可访问。 | Cube 左矩阵输入。 | `verified` | 画在 Cube 单元旁，输入 A。 |
| `L0B Buffer` | AI Core 内部存储；Cube 可访问。 | Cube 右矩阵输入。 | `verified` | 画在 Cube 单元旁，输入 B。 |
| `L0C Buffer` | AI Core 内部存储；Cube 可访问。 | Cube 输出；累加时也是输入的一部分。 | `verified` | 画在 Cube 输出侧，后接 `FixPipe`。 |
| `BT Buffer` / `BiasTable Buffer` | AI Core 内部存储；分离架构中由官方文档列为新增 Buffer。 | 存放矩阵计算中的 Bias。 | `verified` | 画在 AIC/Cube 侧，和 `MTE1` 输入相关。 |
| `FP Buffer` / `Fixpipe Buffer` | AI Core 内部存储；分离架构中由官方文档列为新增 Buffer。 | 存放量化参数、Relu 参数等。 | `verified` | 画在 `FixPipe` 附近，不要等同于 `FixPipe` 搬运单元本身。 |

### 计算与搬运单元

| 对象 | 位置 / 归属 | 负责内容 | 可信度 | 画图备注 |
| --- | --- | --- | --- | --- |
| `Vector` | 耦合模式下与 Cube 同属一个 AI Core；分离模式下在 `Vector Core` / `AIV`。 | 向量计算；源数据和目标数据要求在 `UB`。 | `verified` | AIV 主计算单元。 |
| `Cube` | 耦合模式下与 Vector 同属一个 AI Core；分离模式下在 `Cube Core` / `AIC`。 | 矩阵计算；访问 `L0A/L0B/L0C`。 | `verified` | AIC 主计算单元。 |
| `Scalar` | 耦合模式下 Vector/Cube 共享；分离模式下 AIC/AIV 各有自己的 Scalar。 | 指令发射、地址和参数计算、流程控制、标量运算。 | `verified` | 画成调度单元，不要把它画成主要吞吐计算单元。 |
| `MTE1` | AI Core 搬运单元；分离模式主要在 AIC/Cube 侧。 | `L1 -> L0A/L0B`；分离架构还涉及 `L1 -> BT Buffer`。 | `verified` | Cube 输入内搬运通道。 |
| `MTE2` | AI Core 搬运单元；AIC/AIV 都可能有相应搬入流水。 | `GM -> L1/L0A/L0B/UB`。 | `verified` | 从 `GM` 进入 Local Memory 的主搬入通道。 |
| `MTE3` | AI Core 搬运单元；AIV/Vector 侧常见。 | `UB -> GM`；术语表也提到可负责 `UB -> GM/L1`，需按具体架构区分。 | `verified` | Vector 结果搬出通道；画图时主路径先画 `UB -> GM`。 |
| `FixPipe` | 搬运/随路处理单元；分离架构支持，位于 AIC 内部并配合 Cube。 | `L0C -> GM/L1`；可做量化反量化、Relu、格式转换等随路处理。 | `verified` | 画在 `L0C` 后面，通向 `GM` 或 `L1`。 |
| `SDMA` | 独立于 AI Core 的 DMA 引擎。 | 文章称用于 `TPUT_ASYNC/TGET_ASYNC` 的 `GM -> GM` 后台直传。 | `article claim` | 可作为跨卡异步路径候选，用虚线。 |
| `URMA` | 文章称为 Ascend 950 新增用户态 RDMA 能力。 | 文章称可作为 950 异步 `GM -> GM` 后端。 | `article claim` | 本轮未找到官方确认；只画在 950 扩展层。 |
| `CCU` | 文章称为 Ascend 950 集合通信硬件协处理器。 | 文章称可进行集合通信硬件卸载和片上 Reduce。 | `article claim` | 本轮未找到官方确认；正式图中保持待确认。 |

## 耦合模式与分离模式

| 模式 | 产品 / 架构线索 | 结构关系 | 可信度 | 画图策略 |
| --- | --- | --- | --- | --- |
| 耦合模式 | `Atlas 推理系列产品`、`Atlas 训练系列产品`、`Atlas 200I/500 A2 推理产品` 在 Ascend C 场景下按官方文档列为耦合模式。 | Cube、Vector 对应同一个 Scalar 调度单元，部署在一个 AI Core 上。 | `verified` | 画一个 AI Core 容器，内部包含 Cube、Vector、Scalar、UB、L1/L0 等。 |
| 分离模式 | `Atlas A2 训练系列产品 / Atlas A2 推理系列产品`、`Atlas A3 训练系列产品 / Atlas A3 推理系列产品`。 | AI Core 被组织为 `Cube Core` / `AIC` 与 `Vector Core` / `AIV` 的组合；AIC/AIV 各有 Scalar，可独立加载代码段。 | `verified` | 画一个 AI Core 组合，内部拆成 AIC 与 AIV 两个子容器；AI Core 核数以 Cube Core 为准。 |
| `AIC` / `Cube Core` | 分离模式下的一组 Cube Core 与 Vector Core 组合中的 Cube Core。 | 包含 Cube、Scalar、MTE、L1、L0A/L0B/L0C、BT/FP 等与矩阵计算相关对象。 | `verified` | AIC 侧只画 Cube 路径和 FixPipe 路径。 |
| `AIV` / `Vector Core` | 分离模式下的一组 Cube Core 与 Vector Core 组合中的 Vector Core。 | 包含 Vector、Scalar、MTE、UB 等与向量计算/细粒度搬运相关对象。 | `verified` | AIV 侧画 UB、Vector、MTE2/MTE3、跨卡同步路径 staging。 |

## 数据搬移路径矩阵

| 场景 | 路径 | 主要执行单元 / 指令 | 适用条件 | 可信度 | 画图建议 |
| --- | --- | --- | --- | --- | --- |
| 核内 Vector 计算 | `GM -> UB -> Vector -> UB -> GM` | `MTE2` 搬入，`Vector` 计算，`MTE3` 搬出。 | 向量运算、标量/向量输入输出围绕 `UB`。 | `verified` | 主图实线；`UB` 是 Vector 的输入输出存储。 |
| 核内 Cube 计算 | `GM -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM` | `MTE2`、`MTE1`、`Cube`、`FixPipe`。 | Cube/GEMM 类矩阵计算，结果直接出到 `GM`。 | `verified` | 主图实线；强调 `L0A/L0B` 是输入，`L0C` 是输出/累加。 |
| 核内 Cube 计算并回写 L1 | `GM -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> L1` | `MTE2`、`MTE1`、`Cube`、`FixPipe`。 | 需要继续在 AIC/Cube 侧复用或后续处理。 | `verified` | 主图实线；和出 `GM` 分成两个 FixPipe 出口。 |
| `MTE1` 通路 | `L1 -> L0A/L0B`；分离架构还包括 `L1 -> BT Buffer`。 | `MTE1`。 | Cube 输入内搬运。 | `verified` | 只画在 AIC/Cube 侧。 |
| `MTE2` 通路 | `GM -> L1/L0A/L0B/UB`。 | `MTE2`。 | 从 `GM` 搬入 Local Memory；按 cache line 或分形对齐更优。 | `verified` | 画成从外部 `GM/L2` 进入 AIC/AIV 的多目的搬入通道。 |
| `MTE3` 通路 | `UB -> GM`。 | `MTE3`。 | Vector 结果或 UB 数据搬出。 | `verified` | 先画主路径 `UB -> GM`；`UB -> L1` 需按具体架构再确认。 |
| `FixPipe` 通路 | `L0C -> GM/L1`，以及 `L1 -> FP Buffer`。 | `FixPipe`。 | 分离架构支持，可做随路格式/类型转换。 | `verified` | 画在 AIC/Cube 输出后。 |
| 分离架构 AIC/AIV 协作 | `AIC -> GM -> AIV` 或 `AIV -> GM -> AIC`。 | `CrossCoreSetFlag/CrossCoreWaitFlag` 等同步配合搬运。 | AIC 和 AIV 分别独立执行，二者数据传递经 `GM`。 | `verified` | AIC/AIV 之间不要画直接数据通道，主图通过 `GM` 连接。 |
| PTO 跨卡同步 `TPUT/TGET` | `local GM -> UB staging tile -> remote GM`。 | PTO `TPUT/TGET`；底层可理解为 `MTE2` 搬入 staging、`MTE3` 搬出远端。 | 跨卡点对点同步搬运；文章称支持 2D/tile 切块、ping-pong、AtomicAdd。本地 `pypto` 镜像确认 `TPUT/TGET`、`pingTile/pongTile`、`AtomicAdd` 调用。 | `partially verified` | 可在 PTO 通信扩展图中画实线主体，但把文章自动切块等机制标注为 claim。 |
| PTO 跨卡异步 `TPUT_ASYNC/TGET_ASYNC` | `local GM -> SDMA/URMA -> remote GM`。 | 文章称通过异步 DMA/RDMA 后端提交搬运描述符。 | 文章称 910/950 可走 SDMA，950 可选 URMA。 | `article claim` | 只画虚线扩展路径；待找官方 950/URMA 或 pto-isa 源码确认。 |
| 集合通信传统路径 | 多 rank 间由 AIV 组合点对点搬运和本地处理。 | 文章称传统方式由 AIV 自己搬。 | 文章用于说明 CCU 前的集合通信方式。 | `article claim` | 画成“传统实现概念层”，不进入硬件主结构。 |
| 950 `CCU` 卸载路径 | `AIC tile ready -> AIV signal -> CCU reduce/transfer -> AIV continue`。 | 文章称 CCU 负责集合通信硬件卸载，AIV 负责握手。 | 文章 claim；本轮未找到官方和本地 `pypto` 代码确认。 | `article claim` | 用虚线外设/IO-Die 扩展层，标“待确认”。 |

## PTO 通信文章的有效内容

文章中对后续画图最有价值的信息可以分为三层：

1. 可吸收进硬件底图的事实：`GM`、`UB`、`L1/L0` 的分层；`UB` 围绕 AIV/Vector；`L1/L0A/L0B/L0C` 围绕 AIC/Cube；跨卡通信通常以 `GM` 为起点和终点。
2. 可吸收进 PTO 通信叠加图的事实：同步 `TPUT/TGET` 是 `GM -> UB staging -> GM` 型路径；本地 `pypto` 代码中已有 `TPUT/TGET`、`pingTile/pongTile` 和 `AtomicAdd` 调用。
3. 暂不吸收进强事实图的 claim：`TPUT_ASYNC/TGET_ASYNC` 的 SDMA/URMA 后端、Ascend 950 `CCU` 集合通信卸载、`Quiet` 语义、文章给出的 8 卡 910B 性能收益。

## 画图默认建议

- 先画一张“Ascend C 可验证 AI Core 结构图”：外层 `GM/L2`，内层按耦合或分离模式放 `AIC/Cube`、`AIV/Vector`、`Scalar`、`MTE`、`FixPipe`、各级 Buffer。
- 再画一张“PTO 跨卡通信路径叠加图”：把 `TPUT/TGET` 画为实线或半实线，把 `TPUT_ASYNC/TGET_ASYNC`、`URMA`、`CCU` 画为虚线 claim。
- 分离架构图里，AIC 与 AIV 之间的数据交换默认绕行 `GM`；不要画成 AIC 直接连 AIV 的本地缓存通道。
- `L2 Cache` 作为访问 `GM` 的缓存层，建议画在 AI Core 外部和 GM 之间，不要塞进 AIC 或 AIV 子容器。
- `BT Buffer` 与 `FP Buffer` 是分离架构相关的专用 Buffer；如果画耦合模式简图，可以先省略或灰化。
