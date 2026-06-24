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
- 私有仓、大体量仓库、未归入已登记 source 的数据材料和设计稿默认先按 `manifest` 或 `candidate` 登记，不把原始材料写入仓库。
- Batch A 只制定 clone / mirror policy 和候选清单，不执行 clone / refresh。

## Source Governance

- 是否存在用户明确要求 `deprecated` 的旧来源？
- 是否存在用户明确要求 `blocked` 的来源？
- `cann.csdn.net/**` 是否长期保留为 `official-community-material`，还是只作为普通 supporting source？
- `github.com/hengliao1972/**` 中除 `pypto_top_level_design_documents` 之外是否还有应登记的 active / candidate source？

## Clone / Local Mirror Policy

- 候选 mirror set 的默认本地根目录放在哪里？
- `github.com/hengliao1972/pypto_top_level_design_documents` 是否需要建立本地 mirror 供 agent 跨文件检索？
- issue / discussion / PR / FAQ 类 source 是否需要本地导出快照，还是保持在线检索？

### 已确认

- `pypto-tools` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto-tools`；snapshot branch `master`，commit `5a4fae5cb574276cedb01880f649011d7f09ca61`。
- `pypto-testdata` / `PTO-TestData` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`；snapshot branch `main`，commit `9303ae914f4bc28908b41c6dfb11b93b3fdcbc15`。
- `pto-isa` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-isa`；snapshot branch `master`，commit `4bd9a4d5175c9fce28f83560a982c5877fb6c685`。
- `ops-transformer` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/ops-transformer`；snapshot branch `master`，commit `0c372f8d537c6cfa7bd0ffb165c6701f8ddb79a9`。
- `cannbot-skills` 已 clone 到 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/cannbot-skills`；snapshot branch `master`，commit `bba4e1823e0b366c14b38a5186c987b5703c1f66`。

## Batch C: Toolkit And Runtime Data

### 已确认

- 保留 source instance `pypto-sample-dataset`，本地路径为 `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`；后续用户放入该目录的 PyPTO 相关样例、测试或运行产物继续归入本 source。
- 新增 source instance `pypto-testdata`，remote 指向 `https://gitcode.com/zhanghuixin/PTO-TestData`，display name 为 `PTO-TestData`。
- source type `runtime-artifact-source` 重命名为 `pypto-data-source`。
- `pypto-sample-dataset` 和 `pypto-testdata` 都属于 `pypto-data-source`，并可同时属于 `demo-evidence-source`。
- 移除 source instance `pypto-runtime-data`；新增 PyPTO 数据材料应归入 `pypto-sample-dataset`、`pypto-testdata` 或后续明确的新 source instance，不再使用泛化的运行数据 source instance。
- `pypto-tools` planned local mirror root is `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件`; it has not been downloaded or cloned.
- PyPTOUX may record `pypto-tools` file structure, schema, screenshots and small code snippets.
- `pypto-sample-dataset` may write back manifest, summaries, data levels and schema; sampled or desensitized data may enter PyPTOUX.
- Only sampled / desensitized data or schema-generated L2 data can be marked `share-safe`.
- `pypto-testdata` may be cloned to `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件`; its data level is L1 and its permission / external boundary follows `pypto-sample-dataset`.
- Toolkit design raw files must not enter PyPTOUX; local storage is `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/设计文件`; thumbnails, screenshots and structure summaries are allowed.
- `02-knowledge/00-shared/pypto-toolkit/` should use canonical files `overview.md`, `sources.md`, and `manifest.md`, scoped to Toolkit、`pypto-tools` and toolkit design inputs.
- `02-knowledge/00-shared/pypto-data/` should use canonical files `overview.md`, `sources.md`, and `manifest.md`, scoped to PyPTO sample/test data, compile/runtime artifacts, data levels and `share-safe` rules.

### 待确认

- 若后续要 refresh `pypto-tools` 或 `pypto-testdata`，是否立即执行外部目录写入和网络访问？
- 具体截图、缩略图、抽样数据或脱敏数据写入仓库前，逐项确认是否可标记 `share-safe`。

## Batch D: Design System

- 从 `yinyucheng0601/pto-design-system` 更新时，是希望手动触发脚本、人工 copy，还是维护一个上游镜像？
- `07-designsystem/` 是否只承载稳定投影，不承载 agent-facing preview 和实验 pattern？
- `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？

## Collaboration

- Claude 是否允许修改本任务包中的 `status.md` 或只允许追加 review notes？
- 是否需要把本任务包规则同步进 Claude 侧入口文件？
