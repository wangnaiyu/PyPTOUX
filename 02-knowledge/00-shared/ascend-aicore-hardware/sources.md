# 昇腾 AI Core 硬件结构来源

本文记录 `overview.md` 中硬件对象归属、数据搬移路径与 PTO 通信 claim 的来源。

## Primary Sources

| 类型 | 来源 | 路径 / URL | 用途 |
| --- | --- | --- | --- |
| 官方文档 | 昇腾 CANN：基本架构 | `https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/850alpha001/opdevg/Ascendcopdevg/atlas_ascendc_10_0008.html` | AI Core 组成、Core/Cube Core/Vector Core/AIC/AIV 定义、耦合/分离模式、典型 Vector/Cube 数据流、MTE/FixPipe 通路。 |
| 官方文档 | 昇腾 CANN：存储单元 | `https://www.hiascend.com/document/detail/zh/canncommercial/80RC3/developmentguide/opdevg/Ascendcopdevg/atlas_ascendc_10_0010.html` | L1/L0/UB/BT/FP Buffer 定义，MTE1/MTE2/MTE3/FixPipe 路径。 |
| 官方文档 | 昇腾 CANN：NPU 架构版本 220 | `https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/83RC1alpha002/opdevg/Ascendcopdevg/atlas_ascendc_10_0011.html` | A2/A3 分离架构，AIC/AIV 通过 GM 传递数据，存储单元归属和对齐要求，跨核同步示例。 |
| 官方文档 | 昇腾 CANN：增强 DataCopy | `https://www.hiascend.com/document/detail/zh/CANNCommunityEdition/83RC1alpha003/API/ascendcopapi/atlasascendc_api_07_0104.html` | `CO1 -> CO2` / `L0C -> UB` 通路、DataCopy 支持通路、不同产品型号支持情况。 |
| 官方文档 | 昇腾术语表 | `https://www.hiascend.com/document/detail/zh/Glossary/gls/gls_0001.html` | `GM`、`Local Memory`、`L0A/L0B/L0C`、`L1`、`MTE1/2/3` 术语定义。 |
| 本地代码 | PyPTO `tileop_shmem.h` | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/tileop/distributed/tileop_shmem.h` | 确认 `TPUT/TGET`、`pingTile/pongTile`、`AtomicAdd` 在本地 `pypto` 镜像中的调用形态。 |

## Supporting Source

| 类型 | 来源 | 路径 / URL | 用途 | 可信度处理 |
| --- | --- | --- | --- | --- |
| 外部文章镜像 | 解读 PTO 通信指令集：昇腾多卡数据搬移的 N 种路径 | `https://cann.csdn.net/69ea1e1b0a2f6a37c5a337ab.html` | 微信原文不可读时的同文 claim 入口；提取 PTO 同步/异步通信、SDMA/URMA/CCU、性能案例。 | 只作 claim 入口；硬件事实需回到官方 CANN 或本地代码校验。 |
| 微信原文 | 用户提供链接 | `https://mp.weixin.qq.com/s/xsirSciqrQ6F6LcdLEW3CQ` | 原始阅读目标。 | 本轮网页不可直接读取；未作为直接证据。 |

## 本轮已验证的代码事实

本地 `pypto` 镜像中，`CopyGmToGmByPutGet` 使用 `ShmemUbTile` 构造 `pingTile` / `pongTile`，并调用：

- `pto::comm::TPUT<pto::AtomicType::AtomicAdd>(...)`
- `pto::comm::TPUT<pto::AtomicType::AtomicNone>(...)`
- `pto::comm::TGET(...)`

对应文件位置：

- `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/tileop/distributed/tileop_shmem.h:233`
- `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/tileop/distributed/tileop_shmem.h:239`
- `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto/framework/src/interface/tileop/distributed/tileop_shmem.h:244`

## 本轮未确认或只保留为 claim 的内容

- `TPUT_ASYNC` / `TGET_ASYNC` 的本地实现：本轮在当前 `pypto` 镜像未命中。
- `URMA` 作为 Ascend 950 新增异步搬运后端：本轮未找到官方 CANN 文档确认。
- `CCU` 集合通信硬件卸载：本轮仅见文章 claim 和本地 runtime 枚举/错误类型线索，未确认真实 PTO 路径实现。
- `Quiet` 语义、异步 session scratch tile、文章性能数据：可作为后续检索关键词，不进入已验证硬件结构主图。
