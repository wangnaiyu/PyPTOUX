# Block Graph

本文用于沉淀 `PyPTO` 中 `Block Graph` 相关的业务理解。它不只回答“`Block Graph` 是什么”，还会把与它最容易缠在一起的几个对象一起讲清楚：

- `Loop`
- `PATH`
- `Tensor Graph`
- `Tile Graph`
- `Execute Graph (root)`
- `CALL`
- `Block Graph (leaf)`
- `semantic_label`
- `opcode`
- `swimlane task`

本文基于真实代码和真实样例产物整理，当前主要证据来自：

- `three-view/code/page_attention.cpp`
- `three-view/output_20251112_170823_664974/`
- 本地 `pypto` 镜像中的源码与官方文档

## 1. 先说结论

- `Block Graph` 不是“一张总图”，而是一组 `leaf` 子图。
- `Tile Graph` 会先被切成多个可在单个 AI Core 上调度的子图，每个子图物化成一张 `Block Graph`。
- `Execute Graph` 是 `root` 图，它包含多个 `CALL` 节点，用来组织对这些 `leaf` 的调用。
- `swimlane task` 不是静态 `Block Graph` 本体，而是某张 `Block Graph` 的一次运行时执行实例。
- `semantic_label` 是跨“业务代码 / root `CALL` / swimlane event”最稳的人类语义锚点。
- `opcode` 不是一个独立编译阶段，而是图内 `Operation` 的操作名；它在 `Tile Graph`、`Execute Graph`、`Block Graph` 都可能出现，但在 `Block Graph` 里最适合拿来解释执行组织。

## 2. 两张总示意图

这两张示意图不是同一种箭头含义。

- 第一张强调“编译后怎么从运行时任务跳回图，再继续下钻”
- 第二张强调“这些对象在编译过程中大致从哪里来”

### 2.1 调试 / 跳转视角

主链：

```text
swimlane task
-> Execute Graph (root)
-> CALL
-> Block Graph (leaf)
-> opcode
```

灰色来源回溯链：

```text
Block Graph (leaf)
<- Tile Graph
<- PATH
<- Loop
<- 业务代码 (Tensor + semantic_label)
```

这里需要明确区分两种关系：

- 主链表示当前调试产物之间可直接定位、跳转或解释的强关系
- 灰色链表示来源回溯 `provenance`，不是同强度的一跳跳转关系

### 2.2 编译来源视角

```text
业务代码 (Tensor + semantic_label)
-> Loop
-> PATH
-> Tensor Graph
-> Tile Graph
-> { Execute Graph (root / CALL), Block Graph (leaf / opcode) }
-> swimlane task
```

这条链里有三个容易误解的点：

- `Execute Graph` 和 `Block Graph` 都来自同一条 `PATH` 相关编译过程，不是简单的“前者完全生成后者”或“后者完全生成前者”
- `CALL` 是 `Execute Graph` 内部的调用节点，不是独立编译阶段
- `opcode` 主要作为图内 `Operation` 的操作名存在，不单独构成一个图层

## 3. 关键对象逐个解释

### 3.1 业务代码 / Tensor / semantic_label

在 `page_attention.cpp` 这样的算子实现里，开发者会直接写：

- `Tensor`
- `LoopRange(...)`
- `config::SetSemanticLabel(...)`

其中：

- `Tensor` 是高层计算对象
- `semantic_label` 是业务代码里显式设置的人类语义锚点

在 three-view 这份样例里，真实出现过的标签包括：

- `MatMul`
- `SoftMax`
- `bn-matmul2`
- `bn-after-matmul2`
- `Softmax-acc`

这些标签后面会继续出现在：

- `Tile Graph` / `Execute Graph` 的 `semantic_label`
- `merged_swimlane.json` 的事件名后缀

### 3.2 Loop

`Loop` 是业务算子代码里的显式控制流，不是框架凭空虚构出来的循环。

在 `page_attention.cpp` 里，可以直接看到三层业务循环：

- `bIdx`
- `nIdx`
- `bn`

它们为什么存在，取决于算子本身要沿哪些维度反复处理数据，例如：

- batch
- query head / tile
- KV block

循环次数也不是统一写死常数，而是由业务代码通过 `LoopRange(...)` 给出，并由 shape 与运行时小张量数据共同决定。当前样例里能直接看到的来源包括：

- `blockTable.GetShape()[0]`
- `qNope.GetShape()[0] / batchSize`
- `GetTensorData(actSeqs, {bIdx})`
- `bnPerBatch = (curSeq + blockSize - 1) / blockSize`

### 3.3 PATH

`PATH` 不是 `Block Graph` 编号，而是 `DYNAMIC_LOOP_PATH`。

它来自动态循环展开，用来把一段带路径条件的 `Loop` 拆成多条更稳定的路径级函数。three-view 当前样例中实际存在：

- `PATH0`
- `PATH1`
- `PATH2`
- `PATH3`

当前能稳妥确认的是：

- `LoopUnroll` 属于 tensor-graph pass
- 运行时会根据路径条件从 `pathList` 里选中满足条件的那条 `callop`

对于“为什么正好是 4 条 path”，当前更大概率与 `IsLoopBegin` / `IsLoopEnd` 这样的路径条件组合有关，但这部分是基于代码结构和样例命名的 inference，不是 json 中直接写死的显式标签。

### 3.4 Tensor Graph

`Tensor Graph` 承载高层 `Tensor/Operation` 语义，是更贴近业务代码表达的图层。

它的角色可以简单理解成：

- 保留算法语义
- 还没有完全进入 tile / 单核调度粒度
- 作为 `Tile Graph` 的上游编译产物

### 3.5 Tile Graph

`Tile Graph` 由 `Tile` 和 `TileOp` 构成，是 `Block Graph` 的直接来源。

文档口径明确说明：

- `Tensor Graph` 会根据 `TileShape` 展开成 `Tile Graph`
- `Tile Graph` 会进一步被切成多个 `Block Graph`

在当前样例的 `Pass_26_SubgraphToFunction` 之前的图里，已经能看到：

- `opcode`
- `semantic_label`

例如：

- `COPY_IN` + `bn-after-matmul2`
- `L1_TO_L0Bt` + `MatMul`
- `A_MULACC_B` + `MatMul`

这说明 `opcode` 并不是到 `Block Graph` 才第一次出现。

### 3.6 Block Graph

`Block Graph` 是 `leaf` 子图，不是一张总图。

更准确地说：

- `Tile Graph` 被切成若干子图
- 每个子图物化成一张 `Block Graph`
- 每张 `Block Graph` 对应一个可在单个 AI Core 上调度的子图

当前样例里，`program.json` 可以直接统计出：

- `4` 张 `Execute Graph`
- `16` 张唯一 `Block Graph`

所以“一次编译会产生多少张 `Block Graph`”没有固定值，取决于：

- `Tile Graph` 被切成多少个子图
- 有多少同构子图被 hash 去重复用

### 3.7 Execute Graph

`Execute Graph` 是 `root` 图。

它的职责不是展开 leaf 内部细节，而是：

- 组织多个 `CALL`
- 表达这些 `CALL` 之间的依赖与调度入口

文档中 `*_ROOT.json` 对应的就是 `Execute Graph`。当前样例里一共有 `4` 张 `Execute Graph`，分别对应 `PATH0..PATH3` 的 root。

### 3.8 CALL

`CALL` 是 `Execute Graph` 里的调用节点，不是 `Block Graph` 本体。

一个 `CALL` 通常会：

- 挂自己的 `opmagic`
- 挂自己的 `semantic_label`
- 指向一个 `calleehash / leafHash`

这也是为什么在 root 图里能同时看到：

- `opcode: "CALL"`
- `semantic_label: "bn-after-matmul2"` 之类的人类标签

同时还要特别注意：

- 多个 `CALL` 可以复用同一张 `Block Graph`

在 three-view 的 `PATH1_ROOT.json` 里，`opmagic = 10008` 和 `opmagic = 10015` 都指向同一个 `calleehash = 1231527610565308428`，对应同一张 leaf。

### 3.9 opcode

`opcode` 是图内 `Operation` 的操作名，不是单独一层。

它在不同图层里都可能出现：

- `Tile Graph` 中会有 `COPY_IN`、`A_MULACC_B` 等
- `Execute Graph` 中会出现 `CALL`
- `Block Graph` 中会出现更贴近执行组织的 `PHASE1`、`SYNC_SRC`、`COPY_IN`、`EXP`、`DIV`、`A_MULACC_B` 等

因此最稳妥的说法是：

- `opcode` 不是“比 `Tile Graph` 更晚才出现的独立层级”
- 但在 `Block Graph` 中最值得重点解释，因为这里最接近硬件执行组织和后续 `kernel_aicore/*.cpp`

### 3.10 swimlane task

`swimlane task` 是运行时一次任务执行实例，不是静态 `Block Graph` 本体。

更准确地说：

- 静态图层回答“这类子图长什么样”
- 泳道图任务回答“这次运行里哪个 task 在哪个 core 上执行了它”

所以通常是：

- 一张 `Block Graph`
- 对应很多次 `swimlane task` 执行实例

## 4. 桥接关系总表

本文不把字段映射和对象关系分开写，而是统一按“从哪个对象/字段，能定位到哪个对象，以及这是什么关系”来组织。

| 起点 | 连接字段 / 证据 | 终点 | 关系类型 | 说明 |
| --- | --- | --- | --- | --- |
| `swimlane task` | `event-hint.rootHash` | `Execute Graph (root)` | `jump-to` | 泳道图任务可直接跳到对应 root |
| `swimlane task` | `event-hint.callOpMagic` | `CALL` | `locate-in-root` | 先进入 root，再定位其中一个 `CALL` 节点 |
| `swimlane task` | `event-hint.leafHash` | `Block Graph (leaf)` | `jump-to` | 可直接跳到对应 leaf |
| `Execute Graph (root)` | 图结构本身 | `CALL` | `contains` | root 里包含多个 `CALL` 节点 |
| `CALL` | `calleehash / leafHash` | `Block Graph (leaf)` | `points-to` | 一个 `CALL` 通常引用一张 leaf |
| 多个 `CALL` | 相同 `leafHash` | 同一张 `Block Graph` | `reuse` | 多个 `CALL` 可以复用同一张 leaf |
| `Block Graph (leaf)` | 图结构本身 | `opcode` | `contains` | `opcode` 是 leaf 内部 `Operation` 的名字 |
| `semantic_label` | 代码设置 / root `CALL` / swimlane event | 多层对象 | `semantic-anchor` | 它是语义锚点，不是唯一主键 |
| `Tile Graph` | `GraphPartition / SubgraphToFunction` | `Block Graph (leaf)` | `partition-to` | `Tile Graph` 被切成多个 leaf |
| `PATH` | path 级 function / `PATH` 文件名 | `Tile Graph` | `provenance` | 当前 `Tile Graph` / `leaf` / `root` 属于哪条 path |
| `Loop` | `pathList / 路径条件` | `PATH` | `expands-to` | 动态循环展开成多条 path |
| `业务代码` | `Tensor` / `SetSemanticLabel(...)` / `LoopRange(...)` | 上游对象 | `source-of-truth` | 这是最上游来源 |

## 5. 不要混淆的关系

| 容易混淆 | 正确理解 |
| --- | --- |
| `semantic_label` vs `leafHash` | `semantic_label` 是语义锚点，`leafHash` 是 leaf 标识 |
| `CALL` vs `Block Graph` | `CALL` 是 root 里的调用节点，不是 leaf 本体 |
| `swimlane task` vs `Block Graph` | 前者是运行时实例，后者是静态图 |
| `opcode` vs CCE 源码 | `opcode` 是图内 `Operation` 名，不是直接源码 |
| `PATH` vs `Block Graph` | `PATH` 是路径级函数，`Block Graph` 是 leaf 子图 |

## 6. Block Graph 本体怎么读

### 6.1 里面有哪些节点

官方文档对 `Block Graph` 中可见节点的定义很直接：

- `Incast/Outcast`
- `Tensor`
- `Operation`

这三类节点分别承担：

- `Incast/Outcast`：输入输出边界
- `Tensor`：中间张量和局部缓冲
- `Operation`：搬运、计算、同步等具体操作

### 6.2 Tensor 一般长什么样

`Block Graph` 里的 `Tensor` 一般已经不是原始全局大张量，而是 tile / block 级别的局部块和中间缓冲。

当前样例里常见的几个维度特征是：

- 常见 `nodetype`：
  - `LOCAL`
  - `INCAST`
  - `OUTCAST`
- 常见 `mem_type`：
  - `DDR`
  - `UB`
  - `L1`
  - `L0A`
  - `L0B`
- 常见 shape：
  - `[32,64]`
  - `[32,512]`
  - `[128,512]`
  - `[32,1]`

所以如果只用一句话概括：

- `Block Graph` 里的 `Tensor` 通常已经是单核执行粒度下的块状数据和局部缓冲，而不是用户最初定义的原始大 shape

### 6.3 opcode 一般长什么样

在当前样例的 `Block Graph` 里，比较有代表性的 `opcode` 可以分成三类：

- 搬运类：
  - `COPY_IN`
  - `L1_TO_L0A`
  - `COPY_OUT`
- 计算类：
  - `EXP`
  - `DIV`
  - `A_MULACC_B`
- 同步 / 阶段控制类：
  - `SYNC_SRC`
  - `SYNC_DST`
  - `BAR.V`
  - `PHASE1`
  - `PHASE2`

这也说明 `Block Graph` 里的 `opcode` 不只是“算什么”，还包含：

- 数据搬运
- 同步控制
- 执行阶段编排

## 7. 一个 three-view 的贯通例子

这里用已经核对过的 `PATH1` 例子，展示主链如何被真实文件互证。

### 7.1 先看 root 和 leaf

当前样例里可以直接对上这组文件：

- `Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_ROOT.json`
- `Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_LEAF_program_id_03_1231527610565308428.json`

其中：

- `PATH1_ROOT.json` 是 `Execute Graph`
- 这张 `LEAF_program_id_03_1231527610565308428.json` 是某张 `Block Graph`

在 `PATH1_ROOT.json` 中还能直接看到：

- `opmagic = 10008`
- `opmagic = 10015`
- 它们的 `semantic_label` 都是 `bn-after-matmul2`
- 它们都指向同一个 `calleehash = 1231527610565308428`

这正好说明：

- 一个 `CALL` 通常指向一张 leaf
- 多个 `CALL` 可以复用同一张 `Block Graph`

### 7.2 再看泳道图事件

在当前 three-view 数据集里，还能找到对应的泳道图事件：

- `event-hint.rootHash: 9928535964290202028`
- `event-hint.callOpMagic: 10015`
- `event-hint.leafHash: 1231527610565308428`

而 `10015` 这条 `CALL` 的 `semantic_label` 正是 `bn-after-matmul2`。

因此，这条主链是可以直接被文件互证的：

```text
swimlane task
-> rootHash
-> Execute Graph (PATH1_ROOT.json)
-> callOpMagic
-> CALL(opmagic = 10015)
-> leafHash
-> Block Graph (LEAF_program_id_03_1231527610565308428.json)
```

### 7.3 灰色来源回溯链怎么帮助理解

如果只看上面的主链，我们知道“这个任务执行的是哪张 leaf”，但还不知道“这张 leaf 从哪里来”。

这时灰色来源回溯链就有用了：

```text
Block Graph (leaf)
<- Tile Graph
<- PATH1
<- Loop
<- page_attention.cpp 中的业务代码、Tensor 和 semantic_label
```

其中：

- `PATH1` 解释了它属于哪条路径级函数
- `Loop` 解释了为什么会出现多条 `PATH`
- `page_attention.cpp` 中的 `semantic_label` 解释了为什么 root 和泳道图里还能看到 `bn-after-matmul2`

## 8. 当前最稳的理解框架

如果只保留一套最小而稳定的心智模型，可以记成下面这几句话：

- 业务代码先定义 `Tensor`、`Loop` 和 `semantic_label`
- `Loop` 展开成多条 `PATH`
- `Tensor Graph` 继续 lower 到 `Tile Graph`
- `Tile Graph` 被切成若干 `Block Graph (leaf)`
- 同时组装出 `Execute Graph (root)`，其中用多个 `CALL` 去调用这些 leaf
- 运行时的 `swimlane task` 通过 `rootHash + callOpMagic + leafHash` 与这些静态图产物桥接

这套理解足够支撑大多数“代码 -> 图 -> 泳道图”的调试和调优分析。
