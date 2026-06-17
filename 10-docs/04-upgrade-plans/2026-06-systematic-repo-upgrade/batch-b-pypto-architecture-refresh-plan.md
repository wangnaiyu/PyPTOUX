# Batch B PyPTO Architecture Refresh Plan

本文用于承载 Batch B 在执行前确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `02-knowledge/00-shared/pypto-architecture/`、相关 `.agents/skills/*`、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch B 的目标是刷新 `02-knowledge/00-shared/pypto-architecture/`，使其反映当前 `pypto` 仓库状态，并让后续 agent 把该目录作为 `orientation_hints` 使用，而不是把旧 overview 当作当前事实来源。

## 2. Workflow Gate

Batch B 分三段推进：

1. Preflight 讨论阶段：确认 refresh 权限、本地镜像状态、snapshot 记录方式、`overview.md` 的信息密度和输出边界。
2. Plan 确认阶段：审计旧 `pypto-architecture`、制定 refresh 方案、识别阻塞问题，并将确认方案写入本文。
3. `/goal` 执行阶段：按本文确认的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应直接 refresh `pypto` 或重写 `02-knowledge/00-shared/pypto-architecture/`。

## 3. Scope

Batch B 覆盖：

- 检查 `pypto` 本地镜像状态。
- 遵守 refresh 频率和未提交改动保护。
- 记录 snapshot 日期、分支、commit。
- 更新 `02-knowledge/00-shared/pypto-architecture/overview.md`。
- 更新 `02-knowledge/00-shared/pypto-architecture/sources.md`。
- 更新 `02-knowledge/00-shared/pypto-architecture/drift.md`。
- 审计依赖旧 `pypto-architecture` hint 的 skills、规则或任务包说明。

## 4. Non-Goals

Batch B 不做：

- 不纳入 `pypto-tools` mirror / adapter / demo 使用策略，该工作归 Batch C。
- 不建立运行数据或 toolkit 设计稿 intake，该工作归 Batch C。
- 不同步 `yinyucheng0601/pto-design-system`，该工作归 Batch D。
- 不开始 demo build、prototype build 或 design system sync。
- 不把 `pypto-architecture` 恢复成唯一 source routing 入口；它只能作为 orientation hints。

## 5. Preflight Questions

开始 Batch B 前必须先确认：

- 是否允许对 `pypto` 本地镜像执行 `git fetch` / `git pull`，还是只读取当前 checkout？
- 本地 `pypto` 镜像是否可能存在需要保留的未提交改动？是否需要先检查并汇报？
- `overview.md` 应偏“检索地图 / orientation hints”，还是保留一定“架构理解正文”？
- snapshot 元数据记录到哪里：仅 `sources.md`，还是 `overview.md` 和 `sources.md` 都记录？
- 如果本地镜像无法 refresh，是否允许用线上单点 freshness backup 辅助判断 drift？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 `pypto-architecture` audit 结论。
- refresh / no-refresh 决策和证据。
- snapshot 记录格式。
- `overview.md` 信息架构。
- `sources.md` 和 `drift.md` 更新规则。
- 依赖旧 architecture hint 的文件清单和处理策略。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch B 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch B 方案。
- `pypto` snapshot 日期、分支、commit 或 no-refresh 原因已经记录。
- `02-knowledge/00-shared/pypto-architecture/overview.md` 已更新为当前可用的 orientation hints / 架构理解。
- `02-knowledge/00-shared/pypto-architecture/sources.md` 已记录本轮 source、snapshot、refresh 和引用边界。
- `02-knowledge/00-shared/pypto-architecture/drift.md` 已记录旧 overview 与当前 source 的 drift 判断。
- 依赖旧 `pypto-architecture` 的 skills / 规则已审计并按需更新。
- 未越过 Batch B 边界：未启动 Batch C/D，未写入私有原始材料，未开始 demo build 或 design system sync。
- 已按 checkpoint 规则更新必要文件：`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`status.md`、`prompts/resume.md`。

## 8. Confirmed Design

状态：

- `batch_status`: `complete`
- `plan_status`: `implemented`

本节记录 Batch B preflight 已确认的策略、已执行的 refresh 检查、hard sync snapshot，以及已实施的正式修改。

### Audit Findings

- 旧 `overview.md` 已有清晰的检索地图价值，但 snapshot 元数据为 `unknown`，不能作为当前实现事实出口。
- 旧 `overview.md` 混合了事实、架构理解和检索建议；Batch B 应把它重构为“检索地图 + 少量来源标注的架构摘要”，并明确只作为 `orientation_hints`。
- `sources.md` 当前只是来源列表，缺少 snapshot、refresh 策略、authority scope、claim boundary 和 no-refresh / refresh 结果。
- `drift.md` 当前有 schema 和维护流程，但没有记录旧 overview 的已知验证债务、snapshot 缺失或本轮 refresh 结果。
- Hard sync 后确认的主要 drift：
  - 远端默认分支是 `master`，不是 `main`。
  - 当前 tracked 文档主路径是 `docs/zh/...`；旧 overview 中的 `docs/tutorials/`、`docs/api/`、`docs/trouble_shooting/`、`docs/install/`、`docs/invocation/` 等路径需要改为 `docs/zh/tutorials/`、`docs/zh/api/`、`docs/zh/trouble_shooting/`、`docs/zh/install/`、`docs/zh/invocation/`。
  - tracked 工具文档入口是 `docs/zh/tools/`；本地顶层 `docs/tools/` 是 untracked 内容，不能作为 upstream snapshot 事实。
  - `models/` 当前包含 `arctic`、`deepseek_v32_exp`、`deepseek_v4`、`glm_v4_5`、`kimi`、`qat`、`qwen3_next`，旧 overview 应更新真实模型目录提示。
  - `framework/src/` 当前包含 `adapter`、`cann_host_runtime`、`codegen`、`cost_model`、`interface`、`machine`、`operator`、`passes`、`platform`、`utils`，旧 overview 中的 framework 描述需要细化。
  - `python/pypto/` 当前包含 `frontend`、`ir`、`op`、`pil`、`pypto_impl`、`runtime` 等入口，旧 overview 中的 Python 前端提示需要更新。
- 依赖旧 architecture hint 的文件已初步发现：
  - `AGENTS.md` 仍写着“先参考 overview 缩小查询范围”，需要改为“可作为 orientation hint，当前事实回 source registry / pypto 校验”。
  - `.agents/skills/pypto-knowledge-source/SKILL.md` 已在 Batch A 降级为 `orientation_hints`，预计无需大改。
  - `.agents/skills/pypto-knowledge-source/references/sources.md` 已登记 `overview.md` 只作 `orientation_hints`，需要在 Batch B 后更新 snapshot 相关说明。
  - `.agents/skills/pypto-demo-data-filling/SKILL.md` 仍使用 “先读 overview 缩小检索范围” 的表达，需要同步降级。
  - `10-docs/03-indexes/content-map.md`、`10-docs/03-indexes/shared-frameworks.md` 只作索引，预计不需要语义修改。

### Refresh Strategy

- 用户已确认：本地 `pypto` 是 read-only upstream mirror / agent 检索缓存，通常不在其中开发或保留本地修改。
- 用户已确认：允许先检查本地 mirror 的 `git status` 和 remote；允许执行 `git fetch --prune`；随后 hard sync 到远端默认分支；不使用普通 `git pull`，避免 merge/rebase 状态。
- 用户已确认：如 tracked files 有未提交修改，先暂停并汇报，不直接覆盖。
- 已执行检查：
  - local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pypto`
  - remote: `https://gitcode.com/cann/pypto`
  - fetch 前本地分支: `master`
  - fetch 前本地 commit: `4fec8188c4788318225ad90ede46e19c31846cdf`
  - tracked worktree: clean
  - pre-cleanup untracked files / dirs: present, including `.DS_Store` files and `docs/tools/`; later cleaned after user approval, and later reads must not treat pre-cleanup untracked content as upstream snapshot.
- 已执行 `git fetch --prune`，远端更新到：
  - `origin/HEAD -> origin/master`
  - `origin/master`: `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`
  - 新增远端分支：`origin/9.1.0`、`origin/9.1.0-beta.3`
  - 删除远端分支引用：`origin/cherry-pick-mr-1686-1773887871361-auto`
- 用户已确认：GitCode 上的 sync 目标应为 `master` 而不是 `main`。
- 已执行 `git reset --hard origin/HEAD`；当前 snapshot:
  - local branch: `master`
  - sync target: `origin/HEAD` -> `origin/master`
  - snapshot commit: `91ea6d019b9e0d170934c6861ad63b89c63b9bf9`
  - short commit: `91ea6d01`
  - commit date: `2026-06-17T10:32:51+08:00`
  - commit subject: `fix(machine): Change aicore_runtime function from uint64 to int64.`
  - tracked worktree after sync: clean
  - post-cleanup status: tracked worktree clean, no untracked cache pollution remains.

### Snapshot Metadata

- `overview.md` 和 `sources.md` 都记录 snapshot。
- `overview.md` 记录读者快速判断所需字段：
  - `intended_use`: `orientation_hints`
  - `source_snapshot_date`
  - `local_mirror_path`
  - `remote_url`
  - `sync_target`
  - `snapshot_branch`
  - `snapshot_commit`
  - `refresh_method`
  - `verification_status`
- `sources.md` 记录完整 source / snapshot / refresh 细节：
  - fetch / sync 时间
  - remote URL
  - local path
  - branch / commit
  - remote HEAD
  - dirty / untracked 状态摘要
  - source authority scope
  - claim boundary
  - online fallback policy
- 本轮 hard sync 已完成，snapshot 可标注为 `hard-synced-to-origin-master`。

### Overview Structure

- 采用“检索地图 + 架构摘要”结构，避免恢复成唯一 source routing 入口。
- 建议信息架构：
  1. `Metadata / 使用边界`：声明只作 `orientation_hints`，当前事实回 `pypto` source 或官方 docs 校验。
  2. `Architecture Summary`：保留少量来源标注的 PyPTO 架构理解正文。
  3. `Repository Map`：按 `docs/`、`examples/`、`models/`、`python/pypto/`、`framework/src/`、`tools/` 给出定位线索。
  4. `Common Retrieval Paths`：按 lookup、workflow、diagnostic、optimization、demo-material 等场景给入口。
  5. `Claim Matrix`：对核心架构 claim 标注 source、claim type、verification status。
  6. `Known Limits / Drift`：链接 `sources.md` 和 `drift.md`。

### Sources And Drift Rules

- `sources.md` 从简单 source 列表升级为本主题内的 source snapshot 和引用边界记录，但不重复维护全局 registry；全局 source 能力仍以 `.agents/skills/pypto-knowledge-source/references/sources.md` 为准。
- `drift.md` 记录：
  - 旧 `overview.md` 的 snapshot metadata unknown。
  - 若 hard sync 后发现路径变化、文档路径变化或 claim 不再成立，记录 `confirmed-drift`。
  - 若因分支目标未确认导致未 hard sync，记录为 plan 阶段阻塞，不提前写入正式 drift。
- refresh 失败时，用户允许线上单点读取辅助判断 drift，但不做无界 web crawl。

### Dependent Files

- 需要在 `/goal` 阶段审计并按需更新：
  - `AGENTS.md`
  - `.agents/skills/pypto-demo-data-filling/SKILL.md`
  - `.agents/skills/pypto-knowledge-source/references/sources.md`
  - `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/status.md`
  - `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/prompts/resume.md`
- 已基本符合 Batch A 降级规则，可能只需要验证或轻量同步：
  - `.agents/skills/pypto-knowledge-source/SKILL.md`
  - `10-docs/03-indexes/content-map.md`
  - `10-docs/03-indexes/shared-frameworks.md`

### User Decisions Needed

- Batch B 已无阻塞问题。
- 用户已允许清理本地 mirror 中的 untracked `.DS_Store` 与顶层 `docs/tools/` 缓存污染；本轮已清理并验证 mirror clean。
- Batch C 启动前仍需确认 `pypto-tools`、运行数据、`PTO-TestData` 和 toolkit 设计稿的 mirror / manifest / 权限策略。

### Implementation Checklist

- [x] 读取 Batch B prompt、任务包状态、Batch A plan、source registry 和当前 `pypto-architecture` 文件。
- [x] 运行并汇报 PyPTOUX `git status --short`。
- [x] 获取用户 preflight 决策。
- [x] 检查本地 `pypto` mirror status、remote、branch、commit。
- [x] 执行 `git fetch --prune`。
- [x] 用户确认 hard sync 目标从 `origin/main` 改为 `origin/HEAD` / `origin/master`。
- [x] 执行 `git reset --hard origin/HEAD`。
- [x] 记录 final snapshot 日期、remote URL、branch、commit。
- [x] 基于 synced snapshot 初步审计 `README.md`、`docs/`、`examples/`、`models/`、`python/pypto/`、`framework/src/` 和必要工具目录。
- [x] 用户确认本文 plan，批准进入 `/goal`。
- [x] 清理本地 mirror 中 untracked `.DS_Store` 与顶层 `docs/tools/` 缓存污染。
- [x] 更新 `overview.md` 为“检索地图 + 架构摘要 + claim matrix”。
- [x] 更新 `sources.md` 为主题 source / snapshot / boundary 记录。
- [x] 更新 `drift.md`，记录旧 overview 与当前 source 的 drift / resolved 状态。
- [x] 同步依赖旧 hint 的 `AGENTS.md`、`pypto-demo-data-filling` 和必要 source registry 文案。
- [x] 更新任务包 checkpoint 文件。
