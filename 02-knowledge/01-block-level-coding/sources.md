# Block Level Coding Sources

## Primary Sources

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 样例代码 | `page_attention.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/code/page_attention.cpp` | 作为 `Tensor`、`LoopRange(...)`、`SetSemanticLabel(...)` 的上游来源 |
| 样例产物 | `program.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/program.json` | 统计 `Execute Graph` / `Block Graph` 数量与图类型 |
| 样例产物 | `dyn_topo.txt` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/dyn_topo.txt` | 确认 `rootHash / opmagic / leafHash` 桥接关系 |
| 样例产物 | `merged_swimlane.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/merged_swimlane.json` | 确认泳道图事件里的 `event-hint` 字段 |
| 样例产物 | `Pass_26_SubgraphToFunction/*` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_26_SubgraphToFunction/` | 观察 `Tile Graph` 与切图前后关系 |
| 样例产物 | `Pass_35_CodegenPreproc/*_ROOT.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_35_CodegenPreproc/` | 观察 `Execute Graph (root)` 与 `CALL` |
| 样例产物 | `Pass_35_CodegenPreproc/*_LEAF_program_id_*.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_35_CodegenPreproc/` | 观察 `Block Graph (leaf)` 与内部 `opcode` |
| 源码 | `function.h` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/function/function.h` | 确认 `GraphType`、`FunctionType`、`DynloopFunctionAttribute` 定义 |
| 源码 | `recorder.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/program/recorder.cpp` | 确认 `Loop` / `PATH` 的记录方式 |
| 源码 | `function.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/function/function.cpp` | 确认 `pathList` 和路径条件生成逻辑 |
| 源码 | `pass_manager.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/passes/pass_mgr/pass_manager.cpp` | 确认 `LoopUnroll`、`GraphPartition`、`SubgraphToFunction` 所属的 pass 层级 |
| 源码 | `loop_unroll.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/passes/tensor_graph_pass/loop_unroll.cpp` | 确认动态循环如何选 path 并展开 |
| 源码 | `subgraph_to_function.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/passes/tile_graph_pass/subgraph_to_function.cpp` | 确认 `Tile Graph` 如何形成 `Execute Graph` / `Block Graph` |
| 源码 | `opcode.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/operation/opcode.cpp` | 确认 `opcode` 与更底层 `TileOp` 的对应关系 |
| 源码 | `dev_encode_function_dupped_data.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/machine/utils/dynamic/dev_encode_function_dupped_data.cpp` | 确认 `dyn_topo.txt` 的输出字段 |
| 官方文档 | `查看计算图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/computation_graph/查看计算图.md` | 对照 `Tile Graph`、`Block Graph`、`Execute Graph` 的文档口径 |
| 官方文档 | `查看泳道图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/swimlane_graph/查看泳道图.md` | 对照 `event-hint.rootHash / callOpMagic / leafHash` 的说明 |
| 官方文档 | `泳道图跳转到计算图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/swimlane_graph/泳道图跳转到计算图.md` | 对照从泳道图跳回 root / CALL / leaf 的规则 |
| 本仓库资料 | `overview.md` | 本目录 | 整理后的业务理解 |
| 本仓库资料 | `block-graph.md` | 本目录 | 对 `Loop / PATH / root / leaf / swimlane task` 关系的专题整理 |

## Notes

- 当前 `block-graph.md` 使用的结论以本地 `pypto` 镜像和 `three-view` 样例产物为准。
- 其中关于 `PATH0..PATH3` 与 `IsLoopBegin / IsLoopEnd` 组合关系的部分属于 inference，文中已单独标注。
