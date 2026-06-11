# Batch A Agentic Search Governance Plan

本文用于承载 Batch A 在 Plan 模式中确认的方案、边界和完成标准。它不是最终长期规则；确认后的稳定结论需要在执行阶段回写到 `.agents/skills/pypto-knowledge-source/`、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch A 的目标是把 `pypto-knowledge-source` 从静态 source routing 升级为 agentic search governance，使 Codex / Claude 在 CANN、PyPTO、Toolkit、UX、demo 和设计策略问题中能够主动识别问题模式、规划证据策略、进行多源探索、验证 claim，并输出面向 UX 工作流的综合结论。

## 2. Workflow Gate

Batch A 分两段推进：

1. Plan 确认阶段：审计当前 skill 和 source registry，提出完整方案，识别阻塞问题，并将确认后的方案写入本文。
2. `/goal` 执行阶段：以本文确认的 Definition of Done 为完成标准，实施 Batch A 文件修改和 checkpoint 更新。

在本文尚未形成确认方案前，不应直接用 `/goal` 修改 `.agents/skills/pypto-knowledge-source/SKILL.md` 或 `.agents/skills/pypto-knowledge-source/references/sources.md`。

## 3. Scope

Batch A 覆盖：

- `pypto-knowledge-source` 的问题模式识别流程。
- `Intent Mode` 与 `Output Mode` 的定义和使用规则。
- evidence strategy、多源探索、claim verification 和 UX-oriented synthesis。
- `sources.md` 的 source schema 重构。
- source instance、source type、discovery mechanism 的治理边界。
- source 状态：`active`、`candidate`、`deprecated`、`blocked`。
- web discovery 规则。
- clone / local mirror 判断规则。
- UX / demo 类输出如何触发后续工作流。

## 4. Non-Goals

Batch A 不做：

- 不刷新 `02-knowledge/00-shared/pypto-architecture/`，该工作归 Batch B。
- 不默认 clone、pull、fetch 或 refresh 外部仓库。
- 不确认 `pypto-tools` 的本地 mirror、adapter 或 demo 使用策略，该工作归 Batch C。
- 不确认 `yinyucheng0601/pto-design-system` 的 mirror、同步和 `07-designsystem/` 投影策略，该工作归 Batch D。
- 不把私有仓、私有运行数据或设计稿源文件的原始材料放入本仓库。
- 不开始具体 demo 设计、prototype build 或 design system sync；只定义它们在 search governance 中的 mode、source 和输出触发规则。

## 5. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文对应章节：

- 当前 `pypto-knowledge-source` 和 `sources.md` 的 audit 结论。
- 新 skill 流程结构。
- `Intent Mode` 表。
- `Output Mode` 表。
- source schema 字段定义、旧字段处理和迁移规则。
- source instance / source type / discovery mechanism 分类。
- source 状态分类。
- claim verification 规则。
- web discovery 规则。
- clone / local mirror policy。
- UX / demo 输出规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 6. Definition Of Done

Batch A 完成时，必须同时满足以下条件：

- 本文已经包含经用户确认的 Batch A 方案，而不是只有模板。
- `.agents/skills/pypto-knowledge-source/SKILL.md` 已体现 agentic search governance 流程。
- `.agents/skills/pypto-knowledge-source/references/sources.md` 已按确认后的 schema 重构。
- 已覆盖 prompt 要求的全部 `Intent Mode`：`lookup`、`freshness`、`diagnostic`、`optimization`、`workflow-research`、`trend-research`、`painpoint-mining`、`demo-design`、`demo-material`、`ux-strategy`。
- 已覆盖 prompt 要求的全部 `Output Mode`：`answer`、`research-brief`、`ux-analysis`、`demo-brief`、`ux-design-spec`、`prototype-implementation-plan`、`prototype-build`、`source-update`、`knowledge-writeback`、`design-system-application`。
- source schema 至少覆盖：`status`、`access_mode`、`source_type`、`authority_scope`、`best_for`、`not_for`、`question_modes`、`output_modes`、`freshness_policy`、`search_mode`、`discovery_policy`、`claim_policy`、`writeback_policy`。
- 已明确处理旧规则：`Search map` 降级为 `orientation_hints`；`Role`、`Priority note`、`Search preference`、`Refresh rule` 的保留、改名或删除有说明；“每个问题类型至多 1 个 primary source”已限制为简单 lookup 场景。
- 已解释 `authoritative` 与 `primary`、`deprecated` 与 `blocked`、`manifest` source、source instance 与 source type 的区别。
- 已覆盖已登记 source instance、新增 candidate / manifest source、issues / discussions / PR / FAQ / trouble shooting source，以及 web discovery 机制。
- 已明确 Batch A 没有越过边界：未刷新 `pypto-architecture`，未默认 clone，未开始 Batch B/C/D，未写入私有原始材料。
- 已按 checkpoint 规则更新必要文件：`decisions.md`、`open-questions.md`、`sources-to-refresh.md`、`status.md`、`prompts/resume.md`。
- 最终汇报能说明：修改了哪些文件、新 mode 如何工作、source schema 如何变化、旧规则如何处理、哪些问题留给后续 batch、是否可以进入 Batch B。

## 7. `/goal` Execution Contract

当本文方案已经确认后，可以用 `/goal` 执行 Batch A。推荐目标文本：

```md
按 `10-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/batch-a-agentic-search-governance-plan.md` 中已确认的方案实施 Batch A。完成标准以该文件的 Definition of Done 为准；不得越过 Batch A 边界，不执行 clone / refresh / demo build / design system sync。
```

`/goal` 执行时如遇到本文未覆盖、且会影响 source 权限、私有材料引用、schema 语义或 batch 边界的判断，应先更新 `open-questions.md` 并暂停实施。

## 8. Confirmed Design

状态：`pending`

本节由 Plan 确认阶段填写。确认前不要把本文件当作已批准实施方案。

### Audit Findings

待填写。

### Skill Flow

待填写。

### Intent Mode

待填写。

### Output Mode

待填写。

### Source Schema

待填写。

### Source Governance

待填写。

### Claim Verification

待填写。

### Web Discovery

待填写。

### Clone / Local Mirror Policy

待填写。

### UX / Demo Output Rules

待填写。

### User Decisions Needed

待填写。

### Implementation Checklist

待填写。
