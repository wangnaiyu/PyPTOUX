# PTO ISA 知识地图

本文是 `pto-isa` 本地镜像的速读与检索地图，用于帮助 PyPTOUX 在涉及 PTO ISA、Tile 编程、A2/A3/A5 后端、通信指令和 CostModel 时快速定位材料。它不是唯一事实出口；具体指令语义、后端支持状态和实现细节必须回到 `pto-isa` snapshot 或 CANN / Ascend 官方文档校验。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | `orientation_hints`, `isa-source` |
| source_snapshot_date | `2026-06-24` |
| local_mirror_path | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa` |
| remote_url | `https://gitcode.com/cann/pto-isa` |
| snapshot_branch | `master` |
| snapshot_commit | `4bd9a4d5175c9fce28f83560a982c5877fb6c685` |
| snapshot_short_commit | `4bd9a4d5` |
| snapshot_commit_date | `2026-06-24T17:15:57+08:00` |
| snapshot_subject | `A3 TNOT TXOR TXORS add int32 uint32 support, A3 TAND TOR update test case` |
| verification_status | local clone; tracked worktree clean |

使用规则：

- 本文用于缩小检索范围，不替代 `pto-isa` 源码、自动生成 ISA 索引或官方文档。
- 指令名、文件名、后端支持状态、平台支持、性能数据等 factual claim 必须回当前 snapshot 校验。
- PyPTO 当前实现事实仍回 `pypto`；`pto-isa` 只能支撑 ISA / Tile Lib / backend capability 相关 claim。
- A5 / Ascend 950 相关硬件路径如涉及 CANN 官方概念，需再对照 `cann-docs-community-edition`。

## 1. 仓库定位

`pto-isa` 是 PTO Tile Library 仓库，面向 tile 编程提供虚拟 ISA、头文件实现、示例、测试和文档。当前 README 表述其覆盖 Ascend A2、A3、A5 和 CPU 路径，并把 PyPTO、TileLang Ascend 等作为上层集成方向。

| 维度 | 当前理解 | 主要证据 |
| --- | --- | --- |
| ISA 文档 | `docs/PTOISA_zh.md` 是根据 `docs/isa/manifest.yaml` 自动生成的 ISA 索引，包含同步、逐元素、Tile-标量、归约、内存、矩阵乘、数据搬运、复杂指令和通信指令。 | `docs/PTOISA_zh.md` |
| 对外 API | `include/pto/common/pto_instr.hpp` 被文档标为 C++ intrinsic API 权威来源；`include/README_zh.md` 建议通过统一入口头接入。 | `docs/PTOISA_zh.md`, `include/README_zh.md` |
| 后端实现 | `include/pto/` 按 common / cpu / npu / comm / costmodel 等组织，支持 CPU 仿真、A2/A3、A5、CostModel 等路径。 | `include/README_zh.md`, `include/pto/` |
| 通信扩展 | `docs/isa/comm/` 和 `include/pto/comm/` 覆盖 `TPUT`、`TGET`、`TPUT_ASYNC`、`TGET_ASYNC`、`TNOTIFY`、`TWAIT`、`TTEST`、集合通信等。 | `docs/PTOISA_zh.md`, `docs/isa/comm/`, `include/pto/comm/` |
| 开发路径 | 文档建议从 quick start、ISA 总览、指令列表、Tile 编程模型、事件同步、性能优化依次阅读。 | `docs/README_zh.md` |
| 示例与测试 | `demos/`、`kernels/`、`tests/` 提供 auto mode、manual kernels、CPU/NPU 测试和性能样例。 | `README_zh.md`, `demos/`, `kernels/`, `tests/` |

## 2. Claim Matrix

| Claim | Type | Verification | Evidence |
| --- | --- | --- | --- |
| `pto-isa` 是 PTO Tile Library，提供 PTO Tile 指令实现、示例、测试与文档。 | `factual` | `verified` | `README_zh.md` |
| 仓库文档称 PTO 是 CANN 定义的面向 tile 编程的虚拟 ISA。 | `factual` | `verified` | `README_zh.md` |
| `docs/PTOISA_zh.md` 是由 `docs/isa/manifest.yaml` 自动生成的 ISA 索引。 | `factual` | `verified` | `docs/PTOISA_zh.md` |
| `include/pto/common/pto_instr.hpp` 是 C++ intrinsic API 的权威入口。 | `factual` | `verified` | `docs/PTOISA_zh.md` |
| `include/README_zh.md` 维护 CPU / CostModel / A2 / A3 / A5 / Kirin 的指令实现状态表。 | `factual` | `verified` | `include/README_zh.md` |
| `pto-isa` 可直接证明 PyPTO 当前行为。 | `factual` | `rejected` | source registry 规定 PyPTO 当前实现事实必须回 `pypto` 校验 |

## 3. 当前仓库地图

```text
pto-isa/
├── docs/                         # 文档入口、ISA 索引、编程模型、CostModel、Machine
│   ├── isa/                      # 每条 PTO 指令参考；comm/ 为通信指令
│   ├── coding/                   # Tile、Event、性能优化、debug、fusion、多核等开发文档
│   ├── auto_mode/                # PTO auto mode 文档
│   └── machine/                  # 抽象机器模型
├── include/pto/                  # 对外 API 与后端实现
│   ├── common/                   # 公共类型、Tile、事件、intrinsic API
│   ├── cpu/                      # CPU simulator / stub 实现
│   ├── npu/                      # A2/A3、A5、Kirin 等 NPU 后端
│   ├── comm/                     # 点对点和集合通信原语
│   └── costmodel/                # 轻量 CostModel 与 perf simulator
├── kernels/                      # manual / custom kernel 与性能示例
├── demos/                        # auto mode、baseline、CPU、torch_jit 示例
├── tests/                        # CPU、NPU、costmodel、script 测试入口
├── scripts/                      # 安装、打包、OAT 检查等脚本
└── cmake/                        # CMake 与打包逻辑
```

## 4. 推荐检索路径

| 当前问题 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 第一次理解 PTO ISA | `docs/README_zh.md` | `README_zh.md` | 先看阅读路径和项目定位 |
| 查某条指令语义 | `docs/PTOISA_zh.md` | `docs/isa/<INSTR>_zh.md` | 指令 literal 保持原样 |
| 查指令后端支持状态 | `include/README_zh.md` | `include/pto/` | 支持表必须回当前 snapshot 校验 |
| 查 C++ intrinsic API | `include/pto/common/pto_instr.hpp` | `include/pto/common/pto_instr_impl.hpp` | 文档标记该头为权威入口 |
| 查 Tile 编程模型 | `docs/coding/Tile_zh.md` | `docs/coding/ProgrammingModel_zh.md` | 适合支撑 PyPTOUX 术语解释 |
| 查事件和 pipeline 同步 | `docs/coding/Event_zh.md` | `include/pto/common/event.hpp` | 适合解释 set / wait flag 与流水线 |
| 查通信 ISA | `docs/isa/comm/README_zh.md` | `include/pto/comm/` | A2/A3 与 A5 实现要分开看 |
| 查 A5 / Ascend 950 能力 | `include/pto/npu/a5/` | `docs/coding/version-compatibility_zh.md` | 硬件 claim 再对照 CANN 官方文档 |
| 查性能优化和 CostModel | `docs/coding/opt_zh.md`, `docs/costmodel-backends_zh.md` | `include/pto/costmodel/` | 经验 claim 标注验证边界 |
| 查可运行示例 | `demos/`, `kernels/` | `tests/README_zh.md` | demo 数据等级另按 PyPTOUX demo 规则判断 |

## 5. 与 PyPTOUX 其他 shared knowledge 的关系

- `pypto-architecture`: 用于 PyPTO 框架本体和当前实现路径；涉及 PTO 指令出口时可跳到本目录。
- `pypto-data`: 用于 PyPTO 运行产物、schema、demo 数据等级；`pto-isa` 不直接定义 demo 数据可外发边界。
- `ascend-a5-950-hardware`: 用于 A5 / 950 硬件理解；`pto-isa` 可补 ISA 层和 Tile Lib 实现证据。
- `ops-transformer`: 用于 transformer 类算子工程和迁移工作流；如涉及 PTO Tile Lib，应从对应算子实现再回本目录校验。

## 6. 已知限制与后续

- 本轮只做本地镜像和 orientation map，没有逐条抽取 145 个中文 ISA 页面。
- `include/README_zh.md` 的支持状态表很长，后续若做 UI / demo，可单独抽成 `instruction-support.md`。
- 通信指令与 A5 异步搬运路径对 PyPTOUX 的硬件叙事价值较高，后续可和 `ascend-a5-950-hardware` 做交叉索引。
