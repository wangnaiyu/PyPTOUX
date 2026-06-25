# Source Refresh 清单

## 状态说明

- `active`：可被 agent 主动检索，但只能在自己的 `authority_scope` 内作为证据。
- `candidate`：可能有用，但权限、freshness、范围或可靠性未确认；可登记、可讨论，不默认当事实依据。
- `candidate-active`：当前已有使用价值，但正式 mirror / 同步 /同步策略尚未确认。
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
| `pypto-sample-dataset` | `active` | 保持 PyPTO data / demo evidence source；后续用户放入 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据` 的 PyPTO 样例、测试或运行产物继续归入本 source | 已确认 writeback 到 `02-knowledge/00-shared/pypto-data/`：manifest / 摘要 / 数据等级 / schema；允许抽样或脱敏数据入仓；原始 L1 不默认 share-safe |
| `pypto-tools` | `active` / `local-mirror` | 登记为 `code-source` / `toolkit-product-source` / `demo-evidence-source`；local mirror path: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools` | 已 clone；branch `master`；commit `5a4fae5cb574276cedb01880f649011d7f09ca61`；允许本仓库记录文件结构、schema、截图和少量代码片段 |
| `pto-isa` | `active` / `local-mirror` | 升级为 `code-source` / `isa-source` / `hardware-interface-source`；local mirror path: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa`；knowledge map: `02-knowledge/00-shared/pto-isa/` | 已 clone；branch `master`；commit `4bd9a4d5175c9fce28f83560a982c5877fb6c685`；后续 refresh 需记录 snapshot |
| `cannbot-skills` | `active` / `local-mirror` | 升级为 `tooling-source` / `agent-workflow-source`；local mirror path: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/cannbot-skills`；knowledge map: `02-knowledge/00-shared/cannbot-skills/` | 已 clone；branch `master`；commit `bba4e1823e0b366c14b38a5186c987b5703c1f66`；仅作 workflow / tooling 线索 |
| `ops-transformer` | `active` / `local-mirror` | 升级为 `code-source` / `operator-workflow-source`；local mirror path: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/ops-transformer`；knowledge map: `02-knowledge/00-shared/ops-transformer/` | 已 clone；branch `master`；commit `0c372f8d537c6cfa7bd0ffb165c6701f8ddb79a9`；版本 claim 需回配套 CANN tag / release |
| `pypto-testdata` | `active` / `local-mirror` | 新增 PyPTO data / demo evidence source，display name 为 `PTO-TestData`；local mirror path: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData` | 已 clone；branch `main`；commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`；数据等级 L1，权限和可外发边界同 `pypto-sample-dataset`；writeback 到 `02-knowledge/00-shared/pypto-data/` |
| `yinyucheng0601/pto-design-system` | `active` / `local-mirror` | Batch D 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`，snapshot branch `main`，commit `e26a85628658fa2894aba52e95e335cf60f8dfdc`；已更新 `.agents/skills/pto-design-system` 并同步 `.agents/skills/pto-design-system/` | 后续 sync 采用手动触发 mirror inspect / audit / change report；本轮未落地同步脚本 |
| pypto toolkit 设计稿源文件 | `candidate` / `manifest` | 保留为 design-system / toolkit-product / demo-evidence source；raw files local storage: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件` | 原始设计稿不入仓；允许缩略图 / 截图 / 结构摘要 |
| issues / discussions / PR / FAQ / troubleshooting | `candidate` | 登记为 user feedback / painpoint evidence source | 后续按主题在线检索；高频再考虑快照或 mirror |
| web discovery | `candidate` | 登记为 discovery mechanism，不作 source of truth | 发现高价值材料后再进入 curated registry 或 source registry |
| `gitcode.com/org/cann/repos` | `discovery-pool` | 新增 CANN org repo discovery pool | 后续按相关度筛选具体 source instance |

## Clone / Local Mirror Policy

- Batch A 只制定 clone / local mirror 判断规则，不执行 clone / pull / fetch / refresh。
- 高频、结构化、可检索、需要跨文件理解的 source，倾向建立本地 mirror。
- 私有仓、大仓库、未归入已登记 source 的数据材料和设计稿，先按 `manifest` 登记，再由用户确认路径、权限和可引用范围。
- 偶尔查询且在线结构稳定的 source，可保持在线检索。
- supporting article / 社区帖子默认不 clone，只登记链接、claim 和验证状态。
- issues / discussions / PR / FAQ 类 source 先保持在线检索；如高频用于 painpoint-mining，再考虑导出快照或 mirror。
- `pypto` 本体 refresh 归 Batch B。
- `pypto-tools` 的本地路径、mirror、adapter 和 demo 使用策略归 Batch C。
- `yinyucheng0601/pto-design-system` 的本地 mirror、同步和同步策略已由 Batch D 建立；后续 refresh 需记录 snapshot 和 change report。

明确 mirror tracking set（包含已落地 mirror 与仍待确认的 mirror-candidate）：

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
- Batch C：已确认 `pypto-tools`、`pypto-sample-dataset`、`pypto-testdata` 和 toolkit 设计稿的 mirror / manifest / demo 使用策略；Toolkit 规则回写到 `pypto-toolkit`，PyPTO data 规则回写到 `pypto-data`。
- Batch D：已确认并执行 `yinyucheng0601/pto-design-system` 的同步方式和 `.agents/skills/pto-design-system/` 同步边界。
- Batch E：将 Batch A-D 的稳定规则回写到正式项目规则和最终报告。
