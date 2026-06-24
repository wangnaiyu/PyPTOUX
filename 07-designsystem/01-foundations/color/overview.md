# Color

PTO 是 dark-first developer workstation 视觉系统。颜色分为两层：

- 基础色阶：见 `../tokens/foundation.css`
- 语义色：见 `../tokens/semantic.css`

## Core Roles

- `--background`：页面底色
- `--background-elevated`：导航或上层容器底色
- `--surface-1` / `--surface-2` / `--surface-3` / `--surface-4`：卡片、面板、chip、selected state
- `--foreground` / `--foreground-secondary` / `--foreground-muted`：文本层级
- `--border-subtle` / `--border-default` / `--border-strong`：边界层级
- `--primary`、`--success`、`--warning`、`--danger`：动作与状态

## Rule

中性 surface 承载布局，饱和色只承载动作、状态或数据含义。不要把数据可视化色拿来做通用面板背景。
