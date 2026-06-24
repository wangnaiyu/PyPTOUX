# Swimlane Task Bar

- Pattern ID: `swimlane-task-bar`
- Type: `canvas`
- Registry path: `patterns/swimlane-task/pattern.json`
- Preview: `patterns/swimlane-task/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Canvas-rendered three-segment task bar and hover tooltip used for timed events in swimlane and timeline surfaces.

## Source Files

- Preview HTML: patterns/swimlane-task/pattern.html
- CSS: patterns/swimlane-task/pattern.css
- Runtime: patterns/swimlane-task/pattern.js

## Use When

- Displaying a timed task in a swimlane, timeline, or execution trace surface.
- Showing input, compute, and output subsegments inside one task duration.
- Showing a task hover tooltip with op, lane, timing, status, dominant counter, and wrap metadata.

## Required APIs

- window.PtoSwimlaneTaskPattern.drawTaskBar
- window.PtoSwimlaneTaskPattern.buildTaskSegmentSpec
- window.PtoSwimlaneTaskPattern.createTaskColormap(options)
- window.PtoSwimlaneTaskPattern.colorFromColormap(input, palette, domain)
- window.PtoSwimlaneTaskPattern.formatTaskTooltip
- window.PtoSwimlaneTaskPattern.initHoverTooltip

## Allowed Overrides

- x
- y
- width
- height
- baseColor
- task.label
- task.displayName
- task.rawName
- task.opName
- task.laneKind
- task.laneId
- task.totalCycle
- task.clcCycle
- task.gap
- task.gapRatio
- task.status
- task.dominantCounter
- task.wrapId
- task.inputRawMagic
- task.outputRawMagic
- isSelected
- isRelated
- isEmphasized
- fontFamily

## Forbidden Overrides

- segment width math
- base fill alpha
- top highlight alpha
- border alpha
- font threshold rules
- text truncation rules
- DOM/CSS reimplementation of the task bar

## Reuse Rule

Import patterns/swimlane-task/pattern.js and call window.PtoSwimlaneTaskPattern.drawTaskBar for the canvas bar, createTaskColormap for semantic/stitch/engine/subgraph colors, and initHoverTooltip for hover tips. Do not rebuild the task bar or tooltip behavior with page-local DOM/CSS or rewrite the segment math, color hashing, colormap selection, or hover tip behavior locally.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
