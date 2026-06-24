# AIC Core Object

- Pattern ID: `aic-core-object`
- Type: `hybrid`
- Registry path: `patterns/aic-core-object/pattern.json`
- Preview: `patterns/aic-core-object/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Design-driven AIC internal object pattern with a large L1 card, stacked middle micro-buffers, a central Cube block, and an L0C card. Built as a config-driven shell for future 950B variants.

## Source Files

- Preview HTML: patterns/aic-core-object/pattern.html
- CSS: patterns/aic-core-object/pattern.css
- Runtime: patterns/aic-core-object/pattern.js

## Use When

- building an AIC internal memory object in PTO
- creating 950B architecture pages that need the same left-stack-cube-right composition
- reusing a design-driven buffer cluster without copying static HTML into product pages

## Required APIs

- window.PtoAicCorePattern.render(container, presetOrKey)
- window.PtoAicCorePattern.setBufferBlocks(root, blocks)
- window.PtoAicCorePattern.clearBufferBlocks(root)

## Allowed Overrides

- title, buffer labels, capacities, and stack membership
- per-card frame width and height
- grid rows, cols, cell size, gap, and highlighted band columns
- runtime local buffer-block state through setBufferBlocks payloads
- cube label and frame size

## Forbidden Overrides

- rewriting the shell layout in page-local CSS
- hard-coding a one-off copy of the draft HTML instead of using the shared preset
- changing card chrome, grid treatment, or spacing ad hoc in product pages
- mutating generated grid cells from product pages instead of calling setBufferBlocks

## Reuse Rule

Read this JSON first. For a new page, load pattern.js and call window.PtoAicCorePattern.render with a preset or config object. Extend the preset data for 950B instead of cloning the generated DOM.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
