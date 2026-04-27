# 昇腾硬件结构 调研汇总（待整理）

> 用途：为后续绘制"按代际 + 按场景"的昇腾硬件结构图准备事实底稿。
> 状态：Claude 调研稿，**未经 Codex 事实核对**，请按 owner 边界校对后再外发。
> 时间：2026-04-27。

---

## 0. 信源与可信度

| # | 信源 | 性质 | 可信度 | 备注 |
|---|---|---|---|---|
| S1 | CANN 官方文档「基本架构-硬件架构」 https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/80RC2alpha002/devguide/opdevg/ascendcopdevg/atlas_ascendc_10_0008.html | 厂商官方 | ✅ 高 | 提供耦合 vs 分离架构、AIC/AIV buffer 与 MTE 分布的权威口径 |
| S2 | CANN 官方文档「Ascend C 算子开发-AI Core 内部并行计算架构抽象」 https://www.hiascend.com/doc_center/source/zh/CANNCommunityEdition/80RC1alpha002/devguide/opdevg/ascendcopdevg/atlas_ascendc_10_0007.html | 厂商官方 | ✅ 高 | 计算单元三分（Cube/Vector/Scalar）+ MTE 概念 |
| S3 | CANN 官方「SyncAll」API 文档（boom1999 镜像）| 厂商官方 | ✅ 高 | 跨核同步硬件 vs 软件实现 + 各 Atlas 系列支持矩阵 |
| S4 | CSDN PTO ISA 文章 https://cann.csdn.net/69ea1e1b0a2f6a37c5a337ab.html | 华为系作者，软件 ISA 视角 | ✅ 中-高 | 重点是 MTE/SDMA/URMA/CCU 通路与跨代兼容；硬件层细节较少 |
| S5 | arXiv 2505.15112 *Parallel Scan on Ascend AI Accelerators*（2025） | 学术论文 | ✅ 中 | 给出 910B4 配比 20 AIC + 40 AIV |
| S6 | 微信公众号原文 https://mp.weixin.qq.com/s/xsirSciqrQ6F6LcdLEW3CQ | 用户指定 | ❌ **未取到** | 抓取被验证墙挡住，全文未拿到一字 |

⚠️ 凡是 S6 出处的内容下面都没有直接引用——本稿内容**没有验证过是否与 S6 原文一致**。

---

## 1. 对象总清单：哪些是存储、哪些是通路

### 1.1 存储单元（按层级）

**芯片级（SoC，AICore 之外，跨核共享）**

| 名称 | 别名 | 共享范围 | 容量参考 | 来源 |
|---|---|---|---|---|
| Global Memory (GM) | HBM / LPDDR / 主存 | 所有 AICore + 跨卡 | 910:32GB HBM2；910B:64GB HBM2e；310:LPDDR4x | 多源 |
| L2 Cache / L2 Buffer | — | SoC 内多 AICore 共享 | 310 ~8MB；910 ~32MB | 公开博客，**非官方权威** |

**AICore 级**

| 名称 | 别名 | 归属 | 主要作用 | 来源 |
|---|---|---|---|---|
| L1 Buffer | OnChip Buffer | **AIC 独有**（分离架构） | 矩阵流水大块中转；反复使用数据缓存 | S1 |
| L0A Buffer | — | **AIC 独有** | Cube 输入：左矩阵 A | S1 |
| L0B Buffer | — | **AIC 独有** | Cube 输入：右矩阵 B | S1 |
| L0C Buffer | CO1 / 输出累加缓冲 | **AIC 独有** | Cube 输出 + 累加中间结果（可自反馈做 MAC 累加） | S1 |
| BT Buffer | Bias Table Buffer | **AIC 独有，仅分离架构** | 存 Bias，给 FixPipe 用 | S1 |
| FP Buffer | Fixpipe Buffer | **AIC 独有，仅分离架构** | 存量化参数 / Relu 参数等 | S1 |
| Unified Buffer (UB) | UB | **AIV 独有**（分离架构）；耦合架构里在 AICore 内 | Vector / Scalar 计算的输入输出；PTO ISA 里也作 AIV 写"发车指令"的 scratch tile（仅 ~256B 量级） | S1, S4 |
| Scalar Buffer | — | AIC 与 AIV **各自一份**（分离架构） | 取指、标量数据 | S1 |

**计算单元内寄存器层（不画进结构图通常也行）**

- Cube：16×16 输入寄存器矩阵
- Vector：SIMD 寄存器
- Scalar：通用 / 特殊功能寄存器

### 1.2 通路 / 控制单元（不是存储）

| 名称 | 干什么 | 在 AIC？ | 在 AIV？ | 同步性 | 出现代际 | 来源 |
|---|---|---|---|---|---|---|
| BIU (Bus Interface Unit) | AICore 接外部总线 | 边界 | 边界 | — | 全系 | 公开博客 |
| **MTE1** | L1 → L0A / L0B（含 reshape / 转置） | ✅ | ❌ | 同步 | 全系 | S1 |
| **MTE2** | 数据**搬入**：GM/L2 → L1 / UB / L0A / L0B | ✅ | ✅ | 同步 | 全系 | S1, S4 |
| **MTE3** | 数据**搬出**：UB → GM / L1 | ✅ | ✅ | 同步 | 全系 | S1, S4 |
| **FixPipe** | L0C → UB 或 L0C → GM；做量化、Relu、bias add | ✅ | ❌ | — | 分离架构 | S1 |
| **SDMA** (System DMA) | **GM → GM 直传**，绕过 UBuffer | 独立引擎 | 独立引擎 | 异步 | 全系 | S4 |
| **URMA** (Unified-bus RDMA) | 跨卡 GM → GM，走灵衢 Unified Bus | 独立引擎 | 独立引擎 | 异步 | **950 新增** | S4 |
| **CCU** (Collective Communication Unit) | IO-Die 上集散中心：片上 Reduce + 传输；数据可不回 AICore | — | 仅握手 | 异步 | **950 新增** | S4 |
| Scalar Unit | 取指、发射、调度 MTE/Cube/Vector | ✅ 独立 | ✅ 独立 | — | 分离架构 | S1 |

⚠️ **MTE 的方向是物理硬绑定**：MTE2 只入、MTE3 只出，且经 UBuffer。SDMA 不经 UBuffer。来源：S4 原文 "MTE 引擎的读写通路是分离的"。

### 1.3 同步原语（PTO ISA 层）

来源：S4。

- **TNOTIFY**（亮绿灯，告诉对方我搞定了）
- **TWAIT**（等灯，对方搞定我才动）
- **TTEST**（瞄一眼，没好就先干别的）
- **2D Signal Grid**：信号墙，给多 rank × 多 tile 同步用
- **Quiet 语义**：连发 N 张运单只查最后一张

---

## 2. AICore 内部布局：耦合 vs 分离架构

### 2.1 架构判定（✅ S1 官方按"产品系列"口径）

| 架构 | 适用产品 | 含义 |
|---|---|---|
| **耦合架构** | Atlas 推理系列（含 310 / 310P）、Atlas 训练系列（910）、Atlas 200/500 A2 推理 | Cube + Vector + Scalar 在同一 AICore，**共用 Scalar Unit** |
| **分离架构** | **Atlas A2 训练系列**（即 910B 这一代） | AIC 与 AIV 物理拆开，**各有独立 Scalar 与代码段** |

**型号映射（推断，需 Codex 核对）**：
- 310 / 310P → 推理系列 → 耦合
- 910 → 训练系列 → 耦合
- 910B → A2 训练 → 分离
- 950 → 沿用分离 + 新增 URMA / CCU（基于 S4 推断，未在 S1 官方文档点名）

### 2.2 AIC 与 AIV 的内容差异（✅ S1）

| 项 | AIC（Cube核） | AIV（Vector核） |
|---|---|---|
| 可见存储 | GM, L1, L0A, L0B, L0C, **BT, FP** | GM, **UB** |
| 搬运单元 | **MTE1 + MTE2 + MTE3** | **MTE2 + MTE3**（**没有 MTE1**） |
| FixPipe | ✅ | ❌ |
| Scalar Unit | 独立一份 | 独立一份 |
| 取指代码段 | 独立加载 | 独立加载 |

**关键含义**：
- AIV 完全看不到 L1/L0A/L0B/L0C/BT/FP；AIC 也看不到 UB。互访只能落 GM。
- BT / FP / FixPipe 是分离架构才新增，耦合架构里不存在。
- L1→L0A/L0B 的搬运（MTE1）是 AIC 内部的事，AIV 调度不到。

### 2.3 AIC ↔ AIV 数据交换与同步（✅ S1, S3）

**数据通路**：只能走 **Global Memory**。无片上专用 AIC↔AIV 通路。
> S1 官方原文："AIV 与 AIC 之间通过 Global Memory 进行数据传递"

**同步机制（S3）**：
- **硬件同步**（推荐，性能更好）：`SyncAll()` 无参版本，硬件全核同步指令保证。
- **软件同步**（兜底）：GM workspace（≥ cores×32B，host 侧预清零）+ 各核 UB workspace 轮询。
- 模板参数 `isAIVOnly`：
  - true（默认）：仅 AIV 间同步
  - false：AIV 间 + AIC 间分别同步后再做 AIC↔AIV 同步；**软件同步不支持 false**，必须硬件同步才能跨 AIC/AIV

**各 Atlas 系列同步支持矩阵（S3）**：

| 系列 | 硬件同步 | 软件同步 |
|---|---|---|
| Atlas A3 / A2 训练 | ✅ | ✅ |
| Atlas A2 推理 | ✅ | ✅ |
| Atlas 训练系列（910） | ❌ | ✅ |
| Atlas 推理 AI Core | ❌ | ✅ |
| Atlas 推理 Vector Core | ❌ | ❌ |
| Atlas 200I / 500 A2 | ❌ | ❌ |

### 2.4 AIC : AIV 配比

| 型号 | AIC : AIV | 总数 | 来源 |
|---|---|---|---|
| 910B4 | **1 : 2** | 20 AIC + 40 AIV | S5 |
| 910B（PTO 文章口径，可能指 B1 / B2） | 1 : 1 | **24 AIC + 24 AIV** | S4 |
| 通用规则 | 1 : N（N 通常 = 2） | — | S5 |

**结论**：910B 不是单一 SKU，B1/B2/B3/B4 配比可能不同。画图时建议**只标 "1 AIC : N AIV (N≥1)"** 或加 "举例 910B4：20 AIC + 40 AIV" 注脚，避免对错号。

---

## 3. 数据搬移路径（按场景 + 按代际）

### 3.1 跨代搬运能力总表（✅ S4）

| 平台 | 同步搬运 | 异步搬运 | 集合通信 |
|---|---|---|---|
| Ascend 910 系列（含 910B） | MTE | SDMA | **AIV 自己搬**（用 MTE/SDMA 拼） |
| Ascend 950 | MTE | **SDMA / URMA** | **CCU 硬件卸载** |

S4 原文：通过 `if constexpr (engine == ...)` 在编译期选路，同一份算子代码跨三代硬件。

### 3.2 场景库

#### 场景 A：纯 MatMul（耦合架构示例 = 910）

```
GM ──MTE2──► L1 ──MTE1──► L0A ┐
                         L0B ┘──► Cube ──► L0C ──► (FixPipe / 数据通路) ──► UB ──MTE3──► GM
```

呼应仓库 `02-knowledge/01-block-level-coding/block-graph.md` 里观察到的 opcode：`COPY_IN` → `L1_TO_L0A` / `L1_TO_L0Bt` → `A_MULACC_B` → `COPY_OUT`。

#### 场景 B：纯 Vector（Softmax / Element-wise）

```
GM ──MTE2──► UB ──► Vector ──► UB ──MTE3──► GM
```

opcode：`COPY_IN` → `EXP` / `DIV` → `COPY_OUT`。

#### 场景 C：MatMul + 后处理（分离架构 = 910B）

AIC 流水：
```
GM ──MTE2──► L1 ──MTE1──► L0A/L0B ──► Cube ──► L0C
L0C + (BT, FP) ──► FixPipe ──► GM (workspace)
```

AIV 流水：
```
GM (workspace) ──MTE2──► UB ──► Vector ──► UB ──MTE3──► GM
```

AIC↔AIV 同步：通过 GM workspace + `SyncAll()`（硬件同步），对应仓库 opcode `SYNC_SRC` / `SYNC_DST` / `BAR.V` / `PHASE1` / `PHASE2`。

#### 场景 D：累加（L0C 自反馈，AIC 内部）

分块矩阵累加时，L0C 既是 Cube 输入也是输出，新一轮结果直接累加，**不出 AICore**，省掉一次外搬。耦合 / 分离架构都适用。

#### 场景 E：大块 GM→GM 搬运（任意代际）

```
GM ────────SDMA（异步）────────► GM
```
不经 UBuffer，启动开销高但带宽大，适合大块连续数据。

#### 场景 F：跨卡 RDMA（仅 950）

```
本卡 GM ────URMA（异步，走灵衢 Unified Bus）────► 远卡 GM
```
用户态 RDMA 硬件，绕过软件协议栈。

#### 场景 G：集合通信 AllReduce

**910B（无 CCU）流水线版本**（来自 S4 实测）：
- AIC 算完 → GM
- AIV 用 MTE/SDMA 把局部结果搬到远端 GM，自己拼 Reduce
- 实测（BF16，GEMM AllReduce 融合）：
  - 纯计算 365 μs（257 TFLOPS，98% 峰值）
  - 串行（先算后通）743 μs（368 算 + 375 通）
  - **流水线（边算边搬）631 μs，加速 1.18×，31% 通信被掩盖**

**950（有 CCU）**：
```
AIC 算完 → GM
                ↓
CCU（IO-Die 上）拉数据进 Memory Slice → 硬件 Reduce 引擎 → 直接吐到目标
                ↑
AIV 仅做握手信号（AIV_LAUNCH / CCU_DONE）
```
关键差异：**数据不用回 AICore，在 IO-Die 集散中心里就处理完了**。

---

## 4. 950 新增组件细节（S4）

| 组件 | 位置 | 子模块 | 协议 |
|---|---|---|---|
| URMA | AICore 外，独立 RDMA 引擎 | 基于 Unified Bus 灵衢 | 用户态 RDMA |
| CCU | **IO-Die 上** | Memory Slice、硬件 Reduce 引擎；微码分 Load / Ctrl / Trans / Reduce 四类 | Host 编译 CCU kernel；Device 侧 AIV 握手 (AIV_LAUNCH / CCU_DONE) |

S4 还提到 950 体系下 PTO 编译期 `if constexpr (engine == DmaEngine::URMA)` 走 URMA，否则回退 SDMA。

---

## 5. 与仓库 PyPTO 概念的对应（便于落原型时对齐）

仓库 `02-knowledge/01-block-level-coding/block-graph.md` 中已经在用的口径：

- `mem_type ∈ {DDR, UB, L1, L0A, L0B}` ↔ 对应本稿存储分层
- opcodes：
  - 搬运类 `COPY_IN`, `L1_TO_L0A`, `L1_TO_L0Bt`, `COPY_OUT` ↔ MTE2/MTE1/MTE3 路径
  - 计算类 `A_MULACC_B`（Cube）, `EXP` / `DIV`（Vector）
  - 同步类 `SYNC_SRC` / `SYNC_DST` / `BAR.V` / `PHASE1` / `PHASE2` ↔ AIC/AIV 跨核同步
- Tile API：`set_cube_tile_shapes` / `set_vec_tile_shapes` ↔ Cube 流与 Vector 流分别配置，间接印证 AIC/AIV 解耦

---

## 6. 已知不确定项（请 Codex 重点核对）

| # | 待核对 | 说明 |
|---|---|---|
| U1 | 各 buffer 容量数字（L1/L0A/L0B/L0C/UB/BT/FP） | 公开论文给到零散数字（L0A 65KB、L0B 128KB、UB 192KB），但**官方文档明确不给数字**，让用 `get_soc_spec` 运行时查。建议结构图用相对大小，不写绝对值。 |
| U2 | 910B 子型号配比 | S4 说 24+24，S5 说 910B4 是 20+40，**应是不同子型号**。需要拉准确口径，或图里只写 "1:N" |
| U3 | L2 Cache 容量 | 310 ~8MB / 910 ~32MB 来自公开博客，**非厂商官方**。需要权威源。 |
| U4 | 耦合架构里 UB / L1 是否 Cube 与 Vector 真的能互见 | S1 只说分离架构下严格隔离，耦合下没明确写。本稿假设 "L1 偏 Cube、UB 偏 Vector" 但都在同一 AICore 内可见，请核对。 |
| U5 | 950 是否仍是分离架构？ | S4 没明说，从 AIC + AIV 配合 CCU 的描述推断仍是分离。需核对。 |
| U6 | 950 的 AIC : AIV 比例 | 完全空白，无任何来源。 |
| U7 | 310P 和 310 的差异是不是仅仅是规模 | 推理系列下两者都是耦合，但 310P 可能引入了 FixPipe 雏形。S1 没细分，需核对。 |
| U8 | MTE2 是否真的可以直接进 L0A/L0B（不经 L1） | S1 / S4 没明说。常规路径是 GM→L1→L0A/L0B，但部分资料也写过 GM 直入 L0A 的旁路。 |
| U9 | S6 微信原文未取到 | 是否还有别的入口？或者用户能贴正文？ |
| U10 | 跨卡通信路径 | 本稿只在 950 URMA / CCU 场景下覆盖，910/910B 跨卡 (HCCS / RoCE) 没展开。 |

---

## 7. 建议的下一步

后续可以画 **三张分代际硬件结构图**：

1. **耦合架构图**（310 / 910）：单 AICore 内 Cube + Vector + Scalar 共存，L1/L0A/L0B/L0C 偏 Cube 一侧，UB 偏 Vector 一侧，Scalar 共用一份。MTE1/2/3 / FixPipe (无) 是 AICore 内通路。
2. **分离架构图**（910B / A2 训练）：AIC 与 AIV 物理拆开，各自独立 Scalar；AIC 内放 L1 / L0A / L0B / L0C / BT / FP / MTE1/2/3 / FixPipe / Cube；AIV 内放 UB / MTE2/3 / Vector；中间 GM 是它们唯一桥；外围放 SDMA。
3. **950 演进图**：在分离架构基础上，AICore 外新增 URMA 通路（走灵衢）+ IO-Die 上的 CCU（Memory Slice + 硬件 Reduce）。CCU 接 AIV 的握手信号，数据可不再回 AICore。

每张图建议同时叠"场景着色"——把 §3.2 的 7 个场景作为高亮路径，让读者按场景看出哪条线在动。
