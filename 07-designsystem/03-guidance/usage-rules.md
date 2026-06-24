# Usage Rules

## Primary Entry

Agent 写页面或改造 demo 时先读：

- `.agents/skills/pto-design-system/SKILL.md`

人类审阅稳定投影时读：

- `07-designsystem/index.html`
- `07-designsystem/README.md`

## Build Rules

- 新建 PyPTOUX prototype 时，先列出页面需要的 UI pieces，再映射到 PTO tokens、classes 和 patterns。
- IDE / workbench / graph / timeline / architecture / playback 类页面，优先读 `02-components/patterns/patterns.json` 和匹配 pattern 的 `pattern.json`。
- Buttons 使用 `.btn`、`.btn-solid`、`.btn-ghost`、`.btn-icon` 等稳定 class。
- Panels、cards、badges、tabs、segmented controls 优先使用 `02-components/ui/style.css` 中的 class。
- 颜色、字体、spacing、radius 默认来自 `01-foundations/tokens/`。

## Retrofit Rules

- 改造旧 demo 时必须检查旧容器装饰残留。
- 删除旧的 full border、left rail、accent bar、inset highlight、side gradient 和伪元素装饰，除非它们表达真实数据含义或 approved selected state。
- 不能只把旧装饰颜色 token 化后继续保留。

## Exception Rules

- 数据可视化颜色可以保留 module-local palette，但必须说明数据含义。
- module-local layout class 可以新增。
- 新共享视觉语言必须先走 `preview-gate.md`。
