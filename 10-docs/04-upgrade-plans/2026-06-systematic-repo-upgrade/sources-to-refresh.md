# Source Refresh 清单

## 状态说明

- `active`：可被 agent 主动检索，但只能在自己的 `authority_scope` 内作为证据。
- `candidate`：可能有用，但权限、freshness、范围或可靠性未确认；可登记、可讨论，不默认当事实依据。
- `candidate-active`：当前已有使用价值，但正式 mirror / 同步 / 投影策略尚未确认。
- `deprecated`：仍可作为历史背景或 drift 线索，但默认不主动使用。
- `blocked`：不可访问、不可引用、不可写入结果。
- `discovery-pool`：用于发现候选 source instance，不是事实源。

## Batch A Result

Batch A 已将 source governance 回写到 `.agents/skills/pypto-knowledge-source/references/sources.md`。本文件保留升级任务视角的状态、后续 batch 边界和 refresh / mirror 待办。

## Source Instances

| Source | 当前状态 | Batch A 处理结果 | 后续处理 |
| --- | --- | --- | --- |
| `pypto` | `active` | Batch B 已 refresh：本地 mirror hard sync 到 `origin/HEAD -> origin/master`，snapshot commit `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`；`overview.md` 仅作 `orientation_hints` | 后续按问题 freshness 需要单点读取 upstream；默认每自然天最多 refresh 一次 |
| `pypto-official-docs` | `active` | 保持官网口径、对外措辞、教程入口 authoritative | 后续按问题在线读取 |
| `pypto-top-level-design-documents` | `active` within design-intent / `mirror-candidate` | 保守降权：设计意图 active，当前实现事实必须回 `pypto` 校验 | 是否建 local mirror 待用户确认 |
| `cann-docs-community-edition` | `active` | 保持非 PyPTO CANN / Ascend / API / 工具链官方来源 | 默认在线最新版；用户指定版本时按指定版本 |
| `curated-external-links` | `active` as discovery/supporting | 明确为 discovery/supporting source，不作 factual source of truth | 高价值新材料经校验后写回 registry |
| `pypto-sample-dataset` | `active` | 保持 runtime artifact / demo evidence source；强调数据等级和可外发边界 | Batch C 与新增 runtime data 规则整合 |
| `pypto-tools` | `candidate` | 登记为 `code-source` / `toolkit-product-source` / `demo-evidence-source` | Batch C 决定 mirror、adapter 和 demo 使用策略 |
| `pto-isa` | `candidate` | 新增候选 `code-source` / `isa-source` / `hardware-interface-source` | 后续确认是否 mirror |
| `cannbot-skills` | `candidate` | 新增候选 `tooling-source` / `agent-workflow-source` | 后续按相关度确认是否 mirror |
| `ops-transformer` | `candidate` | 新增候选 `code-source` / `operator-workflow-source` | 后续按相关度确认是否 mirror |
| `PTO-TestData` | `candidate` / `manifest` | 新增候选 runtime/test/demo evidence source | Batch C 确认数据等级、权限、mirror 或 manifest |
| `yinyucheng0601/pto-design-system` | `candidate-active` / `mirror-candidate` | 保留为 design-system source；Batch A 不同步上游 | Batch D 决定 mirror、同步和 `07-designsystem/` 投影 |
| pypto 算子运行数据 | `candidate` / `manifest` | 保留为 runtime artifact / demo evidence source | Batch C 建立 intake、权限、脱敏和数据等级 |
| pypto toolkit 设计稿源文件 | `candidate` / `manifest` | 保留为 design-system / toolkit-product / demo-evidence source | Batch C/D 确认可引用边界 |
| issues / discussions / PR / FAQ / troubleshooting | `candidate` | 登记为 user feedback / painpoint evidence source | 后续按主题在线检索；高频再考虑快照或 mirror |
| web discovery | `candidate` | 登记为 discovery mechanism，不作 source of truth | 发现高价值材料后再进入 curated registry 或 source registry |
| `gitcode.com/org/cann/repos` | `discovery-pool` | 新增 CANN org repo discovery pool | 后续按相关度筛选具体 source instance |

## Clone / Local Mirror Policy

- Batch A 只制定 clone / local mirror 判断规则，不执行 clone / pull / fetch / refresh。
- 高频、结构化、可检索、需要跨文件理解的 source，倾向建立本地 mirror。
- 私有仓、大仓库、运行数据和设计稿，先按 `manifest` 登记，再由用户确认路径、权限和可引用范围。
- 偶尔查询且在线结构稳定的 source，可保持在线检索。
- supporting article / 社区帖子默认不 clone，只登记链接、claim 和验证状态。
- issues / discussions / PR / FAQ 类 source 先保持在线检索；如高频用于 painpoint-mining，再考虑导出快照或 mirror。
- `pypto` 本体 refresh 归 Batch B。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的本地 mirror、同步和投影策略归 Batch D。

明确候选 mirror set：

- `https://gitcode.com/cann/pypto`
- `https://gitcode.com/cann/pto-isa`
- `https://gitcode.com/cann/cannbot-skills`
- `https://gitcode.com/cann/ops-transformer`
- `https://gitcode.com/cann/pypto-tools`
- `https://gitcode.com/zhanghuixin/PTO-TestData`
- `https://github.com/hengliao1972/pypto_top_level_design_documents`
- `https://github.com/yinyucheng0601/pto-design-system`

## 下一步

- Batch B：已刷新 `pypto` 本地镜像并更新 `02-knowledge/00-shared/pypto-architecture/`。
- Batch C：确认 `pypto-tools`、运行数据、`PTO-TestData` 和 toolkit 设计稿的 mirror / manifest / demo 使用策略。
- Batch D：确认 `yinyucheng0601/pto-design-system` 的同步方式和 `07-designsystem/` 投影边界。
