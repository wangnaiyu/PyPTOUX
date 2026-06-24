# Floating Playback Control

- Pattern ID: `floating-playback-control`
- Type: `dom`
- Registry path: `patterns/floating-playback-control/pattern.json`
- Preview: `patterns/floating-playback-control/pattern.html`
- Projection status: `approved-pattern-code`
- Upstream mirror snapshot: `yinyucheng0601/pto-design-system@e26a85628658fa2894aba52e95e335cf60f8dfdc`

## Purpose

Bottom-centered playback toolbar extracted from mem_viewer. Covers the liquid floating shell, expanded/collapsed states, playback buttons, timeline metadata, range scrubber, and scrubber hover tooltip.

## Source Files

- Preview HTML: patterns/floating-playback-control/pattern.html
- CSS: patterns/floating-playback-control/pattern.css
- Runtime: patterns/floating-playback-control/pattern.js

## Use When

- a PTO tool needs a bottom-centered playback or step-through toolbar over a dense canvas
- a page needs a collapsible playback control that stays out of the primary visualization
- a timeline scrubber needs a shared hover tooltip and compact metadata treatment

## Required APIs

- window.PtoFloatingPlaybackControl.createControl(options)
- window.PtoFloatingPlaybackControl.init(options)
- window.PtoFloatingPlaybackControl.initScrubberHover(options)
- window.PtoFloatingPlaybackControl.setExpanded(options, expanded)
- window.PtoFloatingPlaybackControl.sync(options)

## Allowed Overrides

- button labels and ids through createControl options
- hiding the built-in scrubber through createControl({ showTimeline: false }) when a shared timeline pattern owns step selection
- playback state through init({ isPlaying })
- scrubber hover label through initScrubberHover({ getLabelForStep })
- surface, radius, sizing, and button colors through documented CSS variables

## Forbidden Overrides

- recreating the floating shell chrome in page-local CSS
- copying the collapse class synchronization logic into a business page
- restyling internal scrubber thumb, hover tooltip, button radius, or separator alpha outside this pattern
- using this pattern for static primary page navigation or non-playback action bars

## Reuse Rule

Read this JSON first. Load pattern.css for the visual contract and pattern.js for collapse/scrubber behavior. Use .pto-floating-playback* classes or createControl(); business pages may own playback data and button handlers, but must call window.PtoFloatingPlaybackControl.init and initScrubberHover instead of copying the floating shell or scrubber hover implementation.

## Maintenance

- 本文件是 `07-designsystem/` 的 human-facing 投影说明。
- 可执行契约以同目录 `pattern.json`、`pattern.css`、`pattern.js` 和 `pattern.html` 为准。
- 同步上游时需更新 `07-designsystem/changelog.md` 与 `03-guidance/source-sync.md` 中的 snapshot / change report。
