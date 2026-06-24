# Dataset Catalog: PTO-TestData

本文记录 `pypto-testdata` / `PTO-TestData` 本地 mirror 的目录结构、数据角色和适用场景。

## 1. 基本信息

| 项目 | 内容 |
| --- | --- |
| source instance | `pypto-testdata` |
| display name | `PTO-TestData` |
| remote | `https://gitcode.com/zhanghuixin/PTO-TestData` |
| local mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData` |
| snapshot | branch `main`, commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15` |
| 默认数据等级 | L1；构造测试用例另行标为 L2 |

## 2. 场景目录

| 目录 | 代表文件 | 数据角色 | 用途 |
| --- | --- | --- | --- |
| `threeColumn/ffn_dense` | `program.json`, `merged_swimlane.json`, `dyn_topo.txt`, `test_glm_ffn_dense_quant.py` | runtime/testdata artifact | 三栏联动 schema 和 semantic label 链路 |
| `aicpu/1.7M` | `program.json`, `merged_swimlane.json`, `dyn_topo.txt` | runtime/testdata artifact | AICPU 视图和运行事件 |
| `pmu/A5G2_case*` | `merged_swimlane.json`, `tilefwk_prof_pmu.csv`, `tilefwk_L1_prof_data.json` | runtime/testdata artifact | PMU / L1 profiling |
| `pmu/msprof_case0` | `msprof_*.json`, `msprof_*_split.json` | runtime/testdata artifact | msprof trace 解析 |
| `mix/` | `merged_swimlane.json`, `convert_merged_swimlane.json`, `USAGE.md`, `REQUIREMENTS.md` | schema / transform rule | Mix mode 转换、`wrapId`、`syncEvents` |
| `mix/fake_testcase` | `complex_case*.json`, `convert_complex_case*.json` | synthetic-testcase | 转换规则边界测试，默认 L2 |
| `pypto3/` | `perf_swimlane_*.json`, `merged_swimlane_*.json`, `swimlane_converter_perf.py` | runtime/testdata artifact | pypto3 / `perf_swimlane` 转换 |
| `kernel/` | `perf_swimlane_v2_small.json` | schema example / testdata artifact | kernel runtime schema 探索 |

## 3. 使用规则

- `PTO-TestData` 是 source instance；每个子目录还需要单独判断 data role。
- `fake_testcase` 名称和内容表明其用于构造测试，默认按 L2 / synthetic-testcase 管理。
- 进入 PyPTOUX 仓库时优先写 schema、摘要、目录结构和抽样；不写原始全量数据。
- 与 `pypto-tools` 或 Toolkit 功能相关的转换逻辑，可在 `pypto-toolkit` 中记录产品机制，但数据等级和 schema 仍归本目录。

## 4. 后续可深挖

- `threeColumn/ffn_dense` 与本地 `three-view` 的字段差异。
- `aicpu/1.7M` 中 AICPU trace 与 `perf_swimlane.json` AICPU fields 的对应关系。
- `pmu/A5G2_case1` 中 `tilefwk_L1_prof_data.json` 与 PMU CSV 的 join key。
- `pypto3` 中 `perf_swimlane` 到 `merged_swimlane` 的转换规则。
