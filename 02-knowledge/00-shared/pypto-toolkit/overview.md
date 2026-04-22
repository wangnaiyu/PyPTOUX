# PyPTO Toolkit 初步理解

## 1. Toolkit 是什么

根据 `docs/tools/introduction/简介.md`，PyPTO Toolkit 是一套面向 PyPTO 框架全流程的辅助工具，重点不在“写算子”，而在“看清楚算子是如何被表达、编译、执行和调优的”。

它的定位可以概括为：

- 可视化编译与运行状态
- 支撑算子开发工作流
- 帮助理解框架内部过程
- 降低调试调优门槛

## 2. 主要功能和特性

当前文档里最核心的四项能力是：

### 控制流图

把基于 PyPTO 表达的控制逻辑可视化，帮助理解代码级逻辑结构。

入口：

- `docs/tools/control_flow/index.md`

下属能力：

- 查看控制流图
- 搜索控制流图节点

### 计算图

展示从原始计算图到可执行图的编译过程，适合看 Tensor / Operation 关系、子图划分和编译健康状态。

入口：

- `docs/tools/computation_graph/index.md`

下属能力包括：

- 查看计算图
- 查看健康报告
- 搜索计算图节点
- 控制图层布局展示
- 锁定计算链路
- 对比计算图差异
- 自定义节点颜色及节点信息
- 跳转到代码行
- 局部搜索渲染计算图

### 泳道图

展示核间 / 核内流水与统计信息，帮助分析任务顺序、依赖关系、耗时和性能瓶颈。

入口：

- `docs/tools/swimlane_graph/index.md`

下属能力包括：

- 从泳道图跳转到计算图
- 搜索泳道图节点
- 测量节点间时间间隔
- 按时间范围查看
- 设置时间观测线
- 查看性能报告
- 设置着色模式
- 配置系统参数

### 三栏联动视图

把代码、计算图和泳道图放到同一页面里联动高亮，是 Toolkit 最有辨识度的一项能力。

入口：

- `docs/tools/three_column/三栏联动视图.md`

前提是代码里要使用 `pypto.set_semantic_label(...)` 设置语义标签，并生成 `program.json` 与 `merged_swimlane.json`。

## 3. 它解决什么问题

如果只从“实际开发”角度看，Toolkit 主要解决三类问题：

- 看懂代码表达和图结构是否一致
- 看懂编译后的图被怎样切分、组织和执行
- 看懂性能瓶颈到底落在图结构、任务依赖还是调度耗时上

所以它特别适合这几类场景：

- 新人建立 PyPTO 心智模型
- 调试图结构异常、子图切分异常
- 性能调优时观察泳道与气泡
- 做代码到图到性能的跨层追踪

## 4. 快速上手路径

`docs/tools/introduction/快速入门.md` 给出了一条非常实用的最短路径：

1. 运行一个 PyPTO 样例，例如 softmax
2. 在输出目录找到 `program.json`
3. 用 Toolkit 打开 `program.json` 查看计算图
4. 打开 `runtime_debug_mode`
5. 重新运行生成 `merged_swimlane.json`
6. 用 Toolkit 打开泳道图

其中两个关键产物是：

- `program.json`：Execute Graph 和 Block Graph 的汇总信息
- `merged_swimlane.json`：泳道图性能数据

## 5. 查询 Toolkit 文档时的推荐路径

后续如果是 Toolkit 相关问题，我会按下面顺序找：

1. 先看 `docs/tools/introduction/简介.md` 和 `快速入门.md`
2. 如果是“看什么图、怎么操作”，进入对应的 `control_flow/`、`computation_graph/`、`swimlane_graph/`
3. 如果是“怎么把代码、图和性能关联起来”，看 `three_column/三栏联动视图.md`
4. 如果是插件问题和已知限制，查 `others/其他功能.md` 和 `faq/已知问题.md`

## 6. Toolkit 文档速查

建议优先记住这些入口：

- `docs/tools/index.md`
- `docs/tools/introduction/简介.md`
- `docs/tools/introduction/快速入门.md`
- `docs/tools/computation_graph/index.md`
- `docs/tools/swimlane_graph/index.md`
- `docs/tools/control_flow/index.md`
- `docs/tools/three_column/三栏联动视图.md`
- `docs/tools/faq/已知问题.md`

## 7. 与调试调优文档的关系

Toolkit 更偏“可视化观察和交互操作”，而 `docs/tutorials/debug/` 更偏“调试方法论和性能策略”。

一个实用组合是：

- 先在 `tutorials/debug/` 里明确排查思路
- 再用 Toolkit 观察计算图、泳道图和联动视图
- 最后回到 `examples/` 或源码里调整写法、TileShape、loop 或配置
