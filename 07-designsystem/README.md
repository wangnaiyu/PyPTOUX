# PTO Design System Projection

`07-designsystem/` 是 PyPTOUX 的仓库级设计系统稳定投影层，用来给人类审阅、索引和长期维护 PTO 视觉基线。它不是上游 `yinyucheng0601/pto-design-system` 的全量 mirror，也不替代 agent-facing skill。

可执行入口仍是：

- `.agents/skills/pto-design-system/`

可视化阅读入口是：

- `index.html`

## Structure

- `index.html`：静态 HTML portal，展示 tokens、组件样例、approved patterns、preview gate 和同步状态
- `01-foundations/`：颜色、字体、间距、动效、themes 和 token CSS 投影
- `02-components/specs/`：组件规范
- `02-components/patterns/`：全部当前已注册 approved pattern code 与 overview
- `02-components/ui/`：可被 demo 直接复用的稳定 UI class 投影
- `03-guidance/`：原则、语气、使用约束、preview gate 和 source sync 规则
- `04-assets/`：允许入仓的共用视觉资源、截图或缩略图
- `changelog.md`：PyPTOUX 投影层变更记录

## Source

- Upstream: `https://github.com/yinyucheng0601/pto-design-system`
- Local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`
- Snapshot: `main` / `e26a85628658fa2894aba52e95e335cf60f8dfdc` / `2026-06-16T17:35:58+08:00`

## Usage

- 新 demo 默认从 `.agents/skills/pto-design-system/` 获取可执行规则和 pattern contract。
- 人类审阅设计系统边界、投影范围和变更记录时看本目录。
- 进入 `app/` 的原型优先接入这里投影的 tokens / UI / patterns，或者直接复用 `.agents/skills/pto-design-system/` 中的 agent-facing bundle。
- 新共享视觉模式必须先走 `03-guidance/preview-gate.md`，批准后再进入本目录稳定投影。
