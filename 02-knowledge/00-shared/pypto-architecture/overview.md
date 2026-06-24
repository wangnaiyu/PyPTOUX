# PyPTO 架构与检索地图

本文是 `pypto` 的架构速读和检索地图，用于帮助 Codex / Claude / 人类读者快速定位材料。它不是唯一事实入口；当前实现事实必须回到 `pypto` 本地镜像、文档源码或官方在线文档校验。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | `orientation_hints` |
| source_snapshot_date | `2026-06-17` |
| local_mirror_path | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto` |
| remote_url | `https://gitcode.com/cann/pypto` |
| sync_target | `origin/HEAD -> origin/master` |
| snapshot_branch | `master` |
| snapshot_commit | `91ea6d019b9e0d170934c6861ad63b89c63b9bf9` |
| snapshot_short_commit | `91ea6d01` |
| snapshot_commit_date | `2026-06-17T10:32:51+08:00` |
| refresh_method | `git fetch --prune` + `git reset --hard origin/HEAD` |
| verification_status | `hard-synced-to-origin-master` |

使用规则：

- 本文可以帮助缩小检索范围，但不能替代 source-of-truth。
- 字段名、路径、API、schema、trace key、文件名等 factual claim 必须回 `pypto` snapshot 或官方文档校验。
- why / how / design / UX / demo 类问题不能只依赖本文；应按 `pypto-knowledge-source` 的 evidence strategy 进行多源探索。
- 本轮已清理本地 mirror 中 untracked 的 `.DS_Store` 与顶层 `docs/tools/` 缓存污染；当前 mirror tracked worktree clean。

## 1. 架构摘要

PyPTO 是 CANN 推出的面向 AI 加速器的高效编程框架，目标是简化复杂融合算子乃至模型网络的开发，同时保留高性能计算能力。它采用 PTO（Parallel Tensor/Tile Operation）编程范式，以 Tile 为核心计算抽象，通过多层次计算图表达，把用户用 API 构建的 Tensor 计算图逐步编译为硬件指令，并由设备侧以 MPMD 方式调度执行。

| 维度 | 当前理解 | 主要证据 |
| --- | --- | --- |
| 前端表达 | Python 侧提供 Tensor 级 API、JIT / function / config / symbolic 等入口，贴近算法开发者表达方式。 | `README.md`，`docs/zh/index.md`，`python/pypto/` |
| 图级编译 | 通过多层 IR / 计算图表达和 Pass，把 Tensor 图逐步转换为 Tile Graph、Block Graph、Execution Graph 等更贴近硬件执行的表达。 | `README.md`，`docs/zh/index.md`，`framework/src/passes` |
| 代码生成 | 编译结果经 CodeGen 生成 PTO 虚拟指令，再由编译器生成目标平台可执行代码。 | `README.md`，`framework/src/codegen` |
| 运行时与调度 | 可执行代码加载到设备侧，以 MPMD 方式调度到处理器核；运行时相关实现入口在 `framework/src/machine`、`framework/src/cann_host_runtime` 和 Python runtime 层。 | `README.md`，`docs/zh/index.md`，`framework/src/machine`，`python/pypto/runtime.py` |
| 工具链 | 文档源码包含控制流图、计算图、泳道图和三栏联动视图等工具说明；仓库也包含验证、profiling、schema 等脚本级工具。 | `docs/zh/tools/`，`tools/` |
| 样例与真实模型 | `examples/` 提供从 hello world 到 advanced 的学习样例；`models/` 提供更接近真实业务的大模型算子实现。 | `examples/README.md`，`models/` |

## 2. Claim Matrix

| Claim | Type | Verification | Evidence |
| --- | --- | --- | --- |
| PyPTO 面向 AI 加速器，采用 PTO 编程范式和 Tile 编程模型。 | `factual` | `verified` | `README.md`，`docs/zh/index.md` |
| PyPTO 的编译链路包含 Tensor 图到更底层图表达的多层转换。 | `factual` | `verified` | `README.md`，`docs/zh/index.md` |
| CodeGen 会生成 PTO 虚拟指令并进一步生成目标平台可执行代码。 | `factual` | `verified` | `README.md`，`framework/src/codegen` |
| 设备侧执行采用 MPMD 调度方式。 | `factual` | `verified` | `README.md`，`docs/zh/index.md` |
| `overview.md` 只作为 orientation hints，不能作为当前实现事实出口。 | `governance` | `verified` | `.agents/skills/pypto-knowledge-source/SKILL.md`，source registry |
| `docs/zh/tools/` 是当前 tracked 工具文档入口。 | `factual` | `verified` | `git ls-tree HEAD:docs/zh/tools` |
| 顶层 `docs/tools/` 可作为当前 upstream 工具文档入口。 | `factual` | `resolved-drift` | 本轮确认该目录是 untracked 缓存污染，已清理 |

## 3. 当前仓库地图

```text
pypto/
├── docs/                       # 文档源码
│   └── zh/
│       ├── install/            # 环境准备与安装
│       ├── invocation/         # 样例运行说明
│       ├── tutorials/          # 入门、开发、调试、分布式、整网集成等教程
│       ├── api/                # API 参考
│       ├── tools/              # 控制流图、计算图、泳道图、三栏联动等工具文档
│       └── trouble_shooting/   # FUNCTION / PASS / CODEGEN / MACHINE 等组件排障
├── examples/                   # 从 hello world 到 advanced 的分层样例
├── models/                     # 真实模型 / 大模型算子实现样例
├── python/pypto/               # Python 前端、IR、runtime、operator 等入口
├── framework/src/              # C++ adapter、runtime、CodeGen、Pass、machine 等实现
└── tools/                      # profiling、verifier、schema、workflow 等脚本工具
```

当前 `models/` 包含：

- `arctic`
- `deepseek_v32_exp`
- `deepseek_v4`
- `glm_v4_5`
- `kimi`
- `qat`
- `qwen3_next`

当前 `framework/src/` 主要入口：

- `adapter`
- `cann_host_runtime`
- `codegen`
- `cost_model`
- `interface`
- `machine`
- `operator`
- `passes`
- `platform`
- `utils`

当前 `python/pypto/` 主要入口：

- `frontend`
- `ir`
- `op`
- `pil`
- `pypto_impl`
- `runtime.py`
- `tensor.py`
- `operation.py`
- `functions.py`
- `symbolic_scalar.py`

## 4. 常见检索路径

| 当前问题 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 刚开始接触 PyPTO | `docs/zh/tutorials/introduction/` | `examples/README.md` | 先建立概念和运行路径 |
| 环境准备、安装、样例运行 | `docs/zh/install/` | `docs/zh/invocation/` | 优先看当前文档源码 |
| 编写算子或确认编程方法 | `docs/zh/tutorials/development/` | `examples/01_beginner/`、`examples/02_intermediate/` | 教程给规则，样例给写法 |
| 查 API 参数、约束或返回值 | `docs/zh/api/` | `python/pypto/` | API 文档和 Python 源码互相校验 |
| 查控制流、符号化、动态 shape | `docs/zh/api/controlflow/`、`docs/zh/api/symbolic/` | `examples/02_intermediate/controlflow/` | 路径命中失败时回 `rg` |
| 结果不对、编译失败、运行失败 | `docs/zh/tutorials/debug/` | `docs/zh/trouble_shooting/` | 先按现象，再按组件专题 |
| 性能不好、想看瓶颈 | `docs/zh/tutorials/debug/performance.md` | `docs/zh/tools/swimlane_graph/` | 性能工具和运行产物需另回 runtime artifact |
| 看控制流图 / 计算图 / 泳道图 / 三栏联动 | `docs/zh/tools/` | `tools/` | toolkit / PyPTO data sources 的 mirror、manifest 与权限策略另行治理 |
| 看真实复杂模型实现 | `models/` | `examples/03_advanced/` | 优先选当前问题相关模型目录 |
| 看框架内部机制 | `python/pypto/`、`framework/src/` | `docs/zh/tutorials/` | 源码事实优先；教程帮助建立阅读心智 |

## 5. 开发与学习路径

### 5.1 官方入门顺序

| 顺序 | 路径 | 用途 |
| --- | --- | --- |
| 1 | `docs/zh/index.md` | 文档中心总览 |
| 2 | `docs/zh/tutorials/introduction/` | 项目介绍、quick start、编程范式 |
| 3 | `docs/zh/install/` | 环境准备和安装 |
| 4 | `docs/zh/invocation/` | 样例运行 |
| 5 | `examples/README.md` | 进入样例学习路径 |

### 5.2 样例路径

| 阶段 | 目录 | 重点 |
| --- | --- | --- |
| 入门 | `examples/00_hello_world/` | 最小张量加法和初始化心智 |
| 初级 | `examples/01_beginner/` | 基础操作、tiling、compute、transform |
| 中级 | `examples/02_intermediate/` | 神经网络组件、算子组合、runtime 特性 |
| 高级 | `examples/03_advanced/` | Attention、高级模式、系统级优化 |
| 模型 | `models/` | 大模型算子和真实业务实现 |

### 5.3 工具链路径

| 目标 | 路径 |
| --- | --- |
| 先理解工具定位 | `docs/zh/tools/introduction/简介.md` |
| 安装与快速入门 | `docs/zh/tools/introduction/安装.md`、`docs/zh/tools/introduction/快速入门.md` |
| 数据准备 | `docs/zh/tools/introduction/数据准备.md` |
| 控制流图 | `docs/zh/tools/control_flow/index.md` |
| 计算图 | `docs/zh/tools/computation_graph/index.md` |
| 泳道图 | `docs/zh/tools/swimlane_graph/index.md` |
| 三栏联动 | `docs/zh/tools/three_column/三栏联动视图.md` |

## 6. 已知限制与后续

- 本文只覆盖 `pypto` 本体的 architecture orientation，不处理 `pypto-tools` mirror / adapter / demo 策略；这些内容由 toolkit / PyPTO data source governance 另行处理。
- 本文不纳入 `pypto-sample-dataset`、`pypto-testdata` 或 toolkit 设计稿 intake；这些仍按对应 source governance 处理。
- 若后续发现 `pypto` remote、目录结构或工具链文档再次变化，先记录到 `drift.md`，再更新本文。
- 更完整的 source snapshot、引用边界和 drift 记录见本目录的 `sources.md` 与 `drift.md`。
