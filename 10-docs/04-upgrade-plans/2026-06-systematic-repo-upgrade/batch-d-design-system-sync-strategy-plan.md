# Batch D Design System Sync Strategy Plan

本文用于承载 Batch D 在执行前确认的方案、边界和完成标准。它不是最终设计系统规则；确认后的稳定结论需要回写到 `.agents/skills/pto-design-system/`、`07-designsystem/`、source registry、任务包状态文件，以及后续需要的正式目录。

## 1. Purpose

Batch D 的目标是建立 `yinyucheng0601/pto-design-system` 与 PyPTOUX 当前 `.agents/skills/pto-design-system`、`07-designsystem/` 之间的上游同步和本仓库投影方式。

## 2. Workflow Gate

Batch D 分三段推进：

1. Preflight 讨论阶段：确认上游 mirror / 手动 copy / 脚本同步方式、权限、投影范围和更新频率。
2. Plan 确认阶段：审计当前 `.agents/skills/pto-design-system/`、`07-designsystem/` 和相关 prototype 使用方式，制定同步与投影方案。
3. `/goal` 执行阶段：按确认后的 Definition of Done 更新正式文件和 checkpoint。

在本文尚未形成确认方案前，不应 clone / fetch / mirror `yinyucheng0601/pto-design-system`，不投影 `07-designsystem/`，不重写 PTO skill，不启动原型视觉改造。

## 3. Scope

Batch D 覆盖：

- 确认 `yinyucheng0601/pto-design-system` 的同步方式。
- 设计手动触发的拉取、对比、变更报告流程。
- 明确 `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界。
- 判断哪些内容应投影进 `07-designsystem/`。
- 更新 `pto-design-system` skill 与 design system 索引。

## 4. Non-Goals

Batch D 不做：

- 不重开 Batch C 的 Toolkit / PyPTO data source 边界。
- 不构建具体 demo 或 prototype 页面，除非用户在 Batch D 之后另起任务。
- 不无确认地覆盖 `.agents/skills/pto-design-system/` 或 `07-designsystem/` 现有内容。
- 不把上游仓库全量盲目复制进 PyPTOUX。

## 5. Preflight Questions

开始 Batch D 前必须先确认：

- `yinyucheng0601/pto-design-system` 是否允许 clone 到本地 mirror？如果允许，本地 mirror 放在哪里？
- 希望采用手动触发脚本、人工 copy，还是维护上游镜像？
- `07-designsystem/` 是否只承载稳定投影，不承载 agent-facing preview 和实验 pattern？
- `.agents/skills/pto-design-system` 是否继续作为 agent 使用的主入口？
- 哪些内容允许投影进 `07-designsystem/`：tokens、CSS、patterns、docs、preview、screenshots、changelog？
- 设计系统同步是否需要生成 diff / change report？

## 6. Plan-Mode Deliverables

Plan 确认阶段需要产出以下内容，并写入本文：

- 当前 PTO design system source audit 结论。
- 上游 mirror / copy / script 策略。
- `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界。
- `07-designsystem/` 投影信息架构。
- 变更报告和同步 checklist。
- source registry 和 `sources-to-refresh.md` 更新规则。
- 需要用户判断的问题。
- `/goal` 执行 checklist。

## 7. Definition Of Done

Batch D 完成时，必须同时满足：

- 本文已经包含经用户确认的 Batch D 方案。
- `yinyucheng0601/pto-design-system` 的 source 状态、access mode、claim policy、writeback policy 已明确。
- `.agents/skills/pto-design-system` 与 `07-designsystem/` 的边界已写清楚。
- 如需投影，`07-designsystem/` 已按确认方案更新；如不投影，已说明 no-write 原因。
- source registry、`sources-to-refresh.md`、`open-questions.md`、`status.md`、`prompts/resume.md` 已按 checkpoint 更新。
- 未越过 Batch D 边界：未开始具体 demo build，未无确认地全量复制上游设计系统，未覆盖未提交工作树。

## 8. Confirmed Design

状态：

- `batch_status`: `complete`
- `plan_status`: `executed`

本节记录 2026-06-24 Batch D preflight 后形成并执行的方案。用户已整体同意 mirror + 手动同步 + diff / change report 策略，允许 `/goal` 阶段实际 clone 上游到推荐 mirror path；本轮不落地同步脚本。Batch D 执行顺序已完成：先 clone / inspect 上游设计系统，再系统性更新 `.agents/skills/pto-design-system`，最后投影 `07-designsystem/`。

### Audit Findings

- 当前 `.agents/skills/pto-design-system/` 已是 agent-facing bundle，包含 `SKILL.md`、`DESIGN.md`、`tokens/`、`css/style.css`、`patterns/`、`graphviz/`、`design-system-preview.html` 和 preview gate 规则。
- 当前 skill 明确要求 agent 在新建或改造 PyPTOUX 前端原型、PTO 风格页面、graph/workbench UI 时先复用现有 tokens、classes、patterns 和 preview，不得私造按钮、toggle、badge、card、panel 或视觉语言。
- `DESIGN.md` 已把 implementation token source of truth 定为 `tokens/foundation.css`、`tokens/semantic.css`、`tokens/components.css`；`tokens/tokens.js`、`tokens/tokens.json` 如存在，应由 CSS source 生成，不手改。
- `references/preview-gate.md` 已规定缺失样式先建 preview、显式批准后先吸收到 shared system，再给模块使用；`07-designsystem/` 只在 pattern 成为长期产品设计系统后承接相关指导或组件区域。
- 当前 `07-designsystem/` 是稳定目录骨架，已有 `01-foundations/`、`02-components/`、`03-guidance/`、`04-assets/` 和 README，但大多还是 `.gitkeep` 或占位文档，尚未系统承接 PTO skill 中成熟的 tokens / patterns / usage rules。
- Source registry 里 `yinyucheng0601/pto-design-system` 当前是 `candidate-active` / `mirror-candidate`，`access_mode` 为 `online`, `manifest`；Batch D 需要决定 mirror、同步和 `07-designsystem/` 投影策略。

### Source Strategy

- 允许 clone `https://github.com/yinyucheng0601/pto-design-system` 到本地 mirror。
- 推荐 mirror path：`/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`。
- 同步方式采用“本地 mirror + 手动触发 sync / audit 脚本 + change report”，不做后台自动同步，也不依赖人工 copy 作为唯一机制。
- Batch D `/goal` 执行顺序：
  1. 先 clone / inspect 上游 `yinyucheng0601/pto-design-system` 本地 mirror，生成 upstream snapshot 与初始 diff / audit 结论。
  2. 再基于上游证据系统性更新 `.agents/skills/pto-design-system`（仅在确有差异或需要吸收上游稳定内容时更新）。
  3. 最后从已确认的 agent-facing skill / upstream audit 结果投影 `07-designsystem/`。
- 每次同步前检查 PyPTOUX 工作树和上游 mirror 状态；mirror 有本地改动时暂停并汇报，不直接覆盖。
- 每次同步生成 diff / change report，至少记录：
  - upstream remote、branch、commit、commit date；
  - upstream changed files / changed areas；
  - 影响 PyPTOUX 的 tokens、CSS、patterns、docs、preview、assets；
  - 是否需要更新 `.agents/skills/pto-design-system`；
  - 是否需要投影到 `07-designsystem/`；
  - 是否触发 preview gate；
  - 是否存在不投影或延后处理的变更。
- source registry 中应把 `yinyucheng0601/pto-design-system` 从 `mirror-candidate` 更新为确认的 `local-mirror` 策略；实际 clone 后再记录 snapshot。

### Design System Boundaries

`.agents/skills/pto-design-system/` 继续作为 agent-facing 主入口：

- 存放可执行 tokens、CSS、patterns、preview、agent workflow 和 migration rules。
- 面向 Codex / Claude / frontend agent，回答“写页面时怎么直接用”的问题。
- 可以保留 experimental preview、agent-facing component preview、pattern source files 和执行用 reference。
- 是新 prototype / retrofit 的默认读取入口。

`07-designsystem/` 作为 stable human-facing projection：

- 存放长期稳定、跨 demo 可复用、适合人类审阅和项目索引的设计系统说明。
- 面向项目 owner、设计协作者和后续 agent 的高层定位，回答“这个仓库级设计系统承诺什么、哪些内容已经稳定”的问题。
- 不承载上游仓库全量 mirror。
- 不承载 agent-facing preview 和实验 pattern。
- 不复制 `.agents/skills/pto-design-system/` 的所有代码；只投影稳定 contract、usage rule、approved pattern spec、changelog 和必要资产摘要。
- 如果某个 pattern 仍处于 preview gate 或实验状态，只在 task plan / skill preview 中记录；批准并稳定后再投影到 `07-designsystem/`。

### Projection Structure

建议沿用现有 `07-designsystem/` 四层骨架，同时增加一个供人阅读的静态 HTML 入口。`07-designsystem/index.html` 是 human-facing portal；Markdown 和投影源码仍保留，作为可搜索、可 diff、可审计的规范与 implementation contract。

```text
07-designsystem/
  index.html
  README.md
  styles/
    design-system-docs.css
  01-foundations/
    tokens/
      overview.md
      foundation.css
      semantic.css
      components.css
    color/overview.md
    typography/overview.md
    spacing/overview.md
    themes/overview.md
    motion/overview.md
  02-components/
    specs/overview.md
    ui/overview.md
    patterns/
      overview.md
      <pattern-id>/
        overview.md
        pattern.json
        pattern.css
        pattern.js
        pattern.html
  03-guidance/
    principles.md
    usage-rules.md
    preview-gate.md
    source-sync.md
    change-report-template.md
    voice-and-tone.md
  04-assets/
    README.md
    screenshots/
      README.md
  changelog.md
```

各层职责：

- `index.html`：静态、可直接打开的视觉门户，用 PTO tokens 呈现 palette、typography、spacing、components、approved patterns、preview gate 和 source sync 状态。它面向人类阅读，不替代 agent-facing preview。
- `styles/design-system-docs.css`：仅服务 `index.html` 的文档页布局，必须复用投影后的 token CSS，不创建新的产品 UI 视觉语言。
- `README.md`：说明 `07-designsystem/` 是稳定投影层，并链接 `.agents/skills/pto-design-system` 作为 agent-facing implementation bundle。
- `01-foundations/`：承接稳定 token contract。首次投影复制 `foundation.css`、`semantic.css`、`components.css`，并在 `overview.md` 说明 token role、source path、更新时间、投影范围和禁止手改规则。
- `02-components/specs/`：承接通用 component spec，如 button、tabs、panel-shell、badge、input 的稳定行为与使用边界。
- `02-components/ui/`：只放可被 demo 直接复用、且已经稳定的代码层基础件索引或 wrapper 说明；不放实验 UI。
- `02-components/patterns/`：承接 approved reusable pattern specs 和必要 pattern code，例如 `swimlane-task-bar`、`memory-architecture-layout`、`pass-ir-graph-node`、`model-graphviz`、`workbench-shell`；每个 `<pattern-id>/overview.md` 记录 source file、适用场景、allowed overrides、forbidden overrides、preview / adoption 状态，`pattern.*` 文件作为稳定投影代码。
- `03-guidance/principles.md`：从 PTO `DESIGN.md` 投影稳定原则，如 dark-first developer workstation、traceability、evidence visibility、state clarity。
- `03-guidance/usage-rules.md`：记录 demo 接入规则、例外策略、禁止私造视觉系统、preview gate 入口。
- `03-guidance/preview-gate.md`：投影 preview gate 的稳定版本，说明何时必须先建 preview、何时才能进入 `07-designsystem/`。
- `03-guidance/source-sync.md`：记录上游 `yinyucheng0601/pto-design-system`、本地 mirror、同步触发、change report、投影规则。
- `03-guidance/change-report-template.md`：提供每次同步的报告模板。
- `04-assets/`：只放允许入仓的稳定截图、缩略图或说明资产；不放上游原始大文件或实验导出。
- `changelog.md`：记录 PyPTOUX 设计系统投影层变更，不替代每次 sync 的详细 change report。

HTML 呈现方式：

- `index.html` 做成单页导航，顶部展示 source snapshot、投影版本、last sync、preview gate 状态。
- 页面主体建议分为 `Foundations`、`Components`、`Patterns`、`Usage Rules`、`Sync & Changelog` 五个 section。
- `Foundations` 用真实 token CSS 渲染色板、字号、间距、radius，而不是截图。
- `Components` 展示 button、tab、panel、badge、input 的小型 live samples，样式来自投影 CSS。
- `Patterns` 对 approved pattern 使用嵌入式 preview 容器或轻量 sample，引用 `02-components/patterns/<pattern-id>/pattern.*`。
- `Usage Rules` 用可扫描的 rule cards 呈现禁止项、例外策略和 preview gate。
- `Sync & Changelog` 链接 `source-sync.md`、`change-report-template.md`、`changelog.md`，并展示最近一次 upstream snapshot。
- HTML 必须是静态可打开文件；本轮不引入构建系统。

投影范围建议：

- 允许投影：tokens 摘要、token CSS、CSS contract、approved pattern specs、approved pattern code、usage docs、preview gate 规则、sync/change report 规则、稳定截图或缩略图、changelog、供人阅读的 `index.html`。
- 默认不投影：上游全量源码、实验 preview、未批准 pattern、agent-only prompt / workflow 细节、大量截图或原始设计资产。
- 只在明确有复用价值时投影：组件 wrapper、pattern demo 截图。
- 首次投影 pattern code 时，复制全部当前已注册 approved patterns，并在 `changelog.md` / `source-sync.md` 记录本次投影清单、上游/skill source path 和后续维护规则。

### User Decisions Needed

- Batch D 已无阻塞性待确认问题。
- 后续是否在 Batch E 或单独 batch 中补 `06-tools/` sync / audit 脚本，可作为 Batch E rule consolidation 的可选判断。

### Implementation Checklist

- [x] 用户确认本文 Batch D draft plan。
- [x] 检查 PyPTOUX `git status --short`。
- [x] 建立或检查 `pto-design-system` 本地 mirror，并记录 branch / commit / commit date。
- [x] 更新 source registry：`yinyucheng0601/pto-design-system` 的 `status`、`access_mode`、`local_mirror`、freshness policy、claim policy、writeback policy。
- [x] 更新 `.agents/skills/pto-design-system/SKILL.md` 或 references，明确其与 `07-designsystem/` 的边界、sync source 和 preview gate 投影规则。
- [x] 新增 `07-designsystem/index.html` 和 `styles/design-system-docs.css`，建立 human-facing portal。
- [x] 更新 `07-designsystem/README.md` 和必要的 `overview.md` / guidance 文件，建立稳定投影 IA。
- [x] 首次投影复制 token CSS 到 `07-designsystem/01-foundations/tokens/`。
- [x] 首次投影复制全部当前已注册 approved pattern code 到 `07-designsystem/02-components/patterns/<pattern-id>/`。
- [x] 新增或更新 `07-designsystem/03-guidance/source-sync.md`、`change-report-template.md`、`preview-gate.md` 和 `changelog.md`。
- [x] 本轮不落地同步脚本；只写 source sync 规则和 change report template。
- [x] 按需更新 `10-docs/03-indexes/designsystem.md` 或 `content-map.md`。
- [x] 更新 `sources-to-refresh.md`、`open-questions.md`、`status.md`、`decisions.md`、`prompts/resume.md`。
- [x] 确认未启动具体 demo build、未无确认全量复制上游、未覆盖未提交工作树。
