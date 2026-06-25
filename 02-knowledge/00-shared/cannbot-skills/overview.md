# CANNBot Skills 知识地图

本文是 `cannbot-skills` 本地镜像的轻量 agent-workflow map，用于帮助 PyPTOUX 理解 CANNBot skills 的领域划分、可复用 workflow、PyPTO / Ascend C / model inference 相关技能入口，以及后续是否吸收为 PyPTOUX agent 协作参考。

它不是 PyPTO / CANN 技术事实 source of truth。Skill 中的 API、硬件、性能、工具链 claim 必须回 CANN 官方文档、对应代码仓、安装路径或用户提供材料校验。

## 0. Snapshot 与使用边界

| 字段 | 值 |
| --- | --- |
| intended_use | `orientation_hints`, `agent-workflow-source` |
| source_snapshot_date | `2026-06-24` |
| local_mirror_path | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/cannbot-skills` |
| remote_url | `https://gitcode.com/cann/cannbot-skills` |
| snapshot_branch | `master` |
| snapshot_commit | `bba4e1823e0b366c14b38a5186c987b5703c1f66` |
| snapshot_short_commit | `bba4e182` |
| snapshot_commit_date | `2026-06-24T15:51:30+08:00` |
| snapshot_subject | `fix: 修复 3 处文档链接路径错误` |
| verification_status | local clone; tracked worktree clean |

使用规则：

- 本目录只记录 workflow / skill organization，不把 skill 文案中的技术结论当事实出口。
- 引用 skill 时保留原始 skill 名，例如 `pypto-op-develop`、`ascendc-code-review`。
- 如果要把 CANNBot 的 workflow 同步到 PyPTOUX，需要另做适配设计，不直接复制其 agent / plugin 结构。
- 发现 README / AGENTS 与当前 checkout 目录结构不一致时，保留 drift。

## 1. 仓库定位

`cannbot-skills` README 称其面向 CANN 开发提供可复用 Skills 模块，覆盖 Ascend C、PyPTO、TileLang、Triton 算子开发流程和 NPU 模型推理优化。当前 checkout 顶层包含 `ops/`、`ops-lab/`、`model/`、`graph/`、`infra/`、`plugins-official/`、`plugins-community/`、`docs/`、`tests/` 等目录，并检索到 110 个 `SKILL.md`。

| 维度 | 当前理解 | 主要证据 |
| --- | --- | --- |
| 项目定位 | CANNBot 面向 CANN 开发效率提升，提供可复用 Skills。 | `README.md` |
| 领域划分 | 当前 checkout 顶层按 ops、ops-lab、model、graph、infra、plugins 等组织。 | top-level directories |
| PyPTO 相关 | `ops/` 中包含 `pypto-api-explore`、`pypto-op-design`、`pypto-op-develop`、`pypto-op-perf-tune`、`pypto-precision-debug` 等。 | `find ops -name SKILL.md` |
| Ascend C 相关 | `ops/` 覆盖 env check、tiling、runtime / precision / crash debug、code review、direct / registry invoke 等。 | `ops/*/SKILL.md` |
| 模型推理 | `model/` 覆盖 graph mode、KV cache、migration、parallel、precision debug、runtime debug、superkernel 等。 | `model/*/SKILL.md` |
| 图模式 | `graph/` 覆盖 torch npu graph compile / runtime / performance diagnosis 和知识类 skill。 | `graph/*/SKILL.md` |
| 协作工具 | `infra/` 包含 GitCode issue / PR handler、skill reviewer、toolkit 等。 | `infra/` |

## 2. Claim Matrix

| Claim | Type | Verification | Evidence |
| --- | --- | --- | --- |
| `cannbot-skills` 是面向 CANN 开发的 skills 模块库。 | `factual` | `verified` | `README.md` |
| 当前 checkout 检索到 110 个 `SKILL.md`。 | `factual` | `verified` | `find ... -name SKILL.md | wc -l` |
| 当前 checkout 包含 `plugins-official` 和 `plugins-community` 顶层目录。 | `factual` | `verified` | top-level directory scan |
| README 中的插件 quickstart 链接与当前 checkout 中对应路径一定完全一致。 | `factual` | `conflict` | README 与目录扫描存在需二次核对的路径漂移迹象 |
| `cannbot-skills` 可证明 CANN API 或 PyPTO 当前实现事实。 | `factual` | `rejected` | `AGENTS.md` 要求技术信息回可信来源，source registry 也将其限定为 workflow / tooling 线索 |

## 3. 当前仓库地图

```text
cannbot-skills/
├── ops/                       # Ascend C / PyPTO / TileLang / Triton 算子相关 skills
├── ops-lab/                   # 实验性算子 skills
├── model/                     # NPU 模型推理优化 skills
├── graph/                     # torch npu graph 诊断 / 知识 / 模板 skills
├── infra/                     # skill reviewer、GitCode issue / PR、toolkit 等协作基础设施
├── plugins-official/          # 官方 plugin 入口
├── plugins-community/         # 社区 plugin 入口
├── docs/                      # governance、standards、usage
├── tests/                     # skill 测试和 gate check
└── .claude-plugin/            # marketplace metadata
```

## 4. 推荐检索路径

| 当前问题 | 第一入口 | 第二入口 | 说明 |
| --- | --- | --- | --- |
| 理解 CANNBot 总体定位 | `README.md` | `AGENTS.md` | README 面向用户，AGENTS 面向 agent 开发 |
| 查 skill 使用样例 | `docs/skills-usage.md` | 具体 `SKILL.md` | 先看 prompt 形态，再看 skill 规则 |
| 查开发规范 | `docs/STANDARDS.md` | `docs/GOVERNANCE.md` | 适合 PyPTOUX agent workflow 借鉴 |
| 查 PyPTO skill | `ops/pypto-*/SKILL.md` | 对应 references / scripts | 只作 workflow 线索 |
| 查 Ascend C 算子 workflow | `ops/ascendc-*/SKILL.md` | `ops/*/references/` | 技术事实回官方文档 / 代码 |
| 查模型推理 workflow | `model/*/SKILL.md` | `model/*/references/` | 可为 UX strategy 提供任务流线索 |
| 查图模式诊断 | `graph/*/SKILL.md` | `graph/*/scripts/` | 适合 diagnostic / painpoint research |
| 查 GitCode 协作 | `infra/gitcode-*` | `docs/skills-usage.md` | 适合 issue / PR source workflow 借鉴 |
| 查 skill 质量门禁 | `infra/cannbot-skill-reviewer/` | `tests/` | 可为 PyPTOUX skill governance 提供参考 |

## 5. 与 PyPTOUX 的使用关系

- 主要作为 `agent-workflow-source`，用于研究 CANN 开发生态里的 agent / skill 分工、prompt 模板、质量门禁和自动化协作。
- 可支持 PyPTOUX 的双 agent 协作治理、prototype prompt 设计、operator doc assistant 工作流设计。
- 不建议把它做成 PyPTO factual knowledge map；技术事实仍回 `pypto`、`pto-isa`、`ops-transformer`、官方文档或样例数据。

## 6. 已知 Drift / 待核对

- `README.md` 和 `AGENTS.md` 中出现的架构示例与当前顶层目录基本一致，但部分 quickstart 链接和目录层级需要在具体使用前二次核对。
- 本轮只做顶层 map，没有逐个读取 110 个 `SKILL.md`。
- 如果后续要吸收 PyPTO 相关 skills，应先只选 `ops/pypto-*` 子集，不要全仓搬运。
