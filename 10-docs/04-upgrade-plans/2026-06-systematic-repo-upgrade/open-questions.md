# 待确认问题

## Batch B Preflight（启动前必须确认）

这些问题必须在执行 Batch B refresh / rewrite 之前先与用户确认。

### 已确认

- `pypto` 本地镜像定位为 read-only upstream mirror / agent 检索缓存，通常不在其中开发或保留本地修改。
- refresh 策略：先检查本地 `pypto` mirror 的 `git status` 和 remote；允许执行 `git fetch --prune`；不使用普通 `git pull`；hard sync 前如发现 tracked files 有未提交修改，先暂停并汇报。
- GitCode 上的 sync 目标是 `master` 而不是 `main`；本轮已允许使用 `origin/HEAD` / `origin/master` 作为 hard sync 目标。
- 允许读取本地镜像状态并汇报。
- `overview.md` 形态：检索地图 + 架构摘要，保留少量来源标注的架构理解正文。
- snapshot 元数据记录到 `overview.md` 和 `sources.md`：前者用于快速判断可信度，后者保存完整 source/snapshot 细节。
- refresh 失败时允许线上单点读取辅助判断 drift，但不做无界 web crawl。

### Batch B Resolution

- Batch B 已完成。
- 本地 `pypto` mirror 已 hard sync 到 `origin/HEAD -> origin/master`，snapshot commit `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`。
- 本地 mirror 中 untracked `.DS_Store` 与顶层 `docs/tools/` 缓存污染已清理；后续读取以 tracked snapshot 为准。

## Batch A Resolution

Batch A 已通过以下默认策略解除本批次阻塞：

- 已登记 source 默认采用“保守降权”：不直接 `deprecated` / `blocked`，而是用 `authority_scope`、`best_for`、`not_for` 和 `claim_policy` 限制误用。
- `curated-external-links` 和 web discovery 只作 discovery/supporting，不作 factual source of truth。
- `pypto-top-level-design-documents` 只在 design-intent scope 内 active；当前实现事实必须回 `pypto` 校验。
- 私有仓、大体量仓库、运行数据和设计稿默认先按 `manifest` 或 `candidate` 登记，不把原始材料写入仓库。
- Batch A 只制定 clone / mirror policy 和候选清单，不执行 clone / refresh。

## Source Governance

- 是否存在用户明确要求 `deprecated` 的旧来源？
- 是否存在用户明确要求 `blocked` 的来源？
- `cann.csdn.net/**` 是否长期保留为 `official-community-material`，还是只作为普通 supporting source？
- `github.com/hengliao1972/**` 中除 `pypto_top_level_design_documents` 之外是否还有应登记的 active / candidate source？

## Clone / Local Mirror Policy

- 候选 mirror set 的默认本地根目录放在哪里？
- `github.com/hengliao1972/pypto_top_level_design_documents` 是否需要建立本地 mirror 供 agent 跨文件检索？
- `gitcode.com/cann/pto-isa`、`cannbot-skills`、`ops-transformer`、`pypto-tools` 是否允许 clone 到本地 mirror？
- `gitcode.com/zhanghuixin/PTO-TestData` 是否允许 clone 到本地 mirror，还是只登记 manifest？
- issue / discussion / PR / FAQ 类 source 是否需要本地导出快照，还是保持在线检索？

## Batch C: Toolkit And Runtime Data

- `pypto-tools` 本地镜像计划放在哪里？是否已经下载？
- `pypto-tools` 是否允许本仓库记录文件结构、schema、截图或代码片段？
- pypto 算子运行数据是否允许进入本仓库？
- 如果允许，进入仓库的是原始数据、抽样数据、脱敏数据，还是只进入 manifest？
- 哪些运行数据可以标记为 `share-safe`？
- `PTO-TestData` 的数据等级、权限和可外发边界是什么？
- toolkit 设计稿源文件是否允许进入本仓库？
- 如果设计稿不入仓，是否允许记录缩略图、截图或结构摘要？

## Batch D: Design System

- 从 `yinyucheng0601/pto-design-system` 更新时，是希望手动触发脚本、人工 copy，还是维护一个上游镜像？
- `07-designsystem/` 是否只承载稳定投影，不承载 agent-facing preview 和实验 pattern？
- `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？

## Collaboration

- Claude 是否允许修改本任务包中的 `status.md` 或只允许追加 review notes？
- 是否需要把本任务包规则同步进 Claude 侧入口文件？
