# Hardware Architecture Viewport

- Pattern ID: `hardware-architecture-viewport`
- Type: `hybrid`
- Registry path: `patterns/hardware-architecture-viewport/pattern.json`
- Preview: `patterns/hardware-architecture-viewport/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Shared PTO shell and controller for architecture-map host controls: architecture selection, path filters, detail visibility, compact zoom readout, iframe readiness, size sync, root-level dotted viewport background, transparent fixed-height borderless title toolbar, and hardware postMessage protocol.

## Source Files

- CSS: patterns/hardware-architecture-viewport/pattern.css
- Runtime: patterns/hardware-architecture-viewport/pattern.js

## Use When

- embedding memory-architecture-layout in a product page iframe or inline stage
- providing consistent architecture-map toolbar controls across PTO modules
- coordinating hardware-details, hardware-focus, hardware-ready, and hardware-size messages
- treating detail visibility as a bank-data overlay, not as a compact/base-label toggle
- using the compact detail / zoom-out / readout / zoom-in control cluster for architecture maps
- rendering architecture windows on the shared dark dotted viewport background with no filled title-bar background
- keeping architecture title toolbars transparent, borderless, over the same dotted surface, and at the shared toolbar height

## Required APIs

- window.PtoHardwareArchitectureViewport.mount(root, options)
- window.PtoHardwareArchitectureViewport.closestZoomLevel(levels, value)

## Allowed Overrides

- which optional slots are visible, such as path filters, compare controls, or diff actions
- page-specific architecture list and mapping from architecture id to memory-architecture preset
- page-specific callbacks for focus payloads, inspector synchronization, and business view-mode switching

## Forbidden Overrides

- introducing a new architecture toolbar visual grammar instead of using the pto-hw-viewport classes
- forking zoom/readout/detail behavior without a page-specific state requirement
- using page-local button sizing or toolbar spacing for architecture map controls
- replacing the shared dotted stage background or adding filled title-bar backgrounds or divider borders to architecture windows
- hard-coding page-specific architecture title/header heights instead of using --pto-hw-viewport-toolbar-height
- adding architecture-header metadata chips such as pattern, preset, source, no-iframe, or selected path readouts
- sending custom iframe message names for standard hardware-ready, hardware-size, hardware-details, hardware-focus, or hardware-arch-change events

## Reuse Rule

复用前先读取同目录 `pattern.json`。不得在业务页面中复制或改写 pattern 内部视觉、几何或状态规则；如需扩展，先更新共享 pattern，再由业务页面消费。

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
