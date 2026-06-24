# Dataset: three-view

本文记录本地 `three-view` 数据集中“代码 -> 图 -> 性能”的可追溯链路。它由原 `pypto-sample-datasets` 主题迁入 `pypto-data/datasets/`。

## 1. 基本信息

| 项目 | 内容 |
| --- | --- |
| source instance | `pypto-sample-dataset` |
| 数据集路径 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/20251112-three-view` |
| 当前已见源码 | `code/page_attention.cpp` |
| 当前已见输出目录 | `output_20251112_170823_664974/` |
| 数据角色 | `runtime-observed` |
| 默认数据等级 | L1 |
| 最适合用途 | 三栏联动 demo、计算图展示、泳道图展示、Pass 编译链路说明 |

## 2. 证据范围与边界

当前可明确写入的边界：

- `program.json`、`merged_swimlane.json`、`dyn_topo.txt`、`Pass_*`、`kernel_aicore/`、`function.cpp` 都真实存在。
- `topo.json` 当前文件内容是 `null`，不能写成“已有可直接使用的拓扑结构数据”。
- `run.log` 当前文件大小是 `0 bytes`，不能写成“已有可展示的运行日志”。
- 当前目录没有把 `multi_swimlane.json`、`page_attention.json`、`test_glm_ffn_dense_quant.py` 写成 three-view 现成素材。

## 3. 核心关联机制

three-view 中最稳定的“代码 -> 图 -> 泳道图”关联锚点是 semantic label。

在 `code/page_attention.cpp` 中可见多处：

- `config::SetSemanticLabel("MatMul")`
- `config::SetSemanticLabel("SoftMax")`
- `config::SetSemanticLabel("b1-matmul2")`
- `config::SetSemanticLabel("bn-matmul2")`
- `config::SetSemanticLabel("bn-after-matmul2")`
- `config::SetSemanticLabel("Softmax-acc")`

这些标签继续出现在：

- `program.json` 的 `functions[*].operations[*].semantic_label`
- `merged_swimlane.json` 的事件名后缀，例如 `0-5-4-24-1(SoftMax)`
- `merged_swimlane.json` 的 `args.color`

## 4. 数据流转路径

可以把当前数据链路简化为：

`page_attention.cpp`
-> `semantic_label`
-> `program.json`
-> `dyn_topo.txt`
-> `merged_swimlane.json`
-> `Pass_* / kernel_aicore`

实际解释时：

1. `code/page_attention.cpp` 定义循环结构、MatMul / SoftMax 等算子组织方式和 semantic label。
2. `program.json` 汇总 Execute Graph / Block Graph 相关静态信息。
3. `Pass_*` 目录记录编译链路中的图变化。
4. `dyn_topo.txt` 用 `rootHash + opmagic + leafHash` 串起任务和图文件。
5. `merged_swimlane.json` 记录 IDE 展示用综合泳道图，`event-hint` 带 `rootHash`、`callOpMagic`、`leafHash`。
6. `kernel_aicore/` 保留按路径和 hash 命名的生成代码与目标文件。

## 5. 可验证 PATH1 例子

以 `TENSOR_LOOP_L2_bn_Unroll1_PATH1` 为例，当前数据集中可以直接对上这条链：

- Execute Graph 文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_ROOT.json`
- Execute Graph hash：`9928535964290202028`
- 路径级函数文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9.json`
- 路径级函数 hash：`4008488609558567838`
- 一个 leaf 文件：`Pass_35_CodegenPreproc/After_035_CodegenPreproc_TENSOR_LOOP_L2_bn_Unroll1_PATH1_9_LEAF_program_id_03_1231527610565308428.json`
- 该 leaf hash：`1231527610565308428`

对应泳道图事件：

- 事件名：`0-3-5-24-3(bn-after-matmul2)`
- `event-hint`：`rootHash:9928535964290202028, callOpMagic:10015, leafHash:1231527610565308428`

这说明当前样例可以支持：

`swimlane event`
-> `event-hint.rootHash`
-> `PATH1_ROOT.json`
-> `callOpMagic`
-> `CALL op`
-> `leafHash`
-> `LEAF_program_id_xx_*.json`

## 6. Demo 填充建议

1. 源码面板：使用 `code/page_attention.cpp`，按 `SetSemanticLabel(...)` 切段。
2. 计算图面板：用 `program.json` 做总入口，用 `Pass_35_CodegenPreproc/*_ROOT.json` 和 `*_LEAF_program_id_*.json` 下钻。
3. 泳道图面板：用 `merged_swimlane.json` 展示耗时与核分布，用 `dyn_topo.txt` 做 root / leaf / successors 反查。
4. 编译过程面板：用 `Pass_*` 目录做时间线或前后对比。
5. 生成代码面板：用 `kernel_aicore/*.cpp` 或 `function.cpp` 展示后端执行侧代码。

## 7. 注意事项

- 不要把 `topo.json = null` 写成现成图数据。
- 不要把空的 `run.log` 写成已有日志内容。
- 能被当前文件互证的，才写成事实；只能从其他文档看见的结构，最多写成“框架支持的可能形态”。
