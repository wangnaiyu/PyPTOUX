# Design System Changelog

## 2026-06-24 Portal Fix

- 修复 `index.html` 无法滚动的问题：docs CSS 覆盖 upstream UI CSS 中的 `body { height: 100vh; overflow: hidden; }` 全局规则。
- 将 `index.html` UI 文案改为中文。
- 扩展 `index.html` 内容结构，对齐 `.agents/skills/pto-design-system/design-system-preview.html` 的信息密度，新增左侧导航、token 栈、基础色板、字体/间距、基础组件、全部 12 个 approved patterns、使用规则和同步治理导览。

## 2026-06-24 Batch D Initial Projection

- Clone upstream `yinyucheng0601/pto-design-system` to local mirror.
- Snapshot: `main` / `e26a85628658fa2894aba52e95e335cf60f8dfdc` / `2026-06-16T17:35:58+08:00`.
- Update agent-facing `.agents/skills/pto-design-system/` from upstream stable bundle.
- Project token CSS into `01-foundations/tokens/`.
- Project UI class CSS into `02-components/ui/style.css`.
- Project all currently registered approved pattern code into `02-components/patterns/`.
- Add static human-facing portal plan via `index.html` and design-system docs guidance.
- Add source sync and change report governance.
