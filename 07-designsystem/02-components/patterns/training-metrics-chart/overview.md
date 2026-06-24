# Training Metrics Chart

- Pattern ID: `training-metrics-chart`
- Type: `svg`
- Registry path: `patterns/training-metrics-chart/pattern.json`
- Preview: `patterns/training-metrics-chart/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Self-drawn SVG numeric time-series line chart for training metrics (loss, val, eval, grad norm, load-balance, MFU, any per-step series). Supports multi-series, dual axis, anomaly-spike highlight, interest-window brushing, and a step cursor. Dependency-free. Series lines use viz highlight ramps; anomaly uses semantic danger; brush uses primary selection; axes/grid use border tokens.

## Source Files

- Preview HTML: patterns/training-metrics-chart/pattern.html
- CSS: patterns/training-metrics-chart/pattern.css
- Runtime: patterns/training-metrics-chart/pattern.js

## Use When

- Plotting one or more continuous numeric series over a step / iteration axis (training loss, eval, gradient norm, load-balance loss, MFU).
- Letting the user brush a step range to drive a shared interest window across linked views.
- Driving or reflecting a global step cursor (scrubber / playback).
- Highlighting anomalous spikes on a series with a semantic alert band + dots.
- Reusing the same chart at full size (timeline) and compact size (sparkline in a side rail).

## Required APIs

- window.PtoTrainingMetricsChart.render(container, spec)
- controller.setInterestWindow(window)
- controller.setCursor(step)
- controller.setAnomalyVisible(bool)
- controller.setData(data)
- controller.destroy()

## Allowed Overrides

- spec.steps
- spec.series[].id
- spec.series[].label
- spec.series[].key
- spec.series[].colorVar (must be a --highlight-*-source viz ramp)
- spec.series[].axis
- spec.series[].emphasis
- spec.data
- spec.anomalies
- spec.interestWindow
- spec.cursor
- spec.onBrush
- spec.onCursorHover
- spec.legend
- spec.options.width
- spec.options.height
- spec.options.pad
- spec.options.compact

## Forbidden Overrides

- series line colors set to semantic status tokens (use viz highlight ramps only)
- anomaly highlight drawn with viz color instead of --danger
- brush band drawn with viz color instead of --primary
- adding drop-shadow to axes, lines, or the plot
- DOM/CSS reimplementation of the line, axis, brush, or cursor geometry
- wrapping the chart in a second bordered card (no card-in-card)

## Reuse Rule

Load patterns/training-metrics-chart/pattern.css and pattern.js, then call window.PtoTrainingMetricsChart.render(container, spec). Map each series colorVar to a --highlight-*-source ramp; keep anomaly = --danger and brush = --primary. Use controller.setCursor / setInterestWindow for cross-view linkage; pass spec.onBrush and spec.onCursorHover to broadcast. Do not recolor series with semantic status tokens or rebuild the SVG geometry in page-local code.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
