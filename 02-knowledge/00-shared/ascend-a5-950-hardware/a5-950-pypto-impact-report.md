# A5 / Ascend 950 与 PyPTO 影响报告

本文回答 A5 / Ascend 950 相关的五个问题：

- A5（Ascend 950）的硬件架构长什么样？
- A5 和上一代的最大区别是什么？
- 为了更好地发挥 A5 性能，PyPTO 框架层面是否有什么适配？
- 对 PyPTO 算子开发、调试调优带来了什么影响或改变？
- 在 PyPTO Toolkit 里可以探索哪些新的用户场景和用户体验？

## 0. 可信度与来源口径

| 标记 | 含义 | 本文使用方式 |
| --- | --- | --- |
| `verified` | 已由本地 `pypto` 源码、文档或既有知识库中的官方 CANN 文档口径确认。 | 可作为 PyPTO / 通用 AI Core 事实写入。 |
| `public material` | 来自 CANN 开发者社区公开材料或公开发布信息，但尚未在本地源码中逐项确认。 | 可作为 950 公开能力描述，但不等同于 PyPTO 已暴露字段。 |
| `inferred` | 由通用硬件结构、公开材料和 PyPTO 机制组合推导。 | 可用于 UX / Toolkit 场景解释，需标明不是 trace 直出。 |
| `article claim` | 来自文章、社区解读或未二次确认材料。 | 只能作为扩展层、虚线层或待核验点。 |
| `unverified` | 本轮没有足够证据确认。 | 不写成结论。 |

主要来源：

- `02-knowledge/00-shared/ascend-a5-950-hardware/overview.md`、`sources.md`、`glossary.md`
- `02-knowledge/00-shared/ascend-aicore-hardware/overview.md`
- 本地 `pypto` 镜像：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
- CANN 开发者社区文章：`https://cann.csdn.net/69d8a96e54b52172bc684f2e.html`

本轮没有刷新本地 `pypto` 镜像。已观察到的本地镜像最新提交为 `b95d621d 2026-04-27 19:53:50 +0800`，且镜像中存在未跟踪 `.DS_Store` 文件，因此按项目规则只读使用。

## 1. A5 / Ascend 950 的硬件架构长什么样

### 1.1 芯片与产品形态

Ascend 950 公开材料中出现两类产品形态：

| 对象 | 当前理解 | 可信度 |
| --- | --- | --- |
| `Ascend 950PR` | 面向 Prefill / Recommendation 场景，强调性价比。 | `public material` |
| `Ascend 950DT` | 面向 Decode / Training 场景，强调更高访存带宽和性能。 | `public material` |
| `Ascend 950 Die` | 950PR / 950DT 基于同一代 950 Die，与不同 Memory 合封形成不同产品形态。 | `public material` |
| 双 DIE UMA | 公开材料称 Ascend 950 Die 采用双 DIE UMA 架构，双 DIE 通过高速 DIE to DIE 通道连接，使用户无感使用 2 DIE 算力。 | `public material` |

可把 A5 / Ascend 950 的顶层结构先理解为：

```text
Ascend 950 package
├── Ascend 950 Die x 2
│   ├── AICORE subsystem
│   │   ├── AIC / Cube Core
│   │   ├── AIV / Vector Core
│   │   ├── GM / L2 / local buffers
│   │   └── Cube-Vector fused path
│   ├── Storage subsystem
│   │   └── HiBL 1.0 or HiZQ 2.0 memory package
│   └── IO subsystem
│       ├── UnifiedBus
│       ├── UBoE / PCIe compatibility
│       ├── URMA
│       └── CCU / collective acceleration unit
└── High-speed die-to-die channel
```

其中 `UnifiedBus`、`URMA`、`CCU` 是 950 公开材料中的互联 / 通信能力对象。它们可以进入 Toolkit 的硬件解释层，但当前不应直接写成 PyPTO trace 已经暴露的字段。

### 1.2 AICORE 子系统

A5 / Ascend 950 公开材料强调第三代 DaVinci 架构，并围绕当前 Transformer、推荐、多模态等混合计算场景做增强。对 PyPTO 最重要的是这些对象：

| 对象 | 说明 | 可信度 |
| --- | --- | --- |
| `AIC / Cube Core` | 矩阵 / Tensor 计算侧，围绕 `L1`、`L0A/L0B/L0C`、`Cube`、`FixPipe` 等对象工作。 | `verified` for 通用结构；950 规格为 `public material` |
| `AIV / Vector Core` | 向量计算侧，围绕 `UB`、`Vector`、`MTE2/MTE3` 等对象工作。 | `verified` for 通用结构；950 规格为 `public material` |
| `Cube-Vector fused path` | 公开材料称 950 增加 Cube-Vector 融合通路，用于提升混合矩阵 / 向量场景效率。 | `public material` |
| `128B Sector L2` | 公开材料称 L2 Cache 访存颗粒度从上一代常见 512B 降到 128B sector，以提升小包、离散、不连续访存效率。 | `public material` |
| `NDDMA` | 公开材料称用于 transpose、stride、broadcast、slice 等复杂搬运 / 格式转换。 | `public material` |
| `BufferID` | 公开材料称用于替代复杂 set/wait 配对，表达多核同步依赖。 | `public material` |

通用 AI Core 主路径仍以现有知识库口径为准：

- Cube 路径：`GM -> L1 -> L0A/L0B -> Cube -> L0C -> FixPipe -> GM/L1`
- Vector 路径：`GM -> UB -> Vector -> UB -> GM`
- 分离架构下，AIC 与 AIV 的数据协作不应画成本地 buffer 直连；默认通过 `GM/L2` 或 trace 明确路径解释。

### 1.3 IO / 互联扩展层

950 公开材料还强调 UnifiedBus、UBoE、PCIe 兼容、URMA 以及集合通信硬化 / 卸载能力。对 PyPTOUX 的画法建议是：

- 主结构默认画 `AIC / AIV / GM / L2 / local buffers`。
- `UnifiedBus`、`URMA`、`CCU` 放在 IO / interconnect extension layer。
- 如果没有 PyPTO trace 或源码直接证明，不把 `URMA`、`CCU` 强行绑定到当前单卡 Mix 任务。
- UI 文案写全 `UnifiedBus`，避免和 AI Core 内部 `Unified Buffer` / `UB` 混淆。

## 2. A5 和上一代最大的区别

如果只选一个“对 PyPTO 最有影响”的区别，本文建议表述为：

> A5 / Ascend 950 不只是单点提高 Cube 算力，而是把 Cube、Vector、访存、同步和互联都朝“混合任务更高效”方向重构；其中对 PyPTO 算子开发和 Toolkit 体验影响最大的，是 Cube-Vector 融合和 Mix 任务形态。

可以分三层理解：

| 层次 | 最大区别 | 对 PyPTO 的意义 | 可信度 |
| --- | --- | --- | --- |
| 封装 / 产品层 | 双 DIE UMA、950PR / 950DT 与不同 Memory 合封。 | 用户更容易在同一代硬件内面对不同 memory / bandwidth / scenario profile。 | `public material` |
| 核微架构层 | Cube-Vector fused path、Vector 算力占比提升、SIMD/SIMT、低精度格式、NDDMA、128B Sector L2、BufferID。 | 算子不再只围绕“单个 Cube 或单个 Vector 子图”优化，而要关注 Cube / Vector 之间的依赖、同步和流水节奏。 | `public material` |
| 软件 / 工具层 | PyPTO 本地源码出现 `DAV_3510`、CV mix 平台识别、Mix 子图拆分、`CV_SYNC_SRC/DST`、Mix schedule、runtime / profiling 分支。 | PyPTO 已经在框架层面对 CV mix / A5 代际做适配。 | `verified` |

这也解释了为什么用户提到 “Die、CV 融合 / Mix 任务” 是关键线索：

- `Die` 解释的是芯片封装、UMA 和产品形态变化。
- `CV 融合 / Mix 任务` 解释的是对算子开发、PyPTO 编译、调度、调试调优最直接的变化。

## 3. PyPTO 框架层面是否有适配

结论：有。基于本地 `pypto` 镜像，PyPTO 已经出现多处 A5 / `DAV_3510` / CV mix 相关适配。

### 3.1 平台识别与 scope 约束

本地源码中，`GraphUtils::IsCVMixPlatform()` 会在 `DAV_3510` 架构上返回 CV mix 平台判断。`expand_function.cpp` 中对同一 scope 内混合 Cube / Vector op 做校验：

- 非 CV mix 平台不允许在同一 scope 混合 Cube 和 Vector op。
- CV mix 平台允许混合，但要求 `allowParallelMerge` 和 `allowCrossScopeMerge` 为 false。

这说明 PyPTO 在前端表达进入编译链路时，已经区分 CV separate 与 CV mix 平台。

可信度：`verified`

### 3.2 Tile Graph / 子图划分适配

本地源码中能看到 `OspPartitioner` 针对 CV split 与 CV mix 使用不同 core type 映射：

- CV split 下 `AIC`、`AIV` 是不同 vertex type。
- CV mix 下 `AIC`、`AIV` 被映射到同一类 vertex type，用于 mix partition。

`ReduceCopyMerge` 也只在 `NPUArch::DAV_3510` 上运行，并带有 mix graph merge 的约束逻辑。这说明 PyPTO 在 Tile Graph / graph partition 阶段已经为 CV mix 子图组织做了专门处理。

可信度：`verified`

### 3.3 Block Graph / Mix 子图拆分与同步

本地源码中存在 `MixSubgraphSplit` pass，`Pass_module.md` 中说明它用于“拆分 Mix 子图”，将 Mix 子图拆分为独立的 Cube 和 Vector 子图。

同时，本地源码中有：

- `CV_SYNC_SRC`
- `CV_SYNC_DST`
- `GenCVSyncSetOp()`
- `GenCVSyncWaitOp()`
- `InsertSync` 中针对 `DAV_3510` 和 AIV wait 的特殊处理

这说明 PyPTO 在 Block Graph / CodeGen 前后需要显式处理 AIC/AIV 的同步关系。Toolkit 里的 `CV_SYNC_WAIT` / `CV_SYNC_SET` 可以作为 Mix 任务同步语义的关键显示对象。

可信度：`verified`

### 3.4 Mix 调度与 runtime / profiling 适配

本地源码中，OoO schedule 在 `DAV_3510` 且 `IsMixGraph(opList)` 时走 `MixSchedule`，否则走 `NonMixSchedule`。runtime / dynamic machine / profiling 中也存在多处 `DAV_3510` 分支，例如 `ArchInfo::DAV_3510`、`FREQ_DAV_3510`、`aicore_prof_dav3510_pmu.h`、`DeviceTaskContext::IsMixArch` 等。

这说明适配不只停留在 pass 阶段，还进入了运行时任务组织和性能采集链路。

可信度：`verified`

### 3.5 模型 / case 层的 950 专用配置

本地模型中出现 `sparse_flash_attention_quant_d_950`，并且测试入口会根据 `is_soc_950` 选择不同 tile config、pass options 和 runtime options。

例如 950 分支会调整：

- `gather_vec_tile_shape`
- `c1_tile_shape`
- `v1_tile_shape`
- `v2_tile_shape`
- `vec_nbuffer_setting`
- `cube_l1_reuse_setting`
- `stitch_function_max_num`
- `device_sched_mode`

这说明 A5 / 950 不是只靠硬件自动加速；在高性能算子里，PyPTO 层和模型实现层也需要单独配置。

可信度：`verified`

## 4. 对 PyPTO 算子开发的影响

### 4.1 Cube-Vector 融合让 MatMul + Vector 后处理更值得一起设计

**A5 的变化或特点**

A5 / Ascend 950 公开材料强调 `Cube-Vector fused path`，并称其用于提升 Cube-Vector 融合算子性能。通用 AI Core 结构中，AIC 负责 Cube / MatMul 类任务，AIV 负责 dequant、RoPE、softmax、cast 等 Vector 后处理。PyPTO 性能文档也明确建议调整相邻 Cube 和 Vector Operation 的 TileShape，使 Cube 子图和 Vector 子图之间依赖更简单，尽量避免多对多依赖关系。

可信度：硬件变化为 `public material`；PyPTO 调优建议为 `verified`。

**影响**

开发者不能只把 MatMul 写成一个孤立 Cube 子图，再把所有后处理留给后续 Vector 子图。对于 attention、quant、dequant、RoPE、softmax、cast、outcast 等组合路径，开发阶段就要考虑：

- Cube 输出 tile 是否便于 Vector 继续消费。
- Vector 后处理 tile 是否与上游 Cube / transpose / gather 的输出 tile 对齐。
- 中间结果是否会引入额外 GM 往返。
- 子图切分后是否能形成稳定的一对一或少量依赖，而不是多对多依赖。

**用户在开发阶段可能会面临的新问题**

- 我应该把哪些 Vector 后处理贴近 MatMul 设计，哪些保持独立？
- Cube 和 Vector 的 TileShape 要怎样配，才能让依赖简单、合图稳定？
- 为什么同样的 Tensor 表达，在 950 上能形成 Mix 子图，在非 CV mix 平台却不允许？
- 我设置了 `sg_set_scope`，为什么 PyPTO 报同一 scope 内 Cube / Vector mix 的限制？
- 当前前端写法是否会让中间结果频繁落 GM，从而浪费 950 的融合通路优势？

### 4.2 Vector 算力占比提升与 SIMD/SIMT 演进改变任务划分判断

**A5 的变化或特点**

公开材料称 950 大幅提升 Vector 算力，Cube:Vector 算力配比达到 8:1，并采用 SIMD/SIMT 新同构设计。公开材料还把复杂逻辑、小包搬运、条件分支、离散访问等场景放到 SIMT 能力提升的语境中解释。

可信度：`public material`

**影响**

在上一代开发心智里，开发者可能更倾向于把核心性能问题压到 Cube / MatMul 主链路上，把 Vector 视为后处理或辅助路径。A5 上 Vector 侧能力增强后，开发者需要重新判断：

- 哪些小粒度后处理值得留在 Vector 侧并提高并行度。
- 哪些不规则访问 / 条件逻辑不再一定是纯开销，而可能通过 SIMT/SIMD 混合获得较好吞吐。
- 哪些原本为了规避 Vector 瓶颈而写得很绕的表达，可以改成更直接的 Tensor / Tile 组合。

**用户在开发阶段可能会面临的新问题**

- 这个逻辑应该写成 Cube 前处理、Vector 后处理，还是拆成 Mix 路径？
- 当前 Vector 子图数量太多，是应该增大 TileShape 减少调度开销，还是减小 TileShape 提升并行度？
- 哪些分支 / scatter / gather / mask 类逻辑适合利用 A5 的 Vector / SIMT 能力？
- 我是否还需要为上一代硬件保留一套不同的表达或配置？

### 4.3 NDDMA、128B Sector L2 和低精度格式让数据表达更敏感

**A5 的变化或特点**

公开材料称 950 支持 `NDDMA`，可覆盖 transpose、stride、broadcast、slice 等搬运 / 格式转换场景；L2 支持 128B Sector，提升小包、离散、不连续访存效率；同时新增或增强 FP8、MXFP8、MXFP4、HiF8 等低精度格式能力。

可信度：`public material`

**影响**

这些能力会扩大 PyPTO 算子在 dtype、layout、stride、tile 粒度上的优化空间，但也会让开发者更早面对数据表达问题：

- dtype 选择不只是精度问题，也影响搬运、L2、Cube / Vector 指令路径。
- layout / stride / transpose 是否能被高效搬运，可能决定端到端收益。
- 小包和离散访问不一定都要粗暴合并，但需要理解是否能命中 128B Sector L2 和 NDDMA 能力。
- 低精度格式可能需要 PyPTO op、cast、matmul、verify、golden 对齐共同支持。

**用户在开发阶段可能会面临的新问题**

- 我应该使用 BF16、FP8、MXFP8、MXFP4 还是 HiF8？PyPTO 当前 API / op 是否都支持？
- 我的 transpose / stride / slice 写法是否会触发高效搬运路径，还是退化成多次 GM 访问？
- TileShape 是为了计算密度调，还是为了 128B sector / NDDMA 友好性调？
- 低精度引入后，golden、精度阈值、cast 位置和中间格式应该怎样设计？

### 4.4 PyPTO Mix 子图约束让“能不能混”成为开发期问题

**A5 的变化或特点**

本地 PyPTO 源码中，CV mix 平台由 `GraphUtils::IsCVMixPlatform()` 判断，并在 `DAV_3510` 上成立。同一 scope 内混合 Cube / Vector op 时，非 CV mix 平台直接报错；CV mix 平台也要求 `allowParallelMerge` 和 `allowCrossScopeMerge` 为 false。CodeGen 文档还提示，CodeGen 阶段看到的必须是独立的纯 Vector 或纯 Cube 子图，否则可能出现编译参数与指令类型不匹配。

可信度：`verified`

**影响**

开发者在 A5 上可以更自然地表达 Cube / Vector 混合逻辑，但这种“混合”不是任意混。PyPTO 编译链路需要先识别 Mix 子图，再拆分为可以分别 codegen 的 Cube / Vector 子图，并插入必要同步。开发者需要理解：

- 前端 scope 只是表达意图，不代表最终一个 kernel 里任意混合所有指令。
- Mix 子图最终仍需要在 pass 和 CodeGen 前形成合法边界。
- merge 选项、scope 设置、TileShape、依赖形态都会影响能否合法拆分和调度。

**用户在开发阶段可能会面临的新问题**

- 为什么我的 Cube / Vector op 放在同一 scope 后编译失败？
- 为什么 `allowParallelMerge` 或 `allowCrossScopeMerge` 在 CV mix 场景下不能打开？
- `MixSubgraphSplit` 之后，哪些 op 还在同一个逻辑 Mix group，哪些已经拆到不同子图？
- CodeGen 报“Vector 参数中出现 Cube 指令”或相反问题时，我应该回看哪个 pass 的切图结果？

### 4.5 950 专用模型 / case 需要单独配置与验证

**A5 的变化或特点**

本地 PyPTO 模型中已经出现 `sparse_flash_attention_quant_d_950` 和 `@pytest.mark.soc("950")`，并且 950 分支使用不同的 tile config、`vec_nbuffer_setting`、`cube_l1_reuse_setting`、`stitch_function_max_num`、`device_sched_mode` 等配置。

可信度：`verified`

**影响**

高性能算子开发不能假设一套 tile / pass / runtime 配置跨 910、A2/A3、950 都最优。A5 上可能需要：

- 单独的 tile config。
- 单独的 pass options。
- 单独的 runtime options。
- 单独的性能与精度测试入口。
- 针对 950 的 skip / perf case 标记和回归策略。

**用户在开发阶段可能会面临的新问题**

- 我是否应该为 950 单独写一个入口函数，还是在同一函数内按 SoC 分支配置？
- 950 分支和非 950 分支的 tile config 差异应该如何管理，避免长期漂移？
- 哪些 pass options 是通用优化，哪些是 950 专用优化？
- 性能 case 被标记为 `@pytest.mark.soc("950")` 后，本地没有 950 环境时如何验证不破坏通用路径？

## 5. 对 PyPTO 算子调试调优的影响

### 5.1 Mix 子图让同步等待成为一等性能问题

**A5 的变化或特点**

A5 / 950 强调 Cube-Vector 融合，PyPTO 本地源码也有 `CV_SYNC_SRC` / `CV_SYNC_DST`、`GenCVSyncSetOp()` / `GenCVSyncWaitOp()`、`InsertSync`、Mix schedule 等机制。当前 Toolkit / demo 语境中常见的 `CV_SYNC_WAIT` / `CV_SYNC_SET` 正是用户理解 AIC/AIV 协同的重要线索。

可信度：硬件融合为 `public material`；PyPTO 同步机制为 `verified`；把二者映射到 Toolkit 场景为 `inferred`。

**影响**

调优时不能只看一个 task bar 的总耗时。一个 AIV task 很长，可能并不是 Vector 计算慢，而是在等待 AIC 的 `CV_SYNC_SET`；一个 AIC task 很长，也可能导致多个 AIV task 同时等待。Mix 子图调优要从“单核慢不慢”升级到“协作节奏是否对齐”。

**用户在调试调优阶段可能会面临的新问题**

- 这段耗时到底是计算时间，还是 `CV_SYNC_WAIT` 等待时间？
- AIV 在等哪个 AIC？对应的是哪个 `CALL`、哪个 `leafHash`？
- 同一 `wrapId` 下，哪些 task 属于同一个 Mix group？
- 我优化了 Vector 子图但总耗时没变，是不是关键路径其实在 Cube 或同步上？

### 5.2 Cube / Vector TileShape 不匹配会放大依赖复杂度

**A5 的变化或特点**

PyPTO 性能文档明确指出，Vector 上下游 Operation 的 TileShape 对齐时更容易形成简单的一对一依赖和融合子图；不对齐时可能产生多对多依赖，无法正常合图。文档也特别提到要调整相邻 Cube 和 Vector Operation 的 TileShape，使 Cube 子图和 Vector 子图之间依赖更简单。

可信度：`verified`

**影响**

A5 上 Mix 任务更重要后，TileShape 不再只是单个 op 的局部参数。它会影响：

- 子图是否能合并。
- Mix 子图是否容易拆分。
- AIC/AIV 是否能形成稳定流水。
- 泳道图上是否出现大量短 task、等待气泡或负载不均。

**用户在调试调优阶段可能会面临的新问题**

- 为什么我只改了一个 Vector TileShape，泳道图上的并行度和等待关系全变了？
- 当前瓶颈是 TileShape 太大导致并行核少，还是 TileShape 太小导致调度开销高？
- 多对多依赖在计算图里怎么看，在泳道图里又表现为什么？
- 哪些相邻 Cube / Vector op 应该优先对齐 TileShape？

### 5.3 调优旋钮更多，但目标之间可能冲突

**A5 的变化或特点**

PyPTO 性能文档中已有 `cube_l1_reuse_setting`、`cube_nbuffer_setting`、`vec_nbuffer_setting`、`device_sched_mode`、`enable_split_k` 等调优手段。本地源码还显示 A5 / `DAV_3510` 存在 `ReduceCopyMerge`、Mix OoO schedule、runtime / dynamic 分支等机制。

可信度：`verified`

**影响**

A5 上调优空间更大，但用户更容易遇到目标冲突：

- L1Reuse 可能减少搬运，但改变子图组合和等待节奏。
- NBuffer 可能减少小 task 调度开销，但也可能影响并行粒度。
- L2 亲和调度可能提升 cache hit，但牺牲负载均衡。
- ReduceCopy / Mix schedule 可能改善 Mix 子图执行，但用户需要看懂它对图结构和泳道的影响。

**用户在调试调优阶段可能会面临的新问题**

- 我应该先调 TileShape、合图，还是先调 runtime scheduling？
- L2 亲和调度打开后性能下降，是 cache 复用没收益，还是负载均衡变差？
- `cube_l1_reuse_setting` 和 `vec_nbuffer_setting` 同时改时，怎么判断是谁带来的收益？
- 某个 pass 看起来减少了子图数量，为什么实际泳道图等待反而增加？

### 5.4 跨图定位成为调优刚需

**A5 的变化或特点**

PyPTO Toolkit 已经支持计算图、泳道图和三栏联动。本地知识库中确认，`merged_swimlane.json` 的事件可通过 `event-hint` 中的 `rootHash`、`callOpMagic`、`leafHash` 反查 Execute Graph / CALL / Block Graph。Mix 相关 UI 还需要关注 `wrapId` 和 sync event。

可信度：`verified`

**影响**

A5 Mix 调优中，用户看到一个等待段后，需要迅速跨层回答：

- 它来自哪段源码或 `semantic_label`？
- 对应哪个 Execute Graph 的 `CALL`？
- 对应哪个 Block Graph / leaf？
- 这个 leaf 在哪个 AIC/AIV 上执行？
- 同一个 `wrapId` 下还有哪些 peer task？

没有跨图联动，用户会被迫在源码、Pass dump、`program.json`、`merged_swimlane.json` 和硬件概念之间手工跳转。

**用户在调试调优阶段可能会面临的新问题**

- 泳道图上的 task 到底对应源码里的哪一行？
- `rootHash`、`callOpMagic`、`leafHash`、`wrapId` 分别定位什么对象？
- 为什么多个 `CALL` 复用了同一个 `leafHash`，但运行时表现不同？
- 我应该从等待最久的泳道条回看 Execute Graph，还是从图上的热点 CALL 回看泳道？

### 5.5 950 新硬件能力需要和 PyPTO trace 字段分层解释

**A5 的变化或特点**

公开材料中出现 `BufferID`、`URMA`、`CCU` 等能力。`BufferID` 可用于解释同步依赖模型；`URMA` 和 `CCU` 与互联、异步远程访问、集合通信加速相关。但当前本地知识库保留的结论是：这些对象可以作为公开能力或 claim 层展示，不能直接写成当前 PyPTO trace 已经暴露的字段。

可信度：对象为 `public material`；与 PyPTO trace 的直接绑定为 `unverified` 或 `article claim`。

**影响**

调试调优工具需要同时服务两类问题：

- 当前这次 PyPTO 运行实际发生了什么？
- A5 的硬件能力可能解释了哪些未来优化方向？

如果两层混在一起，用户会误以为 `BufferID`、`URMA`、`CCU` 已经能从 `merged_swimlane.json` 直接读出，从而误判问题。

**用户在调试调优阶段可能会面临的新问题**

- `CV_SYNC_WAIT` 是否等价于 950 `BufferID`？当前 trace 里有没有 BufferID 字段？
- 我的跨卡通信是否走了 `URMA`？PyPTO 产物里能不能看到证据？
- `CCU` 是否参与了当前算子的 collective？还是只是 950 公开能力解释？
- Toolkit 面板里的灰色扩展层和真实 profiler 数据有什么区别？

## 6. PyPTO Toolkit 可以探索的新场景与用户体验

### 6.1 Mix 模式泳道图

**Toolkit 场景**

在泳道图中增加 Mix 模式，围绕 `wrapId`、Mix group、AIC/AIV peer task、`CV_SYNC_WAIT` / `CV_SYNC_SET` 展示跨核协作关系。

**关键的 UX/UI 设计点 / 创新点**

- 默认视图先展示同步等待占比，不强迫用户进入复杂模式。
- 打开 Mix 模式后，同一 Mix group 用统一颜色和分组框聚合。
- 在 task bar 内部分段显示计算段与等待段。
- 用连线表达 `CV_SYNC_SET -> CV_SYNC_WAIT` 的方向关系。
- hover 同步线时高亮发送方、等待方和同组 task。

**希望解决该场景下用户的什么问题**

用户不再只看到“某个 task 很长”，而能直接判断“长在哪里”：是 AIC 计算长、AIV 计算长，还是 AIV 在等 AIC。这个场景解决 Mix 调优中最核心的等待归因问题。

### 6.2 代码-计算图-泳道图-硬件流四联动

**Toolkit 场景**

在现有三栏联动基础上增加 A5 硬件流解释区：从源码 `semantic_label` 跳到 Execute Graph、Block Graph、swimlane task，再映射到 AIC / AIV / GM / L2 / local buffer / sync 路径。

**关键的 UX/UI 设计点 / 创新点**

- 保留 `rootHash + callOpMagic + leafHash` 作为静态图定位链。
- 用 `wrapId` 和 sync event 解释运行时 Mix group。
- 硬件面板区分 `data flow` 与 `instruction flow`：数据流用实线，控制 / sync 用虚线。
- 点击 `CALL` 时展示粗粒度 A5 路径；点击 Block Graph 节点时展示 buffer / engine 级路径；点击泳道 bar 时展示实际运行实例。

**希望解决该场景下用户的什么问题**

用户可以从“我写的这段代码”一路追到“它在 A5 上大致走哪条硬件路径”，减少源码、图、性能数据、硬件概念之间的心智断裂。

### 6.3 Cube / Vector TileShape 调优助手

**Toolkit 场景**

在计算图或调优面板中增加 Cube / Vector TileShape 关系检查，重点识别相邻 Cube / Vector Operation 之间的一对一、多对一、多对多依赖，以及 TileShape 不匹配导致的合图风险。

**关键的 UX/UI 设计点 / 创新点**

- 在图上用依赖复杂度标记边：一对一为绿色，多对多为高风险色。
- 对相邻 Cube / Vector op 展示输入输出 TileShape 对照。
- 对热点等待段提供“可能由 TileShape mismatch 引起”的诊断提示。
- 提供候选调参方向，而不是自动替用户改配置。

**希望解决该场景下用户的什么问题**

用户调性能时常常知道“有等待 / 并行度低”，但不知道是哪个 TileShape 让依赖复杂化。这个场景帮助用户把泳道图上的性能症状反查到开发期可调整的 TileShape 决策。

### 6.4 A5 硬件解释面板

**Toolkit 场景**

在 Toolkit 右侧或下钻面板中加入 A5 硬件解释视图，点击任务后解释其可能经过的 AIC、AIV、GM/L2、L1、UB、L0、FixPipe、sync 路径。

**关键的 UX/UI 设计点 / 创新点**

- 主图只展示 `verified` / `inferred` 的通用路径，避免过度堆硬件细节。
- `UnifiedBus`、`URMA`、`CCU` 放入可切换 extension layer。
- `Unified Buffer` 与 `UnifiedBus` 始终写全称，避免都缩写成 `UB`。
- 对每条路径标注可信度：真实 trace 字段、硬件公开材料、推导解释分层展示。

**希望解决该场景下用户的什么问题**

许多 PyPTO 用户会看到 AIC、AIV、MTE、FixPipe、L2、UB 等术语，但不知道它们和当前 task 的关系。硬件解释面板把“硬件知识”变成“当前调优对象的上下文解释”。

### 6.5 950 claim / verified 分层视图

**Toolkit 场景**

提供可信度切换：默认只看 PyPTO trace 和 verified 路径；打开扩展层后展示 950 公开材料中的 `BufferID`、`NDDMA`、`UnifiedBus`、`URMA`、`CCU` 等能力。

**关键的 UX/UI 设计点 / 创新点**

- 用图层开关区分 `verified`、`public material`、`inferred`、`article claim`。
- 默认隐藏或灰化 claim 层，不把它们画成已发生的 runtime 事件。
- tooltip 中明确说明“当前 trace 未直接暴露该字段”。
- 当未来 PyPTO trace 新增字段时，可以把对象从 claim/public material 层升级到 verified trace 层。

**希望解决该场景下用户的什么问题**

用户既需要理解 A5 的新硬件能力，又不能把公开能力误读成当前 profiler 已采集的事实。这个场景解决“解释未来能力”和“定位当前问题”之间的可信度混淆。

### 6.6 Mix 关键路径与等待归因

**Toolkit 场景**

在 Mix 模式上增加自动归因能力：识别等待最长的 task、对应 peer core、上游 `CALL` / `leafHash`、同组 `wrapId`，并给出关键路径摘要。

**关键的 UX/UI 设计点 / 创新点**

- 在侧边栏列出 Top waits：等待时长、等待方、信号方、`wrapId`、`rootHash`、`callOpMagic`、`leafHash`。
- 点击一条等待记录，自动高亮相关泳道段、同步线、Execute Graph CALL 和 Block Graph leaf。
- 对关键路径用连续高亮表达，而不是只给单点热点。
- 支持“只看同步路径”过滤，暂时隐藏非关键 task。

**希望解决该场景下用户的什么问题**

用户不必手工在几十条泳道和多个图之间找因果链。Toolkit 直接回答“先优化哪一段最可能降低总耗时”，把观察工具推进到决策辅助工具。

## 7. 结论

A5 / Ascend 950 对 PyPTO 的影响不是简单的“新 SoC 支持”。它把算子开发、编译切图、同步插入、运行时调度、性能采集和 Toolkit 解释体验都推向更强的 Cube / Vector 协同语境。

最关键的产品判断是：

- 对硬件理解：A5 是双 DIE UMA、不同 Memory 合封、AICORE / 存储 / IO 多层升级的 950 代际。
- 对 PyPTO 框架：本地源码已经出现 `DAV_3510`、CV mix、Mix 子图、`CV_SYNC`、Mix schedule、runtime / profiling 等适配。
- 对算子开发：开发者需要更早考虑 Cube / Vector TileShape、scope、Mix 子图、dtype / layout / stride 和 950 专用配置。
- 对调试调优：用户需要从“单 task 耗时”升级到“Mix group 内同步等待和关键路径”的视角。
- 对 Toolkit：最有价值的新体验不是画更复杂的硬件图，而是把源码、图、泳道、硬件语义和可信度分层串起来，让用户知道当前该优化什么、为什么。

## 8. 后续待核验点

- CANN 正式文档是否已经公开 950 `BufferID`、`NDDMA`、`URMA`、`CCU` 的更细 API / trace / profiler 字段。
- PyPTO 后续是否会在 `merged_swimlane.json` 或其他 runtime 产物中直接输出 `BufferID`、Mix group、sync wait duration 等结构化字段。
- `DAV_3510` 与对外产品名 `Ascend 950PR / 950DT` 在所有 PyPTO 配置、安装路径、runtime 产物中的映射是否完全稳定。
- Toolkit 是否需要把 `mix_groups` / `sync_events` 设计成正式 JSON schema，而不是仅由前端推断。
