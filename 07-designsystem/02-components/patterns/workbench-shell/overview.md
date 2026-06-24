# Workbench Split Kernel

- Pattern ID: `workbench-shell`
- Type: `hybrid`
- Registry path: `patterns/workbench-shell/pattern.json`
- Preview: `patterns/workbench-shell/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Low-level PTO split and resize kernel for horizontal, vertical, and nested panes. It owns gutter DOM, hover/focus/drag state, min sizes, default sizes, localStorage persistence, resize callbacks, keyboard resize, and destroy lifecycle. Pane sizes are ratio weights over the space left after fixed gutters, so gutters do not push the final pane outside the split frame. It does not own page chrome, IDE visuals, pane fills, pane header typography, topbars, titles, badges, canvas controls, or fixed preview heights.

## Source Files

- Preview HTML: patterns/workbench-shell/pattern.html
- CSS: patterns/workbench-shell/pattern.css
- Runtime: patterns/workbench-shell/pattern.js
- Third-party: none

## Use When

- adding draggable split panes to a PTO page or pattern
- sharing min-size, persisted size, and gutter behavior across horizontal and vertical layouts
- supporting nested split regions without copying pointer or keyboard resize code

## Required APIs

- window.PtoWorkbenchShell.initResizablePanes(options)
- window.PtoWorkbenchShell.createSplitGutter(index, direction, options)
- window.PtoWorkbenchShell.initNestedResizablePanes(options)

## Allowed Overrides

- pane selectors, direction, initial ratio sizes, min sizes, storage key, gutter size, callbacks, and keyboard resize step
- outer product layout and all pane content
- custom gutter class only when the product pattern documents the alternative

## Forbidden Overrides

- putting page background, topbar, brand, title, subtitle, badge, pane background, pane header typography, or canvas controls back into workbench-shell
- overriding .pto-workbench-shell__split-gutter internals from higher-level patterns
- reimplementing pointer drag, keyboard resize, persisted sizes, or destroy lifecycle locally

## Reuse Rule

Read this JSON first. Use workbench-shell only as a resize kernel. For IDE-style pages, load ide-frame and let it provide the visual shell while calling PtoWorkbenchShell.initResizablePanes for split behavior. Do not use workbench-shell as a product chrome or pane styling system.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
