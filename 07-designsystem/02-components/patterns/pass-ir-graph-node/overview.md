# Pass-IR Graph Node

- Pattern ID: `pass-ir-graph-node`
- Type: `hybrid`
- Registry path: `patterns/pass-ir-graph-node/pattern.json`
- Preview: `patterns/pass-ir-graph-node/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Pass-IR graph node card contract extracted from the real node CSS and renderer JS. Covers full-size op/tensor/incast/outcast cards, compact variants, selection state, and JS-generated group cards.

## Source Files

- Preview HTML: patterns/pass-ir-graph-node/pattern.html
- CSS: patterns/pass-ir-graph-node/pattern.css
- Runtime: patterns/pass-ir-graph-node/pattern.js

## Use When

- previewing or reusing the Pass-IR graph node card style in a new PTO page
- rendering op, tensor, incast, outcast, or grouped graph cards without inventing a second node language
- building graph previews that must preserve Pass-IR compact and selected states

## Required APIs

- window.PtoPassIrGraphNodePattern.buildNodeCardElement(node, options)
- window.PtoPassIrGraphNodePattern.renderCardSet(mountNode, cards)
- window.PtoPassIrGraphNodePattern.renderDefaultPreview(root)

## Allowed Overrides

- node data content such as labels, shapes, latency, slot index, and member list
- accent color via node.accent or options.accent
- selected and compact state flags
- per-node frame width and height when layout density changes

## Forbidden Overrides

- replacing the group shell path with page-local HTML
- rewriting node chrome in page-local CSS instead of using the shared pattern CSS
- dropping the renderer JS for group cards or compact/full card switching

## Reuse Rule

Read this JSON first. For preview or reuse, load pattern.js and build cards through window.PtoPassIrGraphNodePattern. Treat node generation as a hybrid contract: DOM shell and class names are shared, but group shell geometry and compact/full card switching stay in JS.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
