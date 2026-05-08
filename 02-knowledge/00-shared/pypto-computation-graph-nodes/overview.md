# PyPTO 计算图节点显示参数

本文记录 `PyPTO Toolkit` 官方计算图中四类 Graph 的节点类型和节点信息显示参数，作为后续 demo、报告和说明材料中绘制 graph 节点时的信息基准。

本文只约束“显示哪些信息”，不约束节点的呈现方式。

## 1. 适用范围

适用于以下四类计算图：

- `Tensor Graph`
- `Tile Graph`
- `Block Graph`
- `Execute Graph`

这些图共同描述 `PyPTO` 程序从抽象计算描述到硬件执行的编译流程。需要展示 graph 节点信息时，应优先参考本文列出的官方节点类型和参数。

## 2. 通用节点参数

`Tensor Graph`、`Tile Graph` 和 `Block Graph` 共享三类基础节点：

- `Incast/Outcast`
- `Tensor`
- `Operation`

### 2.1 `Incast/Outcast`

`Incast/Outcast` 是数据源 / 数据结果节点。官方显示参数包括：

| 参数 | 说明 |
| --- | --- |
| 节点名称 | 计算图的 `Incast/Outcast` 节点名称，在节点标题中展示。 |
| `Magic ID` | 节点唯一标识。 |
| `rawTensor_MagicID` | 节点所属逻辑内存块编号；一块 `rawTensor` 内存可分配给多个 `Tensor`。 |
| `Slot ID` | 节点所属 `Slot` 编号；若两个节点的 `rawTensor_MagicID` 和 `Slot ID` 相同，则存在同地址关系。 |
| `shape` | 节点形状信息，格式为整数数组。 |
| `rawshape` | `rawTensor` 的形状信息。 |
| `offset` | 当前 `Tensor` 在 `rawTensor` 内存中的偏移量，格式为整数数组。 |
| `asis` | 当前 `Tensor` 经过前一个 `Operation` 后所处的内存层级，与前一个 `Operation` 的 `to offset` 字段一致。 |
| `tobe` | 当前 `Tensor` 在下一个 `Operation` 中将使用的目的内存层级，与下一个 `Operation` 的 `from` 字段一致。 |
| `datatype` | 数据类型。 |

### 2.2 `Tensor`

`Tensor` 是数据节点。官方显示参数包括：

| 参数 | 说明 |
| --- | --- |
| 节点名称 | 计算图的 `Tensor` 节点名称，在节点标题中展示。 |
| `Magic ID` | 节点唯一标识。 |
| `rawTensor_MagicID` | 节点所属逻辑内存块编号；一块 `rawTensor` 内存可分配给多个 `Tensor`。 |
| `Subgraph ID` | 节点所在子图的 ID；当 `Tensor` 还未分配到具体子图时，值为 `-1`。 |
| `shape` | `Tensor` 节点形状信息，格式为整数数组。 |
| `rawshape` | `rawTensor` 的形状信息。 |
| `offset` | 当前 `Tensor` 在 `rawTensor` 内存中的偏移量，格式为整数数组。 |
| `asis` | 当前 `Tensor` 经过前一个 `Operation` 后所处的内存层级，与前一个 `Operation` 的 `to offset` 字段一致。 |
| `tobe` | 当前 `Tensor` 在下一个 `Operation` 中将使用的目的内存层级，与下一个 `Operation` 的 `from` 字段一致。 |
| `datatype` | 数据类型。 |

### 2.3 `Operation`

`Operation` 是操作节点。官方显示参数包括：

| 参数 | 说明 |
| --- | --- |
| 节点名称 | 计算图的 `Operation` 节点名称，通常对应操作名，例如 `TILE_VIEW`。 |
| `Magic ID` | 当前 `Operation` 的唯一标识；一张图内 `Operation` 的 `Magic ID` 唯一。 |
| `Subgraph ID` | 当前节点所在子图的 ID；当 `Operation` 还未分配到具体子图时，值为 `-1`。 |
| `shape` | 被处理 `Tensor` 的形状信息，格式为整数数组；部分与输入 / 输出 `Tensor` 的 `shape` 无关的 `Operation` 无此属性。 |
| `from` | `Operation` 源操作数据的内存层级，与前一个 `Tensor` 节点的 `tobe` 字段一致。 |
| `to offset` | `Operation` 目的操作数据相对于源操作数据的内存偏移量。 |

## 3. 按 Graph 类型使用

### 3.1 `Tensor Graph`

官方节点类型：

- `Incast/Outcast`
- `Tensor`
- `Operation`

显示参数沿用本文第 2 节。`Tensor Graph` 中 `Tensor Shape` 与代码定义一致，尚未经过 `Tile` 展开。

### 3.2 `Tile Graph`

官方节点类型：

- `Incast/Outcast`
- `Tensor`
- `Operation`

显示参数沿用本文第 2 节。`Tile Graph` 中会出现更多展开后的节点；部分 `Operation` 与输入 / 输出 `Tensor` 的 `shape` 无关，因此无 `shape` 属性。

### 3.3 `Block Graph`

官方节点类型：

- `Incast/Outcast`
- `Tensor`
- `Operation`

显示参数沿用本文第 2 节。`Block Graph` 是 `Tile Graph` 切分后形成的子图，每个子图对应一个 `Block Graph`。

在真实样例中，`Block Graph` 的 `Operation` 常见 `opcode` 包括：

- 数据搬运：`COPY_IN`、`COPY_OUT`
- 计算：`EXP`、`DIV`、`A_MULACC_B`
- 同步 / 阶段控制：`PHASE1`、`PHASE2`、`SYNC_SRC`、`SYNC_DST`、`BAR.V`

这些 `opcode` 可作为说明材料中的补充字段，但不替代官方节点参数表。

### 3.4 `Execute Graph`

官方节点类型：

- `Incast/Outcast`
- `CALL`

`Incast/Outcast` 显示参数沿用本文第 2.1 节。

`CALL` 是 `Execute Graph` 中的调用节点，表示对 `Block Graph` 的一次调用。官方显示参数包括：

| 参数 | 说明 |
| --- | --- |
| 调用节点名称 | 仅在 `Execute Graph` 中显示；节点名称带有 `CALL` 前缀，作为可调度运行在 AI Core 上的 `Block Graph` 子图入口节点。 |
| `Subgraph ID` | 当前调用节点所在子图的 ID。 |
| `InCast` | 输入 `Tensor` 的 `Magic ID` 列表。 |
| `OutCast` | 输出 `Tensor` 的 `Magic ID` 列表。 |

官方文档说明 `CALL` 节点带有 `fx` 标识，用于表示对 `Block Graph` 的一次调用，并支持双击查看对应 `Block Graph` 子图信息。本文只把 `fx` 记录为识别标记，不把它扩展为呈现规范。

真实样例 JSON 中，`CALL` 还常见以下可追溯字段：

- `opcode: "CALL"`
- `opmagic`
- `semantic_label`
- `calleehash`
- `ioperands`
- `ooperands`
- `latency`
- `tile`

这些字段可用于 demo 下钻、报告解释和跨产物追溯；若与官方显示参数冲突，优先按官方显示参数组织默认节点信息。

## 4. 使用规则

- demo、报告或说明材料中涉及四类 Graph 节点信息时，默认按本文选择节点类型和显示参数。
- 如需加入真实样例 JSON 字段，应标明它是可追溯字段或补充字段，不应伪装成官方默认显示参数。
- 节点呈现方式、交互状态和组件形态不在本文约束范围内。
