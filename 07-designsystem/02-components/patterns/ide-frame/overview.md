# PTO IDE Frame

- Pattern ID: `ide-frame`
- Type: `hybrid`
- Registry path: `patterns/ide-frame/pattern.json`
- Preview: `patterns/ide-frame/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Upper-level PTO IDE framework shell for standalone pages and VS Code webviews. It owns IDE chrome, a 4:3 host window ratio, a page background one gray step lighter than the window, darker pane/content wells, dense pane typography, utility window controls, optional activity rail, pane-local preview tabs, domain toolbars, status strips, preview surfaces, renderer slots, inspector docks, optional floating playback mounting, and split initialization. Standalone explorer defaults to a 300px initial width when the host width is known. Top chrome is transparent over the IDE window, does not draw divider borders, and does not include macOS traffic-light controls. Product pages provide all domain content. It delegates resize behavior to workbench-shell and playback chrome to floating-playback-control.

## Source Files

- Preview HTML: patterns/ide-frame/pattern.html
- CSS: patterns/ide-frame/pattern.css
- Runtime: patterns/ide-frame/pattern.js
- Host adapter: patterns/ide-frame/vscode.css
- Third-party: none

## Required APIs

- window.PtoIdeFrame.init(root, options)
- window.PtoIdeFrame.initAll()

## Allowed Overrides

- host mode through data-host="standalone" or data-host="vscode-webview"
- hiding the standalone activity rail through hidden, data-activity-rail="hidden", or data-hide-activity-rail="true"
- host window width while preserving the default 4:3 frame ratio
- initial pane pixel sizing through data-pixel-sizes, with the standalone explorer defaulting to 300px
- IDE semantic tokens such as --ide-frame-page-bg, --ide-frame-bg, --ide-frame-chrome-bg, --ide-frame-pane-bg, --ide-frame-pane-border, --ide-frame-header-height, --ide-frame-title-font, and --ide-frame-meta-font
- pane content, renderer implementations, inspector content, floating playback state, and command bindings

## Forbidden Overrides

- overriding .pto-workbench-shell__* internal styles from ide-frame
- adding standalone topbar or preview tabstrip background fills and divider borders
- embedding a private design-system copy, local upload assets, remote framework runtimes, transpiler runtimes, or one-off theme files
- showing fake VS Code explorer, editor tabs, global status bar, search, git, terminal, settings, notifications, or progress in data-host="vscode-webview" mode
- shipping business sample data, file names, kernel names, graph node data, timeline lanes, trace data, inspector values, placeholder tab names, placeholder code rows, or default textual slot content inside ide-frame
- recreating playback footer, scrubber, collapse state, or playback shell chrome in ide-frame-local CSS instead of floating-playback-control
- editing source code in the webview; use optional read-only slots and route real edits to the VS Code editor

## Reuse Rule

Use ide-frame for IDE-like PTO pages as a framework shell only. Load root design-system tokens, workbench-shell, and floating-playback-control; set data-host for standalone or vscode-webview, declare data-ide-split, data-ide-pane, and optional data-ide-floating-playback slots, and initialize PtoIdeFrame. Keep the shared pattern clean: put all tabs, titles, file trees, code previews, charts, inspector copy, and domain placeholders in the consuming page. Do not style workbench-shell internals; it is only the resize kernel. Do not recreate playback chrome; call PtoFloatingPlaybackControl.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
