# CANNBot Skills 来源与 Snapshot

本文记录 `02-knowledge/00-shared/cannbot-skills/overview.md` 的来源、snapshot、引用边界和本轮 mirror 结果。全局 source schema 仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。

## 1. Current Snapshot

| 字段 | 值 |
| --- | --- |
| mirror_date | `2026-06-24` |
| source_instance | `cannbot-skills` |
| local_mirror | `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/cannbot-skills` |
| remote_url | `https://gitcode.com/cann/cannbot-skills` |
| local_branch | `master` |
| snapshot_commit | `bba4e1823e0b366c14b38a5186c987b5703c1f66` |
| snapshot_short_commit | `bba4e182` |
| snapshot_commit_date | `2026-06-24T15:51:30+08:00` |
| snapshot_subject | `fix: 修复 3 处文档链接路径错误` |
| mirror_method | `git clone https://gitcode.com/cann/cannbot-skills` |
| post_clone_status | tracked worktree clean |

## 2. Evidence Inspected

| Source | Evidence | 用途 |
| --- | --- | --- |
| `README.md` | 项目定位、目标用户、quickstart、架构示意、使用示例入口 | 顶层定位 |
| `AGENTS.md` | agent 开发工程师指南、可信来源原则、分层架构 | workflow governance |
| `docs/skills-usage.md` | 各 skill 使用样例和 prompt 形态 | PyPTOUX prompt / workflow 借鉴 |
| top-level directories | `ops`, `ops-lab`, `model`, `graph`, `infra`, `plugins-official`, `plugins-community`, `docs`, `tests` | 当前 checkout 目录结构 |
| `find ... -name SKILL.md` | 110 个 `SKILL.md` | skill 数量和覆盖范围 |
| `ops/*/SKILL.md` listing | PyPTO / Ascend C / TileLang / Triton 等算子 skills | operator workflow orientation |
| `model/*/SKILL.md` listing | 模型推理优化 skills | model workflow orientation |
| `graph/*/SKILL.md` listing | torch npu graph 诊断 skills | graph workflow orientation |

## 3. Source Boundary

### `cannbot-skills` local mirror

- `status`: `active`
- `access_mode`: `local-mirror`, `online`
- `authority_scope`: CANNBot skill taxonomy、agent workflow、prompt pattern、quality gates、GitCode issue / PR workflow 和 skill governance 线索。
- `best_for`: `workflow-research`、`ux-strategy` 中与 agent 辅助、CANN 开发工作流、skill 设计有关的问题。
- `not_for`: PyPTO / CANN / Ascend API factual source of truth。
- `claim_policy`: skill 文案可证明 workflow 设计，不证明技术事实正确；技术 claim 回官方文档、代码 source 或用户提供材料。

## 4. Maintenance Rules

- refresh / fetch 后必须更新本文件 snapshot 表和 `overview.md` 的 snapshot。
- 不在 PyPTOUX 中复制全量 skills；只在需要时抽取 workflow pattern、prompt shape 和质量门禁。
- 若 README / AGENTS / 当前目录结构存在 drift，记录为 drift，不直接改写为单一口径。
