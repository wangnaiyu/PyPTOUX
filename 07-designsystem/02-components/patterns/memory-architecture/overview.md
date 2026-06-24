# Memory Architecture Layout

- Pattern ID: `memory-architecture-layout`
- Type: `hybrid`
- Registry path: `patterns/memory-architecture/pattern.json`
- Preview: `patterns/memory-architecture/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Full-stage PTO memory architecture shell for 910B/950 diagrams. It composes the shared AIC/AIV internal renderers, chip-level memory rails, the AIV ND-DMA Cache input path into UB, detail rows including the 950 UB bank mini-grid, an SVG overlay for MTE/CV routes, shared hardware hover tips, path-focus hover highlighting, local buffer block occupancy, and a graph-only pan/zoom viewport for iframe embeds.

## Source Files

- Preview HTML: patterns/memory-architecture/pattern.html
- CSS: patterns/memory-architecture/pattern.css
- Runtime: patterns/memory-architecture/pattern.js

## Use When

- building full-chip memory hierarchy diagrams that sit above AIC/AIV detail views
- showing Global Memory and L2 Cache rails feeding AIV and AIC objects
- illustrating 950-specific direct CV lanes without copying business-page HTML
- showing and hiding the shared detail layer with UB bank rows and mini-grid data
- hovering flow steps or chips to dim unrelated hardware, highlight endpoints, and glow active routes
- embedding large architecture diagrams in iframes or inspector panes with graph-only chrome, a 60% default zoom, initial centering when space allows, drag pan, and Command-wheel zoom

## Required APIs

- window.PtoMemoryArchitecturePattern.renderArchitecture(container, presetOrKey)
- window.PtoMemoryArchitecturePattern.createRouteOverlay(container, presetOrKey) returning { render, update, schedule, destroy }
- window.PtoMemoryArchitecturePattern.attachHoverInteractions(container, presetOrKey, options)
- window.PtoMemoryArchitecturePattern.attachPathFocusInteractions(container, presetOrKey, options)
- window.PtoMemoryArchitecturePattern.setDetailVisibility(container, visible)
- window.PtoMemoryArchitecturePattern.setAivFolded(container, folded)
- window.PtoMemoryArchitecturePattern.setPathFocus(container, presetOrKey, { selectors, routes, errorSelectors })
- window.PtoMemoryArchitecturePattern.clearPathFocus(container)
- window.PtoMemoryArchitecturePattern.setBufferBlocks(root, blocks)
- window.PtoMemoryArchitecturePattern.clearBufferBlocks(root)
- window.PtoMemoryArchitecturePattern.createZoomController({ viewport, sizer, canvas, readout?, outButton?, inButton?, resetButton?, defaultZoom, min, max, step, pan, wheelZoom, centerOnReset, centerTarget, onZoom, onPan }) returning { setZoom, setPan, center, zoomAtPoint, reset, destroy }

## Allowed Overrides

- preset rails, core membership, titles, route list, and route labels
- choosing which shared AIC/AIV presets are mounted into each core slot
- hover tip copy and fixed-size viewport scaling through preset hoverTips or attachHoverInteractions options
- flow-step focus payloads through setPathFocus selectors, route ids, and optional errorSelectors
- local on-chip buffer-block occupancy through setBufferBlocks payloads
- iframe/default zoom through createZoomController options, with 0.6 as the shared default for embedded architecture canvases
- optional external zoom buttons; graph-only embeds should rely on drag pan and Command-wheel zoom instead of visible pattern chrome
- direct CV route lane anchors through explicit AIC/AIV node selectors such as data-aiv-node="exec:SIMD"
- container framing outside the pattern root

## Forbidden Overrides

- copying generated AIC/AIV DOM into a new page instead of calling the shared renderers
- hand-tuning route geometry in page-local CSS
- using local product CSS or DOM traversal to recolor AIC/AIV buffer cells
- changing chip-level rail widths, route label treatment, or AIC/AIV internal chrome outside the shared patterns
- anchoring direct CV detour lanes to broad stack containers when a concrete AIC/AIV node can define the lane
- using stroke-width changes for hover or playback focus; use opacity and glow so route thickness remains stable

## Reuse Rule

Read this JSON first. For a new 950-class architecture page, load aic-core-object and aiv-core-object first, then call memory-architecture/pattern.js to mount the full-stage shell. Use attachPathFocusInteractions or setPathFocus/clearPathFocus for flow-step hover like ascend-hardware-map-v3 instead of reimplementing is-path-focused, is-hardware-active, or route glow locally. For iframe or inspector embeds, consume the graph-only pattern surface: wrap the stage with the documented viewport/sizer/canvas classes, call createZoomController with defaultZoom 0.6, pan enabled, Command-wheel zoom enabled, centerTarget set to the visible graph body selectors such as .pto-mem950__rails, .pto-mem950__engine-stack, and .pto-mem950__stack, and call center() once after render when the viewport is wider than the scaled graph. Visible zoom buttons are optional product chrome, not part of the required iframe pattern. Extend presets, route data, and preset engines in pattern.js instead of cloning the rendered DOM. Anchor detour lanes to concrete rendered nodes, not whole core stacks, so route labels stay tied to the visible hardware unit.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
