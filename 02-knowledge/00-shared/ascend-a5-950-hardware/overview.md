# A5 / Ascend 950 硬件架构理解与 PyPTO 影响总览

本文是 `A5 / Ascend 950` 主题的快速入口，用于建立硬件架构、代际变化、PyPTO 框架适配、算子开发影响、调试调优影响和 Toolkit 场景的总览。

更完整的展开分析见 [a5-950-pypto-impact-report.md](a5-950-pypto-impact-report.md)。本文只保留可复用的结论、边界和跳转线索，不替代详细报告。

## 可信度与读法

| 标记 | 含义 | 使用方式 |
| --- | --- | --- |
| `verified` | 已由 CANN 官方文档、本地 `pypto` 源码 / 文档或既有知识库确认。 | 可作为 PyPTO / 通用 AI Core 事实写入。 |
| `public material` | 来自 CANN 开发者社区文章、公开发布材料或媒体报道，但尚未在本地源码中逐项确认。 | 可作为 950 公开能力描述，但不等同于 PyPTO 已暴露字段。 |
| `inferred` | 由通用 AI Core 结构、950 公开材料和 PyPTO 机制组合推导。 | 可用于产品解释和 UX 设计，需标明不是 trace 直出。 |
| `article claim` | 来自文章、社区解读或非 primary 材料，暂未二次确认。 | 只能作为灰色扩展层、虚线层或待核验点。 |
| `unverified` | 本轮没有足够证据确认。 | 不进入默认 UI，只保留检索线索。 |

读本文时先区分三类信息：

- 硬件公开能力：例如 `Cube-Vector fused path`、`NDDMA`、`BufferID`、`UnifiedBus`、`URMA`、`CCU`。
- PyPTO 源码事实：例如 `DAV_3510`、`MixSubgraphSplit`、`CV_SYNC_SRC`、`CV_SYNC_DST`、`rootHash`、`callOpMagic`、`leafHash`、`wrapId`。
- Toolkit / UX 推导：例如 Mix 模式泳道图、硬件解释面板、claim / verified 分层视图。

## 主题边界

- `A5` / `Ascend 950` 相关硬件能力单独沉淀在本主题。
- 通用 AI Core 对象和主路径，例如 `GM`、`L2 Cache`、`UB`、`L1`、`L0A/L0B/L0C`、`MTE1/2/3`、`FixPipe`、`AIC`、`AIV`，仍以 `02-knowledge/00-shared/ascend-aicore-hardware/overview.md` 为基础口径。
- PyPTO trace 字段、计算图 / 泳道图桥接字段仍以本地 `pypto` 镜像和 PyPTO Toolkit 资料为准。
- 当前 demo 中的硬件路径属于 `L2 storyboard`：字段和路径基于真实结构与工具字段推导，但不是某次 950 真机运行 trace。

## 产品与代际口径

| 对象 | 当前理解 | 可信度 | UI / 文案建议 |
| --- | --- | --- | --- |
| `A5` | 项目内可作为 Ascend 950 代际主题名使用。 | `inferred` | 对外 UI 写 `A5 / Ascend 950`，避免只出现内部简称。 |
| `Ascend 950` | 新一代昇腾 NPU 架构，公开材料强调面向大模型训练、推理、prefill / decode 等场景。 | `public material` | 作为硬件区域标题和代际视图。 |
| `Ascend 950 Die` | 950PR / 950DT 基于同一代 950 Die，与不同 Memory 合封形成不同产品形态。 | `public material` | 可用于解释 PR / DT 同代不同形态。 |
| 双 DIE UMA | 公开材料称 950 Die 采用双 DIE UMA，双 DIE 通过高速 DIE to DIE 通道连接。 | `public material` | 可用于解释“用户无感使用 2 DIE 算力”的顶层结构。 |
| `950PR` | 面向 Prefill / Recommendation 的产品形态。 | `public material` | 只作为产品标签，不强行绑定当前 Mix trace。 |
| `950DT` | 面向 Decode / Training 的产品形态。 | `public material` | 只作为产品标签，不强行绑定当前 Mix trace。 |

核心判断：A5 / Ascend 950 的关键变化不是单点提高 Cube 算力，而是把 Cube、Vector、访存、同步和互联都朝“混合任务更高效”方向增强。对 PyPTO 最直接的影响，是 Cube-Vector 融合和 Mix 任务形态。

## 950 相关硬件对象

| 对象 | 当前理解 | 与 PyPTO / Toolkit 的关系 | 可信度 |
| --- | --- | --- | --- |
| `AIC / Cube Core` | 矩阵计算侧，围绕 `L1`、`L0A/L0B/L0C`、`Cube`、`Scalar`、`MTE1/MTE2`、`FixPipe` 工作。 | `CALL Q-MatMul`、`CALL Cache-MatMul` 等 Cube 任务的主要执行侧。 | `verified` for 通用结构；950 规格为 `public material` |
| `AIV / Vector Core` | 向量计算侧，围绕 `UB`、`Vector`、`Scalar`、`MTE2/MTE3` 工作。 | dequant、RoPE、softmax、cast 等 Vector 后处理的主要执行侧。 | `verified` for 通用结构；950 规格为 `public material` |
| `Cube-Vector fused path` | 公开材料称 950 增加 Cube-Vector 融合通路。 | 是解释 Mix 任务为何从 950 开始更重要的核心线索；不要画成本地 buffer 直连。 | `public material` |
| `NDDMA` | 公开材料称可覆盖 transpose、stride、broadcast、slice 等复杂搬运 / 格式转换。 | 可解释 TileShape、layout、stride、数据搬运粒度为什么影响端到端性能。 | `public material` |
| `128B Sector L2` | 公开材料称 L2 Cache 访存颗粒度支持 128B sector。 | 可解释小包、离散、不连续访存的调优价值。 | `public material` |
| `BufferID` | 公开材料称用于描述同步依赖，降低显式 set/wait 配对复杂度。 | 可与 `CV_SYNC_WAIT` / `CV_SYNC_SET` 建立语义解释关系，但当前不改写现有 trace 字段。 | `public material` |
| `UnifiedBus` | 950 公开材料中的 IO / 互联能力。 | UI 必须写全名 `UnifiedBus`，避免和 `Unified Buffer` / `UB` 混淆。 | `public material` |
| `URMA` | 公开材料中的通信 / 内存访问能力。 | 对象可展示；和 PyPTO PTO 异步路径的绑定仍需用虚线 claim 表达。 | `public material` for object；`article claim` for PyPTO binding |
| `CCU` | 公开材料提到的集合通信硬化 / 卸载能力。 | 可用于未来 collective / 多卡场景解释，不强行绑定当前单卡 Mix demo。 | `public material` for object；`article claim` for PyPTO path |

## PyPTO 框架适配速览

| 适配点 | 当前理解 | 可信度 |
| --- | --- | --- |
| `DAV_3510` | 本地 `pypto` 源码中存在 A5 / 950 相关架构分支。 | `verified` |
| `GraphUtils::IsCVMixPlatform()` | 在 `DAV_3510` 上用于判断 CV mix 平台。 | `verified` |
| CV mix scope 约束 | 非 CV mix 平台不允许同一 scope 混合 Cube / Vector；CV mix 平台也要求特定 merge 选项关闭。 | `verified` |
| `MixSubgraphSplit` | 将 Mix 子图拆分为独立 Cube 和 Vector 子图。 | `verified` |
| `CV_SYNC_SRC` / `CV_SYNC_DST` | 表达 AIC / AIV 协同同步；CodeGen 中对应 sync set / wait。 | `verified` |
| Mix OoO schedule / ReduceCopy | `DAV_3510` 上存在 Mix schedule、ReduceCopy 等 graph partition / schedule 适配。 | `verified` |
| runtime / profiling 分支 | runtime、dynamic machine、PMU / profiler 中存在 `DAV_3510` 分支。 | `verified` |
| 950 专用模型 / case | 本地模型中已有 950 分支和 `@pytest.mark.soc("950")` case。 | `verified` |

一句话概括：PyPTO 对 A5 / 950 的适配不只在“平台名”层面，而是贯穿 scope 校验、graph partition、Mix 子图拆分、同步插入、CodeGen、runtime、profiling 和模型配置。

## 对算子开发与调试调优的影响

### 算子开发影响

| 影响 | 开发阶段的新问题 |
| --- | --- |
| Cube-Vector 融合让 MatMul + Vector 后处理更值得一起设计。 | 哪些 Vector 后处理应该贴近 MatMul？Cube / Vector TileShape 怎样配才不形成多对多依赖？ |
| Vector 能力增强改变任务划分判断。 | 哪些小包、分支、离散访问逻辑适合放到 Vector / SIMT 路径？是否需要保留上一代配置？ |
| `NDDMA`、`128B Sector L2` 和低精度格式让数据表达更敏感。 | dtype、layout、stride、tile 粒度应该按计算密度调，还是按搬运 / L2 友好性调？ |
| PyPTO Mix 子图约束让“能不能混”成为开发期问题。 | 同一 scope 内混 Cube / Vector 为什么编译失败？`MixSubgraphSplit` 后边界如何理解？ |
| 950 专用模型 / case 需要单独配置与验证。 | 950 分支、tile config、pass options、runtime options 如何管理，避免与通用路径漂移？ |

### 调试调优影响

| 影响 | 调试调优阶段的新问题 |
| --- | --- |
| Mix 子图让同步等待成为一等性能问题。 | task 很长到底是计算慢，还是 `CV_SYNC_WAIT` 在等 peer core？ |
| Cube / Vector TileShape 不匹配会放大依赖复杂度。 | 多对多依赖在计算图里怎么看，在泳道图里表现为什么？ |
| 调优旋钮更多，但目标之间可能冲突。 | L1Reuse、NBuffer、L2 亲和、ReduceCopy、Mix schedule 谁带来收益，谁引入等待？ |
| 跨图定位成为调优刚需。 | 如何从泳道 task 用 `rootHash`、`callOpMagic`、`leafHash`、`wrapId` 反查源码、CALL 和 leaf？ |
| 950 新硬件能力需要和 PyPTO trace 字段分层解释。 | `BufferID`、`URMA`、`CCU` 是当前 trace 事实，还是公开能力 / claim 层解释？ |

## Mix 节点到 950 硬件路径的映射

| PyPTO / UI 节点 | 硬件视角 | 数据流 | 指令 / 控制流 | 可信度 |
| --- | --- | --- | --- | --- |
| `CALL Q-MatMul` | Cube 主路径 | `GM/L2 -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1` | `Scalar -> MTE2 -> MTE1 -> Cube -> FixPipe` | `inferred` |
| `CALL Cache-MatMul` | Cube 主路径 | `GM/L2 -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1` | `Scalar -> MTE2 -> MTE1 -> Cube -> FixPipe` | `inferred` |
| `L1Reuse group` | Cube 复用路径 | `GM/L2 -> L1` 搬入次数下降，右矩阵在 `L1` 侧复用。 | `Scalar` 组织多轮 `MTE1 + Cube`，减少重复 `MTE2` 压力。 | `inferred` |
| `Dequant` / `RoPE` / `Cast` | Vector 主路径 | `GM/L2 -> Unified Buffer -> Vector -> Unified Buffer -> GM` | `Scalar -> MTE2 -> Vector -> MTE3` | `inferred` |
| `CV_SYNC_WAIT` / `CV_SYNC_SET` | AIC / AIV 协同控制 | 不代表数据搬运；数据仍应通过 `GM/L2` 或 trace 明确路径解释。 | AIC / AIV Scalar 发起同步依赖；950 可用 `BufferID` 做语义解释。 | `inferred` |
| `OUTCAST` / `copy out` | 输出搬运 | Cube 侧多见 `L0C -> FixPipe -> GM`，Vector 侧多见 `UB -> MTE3 -> GM`。 | 对应搬出指令或随路处理。 | `inferred` |

跨视图定位时，建议保留这条链：

```text
swimlane task
-> event-hint.rootHash
-> event-hint.callOpMagic
-> event-hint.leafHash
-> wrapId / sync event
-> Execute Graph / CALL / Block Graph / Mix group
-> AIC / AIV / GM / L2 / sync path
```

## UI / Toolkit 联动原则

1. 默认展示 `A5 / Ascend 950` 的分离架构底图：`AIC / Cube Core`、`AIV / Vector Core`、`GM`、`L2`、`IO / interconnect`。
2. 点击 Execute Graph 的 `CALL` 节点时，硬件区展示粗粒度路径；点击 Block Graph 节点时，硬件区展示更细的 buffer / engine 高亮。
3. 点击泳道图 bar 时，优先按 `eventKind`、`semanticLabel`、`rootHash`、`callOpMagic`、`leafHash`、`wrapId`、`syncType` 映射硬件路径。
4. 数据流和指令 / 控制流分开编码：数据流用粗实线，指令 / 控制流用细线或虚线。
5. `CV_SYNC_WAIT` 不画成数据搬运线，只画控制依赖；可用 `BufferID` 做语义解释，但不改写现有 trace。
6. `UnifiedBus` 和 `Unified Buffer` 必须在 UI 文案中写全称，不能都缩成 `UB`。
7. `URMA`、`CCU`、PTO 异步路径默认归入 claim / extension layer，不能和已验证 AI Core 主路径混成同一可信度。
8. Toolkit 后续可探索六类场景：Mix 模式泳道图、代码-计算图-泳道图-硬件流四联动、Cube / Vector TileShape 调优助手、A5 硬件解释面板、950 claim / verified 分层视图、Mix 关键路径与等待归因。

## 后续检索问题

- CANN 官方文档是否已公开 950 更细的 AIC/AIV buffer 容量、NDDMA 指令语义、BufferID API 或 runtime trace 字段。
- PyPTO 是否已经有 950 专用 trace 字段，可以把 `CV_SYNC_WAIT` / `CV_SYNC_SET` 映射到 BufferID。
- PTO 异步路径和 `URMA`、`CCU` 的绑定是否能在源码、官方 API 或样例里确认。
- `DAV_3510` 与对外产品名 `Ascend 950PR / 950DT` 在所有 PyPTO 配置、安装路径、runtime 产物中的映射是否完全稳定。
- Toolkit 是否需要把 `mix_groups` / `sync_events` 设计成正式 JSON schema，而不是仅由前端推断。
