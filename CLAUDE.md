# PyPTOUX CLAUDE

## 1. 文件定位

`CLAUDE.md` 是 Claude 在 `PyPTOUX` 仓库中的默认入口。

- 项目级总规则以 `AGENTS.md` 为准。
- 双 Agent 协作边界、owner 例外、review 交接、数据分层和 share-safe 要求的 canonical source 是 `10-docs/01-conventions/dual-agent-collaboration.md`。
- 本文件只保留 Claude 侧需要直接执行的默认规则。

## 2. Claude 的角色

Claude 在本仓库默认负责：

- 单文件原型实现
- `app/` 阶段的页面、组件、状态与前端交互实现
- 视觉与交互迭代
- 工作台前端整合
- 原型自测
- `prompts/`、`notes/`、`snapshots/` 记录
- `07-designsystem/02-components/ui/` 的 UI 实现

## 3. 默认必读上下文

### 3.1 常驻必读

- `AGENTS.md`
- 当前任务对应的 `04-uxdesign/<topic>/prd.md` 或 interaction-spec
- 当前任务对应的 `05-prototypes/<topic>/notes/sample-data.md`
- 做前端原型、PTO 风格页面或视觉改造时，先读 `.agents/skills/pto-design-system/SKILL.md`

### 3.2 按需补读

- `.agents/skills/pto-design-system/DESIGN.md`
- `.agents/skills/pto-design-system/references/quick-reference.md`
- `.agents/skills/pto-design-system/references/pto-design-system-map.md`
- `.agents/skills/pto-design-system/design-system-preview.html`
- `.agents/skills/pto-design-system/patterns/`
- `10-docs/01-conventions/dual-agent-collaboration.md`
- `10-docs/01-conventions/content-routing.md`
- `07-designsystem/03-guidance/`
- `07-designsystem/01-foundations/`
- 当前课题已有的 `notes/review-YYYY-MM-DD.md`
- 用户明确指定的参考图、历史原型、外部设计参考

## 4. 默认写入范围与边界

### 4.1 默认主要写入

- `05-prototypes/<topic>/experiments/`
- `05-prototypes/<topic>/prompts/`
- `05-prototypes/<topic>/notes/`
- `05-prototypes/<topic>/snapshots/`
- `05-prototypes/<topic>/app/src/`
- `07-designsystem/02-components/ui/`

例外：

- `05-prototypes/<topic>/notes/sample-data.md` 是 Codex + Claude 共享文件。Claude 可以按 demo 叙事、交互表达和用户反馈调整样例组织、字段呈现和故事线；影响业务事实、字段结构、L2 推导或外发可信度时，必须标记 `needs-codex-review` 并请 Codex 复核。

### 4.2 默认只读不写

- `02-knowledge/`
- `03-insights/`
- `04-uxdesign/`
- `10-docs/`

补充：

- `02-knowledge/**/prompts/`、`03-insights/**/prompts/`、`04-uxdesign/**/prompts/` 和对应 `notes/` 是 Codex 记录正式输出更新过程的目录，Claude 默认只读不写。

### 4.3 `app/` 边界

- `app/src/**` 归 Claude。
- `app/` 下除 `src/` 外的工程、配置与说明文件默认归 Codex。

## 5. 原型实现与分享规则

- 不默认继承历史 `experiments/` demo 的视觉、布局、交互。
- 默认优先继承 `.agents/skills/pto-design-system/` 的 tokens、class、preview 和 patterns。
- 默认继承 `07-designsystem/01-foundations/` 的 tokens 与 `07-designsystem/03-guidance/` 的 guidance。
- 若 `.agents/skills/pto-design-system/` 与 `07-designsystem/` 出现差异，以当前任务明确指定者为准；未指定时先采用 `pto-design-system`，并在 `notes/` 中标记需要 Codex 同步的设计系统差异。
- 风格不明确时：提出 2–3 个方向，不自由发挥。
- `share-safe`：不依赖运行时远程资源，可稳定外发。
- 构建时固化资源可以；运行时远程依赖不行。
- `exploration-only`：仅用于内部探索，不稳定外发。
- `share-safe` 需要 Codex 按数据真实性、边界与结构通过，同时需要 Claude 按前端呈现质量通过。
- `share-safe` 如果使用 `L2`，必须在原型可见位置标明 `Data level: L2 synthetic / inferred`、来源摘要和生成规则摘要。
- 使用 `L3` 或仍带 `needs-codex-review` 的 sample-data 时，不得标记为 `share-safe`。
- Claude 不单方面声明外发就绪。

## 6. 数据规则

- 优先使用 `L1`。
- `L1` 不足时，使用 Codex 提供的 `L2`。
- Claude 可以调整 `notes/sample-data.md` 的 demo 叙事和样例呈现，但不自行把未复核改动升级成可外发 `L2`。
- `L3` 仅用于早期布局探索，不外发。
- Claude 不自行把 `L3` 升级成 `L2`。
- 不改写上游 literal（字段名、文件名、trace key 等）。

缺数据时的默认动作：

- 先看 `notes/sample-data.md`。
- 数据仍不足时，请 Codex 补 `L1` 或 `L2`。
- 只有在早期探索阶段才允许临时使用 `L3`。

使用 `L3` 时必须同时满足：

- 在原型文件顶部或相邻说明中标记 `L3-placeholder`。
- 在 `notes/` 中登记待替换项。
- 当前原型归类为 `exploration-only`。

## 7. 与 Codex 的协作方式

- Codex 提供路径、PRD、sample-data、结构与事实边界。
- Claude 负责前端落盘。
- Codex 对 Claude owner 文件以建议为主。
- Codex 的建议默认写入 `05-prototypes/<topic>/notes/review-YYYY-MM-DD.md` 或 PR comment。
- Claude 对 Codex owner 文件的澄清请求与修订建议，默认写入 `05-prototypes/<topic>/notes/review-YYYY-MM-DD.md`，或在对话 / PR 中明确列出。
- Claude 不直接在 `04-uxdesign/<topic>/notes/` 新建 review 草稿；Codex 接收后如需升格，会在 `04-uxdesign/<topic>/notes/` 写 decision / clarification 记录。
- 出现跨边界争议时：先看 owner，再看决策 owner；仍无法收敛时由用户仲裁。
- 未提交工作树锁全局适用：即使路径属于 Claude 默认写入范围，也不要覆盖别人尚未 commit / merge 的改动。

## 8. 写完一个原型后的固定动作

- 自测界面与交互。
- 更新 `prompts/`。
- 更新 `notes/`。
- 必要时补 `snapshots/`。
- 主动请 Codex 做事实与结构 review。
- Codex 的问题清单默认落在 `notes/review-YYYY-MM-DD.md` 或 PR comment。
- 不自行更新 `10-docs/03-indexes/`。

## 9. 不确定时的默认处理

- 路径不确定时：请 Codex 先判定。
- 数据真实性不确定时：请 Codex 查证或补数据。
- PRD 不清晰时：在 `notes/` 中标记待澄清。
- 不改写非自己 owner 的正文目录。

## 10. 规则来源

- `AGENTS.md`
- `10-docs/01-conventions/dual-agent-collaboration.md`
- `10-docs/01-conventions/content-routing.md`
