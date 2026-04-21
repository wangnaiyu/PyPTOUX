# Design System

`07-designsystem/` 是 PyPTOUX 的仓库级设计系统，用来统一所有 demo 的视觉基线，并逐步沉淀为可复用的设计规范与 UI 基础。

## Structure

- `01-foundations/`：颜色、字体、间距、动效等基础 token
- `02-components/specs/`：组件规范
- `02-components/patterns/`：交互和布局模式
- `02-components/ui/`：可被 demo 直接复用的代码层基础件
- `03-guidance/`：原则、语气、使用约束
- `04-assets/`：共用视觉资源

## Usage

- 新 demo 默认从这里获取视觉起点
- 早期实验可偏离，但建议记录原因
- 进入 `app/` 的原型优先接入这里的 tokens / ui / patterns
