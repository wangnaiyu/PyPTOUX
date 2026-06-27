# PTO 设计系统 Skill

这是 `PyPTOUX` 项目内的 PTO 前端设计系统 skill，canonical 位置为：

`.agents/skills/pto-design-system/`

它用于让 Codex、Claude 或其他前端 agent 在生成/改造原型时复用同一套 PTO 视觉语言，而不是各自发明按钮、面板、卡片、badge、spacing 或 graph/workbench pattern。

## 何时使用

- 新建 `05-prototypes/` 下的 HTML / JSX / app 前端页面
- 把已有 demo 迁移到 PTO 风格
- 做 graph、swimlane、memory architecture、workbench shell 等布局密集型原型
- 判断一个新视觉模式是否需要先走 preview gate，再沉淀进共享系统

## 何时不要使用

- 生成报告、研究简报、知识库文档、UX 分析文档或 `final-report.md`
- 生成以阅读为主的 `.md` / `.html` / `.docx` / `.pptx` / PDF 等报告类内容
- 仅在报告正文中描述、评审或引用 PTO 设计系统，而没有要求设计或实现 PTO 风格 UI / demo / prototype

报告类内容无论是什么文件格式，默认使用执行 agent 原生效果：Codex 用 Codex 原生效果，Claude 用 Claude 原生效果，其他 agent 同理；不套用 PTO design system。

## Agent 读取顺序

1. `SKILL.md`：触发规则和 Workflow A/B/C
2. `DESIGN.md`：完整视觉规范
3. `references/quick-reference.md`：token 与 class 速查
4. `references/pto-design-system-map.md`：元素到 PTO 组件的映射
5. `references/retrofit-container-audit.md`：旧 demo 改造时的容器装饰残留检查
6. `patterns/patterns.json`：IDE / workbench / graph / timeline / architecture / playback pattern 注册表
7. `design-system-preview.html`：基础组件辅助预览；完整页面优先看 `patterns/`
8. `tokens/*.css` 与 `css/style.css`：真实实现
9. `patterns/<pattern-id>/pattern.json`：graph / swimlane / memory / workbench 等可复用模式的复用契约

## 项目入口

- Codex：见项目根目录 `AGENTS.md` 的 `pto-design-system` skill 索引。
- Claude：见项目根目录 `CLAUDE.md` 的默认必读/按需补读规则；`.claude/skills/pto-design-system` 是指向本目录的项目内桥接入口。
- 人类可读预览入口：见 `.agents/skills/pto-design-system/design-system-preview.html`。
- 设计系统索引：见 `09-docs/03-indexes/designsystem.md`。

## 使用原则

- 默认复用既有 PTO token、class 和 pattern。
- 不在业务模块里私自新增按钮、toggle、badge、card、panel 或 spacing scale。
- module-local layout class 可以新增；新的共享视觉语言必须先走 `references/preview-gate.md`。
- IDE / graph / swimlane / memory architecture / playback 类页面优先匹配 `patterns/`，不要只用基础组件临摹截图。
- 改造旧 demo 时必须执行 `references/retrofit-container-audit.md`，删除旧卡片/面板的私有边框、左侧 rail、伪元素高亮和 inset shadow。
- 需要真实 PyPTO 数据或 demo 素材时，组合使用 `.agents/skills/pypto-demo-data-filling/SKILL.md`。
