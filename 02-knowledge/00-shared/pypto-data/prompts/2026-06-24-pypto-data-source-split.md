# Prompt: PyPTO Data Source Split

Use this prompt to reproduce the 2026-06-24 split that moved PyPTO data governance out of `pypto-toolkit`.

## Goal

Create or update `02-knowledge/00-shared/pypto-data/` so it owns PyPTO sample data, test data, compile/runtime artifacts, data levels and `share-safe` rules.

## Required Context

- `.agents/skills/pypto-knowledge-source/references/sources.md`
- `02-knowledge/00-shared/pypto-toolkit/`
- `09-docs/01-conventions/content-routing.md`
- `09-docs/04-upgrade-plans/2026-06-systematic-repo-upgrade/decisions.md`

## Decisions To Preserve

- Keep `pypto-sample-dataset` as the active local PyPTO data source rooted at `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例数据`.
- Keep `pypto-testdata` as display name `PTO-TestData`, remote `https://gitcode.com/zhanghuixin/PTO-TestData`, active local mirror under `/Users/wny/Documents/2 领域 Area/工作/EASY CANN/样例工程&文件/PTO-TestData`, data level L1, same permission and external boundary as `pypto-sample-dataset`.
- Route new PyPTO data material to concrete source instances instead of a generic data lane.
- Only sampled / desensitized data or schema-generated L2 data can be marked `share-safe`.
- Keep `pypto-toolkit` limited to Toolkit product capability, `pypto-tools` and toolkit design inputs.

## Output

- `02-knowledge/00-shared/pypto-data/overview.md`
- `02-knowledge/00-shared/pypto-data/sources.md`
- `02-knowledge/00-shared/pypto-data/manifest.md`
- Matching updates to source registry, demo-data skill references, indexes and Batch C checkpoint docs.
