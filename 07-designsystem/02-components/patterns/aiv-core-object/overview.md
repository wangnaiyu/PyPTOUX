# AIV Core Object

- Pattern ID: `aiv-core-object`
- Type: `hybrid`
- Registry path: `patterns/aiv-core-object/pattern.json`
- Preview: `patterns/aiv-core-object/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Design-driven AIV internal object pattern with DCache, ICache, ND-DMA Cache, a Scalar bar, a Unified Buffer card, SIMT and SIMD execution cards, and a Vector compute block. Routes follow official Ascend AIV topology notes for shared ICache, shared Vector execution, ND-DMA Cache to Unified Buffer staging, and SIMT DCache flow.

## Source Files

- Preview HTML: patterns/aiv-core-object/pattern.html
- CSS: patterns/aiv-core-object/pattern.css
- Runtime: patterns/aiv-core-object/pattern.js

## Use When

- building an AIV internal memory and vector object in PTO
- creating architecture pages that need a dark Ascend-style vector-core composition
- reusing AIV shell layout and routes without hand-copying static HTML

## Required APIs

- window.PtoAivCorePattern.render(container, presetOrKey)
- window.PtoAivCorePattern.setBufferBlocks(root, blocks)
- window.PtoAivCorePattern.clearBufferBlocks(root)

## Allowed Overrides

- title, labels, capacities, and card membership
- per-card frame width and height
- grid rows, cols, cell size, gap, and highlighted band columns
- runtime local buffer-block state through setBufferBlocks payloads
- route list, route color family, and route anchor bias

## Forbidden Overrides

- rewriting the shell layout in page-local CSS
- replacing official topology-derived routes with ad hoc demo lines
- hard-coding a one-off copy of generated DOM instead of using the shared renderer
- mutating generated grid cells from product pages instead of calling setBufferBlocks

## Reuse Rule

Read this JSON first. For a new page, load pattern.js and call window.PtoAivCorePattern.render with a preset or config object. Extend the preset data for future chip variants instead of cloning the generated DOM.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
