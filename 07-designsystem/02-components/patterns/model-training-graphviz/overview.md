# Model Training Graphviz

- Pattern ID: `model-training-graphviz`
- Type: `hybrid`
- Registry path: `patterns/model-training-graphviz/pattern.json`
- Preview: `patterns/model-training-graphviz/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Training-time overlay contract for model architecture graphs. The pattern renders the base architecture through model-graphviz, then adds training evidence hover panels, edge type tags, phase-driven node selection, related-node emphasis, and drag pan / Command-wheel zoom without viewport jumping.

## Source Files

- Preview HTML: patterns/model-training-graphviz/pattern.html
- CSS: patterns/model-training-graphviz/pattern.css
- Runtime: patterns/model-training-graphviz/pattern.js

## Use When

- showing how a training phase maps to architecture nodes without moving the graph viewport
- overlaying source/config/profiling evidence in hover panels or side evidence while graph nodes stay tensor/module/operator based
- connecting right-side run steps, loss/MFU curves, or hardware evidence to architecture nodes
- teaching Dense, MoE, MLA, DSA, router, expert, and LM Head training bottlenecks

## Required APIs

- window.PtoModelGraphvizPattern.render(container, graph, options)
- window.PtoModelTrainingGraphvizPattern.render(container, graph, options)

## Allowed Overrides

- graph data, node labels, cluster labels, edge tags, training evidence copy, and selected node ids
- model-specific phase maps from training workflow names to graph node ids
- viewport padding and initial selected node
- node fill colors through the base model-graphviz colormap only
- source/config/profiling evidence as hover metadata or page-side evidence panels

## Forbidden Overrides

- reimplementing model node geometry outside model-graphviz
- using an iframe page shell when the product needs direct phase-node linkage
- moving the viewport when phase steps advance; selection should only change node and edge emphasis
- dimming non-selected operators or tensor nodes with low opacity during phase changes
- drawing tall source-evidence columns inside the architecture graph
- using source files such as config.json or modeling.py as input/output tensor nodes
- using saturated blue borders as the main selected state in light mode
- creating native title tooltips in addition to the custom hover panel
- drawing edge tags or evidence badges from static HTML rather than renderer output

## Reuse Rule

Load model-graphviz/pattern.css and pattern.js first, then model-training-graphviz/pattern.css and pattern.js. Call PtoModelTrainingGraphvizPattern.render with a model-graphviz graph object plus trainingEvidence. Use controller.setPhase({nodeId, relatedNodeIds}) for training-step linkage; do not refit or pan the graph when phases change.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
