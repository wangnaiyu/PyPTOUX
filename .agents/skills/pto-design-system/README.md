# PTO 设计系统 Skill

这是 `PyPTOUX` 项目内的 PTO 前端设计系统 skill，canonical 位置为：

`.agents/skills/pto-design-system/`

它用于让 Codex、Claude 或其他前端 agent 在生成/改造原型时复用同一套 PTO 视觉语言，而不是各自发明按钮、面板、卡片、badge、spacing 或 graph/workbench pattern。

## 何时使用

- 新建 `05-prototypes/` 下的 HTML / JSX / app 前端页面
- 把已有 demo 迁移到 PTO 风格
- 做 graph、swimlane、memory architecture、workbench shell 等布局密集型原型
- 判断一个新视觉模式是否需要先走 preview gate，再沉淀进共享系统

## Agent 读取顺序

1. `SKILL.md`：触发规则和 Workflow A/B
2. `DESIGN.md`：完整视觉规范
3. `references/quick-reference.md`：token 与 class 速查
4. `references/pto-design-system-map.md`：元素到 PTO 组件的映射
5. `design-system-preview.html`：视觉目标预览
6. `tokens/*.css` 与 `css/style.css`：真实实现
7. `patterns/`：graph / swimlane / memory / workbench 等可复用模式

## 项目入口

- Codex：见项目根目录 `AGENTS.md` 的 `pto-design-system` skill 索引。
- Claude：见项目根目录 `CLAUDE.md` 的默认必读/按需补读规则；`.claude/skills/pto-design-system` 是指向本目录的项目内桥接入口。
- 设计系统索引：见 `10-docs/03-indexes/designsystem.md`。

## 使用原则

- 默认复用既有 PTO token、class 和 pattern。
- 不在业务模块里私自新增按钮、toggle、badge、card、panel 或 spacing scale。
- module-local layout class 可以新增；新的共享视觉语言必须先走 `references/preview-gate.md`。
- 需要真实 PyPTO 数据或 demo 素材时，组合使用 `.agents/skills/pypto-demo-data-filling/SKILL.md`。
