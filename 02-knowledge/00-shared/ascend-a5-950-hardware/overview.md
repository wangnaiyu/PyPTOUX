# A5 / Ascend 950 硬件架构理解

本文沉淀 `A5` / `Ascend 950` 相关硬件知识，面向 PyPTO Mix 任务调优 demo、硬件结构图、计算图 / 泳道图 / 硬件流三方联动使用。

## 可信度标记

| 标记 | 含义 | Demo 画法 |
| --- | --- | --- |
| `verified` | 已由 CANN 官方文档或本地 `pypto` 代码确认。 | 主结构、实线、高亮可直接展示。 |
| `public material` | 来自 CANN 开发者社区文章、公开发布材料或媒体报道，但尚未沉淀到可交叉核验的官方手册 / 本地源码。 | 可展示为 950 公开能力，但详情区保留来源提示。 |
| `inferred` | 由已确认的通用 AI Core 结构和 950 公开材料组合推导，适合做产品解释，但不是 trace 直出事实。 | 可展示，但详情区标“推导”。 |
| `article claim` | 来自论文、社区解读、媒体文章或非官方材料，暂未在官方文档 / 本地代码中二次确认。 | 灰色、虚线、可通过 claim toggle 隐藏。 |
| `unverified` | 本轮没有足够证据确认。 | 不进入默认 UI，只保留检索线索。 |

## 主题边界

- `A5` / `Ascend 950` 相关硬件能力单独沉淀在本主题。
- 通用 AI Core 对象，例如 `GM`、`L2 Cache`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`、`FixPipe`、`AIC`、`AIV`，仍以 `02-knowledge/00-shared/ascend-aicore-hardware/overview.md` 为基础口径。
- PyPTO trace 字段、计算图 / 泳道图桥接字段仍以 PyPTO 主题和本地 `pypto` 镜像为准，例如 `rootHash`、`callOpMagic`、`leafHash`、`wrapId`。
- 当前 demo 中的硬件路径属于 `L2 storyboard`：字段和路径基于真实结构与工具字段推导，但不是某次 950 真机运行 trace。

## 产品与代际口径

| 对象 | 当前理解 | 可信度 | UI 建议 |
| --- | --- | --- | --- |
| `Ascend 950` | 新一代昇腾 NPU 架构，公开材料中强调面向大模型训练、推理、推理 prefill / decode 等场景的开放硬件能力。 | `public material` | 作为硬件区域标题和代际视图。 |
| `950PR` | 公开材料中面向 Prefill / Recommendation 的产品形态。 | `public material` | 只作为产品标签，不把 PR 场景强行绑定到当前 Mix trace。 |
| `950DT` | 公开材料中面向 Decode / Training 的产品形态。 | `public material` | 只作为产品标签，不把 DT 场景强行绑定到当前 Mix trace。 |
| `A5` | 项目内可作为 Ascend 950 代际主题名使用。 | `inferred` | UI 可写 `A5 / Ascend 950`，避免用户只看到内部简称。 |

## 950 相关硬件对象

| 对象 | 当前理解 | 与 Mix 调优的关系 | 可信度 | Demo 画法 |
| --- | --- | --- | --- | --- |
| `AIC / Cube Core` | 分离架构下的矩阵计算侧，包含 `L1`、`L0A/L0B/L0C`、`Cube`、`Scalar`、`MTE1/MTE2`、`FixPipe` 等对象。 | `CALL Q-MatMul`、`CALL Cache-MatMul` 的主要执行侧。 | `verified` | AIC 区域实线，Cube 任务选中时高亮。 |
| `AIV / Vector Core` | 分离架构下的向量计算侧，包含 `UB`、`Vector`、`Scalar`、`MTE2/MTE3` 等对象。 | `Dequant`、`RoPE`、`Softmax`、`Cast` 等向量任务主要执行侧。 | `verified` | AIV 区域实线，Vector 任务选中时高亮。 |
| `Cube-Vector fused path` | 950 公开材料强调 Cube 与 Vector 的融合通路，用于提升混合矩阵 / 向量场景效率。 | 是解释 Mix 任务为何从 950 开始更重要的核心线索。 | `public material` | 在 AIC 和 AIV 之间画高亮控制 / 协同通路，但不要画成本地 buffer 直连。 |
| `NDDMA` | 950 公开材料提到的新 DMA 能力，可支持更复杂的数据搬移和格式转换场景。 | 可解释 TileShape、搬运粒度、stride / transpose / slice 等优化为什么影响端到端。 | `public material` | 作为搬运增强节点，关联 `Data flow` 视图。 |
| `128B Sector L2` | 950 公开材料提到 L2 cacheline 支持 128B sector。 | 可解释小粒度访存、L2 命中和碎片化访问的性能影响。 | `public material` | 画在 `GM` 与 AI Core 之间，作为 L2 增强标签。 |
| `BufferID` | 950 公开材料提到用于描述同步依赖的模型，可降低显式 set/wait 配对复杂度。 | 可与泳道图里的 `CV_SYNC_WAIT` / `CV_SYNC_SET` 建立“同步语义解释”关系。 | `public material` | 控制流视图中展示，不把现有 trace 字段改写成 BufferID。 |
| `UnifiedBus` | 950 公开材料提到的 IO 互联能力，缩写也可能是 `UB`。 | 只用于解释跨芯片 / IO 通信，不等同于 AICore 里的 `Unified Buffer`。 | `public material` | UI 必须写全名 `UnifiedBus`，避免和 `UB / Unified Buffer` 混淆。 |
| `URMA` | 公开材料中作为 950 通信 / 内存访问能力出现；具体和 PTO 异步路径的绑定仍需进一步确认。 | 可作为跨卡异步搬运的候选解释层。 | `public material` for object, `article claim` for PTO binding | 对象可出现；和 PTO 异步的连接用虚线 claim。 |
| `CCU` | 公开材料提到集合通信硬化 / 卸载能力；具体和 PyPTO Mix trace 的关联未在本地代码确认。 | 可用于解释未来 collective / 多卡场景，不应强行绑定当前单卡 Mix 任务。 | `public material` for object, `article claim` for PyPTO path | 默认灰化，只有选择 collective claim 场景时高亮。 |

## Mix 节点到 950 硬件路径的映射

| PyPTO / UI 节点 | 硬件视角 | 数据流 | 指令 / 控制流 | 可信度 |
| --- | --- | --- | --- | --- |
| `CALL Q-MatMul` | Cube 主路径 | `GM/L2 -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1` | `Scalar -> MTE2 -> MTE1 -> Cube -> FixPipe` | `inferred` |
| `CALL Cache-MatMul` | Cube 主路径 | `GM/L2 -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1` | `Scalar -> MTE2 -> MTE1 -> Cube -> FixPipe` | `inferred` |
| `L1Reuse group` | Cube 复用路径 | `GM/L2 -> L1` 搬入次数下降，右矩阵在 `L1` 侧复用 | `Scalar` 组织多轮 `MTE1 + Cube`，减少重复 `MTE2` 压力 | `inferred` |
| `Dequant` / `RoPE` / `Cast` | Vector 主路径 | `GM/L2 -> Unified Buffer -> Vector -> Unified Buffer -> GM` | `Scalar -> MTE2 -> Vector -> MTE3` | `inferred` |
| `CV_SYNC_WAIT` / `CV_SYNC_SET` | AIC / AIV 协同控制 | 不代表数据搬运；数据仍应通过 `GM/L2` 或 trace 明确的路径解释。 | `AIC/AIV Scalar` 发起同步依赖；950 可用 `BufferID` 作为同步语义解释。 | `inferred` |
| `OUTCAST` / `copy out` | 输出搬运 | Cube 侧多见 `L0C -> FixPipe -> GM`，Vector 侧多见 `UB -> MTE3 -> GM`。 | 对应搬出指令或随路处理。 | `inferred` |

## UI 联动原则

1. 默认展示 `A5 / Ascend 950` 的分离架构底图：`AIC / Cube Core`、`AIV / Vector Core`、`GM`、`L2`、`IO / interconnect`。
2. 点击 Execute Graph 的 `CALL` 节点时，硬件区展示粗粒度路径；点击 Block Graph 节点时，硬件区展示更细的 buffer / engine 高亮。
3. 点击泳道图 bar 时，优先按 `eventKind`、`semanticLabel`、`wrapId`、`syncType` 映射硬件路径。
4. 数据流和指令流要分开编码：数据流用粗实线，指令 / 控制流用细线或虚线。
5. `CV_SYNC_WAIT` 不画成数据搬运线，只画控制依赖。
6. `UnifiedBus` 和 `Unified Buffer` 必须在 UI 文案中写全称，不能都缩成 `UB`。
7. `URMA`、`CCU`、PTO 异步路径默认归入 claim / extension layer，不能和已验证 AI Core 主路径混成同一可信度。

## 后续检索问题

- CANN 官方文档是否已公开 950 更细的 AIC/AIV buffer 容量、NDDMA 指令语义、BufferID API 或 runtime trace 字段。
- PyPTO 是否已经有 950 专用 trace 字段，可以把 `CV_SYNC_WAIT` / `CV_SYNC_SET` 映射到 BufferID。
- PTO 异步路径和 `URMA`、`CCU` 的绑定是否能在源码、官方 API 或样例里确认。
