# Prototypes

这里用于存放交互 demo，并支持从单文件实验逐步演进为前端子项目。

每个课题目录通常包含：

- `experiments/html/`
- `experiments/jsx/`
- `snapshots/`
- `prompts/`
- `notes/`
- `app/`

## 协作速查

- `experiments/`、`prompts/`、`notes/`、`snapshots/`、`app/src/` 默认由 Claude 主写。
- `app/` 下除 `src/` 外的工程与配置默认由 Codex 主写。
- 详细边界见 `09-docs/01-conventions/dual-agent-collaboration.md`。

## 数据与分享速查

- demo 数据分为 `L1 / L2 / L3`，详细规则见 `AGENTS.md` 与 `09-docs/01-conventions/dual-agent-collaboration.md`。
- 单文件原型：`share-safe / exploration-only`
- `app/` 阶段：`离线分享包 / 内部联调版本`
- 原型更新记录使用 `notes/update-YYYY-MM-DD.md`；用户场景、体验脚本、demo story 使用 `notes/story-YYYY-MM-DD.md`；详细命名规则见 `09-docs/01-conventions/content-routing.md`。

## 推荐流程

- Codex 先准备路径、PRD、sample-data 与事实边界。
- Claude 再实现原型，并更新 `prompts/`、`notes/`、`snapshots/`。
- 原型完成后，请 Codex 做事实与结构 review。
