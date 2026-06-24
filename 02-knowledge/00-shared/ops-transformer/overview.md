# ops-transformer 知识地图

本文是 `ops-transformer` 本地镜像的轻量仓库解读和 workflow map，用于帮助 PyPTOUX 在涉及 transformer 类算子、operator workflow、算子迁移、Ascend 950 算子列表、aclnn / torch extension 调用和 demo 取材时快速定位材料。

它不是 CANN 算子开发的唯一事实出口；API、硬件、工具链和版本配套 claim 仍需回 CANN / Ascend 官方文档、`ops-transformer` snapshot 或具体 tag 校验。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | `orientation_hints`, `operator-workflow-source` |
| source_snapshot_date | `2026-06-24` |
| local_mirror_path | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/ops-transformer` |
| remote_url | `https://gitcode.com/cann/ops-transformer` |
| snapshot_branch | `master` |
| snapshot_commit | `0c372f8d537c6cfa7bd0ffb165c6701f8ddb79a9` |
| snapshot_short_commit | `0c372f8d` |
| snapshot_commit_date | `2026-06-24T17:44:26+08:00` |
| snapshot_subject | `mhc_pre_sinkhorn_backward: 修正MHC_PRE_GRAD_MM1/MM2 MatmulConfig配置` |
| verification_status | local clone; tracked worktree clean |

使用规则：

- README 明确提醒源码会跟随 CANN 软件版本发布，使用 `master` 可能存在版本不匹配风险；强版本 claim 必须选择配套 CANN tag 或官方 release 说明。
- 本文面向 repo / workflow orientation，不复制大段算子代码。
- 单算子事实必须回具体算子目录，如 `attention/flash_attention_score/`。
- CANN API、Ascend C 语言、硬件单元等通用 claim 必须回官方文档校验。

## 1. 仓库定位

`ops-transformer` 是 CANN 算子库中 transformer 类大模型计算的进阶算子库，README 称其覆盖 attention、MoE、MC2、通算融合等场景，并提供标准算子、experimental 算子、examples、torch extension、文档和测试入口。

| 维度 | 当前理解 | 主要证据 |
| --- | --- | --- |
| 项目定位 | 面向 transformer 类大模型计算的进阶算子库，覆盖 attention、moe、mc2 等。 | `README.md` |
| 版本边界 | README 提醒应选择与 CANN 版本配套的 tag，`master` 可能不匹配。 | `README.md` |
| 标准工程 | 标准算子目录通常包含 `op_host`、`op_kernel`、`op_api`、`op_graph`、examples、tests 等可选交付件。 | `docs/zh/install/dir_structure.md` |
| 开发流程 | AI Core 标准算子开发从工程创建、算子定义、Tiling、Kernel、aclnn、编译部署到验证。 | `docs/zh/develop/aicore_develop_guide.md` |
| 算子索引 | `docs/zh/op_list.md` 维护项目提供的算子分类、目录、交付件和硬件单元。 | `docs/zh/op_list.md` |
| 调用方式 | 文档中心包含 aclnn、图模式、torch extension 等调用入口。 | `docs/README.md`, `docs/zh/invocation/` |

## 2. Claim Matrix

| Claim | Type | Verification | Evidence |
| --- | --- | --- | --- |
| `ops-transformer` 是 CANN transformer 类大模型计算进阶算子库。 | `factual` | `verified` | `README.md` |
| 仓库覆盖 attention、MoE、MC2 等分类。 | `factual` | `verified` | `README.md`, top-level directories |
| 标准 AI Core 算子开发流程包含工程创建、算子定义、Tiling、Kernel、aclnn、编译部署和验证。 | `factual` | `verified` | `docs/zh/develop/aicore_develop_guide.md` |
| 使用 `master` 分支可代表任意 CANN 版本事实。 | `factual` | `rejected` | `README.md` 明确提示版本不匹配风险 |
| `ops-transformer` 可证明 PyPTO 当前行为。 | `factual` | `rejected` | source registry 规定 PyPTO 当前行为回 `pypto` |

## 3. 当前仓库地图

```text
ops-transformer/
├── attention/                   # attention 类算子，包含 flash attention、sparse attention、KV cache 等
├── ffn/                         # FFN 相关算子
├── gmm/                         # grouped matmul 相关算子
├── mc2/                         # 通算融合 / 多卡通信计算相关算子
├── mhc/                         # MHC 相关 experimental / 新增算子线索
├── moe/                         # MoE 相关算子
├── posembedding/                # RoPE / KV cache / position embedding 相关算子
├── experimental/                # 用户自定义和实验算子
├── examples/                    # add_example、fast kernel launch、flash_attn、mc2 等样例
├── torch_extension/             # PyTorch 扩展、JIT、schema/meta、graph converter
├── docs/                        # QuickStart、安装、调用、开发、debug、API 列表
├── common/                      # 公共头文件和公共代码
├── cmake/                       # 构建和包配置
└── tests/                       # 项目测试配置和依赖
```

## 4. 推荐检索路径

| 当前问题 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 第一次理解仓库 | `README.md` | `docs/README.md` | 先看定位、版本配套和文档中心 |
| 环境和构建 | `docs/zh/install/quick_install.md` | `docs/zh/install/compile.md`, `build.sh` | 构建 claim 回当前分支和 CANN 版本 |
| 标准算子目录结构 | `docs/zh/install/dir_structure.md` | 具体算子目录 | 各交付件是可选的，不能按模板强推 |
| AI Core 算子开发 | `docs/zh/develop/aicore_develop_guide.md` | `examples/add_example/` | 适合工作流和 demo 叙事 |
| 算子调用 | `docs/zh/invocation/quick_op_invocation.md` | 具体算子 `examples/` | 区分 aclnn、图模式、PyTorch |
| 算子清单 | `docs/zh/op_list.md` | `docs/zh/op_api_list.md`, `docs/zh/torch_api_list.md` | 适合 UI / search demo 的索引源 |
| 调试调优 | `docs/zh/debug/op_debug_prof.md` | `docs/zh/debug/cann_sim.md` | 可衔接 PyPTOUX painpoint / UX analysis |
| Ascend 950 支持 | `docs/zh/ascend950_op_list.md` | 具体算子目录 | 硬件 claim 再回 CANN 官方文档 |
| 迁移样例 | `docs/zh/develop/cross_platform_migration_guide.md` | `experimental/`, `examples/` | 适合 operator workflow research |
| PyTorch 扩展 | `torch_extension/README.md` | `torch_extension/cann_ops_transformer/` | 适合框架接入和调用链分析 |

## 5. 与 PyPTOUX 的使用关系

- 用于 `operator workflow`、算子迁移和 CANN 算子开发体验研究。
- 可作为 `user-feedback-sources` 的配套对象：issues / discussions / PR 里的痛点要回本 mirror 或官方文档校验技术事实。
- 不直接用于 PyPTO 框架事实；与 PyPTO 相关的实现仍查 `pypto`、`pypto-toolkit`、`pypto-data`。
- 可为 `operator-doc-assistant` 或后续算子开发辅助类 demo 提供真实 repo 结构和文档路径。

## 6. 已知限制与后续

- 本轮没有逐条抽取 `docs/zh/op_list.md` 中的所有算子。
- 后续若围绕算子搜索 / 文档助手做 demo，可抽取 `op_list.md`、`op_api_list.md`、`torch_api_list.md` 的 schema 和少量样例。
- README 明确提示版本配套风险；后续做版本性判断时不应只用 `master`。
