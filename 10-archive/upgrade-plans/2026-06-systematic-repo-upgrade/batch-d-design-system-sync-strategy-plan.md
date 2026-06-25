# Batch D Design System Sync Strategy Plan

本文用于承载 Batch D 在执行前确认的方案、边界和完成标准。它不是最终设计系统规则；确认后的稳定结论需要回写到 `.agents/skills/pto-design-system/`、source registry、任务包状态文件，以及后续需要的正式目录。

> 2026-06-25 update: 独立仓库级设计系统目录已撤销。当前 PyPTOUX 只保留 `.agents/skills/pto-design-system/` 作为 PTO 设计系统入口；本文件中 Batch D 的历史同步目标已按当前结构改写为 skill bundle 同步。

## 1. Purpose

Batch D 的目标是建立 `yinyucheng0601/pto-design-system` 与 PyPTOUX 当前 `.agents/skills/pto-design-system/` 之间的上游同步方式。

## 2. Workflow Gate

Batch D 分三段推进：

1. Preflight 讨论阶段：确认上游 mirror / 手动 copy / 脚本同步方式、权限、同步范围和更新频率。
2. Plan 确认阶段：审计当前 `.agents/skills/pto-design-system/` 和相关 prototype 使用方式，制定同步方案。
3. `/goal` 执行阶段：按确认后的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应 clone / fetch / mirror `yinyucheng0601/pto-design-system`，不同步 `.agents/skills/pto-design-system/`，不重写 PTO skill，不启动原型视觉改造。

## 3. Scope

Batch D 覆盖：

- 确认 `yinyucheng0601/pto-design-system` 的同步方式。
- 设计手动触发的拉取、对比、变更报告流程。
- 明确上游 mirror 与 `.agents/skills/pto-design-system/` 的边界。
- 判断哪些内容应同步进 `.agents/skills/pto-design-system/`。
- 更新 `pto-design-system` skill 与 design system 索引。

## 4. Non-Goals

Batch D 不做：

- 不重开 Batch C 的 Toolkit / PyPTO data source 边界。
- 不构建具体 demo 或 prototype 页面，除非用户在 Batch D 之后另起任务。
- 不无确认地覆盖 `.agents/skills/pto-design-system/` 现有内容。
- 不把上游仓库全量盲目复制进 PyPTOUX。

## 5. Preflight Questions

开始 Batch D 前必须先确认：

- `yinyucheng0601/pto-design-system` 是否允许 clone 到本地 mirror？如果允许，本地 mirror 放在哪里？
- 希望采用手动触发脚本、人工 copy，还是维护上游镜像？
- `.agents/skills/pto-design-system/` 是否只承载稳定 bundle，不承载上游全量 mirror？
- `.agents/skills/pto-design-system/` 是否继续作为 agent 使用的主入口？
- 哪些内容允许同步进 `.agents/skills/pto-design-system/`：tokens、CSS、patterns、docs、preview、screenshots、changelog？
- 设计系统同步是否需要生成 diff / change report？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 PTO design system source audit 结论。
- 上游 mirror / copy / script 策略。
- 上游 mirror 与 `.agents/skills/pto-design-system/` 的边界。
- `.agents/skills/pto-design-system/` 同步信息架构。
- 变更报告和同步 checklist。
- source registry 和 `sources-to-refresh.md` 更新规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch D 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch D 方案。
- `yinyucheng0601/pto-design-system` 的 source 状态、access mode、claim policy、writeback policy 已明确。
- 上游 mirror 与 `.agents/skills/pto-design-system/` 的边界已写清楚。
- 如需同步，`.agents/skills/pto-design-system/` 已按确认方案更新；如不同步，已说明 no-write 原因。
- source registry、`sources-to-refresh.md`、`open-questions.md`、`status.md`、`prompts/resume.md` 已按 checkpoint 更新。
- 未越过 Batch D 边界：未开始具体 demo build，未无确认地全量复制上游设计系统，未覆盖未提交工作树。

## 8. Confirmed Design

状态：

- `batch_status`: `complete`
- `plan_status`: `executed`

本节记录 2026-06-24 Batch D preflight 后形成并执行的方案。用户已整体同意 mirror + 手动同步 + diff / change report 策略，允许 `/goal` 阶段实际 clone 上游到推荐 mirror path；本轮不落地同步脚本。Batch D 执行顺序已完成：先 clone / inspect 上游设计系统，再系统性更新 `.agents/skills/pto-design-system`，最后同步 `.agents/skills/pto-design-system/`。

### Audit Findings

- 当前 `.agents/skills/pto-design-system/` 已是 agent-facing bundle，包含 `SKILL.md`、`DESIGN.md`、`tokens/`、`css/style.css`、`patterns/`、`graphviz/`、`design-system-preview.html` 和 preview gate 规则。
- 当前 skill 明确要求 agent 在新建或改造 PyPTOUX 前端原型、PTO 风格页面、graph/workbench UI 时先复用现有 tokens、classes、patterns 和 preview，不得私造按钮、toggle、badge、card、panel 或视觉语言。
- `DESIGN.md` 已把 implementation token source of truth 定为 `tokens/foundation.css`、`tokens/semantic.css`、`tokens/components.css`；`tokens/tokens.js`、`tokens/tokens.json` 如存在，应由 CSS source 生成，不手改。
- `references/preview-gate.md` 已规定缺失样式先建 preview、显式批准后先吸收到 shared system，再给模块使用；`.agents/skills/pto-design-system/` 只在 pattern 成为长期产品设计系统后承接相关指导或组件区域。
- 当前 `.agents/skills/pto-design-system/` 是稳定 skill bundle，已有 `tokens/`、`css/`、`references/`、`patterns/`、`design-system-preview.html` 和 README，已经承接 PTO skill 中成熟的 tokens / patterns / usage rules。
- Source registry 里 `yinyucheng0601/pto-design-system` 当前是 `candidate-active` / `mirror-candidate`，`access_mode` 为 `online`, `manifest`；Batch D 需要决定 mirror 与 `.agents/skills/pto-design-system/` 同步策略。

### Source Strategy

- 允许 clone `https://github.com/yinyucheng0601/pto-design-system` 到本地 mirror。
- 推荐 mirror path：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`。
- 同步方式采用“本地 mirror + 手动触发 sync / audit 脚本 + change report”，不做后台自动同步，也不依赖人工 copy 作为唯一机制。
- Batch D `/goal` 执行顺序：
  1. 先 clone / inspect 上游 `yinyucheng0601/pto-design-system` 本地 mirror，生成 upstream snapshot 与初始 diff / audit 结论。
  2. 再基于上游证据系统性更新 `.agents/skills/pto-design-system`（仅在确有差异或需要吸收上游稳定内容时更新）。
  3. 最后从已确认的 agent-facing skill / upstream audit 结果同步 `.agents/skills/pto-design-system/`。
- 每次同步前检查 PyPTOUX 工作树和上游 mirror 状态；mirror 有本地改动时暂停并汇报，不直接覆盖。
- 每次同步生成 diff / change report，至少记录：
  - upstream remote、branch、commit、commit date；
  - upstream changed files / changed areas；
  - 影响 PyPTOUX 的 tokens、CSS、patterns、docs、preview、assets；
  - 是否需要更新 `.agents/skills/pto-design-system`；
  - 是否需要同步到 `.agents/skills/pto-design-system/`；
  - 是否触发 preview gate；
  - 是否存在不同步或延后处理的变更。
- source registry 中应把 `yinyucheng0601/pto-design-system` 从 `mirror-candidate` 更新为确认的 `local-mirror` 策略；实际 clone 后再记录 snapshot。

### Design System Boundaries

`.agents/skills/pto-design-system/` 继续作为 agent-facing 主入口：

- 存放可执行 tokens、CSS、patterns、preview、agent workflow 和 migration rules。
- 面向 Codex / Claude / frontend agent，回答“写页面时怎么直接用”的问题。
- 可以保留 experimental preview、agent-facing component preview、pattern source files 和执行用 reference。
- 是新 prototype / retrofit 的默认读取入口。

当前不再维护第二套仓库级同步层：

- `.agents/skills/pto-design-system/` 同时承担 agent-facing bundle 与人类预览入口。
- 人类预览使用 `.agents/skills/pto-design-system/design-system-preview.html`。
- 上游仓库全量 mirror 不写入 PyPTOUX；只同步经确认的 tokens、CSS、patterns、docs、preview 和必要资产。
- 未批准 experimental preview 不进入稳定 bundle；如需共享，先走 `references/preview-gate.md`。

### Skill Bundle Structure

当前 `.agents/skills/pto-design-system/` 的可用结构如下；本结构取代已删除的独立设计系统目录。

```text
.agents/skills/pto-design-system/
  SKILL.md
  DESIGN.md
  README.md
  design-system-preview.html
  tokens/
    foundation.css
    semantic.css
    components.css
    tokens.json
    tokens.js
  css/
    style.css
  references/
    quick-reference.md
    pto-design-system-map.md
    preview-gate.md
    retrofit-container-audit.md
  patterns/
    patterns.json
    <pattern-id>/
      pattern.json
      pattern.css
      pattern.js
      pattern.html
  graphviz/
  scripts/
  assets/
```

各层职责：

- `SKILL.md`：触发规则、工作流和 PyPTOUX project integration。
- `DESIGN.md`：完整 PTO 视觉规范。
- `design-system-preview.html`：人类可读的基础组件和模式预览。
- `tokens/`：PTO token CSS 与生成产物。
- `css/style.css`：可复用 UI class 实现。
- `references/`：quick reference、组件映射、preview gate 和 retrofit audit。
- `patterns/`：approved pattern registry 与 pattern code。
- `graphviz/`、`scripts/`、`assets/`：用于设计系统预览、审计或 pattern 的辅助资源。

同步范围建议：

- 允许同步：tokens 摘要、token CSS、CSS contract、approved pattern specs/code、usage docs、preview gate 规则、稳定截图或缩略图、供人阅读的 preview。
- 默认不同步：上游全量源码、未批准 experimental preview、agent-only prompt / workflow 细节、大量截图或原始设计资产。
- 只在明确有复用价值时同步：组件 wrapper、pattern demo 截图。
- 首次同步 pattern code 时，复制全部当前已注册 approved patterns，并记录本次同步清单、上游/skill source path 和后续维护规则。

### User Decisions Needed

- Batch D 已无阻塞性待确认问题。
- 后续是否在 Batch E 或单独 batch 中补 `06-tools/` sync / audit 脚本，可作为 Batch E rule consolidation 的可选判断。

### Implementation Checklist

- [x] 用户确认本文 Batch D draft plan。
- [x] 检查 PyPTOUX `git status --short`。
- [x] 建立或检查 `pto-design-system` 本地 mirror，并记录 branch / commit / commit date。
- [x] 更新 source registry：`yinyucheng0601/pto-design-system` 的 `status`、`access_mode`、`local_mirror`、freshness policy、claim policy、writeback policy。
- [x] 更新 `.agents/skills/pto-design-system/SKILL.md` 或 references，明确其与 `.agents/skills/pto-design-system/` 的边界、sync source 和 preview gate 同步规则。
- [x] 更新 `.agents/skills/pto-design-system/design-system-preview.html`，保留 human-facing preview。
- [x] 更新 `.agents/skills/pto-design-system/README.md` 和必要的 references，建立稳定 skill bundle IA。
- [x] 首次同步 token CSS 到 `.agents/skills/pto-design-system/tokens/`。
- [x] 首次同步全部当前已注册 approved pattern code 到 `.agents/skills/pto-design-system/patterns/<pattern-id>/`。
- [x] 更新 `.agents/skills/pto-design-system/references/preview-gate.md` 等稳定 references。
- [x] 本轮不落地同步脚本；只写 source sync 规则和 change report template。
- [x] 按需更新 `09-docs/03-indexes/designsystem.md` 或 `content-map.md`。
- [x] 更新 `sources-to-refresh.md`、`open-questions.md`、`status.md`、`decisions.md`、`prompts/resume.md`。
- [x] 确认未启动具体 demo build、未无确认全量复制上游、未覆盖未提交工作树。
