# Sample Data — Ascend Hardware Map

> 用途：为 v2 demo 提供单文件原型可消费的硬件对象与数据搬移路径数据。
> L 等级：本数据全部来自 `02-knowledge/00-shared/ascend-aicore-hardware/overview.md`（CANN 官方核对）+ `01-inbox/ascend-hardware-architecture-notes.md`（Claude 调研，含 article claim）。
> Buffer 容量数字：按上一轮共识，**不放具体数字**，仅以相对大小符号 (`░ ▒ ▓`) 表达。

## Architectures（视图）

| id | label | chips | claim layer? |
| --- | --- | --- | --- |
| `coupled` | 耦合架构 | 310 / 910 类（推理系列、训练系列、200I/500 A2 推理） | 否 |
| `separated` | 分离架构 | 910B / A2 / A3 训练 | 否 |
| `evolved` | 950 演进 | Ascend 950（推断） | 是（URMA / CCU / IO-Die） |

## Object kinds（图元类型）

- `storage`：存储单元（GM / L2 / L1 / L0A/B/C / UB / BT / FP）
- `compute`：计算单元（Cube / Vector）
- `control`：调度单元（Scalar）
- `mte`：搬运/随路通路（MTE1 / MTE2 / MTE3 / FixPipe）
- `engine`：芯片级独立引擎（SDMA / URMA）
- `iodie`：IO-Die 上集散组件（CCU / Memory Slice）

## Status

- `verified`：CANN 官方核对
- `partial`：主路径已验证，机制细节待补
- `claim`：来自文章，未经官方/源码确认

## Scenarios（六+条路径）

详见 v2 demo 内的 `SCENARIOS` 数据表。包括：
- Vector
- Cube
- L0C 累加（自反馈）
- AIC/AIV 协作（仅 separated/evolved）
- SDMA 直传（GM↔GM）
- PTO 同步（partial）
- PTO 异步（claim，仅 separated/evolved）
- 集合通信 / CCU（claim，仅 evolved）

## 与 v1 的区别

v1 已在 `experiments/html/ascend-hardware-map-v1.html` 落地，dark-tech 风格。v2 走 paper-atlas 风格做对照，长期形成两套图元语言。
