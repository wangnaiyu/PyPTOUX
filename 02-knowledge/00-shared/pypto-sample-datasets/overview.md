# PyPTO 样例数据集

本文用于沉淀 PyPTO 相关的可复用样例数据集，帮助后续在做 demo、可视化样例、代码解释或工具链演示时，快速找到“真实代码 + 真实产物 + 真实性能数据”的组合素材。

这次迭代的重点不是继续罗列文件，而是补清 three-view 数据集中“代码与产物如何关联”的证据链，尽量把三栏联动、泳道图跳图、Pass 对比、生成代码定位这些能力放到同一条可追溯路径里。

## 1. 这个主题为什么存在

`pypto` 工程本身提供的是源码、文档和样例工程，但在做 demo 填充时，经常还需要另一类素材：

- 真实源码文件
- 编译过程的中间产物
- 计算图输出
- 动态任务拓扑
- 泳道图性能数据
- 生成后的 kernel / lower 代码

这类数据特别适合用来填充：

- 三栏联动 demo
- 计算图 / 编译链路演示
- 泳道图性能演示
- “代码 -> 图 -> 性能” 的故事线页面

因此，样例数据集应该作为一个独立的 shared knowledge 主题维护，而不是只零散记在 skill 规则里。

## 2. 当前已确认的数据集

### three-view

| 项目 | 内容 |
| --- | --- |
| 数据集路径 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view` |
| 当前已见源码 | `code/page_attention.cpp` |
| 当前已见输出目录 | `output_20251112_170823_664974/` |
| 最适合的用途 | 三栏联动 demo、计算图展示、泳道图展示、Pass 编译链路说明 |

## 3. 本次核对范围与边界

这次实际核对过的证据主要来自两部分：

- `three-view` 本地数据集中的真实文件
- 本地 `pypto` 镜像中与 `semantic_label`、`program.json`、`merged_swimlane.json`、Pass dump、taskId 编码相关的文档和源码

当前可明确写入的边界如下：

- `program.json`、`merged_swimlane.json`、`dyn_topo.txt`、`Pass_*`、`kernel_aicore/`、`function.cpp` 都真实存在。
- `topo.json` 当前文件内容是 `null`，不能把它写成“已有可直接使用的拓扑结构数据”。
- `run.log` 当前文件大小是 `0 bytes`，不能把它写成“已有可展示的运行日志”。
- 当前 three-view 数据集中没有看到 `multi_swimlane.json`、`page_attention.json`、`test_glm_ffn_dense_quant.py` 这些具体文件名，所以本次不把它们写成现成素材。

## 4. three-view 的代码与产物关联关系

### 4.1 核心关联机制：语义标签是主锚点

three-view 中最稳定的“代码 -> 图 -> 泳道图”关联锚点，不是文件名相似，而是语义标签（semantic label）。

在 `code/page_attention.cpp` 中，可以直接看到多处：

- `config::SetSemanticLabel("MatMul")`
- `config::SetSemanticLabel("SoftMax")`
- `config::SetSemanticLabel("b1-matmul2")`
- `config::SetSemanticLabel("bn-matmul2")`
- `config::SetSemanticLabel("bn-after-matmul2")`
- `config::SetSemanticLabel("Softmax-acc")`

这些标签会继续出现在：

- `program.json` 的 `functions[*].operations[*].semantic_label`
- `merged_swimlane.json` 的事件名后缀，例如 `0-5-4-24-1(SoftMax)`
- `merged_swimlane.json` 的 `args.color`

`pypto` 官方文档对三栏联动的描述也与此一致：代码、计算图、泳道图三栏通过 `semantic_label` 做联动高亮，而不是靠人工维护一套额外映射表。

### 4.2 数据流转路径：从源码到图，再到任务与性能

如果按真实产物顺序理解，three-view 当前最有价值的链路可以看成：

1. `code/page_attention.cpp`
   这里定义了循环结构、MatMul / SoftMax 等算子组织方式，以及 `semantic_label`。
2. `output_*/TENSOR_LOOP_L2_bn_Unroll1_PATH*/Begin_TensorGraph.json` 和 `End_TensorGraph.json`
   这是每条路径在 Tensor Graph 视角下的起止图快照。
3. `output_*/program.json`
   这是图结构主入口，汇总了 Execute Graph / Block Graph 相关的静态信息。`pypto` 文档也明确把它描述为“记录 function name、semantic label 等静态信息”的总入口。
4. `output_*/Pass_*`
   每个 Pass 目录下都有 `Before_*` / `After_*` json 和对应 log，可观察图在编译链路上的变化。
5. `output_*/dyn_topo.txt`
   这是把动态任务关系串起来的关键桥梁。文件头直接给出了：
   `seqNo,taskId,rootIndex,rootHash,opmagic,leafIndex,leafHash,coreType,psgId,successors`
6. `output_*/merged_swimlane.json`
   这是 IDE 展示用的综合泳道图。每条 `traceEvents` 事件的 `args["event-hint"]` 会带上 `rootHash`、`callOpMagic`、`leafHash`，因此能从性能事件跳回图。
7. `output_*/kernel_aicore/`
   这里保留了按路径和 hash 命名的生成代码与目标文件，可继续往编译产物和 kernel 代码侧下钻。

可以把它简化记成：

`page_attention.cpp`
-> `semantic_label`
-> `program.json`
-> `dyn_topo.txt`
-> `merged_swimlane.json`
-> `Pass_* / kernel_aicore`

### 4.3 一个可验证的 PATH1 例子

以 `TENSOR_LOOP_L2_bn_Unroll1_PATH1` 为例，当前数据集中可以直接对上下面这条链：

- Execute Graph 文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_ROOT.json`
- Execute Graph hash：`9928535964290202028`
- 路径级函数文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9.json`
- 路径级函数 hash：`4008488609558567838`
- 一个 leaf 文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_LEAF_program_id_03_1231527610565308428.json`
- 该 leaf hash：`1231527610565308428`

在同一份数据集里还能看到对应泳道图事件：

- 事件名：`0-3-5-24-3(bn-after-matmul2)`
- `event-hint`：`rootHash:9928535964290202028, callOpMagic:10015, leafHash:1231527610565308428`

而在 `PATH1_ROOT.json` 对应的 `program.json` 结构里，`opmagic = 10015` 的 `CALL` 操作的 `semantic_label` 正是 `bn-after-matmul2`。

这说明对当前样例来说，下面这条映射是可以直接被文件互证的：

`swimlane event`
-> `event-hint.rootHash`
-> `PATH1_ROOT.json`
-> `callOpMagic`
-> `CALL op`
-> `leafHash`
-> `LEAF_program_id_xx_*.json`

## 5. 关键映射规则

### 5.1 事件名称解码

`pypto` 泳道图文档对事件名格式有明确说明，例如：

- `0-4-0-25-0(MatMul)`

其中：

- 前三个数字表示 `seqNo`、`task's rootFunction part`、`task's opIndex part`
- 后两个数字表示 `rootIndex` 和 `psgId in this root`
- 括号里的部分是语义标签名

这和 three-view 实际事件名是一致的，比如：

- `0-5-4-24-1(SoftMax)`
- `0-3-5-24-3(bn-after-matmul2)`

### 5.2 `event-hint` 的三元跳转信息

泳道图事件详情里的 `event-hint` 当前最关键的三个字段是：

- `rootHash`
- `callOpMagic`
- `leafHash`

官方文档对它们的作用也有明确说明：

- `rootHash` 对应 Execute Graph
- `callOpMagic` 用于定位 Execute Graph 里的调用节点
- `leafHash` 对应 Block Graph

对于 three-view，这意味着：

- 先用 `rootHash` 找 `*_ROOT.json`
- 再用 `callOpMagic` 找 root 中的调用节点
- 再用 `leafHash` 找对应的 `LEAF_program_id_xx_<leafHash>.json`

### 5.3 `dyn_topo.txt` 是静态图与运行事件之间的桥

`dyn_topo.txt` 的第一行表头就已经很有用：

`seqNo,taskId,rootIndex,rootHash,opmagic,leafIndex,leafHash,coreType,psgId,successors`

它至少承担了三种桥接作用：

- 用 `rootHash + opmagic + leafHash` 把任务和图文件连起来
- 用 `taskId` 和 `successors` 解释任务依赖关系
- 用 `coreType`、`psgId` 辅助理解为什么事件落在特定泳道上

如果做 demo 时需要解释“为什么这个泳道图节点会跳到这张图”，`dyn_topo.txt` 往往比直接硬猜事件名更可靠。

### 5.4 `taskId` 的编码规则

当前 `pypto` 源码里可以确认：

- `TASKID_TASK_BITS = 16`
- `FuncID(taskId) = (taskId >> 16) & mask`
- `TaskID(taskId) = taskId & 0xFFFF`
- `MakeTaskID(rootId, leafId) = (rootId << 16) | leafId`

也就是说，`taskId` 不是随机数，而是把“函数索引”和“该函数内的 opIndex”编码到同一个整数里。

这条规则和 `dyn_topo.txt` 是对得上的。例如：

- `3145733 = 48 << 16 + 5`

它可以被拆成：

- `FuncID = 48`
- `TaskID = 5`

这也是为什么文档里会说 `taskId` 表示“第 seqNo 个 stitched function 内的第几个 root 以及第几个 call”。

### 5.5 Pass 命名规则

`pypto` 源码里 `Pass::GetDumpFilePrefix(...)` 的命名规则可以直接解释 three-view 里的文件名：

- 普通函数 dump：`Before_035_CodegenPreproc_<functionMagicName>.json`
- leaf dump：`Before_035_CodegenPreproc_<functionMagicName>_LEAF_program_id_03_<leafHash>.json`

因此，对当前样例来说：

- `ROOT.json` 对应 Execute Graph
- `LEAF_program_id_xx_*.json` 对应 Block Graph
- `program_id_xx` 是该 root 下子程序编号，不是全局唯一 ID
- 文件末尾的长整数是 leaf function hash

### 5.6 kernel 文件命名规则

`kernel_aicore/` 里的文件名同样可读，例如：

- `TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_4008488609558567838_0_aiv.cpp`
- `TENSOR_LOOP_L2_bn_Unroll1_PATH2_10_12895447651169499376_1_aic.cpp`

当前能稳定确认的是：

- 前半段保留了函数原名，例如 `PATH1_9`
- 中间长整数对应函数 hash
- 末尾的 `aic` / `aiv` 对应不同核类型的生成代码

这使得它可以反向连回 `program.json` 或 `Pass_*` 中的同名函数。

### 5.7 `rawmagic` 的作用

three-view 的 `merged_swimlane.json` 事件里，`ioperand-hint` 和 `ooperand-hint` 都带有 `rawmagic`。

官方文档对这两个字段的说明是：

- 输入 Tensor 的 `rawmagic` 主要用于跳转到 dump tensor
- 输出 Tensor 的 `rawmagic` 主要用于跳转到 dump tensor

因此，当后续需要把“泳道图节点”继续映射到“具体输入输出张量”时，`rawmagic` 是关键主键，不要只靠 tensor name。

## 6. 核心数据结构解析

### 6.1 `program.json`

当前样例的顶层字段包括：

- `version`
- `entryhash`
- `functions`
- `curr_funcmagic`
- `enable_cvfuse`
- `pass_thread_num`

其中 `functions[*]` 常见字段包括：

- `rawname`
- `funcmagic`
- `func_magicname`
- `hash`
- `operations`
- `tensors`
- `rawtensors`
- `incasts`
- `outcasts`
- `semantic_label`

当前样例里，`semantic_label` 主要出现在 `operations[*]` 上，表现为字符串数组；而 three-column 文档里还展示过一种带 `filename`、`label`、`lineno` 的对象结构。由于当前 three-view 数据里没有看到这种对象结构，所以这里只把它记为“框架支持过的形态”，不把它写成 three-view 当前已有事实。

### 6.2 `merged_swimlane.json`

当前样例的顶层只有一个字段：

- `traceEvents`

其中既包含：

- `ph = "M"` 的元数据事件，如 `process_name`、`thread_name`
- `ph = "X"` 的持续时间事件，即真正的任务执行记录

three-view 当前已观察到的 `args.color` 包括：

- `MatMul`
- `SoftMax`
- `b1-matmul2`
- `bn-after-matmul2`
- `bn-matmul2`
- `fake`

其中前五个都可以回到源码里的 `SetSemanticLabel(...)`；`fake` 当前只在泳道图事件里观测到，尚未在 `page_attention.cpp` 中看到对应标签定义，因此不要把它误写成业务算子语义。

### 6.3 `dyn_topo.txt`

这是当前 three-view 里最容易被忽略，但实际上最值得优先读取的文件之一。

它至少同时提供了：

- 任务编号体系：`seqNo`、`taskId`
- 图定位信息：`rootHash`、`opmagic`、`leafHash`
- 执行分布信息：`coreType`、`psgId`
- 依赖关系：`successors`

如果后续要做“点击一个泳道图节点，右侧同步显示它的 root/leaf 图和相邻依赖”的 demo，这个文件比只读 `merged_swimlane.json` 更适合作为中间层。

### 6.4 Pass 产物

当前样例目录中可见完整的 Pass 链，包括但不限于：

- `Pass_00_LoopUnroll`
- `Pass_14_GraphPartition`
- `Pass_26_SubgraphToFunction`
- `Pass_30_OoOSchedule`
- `Pass_35_CodegenPreproc`

这意味着它既能做“最终结果展示”，也能做“某个语义标签经过哪些 Pass 之后发生变化”的过程演示。

### 6.5 其他产物的当前状态

| 文件 | 当前状态 | 备注 |
| --- | --- | --- |
| `function.cpp` | 已存在 | 可作为 lower / 生成后函数级代码素材进一步分析 |
| `kernel_aicore/` | 已存在 | 可连到具体生成 kernel |
| `kernel_aicpu/` | 已存在 | 当前未展开分析 |
| `topo.json` | `null` | 当前不能直接作为图数据来源 |
| `run.log` | 空文件 | 当前不能作为日志说明素材 |

## 7. 这份数据最适合怎么填 demo

如果后续要用 three-view 做真实 demo，建议优先按下面的绑定方式组织：

1. 源码面板
   使用 `code/page_attention.cpp`，按 `SetSemanticLabel(...)` 切段，而不是手工摘一段“看起来像 MatMul 的代码”。
2. 计算图面板
   用 `program.json` 做总入口，用 `Pass_35_CodegenPreproc/*_ROOT.json` 和 `*_LEAF_program_id_*.json` 做 Execute Graph / Block Graph 下钻。
3. 泳道图面板
   用 `merged_swimlane.json` 展示耗时与核分布，用 `dyn_topo.txt` 做 root / leaf / successors 反查。
4. 编译过程面板
   用 `Pass_*` 目录做时间线或前后对比，避免只展示最终态。
5. 生成代码面板
   用 `kernel_aicore/*.cpp` 或 `function.cpp` 展示更接近后端执行的代码。

## 8. 当前阶段结论

`three-view` 已经不是一份单纯“有几张图、几个 json”的样例，而是一条相对完整的真实链路：

- 真实 Page Attention 源码
- 真实语义标签
- 真实计算图主入口
- 真实任务拓扑
- 真实泳道图事件
- 真实 Pass 前后产物
- 真实生成 kernel 文件

因此，后续只要需要做“代码 -> 图 -> 性能”的说明型 demo，优先考虑从这份数据集取材。

同时也要保留边界意识：

- 不要把 `topo.json = null` 写成现成图数据
- 不要把空的 `run.log` 写成已有日志内容
- 不要把当前未出现的 `multi_swimlane.json`、量化脚本或 page json 写成 three-view 已有素材

能被当前文件互证的，才写成事实；只能从其他文档看见的结构，最多写成“框架支持的可能形态”。
