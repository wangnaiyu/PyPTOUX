# Token Projection

本目录保存 PTO token CSS 的稳定投影，供人类审阅和 demo 接入。

## Source

- Upstream: `yinyucheng0601/pto-design-system`
- Snapshot: `main` / `e26a85628658fa2894aba52e95e335cf60f8dfdc`
- Agent-facing source: `.agents/skills/pto-design-system/tokens/`

## Files

- `foundation.css`：基础色阶、字体、间距、圆角、阴影、z-index、motion 和高亮色阶。
- `semantic.css`：dark / glass / light theme 下的语义 token。
- `components.css`：toolbar、button、input、panel、card、table、badge、segmented control 等组件级 token。

## Rules

- 不手改本目录 CSS；上游或 agent-facing skill 更新后，通过同步流程投影。
- demo 中优先使用语义 token，如 `--background`、`--surface-2`、`--foreground-secondary`、`--primary`。
- 数据可视化颜色可以有 module-local exception，但 UI surface、边框、按钮、文字、spacing 和 radius 默认使用 token。
