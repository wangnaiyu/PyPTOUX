# Model Graphviz

- Pattern ID: `model-graphviz`
- Type: `svg`
- Registry path: `patterns/model-graphviz/pattern.json`
- Preview: `patterns/model-graphviz/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Reusable SVG visual contract for TorchVista/Graphviz model architecture maps and report overlays. Captures the approved DeepSeek V3.2 graph style and bundles clean architecture schema assets for DeepSeek V3.2, Qwen7B, and Gemma. The contract keeps default depth-2 folding, pill module/op nodes, rounded-rect tensor/state nodes, parent cluster shells with a fixed --radius-xl (16px) corner and 10% white expanded fill for every container including repeated layer templates, white edges, vertically centered node label+type stacks, normalized safe colormap at s=0.82/l=0.40, 50% node-fill opacity in light mode, strict semantic module hierarchy, parent-to-child fill inheritance for op/module nodes, folded representative edge dedupe, stable expand/collapse viewport anchoring, centered report-priority container title pills, no-extra-border priority tags, top-right corner fold controls, right-inset expand controls, no graph shadows, and no-border clicked-operator preview cards with dark code surfaces. New model graph pages should derive cluster boxes from the bounding box of their visible children, lay the decoder chain out as a single top-to-bottom column (Gate/Up the only parallel pair), use transform-based cursor-anchored pan/zoom, show a single white selection stroke with no browser focus ring, and place a repeat-count badge at the cluster top-left under the title.

## Source Files

- Preview HTML: patterns/model-graphviz/pattern.html
- CSS: patterns/model-graphviz/pattern.css
- Runtime: patterns/model-graphviz/pattern.js

## Use When

- rendering model architecture graphs from Graphviz, TorchVista, or report-derived model nodes
- showing collapsed module nodes with plus controls and expanded parent clusters without duplicate standalone parent nodes
- keeping detail modules inside their semantic parent instead of drawing them as same-level peers
- building graph previews where modules/ops use full-pill geometry and Input/Output/MTP tensor nodes use rounded rectangles
- overlaying report diagnosis metadata on top of original Graphviz nodes without drawing separate visible rings
- using an infinite-canvas graph with a transparent top header and right-side panel-shell inspector where mapped-node lists can focus the graph

## Required APIs

- window.PtoModelGraphvizPattern.render(container, graph, options)
- window.PtoModelGraphvizPattern.buildColorMap(keys)
- window.PtoModelGraphvizPattern.reportPriorityColors
- window.PtoModelGraphvizPattern.defaultDotLayout

## Allowed Overrides

- graph data: nodes, edges, clusters, labels, type labels, and fixed positions
- node dimensions when the Graphviz layout requires wider labels
- node semantic color keys, as long as colors are resolved through buildColorMap
- node fill colors only; light mode must render those node fills at 50% opacity, and all non-node UI colors, typography, spacing, radii, borders, and code surfaces must stay token-derived
- stage width, height, and viewport padding
- collapsed and expanded state data
- collapseDepth URL overrides, while the default remains depth 2
- report priority values P0, P1, or P2, using the documented red/orange/yellow fills
- right inspector content and mapped-node list data, as long as graph focus behavior is preserved

## Forbidden Overrides

- rendering Input, Output, MTP, Constant, or Parameter tensor nodes as ellipses or full-pill op nodes
- changing module/op rect node radius away from height / 2 full-pill geometry
- placing expand buttons outside the right edge or over text
- adding border strokes to clicked-operator preview cards
- using light code/editor surfaces inside operator preview cards
- using a red/orange/semantic-green colormap instead of the pass-ir safe hue algorithm
- changing the shared colormap saturation/lightness away from s=0.82/l=0.40 without updating this pattern first
- adding drop-shadow/filter shadows to graph nodes, clusters, fold controls, or graph panels
- using colored expanded-cluster backgrounds instead of 10% white fill for any container, including repeated layer templates
- using a parent cluster corner radius other than --radius-xl (16px)
- placing expanded-cluster fold controls away from the top-right corner anchor
- hard-coding non-node UI color, font, spacing, radius, border, or code-surface styles outside design-system tokens
- breaking parent-to-child fill inheritance inside expanded clusters
- rendering multiple parallel representative edges between the same folded source and target modules
- recentering or refitting the whole graph after expand/collapse instead of preserving the clicked module's screen anchor
- using dark edge strokes on the dark graph stage
- reintroducing duplicate standalone parent nodes beside expanded clusters
- placing report container title pills against the original label's left edge instead of the container bbox center
- using blue for P2 report priority
- using border-only color to distinguish report diagnosis cards or priority tags
- drawing report priority as a separate visible outline around nodes or containers
- letting a centered report title pill sit below edge strokes where the graph line crosses through the label
- adding visible border styles to the panel-shell report inspector beyond the shared panel-shell token contract

## Reuse Rule

Read this JSON first. For any model graph preview, use pattern.html as the parity preview because it iframes the real V3.2 Graphviz page. For new lightweight rendered examples, load pattern.css and pattern.js, then call window.PtoModelGraphvizPattern.render with data. Treat this as a rendered SVG pattern: node geometry, depth-2 default folding, top-right corner fold placement, right-inset expand placement, --radius-xl (16px) parent cluster corners, vertically centered node label+type stacks, parent/child color inheritance, 10% white expanded-cluster fill for every container, 50% light-mode node-fill opacity, Graphviz margin/pad, cluster margin, no-shadow graph rendering, centered report-priority container title pills, no-extra-border priority tags, invisible-only click hit targets, and normalized safe colormap generation stay in the shared renderer rather than page-local CSS. New pages additionally derive cluster boxes from child bounding boxes, use a single top-to-bottom decoder column, transform-based cursor-anchored pan/zoom, a single white selection stroke (no focus ring), and a top-left repeat-count badge.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
