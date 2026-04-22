# Demo Patterns

## Demo Type To Material Map

| demo 类型 | 必备真实素材 | 优先去哪里找 | 说明 |
| --- | --- | --- | --- |
| 代码讲解 demo | 源码片段、必要时配编译后函数代码 | `pypto` 工程、样例数据集 `code/`、`function.cpp` | 重点是“代码本身能讲清楚什么” |
| 计算图 / Pass 演示 demo | `program.json`、`topo.json`、`Pass_*` | 样例数据输出目录 | 重点是图结构和 Pass 前后变化 |
| 泳道图 / 性能 demo | `merged_swimlane.json`、`run.log` | 样例数据输出目录 | 重点是性能时序、调度和瓶颈说明 |
| 三栏联动 demo | 源码 + 图数据 + 泳道图 | 同一个数据集优先 | 优先选择同一数据集内能闭环的素材 |
| 混合型 demo | 代码、图、日志、Pass 产物按需组合 | 先选一份主数据集，再从 `pypto` 工程补上下文 | 先保主线完整，再补辅助说明 |

## Panel Mapping

| demo 面板 | 优先素材 | 备用素材 | 说明 |
| --- | --- | --- | --- |
| 源码面板 | `pypto` 工程真实代码、样例数据集 `code/` | `function.cpp` | 优先使用原始源码，必要时再展示 Lower 后代码 |
| 计算图面板 | `program.json` | `topo.json`、`dyn_topo.txt` | 适合展示图结构、子图切分、语义标签关联 |
| 泳道图面板 | `merged_swimlane.json` | `run.log` | 泳道图是性能展示主入口，日志用于补充上下文 |
| Pass 过程面板 | `Pass_*` 目录 | `program.json` | 适合做阶段对比和“编译前后变化”叙事 |
| 调试说明面板 | `run.log` | `README` / knowledge 文档 | 适合放异常说明、运行摘要、参数解释 |

## Preferred Dataset

当前优先使用：

- `three-view`

原因：

- 同时具备源码、计算图、泳道图、Pass 产物
- 很适合做三栏联动类 demo
- 适合解释代码、图结构、性能之间的关系

## Demo Assembly Order

1. 先确定 demo 主线是“代码”“图”“性能”还是“三栏联动”。
2. 选最贴近主线的真实数据集。
3. 尽量让一个 demo 的核心面板来自同一份数据集，保证叙事可追溯。
4. 再从 `pypto` 工程中补齐缺的上下文文档或真实代码。
5. 最后才补示意性文案或摘要。

## Provenance Checklist

- 每个核心面板都能指回一个真实文件。
- 面板里的字段名、Pass 名、函数名、日志片段不要随意改写。
- 如果为了演示裁剪内容，保留“来自哪个文件”的说明。
- 如果使用了摘要性文案，不要让它看起来像真实运行日志或真实 JSON 原文。
