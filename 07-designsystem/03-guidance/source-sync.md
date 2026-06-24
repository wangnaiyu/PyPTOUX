# Design System Source Sync

本文记录 `yinyucheng0601/pto-design-system` 与 PyPTOUX 的同步和投影规则。

## Source

- Upstream: `https://github.com/yinyucheng0601/pto-design-system`
- Local mirror: `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/pto-design-system`
- Current snapshot: `main` / `e26a85628658fa2894aba52e95e335cf60f8dfdc`
- Commit date: `2026-06-16T17:35:58+08:00`

## Execution Order

1. Clone / inspect upstream local mirror and record snapshot.
2. Update `.agents/skills/pto-design-system/` if upstream has stable changes that should become agent-facing execution rules.
3. Project stable tokens, UI classes, approved patterns, docs and HTML portal into `07-designsystem/`.

## Projection Policy

Allowed:

- token CSS
- UI class CSS contract
- approved pattern code
- approved pattern specs
- stable guidance docs
- `index.html` human-facing portal
- changelog and change report template

Not allowed by default:

- upstream full repository mirror
- unapproved experimental preview
- unbounded screenshots or raw design assets
- agent-only process notes that do not help human review

## Change Report Requirement

Each sync must create or update a change report covering:

- upstream snapshot
- changed upstream areas
- skill updates
- `07-designsystem/` projections
- preview gate impact
- deferred or intentionally skipped changes
