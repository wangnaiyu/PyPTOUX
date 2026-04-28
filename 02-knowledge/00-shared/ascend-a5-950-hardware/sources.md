# A5 / Ascend 950 硬件架构来源

本文记录 `overview.md` 的来源、可信度和后续待核验点。

## Primary / Strong Sources

| 类型 | 来源 | 路径 / URL | 用途 |
| --- | --- | --- | --- |
| 本地知识库 | 昇腾 AI Core 硬件对象与数据搬移路径 | `02-knowledge/00-shared/ascend-aicore-hardware/overview.md` | 通用 AI Core 对象、AIC/AIV 分离架构、Vector/Cube 数据流、MTE/FixPipe 路径。 |
| 本地 `pypto` 镜像 | PyPTO 泳道图 / 计算图联动字段 | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto` | `rootHash`、`callOpMagic`、`leafHash`、`wrapId`、`TPUT/TGET` 等工具字段和源码事实。 |

## Official Community Materials

| 类型 | 来源 | 路径 / URL | 用途 | 可信度处理 |
| --- | --- | --- | --- | --- |
| CANN 开发者社区文章 | CANN NEXT系列干货：面向950的架构详解 | `https://cann.csdn.net/69d8a96e54b52172bc684f2e.html` | 950PR/950DT、Cube-Vector 融合、NDDMA、128B Sector L2、BufferID、UnifiedBus、URMA、CCU 等公开能力线索。 | `public material / official-community-material`；可作为 A5/950 阶段性官方社区材料，不替代正式 CANN 文档或 PyPTO 源码事实。 |
| GitCode 目录 | `events/meetup/slides/950` | `https://gitcode.com/cann/community/tree/master/events/meetup/slides/950` | A5/950 meetup slides 附件入口和后续增量更新线索。 | `public material / official-community-material`；按问题单点读取相关 slide 文件，不把 `cann/community` 整仓当作当前检索对象。 |

## Supporting Sources

| 类型 | 来源 | 路径 / URL | 用途 | 可信度处理 |
| --- | --- | --- | --- | --- |
| 内部报告 | A5 / Ascend 950 与 PyPTO 影响报告 | `02-knowledge/00-shared/ascend-a5-950-hardware/a5-950-pypto-impact-report.md` | 将硬件架构、代际差异、PyPTO 适配、算子开发影响、调试调优影响和 Toolkit 场景整理成详细报告。 | derived source；用于刷新 `overview.md`，不替代其底层 primary / public sources。 |
| 项目 UX 设计 | 昇腾硬件结构 Demo 交互设计说明 | `04-uxdesign/03-ascend-hardware-architecture/interaction-spec.md` | 硬件图 UI 的画法、可信度线型、场景路径。 | 作为内部设计规范，不作为硬件事实源。 |
| 项目样例数据说明 | Ascend Hardware Map sample data | `05-prototypes/03-ascend-hardware-architecture/notes/sample-data.md` | 原型可消费的数据结构和状态分类。 | 作为 demo 数据结构参考。 |
| 媒体报道 | IT之家：华为 CANN 开源开放首发支持昇腾 950 系列 | `https://www.ithome.com/0/939/089.htm` | 950PR / 950DT、CANN 对 950 系列支持的外部佐证。 | 只作 supporting source，不替代 CANN 文章或官方文档。 |

## 当前已吸收的事实

- `Ascend 950` 可按 `950PR` / `950DT` 两类产品形态理解；当前按 `public material` 处理。
- 公开材料中出现 `Ascend 950 Die`、双 DIE UMA、950PR / 950DT 与不同 Memory 合封等产品形态线索；当前按 `public material` 处理。
- 950 官方社区材料中出现 `Cube-Vector fused path`、`NDDMA`、`128B Sector L2`、`BufferID`、`UnifiedBus`、`URMA`、`CCU` 等关键词；当前按 `public material / official-community-material` 处理。
- 通用 AI Core 主路径仍应复用已有 `AIC / AIV`、`GM / L2`、`UB / L1 / L0`、`MTE / FixPipe` 口径。
- 本地 `pypto` 镜像中存在 `DAV_3510`、`GraphUtils::IsCVMixPlatform()`、`MixSubgraphSplit`、`CV_SYNC_SRC`、`CV_SYNC_DST`、Mix OoO schedule、ReduceCopy、runtime / profiling 分支等 A5 / CV mix 适配线索。
- PyPTO Toolkit / 泳道图相关字段仍应保留原始 literal，例如 `rootHash`、`callOpMagic`、`leafHash`、`wrapId`。
- 当前 PyPTO Mix demo 中，硬件路径只能标为基于 trace 字段和硬件结构的 `L2 storyboard`，不能标为 950 真机 trace。

## 当前保留为 claim / 待核验

- `URMA` 是否已经可由 PyPTO PTO 异步指令路径直接触发。
- `CCU` 是否已经能从 PyPTO trace、`merged_swimlane.json`、`dyn_topo.txt` 或 profiler event-hint 中直接定位。
- 950 `BufferID` 是否会出现在当前 PyPTO 泳道图数据字段中。
- `mix_groups` / `sync_events` 是否需要成为 PyPTO Toolkit 的正式 JSON schema，还是继续由前端根据现有字段推断。
- `DAV_3510` 与 `Ascend 950PR` / `Ascend 950DT` 在配置、安装路径、runtime 产物和对外文档中的映射是否完全稳定。
- 950 具体 buffer 容量、带宽、AIC:AIV 配比等参数，本主题暂不写死，避免与 SKU 或版本漂移冲突。
