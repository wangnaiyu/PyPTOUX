# PyPTO 样例数据集来源

## Primary Sources

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 本地数据集 | `three-view` 根目录 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view` | 样例数据集主入口 |
| 本地代码 | `page_attention.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/code/page_attention.cpp` | 真实源码素材，观察 `SetSemanticLabel(...)` 与循环结构 |
| 本地产物 | `program.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/program.json` | 计算图静态总入口 |
| 本地产物 | `merged_swimlane.json` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/merged_swimlane.json` | 泳道图与任务性能主入口 |
| 本地产物 | `dyn_topo.txt` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/dyn_topo.txt` | `taskId / rootHash / opmagic / leafHash / successors` 桥接表 |
| 本地产物 | `Pass_*` 目录 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/Pass_35_CodegenPreproc` | Pass 前后图结构与 ROOT / LEAF 命名样例 |
| 本地产物 | `kernel_aicore/` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/kernel_aicore` | 生成 kernel 文件与 hash 命名样例 |
| 本地产物 | `function.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据/three-view/output_20251112_170823_664974/function.cpp` | Lower 后函数级代码产物 |

## Supporting Sources From Local `pypto` Mirror

| 类型 | 名称 | 链接或定位 | 用途 |
| --- | --- | --- | --- |
| 文档 | `pypto-set_semantic_label.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/api/config/pypto-set_semantic_label.md` | 确认语义标签接口的官方含义 |
| 文档 | `三栏联动视图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/three_column/三栏联动视图.md` | 确认代码 / 计算图 / 泳道图通过 `semantic_label` 联动 |
| 文档 | `查看泳道图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/swimlane_graph/查看泳道图.md` | 确认事件名、`event-hint`、`rawmagic` 字段解释 |
| 文档 | `泳道图跳转到计算图.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tools/swimlane_graph/泳道图跳转到计算图.md` | 确认 `rootHash / callOpMagic / leafHash` 的跳图规则 |
| 文档 | `debug.md` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/docs/tutorials/debug/debug.md` | 确认 `program.json` 与 `Pass_* ROOT / LEAF` 的官方定位 |
| 源码 | `draw_swim_lane.py` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/tools/profiling/draw_swim_lane.py` | 确认泳道图事件名和 `traceEvents` 生成方式 |
| 源码 | `TraceLogger.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/cost_model/simulation/statistics/TraceLogger.cpp` | 确认 `merged_swimlane.json` 的 `traceEvents` 写出结构 |
| 源码 | `function.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/function/function.cpp` | 确认 `program.json` 中 `entryhash / funcmagic / file / line` 等字段写出逻辑 |
| 源码 | `pass.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/passes/pass_interface/pass.cpp` | 确认 `LEAF_program_id_xx_<hash>` 的命名规则 |
| 源码 | `aikernel_data.h` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/machine/device/tilefwk/aikernel_data.h` | 确认 `taskId` 的 `FuncID / TaskID / MakeTaskID` 编码规则 |
| 源码 | `dev_encode_function_dupped_data.cpp` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/machine/utils/dynamic/dev_encode_function_dupped_data.cpp` | 确认 `dyn_topo.txt` 的列写出逻辑 |

## Notes

- 当前只正式整理了 `three-view` 数据集，后续可以继续在本主题下新增更多数据集小节。
- 这类数据集最适合和 `pypto` 工程里的真实代码、文档与工具链能力组合使用，而不是单独作为“结果截图素材”使用。
- 本次结论以当前本地数据目录和当前本地 `pypto` 镜像为准；没有在这份主题里把未观测到的文件写成既成事实。
